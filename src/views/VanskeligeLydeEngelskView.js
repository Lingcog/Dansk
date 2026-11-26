import { getLang } from '../utils/i18n.js';

/**
 * VanskeligeLydeEngelskView
 * Complete Danish pronunciation trainer tailored for English-speaking learners.
 *
 * Focus on the 4 core Danish sound patterns that challenge English speakers most:
 *   1. Blødt d – "Fogging up glasses" (flat tongue behind lower teeth, NOT English "th" and NOT "l/d")
 *   2. Y / Ø / Å – Tight kiss-lips for Y & Ø + pure deep Å without English diphthong glide
 *   3. Dansk bagtunge-R – Soft uvular throat-R initially (never curled English R) & vocalic final -r
 *   4. Stød – The Danish glottal catch (hun/hund, mor/mord, ven/vend, bønner/bønder)
 */
export function renderVanskeligeLydeEngelskView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    function handleBackToMain() {
        if (typeof navigateFn === 'function') {
            navigateFn('main');
        } else {
            const lang = getLang() || 'en';
            window.location.hash = `#/${lang}/main`;
        }
    }

    function handleBackToMSS() {
        if (typeof navigateFn === 'function') {
            navigateFn('mit_sprog_sammenlignet');
        } else {
            const lang = getLang() || 'en';
            window.location.hash = `#/${lang}/mit_sprog_sammenlignet`;
        }
    }

    function showCopyToast(msg) {
        let toast = document.querySelector('#vlen-copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'vlen-copy-toast';
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

    function copyToClipboard(text, label = 'Homework link') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyToast(`${label} copied!`);
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
        showCopyToast(`${label} copied!`);
    }

    const VALID_MODULES = ['bloedt_d', 'y_oe_aa', 'dansk_r', 'stoed'];
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
            const idx = segs.findIndex(s => s === 'vanskelige_lyde_engelsk' || s === 'engelske_lyde');
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
        const lang = getLang() || 'en';
        const newHash = `#/${lang}/vanskelige_lyde_engelsk/${activeModuleId}/${activeTab}`;
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
    viewContainer.className = 'vlen-wrapper';

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .vlen-wrapper {
            max-width: 1040px;
            margin: 0 auto;
            padding: 1.25rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        .vlen-top-bar {
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.35rem;
            padding-bottom: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .vlen-btn {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(30,41,59,0.86); border: 1px solid rgba(148,163,184,0.35);
            color: #f8fafc; padding: 0.52rem 1rem; border-radius: 11px;
            font-weight: 800; font-size: 0.86rem; cursor: pointer; transition: all 0.16s ease;
        }
        .vlen-btn:hover:not(:disabled) { border-color: #38bdf8; transform: translateY(-1px); }
        .vlen-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .vlen-hero { text-align: center; margin-bottom: 1.5rem; }
        .vlen-hero-kicker {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(250,204,21,0.14); border: 1px solid rgba(250,204,21,0.45);
            color: #fde047; padding: 0.35rem 0.95rem; border-radius: 999px;
            font-size: 0.8rem; font-weight: 800; margin-bottom: 0.6rem;
        }
        .vlen-hero h1 { margin: 0 0 0.45rem; font-size: 1.85rem; font-weight: 900; color: #fff; }
        .vlen-hero p { margin: 0 auto; max-width: 720px; color: #cbd5e1; font-size: 0.94rem; line-height: 1.5; }
        .vlen-mod-nav {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.1rem;
        }
        .vlen-mod-pill {
            padding: 0.58rem 0.95rem; border-radius: 12px;
            border: 1.5px solid rgba(255,255,255,0.16); background: rgba(15,23,42,0.78);
            color: #e2e8f0; font-weight: 800; font-size: 0.84rem; cursor: pointer;
            transition: all 0.16s ease; text-align: left;
        }
        .vlen-mod-pill.active {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border-color: #7dd3fc; color: #ffffff; box-shadow: 0 6px 18px rgba(56,189,248,0.28);
        }
        .vlen-subtabs {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.35rem;
        }
        .vlen-subtab {
            padding: 0.55rem 1.05rem; border-radius: 10px;
            border: 1.5px solid rgba(148,163,184,0.28); background: rgba(30,41,59,0.72);
            color: #cbd5e1; font-weight: 800; font-size: 0.85rem; cursor: pointer;
        }
        .vlen-subtab.active {
            border-color: #fde047; background: rgba(250,204,21,0.18); color: #fef08a;
        }
        .vlen-card {
            background: rgba(15,23,42,0.9); border: 1.5px solid rgba(148,163,184,0.26);
            border-radius: 18px; padding: 1.25rem 1.35rem; margin-bottom: 1.15rem;
            box-shadow: 0 10px 26px rgba(0,0,0,0.32);
        }
        .vlen-diag-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem; margin: 1rem 0;
        }
        .vlen-svg-box {
            background: #070d19; border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px; padding: 0.75rem; min-height: 165px;
            display: flex; align-items: center; justify-content: center;
        }
        .vlen-pair-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.85rem; margin: 1.1rem 0;
        }
        .vlen-pair-btn {
            background: rgba(30,41,59,0.88); border: 2px solid rgba(148,163,184,0.32);
            border-radius: 14px; padding: 1.05rem; cursor: pointer; text-align: center;
            color: #f8fafc; transition: all 0.16s ease;
        }
        .vlen-pair-btn:hover:not(:disabled) { border-color: #38bdf8; transform: translateY(-2px); }
        .vlen-listen-big {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: 1.5px solid #38bdf8; color: #fff; font-size: 1.02rem; font-weight: 900;
            padding: 0.8rem 1.5rem; border-radius: 14px; cursor: pointer;
            display: inline-flex; align-items: center; gap: 0.5rem; margin: 0.75rem 0;
        }
        .vlen-modal-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
            z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;
        }
        .vlen-modal-card {
            background: #0f172a; border: 2px solid #38bdf8; border-radius: 18px;
            max-width: 680px; width: 100%; max-height: 86vh; overflow-y: auto; padding: 1.25rem;
        }
        @media (max-width: 600px) {
            .vlen-hero h1 { font-size: 1.45rem; }
            .vlen-card { padding: 1rem; }
        }
    `;
    viewContainer.appendChild(styleEl);

    const SOUND_MODULES = [
        {
            id: 'bloedt_d',
            badge: 'Focus 1',
            titleDa: '1. Blødt d – "Ånde på brillerne"',
            titleEn: '1. The Soft D (blødt d) — "Fogging up glasses"',
            descDa: 'Engelsktalende forveksler ofte dansk blødt d (mad, brød, gade) med engelsk "th" ("this") eller et hårdt "d/l". På dansk hviler tungespidsen helt fladt bag undertænderne, mens varm luft strømmer blødt over tungen — uden kontakt til fortænderne.',
            descEn: 'English speakers often mistake the Danish <strong>soft d</strong> (<em>mad, brød, gade</em>) for English <em>"th"</em> (like <em>this</em>) or a hard <em>d/l</em>. In Danish, do <strong>NOT</strong> put your tongue between your teeth! Rest the tip of your tongue flat <strong>behind your lower teeth</strong> and let warm voiced air flow gently over the middle of your tongue — almost like fogging up a pair of glasses.',
            optA: { label: 'Danish soft d (brød, mad)', ex: 'brød, mad, sød, gade', words: ['brød', 'mad', 'sød', 'gade'] },
            optB: { label: 'English trap: "th" or hard "d"', ex: 'dag (hard d at the start only)', words: ['dag', 'dør', 'dansk'] },
            trickEn: '<strong>Golden rule:</strong> At the start of a word (<em><strong>d</strong>ag, <strong>d</strong>ansk</em>), Danish "d" is firm. In the middle or at the end (<em>ma<strong>d</strong>, brø<strong>d</strong>, sø<strong>d</strong></em>), anchor the tip of your tongue behind your bottom teeth and relax your jaw — never bite your tongue like English "th"!',
            diagTitleA: 'Soft d (mad, brød): tongue tip anchored behind lower teeth, warm air flowing freely',
            diagTitleB: 'English trap: tongue moves up to upper teeth ("th" / hard "d")!',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="96" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 115 Q 112 108 75 112" fill="none" stroke="#22c55e" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 86 Q 72 86 32 82" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="5,4"/>
                    <text x="120" y="62" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">Warm voiced air (no friction)</text>
                    <text x="120" y="138" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">Tongue tip flat behind lower teeth!</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="66" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 110 Q 112 95 72 78" fill="none" stroke="#ef4444" stroke-width="7" stroke-linecap="round"/>
                    <line x1="56" y1="68" x2="56" y2="95" stroke="#fde047" stroke-width="3"/>
                    <text x="120" y="48" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">Trap: tongue touches upper teeth!</text>
                </svg>`,
            minimalPairs: [
                { a: 'mad', b: 'mat', meanA: 'food (soft d)', meanB: 'matte / dull (crisp t)', ctxA: 'Vi laver mad i køkkenet.', ctxB: 'Farven er helt mat.' },
                { a: 'glad', b: 'glat', meanA: 'happy (soft d)', meanB: 'slippery (crisp t)', ctxA: 'Jeg er meget glad i dag.', ctxB: 'Vejen er glat af is.' },
                { a: 'bad', b: 'bat', meanA: 'bath / shower (soft d)', meanB: 'bat / racket (crisp t)', ctxA: 'Jeg tager et varmt bad.', ctxB: 'Han spiller med et rødt bat.' },
                { a: 'sød', b: 'sæt', meanA: 'sweet / kind (soft d)', meanB: 'set / put (crisp t)', ctxA: 'Kagen er meget sød.', ctxB: 'Sæt dig ned her.' }
            ],
            speechExercises: [
                { text: 'Jeg spiser godt brød og sød mad.', targetWords: ['godt', 'brød', 'sød', 'mad'], hintDa: 'Hold tungespidsen fladt bag undertænderne ved brød, sød, mad.', hintEn: 'Anchor your tongue tip behind your lower teeth on brød, sød, and mad.' },
                { text: 'Gaden er bred og flad.', targetWords: ['gaden', 'bred', 'flad'], hintDa: 'Ånd blødt ud i "gaden", "bred", "flad".', hintEn: 'Keep the tongue low and relaxed in gaden, bred, and flad.' }
            ]
        },
        {
            id: 'y_oe_aa',
            badge: 'Focus 2',
            titleDa: '2. Rundede vokaler: Y / Ø / Å (ingen engelsk glidelyd)',
            titleEn: '2. Rounded Vowels: Y / Ø / Å — "Tight lips, zero glide"',
            descDa: 'Engelsk mangler de runde fortungevokaler Y og Ø og har en stærk tendens til at gøre vokaler til diftonger (glidelyde som i "go" / "too"). På dansk skal læberne holdes helt stille i en fast rund form hele vokalen igennem.',
            descEn: 'Danish has three rounded vowels that English lacks in pure form:<br>1) <strong>Y (<em>lys, ny</em>):</strong> Put your tongue in English <em>"ee"</em> (<em>see</em>), then push your lips into a tight kiss!<br>2) <strong>Ø (<em>brød, dør</em>):</strong> Put your tongue in English <em>"eh/ay"</em>, then round your lips firmly — without sliding!<br>3) <strong>Å (<em>år, blå, gå</em>):</strong> A deep, steady rounded <em>"aw"</em> (like British <em>more</em>) — never let it glide into English <em>"oh-w"</em>!',
            optA: { label: 'Rounded: Y / Ø / Å', ex: 'lys, ny, brød, dør, år, blå', words: ['lys', 'ny', 'brød', 'dør', 'år', 'blå'] },
            optB: { label: 'Unrounded contrast: I / E', ex: 'lis, ni, bred, der', words: ['lis', 'ni', 'bred', 'der'] },
            trickEn: '<strong>2-second mirror trick:</strong> Say a long English <em>"eeee..."</em>, freeze your tongue, and slowly round your lips into a tight O ➔ instant Danish <strong>Y</strong>! Do the same from <em>"eeeeh..."</em> ➔ instant Danish <strong>Ø</strong>! For <strong>Å</strong>, drop your jaw and keep your lips completely still.',
            diagTitleA: 'Y, Ø & Å: firm rounded kiss-lips held completely still',
            diagTitleB: 'I & E: lips stretched wide like a flat smile',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="120" cy="78" r="34" fill="none" stroke="#f59e0b" stroke-width="4"/>
                    <circle cx="120" cy="78" r="14" fill="#ef4444" opacity="0.85"/>
                    <text x="120" y="30" text-anchor="middle" fill="#fde047" font-size="11" font-weight="bold">Y / Ø / Å: Tight rounded lips (no glide!)</text>
                    <text x="120" y="138" text-anchor="middle" fill="#cbd5e1" font-size="11">lys • ny • brød • dør • år • blå</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <ellipse cx="120" cy="78" rx="52" ry="18" fill="none" stroke="#38bdf8" stroke-width="4"/>
                    <line x1="80" y1="78" x2="160" y2="78" stroke="#7dd3fc" stroke-width="3"/>
                    <text x="120" y="30" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">I &amp; E: Stretched flat lips (smile)</text>
                    <text x="120" y="138" text-anchor="middle" fill="#cbd5e1" font-size="11">Lis • ni • bred • der</text>
                </svg>`,
            minimalPairs: [
                { a: 'lys', b: 'lis', meanA: 'light / candle (rounded Y)', meanB: 'name Lis (flat I)', ctxA: 'Vi tænder lys i stuen.', ctxB: 'Min veninde hedder Lis.' },
                { a: 'ny', b: 'ni', meanA: 'new (rounded Y)', meanB: 'nine (flat I)', ctxA: 'Jeg har en ny cykel.', ctxB: 'Timen starter klokken ni.' },
                { a: 'brød', b: 'bred', meanA: 'bread (rounded Ø)', meanB: 'wide (flat E)', ctxA: 'Jeg køber frisk brød.', ctxB: 'Vejen er meget bred.' },
                { a: 'dør', b: 'der', meanA: 'door (rounded Ø)', meanB: 'there (flat E)', ctxA: 'Luk den hvide dør.', ctxB: 'Der står en stol.' },
                { a: 'år', b: 'er', meanA: 'year (deep rounded Å)', meanB: 'is / are (flat E)', ctxA: 'Et år har tolv måneder.', ctxB: 'Det er en god dag.' }
            ],
            speechExercises: [
                { text: 'Vi køber nyt brød og går ud i det blå år.', targetWords: ['køber', 'nyt', 'brød', 'går', 'blå', 'år'], hintDa: 'Hold læberne rundede og helt stille på køber, nyt, brød, går, blå og år.', hintEn: 'Keep your lips rounded and steady on køber, nyt, brød, går, blå, and år — no English glide!' },
                { text: 'Den nye dør i huset er lys og pæn.', targetWords: ['nye', 'dør', 'lys'], hintDa: 'Stram kyssemund på nye, dør og lys.', hintEn: 'Use tight rounded lips on nye, dør, and lys.' }
            ]
        },
        {
            id: 'dansk_r',
            badge: 'Focus 3',
            titleDa: '3. Dansk bagtunge-R (aldrig krøllet engelsk tungespids-R)',
            titleEn: '3. Danish Back-Tongue R — "Deep in the throat, never curled"',
            descDa: 'Engelsk R dannes ved at krølle tungespidsen bagud midt i munden ("red, car"). Dansk R dannes langt tilbage mod svælget i forlyd (rød, ris, regn), mens tungespidsen bliver helt stille nede i munden — og i udlyd (mor, spiser) smelter R helt sammen med vokalen.',
            descEn: 'English <em>R</em> curls the tip of the tongue back in the middle of the mouth (<em>red, car</em>). In Danish, the tip of your tongue stays <strong>completely still at the bottom of your mouth</strong>!<br>1) <strong>At the start of a syllable (<em>rød, ris, regn</em>):</strong> Pull the back of your tongue gently toward the throat for a soft uvular breath.<br>2) <strong>At the end of a syllable (<em>mor, bor, spiser</em>):</strong> Never curl an English "r" — it melts into a relaxed open vowel (<em>"mo-ah", "spee-sah"</em>)!',
            optA: { label: 'Initial throat-R (rød, ris)', ex: 'rød, ris, regn, rejse', words: ['rød', 'ris', 'regn', 'rejse'] },
            optB: { label: 'Final vocalic -r (mor, spiser)', ex: 'mor, far, bor, spiser', words: ['mor', 'far', 'bor', 'spiser'] },
            trickEn: '<strong>Instant fix:</strong> Rest your tongue tip firmly against your bottom teeth so it <em>cannot</em> curl! Then gently tighten the very back of your throat (like a tiny silent gargle) for <em><strong>r</strong>ød, <strong>r</strong>is</em> — and completely relax it on final <em>-r</em> in <em>mo<strong>r</strong>, spise<strong>r</strong></em>.',
            diagTitleA: 'Initial R (rød, ris): back of tongue pulls gently toward throat; tip stays down',
            diagTitleB: 'Final -r (mor, spiser): zero tongue curl — melts smoothly into an open vowel',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 162 125 Q 152 80 120 82 Q 85 95 72 110" fill="none" stroke="#f472b6" stroke-width="7" stroke-linecap="round"/>
                    <circle cx="152" cy="76" r="14" fill="rgba(239,68,68,0.28)" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,2"/>
                    <text x="108" y="48" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">Back-tongue R in throat (rød, ris)</text>
                    <text x="108" y="138" text-anchor="middle" fill="#94a3b8" font-size="10">Tongue tip stays down &amp; flat</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 155 118 Q 115 112 75 112" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 85 Q 75 88 35 88" fill="none" stroke="#4ade80" stroke-width="3.5" stroke-linecap="round"/>
                    <text x="115" y="55" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">mor / spiser ← Final -r melts into vowel!</text>
                </svg>`,
            minimalPairs: [
                { a: 'ris', b: 'is', meanA: 'rice (initial throat-R)', meanB: 'ice / ice cream (no R)', ctxA: 'Vi spiser ris til aftensmad.', ctxB: 'Børnene spiser en stor is.' },
                { a: 'ret', b: 'et', meanA: 'dish / quite (initial throat-R)', meanB: 'one / a (no R)', ctxA: 'Det er en god ret.', ctxB: 'Jeg har et spørgsmål.' },
                { a: 'rød', b: 'sød', meanA: 'red (back-tongue R)', meanB: 'sweet (S start)', ctxA: 'Bilen er rød.', ctxB: 'Kagen er sød.' },
                { a: 'mor', b: 'mod', meanA: 'mother (vocalic final -r)', meanB: 'courage / toward (soft d)', ctxA: 'Min mor bor i Aarhus.', ctxB: 'Han har meget mod.' }
            ],
            speechExercises: [
                { text: 'Min mor spiser rød frugt og ris i regnvejr.', targetWords: ['mor', 'spiser', 'rød', 'ris', 'regnvejr'], hintDa: 'Blødt bagtunge-r i rød/ris/regnvejr — og lad slut-r i mor/spiser smelte blødt ud.', hintEn: 'Soft throat-R in rød, ris, regnvejr — and let final -r in mor and spiser melt into a soft vowel!' },
                { text: 'Vi rejser med far til en stor by.', targetWords: ['rejser', 'far', 'stor'], hintDa: 'Hold tungespidsen nede i munden på rejser, far og stor.', hintEn: 'Keep your tongue tip down on rejser, far, and stor — no curled English R!' }
            ]
        },
        {
            id: 'stoed',
            badge: 'Focus 4',
            titleDa: '4. Stød – det lille stemmebåndsknik der ændrer betydning',
            titleEn: '4. Stød — The Danish Glottal Catch (hun vs. hund)',
            descDa: 'Dansk stød er et kort, blødt knik eller knirk i stemmebåndene midt i en lang vokal eller stemt konsonant (n, l, r, d). Det er ikke et hårdt stop, men en hurtig opstramning — og det skiller helt almindelige ord som hun/hund, mor/mord og ven/vend.',
            descEn: '<strong>Stød</strong> is Denmark\'s most famous sound feature: a tiny, gentle creaky catch in the vocal cords — similar to a much softer version of the little catch in English <em>"uh-oh"</em> or Cockney <em>"bu\'er"</em>, but occurring smoothly <strong>inside</strong> a long vowel or voiced consonant (<em>n, l, r, d</em>).<br><br>Why does it matter? Because stød changes meaning! <em>hun</em> (she) has no stød, while <em>hun\'d</em> (dog) has stød; <em>mor</em> (mother) has no stød, while <em>mor\'d</em> (murder) has stød!',
            optA: { label: 'With stød (tiny catch)', ex: 'hund, mord, vend, bønder', words: ['hund', 'mord', 'vend', 'bønder'] },
            optB: { label: 'Without stød (smooth flow)', ex: 'hun, mor, ven, bønner', words: ['hun', 'mor', 'ven', 'bønner'] },
            trickEn: '<strong>Feel it in your throat:</strong> Put two fingers lightly on your throat and say English <em>"uh-oh"</em> — feel that tiny squeeze in the middle? Now make it <strong>half as strong</strong> and tuck it onto the end of the vowel/n in <em>hun<strong>\'</strong>d</em> (dog) vs. smooth flowing <em>hun</em> (she)!',
            diagTitleA: 'With stød (hund, mord): smooth voice + tiny creaky dip in vocal cords',
            diagTitleB: 'Without stød (hun, mor): smooth, uninterrupted vocal-cord wave',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 22 82 Q 40 52 58 82 Q 76 112 94 82 L 106 82 L 114 74 L 122 90 L 130 78 L 138 82 Q 160 66 185 82 Q 202 92 218 82" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="118" cy="82" r="18" fill="rgba(239,68,68,0.22)" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,2"/>
                    <text x="120" y="34" text-anchor="middle" fill="#fde047" font-size="11" font-weight="bold">Stød: tiny creaky catch (hund, mord)</text>
                    <text x="120" y="136" text-anchor="middle" fill="#cbd5e1" font-size="11">hund • mord • vend • bønder</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 22 82 Q 46 50 70 82 Q 94 114 118 82 Q 142 50 166 82 Q 190 114 218 82" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                    <text x="120" y="34" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">No stød: smooth continuous flow (hun, mor)</text>
                    <text x="120" y="136" text-anchor="middle" fill="#cbd5e1" font-size="11">hun • mor • ven • bønner</text>
                </svg>`,
            minimalPairs: [
                { a: 'hund', b: 'hun', meanA: 'dog (with stød)', meanB: 'she (smooth, no stød)', ctxA: 'Vi har en glad hund.', ctxB: 'Hun bor i København.' },
                { a: 'mord', b: 'mor', meanA: 'murder (with stød)', meanB: 'mother (smooth, no stød)', ctxA: 'Bogen handler om et mord.', ctxB: 'Min mor laver kaffe.' },
                { a: 'vend', b: 'ven', meanA: 'turn! (with stød)', meanB: 'friend (smooth, no stød)', ctxA: 'Vend dig om og kig!', ctxB: 'Han er min gode ven.' },
                { a: 'bønder', b: 'bønner', meanA: 'farmers (with stød)', meanB: 'beans (smooth, no stød)', ctxA: 'Mange bønder bor på landet.', ctxB: 'Vi spiser bønner og ris.' }
            ],
            speechExercises: [
                { text: 'Hun har en lille hund og en god ven.', targetWords: ['hun', 'hund', 'ven'], hintDa: 'Glid blødt på "hun" og "ven", og lav et lille stød på "hund".', hintEn: 'Flow smoothly on hun and ven, and add a tiny gentle stød catch on hund!' },
                { text: 'Min mor spiser bønner med sin ven.', targetWords: ['mor', 'bønner', 'ven'], hintDa: 'Hold stemmen helt glat uden stød på mor, bønner og ven.', hintEn: 'Keep your voice completely smooth (no stød) on mor, bønner, and ven.' }
            ]
        }
    ];

    function openHomeworkModal() {
        const existing = document.querySelector('#vlen-hw-modal');
        if (existing) existing.remove();
        const overlay = document.createElement('div');
        overlay.id = 'vlen-hw-modal';
        overlay.className = 'vlen-modal-overlay';
        const isDa = getLang() === 'da';
        const tabLabels = {
            principles: isDa ? '1. Mouth & rules (Teori)' : '1. Mouth & rules',
            pairs: isDa ? '2. Listening quiz (Lyttequiz)' : '2. Minimal pairs quiz',
            speech: isDa ? '3. Microphone practice (Udtale)' : '3. Speaking practice'
        };
        overlay.innerHTML = `
            <div class="vlen-modal-card">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:1px solid rgba(255,255,255,0.12);">
                    <div>
                        <div style="font-size:0.74rem; font-weight:900; color:#38bdf8; text-transform:uppercase;">Homework Links • English</div>
                        <h2 style="margin:0.15rem 0 0; font-size:1.2rem; color:#fff;">${isDa ? 'Direkte links til alle 4 fokuslyde' : 'Direct links to all 4 key Danish sounds'}</h2>
                    </div>
                    <button type="button" class="vlen-btn" id="vlen-hw-close">✕ Close</button>
                </div>
                <div style="display:flex; flex-direction:column; gap:0.9rem;">
                    ${SOUND_MODULES.map(m => `
                        <div style="background:rgba(30,41,59,0.75); border:1px solid rgba(148,163,184,0.25); border-radius:12px; padding:0.85rem;">
                            <div style="font-weight:800; color:#fde047; margin-bottom:0.5rem;">${m.titleEn}${isDa ? ` <span style="color:#94a3b8; font-size:0.82rem;">(${m.titleDa})</span>` : ''}</div>
                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                ${VALID_TABS.map(tid => {
                                    const url = `${window.location.origin}${window.location.pathname}#/${getLang() || 'en'}/vanskelige_lyde_engelsk/${m.id}/${tid}`;
                                    return `
                                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap; background:rgba(15,23,42,0.7); padding:0.45rem 0.7rem; border-radius:8px;">
                                            <span style="font-size:0.82rem; color:#e2e8f0;">${tabLabels[tid]}</span>
                                            <button type="button" class="vlen-btn" data-copy-url="${url}" style="padding:0.3rem 0.7rem; font-size:0.78rem; border-color:#38bdf8;">Copy link</button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        overlay.querySelector('#vlen-hw-close').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        overlay.querySelectorAll('[data-copy-url]').forEach(b => {
            b.onclick = () => copyToClipboard(b.dataset.copyUrl, isDa ? 'Lektie-link' : 'Exercise link');
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
        topBar.className = 'vlen-top-bar';
        topBar.innerHTML = `
            <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                <button type="button" class="vlen-btn" id="vlen-back-main">${isDa ? '← Home (Forside)' : '← Home'}</button>
                <button type="button" class="vlen-btn" id="vlen-back-mss" style="border-color:#38bdf8; color:#7dd3fc;">← Back to "My Language vs. Danish"</button>
            </div>
            <button type="button" class="vlen-btn" id="vlen-hw-btn" style="border-color:#fde047; color:#fde047;">${isDa ? 'Homework links (Lektier)' : 'Homework links'}</button>
        `;
        topBar.querySelector('#vlen-back-main').onclick = handleBackToMain;
        topBar.querySelector('#vlen-back-mss').onclick = handleBackToMSS;
        topBar.querySelector('#vlen-hw-btn').onclick = openHomeworkModal;
        viewContainer.appendChild(topBar);

        const hero = document.createElement('div');
        hero.className = 'vlen-hero';
        hero.innerHTML = `
            <div class="vlen-hero-kicker">${isDa ? 'Danish Pronunciation Trainer for English Speakers • Level 2 (Trin 2)' : 'Danish Pronunciation Trainer for English Speakers • Level 2'}</div>
            <h1>${modData.titleEn}</h1>
            <p>${isDa ? `${modData.titleDa} — ` : ''}Mouth &amp; tongue position, minimal-pair listening quiz, and live microphone practice</p>
        `;
        viewContainer.appendChild(hero);

        const modNav = document.createElement('div');
        modNav.className = 'vlen-mod-nav';
        SOUND_MODULES.forEach(m => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `vlen-mod-pill ${m.id === activeModuleId ? 'active' : ''}`;
            btn.textContent = isDa
                ? `${m.badge}: ${m.titleDa.replace(/^\d+\.\s*/, '')}`
                : `${m.badge}: ${m.titleEn.replace(/^\d+\.\s*/, '')}`;
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
        subTabs.className = 'vlen-subtabs';
        [
            { id: 'principles', label: isDa ? '1. Mouth & rules (Teori)' : '1. Mouth & rules' },
            { id: 'pairs', label: isDa ? '2. Minimal pairs (Lyttequiz)' : '2. Minimal pairs' },
            { id: 'speech', label: isDa ? '3. Speaking practice (Udtale)' : '3. Speaking practice' }
        ].forEach(st => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = `vlen-subtab ${st.id === activeTab ? 'active' : ''}`;
            b.textContent = st.label;
            b.onclick = () => { activeTab = st.id; renderView(); };
            subTabs.appendChild(b);
        });
        viewContainer.appendChild(subTabs);

        const content = document.createElement('div');
        viewContainer.appendChild(content);

        if (activeTab === 'principles') {
            const card = document.createElement('div');
            card.className = 'vlen-card';
            const opt = activeTarget === 'a' ? modData.optA : modData.optB;
            card.innerHTML = `
                <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:1rem;">
                    <button type="button" class="vlen-btn" id="vlen-tog-a" style="${activeTarget === 'a' ? 'background:#0284c7; border-color:#7dd3fc;' : ''}">${modData.optA.label}</button>
                    <button type="button" class="vlen-btn" id="vlen-tog-b" style="${activeTarget === 'b' ? 'background:#be123c; border-color:#fda4af;' : ''}">${modData.optB.label}</button>
                </div>
                <div class="vlen-diag-grid">
                    <div>
                        <div style="font-weight:800; color:#7dd3fc; margin-bottom:0.45rem;">${activeTarget === 'a' ? modData.diagTitleA : modData.diagTitleB}</div>
                        <div class="vlen-svg-box">${modData.diagSvg(activeTarget === 'a')}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; justify-content:space-between; gap:0.75rem;">
                        <div style="font-size:0.93rem; color:#e2e8f0; line-height:1.62;">${modData.descEn}</div>
                        ${isDa ? `<div style="font-size:0.86rem; color:#94a3b8; line-height:1.5; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.08);"><strong style="color:#cbd5e1;">Dansk lærer-note:</strong> ${modData.descDa}</div>` : ''}
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                            ${opt.words.map(w => `<button type="button" class="vlen-btn" data-say="${w}" style="border-color:#38bdf8;">▶ ${w}</button>`).join('')}
                        </div>
                    </div>
                </div>
                <div style="background:rgba(234,179,8,0.14); border:1px solid rgba(250,204,21,0.45); border-radius:12px; padding:0.85rem 1rem; color:#fef08a; font-size:0.9rem; line-height:1.6;">
                    ${modData.trickEn}
                </div>
            `;
            card.querySelector('#vlen-tog-a').onclick = () => { activeTarget = 'a'; renderView(); };
            card.querySelector('#vlen-tog-b').onclick = () => { activeTarget = 'b'; renderView(); };
            card.querySelectorAll('[data-say]').forEach(b => {
                b.onclick = () => playAudio(b.dataset.say, 0.8);
            });
            content.appendChild(card);
        } else if (activeTab === 'pairs') {
            const pair = modData.minimalPairs[pairQuizIdx];
            if (!pair._target) pair._target = Math.random() < 0.5 ? 'a' : 'b';
            const targetWord = pair._target === 'a' ? pair.a : pair.b;
            const qCard = document.createElement('div');
            qCard.className = 'vlen-card';
            qCard.style.textAlign = 'center';
            qCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; color:#94a3b8; font-weight:800; font-size:0.86rem; margin-bottom:0.8rem;">
                    <span>Pair ${pairQuizIdx + 1} of ${modData.minimalPairs.length}</span>
                    <span style="color:#4ade80;">Score: ${pairScore} / ${modData.minimalPairs.length}</span>
                </div>
                <p style="color:#cbd5e1; margin:0 0 0.5rem;">Listen to the Danish word and pick the matching card:</p>
                <button type="button" class="vlen-listen-big" id="vlen-play-pair">${isDa ? '▶ Listen to Danish pronunciation (Lyt)' : '▶ Listen to Danish pronunciation'}</button>
                <div class="vlen-pair-grid">
                    <button type="button" class="vlen-pair-btn" id="vlen-choice-a">
                        <div style="font-size:1.5rem; font-weight:900; color:#38bdf8;">${pair.a}</div>
                        <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.25rem;">${pair.meanA}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxA}"</div>
                    </button>
                    <button type="button" class="vlen-pair-btn" id="vlen-choice-b">
                        <div style="font-size:1.5rem; font-weight:900; color:#f472b6;">${pair.b}</div>
                        <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.25rem;">${pair.meanB}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxB}"</div>
                    </button>
                </div>
                <div id="vlen-pair-fb" style="margin-top:0.75rem;"></div>
                <div style="display:flex; justify-content:space-between; margin-top:1.1rem; gap:0.5rem; flex-wrap:wrap;">
                    <button type="button" class="vlen-btn" id="vlen-prev-p" ${pairQuizIdx === 0 ? 'disabled' : ''}>← Previous</button>
                    <button type="button" class="vlen-btn" id="vlen-next-p">${pairQuizIdx === modData.minimalPairs.length - 1 ? 'Restart ↺' : 'Next pair →'}</button>
                </div>
            `;
            qCard.querySelector('#vlen-play-pair').onclick = () => playAudio(targetWord, 0.78);
            const fbEl = qCard.querySelector('#vlen-pair-fb');
            const btnA = qCard.querySelector('#vlen-choice-a');
            const btnB = qCard.querySelector('#vlen-choice-b');
            function handlePick(pick) {
                btnA.disabled = true;
                btnB.disabled = true;
                const ok = pick === pair._target;
                if (ok) pairScore++;
                fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};">
                    ${ok ? `Spot on! The word was "${targetWord}".` : `Almost! The word was "${targetWord}". Listen again closely.`}
                </div>`;
                playAudio(targetWord, 0.75);
            }
            btnA.onclick = () => handlePick('a');
            btnB.onclick = () => handlePick('b');
            qCard.querySelector('#vlen-prev-p').onclick = () => { if (pairQuizIdx > 0) { pairQuizIdx--; renderView(); } };
            qCard.querySelector('#vlen-next-p').onclick = () => {
                pair._target = undefined;
                if (pairQuizIdx < modData.minimalPairs.length - 1) pairQuizIdx++;
                else { pairQuizIdx = 0; pairScore = 0; }
                renderView();
            };
            content.appendChild(qCard);
        } else {
            const ex = modData.speechExercises[speechExerciseIdx] || modData.speechExercises[0];
            const sCard = document.createElement('div');
            sCard.className = 'vlen-card';
            sCard.style.textAlign = 'center';
            const promptHtml = ex.text.split(' ').map(w => {
                const clean = w.toLowerCase().replace(/[.,!?]/g, '');
                return ex.targetWords.includes(clean)
                    ? `<span style="color:#38bdf8; text-decoration:underline;">${w}</span>`
                    : `<span>${w}</span>`;
            }).join(' ');
            sCard.innerHTML = `
                <div style="font-size:1.45rem; font-weight:900; margin:0.4rem 0 0.65rem;">${promptHtml}</div>
                <p style="color:#cbd5e1; margin:0 0 0.85rem;">Read this Danish sentence aloud, paying special attention to the underlined words:</p>
                ${consecutiveSpeechStreak > 0 ? `<div style="color:#fde047; font-weight:800; margin-bottom:0.7rem;">Streak: ${consecutiveSpeechStreak} in a row</div>` : ''}
                <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap; margin:0.65rem 0;">
                    <button type="button" class="vlen-listen-big" id="vlen-say-ex" style="margin:0;">▶ Listen to model</button>
                    <button type="button" class="vlen-btn" id="vlen-mic-btn" style="background:#dc2626; border-color:#f87171; padding:0.8rem 1.4rem; font-size:1rem;">Speak now</button>
                </div>
                <div id="vlen-speech-status" style="color:#94a3b8; font-size:0.9rem; margin-top:0.7rem;">Press "Speak now" and read clearly in Danish.</div>
                <div id="vlen-speech-fb" style="margin-top:0.7rem;"></div>
                <div style="text-align:left; background:rgba(30,41,59,0.7); border-radius:10px; padding:0.8rem; margin-top:1rem; font-size:0.86rem; color:#cbd5e1;">
                    <strong>Tip:</strong> ${ex.hintEn}${isDa ? `<br><span style="color:#94a3b8;"><strong>Dansk:</strong> ${ex.hintDa}</span>` : ''}
                </div>
                ${modData.speechExercises.length > 1 ? `
                    <div style="display:flex; justify-content:space-between; margin-top:1rem; gap:0.5rem;">
                        <button type="button" class="vlen-btn" id="vlen-prev-s" ${speechExerciseIdx === 0 ? 'disabled' : ''}>← Sentence ${speechExerciseIdx}</button>
                        <button type="button" class="vlen-btn" id="vlen-next-s" ${speechExerciseIdx === modData.speechExercises.length - 1 ? 'disabled' : ''}>Sentence ${speechExerciseIdx + 2} →</button>
                    </div>
                ` : ''}
            `;
            sCard.querySelector('#vlen-say-ex').onclick = () => playAudio(ex.text, 0.84);
            const prevS = sCard.querySelector('#vlen-prev-s');
            if (prevS) prevS.onclick = () => { if (speechExerciseIdx > 0) { speechExerciseIdx--; renderView(); } };
            const nextS = sCard.querySelector('#vlen-next-s');
            if (nextS) nextS.onclick = () => { if (speechExerciseIdx < modData.speechExercises.length - 1) { speechExerciseIdx++; renderView(); } };
            const micBtn = sCard.querySelector('#vlen-mic-btn');
            const statusEl = sCard.querySelector('#vlen-speech-status');
            const fbEl = sCard.querySelector('#vlen-speech-fb');
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRec) {
                statusEl.textContent = 'Your browser does not support speech recognition (try Chrome or Safari).';
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
                        statusEl.textContent = 'Listening... speak in Danish now!';
                        statusEl.style.color = '#4ade80';
                    } catch (_) {}
                };
                rec.onresult = (ev) => {
                    isSpeechRecording = false;
                    const said = ev.results[0][0].transcript.trim();
                    statusEl.textContent = `Heard: "${said}"`;
                    const words = said.toLowerCase().split(/\s+/).map(w => w.replace(/[.,!?]/g, ''));
                    const hits = ex.targetWords.filter(tw => words.includes(tw));
                    const ok = hits.length === ex.targetWords.length;
                    if (ok) consecutiveSpeechStreak++; else consecutiveSpeechStreak = 0;
                    fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};">
                        ${ok ? `Great pronunciation! Recognized all key words (${hits.join(', ')}).` : `Good try! Practice again focusing on: ${ex.targetWords.join(', ')}`}
                    </div>`;
                };
                rec.onerror = () => { isSpeechRecording = false; statusEl.textContent = 'Could not hear clearly. Please try again.'; };
                rec.onend = () => { isSpeechRecording = false; };
            }
            content.appendChild(sCard);
        }
    }

    renderView();
    container.appendChild(viewContainer);
}
