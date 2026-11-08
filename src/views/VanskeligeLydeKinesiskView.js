import { getLang } from '../utils/i18n.js';

/**
 * VanskeligeLydeKinesiskView
 * Specialiseret fonetisk træningsflade til kinesiske danskkursister.
 * Fokus: Distinktion mellem /l/ (lateral approksimant / 边音) og /n/ (alveolær nasal / 鼻音).
 * Funktioner:
 * - Vektor-SVG munddiagrammer (Sagittal-profil + Top-down tandbue-perspektiv)
 * - Næse-klemmetricket (捏鼻检验法)
 * - Minimal pairs lytte-quiz (最小对立体辨音)
 * - Mikrofontræning med realtidsgenkendelse og diagnostisk feedback (WebKit SpeechRecognition)
 * - Modulopbygget: forberedt til udvidelse med [ð] blødt d, [ʁ] dansk r og udlydsklynger.
 */

export function renderVanskeligeLydeKinesiskView(container, navigateFn, extraData = {}) {
    const isEn = getLang() === 'en';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container vanskelige-lyde-kinesisk-view';

    // State
    let activeModuleId = extraData.module || 'l_vs_n'; // 'l_vs_n' | 'bloedt_d' | 'dansk_r' | 'udlyd'
    let activeTab = 'diagram'; // 'diagram' | 'listening' | 'speech'
    let activeDiagramPerspective = 'both'; // 'profile' | 'topdown' | 'both'
    let activeSoundTarget = 'l'; // 'l' | 'n'

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .vanskelige-lyde-kinesisk-view {
            max-width: 1100px;
            margin: 0 auto;
            padding: 1rem 1.2rem 4rem;
            color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        /* Top Bar */
        .vlk-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .vlk-back-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.35);
            color: #f8fafc;
            padding: 0.5rem 1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .vlk-back-btn:hover {
            background: rgba(51, 65, 85, 0.95);
            border-color: #fde68a;
            transform: translateX(-2px);
        }

        /* Hero */
        .vlk-hero {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%);
            border: 2px solid rgba(56, 189, 248, 0.35);
            border-radius: 20px;
            padding: 1.4rem 1.6rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .vlk-hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid rgba(56, 189, 248, 0.45);
            color: #38bdf8;
            font-size: 0.78rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.25rem 0.75rem;
            border-radius: 999px;
            margin-bottom: 0.6rem;
        }
        .vlk-hero-title {
            margin: 0 0 0.4rem;
            font-size: clamp(1.4rem, 2.8vw, 2rem);
            font-weight: 900;
            color: #ffffff;
        }
        .vlk-hero-subtitle {
            margin: 0 0 0.8rem;
            font-size: 1.02rem;
            color: #38bdf8;
            font-weight: 700;
        }
        .vlk-hero-desc {
            margin: 0;
            color: #cbd5e1;
            font-size: 0.94rem;
            line-height: 1.55;
            max-width: 850px;
        }

        /* Modular Sound Selector (Prepared for Extension) */
        .vlk-module-selector {
            display: flex;
            gap: 0.6rem;
            margin-bottom: 1.3rem;
            overflow-x: auto;
            padding-bottom: 0.4rem;
        }
        .vlk-mod-btn {
            background: rgba(15, 23, 42, 0.75);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            color: #94a3b8;
            padding: 0.6rem 1.1rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 0.86rem;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .vlk-mod-btn:hover {
            border-color: #38bdf8;
            color: #f8fafc;
        }
        .vlk-mod-btn.active {
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(30, 58, 138, 0.35) 100%);
            border-color: #38bdf8;
            color: #38bdf8;
            box-shadow: 0 0 16px rgba(56, 189, 248, 0.2);
        }
        .vlk-mod-btn.disabled {
            opacity: 0.55;
            cursor: not-allowed;
        }

        /* Main Tabs: Diagram, Listening, Speech */
        .vlk-main-tabs {
            display: flex;
            gap: 0.6rem;
            background: rgba(15, 23, 42, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            border-radius: 16px;
            padding: 0.4rem;
            margin-bottom: 1.5rem;
        }
        .vlk-tab-btn {
            flex: 1;
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.75rem 1rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.18s ease;
            text-align: center;
        }
        .vlk-tab-btn:hover:not(.active) {
            color: #f8fafc;
            background: rgba(255, 255, 255, 0.04);
        }
        .vlk-tab-btn.active {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: #ffffff;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
        }

        /* Sub-controls within diagram tab */
        .vlk-diag-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.8rem;
            margin-bottom: 1.2rem;
            padding: 0.8rem 1rem;
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 14px;
        }
        .vlk-sound-toggle-group {
            display: flex;
            gap: 0.5rem;
        }
        .vlk-toggle-btn {
            background: rgba(30, 41, 59, 0.8);
            border: 1.5px solid rgba(148, 163, 184, 0.3);
            color: #cbd5e1;
            padding: 0.45rem 1rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.86rem;
            cursor: pointer;
            transition: all 0.16s ease;
        }
        .vlk-toggle-btn.active-l {
            background: rgba(56, 189, 248, 0.25);
            border-color: #38bdf8;
            color: #38bdf8;
        }
        .vlk-toggle-btn.active-n {
            background: rgba(244, 114, 182, 0.25);
            border-color: #f472b6;
            color: #f472b6;
        }

        /* Diagram Grid (Sagittal + Top-down) */
        .vlk-diagrams-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
            gap: 1.2rem;
            margin-bottom: 1.4rem;
        }
        .vlk-diagram-card {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            border-radius: 18px;
            padding: 1.2rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
        }
        .vlk-diag-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.8rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(148, 163, 184, 0.15);
        }
        .vlk-diag-title {
            font-weight: 800;
            font-size: 0.95rem;
            color: #ffffff;
        }
        .vlk-diag-tag {
            font-size: 0.74rem;
            font-weight: 800;
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            text-transform: uppercase;
        }
        .vlk-diag-svg-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 280px;
            background: rgba(9, 14, 26, 0.7);
            border-radius: 14px;
            padding: 0.8rem;
            margin-bottom: 0.9rem;
        }
        .vlk-diag-svg {
            width: 100%;
            max-width: 380px;
            height: auto;
            display: block;
        }
        .vlk-diag-notes {
            font-size: 0.86rem;
            line-height: 1.5;
            color: #cbd5e1;
        }
        .vlk-diag-notes strong {
            color: #fde68a;
        }

        /* Nose Pinch Practical Card */
        .vlk-pinch-card {
            background: linear-gradient(135deg, rgba(234, 179, 8, 0.12) 0%, rgba(15, 23, 42, 0.85) 100%);
            border: 1.5px solid rgba(234, 179, 8, 0.4);
            border-radius: 16px;
            padding: 1.15rem 1.3rem;
            margin-bottom: 1.4rem;
        }
        .vlk-pinch-title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #fde047;
            font-weight: 900;
            font-size: 1.05rem;
            margin-bottom: 0.4rem;
        }
        .vlk-pinch-body {
            font-size: 0.92rem;
            color: #e2e8f0;
            line-height: 1.55;
        }
        .vlk-pinch-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 0.8rem;
            margin-top: 0.8rem;
        }
        .vlk-pinch-item {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 12px;
            padding: 0.8rem 1rem;
        }
        .vlk-pinch-item.item-l { border-color: rgba(56, 189, 248, 0.5); }
        .vlk-pinch-item.item-n { border-color: rgba(244, 114, 182, 0.5); }

        /* Bilingual Comparison Box */
        .vlk-bilingual-box {
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 16px;
            padding: 1.1rem 1.3rem;
            margin-bottom: 1.4rem;
        }
        .vlk-bilingual-title {
            color: #38bdf8;
            font-weight: 800;
            font-size: 0.92rem;
            margin-bottom: 0.6rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .vlk-zh-block {
            background: rgba(30, 41, 59, 0.65);
            border-left: 3px solid #eab308;
            padding: 0.75rem 1rem;
            border-radius: 0 10px 10px 0;
            margin-bottom: 0.6rem;
            font-size: 0.9rem;
            line-height: 1.6;
            color: #f1f5f9;
        }
        .vlk-da-block {
            padding: 0.2rem 0.5rem;
            font-size: 0.88rem;
            color: #cbd5e1;
            line-height: 1.5;
        }

        /* --- LISTENING QUIZ TAB --- */
        .vlk-quiz-card {
            background: rgba(15, 23, 42, 0.9);
            border: 1.5px solid rgba(56, 189, 248, 0.35);
            border-radius: 20px;
            padding: 1.5rem;
            text-align: center;
        }
        .vlk-quiz-status-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            font-size: 0.88rem;
            color: #94a3b8;
        }
        .vlk-play-sound-btn {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            border: none;
            color: #ffffff;
            font-size: 1.15rem;
            font-weight: 800;
            padding: 1rem 2.2rem;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(2, 132, 199, 0.4);
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            margin-bottom: 1.6rem;
        }
        .vlk-play-sound-btn:hover {
            transform: scale(1.04);
            box-shadow: 0 8px 26px rgba(2, 132, 199, 0.55);
        }
        .vlk-play-sound-btn:active {
            transform: scale(0.98);
        }
        .vlk-quiz-options {
            display: flex;
            justify-content: center;
            gap: 1.2rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }
        .vlk-quiz-opt {
            background: rgba(30, 41, 59, 0.85);
            border: 2px solid rgba(148, 163, 184, 0.3);
            color: #ffffff;
            font-size: 1.35rem;
            font-weight: 800;
            padding: 1.1rem 2.5rem;
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.18s ease;
            min-width: 170px;
        }
        .vlk-quiz-opt:hover:not(:disabled) {
            border-color: #38bdf8;
            background: rgba(56, 189, 248, 0.15);
            transform: translateY(-2px);
        }
        .vlk-quiz-opt.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #86efac !important;
        }
        .vlk-quiz-opt.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #fca5a5 !important;
        }
        .vlk-quiz-feedback {
            min-height: 65px;
            padding: 0.85rem 1.2rem;
            border-radius: 12px;
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 1.3rem;
            display: none;
        }
        .vlk-quiz-feedback.show {
            display: block;
        }
        .vlk-quiz-feedback.success {
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid rgba(34, 197, 94, 0.4);
            color: #86efac;
        }
        .vlk-quiz-feedback.error {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: #fca5a5;
        }

        /* --- SPEECH EXERCISE TAB (Udtaletræning) --- */
        .vlk-speech-card {
            background: rgba(15, 23, 42, 0.92);
            border: 2px solid rgba(56, 189, 248, 0.35);
            border-radius: 20px;
            padding: 1.8rem;
            text-align: center;
        }
        .vlk-speech-prompt {
            font-size: clamp(1.5rem, 3.2vw, 2.2rem);
            font-weight: 900;
            color: #ffffff;
            margin-bottom: 0.4rem;
        }
        .vlk-speech-sub {
            font-size: 0.95rem;
            color: #94a3b8;
            margin-bottom: 1.5rem;
        }
        .vlk-target-word {
            display: inline-block;
            padding: 0.1rem 0.4rem;
            border-radius: 6px;
        }
        .vlk-target-word.word-l {
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.15);
        }
        .vlk-target-word.word-n {
            color: #f472b6;
            background: rgba(244, 114, 182, 0.15);
        }
        .vlk-mic-row {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.2rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }
        .vlk-mic-btn {
            width: 74px;
            height: 74px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
            border: 3px solid rgba(254, 202, 202, 0.5);
            color: #ffffff;
            cursor: pointer;
            box-shadow: 0 6px 22px rgba(239, 68, 68, 0.4);
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .vlk-mic-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 8px 30px rgba(239, 68, 68, 0.6);
        }
        .vlk-mic-btn.listening {
            animation: pulseListening 1.1s infinite alternate;
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        }
        @keyframes pulseListening {
            0% { transform: scale(1); box-shadow: 0 0 10px rgba(239, 68, 68, 0.5); }
            100% { transform: scale(1.15); box-shadow: 0 0 35px rgba(239, 68, 68, 0.95); }
        }
        .vlk-listen-model-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.35);
            color: #f8fafc;
            padding: 0.75rem 1.3rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.18s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .vlk-listen-model-btn:hover {
            background: rgba(51, 65, 85, 0.95);
            border-color: #38bdf8;
        }
        .vlk-speech-status {
            font-size: 0.92rem;
            color: #94a3b8;
            margin-bottom: 1.2rem;
            min-height: 24px;
        }
        .vlk-speech-feedback-box {
            background: rgba(15, 23, 42, 0.8);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            border-radius: 14px;
            padding: 1rem 1.3rem;
            margin-bottom: 1.5rem;
            text-align: left;
            display: none;
        }
        .vlk-speech-feedback-box.show {
            display: block;
        }
        .vlk-feedback-heard {
            font-size: 1.15rem;
            font-weight: 800;
            margin-bottom: 0.35rem;
        }
        .vlk-feedback-tip {
            font-size: 0.88rem;
            color: #cbd5e1;
            line-height: 1.5;
        }
        .vlk-streak-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(251, 191, 36, 0.15);
            border: 1px solid rgba(251, 191, 36, 0.4);
            color: #fde68a;
            font-weight: 800;
            font-size: 0.85rem;
            padding: 0.35rem 0.85rem;
            border-radius: 20px;
            margin-bottom: 1.3rem;
        }
        .vlk-nav-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1.2rem;
            gap: 0.8rem;
        }
        .vlk-nav-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.3);
            color: #ffffff;
            padding: 0.55rem 1.15rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.86rem;
            cursor: pointer;
            transition: all 0.16s ease;
        }
        .vlk-nav-btn:hover:not(:disabled) {
            background: rgba(51, 65, 85, 0.95);
            border-color: #38bdf8;
        }
        .vlk-nav-btn:disabled {
            opacity: 0.35;
            cursor: not-allowed;
        }
    `;
    viewContainer.appendChild(style);

    // SVG Helper Icons (Monochrome)
    const SVG_SPEAKER = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    const SVG_MIC = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`;

    // TTS Helper
    function speakWord(text, rate = 0.85) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'da-DK';
        utter.rate = rate;
        window.speechSynthesis.speak(utter);
    }

    // --- DATA: SOUND MODULES (Prepared for extension) ---
    const SOUND_MODULES = [
        {
            id: 'l_vs_n',
            titleDa: 'L vs. N',
            titleZh: '边音 /l/ 与鼻音 /n/',
            badge: 'Sydøstlig kerneudfordring',
            status: 'active',
            descDa: 'I mange sydkinesiske dialekter forveksles eller sammenfalder /l/ og /n/. På dansk er forskellen afgørende: "læse" vs. "næse", "lys" vs. "nys".',
            descZh: '在许多南方汉语方言（粤语、西南官话、闽南语、吴语等）中，/l/ 与 /n/ 常常混淆甚至合并（蓝/男不分）。丹麦语中两者是绝对区别意义的音位。'
        },
        {
            id: 'bloedt_d',
            titleDa: 'Blødt d [ð]',
            titleZh: '软 d [ð] 发音',
            badge: 'Kommer snart',
            status: 'upcoming',
            descDa: 'Det bløde danske d som i "brød" og "mad" findes ikke i kinesisk og forveksles ofte med [l] eller [j].',
            descZh: '丹麦语软 d [ð]（如 brød, mad）在汉语中完全缺失，常被误读为 l 或 y。'
        },
        {
            id: 'dansk_r',
            titleDa: 'Dansk r [ʁ]',
            titleZh: '小舌擦音 r [ʁ]',
            badge: 'Kommer snart',
            status: 'upcoming',
            descDa: 'Det danske r udtales dybt nede i svælget (drøblen), modsat det kinesiske r (rén) som er retrofleks forrest i munden.',
            descZh: '丹麦语 r 发音部位在咽腔深处的小舌，而汉语拼音 r 则是舌尖卷舌音。'
        },
        {
            id: 'udlyd',
            titleDa: 'Udlyd (-st, -lt)',
            titleZh: '词尾辅音群',
            badge: 'Kommer snart',
            status: 'upcoming',
            descDa: 'Kinesiske stavelser slutter kun på vokaler, -n eller -ng. Danske konsonantsammenstød i slutningen af ord (kold, koldt, fast) kræver særskilt træning.',
            descZh: '汉语仅有 -n 和 -ng 词尾，丹麦语丰富的词尾辅音群（-lt, -st, -kt）易被吞音或多加元音。'
        }
    ];

    // Minimal pairs for listening
    const MINIMAL_PAIRS = [
        { l: 'læse', n: 'næse', contextL: 'Hun vil læse en bog', contextN: 'Puds din næse', meanL_zh: '阅读 (læse)', meanN_zh: '鼻子 (næse)' },
        { l: 'lys', n: 'nys', contextL: 'Tænd et lys', contextN: 'Han slog et nys', meanL_zh: '光 / 蜡烛 (lys)', meanN_zh: '喷嚏 (nys)' },
        { l: 'lave', n: 'nave', contextL: 'Vi vil lave mad', contextN: 'Hjulets nave', meanL_zh: '做 / 制作 (lave)', meanN_zh: '轮毂 (nave)' },
        { l: 'lille', n: 'Nille', contextL: 'En lille kat', contextN: 'Pigen hedder Nille', meanL_zh: '小的 (lille)', meanN_zh: '人名 (Nille)' },
        { l: 'lås', n: 'nås', contextL: 'En stærk lås', contextN: 'Bussen kan nås', meanL_zh: '锁 (lås)', meanN_zh: '能赶上 (nås)' },
        { l: 'male', n: 'mane', contextL: 'Male et hus', contextN: 'Mane til ro', meanL_zh: '画画/刷漆 (male)', meanN_zh: '告诫/唤醒 (mane)' },
        { l: 'lam', n: 'nam', contextL: 'Et lille lam', contextN: 'Mums nam nam', meanL_zh: '羊羔 (lam)', meanN_zh: '拟声词 (nam)' },
        { l: 'kold', n: 'kone', contextL: 'Vinteren er kold', contextN: 'Hans søde kone', meanL_zh: '冷的 (kold [l])', meanN_zh: '妻子 (kone [n])' }
    ];

    // Speech exercises (3-ords sætninger: 3xL, 3xN og pendul)
    const SPEECH_EXERCISES = [
        { 
            text: 'Lise laver linsesuppe', 
            targetSound: 'l', 
            type: 'alliteration',
            targetWords: ['lise', 'laver', 'linsesuppe'],
            hintDa: '3 × L! Hold tungens sider åbne hele vejen: Lise - laver - linsesuppe.', 
            hintZh: '连续3个 /l/ 边音（Lise - laver - linsesuppe）：舌侧保持完全通气，切勿漏气到鼻腔。' 
        },
        { 
            text: 'Nissens næse nyser', 
            targetSound: 'n', 
            type: 'alliteration',
            targetWords: ['nissens', 'næse', 'nyser'],
            hintDa: '3 × N! Forsegl munden helt foran ved hvert ord, så al luft passerer næsen.', 
            hintZh: '连续3个 /n/ 鼻音（Nissens - næse - nyser）：舌尖紧贴上齿龈，全部气流通过鼻腔振动发出。' 
        },
        { 
            text: 'Lasse læser lektier', 
            targetSound: 'l', 
            type: 'alliteration',
            targetWords: ['lasse', 'læser', 'lektier'],
            hintDa: '3 × L: Åbne mundvige og lateralt luftslip i kinderne.', 
            hintZh: '连续3个 /l/ 边音（Lasse - læser - lektier）：气流从两腮冲出。' 
        },
        { 
            text: 'Nanna napper nødder', 
            targetSound: 'n', 
            type: 'alliteration',
            targetWords: ['nanna', 'napper', 'nødder'],
            hintDa: '3 × N: Mærk den kraftige nasale vibration i næseryggen ved hvert ord.', 
            hintZh: '连续3个 /n/ 鼻音（Nanna - napper - nødder）：按住鼻翼感受每次发音的鼻腔震颤。' 
        },
        { 
            text: 'Lene låner lygten', 
            targetSound: 'l', 
            type: 'alliteration',
            targetWords: ['lene', 'låner', 'lygten'],
            hintDa: '3 × L: Hæv ganesejlet og luk helt af for næsehulen.', 
            hintZh: '连续3个 /l/ 边音（Lene - låner - lygten）：软腭完全闭锁鼻咽通路。' 
        },
        { 
            text: 'Ni nisser nynner', 
            targetSound: 'n', 
            type: 'alliteration',
            targetWords: ['ni', 'nisser', 'nynner'],
            hintDa: '3 × N: Rolig, klangfuld næselyd hele vejen igennem.', 
            hintZh: '连续3个 /n/ 鼻音（Ni - nisser - nynner）：发出饱满集中的鼻音共鸣。' 
        },
        { 
            text: 'Niels tænder lyset', 
            targetSound: 'contrast', 
            type: 'contrast',
            targetWords: ['niels', 'lyset'],
            hintDa: 'Kontrast (N ➔ L): Start med nasal N i "Niels", og skift til rent lateralt luftslip i "lyset"!', 
            hintZh: '边音/鼻音钟摆挑战（N ➔ L）：从 Niels 的紧贴鼻音，瞬间切换为 lyset 的侧边流气！' 
        },
        { 
            text: 'Lise pudser næsen', 
            targetSound: 'contrast', 
            type: 'contrast',
            targetWords: ['lise', 'næsen'],
            hintDa: 'Kontrast (L ➔ N): Start med lateral L i "Lise", og luk tæt for munden i "næsen"!', 
            hintZh: '边音/鼻音钟摆挑战（L ➔ N）：从 Lise 的侧流气，转换为 næsen 的封闭鼻音！' 
        },
        { 
            text: 'Lille nisse nyser', 
            targetSound: 'contrast', 
            type: 'contrast',
            targetWords: ['lille', 'nisse', 'nyser'],
            hintDa: 'L ➔ N ➔ N: "Lille" (åbne sider) efterfølges af to nasale N-ord ("nisse nyser").', 
            hintZh: '三词终极切换（L ➔ N ➔ N）：Lille（舌侧通气）接着快速进入 nisse nyser（紧密封闭鼻腔）。' 
        }
    ];

    // --- PURE VECTOR SVG GENERATORS ---

    /**
     * Sagittal Profile Diagram (Sidelæns profil-snit)
     * Viser hård gane, blød gane (ganesejl), tunge, tandkød og luftstrøm
     */
    function generateSagittalProfileSvg(sound) {
        const isL = sound === 'l';
        const primaryColor = isL ? '#38bdf8' : '#f472b6';
        const titleText = isL ? 'Sagittal Profil: Lateral /l/' : 'Sagittal Profil: Nasal /n/';

        // Tongue shape:
        // /l/: Tongue tip touches alveolar ridge in center; body is lowered
        // /n/: Tongue tip and blade make full tight seal against alveolar ridge
        const tonguePath = isL 
            ? 'M 140 240 C 150 185, 175 160, 215 135 C 225 125, 230 110, 235 102 C 220 115, 195 130, 165 170 C 145 195, 135 220, 130 250 Z'
            : 'M 140 240 C 155 180, 185 145, 222 108 C 235 96, 248 94, 255 96 C 240 118, 205 138, 170 178 C 145 205, 135 225, 130 250 Z';

        // Velum (Soft palate) position:
        // /l/: RAISED (closing off nasal cavity) -> tip touches pharynx wall at x=205, y=145
        // /n/: LOWERED (open passage to nasal cavity) -> hangs down at x=190, y=170
        const velumPath = isL
            ? 'M 175 110 C 190 125, 198 138, 208 145 C 205 148, 195 135, 170 118 Z' // Closed
            : 'M 175 110 C 182 135, 186 160, 188 175 C 182 173, 178 150, 170 118 Z'; // Open downwards

        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="lAirflowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.95"/>
                    </linearGradient>
                    <linearGradient id="nAirflowGrad" x1="0%" y1="100%" x2="50%" y2="0%">
                        <stop offset="0%" stop-color="#f472b6" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="#f472b6" stop-opacity="0.95"/>
                    </linearGradient>
                    <filter id="glowAir" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <marker id="arrowL" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#38bdf8"/>
                    </marker>
                    <marker id="arrowN" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#f472b6"/>
                    </marker>
                </defs>

                <!-- Background Frame -->
                <rect width="360" height="300" rx="14" fill="#0b1329" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5"/>

                <!-- Anatomical Contours -->
                <!-- Forehead, Nose & Upper Lip -->
                <path d="M 330 30 C 310 30, 295 50, 290 85 C 285 105, 305 115, 295 130 C 288 138, 275 142, 270 148 C 265 154, 270 162, 268 170" 
                      fill="none" stroke="#475569" stroke-width="2.5" stroke-linecap="round"/>

                <!-- Hard Palate & Alveolar Ridge -->
                <path d="M 264 165 C 255 125, 235 98, 175 110" 
                      fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
                
                <!-- Alveolar Ridge Touch Target Highlight -->
                <circle cx="236" cy="100" r="6" fill="#facc15" stroke="#fef08a" stroke-width="1.5"/>
                <text x="236" y="85" fill="#facc15" font-size="10" font-weight="bold" text-anchor="middle">Tandkødsrand</text>

                <!-- Upper Incisors (Overfortænder) -->
                <rect x="250" y="112" width="6" height="15" rx="2" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>

                <!-- Lower Lip & Chin -->
                <path d="M 260 215 C 275 225, 270 245, 255 260 C 240 275, 220 280, 200 280" 
                      fill="none" stroke="#475569" stroke-width="2.5"/>
                <!-- Lower Incisors -->
                <rect x="245" y="195" width="6" height="14" rx="2" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>

                <!-- Pharyngeal Back Wall (Svælgets bagvæg) -->
                <path d="M 205 110 L 205 270" fill="none" stroke="#475569" stroke-width="3" stroke-linecap="round"/>

                <!-- Nasal Cavity (Næsehulen) -->
                <path d="M 205 70 C 240 60, 260 70, 285 115" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="3,3"/>
                <text x="235" y="55" fill="#64748b" font-size="10" text-anchor="middle">Næsehule (鼻腔)</text>

                <!-- Velum / Soft Palate (Ganesejlet) -->
                <path d="${velumPath}" fill="${isL ? '#38bdf8' : '#f472b6'}" stroke="#f8fafc" stroke-width="1.5"/>

                <!-- Tongue (Tungen) -->
                <path d="${tonguePath}" fill="url(#${isL ? 'lAirflowGrad' : 'nAirflowGrad'})" stroke="${primaryColor}" stroke-width="2.5"/>

                <!-- Airflow Arrows & Annotations -->
                ${isL ? `
                    <!-- L-AIRFLOW: Velum is closed, air streams out through the mouth! -->
                    <!-- Velum closure cross -->
                    <circle cx="206" cy="143" r="5" fill="#ef4444"/>
                    <line x1="202" y1="139" x2="210" y2="147" stroke="#ffffff" stroke-width="1.8"/>
                    <line x1="210" y1="139" x2="202" y2="147" stroke="#ffffff" stroke-width="1.8"/>
                    <text x="170" y="148" fill="#f87171" font-size="9" font-weight="bold" text-anchor="end">Lukket til næsen!</text>

                    <!-- Blue Oral Airflow Path -->
                    <path d="M 175 250 C 180 200, 195 180, 220 165 C 240 155, 275 165, 305 168" 
                          fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="8,4" 
                          filter="url(#glowAir)" marker-end="url(#arrowL)"/>
                    <text x="280" y="195" fill="#38bdf8" font-size="11" font-weight="bold">Oral luftstrøm ➔</text>
                    <text x="280" y="208" fill="#94a3b8" font-size="9">100% ud af munden</text>
                ` : `
                    <!-- N-AIRFLOW: Mouth is sealed, air diverted through the nose! -->
                    <!-- Oral Closure Barrier -->
                    <path d="M 226 102 C 235 98, 250 98, 256 108" fill="none" stroke="#ef4444" stroke-width="4"/>
                    <text x="285" y="145" fill="#f87171" font-size="9.5" font-weight="bold" text-anchor="middle">Mundspærring! ⛔</text>

                    <!-- Pink Nasal Airflow Path -->
                    <path d="M 175 250 C 180 190, 185 140, 195 110 C 205 75, 245 70, 290 120" 
                          fill="none" stroke="#f472b6" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="8,4" 
                          filter="url(#glowAir)" marker-end="url(#arrowN)"/>
                    <text x="270" y="45" fill="#f472b6" font-size="11" font-weight="bold">Nasal luftstrøm ➔</text>
                    <text x="270" y="58" fill="#94a3b8" font-size="9">Al luft ud af næsen</text>
                `}

                <!-- Footnote / Mode Pill in SVG -->
                <rect x="15" y="15" width="105" height="24" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${primaryColor}" stroke-width="1.2"/>
                <text x="67" y="31" fill="${primaryColor}" font-size="11" font-weight="900" text-anchor="middle">${isL ? '🌊 Lyden [l]' : '🌸 Lyden [n]'}</text>
            </svg>
        `;
    }

    /**
     * Top-Down View Diagram (Set oppefra af tandbue og tunge)
     * Viser den afgørende laterale luftspalte for /l/ vs. den komplette forreste prop for /n/
     */
    function generateTopDownDentalSvg(sound) {
        const isL = sound === 'l';
        const primaryColor = isL ? '#38bdf8' : '#f472b6';

        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="glowLateral" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <marker id="arrowLat" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#38bdf8"/>
                    </marker>
                </defs>

                <!-- Background Frame -->
                <rect width="360" height="300" rx="14" fill="#0b1329" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5"/>

                <!-- Perspective Title -->
                <text x="180" y="24" fill="#94a3b8" font-size="10" font-weight="bold" text-anchor="middle" letter-spacing="0.05em">TANDBUEN OG TUNGEN SET OPPEFRA (俯视牙弓与舌面)</text>

                <!-- Dental Arch (Overkæbens hesteskoformede tandrække) -->
                <!-- Front Incisors (Fortænder foroven) -->
                <g fill="#f8fafc" stroke="#64748b" stroke-width="1.2">
                    <!-- Central incisors -->
                    <rect x="168" y="42" width="10" height="14" rx="2" />
                    <rect x="182" y="42" width="10" height="14" rx="2" />
                    <!-- Lateral incisors -->
                    <rect x="154" y="46" width="9" height="13" rx="2" transform="rotate(-8 158 52)"/>
                    <rect x="197" y="46" width="9" height="13" rx="2" transform="rotate(8 201 52)"/>
                    <!-- Canines (Hjørnetænder) -->
                    <circle cx="143" cy="65" r="6" />
                    <circle cx="217" cy="65" r="6" />
                    <!-- Premolars & Molars (Kindtænder venstre) -->
                    <rect x="127" y="80" width="14" height="10" rx="2" transform="rotate(-25 134 85)"/>
                    <rect x="120" y="100" width="15" height="12" rx="3" transform="rotate(-25 127 106)"/>
                    <rect x="113" y="125" width="17" height="14" rx="3" transform="rotate(-25 121 132)"/>
                    <rect x="106" y="152" width="18" height="15" rx="3" transform="rotate(-25 115 160)"/>
                    <!-- Premolars & Molars (Kindtænder højre) -->
                    <rect x="219" y="80" width="14" height="10" rx="2" transform="rotate(25 226 85)"/>
                    <rect x="225" y="100" width="15" height="12" rx="3" transform="rotate(25 233 106)"/>
                    <rect x="230" y="125" width="17" height="14" rx="3" transform="rotate(25 239 132)"/>
                    <rect x="236" y="152" width="18" height="15" rx="3" transform="rotate(25 245 160)"/>
                </g>

                <!-- Arch Outline Guide (Tandkødsrand) -->
                <path d="M 115 175 C 130 90, 150 56, 180 56 C 210 56, 230 90, 245 175" 
                      fill="none" stroke="rgba(148, 163, 184, 0.3)" stroke-width="2" stroke-dasharray="4,4"/>

                <!-- Tongue Surface from above -->
                ${isL ? `
                    <!-- TONGUE FOR /l/: Slender in front, touching only middle; sides retracted away from teeth! -->
                    <path d="M 135 240 C 145 190, 155 120, 175 58 C 178 54, 182 54, 185 58 C 205 120, 215 190, 225 240 Z" 
                          fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" stroke-width="2.5"/>

                    <!-- Single Center Contact Point (Kun berøring i midten!) -->
                    <circle cx="180" cy="56" r="6" fill="#facc15" stroke="#ffffff" stroke-width="2"/>
                    <text x="180" y="44" fill="#facc15" font-size="10" font-weight="900" text-anchor="middle">1 Berøringspunkt i midten</text>

                    <!-- Lateral Gap Highlight: Siderne er nede! -->
                    <!-- Left Lateral Channel (Venstre luftkanal) -->
                    <path d="M 165 210 C 150 160, 142 120, 134 85" 
                          fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="6,3" 
                          filter="url(#glowLateral)" marker-end="url(#arrowLat)"/>
                    
                    <!-- Right Lateral Channel (Højre luftkanal) -->
                    <path d="M 195 210 C 210 160, 218 120, 226 85" 
                          fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="6,3" 
                          filter="url(#glowLateral)" marker-end="url(#arrowLat)"/>

                    <text x="80" y="115" fill="#38bdf8" font-size="10.5" font-weight="bold" text-anchor="end">Venstre slip ➔</text>
                    <text x="280" y="115" fill="#38bdf8" font-size="10.5" font-weight="bold" text-anchor="start">➔ Højre slip</text>

                    <!-- Bottom explanation -->
                    <rect x="25" y="245" width="310" height="42" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(56, 189, 248, 0.4)"/>
                    <text x="180" y="262" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">LATERALT LUFTSLIP (边音 / 侧向气流)</text>
                    <text x="180" y="278" fill="#cbd5e1" font-size="9.5" text-anchor="middle">Tungens sider trækkes ned fra kindtænderne. Luften suser ud i siderne.</text>
                ` : `
                    <!-- TONGUE FOR /n/: Wide tongue forming an airtight U-seal along the entire alveolar front! -->
                    <path d="M 125 240 C 130 180, 138 90, 180 56 C 222 90, 230 180, 235 240 Z" 
                          fill="rgba(244, 114, 182, 0.25)" stroke="#f472b6" stroke-width="2.5"/>

                    <!-- Complete Horseshoe Seal (Komplet forsegling hele vejen rundt) -->
                    <path d="M 132 90 C 145 60, 160 54, 180 54 C 200 54, 215 60, 228 90" 
                          fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
                    
                    <circle cx="180" cy="54" r="5" fill="#ef4444"/>
                    <circle cx="152" cy="68" r="5" fill="#ef4444"/>
                    <circle cx="208" cy="68" r="5" fill="#ef4444"/>

                    <text x="180" y="38" fill="#f87171" font-size="10" font-weight="900" text-anchor="middle">KOMPLET FORSEGLET TANDBUE ⛔</text>

                    <!-- Red Blocked Signs at sides -->
                    <text x="80" y="115" fill="#f87171" font-size="10.5" font-weight="bold" text-anchor="end">Lukket tæt ⛔</text>
                    <text x="280" y="115" fill="#f87171" font-size="10.5" font-weight="bold" text-anchor="start">⛔ Lukket tæt</text>

                    <!-- Bottom explanation -->
                    <rect x="25" y="245" width="310" height="42" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(244, 114, 182, 0.4)"/>
                    <text x="180" y="262" fill="#f472b6" font-size="11" font-weight="bold" text-anchor="middle">KOMPLET MUNDLUKKE (鼻音 / 口腔完全封闭)</text>
                    <text x="180" y="278" fill="#cbd5e1" font-size="9.5" text-anchor="middle">Ingen luft kan slippe ud i munden. 100% af luften presses op i næsehulen.</text>
                `}
            </svg>
        `;
    }

    // --- MAIN RENDER FUNCTION ---
    function renderView() {
        viewContainer.innerHTML = '';
        viewContainer.appendChild(style);

        // 1. Top Bar
        const topBar = document.createElement('div');
        topBar.className = 'vlk-top-bar';
        topBar.innerHTML = `
            <button type="button" class="vlk-back-btn" id="vlk-back">
                ← ${isEn ? 'Back to Language Comparison' : 'Tilbage til Mit sprog sammenlignet'}
            </button>
            <div style="font-size: 0.85rem; color: #94a3b8; font-weight: 700;">
                🇨🇳 Kinesisk fonetik • Lydcenter
            </div>
        `;
        topBar.querySelector('#vlk-back').onclick = () => {
            navigateFn('mit_sprog_sammenlignet');
        };
        viewContainer.appendChild(topBar);

        // 2. Hero Card
        const hero = document.createElement('div');
        hero.className = 'vlk-hero';
        hero.innerHTML = `
            <div class="vlk-hero-badge">Fonetisk Specialistmodul • Trin 2 (Fon)</div>
            <h1 class="vlk-hero-title">Vanskelige lyde for kinesere: L vs. N</h1>
            <div class="vlk-hero-subtitle">侧音 /l/ 与鼻音 /n/ 发音对比与辨音训练 (Lateral vs. Nasal)</div>
            <p class="vlk-hero-desc">
                ${isEn 
                    ? 'In many Southern Chinese dialects, /l/ and /n/ are merged or allophonic. In Danish, they distinguish crucial minimal pairs like "læse" vs. "næse" and "lys" vs. "nys". Explore the mouth anatomy, lateral airflow diagrams, listening quiz, and speech recognition practice below.'
                    : 'I mange syd- og sydøstkinesiske dialekter forveksles eller sammenfalder L og N. På dansk adskiller de helt afgørende ordpar som <em>læse</em> over for <em>næse</em> og <em>lys</em> over for <em>nys</em>. Her lærer du den præcise tungestilling, ser luftstrømmen fra to vinkler og træner direkte med mikrofonen.'
                }
            </p>
        `;
        viewContainer.appendChild(hero);

        // 3. Extensible Module Selector
        const modSelector = document.createElement('div');
        modSelector.className = 'vlk-module-selector';
        SOUND_MODULES.forEach(mod => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `vlk-mod-btn ${mod.id === activeModuleId ? 'active' : ''} ${mod.status !== 'active' ? 'disabled' : ''}`;
            btn.innerHTML = `
                <span>${mod.titleDa}</span>
                <span style="font-size:0.75rem; opacity:0.8;">(${mod.titleZh})</span>
                ${mod.status !== 'active' ? `<span style="font-size:0.7rem; background:rgba(255,255,255,0.1); padding:0.15rem 0.4rem; border-radius:6px;">${mod.badge}</span>` : ''}
            `;
            if (mod.status === 'active') {
                btn.onclick = () => {
                    activeModuleId = mod.id;
                    renderView();
                };
            }
            modSelector.appendChild(btn);
        });
        viewContainer.appendChild(modSelector);

        // 4. Main Activity Tabs
        const mainTabs = document.createElement('div');
        mainTabs.className = 'vlk-main-tabs';
        mainTabs.innerHTML = `
            <button type="button" class="vlk-tab-btn ${activeTab === 'diagram' ? 'active' : ''}" data-tab="diagram">
                🔬 1. Anatomi & munddiagrammer
            </button>
            <button type="button" class="vlk-tab-btn ${activeTab === 'listening' ? 'active' : ''}" data-tab="listening">
                🎧 2. Lytte-test (Hør forskellen)
            </button>
            <button type="button" class="vlk-tab-btn ${activeTab === 'speech' ? 'active' : ''}" data-tab="speech">
                🎙️ 3. Udtaletræning (Mikrofon)
            </button>
        `;
        mainTabs.querySelectorAll('.vlk-tab-btn').forEach(btn => {
            btn.onclick = () => {
                activeTab = btn.dataset.tab;
                renderView();
            };
        });
        viewContainer.appendChild(mainTabs);

        // 5. Content Container
        const contentWrap = document.createElement('div');

        if (activeTab === 'diagram') {
            renderDiagramSection(contentWrap);
        } else if (activeTab === 'listening') {
            renderListeningSection(contentWrap);
        } else if (activeTab === 'speech') {
            renderSpeechSection(contentWrap);
        }

        viewContainer.appendChild(contentWrap);
    }

    // --- TAB 1: DIAGRAM SECTION ---
    function renderDiagramSection(wrap) {
        // Sub-controls: Toggle L vs N
        const controls = document.createElement('div');
        controls.className = 'vlk-diag-controls';
        controls.innerHTML = `
            <div style="font-weight: 800; font-size: 0.9rem; color: #f8fafc;">
                Vælg lyd at undersøge:
            </div>
            <div class="vlk-sound-toggle-group">
                <button type="button" class="vlk-toggle-btn ${activeSoundTarget === 'l' ? 'active-l' : ''}" id="toggle-l">
                    🌊 Lyden L /l/ (Lateral • 边音)
                </button>
                <button type="button" class="vlk-toggle-btn ${activeSoundTarget === 'n' ? 'active-n' : ''}" id="toggle-n">
                    🌸 Lyden N /n/ (Nasal • 鼻音)
                </button>
            </div>
        `;
        controls.querySelector('#toggle-l').onclick = () => {
            activeSoundTarget = 'l';
            renderView();
        };
        controls.querySelector('#toggle-n').onclick = () => {
            activeSoundTarget = 'n';
            renderView();
        };
        wrap.appendChild(controls);

        // Dual Diagrams Grid
        const grid = document.createElement('div');
        grid.className = 'vlk-diagrams-grid';

        // Card 1: Sagittal Profile
        const card1 = document.createElement('div');
        card1.className = 'vlk-diagram-card';
        card1.innerHTML = `
            <div class="vlk-diag-header">
                <div class="vlk-diag-title">Vinkel 1: Profil (Sagittal-snit)</div>
                <div class="vlk-diag-tag" style="background:${activeSoundTarget === 'l' ? 'rgba(56,189,248,0.2)' : 'rgba(244,114,182,0.2)'}; color:${activeSoundTarget === 'l' ? '#38bdf8' : '#f472b6'};">
                    ${activeSoundTarget === 'l' ? 'Lukket til næsen' : 'Åbent til næsen'}
                </div>
            </div>
            <div class="vlk-diag-svg-wrap">
                ${generateSagittalProfileSvg(activeSoundTarget)}
            </div>
            <div class="vlk-diag-notes">
                ${activeSoundTarget === 'l' ? `
                    <strong>Hvorfor lyder det sådan?</strong><br>
                    Tungespidsen rører tandkødsranden i midten, men <strong>ganesejlet er hævet</strong> og spærrer for næsen. Luften må derfor ud gennem munden.
                ` : `
                    <strong>Hvorfor lyder det sådan?</strong><br>
                    Tungen danner en fast barriere i forreste mund. <strong>Ganesejlet er sænket</strong>, så 100% af luften presses op i næsehulen.
                `}
            </div>
        `;
        grid.appendChild(card1);

        // Card 2: Top-Down View
        const card2 = document.createElement('div');
        card2.className = 'vlk-diagram-card';
        card2.innerHTML = `
            <div class="vlk-diag-header">
                <div class="vlk-diag-title">Vinkel 2: Tandbue & tunge (Set oppefra)</div>
                <div class="vlk-diag-tag" style="background:${activeSoundTarget === 'l' ? 'rgba(56,189,248,0.2)' : 'rgba(244,114,182,0.2)'}; color:${activeSoundTarget === 'l' ? '#38bdf8' : '#f472b6'};">
                    ${activeSoundTarget === 'l' ? 'Laterale luftrender' : 'Hermetisk forsegling'}
                </div>
            </div>
            <div class="vlk-diag-svg-wrap">
                ${generateTopDownDentalSvg(activeSoundTarget)}
            </div>
            <div class="vlk-diag-notes">
                ${activeSoundTarget === 'l' ? `
                    <strong>Det laterale hemmelighed:</strong><br>
                    Tungens sider trækkes <em>væk</em> fra kindtænderne. De to blå pile viser, hvordan luften slipper frit ud i siderne af munden som to floder!
                ` : `
                    <strong>Den nasale prop:</strong><br>
                    Tungen presses tæt mod hele den forreste tandbue. Ingen luft kan slippe ud i siderne, hvilket tvinger lyden op i næsen.
                `}
            </div>
        `;
        grid.appendChild(card2);
        wrap.appendChild(grid);

        // Nose Pinch Practical Test
        const pinchCard = document.createElement('div');
        pinchCard.className = 'vlk-pinch-card';
        pinchCard.innerHTML = `
            <div class="vlk-pinch-title">
                <span>👃</span>
                <span>Det praktiske trick: Næse-klemmetricket (捏鼻快速检验法)</span>
            </div>
            <div class="vlk-pinch-body">
                Klem let om dine næsebor med pegefinger og tommelfinger, mens du holder en lang tone:
            </div>
            <div class="vlk-pinch-grid">
                <div class="vlk-pinch-item item-l">
                    <div style="font-weight: 800; color: #38bdf8; margin-bottom: 0.25rem;">Når du siger "Lllll...":</div>
                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                        Lyden <strong>fortsætter fuldstændig uforstyrret</strong>! Fordi luften suser ud i siderne af munden, er det ligegyldigt, at næsen er blokeret.
                    </div>
                </div>
                <div class="vlk-pinch-item item-n">
                    <div style="font-weight: 800; color: #f472b6; margin-bottom: 0.25rem;">Når du siger "Nnnnn...":</div>
                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                        Lyden <strong>stopper øjeblikkeligt med et smæld</strong>! Fordi munden er spærret, og du nu også lukker næsen, kan luften ikke komme ud.
                    </div>
                </div>
            </div>
        `;
        wrap.appendChild(pinchCard);

        // Bilingual Guide (Dansk & Kinesisk)
        const biBox = document.createElement('div');
        biBox.className = 'vlk-bilingual-box';
        biBox.innerHTML = `
            <div class="vlk-bilingual-title">Fonetisk forklaring på kinesisk (中文发音要领)</div>
            <div class="vlk-zh-block">
                <strong>边音 /l/ (丹麦语 L):</strong> 舌尖轻触上齿龈中央，<strong>舌身两侧必须自然下垂，离开上磨牙</strong>。气流由舌头两侧顺畅流出（侧向气流）。软腭升起切断鼻腔通路，发音清脆、无鼻音。<br>
                <strong>鼻音 /n/ (丹麦语 N):</strong> 舌尖及舌边与整个上齿龈形成<strong>完整闭锁</strong>，口腔通路被完全阻断。软腭下垂，气流必须完全经由鼻腔震动流出，具有明显鼻音。
            </div>
            <div class="vlk-da-block">
                💡 <em>Huskeregel for danskkursister:</em> Hvis din tunge rører kindtænderne, når du siger "lys" eller "læse", laver du automatisk et /n/! Sørg for luft i kinderne.
            </div>
        `;
        wrap.appendChild(biBox);
    }

    // --- TAB 2: LISTENING QUIZ (Minimal Pairs) ---
    let currentPairIdx = 0;
    let quizScore = 0;
    let quizAnswered = 0;
    let currentTargetWord = null;

    function renderListeningSection(wrap) {
        const pair = MINIMAL_PAIRS[currentPairIdx];

        // Randomly pick L or N as current target
        if (!currentTargetWord) {
            currentTargetWord = Math.random() < 0.5 ? pair.l : pair.n;
        }

        const quizCard = document.createElement('div');
        quizCard.className = 'vlk-quiz-card';

        quizCard.innerHTML = `
            <div class="vlk-quiz-status-bar">
                <span>Par ${currentPairIdx + 1} af ${MINIMAL_PAIRS.length}</span>
                <span>Score: <strong style="color:#fde68a;">${quizScore}</strong> rigtige af ${quizAnswered}</span>
            </div>

            <div style="font-size: 1.15rem; font-weight: 800; color: #ffffff; margin-bottom: 0.4rem;">
                Hvilket ord hører du? (你听到的是哪个词？)
            </div>
            <div style="font-size: 0.9rem; color: #94a3b8; margin-bottom: 1.4rem;">
                Lyt grundigt til sproglyden: Er det den åbne side-lyd <strong>/l/</strong> eller næselyden <strong>/n/</strong>?
            </div>

            <button type="button" class="vlk-play-sound-btn" id="vlk-play-quiz">
                ${SVG_SPEAKER}
                <span>Lyt til ordet</span>
            </button>

            <div class="vlk-quiz-options">
                <button type="button" class="vlk-quiz-opt" data-word="${pair.l}">
                    <div>${pair.l}</div>
                    <div style="font-size:0.75rem; font-weight:normal; opacity:0.8; margin-top:0.25rem;">${pair.meanL_zh}</div>
                </button>
                <button type="button" class="vlk-quiz-opt" data-word="${pair.n}">
                    <div>${pair.n}</div>
                    <div style="font-size:0.75rem; font-weight:normal; opacity:0.8; margin-top:0.25rem;">${pair.meanN_zh}</div>
                </button>
            </div>

            <div class="vlk-quiz-feedback" id="quiz-feedback"></div>

            <div class="vlk-nav-row">
                <button type="button" class="vlk-nav-btn" id="prev-quiz" ${currentPairIdx === 0 ? 'disabled' : ''}>
                    ← Forrige par
                </button>
                <button type="button" class="vlk-nav-btn" id="next-quiz" style="background:#0284c7; border-color:#38bdf8;">
                    Næste par →
                </button>
            </div>
        `;

        // Play audio
        quizCard.querySelector('#vlk-play-quiz').onclick = () => {
            speakWord(currentTargetWord);
        };

        // Option click
        const fbEl = quizCard.querySelector('#quiz-feedback');
        const optButtons = quizCard.querySelectorAll('.vlk-quiz-opt');

        optButtons.forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.dataset.word;
                const isCorrect = chosen === currentTargetWord;

                optButtons.forEach(b => b.disabled = true);

                quizAnswered++;
                if (isCorrect) {
                    quizScore++;
                    btn.classList.add('correct');
                    fbEl.className = 'vlk-quiz-feedback show success';
                    fbEl.innerHTML = `
                        <strong>Flot hørt! ✅</strong> Du hørte rigtigt ordet <strong>"${currentTargetWord}"</strong>.<br>
                        <span style="font-size:0.85rem; color:#cbd5e1;">${currentTargetWord === pair.l ? 'Dette ord har den åbne /l/-lyd (uden næseklang).' : 'Dette ord har den klangfulde /n/-lyd (med nasal vibration).'}</span>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optButtons.forEach(b => {
                        if (b.dataset.word === currentTargetWord) b.classList.add('correct');
                    });
                    fbEl.className = 'vlk-quiz-feedback show error';
                    fbEl.innerHTML = `
                        <strong>Ikke helt!</strong> Det korrekte ord var <strong>"${currentTargetWord}"</strong>.<br>
                        <span style="font-size:0.85rem; color:#cbd5e1;">Lyt igen, og bemærk om luften kommer ud i kinderne (/l/) eller i næsen (/n/).</span>
                    `;
                }
            };
        });

        // Navigation
        quizCard.querySelector('#prev-quiz').onclick = () => {
            if (currentPairIdx > 0) {
                currentPairIdx--;
                currentTargetWord = null;
                renderView();
            }
        };
        quizCard.querySelector('#next-quiz').onclick = () => {
            if (currentPairIdx < MINIMAL_PAIRS.length - 1) {
                currentPairIdx++;
            } else {
                currentPairIdx = 0; // Loop or finish
            }
            currentTargetWord = null;
            renderView();
        };

        wrap.appendChild(quizCard);
    }

    // --- TAB 3: SPEECH RECOGNITION EXERCISE (Mikrofon) ---
    let speechExerciseIdx = 0;
    let consecutiveSpeechStreak = 0;
    let isSpeechRecording = false;

    function renderSpeechSection(wrap) {
        const ex = SPEECH_EXERCISES[speechExerciseIdx];
        const isL = ex.targetSound === 'l';
        const isN = ex.targetSound === 'n';
        const isContrast = ex.targetSound === 'contrast';

        const speechCard = document.createElement('div');
        speechCard.className = 'vlk-speech-card';

        // Highlight target words in prompt
        let promptHtml = '';
        if (isL) {
            promptHtml = ex.text.split(' ').map(w => `<span class="vlk-target-word word-l">${w}</span>`).join(' ');
        } else if (isN) {
            promptHtml = ex.text.split(' ').map(w => `<span class="vlk-target-word word-n">${w}</span>`).join(' ');
        } else {
            promptHtml = ex.text.split(' ').map(w => {
                const lower = w.toLowerCase();
                if (lower.startsWith('l')) return `<span class="vlk-target-word word-l">${w}</span>`;
                if (lower.startsWith('n')) return `<span class="vlk-target-word word-n">${w}</span>`;
                return w;
            }).join(' ');
        }

        let targetBadge = '';
        if (isL) targetBadge = 'Mållyd: /l/ (3 × L · 边音 L)';
        else if (isN) targetBadge = 'Mållyd: /n/ (3 × N · 鼻音 N)';
        else targetBadge = 'Mållyd: /l/ ↔ /n/ (Pendul · 边鼻切换)';

        let subDesc = '';
        if (isL) subDesc = 'Fokus på L: Åbn tungens sider, ingen luft i næsen!';
        else if (isN) subDesc = 'Fokus på N: Tæt lukke foran, al klang og luft op i næsen!';
        else subDesc = 'Fokus på skiftet: Mærk kontrasten mellem åbne sider (L) og lukket næseklang (N)!';

        speechCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.2rem; font-size:0.88rem; color:#94a3b8;">
                <span>Øvelse ${speechExerciseIdx + 1} af ${SPEECH_EXERCISES.length}</span>
                <span class="vlk-target-word ${isL ? 'word-l' : (isN ? 'word-n' : 'word-l')}" style="font-weight:bold; font-size:0.82rem;">
                    ${targetBadge}
                </span>
            </div>

            <div class="vlk-speech-prompt">${promptHtml}</div>
            <div class="vlk-speech-sub">${subDesc}</div>

            ${consecutiveSpeechStreak > 0 ? `
                <div class="vlk-streak-pill">
                    <span>🔥</span>
                    <span>${consecutiveSpeechStreak} udtalt korrekt i træk!</span>
                </div>
            ` : ''}

            <div class="vlk-mic-row">
                <button type="button" class="vlk-listen-model-btn" id="vlk-speech-listen">
                    ${SVG_SPEAKER}
                    <span>Lyt til udtalen</span>
                </button>
                <button type="button" class="vlk-mic-btn" id="vlk-speech-mic" title="Tryk for at sige sætningen">
                    ${SVG_MIC}
                </button>
            </div>

            <div class="vlk-speech-status" id="vlk-mic-status">
                Tryk på mikrofonen og sig sætningen højt på dansk
            </div>

            <div class="vlk-speech-feedback-box" id="vlk-speech-fb"></div>

            <div style="background:rgba(30,41,59,0.7); border-radius:12px; padding:0.85rem 1rem; margin-top:1.2rem; font-size:0.86rem; color:#cbd5e1; text-align:left;">
                <strong style="color:#fde68a;">Tekniktip:</strong> ${ex.hintDa}<br>
                <span style="color:#94a3b8; font-size:0.82rem;">${ex.hintZh}</span>
            </div>

            <div class="vlk-nav-row">
                <button type="button" class="vlk-nav-btn" id="prev-speech" ${speechExerciseIdx === 0 ? 'disabled' : ''}>
                    ← Forrige øvelse
                </button>
                <button type="button" class="vlk-nav-btn" id="next-speech" style="background:#0284c7; border-color:#38bdf8;">
                    Næste øvelse →
                </button>
            </div>
        `;

        // Listen button
        speechCard.querySelector('#vlk-speech-listen').onclick = () => {
            speakWord(ex.text);
        };

        // Mic logic
        const micBtn = speechCard.querySelector('#vlk-speech-mic');
        const statusEl = speechCard.querySelector('#vlk-mic-status');
        const fbBox = speechCard.querySelector('#vlk-speech-fb');

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            statusEl.innerHTML = `⚠️ Din browser understøtter ikke Web Speech API. Benyt venligst Chrome eller Edge for mikrofontræning.`;
            micBtn.style.opacity = '0.5';
            micBtn.style.cursor = 'not-allowed';
        } else {
            let recognition = new SpeechRecognition();
            recognition.lang = 'da-DK';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            micBtn.onclick = () => {
                if (isSpeechRecording) {
                    try { recognition.stop(); } catch (e) {}
                    return;
                }

                try {
                    recognition.start();
                    isSpeechRecording = true;
                    micBtn.classList.add('listening');
                    statusEl.textContent = 'Lytter... Sig sætningen nu!';
                    statusEl.style.color = '#38bdf8';
                } catch (err) {
                    console.error('Speech recognition start error:', err);
                }
            };

            recognition.onresult = (event) => {
                isSpeechRecording = false;
                micBtn.classList.remove('listening');
                statusEl.textContent = 'Behandler udtale...';

                const transcriptRaw = event.results[0][0].transcript || '';
                const transcript = transcriptRaw.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
                const targetClean = ex.text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
                const targetWordList = ex.targetWords || targetClean.split(' ');

                // Check how many target words were heard
                const matchedWords = targetWordList.filter(w => transcript.includes(w.toLowerCase()));
                const matchRatio = matchedWords.length / targetWordList.length;

                // Match if exact match, or at least 2 of 3 words matched
                const isMatch = transcript === targetClean || matchRatio >= 0.65;
                
                // Specific diagnostic for L vs N confusion
                let confusionDetected = false;
                let confusedWord = '';
                if (isL) {
                    const nReplacements = [
                        { wrong: 'nise', orig: 'lise' },
                        { wrong: 'nisser', orig: 'lise' },
                        { wrong: 'naver', orig: 'laver' },
                        { wrong: 'nasser', orig: 'lasse' },
                        { wrong: 'næser', orig: 'læser' },
                        { wrong: 'nektier', orig: 'lektier' },
                        { wrong: 'nene', orig: 'lene' },
                        { wrong: 'nåner', orig: 'låner' },
                        { wrong: 'nygten', orig: 'lygten' },
                        { wrong: 'ninsesuppe', orig: 'linsesuppe' }
                    ];
                    for (const r of nReplacements) {
                        if (transcript.includes(r.wrong)) {
                            confusionDetected = true;
                            confusedWord = `"${r.wrong}" i stedet for "${r.orig}"`;
                            break;
                        }
                    }
                } else if (isN) {
                    const lReplacements = [
                        { wrong: 'lisse', orig: 'nisse' },
                        { wrong: 'lissens', orig: 'nissens' },
                        { wrong: 'læse', orig: 'næse' },
                        { wrong: 'lyser', orig: 'nyser' },
                        { wrong: 'lanna', orig: 'nanna' },
                        { wrong: 'lapper', orig: 'napper' },
                        { wrong: 'lødder', orig: 'nødder' },
                        { wrong: 'li', orig: 'ni' },
                        { wrong: 'lynner', orig: 'nynner' }
                    ];
                    for (const r of lReplacements) {
                        if (transcript.includes(r.wrong)) {
                            confusionDetected = true;
                            confusedWord = `"${r.wrong}" i stedet for "${r.orig}"`;
                            break;
                        }
                    }
                }

                fbBox.className = 'vlk-speech-feedback-box show';

                if (isMatch) {
                    consecutiveSpeechStreak++;
                    statusEl.textContent = 'Godt gået! Rigtig udtale.';
                    statusEl.style.color = '#86efac';
                    fbBox.style.borderColor = '#22c55e';
                    fbBox.innerHTML = `
                        <div class="vlk-feedback-heard" style="color:#86efac;">
                            ✅ Rigtigt! Vi hørte: "${transcriptRaw}"
                        </div>
                        <div class="vlk-feedback-tip">
                            ${isL ? 'Perfekt kontrol over <strong>/l/</strong>! Du lod luften glide frit ud af mundens sider uden nasal resonans.' : 
                              (isN ? 'Flot <strong>/n/</strong>! Du forseglede mundhulen og sendte klangen rent op i næsen.' : 
                              'Super flot styring af skiftet mellem lateral /l/ og nasal /n/!')}
                        </div>
                    `;
                } else if (confusionDetected) {
                    consecutiveSpeechStreak = 0;
                    statusEl.textContent = 'Fonetisk forveksling opdaget.';
                    statusEl.style.color = '#f87171';
                    fbBox.style.borderColor = '#ef4444';
                    fbBox.innerHTML = `
                        <div class="vlk-feedback-heard" style="color:#fca5a5;">
                            ⚠️ Vi opfangede: ${confusedWord}
                        </div>
                        <div class="vlk-feedback-tip">
                            ${isL ? `
                                <strong>Du kom til at bruge N-lyd!</strong><br>
                                Tungen lukkede tæt for hele munden, så klangen slap op i næsen.<br>
                                <em>Tip:</em> Sænk tungens sider fra kindtænderne, så du mærker luften passere ud i kinderne!
                            ` : `
                                <strong>Du kom til at bruge L-lyd!</strong><br>
                                Luften slap ud i munden i stedet for i næsen.<br>
                                <em>Tip:</em> Forsegl tungen helt tæt til tandkødsranden foran, så luften tvinges op i næsen!
                            `}
                        </div>
                    `;
                } else {
                    consecutiveSpeechStreak = 0;
                    statusEl.textContent = 'Prøv igen.';
                    statusEl.style.color = '#e2e8f0';
                    fbBox.style.borderColor = '#eab308';
                    fbBox.innerHTML = `
                        <div class="vlk-feedback-heard" style="color:#fde68a;">
                            Vi hørte: "${transcriptRaw}" (Mål: "${ex.text}")
                        </div>
                        <div class="vlk-feedback-tip">
                            Lyt til modeludtalen foroven og gentag i et roligt, distinkt tempo.
                        </div>
                    `;
                }
            };

            recognition.onerror = () => {
                isSpeechRecording = false;
                micBtn.classList.remove('listening');
                statusEl.textContent = 'Kunne ikke opfange lyd. Prøv igen.';
                statusEl.style.color = '#94a3b8';
            };

            recognition.onend = () => {
                isSpeechRecording = false;
                micBtn.classList.remove('listening');
            };
        }

        // Navigation
        speechCard.querySelector('#prev-speech').onclick = () => {
            if (speechExerciseIdx > 0) {
                speechExerciseIdx--;
                renderView();
            }
        };
        speechCard.querySelector('#next-speech').onclick = () => {
            if (speechExerciseIdx < SPEECH_EXERCISES.length - 1) {
                speechExerciseIdx++;
            } else {
                speechExerciseIdx = 0;
            }
            renderView();
        };

        wrap.appendChild(speechCard);
    }

    // Initial render
    renderView();
    container.appendChild(viewContainer);
}
