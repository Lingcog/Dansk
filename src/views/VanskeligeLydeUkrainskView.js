import { getLang } from '../utils/i18n.js';

/**
 * VanskeligeLydeUkrainskView
 * Komplet pædagogisk udtale-træningsflade til ukrainsktalende danskkursister.
 *
 * Fokus på de 5 lyde og lydmønstre, der især giver ukrainere vanskeligheder på dansk:
 *   1. Blødt d – "Ånde på brillerne" (aldrig hårdt ukrainsk д eller engelsk th)
 *   2. P / T / K med kraftigt pust – Papir-testen (kontra ukrainske uaspirerede п, т, к)
 *   3. Dansk R – Svælg-kragelyd & smeltet vokal-r (aldrig rullet ukrainsk р)
 *   4. Kyssemund Y & Ø vs. I & E (og uden ukrainsk ю / j-glidelyd!)
 *   5. Let åndet H & rent næse-NG (aldrig skrabende х eller ekstra -г/-к efter ng)
 */
export function renderVanskeligeLydeUkrainskView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    function handleBackToMain() {
        if (typeof navigateFn === 'function') {
            navigateFn('main');
        } else {
            const lang = getLang() || 'uk';
            window.location.hash = `#/${lang}/main`;
        }
    }

    function handleBackToMSS() {
        if (typeof navigateFn === 'function') {
            navigateFn('mit_sprog_sammenlignet');
        } else {
            const lang = getLang() || 'uk';
            window.location.hash = `#/${lang}/mit_sprog_sammenlignet`;
        }
    }

    function showCopyToast(msg) {
        let toast = document.querySelector('#vlu-copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'vlu-copy-toast';
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
                showCopyToast(`📋 ${label} kopieret (скопійовано)!`);
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
        showCopyToast(`📋 ${label} kopieret (скопійовано)!`);
    }

    const VALID_MODULES = ['bloedt_d', 'p_t_k_pust', 'dansk_r', 'y_og_oe', 'h_og_ng'];
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
            const idx = segs.findIndex(s => s === 'vanskelige_lyde_ukrainsk' || s === 'ukrainske_lyde');
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
        const lang = getLang() || 'uk';
        const newHash = `#/${lang}/vanskelige_lyde_ukrainsk/${activeModuleId}/${activeTab}`;
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
    viewContainer.className = 'vlu-wrapper';

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .vlu-wrapper {
            max-width: 1040px;
            margin: 0 auto;
            padding: 1.25rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        .vlu-top-bar {
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.35rem;
            padding-bottom: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .vlu-btn {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(30,41,59,0.86); border: 1px solid rgba(148,163,184,0.35);
            color: #f8fafc; padding: 0.52rem 1rem; border-radius: 11px;
            font-weight: 800; font-size: 0.86rem; cursor: pointer; transition: all 0.16s ease;
        }
        .vlu-btn:hover { border-color: #38bdf8; transform: translateY(-1px); }
        .vlu-hero { text-align: center; margin-bottom: 1.5rem; }
        .vlu-hero-kicker {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(250,204,21,0.14); border: 1px solid rgba(250,204,21,0.45);
            color: #fde047; padding: 0.35rem 0.95rem; border-radius: 999px;
            font-size: 0.8rem; font-weight: 800; margin-bottom: 0.6rem;
        }
        .vlu-hero h1 { margin: 0 0 0.45rem; font-size: 1.85rem; font-weight: 900; color: #fff; }
        .vlu-hero p { margin: 0 auto; max-width: 720px; color: #cbd5e1; font-size: 0.94rem; line-height: 1.5; }
        .vlu-mod-nav {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.1rem;
        }
        .vlu-mod-pill {
            padding: 0.58rem 0.95rem; border-radius: 12px;
            border: 1.5px solid rgba(255,255,255,0.16); background: rgba(15,23,42,0.78);
            color: #e2e8f0; font-weight: 800; font-size: 0.84rem; cursor: pointer;
            transition: all 0.16s ease; text-align: left;
        }
        .vlu-mod-pill.active {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border-color: #7dd3fc; color: #ffffff; box-shadow: 0 6px 18px rgba(56,189,248,0.28);
        }
        .vlu-subtabs {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.35rem;
        }
        .vlu-subtab {
            padding: 0.55rem 1.05rem; border-radius: 10px;
            border: 1.5px solid rgba(148,163,184,0.28); background: rgba(30,41,59,0.72);
            color: #cbd5e1; font-weight: 800; font-size: 0.85rem; cursor: pointer;
        }
        .vlu-subtab.active {
            border-color: #fde047; background: rgba(250,204,21,0.18); color: #fef08a;
        }
        .vlu-card {
            background: rgba(15,23,42,0.9); border: 1.5px solid rgba(148,163,184,0.26);
            border-radius: 18px; padding: 1.25rem 1.35rem; margin-bottom: 1.15rem;
            box-shadow: 0 10px 26px rgba(0,0,0,0.32);
        }
        .vlu-diag-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem; margin: 1rem 0;
        }
        .vlu-svg-box {
            background: #070d19; border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px; padding: 0.75rem; min-height: 165px;
            display: flex; align-items: center; justify-content: center;
        }
        .vlu-pair-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.85rem; margin: 1.1rem 0;
        }
        .vlu-pair-btn {
            background: rgba(30,41,59,0.88); border: 2px solid rgba(148,163,184,0.32);
            border-radius: 14px; padding: 1.05rem; cursor: pointer; text-align: center;
            color: #f8fafc; transition: all 0.16s ease;
        }
        .vlu-pair-btn:hover:not(:disabled) { border-color: #38bdf8; transform: translateY(-2px); }
        .vlu-listen-big {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: 1.5px solid #38bdf8; color: #fff; font-size: 1.05rem; font-weight: 900;
            padding: 0.8rem 1.6rem; border-radius: 14px; cursor: pointer;
            display: inline-flex; align-items: center; gap: 0.5rem; margin: 0.75rem 0;
        }
        .vlu-modal-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
            z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;
        }
        .vlu-modal-card {
            background: #0f172a; border: 2px solid #38bdf8; border-radius: 18px;
            max-width: 680px; width: 100%; max-height: 86vh; overflow-y: auto; padding: 1.25rem;
        }
        @media (max-width: 600px) {
            .vlu-hero h1 { font-size: 1.45rem; }
            .vlu-card { padding: 1rem; }
        }
    `;
    viewContainer.appendChild(styleEl);

    const SOUND_MODULES = [
        {
            id: 'bloedt_d',
            badge: 'Фокус 1',
            titleDa: '1. Blødt d – "Ånde på brillerne"',
            titleUk: '1. М’яке данське d — «дихання на окуляри»',
            descDa: 'Ukrainsk har kun hårdt [д]. Dansk blødt d (brød, mad, gade) er IKKE et hårdt d og heller ikke engelsk th mellem tænderne. Læg tungespidsen fladt mod bagsiden af undertænderne og pust lunt ud.',
            descUk: 'В українській мові є лише тверде [д] (як у слові «дім»). Данське м’яке <strong>d</strong> (<em>mad, brød, gade</em>) — це НЕ тверде [д] і НЕ англійське міжзубне «th». Покладіть кінчик язика рівно за нижні зуби і тепло видихніть, ніби грієте скельця окулярів перед тим, як їх протерти!',
            optA: { label: '🇩🇰 М’яке d (brød, mad)', ex: 'brød, mad, gade', words: ['brød', 'mad', 'sød', 'gade'] },
            optB: { label: '🇺🇦 Пастка: тверде [д] / англ. [th]', ex: 'dag, dør (попереду — тверде!)', words: ['dag', 'dør', 'dansk'] },
            trickUk: '<strong>Золоте правило:</strong> На початку слова (<em><strong>d</strong>ag</em>) літера d звучить твердо, майже як українське «д». А в середині та кінці (<em>ma<strong>d</strong>, brø<strong>d</strong></em>) — розслабте язик за нижніми зубами і просто тепло видихніть, не перекриваючи повітря!',
            diagTitleA: 'М’яке d (наприкінці слова: mad, brød)',
            diagTitleB: 'Пастка: тверде українське [д] блокує повітря',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="96" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 115 Q 112 108 75 112" fill="none" stroke="#22c55e" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 86 Q 72 86 32 82" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="5,4"/>
                    <text x="18" y="65" fill="#7dd3fc" font-size="11" font-weight="bold">Тепле повітря (як на окуляри)</text>
                    <text x="72" y="138" fill="#4ade80" font-size="11" font-weight="bold">Язик лежить за нижніми зубами!</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="66" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 110 Q 112 95 72 78" fill="none" stroke="#ef4444" stroke-width="7" stroke-linecap="round"/>
                    <line x1="56" y1="68" x2="56" y2="95" stroke="#fde047" stroke-width="3"/>
                    <text x="20" y="48" fill="#fca5a5" font-size="11" font-weight="bold">Язик б’є вгору [д] — занадто твердо!</text>
                </svg>`,
            minimalPairs: [
                { a: 'mad', b: 'mat', meanA: 'їжа (м’яке d)', meanB: 'матовий / тьмяний (тверде t)', ctxA: 'Vi laver mad i køkkenet.', ctxB: 'Farven er helt mat.' },
                { a: 'brød', b: 'brøt', meanA: 'хліб (м’яке d + stød)', meanB: 'тверде t (без м’якості)', ctxA: 'Jeg spiser frisk brød.', ctxB: 'Kort, hård slutlyd.' },
                { a: 'sød', b: 'sæt', meanA: 'солодкий / милий', meanB: 'постав! / речення', ctxA: 'Kagen er meget sød.', ctxB: 'Sæt dig ned her.' },
                { a: 'glad', b: 'glat', meanA: 'радий (м’яке d)', meanB: 'слизький (тверде t)', ctxA: 'Jeg er meget glad i dag.', ctxB: 'Vejen er glat af is.' }
            ],
            speechExercises: [
                { text: 'Jeg spiser godt brød og sød mad.', targetWords: ['godt', 'brød', 'sød', 'mad'], hintDa: 'Hold tungen fladt bag undertænderne ved brød, sød, mad.', hintUk: 'Тримайте язик рівно за нижніми зубами на словах brød, sød, mad.' },
                { text: 'Gaden er bred og flad.', targetWords: ['gaden', 'bred', 'flad'], hintDa: 'Ånd blødt ud i "gaden", "bred", "flad" uden at slå med tungen.', hintUk: 'Видихайте м’яко в словах gaden, bred, flad, не вдаряючи язиком угору.' }
            ]
        },
        {
            id: 'p_t_k_pust',
            badge: 'Фокус 2',
            titleDa: '2. P / T / K med kraftigt pust vs. B / D / G',
            titleUk: '2. Придихові P / T / K проти B / D / G — «тест із папірцем»',
            descDa: 'Ukrainske п, т, к har næsten intet pust (ligesom danske b, d, g). Derfor hører danskere ukrainsk "pære / tale / kaffe" som "bære / dale / gaffe"! Hold et papir foran munden: P, T, K skal få papiret til at flyve.',
            descUk: 'В українській мові звуки <strong>п, т, к</strong> вимовляються без сильного видиху! Для данського вуха українські «п, т, к» звучать точнісінько як данські <strong>b, d, g</strong> — тому <em>kaffe</em> чується як <em>gaffe</em>, а <em>pære</em> як <em>bære</em>. Тримайте аркуш паперу перед ротом: на <strong>p, t, k</strong> папірець має різко відхилитися від пориву повітря!',
            optA: { label: '💨 Сильний видих: P, T, K', ex: 'pære, tale, kaffe', words: ['pære', 'penge', 'tale', 'kaffe'] },
            optB: { label: '🤫 Спокійно без видиху: B, D, G', ex: 'bære, dale, gade', words: ['bære', 'benge', 'dale', 'gade'] },
            trickUk: '<strong>Лайфхак із папірцем:</strong> Поставте долоню або тонкий папірець за 3 см від губ. Коли кажете <em><strong>p</strong>enge, <strong>t</strong>og, <strong>k</strong>old</em>, відчуйте різкий поштовх повітря («п-х», «т-х», «к-х»)!',
            diagTitleA: 'P, T, K на початку слова: вибуховий видих повітря!',
            diagTitleB: 'B, D, G: губи/язик спокійні, папірець не рухається',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="8" ry="6" fill="#ef4444"/>
                    <path d="M 45 84 L 18 70 M 45 84 L 14 84 M 45 84 L 18 98" stroke="#fde047" stroke-width="3.5" stroke-linecap="round"/>
                    <path d="M 10 45 Q 2 84 22 122" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                    <text x="108" y="75" fill="#fde047" font-size="11" font-weight="bold">Порив повітря штовхає папір!</text>
                    <text x="108" y="95" fill="#cbd5e1" font-size="11">pære • tale • kaffe</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="7" ry="5" fill="#38bdf8"/>
                    <line x1="16" y1="45" x2="16" y2="120" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
                    <text x="108" y="75" fill="#7dd3fc" font-size="11" font-weight="bold">Без видиху — папір нерухомий</text>
                    <text x="108" y="95" fill="#cbd5e1" font-size="11">bære • dale • gaffe</text>
                </svg>`,
            minimalPairs: [
                { a: 'pære', b: 'bære', meanA: 'груша / лампочка (з видихом P)', meanB: 'нести (спокійне B)', ctxA: 'Jeg spiser en sød pære.', ctxB: 'Kan du bære tasken?' },
                { a: 'penge', b: 'benge', meanA: 'гроші (сильне P!)', meanB: 'неіснуюче слово (якщо без видиху)', ctxA: 'Jeg har ikke mange penge.', ctxB: 'Без придиху данці почують B!' },
                { a: 'tale', b: 'dale', meanA: 'говорити / промова (видих T)', meanB: 'спускатися / долини (спокійне D)', ctxA: 'Vi skal tale dansk i dag.', ctxB: 'Priserne kan dale lidt.' },
                { a: 'kold', b: 'gold', meanA: 'холодний (видих K!)', meanB: 'безплідний / пустий (спокійне G)', ctxA: 'Vinteren er meget kold.', ctxB: 'Без видиху K перетворюється на G.' }
            ],
            speechExercises: [
                { text: 'Pigen køber kold kaffe og en pære.', targetWords: ['pigen', 'køber', 'kold', 'kaffe', 'pære'], hintDa: 'Lav tydeligt pust på alle P- og K-ord!', hintUk: 'Зробіть відчутний порив повітря на кожному P і K!' },
                { text: 'Taler du tit med venner på torvet?', targetWords: ['taler', 'tit', 'torvet'], hintDa: 'Skub luft ud foran på T i "taler", "tit" og "torvet".', hintUk: 'Починайте слова taler, tit, torvet різким видихом T.' }
            ]
        },
        {
            id: 'dansk_r',
            badge: 'Фокус 3',
            titleDa: '3. Dansk R – Kragen i halsen & smeltet slut-r',
            titleUk: '3. Данське горлове R — без українського вібруючого «р»',
            descDa: 'Ukrainsk ruller med tungespidsen [р]. Dansk R dannes langt tilbage i halsen (som en blid krage – tæt ved ukrainsk blødt г, uden spidsrul!), og i udlyd (mor, bror) smelter R helt sammen til en vokal.',
            descUk: 'В українській мові звук «р» вимагає вібрації кінчика язика попереду. У данській мові <strong>переднє R</strong> (<em>rød, ris</em>) утворюється глибоко в горлі (схоже на м’яке полоскання горла або легку вібрацію біля кореня язика, як глибоке українське «г» без участі кінчика язика!). А в кінці слова (<em>mor, spiser</em>) R взагалі перетворюється на м’який голосний звук!',
            optA: { label: '🦅 R попереду (в горлі: rød, ris)', ex: 'rød, ris, ret', words: ['rød', 'ris', 'ret', 'rugbrød'] },
            optB: { label: '🌊 R у кінці (розчиняється: mor, spiser)', ex: 'mor, bror, spiser', words: ['mor', 'bror', 'spiser', 'lærer'] },
            trickUk: '<strong>Підказка для українців:</strong> Опустіть кінчик язика вниз і зафіксуйте його біля нижніх зубів, щоб він не міг затремтіти як «р». Звук має народжуватися глибоко в горлі! А в слові <em>spise<strong>r</strong></em> просто розслаблено відкрийте рот наприкінці.',
            diagTitleA: 'Переднє R: вібрація в глибині горла (кінчик язика лежить нерухомо)',
            diagTitleB: 'Кінцеве R: без приголосного — перетворюється на плавний голосний',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 162 125 Q 152 80 120 82 Q 85 95 72 110" fill="none" stroke="#f472b6" stroke-width="7" stroke-linecap="round"/>
                    <circle cx="152" cy="76" r="14" fill="rgba(239,68,68,0.28)" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,2"/>
                    <text x="18" y="48" fill="#fca5a5" font-size="11" font-weight="bold">Звук глибоко в горлі!</text>
                    <text x="18" y="138" fill="#94a3b8" font-size="10">Кінчик язика спокійний внизу</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 155 118 Q 115 112 75 112" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 85 Q 75 88 35 88" fill="none" stroke="#4ade80" stroke-width="3.5" stroke-linecap="round"/>
                    <text x="20" y="55" fill="#4ade80" font-size="11" font-weight="bold">mor → [мо-а], без «р»!</text>
                </svg>`,
            minimalPairs: [
                { a: 'rød', b: 'ød', meanA: 'червоний (з горловим R)', meanB: 'без R на початку', ctxA: 'Jeg køber en rød cykel.', ctxB: 'Відчуйте різницю в горлі.' },
                { a: 'ris', b: 'is', meanA: 'рис (горлове R)', meanB: 'лід / морозиво', ctxA: 'Vi spiser ris til aftensmad.', ctxB: 'Der er glat is på vejen.' },
                { a: 'ret', b: 'et', meanA: 'страва / правильний', meanB: 'один (артикль)', ctxA: 'Det er en lækker ret.', ctxB: 'Et køkken og et brød.' }
            ],
            speechExercises: [
                { text: 'Min mor spiser rød frugt og ris.', targetWords: ['mor', 'spiser', 'rød', 'frugt', 'ris'], hintDa: 'Svælg-r i rød/ris/frugt, og blød vokalafslutning i mor/spiser.', hintUk: 'Горлове r у словах rød/ris, і м’яке відкриття в mor/spiser.' }
            ]
        },
        {
            id: 'y_og_oe',
            badge: 'Фокус 4',
            titleDa: '4. Kyssemund Y & Ø vs. I & E (intet "ju"!)',
            titleUk: '4. Округлені Y та Ø (губи трубочкою) проти плоских I та E',
            descDa: 'Ukrainsk har kun 6 enkle vokaler og ingen faste rundede forvokaler. Undgå at sige fladt "i/e" (Lis i stedet for lys) eller sætte et ukrainsk j-forslag ("ю") ind i Y!',
            descUk: 'В українській мові немає округлених передніх голосних <strong>y</strong> і <strong>ø</strong>. Часто трапляються дві помилки: 1) вимова стає плоскою (<em>lys</em> перетворюється на ім’я <em>Lis</em>), або 2) перед <strong>y</strong> мимоволі з’являється звук «й», як в українському «ю»! Секрет: скажіть чисте «і», зафіксуйте язик і міцно витягніть губи вперед, як для поцілунку!',
            optA: { label: '💋 Губи вперед трубочкою: Y, Ø', ex: 'lys, ny, brød, dør', words: ['lys', 'ny', 'brød', 'dør'] },
            optB: { label: '😊 Широка посмішка: I, E', ex: 'Lis, ni, bred, der', words: ['lis', 'ni', 'bred', 'der'] },
            trickUk: '<strong>Подвійна вправа:</strong> Скажіть довге українське «і-і-і» і, не рухаючи язиком, витягніть губи в щільне колечко вперед — вийде данське <strong>Y</strong>! Те саме зробіть від звука «е-е-е» — отримаєте чисте данське <strong>Ø</strong>!',
            diagTitleA: 'Y & Ø: язик попереду, губи щільно витягнуті вперед (без «й»!)',
            diagTitleB: 'I & E: губи розтягнуті в широкій посмішці',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="120" cy="78" r="34" fill="none" stroke="#f59e0b" stroke-width="4"/>
                    <circle cx="120" cy="78" r="14" fill="#ef4444" opacity="0.85"/>
                    <text x="42" y="30" fill="#fde047" font-size="11" font-weight="bold">Y & Ø: губи міцно «бантиком»!</text>
                    <text x="58" y="138" fill="#cbd5e1" font-size="11">lys • ny • brød • møde</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <ellipse cx="120" cy="78" rx="52" ry="18" fill="none" stroke="#38bdf8" stroke-width="4"/>
                    <line x1="80" y1="78" x2="160" y2="78" stroke="#7dd3fc" stroke-width="3"/>
                    <text x="48" y="30" fill="#7dd3fc" font-size="11" font-weight="bold">I & E: губи розтягнуті у посмішці</text>
                    <text x="72" y="138" fill="#cbd5e1" font-size="11">Lis • ni • bred • der</text>
                </svg>`,
            minimalPairs: [
                { a: 'lys', b: 'lis', meanA: 'світло / свічка (губи трубочкою Y)', meanB: 'жіноче ім’я Ліс (плоске I)', ctxA: 'Vi tænder stearinlys i stuen.', ctxB: 'Min veninde hedder Lis.' },
                { a: 'ny', b: 'ni', meanA: 'новий (округлене Y, без «ю»)', meanB: 'число 9 (плоске I)', ctxA: 'Hun har en ny cykel.', ctxB: 'Klokken er ni nu.' },
                { a: 'brød', b: 'bred', meanA: 'хліб (округлене Ø)', meanB: 'широкий (плоске E)', ctxA: 'Jeg køber frisk brød.', ctxB: 'Vejen er meget bred.' },
                { a: 'dør', b: 'der', meanA: 'двері (округлене Ø)', meanB: 'там (плоске E)', ctxA: 'Luk venligst den hvide dør.', ctxB: 'Der sidder en ven.' }
            ],
            speechExercises: [
                { text: 'Vi har et nyt lyst køkken med ny dør.', targetWords: ['nyt', 'lyst', 'køkken', 'ny', 'dør'], hintDa: 'Spids læberne uden at sætte "j" foran i nyt/lyst/ny!', hintUk: 'Витягуйте губи на nyt, lyst, køkken, ny, dør без звука «й» перед Y!' }
            ]
        },
        {
            id: 'h_og_ng',
            badge: 'Фокус 5',
            titleDa: '5. Let pustet H & rent næse-NG (intet ekstra g/k)',
            titleUk: '5. Легкий видих H (не «х») та носове NG (без твердого «г/к»)',
            descDa: 'Ukrainsk bruger ofte skrabende х [x] eller stemt г [ɦ] i stedet for et let dansk h-pust. Og i "lang, seng, sprogundervisning" er ng én blød næselyd — sig IKKE "-g" eller "-k" til sidst!',
            descUk: 'В українській мові літеру <strong>h</strong> часто замінюють грубим звуком «х» або дзвінким «г», але данське <strong>h</strong> (<em>hej, hus</em>) — це просто беззвучний легкий видих повітря, ніби дмухаєте на пушинку! А буквосполучення <strong>ng</strong> (<em>lang, seng, ting</em>) дає один чистий носовий звук — у жодному разі не додавайте наприкінці тверде «г» або «к»!',
            optA: { label: '🌬️ Чистий видих H (hej, hus)', ex: 'hej, hus, hue, have', words: ['hej', 'hus', 'hue', 'have'] },
            optB: { label: '👃 М’яке носове NG (lang, seng)', ex: 'lang, seng, ting, mange', words: ['lang', 'seng', 'ting', 'mange'] },
            trickUk: '<strong>Перевірка на помилку:</strong> Прочитайте <em>la<strong>ng</strong></em>, опустивши кінчик язика вниз і піднявши лише спинку язика до м’якого піднебіння, випускаючи звук через ніс — звук просто плавно завмирає в носі, без клацання «г» або «к»!',
            diagTitleA: 'H: теплий легкий видих без тертя (не українське «х»)',
            diagTitleB: 'NG: один цілісний звук у ніс (без -g/-k у кінці!)',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 30 Q 100 18 150 30" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 140 95 Q 85 95 25 90" fill="none" stroke="#4ade80" stroke-width="4" stroke-dasharray="6,4"/>
                    <text x="22" y="65" fill="#4ade80" font-size="11" font-weight="bold">Легке вільне повітря H!</text>
                    <text x="58" y="132" fill="#cbd5e1" font-size="11">hej • hus • hue (не «х»)</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 55 30 Q 115 15 165 40" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 140 105 Q 110 55 75 52" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="4,4"/>
                    <circle cx="135" cy="95" r="14" fill="rgba(56,189,248,0.28)" stroke="#38bdf8" stroke-width="2"/>
                    <text x="20" y="34" fill="#7dd3fc" font-size="11" font-weight="bold">Звук виходить через ніс [ŋ]</text>
                    <text x="48" y="136" fill="#fca5a5" font-size="11" font-weight="bold">Не вимовляйте [г] чи [к] у кінці!</text>
                </svg>`,
            minimalPairs: [
                { a: 'lang', b: 'lank', meanA: 'довгий (чисте носове NG)', meanB: 'кульгає / з клацанням k наприкінці', ctxA: 'Dagen var meget lang.', ctxB: 'Не додавайте тверде k у слові lang!' },
                { a: 'seng', b: 'sænk', meanA: 'ліжко (м’яко завмирає в носі)', meanB: 'опусти! (з різким k)', ctxA: 'Jeg har en stor seng.', ctxB: 'Sænk farten på cyklen.' },
                { a: 'hej', b: 'ej', meanA: 'привіт (легкий видих H)', meanB: 'о ні / не! (без H)', ctxA: 'Hej, hvordan går det?', ctxB: 'Ej, hvor er det koldt!' }
            ],
            speechExercises: [
                { text: 'Hej! Huset har en lang gang og en stor seng.', targetWords: ['hej', 'huset', 'lang', 'gang', 'seng'], hintDa: 'Let lydløst h-pust på hej/huset og rent ng uden g/k på lang/gang/seng.', hintUk: 'Легкий видих без «х» у hej/huset і чистий носовий звук у lang/gang/seng без «г/к»!' }
            ]
        }
    ];

    function openHomeworkModal() {
        const existing = document.querySelector('#vlu-hw-modal');
        if (existing) existing.remove();
        const overlay = document.createElement('div');
        overlay.id = 'vlu-hw-modal';
        overlay.className = 'vlu-modal-overlay';
        const isDa = getLang() === 'da';
        const tabLabels = {
            principles: isDa ? '1. Теорія і ротова порожнина (Mundstilling)' : '1. Теорія і ротова порожнина',
            pairs: isDa ? '2. Мінімальні пари (Lyttequiz)' : '2. Мінімальні пари',
            speech: isDa ? '3. Мікрофон-тренажер (Udtale)' : '3. Мікрофон-тренажер'
        };
        overlay.innerHTML = `
            <div class="vlu-modal-card">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:1px solid rgba(255,255,255,0.12);">
                    <div>
                        <div style="font-size:0.74rem; font-weight:900; color:#38bdf8; text-transform:uppercase;">📚 Посилання на домашні завдання • Українська</div>
                        <h2 style="margin:0.15rem 0 0; font-size:1.2rem; color:#fff;">${isDa ? 'Direkte links til alle 5 fokuslyde' : 'Прямі посилання на всі 5 фокусних звуків'}</h2>
                    </div>
                    <button type="button" class="vlu-btn" id="vlu-hw-close">✕ Закрити</button>
                </div>
                <div style="display:flex; flex-direction:column; gap:0.9rem;">
                    ${SOUND_MODULES.map(m => `
                        <div style="background:rgba(30,41,59,0.75); border:1px solid rgba(148,163,184,0.25); border-radius:12px; padding:0.85rem;">
                            <div style="font-weight:800; color:#fde047; margin-bottom:0.5rem;">${m.titleUk}${isDa ? ` <span style="color:#94a3b8; font-size:0.82rem;">(${m.titleDa})</span>` : ''}</div>
                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                ${VALID_TABS.map(tid => {
                                    const url = `${window.location.origin}${window.location.pathname}#/${getLang() || 'uk'}/vanskelige_lyde_ukrainsk/${m.id}/${tid}`;
                                    return `
                                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap; background:rgba(15,23,42,0.7); padding:0.45rem 0.7rem; border-radius:8px;">
                                            <span style="font-size:0.82rem; color:#e2e8f0;">${tabLabels[tid]}</span>
                                            <button type="button" class="vlu-btn" data-copy-url="${url}" style="padding:0.3rem 0.7rem; font-size:0.78rem; border-color:#38bdf8;">📋 Скопіювати</button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        overlay.querySelector('#vlu-hw-close').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        overlay.querySelectorAll('[data-copy-url]').forEach(b => {
            b.onclick = () => copyToClipboard(b.dataset.copyUrl, isDa ? 'Lektie-link' : 'Посилання на вправу');
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
        topBar.className = 'vlu-top-bar';
        topBar.innerHTML = `
            <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                <button type="button" class="vlu-btn" id="vlu-back-main">${isDa ? '← На головну (Forside)' : '← На головну'}</button>
                <button type="button" class="vlu-btn" id="vlu-back-mss" style="border-color:#38bdf8; color:#7dd3fc;">🇺🇦 До «Моя мова порівняно з данською»</button>
            </div>
            <button type="button" class="vlu-btn" id="vlu-hw-btn" style="border-color:#fde047; color:#fde047;">${isDa ? '📋 Посилання на вправи (Lektier)' : '📋 Посилання на вправи'}</button>
        `;
        topBar.querySelector('#vlu-back-main').onclick = handleBackToMain;
        topBar.querySelector('#vlu-back-mss').onclick = handleBackToMSS;
        topBar.querySelector('#vlu-hw-btn').onclick = openHomeworkModal;
        viewContainer.appendChild(topBar);

        const hero = document.createElement('div');
        hero.className = 'vlu-hero';
        hero.innerHTML = `
            <div class="vlu-hero-kicker">${isDa ? '🇺🇦 Фонетичний тренажер для українців • Крок 2 (Trin 2)' : '🇺🇦 Фонетичний тренажер для українців • Крок 2'}</div>
            <h1>${modData.titleUk}</h1>
            <p>${isDa ? `${modData.titleDa} — ` : ''}порівняння артикуляції, аудіо-контрасти та практика вимови</p>
        `;
        viewContainer.appendChild(hero);

        const modNav = document.createElement('div');
        modNav.className = 'vlu-mod-nav';
        SOUND_MODULES.forEach(m => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `vlu-mod-pill ${m.id === activeModuleId ? 'active' : ''}`;
            btn.textContent = isDa
                ? `${m.badge}: ${m.titleDa.replace(/^\d+\.\s*/, '')}`
                : `${m.badge}: ${m.titleUk.replace(/^\d+\.\s*/, '')}`;
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
        subTabs.className = 'vlu-subtabs';
        [
            { id: 'principles', label: isDa ? '1. Положення рота й правила (Teori)' : '1. Положення рота й правила' },
            { id: 'pairs', label: '2. Мінімальні пари (Аудіо-тест)' },
            { id: 'speech', label: isDa ? '3. Тренажер мікрофона (Udtale)' : '3. Тренажер мікрофона' }
        ].forEach(st => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = `vlu-subtab ${st.id === activeTab ? 'active' : ''}`;
            b.textContent = st.label;
            b.onclick = () => { activeTab = st.id; renderView(); };
            subTabs.appendChild(b);
        });
        viewContainer.appendChild(subTabs);

        const content = document.createElement('div');
        viewContainer.appendChild(content);

        if (activeTab === 'principles') {
            const card = document.createElement('div');
            card.className = 'vlu-card';
            const opt = activeTarget === 'a' ? modData.optA : modData.optB;
            card.innerHTML = `
                <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:1rem;">
                    <button type="button" class="vlu-btn" id="vlu-tog-a" style="${activeTarget === 'a' ? 'background:#0284c7; border-color:#7dd3fc;' : ''}">${modData.optA.label}</button>
                    <button type="button" class="vlu-btn" id="vlu-tog-b" style="${activeTarget === 'b' ? 'background:#be123c; border-color:#fda4af;' : ''}">${modData.optB.label}</button>
                </div>
                <div class="vlu-diag-grid">
                    <div>
                        <div style="font-weight:800; color:#7dd3fc; margin-bottom:0.45rem;">${activeTarget === 'a' ? modData.diagTitleA : modData.diagTitleB}</div>
                        <div class="vlu-svg-box">${modData.diagSvg(activeTarget === 'a')}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; justify-content:space-between; gap:0.75rem;">
                        <div style="font-size:0.93rem; color:#e2e8f0; line-height:1.58;">${modData.descUk}</div>
                        ${isDa ? `<div style="font-size:0.86rem; color:#94a3b8; line-height:1.5; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.08);"><strong style="color:#cbd5e1;">Dansk lærer-note:</strong> ${modData.descDa}</div>` : ''}
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                            ${opt.words.map(w => `<button type="button" class="vlu-btn" data-say="${w}" style="border-color:#38bdf8;">🔊 ${w}</button>`).join('')}
                        </div>
                    </div>
                </div>
                <div style="background:rgba(234,179,8,0.14); border:1px solid rgba(250,204,21,0.45); border-radius:12px; padding:0.85rem 1rem; color:#fef08a; font-size:0.9rem; line-height:1.55;">
                    ${modData.trickUk}
                </div>
            `;
            card.querySelector('#vlu-tog-a').onclick = () => { activeTarget = 'a'; renderView(); };
            card.querySelector('#vlu-tog-b').onclick = () => { activeTarget = 'b'; renderView(); };
            card.querySelectorAll('[data-say]').forEach(b => {
                b.onclick = () => playAudio(b.dataset.say, 0.8);
            });
            content.appendChild(card);
        } else if (activeTab === 'pairs') {
            const pair = modData.minimalPairs[pairQuizIdx];
            if (!pair._target) pair._target = Math.random() < 0.5 ? 'a' : 'b';
            const targetWord = pair._target === 'a' ? pair.a : pair.b;
            const qCard = document.createElement('div');
            qCard.className = 'vlu-card';
            qCard.style.textAlign = 'center';
            qCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; color:#94a3b8; font-weight:800; font-size:0.86rem; margin-bottom:0.8rem;">
                    <span>Пара ${pairQuizIdx + 1} з ${modData.minimalPairs.length}</span>
                    <span style="color:#4ade80;">Рахунок: ${pairScore} / ${modData.minimalPairs.length}</span>
                </div>
                <p style="color:#cbd5e1; margin:0 0 0.5rem;">Натисніть, щоб почути слово, і оберіть правильний варіант:</p>
                <button type="button" class="vlu-listen-big" id="vlu-play-pair">${isDa ? '🔊 Слухати данську вимову (Lyt)' : '🔊 Слухати данську вимову'}</button>
                <div class="vlu-pair-grid">
                    <button type="button" class="vlu-pair-btn" id="vlu-choice-a">
                        <div style="font-size:1.5rem; font-weight:900; color:#38bdf8;">${pair.a}</div>
                        <div style="font-size:0.86rem; color:#e2e8f0; margin-top:0.25rem;">${pair.meanA}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxA}"</div>
                    </button>
                    <button type="button" class="vlu-pair-btn" id="vlu-choice-b">
                        <div style="font-size:1.5rem; font-weight:900; color:#f472b6;">${pair.b}</div>
                        <div style="font-size:0.86rem; color:#e2e8f0; margin-top:0.25rem;">${pair.meanB}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxB}"</div>
                    </button>
                </div>
                <div id="vlu-pair-fb" style="margin-top:0.75rem;"></div>
                <div style="display:flex; justify-content:space-between; margin-top:1.1rem; gap:0.5rem; flex-wrap:wrap;">
                    <button type="button" class="vlu-btn" id="vlu-prev-p" ${pairQuizIdx === 0 ? 'disabled' : ''}>← Назад</button>
                    <button type="button" class="vlu-btn" id="vlu-next-p">${pairQuizIdx === modData.minimalPairs.length - 1 ? 'Спочатку ↺' : 'Наступна пара →'}</button>
                </div>
            `;
            qCard.querySelector('#vlu-play-pair').onclick = () => playAudio(targetWord, 0.78);
            const fbEl = qCard.querySelector('#vlu-pair-fb');
            const btnA = qCard.querySelector('#vlu-choice-a');
            const btnB = qCard.querySelector('#vlu-choice-b');
            function handlePick(pick) {
                btnA.disabled = true;
                btnB.disabled = true;
                const ok = pick === pair._target;
                if (ok) pairScore++;
                fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};">
                    ${ok ? `🎉 Правильно! Це слово "${targetWord}".` : `❌ Не зовсім — правильне слово: "${targetWord}".`}
                </div>`;
                playAudio(targetWord, 0.75);
            }
            btnA.onclick = () => handlePick('a');
            btnB.onclick = () => handlePick('b');
            qCard.querySelector('#vlu-prev-p').onclick = () => { if (pairQuizIdx > 0) { pairQuizIdx--; renderView(); } };
            qCard.querySelector('#vlu-next-p').onclick = () => {
                pair._target = undefined;
                if (pairQuizIdx < modData.minimalPairs.length - 1) pairQuizIdx++;
                else { pairQuizIdx = 0; pairScore = 0; }
                renderView();
            };
            content.appendChild(qCard);
        } else {
            const ex = modData.speechExercises[speechExerciseIdx] || modData.speechExercises[0];
            const sCard = document.createElement('div');
            sCard.className = 'vlu-card';
            sCard.style.textAlign = 'center';
            const promptHtml = ex.text.split(' ').map(w => {
                const clean = w.toLowerCase().replace(/[.,!?]/g, '');
                return ex.targetWords.includes(clean)
                    ? `<span style="color:#38bdf8; text-decoration:underline;">${w}</span>`
                    : `<span>${w}</span>`;
            }).join(' ');
            sCard.innerHTML = `
                <div style="font-size:1.45rem; font-weight:900; margin:0.4rem 0 0.65rem;">${promptHtml}</div>
                <p style="color:#cbd5e1; margin:0 0 0.85rem;">Прочитайте речення вголос, звертаючи особливу увагу на підкреслені сині слова!</p>
                ${consecutiveSpeechStreak > 0 ? `<div style="color:#fde047; font-weight:800; margin-bottom:0.7rem;">🔥 Вдала вимова поспіль: ${consecutiveSpeechStreak}</div>` : ''}
                <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap; margin:0.65rem 0;">
                    <button type="button" class="vlu-listen-big" id="vlu-say-ex" style="margin:0;">🔊 Послухати зразок</button>
                    <button type="button" class="vlu-btn" id="vlu-mic-btn" style="background:#dc2626; border-color:#f87171; padding:0.8rem 1.4rem; font-size:1rem;">🎙️ Говорити зараз</button>
                </div>
                <div id="vlu-speech-status" style="color:#94a3b8; font-size:0.9rem; margin-top:0.7rem;">Натисніть «Говорити зараз» і вимовте речення чітко.</div>
                <div id="vlu-speech-fb" style="margin-top:0.7rem;"></div>
                <div style="text-align:left; background:rgba(30,41,59,0.7); border-radius:10px; padding:0.8rem; margin-top:1rem; font-size:0.86rem; color:#cbd5e1;">
                    <strong>Підказка:</strong> ${ex.hintUk}${isDa ? `<br><span style="color:#94a3b8;"><strong>Dansk:</strong> ${ex.hintDa}</span>` : ''}
                </div>
            `;
            sCard.querySelector('#vlu-say-ex').onclick = () => playAudio(ex.text, 0.84);
            const micBtn = sCard.querySelector('#vlu-mic-btn');
            const statusEl = sCard.querySelector('#vlu-speech-status');
            const fbEl = sCard.querySelector('#vlu-speech-fb');
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRec) {
                statusEl.textContent = 'Ваш браузер не підтримує розпізнавання мовлення (спробуйте Chrome або Safari).';
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
                        statusEl.textContent = '🎙️ Слухаю... говоріть данською зараз!';
                        statusEl.style.color = '#4ade80';
                    } catch (_) {}
                };
                rec.onresult = (ev) => {
                    isSpeechRecording = false;
                    const said = ev.results[0][0].transcript.trim();
                    statusEl.textContent = `Розпізнано: "${said}"`;
                    const words = said.toLowerCase().split(/\s+/).map(w => w.replace(/[.,!?]/g, ''));
                    const hits = ex.targetWords.filter(tw => words.includes(tw));
                    const ok = hits.length === ex.targetWords.length;
                    if (ok) consecutiveSpeechStreak++; else consecutiveSpeechStreak = 0;
                    fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};">
                        ${ok ? `🌟 Чудова вимова! Усі цільові слова (${hits.join(', ')}) розпізнані.` : `💡 Гарна спроба! Спробуйте ще раз звернути увагу на: ${ex.targetWords.join(', ')}`}
                    </div>`;
                };
                rec.onerror = () => { isSpeechRecording = false; statusEl.textContent = 'Не вдалося чітко почути. Спробуйте ще раз.'; };
                rec.onend = () => { isSpeechRecording = false; };
            }
            content.appendChild(sCard);
        }
    }

    renderView();
    container.appendChild(viewContainer);
}
