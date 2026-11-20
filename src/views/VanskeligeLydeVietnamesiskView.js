import { getLang } from '../utils/i18n.js';

/**
 * VanskeligeLydeVietnamesiskView
 * Komplet pædagogisk udtale-træningsflade til vietnamesisktalende danskkursister.
 *
 * Fokus på de 5 lyde og lydmønstre, der især giver vietnamesere vanskeligheder på dansk:
 *   1. Slutkonsonanter & konsonantklynger (-s, -t, -st, -ld, sk-, sp-) – må ikke falde væk!
 *   2. Blødt d – "Ånde på brillerne" (aldrig stumt eller hårdt vietnamesisk đ/t)
 *   3. P / T / K med kraftigt pust vs. B / D / G (Papir-testen – vietnamesisk t/k er uaspireret)
 *   4. Dansk svælg-R & smeltet slut-r (ikke nordvietnamesisk [z] eller sydvietnamesisk tungespids-r)
 *   5. Kyssemund Y & Ø vs. ư/ơ og flade I/E + stød (som thanh ngã/nặng i struben)
 */
export function renderVanskeligeLydeVietnamesiskView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    function handleBackToMain() {
        if (typeof navigateFn === 'function') {
            navigateFn('main');
        } else {
            const lang = getLang() || 'vi';
            window.location.hash = `#/${lang}/main`;
        }
    }

    function handleBackToMSS() {
        if (typeof navigateFn === 'function') {
            navigateFn('mit_sprog_sammenlignet');
        } else {
            const lang = getLang() || 'vi';
            window.location.hash = `#/${lang}/mit_sprog_sammenlignet`;
        }
    }

    function showCopyToast(msg) {
        let toast = document.querySelector('#vlv-copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'vlv-copy-toast';
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
                showCopyToast(`📋 ${label} kopieret (Đã sao chép)!`);
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
        showCopyToast(`📋 ${label} kopieret (Đã sao chép)!`);
    }

    const VALID_MODULES = ['slutkonsonanter_klynger', 'bloedt_d', 'p_t_k_pust', 'dansk_r', 'y_og_oe'];
    const VALID_TABS = ['principles', 'pairs', 'speech'];

    let initialModuleId = 'slutkonsonanter_klynger';
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
            const idx = segs.findIndex(s => s === 'vanskelige_lyde_vietnamesisk' || s === 'vietnamesiske_lyde');
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
        const lang = getLang() || 'vi';
        const newHash = `#/${lang}/vanskelige_lyde_vietnamesisk/${activeModuleId}/${activeTab}`;
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
    viewContainer.className = 'vlv-wrapper';

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .vlv-wrapper {
            max-width: 1040px;
            margin: 0 auto;
            padding: 1.25rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
        }
        .vlv-top-bar {
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.35rem;
            padding-bottom: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .vlv-btn {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(30,41,59,0.86); border: 1px solid rgba(148,163,184,0.35);
            color: #f8fafc; padding: 0.52rem 1rem; border-radius: 11px;
            font-weight: 800; font-size: 0.86rem; cursor: pointer; transition: all 0.16s ease;
        }
        .vlv-btn:hover { border-color: #38bdf8; transform: translateY(-1px); }
        .vlv-hero { text-align: center; margin-bottom: 1.5rem; }
        .vlv-hero-kicker {
            display: inline-flex; align-items: center; gap: 0.4rem;
            background: rgba(250,204,21,0.14); border: 1px solid rgba(250,204,21,0.45);
            color: #fde047; padding: 0.35rem 0.95rem; border-radius: 999px;
            font-size: 0.8rem; font-weight: 800; margin-bottom: 0.6rem;
        }
        .vlv-hero h1 { margin: 0 0 0.45rem; font-size: 1.85rem; font-weight: 900; color: #fff; }
        .vlv-hero p { margin: 0 auto; max-width: 720px; color: #cbd5e1; font-size: 0.94rem; line-height: 1.5; }
        .vlv-mod-nav {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.1rem;
        }
        .vlv-mod-pill {
            padding: 0.58rem 0.95rem; border-radius: 12px;
            border: 1.5px solid rgba(255,255,255,0.16); background: rgba(15,23,42,0.78);
            color: #e2e8f0; font-weight: 800; font-size: 0.84rem; cursor: pointer;
            transition: all 0.16s ease; text-align: left;
        }
        .vlv-mod-pill.active {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border-color: #7dd3fc; color: #ffffff; box-shadow: 0 6px 18px rgba(56,189,248,0.28);
        }
        .vlv-subtabs {
            display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.35rem;
        }
        .vlv-subtab {
            padding: 0.55rem 1.05rem; border-radius: 10px;
            border: 1.5px solid rgba(148,163,184,0.28); background: rgba(30,41,59,0.72);
            color: #cbd5e1; font-weight: 800; font-size: 0.85rem; cursor: pointer;
        }
        .vlv-subtab.active {
            border-color: #fde047; background: rgba(250,204,21,0.18); color: #fef08a;
        }
        .vlv-card {
            background: rgba(15,23,42,0.9); border: 1.5px solid rgba(148,163,184,0.26);
            border-radius: 18px; padding: 1.25rem 1.35rem; margin-bottom: 1.15rem;
            box-shadow: 0 10px 26px rgba(0,0,0,0.32);
        }
        .vlv-diag-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem; margin: 1rem 0;
        }
        .vlv-svg-box {
            background: #070d19; border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px; padding: 0.75rem; min-height: 165px;
            display: flex; align-items: center; justify-content: center;
        }
        .vlv-pair-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.85rem; margin: 1.1rem 0;
        }
        .vlv-pair-btn {
            background: rgba(30,41,59,0.88); border: 2px solid rgba(148,163,184,0.32);
            border-radius: 14px; padding: 1.05rem; cursor: pointer; text-align: center;
            color: #f8fafc; transition: all 0.16s ease;
        }
        .vlv-pair-btn:hover:not(:disabled) { border-color: #38bdf8; transform: translateY(-2px); }
        .vlv-listen-big {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: 1.5px solid #38bdf8; color: #fff; font-size: 1.05rem; font-weight: 900;
            padding: 0.8rem 1.6rem; border-radius: 14px; cursor: pointer;
            display: inline-flex; align-items: center; gap: 0.5rem; margin: 0.75rem 0;
        }
        .vlv-modal-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
            z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;
        }
        .vlv-modal-card {
            background: #0f172a; border: 2px solid #38bdf8; border-radius: 18px;
            max-width: 680px; width: 100%; max-height: 86vh; overflow-y: auto; padding: 1.25rem;
        }
        @media (max-width: 600px) {
            .vlv-hero h1 { font-size: 1.45rem; }
            .vlv-card { padding: 1rem; }
        }
    `;
    viewContainer.appendChild(styleEl);

    const SOUND_MODULES = [
        {
            id: 'slutkonsonanter_klynger',
            badge: 'Trọng tâm 1',
            titleDa: '1. Slutkonsonanter & konsonantklynger (-s, -st, sk-)',
            titleVi: '1. Âm cuối & cụm phụ âm — Đừng «nuốt mất» đuôi từ!',
            descDa: 'Vietnamesisk tillader kun få lukkede slutkonsonanter (-p, -t, -c, -m, -n, -ng) og ALDRIG konsonantklynger i udlyd eller forlyd. Derfor tabes danske -s, -t, -ld, -st ofte (hus → hu, fest → fe, kold → ko), og i forlyd (sp-, sk-) må man IKKE indsætte ekstra vokaler.',
            descVi: 'Đây là bẫy lớn nhất đối với người Việt! Tiếng Việt chỉ có vài phụ âm cuối khép (-p, -t, -c, -m, -n, -ng) và <strong>không bao giờ có phụ âm -s/-r/-l ở cuối hay cụm 2–3 phụ âm liền nhau</strong>. Vì vậy, người Việt hay làm rơi đuôi từ tiếng Đan Mạch (<em>lys</em> thành <em>ly</em>, <em>fest</em> thành <em>fe</em>, <em>kold</em> thành <em>ko</em>), hoặc chèn thêm âm «ơ» vào đầu từ (<em>spise</em> thành <em>sơ-pi-sơ</em>).',
            optA: { label: '🇩🇰 Phát âm đầy đủ âm cuối & cụm phụ âm', ex: 'fest, lys, kold, skat', words: ['fest', 'lys', 'kold', 'skat'] },
            optB: { label: '🇻🇳 Bẫy rơi âm cuối (mất nghĩa!)', ex: 'fe, ly, ko, kat', words: ['fe', 'ly', 'ko', 'kat'] },
            trickVi: '<strong>Mẹo vàng:</strong> Hãy coi âm cuối như <em>khóa cửa thật chặt</em>! Với chữ <strong>-s</strong> ở cuối (<em>ly<strong>s</strong>, hu<strong>s</strong>, spi<strong>s</strong></em>), hãy giữ luồng gió xì nhẹ 1 giây trước khi dừng. Với cụm đầu <strong>sk-, sp-, st-</strong> (<em>skole, spiser</em>), lướt thẳng từ s sang phụ âm tiếp theo mà <strong>không</strong> đọc «sơ»!',
            diagTitleA: 'Đủ âm cuối & cụm phụ âm (luồng hơi giữ đến hết từ: fe-s-t)',
            diagTitleB: 'Bẫy tiếng Việt: ngắt hơi quá sớm làm rơi mất -s/-st/-ld!',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <rect x="20" y="55" width="52" height="36" rx="8" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" stroke-width="2.5"/>
                    <text x="46" y="78" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">fe</text>
                    <rect x="82" y="55" width="48" height="36" rx="8" fill="rgba(74,222,128,0.28)" stroke="#4ade80" stroke-width="2.5"/>
                    <text x="106" y="78" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="bold">+ s</text>
                    <rect x="140" y="55" width="48" height="36" rx="8" fill="rgba(250,204,21,0.25)" stroke="#fde047" stroke-width="2.5"/>
                    <text x="164" y="78" text-anchor="middle" fill="#fde047" font-size="14" font-weight="bold">+ t</text>
                    <path d="M 32 108 L 185 108" stroke="#4ade80" stroke-width="3" stroke-dasharray="4,3"/>
                    <text x="120" y="34" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">Giữ đầy đủ: fest • lys • kold</text>
                    <text x="120" y="132" text-anchor="middle" fill="#4ade80" font-size="10.5" font-weight="bold">Không rơi đuôi và không chèn âm «ơ»!</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <rect x="28" y="55" width="60" height="36" rx="8" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" stroke-width="2"/>
                    <text x="58" y="78" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">fe</text>
                    <line x1="102" y1="45" x2="102" y2="105" stroke="#ef4444" stroke-width="3.5"/>
                    <rect x="118" y="55" width="84" height="36" rx="8" fill="rgba(239,68,68,0.12)" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,3"/>
                    <text x="160" y="78" text-anchor="middle" fill="#fca5a5" font-size="12" font-weight="bold">(rơi mất -st!)</text>
                    <text x="120" y="130" text-anchor="middle" fill="#fca5a5" font-size="10.5" font-weight="bold">Nghe thành từ khác: fe / ly / ko!</text>
                </svg>`,
            minimalPairs: [
                { a: 'fest', b: 'fe', meanA: 'bữa tiệc (có cụm cuối -st)', meanB: 'nàng tiên (mất đuôi -st)', ctxA: 'Vi holder en stor fest i aften.', ctxB: 'En lille fe i eventyret.' },
                { a: 'lys', b: 'ly', meanA: 'ánh sáng / cây nến (có -s)', meanB: 'chỗ trú mưa (không có -s)', ctxA: 'Tænd et lys i køkkenet.', ctxB: 'Vi søger ly for regnen.' },
                { a: 'kold', b: 'ko', meanA: 'lạnh (có cụm -ld)', meanB: 'con bò cái (mất đuôi)', ctxA: 'Vinteren i Danmark er kold.', ctxB: 'En sort og hvid ko.' },
                { a: 'skat', b: 'kat', meanA: 'thuế / người yêu (cụm đầu sk-)', meanB: 'con mèo (chỉ có k-)', ctxA: 'Hej skat, hvad spiser vi?', ctxB: 'Vi har en lille kat.' }
            ],
            speechExercises: [
                { text: 'Festen har lys og kold ost.', targetWords: ['festen', 'lys', 'kold', 'ost'], hintDa: 'Hold tydelige slutkonsonanter på lys (-s), kold (-ld) og ost (-st)!', hintVi: 'Phát âm rõ âm gió -s và cụm -st/-ld ở cuối các từ lys, kold, ost!' },
                { text: 'Jeg spiser frisk fisk i skolen.', targetWords: ['spiser', 'frisk', 'fisk', 'skolen'], hintDa: 'Glid direkte ind i sp-, fr-, sk- uden ekstra vokal mellem bogstaverne!', hintVi: 'Lướt thẳng cụm sp-, fr-, sk- và bật rõ đuôi -sk ở frisk, fisk!' }
            ]
        },
        {
            id: 'bloedt_d',
            badge: 'Trọng tâm 2',
            titleDa: '2. Blødt d – "Ånde på brillerne"',
            titleVi: '2. Âm «d mềm» Đan Mạch — Như hà hơi lau kính',
            descDa: 'Vietnamesisk har hårdt implosivt [đ] forrest (og i sydvietnamesisk lyder "d" som [j]), men mangler helt dansk blødt d (brød, mad, gade). Undgå at sige hårdt [t/đ] eller helt droppe d-lyden!',
            descVi: 'Trong tiếng Việt có âm <em>đ</em> cứng ở đầu từ (hoặc âm <em>d</em> miền Nam như chữ y), nhưng <strong>hoàn toàn không có «d mềm» (blødt d)</strong> ở giữa và cuối từ (<em>mad, brød, gade</em>). Người Việt thường bỏ quên hẳn (<em>mad</em> thành <em>ma</em>) hoặc đọc thành <em>t/đ</em> cứng. Bí quyết: Đặt đầu lưỡi nằm phẳng sau hàm răng dưới và thổi nhẹ hơi ấm ra ngoài!',
            optA: { label: '🇩🇰 Âm d mềm (brød, mad)', ex: 'brød, mad, gade', words: ['brød', 'mad', 'sød', 'gade'] },
            optB: { label: '🇻🇳 Bẫy: đ/t cứng hoặc bỏ mất d', ex: 'dag (đầu từ là d cứng!)', words: ['dag', 'dør', 'dansk'] },
            trickVi: '<strong>Mẹo vàng:</strong> Ở ĐẦU từ (<em><strong>d</strong>ag</em>), chữ d đọc cứng giống chữ «đ» nhẹ. Còn ở GIỮA và CUỐI từ (<em>ma<strong>d</strong>, brø<strong>d</strong>, sø<strong>d</strong></em>), đừng bật lưỡi lên vòm miệng! Cứ để lưỡi nằm yên dưới răng dưới rồi hà một hơi ấm như lau mắt kính!',
            diagTitleA: 'd mềm (mad, brød): lưỡi nằm yên dưới răng dưới, hơi ấm trôi ra',
            diagTitleB: 'Bẫy tiếng Việt: lưỡi đập cứng lên trên [t/đ] hoặc khép hơi mất âm!',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="96" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 115 Q 112 108 75 112" fill="none" stroke="#22c55e" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 86 Q 72 86 32 82" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="5,4"/>
                    <text x="16" y="65" fill="#7dd3fc" font-size="11" font-weight="bold">Hơi ấm trôi nhẹ (như hà hơi kính)</text>
                    <text x="64" y="138" fill="#4ade80" font-size="11" font-weight="bold">Lưỡi nằm yên sau răng dưới!</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                    <rect x="64" y="66" width="8" height="16" rx="2" fill="#e2e8f0"/>
                    <path d="M 155 110 Q 112 95 72 78" fill="none" stroke="#ef4444" stroke-width="7" stroke-linecap="round"/>
                    <line x1="56" y1="68" x2="56" y2="95" stroke="#fde047" stroke-width="3"/>
                    <text x="18" y="48" fill="#fca5a5" font-size="11" font-weight="bold">Lưỡi chặn cứng lên trên [t/đ]!</text>
                </svg>`,
            minimalPairs: [
                { a: 'mad', b: 'mat', meanA: 'đồ ăn (âm d mềm, có hơi ấm)', meanB: 'mờ / đục (âm t khép cứng)', ctxA: 'Vi laver mad i køkkenet.', ctxB: 'Farven er helt mat.' },
                { a: 'glad', b: 'glat', meanA: 'vui vẻ (d mềm cuối từ)', meanB: 'trơn trượt (âm t cuối từ)', ctxA: 'Jeg er meget glad i dag.', ctxB: 'Vejen er glat af is.' },
                { a: 'bad', b: 'bat', meanA: 'phòng tắm / sự tắm (d mềm)', meanB: 'vợt bóng bàn (t cứng)', ctxA: 'Jeg tager et varmt bad.', ctxB: 'Han spiller med et rødt bat.' },
                { a: 'sød', b: 'sæt', meanA: 'ngọt ngào / dễ thương (d mềm)', meanB: 'đặt xuống / câu (t cứng)', ctxA: 'Kagen er meget sød.', ctxB: 'Sæt dig ned her.' }
            ],
            speechExercises: [
                { text: 'Jeg spiser godt brød og sød mad.', targetWords: ['godt', 'brød', 'sød', 'mad'], hintDa: 'Læg tungen fladt bag undertænderne ved brød, sød, mad.', hintVi: 'Giữ lưỡi nằm yên dưới răng dưới cho brød, sød, mad.' },
                { text: 'Gaden er bred og flad.', targetWords: ['gaden', 'bred', 'flad'], hintDa: 'Ånd blødt ud i "gaden", "bred", "flad".', hintVi: 'Thả hơi mềm khi đọc gaden, bred, flad.' }
            ]
        },
        {
            id: 'p_t_k_pust',
            badge: 'Trọng tâm 3',
            titleDa: '3. P / T / K med kraftigt pust vs. B / D / G',
            titleVi: '3. Bật hơi mạnh P / T / K so với B / D / G — «Bài test tờ giấy»',
            descDa: 'Vietnamesisk t og c/k har intet kraftigt luftpust (kun th- har pust), mens p næsten ikke bruges i starten af egne ord. Uden tydeligt pust hører danskere "pære, tale, kaffe" som "bære, dale, gaffe"!',
            descVi: 'Trong tiếng Việt, âm <strong>t</strong> và <strong>c/k</strong> không bật hơi mạnh (chỉ có <em>th</em> mới bật hơi!), còn <em>p</em> rất hiếm đứng đầu từ. Nhưng trong tiếng Đan Mạch, ranh giới giữa <strong>P, T, K</strong> và <strong>B, D, G</strong> nằm ở <strong>luồng hơi bật ra thật mạnh</strong>! Nếu bạn nói <em>kaffe</em> hoặc <em>tale</em> mà không bật hơi, người Đan Mạch sẽ nghe thành <em>gaffe</em> và <em>dale</em>!',
            optA: { label: '💨 Bật hơi thật mạnh: P, T, K', ex: 'pære, pande, tale, kaffe', words: ['pære', 'pande', 'tale', 'kaffe'] },
            optB: { label: '🤫 Êm ái không bật hơi: B, D, G', ex: 'bære, bande, dale, gade', words: ['bære', 'bande', 'dale', 'gade'] },
            trickVi: '<strong>Mẹo tờ giấy (Papir-testen):</strong> Cầm một tờ giấy mỏng trước miệng 3 cm. Khi nói <em><strong>p</strong>ære, <strong>t</strong>ale, <strong>k</strong>old</em> (tưởng tượng chữ <em>t</em> gần như <em>th-</em> của tiếng Việt kèm gió), tờ giấy phải bay phấp phới! Với <em><strong>b</strong>ære, <strong>d</strong>ale, <strong>g</strong>ade</em>, tờ giấy đứng yên.',
            diagTitleA: 'P, T, K ở đầu từ: luồng gió bật tung tờ giấy!',
            diagTitleB: 'B, D, G: môi/lưỡi nhẹ nhàng, tờ giấy đứng yên',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="8" ry="6" fill="#ef4444"/>
                    <path d="M 45 84 L 18 70 M 45 84 L 14 84 M 45 84 L 18 98" stroke="#fde047" stroke-width="3.5" stroke-linecap="round"/>
                    <path d="M 10 45 Q 2 84 22 122" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                    <text x="108" y="75" fill="#fde047" font-size="11" font-weight="bold">Gió mạnh thổi bay tờ giấy!</text>
                    <text x="108" y="95" fill="#cbd5e1" font-size="11">pære • tale (≈ th) • kaffe</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="80" cy="82" r="22" fill="none" stroke="#475569" stroke-width="3"/>
                    <ellipse cx="56" cy="84" rx="7" ry="5" fill="#38bdf8"/>
                    <line x1="16" y1="45" x2="16" y2="120" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
                    <text x="108" y="75" fill="#7dd3fc" font-size="11" font-weight="bold">Không luồng gió — giấy đứng yên</text>
                    <text x="108" y="95" fill="#cbd5e1" font-size="11">bære • dale • gade</text>
                </svg>`,
            minimalPairs: [
                { a: 'pære', b: 'bære', meanA: 'quả lê / bóng đèn (P bật hơi)', meanB: 'mang / vác (B nhẹ, không gió)', ctxA: 'Jeg spiser en sød pære.', ctxB: 'Kan du bære tasken?' },
                { a: 'pande', b: 'bande', meanA: 'cái chảo / trán (P bật hơi!)', meanB: 'băng nhóm / chửi thề (B nhẹ)', ctxA: 'Steg æg på en varm pande.', ctxB: 'Man må ikke bande her.' },
                { a: 'tale', b: 'dale', meanA: 'nói chuyện / bài phát biểu (T bật hơi)', meanB: 'giảm xuống / thung lũng (D nhẹ)', ctxA: 'Vi skal tale dansk i dag.', ctxB: 'Priserne kan dale lidt.' },
                { a: 'kold', b: 'gold', meanA: 'lạnh lẽo (K bật hơi mạnh)', meanB: 'cằn cỗi / trống rỗng (G nhẹ)', ctxA: 'Vinteren er meget kold.', ctxB: 'Jorden er helt gold.' }
            ],
            speechExercises: [
                { text: 'Pigen køber kold kaffe og en pære.', targetWords: ['pigen', 'køber', 'kold', 'kaffe', 'pære'], hintDa: 'Lav tydeligt pust på alle P- og K-ord!', hintVi: 'Bật hơi thật mạnh ở mỗi chữ P và K!' },
                { text: 'Taler du tit med venner på torvet?', targetWords: ['taler', 'tit', 'torvet'], hintDa: 'Skub luft ud foran på T i "taler", "tit" og "torvet".', hintVi: 'Bật hơi mạnh ở âm đầu T (như th-) trong taler, tit, torvet.' }
            ]
        },
        {
            id: 'dansk_r',
            badge: 'Trọng tâm 4',
            titleDa: '4. Dansk svælg-R & smeltet slut-r',
            titleVi: '4. Âm R từ cuống họng — Khác hẳn R/Z tiếng Việt',
            descDa: 'Nordvietnamesisk udtaler "r" som summende [z] foran tænderne, og sydvietnamesisk ruller med tungespidsen [ʐ]. Dansk for-R (rød, ris) laves dybt i svælget som en krage, mens slut-R (mor, spiser) smelter sammen med vokalen uden konsonant!',
            descVi: 'Ở miền Bắc Việt Nam, chữ <em>r</em> thường đọc giống <em>d/gi</em> (rung nhẹ [z] ở răng trước), còn miền Nam lại uốn đầu lưỡi lên vòm miệng. Nhưng <strong>R Đan Mạch ở đầu từ</strong> (<em>rød, ris</em>) phải phát ra từ <strong>cuống họng sâu bên trong</strong> (như tiếng quạ kêu hoặc súc miệng nhẹ, đầu lưỡi giữ yên bên dưới)! Còn <strong>R ở cuối từ</strong> (<em>mor, bror, spiser</em>) thì hòa tan thành nguyên âm mở, không rung lưỡi!',
            optA: { label: '🦅 R ở đầu từ (trong cuống họng: rød, ris)', ex: 'rød, ris, ret', words: ['rød', 'ris', 'ret', 'rugbrød'] },
            optB: { label: '🌊 R ở cuối từ (mở họng êm: mor, spiser)', ex: 'mor, bror, spiser', words: ['mor', 'bror', 'spiser', 'lærer'] },
            trickVi: '<strong>Mẹo tập nhanh:</strong> Giữ đầu lưỡi nằm yên dưới răng cửa dưới để chắc chắn không đọc thành «z» hay «r» miền Nam. Rung nhẹ sâu trong cổ họng: <em>rød, ris</em>. Còn với <em>mo<strong>r</strong>, spise<strong>r</strong></em>, chỉ cần hạ nhẹ hàm dưới cho âm mở ra tự nhiên.',
            diagTitleA: 'R đầu từ: rung sâu ở gốc lưỡi và họng (đầu lưỡi nằm yên!)',
            diagTitleB: 'R cuối từ: biến mất phụ âm, hòa vào nguyên âm mở',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 162 125 Q 152 80 120 82 Q 85 95 72 110" fill="none" stroke="#f472b6" stroke-width="7" stroke-linecap="round"/>
                    <circle cx="152" cy="76" r="14" fill="rgba(239,68,68,0.28)" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,2"/>
                    <text x="16" y="48" fill="#fca5a5" font-size="11" font-weight="bold">Âm phát ra sâu từ cuống họng!</text>
                    <text x="16" y="138" fill="#94a3b8" font-size="10">Không đọc thành [z] và không cong đầu lưỡi</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <path d="M 45 28 Q 95 16 145 28 Q 180 48 185 120" fill="none" stroke="#475569" stroke-width="3"/>
                    <path d="M 155 118 Q 115 112 75 112" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
                    <path d="M 110 85 Q 75 88 35 88" fill="none" stroke="#4ade80" stroke-width="3.5" stroke-linecap="round"/>
                    <text x="20" y="55" fill="#4ade80" font-size="11" font-weight="bold">mor → âm mở, không rung lưỡi!</text>
                </svg>`,
            minimalPairs: [
                { a: 'rød', b: 'ød', meanA: 'màu đỏ (có R cuống họng)', meanB: 'không có R ở đầu từ', ctxA: 'Jeg køber en rød cykel.', ctxB: 'Cảm nhận luồng hơi trong cổ họng.' },
                { a: 'ris', b: 'is', meanA: 'cơm / gạo (R cuống họng)', meanB: 'nước đá / kem (không có R)', ctxA: 'Vi spiser ris til aftensmad.', ctxB: 'Der er glat is på vejen.' },
                { a: 'ret', b: 'et', meanA: 'món ăn / khá đúng', meanB: 'một (mạo từ)', ctxA: 'Det er en lækker ret.', ctxB: 'Et køkken og et brød.' }
            ],
            speechExercises: [
                { text: 'Min mor spiser rød frugt og ris.', targetWords: ['mor', 'spiser', 'rød', 'frugt', 'ris'], hintDa: 'Svælg-r i rød/ris/frugt, og blød vokalafslutning i mor/spiser.', hintVi: 'R cuống họng ở rød/ris/frugt, và mở nhẹ cuối từ mor/spiser.' }
            ]
        },
        {
            id: 'y_og_oe',
            badge: 'Trọng tâm 5',
            titleDa: '5. Kyssemund Y & Ø (ikke ư/ơ!) + Stød vs. Toner',
            titleVi: '5. Chu môi thật tròn Y & Ø (không đọc như ư/ơ) + Thanh ngắt Stød',
            descDa: 'Vietnamesisk har "ư" og "ơ" (bagtunge med flade læber), men mangler stramt læberundede forvokaler som Y og Ø! Undgå at lægge tungen tilbage som ư/ơ eller flade læberne som I/E. Desuden er stød næsten som den vietnamesiske ngã/nặng-tone i struben.',
            descVi: 'Tiếng Việt có nguyên âm <strong>ư</strong> và <strong>ơ</strong>, nhưng cả hai đều mở miệng phẳng và thụt lưỡi về sau! Ngược lại, âm <strong>Y</strong> và <strong>Ø</strong> của tiếng Đan Mạch đặt lưỡi ở phía trước (như khi nói <em>i</em> và <em>ê</em>) nhưng <strong>phải chu tròn hai môi thật chặt về phía trước như đang hôn</strong>! Nếu thả lỏng thành <em>i/ê</em> hay lùi thành <em>ư/ơ</em> sẽ làm đổi nghĩa từ ngay (<em>lys</em> ≠ <em>Lis</em>). Tin vui cho người Việt: âm ngắt cổ họng (<strong>stød</strong>) ở tiếng Đan Mạch rất giống cảm giác ngắt thanh <em>ngã / nặng</em> trong tiếng Việt!',
            optA: { label: '💋 Chu môi tròn ra trước: Y, Ø', ex: 'lys, ny, brød, dør', words: ['lys', 'ny', 'brød', 'dør'] },
            optB: { label: '😊 Kéo môi cười phẳng: I, E (tránh ư/ơ!)', ex: 'lis, ni, bred, der', words: ['lis', 'ni', 'bred', 'der'] },
            trickVi: '<strong>Bài tập 2 bước siêu dễ:</strong> Nói kéo dài chữ «i-i-i» tiếng Việt, giữ nguyên lưỡi ở phía trước rồi từ từ chu tròn hai môi chặt ra trước ➔ bạn ra âm <strong>Y</strong> chuẩn! Làm hệt vậy bắt đầu từ chữ «ê-ê-ê» ➔ bạn có âm <strong>Ø</strong> chuẩn!',
            diagTitleA: 'Y & Ø: lưỡi ở trước + môi chu tròn thật chặt ra phía trước!',
            diagTitleB: 'I & E: môi kéo ngang như cười (đừng thụt lưỡi về thành ư/ơ!)',
            diagSvg: (isTargetA) => isTargetA ? `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <circle cx="120" cy="78" r="34" fill="none" stroke="#f59e0b" stroke-width="4"/>
                    <circle cx="120" cy="78" r="14" fill="#ef4444" opacity="0.85"/>
                    <text x="34" y="30" fill="#fde047" font-size="11" font-weight="bold">Y & Ø: chu môi tròn chặt ra trước!</text>
                    <text x="58" y="138" fill="#cbd5e1" font-size="11">lys • ny • brød • møde</text>
                </svg>` : `
                <svg viewBox="0 0 240 155" width="100%" height="155">
                    <ellipse cx="120" cy="78" rx="52" ry="18" fill="none" stroke="#38bdf8" stroke-width="4"/>
                    <line x1="80" y1="78" x2="160" y2="78" stroke="#7dd3fc" stroke-width="3"/>
                    <text x="44" y="30" fill="#7dd3fc" font-size="11" font-weight="bold">I & E: kéo môi cười phẳng (không phải ư/ơ)</text>
                    <text x="72" y="138" fill="#cbd5e1" font-size="11">Lis • ni • bred • der</text>
                </svg>`,
            minimalPairs: [
                { a: 'lys', b: 'lis', meanA: 'ánh sáng / nến (Y chu môi tròn)', meanB: 'tên riêng Lis (I kéo ngang)', ctxA: 'Vi tænder stearinlys i stuen.', ctxB: 'Min veninde hedder Lis.' },
                { a: 'ny', b: 'ni', meanA: 'mới (Y chu môi tròn)', meanB: 'số 9 (I kéo ngang)', ctxA: 'Hun har en ny cykel.', ctxB: 'Klokken er ni nu.' },
                { a: 'brød', b: 'bred', meanA: 'bánh mì (Ø chu môi tròn + stød)', meanB: 'rộng lớn (E phẳng)', ctxA: 'Jeg køber frisk brød.', ctxB: 'Vejen er meget bred.' },
                { a: 'dør', b: 'der', meanA: 'cửa ra vào (Ø chu môi tròn)', meanB: 'ở đó (E phẳng)', ctxA: 'Luk venligst den hvide dør.', ctxB: 'Der sidder en ven.' }
            ],
            speechExercises: [
                { text: 'Vi har et nyt lyst køkken med ny dør.', targetWords: ['nyt', 'lyst', 'køkken', 'ny', 'dør'], hintDa: 'Spids læberne helt frem ved nyt, lyst, køkken, ny, dør (ikke ư/ơ)!', hintVi: 'Chu tròn môi thật rõ cho nyt, lyst, køkken, ny, dør (không đọc thành ư/ơ)!' }
            ]
        }
    ];

    function openHomeworkModal() {
        const existing = document.querySelector('#vlv-hw-modal');
        if (existing) existing.remove();
        const overlay = document.createElement('div');
        overlay.id = 'vlv-hw-modal';
        overlay.className = 'vlv-modal-overlay';
        const isDa = getLang() === 'da';
        const tabLabels = {
            principles: isDa ? '1. Lý thuyết & khẩu hình (Mundstilling)' : '1. Lý thuyết & khẩu hình',
            pairs: isDa ? '2. Luyện nghe cặp tối thiểu (Lyttequiz)' : '2. Luyện nghe cặp tối thiểu',
            speech: isDa ? '3. Luyện nói qua micro (Udtale)' : '3. Luyện nói qua micro'
        };
        overlay.innerHTML = `
            <div class="vlv-modal-card">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:1px solid rgba(255,255,255,0.12);">
                    <div>
                        <div style="font-size:0.74rem; font-weight:900; color:#38bdf8; text-transform:uppercase;">📚 Liên kết bài tập về nhà • Tiếng Việt</div>
                        <h2 style="margin:0.15rem 0 0; font-size:1.2rem; color:#fff;">${isDa ? 'Direkte links til alle 5 fokuslyde' : 'Liên kết trực tiếp đến cả 5 âm trọng tâm'}</h2>
                    </div>
                    <button type="button" class="vlv-btn" id="vlv-hw-close">✕ Đóng</button>
                </div>
                <div style="display:flex; flex-direction:column; gap:0.9rem;">
                    ${SOUND_MODULES.map(m => `
                        <div style="background:rgba(30,41,59,0.75); border:1px solid rgba(148,163,184,0.25); border-radius:12px; padding:0.85rem;">
                            <div style="font-weight:800; color:#fde047; margin-bottom:0.5rem;">${m.titleVi}${isDa ? ` <span style="color:#94a3b8; font-size:0.82rem;">(${m.titleDa})</span>` : ''}</div>
                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                ${VALID_TABS.map(tid => {
                                    const url = `${window.location.origin}${window.location.pathname}#/${getLang() || 'vi'}/vanskelige_lyde_vietnamesisk/${m.id}/${tid}`;
                                    return `
                                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap; background:rgba(15,23,42,0.7); padding:0.45rem 0.7rem; border-radius:8px;">
                                            <span style="font-size:0.82rem; color:#e2e8f0;">${tabLabels[tid]}</span>
                                            <button type="button" class="vlv-btn" data-copy-url="${url}" style="padding:0.3rem 0.7rem; font-size:0.78rem; border-color:#38bdf8;">📋 Sao chép</button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        overlay.querySelector('#vlv-hw-close').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        overlay.querySelectorAll('[data-copy-url]').forEach(b => {
            b.onclick = () => copyToClipboard(b.dataset.copyUrl, isDa ? 'Lektie-link' : 'Liên kết bài tập');
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
        topBar.className = 'vlv-top-bar';
        topBar.innerHTML = `
            <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                <button type="button" class="vlv-btn" id="vlv-back-main">${isDa ? '← Trang chủ (Forside)' : '← Trang chủ'}</button>
                <button type="button" class="vlv-btn" id="vlv-back-mss" style="border-color:#38bdf8; color:#7dd3fc;">🇻🇳 Về «So sánh tiếng Việt và tiếng Đan Mạch»</button>
            </div>
            <button type="button" class="vlv-btn" id="vlv-hw-btn" style="border-color:#fde047; color:#fde047;">${isDa ? '📋 Liên kết bài tập (Lektier)' : '📋 Liên kết bài tập'}</button>
        `;
        topBar.querySelector('#vlv-back-main').onclick = handleBackToMain;
        topBar.querySelector('#vlv-back-mss').onclick = handleBackToMSS;
        topBar.querySelector('#vlv-hw-btn').onclick = openHomeworkModal;
        viewContainer.appendChild(topBar);

        const hero = document.createElement('div');
        hero.className = 'vlv-hero';
        hero.innerHTML = `
            <div class="vlv-hero-kicker">${isDa ? '🇻🇳 Luyện phát âm chuyên sâu cho người Việt • Bước 2 (Trin 2)' : '🇻🇳 Luyện phát âm chuyên sâu cho người Việt • Bước 2'}</div>
            <h1>${modData.titleVi}</h1>
            <p>${isDa ? `${modData.titleDa} — ` : ''}Hướng dẫn khẩu hình, bài tập nghe tương phản & thực hành micro</p>
        `;
        viewContainer.appendChild(hero);

        const modNav = document.createElement('div');
        modNav.className = 'vlv-mod-nav';
        SOUND_MODULES.forEach(m => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `vlv-mod-pill ${m.id === activeModuleId ? 'active' : ''}`;
            btn.textContent = isDa
                ? `${m.badge}: ${m.titleDa.replace(/^\d+\.\s*/, '')}`
                : `${m.badge}: ${m.titleVi.replace(/^\d+\.\s*/, '')}`;
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
        subTabs.className = 'vlv-subtabs';
        [
            { id: 'principles', label: isDa ? '1. Khẩu hình & quy tắc (Teori)' : '1. Khẩu hình & quy tắc' },
            { id: 'pairs', label: '2. Cặp từ tối thiểu (Luyện nghe)' },
            { id: 'speech', label: isDa ? '3. Luyện nói Micro (Udtale)' : '3. Luyện nói Micro' }
        ].forEach(st => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = `vlv-subtab ${st.id === activeTab ? 'active' : ''}`;
            b.textContent = st.label;
            b.onclick = () => { activeTab = st.id; renderView(); };
            subTabs.appendChild(b);
        });
        viewContainer.appendChild(subTabs);

        const content = document.createElement('div');
        viewContainer.appendChild(content);

        if (activeTab === 'principles') {
            const card = document.createElement('div');
            card.className = 'vlv-card';
            const opt = activeTarget === 'a' ? modData.optA : modData.optB;
            card.innerHTML = `
                <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:1rem;">
                    <button type="button" class="vlv-btn" id="vlv-tog-a" style="${activeTarget === 'a' ? 'background:#0284c7; border-color:#7dd3fc;' : ''}">${modData.optA.label}</button>
                    <button type="button" class="vlv-btn" id="vlv-tog-b" style="${activeTarget === 'b' ? 'background:#be123c; border-color:#fda4af;' : ''}">${modData.optB.label}</button>
                </div>
                <div class="vlv-diag-grid">
                    <div>
                        <div style="font-weight:800; color:#7dd3fc; margin-bottom:0.45rem;">${activeTarget === 'a' ? modData.diagTitleA : modData.diagTitleB}</div>
                        <div class="vlv-svg-box">${modData.diagSvg(activeTarget === 'a')}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; justify-content:space-between; gap:0.75rem;">
                        <div style="font-size:0.93rem; color:#e2e8f0; line-height:1.58;">${modData.descVi}</div>
                        ${isDa ? `<div style="font-size:0.86rem; color:#94a3b8; line-height:1.5; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.08);"><strong style="color:#cbd5e1;">Dansk lærer-note:</strong> ${modData.descDa}</div>` : ''}
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                            ${opt.words.map(w => `<button type="button" class="vlv-btn" data-say="${w}" style="border-color:#38bdf8;">🔊 ${w}</button>`).join('')}
                        </div>
                    </div>
                </div>
                <div style="background:rgba(234,179,8,0.14); border:1px solid rgba(250,204,21,0.45); border-radius:12px; padding:0.85rem 1rem; color:#fef08a; font-size:0.9rem; line-height:1.55;">
                    ${modData.trickVi}
                </div>
            `;
            card.querySelector('#vlv-tog-a').onclick = () => { activeTarget = 'a'; renderView(); };
            card.querySelector('#vlv-tog-b').onclick = () => { activeTarget = 'b'; renderView(); };
            card.querySelectorAll('[data-say]').forEach(b => {
                b.onclick = () => playAudio(b.dataset.say, 0.8);
            });
            content.appendChild(card);
        } else if (activeTab === 'pairs') {
            const pair = modData.minimalPairs[pairQuizIdx];
            if (!pair._target) pair._target = Math.random() < 0.5 ? 'a' : 'b';
            const targetWord = pair._target === 'a' ? pair.a : pair.b;
            const qCard = document.createElement('div');
            qCard.className = 'vlv-card';
            qCard.style.textAlign = 'center';
            qCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; color:#94a3b8; font-weight:800; font-size:0.86rem; margin-bottom:0.8rem;">
                    <span>Cặp từ ${pairQuizIdx + 1} / ${modData.minimalPairs.length}</span>
                    <span style="color:#4ade80;">Điểm: ${pairScore} / ${modData.minimalPairs.length}</span>
                </div>
                <p style="color:#cbd5e1; margin:0 0 0.5rem;">Nhấn để nghe phát âm tiếng Đan Mạch và chọn đúng từ bạn nghe được:</p>
                <button type="button" class="vlv-listen-big" id="vlv-play-pair">${isDa ? '🔊 Nghe tiếng Đan Mạch (Lyt)' : '🔊 Nghe tiếng Đan Mạch'}</button>
                <div class="vlv-pair-grid">
                    <button type="button" class="vlv-pair-btn" id="vlv-choice-a">
                        <div style="font-size:1.5rem; font-weight:900; color:#38bdf8;">${pair.a}</div>
                        <div style="font-size:0.86rem; color:#e2e8f0; margin-top:0.25rem;">${pair.meanA}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxA}"</div>
                    </button>
                    <button type="button" class="vlv-pair-btn" id="vlv-choice-b">
                        <div style="font-size:1.5rem; font-weight:900; color:#f472b6;">${pair.b}</div>
                        <div style="font-size:0.86rem; color:#e2e8f0; margin-top:0.25rem;">${pair.meanB}</div>
                        <div style="font-size:0.78rem; color:#94a3b8; margin-top:0.35rem;">"${pair.ctxB}"</div>
                    </button>
                </div>
                <div id="vlv-pair-fb" style="margin-top:0.75rem;"></div>
                <div style="display:flex; justify-content:space-between; margin-top:1.1rem; gap:0.5rem; flex-wrap:wrap;">
                    <button type="button" class="vlv-btn" id="vlv-prev-p" ${pairQuizIdx === 0 ? 'disabled' : ''}>← Trước</button>
                    <button type="button" class="vlv-btn" id="vlv-next-p">${pairQuizIdx === modData.minimalPairs.length - 1 ? 'Làm lại ↺' : 'Cặp tiếp theo →'}</button>
                </div>
            `;
            qCard.querySelector('#vlv-play-pair').onclick = () => playAudio(targetWord, 0.78);
            const fbEl = qCard.querySelector('#vlv-pair-fb');
            const btnA = qCard.querySelector('#vlv-choice-a');
            const btnB = qCard.querySelector('#vlv-choice-b');
            function handlePick(pick) {
                btnA.disabled = true;
                btnB.disabled = true;
                const ok = pick === pair._target;
                if (ok) pairScore++;
                fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};">
                    ${ok ? `🎉 Chính xác! Đó là từ "${targetWord}".` : `❌ Chưa đúng — từ đúng là "${targetWord}".`}
                </div>`;
                playAudio(targetWord, 0.75);
            }
            btnA.onclick = () => handlePick('a');
            btnB.onclick = () => handlePick('b');
            qCard.querySelector('#vlv-prev-p').onclick = () => { if (pairQuizIdx > 0) { pairQuizIdx--; renderView(); } };
            qCard.querySelector('#vlv-next-p').onclick = () => {
                pair._target = undefined;
                if (pairQuizIdx < modData.minimalPairs.length - 1) pairQuizIdx++;
                else { pairQuizIdx = 0; pairScore = 0; }
                renderView();
            };
            content.appendChild(qCard);
        } else {
            const ex = modData.speechExercises[speechExerciseIdx] || modData.speechExercises[0];
            const sCard = document.createElement('div');
            sCard.className = 'vlv-card';
            sCard.style.textAlign = 'center';
            const promptHtml = ex.text.split(' ').map(w => {
                const clean = w.toLowerCase().replace(/[.,!?]/g, '');
                return ex.targetWords.includes(clean)
                    ? `<span style="color:#38bdf8; text-decoration:underline;">${w}</span>`
                    : `<span>${w}</span>`;
            }).join(' ');
            sCard.innerHTML = `
                <div style="font-size:1.45rem; font-weight:900; margin:0.4rem 0 0.65rem;">${promptHtml}</div>
                <p style="color:#cbd5e1; margin:0 0 0.85rem;">Hãy đọc to câu này, chú ý đặc biệt đến các từ màu xanh được gạch chân!</p>
                ${consecutiveSpeechStreak > 0 ? `<div style="color:#fde047; font-weight:800; margin-bottom:0.7rem;">🔥 Chuỗi phát âm chuẩn: ${consecutiveSpeechStreak}</div>` : ''}
                <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap; margin:0.65rem 0;">
                    <button type="button" class="vlv-listen-big" id="vlv-say-ex" style="margin:0;">🔊 Nghe câu mẫu</button>
                    <button type="button" class="vlv-btn" id="vlv-mic-btn" style="background:#dc2626; border-color:#f87171; padding:0.8rem 1.4rem; font-size:1rem;">🎙️ Bấm để nói</button>
                </div>
                <div id="vlv-speech-status" style="color:#94a3b8; font-size:0.9rem; margin-top:0.7rem;">Nhấn «Bấm để nói» và đọc rõ ràng bằng tiếng Đan Mạch.</div>
                <div id="vlv-speech-fb" style="margin-top:0.7rem;"></div>
                <div style="text-align:left; background:rgba(30,41,59,0.7); border-radius:10px; padding:0.8rem; margin-top:1rem; font-size:0.86rem; color:#cbd5e1;">
                    <strong>Mẹo:</strong> ${ex.hintVi}${isDa ? `<br><span style="color:#94a3b8;"><strong>Dansk:</strong> ${ex.hintDa}</span>` : ''}
                </div>
            `;
            sCard.querySelector('#vlv-say-ex').onclick = () => playAudio(ex.text, 0.84);
            const micBtn = sCard.querySelector('#vlv-mic-btn');
            const statusEl = sCard.querySelector('#vlv-speech-status');
            const fbEl = sCard.querySelector('#vlv-speech-fb');
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRec) {
                statusEl.textContent = 'Trình duyệt của bạn không hỗ trợ nhận diện giọng nói (hãy thử Chrome hoặc Safari).';
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
                        statusEl.textContent = '🎙️ Đang nghe... hãy nói tiếng Đan Mạch ngay!';
                        statusEl.style.color = '#4ade80';
                    } catch (_) {}
                };
                rec.onresult = (ev) => {
                    isSpeechRecording = false;
                    const said = ev.results[0][0].transcript.trim();
                    statusEl.textContent = `Đã nhận diện: "${said}"`;
                    const words = said.toLowerCase().split(/\s+/).map(w => w.replace(/[.,!?]/g, ''));
                    const hits = ex.targetWords.filter(tw => words.includes(tw));
                    const ok = hits.length === ex.targetWords.length;
                    if (ok) consecutiveSpeechStreak++; else consecutiveSpeechStreak = 0;
                    fbEl.innerHTML = `<div style="padding:0.75rem; border-radius:10px; font-weight:800; background:${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; color:${ok ? '#4ade80' : '#f87171'};">
                        ${ok ? `🌟 Tuyệt vời! Tất cả các từ trọng tâm (${hits.join(', ')}) đều chuẩn.` : `💡 Rất cố gắng! Hãy thử lại và chú ý rõ hơn tới: ${ex.targetWords.join(', ')}`}
                    </div>`;
                };
                rec.onerror = () => { isSpeechRecording = false; statusEl.textContent = 'Không nghe rõ âm thanh. Vui lòng thử lại.'; };
                rec.onend = () => { isSpeechRecording = false; };
            }
            content.appendChild(sCard);
        }
    }

    renderView();
    container.appendChild(viewContainer);
}
