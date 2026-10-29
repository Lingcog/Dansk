import { getLang, translations } from '../utils/i18n.js';
import { allNounsRegistry, openNounQuickPeekModal } from '../utils/nounQuickPeekModal.js';
import { byrumVerbsRegistry, openVerbQuickPeekModal } from '../utils/verbQuickPeekModal.js';
import { verberWordTranslations } from '../utils/top100_verber_translations.js';
import { adjektiverWordTranslations } from '../utils/top100_adjektiver_translations.js';
import { adverbierWordTranslations } from '../utils/top100_adverbier_translations.js';
import { konjunktionerWordTranslations } from '../utils/top100_konjunktioner_translations.js';

// TTS Helper
function speakDanish(text) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'da-DK';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

// Built-in grammar hubs & topics
const GRAMMAR_TOPICS = [
    {
        id: 'gram_ordstilling',
        category: 'grammar',
        title: 'Ordstilling i hovedsætninger',
        subtitle: 'Inversion & V2-reglen (Verbum på plads 2)',
        desc: 'Lær den gyldne V2-regel: Verbet står ALTID på plads 2 i en dansk fremsættende hovedsætning. Hvis et tidsled eller stedsled sættes forrest, bytter subjekt og verbal plads (inversion).',
        example: 'I dag spiser Peter en is. (Inversion)',
        viewTarget: 'ordstilling',
        extraData: {},
        icon: '📐',
        badge: 'Ordstilling',
        color: '#eab308'
    },
    {
        id: 'gram_ordstilling_intro',
        category: 'grammar',
        title: 'Ordstilling Introduktion (3-leds & 4-leds)',
        subtitle: 'Fokus på tid og konjunktioner',
        desc: 'Interaktiv træning i den grundlæggende sætningsopbygning: Subjekt (Hvem), Verbal (Handling), Objekt (Hvad) og Tidsudtryk (Hvornår).',
        example: 'Ali læser en bog om aftenen.',
        viewTarget: 'ordstilling_intro',
        extraData: {},
        icon: '⏳',
        badge: 'Sætningslære',
        color: '#eab308'
    },
    {
        id: 'gram_ordstilling_part2',
        category: 'grammar',
        title: 'Centraladverbiets plads (ikke, altid, aldrig)',
        subtitle: '5 led i hovedsætning: Subjekt + Verbal + Centraladverbium + Objekt + Sted/Tid',
        desc: 'Opdag hvor vigtige ord som "ikke", "faktisk", "altid" og "aldrig" placeres i danske hovedsætninger: altid lige efter det bøjede verbum i almindelig ordstilling.',
        example: 'Han cykler ikke på arbejde i dag.',
        viewTarget: 'ordstilling_intro',
        extraData: { subPath: 'part2' },
        icon: '🛑',
        badge: 'Centraladverbiets plads',
        color: '#eab308'
    },
    {
        id: 'gram_tekstflow',
        category: 'grammar',
        title: 'Tekstflow & Argumenterende tekstopbygning',
        subtitle: 'Model A: Klippeøvelse & Model B: 4-farvet logisk analyse',
        desc: 'Lær at opbygge sammenhængende tekster med indledende brobyggere, argumenter og konjunktioner som "for det første", "desuden", "derfor", "så" og "alligevel".',
        example: 'For det første... For det andet... Desuden... Alligevel...',
        viewTarget: 'konjunktioner_tekstflow',
        extraData: {},
        icon: '🧩',
        badge: 'Tekstflow',
        color: '#ec4899'
    },
    {
        id: 'gram_talemaader',
        category: 'grammar',
        title: 'Danske Talemåder & Idiomer',
        subtitle: 'Billedsprog og faste metaforer i hverdagen',
        desc: 'Lær at forstå billedlige udtryk som "Ugler i mosen", "Mad er medicin", "Hjerterum og husrum" og "Få armene ned".',
        example: 'Der er ugler i mosen. = Noget er galt eller mistænkeligt.',
        viewTarget: 'talemaader',
        extraData: {},
        icon: '🦉',
        badge: 'Talemåder',
        color: '#f97316'
    },
    {
        id: 'gram_punktet_og_broen',
        category: 'grammar',
        title: 'Punktet og Broen: Verbernes Tider',
        subtitle: 'Nutid, Datid, Førnutid (har/er) og Førdatid (havde/var)',
        desc: 'Forstå forskellen mellem et afsluttet tidspunkt i fortiden (datid) og en forbindelse til nutiden (førnutid).',
        example: 'Jeg spiste i går (punkt) vs. Jeg har spist (forbindelse).',
        viewTarget: 'punktet_og_broen',
        extraData: {},
        icon: '🌉',
        badge: 'Verbernes tider',
        color: '#ef4444'
    },
    {
        id: 'gram_bestemthed',
        category: 'grammar',
        title: 'Bestemthed & Artikler',
        subtitle: 'en/et, -en/-et, den/det og de',
        desc: 'Træn de danske substantivers køn (fælleskøn og intetkøn) samt forskellen mellem ubestemt og bestemt form i ental og flertal.',
        example: 'en bil ➔ bilen ➔ biler ➔ bilerne',
        viewTarget: 'bestemthed',
        extraData: {},
        icon: '🏷️',
        badge: 'Bestemthed',
        color: '#22c55e'
    },
    {
        id: 'gram_samtale',
        category: 'grammar',
        title: 'Samtaletræning & AI-dialoger',
        subtitle: 'Træn dansk i virkelighedsnære hverdagsroller',
        desc: 'Øv samtaler på sprogskolen, til jobsamtalen, hos lægen og med udlejeren i interaktive talescenarier.',
        example: 'Hej, jeg ringer angående lejligheden...',
        viewTarget: 'samtale_traening',
        extraData: {},
        icon: '🎙️',
        badge: 'Samtale',
        color: '#06b6d4'
    },
    {
        id: 'gram_stoed',
        category: 'grammar',
        title: 'Det Danske Stød & Udtale',
        subtitle: 'Forstå stødets betydning for ordets mening',
        desc: 'Udforsk stødets magi på dansk: forskellen mellem f.eks. "hun" (uden stød) og "hund" (med stød), "bønder" og "bønner".',
        example: 'en hund [hɔnˀ] vs. hun [hɔn]',
        viewTarget: 'det_danske_stoed',
        extraData: {},
        icon: '🗣️',
        badge: 'Udtale & Lyd',
        color: '#8b5cf6'
    }
];

