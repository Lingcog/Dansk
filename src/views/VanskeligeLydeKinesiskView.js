import { getLang } from '../utils/i18n.js';

/**
 * VanskeligeLydeKinesiskView
 * Komplet pædagogisk træningsflade til kinesiske danskkursister.
 * 
 * Formuleret i 100% letforståeligt hverdagssprog uden tunge lingvistiske fagudtryk:
 * 1. L vs. N (Mundvigene mod næsen)
 * 2. Blødt d (Gem tungen bag undertænderne)
 * 3. Dansk r (Kragelyden dybt i halsen: kraa-kraa)
 * 4. Udlyd (Smæk døren i ved konsonanter til sidst)
 */

export function renderVanskeligeLydeKinesiskView(container) {
    container.innerHTML = '';

    // Active state
    let activeModuleId = 'l_vs_n';
    let activeTarget = 'l'; // depends on activeModule
    let activeTab = 'principles'; // 'principles', 'pairs', 'speech'
    
    // Quiz state for Tab 2
    let pairQuizIdx = 0;
    let pairScore = 0;
    let answeredPairs = [];
    
    // Speech recording state for Tab 3
    let speechExerciseIdx = 0;
    let isSpeechRecording = false;
    let consecutiveSpeechStreak = 0;

    // Outer wrapper
    const viewContainer = document.createElement('div');
    viewContainer.className = 'vlk-wrapper';

    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .vlk-wrapper {
            max-width: 1040px;
            margin: 0 auto;
            padding: 1.5rem 1rem 3rem 1rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #f8fafc;
        }

        /* Top Module Tabs */
        .vlk-nav-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.75rem;
            margin-bottom: 1.75rem;
        }

        .vlk-mod-card {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
            position: relative;
            backdrop-filter: blur(8px);
        }

        .vlk-mod-card:hover {
            transform: translateY(-2px);
            border-color: rgba(96, 165, 250, 0.4);
            background: rgba(30, 41, 59, 0.9);
        }

        .vlk-mod-card.active {
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.3) 0%, rgba(30, 41, 59, 0.9) 100%);
            border-color: #3b82f6;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.25);
        }

        .vlk-mod-badge {
            font-size: 0.72rem;
            font-weight: 700;
            text-transform: uppercase;
            padding: 0.2rem 0.55rem;
            border-radius: 9999px;
            display: inline-block;
            margin-bottom: 0.45rem;
            background: rgba(59, 130, 246, 0.2);
            color: #93c5fd;
            border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .vlk-mod-card.active .vlk-mod-badge {
            background: #3b82f6;
            color: #ffffff;
            border-color: #60a5fa;
        }

        .vlk-mod-title-da {
            font-size: 1.15rem;
            font-weight: 800;
            color: #f1f5f9;
            margin-bottom: 0.2rem;
        }

        .vlk-mod-title-zh {
            font-size: 0.88rem;
            color: #94a3b8;
            line-height: 1.3;
        }

        .vlk-mod-card.active .vlk-mod-title-zh {
            color: #cbd5e1;
            font-weight: 600;
        }

        /* Hero Header */
        .vlk-hero {
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 18px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }

        .vlk-hero-title {
            font-size: 1.4rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 0.35rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            flex-wrap: wrap;
        }

        .vlk-hero-sub {
            font-size: 0.95rem;
            color: #94a3b8;
            margin-bottom: 1rem;
            line-height: 1.5;
        }

        /* 3 Main Action Tabs */
        .vlk-tabs-nav {
            display: flex;
            gap: 0.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            padding-bottom: 0.75rem;
            overflow-x: auto;
        }

        .vlk-tab-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            font-size: 0.92rem;
            font-weight: 600;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.15s ease;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .vlk-tab-btn:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.05);
        }

        .vlk-tab-btn.active {
            color: #ffffff;
            background: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.4);
            box-shadow: 0 0 12px rgba(59, 130, 246, 0.2);
        }

        /* Target Sub-Selector (Radio-like pills) */
        .vlk-sub-controls {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin: 1.25rem 0 1.5rem 0;
            flex-wrap: wrap;
            background: rgba(15, 23, 42, 0.5);
            padding: 0.75rem 1rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .vlk-sub-label {
            font-size: 0.88rem;
            font-weight: 700;
            color: #cbd5e1;
        }

        .vlk-sub-btn {
            padding: 0.5rem 1.1rem;
            border-radius: 9999px;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(30, 41, 59, 0.8);
            color: #94a3b8;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }

        .vlk-sub-btn:hover {
            background: rgba(51, 65, 85, 0.9);
            color: #ffffff;
        }

        .vlk-sub-btn.active-primary {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: #ffffff;
            border-color: #38bdf8;
            box-shadow: 0 0 15px rgba(56, 189, 248, 0.35);
        }

        .vlk-sub-btn.active-secondary {
            background: linear-gradient(135deg, #db2777 0%, #be185d 100%);
            color: #ffffff;
            border-color: #f472b6;
            box-shadow: 0 0 15px rgba(244, 114, 182, 0.35);
        }

        /* Diagram Grid */
        .vlk-diagram-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 1.25rem;
            margin-bottom: 1.5rem;
        }

        .vlk-diagram-card {
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(8px);
        }

        .vlk-diagram-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
        }

        .vlk-diagram-title {
            font-size: 0.98rem;
            font-weight: 700;
            color: #f1f5f9;
        }

        .vlk-diagram-tag {
            font-size: 0.72rem;
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            font-weight: 600;
        }

        .vlk-svg-wrapper {
            background: #0f172a;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            min-height: 280px;
        }

        .vlk-svg-wrapper svg,
        .vlk-diag-svg {
            width: 100%;
            height: 280px;
            max-height: 280px;
            display: block;
        }

        .vlk-diagram-notes {
            margin-top: 0.85rem;
            font-size: 0.85rem;
            line-height: 1.5;
            color: #cbd5e1;
            background: rgba(15, 23, 42, 0.4);
            padding: 0.75rem 0.85rem;
            border-radius: 10px;
            border-left: 3px solid #38bdf8;
        }

        /* Practical Pinch Test Card */
        .vlk-pinch-card {
            background: linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%);
            border: 1px solid rgba(96, 165, 250, 0.3);
            border-radius: 16px;
            padding: 1.25rem 1.5rem;
            margin-bottom: 1.5rem;
        }

        .vlk-pinch-title {
            font-size: 1.1rem;
            font-weight: 800;
            color: #93c5fd;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }

        .vlk-pinch-body {
            font-size: 0.92rem;
            line-height: 1.6;
            color: #e2e8f0;
            margin-bottom: 0.75rem;
        }

        .vlk-pinch-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 0.75rem;
        }

        .vlk-pinch-item {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 0.75rem 1rem;
        }

        /* Bilingual Guide Card */
        .vlk-bilingual-card {
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1.25rem 1.5rem;
            margin-bottom: 1.5rem;
        }

        .vlk-bilingual-title {
            font-size: 1.05rem;
            font-weight: 700;
            color: #fde047;
            margin-bottom: 0.6rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .vlk-zh-block {
            font-size: 0.9rem;
            line-height: 1.65;
            color: #e2e8f0;
            margin-bottom: 0.75rem;
        }

        .vlk-da-block {
            font-size: 0.86rem;
            line-height: 1.5;
            color: #94a3b8;
            font-style: italic;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 0.5rem;
        }

        /* Minimal Pairs (Tab 2) */
        .vlk-quiz-container {
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.5rem;
            text-align: center;
        }

        .vlk-quiz-progress {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.88rem;
            color: #94a3b8;
            margin-bottom: 1rem;
        }

        .vlk-quiz-score-pill {
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
            border: 1px solid rgba(34, 197, 94, 0.3);
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-weight: 700;
        }

        .vlk-listen-btn-big {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: #ffffff;
            border: none;
            padding: 1rem 2rem;
            border-radius: 14px;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.35);
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            margin: 1.25rem 0 2rem 0;
        }

        .vlk-listen-btn-big:hover {
            transform: scale(1.03);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
        }

        .vlk-quiz-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
            max-width: 600px;
            margin: 0 auto 1.5rem auto;
        }

        .vlk-pair-choice-btn {
            background: rgba(15, 23, 42, 0.7);
            border: 2px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
            padding: 1.25rem 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            color: #ffffff;
        }

        .vlk-pair-choice-btn:hover {
            border-color: #60a5fa;
            background: rgba(30, 41, 59, 0.9);
            transform: translateY(-2px);
        }

        .vlk-pair-word {
            font-size: 1.6rem;
            font-weight: 900;
            margin-bottom: 0.3rem;
            letter-spacing: 0.5px;
        }

        .vlk-pair-meaning {
            font-size: 0.85rem;
            color: #94a3b8;
        }

        .vlk-quiz-feedback {
            font-size: 1rem;
            font-weight: 700;
            padding: 0.75rem 1.25rem;
            border-radius: 12px;
            margin-top: 1rem;
            display: none;
        }

        /* Speech Recognition (Tab 3) */
        .vlk-speech-card {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.5rem;
            text-align: center;
        }

        .vlk-speech-meta-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.88rem;
            color: #94a3b8;
            margin-bottom: 1.25rem;
        }

        .vlk-speech-prompt {
            font-size: 1.65rem;
            font-weight: 900;
            color: #ffffff;
            margin: 1.25rem 0 0.5rem 0;
            line-height: 1.35;
        }

        .vlk-target-word {
            display: inline-block;
            padding: 0.15rem 0.4rem;
            border-radius: 6px;
            font-weight: 900;
        }

        .vlk-target-word.word-primary {
            background: rgba(56, 189, 248, 0.25);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.4);
        }

        .vlk-target-word.word-secondary {
            background: rgba(244, 114, 182, 0.25);
            color: #f472b6;
            border: 1px solid rgba(244, 114, 182, 0.4);
        }

        .vlk-speech-sub {
            font-size: 0.95rem;
            color: #cbd5e1;
            margin-bottom: 1.5rem;
        }

        .vlk-streak-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(245, 158, 11, 0.2);
            color: #fbbf24;
            border: 1px solid rgba(245, 158, 11, 0.35);
            padding: 0.3rem 0.85rem;
            border-radius: 9999px;
            font-weight: 800;
            font-size: 0.88rem;
            margin-bottom: 1rem;
        }

        .vlk-mic-row {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.25rem;
            margin: 1.5rem 0;
        }

        .vlk-listen-model-btn {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #cbd5e1;
            padding: 0.85rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .vlk-listen-model-btn:hover {
            color: #ffffff;
            border-color: #60a5fa;
            background: rgba(30, 41, 59, 0.9);
        }

        .vlk-mic-btn {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            border: 3px solid rgba(255, 255, 255, 0.2);
            color: #ffffff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 25px rgba(239, 68, 68, 0.4);
            transition: all 0.2s ease;
        }

        .vlk-mic-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.6);
        }

        .vlk-mic-btn.listening {
            animation: pulse-ring 1.4s infinite;
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            box-shadow: 0 0 35px rgba(34, 197, 94, 0.7);
        }

        @keyframes pulse-ring {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
            70% { transform: scale(1.06); box-shadow: 0 0 0 16px rgba(34, 197, 94, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        .vlk-speech-status {
            font-size: 0.92rem;
            color: #94a3b8;
            min-height: 24px;
            margin-top: 0.5rem;
        }

        .vlk-speech-feedback-box {
            background: rgba(15, 23, 42, 0.7);
            border-radius: 12px;
            padding: 1rem 1.25rem;
            margin-top: 1.25rem;
            text-align: left;
            border-left: 4px solid #3b82f6;
            display: none;
        }

        .vlk-speech-nav-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .vlk-nav-step-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #f1f5f9;
            padding: 0.6rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
        }

        .vlk-nav-step-btn:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.15);
            border-color: #94a3b8;
        }

        .vlk-nav-step-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
    `;
    viewContainer.appendChild(styleEl);

    // Audio synthesizer helper
    function playAudio(text, rate = 0.85) {
        if (!('speechSynthesis' in window)) {
            alert('Din browser understøtter ikke Web Speech API.');
            return;
        }
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'da-DK';
        utter.rate = rate;
        window.speechSynthesis.speak(utter);
    }

    // --- SOUND MODULES CONFIGURATION ---
    const SOUND_MODULES = [
        {
            id: 'l_vs_n',
            titleDa: 'L vs. N (Mundvigene mod næsen)',
            titleZh: 'L-音 vs. N-音（两颊吹风 vs. 鼻子哼音）',
            badge: '核心对比',
            status: 'active',
            descDa: 'L-lyd: Tungespidsen er oppe, men luften suser frit ud af begge mundvige. N-lyd: Munden er helt lukket foran, og al luften presses ud igennem næsen. På dansk er forskellen afgørende: "læse" vs. "næse", "lys" vs. "nys".',
            descZh: 'L-音：舌尖在上方门牙后，气流从两颊和嘴角呼呼吹出；N-音：嘴巴前沿完全闭死，气流全部被迫由鼻腔震动发出。在丹麦语中绝对不可混淆（如 læse 读 vs. næse 鼻子）。',
            heroTitleZh: '中国学习者核心难点：L-音（两颊吹风）vs. N-音（鼻子哼音）',
            heroSubZh: '掌握发音机关：L 音两颊通气流出，N 音按住鼻子有强烈震动！'
        },
        {
            id: 'bloedt_d',
            titleDa: 'Blødt d (Gem tungen bag undertænderne)',
            titleZh: '软 d（舌尖贴紧下门牙背）',
            badge: '核心难点',
            status: 'active',
            descDa: 'Lad tungespidsen hvile fladt mod bagsiden af undertænderne – rør aldrig ganen! Det bløde d findes i "mad", "brød" og "hvid". Løfter du tungen op, lyder det som et L (så "brød" forveksles med "brøl").',
            descZh: '黄金口诀：舌尖放平贴紧下门牙背面，千万不要碰上牙！让气流如轻风平滑滑出。若舌头往上碰，就会错把 brød（面包）念成 brøl（狮子吼叫）！',
            heroTitleZh: '中国学习者核心难点：丹麦语软 d 专项突破',
            heroSubZh: '舌尖放平在下牙背面，让气流如微风滑过，绝不是 L，更不是硬 D！'
        },
        {
            id: 'dansk_r',
            titleDa: 'Dansk r (Kragelyden dybt i halsen)',
            titleZh: '丹麦语 r 音（深喉乌鸦叫声 kraa-kraa）',
            badge: '深喉发音',
            status: 'active',
            descDa: 'Helt nede bagerst i halsen – som når en krage skriger kraa, eller som en tør gurglelyd. Tungespidsen ligger fladt og sover nede i munden (ingen opad-krøllet kinesisk r som i "rén").',
            descZh: '丹麦语 r 根本不卷舌！发音就像乌鸦“kraa-kraa”叫一样，在喉咙最深处振动。舌尖彻底放松放平躺在嘴底，千万别像汉语拼音“人 rén”那样向上卷舌！',
            heroTitleZh: '中国学习者喉音难点：丹麦语 r 就像乌鸦叫 “kraa-kraa”！',
            heroSubZh: '喉咙深处振动发声，舌头完全放平，摆脱汉语卷舌音干扰'
        },
        {
            id: 'udlyd',
            titleDa: 'Udlyd (-st, -lt, -kt: Smæk døren i!)',
            titleZh: '词尾收尾（像关门一样立刻刹车）',
            badge: '果断断音',
            status: 'active',
            descDa: 'Flere hårde lyde i træk til sidst (-st, -lt, -kt), som skal lukkes brat, som at smække en dør! Pas på ikke at hænge en lille ekstra "e"-lyd på enden af ordet (sig "koldt" – ikke "kold-te").',
            descZh: '词尾遇到连着的辅音（如 -lt, -st, -kt 如 koldt, fast），必须像关门一样立刻刹车断音！绝不能拖泥带水多念一口气变成“koldt-e”或“fast-e”。',
            heroTitleZh: '中国学习者结构难点：词尾辅音收尾，像关门一样立刻刹车！',
            heroSubZh: '干净利落断音收尾，既不漏掉尾音，也绝不多带多余的“-e”尾巴'
        },
        {
            id: 'stumme_lyde',
            titleDa: 'Fraværet af lyde (mand, kage, hvad)',
            titleZh: '声音的隐形：不发音的字母',
            badge: '隐形发音',
            status: 'active',
            descDa: 'Mange bogstaver på dansk er tavse passagerer: d i "mand" og "finde", g i "kage" og "søge", samt h i "hvad" og "hjem". Forsøg aldrig at udtale alt, hvad du ser skrevet!',
            descZh: '中国学生最大的心理陷阱：习惯了汉语拼音“见字必须读音”。但在丹麦语中，大量写在纸上的字母完全不发音！mand 读作 man（没有 d）、kage 里的 g 融化成元音（没有硬 g 哥）、hvad 里的 h 隐形（直接从 v 开始）。绝不能见字必读！',
            heroTitleZh: '中国学习者最大陷阱：声音的隐形与“不发音”的字母',
            heroSubZh: '字母只是沉睡的乘客！突破 mand（无 d）、kage（无硬 g）、hvad（无 h）'
        }
    ];

    // --- MODULE DATA DICTIONARIES ---
    const MODULE_DATA = {
        l_vs_n: {
            defaultTarget: 'l',
            subControls: {
                labelZh: '选择要探索的发音：',
                options: [
                    { id: 'l', label: '🌊 L-音：两颊吹风', sub: '(舌尖在门牙后)', activeClass: 'active-primary' },
                    { id: 'n', label: '🌸 N-音：鼻子震动', sub: '(嘴巴封死，鼻腔出气)', activeClass: 'active-secondary' }
                ]
            },
            diagCard1: (target) => {
                const isL = target === 'l';
                return {
                    title: 'Billede 1: Set fra siden (Profil) / 侧面剖面图',
                    tag: isL ? 'Slank aflang tunge • Lille kontaktpunkt' : 'Bred kontaktflade • Munden forseglet',
                    tagStyle: isL ? 'background:rgba(56,189,248,0.2); color:#38bdf8;' : 'background:rgba(244,114,182,0.2); color:#f472b6;',
                    svg: generateSagittalProfileSvg(target),
                    notes: isL 
                        ? '<strong>L-lyd: Aflang tunge og lille berøringspunkt:</strong><br>Tungen strækker sig og bliver <strong>slank og aflang</strong>. Kun den yderste tungespids berører et lille punkt lige bag de øverste fortænder (gul prik). Tungen er sænket i siderne, næsen er lukket af, og luften strømmer frit ud af munden.'
                        : '<strong>N-lyd: Stor bred kontaktflade og lukket mund:</strong><br>I modsætning til L presses en <strong>langt større del af tungen fladt op mod ganen</strong> og danner en tæt rød prop. Munden er spærret foran! Ganesejlet hænger ned, og 100% af luften presses ud gennem næsen.'
                };
            },
            diagCard2: (target) => {
                const isL = target === 'l';
                return {
                    title: 'Billede 2: Set forfra i spejlet / 镜子正面口型',
                    tag: isL ? 'Begge mundvige er helt åbne ➔' : 'Munden lukket • Luften ud af næsen ⬆️',
                    tagStyle: isL ? 'background:rgba(56,189,248,0.2); color:#38bdf8;' : 'background:rgba(244,114,182,0.2); color:#f472b6;',
                    svg: generateFrontalMirrorSvg(target),
                    notes: isL
                        ? '<strong>Kig i spejlet på dine mundvige:</strong><br>Tungespidsen er oppe bag fortænderne i midten, men <strong>siderne af tungen hænger helt afslappet ned</strong>. Der er to store åbne passager ved kinderne, så luften blæser frit ud af begge mundvige. Klemmer du for næsen, lyder L 100% uændret!'
                        : '<strong>Spejlbilledet for N:</strong><br>Tungen dækker hele overkæben foran. Munden er hermetisk forseglet – der slipper ikke en dråbe luft ud af mundvigene. Al luft presses op i næsen. Klemmer du for næsen, stopper lyden øjeblikkeligt med et ryk!'
                };
            },
            pinchCardHtml: `
                <div class="vlk-pinch-title">
                    <span>👃</span>
                    <span>实用自检绝招：捏住鼻子测试法（一秒测出是 L 还是 N）</span>
                </div>
                <div class="vlk-pinch-body">
                    用食指和拇指捏紧鼻孔，同时发出持续的长音：
                </div>
                <div class="vlk-pinch-grid">
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #38bdf8; margin-bottom: 0.25rem;">当你发 "Lllll..." 时：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            Tungespidsen er oppe, men luften suser frit ud af begge mundvige. Lyden er <strong>100% uændret og ren</strong>, selv når du klemmer for næsen!
                        </div>
                    </div>
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #f472b6; margin-bottom: 0.25rem;">当你发 "Nnnnn..." 时：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            Munden er helt lukket foran, og al luften presses ud igennem næsen. Klemmer du om næsen, <strong>stopper lyden øjeblikkeligt med et ryk</strong>!
                        </div>
                    </div>
                </div>
            `,
            bilingualGuideHtml: `
                <div class="vlk-bilingual-title">中文发音核心要诀 (Foretrukne råd)</div>
                <div class="vlk-zh-block">
                    <strong>L-音（两颊出风）：</strong>Tungespidsen rammer lige bag de øverste fortænder, men luften suser frit ud af begge mundvige. Næsen er lukket af.<br>
                    <strong>N-音（鼻子震动）：</strong>Munden er helt lukket foran, og al luften presses ud igennem næsen. Klemmer du for næsen, stopper lyden med det samme.
                </div>
                <div class="vlk-da-block">
                    💡 <em>Pædagogisk råd:</em> Pas på, at tungen ikke rører kindtænderne på "læse" og "lys". Slap af i kinderne, så luften blæser frit ud i mundvigene!
                </div>
            `,
            minimalPairs: [
                { l: 'læse', n: 'næse', contextL: 'Hun vil læse en bog', contextN: 'Puds din næse', meanL_zh: '阅读 (læse)', meanN_zh: '鼻子 (næse)' },
                { l: 'lys', n: 'nys', contextL: 'Tænd et lys', contextN: 'Han slog et nys', meanL_zh: '光 / 蜡烛 (lys)', meanN_zh: '喷嚏 (nys)' },
                { l: 'lave', n: 'nave', contextL: 'Vi vil lave mad', contextN: 'Hjulets nave', meanL_zh: '做 / 制作 (lave)', meanN_zh: '轮毂 (nave)' },
                { l: 'lille', n: 'Nille', contextL: 'En lille kat', contextN: 'Pigen hedder Nille', meanL_zh: '小的 (lille)', meanN_zh: '人名 (Nille)' },
                { l: 'lås', n: 'nås', contextL: 'En stærk lås', contextN: 'Bussen kan nås', meanL_zh: '锁 (lås)', meanN_zh: '能赶上 (nås)' },
                { l: 'male', n: 'mane', contextL: 'Male et hus', contextN: 'Mane til ro', meanL_zh: '画画/刷漆 (male)', meanN_zh: '告诫/唤醒 (mane)' },
                { l: 'lam', n: 'nam', contextL: 'Et lille lam', contextN: 'Mums nam nam', meanL_zh: '羊羔 (lam)', meanN_zh: '拟声词 (nam)' },
                { l: 'kold', n: 'kone', contextL: 'Vinteren er kold', contextN: 'Hans søde kone', meanL_zh: '冷的 (kold [l])', meanN_zh: '妻子 (kone [n])' }
            ],
            speechExercises: [
                { text: 'Lise laver linsesuppe', targetSound: 'l', type: 'alliteration', targetWords: ['lise', 'laver', 'linsesuppe'], hintDa: '3 × L! Tungespidsen er oppe, men luften suser frit ud af begge mundvige: Lise - laver - linsesuppe.', hintZh: '连续3个 L 音（Lise - laver - linsesuppe）：舌尖在门牙后，两颊保持完全通气。' },
                { text: 'Nissens næse nyser', targetSound: 'n', type: 'alliteration', targetWords: ['nissens', 'næse', 'nyser'], hintDa: '3 × N! Munden er helt lukket foran, og al luften presses ud igennem næsen: Nissens - næse - nyser.', hintZh: '连续3个 N 音（Nissens - næse - nyser）：舌头封住前沿，全部气流通过鼻腔振动发出。' },
                { text: 'Lasse læser lektier', targetSound: 'l', type: 'alliteration', targetWords: ['lasse', 'læser', 'lektier'], hintDa: '3 × L: Tungespidsen bag fortænderne og fri luft ud ved kinderne: Lasse - læser - lektier.', hintZh: '连续3个 L 音（Lasse - læser - lektier）：气流从两腮冲出。' },
                { text: 'Nanna napper nødder', targetSound: 'n', type: 'alliteration', targetWords: ['nanna', 'napper', 'nødder'], hintDa: '3 × N: Mærk den kraftige snurren i næseryggen ved hvert ord: Nanna - napper - nødder.', hintZh: '连续3个 N 音（Nanna - napper - nødder）：按住鼻翼感受每次发音的鼻腔震颤。' },
                { text: 'Lene låner lygten', targetSound: 'l', type: 'alliteration', targetWords: ['lene', 'låner', 'lygten'], hintDa: '3 × L: Hold munden åben i siderne og lad luften suse frit forbi kinderne.', hintZh: '连续3个 L 音（Lene - låner - lygten）：两边大牙完全离开，两腮透风。' },
                { text: 'Ni nisser nynner', targetSound: 'n', type: 'alliteration', targetWords: ['ni', 'nisser', 'nynner'], hintDa: '3 × N: Luk munden foran med tungen, så al lyd presses ud af næsen.', hintZh: '连续3个 N 音（Ni - nisser - nynner）：发出饱满集中的鼻腔哼鸣。' },
                { text: 'Niels tænder lyset', targetSound: 'contrast', type: 'contrast', targetWords: ['niels', 'lyset'], hintDa: 'Skift hurtigt: Start med lukket mund og næselyd i "Niels", og åbn så straks mundvigene for luften i "lyset"!', hintZh: '快速换位挑战：从 Niels 的闭嘴鼻音，瞬间切换为 lyset 的两颊吹风！' },
                { text: 'Lise pudser næsen', targetSound: 'contrast', type: 'contrast', targetWords: ['lise', 'næsen'], hintDa: 'Skift hurtigt: Start med luft ud i mundvigene i "Lise", og luk så munden helt foran i "næsen"!', hintZh: '快速换位挑战：从 Lise 的两颊通气，立刻切换为 næsen 的封闭鼻子发音！' }
            ]
        },

        bloedt_d: {
            defaultTarget: 'soft_d',
            subControls: {
                labelZh: '选择要探索的发音角度：',
                options: [
                    { id: 'soft_d', label: '🍃 软 d 正确发音', sub: '(舌尖平贴下牙背)', activeClass: 'active-primary' },
                    { id: 'hard_d_vs_l', label: '⚡ 错误发音警示', sub: '(千万不要碰上牙！)', activeClass: 'active-secondary' }
                ]
            },
            diagCard1: (target) => {
                const isSoftD = target === 'soft_d';
                return {
                    title: '视角 1: 侧面看口型（舌头平平躺在底部）',
                    tag: isSoftD ? '舌尖平贴下牙背 • 轻柔滑出' : '错误警示：舌头翘起碰上牙',
                    tagStyle: isSoftD ? 'background:rgba(34,197,94,0.2); color:#4ade80;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateSagittalSoftDSvg(target),
                    notes: isSoftD
                        ? '<strong>Det bløde d:</strong><br><strong>Lad tungespidsen hvile fladt mod bagsiden af undertænderne – rør aldrig ganen!</strong> Tungen ligger helt roligt i bunden af munden, og luften glider blidt og glat ud over tungen som en mild brise.'
                        : '<strong>Typisk fejl:</strong><br>Løfter du tungen op mod de øverste tænder eller ganen, forvandles ordet til et hårdt d eller et L. Så bliver <em>brød</em> til <em>brøl</em>, og <em>mad</em> bliver til <em>mal</em>! Hold tungen nede!'
                };
            },
            diagCard2: (target) => {
                const isSoftD = target === 'soft_d';
                return {
                    title: '视角 2: 正面看上下牙缝隙',
                    tag: isSoftD ? '上下牙留微缝 • 气流平稳吹出' : '错误：舌尖堵死门牙缝隙',
                    tagStyle: isSoftD ? 'background:rgba(34,197,94,0.2); color:#4ade80;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateFrontalSoftDSvg(target),
                    notes: isSoftD
                        ? '<strong>Luften glider frit:</strong><br>Tænderne er en lille smule åbne, og tungen gemmer sig bag de nederste fortænder.'
                        : '<strong>Blokeret udgang:</strong><br>Hvis tungen presses op mod overmunden, lukker du for luften og skaber en hård bump-lyd.'
                };
            },
            pinchCardHtml: `
                <div class="vlk-pinch-title">
                    <span>🪞</span>
                    <span>实用自检绝招：下门牙背面固定舌尖法（一秒纠正舌位）</span>
                </div>
                <div class="vlk-pinch-body">
                    Lad tungespidsen hvile fladt mod bagsiden af undertænderne – rør aldrig ganen!
                </div>
                <div class="vlk-pinch-grid">
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #4ade80; margin-bottom: 0.25rem;">正确发音体验：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            先发 "ma..."，有意识地<strong>把舌尖紧贴住下门牙背面</strong>，不要动！继续让气流滑出："mad..."。舌头完全不向上弹跳。
                        </div>
                    </div>
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #f87171; margin-bottom: 0.25rem;">错误警示体验：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            如果你感觉舌头向上跳了一下碰到了上牙，你读出来的肯定是 "mal"（涂漆）或者硬 "mat"！请立刻把舌头压到下门牙后面。
                        </div>
                    </div>
                </div>
            `,
            bilingualGuideHtml: `
                <div class="vlk-bilingual-title">中文发音核心要诀 (Foretrukne råd)</div>
                <div class="vlk-zh-block">
                    <strong>软 d 的核心秘密：</strong>Lad tungespidsen hvile fladt mod bagsiden af undertænderne – rør aldrig ganen! Det er hverken engelsk "th" eller hårdt d. Lad luften glide blødt ud over tungen.<br>
                    <strong>Undgå L-fejlen:</strong> Pas på ikke at sige "brøl" (løvens brøl) når du mener "brød" (rugbrød)! Hold tungen nede i bunden.
                </div>
                <div class="vlk-da-block">
                    💡 <em>Pædagogisk råd:</em> Lad tungespidsen hvile fladt mod bagsiden af undertænderne – rør aldrig ganen! Sig "ma..." og lad luften glide ud uden at løfte tungen mod overmunden.
                </div>
            `,
            minimalPairs: [
                { l: 'mad', n: 'mal', contextL: 'Vi spiser god mad', contextN: 'Han vil male huset', meanL_zh: '食物 (mad [ð])', meanN_zh: '刷漆/画 (mal [l])' },
                { l: 'brød', n: 'brøl', contextL: 'Friskbagt rugbrød', contextN: 'Løvens høje brøl', meanL_zh: '面包 (brød [ð])', meanN_zh: '吼叫 (brøl [l])' },
                { l: 'hvid', n: 'hvil', contextL: 'En hvid skjorte', contextN: 'Tag et lille hvil', meanL_zh: '白色 (hvid [ð])', meanN_zh: '休息 (hvil [l])' },
                { l: 'gade', n: 'gale', contextL: 'Bo på samme gade', contextN: 'De gale hunde', meanL_zh: '街道 (gade [ð])', meanN_zh: '疯狂的 (gale [l])' },
                { l: 'rød', n: 'rør', contextL: 'En rød cykel', contextN: 'Rør ved mig', meanL_zh: '红色 (rød [ð])', meanN_zh: '管子/触摸 (rør [ɐ̯])' },
                { l: 'bade', n: 'bale', contextL: 'Bade i havet', contextN: 'Bale med tunge kasser', meanL_zh: '洗澡/游泳 (bade [ð])', meanN_zh: '搬动挣扎 (bale [l])' },
                { l: 'sidde', n: 'silde', contextL: 'Sidde på stolen', contextN: 'Komme silde (for sent)', meanL_zh: '坐下 (sidde [ð])', meanN_zh: '迟晚 (silde [l])' },
                { l: 'lød', n: 'løn', contextL: 'Det lød smukt', contextN: 'Få en god løn', meanL_zh: '听起来 (lød [ð])', meanN_zh: '工资 (løn [n])' }
            ],
            speechExercises: [
                { text: 'Mads spiser varm mad', targetSound: 'ð', type: 'alliteration', targetWords: ['mads', 'spiser', 'mad'], hintDa: 'Lad tungespidsen hvile fladt mod bagsiden af undertænderne – rør aldrig ganen i "Mads" og "mad"!', hintZh: '“Mads” 和 “mad”：舌尖牢牢压在下齿背，不可上翘碰上牙！' },
                { text: 'Gitte går på gaden', targetSound: 'ð', type: 'alliteration', targetWords: ['gitte', 'går', 'gaden'], hintDa: 'Gaden — en blød, glidende lyd midt i ordet, uden at tungen støder mod overmunden.', hintZh: '“gaden” 词中的软 d：平滑过渡，切勿发出硬磕牙的撞击声。' },
                { text: 'Vi bager hvidt brød', targetSound: 'ð', type: 'alliteration', targetWords: ['bager', 'hvidt', 'brød'], hintDa: 'Hvidt og brød — hold tungen nede i bunden af munden, så du ikke kommer til at sige "brøl"!', hintZh: '“hvidt” 和 “brød”：两处软 d，绝不能读成 “brøl” 边音！' },
                { text: 'En rød båd sejler', targetSound: 'ð', type: 'alliteration', targetWords: ['rød', 'båd', 'sejler'], hintDa: 'Rød og båd — lad luften glide blidt ud, mens tungen hviler bag undertænderne.', hintZh: '“rød” 和 “båd”：轻柔送气，下齿背固舌。' },
                { text: 'Mads vil gerne bade', targetSound: 'ð', type: 'alliteration', targetWords: ['mads', 'gerne', 'bade'], hintDa: 'Mads og bade — slap af i tungen bag undertænderne.', hintZh: '“bade”：双唇微开，舌头贴于下齿背。' },
                { text: 'Sid ned og hvil dig', targetSound: 'contrast', type: 'contrast', targetWords: ['sid', 'hvil'], hintDa: 'Skift op og ned: I "sid" skal tungen hvile bag undertænderne; i "hvil" skal tungen op bag overmunden!', hintZh: '上下换位：“sid” 软 d（舌头向下）切换到 “hvil” 边音 L（舌尖向上）！' },
                { text: 'Hunden bider i maden', targetSound: 'ð', type: 'alliteration', targetWords: ['hunden', 'bider', 'maden'], hintDa: 'Bider og maden — to bløde glidelyde i træk med tungen fladt i bunden.', hintZh: '“bider” 与 “maden”：连贯的两个软 d 发音。' },
                { text: 'Maler maden rød og hvid', targetSound: 'contrast', type: 'contrast', targetWords: ['maler', 'maden', 'rød', 'hvid'], hintDa: 'Maler maden rød og hvid — pas på! I "maler" skal tungen op bag overmunden, men i "maden rød og hvid" skal tungen straks ned og hvile bag undertænderne!', hintZh: '终极挑战：Maler（舌头向上 L）紧接3个软 d 单词（maden rød hvid，舌尖贴紧下齿背）！' }
            ]
        },

        dansk_r: {
            defaultTarget: 'danish_r',
            subControls: {
                labelZh: '选择要探索的发音角度：',
                options: [
                    { id: 'danish_r', label: '🦅 正确 r 音：乌鸦叫声 kraa-kraa', sub: '(深喉振动，舌头放平)', activeClass: 'active-primary' },
                    { id: 'chinese_r', label: '⚡ 典型错误：向上卷舌', sub: '(切勿学汉语拼音“人”)', activeClass: 'active-secondary' }
                ]
            },
            diagCard1: (target) => {
                const isDanishR = target === 'danish_r';
                return {
                    title: '视角 1: 侧面看口型（喉咙深处发力）',
                    tag: isDanishR ? '喉咙深处发声 • 舌头平放' : '错误警示：舌头向前卷起',
                    tagStyle: isDanishR ? 'background:rgba(250,204,21,0.2); color:#facc15;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateSagittalDanskRSvg(target),
                    notes: isDanishR
                        ? '<strong>Helt nede bagerst i halsen – som når en krage skriger kraa!</strong><br>Lyden laves helt nede bagerst i halsen, præcis som en krage, der skriger hæst <em>"kraa... kraa..."</em>, eller som en tør gurglelyd. <strong>Tungespidsen ligger helt fladt og sover nede i munden</strong> – den rører ingenting!'
                        : '<strong>Pas på med at krølle tungen op:</strong><br>I kinesisk (som i <em>rén</em> 人, <em>rì</em> 日) krøller man tungespidsen opad mod ganen. På dansk skal tungen ligge helt fladt! Hvis du krøller tungen, forsvinder den rigtige dybe halslyd.'
                };
            },
            diagCard2: (target) => {
                const isDanishR = target === 'danish_r';
                return {
                    title: '视角 2: 喉咙深处气流通视',
                    tag: isDanishR ? '深喉共鸣通道开通' : '错误：舌头挡在前面',
                    tagStyle: isDanishR ? 'background:rgba(250,204,21,0.2); color:#facc15;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateThroatRSvg(target),
                    notes: isDanishR
                        ? '<strong>Universelt krageskrig:</strong><br>Krager og ravne over hele verden (også i Mellemøsten og Asien) skriger med netop denne dybe halslyd. På arabisk hedder en krage endda <em>"ghurāb" (غراب)</em>, fordi den starter med netop denne lyd!'
                        : '<strong>Spærret udgang:</strong><br>Hvis du løfter tungespidsen op foran, blokerer du for halsens frie resonans.'
                };
            },
            pinchCardHtml: `
                <div class="vlk-pinch-title">
                    <span>🦅</span>
                    <span>实用自检绝招：乌鸦叫与干漱口测试法（一秒找到喉咙发音点）</span>
                </div>
                <div class="vlk-pinch-body">
                    Helt nede bagerst i halsen – som når en krage skriger kraa, eller som en tør gurglelyd!
                </div>
                <div class="vlk-pinch-grid">
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #facc15; margin-bottom: 0.25rem;">像乌鸦叫一样发音：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            Sig som en krage: <strong>"kraa... kraa..."</strong>. Mærk hvordan det kradser blødt og hæst helt nede bagerst i halsen. Træk følelsen over i ord som "rød", "ris", "rejse"!
                        </div>
                    </div>
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #38bdf8; margin-bottom: 0.25rem;">舌尖平躺防卷：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            Lad tungespidsen sove helt fladt i bunden af munden! Mærker du spidsen røre overmunden eller krølle op som i "rén", så slap helt af i tungen.
                        </div>
                    </div>
                </div>
            `,
            bilingualGuideHtml: `
                <div class="vlk-bilingual-title">中文发音核心要诀 (Foretrukne råd)</div>
                <div class="vlk-zh-block">
                    <strong>丹麦语 r 音的秘密：</strong>Helt nede bagerst i halsen – som når en krage skriger kraa, eller som en tør gurglelyd. 它的发音点完全在<strong>喉咙最深处</strong>。<br>
                    <strong>舌头千万别动：</strong>舌头平平地躺在嘴底睡觉。切勿像汉语“人 rén、日 rì”那样把舌头往上卷！
                </div>
                <div class="vlk-da-block">
                    💡 <em>Pædagogisk råd:</em> Helt nede bagerst i halsen – som når en krage skriger kraa, eller som en tør gurglelyd. Lad tungespidsen sove fladt nede i munden!
                </div>
            `,
            minimalPairs: [
                { l: 'rive', n: 'live', contextL: 'Rive i haven med riven', contextN: 'Se fodboldkampen live', meanL_zh: '耙地/撕裂 (rive [ʁ])', meanN_zh: '现场直播 (live [l])' },
                { l: 'ret', n: 'let', contextL: 'En lækker ret mad', contextN: 'En let og nem opgave', meanL_zh: '菜肴/正确 (ret [ʁ])', meanN_zh: '容易/轻的 (let [l])' },
                { l: 'rød', n: 'død', contextL: 'En rød cykel', contextN: 'Blomsten er død', meanL_zh: '红色的 (rød [ʁ])', meanN_zh: '死亡的 (død [d])' },
                { l: 'rose', n: 'lose', contextL: 'En smuk rød rose', contextN: 'Lose et vigtigt spil', meanL_zh: '玫瑰花 (rose [ʁ])', meanN_zh: '输掉比赛 (lose [l])' },
                { l: 'rende', n: 'lande', contextL: 'Rende stærkt', contextN: 'Flyet vil lande', meanL_zh: '奔跑飞奔 (rende [ʁ])', meanN_zh: '着陆降落 (lande [l])' },
                { l: 'rakke', n: 'lakke', contextL: 'Rakke ned på andre', contextN: 'Lakke mod enden', meanL_zh: '贬低贬损 (rakke [ʁ])', meanN_zh: '接近尾声 (lakke [l])' },
                { l: 'ringe', n: 'linge', contextL: 'Ringe med telefonen', contextN: 'Linge med snor', meanL_zh: '打电话/戒指 (ringe [ʁ])', meanN_zh: '绳结束缚 (linge [l])' },
                { l: 'rask', n: 'vask', contextL: 'Sund og rask person', contextN: 'Vask dine hænder', meanL_zh: '健康的 (rask [ʁ])', meanN_zh: '洗手/水池 (vask [v])' }
            ],
            speechExercises: [
                { text: 'Rikke rider på hesten', targetSound: 'ʁ', type: 'alliteration', targetWords: ['rikke', 'rider', 'hesten'], hintDa: 'Helt nede bagerst i halsen – som når en krage skriger kraa! Lad tungespidsen sove fladt nede i munden i "Rikke rider på hesten".', hintZh: '像乌鸦叫声一样在喉咙深处发音：Rikke rider，舌尖完全放平。' },
                { text: 'Rene roser i regnen', targetSound: 'ʁ', type: 'alliteration', targetWords: ['rene', 'roser', 'regnen'], hintDa: '3 × r dybt i halsen: Rene, roser, regnen — ingen opad-krøllet tunge som i kinesisk "rén"!', hintZh: '连续三个深喉 r 音（Rene - roser - regnen）：舌尖平放放松，深喉送气。' },
                { text: 'Rune ringer til Rita', targetSound: 'ʁ', type: 'alliteration', targetWords: ['rune', 'ringer', 'rita'], hintDa: 'Tre r-lyde i træk dybt i halsen: Rune ringer til Rita.', hintZh: '深喉乌鸦发音挑战（Rune - ringer - Rita）。' },
                { text: 'Lasse og Rikke løber', targetSound: 'contrast', type: 'contrast', targetWords: ['lasse', 'rikke', 'løber'], hintDa: 'Skift fra forsiden til halsen: "Lasse" laves foran bag fortænderne, mens "Rikke" laves dybt i halsen som kragen!', hintZh: '前后换位：Lasse（门牙后 L）➔ Rikke（深喉 r）➔ løber（门牙后 L）！' },
                { text: 'Røde ræve i skoven', targetSound: 'ʁ', type: 'alliteration', targetWords: ['røde', 'ræve', 'skoven'], hintDa: 'Røde ræve — mærk den hæse kragelyd dybt i halsen ved begge ord.', hintZh: 'Røde ræve：喉咙深处微弱摩擦，舌头平放。' },
                { text: 'Rene river græsset', targetSound: 'ʁ', type: 'alliteration', targetWords: ['rene', 'river', 'græsset'], hintDa: 'Rene river græsset — lad halsen lave arbejdet, mens tungen hviler fladt.', hintZh: 'Rene river：深喉自然发力，切勿卷舌。' },
                { text: 'Rasmus vil gerne rive', targetSound: 'contrast', type: 'contrast', targetWords: ['rasmus', 'rive'], hintDa: 'Skift hurtigt: Kragelyd dybt i halsen i "rive", men tungen op bag overmunden i "live"!', hintZh: '深喉与前门牙对比练习。' },
                { text: 'Ride en tur på hesten', targetSound: 'contrast', type: 'contrast', targetWords: ['ride'], hintDa: 'Skift hurtigt: Kragelyd dybt i halsen i "ride", men tungen op bag overmunden i "lide"!', hintZh: '深喉 r 与前门牙 l 辨析。' }
            ]
        },

        udlyd: {
            defaultTarget: 'clean_cluster',
            subControls: {
                labelZh: '选择要探索的发音角度：',
                options: [
                    { id: 'clean_cluster', label: '🧱 正确收尾：关门断音', sub: '(像关门一样立刻刹车)', activeClass: 'active-primary' },
                    { id: 'vowel_error', label: '⚡ 典型错误：多带尾音', sub: '(切勿拖泥带水多念“-e”)', activeClass: 'active-secondary' }
                ]
            },
            diagCard1: (target) => {
                const isClean = target === 'clean_cluster';
                return {
                    title: '视角 1: 几个声音连着收尾，立刻刹车',
                    tag: isClean ? '声音到位 • 立即刹车' : '错误警示：多念了一口气',
                    tagStyle: isClean ? 'background:rgba(34,197,94,0.2); color:#4ade80;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateClusterTimingSvg(target),
                    notes: isClean
                        ? '<strong>Flere hårde lyde i træk til sidst:</strong><br>Flere hårde lyde i træk til sidst (-st, -lt, -kt), som skal lukkes brat, som at smække en dør! I "koldt" glider munden fra o til l og smækker så t-døren i med det samme. Ikke en millimeter mere lyd!'
                        : '<strong>Pas på den ekstra "e"-lyd på enden:</strong><br>Pas på ikke at hænge en lille ekstra "e"-lyd på enden af ordet (sig "koldt" – ikke "kold-te")! Mange kommer til at åbne munden lidt igen efter t-lyden og puster et ekstra "e" ud. Det forvirrer danskere og ændrer grammatikken!'
                };
            },
            diagCard2: (target) => {
                const isClean = target === 'clean_cluster';
                return {
                    title: '视角 2: Lydbølgen stopper brat',
                    tag: isClean ? 'Klippet over med en saks' : 'Lyd der slæber bagefter',
                    tagStyle: isClean ? 'background:rgba(34,197,94,0.2); color:#4ade80;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateWaveformStopSvg(target),
                    notes: isClean
                        ? '<strong>Brat stop:</strong><br>Lyden stopper som klippet over med en saks. Der er helt stille bagefter.'
                        : '<strong>Slæbende hale:</strong><br>Hvis man ikke lukker munden tæt, hænger der en lille irriterende restlyd bagefter.'
                };
            },
            pinchCardHtml: `
                <div class="vlk-pinch-title">
                    <span>✋</span>
                    <span>实用自检绝招：手掌阻风闭气法（一秒测出是否多带尾音）</span>
                </div>
                <div class="vlk-pinch-body">
                    Hold hånden 2-3 cm foran munden:
                </div>
                <div class="vlk-pinch-grid">
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #4ade80; margin-bottom: 0.25rem;">正确停顿检验：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            Flere hårde lyde i træk til sidst, som skal lukkes brat, som at smække en dør! Sig "koldt" eller "fast" – luften skal stoppe prompte uden det mindste pust efter ordet.
                        </div>
                    </div>
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #f87171; margin-bottom: 0.25rem;">多加元音检验：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            Pas på ikke at hænge en lille ekstra "e"-lyd på enden af ordet (sig "koldt" – ikke "kold-te")! Mærker du det mindste lune pust mod hånden bagefter, har du åbnet munden for tidligt.
                        </div>
                    </div>
                </div>
            `,
            bilingualGuideHtml: `
                <div class="vlk-bilingual-title">中文发音核心要诀 (Foretrukne råd)</div>
                <div class="vlk-zh-block">
                    <strong>词尾收音的黄金法则：</strong>Flere hårde lyde i træk til sidst, som skal lukkes brat, som at smække en dør! 汉语的字尾只有元音或 n/ng，所以最容易犯的错误就是读完后嘴巴又松开，多带出一个弱读的“-e”尾音（把 fast 念成 fast-e，把 koldt 念成 kold-te）。<br>
                    <strong>Grammatisk vigtigt:</strong> Den lille t-lyd til sidst fortæller, at det er intetkøn ("et koldt glas") eller datid. Slukker du ikke lyden rent, lyder det som en helt anden bøjning!
                </div>
                <div class="vlk-da-block">
                    💡 <em>Pædagogisk råd:</em> Flere hårde lyde i træk til sidst, som skal lukkes brat, som at smække en dør! Pas på ikke at hænge en lille ekstra "e"-lyd på enden af ordet (sig "koldt" – ikke "kold-te").
                </div>
            `,
            minimalPairs: [
                { l: 'kold', n: 'koldt', contextL: 'En kold dag', contextN: 'Et koldt glas mælk', meanL_zh: '单辅音 -ld (kold [l])', meanN_zh: '复合收音 -ldt (koldt [lˀd])' },
                { l: 'lys', n: 'lyst', contextL: 'Tænd et lys', contextN: 'Et lyst værelse', meanL_zh: '单辅音 -s (lys [s])', meanN_zh: '复合收音 -st (lyst [sd])' },
                { l: 'ven', n: 'vent', contextL: 'Min gode ven', contextN: 'Vent et øjeblik', meanL_zh: '鼻音 -n (ven [n])', meanN_zh: '复合收音 -nt (vent [nˀd])' },
                { l: 'hus', n: 'husk', contextL: 'Et stort hus', contextN: 'Husk dine nøgler', meanL_zh: '单辅音 -s (hus [s])', meanN_zh: '复合收音 -sk (husk [sg])' },
                { l: 'fest', n: 'fed', contextL: 'En sjov fest', contextN: 'Fed mad', meanL_zh: '复合收音 -st (fest [sd])', meanN_zh: '软 d [ð] (fed [ð])' },
                { l: 'salt', n: 'sal', contextL: 'Drys lidt salt', contextN: 'Bo på 2. sal', meanL_zh: '复合收音 -lt (salt [lˀd])', meanN_zh: '单辅音 -l (sal [l])' },
                { l: 'fast', n: 'fad', contextL: 'Et fast job', contextN: 'Et stort fad', meanL_zh: '复合收音 -st (fast [sd])', meanN_zh: '软 d [ð] (fad [ð])' },
                { l: 'saft', n: 'sag', contextL: 'Drik kold saft', contextN: 'En god sag', meanL_zh: '复合收音 -ft (saft [fd])', meanN_zh: '元音收尾 (sag [w/j])' }
            ],
            speechExercises: [
                { text: 'Et koldt glas mælk', targetSound: 'cluster', type: 'cluster', targetWords: ['koldt', 'glas', 'mælk'], hintDa: 'Pas på ikke at hænge en lille ekstra "e"-lyd på enden af ordet: sig "koldt" (ikke "kold-te") og "mælk" (ikke "mælk-e")!', hintZh: 'koldt (-ldt) 与 mælk (-lk)：两次干净闭锁断音，严禁读成 “kold-te”！' },
                { text: 'Husk en fast aftale', targetSound: 'cluster', type: 'cluster', targetWords: ['husk', 'fast', 'aftale'], hintDa: 'Flere hårde lyde i træk til sidst (-sk og -st), som skal lukkes brat, som at smække en dør: Husk en fast aftale!', hintZh: 'husk (-sk) 与 fast (-st)：手掌阻风，瞬间断音。' },
                { text: 'Frisk frugt til frokost', targetSound: 'cluster', type: 'cluster', targetWords: ['frisk', 'frugt', 'frokost'], hintDa: 'Tre ord i træk med skarp afslutning: Frisk - frugt - frokost! Smæk døren i ved hvert ord.', hintZh: '三词连环词尾挑战（frisk - frugt - frokost）！' },
                { text: 'Kold vind og lyst vejr', targetSound: 'contrast', type: 'contrast', targetWords: ['kold', 'lyst'], hintDa: 'Kontrast: "Kold" slutter blødt med tungen i siderne; "lyst" lukkes brat med tænderne som en smækket dør!', hintZh: '单辅音 kold 与复合收音 lyst 切换对比。' },
                { text: 'Katten sidder helt fast', targetSound: 'cluster', type: 'cluster', targetWords: ['helt', 'fast'], hintDa: 'Helt og fast — luk lyden brat og kontant ved begge ord!', hintZh: '“helt” (-lt) 与 “fast” (-st)：干脆利落收声。' },
                { text: 'Kom lidt salt på ægget', targetSound: 'cluster', type: 'cluster', targetWords: ['salt', 'ægget'], hintDa: 'Kom lidt salt på ægget — "salt" lukkes brat med tungen mod fortænderne.', hintZh: '“salt”：在门牙后形成短暂停顿切断。' },
                { text: 'En rigtig god fest i aften', targetSound: 'cluster', type: 'cluster', targetWords: ['rigtig', 'fest', 'aften'], hintDa: 'Fest i aften — smæk døren i ved "-st" i fest.', hintZh: '“fest”：牙关紧闭，气流骤停。' },
                { text: 'Læs en kort tekst højt', targetSound: 'cluster', type: 'cluster', targetWords: ['kort', 'tekst', 'højt'], hintDa: 'Kort tekst højt — to hårde afslutninger i træk (-rt og -kst): stands luften med det samme!', hintZh: '高难度复合词尾：“kort” (-rt) 与 “tekst” (-kst)！' }
            ]
        },

        stumme_lyde: {
            defaultTarget: 'silent_d',
            subControls: {
                labelZh: '选择要探索的隐形字母类型：',
                options: [
                    { id: 'silent_d', label: '👻 Stumt d (mand, vand, finde)', sub: '(Bogstavet d er helt tavst)', activeClass: 'active-primary' },
                    { id: 'silent_g_h', label: '🌫️ Blødt/Stumt g & h (kage, hvad)', sub: '(Smelter til vokal eller forsvinder)', activeClass: 'active-secondary' }
                ]
            },
            diagCard1: (target) => {
                const isSilentD = target === 'silent_d';
                return {
                    title: isSilentD ? '视角 1: Stumt d (Tungen stopper ved N)' : '视角 1: Stumt h (Start direkte på V)',
                    tag: isSilentD ? 'd er usynligt • Stop ved N' : 'h er helt tavst • Start på V',
                    tagStyle: 'background:rgba(168,85,247,0.2); color:#c084fc;',
                    svg: generateSagittalSilentDSvg(target),
                    notes: isSilentD
                        ? '<strong>Bogstavet d er en tavs passager:</strong><br>I ordet <em>"mand"</em> [mænˀ] udtaler du kun m-a-n (med et lille stop i stemmen). Tungen stopper ved n-lyden bag fortænderne. <strong>Lav ALDRIG en ekstra d-lyd til sidst!</strong> Hvis du siger "mand-de", lyder det som to ord.'
                        : '<strong>H foran v og j er 100% stumt:</strong><br>Når du ser ord som <em>"hvad"</em>, <em>"hvem"</em>, <em>"hvor"</em> eller <em>"hjem"</em>, skal du lade som om, bogstavet "h" slet ikke findes! Start direkte på v-lyden: [væð], [vɛm], [vɒː] eller j-lyden [jɛm].'
                };
            },
            diagCard2: (target) => {
                const isSilentD = target === 'silent_d';
                return {
                    title: isSilentD ? '视角 2: Kontrast: Hvad du ser vs. Hvad du siger' : '视角 2: Kage (G smelter til en blød vokal)',
                    tag: isSilentD ? 'Skrift: mand ➔ Tale: [mænˀ]' : 'Intet hårdt "ge" • Glid som [kæːɪ]',
                    tagStyle: 'background:rgba(168,85,247,0.2); color:#c084fc;',
                    svg: generateVisualSilentTextSvg(target),
                    notes: isSilentD
                        ? '<strong>Pinyin-vanen skal aflæres:</strong><br>I kinesisk Pinyin svarer hvert bogstav til en lyd. På dansk har vi 500 års stavehistorie: Bogstaverne står der på skrift, men er faldet i søvn i talesproget. Se igennem dem!'
                        : '<strong>G-lyden efter en vokal:</strong><br>I ord som <em>"kage"</em>, <em>"tage"</em> og <em>"søge"</em> må du ALDRIG lave en hård g-lyd fra halsen som i kinesisk 哥 (gē). G smelter sammen med vokalen og bliver til en blød glidelyd som et "i" eller "j" ([kæːɪ]).'
                };
            },
            pinchCardHtml: `
                <div class="vlk-pinch-title">
                    <span>👆</span>
                    <span>实用自检绝招：手指遮字法（强迫眼睛跳过不发音字母）</span>
                </div>
                <div class="vlk-pinch-body">
                    Læg pegefingeren fysisk hen over det stumme bogstav, når du læser:
                </div>
                <div class="vlk-pinch-grid">
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #c084fc; margin-bottom: 0.25rem;">Stumt d: man[d], van[d], fin[d]e</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            Dæk d'et med fingeren og læs højt: "man", "van", "finne". Hvis din hjerne råber "hov, der står et d!", så husk: <strong>Bogstavet er bare en tavs passager</strong>.
                        </div>
                    </div>
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #38bdf8; margin-bottom: 0.25rem;">Stumt h: [h]vad, [h]vem, [h]vor</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            Dæk h'et med fingeren: Læs ordene direkte som "vad", "vem", "vor" og "jem". Der er absolut ingen h-lyd!
                        </div>
                    </div>
                </div>
            `,
            bilingualGuideHtml: `
                <div class="vlk-bilingual-title">中文发音核心要诀 (Fraværet af lyd)</div>
                <div class="vlk-zh-block">
                    <strong>为什么这是中国人最大的障碍：</strong>汉语普通话的拼音是极其严谨的一对一拼读系统（见 b 读 b，见 d 读 d）。但丹麦语是历史悠久的拼写，经历了几个世纪的“懒人音变”：很多辅音在嘴里慢慢退化、融化甚至彻底消失了！<br>
                    <strong>三大必须装作看不见的字母：</strong><br>
                    1. <strong>词尾 nd 中的 d：</strong>mand 读 man，vand 读 van，land 读 lan。千万别加“-de”！<br>
                    2. <strong>元音后的 g：</strong>kage 读 kæ-i，tage 读 ta，sige 读 si。绝不要发出拼音“哥 gē”的声音！<br>
                    3. <strong>hv- 和 hj- 里的 h：</strong>hvad 读 væð，hvor 读 vo，hjem 读 jæm。h 完全不发音！
                </div>
                <div class="vlk-da-block">
                    💡 <em>Pædagogisk råd:</em> Lær at overhøre og overse de stumme bogstaver. Hvis du prøver at udtale hvert eneste bogstav i "manden spiser en kage", forstår en dansker dig næsten ikke!
                </div>
            `,
            minimalPairs: [
                { l: 'mand', n: 'mande', contextL: 'En flink mand', contextN: 'Mande sig op', meanL_zh: '男人 (mand [mænˀ] - stumt d)', meanN_zh: 'mand dig op (mande)' },
                { l: 'vand', n: 'vane', contextL: 'Drik koldt vand', contextN: 'En god vane', meanL_zh: '水 (vand [vænˀ] - stumt d)', meanN_zh: '习惯 (vane)' },
                { l: 'land', n: 'lån', contextL: 'Danmark er et dejligt land', contextN: 'Optage et lån', meanL_zh: '国家/陆地 (land [lænˀ] - stumt d)', meanN_zh: '贷款 (lån)' },
                { l: 'kage', n: 'kat', contextL: 'Spise en sød kage', contextN: 'En lille kat', meanL_zh: '蛋糕 (kage [kæːɪ] - blødt/vokaliseret g)', meanN_zh: '猫 (kat [kæd])' },
                { l: 'hvad', n: 'fad', contextL: 'Hvad siger du?', contextN: 'Et stort fad mad', meanL_zh: '什么 (hvad [væð] - stumt h)', meanN_zh: '托盘 (fad [fæð])' },
                { l: 'hjem', n: 'gem', contextL: 'Gå hjem nu', contextN: 'Gem dine penge', meanL_zh: '家/回家 (hjem [jɛm] - stumt h)', meanN_zh: '藏起来 (gem [gɛm])' },
                { l: 'godt', n: 'god', contextL: 'Det smager rigtig godt', contextN: 'En god ven', meanL_zh: '好 (godt [gʌd] - stumt d, kun t)', meanN_zh: '好的 (god [goːð] - blødt d)' },
                { l: 'finde', n: 'fiske', contextL: 'Vi vil finde vejen', contextN: 'Fiske i søen', meanL_zh: '寻找/找到 (finde [fenə] - stumt d)', meanN_zh: '钓鱼 (fiske)' }
            ],
            speechExercises: [
                { text: 'Manden spiser en kage', targetSound: 'silent', type: 'silent', targetWords: ['manden', 'kage'], hintDa: 'Stumt d i "manden" (sig "mannen") og intet hårdt g i "kage" (sig "kæ-ie")!', hintZh: 'manden 里的 d 完全不发音（读 mannen）；kage 里的 g 融化成元音（绝无硬 g）！' },
                { text: 'Hvad hedder du egentlig', targetSound: 'silent', type: 'silent', targetWords: ['hvad', 'egentlig'], hintDa: 'Hvad: h er helt stumt, start direkte på v! Egentlig: g er stumt.', hintZh: '“hvad” 的 h 彻底隐形，直接读 vad！“egentlig” 的 g 也是不发音的！' },
                { text: 'Et koldt glas vand', targetSound: 'silent', type: 'silent', targetWords: ['koldt', 'vand'], hintDa: 'Vand: d er helt stumt! Sig "van". I "koldt" smækker du døren på t.', hintZh: '“vand” 里的 d 是哑巴，只念 van！千万别念成 van-de！' },
                { text: 'Hvor er dit hjem', targetSound: 'silent', type: 'silent', targetWords: ['hvor', 'hjem'], hintDa: 'Hvor og hjem — begge ord starter med stumt h: sig "vor" og "jem"!', hintZh: '“hvor” 和 “hjem” 的首字母 h 都是不发音的：直接读 vor 和 jem！' },
                { text: 'Det smager rigtig godt', targetSound: 'silent', type: 'silent', targetWords: ['smager', 'godt'], hintDa: 'Smager: g er blødt og glider. Godt: d er stumt, afsluttes rent på t!', hintZh: '“smager” 的 g 变成滑音；“godt” 里的 d 完全不发音，只发 t 的顿音！' },
                { text: 'Vi skal finde en god plads', targetSound: 'silent', type: 'silent', targetWords: ['finde', 'plads'], hintDa: 'Finde (sig "finne" — d er stumt!) og plads (d er stumt!).', hintZh: '“finde” 读作 finne（d 隐形）；“plads” 的 d 也是不发音的！' },
                { text: 'Børnene leger i haven', targetSound: 'silent', type: 'silent', targetWords: ['leger', 'haven'], hintDa: 'Leger og haven — intet hårdt g i "leger" (sig "le-er") og v er blødt.', hintZh: '“leger” 里的 g 消失融化（读 le-er），绝不是“le-ge”！' },
                { text: 'Manden tager bussen hjem', targetSound: 'silent', type: 'silent', targetWords: ['manden', 'tager', 'hjem'], hintDa: 'Tre stumme lyde: "manden" (uden d), "tager" (uden g, sig "ta-er"), "hjem" (uden h)!', hintZh: '连环不发音挑战：manden（无 d）+ tager（无 g）+ hjem（无 h）！' }
            ]
        }
    };

    // --- VECTOR SVG GENERATORS ---

    // Module 1: Sagittal Profile (Restored from 84e70ad with slender elongated tongue vs broad seal)
    function generateSagittalProfileSvg(sound) {
        const isL = sound === 'l';
        const primaryColor = isL ? '#38bdf8' : '#f472b6';

        // Exact tongue shape from 84e70ad:
        // /l/: Slender elongated tongue with single small contact dot at alveolar ridge
        // /n/: Broad tongue with wide closure barrier
        const tonguePath = isL 
            ? 'M 140 240 C 150 185, 175 160, 215 135 C 225 125, 230 110, 235 102 C 220 115, 195 130, 165 170 C 145 195, 135 220, 130 250 Z'
            : 'M 140 240 C 155 180, 185 145, 222 108 C 235 96, 248 94, 255 96 C 240 118, 205 138, 170 178 C 145 205, 135 225, 130 250 Z';

        const velumPath = isL
            ? 'M 175 110 C 190 125, 198 138, 208 145 C 205 148, 195 135, 170 118 Z' // Closed
            : 'M 175 110 C 182 135, 186 160, 188 175 C 182 173, 178 150, 170 118 Z'; // Lowered/Open

        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" width="100%" height="280" style="display:block; width:100%; height:280px;" xmlns="http://www.w3.org/2000/svg">
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
                <!-- Forehead, Nose & Upper Lip (Facing RIGHT) -->
                <path d="M 330 30 C 310 30, 295 50, 290 85 C 285 105, 305 115, 295 130 C 288 138, 275 142, 270 148 C 265 154, 270 162, 268 170" 
                      fill="none" stroke="#475569" stroke-width="2.5" stroke-linecap="round"/>

                <!-- Hard Palate & Alveolar Ridge -->
                <path d="M 264 165 C 255 125, 235 98, 175 110" 
                      fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>

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
                <text x="235" y="55" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">Næsehule (鼻腔)</text>

                <!-- Velum / Soft Palate (Ganesejlet) -->
                <path d="${velumPath}" fill="${isL ? '#38bdf8' : '#f472b6'}" stroke="#f8fafc" stroke-width="1.5"/>

                <!-- Tongue (Tungen) -->
                <path d="${tonguePath}" fill="url(#${isL ? 'lAirflowGrad' : 'nAirflowGrad'})" stroke="${primaryColor}" stroke-width="2.5"/>

                ${isL ? `
                    <!-- L: Slank aflang tunge, rører KUN i ét punkt bag fortænderne -->
                    <circle cx="236" cy="100" r="6" fill="#facc15" stroke="#fef08a" stroke-width="2"/>
                    <text x="236" y="85" fill="#facc15" font-size="11" font-weight="900" text-anchor="middle">Lille berøringspunkt (kun spidsen)</text>
                    <text x="236" y="118" fill="#93c5fd" font-size="9" text-anchor="middle">Aflang slank tunge</text>

                    <!-- Velum closure cross (Næsen lukket) -->
                    <circle cx="206" cy="143" r="5" fill="#ef4444"/>
                    <line x1="202" y1="139" x2="210" y2="147" stroke="#ffffff" stroke-width="1.8"/>
                    <line x1="210" y1="139" x2="202" y2="147" stroke="#ffffff" stroke-width="1.8"/>
                    <text x="170" y="148" fill="#f87171" font-size="10" font-weight="bold" text-anchor="end">Lukket for næsen!</text>

                    <!-- Blue Oral Airflow Path -->
                    <path d="M 175 250 C 180 200, 195 180, 220 165 C 240 155, 275 165, 305 168" 
                          fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="8,4" 
                          filter="url(#glowAir)" marker-end="url(#arrowL)"/>
                    <text x="280" y="195" fill="#38bdf8" font-size="12" font-weight="bold">Luften ud af munden ➔</text>
                    <text x="280" y="210" fill="#cbd5e1" font-size="10">Suser ud i mundvigene</text>
                ` : `
                    <!-- N: Bred kontaktflade der spærrer hele munden -->
                    <path d="M 222 104 C 235 96, 250 96, 258 108" fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
                    <text x="236" y="85" fill="#f87171" font-size="11" font-weight="900" text-anchor="middle">Stor bred kontaktflade ⛔</text>
                    <text x="285" y="145" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Munden er spærret foran ⛔</text>

                    <!-- Open velum indicator -->
                    <text x="170" y="148" fill="#4ade80" font-size="10" font-weight="bold" text-anchor="end">Åben til næsen ➔</text>

                    <!-- Pink Nasal Airflow Path -->
                    <path d="M 175 250 C 180 190, 185 140, 195 110 C 205 75, 245 70, 290 120" 
                          fill="none" stroke="#f472b6" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="8,4" 
                          filter="url(#glowAir)" marker-end="url(#arrowN)"/>
                    <text x="270" y="45" fill="#f472b6" font-size="12" font-weight="bold">Op gennem næsen ➔</text>
                    <text x="270" y="60" fill="#cbd5e1" font-size="10">Mærk snurren i næsen</text>
                `}

                <!-- Mode Pill in SVG -->
                <rect x="15" y="15" width="130" height="26" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${primaryColor}" stroke-width="1.5"/>
                <text x="80" y="32" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isL ? '🌊 L: Aflang tunge' : '🌸 N: Bred kontaktflade'}</text>
            </svg>
        `;
    }

    // Module 1: Frontal Mirror View (Krystalklar forfra-visning: Mundvige vs Næse)
    function generateFrontalMirrorSvg(sound) {
        const isL = sound === 'l';
        const primaryColor = isL ? '#38bdf8' : '#f472b6';

        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" width="100%" height="280" style="display:block; width:100%; height:280px;" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="glowFront" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <marker id="arrowLFront" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#38bdf8"/>
                    </marker>
                    <marker id="arrowNFront" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#f472b6"/>
                    </marker>
                </defs>

                <!-- Background Frame -->
                <rect width="360" height="300" rx="14" fill="#0b1329" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5"/>

                <!-- Perspective Title -->
                <text x="180" y="26" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle" letter-spacing="0.05em">
                    MUNDEN SET FORFRA I SPEJLET (镜子正面视角)
                </text>

                <!-- Nose outline at the top -->
                <path d="M 160 50 C 160 65, 170 70, 180 70 C 190 70, 200 65, 200 50" fill="none" stroke="#475569" stroke-width="2"/>
                <!-- Nostrils -->
                <ellipse cx="170" cy="62" rx="4" ry="2.5" fill="#1e293b" stroke="#64748b"/>
                <ellipse cx="190" cy="62" rx="4" ry="2.5" fill="#1e293b" stroke="#64748b"/>

                <!-- Lips outer contour -->
                <path d="M 80 150 C 120 115, 160 115, 180 120 C 200 115, 240 115, 280 150 C 240 190, 200 195, 180 195 C 160 195, 120 190, 80 150 Z" 
                      fill="#1e293b" stroke="#64748b" stroke-width="3"/>

                <!-- Mouth inner cavity -->
                <ellipse cx="180" cy="155" rx="85" ry="30" fill="#0f172a"/>

                <!-- Upper Teeth Row -->
                <g fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2">
                    <rect x="168" y="125" width="11" height="15" rx="2"/>
                    <rect x="181" y="125" width="11" height="15" rx="2"/>
                    <rect x="155" y="127" width="11" height="14" rx="2"/>
                    <rect x="194" y="127" width="11" height="14" rx="2"/>
                    <rect x="142" y="130" width="11" height="12" rx="2"/>
                    <rect x="207" y="130" width="11" height="12" rx="2"/>
                    <rect x="130" y="135" width="10" height="10" rx="2"/>
                    <rect x="220" y="135" width="10" height="10" rx="2"/>
                </g>

                ${isL ? `
                    <!-- L-SOUND: Slender center tongue, BOTH CORNERS WIDE OPEN -->
                    <!-- Slender tongue reaching up in the middle -->
                    <path d="M 160 185 C 165 155, 172 136, 180 136 C 188 136, 195 155, 200 185 Z" 
                          fill="#38bdf8" opacity="0.9" stroke="#60a5fa" stroke-width="2"/>
                    <circle cx="180" cy="136" r="4.5" fill="#facc15"/>
                    <text x="180" y="112" fill="#facc15" font-size="10.5" font-weight="bold" text-anchor="middle">Kun spidsen i midten!</text>

                    <!-- Big Open Gaps at the sides with Airflow -->
                    <!-- Left Corner Airflow -->
                    <path d="M 140 160 C 115 160, 85 165, 55 170" 
                          fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-dasharray="6,3" 
                          filter="url(#glowFront)" marker-end="url(#arrowLFront)"/>
                    <text x="45" y="152" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="end">Luft ud her ➔</text>
                    <text x="45" y="165" fill="#94a3b8" font-size="9" text-anchor="end">(Venstre mundvig)</text>

                    <!-- Right Corner Airflow -->
                    <path d="M 220 160 C 245 160, 275 165, 305 170" 
                          fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-dasharray="6,3" 
                          filter="url(#glowFront)" marker-end="url(#arrowLFront)"/>
                    <text x="315" y="152" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="start">➔ Luft ud her</text>
                    <text x="315" y="165" fill="#94a3b8" font-size="9" text-anchor="start">(Højre mundvig)</text>

                    <!-- Bottom Explanation Box -->
                    <rect x="25" y="225" width="310" height="55" rx="10" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(56, 189, 248, 0.4)"/>
                    <text x="180" y="246" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">BEGGE MUNDVIGE ER HELT ÅBNE</text>
                    <text x="180" y="264" fill="#cbd5e1" font-size="10.5" text-anchor="middle">Tungens sider hænger frit. Luften suser frit ud i begge sider.</text>
                ` : `
                    <!-- N-SOUND: Broad tongue sealing the entire mouth arch, Airflow goes up through nose -->
                    <!-- Solid tongue seal covering all teeth -->
                    <path d="M 120 170 C 120 132, 140 126, 180 126 C 220 126, 240 132, 240 170 Z" 
                          fill="#f472b6" opacity="0.9" stroke="#ec4899" stroke-width="2"/>
                    <path d="M 125 132 C 145 125, 215 125, 235 132" fill="none" stroke="#ef4444" stroke-width="4"/>
                    <text x="180" y="155" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle">⛔ MUNDEN ER HELT LUKKET ⛔</text>

                    <!-- Airflow blasting UP through nostrils -->
                    <path d="M 170 58 C 165 40, 150 30, 130 22" 
                          fill="none" stroke="#f472b6" stroke-width="4.5" stroke-dasharray="6,3" 
                          filter="url(#glowFront)" marker-end="url(#arrowNFront)"/>
                    <path d="M 190 58 C 195 40, 210 30, 230 22" 
                          fill="none" stroke="#f472b6" stroke-width="4.5" stroke-dasharray="6,3" 
                          filter="url(#glowFront)" marker-end="url(#arrowNFront)"/>
                    <text x="180" y="42" fill="#f472b6" font-size="11.5" font-weight="bold" text-anchor="middle">⬆️ Al luft presses ud af næsen! ⬆️</text>

                    <!-- Bottom Explanation Box -->
                    <rect x="25" y="225" width="310" height="55" rx="10" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(244, 114, 182, 0.4)"/>
                    <text x="180" y="246" fill="#f472b6" font-size="12" font-weight="bold" text-anchor="middle">KOMPLET FORSEGLING I MUNDEN</text>
                    <text x="180" y="264" fill="#cbd5e1" font-size="10.5" text-anchor="middle">Tungen lukker tæt fortil. Klem om næsen, så stopper lyden!</text>
                `}

                <!-- Mode Pill in SVG -->
                <rect x="15" y="15" width="125" height="24" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${primaryColor}" stroke-width="1.2"/>
                <text x="77" y="31" fill="${primaryColor}" font-size="11" font-weight="900" text-anchor="middle">${isL ? '🌊 L: Åbne mundvige' : '🌸 N: Næseluft'}</text>
            </svg>
        `;
    }

    // Module 2: Blødt d Set from side
    function generateSagittalSoftDSvg(target) {
        const isSoftD = target === 'soft_d';
        const primaryColor = isSoftD ? '#4ade80' : '#f87171';

        return `
            <svg viewBox="0 0 360 300" width="100%" height="280" style="display:block;" xmlns="http://www.w3.org/2000/svg">
                <!-- Head contour -->
                <path d="M 120 40 Q 190 20 270 45 Q 310 65 315 110 Q 320 145 305 165 Q 295 175 300 205 Q 305 225 290 240 Q 260 255 240 255 Q 210 270 190 290" 
                      fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
                
                <!-- Hard palate & Upper Teeth -->
                <path d="M 170 130 Q 190 85 235 85 L 238 100" fill="none" stroke="#e2e8f0" stroke-width="3"/>
                <rect x="236" y="85" width="6" height="15" fill="#f8fafc" rx="1.5"/>

                <!-- Lower jaw & teeth -->
                <path d="M 180 250 Q 220 245 245 210 L 243 195" fill="none" stroke="#64748b" stroke-width="2.5"/>
                <rect x="240" y="195" width="5" height="13" fill="#cbd5e1" rx="1.5"/>

                ${isSoftD ? `
                    <!-- Tongue resting against lower incisors (Blødt d) -->
                    <path d="M 190 240 Q 210 230 238 210 L 235 225 Q 210 245 190 240 Z" fill="#4ade80" opacity="0.9"/>
                    <path d="M 190 240 Q 215 215 238 208" fill="none" stroke="#22c55e" stroke-width="3"/>
                    <text x="235" y="235" fill="#facc15" font-size="10" font-weight="bold" text-anchor="middle">Tungen nede bag undertænderne!</text>
                    
                    <!-- Free glide airflow out -->
                    <path d="M 180 200 Q 210 180 260 175 L 290 175" fill="none" stroke="#4ade80" stroke-width="3.5" stroke-dasharray="5 3"/>
                    <text x="270" y="170" fill="#4ade80" font-size="12" font-weight="bold">Glider blødt ud ➔</text>
                    <text x="270" y="185" fill="#cbd5e1" font-size="10">Rører aldrig ganen!</text>
                ` : `
                    <!-- Erroneous tongue touching upper teeth (Hard D or L) -->
                    <path d="M 190 240 Q 215 170 236 98 L 230 110 Q 210 180 190 240 Z" fill="#f87171" opacity="0.85"/>
                    <text x="236" y="80" fill="#ef4444" font-size="11" font-weight="bold" text-anchor="middle">Må IKKE røre heroppe! ⛔</text>
                    <path d="M 180 210 L 225 150" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="3 3"/>
                    <text x="270" y="180" fill="#f87171" font-size="11" font-weight="bold">Fejl: Lyder som L eller hårdt D!</text>
                `}

                <rect x="15" y="15" width="135" height="24" rx="6" fill="#1e293b" stroke="${primaryColor}" stroke-width="1.5"/>
                <text x="82" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isSoftD ? '🍃 Blødt d (Tungen nede)' : '⛔ Fejl: Rører overmunden'}</text>
            </svg>
        `;
    }

    // Module 2: Blødt d Frontal Teeth Gap view
    function generateFrontalSoftDSvg(target) {
        const isSoftD = target === 'soft_d';
        const primaryColor = isSoftD ? '#4ade80' : '#f87171';

        return `
            <svg viewBox="0 0 360 300" width="100%" height="280" style="display:block;" xmlns="http://www.w3.org/2000/svg">
                <!-- Lips opening contour -->
                <ellipse cx="180" cy="150" rx="110" ry="65" fill="#0f172a" stroke="#475569" stroke-width="3"/>

                <!-- Upper incisors -->
                <g fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5">
                    <rect x="150" y="115" width="28" height="26" rx="3"/>
                    <rect x="182" y="115" width="28" height="26" rx="3"/>
                </g>

                <!-- Lower incisors -->
                <g fill="#cbd5e1" stroke="#64748b" stroke-width="1.5">
                    <rect x="152" y="165" width="26" height="24" rx="3"/>
                    <rect x="182" y="165" width="26" height="24" rx="3"/>
                </g>

                ${isSoftD ? `
                    <!-- Tongue resting behind lower teeth -->
                    <path d="M 120 185 Q 180 178 240 185 L 240 210 Q 180 210 120 210 Z" fill="#4ade80" opacity="0.85"/>
                    <text x="180" y="155" fill="#4ade80" font-size="12" font-weight="bold" text-anchor="middle">Åben spalte: Luften glider frit ud ➔</text>
                    <text x="180" y="240" fill="#cbd5e1" font-size="11" text-anchor="middle">Tungespidsen hviler fladt bag de nederste tænder</text>
                ` : `
                    <!-- Tongue rising up and blocking teeth gap -->
                    <path d="M 130 155 Q 180 120 230 155 L 230 190 Q 180 190 130 190 Z" fill="#f87171" opacity="0.9"/>
                    <text x="180" y="150" fill="#ef4444" font-size="13" font-weight="bold" text-anchor="middle">⛔ Tungen lukker for munden</text>
                    <text x="180" y="240" fill="#fca5a5" font-size="11" text-anchor="middle">Hvis tungen løftes, forvandles ordet til "brøl" eller "mal"!</text>
                `}

                <rect x="15" y="15" width="135" height="24" rx="6" fill="#1e293b" stroke="${primaryColor}" stroke-width="1.5"/>
                <text x="82" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isSoftD ? '🍃 Åben tandspalte' : '⛔ Lukket mund'}</text>
            </svg>
        `;
    }

    // Module 3: Dansk r Set from side
    function generateSagittalDanskRSvg(target) {
        const isDanishR = target === 'danish_r';
        const primaryColor = isDanishR ? '#facc15' : '#f87171';

        return `
            <svg viewBox="0 0 360 300" width="100%" height="280" style="display:block;" xmlns="http://www.w3.org/2000/svg">
                <!-- Head contour -->
                <path d="M 120 40 Q 190 20 270 45 Q 310 65 315 110 Q 320 145 305 165 Q 295 175 300 205 Q 305 225 290 240 Q 260 255 240 255 Q 210 270 190 290" 
                      fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
                
                <!-- Palate -->
                <path d="M 170 130 Q 190 85 235 85 L 238 100" fill="none" stroke="#e2e8f0" stroke-width="3"/>
                <!-- Upper Teeth -->
                <rect x="236" y="85" width="6" height="15" fill="#f8fafc" rx="1.5"/>

                <!-- Deep in throat (Kragelyden) -->
                <circle cx="165" cy="165" r="7" fill="#facc15"/>
                <text x="165" y="155" fill="#facc15" font-size="10" font-weight="bold" text-anchor="end">Dybt i halsen (Kragelyden kraa)</text>

                ${isDanishR ? `
                    <!-- Tongue lying completely flat; tongue root retracted -->
                    <path d="M 175 185 Q 185 170 200 220 Q 220 235 245 235 L 235 245 Q 200 245 175 185 Z" fill="#facc15" opacity="0.85"/>
                    <text x="240" y="250" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Tungespidsen ligger helt fladt!</text>
                    
                    <!-- Throaty vibration wave -->
                    <path d="M 160 175 Q 170 160 180 180 Q 210 185 270 190" fill="none" stroke="#facc15" stroke-width="3.5" stroke-dasharray="4 2"/>
                    <text x="270" y="185" fill="#facc15" font-size="12" font-weight="bold">Lyden laves her ➔</text>
                    <text x="270" y="200" fill="#cbd5e1" font-size="10">Som en krage i halsen</text>
                ` : `
                    <!-- Chinese retroflex R: Tongue curled up forwards -->
                    <path d="M 180 240 Q 205 180 225 105 L 215 105 Q 195 180 180 240 Z" fill="#f87171" opacity="0.85"/>
                    <text x="210" y="95" fill="#ef4444" font-size="11" font-weight="bold" text-anchor="middle">Krøl ALDRIG tungen op! ⛔</text>
                    <text x="270" y="180" fill="#f87171" font-size="11" font-weight="bold">Fejl: Kinesisk 'rén'-lyd</text>
                `}

                <rect x="15" y="15" width="135" height="24" rx="6" fill="#1e293b" stroke="${primaryColor}" stroke-width="1.5"/>
                <text x="82" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isDanishR ? '🦅 Kragelyden dybt i halsen' : '⛔ Fejl: Krøllet tunge'}</text>
            </svg>
        `;
    }

    // Module 3: Deep Throat View
    function generateThroatRSvg(target) {
        const isDanishR = target === 'danish_r';
        const primaryColor = isDanishR ? '#facc15' : '#f87171';

        return `
            <svg viewBox="0 0 360 300" width="100%" height="280" style="display:block;" xmlns="http://www.w3.org/2000/svg">
                <!-- Open mouth back wall view -->
                <ellipse cx="180" cy="150" rx="120" ry="90" fill="#0f172a" stroke="#334155" stroke-width="2"/>
                
                <!-- Throat passage -->
                <circle cx="180" cy="150" r="45" fill="#1e1b4b" stroke="#4338ca" stroke-width="2"/>
                <circle cx="180" cy="125" r="8" fill="#facc15"/>
                <text x="180" y="110" fill="#facc15" font-size="11" font-weight="bold" text-anchor="middle">Dybt i halsen (Som kragens kald)</text>

                ${isDanishR ? `
                    <!-- Flat tongue at bottom -->
                    <path d="M 90 200 Q 180 185 270 200 L 270 240 L 90 240 Z" fill="#facc15" opacity="0.4"/>
                    <!-- Vibration waves emerging from deep throat -->
                    <circle cx="180" cy="150" r="25" fill="none" stroke="#facc15" stroke-width="3" stroke-dasharray="6 3"/>
                    <circle cx="180" cy="150" r="38" fill="none" stroke="#facc15" stroke-width="2" stroke-dasharray="8 4"/>
                    <text x="180" y="240" fill="#facc15" font-size="12" font-weight="bold" text-anchor="middle">Lyden kradser blødt nede i svælget: kraa-kraa!</text>
                ` : `
                    <!-- Tongue blocking the throat completely -->
                    <path d="M 120 220 Q 180 130 240 220 Z" fill="#f87171" opacity="0.8"/>
                    <text x="180" y="175" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Tungen blokerer munden ⛔</text>
                    <text x="180" y="240" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Halsens dybe lyd bliver kvalt!</text>
                `}

                <rect x="15" y="15" width="135" height="24" rx="6" fill="#1e293b" stroke="${primaryColor}" stroke-width="1.5"/>
                <text x="82" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isDanishR ? '🦅 Åben halskanal' : '⛔ Tungen i vejen'}</text>
            </svg>
        `;
    }

    // Module 4: Consonant Cluster Timing Diagram
    function generateClusterTimingSvg(target) {
        const isClean = target === 'clean_cluster';
        const primaryColor = isClean ? '#4ade80' : '#f87171';

        return `
            <svg viewBox="0 0 360 300" width="100%" height="280" style="display:block;" xmlns="http://www.w3.org/2000/svg">
                <text x="180" y="45" fill="#f8fafc" font-size="13" font-weight="900" text-anchor="middle">Eksempel: "koldt" (k + o + l + dt)</text>

                <!-- Step 1: Vowel /ɔ/ -->
                <rect x="40" y="80" width="75" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
                <text x="77" y="105" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Vokal: o</text>
                <text x="77" y="120" fill="#94a3b8" font-size="10" text-anchor="middle">Stemme</text>
                <text x="127" y="110" fill="#64748b" font-size="16">➔</text>

                <!-- Step 2: Consonant 1: /l/ -->
                <rect x="142" y="80" width="75" height="50" rx="8" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
                <text x="179" y="105" fill="#facc15" font-size="12" font-weight="bold" text-anchor="middle">Lyd 1: l</text>
                <text x="179" y="120" fill="#94a3b8" font-size="10" text-anchor="middle">Tungen op</text>
                <text x="227" y="110" fill="#64748b" font-size="16">➔</text>

                <!-- Step 3: Consonant 2: /t/ stop -->
                <rect x="242" y="80" width="75" height="50" rx="8" fill="#1e293b" stroke="${primaryColor}" stroke-width="2"/>
                <text x="279" y="105" fill="${primaryColor}" font-size="12" font-weight="bold" text-anchor="middle">Lyd 2: dt</text>
                <text x="279" y="120" fill="#94a3b8" font-size="10" text-anchor="middle">Smæk døren!</text>

                ${isClean ? `
                    <!-- Clean sudden stop -->
                    <line x1="317" y1="65" x2="317" y2="145" stroke="#4ade80" stroke-width="4"/>
                    <rect x="235" y="165" width="95" height="30" rx="6" fill="rgba(34,197,94,0.2)" stroke="#4ade80"/>
                    <text x="282" y="185" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">⏹️ Stands brat!</text>
                    <text x="180" y="235" fill="#4ade80" font-size="13" font-weight="bold" text-anchor="middle">✅ Smæk døren i: Luften stopper på et splitsekund!</text>
                    <text x="180" y="255" fill="#cbd5e1" font-size="11" text-anchor="middle">Som at klippe lyden over med en saks</text>
                ` : `
                    <!-- Error: Leaking trailing vowel -->
                    <rect x="235" y="165" width="105" height="30" rx="6" fill="rgba(239,68,68,0.2)" stroke="#ef4444"/>
                    <text x="287" y="185" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">+ ekstra "-e" ⛔</text>
                    <text x="180" y="235" fill="#ef4444" font-size="13" font-weight="bold" text-anchor="middle">⚠️ Fejl: Du slap et ekstra pust ud til sidst ("koldt-e")!</text>
                    <text x="180" y="255" fill="#fca5a5" font-size="11" text-anchor="middle">Luk munden tæt og hold vejret et øjeblik</text>
                `}

                <rect x="15" y="15" width="135" height="24" rx="6" fill="#1e293b" stroke="${primaryColor}" stroke-width="1.5"/>
                <text x="82" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isClean ? '🧱 Lukkes brat' : '⛔ Ekstra "-e" hale'}</text>
            </svg>
        `;
    }

    // Module 4: Acoustic Waveform Stop
    function generateWaveformStopSvg(target) {
        const isClean = target === 'clean_cluster';
        const primaryColor = isClean ? '#4ade80' : '#f87171';

        return `
            <svg viewBox="0 0 360 300" width="100%" height="280" style="display:block;" xmlns="http://www.w3.org/2000/svg">
                <text x="180" y="45" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Lydbølgen (Stop lyden brat)</text>

                <!-- Baseline -->
                <line x1="30" y1="140" x2="330" y2="140" stroke="#334155" stroke-width="1.5"/>

                <!-- Vowel Wave -->
                <path d="M 40 140 Q 55 80 70 140 Q 85 200 100 140 Q 115 85 130 140 Q 145 195 160 140" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
                <text x="100" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Vokal</text>

                <!-- First Consonant Wave -->
                <path d="M 160 140 Q 175 110 190 140 Q 205 170 220 140 Q 235 120 250 140" fill="none" stroke="#facc15" stroke-width="2.5"/>
                <text x="205" y="165" fill="#facc15" font-size="11" font-weight="bold" text-anchor="middle">L-lyd</text>

                ${isClean ? `
                    <!-- Sudden flatline -->
                    <line x1="250" y1="140" x2="330" y2="140" stroke="#4ade80" stroke-width="4"/>
                    <circle cx="250" cy="140" r="5" fill="#4ade80"/>
                    <text x="290" y="125" fill="#4ade80" font-size="12" font-weight="bold" text-anchor="middle">Fuld stilhed ⏹️</text>
                    <text x="180" y="235" fill="#4ade80" font-size="13" font-weight="bold" text-anchor="middle">Lyden slukkes prompte som med en kontakt</text>
                ` : `
                    <!-- Trailing ripple (epenthetic vowel) -->
                    <path d="M 250 140 Q 270 115 290 140 Q 305 160 320 140" fill="none" stroke="#f87171" stroke-width="2.5" stroke-dasharray="4 2"/>
                    <text x="290" y="110" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">+ Lyd der slæber ⚠️</text>
                    <text x="180" y="235" fill="#f87171" font-size="13" font-weight="bold" text-anchor="middle">Uønsket hale af lyd slæber bagefter</text>
                `}

                <rect x="15" y="15" width="135" height="24" rx="6" fill="#1e293b" stroke="${primaryColor}" stroke-width="1.5"/>
                <text x="82" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isClean ? '🧱 Rent stop' : '⛔ Slæbende hale'}</text>
            </svg>
        `;
    }

    // Module 5: Stumt d Sagittal
    function generateSagittalSilentDSvg(target) {
        const isSilentD = target === 'silent_d';

        return `
            <svg viewBox="0 0 360 300" width="100%" height="280" style="display:block;" xmlns="http://www.w3.org/2000/svg">
                <!-- Head contour -->
                <path d="M 120 40 Q 190 20 270 45 Q 310 65 315 110 Q 320 145 305 165 Q 295 175 300 205 Q 305 225 290 240 Q 260 255 240 255 Q 210 270 190 290" 
                      fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
                
                <!-- Hard palate & Upper Teeth -->
                <path d="M 170 130 Q 190 85 235 85 L 238 100" fill="none" stroke="#e2e8f0" stroke-width="3"/>
                <rect x="236" y="85" width="6" height="15" fill="#f8fafc" rx="1.5"/>

                <!-- Lower jaw & teeth -->
                <path d="M 180 250 Q 220 245 245 210 L 243 195" fill="none" stroke="#64748b" stroke-width="2.5"/>
                <rect x="240" y="195" width="5" height="13" fill="#cbd5e1" rx="1.5"/>

                ${isSilentD ? `
                    <!-- Tongue resting against alveolar ridge on N - and staying there! -->
                    <path d="M 195 240 Q 210 210 226 140 Q 232 100 238 85 Q 234 110 220 170 Q 210 230 195 240 Z" fill="#c084fc" opacity="0.85"/>
                    <path d="M 195 240 Q 210 210 226 140 Q 232 100 238 85" fill="none" stroke="#a855f7" stroke-width="2.5"/>

                    <text x="236" y="70" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">Tungen stopper ved N! ⏹️</text>
                    <text x="270" y="180" fill="#f87171" font-size="12" font-weight="bold">🚫 Intet d her!</text>
                    <text x="270" y="198" fill="#cbd5e1" font-size="10">Sig kun "man" [mænˀ]</text>
                    <text x="180" y="240" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Bogstavet d er en tavs passager (tyst som en mus)</text>
                ` : `
                    <!-- Stumt h: Starts directly on V / J without throat friction -->
                    <path d="M 190 240 Q 215 220 240 200 L 235 225 Q 210 245 190 240 Z" fill="#38bdf8" opacity="0.85"/>
                    <text x="270" y="165" fill="#38bdf8" font-size="12" font-weight="bold">Start direkte på V ➔</text>
                    <text x="270" y="182" fill="#cbd5e1" font-size="10">Ingen "h"-lyd overhovedet</text>
                    <text x="180" y="240" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">"hvad" udtales [væð] — glem h'et fuldstændigt!</text>
                `}

                <rect x="15" y="15" width="135" height="24" rx="6" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
                <text x="82" y="31" fill="#c084fc" font-size="12" font-weight="900" text-anchor="middle">${isSilentD ? '👻 Stumt d (mand)' : '🌫️ Stumt h (hvad)'}</text>
            </svg>
        `;
    }

    // Module 5: Visual Silent Text Card
    function generateVisualSilentTextSvg(target) {
        const isSilentD = target === 'silent_d';

        return `
            <svg viewBox="0 0 360 300" width="100%" height="280" style="display:block;" xmlns="http://www.w3.org/2000/svg">
                ${isSilentD ? `
                    <text x="180" y="45" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">👀 Hvad øjnene ser på skrift:</text>
                    
                    <!-- Written word: m a n d -->
                    <g font-size="24" font-weight="900" text-anchor="middle">
                        <rect x="55" y="65" width="45" height="45" rx="8" fill="#1e293b" stroke="#38bdf8"/>
                        <text x="77" y="97" fill="#38bdf8">m</text>
                        <rect x="110" y="65" width="45" height="45" rx="8" fill="#1e293b" stroke="#38bdf8"/>
                        <text x="132" y="97" fill="#38bdf8">a</text>
                        <rect x="165" y="65" width="45" height="45" rx="8" fill="#1e293b" stroke="#38bdf8"/>
                        <text x="187" y="97" fill="#38bdf8">n</text>
                        
                        <!-- Silent d crossed out -->
                        <rect x="220" y="65" width="45" height="45" rx="8" fill="#0f172a" stroke="#64748b" stroke-dasharray="3 3"/>
                        <text x="242" y="97" fill="#64748b" opacity="0.6">d</text>
                        <line x1="225" y1="70" x2="260" y2="105" stroke="#ef4444" stroke-width="3"/>
                        <line x1="225" y1="105" x2="260" y2="70" stroke="#ef4444" stroke-width="3"/>
                    </g>
                    <text x="242" y="125" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">👻 Stum!</text>

                    <text x="180" y="165" fill="#4ade80" font-size="12" font-weight="bold" text-anchor="middle">🗣️ Hvad munden rent faktisk siger:</text>
                    <rect x="75" y="180" width="210" height="45" rx="10" fill="rgba(34,197,94,0.15)" stroke="#4ade80" stroke-width="2"/>
                    <text x="180" y="210" fill="#4ade80" font-size="22" font-weight="900" text-anchor="middle">[ m æ n ˀ ]</text>

                    <text x="180" y="255" fill="#cbd5e1" font-size="11" text-anchor="middle">✅ Stop ved N! Sig ALDRIG "mand-de" eller "man-duh"</text>
                ` : `
                    <text x="180" y="45" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">👀 Hvad øjnene ser på skrift: k-a-g-e</text>
                    
                    <g font-size="22" font-weight="900" text-anchor="middle">
                        <rect x="50" y="65" width="45" height="45" rx="8" fill="#1e293b" stroke="#38bdf8"/>
                        <text x="72" y="97" fill="#38bdf8">k</text>
                        <rect x="105" y="65" width="45" height="45" rx="8" fill="#1e293b" stroke="#38bdf8"/>
                        <text x="127" y="97" fill="#38bdf8">a</text>
                        
                        <!-- Soft G melting -->
                        <rect x="160" y="65" width="45" height="45" rx="8" fill="rgba(168,85,247,0.2)" stroke="#c084fc"/>
                        <text x="182" y="97" fill="#c084fc">g</text>
                        
                        <rect x="215" y="65" width="45" height="45" rx="8" fill="#1e293b" stroke="#38bdf8"/>
                        <text x="237" y="97" fill="#38bdf8">e</text>
                    </g>
                    <text x="182" y="125" fill="#c084fc" font-size="10" font-weight="bold" text-anchor="middle">Smelter til [i]!</text>

                    <text x="180" y="165" fill="#4ade80" font-size="12" font-weight="bold" text-anchor="middle">🗣️ Hvad munden rent faktisk siger:</text>
                    <rect x="75" y="180" width="210" height="45" rx="10" fill="rgba(34,197,94,0.15)" stroke="#4ade80" stroke-width="2"/>
                    <text x="180" y="210" fill="#4ade80" font-size="22" font-weight="900" text-anchor="middle">[ k æ ː ɪ ]</text>

                    <text x="180" y="255" fill="#cbd5e1" font-size="11" text-anchor="middle">✅ G bliver til en blød vokal – ingen hård 哥 (ge) fra halsen!</text>
                `}

                <rect x="15" y="15" width="135" height="24" rx="6" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
                <text x="82" y="31" fill="#c084fc" font-size="12" font-weight="900" text-anchor="middle">${isSilentD ? '👻 Lyd-kontrast' : '🌫️ G smelter til vokal'}</text>
            </svg>
        `;
    }

    // --- VIEW RENDER LOGIC ---
    function renderView() {
        viewContainer.innerHTML = '';
        viewContainer.appendChild(styleEl);

        const currentMod = SOUND_MODULES.find(m => m.id === activeModuleId) || SOUND_MODULES[0];
        const modData = MODULE_DATA[activeModuleId];

        // 1. Navigation Cards (Top Grid)
        const navGrid = document.createElement('div');
        navGrid.className = 'vlk-nav-grid';
        SOUND_MODULES.forEach(mod => {
            const card = document.createElement('div');
            card.className = `vlk-mod-card ${mod.id === activeModuleId ? 'active' : ''}`;
            card.innerHTML = `
                <span class="vlk-mod-badge">${mod.badge}</span>
                <div class="vlk-mod-title-da">${mod.titleDa}</div>
                <div class="vlk-mod-title-zh">${mod.titleZh}</div>
            `;
            card.onclick = () => {
                if (activeModuleId !== mod.id) {
                    activeModuleId = mod.id;
                    activeTarget = MODULE_DATA[mod.id].defaultTarget;
                    pairQuizIdx = 0;
                    pairScore = 0;
                    speechExerciseIdx = 0;
                    renderView();
                }
            };
            navGrid.appendChild(card);
        });
        viewContainer.appendChild(navGrid);

        // 2. Hero Header
        const hero = document.createElement('div');
        hero.className = 'vlk-hero';
        hero.innerHTML = `
            <div class="vlk-hero-title">
                <span>${currentMod.heroTitleZh}</span>
            </div>
            <div class="vlk-hero-sub">${currentMod.heroSubZh}</div>
            <div style="font-size:0.88rem; color:#cbd5e1; margin-bottom:1.25rem; background:rgba(15,23,42,0.5); padding:0.65rem 0.9rem; border-radius:10px; border-left:3px solid #60a5fa;">
                <strong>Dansk pædagogisk fokus:</strong> ${currentMod.descDa}
            </div>

            <!-- Tabs Nav -->
            <div class="vlk-tabs-nav">
                <button type="button" class="vlk-tab-btn ${activeTab === 'principles' ? 'active' : ''}" id="tab-btn-principles">
                    <span>👄</span>
                    <span>1. 口型与发音要诀 Mundstilling & Princip</span>
                </button>
                <button type="button" class="vlk-tab-btn ${activeTab === 'pairs' ? 'active' : ''}" id="tab-btn-pairs">
                    <span>🎧</span>
                    <span>2. 极小对立体辨音 Minimale Par (${modData.minimalPairs.length} 组)</span>
                </button>
                <button type="button" class="vlk-tab-btn ${activeTab === 'speech' ? 'active' : ''}" id="tab-btn-speech">
                    <span>🎙️</span>
                    <span>3. 麦克风跟读实战 Mikrofontræning (${modData.speechExercises.length} 题)</span>
                </button>
            </div>
        `;

        hero.querySelector('#tab-btn-principles').onclick = () => { activeTab = 'principles'; renderView(); };
        hero.querySelector('#tab-btn-pairs').onclick = () => { activeTab = 'pairs'; renderView(); };
        hero.querySelector('#tab-btn-speech').onclick = () => { activeTab = 'speech'; renderView(); };

        viewContainer.appendChild(hero);

        // 3. Tab Body Content
        const contentWrap = document.createElement('div');

        if (activeTab === 'principles') {
            renderPrinciplesTab(contentWrap, modData);
        } else if (activeTab === 'pairs') {
            renderPairsTab(contentWrap, modData);
        } else if (activeTab === 'speech') {
            renderSpeechTab(contentWrap, modData);
        }

        viewContainer.appendChild(contentWrap);
    }

    // Render Tab 1: Principles
    function renderPrinciplesTab(wrap, modData) {
        // Sub-selector (Sound targets)
        const subRow = document.createElement('div');
        subRow.className = 'vlk-sub-controls';
        subRow.innerHTML = `<span class="vlk-sub-label">${modData.subControls.labelZh}</span>`;

        modData.subControls.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const isActive = activeTarget === opt.id;
            btn.className = `vlk-sub-btn ${isActive ? opt.activeClass : ''}`;
            btn.innerHTML = `<span>${opt.label}</span> <span style="font-size:0.75rem; opacity:0.8;">${opt.sub}</span>`;
            btn.onclick = () => {
                activeTarget = opt.id;
                renderView();
            };
            subRow.appendChild(btn);
        });
        wrap.appendChild(subRow);

        // Diagrams Grid
        const grid = document.createElement('div');
        grid.className = 'vlk-diagram-grid';

        const c1 = modData.diagCard1(activeTarget);
        const card1 = document.createElement('div');
        card1.className = 'vlk-diagram-card';
        card1.innerHTML = `
            <div class="vlk-diagram-header">
                <div class="vlk-diagram-title">${c1.title}</div>
                <div class="vlk-diagram-tag" style="${c1.tagStyle}">${c1.tag}</div>
            </div>
            <div class="vlk-svg-wrapper">${c1.svg}</div>
            <div class="vlk-diagram-notes">${c1.notes}</div>
        `;
        grid.appendChild(card1);

        const c2 = modData.diagCard2(activeTarget);
        const card2 = document.createElement('div');
        card2.className = 'vlk-diagram-card';
        card2.innerHTML = `
            <div class="vlk-diagram-header">
                <div class="vlk-diagram-title">${c2.title}</div>
                <div class="vlk-diagram-tag" style="${c2.tagStyle}">${c2.tag}</div>
            </div>
            <div class="vlk-svg-wrapper">${c2.svg}</div>
            <div class="vlk-diagram-notes">${c2.notes}</div>
        `;
        grid.appendChild(card2);

        wrap.appendChild(grid);

        // Practical Self-Test Card
        const pinchCard = document.createElement('div');
        pinchCard.className = 'vlk-pinch-card';
        pinchCard.innerHTML = modData.pinchCardHtml;
        wrap.appendChild(pinchCard);

        // Bilingual Guide
        const guideCard = document.createElement('div');
        guideCard.className = 'vlk-bilingual-card';
        guideCard.innerHTML = modData.bilingualGuideHtml;
        wrap.appendChild(guideCard);
    }

    // Render Tab 2: Minimal Pairs Listening Quiz
    function renderPairsTab(wrap, modData) {
        const pairs = modData.minimalPairs;
        const currentPair = pairs[pairQuizIdx];

        // Randomize target: 0 for left, 1 for right
        if (typeof currentPair._targetSound === 'undefined') {
            currentPair._targetSound = Math.random() < 0.5 ? 'l' : 'n';
        }

        const quizCard = document.createElement('div');
        quizCard.className = 'vlk-quiz-container';

        const targetWord = currentPair._targetSound === 'l' ? currentPair.l : currentPair.n;

        quizCard.innerHTML = `
            <div class="vlk-quiz-progress">
                <span>第 ${pairQuizIdx + 1} 组，共 ${pairs.length} 组</span>
                <span class="vlk-quiz-score-pill">得分: ${pairScore} / ${pairs.length}</span>
            </div>

            <div style="font-size:1.1rem; color:#cbd5e1; margin-bottom:0.25rem;">
                点击下方按钮聆听丹麦语示范发音，并选择你听到的单词：
            </div>

            <button type="button" class="vlk-listen-btn-big" id="vlk-play-target">
                <span>🔊</span>
                <span>播放发音 (Lyt)</span>
            </button>

            <div class="vlk-quiz-options">
                <button type="button" class="vlk-pair-choice-btn" id="choice-btn-l">
                    <div class="vlk-pair-word" style="color:#38bdf8;">${currentPair.l}</div>
                    <div class="vlk-pair-meaning">${currentPair.meanL_zh}</div>
                    <div style="font-size:0.75rem; color:#64748b; margin-top:0.35rem;">例: "${currentPair.contextL}"</div>
                </button>
                <button type="button" class="vlk-pair-choice-btn" id="choice-btn-n">
                    <div class="vlk-pair-word" style="color:#f472b6;">${currentPair.n}</div>
                    <div class="vlk-pair-meaning">${currentPair.meanN_zh}</div>
                    <div style="font-size:0.75rem; color:#64748b; margin-top:0.35rem;">例: "${currentPair.contextN}"</div>
                </button>
            </div>

            <div class="vlk-quiz-feedback" id="vlk-quiz-fb"></div>

            <div class="vlk-speech-nav-row" style="margin-top:2rem;">
                <button type="button" class="vlk-nav-step-btn" id="prev-pair" ${pairQuizIdx === 0 ? 'disabled' : ''}>
                    ← 上一组
                </button>
                <button type="button" class="vlk-nav-step-btn" id="next-pair">
                    ${pairQuizIdx === pairs.length - 1 ? '重新开始' : '下一组 →'}
                </button>
            </div>
        `;

        // Audio listener
        quizCard.querySelector('#vlk-play-target').onclick = () => {
            playAudio(targetWord, 0.8);
        };

        const fb = quizCard.querySelector('#vlk-quiz-fb');
        const btnL = quizCard.querySelector('#choice-btn-l');
        const btnN = quizCard.querySelector('#choice-btn-n');

        function checkChoice(chosen) {
            btnL.disabled = true;
            btnN.disabled = true;
            const isCorrect = chosen === currentPair._targetSound;

            if (isCorrect) {
                pairScore++;
                fb.style.display = 'block';
                fb.style.background = 'rgba(34,197,94,0.2)';
                fb.style.color = '#4ade80';
                fb.style.border = '1px solid rgba(34,197,94,0.4)';
                fb.innerHTML = `🎉 <strong>完全正确！</strong> 听到的单词是 <em>"${targetWord}"</em>！`;
            } else {
                fb.style.display = 'block';
                fb.style.background = 'rgba(239,68,68,0.2)';
                fb.style.color = '#f87171';
                fb.style.border = '1px solid rgba(239,68,68,0.4)';
                fb.innerHTML = `❌ <strong>很遗憾！</strong> 正确答案其实是 <em>"${targetWord}"</em>。再仔细听一遍感受区别！`;
            }
            playAudio(targetWord, 0.75);
        }

        btnL.onclick = () => checkChoice('l');
        btnN.onclick = () => checkChoice('n');

        quizCard.querySelector('#prev-pair').onclick = () => {
            if (pairQuizIdx > 0) {
                pairQuizIdx--;
                renderView();
            }
        };

        quizCard.querySelector('#next-pair').onclick = () => {
            if (pairQuizIdx < pairs.length - 1) {
                pairQuizIdx++;
            } else {
                pairQuizIdx = 0;
                pairScore = 0;
            }
            renderView();
        };

        wrap.appendChild(quizCard);
    }

    // Render Tab 3: Speech Recognition Practice
    function renderSpeechTab(wrap, modData) {
        const exercises = modData.speechExercises;
        const ex = exercises[speechExerciseIdx];

        const speechCard = document.createElement('div');
        speechCard.className = 'vlk-speech-card';

        // Words markup
        const promptHtml = ex.text.split(' ').map(w => {
            const clean = w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '');
            const isTarget = ex.targetWords.some(tw => tw.toLowerCase() === clean);
            if (isTarget) {
                return `<span class="vlk-target-word word-primary">${w}</span>`;
            }
            return `<span>${w}</span>`;
        }).join(' ');

        speechCard.innerHTML = `
            <div class="vlk-speech-meta-bar">
                <span>第 ${speechExerciseIdx + 1} 题，共 ${exercises.length} 题</span>
                <span class="vlk-target-word word-primary" style="font-weight:bold; font-size:0.78rem;">
                    重点突破训练
                </span>
            </div>

            <div class="vlk-speech-prompt">${promptHtml}</div>
            <div class="vlk-speech-sub">大声朗读上方完整句子，注意高亮标出的发音重点！</div>

            ${consecutiveSpeechStreak > 0 ? `
                <div class="vlk-streak-pill">
                    <span>🔥</span>
                    <span>连续 ${consecutiveSpeechStreak} 题发音标准！</span>
                </div>
            ` : ''}

            <div class="vlk-mic-row">
                <button type="button" class="vlk-listen-model-btn" id="vlk-speech-listen">
                    <span>🔊 听示范发音</span>
                </button>
                <button type="button" class="vlk-mic-btn" id="vlk-speech-mic" title="点击开始麦克风录音">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                </button>
            </div>

            <div class="vlk-speech-status" id="vlk-mic-status">
                点击红色麦克风，大声清晰朗读整句
            </div>

            <div class="vlk-speech-feedback-box" id="vlk-speech-fb"></div>

            <div style="background:rgba(30,41,59,0.7); border-radius:12px; padding:0.85rem 1rem; margin-top:1.2rem; font-size:0.86rem; color:#cbd5e1; text-align:left;">
                <strong style="color:#fde68a;">发音要领指导：</strong> ${ex.hintDa}<br>
                <span style="font-size:0.82rem; color:#94a3b8; display:inline-block; margin-top:0.3rem;">中文提示：${ex.hintZh}</span>
            </div>

            <div class="vlk-speech-nav-row">
                <button type="button" class="vlk-nav-step-btn" id="prev-speech" ${speechExerciseIdx === 0 ? 'disabled' : ''}>
                    ← 上一题
                </button>
                <button type="button" class="vlk-nav-step-btn" id="next-speech">
                    ${speechExerciseIdx === exercises.length - 1 ? '完成训练' : '下一题 →'}
                </button>
            </div>
        `;

        // Listen model utterance
        speechCard.querySelector('#vlk-speech-listen').onclick = () => {
            playAudio(ex.text, 0.85);
        };

        // Mic Speech Recognition setup
        const micBtn = speechCard.querySelector('#vlk-speech-mic');
        const statusEl = speechCard.querySelector('#vlk-mic-status');
        const fbEl = speechCard.querySelector('#vlk-speech-fb');

        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRec) {
            statusEl.textContent = '您的浏览器不支持实时语音识别（请使用 Chrome 或 Safari）。';
            micBtn.style.opacity = '0.5';
            micBtn.style.cursor = 'not-allowed';
        } else {
            const recognition = new SpeechRec();
            recognition.lang = 'da-DK';
            recognition.continuous = false;
            recognition.interimResults = false;

            micBtn.onclick = () => {
                if (isSpeechRecording) {
                    recognition.stop();
                    return;
                }
                try {
                    recognition.start();
                    isSpeechRecording = true;
                    micBtn.classList.add('listening');
                    statusEl.textContent = '🎙️ 正在倾听，请朗读...';
                    statusEl.style.color = '#4ade80';
                    fbEl.style.display = 'none';
                } catch (e) {
                    console.error('Recognition start error:', e);
                }
            };

            recognition.onresult = (evt) => {
                isSpeechRecording = false;
                micBtn.classList.remove('listening');
                const transcript = evt.results[0][0].transcript.trim();
                const confidence = Math.round(evt.results[0][0].confidence * 100);

                statusEl.textContent = `识别完毕：你读的是 "${transcript}"`;
                statusEl.style.color = '#93c5fd';

                // Check match of target words
                const cleanUserWords = transcript.toLowerCase().split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ''));
                const matchedTargets = ex.targetWords.filter(tw => cleanUserWords.includes(tw.toLowerCase()));
                const allTargetsHit = matchedTargets.length === ex.targetWords.length;

                fbEl.style.display = 'block';
                if (allTargetsHit) {
                    consecutiveSpeechStreak++;
                    fbEl.style.borderLeftColor = '#22c55e';
                    fbEl.innerHTML = `
                        <div style="font-weight:bold; color:#4ade80; font-size:1.05rem; margin-bottom:0.3rem;">
                            🌟 太棒了！发音完全精准！
                        </div>
                        <div style="font-size:0.88rem; color:#cbd5e1;">
                            您成功读出了核心目标发音词：<strong>${ex.targetWords.join(', ')}</strong>。<br>
                            识别置信度：${confidence}%。继续保持这个口腔发音位置！
                        </div>
                    `;
                } else {
                    consecutiveSpeechStreak = 0;
                    fbEl.style.borderLeftColor = '#ef4444';
                    fbEl.innerHTML = `
                        <div style="font-weight:bold; color:#f87171; font-size:1.05rem; margin-bottom:0.3rem;">
                            ⚠️ 需要微调发音细节
                        </div>
                        <div style="font-size:0.88rem; color:#cbd5e1; line-height:1.5;">
                            目标词：<strong>${ex.targetWords.join(', ')}</strong><br>
                            您读的是：<em>"${transcript}"</em><br>
                            <span style="color:#fde047;">诊断点：</span>${ex.hintDa}
                        </div>
                    `;
                }
            };

            recognition.onerror = (err) => {
                isSpeechRecording = false;
                micBtn.classList.remove('listening');
                statusEl.textContent = '未检测到有效声音，请允许麦克风权限后重试。';
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
            if (speechExerciseIdx < exercises.length - 1) {
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
