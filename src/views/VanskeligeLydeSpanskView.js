import { getLang } from '../utils/i18n.js';

/**
 * VanskeligeLydeSpanskView
 * Komplet pædagogisk udtale-træningsflade til spansktalende (europæisk og latinamerikansk spansk) danskkursister.
 *
 * Fokus på de 5 lyde og lydmønstre, der især giver spansktalende vanskeligheder på dansk:
 *   1. Blødt d – "Ånde på brillerne" (flad tunge bag undertænderne, ikke mellem fortænderne som spansk "cada" [ð])
 *   2. P / T / K med kraftigt pust ("papirtesten") vs. B / D / G (spansk p/t/k mangler pust og lyder som b/d/g!)
 *   3. Kyssemund Y & Ø + rent pustet dansk H (spansk mangler runde fortungevokaler, har stumt h i "hola" og krads [x] i "j")
 *   4. Dansk svælg-R (aldrig rullet tungespids-r som i "perro") & V mod underlæben (aldrig V = B som i "vaca"!)
 *   5. Forlydsklynger sk-/sp-/st- UDEN hjælpevokalen "e-" ("eskole" / "estación"!)
 */
export function renderVanskeligeLydeSpanskView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    function handleBackToMain() {
        if (typeof navigateFn === 'function') {
            navigateFn('main');
        } else {
            const lang = getLang() || 'es';
            window.location.hash = `#/${lang}/main`;
        }
    }

    function handleBackToMSS() {
        if (typeof navigateFn === 'function') {
            navigateFn('mit_sprog_sammenlignet');
        } else {
            const lang = getLang() || 'es';
            window.location.hash = `#/${lang}/mit_sprog_sammenlignet`;
        }
    }

    function showCopyToast(msg) {
        let toast = document.querySelector('#vles-copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'vles-copy-toast';
            toast.style.cssText = `
                position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
                background: linear-gradient(135deg, #0284c7, #0369a1); color: #ffffff;
                padding: 0.75rem 1.4rem; border-radius: 9999px; font-weight: 800;
                font-size: 0.92rem; box-shadow: 0 10px 25px rgba(0,0,0,0.45);
                z-index: 10000; display: flex; align-items: center; gap: 0.5rem;
                pointer-events: none; transition: all 0.25s ease;
            `;
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(12px)';
        }, 3200);
    }

    function copyToClipboard(text, label = 'Lektie-link') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyToast(`📋 ${label} kopieret (¡copiado!)`);
            }).catch(() => fallbackCopy(text, label));
        } else {
            fallbackCopy(text, label);
        }
    }

    function fallbackCopy(text, label) {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        try { document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(input);
        showCopyToast(`📋 ${label} kopieret (¡copiado!)`);
    }

    const VALID_MODULES = ['bloedt_d', 'p_t_k_pust', 'y_og_oe_og_h', 'dansk_r_og_v', 'klynger_uden_e'];
    const VALID_TABS = ['principles', 'pairs', 'speech'];

    let initialModuleId = 'bloedt_d';
    let initialTab = 'principles';

    const subPathStr = extraData.subPath || '';
    if (subPathStr) {
        const parts = subPathStr.split('/').filter(Boolean);
        if (parts[0] && VALID_MODULES.includes(parts[0])) initialModuleId = parts[0];
        if (parts[1] && VALID_TABS.includes(parts[1])) initialTab = parts[1];
    } else {
        try {
            const rawHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
            const segs = rawHash.split('/');
            const idx = segs.findIndex(s => s === 'vanskelige_lyde_spansk' || s === 'spanske_lyde');
            if (idx !== -1) {
                if (segs[idx + 1] && VALID_MODULES.includes(segs[idx + 1])) initialModuleId = segs[idx + 1];
                if (segs[idx + 2] && VALID_TABS.includes(segs[idx + 2])) initialTab = segs[idx + 2];
            }
        } catch (_) {}
    }

    let activeModuleId = initialModuleId;
    let activeTarget = 'a';
    let activeTab = initialTab;
    let pairQuizIdx = 0;
    let pairScore = 0;
    let speechExerciseIdx = 0;
    let isSpeechRecording = false;
    let consecutiveSpeechStreak = 0;

    function syncUrl(replace = false) {
        const lang = getLang() || 'es';
        const newHash = `#/${lang}/vanskelige_lyde_spansk/${activeModuleId}/${activeTab}`;
        if (window.location.hash !== newHash) {
            if (replace) history.replaceState(null, '', newHash);
            else history.pushState(null, '', newHash);
        }
    }

    function playAudio(text, rate = 0.85) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'da-DK';
        utter.rate = rate;
        window.speechSynthesis.speak(utter);
    }

    const viewContainer = document.createElement('div');
    viewContainer.className = 'vles-wrapper';

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .vles-wrapper {
            max-width: 1040px;
            margin: 0 auto;
            padding: 1.25rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        .vles-top-bar {
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.35rem;
            padding-bottom: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .vles-btn {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(30,41,59,0.86); border: 1px solid rgba(148,163,184,0.35);
            color: #f8fafc; padding: 0.52rem 1rem; border-radius: 11px;
            font-weight: 800; font-size: 0.86rem; cursor: pointer; transition: all 0.16s ease;
        }
        .vles-btn:hover { border-color: #38bdf8; transform: translateY(-1px); }
        .vles-hero { text-align: center; margin-bottom: 1.5rem; }
        .vles-hero-kicker {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(250,204,21,0.14); border: 1px solid rgba(250,204,21,0.45);
            color: #fde047; padding: 0.35rem 0.95rem; border-radius: 999px;
            font-size: 0.8rem; font-weight: 800; margin-bottom: 0.6rem;
        }
        .vles-hero h1 { margin: 0 0 0.45rem; font-size: 1.85rem; font-weight: 900; color: #fff; }
        .vles-hero p { margin: 0 auto; max-width: 720px; color: #cbd5e1; font-size: 0.94rem; line-height: 1.5; }
        .vles-mod-nav {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.1rem;
        }
        .vles-mod-pill {
            padding: 0.58rem 0.95rem; border-radius: 12px;
            border: 1.5px solid rgba(255,255,255,0.16); background: rgba(15,23,42,0.78);
            color: #e2e8f0; font-weight: 800; font-size: 0.84rem; cursor: pointer;
            transition: all 0.16s ease; text-align: left;
        }
        .vles-mod-pill.active {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border-color: #7dd3fc; color: #ffffff; box-shadow: 0 6px 18px rgba(56,189,248,0.28);
        }
        .vles-subtabs {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.35rem;
        }
        .vles-subtab {
            padding: 0.55rem 1.05rem; border-radius: 10px;
            border: 1.5px solid rgba(148,163,184,0.28); background: rgba(30,41,59,0.72);
            color: #cbd5e1; font-weight: 800; font-size: 0.85rem; cursor: pointer;
        }
        .vles-subtab.active {
            border-color: #fde047; background: rgba(250,204,21,0.18); color: #fef08a;
        }
        .vles-card {
            background: rgba(15,23,42,0.9); border: 1.5px solid rgba(148,163,184,0.26);
            border-radius: 18px; padding: 1.25rem 1.35rem; margin-bottom: 1.15rem;
            box-shadow: 0 10px 26px rgba(0,0,0,0.32);
        }
        .vles-diag-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem; margin: 1rem 0;
        }
        .vles-svg-box {
            background: #070d19; border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px; padding: 0.75rem; min-height: 165px;
            display: flex; align-items: center; justify-content: center;
        }
        .vles-pair-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.85rem; margin: 1.1rem 0;
        }
        .vles-pair-btn {
            background: rgba(30,41,59,0.88); border: 2px solid rgba(148,163,184,0.32);
            border-radius: 14px; padding: 1.05rem; cursor: pointer; text-align: center;
            color: #f8fafc; transition: all 0.16s ease;
        }
        .vles-pair-btn:hover:not(:disabled) { border-color: #38bdf8; transform: translateY(-2px); }
        .vles-listen-big {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: 1.5px solid #38bdf8; color: #fff; font-size: 1.05rem; font-weight: 900;
            padding: 0.8rem 1.6rem; border-radius: 14px; cursor: pointer;
            display: inline-flex; align-items: center; gap: 0.5rem; margin: 0.75rem 0;
        }
        .vles-modal-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
            z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;
        }
        .vles-modal-card {
            background: #0f172a; border: 2px solid #38bdf8; border-radius: 18px;
            max-width: 680px; width: 100%; max-height: 86vh; overflow-y: auto; padding: 1.25rem;
        }
        @media (max-width: 600px) {
            .vles-hero h1 { font-size: 1.45rem; }
            .vles-card { padding: 1rem; }
        }
    `;
    viewContainer.appendChild(styleEl);

    const SOUND_MODULES = [
        {
            id: 'bloedt_d',
            badge: 'Foco 1',
            titleDa: '1. Blødt d – "Ånde på brillerne"',
            titleEs: '1. La «d» suave danesa — «Echar vaho a las gafas»',
            descDa: 'Spansk kender et blødt [ð] mellem vokaler ("cada, nada"), men det sidder på bagsiden af fortænderne. Dansk blødt d (brød, mad, gade) har tungespidsen helt fladt bag undertænderne som en blød udånding uden tandkontakt.',
            descEs: 'En español conocemos una «d» suave entre vocales (como en <em>cada, nada</em>), pero ahí la lengua toca suavemente los dientes superiores. En la <strong>«d» suave danesa</strong> (<em>mad, brød, gade</em>), la punta de la lengua descansa completamente relajada <strong>detrás de los dientes de abajo</strong> mientras expulsas aire tibio, ¡como al echar vaho para limpiar unas gafas!',
            optA: { label: '🇩🇰 d suave (brød, mad)', ex: 'brød, mad, sød, gade', words: ['brød', 'mad', 'sød', 'gade'] },
            optB: { label: '🇪🇸 Trampa: «d» firme o «t»', ex: 'dag (d firme solo al principio)', words: ['dag', 'dør', 'dansk'] },
            trickEs: '<strong>Regla de oro:</strong> Al comienzo de palabra (<em><strong>d</strong>ag, <strong>d</strong>ansk</em>), la «d» es firme. Pero en medio o al final (<em>ma<strong>d</strong>, brø<strong>d</strong>, sø<strong>d</strong></em>), baja la lengua detrás de los dientes inferiores y deja salir vaho tibio — ¡nunca la muerdas ni la conviertas en «t»!',
            diagTitleA: 'd suave (mad, brød): lengua baja y relajada, aire tibio sin bloqueo',
            diagTitleB: 'Trampa: la lengua sube y toca los dientes superiores [d/t]!',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="96" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 115 Q 112 108 75 112" fill="none" stroke="#22c55e" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 86 Q 72 86 32 82" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="5,4"/>
                    <text x="120" y="62" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">Vaho tibio (como en unas gafas)</text>
                    <text x="120" y="138" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">¡Lengua plana tras los dientes de abajo!</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="66" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 110 Q 112 95 72 78" fill="none" stroke="#ef4444" stroke-width="7" stroke-linecap="round"/>
                    <line x1="56" y1="68" x2="56" y2="95" stroke="#fde047" stroke-width="3"/>
                    <text x="120" y="48" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">¡La lengua subió y bloqueó el aire!</text>
                </svg>`,
            minimalPairs: [
                { a: 'mad', b: 'mat', meanA: 'comida (d suave)', meanB: 'mate / sin brillo (t seca)', ctxA: 'Vi laver mad i køkkenet.', ctxB: 'Farven er helt mat.' },
                { a: 'glad', b: 'glat', meanA: 'contento (d suave)', meanB: 'resbaladizo / liso (t seca)', ctxA: 'Jeg er meget glad i dag.', ctxB: 'Vejen er glat af is.' },
                { a: 'bad', b: 'bat', meanA: 'baño / ducha (d suave)', meanB: 'bate / raqueta (t seca)', ctxA: 'Jeg tager et varmt bad.', ctxB: 'Han spiller med et rødt bat.' },
                { a: 'sød', b: 'sæt', meanA: 'dulce / amable (d suave)', meanB: 'pon / frase (t seca)', ctxA: 'Kagen er meget sød.', ctxB: 'Sæt dig ned her.' }
            ],
            speechExercises: [
                { text: 'Jeg spiser godt brød og sød mad.', targetWords: ['godt', 'brød', 'sød', 'mad'], hintDa: 'Hold tungen fladt bag undertænderne ved brød, sød, mad.', hintEs: 'Mantén la lengua plana tras los dientes de abajo en brød, sød y mad.' },
                { text: 'Gaden er bred og flad.', targetWords: ['gaden', 'bred', 'flad'], hintDa: 'Ånd blødt ud i "gaden", "bred", "flad".', hintEs: 'Suelta aire suave en gaden, bred y flad sin golpear el paladar.' }
            ]
        },
        {
            id: 'p_t_k_pust',
            badge: 'Foco 2',
            titleDa: '2. P / T / K med pust ("Papirtesten") vs. B / D / G',
            titleEs: '2. Soplo fuerte en P / T / K («Prueba del papel») vs. B / D / G',
            descDa: 'Spansk P, T, K ("pelo, todo, casa") har nul pust — derfor lyder de for danske ører præcis som B, D, G! Dansk B, D, G er helt ustemte i forlyd; det eneste, der adskiller P/T/K fra B/D/G, er et kraftigt pust af luft.',
            descEs: 'En español, <strong>P, T, K</strong> salen sin casi aire (<em>pelo, todo, casa</em>). En danés, ¡<strong>B, D, G</strong> al inicio NO vibran en la garganta! La única diferencia que separa P/T/K de B/D/G es un <strong>soplo fuerte de aire</strong>. Si dices <em>pære, tale, kaffe</em> con P/T/K suaves españolas, ¡un danés escuchará <em>bære, dale, gaffe</em>!',
            optA: { label: '💨 Con soplo fuerte: P, T, K', ex: 'pære, pande, tale, kaffe', words: ['pære', 'pande', 'tale', 'kaffe'] },
            optB: { label: '🤫 Sin soplo: B, D, G', ex: 'bære, bande, dale, gade', words: ['bære', 'bande', 'dale', 'gade'] },
            trickEs: '<strong>La prueba del papel:</strong> Sostén una hoja de papel a 3 cm de tu boca. Al decir <em><strong>p</strong>ære, <strong>t</strong>ale, <strong>k</strong>old</em>, el golpe de aire debe mover el papel! Con <em><strong>b</strong>ære, <strong>d</strong>ale, <strong>g</strong>ade</em>, el papel queda totalmente quieto.',
            diagTitleA: 'P, T, K iniciales: ¡ráfaga fuerte de aire que empuja el papel!',
            diagTitleB: 'B, D, G iniciales: tranquilos y sin soplo — el papel ni se mueve',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="8" ry="6" fill="#ef4444"/>
                    <path d="M 45 84 L 18 70 M 45 84 L 14 84 M 45 84 L 18 98" stroke="#fde047" stroke-width="3.5" stroke-linecap="round"/>
                    <path d="M 10 45 Q 2 84 22 122" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                    <text x="155" y="75" text-anchor="middle" fill="#fde047" font-size="11" font-weight="bold">¡El aire empuja el papel!</text>
                    <text x="155" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">pære • tale • kaffe</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="7" ry="5" fill="#38bdf8"/>
                    <line x1="16" y1="45" x2="16" y2="120" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
                    <text x="155" y="75" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">Sin soplo — papel inmóvil</text>
                    <text x="155" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">bære • dale • gade</text>
                </svg>`,
            minimalPairs: [
                { a: 'pære', b: 'bære', meanA: 'pera / bombilla (P con soplo)', meanB: 'cargar / llevar (B sin aire)', ctxA: 'Jeg spiser en sød pære.', ctxB: 'Kan du bære tasken?' },
                { a: 'pande', b: 'bande', meanA: 'sartén / frente (P fuerte)', meanB: 'pandilla / maldecir (B suave)', ctxA: 'Steg æg på en varm pande.', ctxB: 'Man må ikke bande her.' },
                { a: 'tale', b: 'dale', meanA: 'hablar / discurso (T con soplo)', meanB: 'valles / bajar (D suave)', ctxA: 'Vi skal tale dansk i dag.', ctxB: 'Priserne kan dale lidt.' },
                { a: 'kold', b: 'gold', meanA: 'frío (K con soplo)', meanB: 'estéril / árido (G sin aire)', ctxA: 'Vinteren er meget kold.', ctxB: 'Jorden er helt gold.' }
            ],
            speechExercises: [
                { text: 'Pigen køber kold kaffe og en pære.', targetWords: ['pigen', 'køber', 'kold', 'kaffe', 'pære'], hintDa: 'Lav tydeligt pust på alle P- og K-ord!', hintEs: '¡Suelta una buena ráfaga de aire en cada P y K!' },
                { text: 'Taler du tit med venner på torvet?', targetWords: ['taler', 'tit', 'torvet'], hintDa: 'Skub tydeligt luft ud på taler, tit, torvet.', hintEs: '¡Empuja aire firme con cada T en taler, tit y torvet!' }
            ]
        },
        {
            id: 'y_og_oe_og_h',
            badge: 'Foco 3',
            titleDa: '3. Kyssemund Y & Ø + aktivt dansk H (aldrig stumt)',
            titleEs: '3. Vocales con besito (Y / Ø) y la «H» danesa con aire (¡no muda!)',
            descDa: 'Spansk har kun 5 rene vokaler (a, e, i, o, u) og mangler runde fortungevokaler (Y, Ø). Desuden er spansk H altid stumt ("hola, hoy"), mens dansk H (hej, hus) skal pustes tydeligt (men blødt, aldrig som spansk "j"!).',
            descEs: 'Dos secretos que cambian tu acento al instante:<br>1) <strong>Vocales redondeadas Y &amp; Ø:</strong> El español solo tiene 5 vocales (<em>a, e, i, o, u</em>). Para hacer <strong>y</strong> (<em>lys</em>) o <strong>ø</strong> (<em>brød</em>), pon la lengua en posición de «i» o «e», ¡pero forma un <strong>besito firme</strong> con los labios! Si relajas los labios, <em>lys</em> (luz) suena como el nombre femenino <em>Lis</em>.<br>2) <strong>La «H» danesa siempre suena (<em>hej, hus, have</em>):</strong> En español la «h» es muda (<em>hola, hoy</em>). En danés debes soltar aire suave al inicio (como una «j» muy suavecita sin raspar la garganta) — ¡salvo antes de v/j (<em>hvad, hjerte</em>)!',
            optA: { label: '💋 Besito Y/Ø & H con aire', ex: 'lys, brød, hej, hus', words: ['lys', 'ny', 'brød', 'hej', 'hus'] },
            optB: { label: '😊 Planas I/E & hv- mudo', ex: 'lis, bred, hvad, hvor', words: ['lis', 'ni', 'bred', 'hvad', 'hvor'] },
            trickEs: '<strong>Truco en 2 pasos:</strong> Di una «iiii...» larga y, sin mover la lengua, cierra los labios en forma de beso ➔ ¡sale la <strong>Y</strong> danesa! Haz lo mismo empezando por «eeee...» ➔ ¡sale la <strong>Ø</strong>! Y en <em>hej</em> / <em>hus</em>, nunca dejes muda la H.',
            diagTitleA: 'Y & Ø: lengua adelante + labios redondeados hacia fuera',
            diagTitleB: 'I & E: labios estirados hacia los lados como una sonrisa',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="120" cy="78" r="34" fill="none" stroke="#f59e0b" stroke-width="4"/>
                    <circle cx="120" cy="78" r="14" fill="#ef4444" opacity="0.85"/>
                    <text x="120" y="30" text-anchor="middle" fill="#fde047" font-size="11" font-weight="bold">Y &amp; Ø: ¡Labios en besito firme!</text>
                    <text x="120" y="138" text-anchor="middle" fill="#cbd5e1" font-size="11">lys • ny • brød • døren</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <ellipse cx="120" cy="78" rx="52" ry="18" fill="none" stroke="#38bdf8" stroke-width="4"/>
                    <line x1="80" y1="78" x2="160" y2="78" stroke="#7dd3fc" stroke-width="3"/>
                    <text x="120" y="30" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">I &amp; E: Labios estirados (sonrisa)</text>
                    <text x="120" y="138" text-anchor="middle" fill="#cbd5e1" font-size="11">Lis • ni • bred • der</text>
                </svg>`,
            minimalPairs: [
                { a: 'lys', b: 'lis', meanA: 'luz / vela (Y con besito)', meanB: 'nombre Lis (I plana)', ctxA: 'Vi tænder stearinlys i stuen.', ctxB: 'Min veninde hedder Lis.' },
                { a: 'brød', b: 'bred', meanA: 'pan (Ø con besito)', meanB: 'ancho (E plana)', ctxA: 'Jeg køber frisk brød.', ctxB: 'Vejen er meget bred.' },
                { a: 'hus', b: 'us', meanA: 'casa (con H soplada al inicio)', meanB: 'sin H inicial', ctxA: 'Vi bor i et stort hus.', ctxB: 'En danés, la H de hus siempre suena.' },
                { a: 'dør', b: 'der', meanA: 'puerta (Ø con besito)', meanB: 'allí (E plana)', ctxA: 'Luk den hvide dør.', ctxB: 'Der står en stol.' }
            ],
            speechExercises: [
                { text: 'Hej! Vi har et nyt lyst hus med en ny dør.', targetWords: ['hej', 'nyt', 'lyst', 'hus', 'ny', 'dør'], hintDa: 'Tydeligt blødt pust på H i hej/hus og stram kyssemund på nyt/lyst/ny/dør.', hintEs: '¡Suelta aire en la H de hej/hus y mantén el besito en nyt, lyst, ny y dør!' }
            ]
        },
        {
            id: 'dansk_r_og_v',
            badge: 'Foco 4',
            titleDa: '4. Svælg-R (ikke rullet [r]) & V mod underlæben (ikke = B)',
            titleEs: '4. «R» de garganta (sin vibrar la lengua) y «V» con dientes (¡no = B!)',
            descDa: 'Spansk ruller r/rr med tungespidsen ("perro, pero") og udtaler ofte B og V ens ("vaca = baca"). På dansk dannes R dybt i svælget (som en krage) og smelter væk sidst i ordet (mor, spiser). Og ved V SKAL overfortænderne røre let ved underlæben!',
            descEs: 'Dos costumbres españolas que hay que cambiar en danés:<br>1) <strong>La «R» danesa (<em>rød, ris</em>):</strong> En español vibramos la punta de la lengua (<em>perro, pero</em>). En danés, la punta queda totalmente quieta abajo; la R nace muy atrás en la garganta (como una gárgara suave), ¡y al final de palabra (<em>mor, spiser</em>) se funde en una vocal abierta!<br>2) <strong>La «V» vs. «B» (<em>vi / bi, vin / bin</em>):</strong> En español B y V suenan casi igual (<em>vaca = baca</em>). En danés, para la <strong>V</strong> los dientes superiores deben tocar suavemente el labio inferior!',
            optA: { label: '🦅 R de garganta & V con dientes', ex: 'rød, ris, vin, varm', words: ['rød', 'ris', 'vin', 'varm'] },
            optB: { label: '🌊 R final derretida & B labial', ex: 'mor, spiser, bil, bog', words: ['mor', 'spiser', 'bil', 'bog'] },
            trickEs: '<strong>Truco inmediato:</strong> Al decir <em><strong>v</strong>i, <strong>v</strong>in, <strong>v</strong>arm</em>, apoya los dientes de arriba sobre el labio inferior (como una F con voz). Y en <em>mo<strong>r</strong>, spise<strong>r</strong></em>, ¡no pronuncies ninguna R española vibrante al final!',
            diagTitleA: 'R inicial: atrás en la garganta (y V con dientes sobre el labio inferior)',
            diagTitleB: 'R final (mor, spiser): no vibra — termina suavemente en vocal abierta',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 162 125 Q 152 80 120 82 Q 85 95 72 110" fill="none" stroke="#f472b6" stroke-width="7" stroke-linecap="round"/>
                    <circle cx="152" cy="76" r="14" fill="rgba(239,68,68,0.28)" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,2"/>
                    <text x="108" y="48" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">¡R atrás en la garganta (rød, ris)!</text>
                    <text x="108" y="138" text-anchor="middle" fill="#94a3b8" font-size="10">La punta de la lengua NO vibra</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 155 118 Q 115 112 75 112" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 85 Q 75 88 35 88" fill="none" stroke="#4ade80" stroke-width="3.5" stroke-linecap="round"/>
                    <text x="115" y="55" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">mor ← ¡La R final se derrite en vocal!</text>
                </svg>`,
            minimalPairs: [
                { a: 'vi', b: 'bi', meanA: 'nosotros (V con dientes en labio)', meanB: 'abeja (B con los dos labios)', ctxA: 'Vi spiser brød sammen.', ctxB: 'En lille bi flyver i haven.' },
                { a: 'varm', b: 'barm', meanA: 'caliente (V con dientes)', meanB: 'pecho / seno (B con dos labios)', ctxA: 'Kaffen er dejlig varm.', ctxB: 'Dientes arriba sobre labio inferior en V.' },
                { a: 'ris', b: 'is', meanA: 'arroz (R profunda en garganta)', meanB: 'hielo / helado', ctxA: 'Vi spiser ris til aftensmad.', ctxB: 'Børnene spiser en stor is.' }
            ],
            speechExercises: [
                { text: 'Mor drikker varm rød vin i vores bil.', targetWords: ['mor', 'varm', 'rød', 'vin', 'bil'], hintDa: 'Rør underlæben med tænderne i varm/vin, svælg-r i rød, begge læber i bil!', hintEs: 'Dientes en labio para varm/vin, R de garganta en rød, dos labios en bil, y R final suave en mor!' }
            ]
        },
        {
            id: 'klynger_uden_e',
            badge: 'Foco 5',
            titleDa: '5. Klynger (sk-, sp-, st-) uden "es-" + klare slutkonsonanter',
            titleEs: '5. Grupos sk-, sp-, st- sin «e-» al inicio (*eskole) y finales limpios',
            descDa: 'På spansk findes der ingen ord, som begynder med sk-, sp-, st- ("escuela, España, estación"), så spansktalende sætter let et ekstra "e-" foran: "*eskole, *espiser, *estor"! Desuden må slut-d, slut-t og slut-s ikke falde væk.',
            descEs: 'En español, ninguna palabra empieza con <em>s + consonante</em> (decimos <em>escuela, España, estación</em>). Por eso casi todos ponen sin querer una «e-» delante al hablar danés: *<em>eskole</em>, *<em>espiser</em>, *<em>estor</em>. ¡Ese error suena inmediato! Empieza directamente con el silbido de la serpiente: <strong>ssss-kole</strong>!',
            optA: { label: '🐍 Directo sss- sin «e-»', ex: 'skole, spiser, stor, stol', words: ['skole', 'spiser', 'stor', 'stol'] },
            optB: { label: '🚫 Trampa: poner «es-» (*eskole)', ex: 'stue, skib, spørg, station', words: ['stue', 'skib', 'spørg', 'station'] },
            trickEs: '<strong>Ejercicio de 3 segundos:</strong> Alarga la S como una serpiente (<em>ssssss...</em>) y pega enseguida el resto de la palabra sin poner ninguna vocal antes: <em>ssss-kole</em>, <em>ssss-piser</em>, <em>ssss-tor</em>. ¡Cero «e»!',
            diagTitleA: 'sk-, sp-, st- directo en la S sin vocal delante (sss-kole)',
            diagTitleB: 'Trampa española: meter una «e-» delante (*eskole, *espiser)',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 35 76 L 90 76" stroke="#4ade80" stroke-width="5" stroke-linecap="round"/>
                    <circle cx="155" cy="76" r="28" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="3"/>
                    <text x="63" y="56" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="bold">sssss-</text>
                    <text x="155" y="81" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">kole</text>
                    <text x="120" y="135" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">¡Directo en la S, cero «e-» delante!</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="120" cy="76" r="24" fill="none" stroke="#ef4444" stroke-width="5"/>
                    <text x="120" y="30" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">Trampa: *eskole, *espiser, *estor</text>
                    <text x="120" y="134" text-anchor="middle" fill="#94a3b8" font-size="11">¡Nunca añadas «e-» antes de sk-, sp-, st-!</text>
                </svg>`,
            minimalPairs: [
                { a: 'skole', b: 'kole', meanA: 'escuela (directo sss-kole, sin «e-»)', meanB: 'sin la S inicial', ctxA: 'Børnene går i skole.', ctxB: '¡Nunca digas «eskole»!' },
                { a: 'spis', b: 'is', meanA: '¡come! (directo sss-pis)', meanB: 'helado / hielo', ctxA: 'Spis nu din mad!', ctxB: 'Empieza en S, sin «espis».' },
                { a: 'stor', b: 'tor', meanA: 'grande (directo sss-tor)', meanB: 'sin la S inicial', ctxA: 'Vi bor i en stor by.', ctxB: 'Empieza en S, sin «estor».' }
            ],
            speechExercises: [
                { text: 'Vi spiser i en stor skole på en stol.', targetWords: ['spiser', 'stor', 'skole', 'stol'], hintDa: 'Start direkte med sss- i spiser, stor, skole og stol uden ekstra "e-"!', hintEs: '¡Empieza directo con sss- en spiser, stor, skole y stol (cero «e-» antes)!' }
            ]
        }
    ];

    function openHomeworkModal() {
        const existing = document.querySelector('#vles-hw-modal');
        if (existing) existing.remove();
        const overlay = document.createElement('div');
        overlay.id = 'vles-hw-modal';
        overlay.className = 'vles-modal-overlay';
        const isDa = getLang() === 'da';
        const tabLabels = {
            principles: isDa ? '1. Boca y reglas (Teori)' : '1. Boca y reglas',
            pairs: isDa ? '2. Quiz auditivo (Lyttequiz)' : '2. Quiz auditivo',
            speech: isDa ? '3. Práctica de micrófono (Udtale)' : '3. Práctica de micrófono'
        };
        overlay.innerHTML = `
            <div class="vles-modal-card">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:1px solid rgba(255,255,255,0.12);">
                    <div>
                        <div style="font-size:0.74rem; font-weight:900; color:#38bdf8; text-transform:uppercase;">📚 Enlaces de tarea • Español</div>
                        <h2 style="margin:0.15rem 0 0; font-size:1.2rem; color:#fff;">${isDa ? 'Direkte links til alle 5 fokuslyde' : 'Enlaces directos a los 5 sonidos clave'}</h2>
                    </div>
                    <button type="button" class="vles-btn" id="vles-hw-close">✕ Cerrar</button>
                </div>
                <div style="display:flex; flex-direction:column; gap:0.9rem;">
                    ${SOUND_MODULES.map(m => `
                        <div style="background:rgba(30,41,59,0.75); border:1px solid rgba(148,163,184,0.25); border-radius:12px; padding:0.85rem;">
                            <div style="font-weight:800; color:#fde047; margin-bottom:0.5rem;">${m.titleEs}${isDa ? ` <span style="color:#94a3b8; font-size:0.82rem;">(${m.titleDa})</span>` : ''}</div>
                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                ${VALID_TABS.map(tid => {
                                    const url = `${window.location.origin}${window.location.pathname}#/${getLang() || 'es'}/vanskelige_lyde_spansk/${m.id}/${tid}`;
                                    return `
                                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap; background:rgba(15,23,42,0.7); padding:0.45rem 0.7rem; border-radius:8px;">
                                            <span style="font-size:0.82rem; color:#e2e8f0;">${tabLabels[tid]}</span>
                                            <button type="button" class="vles-btn" data-copy-url="${url}" style="padding:0.3rem 0.7rem; font-size:0.78rem; border-color:#38bdf8;">📋 Copiar</button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        overlay.querySelector('#vles-hw-close').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        overlay.querySelectorAll('[data-copy-url]').forEach(b => {
            b.onclick = () => copyToClipboard(b.dataset.copyUrl, isDa ? 'Lektie-link' : 'Enlace de ejercicio');
        });
        document.body.appendChild(overlay);
    }

    function renderView() {
        syncUrl(true);
        const isDa = getLang() === 'da';
        const modData = SOUND_MODULES.find(m => m.id === activeModuleId) || SOUND_MODULES[0];
        viewContainer.innerHTML = '';
        viewContainer.appendChild(styleEl);

        const topBar = document.createElement('div');
        topBar.className = 'vles-top-bar';
        topBar.innerHTML = `
            <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                <button type="button" class="vles-btn" id="vles-back-main">${isDa ? '← Inicio (Forside)' : '← Inicio'}</button>
                <button type="button" class="vles-btn" id="vles-back-mss" style="border-color:#38bdf8; color:#7dd3fc;">🇪🇸 Volver a «Mi idioma vs. danés»</button>
            </div>
            <button type="button" class="vles-btn" id="vles-hw-btn" style="border-color:#fde047; color:#fde047;">${isDa ? '📋 Enlaces de tarea (Lektier)' : '📋 Enlaces de tarea'}</button>
        `;
        topBar.querySelector('#vles-back-main').onclick = handleBackToMain;
        topBar.querySelector('#vles-back-mss').onclick = handleBackToMSS;
        topBar.querySelector('#vles-hw-btn').onclick = openHomeworkModal;
        viewContainer.appendChild(topBar);

        const hero = document.createElement('div');
        hero.className = 'vles-hero';
        hero.innerHTML = `
            <div class="vles-hero-kicker">${isDa ? '🇪🇸 Entrenamiento especial de pronunciación danesa para hispanohablantes • Nivel 2 (Trin 2)' : '🇪🇸 Entrenamiento especial de pronunciación danesa para hispanohablantes • Nivel 2'}</div>
            <h1>${modData.titleEs}</h1>
            <p>${isDa ? `${modData.titleDa} — ` : ''}Posición de boca y lengua, contraste auditivo y práctica con micrófono</p>
        `;
        viewContainer.appendChild(hero);

        const modNav = document.createElement('div');
        modNav.className = 'vles-mod-nav';
        SOUND_MODULES.forEach(m => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `vles-mod-pill ${m.id === activeModuleId ? 'active' : ''}`;
            btn.textContent = isDa
                ? `${m.badge}: ${m.titleDa.replace(/^\d+\.\s*/, '')}`
                : `${m.badge}: ${m.titleEs.replace(/^\d+\.\s*/, '')}`;
            btn.onclick = () => {
                activeModuleId = m.id;
                activeTarget = 'a';
                pairQuizIdx = 0;
                pairScore = 0;
                speechExerciseIdx = 0;
                consecutiveSpeechStreak = 0;
                renderView();
            };
            modNav.appendChild(btn);
        });
        viewContainer.appendChild(modNav);

        const subTabs = document.createElement('div');
        subTabs.className = 'vles-subtabs';
        [
            { id: 'principles', label: isDa ? '1. Boca y reglas (Teori)' : '1. Boca y reglas' },
            { id: 'pairs', label: isDa ? '2. Pares mínimos (Lyttequiz)' : '2. Pares mínimos' },
            { id: 'speech', label: isDa ? '3. Práctica oral (Udtale)' : '3. Práctica oral' }
        ].forEach(st => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = `vles-subtab ${st.id === activeTab ? 'active' : ''}`;
            b.textContent = st.label;
            b.onclick = () => { activeTab = st.id; renderView(); };
            subTabs.appendChild(b);
        });
        viewContainer.appendChild(subTabs);

        const content = document.createElement('div');
        viewContainer.appendChild(content);

        if (activeTab === 'principles') {
            const card = document.createElement('div');
            card.className = 'vles-card';
            const opt = activeTarget === 'a' ? modData.optA : modData.optB;
            card.innerHTML = `
                <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:1rem;">
                    <button type="button" class="vles-btn" id="vles-tog-a" style="${activeTarget === 'a' ? 'background:#0284c7; border-color:#7dd3fc;' : ''}">${modData.optA.label}</button>
                    <button type="button" class="vles-btn" id="vles-tog-b" style="${activeTarget === 'b' ? 'background:#be123c; border-color:#fda4af;' : ''}">${modData.optB.label}</button>
                </div>
                <div class="vles-diag-grid">
                    <div>
                        <div style="font-weight:800; color:#7dd3fc; margin-bottom:0.45rem;">${activeTarget === 'a' ? modData.diagTitleA : modData.diagTitleB}</div>
                        <div class="vles-svg-box">${modData.diagSvg(activeTarget === 'a')}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; justify-content:space-between; gap:0.75rem;">
                        <div style="font-size:0.93rem; color:#e2e8f0; line-height:1.62;">${modData.descEs}</div>
                        ${isDa ? `<div style="font-size:0.86rem; color:#94a3b8; line-height:1.5; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.08);"><strong style="color:#cbd5e1;">Dansk lærer-note:</strong> ${modData.descDa}</div>` : ''}
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                            ${opt.words.map(w => `<button type="button" class="vles-btn" data-say="${w}" style="border-color:#38bdf8;">🔊 ${w}</button>`).join('')}
                        </div>
                    </div>
                </div>
                <div style="background:rgba(234,179,8,0.14); border:1px solid rgba(250,204,21,0.45); border-radius:12px; padding:0.85rem 1rem; color:#fef08a; font-size:0.9rem; line-height:1.6;">
                    ${modData.trickEs}
                </div>
            `;
            card.querySelector('#vles-tog-a').onclick = () => { activeTarget = 'a'; renderView(); };
            card.querySelector('#vles-tog-b').onclick = () => { activeTarget = 'b'; renderView(); };
            card.querySelectorAll('[data-say]').forEach(b => {
                b.onclick = () => playAudio(b.dataset.say, 0.8);
            });
            content.appendChild(card);
        } else if (activeTab === 'pairs') {
            const pair = modData.minimalPairs[pairQuizIdx];
            if (!pair._target) pair._target = Math.random() < 0.5 ? 'a' : 'b';
            const targetWord = pair._target === 'a' ? pair.a : pair.b;
            const qCard = document.createElement('div');
            qCard.className = 'vles-card';
            qCard.style.textAlign = 'center';
            qCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; color:#94a3b8; font-weight:800; font-size:0.86rem; margin-bottom:0.8rem;">
                    <span>Par ${pairQuizIdx + 1} de ${modData.minimalPairs.length}</span>
                    <span style="color:#4ade80;">Puntuación: ${pairScore} / ${modData.minimalPairs.length}</span>
                </div>
                <p style="color:#cbd5e1; margin:0 0 0.5rem;">Escucha la palabra danesa y elige la opción correcta:</p>
                <button type="button" class="vles-listen-big" id="vles-play-pair">${isDa ? '🔊 Escuchar pronunciación danesa (Lyt)' : '🔊 Escuchar pronunciación danesa'}</button>
                <div class="vles-pair-grid">
                    <button type="button" class="vles-pair-btn" id="vles-choice-a">
                        <div style="font-size:1.5rem; font-weight:900; color:#38bdf8;">${pair.a}</div>
                        <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.25rem;">${pair.meanA}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxA}"</div>
                    </button>
                    <button type="button" class="vles-pair-btn" id="vles-choice-b">
                        <div style="font-size:1.5rem; font-weight:900; color:#f472b6;">${pair.b}</div>
                        <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.25rem;">${pair.meanB}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxB}"</div>
                    </button>
                </div>
                <div id="vles-pair-fb" style="margin-top:0.75rem;"></div>
                <div style="display:flex; justify-content:space-between; margin-top:1.1rem; gap:0.5rem; flex-wrap:wrap;">
                    <button type="button" class="vles-btn" id="vles-prev-p" ${pairQuizIdx === 0 ? 'disabled' : ''}>← Anterior</button>
                    <button type="button" class="vles-btn" id="vles-next-p">${pairQuizIdx === modData.minimalPairs.length - 1 ? 'Reiniciar ↺' : 'Siguiente par →'}</button>
                </div>
            `;
            qCard.querySelector('#vles-play-pair').onclick = () => playAudio(targetWord, 0.78);
            const fbEl = qCard.querySelector('#vles-pair-fb');
            const btnA = qCard.querySelector('#vles-choice-a');
            const btnB = qCard.querySelector('#vles-choice-b');
            function handlePick(pick) {
                btnA.disabled = true;
                btnB.disabled = true;
                const ok = pick === pair._target;
                if (ok) pairScore++;
                fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};">
                    ${ok ? `🎉 ¡Muy bien! La palabra correcta es "${targetWord}".` : `❌ ¡Casi! La palabra correcta es "${targetWord}".`}
                </div>`;
                playAudio(targetWord, 0.75);
            }
            btnA.onclick = () => handlePick('a');
            btnB.onclick = () => handlePick('b');
            qCard.querySelector('#vles-prev-p').onclick = () => { if (pairQuizIdx > 0) { pairQuizIdx--; renderView(); } };
            qCard.querySelector('#vles-next-p').onclick = () => {
                pair._target = undefined;
                if (pairQuizIdx < modData.minimalPairs.length - 1) pairQuizIdx++;
                else { pairQuizIdx = 0; pairScore = 0; }
                renderView();
            };
            content.appendChild(qCard);
        } else {
            const ex = modData.speechExercises[speechExerciseIdx] || modData.speechExercises[0];
            const sCard = document.createElement('div');
            sCard.className = 'vles-card';
            sCard.style.textAlign = 'center';
            const promptHtml = ex.text.split(' ').map(w => {
                const clean = w.toLowerCase().replace(/[.,!?]/g, '');
                return ex.targetWords.includes(clean)
                    ? `<span style="color:#38bdf8; text-decoration:underline;">${w}</span>`
                    : `<span>${w}</span>`;
            }).join(' ');
            sCard.innerHTML = `
                <div style="font-size:1.45rem; font-weight:900; margin:0.4rem 0 0.65rem;">${promptHtml}</div>
                <p style="color:#cbd5e1; margin:0 0 0.85rem;">Lee esta frase en voz alta poniendo atención especial a las palabras subrayadas en azul:</p>
                ${consecutiveSpeechStreak > 0 ? `<div style="color:#fde047; font-weight:800; margin-bottom:0.7rem;">🔥 Racha de aciertos: ${consecutiveSpeechStreak}</div>` : ''}
                <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap; margin:0.65rem 0;">
                    <button type="button" class="vles-listen-big" id="vles-say-ex" style="margin:0;">🔊 Escuchar modelo</button>
                    <button type="button" class="vles-btn" id="vles-mic-btn" style="background:#dc2626; border-color:#f87171; padding:0.8rem 1.4rem; font-size:1rem;">🎙️ Hablar ahora</button>
                </div>
                <div id="vles-speech-status" style="color:#94a3b8; font-size:0.9rem; margin-top:0.7rem;">Pulsa «Hablar ahora» y lee con claridad.</div>
                <div id="vles-speech-fb" style="margin-top:0.7rem;"></div>
                <div style="text-align:left; background:rgba(30,41,59,0.7); border-radius:10px; padding:0.8rem; margin-top:1rem; font-size:0.86rem; color:#cbd5e1;">
                    <strong>Consejo:</strong> ${ex.hintEs}${isDa ? `<br><span style="color:#94a3b8;"><strong>Dansk:</strong> ${ex.hintDa}</span>` : ''}
                </div>
            `;
            sCard.querySelector('#vles-say-ex').onclick = () => playAudio(ex.text, 0.84);
            const micBtn = sCard.querySelector('#vles-mic-btn');
            const statusEl = sCard.querySelector('#vles-speech-status');
            const fbEl = sCard.querySelector('#vles-speech-fb');
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRec) {
                statusEl.textContent = 'Tu navegador no admite reconocimiento de voz (prueba Chrome o Safari).';
                micBtn.disabled = true;
                micBtn.style.opacity = '0.5';
            } else {
                const rec = new SpeechRec();
                rec.lang = 'da-DK';
                rec.continuous = false;
                rec.interimResults = false;
                micBtn.onclick = () => {
                    if (isSpeechRecording) { rec.stop(); return; }
                    try {
                        rec.start();
                        isSpeechRecording = true;
                        statusEl.textContent = '🎙️ Escuchando... ¡habla ahora en danés!';
                        statusEl.style.color = '#4ade80';
                    } catch (_) {}
                };
                rec.onresult = (ev) => {
                    isSpeechRecording = false;
                    const said = ev.results[0][0].transcript.trim();
                    statusEl.textContent = `Reconocido: "${said}"`;
                    const words = said.toLowerCase().split(/\s+/).map(w => w.replace(/[.,!?]/g, ''));
                    const hits = ex.targetWords.filter(tw => words.includes(tw));
                    const ok = hits.length === ex.targetWords.length;
                    if (ok) consecutiveSpeechStreak++; else consecutiveSpeechStreak = 0;
                    fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};">
                        ${ok ? `🌟 ¡Excelente pronunciación! Se reconocieron todas las palabras clave (${hits.join(', ')}).` : `💡 ¡Buen intento! Vuelve a probar enfocándote en estas palabras: ${ex.targetWords.join(', ')}`}
                    </div>`;
                };
                rec.onerror = () => { isSpeechRecording = false; statusEl.textContent = 'No se pudo escuchar claramente. Inténtalo de nuevo.'; };
                rec.onend = () => { isSpeechRecording = false; };
            }
            content.appendChild(sCard);
        }
    }

    renderView();
    container.appendChild(viewContainer);
}