// Unified Search Index Singleton
let searchIndex = null;
let currentNavigate = null;
let isInitialized = false;

// Adjective field metadata
const ADJ_FIELD_META = {
    1: { name: 'Fysiske egenskaber & form', viewTarget: 'adjektiver_fysik' },
    2: { name: 'Tid, alder & tempo', viewTarget: 'adjektiver_tid' },
    3: { name: 'Kvalitet, sværhedsgrad & økonomi', viewTarget: 'adjektiver_kvalitet' },
    4: { name: 'Følelser, personlighed & relationer', viewTarget: 'adjektiver_folelser' },
    5: { name: 'Farver, mængder & tilstande', viewTarget: 'adjektiver_tilstande' }
};

// Adverb field metadata
const ADV_FIELD_META = {
    1: { name: 'Sted: retning vs. hvile', viewTarget: 'adverbier_sted' },
    2: { name: 'Tid og frekvens', viewTarget: 'adverbier_tid' },
    3: { name: 'Måde (-t reglen)', viewTarget: 'adverbier_maade' },
    4: { name: 'Grad og intensitet', viewTarget: 'adverbier_grad' },
    5: { name: 'De 5 magiske småord (jo, da, vel...)', viewTarget: 'adverbier_smaaord' },
    6: { name: 'Holdning, tvivl og sikkerhed', viewTarget: 'adverbier_holdning' },
    7: { name: 'Konnektion og tekstbroer', viewTarget: 'adverbier_konnektion' }
};

