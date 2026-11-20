import { getLang } from '../utils/i18n.js';

/**
 * VanskeligeLydeUrduView
 * Komplet pædagogisk udtale-træningsflade til urdutalende danskkursister.
 *
 * Fokus på de 5 lyde og lydmønstre, der især giver urdutalende vanskeligheder på dansk:
 *   1. Blødt d – "Ånde på brillerne" (aldrig hårdt urdu د/ڈ eller engelsk th)
 *   2. P / T / K med pust (som urdu پھ، تھ، کھ) vs. B / D / G (upustede پ، ت، ک lyder som b, d, g!)
 *   3. Dansk svælg-R (dybt som غ) & smeltet slut-r (aldrig tungespids-ر eller retrofleks ڑ)
 *   4. Kyssemund Y & Ø vs. I & E (spidsede forvokaler uden urdu/engelsk erstatning)
 *   5. V (overtænder på underlæbe, ikke urdu و) & forlydsklynger (sk-, sp-, st- uden "i-" foran!)
 */
export function renderVanskeligeLydeUrduView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    function handleBackToMain() {
        if (typeof navigateFn === 'function') {
            navigateFn('main');
        } else {
            const lang = getLang() || 'ur';
            window.location.hash = `#/${lang}/main`;
        }
    }

    function handleBackToMSS() {
        if (typeof navigateFn === 'function') {
            navigateFn('mit_sprog_sammenlignet');
        } else {
            const lang = getLang() || 'ur';
            window.location.hash = `#/${lang}/mit_sprog_sammenlignet`;
        }
    }

    function showCopyToast(msg) {
        let toast = document.querySelector('#vlur-copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'vlur-copy-toast';
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
                showCopyToast(`📋 ${label} kopieret (کاپی ہو گیا)!`);
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
        showCopyToast(`📋 ${label} kopieret (کاپی ہو گیا)!`);
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
            const idx = segs.findIndex(s => s === 'vanskelige_lyde_urdu' || s === 'urdu_lyde');
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
        const lang = getLang() || 'ur';
        const newHash = `#/${lang}/vanskelige_lyde_urdu/${activeModuleId}/${activeTab}`;
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
    viewContainer.className = 'vlur-wrapper';

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .vlur-wrapper {
            max-width: 1040px;
            margin: 0 auto;
            padding: 1.25rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        .vlur-top-bar {
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.35rem;
            padding-bottom: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .vlur-btn {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(30,41,59,0.86); border: 1px solid rgba(148,163,184,0.35);
            color: #f8fafc; padding: 0.52rem 1rem; border-radius: 11px;
            font-weight: 800; font-size: 0.86rem; cursor: pointer; transition: all 0.16s ease;
        }
        .vlur-btn:hover { border-color: #38bdf8; transform: translateY(-1px); }
        .vlur-hero { text-align: center; margin-bottom: 1.5rem; }
        .vlur-hero-kicker {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(250,204,21,0.14); border: 1px solid rgba(250,204,21,0.45);
            color: #fde047; padding: 0.35rem 0.95rem; border-radius: 999px;
            font-size: 0.8rem; font-weight: 800; margin-bottom: 0.6rem;
        }
        .vlur-hero h1 { margin: 0 0 0.45rem; font-size: 1.85rem; font-weight: 900; color: #fff; }
        .vlur-hero p { margin: 0 auto; max-width: 720px; color: #cbd5e1; font-size: 0.94rem; line-height: 1.5; }
        .vlur-mod-nav {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.1rem;
        }
        .vlur-mod-pill {
            padding: 0.58rem 0.95rem; border-radius: 12px;
            border: 1.5px solid rgba(255,255,255,0.16); background: rgba(15,23,42,0.78);
            color: #e2e8f0; font-weight: 800; font-size: 0.84rem; cursor: pointer;
            transition: all 0.16s ease; text-align: left;
        }
        .vlur-mod-pill.active {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border-color: #7dd3fc; color: #ffffff; box-shadow: 0 6px 18px rgba(56,189,248,0.28);
        }
        .vlur-subtabs {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.35rem;
        }
        .vlur-subtab {
            padding: 0.55rem 1.05rem; border-radius: 10px;
            border: 1.5px solid rgba(148,163,184,0.28); background: rgba(30,41,59,0.72);
            color: #cbd5e1; font-weight: 800; font-size: 0.85rem; cursor: pointer;
        }
        .vlur-subtab.active {
            border-color: #fde047; background: rgba(250,204,21,0.18); color: #fef08a;
        }
        .vlur-card {
            background: rgba(15,23,42,0.9); border: 1.5px solid rgba(148,163,184,0.26);
            border-radius: 18px; padding: 1.25rem 1.35rem; margin-bottom: 1.15rem;
            box-shadow: 0 10px 26px rgba(0,0,0,0.32);
        }
        .vlur-diag-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem; margin: 1rem 0;
        }
        .vlur-svg-box {
            background: #070d19; border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px; padding: 0.75rem; min-height: 165px;
            display: flex; align-items: center; justify-content: center;
        }
        .vlur-pair-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.85rem; margin: 1.1rem 0;
        }
        .vlur-pair-btn {
            background: rgba(30,41,59,0.88); border: 2px solid rgba(148,163,184,0.32);
            border-radius: 14px; padding: 1.05rem; cursor: pointer; text-align: center;
            color: #f8fafc; transition: all 0.16s ease;
        }
        .vlur-pair-btn:hover:not(:disabled) { border-color: #38bdf8; transform: translateY(-2px); }
        .vlur-listen-big {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: 1.5px solid #38bdf8; color: #fff; font-size: 1.05rem; font-weight: 900;
            padding: 0.8rem 1.6rem; border-radius: 14px; cursor: pointer;
            display: inline-flex; align-items: center; gap: 0.5rem; margin: 0.75rem 0;
        }
        .vlur-modal-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
            z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;
        }
        .vlur-modal-card {
            background: #0f172a; border: 2px solid #38bdf8; border-radius: 18px;
            max-width: 680px; width: 100%; max-height: 86vh; overflow-y: auto; padding: 1.25rem;
        }
        @media (max-width: 600px) {
            .vlur-hero h1 { font-size: 1.45rem; }
            .vlur-card { padding: 1rem; }
        }
    `;
    viewContainer.appendChild(styleEl);

    const SOUND_MODULES = [
        {
            id: 'bloedt_d',
            badge: 'توجہ 1',
            titleDa: '1. Blødt d – "Ånde på brillerne"',
            titleUr: '1. ڈینش نرم d — «عینک پر گرم سانس دینا»',
            descDa: 'Urdu har både tand-d (د) og retrofleks ḍ (ڈ), men mangler dansk blødt d (brød, mad, gade). Undgå at slå tungen mod tænder eller gane — læg tungespidsen fladt mod undertænderne og ånd lunt ud.',
            descUr: 'اردو میں دانتوں والا <strong>د</strong> اور سخت پیچھے مڑا ہوا <strong>ڈ</strong> موجود ہے، لیکن ڈینش کا نرم <strong>d</strong> (<em>mad, brød, gade</em>) بالکل مختلف ہے! زبان کو نہ دانتوں سے ٹکرائیں اور نہ پیچھے موڑیں — بلکہ زبان کی نوک نیچے کے سامنے والے دانتوں کے پیچھے چپٹی رکھیں اور اوپر سے گرم سانس باہر چھوڑیں جیسے آپ عینک صاف کرنے کے لیے شیشے پر بھاپ دیتے ہیں!',
            optA: { label: '🇩🇰 نرم d (brød, mad)', ex: 'brød, mad, gade', words: ['brød', 'mad', 'sød', 'gade'] },
            optB: { label: '🇵🇰 پھندا: سخت د / ڈ یا ٹ', ex: 'dag (شروع میں سخت d!)', words: ['dag', 'dør', 'dansk'] },
            trickUr: '<strong>سنہری اصول:</strong> لفظ کے شروع میں (<em><strong>d</strong>ag</em>) ڈینش d سخت ہوتا ہے (تقریباً اردو د جیسا، مگر ڈ کی طرح زبان پیچھے نہ موڑیں)۔ لیکن لفظ کے بیچ یا آخر میں (<em>ma<strong>d</strong>, brø<strong>d</strong>, sø<strong>d</strong></em>) زبان کو نیچے آرام سے رکھ کر صرف گرم ہوا باہر بہنے دیں!',
            diagTitleA: 'نرم d (لفظ کے آخر میں: mad, brød): زبان نیچے آرام سے، گرم سانس جاری',
            diagTitleB: 'پھندا: اردو کا سخت د یا ڈ ہوا کا راستہ روک دیتا ہے!',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="96" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 115 Q 112 108 75 112" fill="none" stroke="#22c55e" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 86 Q 72 86 32 82" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="5,4"/>
                    <text x="120" y="62" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">گرم سانس (عینک صاف کرنے جیسی)</text>
                    <text x="120" y="138" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">زبان نیچے کے دانتوں کے پیچھے چپٹی!</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="66" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 110 Q 112 95 72 78" fill="none" stroke="#ef4444" stroke-width="7" stroke-linecap="round"/>
                    <line x1="56" y1="68" x2="56" y2="95" stroke="#fde047" stroke-width="3"/>
                    <text x="120" y="48" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">زبان اوپر ٹکرا گئی [د/ڈ] — بہت سخت!</text>
                </svg>`,
            minimalPairs: [
                { a: 'mad', b: 'mat', meanA: 'کھانا (نرم d)', meanB: 'مدھم / بے رونق (سخت t)', ctxA: 'Vi laver mad i køkkenet.', ctxB: 'Farven er helt mat.' },
                { a: 'glad', b: 'glat', meanA: 'خوش (نرم d)', meanB: 'پھسلنے والا (سخت t)', ctxA: 'Jeg er meget glad i dag.', ctxB: 'Vejen er glat af is.' },
                { a: 'bad', b: 'bat', meanA: 'غسل / نہانا (نرم d)', meanB: 'بلا / ریکٹ (سخت t)', ctxA: 'Jeg tager et varmt bad.', ctxB: 'Han spiller med et rødt bat.' },
                { a: 'sød', b: 'sæt', meanA: 'میٹھا / پیارا (نرم d)', meanB: 'رکھ دو / جملہ (سخت t)', ctxA: 'Kagen er meget sød.', ctxB: 'Sæt dig ned her.' }
            ],
            speechExercises: [
                { text: 'Jeg spiser godt brød og sød mad.', targetWords: ['godt', 'brød', 'sød', 'mad'], hintDa: 'Hold tungen fladt bag undertænderne ved brød, sød, mad.', hintUr: 'brød, sød اور mad بولتے وقت زبان نیچے کے دانتوں کے پیچھے چپٹی رکھیں۔' },
                { text: 'Gaden er bred og flad.', targetWords: ['gaden', 'bred', 'flad'], hintDa: 'Ånd blødt ud i "gaden", "bred", "flad".', hintUr: 'gaden, bred اور flad میں نرم سانس کے ساتھ d بولیں۔' }
            ]
        },
        {
            id: 'p_t_k_pust',
            badge: 'توجہ 2',
            titleDa: '2. P / T / K med pust (urdu پھ، تھ، کھ) vs. B / D / G',
            titleUr: '2. پھونک کے ساتھ P / T / K (اردو پھ، تھ، کھ جیسا) بمقابلہ B / D / G',
            descDa: 'Urdu skelner præcis mellem upustede پ، ت، ک og pustede پھ، تھ، کھ! Danskere hører upustede پ، ت، ک som b, d, g — så brug ALTID "پھ، تھ، کھ"-pustet forrest i pære, tale, kaffe (og hold tungen fremme ved tænderne, ikke retrofleks ٹ/ڈ!).',
            descUr: 'اردو بولنے والوں کے لیے ایک شاندار ٹرک! اردو میں <strong>پ، ت، ک</strong> (بغیر ہوا) اور <strong>پھ، تھ، کھ</strong> (تیز ہوا کے ساتھ) الگ آوازیں ہیں۔ ڈینش میں لفظ کے شروع کے <strong>P, T, K</strong> کو ہمیشہ اردو کے <strong>پھ، تھ، کھ</strong> کی طرح تیز ہوا کے دھکے کے ساتھ بولا جاتا ہے! اگر آپ بغیر ہوا کے (پ، ت، ک کی طرح) بولیں تو ڈینش لوگ اسے <strong>B, D, G</strong> سمجھ لیں گے (مثلاً <em>kaffe</em> کی جگہ <em>gaffe</em>)! نیز T اور D دانتوں کے پاس آگے سے بولیں، پیچھے مڑے ہوئے ٹ/ڈ کی طرح نہیں۔',
            optA: { label: '💨 تیز ہوا (پھ، تھ، کھ): P, T, K', ex: 'pære, pande, tale, kaffe', words: ['pære', 'pande', 'tale', 'kaffe'] },
            optB: { label: '🤫 بغیر ہوا: B, D, G', ex: 'bære, bande, dale, gade', words: ['bære', 'bande', 'dale', 'gade'] },
            trickUr: '<strong>کاغذ والا ٹیسٹ:</strong> منہ سے 3 سینٹی میٹر آگے کاغذ رکھیں۔ جب <em><strong>p</strong>ære, <strong>t</strong>ale, <strong>k</strong>old</em> (گویا پھ، تھ، کھ!) کہیں تو ہوا کا جھونکا کاغذ کو ہلا دے! اور <em><strong>b</strong>ære, <strong>d</strong>ale, <strong>g</strong>ade</em> پر کاغذ ساکن رہے۔',
            diagTitleA: 'P, T, K شروع میں: تیز ہوا کا جھونکا (پھ، تھ، کھ) کاغذ ہلا دیتا ہے!',
            diagTitleB: 'B, D, G: پُرسکون — ہوا کا جھونکا نہیں، کاغذ ساکن رہتا ہے',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="8" ry="6" fill="#ef4444"/>
                    <path d="M 45 84 L 18 70 M 45 84 L 14 84 M 45 84 L 18 98" stroke="#fde047" stroke-width="3.5" stroke-linecap="round"/>
                    <path d="M 10 45 Q 2 84 22 122" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                    <text x="155" y="75" text-anchor="middle" fill="#fde047" font-size="11" font-weight="bold">تیز ہوا کا جھونکا (پھ، تھ، کھ)!</text>
                    <text x="155" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">pære • tale • kaffe</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="7" ry="5" fill="#38bdf8"/>
                    <line x1="16" y1="45" x2="16" y2="120" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
                    <text x="155" y="75" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">بغیر ہوا — کاغذ ساکن ہے</text>
                    <text x="155" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">bære • dale • gade</text>
                </svg>`,
            minimalPairs: [
                { a: 'pære', b: 'bære', meanA: 'ناشپاتی / بلب (پھ جیسی ہوا)', meanB: 'اٹھانا (نرم B)', ctxA: 'Jeg spiser en sød pære.', ctxB: 'Kan du bære tasken?' },
                { a: 'pande', b: 'bande', meanA: 'فرائی پین / پیشانی (تیز P)', meanB: 'گروہ / گالی دینا (نرم B)', ctxA: 'Steg æg på en varm pande.', ctxB: 'Man må ikke bande her.' },
                { a: 'tale', b: 'dale', meanA: 'بات کرنا / تقریر (تھ جیسی ہوا)', meanB: 'کم ہونا / وادیاں (آگے کا D)', ctxA: 'Vi skal tale dansk i dag.', ctxB: 'Priserne kan dale lidt.' },
                { a: 'kold', b: 'gold', meanA: 'ٹھنڈا (کھ جیسی ہوا)', meanB: 'بنجر / خالی (نرم G)', ctxA: 'Vinteren er meget kold.', ctxB: 'Jorden er helt gold.' }
            ],
            speechExercises: [
                { text: 'Pigen køber kold kaffe og en pære.', targetWords: ['pigen', 'køber', 'kold', 'kaffe', 'pære'], hintDa: 'Lav tydeligt pust (som پھ og کھ) på alle P- og K-ord!', hintUr: 'ہر P اور K پر اردو کے پھ اور کھ کی طرح واضح ہوا نکالیں!' },
                { text: 'Taler du tit med venner på torvet?', targetWords: ['taler', 'tit', 'torvet'], hintDa: 'Skub luft ud foran ved tænderne (ikke ٹ) på taler, tit, torvet.', hintUr: 'taler, tit اور torvet میں تھ کی طرح ہوا کے ساتھ، دانتوں کے پاس سے T بولیں (ٹ کی طرح زبان پیچھے نہ موڑیں)۔' }
            ]
        },
        {
            id: 'dansk_r',
            badge: 'توجہ 3',
            titleDa: '3. Dansk R – Svælg-krage (tæt på غ) & smeltet slut-r',
            titleUr: '3. ڈینش گلے والا R (غ کے قریب) — اردو ر / ڑ جیسا نہیں!',
            descDa: 'Urdu bruger tungespids-r (ر) eller retrofleks ṛ (ڑ). Dansk for-R (rød, ris) laves dybt i halsen tæt på urdu غ (ghain), og slut-R (mor, bror, spiser) forsvinder helt ind i vokalen!',
            descUr: 'اردو میں <strong>ر</strong> زبان کی نوک سے تھرتھرا کر اور <strong>ڑ</strong> زبان کو پیچھے تالو پر مار کر بولا جاتا ہے۔ لیکن ڈینش کا ابتدائی <strong>R</strong> (<em>rød, ris</em>) گلے کی گہرائی سے نکلتا ہے — تقریباً اردو کے حرف <strong>غ</strong> (جیسے غبارہ) کے مخرج کے قریب، جس میں زبان کی نوک بالکل نہیں ہلتی! اور لفظ کے آخر میں آنے والا <strong>R</strong> (<em>mor, bror, spiser</em>) بالکل غائب ہو کر ایک کھلی نرم آواز بن جاتا ہے۔',
            optA: { label: '🦅 شروع والا R (گلے میں غ جیسا: rød, ris)', ex: 'rød, ris, ret', words: ['rød', 'ris', 'ret', 'rugbrød'] },
            optB: { label: '🌊 آخر والا R (گھل جانے والا: mor, spiser)', ex: 'mor, bror, spiser', words: ['mor', 'bror', 'spiser', 'lærer'] },
            trickUr: '<strong>آسان طریقہ:</strong> زبان کی نوک کو نیچے کے دانتوں کے پاس ساکن رکھیں تاکہ «ر» یا «ڑ» نہ بن سکے۔ آواز گلے کی جڑ سے نکالیں (<em>rød, ris</em>)۔ اور <em>mo<strong>r</strong>, spise<strong>r</strong></em> کے آخر میں صرف آرام سے منہ کھلا چھوڑ دیں۔',
            diagTitleA: 'ابتدائی R: گلے کے اندرونی حصے سے آواز (زبان کی نوک ساکن)',
            diagTitleB: 'اختتامی R: کوئی ر یا ڑ نہیں — صرف نرم کھلی آواز',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 162 125 Q 152 80 120 82 Q 85 95 72 110" fill="none" stroke="#f472b6" stroke-width="7" stroke-linecap="round"/>
                    <circle cx="152" cy="76" r="14" fill="rgba(239,68,68,0.28)" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,2"/>
                    <text x="105" y="48" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">آواز گلے کی گہرائی سے (غ کے قریب)!</text>
                    <text x="105" y="138" text-anchor="middle" fill="#94a3b8" font-size="10">زبان کی نوک نیچے بالکل ساکن</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 155 118 Q 115 112 75 112" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 85 Q 75 88 35 88" fill="none" stroke="#4ade80" stroke-width="3.5" stroke-linecap="round"/>
                    <text x="115" y="55" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">mor ← آخر میں کوئی ر نہیں، کھلی آواز!</text>
                </svg>`,
            minimalPairs: [
                { a: 'rød', b: 'ød', meanA: 'سرخ (گلے والے R کے ساتھ)', meanB: 'بغیر R کے', ctxA: 'Jeg køber en rød cykel.', ctxB: 'گلے میں ہلکی گونج محسوس کریں۔' },
                { a: 'ris', b: 'is', meanA: 'چاول (گلے والا R)', meanB: 'برف / آئس کریم', ctxA: 'Vi spiser ris til aftensmad.', ctxB: 'Der er glat is på vejen.' },
                { a: 'ret', b: 'et', meanA: 'ڈش / درست', meanB: 'ایک (et)', ctxA: 'Det er en lækker ret.', ctxB: 'Et køkken og et brød.' }
            ],
            speechExercises: [
                { text: 'Min mor spiser rød frugt og ris.', targetWords: ['mor', 'spiser', 'rød', 'frugt', 'ris'], hintDa: 'Svælg-r i rød/ris/frugt, og blød vokalafslutning i mor/spiser.', hintUr: 'rød/ris میں گلے والا R بولیں، اور mor/spiser کے آخر میں ر نہ بولیں۔' }
            ]
        },
        {
            id: 'y_og_oe',
            badge: 'توجہ 4',
            titleDa: '4. Kyssemund Y & Ø vs. flade I & E',
            titleUr: '4. گول ہونٹوں والے Y اور Ø بمقابلہ چپٹے I اور E',
            descDa: 'Urdu har hverken Y eller Ø med stramt spidsede forlæber. Undgå at flade dem ud til I/E (lys → Lis) eller gøre dem til U/O bagtil i munden.',
            descUr: 'اردو میں <strong>ای، اے، او، او</strong> کی آوازیں تو ہیں، لیکن سامنے زبان کے ساتھ گول ہونٹوں والے <strong>Y</strong> اور <strong>Ø</strong> موجود نہیں! عام غلطی یہ ہوتی ہے کہ یا تو ہونٹ سیدھے رکھ کر انہیں <em>i/e</em> بنا دیا جاتا ہے (جیسے <em>lys</em> «روشنی» کی جگہ نام <em>Lis</em>)، یا پیچھے والے <em>u/o</em> سے بدل دیا جاتا ہے۔ راز: منہ سے اردو کی «ای» بولیں اور زبان وہیں رکھتے ہوئے ہونٹوں کو آگے سے چھوٹے گول دائرے میں سکیڑ لیں!',
            optA: { label: '💋 آگے گول ہونٹ: Y, Ø', ex: 'lys, ny, brød, dør', words: ['lys', 'ny', 'brød', 'dør'] },
            optB: { label: '😊 چپٹی مسکراہٹ: I, E', ex: 'lis, ni, bred, der', words: ['lis', 'ni', 'bred', 'der'] },
            trickUr: '<strong>دو قدم کی مشق:</strong> لمبی «ای...» بولیں اور زبان کو ہلائے بغیر ہونٹوں کو گول سکیڑ لیں ➔ خالص ڈینش <strong>Y</strong>! بالکل اسی طرح لمبی «اے...» بولتے ہوئے ہونٹ گول کریں ➔ خالص ڈینش <strong>Ø</strong>!',
            diagTitleA: 'Y & Ø: زبان آگے اور دونوں ہونٹ گول آگے نکلے ہوئے',
            diagTitleB: 'I & E: ہونٹ مسکراہٹ کی طرح اطراف میں کھلے ہوئے',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="120" cy="78" r="34" fill="none" stroke="#f59e0b" stroke-width="4"/>
                    <circle cx="120" cy="78" r="14" fill="#ef4444" opacity="0.85"/>
                    <text x="120" y="30" text-anchor="middle" fill="#fde047" font-size="11" font-weight="bold">Y & Ø: ہونٹوں کو چھوٹا گول سکیڑیں!</text>
                    <text x="120" y="138" text-anchor="middle" fill="#cbd5e1" font-size="11">lys • ny • brød • møde</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <ellipse cx="120" cy="78" rx="52" ry="18" fill="none" stroke="#38bdf8" stroke-width="4"/>
                    <line x1="80" y1="78" x2="160" y2="78" stroke="#7dd3fc" stroke-width="3"/>
                    <text x="120" y="30" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">I & E: مسکراہٹ کی طرح کھلے ہونٹ</text>
                    <text x="120" y="138" text-anchor="middle" fill="#cbd5e1" font-size="11">Lis • ni • bred • der</text>
                </svg>`,
            minimalPairs: [
                { a: 'lys', b: 'lis', meanA: 'روشنی / موم بتی (گول Y)', meanB: 'نام Lis (چپٹا I)', ctxA: 'Vi tænder stearinlys i stuen.', ctxB: 'Min veninde hedder Lis.' },
                { a: 'ny', b: 'ni', meanA: 'نیا (گول Y)', meanB: 'نمبر 9 (چپٹا I)', ctxA: 'Hun har en ny cykel.', ctxB: 'Klokken er ni nu.' },
                { a: 'brød', b: 'bred', meanA: 'روٹی (گول Ø)', meanB: 'چوڑا (چپٹا E)', ctxA: 'Jeg køber frisk brød.', ctxB: 'Vejen er meget bred.' },
                { a: 'dør', b: 'der', meanA: 'دروازہ (گول Ø)', meanB: 'وہاں (چپٹا E)', ctxA: 'Luk venligst den hvide dør.', ctxB: 'Der sidder en ven.' }
            ],
            speechExercises: [
                { text: 'Vi har et nyt lyst køkken med ny dør.', targetWords: ['nyt', 'lyst', 'køkken', 'ny', 'dør'], hintDa: 'Spids læberne fast ved nyt, lyst, køkken, ny og dør!', hintUr: 'nyt, lyst, køkken, ny اور dør میں ہونٹوں کو آگے گول رکھیں۔' }
            ]
        },
        {
            id: 'v_og_klynger',
            badge: 'توجہ 5',
            titleDa: '5. V (tænder mod læbe, ikke و) & klynger uden "i-"',
            titleUr: '5. ڈینش V (دانت نچلے ہونٹ پر، اردو «و» نہیں) اور شروع کے مجموعے (sk-, sp-)',
            descDa: 'Urdu و [ʋ/w] laves mellem begge læber uden tænder; dansk V (vand, vi, vinter) SKAL røre underlæben let med overtænderne! Og ved forlydsklynger som sk-, sp-, st- (skole, spiser) må man IKKE sætte en ekstra hjælpevokal ("i-skole / i-spiser") foran.',
            descUr: 'ڈینش سیکھتے وقت اردو بولنے والوں کی دو خاص عادتیں فوراً پکڑی جاتی ہیں:<br>1) <strong>ڈینش V (<em>vand, vi, vinter</em>):</strong> اردو کا <strong>و</strong> دونوں ہونٹوں سے بولا جاتا ہے، لیکن ڈینش کے <strong>V</strong> کے لیے اوپر کے دانتوں کو نچلے ہونٹ سے ہلکا سا چھونا ضروری ہے (ور نہ ڈینش سننے میں ف/و کا فرق گڈمڈ لگتا ہے)!<br>2) <strong>شروع کے دو حرفی مجموعے (<em>skole, spiser, stor</em>):</strong> ان کے شروع میں کبھی «اِ» یا «اے» نہ لگائیں (<em>iskole</em> یا <em>ispiser</em> غلط ہے — سیدھا <strong>sss-kole</strong> سے شروع کریں)!',
            optA: { label: '🦷 V (اوپر کے دانت نچلے ہونٹ پر) & سیدھا sk-/sp-', ex: 'vand, vinter, skole, spiser', words: ['vand', 'vinter', 'skole', 'spiser'] },
            optB: { label: '👄 پھندا: دونوں ہونٹ (و) یا شروع میں "i-" لگانا', ex: 'hvad, hvor (خاموش h + دانت ہونٹ پر)', words: ['hvad', 'hvor', 'stor', 'station'] },
            trickUr: '<strong>آئینے والی مشق:</strong> آئینے میں دیکھ کر <em><strong>v</strong>and</em> اور <em><strong>v</strong>inter</em> بولیں — آپ کے اوپر کے دانت نچلے ہونٹ پر نظر آنے چاہئیں! اور <em><strong>s</strong>kole</em> بولنے سے پہلے صرف لمبی «سسس» کی آواز نکالیں پھر «کولے» جوڑ دیں (<em>sss-kole</em>)، بیچ میں کوئی «اِ» نہیں!',
            diagTitleA: 'ڈینش V: اوپر کے سامنے والے دانت نچلے ہونٹ پر ہلکا سا لگتے ہیں',
            diagTitleB: 'پھندا (اردو و): صرف دونوں ہونٹ گول ملتے ہیں اور دانت ہونٹ کو نہیں چھوتے',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <rect x="108" y="48" width="22" height="22" rx="3" fill="#f8fafc" stroke="#38bdf8" stroke-width="2"/>
                    <path d="M 70 86 Q 120 70 170 86" fill="none" stroke="#4ade80" stroke-width="8" stroke-linecap="round"/>
                    <text x="120" y="32" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">اوپر کے دانت ← نچلا ہونٹ (V)</text>
                    <text x="120" y="132" text-anchor="middle" fill="#cbd5e1" font-size="11">vand • vinter • hvad (خاموش h)</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="120" cy="76" r="24" fill="none" stroke="#ef4444" stroke-width="5"/>
                    <text x="120" y="30" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">دونوں ہونٹ گول (اردو و) — دانت نہیں لگے!</text>
                    <text x="120" y="134" text-anchor="middle" fill="#94a3b8" font-size="11">اور sk-/sp- کے شروع میں "i-" مت لگائیں</text>
                </svg>`,
            minimalPairs: [
                { a: 'vand', b: 'fand', meanA: 'پانی (دانت + ہونٹ + آواز V)', meanB: 'ف/پانی نہیں (بغیر آواز F)', ctxA: 'Jeg drikker koldt vand.', ctxB: 'V har vibration i halsen.' },
                { a: 'skole', b: 'kole', meanA: 'اسکول (سیدھا sss-kole، کوئی i- نہیں)', meanB: 'بغیر s کے', ctxA: 'Børnene går i skole.', ctxB: 'شروع میں "اِسکول" نہ کہیں!' },
                { a: 'spis', b: 'is', meanA: 'کھاؤ (براہ راست sp-)', meanB: 'برف / آئس کریم', ctxA: 'Spis nu din mad!', ctxB: 'Spis کی آواز sss-pis سے شروع ہوتی ہے۔' }
            ],
            speechExercises: [
                { text: 'Vi spiser varm suppe i skolen om vinteren.', targetWords: ['vi', 'spiser', 'varm', 'skolen', 'vinteren'], hintDa: 'Tænder på underlæbe ved vi/varm/vinteren, og sss- direkte ind i spiser/skolen!', hintUr: 'vi/varm/vinteren پر دانت نچلے ہونٹ پر رکھیں، اور spiser/skolen بغیر "اِ" لگائے بولیں!' }
            ]
        }
    ];

    function openHomeworkModal() {
        const existing = document.querySelector('#vlur-hw-modal');
        if (existing) existing.remove();
        const overlay = document.createElement('div');
        overlay.id = 'vlur-hw-modal';
        overlay.className = 'vlur-modal-overlay';
        const isDa = getLang() === 'da';
        const tabLabels = {
            principles: isDa ? '1. منہ کی حالت اور قواعد (Teori)' : '1. منہ کی حالت اور قواعد',
            pairs: isDa ? '2. سننے کی مشق (Lyttequiz)' : '2. سننے کی مشق',
            speech: isDa ? '3. مائیکروفون مشق (Udtale)' : '3. مائیکروفون مشق'
        };
        overlay.innerHTML = `
            <div class="vlur-modal-card">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:1px solid rgba(255,255,255,0.12);">
                    <div dir="rtl">
                        <div style="font-size:0.74rem; font-weight:900; color:#38bdf8; text-transform:uppercase;">📚 ہوم ورک لنکس • اردو</div>
                        <h2 style="margin:0.15rem 0 0; font-size:1.2rem; color:#fff;">${isDa ? 'Direkte links til alle 5 fokuslyde' : 'تمام ۵ اہم آوازوں کے براہِ راست لنکس'}</h2>
                    </div>
                    <button type="button" class="vlur-btn" id="vlur-hw-close">✕ بند کریں</button>
                </div>
                <div style="display:flex; flex-direction:column; gap:0.9rem;">
                    ${SOUND_MODULES.map(m => `
                        <div style="background:rgba(30,41,59,0.75); border:1px solid rgba(148,163,184,0.25); border-radius:12px; padding:0.85rem;">
                            <div style="font-weight:800; color:#fde047; margin-bottom:0.5rem;" dir="rtl">${m.titleUr}${isDa ? ` <span style="color:#94a3b8; font-size:0.82rem;" dir="ltr">(${m.titleDa})</span>` : ''}</div>
                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                ${VALID_TABS.map(tid => {
                                    const url = `${window.location.origin}${window.location.pathname}#/${getLang() || 'ur'}/vanskelige_lyde_urdu/${m.id}/${tid}`;
                                    return `
                                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap; background:rgba(15,23,42,0.7); padding:0.45rem 0.7rem; border-radius:8px;">
                                            <span style="font-size:0.82rem; color:#e2e8f0;" dir="rtl">${tabLabels[tid]}</span>
                                            <button type="button" class="vlur-btn" data-copy-url="${url}" style="padding:0.3rem 0.7rem; font-size:0.78rem; border-color:#38bdf8;">📋 کاپی کریں</button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        overlay.querySelector('#vlur-hw-close').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        overlay.querySelectorAll('[data-copy-url]').forEach(b => {
            b.onclick = () => copyToClipboard(b.dataset.copyUrl, isDa ? 'Lektie-link' : 'مشق کا لنک');
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
        topBar.className = 'vlur-top-bar';
        topBar.innerHTML = `
            <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                <button type="button" class="vlur-btn" id="vlur-back-main">${isDa ? '← ہوم صفحہ (Forside)' : '← ہوم صفحہ'}</button>
                <button type="button" class="vlur-btn" id="vlur-back-mss" style="border-color:#38bdf8; color:#7dd3fc;">🇵🇰 «میری زبان اور ڈینش کا موازنہ» پر واپس</button>
            </div>
            <button type="button" class="vlur-btn" id="vlur-hw-btn" style="border-color:#fde047; color:#fde047;">${isDa ? '📋 مشقوں کے لنکس (Lektier)' : '📋 مشقوں کے لنکس'}</button>
        `;
        topBar.querySelector('#vlur-back-main').onclick = handleBackToMain;
        topBar.querySelector('#vlur-back-mss').onclick = handleBackToMSS;
        topBar.querySelector('#vlur-hw-btn').onclick = openHomeworkModal;
        viewContainer.appendChild(topBar);

        const hero = document.createElement('div');
        hero.className = 'vlur-hero';
        hero.innerHTML = `
            <div class="vlur-hero-kicker">${isDa ? '🇵🇰 اردو بولنے والوں کے لیے ڈینش تلفظ کی خصوصی مشق • مرحلہ 2 (Trin 2)' : '🇵🇰 اردو بولنے والوں کے لیے ڈینش تلفظ کی خصوصی مشق • مرحلہ 2'}</div>
            <h1 dir="rtl">${modData.titleUr}</h1>
            <p dir="rtl">${isDa ? `<span dir="ltr">${modData.titleDa}</span> — ` : ''}منہ اور زبان کی پوزیشن، سننے کا فرق اور مائیکروفون کے ساتھ بولنے کی مشق</p>
        `;
        viewContainer.appendChild(hero);

        const modNav = document.createElement('div');
        modNav.className = 'vlur-mod-nav';
        SOUND_MODULES.forEach(m => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `vlur-mod-pill ${m.id === activeModuleId ? 'active' : ''}`;
            btn.dir = isDa ? 'ltr' : 'rtl';
            btn.textContent = isDa
                ? `${m.badge}: ${m.titleDa.replace(/^\d+\.\s*/, '')}`
                : m.titleUr;
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
        subTabs.className = 'vlur-subtabs';
        [
            { id: 'principles', label: isDa ? '1. منہ کی حالت اور قواعد (Teori)' : '1. منہ کی حالت اور قواعد' },
            { id: 'pairs', label: isDa ? '2. ملتے جلتے الفاظ (Lyttequiz)' : '2. ملتے جلتے الفاظ' },
            { id: 'speech', label: isDa ? '3. مائیکروفون مشق (Udtale)' : '3. مائیکروفون مشق' }
        ].forEach(st => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = `vlur-subtab ${st.id === activeTab ? 'active' : ''}`;
            b.textContent = st.label;
            b.onclick = () => { activeTab = st.id; renderView(); };
            subTabs.appendChild(b);
        });
        viewContainer.appendChild(subTabs);

        const content = document.createElement('div');
        viewContainer.appendChild(content);

        if (activeTab === 'principles') {
            const card = document.createElement('div');
            card.className = 'vlur-card';
            const opt = activeTarget === 'a' ? modData.optA : modData.optB;
            card.innerHTML = `
                <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:1rem;">
                    <button type="button" class="vlur-btn" id="vlur-tog-a" style="${activeTarget === 'a' ? 'background:#0284c7; border-color:#7dd3fc;' : ''}">${modData.optA.label}</button>
                    <button type="button" class="vlur-btn" id="vlur-tog-b" style="${activeTarget === 'b' ? 'background:#be123c; border-color:#fda4af;' : ''}">${modData.optB.label}</button>
                </div>
                <div class="vlur-diag-grid">
                    <div>
                        <div style="font-weight:800; color:#7dd3fc; margin-bottom:0.45rem;" dir="rtl">${activeTarget === 'a' ? modData.diagTitleA : modData.diagTitleB}</div>
                        <div class="vlur-svg-box">${modData.diagSvg(activeTarget === 'a')}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; justify-content:space-between; gap:0.75rem;">
                        <div style="font-size:0.93rem; color:#e2e8f0; line-height:1.62;" dir="rtl">${modData.descUr}</div>
                        ${isDa ? `<div style="font-size:0.86rem; color:#94a3b8; line-height:1.5; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.08);"><strong style="color:#cbd5e1;">Dansk lærer-note:</strong> ${modData.descDa}</div>` : ''}
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                            ${opt.words.map(w => `<button type="button" class="vlur-btn" data-say="${w}" style="border-color:#38bdf8;">🔊 ${w}</button>`).join('')}
                        </div>
                    </div>
                </div>
                <div style="background:rgba(234,179,8,0.14); border:1px solid rgba(250,204,21,0.45); border-radius:12px; padding:0.85rem 1rem; color:#fef08a; font-size:0.9rem; line-height:1.6;" dir="rtl">
                    ${modData.trickUr}
                </div>
            `;
            card.querySelector('#vlur-tog-a').onclick = () => { activeTarget = 'a'; renderView(); };
            card.querySelector('#vlur-tog-b').onclick = () => { activeTarget = 'b'; renderView(); };
            card.querySelectorAll('[data-say]').forEach(b => {
                b.onclick = () => playAudio(b.dataset.say, 0.8);
            });
            content.appendChild(card);
        } else if (activeTab === 'pairs') {
            const pair = modData.minimalPairs[pairQuizIdx];
            if (!pair._target) pair._target = Math.random() < 0.5 ? 'a' : 'b';
            const targetWord = pair._target === 'a' ? pair.a : pair.b;
            const qCard = document.createElement('div');
            qCard.className = 'vlur-card';
            qCard.style.textAlign = 'center';
            qCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; color:#94a3b8; font-weight:800; font-size:0.86rem; margin-bottom:0.8rem;">
                    <span>جوڑا ${pairQuizIdx + 1} از ${modData.minimalPairs.length}</span>
                    <span style="color:#4ade80;">اسکور: ${pairScore} / ${modData.minimalPairs.length}</span>
                </div>
                <p style="color:#cbd5e1; margin:0 0 0.5rem;" dir="rtl">ڈینش لفظ سننے کے لیے دبائیں اور درست لفظ منتخب کریں:</p>
                <button type="button" class="vlur-listen-big" id="vlur-play-pair">${isDa ? '🔊 ڈینش تلفظ سنیں (Lyt)' : '🔊 ڈینش تلفظ سنیں'}</button>
                <div class="vlur-pair-grid">
                    <button type="button" class="vlur-pair-btn" id="vlur-choice-a">
                        <div style="font-size:1.5rem; font-weight:900; color:#38bdf8;">${pair.a}</div>
                        <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.25rem;" dir="rtl">${pair.meanA}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxA}"</div>
                    </button>
                    <button type="button" class="vlur-pair-btn" id="vlur-choice-b">
                        <div style="font-size:1.5rem; font-weight:900; color:#f472b6;">${pair.b}</div>
                        <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.25rem;" dir="rtl">${pair.meanB}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxB}"</div>
                    </button>
                </div>
                <div id="vlur-pair-fb" style="margin-top:0.75rem;"></div>
                <div style="display:flex; justify-content:space-between; margin-top:1.1rem; gap:0.5rem; flex-wrap:wrap;">
                    <button type="button" class="vlur-btn" id="vlur-prev-p" ${pairQuizIdx === 0 ? 'disabled' : ''}>← پچھلا</button>
                    <button type="button" class="vlur-btn" id="vlur-next-p">${pairQuizIdx === modData.minimalPairs.length - 1 ? 'دوبارہ شروع ↺' : 'اگلا جوڑا →'}</button>
                </div>
            `;
            qCard.querySelector('#vlur-play-pair').onclick = () => playAudio(targetWord, 0.78);
            const fbEl = qCard.querySelector('#vlur-pair-fb');
            const btnA = qCard.querySelector('#vlur-choice-a');
            const btnB = qCard.querySelector('#vlur-choice-b');
            function handlePick(pick) {
                btnA.disabled = true;
                btnB.disabled = true;
                const ok = pick === pair._target;
                if (ok) pairScore++;
                fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};" dir="rtl">
                    ${ok ? `🎉 شاباش! درست لفظ "${targetWord}" ہے۔` : `❌ بالکل درست نہیں — صحیح لفظ "${targetWord}" ہے۔`}
                </div>`;
                playAudio(targetWord, 0.75);
            }
            btnA.onclick = () => handlePick('a');
            btnB.onclick = () => handlePick('b');
            qCard.querySelector('#vlur-prev-p').onclick = () => { if (pairQuizIdx > 0) { pairQuizIdx--; renderView(); } };
            qCard.querySelector('#vlur-next-p').onclick = () => {
                pair._target = undefined;
                if (pairQuizIdx < modData.minimalPairs.length - 1) pairQuizIdx++;
                else { pairQuizIdx = 0; pairScore = 0; }
                renderView();
            };
            content.appendChild(qCard);
        } else {
            const ex = modData.speechExercises[speechExerciseIdx] || modData.speechExercises[0];
            const sCard = document.createElement('div');
            sCard.className = 'vlur-card';
            sCard.style.textAlign = 'center';
            const promptHtml = ex.text.split(' ').map(w => {
                const clean = w.toLowerCase().replace(/[.,!?]/g, '');
                return ex.targetWords.includes(clean)
                    ? `<span style="color:#38bdf8; text-decoration:underline;">${w}</span>`
                    : `<span>${w}</span>`;
            }).join(' ');
            sCard.innerHTML = `
                <div style="font-size:1.45rem; font-weight:900; margin:0.4rem 0 0.65rem;">${promptHtml}</div>
                <p style="color:#cbd5e1; margin:0 0 0.85rem;" dir="rtl">اس جملے کو بلند آواز میں پڑھیں اور نیلے رنگ کے خط کشیدہ الفاظ پر خاص توجہ دیں!</p>
                ${consecutiveSpeechStreak > 0 ? `<div style="color:#fde047; font-weight:800; margin-bottom:0.7rem;" dir="rtl">🔥 مسلسل درست تلفظ: ${consecutiveSpeechStreak}</div>` : ''}
                <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap; margin:0.65rem 0;">
                    <button type="button" class="vlur-listen-big" id="vlur-say-ex" style="margin:0;">🔊 نمونہ سنیں</button>
                    <button type="button" class="vlur-btn" id="vlur-mic-btn" style="background:#dc2626; border-color:#f87171; padding:0.8rem 1.4rem; font-size:1rem;">🎙️ اب بولیں</button>
                </div>
                <div id="vlur-speech-status" style="color:#94a3b8; font-size:0.9rem; margin-top:0.7rem;" dir="rtl">«اب بولیں» دبائیں اور واضح ڈینش میں پڑھیں۔</div>
                <div id="vlur-speech-fb" style="margin-top:0.7rem;"></div>
                <div style="text-align:right; background:rgba(30,41,59,0.7); border-radius:10px; padding:0.8rem; margin-top:1rem; font-size:0.86rem; color:#cbd5e1;" dir="rtl">
                    <strong>مدد:</strong> ${ex.hintUr}${isDa ? `<br><span style="color:#94a3b8;" dir="ltr"><strong>Dansk:</strong> ${ex.hintDa}</span>` : ''}
                </div>
            `;
            sCard.querySelector('#vlur-say-ex').onclick = () => playAudio(ex.text, 0.84);
            const micBtn = sCard.querySelector('#vlur-mic-btn');
            const statusEl = sCard.querySelector('#vlur-speech-status');
            const fbEl = sCard.querySelector('#vlur-speech-fb');
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRec) {
                statusEl.textContent = 'آپ کا براؤزر آواز کی شناخت کو سپورٹ نہیں کرتا (Chrome یا Safari آزمائیں)۔';
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
                        statusEl.textContent = '🎙️ سن رہا ہے... اب ڈینش میں بولیں!';
                        statusEl.style.color = '#4ade80';
                    } catch (_) {}
                };
                rec.onresult = (ev) => {
                    isSpeechRecording = false;
                    const said = ev.results[0][0].transcript.trim();
                    statusEl.textContent = `شناخت شدہ الفاظ: "${said}"`;
                    const words = said.toLowerCase().split(/\s+/).map(w => w.replace(/[.,!?]/g, ''));
                    const hits = ex.targetWords.filter(tw => words.includes(tw));
                    const ok = hits.length === ex.targetWords.length;
                    if (ok) consecutiveSpeechStreak++; else consecutiveSpeechStreak = 0;
                    fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};" dir="rtl">
                        ${ok ? `🌟 بہترین تلفظ! تمام ہدف الفاظ (${hits.join(', ')}) بالکل ٹھیک سنائی دیے۔` : `💡 اچھی کوشش! دوبارہ کوشش کریں اور ان الفاظ پر توجہ دیں: ${ex.targetWords.join(', ')}`}
                    </div>`;
                };
                rec.onerror = () => { isSpeechRecording = false; statusEl.textContent = 'آواز واضح سنائی نہیں دی۔ براہ کرم دوبارہ کوشش کریں۔'; };
                rec.onend = () => { isSpeechRecording = false; };
            }
            content.appendChild(sCard);
        }
    }

    renderView();
    container.appendChild(viewContainer);
}
