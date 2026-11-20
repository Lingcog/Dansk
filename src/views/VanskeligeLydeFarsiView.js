import { getLang } from '../utils/i18n.js';

/**
 * VanskeligeLydeFarsiView
 * Komplet pædagogisk udtale-træningsflade til farsi- / persisktalende danskkursister.
 *
 * Fokus på de 5 lyde og lydmønstre, der især giver persisktalende vanskeligheder på dansk:
 *   1. Blødt d – "Ånde på brillerne" (aldrig hårdt persisk د eller ز/ت)
 *   2. P / T / K med pust ("papirtesten") vs. B / D / G (danske b, d, g lyder som upustede پ، ت، ک!)
 *   3. Dansk svælg-R (dybt som persisk غ) & smeltet slut-r (aldrig tungespids-ر!)
 *   4. Kyssemund Y & Ø vs. flade I & E (persisk mangler rundede fortungevokaler)
 *   5. V (overtænder på underlæbe, ikke bilabialt و) & forlydsklynger (sk-, sp-, st- uden støttevokalen "e-" som "eskole"!)
 */
export function renderVanskeligeLydeFarsiView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    function handleBackToMain() {
        if (typeof navigateFn === 'function') {
            navigateFn('main');
        } else {
            const lang = getLang() || 'fa';
            window.location.hash = `#/${lang}/main`;
        }
    }

    function handleBackToMSS() {
        if (typeof navigateFn === 'function') {
            navigateFn('mit_sprog_sammenlignet');
        } else {
            const lang = getLang() || 'fa';
            window.location.hash = `#/${lang}/mit_sprog_sammenlignet`;
        }
    }

    function showCopyToast(msg) {
        let toast = document.querySelector('#vlfa-copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'vlfa-copy-toast';
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
                showCopyToast(`📋 ${label} kopieret (کپی شد)!`);
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
        showCopyToast(`📋 ${label} kopieret (کپی شد)!`);
    }

    const VALID_MODULES = ['bloedt_d', 'p_t_k_pust', 'dansk_r', 'y_og_oe', 'v_og_klynger'];
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
            const idx = segs.findIndex(s => s === 'vanskelige_lyde_farsi' || s === 'persiske_lyde');
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
        const lang = getLang() || 'fa';
        const newHash = `#/${lang}/vanskelige_lyde_farsi/${activeModuleId}/${activeTab}`;
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
    viewContainer.className = 'vlfa-wrapper';

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .vlfa-wrapper {
            max-width: 1040px;
            margin: 0 auto;
            padding: 1.25rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        .vlfa-top-bar {
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.35rem;
            padding-bottom: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .vlfa-btn {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(30,41,59,0.86); border: 1px solid rgba(148,163,184,0.35);
            color: #f8fafc; padding: 0.52rem 1rem; border-radius: 11px;
            font-weight: 800; font-size: 0.86rem; cursor: pointer; transition: all 0.16s ease;
        }
        .vlfa-btn:hover { border-color: #38bdf8; transform: translateY(-1px); }
        .vlfa-hero { text-align: center; margin-bottom: 1.5rem; }
        .vlfa-hero-kicker {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(250,204,21,0.14); border: 1px solid rgba(250,204,21,0.45);
            color: #fde047; padding: 0.35rem 0.95rem; border-radius: 999px;
            font-size: 0.8rem; font-weight: 800; margin-bottom: 0.6rem;
        }
        .vlfa-hero h1 { margin: 0 0 0.45rem; font-size: 1.85rem; font-weight: 900; color: #fff; }
        .vlfa-hero p { margin: 0 auto; max-width: 720px; color: #cbd5e1; font-size: 0.94rem; line-height: 1.5; }
        .vlfa-mod-nav {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.1rem;
        }
        .vlfa-mod-pill {
            padding: 0.58rem 0.95rem; border-radius: 12px;
            border: 1.5px solid rgba(255,255,255,0.16); background: rgba(15,23,42,0.78);
            color: #e2e8f0; font-weight: 800; font-size: 0.84rem; cursor: pointer;
            transition: all 0.16s ease; text-align: left;
        }
        .vlfa-mod-pill.active {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border-color: #7dd3fc; color: #ffffff; box-shadow: 0 6px 18px rgba(56,189,248,0.28);
        }
        .vlfa-subtabs {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.35rem;
        }
        .vlfa-subtab {
            padding: 0.55rem 1.05rem; border-radius: 10px;
            border: 1.5px solid rgba(148,163,184,0.28); background: rgba(30,41,59,0.72);
            color: #cbd5e1; font-weight: 800; font-size: 0.85rem; cursor: pointer;
        }
        .vlfa-subtab.active {
            border-color: #fde047; background: rgba(250,204,21,0.18); color: #fef08a;
        }
        .vlfa-card {
            background: rgba(15,23,42,0.9); border: 1.5px solid rgba(148,163,184,0.26);
            border-radius: 18px; padding: 1.25rem 1.35rem; margin-bottom: 1.15rem;
            box-shadow: 0 10px 26px rgba(0,0,0,0.32);
        }
        .vlfa-diag-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem; margin: 1rem 0;
        }
        .vlfa-svg-box {
            background: #070d19; border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px; padding: 0.75rem; min-height: 165px;
            display: flex; align-items: center; justify-content: center;
        }
        .vlfa-pair-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.85rem; margin: 1.1rem 0;
        }
        .vlfa-pair-btn {
            background: rgba(30,41,59,0.88); border: 2px solid rgba(148,163,184,0.32);
            border-radius: 14px; padding: 1.05rem; cursor: pointer; text-align: center;
            color: #f8fafc; transition: all 0.16s ease;
        }
        .vlfa-pair-btn:hover:not(:disabled) { border-color: #38bdf8; transform: translateY(-2px); }
        .vlfa-listen-big {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: 1.5px solid #38bdf8; color: #fff; font-size: 1.05rem; font-weight: 900;
            padding: 0.8rem 1.6rem; border-radius: 14px; cursor: pointer;
            display: inline-flex; align-items: center; gap: 0.5rem; margin: 0.75rem 0;
        }
        .vlfa-modal-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
            z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;
        }
        .vlfa-modal-card {
            background: #0f172a; border: 2px solid #38bdf8; border-radius: 18px;
            max-width: 680px; width: 100%; max-height: 86vh; overflow-y: auto; padding: 1.25rem;
        }
        @media (max-width: 600px) {
            .vlfa-hero h1 { font-size: 1.45rem; }
            .vlfa-card { padding: 1rem; }
        }
    `;
    viewContainer.appendChild(styleEl);

    const SOUND_MODULES = [
        {
            id: 'bloedt_d',
            badge: 'تمرکز ۱',
            titleDa: '1. Blødt d – "Ånde på brillerne"',
            titleFa: '۱. حرف d نرم دانمارکی — «ها کردن روی عینک»',
            descDa: 'Persisk (farsi) har kun hårdt dental-d (د) og mangler dansk blødt d (brød, mad, gade). Læg tungespidsen fladt mod undertænderne og lad varm luft glide blødt ud uden at spærre af.',
            descFa: 'در زبان فارسی حرف <strong>د</strong> همیشه با برخورد محکم نوک زبان به پشت دندان‌های بالا ساخته می‌شود، اما <strong>d</strong> نرم دانمارکی (<em>mad, brød, gade</em>) اصلاً مثل «د» یا «ز» نیست! نوک زبان را کاملاً آرام پشت دندان‌های پایین بخوابانید و فقط هوای گرم را روی آن جاری کنید — دقیقاً مثل وقتی که می‌خواهید روی شیشه عینک «ها» کنید تا تمیز شود!',
            optA: { label: '🇩🇰 d نرم (brød, mad)', ex: 'brød, mad, gade', words: ['brød', 'mad', 'sød', 'gade'] },
            optB: { label: '🇮🇷 تله: «د» سفت یا «ت»', ex: 'dag (در اول کلمه سفت است!)', words: ['dag', 'dør', 'dansk'] },
            trickFa: '<strong>قانون طلایی:</strong> در اول کلمه (<em><strong>d</strong>ag</em>) صدای d سفت است (شبیه «د»). اما در وسط یا آخر کلمه (<em>ma<strong>d</strong>, brø<strong>d</strong>, sø<strong>d</strong></em>) زبان را پایین نگه دارید و فقط نفس گرم بیرون بدهید!',
            diagTitleA: 'd نرم (آخر کلمه: mad, brød): زبان پایین و رها، جریان نفس گرم',
            diagTitleB: 'تله: برخورد زبان به پشت دندان بالا راه هوا را می‌بندد [د/ت]!',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="96" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 115 Q 112 108 75 112" fill="none" stroke="#22c55e" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 86 Q 72 86 32 82" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="5,4"/>
                    <text x="120" y="62" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">نفس گرم (مثل ها کردن روی عینک)</text>
                    <text x="120" y="138" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">نوک زبان پشت دندان‌های پایین صاف می‌ماند!</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="66" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 110 Q 112 95 72 78" fill="none" stroke="#ef4444" stroke-width="7" stroke-linecap="round"/>
                    <line x1="56" y1="68" x2="56" y2="95" stroke="#fde047" stroke-width="3"/>
                    <text x="120" y="48" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">زبان به سقف دهان خورد [د/ت] — بیش از حد سفت!</text>
                </svg>`,
            minimalPairs: [
                { a: 'mad', b: 'mat', meanA: 'غذا (d نرم)', meanB: 'کدر / مات (t سفت)', ctxA: 'Vi laver mad i køkkenet.', ctxB: 'Farven er helt mat.' },
                { a: 'glad', b: 'glat', meanA: 'خوشحال (d نرم)', meanB: 'لغزنده / صاف (t سفت)', ctxA: 'Jeg er meget glad i dag.', ctxB: 'Vejen er glat af is.' },
                { a: 'bad', b: 'bat', meanA: 'حمام / دوش (d نرم)', meanB: 'چوب بیسبال / راکت (t سفت)', ctxA: 'Jeg tager et varmt bad.', ctxB: 'Han spiller med et rødt bat.' },
                { a: 'sød', b: 'sæt', meanA: 'شیرین / مهربان (d نرم)', meanB: 'بگذار / جمله (t سفت)', ctxA: 'Kagen er meget sød.', ctxB: 'Sæt dig ned her.' }
            ],
            speechExercises: [
                { text: 'Jeg spiser godt brød og sød mad.', targetWords: ['godt', 'brød', 'sød', 'mad'], hintDa: 'Hold tungen fladt bag undertænderne ved brød, sød, mad.', hintFa: 'در کلمات brød، sød و mad زبان را پشت دندان‌های پایین صاف نگه دارید و نرم نفس بدهید.' },
                { text: 'Gaden er bred og flad.', targetWords: ['gaden', 'bred', 'flad'], hintDa: 'Ånd blødt ud i "gaden", "bred", "flad".', hintFa: 'در gaden، bred و flad حرف d را با نفس گرم و بدون برخورد زبان به بالا بگویید.' }
            ]
        },
        {
            id: 'p_t_k_pust',
            badge: 'تمرکز ۲',
            titleDa: '2. P / T / K med pust ("papirtesten") vs. B / D / G',
            titleFa: '۲. حروف انفجاری P / T / K با فشار هوا در برابر B / D / G',
            descDa: 'På dansk har P, T, K i forlyd et markant pust (pære, tale, kaffe), mens B, D, G er helt ustemte uden pust! Hvis P/T/K siges uden nok pust — eller hvis t holdes helt fladt ved tænderne — høres det for danskere som B/D/G.',
            descFa: 'در زبان دانمارکی حروف <strong>B, D, G</strong> در اول کلمه مثل فارسی لرزش حنجره ندارند — تنها فرقشان با <strong>P, T, K</strong> میزان <strong>فشار هوا (پُف)</strong> است! یعنی اگر اول <em>pære, tale, kaffe</em> محکم هوا بیرون ندهید (پـِه، تـِه، کـِه)، دانمارکی‌ها فکر می‌کنند گفته‌اید <em>bære, dale, gaffe</em>!',
            optA: { label: '💨 با فشار هوا: P, T, K', ex: 'pære, pande, tale, kaffe', words: ['pære', 'pande', 'tale', 'kaffe'] },
            optB: { label: '🤫 بدون فشار هوا: B, D, G', ex: 'bære, bande, dale, gade', words: ['bære', 'bande', 'dale', 'gade'] },
            trickFa: '<strong>آزمایش کاغذ:</strong> یک برگ کاغذ را ۳ سانتی‌متر جلوی دهان بگیرید. وقتی <em><strong>p</strong>ære, <strong>t</strong>ale, <strong>k</strong>old</em> می‌گویید، فشار هوا باید کاغذ را تکان دهد! اما برای <em><strong>b</strong>ære, <strong>d</strong>ale, <strong>g</strong>ade</em> کاغذ باید کاملاً بی‌حرکت بماند.',
            diagTitleA: 'P, T, K اول کلمه: انفجار شدید هوا کاغذ را به حرکت در می‌آورد!',
            diagTitleB: 'B, D, G: آرام و بی‌صدا — بدون پُف هوا، کاغذ تکان نمی‌خورد',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="8" ry="6" fill="#ef4444"/>
                    <path d="M 45 84 L 18 70 M 45 84 L 14 84 M 45 84 L 18 98" stroke="#fde047" stroke-width="3.5" stroke-linecap="round"/>
                    <path d="M 10 45 Q 2 84 22 122" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                    <text x="155" y="75" text-anchor="middle" fill="#fde047" font-size="11" font-weight="bold">پُف شدید هوا کاغذ را تکان داد!</text>
                    <text x="155" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">pære • tale • kaffe</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="7" ry="5" fill="#38bdf8"/>
                    <line x1="16" y1="45" x2="16" y2="120" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
                    <text x="155" y="75" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">بدون پُف هوا — کاغذ ثابت است</text>
                    <text x="155" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">bære • dale • gade</text>
                </svg>`,
            minimalPairs: [
                { a: 'pære', b: 'bære', meanA: 'گلابی / لامپ (P با پُف هوا)', meanB: 'حمل کردن (B بدون پُف)', ctxA: 'Jeg spiser en sød pære.', ctxB: 'Kan du bære tasken?' },
                { a: 'pande', b: 'bande', meanA: 'ماهیتابه / پیشانی (P شدید)', meanB: 'گروه / فحش دادن (B آرام)', ctxA: 'Steg æg på en varm pande.', ctxB: 'Man må ikke bande her.' },
                { a: 'tale', b: 'dale', meanA: 'حرف زدن (T با پُف هوا)', meanB: 'پایین آمدن / دره (D بدون پُف)', ctxA: 'Vi skal tale dansk i dag.', ctxB: 'Priserne kan dale lidt.' },
                { a: 'kold', b: 'gold', meanA: 'سرد (K با پُف هوا)', meanB: 'خشک / بی‌حاصل (G آرام)', ctxA: 'Vinteren er meget kold.', ctxB: 'Jorden er helt gold.' }
            ],
            speechExercises: [
                { text: 'Pigen køber kold kaffe og en pære.', targetWords: ['pigen', 'køber', 'kold', 'kaffe', 'pære'], hintDa: 'Lav tydeligt pust på alle P- og K-ord!', hintFa: 'روی تمام کلمات با P و K هوا را با فشار محکم بیرون بدهید!' },
                { text: 'Taler du tit med venner på torvet?', targetWords: ['taler', 'tit', 'torvet'], hintDa: 'Skub tydeligt luft ud på taler, tit, torvet.', hintFa: 'در کلمات taler، tit و torvet حرف T را با پُف قوی هوا تلفظ کنید.' }
            ]
        },
        {
            id: 'dansk_r',
            badge: 'تمرکز ۳',
            titleDa: '3. Dansk R – Svælg-krage (tæt på غ) & smeltet slut-r',
            titleFa: '۳. حرف R حلقی (مثل غ فارسی!) — نه «ر» نوک زبانی!',
            descDa: 'Farsi ruller "r" med tungespidsen (ر), men farsi HAR lyden غ (ghain) bagerst i svælget! Dansk for-R (rød, ris) laves præcis deromme som et blødt غ, og slut-R (mor, bror, spiser) smelter helt ind i vokalen.',
            descFa: 'یک مزیت بزرگ برای فارسی‌زبان‌ها! در فارسی حرف <strong>ر</strong> با لرزش نوک زبان گفته می‌شود، اما دانمارکی‌ها اصلاً نوک زبان را نمی‌چرخانند. در عوض <strong>R</strong> اول کلمه دانمارکی (<em>rød, ris</em>) دقیقاً از ته گلو می‌آید — شبیه حرف <strong>غ</strong> (غذا / غروب) در فارسی! و در آخر کلمات (<em>mor, bror, spiser</em>)، صدای r کاملاً در مصوت حل و ناپدید می‌شود.',
            optA: { label: '🦅 R اول کلمه (ته گلو مثل غ: rød, ris)', ex: 'rød, ris, ret', words: ['rød', 'ris', 'ret', 'rugbrød'] },
            optB: { label: '🌊 R آخر کلمه (محو در واکه: mor, spiser)', ex: 'mor, bror, spiser', words: ['mor', 'bror', 'spiser', 'lærer'] },
            trickFa: '<strong>ترفند عالی برای فارسی‌زبان‌ها:</strong> نوک زبان را پشت دندان‌های پایین قفل کنید تا اصلاً نتواند «ر» فارسی بسازد! بعد خیلی نرم یک <strong>«غ»</strong> ملایم ته گلو بگویید (<em>rød, ris</em>)۔ و آخر کلماتی مثل <em>mo<strong>r</strong></em> و <em>spise<strong>r</strong></em> دهان را فقط باز نگه دارید (هیچ «ر» نگویید!).',
            diagTitleA: 'R اول کلمه: تولید صدا در عمق گلو (مثل غ — نوک زبان کاملاً بی‌حرکت)',
            diagTitleB: 'R آخر کلمه: هیچ ر نوک‌زبانی نیست — پایان نرم و باز در واکه',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 162 125 Q 152 80 120 82 Q 85 95 72 110" fill="none" stroke="#f472b6" stroke-width="7" stroke-linecap="round"/>
                    <circle cx="152" cy="76" r="14" fill="rgba(239,68,68,0.28)" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,2"/>
                    <text x="105" y="48" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">صدا از ته گلو (نزدیک به غ فارسی)!</text>
                    <text x="105" y="138" text-anchor="middle" fill="#94a3b8" font-size="10">نوک زبان پایین کاملاً ثابت</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 155 118 Q 115 112 75 112" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 85 Q 75 88 35 88" fill="none" stroke="#4ade80" stroke-width="3.5" stroke-linecap="round"/>
                    <text x="115" y="55" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">mor ← در آخر ر گفته نمی‌شود، فقط صدای باز!</text>
                </svg>`,
            minimalPairs: [
                { a: 'rød', b: 'ød', meanA: 'قرمز (با R حلقی مثل غ)', meanB: 'بدون R', ctxA: 'Jeg køber en rød cykel.', ctxB: 'ارتعاش ملایم ته گلو را حس کنید.' },
                { a: 'ris', b: 'is', meanA: 'برنج (R حلقی)', meanB: 'یخ / بستنی', ctxA: 'Vi spiser ris til aftensmad.', ctxB: 'Der er glat is på vejen.' },
                { a: 'ret', b: 'et', meanA: 'غذا / درست', meanB: 'یک (حرف تعریف et)', ctxA: 'Det er en lækker ret.', ctxB: 'Et køkken og et brød.' }
            ],
            speechExercises: [
                { text: 'Min mor spiser rød frugt og ris.', targetWords: ['mor', 'spiser', 'rød', 'frugt', 'ris'], hintDa: 'Svælg-r (som غ) i rød/ris/frugt, og blød vokalafslutning i mor/spiser.', hintFa: 'در rød و ris مثل «غ» ملایم ته گلو بگویید، و در آخر mor و spiser حرف ر تلفظ نکنید.' }
            ]
        },
        {
            id: 'y_og_oe',
            badge: 'تمرکز ۴',
            titleDa: '4. Kyssemund Y & Ø vs. flade I & E',
            titleFa: '۴. حروف صدادار لب‌غنچه‌ای Y و Ø در برابر I و E',
            descDa: 'Farsi har kun 6 vokaler (a, ā, e, i, o, u) og ingen rundede fortungevokaler (Y, Ø). Undgå at gøre dem flade som I/E (lys → Lis) eller trække dem bagud som U/O (sød → sod).',
            descFa: 'در فارسی ۶ مصوت داریم (اَ، آ، اِ، ای، اُ، او) اما دو صدای خاص <strong>Y</strong> و <strong>Ø</strong> را نداریم! اشتباه رایج این است که به جای <em>lys</em> (نور) بگوییم <em>Lis</em> (با «ای» ساده) یا به جای <em>brød</em> بگوییم <em>brod</em>. راز طلایی: زبان را در حالت «ای» فارسی نگه دارید اما همزمان لب‌ها را جلو آورده و مثل غنچه/سوت گرد کنید!',
            optA: { label: '💋 لب گرد و جلو: Y, Ø', ex: 'lys, ny, brød, dør', words: ['lys', 'ny', 'brød', 'dør'] },
            optB: { label: '😊 لب کشیده (لبخند): I, E', ex: 'lis, ni, bred, der', words: ['lis', 'ni', 'bred', 'der'] },
            trickFa: '<strong>تمرین دو مرحله‌ای:</strong> یک «ایــــ» کشیده بگویید و بدون تکان دادن زبان، لب‌ها را کاملاً گرد و غنچه کنید ➔ <strong>Y</strong> خالص دانمارکی! همین کار را با «اِــــ» کشیده و گرد کردن لب‌ها انجام دهید ➔ <strong>Ø</strong> خالص دانمارکی!',
            diagTitleA: 'Y & Ø: زبان در جلو و هر دو لب گرد به سمت جلو غنچه شده',
            diagTitleB: 'I & E: لب‌ها به شکل لبخند به طرفین کشیده شده',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="120" cy="78" r="34" fill="none" stroke="#f59e0b" stroke-width="4"/>
                    <circle cx="120" cy="78" r="14" fill="#ef4444" opacity="0.85"/>
                    <text x="120" y="30" text-anchor="middle" fill="#fde047" font-size="11" font-weight="bold">Y & Ø: لب‌ها را کوچک و غنچه‌ای گرد کنید!</text>
                    <text x="120" y="138" text-anchor="middle" fill="#cbd5e1" font-size="11">lys • ny • brød • møde</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <ellipse cx="120" cy="78" rx="52" ry="18" fill="none" stroke="#38bdf8" stroke-width="4"/>
                    <line x1="80" y1="78" x2="160" y2="78" stroke="#7dd3fc" stroke-width="3"/>
                    <text x="120" y="30" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">I & E: لب‌ها مثل لبخند باز</text>
                    <text x="120" y="138" text-anchor="middle" fill="#cbd5e1" font-size="11">Lis • ni • bred • der</text>
                </svg>`,
            minimalPairs: [
                { a: 'lys', b: 'lis', meanA: 'نور / شمع (Y گرد)', meanB: 'اسم Lis (I کشیده)', ctxA: 'Vi tænder stearinlys i stuen.', ctxB: 'Min veninde hedder Lis.' },
                { a: 'ny', b: 'ni', meanA: 'جدید / نو (Y گرد)', meanB: 'عدد ۹ (I کشیده)', ctxA: 'Hun har en ny cykel.', ctxB: 'Klokken er ni nu.' },
                { a: 'brød', b: 'bred', meanA: 'نان (Ø گرد)', meanB: 'پهن / عریض (E کشیده)', ctxA: 'Jeg køber frisk brød.', ctxB: 'Vejen er meget bred.' },
                { a: 'dør', b: 'der', meanA: 'دَر (Ø گرد)', meanB: 'آنجا (E کشیده)', ctxA: 'Luk venligst den hvide dør.', ctxB: 'Der sidder en ven.' }
            ],
            speechExercises: [
                { text: 'Vi har et nyt lyst køkken med ny dør.', targetWords: ['nyt', 'lyst', 'køkken', 'ny', 'dør'], hintDa: 'Spids læberne fast ved nyt, lyst, køkken, ny og dør!', hintFa: 'در کلمات nyt، lyst، køkken، ny و dør لب‌ها را جلو و کاملاً غنچه نگه دارید.' }
            ]
        },
        {
            id: 'v_og_klynger',
            badge: 'تمرکز ۵',
            titleDa: '5. V (tænder mod læbe) & klynger uden støttevokalen "e-"',
            titleFa: '۵. حرف V (دندان روی لب) و خوشه‌های آوایی بدون «اِ-» اضافی (sk-, sp-, st-)',
            descDa: 'Farsi tillader ikke to konsonanter i starten af et ord og sætter derfor naturligt støttevokalen "e-" foran ("eskole", "espiser", "ebrød")! Hold desuden overtænderne let mod underlæben på V (især hvad, hvor, vand).',
            descFa: 'فارسی‌زبان‌ها هنگام یادگیری دانمارکی دو تله بسیار رایج دارند:<br>۱) <strong>اضافه کردن «اِ-» اول خوشه‌ها (<em>skole, spiser, stor</em>):</strong> در فارسی هیچ کلمه‌ای با دو صامت شروع نمی‌شود، برای همین ناخودآگاه اولش «اِ» می‌گذاریم و می‌گوییم <em>«اِسکوله / اِسپیسِر»</em>! در دانمارکی یکسره از صدای کشیده <strong>sss-kole</strong> شروع کنید — اصلاً «اِ» نگویید!<br>۲) <strong>حرف V (<em>vand, vi, vinter, hvad</em>):</strong> دندان‌های بالا حتماً باید با لب پایین تماس داشته باشند (لب‌ها را مثل W انگلیسی غنچه نکنید).',
            optA: { label: '🦷 V (دندان روی لب) & شروع مستقیم sk-/sp-', ex: 'vand, vinter, skole, spiser', words: ['vand', 'vinter', 'skole', 'spiser'] },
            optB: { label: '🚫 تله: گذاشتن «اِ-» (eskole) یا W با دو لب', ex: 'hvad, hvor (h خاموش + دندان روی لب)', words: ['hvad', 'hvor', 'stor', 'station'] },
            trickFa: '<strong>تمرین جلوی آینه:</strong> قبل از گفتن <em><strong>s</strong>kole</em> یا <em><strong>s</strong>piser</em>، دو ثانیه صدای مار «سسسس» بکشید و فوراً بچسبانید به «کوله»: <strong>sss-kole</strong> (بدون کوچک‌ترین «اِ» اولش)! و برای <em><strong>v</strong>and / <strong>hv</strong>ad</em> دندان بالا را روی لب پایین ببینید.',
            diagTitleA: 'V دانمارکی: دندان‌های بالا به آرامی روی لب پایین قرار می‌گیرند',
            diagTitleB: 'تله: غنچه کردن دو لب یا اضافه کردن «اِ-» اول sk-/sp-',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <rect x="108" y="48" width="22" height="22" rx="3" fill="#f8fafc" stroke="#38bdf8" stroke-width="2"/>
                    <path d="M 70 86 Q 120 70 170 86" fill="none" stroke="#4ade80" stroke-width="8" stroke-linecap="round"/>
                    <text x="120" y="32" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">دندان‌های بالا ← لب پایین (V)</text>
                    <text x="120" y="132" text-anchor="middle" fill="#cbd5e1" font-size="11">vand • vinter • hvad (h صامت)</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="120" cy="76" r="24" fill="none" stroke="#ef4444" stroke-width="5"/>
                    <text x="120" y="30" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">دو لب غنچه [W] یا «اِسکوله» به جای sss-kole!</text>
                    <text x="120" y="134" text-anchor="middle" fill="#94a3b8" font-size="11">اول کلمه اصلاً "e-" اضافه نکنید</text>
                </svg>`,
            minimalPairs: [
                { a: 'vand', b: 'fand', meanA: 'آب (دندان روی لب + لرزش صدا V)', meanB: 'F (بدون لرزش حنجره)', ctxA: 'Jeg drikker koldt vand.', ctxB: 'در V گلو می‌لرزد اما در F نه.' },
                { a: 'skole', b: 'kole', meanA: 'مدرسه (مستقیم sss-kole، بدون «اِ»)', meanB: 'بدون s اول', ctxA: 'Børnene går i skole.', ctxB: 'نگویید "اِسکوله" — بگویید sss-kole!' },
                { a: 'spis', b: 'is', meanA: 'بخور! (مستقیم sp-)', meanB: 'یخ / بستنی', ctxA: 'Spis nu din mad!', ctxB: 'Spis با کشش سسس-پیس شروع می‌شود.' }
            ],
            speechExercises: [
                { text: 'Vi spiser varm suppe i skolen om vinteren.', targetWords: ['vi', 'spiser', 'varm', 'skolen', 'vinteren'], hintDa: 'Tænder på underlæbe ved vi/varm/vinteren, og sss- direkte ind i spiser/skolen uden "e-"!', hintFa: 'در vi، varm و vinteren دندان بالا روی لب پایین، و در spiser و skolen بدون «اِ» مستقیم با sss- شروع کنید!' }
            ]
        }
    ];

    function openHomeworkModal() {
        const existing = document.querySelector('#vlfa-hw-modal');
        if (existing) existing.remove();
        const overlay = document.createElement('div');
        overlay.id = 'vlfa-hw-modal';
        overlay.className = 'vlfa-modal-overlay';
        const isDa = getLang() === 'da';
        const tabLabels = {
            principles: isDa ? '۱. وضعیت دهان و قوانین (Teori)' : '۱. وضعیت دهان و قوانین',
            pairs: isDa ? '۲. تمرین شنیداری (Lyttequiz)' : '۲. تمرین شنیداری',
            speech: isDa ? '۳. تمرین میکروفون (Udtale)' : '۳. تمرین میکروفون'
        };
        overlay.innerHTML = `
            <div class="vlfa-modal-card">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:1px solid rgba(255,255,255,0.12);">
                    <div dir="rtl">
                        <div style="font-size:0.74rem; font-weight:900; color:#38bdf8; text-transform:uppercase;">📚 لینک‌های تکلیف • فارسی</div>
                        <h2 style="margin:0.15rem 0 0; font-size:1.2rem; color:#fff;">${isDa ? 'Direkte links til alle 5 fokuslyde' : 'لینک مستقیم هر ۵ صدای کلیدی'}</h2>
                    </div>
                    <button type="button" class="vlfa-btn" id="vlfa-hw-close">✕ بستن</button>
                </div>
                <div style="display:flex; flex-direction:column; gap:0.9rem;">
                    ${SOUND_MODULES.map(m => `
                        <div style="background:rgba(30,41,59,0.75); border:1px solid rgba(148,163,184,0.25); border-radius:12px; padding:0.85rem;">
                            <div style="font-weight:800; color:#fde047; margin-bottom:0.5rem;" dir="rtl">${m.titleFa}${isDa ? ` <span style="color:#94a3b8; font-size:0.82rem;" dir="ltr">(${m.titleDa})</span>` : ''}</div>
                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                ${VALID_TABS.map(tid => {
                                    const url = `${window.location.origin}${window.location.pathname}#/${getLang() || 'fa'}/vanskelige_lyde_farsi/${m.id}/${tid}`;
                                    return `
                                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap; background:rgba(15,23,42,0.7); padding:0.45rem 0.7rem; border-radius:8px;">
                                            <span style="font-size:0.82rem; color:#e2e8f0;" dir="rtl">${tabLabels[tid]}</span>
                                            <button type="button" class="vlfa-btn" data-copy-url="${url}" style="padding:0.3rem 0.7rem; font-size:0.78rem; border-color:#38bdf8;">📋 کپی</button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        overlay.querySelector('#vlfa-hw-close').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        overlay.querySelectorAll('[data-copy-url]').forEach(b => {
            b.onclick = () => copyToClipboard(b.dataset.copyUrl, isDa ? 'Lektie-link' : 'لینک تمرین');
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
        topBar.className = 'vlfa-top-bar';
        topBar.innerHTML = `
            <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                <button type="button" class="vlfa-btn" id="vlfa-back-main">${isDa ? '← صفحه اصلی (Forside)' : '← صفحه اصلی'}</button>
                <button type="button" class="vlfa-btn" id="vlfa-back-mss" style="border-color:#38bdf8; color:#7dd3fc;">🇮🇷 بازگشت به «مقایسه زبان من با دانمارکی»</button>
            </div>
            <button type="button" class="vlfa-btn" id="vlfa-hw-btn" style="border-color:#fde047; color:#fde047;">${isDa ? '📋 لینک‌های تمرین (Lektier)' : '📋 لینک‌های تمرین'}</button>
        `;
        topBar.querySelector('#vlfa-back-main').onclick = handleBackToMain;
        topBar.querySelector('#vlfa-back-mss').onclick = handleBackToMSS;
        topBar.querySelector('#vlfa-hw-btn').onclick = openHomeworkModal;
        viewContainer.appendChild(topBar);

        const hero = document.createElement('div');
        hero.className = 'vlfa-hero';
        hero.innerHTML = `
            <div class="vlfa-hero-kicker">${isDa ? '🇮🇷 تمرین ویژه تلفظ دانمارکی برای فارسی‌زبانان • سطح ۲ (Trin 2)' : '🇮🇷 تمرین ویژه تلفظ دانمارکی برای فارسی‌زبانان • سطح ۲'}</div>
            <h1 dir="rtl">${modData.titleFa}</h1>
            <p dir="rtl">${isDa ? `<span dir="ltr">${modData.titleDa}</span> — ` : ''}وضعیت دهان و زبان، تشخیص تفاوت شنیداری و تمرین تلفظ با میکروفون</p>
        `;
        viewContainer.appendChild(hero);

        const modNav = document.createElement('div');
        modNav.className = 'vlfa-mod-nav';
        SOUND_MODULES.forEach(m => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `vlfa-mod-pill ${m.id === activeModuleId ? 'active' : ''}`;
            btn.dir = isDa ? 'ltr' : 'rtl';
            btn.textContent = isDa
                ? `${m.badge}: ${m.titleDa.replace(/^\d+\.\s*/, '')}`
                : m.titleFa;
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
        subTabs.className = 'vlfa-subtabs';
        [
            { id: 'principles', label: isDa ? '۱. وضعیت دهان و قواعد (Teori)' : '۱. وضعیت دهان و قواعد' },
            { id: 'pairs', label: isDa ? '۲. جفت‌واژه‌های مشابه (Lyttequiz)' : '۲. جفت‌واژه‌های مشابه' },
            { id: 'speech', label: isDa ? '۳. تمرین میکروفون (Udtale)' : '۳. تمرین میکروفون' }
        ].forEach(st => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = `vlfa-subtab ${st.id === activeTab ? 'active' : ''}`;
            b.textContent = st.label;
            b.onclick = () => { activeTab = st.id; renderView(); };
            subTabs.appendChild(b);
        });
        viewContainer.appendChild(subTabs);

        const content = document.createElement('div');
        viewContainer.appendChild(content);

        if (activeTab === 'principles') {
            const card = document.createElement('div');
            card.className = 'vlfa-card';
            const opt = activeTarget === 'a' ? modData.optA : modData.optB;
            card.innerHTML = `
                <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:1rem;">
                    <button type="button" class="vlfa-btn" id="vlfa-tog-a" style="${activeTarget === 'a' ? 'background:#0284c7; border-color:#7dd3fc;' : ''}">${modData.optA.label}</button>
                    <button type="button" class="vlfa-btn" id="vlfa-tog-b" style="${activeTarget === 'b' ? 'background:#be123c; border-color:#fda4af;' : ''}">${modData.optB.label}</button>
                </div>
                <div class="vlfa-diag-grid">
                    <div>
                        <div style="font-weight:800; color:#7dd3fc; margin-bottom:0.45rem;" dir="rtl">${activeTarget === 'a' ? modData.diagTitleA : modData.diagTitleB}</div>
                        <div class="vlfa-svg-box">${modData.diagSvg(activeTarget === 'a')}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; justify-content:space-between; gap:0.75rem;">
                        <div style="font-size:0.93rem; color:#e2e8f0; line-height:1.62;" dir="rtl">${modData.descFa}</div>
                        ${isDa ? `<div style="font-size:0.86rem; color:#94a3b8; line-height:1.5; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.08);"><strong style="color:#cbd5e1;">Dansk lærer-note:</strong> ${modData.descDa}</div>` : ''}
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                            ${opt.words.map(w => `<button type="button" class="vlfa-btn" data-say="${w}" style="border-color:#38bdf8;">🔊 ${w}</button>`).join('')}
                        </div>
                    </div>
                </div>
                <div style="background:rgba(234,179,8,0.14); border:1px solid rgba(250,204,21,0.45); border-radius:12px; padding:0.85rem 1rem; color:#fef08a; font-size:0.9rem; line-height:1.6;" dir="rtl">
                    ${modData.trickFa}
                </div>
            `;
            card.querySelector('#vlfa-tog-a').onclick = () => { activeTarget = 'a'; renderView(); };
            card.querySelector('#vlfa-tog-b').onclick = () => { activeTarget = 'b'; renderView(); };
            card.querySelectorAll('[data-say]').forEach(b => {
                b.onclick = () => playAudio(b.dataset.say, 0.8);
            });
            content.appendChild(card);
        } else if (activeTab === 'pairs') {
            const pair = modData.minimalPairs[pairQuizIdx];
            if (!pair._target) pair._target = Math.random() < 0.5 ? 'a' : 'b';
            const targetWord = pair._target === 'a' ? pair.a : pair.b;
            const qCard = document.createElement('div');
            qCard.className = 'vlfa-card';
            qCard.style.textAlign = 'center';
            qCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; color:#94a3b8; font-weight:800; font-size:0.86rem; margin-bottom:0.8rem;">
                    <span>جفت ${pairQuizIdx + 1} از ${modData.minimalPairs.length}</span>
                    <span style="color:#4ade80;">امتیاز: ${pairScore} / ${modData.minimalPairs.length}</span>
                </div>
                <p style="color:#cbd5e1; margin:0 0 0.5rem;" dir="rtl">برای شنیدن کلمه دانمارکی کلیک کنید و گزینه درست را انتخاب نمایید:</p>
                <button type="button" class="vlfa-listen-big" id="vlfa-play-pair">${isDa ? '🔊 شنیدن تلفظ دانمارکی (Lyt)' : '🔊 شنیدن تلفظ دانمارکی'}</button>
                <div class="vlfa-pair-grid">
                    <button type="button" class="vlfa-pair-btn" id="vlfa-choice-a">
                        <div style="font-size:1.5rem; font-weight:900; color:#38bdf8;">${pair.a}</div>
                        <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.25rem;" dir="rtl">${pair.meanA}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxA}"</div>
                    </button>
                    <button type="button" class="vlfa-pair-btn" id="vlfa-choice-b">
                        <div style="font-size:1.5rem; font-weight:900; color:#f472b6;">${pair.b}</div>
                        <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.25rem;" dir="rtl">${pair.meanB}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxB}"</div>
                    </button>
                </div>
                <div id="vlfa-pair-fb" style="margin-top:0.75rem;"></div>
                <div style="display:flex; justify-content:space-between; margin-top:1.1rem; gap:0.5rem; flex-wrap:wrap;">
                    <button type="button" class="vlfa-btn" id="vlfa-prev-p" ${pairQuizIdx === 0 ? 'disabled' : ''}>← قبلی</button>
                    <button type="button" class="vlfa-btn" id="vlfa-next-p">${pairQuizIdx === modData.minimalPairs.length - 1 ? 'شروع مجدد ↺' : 'جفت بعدی →'}</button>
                </div>
            `;
            qCard.querySelector('#vlfa-play-pair').onclick = () => playAudio(targetWord, 0.78);
            const fbEl = qCard.querySelector('#vlfa-pair-fb');
            const btnA = qCard.querySelector('#vlfa-choice-a');
            const btnB = qCard.querySelector('#vlfa-choice-b');
            function handlePick(pick) {
                btnA.disabled = true;
                btnB.disabled = true;
                const ok = pick === pair._target;
                if (ok) pairScore++;
                fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};" dir="rtl">
                    ${ok ? `🎉 آفرین! کلمه درست "${targetWord}" است.` : `❌ دقیق نبود — کلمه درست "${targetWord}" است.`}
                </div>`;
                playAudio(targetWord, 0.75);
            }
            btnA.onclick = () => handlePick('a');
            btnB.onclick = () => handlePick('b');
            qCard.querySelector('#vlfa-prev-p').onclick = () => { if (pairQuizIdx > 0) { pairQuizIdx--; renderView(); } };
            qCard.querySelector('#vlfa-next-p').onclick = () => {
                pair._target = undefined;
                if (pairQuizIdx < modData.minimalPairs.length - 1) pairQuizIdx++;
                else { pairQuizIdx = 0; pairScore = 0; }
                renderView();
            };
            content.appendChild(qCard);
        } else {
            const ex = modData.speechExercises[speechExerciseIdx] || modData.speechExercises[0];
            const sCard = document.createElement('div');
            sCard.className = 'vlfa-card';
            sCard.style.textAlign = 'center';
            const promptHtml = ex.text.split(' ').map(w => {
                const clean = w.toLowerCase().replace(/[.,!?]/g, '');
                return ex.targetWords.includes(clean)
                    ? `<span style="color:#38bdf8; text-decoration:underline;">${w}</span>`
                    : `<span>${w}</span>`;
            }).join(' ');
            sCard.innerHTML = `
                <div style="font-size:1.45rem; font-weight:900; margin:0.4rem 0 0.65rem;">${promptHtml}</div>
                <p style="color:#cbd5e1; margin:0 0 0.85rem;" dir="rtl">این جمله را با صدای بلند بخوانید و به کلمات آبی خط‌کشیده توجه ویژه داشته باشید!</p>
                ${consecutiveSpeechStreak > 0 ? `<div style="color:#fde047; font-weight:800; margin-bottom:0.7rem;" dir="rtl">🔥 تلفظ‌های درست پیاپی: ${consecutiveSpeechStreak}</div>` : ''}
                <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap; margin:0.65rem 0;">
                    <button type="button" class="vlfa-listen-big" id="vlfa-say-ex" style="margin:0;">🔊 شنیدن نمونه</button>
                    <button type="button" class="vlfa-btn" id="vlfa-mic-btn" style="background:#dc2626; border-color:#f87171; padding:0.8rem 1.4rem; font-size:1rem;">🎙️ حالا صحبت کنید</button>
                </div>
                <div id="vlfa-speech-status" style="color:#94a3b8; font-size:0.9rem; margin-top:0.7rem;" dir="rtl">دکمه «حالا صحبت کنید» را بزنید و با صدای واضح به دانمارکی بخوانید.</div>
                <div id="vlfa-speech-fb" style="margin-top:0.7rem;"></div>
                <div style="text-align:right; background:rgba(30,41,59,0.7); border-radius:10px; padding:0.8rem; margin-top:1rem; font-size:0.86rem; color:#cbd5e1;" dir="rtl">
                    <strong>راهنما:</strong> ${ex.hintFa}${isDa ? `<br><span style="color:#94a3b8;" dir="ltr"><strong>Dansk:</strong> ${ex.hintDa}</span>` : ''}
                </div>
            `;
            sCard.querySelector('#vlfa-say-ex').onclick = () => playAudio(ex.text, 0.84);
            const micBtn = sCard.querySelector('#vlfa-mic-btn');
            const statusEl = sCard.querySelector('#vlfa-speech-status');
            const fbEl = sCard.querySelector('#vlfa-speech-fb');
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRec) {
                statusEl.textContent = 'مرورگر شما از تشخیص گفتار پشتیبانی نمی‌کند (Chrome یا Safari را امتحان کنید).';
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
                        statusEl.textContent = '🎙️ در حال گوش دادن... حالا به دانمارکی صحبت کنید!';
                        statusEl.style.color = '#4ade80';
                    } catch (_) {}
                };
                rec.onresult = (ev) => {
                    isSpeechRecording = false;
                    const said = ev.results[0][0].transcript.trim();
                    statusEl.textContent = `متن تشخیص داده شده: "${said}"`;
                    const words = said.toLowerCase().split(/\s+/).map(w => w.replace(/[.,!?]/g, ''));
                    const hits = ex.targetWords.filter(tw => words.includes(tw));
                    const ok = hits.length === ex.targetWords.length;
                    if (ok) consecutiveSpeechStreak++; else consecutiveSpeechStreak = 0;
                    fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};" dir="rtl">
                        ${ok ? `🌟 تلفظ عالی! همه کلمات هدف (${hits.join(', ')}) کاملاً درست شنیده شدند.` : `💡 تلاش خوب! دوباره امتحان کنید و روی این کلمات تمرکز کنید: ${ex.targetWords.join(', ')}`}
                    </div>`;
                };
                rec.onerror = () => { isSpeechRecording = false; statusEl.textContent = 'صدا واضح شنیده نشد. لطفاً دوباره امتحان کنید.'; };
                rec.onend = () => { isSpeechRecording = false; };
            }
            content.appendChild(sCard);
        }
    }

    renderView();
    container.appendChild(viewContainer);
}