function buildSearchIndex() {
    if (searchIndex) return searchIndex;
    const list = [];

    // 1. Nouns (Substantiver) - 101 words
    if (allNounsRegistry) {
        Object.entries(allNounsRegistry).forEach(([key, noun]) => {
            let viewTarget = 'byrummet_vrimmel';
            let sceneName = 'Byrummet';
            const img = noun.sceneImage || '';
            if (img.includes('koekken')) { viewTarget = 'koekken_hjemmet'; sceneName = 'Køkkenet & Hjemmet'; }
            else if (img.includes('klasse')) { viewTarget = 'klasse_kontor'; sceneName = 'Klassen & Kontoret'; }
            else if (img.includes('natur')) { viewTarget = 'natur_fritid'; sceneName = 'Naturen & Fritiden'; }
            else if (img.includes('station')) { viewTarget = 'station_indkoeb'; sceneName = 'Stationen & Indkøb'; }

            list.push({
                id: `noun_${key}`,
                key: key,
                category: 'nouns',
                title: noun.word || `en ${noun.clean || key}`,
                baseWord: noun.clean || key,
                forms: `Bestemt: ${noun.bestemt || ''} | Flertal: ${noun.flertal || ''}`,
                gender: noun.gender || (noun.word?.startsWith('et ') ? 'et' : 'en'),
                icon: noun.icon || '🏷️',
                badge: 'Navneord',
                badgeColor: '#22c55e',
                location: `Navneord: ${sceneName}`,
                viewTarget: viewTarget,
                extraData: { focusWord: noun.clean || key },
                sentence: noun.sentence || '',
                meaning: `Navneord (${noun.gender || 'en/et'}-ord). Form: ${noun.bestemt || ''}, flertal: ${noun.flertal || ''}.`,
                translations: noun.translations || {},
                raw: noun,
                type: 'noun'
            });
        });
    }

    // 2. Verbs (Verber) - 100 verbs
    if (verberWordTranslations) {
        Object.entries(verberWordTranslations).forEach(([rawKey, verbEntry]) => {
            const cleanKey = rawKey.replace(/^at\s+/, '').trim();
            const scene = verbEntry.scene || 'byrum';
            let viewTarget = 'verber_byrum';
            let sceneName = 'Byen og gaden';
            if (scene === 'hjem') { viewTarget = 'verber_hjem'; sceneName = 'Hjemmet & Køkkenet'; }
            else if (scene === 'klasse') { viewTarget = 'verber_klasse'; sceneName = 'Klassen & Kontoret'; }
            else if (scene === 'park') { viewTarget = 'verber_park'; sceneName = 'Naturen & Fritiden'; }
            else if (scene === 'station') { viewTarget = 'verber_station'; sceneName = 'Stationen & Indkøb'; }

            // Extract translations
            const transMap = {};
            Object.keys(verbEntry).forEach(k => {
                if (verbEntry[k] && typeof verbEntry[k] === 'object' && verbEntry[k].meaning) {
                    transMap[k] = verbEntry[k].meaning;
                }
            });

            list.push({
                id: `verb_${cleanKey}`,
                key: cleanKey,
                category: 'verbs',
                title: `at ${cleanKey}`,
                baseWord: cleanKey,
                forms: `Nutid: ${verbEntry.nutid || ''} | Datid: ${verbEntry.datid || ''}`,
                icon: '🔴',
                badge: 'Udsagnsord',
                badgeColor: '#ef4444',
                location: `Verber: ${sceneName}`,
                viewTarget: viewTarget,
                extraData: { targetVerb: cleanKey },
                sentence: verbEntry.da?.sentence || '',
                meaning: verbEntry.da?.meaning || `Udsagnsord: nutid: "${verbEntry.nutid}", datid: "${verbEntry.datid}".`,
                translations: transMap,
                raw: verbEntry,
                type: 'verb'
            });
        });
    }

    // 3. Adjectives (Adjektiver) - 100 adjectives
    if (adjektiverWordTranslations) {
        Object.entries(adjektiverWordTranslations).forEach(([key, adjEntry]) => {
            const baseWord = adjEntry.baseWord || key;
            const field = adjEntry.field || 1;
            const meta = ADJ_FIELD_META[field] || ADJ_FIELD_META[1];

            const transMap = {};
            Object.keys(adjEntry).forEach(k => {
                if (adjEntry[k] && typeof adjEntry[k] === 'object' && adjEntry[k].meaning) {
                    transMap[k] = adjEntry[k].meaning;
                }
            });

            list.push({
                id: `adj_${baseWord}`,
                key: baseWord,
                category: 'adjectives',
                title: baseWord,
                baseWord: baseWord,
                forms: `Fælleskøn: en ${baseWord} | Intetkøn: et ${baseWord}t | Flertal/Bestemt: ${baseWord}e`,
                icon: '🟠',
                badge: 'Tillægsord',
                badgeColor: '#f97316',
                location: `Adjektiver: Felt ${field} (${meta.name})`,
                viewTarget: meta.viewTarget,
                extraData: { targetWord: baseWord },
                sentence: adjEntry.da?.sentence || '',
                meaning: adjEntry.da?.meaning || `Adjektiv: beskriver en egenskab eller tilstand.`,
                translations: transMap,
                raw: adjEntry,
                type: 'adjective'
            });
        });
    }

    // 4. Adverbs (Adverbier) - 135 adverbs
    if (adverbierWordTranslations) {
        Object.entries(adverbierWordTranslations).forEach(([key, advEntry]) => {
            const baseWord = advEntry.baseWord || advEntry.id || key.replace(/^f\d+_/, '');
            const field = advEntry.field || 1;
            const meta = ADV_FIELD_META[field] || ADV_FIELD_META[1];

            const transMap = {};
            Object.keys(advEntry).forEach(k => {
                if (advEntry[k] && typeof advEntry[k] === 'object' && advEntry[k].meaning) {
                    transMap[k] = advEntry[k].meaning;
                }
            });

            list.push({
                id: `adv_${key}`,
                key: baseWord,
                category: 'adverbs',
                title: baseWord,
                baseWord: baseWord,
                forms: `Felt ${field}: ${meta.name}`,
                icon: '🔵',
                badge: 'Biord',
                badgeColor: '#38bdf8',
                location: `Adverbier: Felt ${field} (${meta.name})`,
                viewTarget: meta.viewTarget,
                extraData: { targetWord: baseWord },
                sentence: advEntry.da?.sentence || '',
                meaning: advEntry.da?.meaning || `Adverbium: angiver tid, sted, måde, grad eller holdning.`,
                translations: transMap,
                raw: advEntry,
                type: 'adverb'
            });
        });
    }

    // 5. Conjunctions (Konjunktioner) - 76 conjunctions
    if (konjunktionerWordTranslations) {
        Object.entries(konjunktionerWordTranslations).forEach(([key, konjEntry]) => {
            const baseWord = konjEntry.baseWord || konjEntry.id || key.replace(/^flow_/, '');
            let viewTarget = 'konjunktioner_all';
            let categoryName = 'Sideordnende & Bindeord';

            if (baseWord === 'at') { viewTarget = 'konjunktioner_at'; categoryName = 'Ledsætning: "at"'; }
            else if (baseWord === 'da' || baseWord === 'når') { viewTarget = 'konjunktioner_da_naar'; categoryName = 'Tid: "da" vs. "når"'; }
            else if (baseWord === 'fordi' || baseWord === 'derfor') { viewTarget = 'konjunktioner_fordi_derfor'; categoryName = 'Årsag & Virkning'; }
            else if (baseWord === 'selvom' || baseWord === 'alligevel') { viewTarget = 'konjunktioner_selvom_alligevel'; categoryName = 'Modsætning: "selvom"'; }
            else if (key.startsWith('flow_') || ['for det første', 'for det andet', 'desuden'].includes(baseWord)) {
                viewTarget = 'konjunktioner_tekstflow';
                categoryName = 'Tekstflow & Opbygning';
            }

            const transMap = {};
            Object.keys(konjEntry).forEach(k => {
                if (konjEntry[k] && typeof konjEntry[k] === 'object' && konjEntry[k].meaning) {
                    transMap[k] = konjEntry[k].meaning;
                }
            });

            list.push({
                id: `konj_${key}`,
                key: baseWord,
                category: 'conjunctions',
                title: baseWord,
                baseWord: baseWord,
                forms: `Bindeord: ${categoryName}`,
                icon: '🟣',
                badge: 'Bindeord',
                badgeColor: '#a855f7',
                location: `Konjunktioner: ${categoryName}`,
                viewTarget: viewTarget,
                extraData: { targetWord: baseWord },
                sentence: konjEntry.da?.sentence || '',
                meaning: konjEntry.da?.meaning || `Konjunktion: binder sætninger eller led sammen.`,
                translations: transMap,
                raw: konjEntry,
                type: 'conjunction'
            });
        });
    }

    // 6. Grammar Topics
    GRAMMAR_TOPICS.forEach(topic => {
        list.push({
            id: topic.id,
            key: topic.title,
            category: 'grammar',
            title: topic.title,
            baseWord: topic.title,
            forms: topic.subtitle,
            icon: topic.icon,
            badge: topic.badge,
            badgeColor: topic.color,
            location: 'Grammatik & Sætningsopbygning',
            viewTarget: topic.viewTarget,
            extraData: topic.extraData,
            sentence: topic.example,
            meaning: topic.desc,
            translations: {},
            raw: topic,
            type: 'grammar'
        });
    });

    searchIndex = list;
    return searchIndex;
}

