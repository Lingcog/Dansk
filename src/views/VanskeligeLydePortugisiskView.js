import { getLang } from '../utils/i18n.js';

/**
 * VanskeligeLydePortugisiskView
 * Komplet pædagogisk udtale-træningsflade til portugisisktalende (både europæisk og brasiliansk) danskkursister.
 *
 * Fokus på de 5 lyde og lydmønstre, der især giver portugisisktalende vanskeligheder på dansk:
 *   1. Blødt d – "Ånde på brillerne" (aldrig hårdt portugisisk [d] eller brasiliansk [dʒ] som i "dia")
 *   2. P / T / K med kraftigt pust ("papirtesten") vs. B / D / G (portugisisk p/t/k mangler pust og lyder som b/d/g!)
 *   3. Dansk svælg-R (dyb krage, aldrig brasiliansk [h] eller tap [ɾ]) & aktivt dansk H (aldrig stumt som i "hoje"!)
 *   4. Kyssemund Y & Ø vs. flade I & E (portugisisk har næsevokaler, men mangler stramt spidsede fortungevokaler)
 *   5. Forlydsklynger sk-/sp-/st- UDEN hjælpevokalen "e-/i-" ("eskole"!) + rent slut-L (ikke [w]) & rent -S (ikke [ʃ])
 */