// Search Scoring Function
function searchItems(query, activeCategory = 'all') {
    const rawIndex = buildSearchIndex();
    const q = (query || '').trim().toLowerCase();
    const currentLang = getLang ? getLang() : 'da';

    let filtered = rawIndex;
    if (activeCategory && activeCategory !== 'all') {
        filtered = filtered.filter(item => item.category === activeCategory);
    }

    if (!q) {
        // Return curated popular selection when query is blank
        return filtered.slice(0, 15);
    }

    const scored = [];

    filtered.forEach(item => {
        let score = 0;
        const danishTitle = (item.title || '').toLowerCase();
        const base = (item.baseWord || '').toLowerCase();
        const forms = (item.forms || '').toLowerCase();
        const meaning = (item.meaning || '').toLowerCase();
        const sentence = (item.sentence || '').toLowerCase();

        // Check translation in active language
        const activeTrans = (item.translations?.[currentLang] || '').toLowerCase();
        // Check English translation fallback
        const enTrans = (item.translations?.['en'] || '').toLowerCase();

        // 1. Exact match on Danish word or base word
        if (danishTitle === q || base === q) {
            score += 150;
        } else if (danishTitle.startsWith(q) || base.startsWith(q)) {
            score += 100;
        } else if (danishTitle.includes(q) || base.includes(q)) {
            score += 70;
        }

        // 2. Inflection forms match
        if (forms.includes(q)) {
            score += 65;
        }

        // 3. Active language translation match
        if (activeTrans) {
            if (activeTrans === q) {
                score += 120;
            } else if (activeTrans.startsWith(q)) {
                score += 85;
            } else if (activeTrans.includes(q)) {
                score += 55;
            }
        }

        // 4. English translation match
        if (enTrans && enTrans !== activeTrans) {
            if (enTrans === q) {
                score += 90;
            } else if (enTrans.startsWith(q)) {
                score += 60;
            } else if (enTrans.includes(q)) {
                score += 40;
            }
        }

        // 5. Check other translations in index
        if (score === 0 && item.translations) {
            for (const [l, t] of Object.entries(item.translations)) {
                if (typeof t === 'string' && t.toLowerCase().includes(q)) {
                    score += 35;
                    break;
                }
            }
        }

        // 6. Sentence or meaning match
        if (sentence.includes(q)) {
            score += 30;
        }
        if (meaning.includes(q)) {
            score += 25;
        }

        if (score > 0) {
            scored.push({ item, score });
        }
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.map(s => s.item);
}

// Open Word Presentation Modal (Målordspræsentation)
export function openWordPresentation(item) {
    if (!item) return;

    // Direct delegation to existing specialized visual modals if applicable
    if (item.type === 'noun' && item.key) {
        openNounQuickPeekModal(item.key);
        return;
    }
    if (item.type === 'verb' && item.key && byrumVerbsRegistry && byrumVerbsRegistry[item.key]) {
        openVerbQuickPeekModal(item.key);
        return;
    }

    // Generic rich presentation modal for adjectives, adverbs, conjunctions and verbs
    const existing = document.querySelector('.spotlight-presentation-overlay');
    if (existing) existing.remove();

    const currentLang = getLang ? getLang() : 'da';
    let translationText = item.translations?.[currentLang] 
        || item.translations?.['en'] 
        || 'Oversættelse ikke tilgængelig';

    const overlay = document.createElement('div');
    overlay.className = 'spotlight-presentation-overlay';

    overlay.innerHTML = `
        <div class="sp-pres-modal">
            <div class="sp-pres-header">
                <span class="sp-pres-badge" style="background: ${item.badgeColor || '#38bdf8'}22; border-color: ${item.badgeColor || '#38bdf8'}; color: ${item.badgeColor || '#38bdf8'};">
                    ${item.icon || '📖'} ${item.badge || 'Målord'}
                </span>
                <span class="sp-pres-location">${item.location || ''}</span>
                <button class="sp-pres-close" id="sp-pres-close-btn" title="Luk">✕</button>
            </div>
            
            <div class="sp-pres-body">
                <div class="sp-pres-title-row">
                    <h2 class="sp-pres-title">${item.title}</h2>
                    <button class="sp-pres-tts-btn" id="sp-pres-tts" title="Lyt til udtalen">
                        <span>🔊</span> Lyt
                    </button>
                </div>

                ${item.forms ? `
                    <div class="sp-pres-forms-card">
                        <span class="sp-pres-forms-label">Form og bøjning:</span>
                        <div class="sp-pres-forms-val">${item.forms}</div>
                    </div>
                ` : ''}

                <div class="sp-pres-meaning-card">
                    <span class="sp-pres-section-label">💡 Betydning og forklaring:</span>
                    <p class="sp-pres-meaning-text">${item.meaning}</p>
                </div>

                ${item.sentence ? `
                    <div class="sp-pres-sentence-card">
                        <span class="sp-pres-section-label">💬 Eksempelsætning:</span>
                        <blockquote class="sp-pres-sentence-quote">"${item.sentence}"</blockquote>
                        <button class="sp-pres-sentence-tts" id="sp-pres-sentence-tts">
                            🔊 Hør sætning
                        </button>
                    </div>
                ` : ''}

                <!-- Aktiv genkaldelse af oversættelse -->
                <div class="sp-pres-trans-wrapper">
                    <button class="sp-pres-reveal-btn" id="sp-pres-reveal-btn">
                        <span>🌍</span> Er du i tvivl om ordet? Vis oversættelse (${currentLang.toUpperCase()})
                    </button>
                    <div class="sp-pres-trans-card" id="sp-pres-trans-card" style="display: none;">
                        <span class="sp-pres-trans-label">🌍 Oversættelse (${currentLang.toUpperCase()}):</span>
                        <strong class="sp-pres-trans-value">${translationText}</strong>
                    </div>
                </div>

                <div class="sp-pres-actions-footer">
                    <button class="sp-pres-navigate-btn" id="sp-pres-goto-btn">
                        Gå til opgaver & beslægtede ord ➔
                    </button>
                </div>
            </div>
        </div>
    `;

    function closePresModal() {
        overlay.classList.add('sp-fade-out');
        setTimeout(() => overlay.remove(), 160);
    }

    overlay.querySelector('#sp-pres-close-btn').onclick = closePresModal;
    overlay.onclick = (e) => {
        if (e.target === overlay) closePresModal();
    };

    const ttsBtn = overlay.querySelector('#sp-pres-tts');
    if (ttsBtn) ttsBtn.onclick = () => speakDanish(item.baseWord || item.title);

    const sentTtsBtn = overlay.querySelector('#sp-pres-sentence-tts');
    if (sentTtsBtn && item.sentence) sentTtsBtn.onclick = () => speakDanish(item.sentence);

    const revealBtn = overlay.querySelector('#sp-pres-reveal-btn');
    const transCard = overlay.querySelector('#sp-pres-trans-card');
    if (revealBtn && transCard) {
        revealBtn.onclick = () => {
            revealBtn.style.display = 'none';
            transCard.style.display = 'flex';
        };
    }

    const gotoBtn = overlay.querySelector('#sp-pres-goto-btn');
    if (gotoBtn) {
        gotoBtn.onclick = () => {
            closePresModal();
            closeSpotlightModal();
            if (currentNavigate && item.viewTarget) {
                currentNavigate(item.viewTarget, item.extraData || {});
            }
        };
    }

    document.body.appendChild(overlay);
    speakDanish(item.baseWord || item.title);
}

// Global Spotlight Search Dialog UI
let spotlightOverlay = null;
let activeCategoryFilter = 'all';
let currentResults = [];
let selectedIndex = 0;

function ensureSpotlightStyles() {
    if (document.getElementById('spotlight-search-styles')) return;

    const style = document.createElement('style');
    style.id = 'spotlight-search-styles';
    style.textContent = `
        /* Floating Trigger Button */
        .global-search-btn {
            position: fixed;
            top: 14px;
            right: 66px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1.5px solid rgba(255, 255, 255, 0.2);
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.15rem;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
            z-index: 99998;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            padding: 0;
            outline: none;
            user-select: none;
        }
        .global-search-btn:hover {
            transform: scale(1.08);
            background: rgba(30, 41, 59, 0.95);
            border-color: #38bdf8;
            box-shadow: 0 6px 20px rgba(56, 189, 248, 0.35);
        }
        .global-search-btn:active {
            transform: scale(0.95);
        }
        @media (max-width: 600px) {
            .global-search-btn {
                top: 10px;
                right: 58px;
                width: 38px;
                height: 38px;
                font-size: 1.05rem;
            }
        }

        /* Spotlight Modal Overlay */
        .spotlight-overlay {
            position: fixed;
            inset: 0;
            background: rgba(8, 12, 24, 0.78);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 999999;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 4vh 1rem 2rem;
            animation: spFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            box-sizing: border-box;
        }
        .spotlight-overlay.sp-fade-out {
            animation: spFadeOut 0.16s ease forwards;
        }

        .spotlight-dialog {
            background: rgba(15, 23, 42, 0.96);
            border: 1.5px solid rgba(255, 255, 255, 0.18);
            border-radius: 24px;
            width: 100%;
            max-width: 680px;
            max-height: 84vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.65), 0 0 50px rgba(56, 189, 248, 0.15);
            overflow: hidden;
            animation: spSlideDown 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Search Header & Input */
        .sp-header {
            padding: 1.1rem 1.4rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            gap: 0.9rem;
            position: relative;
        }
        .sp-search-icon {
            font-size: 1.35rem;
            color: #38bdf8;
            flex-shrink: 0;
        }
        .sp-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            font-size: 1.25rem;
            font-weight: 600;
            color: #f8fafc;
            padding: 0;
            line-height: 1.4;
            font-family: inherit;
        }
        .sp-input::placeholder {
            color: #64748b;
            font-weight: 400;
            font-size: 1.05rem;
        }
        .sp-clear-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #94a3b8;
            border-radius: 50%;
            width: 26px;
            height: 26px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            transition: all 0.2s;
        }
        .sp-clear-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }
        .sp-esc-badge {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #94a3b8;
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            user-select: none;
        }

        /* Filter Pills */
        .sp-pills-bar {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.65rem 1.2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            overflow-x: auto;
            white-space: nowrap;
            background: rgba(10, 15, 30, 0.5);
        }
        .sp-pills-bar::-webkit-scrollbar {
            height: 4px;
        }
        .sp-pills-bar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 4px;
        }
        .sp-pill {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #94a3b8;
            padding: 0.35rem 0.85rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            user-select: none;
        }
        .sp-pill:hover {
            color: white;
            border-color: rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.05);
        }
        .sp-pill.active {
            background: #38bdf8;
            border-color: #38bdf8;
            color: #0f172a;
            font-weight: 700;
            box-shadow: 0 2px 10px rgba(56, 189, 248, 0.35);
        }

        /* Results List */
        .sp-results-list {
            flex: 1;
            overflow-y: auto;
            padding: 0.6rem 0.8rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .sp-results-list::-webkit-scrollbar {
            width: 6px;
        }
        .sp-results-list::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.18);
            border-radius: 6px;
        }

        /* Single Result Card */
        .sp-item-card {
            background: rgba(30, 41, 59, 0.45);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 0.9rem 1.1rem;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            position: relative;
        }
        .sp-item-card:hover, .sp-item-card.selected {
            background: rgba(56, 189, 248, 0.12);
            border-color: #38bdf8;
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        }

        .sp-item-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.8rem;
        }
        .sp-item-title-wrap {
            display: flex;
            align-items: baseline;
            gap: 0.6rem;
            flex-wrap: wrap;
        }
        .sp-item-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: #f8fafc;
        }
        .sp-item-forms {
            font-size: 0.82rem;
            color: #94a3b8;
            font-weight: 500;
        }

        .sp-badges-wrap {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            flex-shrink: 0;
        }
        .sp-class-badge {
            font-size: 0.72rem;
            font-weight: 700;
            padding: 0.2rem 0.55rem;
            border-radius: 12px;
            border: 1px solid;
            letter-spacing: 0.3px;
        }
        .sp-location-badge {
            font-size: 0.72rem;
            color: #64748b;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.04);
            padding: 0.2rem 0.5rem;
            border-radius: 8px;
        }

        .sp-item-details {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.8rem;
            flex-wrap: wrap;
        }
        .sp-item-trans {
            font-size: 0.88rem;
            color: #38bdf8;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.35rem;
        }
        .sp-item-sentence {
            font-size: 0.84rem;
            color: #cbd5e1;
            font-style: italic;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .sp-item-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.2rem;
            padding-top: 0.4rem;
            border-top: 1px dashed rgba(255, 255, 255, 0.08);
        }
        .sp-action-btn {
            background: rgba(255, 255, 255, 0.07);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #e2e8f0;
            padding: 0.3rem 0.75rem;
            border-radius: 8px;
            font-size: 0.78rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
        }
        .sp-action-btn:hover {
            background: rgba(56, 189, 248, 0.25);
            border-color: #38bdf8;
            color: white;
        }
        .sp-action-btn.primary {
            background: #38bdf8;
            color: #0f172a;
            border-color: #38bdf8;
        }
        .sp-action-btn.primary:hover {
            background: #7dd3fc;
            box-shadow: 0 2px 10px rgba(56, 189, 248, 0.4);
        }

        /* Empty State */
        .sp-empty-state {
            padding: 2.5rem 1.5rem;
            text-align: center;
            color: #94a3b8;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.9rem;
        }
        .sp-empty-icon {
            font-size: 2.2rem;
            opacity: 0.7;
        }
        .sp-empty-title {
            font-size: 1.1rem;
            font-weight: 700;
            color: #f1f5f9;
        }
        .sp-empty-desc {
            font-size: 0.9rem;
            max-width: 440px;
            line-height: 1.5;
            color: #64748b;
        }
        .sp-quick-tags {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.45rem;
            margin-top: 0.5rem;
        }
        .sp-tag-chip {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #cbd5e1;
            padding: 0.35rem 0.75rem;
            border-radius: 14px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .sp-tag-chip:hover {
            background: rgba(56, 189, 248, 0.2);
            border-color: #38bdf8;
            color: white;
        }

        /* Footer */
        .sp-footer {
            padding: 0.75rem 1.3rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(10, 15, 30, 0.6);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.78rem;
            color: #64748b;
        }
        .sp-footer-keys {
            display: flex;
            align-items: center;
            gap: 0.9rem;
        }
        .sp-kbd {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.15rem 0.4rem;
            border-radius: 4px;
            color: #cbd5e1;
            font-family: inherit;
            font-size: 0.72rem;
            font-weight: 700;
        }

        /* Presentation Modal Generic Styles */
        .spotlight-presentation-overlay {
            position: fixed;
            inset: 0;
            background: rgba(8, 12, 24, 0.85);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            z-index: 1000000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            box-sizing: border-box;
            animation: spFadeIn 0.2s ease forwards;
        }
        .sp-pres-modal {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.18);
            border-radius: 24px;
            width: 100%;
            max-width: 580px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 25px 60px rgba(0,0,0,0.7), 0 0 50px rgba(56, 189, 248, 0.2);
            overflow-y: auto;
            animation: spSlideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .sp-pres-header {
            padding: 1.2rem 1.4rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.8rem;
        }
        .sp-pres-badge {
            font-size: 0.8rem;
            font-weight: 800;
            padding: 0.3rem 0.75rem;
            border-radius: 20px;
            border: 1px solid;
            letter-spacing: 0.4px;
        }
        .sp-pres-location {
            font-size: 0.82rem;
            color: #94a3b8;
            font-weight: 600;
        }
        .sp-pres-close {
            background: rgba(255, 255, 255, 0.08);
            border: none;
            color: #94a3b8;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            transition: all 0.2s;
        }
        .sp-pres-close:hover {
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }
        .sp-pres-body {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
        }
        .sp-pres-title-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        .sp-pres-title {
            font-size: 1.85rem;
            font-weight: 900;
            color: #f8fafc;
            margin: 0;
        }
        .sp-pres-tts-btn {
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid #38bdf8;
            color: #38bdf8;
            padding: 0.45rem 1rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .sp-pres-tts-btn:hover {
            background: #38bdf8;
            color: #0f172a;
            transform: scale(1.04);
        }
        .sp-pres-forms-card {
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.85rem 1rem;
            border-radius: 14px;
        }
        .sp-pres-forms-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            font-weight: 800;
            color: #94a3b8;
            letter-spacing: 0.5px;
            display: block;
            margin-bottom: 0.25rem;
        }
        .sp-pres-forms-val {
            font-size: 0.95rem;
            color: #f1f5f9;
            font-weight: 600;
        }
        .sp-pres-section-label {
            font-size: 0.78rem;
            text-transform: uppercase;
            font-weight: 800;
            color: #94a3b8;
            letter-spacing: 0.5px;
            display: block;
            margin-bottom: 0.4rem;
        }
        .sp-pres-meaning-text {
            color: #e2e8f0;
            font-size: 1.05rem;
            line-height: 1.5;
            margin: 0;
        }
        .sp-pres-sentence-card {
            background: rgba(56, 189, 248, 0.08);
            border-left: 4px solid #38bdf8;
            padding: 1rem 1.1rem;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .sp-pres-sentence-quote {
            margin: 0;
            font-size: 1.05rem;
            font-style: italic;
            color: #f8fafc;
            line-height: 1.5;
        }
        .sp-pres-sentence-tts {
            align-self: flex-start;
            background: transparent;
            border: none;
            color: #38bdf8;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            padding: 0;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
        }
        .sp-pres-sentence-tts:hover {
            text-decoration: underline;
        }
        .sp-pres-trans-wrapper {
            margin-top: 0.2rem;
        }
        .sp-pres-reveal-btn {
            width: 100%;
            background: rgba(255, 255, 255, 0.06);
            border: 1px dashed rgba(255, 255, 255, 0.2);
            color: #cbd5e1;
            padding: 0.75rem 1rem;
            border-radius: 12px;
            font-size: 0.92rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        .sp-pres-reveal-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-color: #38bdf8;
        }
        .sp-pres-trans-card {
            background: rgba(30, 41, 59, 0.9);
            border: 1px solid #38bdf8;
            padding: 0.85rem 1.1rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.8rem;
        }
        .sp-pres-trans-label {
            font-size: 0.82rem;
            color: #94a3b8;
            font-weight: 600;
        }
        .sp-pres-trans-value {
            font-size: 1.1rem;
            color: #38bdf8;
            font-weight: 800;
        }
        .sp-pres-actions-footer {
            margin-top: 0.6rem;
        }
        .sp-pres-navigate-btn {
            width: 100%;
            background: #38bdf8;
            border: none;
            color: #0f172a;
            padding: 0.9rem 1.4rem;
            border-radius: 14px;
            font-size: 1.05rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            box-shadow: 0 4px 16px rgba(56, 189, 248, 0.35);
        }
        .sp-pres-navigate-btn:hover {
            background: #7dd3fc;
            transform: translateY(-2px);
            box-shadow: 0 6px 22px rgba(56, 189, 248, 0.5);
        }

        /* Animations */
        @keyframes spFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes spFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes spSlideDown {
            from { transform: translateY(-16px) scale(0.98); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
    `;

    document.head.appendChild(style);
}

function renderResults(container, results, selectedIdx = 0) {
    container.innerHTML = '';
    const currentLang = getLang ? getLang() : 'da';

    if (!results || results.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'sp-empty-state';
        emptyDiv.innerHTML = `
            <div class="sp-empty-icon">🔍</div>
            <div class="sp-empty-title">Ingen ord matcher søgningen</div>
            <div class="sp-empty-desc">
                Prøv at søge på en bøjningsform, et engelsk ord eller et ord fra dit modersmål. Du kan også udforske populære målord:
            </div>
            <div class="sp-quick-tags">
                <span class="sp-tag-chip" data-search="hund">🐕 en hund</span>
                <span class="sp-tag-chip" data-search="køre">🚗 at køre</span>
                <span class="sp-tag-chip" data-search="varm">🔥 varm</span>
                <span class="sp-tag-chip" data-search="altid">⏳ altid</span>
                <span class="sp-tag-chip" data-search="fordi">🟣 fordi</span>
                <span class="sp-tag-chip" data-search="ordstilling">📐 ordstilling</span>
            </div>
        `;

        emptyDiv.querySelectorAll('.sp-tag-chip').forEach(chip => {
            chip.onclick = () => {
                const searchInput = document.getElementById('sp-input-field');
                if (searchInput) {
                    searchInput.value = chip.dataset.search;
                    searchInput.dispatchEvent(new Event('input'));
                    searchInput.focus();
                }
            };
        });

        container.appendChild(emptyDiv);
        return;
    }

    results.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = `sp-item-card ${idx === selectedIdx ? 'selected' : ''}`;
        card.dataset.index = idx;

        // Translation preview in current language
        const trans = item.translations?.[currentLang] || item.translations?.['en'] || '';

        card.innerHTML = `
            <div class="sp-item-top">
                <div class="sp-item-title-wrap">
                    <span class="sp-item-title">${item.icon || ''} ${item.title}</span>
                    ${item.forms ? `<span class="sp-item-forms">(${item.forms})</span>` : ''}
                </div>
                <div class="sp-badges-wrap">
                    <span class="sp-class-badge" style="border-color: ${item.badgeColor || '#38bdf8'}; color: ${item.badgeColor || '#38bdf8'}; background: ${item.badgeColor || '#38bdf8'}18;">
                        ${item.badge || 'Ord'}
                    </span>
                    <span class="sp-location-badge">${item.location || ''}</span>
                </div>
            </div>

            <div class="sp-item-details">
                ${trans ? `<div class="sp-item-trans">🌍 ${trans}</div>` : ''}
                ${item.sentence ? `<div class="sp-item-sentence">"${item.sentence}"</div>` : ''}
            </div>

            <div class="sp-item-actions">
                <button class="sp-action-btn sp-tts-action" title="Lyt til ordet">
                    <span>🔊</span> Lyt
                </button>
                <button class="sp-action-btn sp-pres-action" title="Se ordforklaring, bøjning og illustration">
                    <span>🖼️</span> Målordspræsentation
                </button>
                <button class="sp-action-btn primary sp-goto-action" title="Gå direkte til opgaver og beslægtede ord i dette felt">
                    <span>🚀</span> Gå til træning ➔
                </button>
            </div>
        `;

        // TTS Action
        card.querySelector('.sp-tts-action').onclick = (e) => {
            e.stopPropagation();
            speakDanish(item.baseWord || item.title);
        };

        // Presentation Action
        card.querySelector('.sp-pres-action').onclick = (e) => {
            e.stopPropagation();
            openWordPresentation(item);
        };

        // Goto Action
        card.querySelector('.sp-goto-action').onclick = (e) => {
            e.stopPropagation();
            closeSpotlightModal();
            if (currentNavigate && item.viewTarget) {
                currentNavigate(item.viewTarget, item.extraData || {});
            }
        };

        // Clicking card itself opens presentation or goes to view
        card.onclick = () => {
            openWordPresentation(item);
        };

        container.appendChild(card);
    });

    // Ensure selected card is scrolled into view
    const selectedCard = container.querySelector(`.sp-item-card[data-index="${selectedIdx}"]`);
    if (selectedCard) {
        selectedCard.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}

export function openSpotlightModal() {
    ensureSpotlightStyles();

    const existing = document.querySelector('.spotlight-overlay');
    if (existing) existing.remove();

    activeCategoryFilter = 'all';
    selectedIndex = 0;
    currentResults = searchItems('', activeCategoryFilter);

    const overlay = document.createElement('div');
    overlay.className = 'spotlight-overlay';
    spotlightOverlay = overlay;

    overlay.innerHTML = `
        <div class="spotlight-dialog" role="dialog" aria-modal="true" aria-label="Spotlight Søgning">
            <div class="sp-header">
                <span class="sp-search-icon">🔍</span>
                <input 
                    type="text" 
                    id="sp-input-field" 
                    class="sp-input" 
                    placeholder="søg blandt 500 + ord ...." 
                    autocomplete="off" 
                    autocorrect="off" 
                    spellcheck="false"
                />
                <button class="sp-clear-btn" id="sp-clear-btn" style="display: none;" title="Ryd søgning">✕</button>
                <span class="sp-esc-badge">ESC</span>
            </div>

            <div class="sp-pills-bar">
                <button class="sp-pill active" data-cat="all">Alle</button>
                <button class="sp-pill" data-cat="nouns">🟢 Navneord</button>
                <button class="sp-pill" data-cat="verbs">🔴 Udsagnsord</button>
                <button class="sp-pill" data-cat="adjectives">🟠 Tillægsord</button>
                <button class="sp-pill" data-cat="adverbs">🔵 Biord</button>
                <button class="sp-pill" data-cat="conjunctions">🟣 Bindeord</button>
                <button class="sp-pill" data-cat="grammar">💡 Grammatik</button>
            </div>

            <div class="sp-results-list" id="sp-results-list"></div>

            <div class="sp-footer">
                <div class="sp-footer-keys">
                    <span><span class="sp-kbd">↑</span> <span class="sp-kbd">↓</span> navigér</span>
                    <span><span class="sp-kbd">↵</span> vælg</span>
                    <span><span class="sp-kbd">ESC</span> luk</span>
                </div>
                <span>Over 500 målord og grammatiske emner</span>
            </div>
        </div>
    `;

    const input = overlay.querySelector('#sp-input-field');
    const clearBtn = overlay.querySelector('#sp-clear-btn');
    const resultsContainer = overlay.querySelector('#sp-results-list');
    const pills = overlay.querySelectorAll('.sp-pill');

    function updateSearch() {
        const query = input.value;
        clearBtn.style.display = query ? 'flex' : 'none';
        selectedIndex = 0;
        currentResults = searchItems(query, activeCategoryFilter);
        renderResults(resultsContainer, currentResults, selectedIndex);
    }

    input.oninput = updateSearch;

    clearBtn.onclick = () => {
        input.value = '';
        input.focus();
        updateSearch();
    };

    pills.forEach(pill => {
        pill.onclick = () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeCategoryFilter = pill.dataset.cat;
            updateSearch();
        };
    });

    overlay.onclick = (e) => {
        if (e.target === overlay) {
            closeSpotlightModal();
        }
    };

    // Keyboard navigation within spotlight
    const handleKeydown = (e) => {
        if (!spotlightOverlay) return;

        if (e.key === 'Escape') {
            closeSpotlightModal();
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentResults.length > 0) {
                selectedIndex = (selectedIndex + 1) % currentResults.length;
                renderResults(resultsContainer, currentResults, selectedIndex);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentResults.length > 0) {
                selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
                renderResults(resultsContainer, currentResults, selectedIndex);
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentResults.length > 0 && currentResults[selectedIndex]) {
                const chosen = currentResults[selectedIndex];
                openWordPresentation(chosen);
            }
        }
    };

    window.addEventListener('keydown', handleKeydown);
    overlay._handleKeydown = handleKeydown;

    document.body.appendChild(overlay);
    renderResults(resultsContainer, currentResults, selectedIndex);
    setTimeout(() => input.focus(), 50);
}

export function closeSpotlightModal() {
    if (!spotlightOverlay) return;
    const overlay = spotlightOverlay;
    spotlightOverlay = null;

    if (overlay._handleKeydown) {
        window.removeEventListener('keydown', overlay._handleKeydown);
    }

    overlay.classList.add('sp-fade-out');
    setTimeout(() => overlay.remove(), 160);
}

// Global initialization
export function initSpotlightSearch(navigateFn) {
    currentNavigate = navigateFn;
    ensureSpotlightStyles();

    if (isInitialized || document.getElementById('global-search-btn')) return;
    isInitialized = true;

    // Create discreet top-right trigger button
    const btn = document.createElement('button');
    btn.id = 'global-search-btn';
    btn.className = 'global-search-btn';
    btn.innerHTML = '🔍';
    btn.title = 'Søg efter målord & grammatik (⌘K / Ctrl+K)';
    btn.setAttribute('aria-label', 'Spotlight søgning');

    btn.onclick = (e) => {
        e.stopPropagation();
        if (spotlightOverlay) {
            closeSpotlightModal();
        } else {
            openSpotlightModal();
        }
    };

    document.body.appendChild(btn);

    // Global keyboard shortcut listeners (Cmd+K / Ctrl+K / '/')
    window.addEventListener('keydown', (e) => {
        const isCmdOrCtrl = e.metaKey || e.ctrlKey;
        if (isCmdOrCtrl && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (spotlightOverlay) {
                closeSpotlightModal();
            } else {
                openSpotlightModal();
            }
            return;
        }

        // Pressing '/' opens search if not currently focusing an input/textarea
        if (e.key === '/' && !spotlightOverlay) {
            const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag !== 'input' && activeTag !== 'textarea' && !document.activeElement.isContentEditable) {
                e.preventDefault();
                openSpotlightModal();
            }
        }
    });
}