export function renderVanskeligeLydePortugisiskView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    function handleBackToMain() {
        if (typeof navigateFn === 'function') {
            navigateFn('main');
        } else {
            const lang = getLang() || 'pt';
            window.location.hash = `#/${lang}/main`;
        }
    }

    function handleBackToMSS() {
        if (typeof navigateFn === 'function') {
            navigateFn('mit_sprog_sammenlignet');
        } else {
            const lang = getLang() || 'pt';
            window.location.hash = `#/${lang}/mit_sprog_sammenlignet`;
        }
    }

    function showCopyToast(msg) {
        let toast = document.querySelector('#vlpt-copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'vlpt-copy-toast';
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
                showCopyToast(`📋 ${label} kopieret (copiado)!`);
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
        showCopyToast(`📋 ${label} kopieret (copiado)!`);
    }

    const VALID_MODULES = ['bloedt_d', 'p_t_k_pust', 'dansk_r_og_h', 'y_og_oe', 'klynger_og_slutl'];
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
            const idx = segs.findIndex(s => s === 'vanskelige_lyde_portugisisk' || s === 'portugisiske_lyde');
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
        const lang = getLang() || 'pt';
        const newHash = `#/${lang}/vanskelige_lyde_portugisisk/${activeModuleId}/${activeTab}`;
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
    viewContainer.className = 'vlpt-wrapper';

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .vlpt-wrapper {
            max-width: 1040px;
            margin: 0 auto;
            padding: 1.25rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        .vlpt-top-bar {
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.35rem;
            padding-bottom: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .vlpt-btn {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(30,41,59,0.86); border: 1px solid rgba(148,163,184,0.35);
            color: #f8fafc; padding: 0.52rem 1rem; border-radius: 11px;
            font-weight: 800; font-size: 0.86rem; cursor: pointer; transition: all 0.16s ease;
        }
        .vlpt-btn:hover { border-color: #38bdf8; transform: translateY(-1px); }
        .vlpt-hero { text-align: center; margin-bottom: 1.5rem; }
        .vlpt-hero-kicker {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(250,204,21,0.14); border: 1px solid rgba(250,204,21,0.45);
            color: #fde047; padding: 0.35rem 0.95rem; border-radius: 999px;
            font-size: 0.8rem; font-weight: 800; margin-bottom: 0.6rem;
        }
        .vlpt-hero h1 { margin: 0 0 0.45rem; font-size: 1.85rem; font-weight: 900; color: #fff; }
        .vlpt-hero p { margin: 0 auto; max-width: 720px; color: #cbd5e1; font-size: 0.94rem; line-height: 1.5; }
        .vlpt-mod-nav {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.1rem;
        }
        .vlpt-mod-pill {
            padding: 0.58rem 0.95rem; border-radius: 12px;
            border: 1.5px solid rgba(255,255,255,0.16); background: rgba(15,23,42,0.78);
            color: #e2e8f0; font-weight: 800; font-size: 0.84rem; cursor: pointer;
            transition: all 0.16s ease; text-align: left;
        }
        .vlpt-mod-pill.active {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border-color: #7dd3fc; color: #ffffff; box-shadow: 0 6px 18px rgba(56,189,248,0.28);
        }
        .vlpt-subtabs {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.35rem;
        }
        .vlpt-subtab {
            padding: 0.55rem 1.05rem; border-radius: 10px;
            border: 1.5px solid rgba(148,163,184,0.28); background: rgba(30,41,59,0.72);
            color: #cbd5e1; font-weight: 800; font-size: 0.85rem; cursor: pointer;
        }
        .vlpt-subtab.active {
            border-color: #fde047; background: rgba(250,204,21,0.18); color: #fef08a;
        }
        .vlpt-card {
            background: rgba(15,23,42,0.9); border: 1.5px solid rgba(148,163,184,0.26);
            border-radius: 18px; padding: 1.25rem 1.35rem; margin-bottom: 1.15rem;
            box-shadow: 0 10px 26px rgba(0,0,0,0.32);
        }
        .vlpt-diag-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem; margin: 1rem 0;
        }
        .vlpt-svg-box {
            background: #070d19; border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px; padding: 0.75rem; min-height: 165px;
            display: flex; align-items: center; justify-content: center;
        }
        .vlpt-pair-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.85rem; margin: 1.1rem 0;
        }
        .vlpt-pair-btn {
            background: rgba(30,41,59,0.88); border: 2px solid rgba(148,163,184,0.32);
            border-radius: 14px; padding: 1.05rem; cursor: pointer; text-align: center;
            color: #f8fafc; transition: all 0.16s ease;
        }
        .vlpt-pair-btn:hover:not(:disabled) { border-color: #38bdf8; transform: translateY(-2px); }
        .vlpt-listen-big {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: 1.5px solid #38bdf8; color: #fff; font-size: 1.05rem; font-weight: 900;
            padding: 0.8rem 1.6rem; border-radius: 14px; cursor: pointer;
            display: inline-flex; align-items: center; gap: 0.5rem; margin: 0.75rem 0;
        }
        .vlpt-modal-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
            z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;
        }
        .vlpt-modal-card {
            background: #0f172a; border: 2px solid #38bdf8; border-radius: 18px;
            max-width: 680px; width: 100%; max-height: 86vh; overflow-y: auto; padding: 1.25rem;
        }
        @media (max-width: 600px) {
            .vlpt-hero h1 { font-size: 1.45rem; }
            .vlpt-card { padding: 1rem; }
        }
    `;
    viewContainer.appendChild(styleEl);

    const SOUND_MODULES = [
        {
            id: 'bloedt_d',
            badge: 'Foco 1',
            titleDa: '1. Blødt d – "Ånde på brillerne"',
            titlePt: '1. O «d» suave dinamarquês — «Baforar nos óculos»',
            descDa: 'Portugisisk har hårdt dental-d (eller brasiliansk [dʒ] før i), men mangler dansk blødt d (brød, mad, gade). Læg tungespidsen fladt bag undertænderne og lad varm luft strømme blødt ud uden kontakt opad.',
            descPt: 'Em português, o «d» é sempre uma batida firme da língua (ou um som de «dj» no Brasil antes de «i», como em <em>dia</em>). Mas o <strong>d suave dinamarquês</strong> (<em>mad, brød, gade</em>) nunca toca o céu da boca! Deixe a ponta da língua relaxada e plana atrás dos dentes de baixo e solte um sopro morno de ar, exatamente como quando você bafora nos óculos para limpá-los!',
            optA: { label: '🇩🇰 d suave (brød, mad)', ex: 'brød, mad, gade', words: ['brød', 'mad', 'sød', 'gade'] },
            optB: { label: '🇵🇹 Armadilha: «d» duro ou «dj/t»', ex: 'dag (d duro só no início!)', words: ['dag', 'dør', 'dansk'] },
            trickPt: '<strong>Regra de ouro:</strong> No início da palavra (<em><strong>d</strong>ag, <strong>d</strong>ansk</em>), o d dinamarquês é firme (e nunca «dj» antes de i: <em>tid</em> não é *tidji!). No meio ou no fim (<em>ma<strong>d</strong>, brø<strong>d</strong>, sø<strong>d</strong></em>), relaxe a língua embaixo e sopre ar morno!',
            diagTitleA: 'd suave (fim da palavra: mad, brød): língua baixa e solta, fluxo de ar morno',
            diagTitleB: 'Armadilha: a língua bloqueia atrás dos dentes superiores [d/t]!',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="96" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 115 Q 112 108 75 112" fill="none" stroke="#22c55e" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 86 Q 72 86 32 82" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="5,4"/>
                    <text x="120" y="62" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">Ar morno (baforar nos óculos)</text>
                    <text x="120" y="138" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">Língua plana atrás dos dentes de baixo!</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="66" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 110 Q 112 95 72 78" fill="none" stroke="#ef4444" stroke-width="7" stroke-linecap="round"/>
                    <line x1="56" y1="68" x2="56" y2="95" stroke="#fde047" stroke-width="3"/>
                    <text x="120" y="48" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">Língua subiu e travou o ar [d/t]!</text>
                </svg>`,
            minimalPairs: [
                { a: 'mad', b: 'mat', meanA: 'comida (d suave)', meanB: 'fosco / opaco (t seco)', ctxA: 'Vi laver mad i køkkenet.', ctxB: 'Farven er helt mat.' },
                { a: 'glad', b: 'glat', meanA: 'feliz (d suave)', meanB: 'escorregadio / liso (t seco)', ctxA: 'Jeg er meget glad i dag.', ctxB: 'Vejen er glat af is.' },
                { a: 'bad', b: 'bat', meanA: 'banho (d suave)', meanB: 'taco / raquete (t seco)', ctxA: 'Jeg tager et varmt bad.', ctxB: 'Han spiller med et rødt bat.' },
                { a: 'sød', b: 'sæt', meanA: 'doce / simpático (d suave)', meanB: 'coloque / frase (t seco)', ctxA: 'Kagen er meget sød.', ctxB: 'Sæt dig ned her.' }
            ],
            speechExercises: [
                { text: 'Jeg spiser godt brød og sød mad.', targetWords: ['godt', 'brød', 'sød', 'mad'], hintDa: 'Hold tungen fladt bag undertænderne ved brød, sød, mad.', hintPt: 'Mantenha a língua baixa atrás dos dentes inferiores em brød, sød e mad.' },
                { text: 'Gaden er bred og flad.', targetWords: ['gaden', 'bred', 'flad'], hintDa: 'Ånd blødt ud i "gaden", "bred", "flad".', hintPt: 'Bafore suavemente o d em gaden, bred e flad — sem bater a língua no céu da boca.' }
            ]
        },
        {
            id: 'p_t_k_pust',
            badge: 'Foco 2',
            titleDa: '2. P / T / K med pust ("Papirtesten") vs. B / D / G',
            titlePt: '2. Explosão de ar em P / T / K («Teste do Papel») vs. B / D / G',
            descDa: 'Portugisisk P, T og K (pão, tudo, café) er helt upustede — derfor hører danskere dem som B, D og G! Derudover må T ikke blive til [tʃ] før i (som brasiliansk "tia"). Brug tydeligt pust foran pære, tale, kaffe.',
            descPt: 'Em português, <strong>P, T, K</strong> saem quase sem sopro de ar (<em>pão, tudo, café</em>). Já no dinamarquês, <strong>B, D, G</strong> no início da palavra NÃO vibram na garganta — a única diferença para P, T, K é o <strong>sopro forte de ar</strong>! Se você falar <em>pære, tale, kaffe</em> sem soltar ar, os dinamarqueses ouvem <em>bære, dale, gaffe</em>! (E atenção no Brasil: «ti» dinamarquês como <em>tid, til</em> nunca vira «tchi»!)',
            optA: { label: '💨 Sopro forte: P, T, K', ex: 'pære, pande, tale, kaffe', words: ['pære', 'pande', 'tale', 'kaffe'] },
            optB: { label: '🤫 Sem sopro: B, D, G', ex: 'bære, bande, dale, gade', words: ['bære', 'bande', 'dale', 'gade'] },
            trickPt: '<strong>Teste do papel:</strong> Segure uma folha de papel a 3 cm da boca. Ao dizer <em><strong>p</strong>ære, <strong>t</strong>ale, <strong>k</strong>old</em>, o jato de ar deve balançar o papel! Ao dizer <em><strong>b</strong>ære, <strong>d</strong>ale, <strong>g</strong>ade</em>, o papel fica parado.',
            diagTitleA: 'P, T, K no início: explosão forte de ar faz o papel balançar!',
            diagTitleB: 'B, D, G: calmos e sem sopro — o papel fica imóvel',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="8" ry="6" fill="#ef4444"/>
                    <path d="M 45 84 L 18 70 M 45 84 L 14 84 M 45 84 L 18 98" stroke="#fde047" stroke-width="3.5" stroke-linecap="round"/>
                    <path d="M 10 45 Q 2 84 22 122" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                    <text x="155" y="75" text-anchor="middle" fill="#fde047" font-size="11" font-weight="bold">Sopro forte empurra o papel!</text>
                    <text x="155" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">pære • tale • kaffe</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="7" ry="5" fill="#38bdf8"/>
                    <line x1="16" y1="45" x2="16" y2="120" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
                    <text x="155" y="75" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">Sem sopro — papel imóvel</text>
                    <text x="155" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">bære • dale • gade</text>
                </svg>`,
            minimalPairs: [
                { a: 'pære', b: 'bære', meanA: 'pera / lâmpada (P com sopro)', meanB: 'carregar (B calmo)', ctxA: 'Jeg spiser en sød pære.', ctxB: 'Kan du bære tasken?' },
                { a: 'pande', b: 'bande', meanA: 'frigideira / testa (P forte)', meanB: 'gangue / xingar (B sem sopro)', ctxA: 'Steg æg på en varm pande.', ctxB: 'Man må ikke bande her.' },
                { a: 'tale', b: 'dale', meanA: 'falar / discurso (T com sopro)', meanB: 'vales / cair (D sem sopro)', ctxA: 'Vi skal tale dansk i dag.', ctxB: 'Priserne kan dale lidt.' },
                { a: 'kold', b: 'gold', meanA: 'frio (K com sopro)', meanB: 'árido / estéril (G sem sopro)', ctxA: 'Vinteren er meget kold.', ctxB: 'Jorden er helt gold.' }
            ],
            speechExercises: [
                { text: 'Pigen køber kold kaffe og en pære.', targetWords: ['pigen', 'køber', 'kold', 'kaffe', 'pære'], hintDa: 'Lav tydeligt pust på alle P- og K-ord!', hintPt: 'Faça um sopro forte em todas as palavras com P e K!' },
                { text: 'Taler du tit med venner på torvet?', targetWords: ['taler', 'tit', 'torvet'], hintDa: 'Skub tydeligt luft ud på taler, tit, torvet (ikke "tchit"!).', hintPt: 'Solte ar firme no T (sem dizer "tchit" em tit!).' }
            ]
        },
        {
            id: 'dansk_r_og_h',
            badge: 'Foco 3',
            titleDa: '3. Dansk svælg-R (ikke [h] eller tap) & rent dansk H (aldrig stumt)',
            titlePt: '3. O «R» fundo da garganta (não [h]) e o «H» pronunciado (não mudo!)',
            descDa: 'I brasiliansk portugisisk lyder for-R/RR ofte som blødt [h] ("rato" ≈ "hato"), mens portugisisk H altid er stumt ("hora", "hoje"). På dansk er det omvendt: H i hej/hus skal pustes tydeligt, mens R i rød/ris laves dybt i svælget (som en krage) — og slut-r i mor/spiser smelter væk!',
            descPt: 'Atenção redobrada para evitar confusão entre R e H!<br>1) <strong>R dinamarquês inicial (<em>rød, ris</em>):</strong> No Brasil, o «r» inicial (como <em>rato</em>) muitas vezes soa suave como um [h]. Em dinamarquês NÃO é [h], nem o «r» vibrante de <em>caro</em>: é uma fricção bem no fundo da garganta (como um gargarejo suave). Já no final (<em>mor, spiser</em>), ele desaparece em uma vogal aberta!<br>2) <strong>H dinamarquês (<em>hej, hus, have</em>):</strong> Em português o H é sempre mudo (<em>hoje, hora</em>). Em dinamarquês, o H no início deve ser soprado claramente (exceto antes de v/j: <em>hvad, hjerte</em>)!',
            optA: { label: '🦅 R na garganta (rød, ris) & H soprado (hej)', ex: 'rød, ris, hej, hus', words: ['rød', 'ris', 'hej', 'hus'] },
            optB: { label: '🌊 R final derretido (mor, spiser) & hv- mudo', ex: 'mor, spiser, hvad, hvor', words: ['mor', 'bror', 'spiser', 'hvad'] },
            trickPt: '<strong>Dica prática:</strong> Em <em>hej</em> e <em>hus</em>, sopre o ar como no início do «r» de <em>rato</em> brasileiro! Mas em <em>rød</em> e <em>ris</em>, vá mais fundo na garganta (atrás da úvula). E nunca ponha som de R no fim de <em>spise<strong>r</strong></em> ou <em>mo<strong>r</strong></em>!',
            diagTitleA: 'R inicial: lá atrás na garganta (a ponta da língua fica parada embaixo)',
            diagTitleB: 'R final (mor, spiser): não vira [h] nem [ɾ] — termina em vogal aberta',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 162 125 Q 152 80 120 82 Q 85 95 72 110" fill="none" stroke="#f472b6" stroke-width="7" stroke-linecap="round"/>
                    <circle cx="152" cy="76" r="14" fill="rgba(239,68,68,0.28)" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,2"/>
                    <text x="105" y="48" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">Som fundo na garganta (rød, ris)!</text>
                    <text x="105" y="138" text-anchor="middle" fill="#94a3b8" font-size="10">Ponta da língua quieta atrás dos dentes</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 155 118 Q 115 112 75 112" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 85 Q 75 88 35 88" fill="none" stroke="#4ade80" stroke-width="3.5" stroke-linecap="round"/>
                    <text x="115" y="55" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">mor ← o R final se funde suavemente na vogal!</text>
                </svg>`,
            minimalPairs: [
                { a: 'rød', b: 'hød', meanA: 'vermelho (R fundo na garganta)', meanB: 'com H soprado leve', ctxA: 'Jeg køber en rød cykel.', ctxB: 'R vibra na garganta; H é só ar puro.' },
                { a: 'ris', b: 'is', meanA: 'arroz (R da garganta)', meanB: 'gelo / sorvete', ctxA: 'Vi spiser ris til aftensmad.', ctxB: 'Der er glat is på vejen.' },
                { a: 'hus', b: 'us', meanA: 'casa (H soprado — não é mudo!)', meanB: 'sem o H inicial', ctxA: 'Vi bor i et stort hus.', ctxB: 'Em dinamarquês, o H de hus sempre tem som.' }
            ],
            speechExercises: [
                { text: 'Hej mor, vi spiser rød frugt og ris i vores hus.', targetWords: ['hej', 'mor', 'spiser', 'rød', 'ris', 'hus'], hintDa: 'Tydeligt pust på H i hej/hus, svælg-r i rød/ris, og blødt slut-r i mor/spiser.', hintPt: 'Sopre o H de hej/hus, faça R na garganta em rød/ris, e suavize o fim de mor/spiser.' }
            ]
        },
        {
            id: 'y_og_oe',
            badge: 'Foco 4',
            titleDa: '4. Kyssemund Y & Ø vs. flade I & E',
            titlePt: '4. Vogais de biquinho Y e Ø vs. I e E abertos',
            descDa: 'Portugisisk har nasale vokaler (ão, õe), men mangler spidsede fortungevokaler (Y, Ø). Undgå at flade dem ud til I/E (lys → Lis) eller trække dem bagud til U/O (brød → brod).',
            descPt: 'O português tem muitas vogais nasais (<em>pão, limões</em>), mas não possui as vogais anteriores com <strong>lábios arredondados Y e Ø</strong>! O erro mais comum é dizer <em>lys</em> (luz) como se fosse o nome <em>Lis</em>, ou trocar <em>ø</em> por «o/ô». O segredo: deixe a língua exatamente no lugar de «i» ou «ê», mas faça um <strong>biquinho firme para a frente</strong>!',
            optA: { label: '💋 Biquinho firme: Y, Ø', ex: 'lys, ny, brød, dør', words: ['lys', 'ny', 'brød', 'dør'] },
            optB: { label: '😊 Sorriso aberto: I, E', ex: 'lis, ni, bred, der', words: ['lis', 'ni', 'bred', 'der'] },
            trickPt: '<strong>Truque de 2 passos:</strong> Diga um «iiii...» bem longo e, sem mexer a língua, faça biquinho como para assobiar ➔ sai um <strong>Y</strong> perfeito! Faça o mesmo começando por «êêêê...» e arredondando os lábios ➔ sai o <strong>Ø</strong> dinamarquês!',
            diagTitleA: 'Y & Ø: língua na frente e lábios projetados num biquinho redondo',
            diagTitleB: 'I & E: lábios esticados para os lados como um sorriso',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="120" cy="78" r="34" fill="none" stroke="#f59e0b" stroke-width="4"/>
                    <circle cx="120" cy="78" r="14" fill="#ef4444" opacity="0.85"/>
                    <text x="120" y="30" text-anchor="middle" fill="#fde047" font-size="11" font-weight="bold">Y & Ø: Faça um biquinho firme!</text>
                    <text x="120" y="138" text-anchor="middle" fill="#cbd5e1" font-size="11">lys • ny • brød • møde</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <ellipse cx="120" cy="78" rx="52" ry="18" fill="none" stroke="#38bdf8" stroke-width="4"/>
                    <line x1="80" y1="78" x2="160" y2="78" stroke="#7dd3fc" stroke-width="3"/>
                    <text x="120" y="30" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">I & E: Lábios esticados (sorriso)</text>
                    <text x="120" y="138" text-anchor="middle" fill="#cbd5e1" font-size="11">Lis • ni • bred • der</text>
                </svg>`,
            minimalPairs: [
                { a: 'lys', b: 'lis', meanA: 'luz / vela (Y redondo)', meanB: 'nome Lis (I plano)', ctxA: 'Vi tænder stearinlys i stuen.', ctxB: 'Min veninde hedder Lis.' },
                { a: 'ny', b: 'ni', meanA: 'novo (Y redondo)', meanB: 'número 9 (I plano)', ctxA: 'Hun har en ny cykel.', ctxB: 'Klokken er ni nu.' },
                { a: 'brød', b: 'bred', meanA: 'pão (Ø redondo)', meanB: 'largo (E plano)', ctxA: 'Jeg køber frisk brød.', ctxB: 'Vejen er meget bred.' },
                { a: 'dør', b: 'der', meanA: 'porta (Ø redondo)', meanB: 'lá / ali (E plano)', ctxA: 'Luk venligst den hvide dør.', ctxB: 'Der sidder en ven.' }
            ],
            speechExercises: [
                { text: 'Vi har et nyt lyst køkken med ny dør.', targetWords: ['nyt', 'lyst', 'køkken', 'ny', 'dør'], hintDa: 'Spids læberne fast ved nyt, lyst, køkken, ny og dør!', hintPt: 'Mantenha os lábios bem arredondados em nyt, lyst, køkken, ny e dør!' }
            ]
        },
        {
            id: 'klynger_og_slutl',
            badge: 'Foco 5',
            titleDa: '5. Klynger (sk-, sp-) uden "es-" & rent slut-L / -S',
            titlePt: '5. Sem «es-» antes de sk-/sp-/st- + L e S limpos no final',
            descDa: 'Portugisisk sætter automatisk "e-" eller "i-" foran s + konsonant (skole → "eskole", spiser → "espiser"). Desuden bliver slut-L i brasiliansk portugisisk til [u/w] ("sol" → "sou"), og slut-S i europæisk portugisisk til "sh" ("lys" → "lysh")!',
            descPt: 'Três armadilhas clássicas de quem fala português:<br>1) <strong>Sem «e-» no começo (<em>skole, spiser, stor</em>):</strong> Em português não existem palavras começando por <em>sk-, sp-, st-</em> (dizemos <em>escola, esporte</em>). Nunca diga *<em>eskole</em> nem *<em>espiser</em> — comece direto com o som da cobra <strong>sss-kole</strong>!<br>2) <strong>L no final (<em>kold, sol, sal</em>):</strong> No Brasil, o L final vira «u» (<em>Brasil → Brasiu</em>). Em dinamarquês, toque a ponta da língua atrás dos dentes de cima para o L existir!<br>3) <strong>S no final (<em>lys, spiser</em>):</strong> Em Portugal, o S final vira «sh» (<em>dois → doish</em>). Em dinamarquês, é sempre um «s» fino e limpo!',
            optA: { label: '🐍 Direto sss- + L/S limpos', ex: 'skole, spiser, kold, lys', words: ['skole', 'spiser', 'kold', 'lys'] },
            optB: { label: '🚫 Armadilha: "es-" / slut-[w] / slut-[ʃ]', ex: 'stor, stol, sol, hus', words: ['stor', 'stol', 'sol', 'hus'] },
            trickPt: '<strong>Treino em 3 segundos:</strong> Antes de dizer <em><strong>s</strong>kole</em>, segure o «sssss» por 2 segundos e emende direto no «kole» (<em>ssss-kole</em> — zero «e» na frente!). Em <em>ko<strong>ld</strong> / so<strong>l</strong></em>, leve a língua ao céu da boca para não virar «kou / sou»!',
            diagTitleA: 'sk-, sp- direto no S + ponta da língua tocando o céu da boca no L final',
            diagTitleB: 'Armadilha: inserir "e-" na frente (*eskole) ou virar o L em "u" (*sou)',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 155 112 Q 112 94 74 62" fill="none" stroke="#4ade80" stroke-width="7" stroke-linecap="round"/>
                    <circle cx="72" cy="60" r="6" fill="#fde047"/>
                    <text x="125" y="34" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">L final (sol, stol): língua toca em cima!</text>
                    <text x="120" y="138" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">e sss-kole direto sem «e-» antes!</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="120" cy="76" r="24" fill="none" stroke="#ef4444" stroke-width="5"/>
                    <text x="120" y="30" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">Armadilha: *eskole, *sou (em vez de sol) ou *lysh!</text>
                    <text x="120" y="134" text-anchor="middle" fill="#94a3b8" font-size="11">Não insira vogal antes nem transforme L em U</text>
                </svg>`,
            minimalPairs: [
                { a: 'skole', b: 'kole', meanA: 'escola (direto sss-kole, sem "e-")', meanB: 'sem o S inicial', ctxA: 'Børnene går i skole.', ctxB: 'Nunca comece dizendo "eskole"!' },
                { a: 'sol', b: 'sov', meanA: 'sol (L firme com a língua em cima)', meanB: 'dormiu (termina em V/U suave)', ctxA: 'Solen skinner i dag.', ctxB: 'Em sol, não transforme o L em "u" (*sou)!' },
                { a: 'spis', b: 'is', meanA: 'coma! (direto sss-pis)', meanB: 'gelo / sorvete', ctxA: 'Spis nu din mad!', ctxB: 'Comece logo no S, sem "espis"!' }
            ],
            speechExercises: [
                { text: 'Vi spiser i en stor skole med sol og kold vand.', targetWords: ['spiser', 'stor', 'skole', 'sol', 'kold'], hintDa: 'Start direkte på sss- i spiser/stor/skole, og udtal L tydeligt i skole/sol/kold!', hintPt: 'Comece direto com sss- em spiser, stor e skole (zero "e-"!) e marque bem o L em sol e kold.' }
            ]
        }
    ];

    function openHomeworkModal() {
        const existing = document.querySelector('#vlpt-hw-modal');
        if (existing) existing.remove();
        const overlay = document.createElement('div');
        overlay.id = 'vlpt-hw-modal';
        overlay.className = 'vlpt-modal-overlay';
        const isDa = getLang() === 'da';
        const tabLabels = {
            principles: isDa ? '1. Posição da boca & regras (Teori)' : '1. Posição da boca & regras',
            pairs: isDa ? '2. Quiz de audição (Lyttequiz)' : '2. Quiz de audição',
            speech: isDa ? '3. Treino de microfone (Udtale)' : '3. Treino de microfone'
        };
        overlay.innerHTML = `
            <div class="vlpt-modal-card">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:1px solid rgba(255,255,255,0.12);">
                    <div>
                        <div style="font-size:0.74rem; font-weight:900; color:#38bdf8; text-transform:uppercase;">📚 Links de lição de casa • Português</div>
                        <h2 style="margin:0.15rem 0 0; font-size:1.2rem; color:#fff;">${isDa ? 'Direkte links til alle 5 fokuslyde' : 'Links diretos para todos os 5 sons principais'}</h2>
                    </div>
                    <button type="button" class="vlpt-btn" id="vlpt-hw-close">✕ Fechar</button>
                </div>
                <div style="display:flex; flex-direction:column; gap:0.9rem;">
                    ${SOUND_MODULES.map(m => `
                        <div style="background:rgba(30,41,59,0.75); border:1px solid rgba(148,163,184,0.25); border-radius:12px; padding:0.85rem;">
                            <div style="font-weight:800; color:#fde047; margin-bottom:0.5rem;">${m.titlePt}${isDa ? ` <span style="color:#94a3b8; font-size:0.82rem;">(${m.titleDa})</span>` : ''}</div>
                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                ${VALID_TABS.map(tid => {
                                    const url = `${window.location.origin}${window.location.pathname}#/${getLang() || 'pt'}/vanskelige_lyde_portugisisk/${m.id}/${tid}`;
                                    return `
                                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap; background:rgba(15,23,42,0.7); padding:0.45rem 0.7rem; border-radius:8px;">
                                            <span style="font-size:0.82rem; color:#e2e8f0;">${tabLabels[tid]}</span>
                                            <button type="button" class="vlpt-btn" data-copy-url="${url}" style="padding:0.3rem 0.7rem; font-size:0.78rem; border-color:#38bdf8;">📋 Copiar</button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        overlay.querySelector('#vlpt-hw-close').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        overlay.querySelectorAll('[data-copy-url]').forEach(b => {
            b.onclick = () => copyToClipboard(b.dataset.copyUrl, isDa ? 'Lektie-link' : 'Link de exercício');
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
        topBar.className = 'vlpt-top-bar';
        topBar.innerHTML = `
            <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                <button type="button" class="vlpt-btn" id="vlpt-back-main">${isDa ? '← Início (Forside)' : '← Início'}</button>
                <button type="button" class="vlpt-btn" id="vlpt-back-mss" style="border-color:#38bdf8; color:#7dd3fc;">🇵🇹 Voltar para «O meu idioma vs. dinamarquês»</button>
            </div>
            <button type="button" class="vlpt-btn" id="vlpt-hw-btn" style="border-color:#fde047; color:#fde047;">${isDa ? '📋 Links de exercício (Lektier)' : '📋 Links de exercício'}</button>
        `;
        topBar.querySelector('#vlpt-back-main').onclick = handleBackToMain;
        topBar.querySelector('#vlpt-back-mss').onclick = handleBackToMSS;
        topBar.querySelector('#vlpt-hw-btn').onclick = openHomeworkModal;
        viewContainer.appendChild(topBar);

        const hero = document.createElement('div');
        hero.className = 'vlpt-hero';
        hero.innerHTML = `
            <div class="vlpt-hero-kicker">${isDa ? '🇵🇹 Treino especial de pronúncia dinamarquesa para falantes de português • Nível 2 (Trin 2)' : '🇵🇹 Treino especial de pronúncia dinamarquesa para falantes de português • Nível 2'}</div>
            <h1>${modData.titlePt}</h1>
            <p>${isDa ? `${modData.titleDa} — ` : ''}Posição da boca e da língua, contraste auditivo e treino de fala no microfone</p>
        `;
        viewContainer.appendChild(hero);

        const modNav = document.createElement('div');
        modNav.className = 'vlpt-mod-nav';
        SOUND_MODULES.forEach(m => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `vlpt-mod-pill ${m.id === activeModuleId ? 'active' : ''}`;
            btn.textContent = isDa
                ? `${m.badge}: ${m.titleDa.replace(/^\d+\.\s*/, '')}`
                : `${m.badge}: ${m.titlePt.replace(/^\d+\.\s*/, '')}`;
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
        subTabs.className = 'vlpt-subtabs';
        [
            { id: 'principles', label: isDa ? '1. Boca & regras (Teori)' : '1. Boca & regras' },
            { id: 'pairs', label: isDa ? '2. Pares mínimos (Lyttequiz)' : '2. Pares mínimos' },
            { id: 'speech', label: isDa ? '3. Treino de fala (Udtale)' : '3. Treino de fala' }
        ].forEach(st => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = `vlpt-subtab ${st.id === activeTab ? 'active' : ''}`;
            b.textContent = st.label;
            b.onclick = () => { activeTab = st.id; renderView(); };
            subTabs.appendChild(b);
        });
        viewContainer.appendChild(subTabs);

        const content = document.createElement('div');
        viewContainer.appendChild(content);

        if (activeTab === 'principles') {
            const card = document.createElement('div');
            card.className = 'vlpt-card';
            const opt = activeTarget === 'a' ? modData.optA : modData.optB;
            card.innerHTML = `
                <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:1rem;">
                    <button type="button" class="vlpt-btn" id="vlpt-tog-a" style="${activeTarget === 'a' ? 'background:#0284c7; border-color:#7dd3fc;' : ''}">${modData.optA.label}</button>
                    <button type="button" class="vlpt-btn" id="vlpt-tog-b" style="${activeTarget === 'b' ? 'background:#be123c; border-color:#fda4af;' : ''}">${modData.optB.label}</button>
                </div>
                <div class="vlpt-diag-grid">
                    <div>
                        <div style="font-weight:800; color:#7dd3fc; margin-bottom:0.45rem;">${activeTarget === 'a' ? modData.diagTitleA : modData.diagTitleB}</div>
                        <div class="vlpt-svg-box">${modData.diagSvg(activeTarget === 'a')}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; justify-content:space-between; gap:0.75rem;">
                        <div style="font-size:0.93rem; color:#e2e8f0; line-height:1.62;">${modData.descPt}</div>
                        ${isDa ? `<div style="font-size:0.86rem; color:#94a3b8; line-height:1.5; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.08);"><strong style="color:#cbd5e1;">Dansk lærer-note:</strong> ${modData.descDa}</div>` : ''}
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                            ${opt.words.map(w => `<button type="button" class="vlpt-btn" data-say="${w}" style="border-color:#38bdf8;">🔊 ${w}</button>`).join('')}
                        </div>
                    </div>
                </div>
                <div style="background:rgba(234,179,8,0.14); border:1px solid rgba(250,204,21,0.45); border-radius:12px; padding:0.85rem 1rem; color:#fef08a; font-size:0.9rem; line-height:1.6;">
                    ${modData.trickPt}
                </div>
            `;
            card.querySelector('#vlpt-tog-a').onclick = () => { activeTarget = 'a'; renderView(); };
            card.querySelector('#vlpt-tog-b').onclick = () => { activeTarget = 'b'; renderView(); };
            card.querySelectorAll('[data-say]').forEach(b => {
                b.onclick = () => playAudio(b.dataset.say, 0.8);
            });
            content.appendChild(card);
        } else if (activeTab === 'pairs') {
            const pair = modData.minimalPairs[pairQuizIdx];
            if (!pair._target) pair._target = Math.random() < 0.5 ? 'a' : 'b';
            const targetWord = pair._target === 'a' ? pair.a : pair.b;
            const qCard = document.createElement('div');
            qCard.className = 'vlpt-card';
            qCard.style.textAlign = 'center';
            qCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; color:#94a3b8; font-weight:800; font-size:0.86rem; margin-bottom:0.8rem;">
                    <span>Par ${pairQuizIdx + 1} de ${modData.minimalPairs.length}</span>
                    <span style="color:#4ade80;">Pontuação: ${pairScore} / ${modData.minimalPairs.length}</span>
                </div>
                <p style="color:#cbd5e1; margin:0 0 0.5rem;">Ouça a palavra em dinamarquês e escolha a opção correta:</p>
                <button type="button" class="vlpt-listen-big" id="vlpt-play-pair">${isDa ? '🔊 Ouvir pronúncia dinamarquesa (Lyt)' : '🔊 Ouvir pronúncia dinamarquesa'}</button>
                <div class="vlpt-pair-grid">
                    <button type="button" class="vlpt-pair-btn" id="vlpt-choice-a">
                        <div style="font-size:1.5rem; font-weight:900; color:#38bdf8;">${pair.a}</div>
                        <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.25rem;">${pair.meanA}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxA}"</div>
                    </button>
                    <button type="button" class="vlpt-pair-btn" id="vlpt-choice-b">
                        <div style="font-size:1.5rem; font-weight:900; color:#f472b6;">${pair.b}</div>
                        <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.25rem;">${pair.meanB}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxB}"</div>
                    </button>
                </div>
                <div id="vlpt-pair-fb" style="margin-top:0.75rem;"></div>
                <div style="display:flex; justify-content:space-between; margin-top:1.1rem; gap:0.5rem; flex-wrap:wrap;">
                    <button type="button" class="vlpt-btn" id="vlpt-prev-p" ${pairQuizIdx === 0 ? 'disabled' : ''}>← Anterior</button>
                    <button type="button" class="vlpt-btn" id="vlpt-next-p">${pairQuizIdx === modData.minimalPairs.length - 1 ? 'Recomeçar ↺' : 'Próximo par →'}</button>
                </div>
            `;
            qCard.querySelector('#vlpt-play-pair').onclick = () => playAudio(targetWord, 0.78);
            const fbEl = qCard.querySelector('#vlpt-pair-fb');
            const btnA = qCard.querySelector('#vlpt-choice-a');
            const btnB = qCard.querySelector('#vlpt-choice-b');
            function handlePick(pick) {
                btnA.disabled = true;
                btnB.disabled = true;
                const ok = pick === pair._target;
                if (ok) pairScore++;
                fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};">
                    ${ok ? `🎉 Muito bem! A palavra correta é "${targetWord}".` : `❌ Quase! A palavra correta é "${targetWord}".`}
                </div>`;
                playAudio(targetWord, 0.75);
            }
            btnA.onclick = () => handlePick('a');
            btnB.onclick = () => handlePick('b');
            qCard.querySelector('#vlpt-prev-p').onclick = () => { if (pairQuizIdx > 0) { pairQuizIdx--; renderView(); } };
            qCard.querySelector('#vlpt-next-p').onclick = () => {
                pair._target = undefined;
                if (pairQuizIdx < modData.minimalPairs.length - 1) pairQuizIdx++;
                else { pairQuizIdx = 0; pairScore = 0; }
                renderView();
            };
            content.appendChild(qCard);
        } else {
            const ex = modData.speechExercises[speechExerciseIdx] || modData.speechExercises[0];
            const sCard = document.createElement('div');
            sCard.className = 'vlpt-card';
            sCard.style.textAlign = 'center';
            const promptHtml = ex.text.split(' ').map(w => {
                const clean = w.toLowerCase().replace(/[.,!?]/g, '');
                return ex.targetWords.includes(clean)
                    ? `<span style="color:#38bdf8; text-decoration:underline;">${w}</span>`
                    : `<span>${w}</span>`;
            }).join(' ');
            sCard.innerHTML = `
                <div style="font-size:1.45rem; font-weight:900; margin:0.4rem 0 0.65rem;">${promptHtml}</div>
                <p style="color:#cbd5e1; margin:0 0 0.85rem;">Leia esta frase em voz alta, prestando atenção especial às palavras sublinhadas em azul!</p>
                ${consecutiveSpeechStreak > 0 ? `<div style="color:#fde047; font-weight:800; margin-bottom:0.7rem;">🔥 Acertos seguidos: ${consecutiveSpeechStreak}</div>` : ''}
                <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap; margin:0.65rem 0;">
                    <button type="button" class="vlpt-listen-big" id="vlpt-say-ex" style="margin:0;">🔊 Ouvir modelo</button>
                    <button type="button" class="vlpt-btn" id="vlpt-mic-btn" style="background:#dc2626; border-color:#f87171; padding:0.8rem 1.4rem; font-size:1rem;">🎙️ Falar agora</button>
                </div>
                <div id="vlpt-speech-status" style="color:#94a3b8; font-size:0.9rem; margin-top:0.7rem;">Clique em «Falar agora» e leia em voz clara.</div>
                <div id="vlpt-speech-fb" style="margin-top:0.7rem;"></div>
                <div style="text-align:left; background:rgba(30,41,59,0.7); border-radius:10px; padding:0.8rem; margin-top:1rem; font-size:0.86rem; color:#cbd5e1;">
                    <strong>Dica:</strong> ${ex.hintPt}${isDa ? `<br><span style="color:#94a3b8;"><strong>Dansk:</strong> ${ex.hintDa}</span>` : ''}
                </div>
            `;
            sCard.querySelector('#vlpt-say-ex').onclick = () => playAudio(ex.text, 0.84);
            const micBtn = sCard.querySelector('#vlpt-mic-btn');
            const statusEl = sCard.querySelector('#vlpt-speech-status');
            const fbEl = sCard.querySelector('#vlpt-speech-fb');
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRec) {
                statusEl.textContent = 'O seu navegador não suporta reconhecimento de voz (tente Chrome ou Safari).';
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
                        statusEl.textContent = '🎙️ Ouvindo... fale agora em dinamarquês!';
                        statusEl.style.color = '#4ade80';
                    } catch (_) {}
                };
                rec.onresult = (ev) => {
                    isSpeechRecording = false;
                    const said = ev.results[0][0].transcript.trim();
                    statusEl.textContent = `Reconhecido: "${said}"`;
                    const words = said.toLowerCase().split(/\s+/).map(w => w.replace(/[.,!?]/g, ''));
                    const hits = ex.targetWords.filter(tw => words.includes(tw));
                    const ok = hits.length === ex.targetWords.length;
                    if (ok) consecutiveSpeechStreak++; else consecutiveSpeechStreak = 0;
                    fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};">
                        ${ok ? `🌟 Excelente pronúncia! Todas as palavras-alvo (${hits.join(', ')}) foram reconhecidas.` : `💡 Boa tentativa! Tente novamente focando nestas palavras: ${ex.targetWords.join(', ')}`}
                    </div>`;
                };
                rec.onerror = () => { isSpeechRecording = false; statusEl.textContent = 'Não foi possível ouvir claramente. Tente novamente.'; };
                rec.onend = () => { isSpeechRecording = false; };
            }
            content.appendChild(sCard);
        }
    }

    renderView();
    container.appendChild(viewContainer);
}
