import { getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';

export function renderMitSprogSammenlignetView(container, navigateFn, extraData = {}) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container mit-sprog-sammenlignet-view';

    const style = document.createElement('style');
    style.textContent = `
        .mit-sprog-sammenlignet-view {
            max-width: 1180px;
            margin: 0 auto;
            padding: 1rem 1.15rem 3.5rem;
            color: #f8fafc;
        }
        .mss-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
            margin-bottom: 0.9rem;
        }
        .mss-back-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.35);
            color: #f8fafc;
            padding: 0.5rem 0.95rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.86rem;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .mss-back-btn:hover {
            background: rgba(51, 65, 85, 0.95);
            border-color: #fde68a;
        }
        
        /* Notice Banner */
        .mss-notice-banner {
            background: linear-gradient(135deg, rgba(234, 179, 8, 0.16) 0%, rgba(15, 23, 42, 0.94) 100%);
            border: 1.5px solid rgba(251, 191, 36, 0.55);
            border-radius: 14px;
            padding: 0.85rem 1.15rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.85rem;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28);
        }
        .mss-notice-flag {
            font-size: 1.8rem;
            line-height: 1;
            flex-shrink: 0;
        }
        .mss-notice-title {
            font-size: 0.98rem;
            font-weight: 900;
            color: #fde047;
            margin-bottom: 0.2rem;
        }
        .mss-notice-sub {
            font-size: 0.84rem;
            color: #cbd5e1;
            line-height: 1.45;
        }

        .mss-hero {
            background: linear-gradient(135deg, rgba(127, 29, 29, 0.9), rgba(15, 23, 42, 0.97));
            border: 1.5px solid rgba(248, 113, 113, 0.42);
            border-radius: 20px;
            padding: 1.15rem 1.4rem;
            margin-bottom: 1rem;
            box-shadow: 0 14px 32px rgba(0, 0, 0, 0.38);
        }
        .mss-hero-kicker {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.24rem 0.75rem;
            border-radius: 999px;
            background: rgba(251, 191, 36, 0.16);
            border: 1px solid rgba(251, 191, 36, 0.45);
            color: #fde68a;
            font-size: 0.72rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin-bottom: 0.4rem;
        }
        .mss-hero h1 {
            margin: 0 0 0.3rem;
            font-size: clamp(1.35rem, 2.4vw, 1.9rem);
            font-weight: 900;
            color: #ffffff;
        }
        .mss-hero p {
            margin: 0;
            color: #e2e8f0;
            font-size: 0.94rem;
            line-height: 1.45;
        }

        /* Control Panel */
        .mss-control-panel {
            background: rgba(15, 23, 42, 0.94);
            border: 1.5px solid rgba(251, 191, 36, 0.42);
            border-radius: 16px;
            padding: 0.85rem 1rem;
            margin-bottom: 1.15rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .mss-lang-row {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            flex-wrap: wrap;
        }
        .mss-lang-pill {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(148, 163, 184, 0.3);
            color: #cbd5e1;
            padding: 0.32rem 0.7rem;
            border-radius: 999px;
            font-size: 0.78rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .mss-lang-pill:hover {
            border-color: #38bdf8;
            color: #ffffff;
        }
        .mss-lang-pill.active {
            background: rgba(56, 189, 248, 0.22);
            border-color: #38bdf8;
            color: #ffffff;
        }

        /* 2 Distinctive Lines Box */
        .mss-two-lines {
            display: flex;
            flex-direction: column;
            gap: 0.42rem;
            background: rgba(9, 14, 26, 0.88);
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 12px;
            padding: 0.65rem 0.85rem;
        }
        .mss-line-da {
            display: flex;
            align-items: baseline;
            gap: 0.55rem;
            font-size: 0.93rem;
            color: #ffffff;
            font-weight: 700;
            border-left: 3.5px solid #ef4444;
            padding-left: 0.6rem;
        }
        .mss-line-my {
            display: flex;
            align-items: baseline;
            gap: 0.55rem;
            font-size: 0.91rem;
            color: #bae6fd;
            font-weight: 700;
            border-left: 3.5px solid #38bdf8;
            padding-left: 0.6rem;
        }
        .mss-line-tag {
            font-size: 0.7rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            min-width: 72px;
            flex-shrink: 0;
        }
        .mss-hl-da {
            background: rgba(239, 68, 68, 0.24);
            border: 1px solid rgba(248, 113, 113, 0.55);
            color: #fecaca;
            padding: 0.05rem 0.38rem;
            border-radius: 6px;
            font-weight: 900;
        }
        .mss-hl-my {
            background: rgba(56, 189, 248, 0.2);
            border: 1px solid rgba(56, 189, 248, 0.5);
            color: #fde68a;
            padding: 0.05rem 0.38rem;
            border-radius: 6px;
            font-weight: 900;
        }

        /* Ladder Wrap */
        .mss-ladder-wrap {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding-left: 1.1rem;
        }
        .mss-ladder-wrap::before {
            content: '';
            position: absolute;
            left: 24px;
            top: 18px;
            bottom: 18px;
            width: 4px;
            background: linear-gradient(180deg, #38bdf8 0%, #fbbf24 50%, #4ade80 100%);
            border-radius: 4px;
        }
        .mss-step-card {
            position: relative;
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(148, 163, 184, 0.26);
            border-radius: 16px;
            padding: 0.85rem 1.05rem;
            margin-left: 1.35rem;
            display: grid;
            grid-template-columns: 220px 1fr auto;
            gap: 0.9rem;
            align-items: center;
            transition: all 0.18s ease;
            cursor: pointer;
        }
        .mss-step-card:hover {
            border-color: #fde68a;
            transform: translateX(3px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
        .mss-step-dot {
            position: absolute;
            left: -2.05rem;
            top: 50%;
            transform: translateY(-50%);
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #0f172a;
            border: 2.5px solid var(--step-color, #38bdf8);
            color: #ffffff;
            font-size: 0.76rem;
            font-weight: 900;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px rgba(0,0,0,0.6);
        }
        @media (max-width: 860px) {
            .mss-step-card {
                grid-template-columns: 1fr;
            }
        }

        .mss-sub-btn {
            background: linear-gradient(135deg, #ef4444, #b91c1c);
            border: 1px solid rgba(254, 202, 202, 0.45);
            color: #ffffff;
            padding: 0.48rem 0.85rem;
            border-radius: 10px;
            font-size: 0.78rem;
            font-weight: 800;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.16s ease;
        }
        .mss-sub-btn:hover {
            filter: brightness(1.12);
        }

        /* Detail Overlay */
        .mss-detail-overlay {
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(9, 13, 26, 0.99));
            border: 2px solid #fde68a;
            border-radius: 20px;
            padding: 1.35rem 1.5rem;
            margin-bottom: 1.25rem;
            box-shadow: 0 18px 42px rgba(0, 0, 0, 0.55);
        }
        .mss-link-chip {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(56, 189, 248, 0.16);
            border: 1.5px solid #38bdf8;
            color: #ffffff;
            padding: 0.5rem 0.95rem;
            border-radius: 11px;
            font-size: 0.84rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.16s ease;
        }
        .mss-link-chip:hover {
            background: rgba(56, 189, 248, 0.3);
            transform: translateY(-1px);
        }
        .mss-rtl {
            direction: rtl;
            text-align: right;
        }
    `;
    viewContainer.appendChild(style);

    // Languages for comparison (Dansk, Kinesisk og Arabisk fuldt understøttet)
    const LANGUAGES = [
        { code: 'da', name: 'Dansk', flag: '🇩🇰' },
        { code: 'ar', name: 'Arabisk (العربية)', flag: '🇸🇦' },
        { code: 'zh', name: 'Kinesisk (中文)', flag: '🇨🇳' },
        { code: 'en', name: 'Engelsk (English)', flag: '🇬🇧' },
        { code: 'tr', name: 'Tyrkisk (Türkçe)', flag: '🇹🇷' },
        { code: 'uk', name: 'Ukrainsk (Українська)', flag: '🇺🇦' },
        { code: 'de', name: 'Tysk (Deutsch)', flag: '🇩🇪' },
        { code: 'es', name: 'Spansk (Español)', flag: '🇪🇸' },
        { code: 'vi', name: 'Vietnamesisk (Tiếng Việt)', flag: '🇻🇳' },
        { code: 'fa', name: 'Persisk / Farsi (فارسی)', flag: '🇮🇷' }
    ];

    const appLang = getLang();
    let selectedLang = localStorage.getItem('mss_selected_lang') || (appLang === 'ar' ? 'ar' : (appLang === 'zh' ? 'zh' : 'da'));

    // Parse step and language from extraData.subPath or window.location.hash
    let initialStepIdx = null;
    const subPathStr = extraData.subPath || '';
    if (subPathStr) {
        const num = parseInt(subPathStr.replace(/\D/g, ''), 10);
        if (num >= 1 && num <= 10) {
            initialStepIdx = num - 1;
        }
    }
    try {
        const rawHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
        const segs = rawHash.split('/');
        if (segs[0] === 'ar' || segs[0] === 'zh' || segs[0] === 'da') {
            selectedLang = segs[0];
        }
        const idx = segs.findIndex(s => s === 'mit_sprog_sammenlignet');
        if (idx !== -1 && segs[idx + 1]) {
            const num = parseInt(segs[idx + 1].replace(/\D/g, ''), 10);
            if (num >= 1 && num <= 10) {
                initialStepIdx = num - 1;
            }
        }
    } catch (e) {}

    let openSubStepIndex = initialStepIdx;

    // De 10 trin fra mindste element (1. Lille lydforskel) til største (10. Den fulde samtale)
    // Gennemgående rød-tråd-sætning: "Jeg spiser brød i køkkenet i dag"
    const STEPS = [
        {
            num: 1,
            title: 'Lille lydforskel',
            title_zh: '微小的发音细节 (Lille lydforskel)',
            title_ar: 'فارق صوتي دقيق يغير المعنى (Lille lydforskel)',
            subtitle: 'En lille ændring i munden eller et lille stop i stemmen, der ændrer hele ordets betydning',
            subtitle_zh: '改变意思的微小动作（嘴唇是圆是扁 / 喉咙踩刹车 stød / 语调高低）',
            subtitle_ar: 'حركة صغيرة في الشفاه أو فرملة سريعة في الحنجرة تقلب معنى الكلمة بالكامل',
            color: '#38bdf8',
            widthPct: 38,
            daLine: `Læberne spidses som til et kys + lille stop i stemmen i <span class="mss-hl-da">brøʼd</span> vs. <span class="mss-hl-da">bred</span> (smilende flade læber)`,
            daLine_zh: 'brøʼd（嘴唇向前嘟圆 + 喉咙像打嗝般短暂停顿，面包）vs. bred（嘴角拉平微笑，宽阔）',
            daLine_ar: 'brøʼd (ضم الشفتين للأمام كأنك تقبّل + فرملة صوتية قصيرة في الحلق) مقابل bred (ابتسامة عريضة مع بسط الشفتين)',
            myLines: {
                en: `<span class="mss-hl-my">bread [bɹɛd]</span> — Engelsk har hverken runde læbevokaler som y/ø eller det danske stød.`,
                ar: `<span class="mss-hl-my">خبز (khubz)</span> — في العربية توجد 3 حركات أساسية فقط (فتحة، ضمة، كسرة)، ولا توجد حركات تزم فيها الشفتين وتدفعهما بقوة للأمام كأنك تقبّل مثل <strong>ø و y</strong>؛ كما لا توجد فرملة الصوت السريعة (stød) التي توقف الكلمة فجأة في الحلق.`,
                tr: `<span class="mss-hl-my">ekmek (ø findes: ö/ü)</span> — Tyrkisk har ö og ü ligesom dansk ø/y, men intet stød.`,
                uk: `<span class="mss-hl-my">хліб (khlib)</span> — Ukrainsk har ikke rundede læbevokaler (ø/y) eller dansk stød.`,
                de: `<span class="mss-hl-my">Brot (ø findes: ö/ü)</span> — Tysk har ö/ü ligesom dansk ø/y, men ikke dansk stød.`,
                es: `<span class="mss-hl-my">pan</span> — Spansk har 5 faste vokaler (a, e, i, o, u) uden læberundede e/i-lyde (ø/y).`,
                vi: `<span class="mss-hl-my">bánh mì</span> — Vietnamesisk bruger toner til at skelne ord, hvilket minder om det danske stød.`,
                fa: `<span class="mss-hl-my">نان (nân)</span> — Persisk har 6 vokaler uden ø/y og uden stød.`,
                zh: `<span class="mss-hl-my">面包 (miànbāo)</span> — 汉语是用<strong>四声声调</strong>（一声到四声）区分意思，没有丹麦语那种“喉咙突然刹车”（stød）；而且汉语普通话缺少像丹麦语 <strong>ø 和 y</strong> 这样把嘴唇用力向前嘟圆的母音。`
            },
            myLines_da: {
                zh: `Kinesisk skelner betydning med <strong>toner</strong> frem for stød, og mangler vokaler med stramt spidsede læber som <strong>ø og y</strong>.`,
                ar: `Arabisk har 3 grundvokaler (a, i, u) og mangler helt runde læbevokaler som <strong>ø og y</strong> samt det danske stød (den hurtige stemmebremse i halsen).`
            },
            detailExplain: `<strong>Lille lydforskel:</strong> Den allermindste detalje i munden kan forandre hele ordets betydning — f.eks. om du spidser læberne som til et kys (<em>brød</em>) eller trækker mundvigene til et smil (<em>bred</em>), om lyden holdes kort eller trækkes ud, eller om der er <strong>stød</strong> (et lille stop i stemmen, som et mini-hik: <em>hun</em> vs. <em>hundʼ</em>).`,
            detailExplain_zh: `<strong>微小的发音细节（Lille lydforskel）：</strong>嘴里哪怕只有一丁点动作不同，整个词的意思就彻底变了！比如：嘴唇是像要亲吻一样用力嘟圆（<em>brød</em> 面包），还是嘴角向两边拉开微笑（<em>bred</em> 宽阔）；或者声音有没有<strong>突然被踩了一脚刹车（stød，像轻微打嗝一样短暂停顿）</strong>：<em>hun</em>（她，平顺滑出）vs. <em>hundʼ</em>（狗，有短促刹车）。汉语则是用四个声调的高低升降来区分字词。`,
            detailExplain_ar: `<strong>فارق صوتي دقيق يغير المعنى (Lille lydforskel):</strong> في الدنماركية، حركة صغيرة جداً في شفتيك أو لسانك تقلب معنى الكلمة 180 درجة! على سبيل المثال: هل تزم شفتيك وتدفعهما بقوة للأمام كأنك تقبّل (<em>brød</em> خبز)، أم تبسط شفتيك كأنك تبتسم (<em>bred</em> عريض)؟ وهل تدع الصوت ينساب براحة، أم تضغط فرملة مفاجئة في الحلق مثل شهقة خفيفة سريعة (<strong>stød</strong>)؟ مثل الفرق بين <em>hun</em> (هي - بانسياب) و <em>hundʼ</em> (كلب - مع فرملة صوتية سريعة). في العربية، الفروق تعتمد على الحركات الثلاث والمد بالألف والواو والياء.`,
            morePairs: [
                { da: 'lys (spidsede læber som til et kys) vs. lis (smilende flade læber)', note: 'Kun læbernes form adskiller ordet "lys" fra pigenavnet "Lis".', note_zh: '仅靠嘴唇是嘟圆还是展平，就能区分“光”和一个女孩的名字。', note_ar: 'مجرد ضم الشفتين للأمام أو بسطهما يفرق بين كلمة "ضوء" (lys) واسم الفتاة "Lis".' },
                { da: 'måler (uden stød) vs. målʼer (med stød)', note: 'Det lille stop i stemmen (stødet) kan skelne mellem ord og bøjninger.', note_zh: '喉咙里那个短促的小刹车（stød），是丹麦语区分单复数和词性的神奇小开关。', note_ar: 'فرملة الصوت السريعة في الحلق (stød) هي مفتاح سحري في الدنماركية للتفريق بين الكلمات المفردة والجمع والمشتقات.' }
            ],
            links: [
                { label: '🎵 Leg med vokaler', label_zh: '🎵 趣味元音辨析 (Leg med vokaler)', label_ar: '🎵 تمييز حركات الفم والأصوات (Leg med vokaler)', route: 'leg_med_vokaler' },
                { label: '⚡ Det danske stød', label_zh: '⚡ 丹麦语发音小停顿 (Det danske stød)', label_ar: '⚡ فرملة الصوت السريعة الدنماركية (Det danske stød)', route: 'det_danske_stoed' }
            ]
        },
        {
            num: 2,
            title: 'Sproglyden',
            title_zh: '具体的发音动作 (Sproglyden)',
            title_ar: 'حركة الفم ومخرج الصوت (Sproglyden)',
            subtitle: 'Hvor tungen er og hvordan luften slipper ud (f.eks. blødt d og L vs. N)',
            subtitle_zh: '舌头具体放在哪、空气从哪边溜出（如擦眼镜哈气发软 d，以及 L 与 N 的区别）',
            subtitle_ar: 'أين يرتاح اللسان وكيف يهرب الهواء (مثل حرف d الناعم وحرف r من قاع الحلق)',
            color: '#60a5fa',
            widthPct: 44,
            daLine: `brø<span class="mss-hl-da">d</span> — Tungespidsen hviler fladt mod undertænderne (ånde på brillerne)`,
            daLine_zh: 'brød（舌尖平平贴在下门牙背面，像擦眼镜轻轻哈气一样发出软 d 音）',
            daLine_ar: 'brød (اللسان يرتاح مسطحاً خلف الأسنان السفلية مع إخراج هواء دافئ مثل مسح نظاراتك)',
            myLines: {
                en: `brea<span class="mss-hl-my">d [d]</span> — Engelsk har lyden i "the/brother", men skriver den som th, ikke d.`,
                ar: `<span class="mss-hl-my">خبز</span> — في الدنماركية حرف <strong>d الناعم</strong> ليس حرف الذال (ذ) ولا يخرج بين الأسنان أبداً! دعه يرتاح مسطحاً خلف الأسنان السفلية واخرج هواءً دافئاً كأنك تمسح نظاراتك. وحرف <strong>r الدنماركي</strong> يخرج عميقاً من قاع الحلق مثل صوت الغراب (قاع الحلق كالغين) وليس بدحرجة طرف اللسان كالراء العربية.`,
                tr: `ekmek — Tyrkisk udtaler altid d som fast [d]; det bløde danske d skal trænes særskilt.`,
                uk: `хліб — Ukrainsk har kun fast [d]; det bløde danske d findes ikke.`,
                de: `Bro<span class="mss-hl-my">t [t]</span> — Tysk gør d hårdt i slutningen af ord i stedet for blødt.`,
                es: `pare<span class="mss-hl-my">d [ð]</span> — Spansk har et blødt d i slutningen af ord og mellem vokaler (nada)!`,
                vi: `bánh mì — Vietnamesisk udtaler ikke åbne konsonanter som dansk blødt d i udlyd.`,
                fa: `نان — Persisk har altid fast [d]; det bløde danske d findes ikke.`,
                zh: `<span class="mss-hl-my">面包 (miànbāo)</span> — 汉语没有丹麦语特有的软 d（就像擦眼镜轻轻哈一口热气，舌头平躺在下牙背，千万别碰上颚！）。此外，发 <strong>L</strong> 时舌尖顶住上牙后但两边嘴角漏风；发 <strong>N</strong> 时嘴巴彻底关门，所有空气全从鼻孔挤出来！`
            },
            myLines_da: {
                zh: `Kinesisk mangler blødt d (ånde på brillerne), og har en stor udfordring med at skelne <strong>L</strong> (mundvigeluft) og <strong>N</strong> (næseluft).`,
                ar: `Arabisk ذ (dhāl) laves mellem tænderne, men dansk blødt d laves ved at ånde lunt på brillerne med tungen mod undertænderne. Dansk r er dybt i halsen (som en krages kraa eller غ) modsat arabisk tungespids-r.`
            },
            detailExplain: `<strong>Sproglyden:</strong> Selve den fysiske bevægelse, du laver med tunge, læber og luft. På dansk skifter bogstaver ofte fuldstændig lyd alt efter, om de står forrest eller bagest i ordet: f.eks. et hårdt, hurtigt <em>d</em> i <strong>d</strong>ag, men et blødt <em>d</em> i brø<strong>d</strong> (hvor du blot ånder lunt ud som på dine briller, mens tungespidsen hviler fladt bag undertænderne). Og husk kragelyden: Dansk <strong>r</strong> laves helt nede bagerst i halsen – som når en krage skriger <em>kraa</em>!`,
            detailExplain_zh: `<strong>具体的发音动作（Sproglyden）：</strong>就是舌头、嘴唇和气流的具体位置。在丹麦语里，同一个字母在词头和词尾完全是两码事：例如字母 <strong>d</strong> 在词首是舌尖轻弹的硬 d（<strong>d</strong>ag），但在词尾则是特有的<strong>软 d</strong>（brø<strong>d</strong> / ma<strong>d</strong>）——“就像你在擦眼镜前对着镜片轻轻哈一口气一样，舌尖平平贴在下门牙背面，让温暖气流懒洋洋滑出，千万别碰天花板！”再如 <strong>L 与 N</strong>：发 L 时舌尖在门牙后、空气从两边嘴角溜走（<em>læse</em>）；发 N 时嘴巴紧闭、全靠鼻腔哼出来（<em>næse</em>）！`,
            detailExplain_ar: `<strong>حركة الفم ومخرج الصوت (Sproglyden):</strong> الموضع الدقيق للسان والشفتين وطريقة خروج الهواء. في الدنماركية، الحرف نفسه يتغير صوته تماماً حسب مكانه في الكلمة:<br><br>
1) <strong>حرف d الناعم (Blødt d):</strong> أكبر فخ للناطقين بالعربية هو نطقه مثل الذال (ذ) بإخراج اللسان بين الأسنان! الطريقة الصحيحة: افعل تماماً كما تفعل عندما تنفخ هواءً دافئاً على عدسات نظاراتك لتنظيفها، مع ترك طرف اللسان مسترخياً ومسطحاً خلف الأسنان السفلية، ودع الهواء ينساب بكسل: <em>ma...d</em>، <em>brø...d</em> دون أن يلمس سقف الحلق إطلاقاً!<br><br>
2) <strong>حرف r الدنماركي:</strong> لا يُنطق بدحرجة طرف اللسان كالراء العربية (ر)، بل يخرج من قاع الحلق كصوت غراب ينادي "كراا"، وهو قريب جداً من مخرج حرف الغين (غ) في كلمة "غراب".<br><br>
3) <strong>الفرق بين P و B:</strong> حرف P الدنماركي يخرج مع انفجار قوي للهواء يحرك ورقة أمام فمك (<em>pære</em> كمثرى)، بينما B هادئ وناعم (<em>bære</em> يحمل).`,
            morePairs: [
                { da: 'dag (hårdt d i starten) ↔ brød / mad (blødt d som at ånde på briller)', note: 'Samme bogstav, to vidt forskellige måder at bevæge munden på.', note_zh: '同一个字母 d，在词首是舌尖轻点，在词尾则是像擦眼镜哈气一样的软 d！', note_ar: 'حرف d في بداية الكلمة (dag) ينطق بطرقة طرف اللسان، أما في آخر الكلمة (brød) فهو ناعم كالنفخ على النظارات!' },
                { da: 'pære (kraftig p-eksplosion) ↔ bære (blid b-lyd)', note: 'Hold et papir foran munden: ved p flyver papiret, ved b står det helt stille.', note_zh: '拿张纸放在嘴前：发 p 时纸片被气流吹飞，发 b 时纸片保持不动。', note_ar: 'ضع ورقة أمام فمك: مع p الدنماركية تطير الورقة باندفاع الهواء، ومع b تبقى ثابتة.' }
            ],
            links: [
                { label: '🔤 Træn bogstaver & lyde', label_zh: '🔤 字母与发音训练 (Træn bogstaver)', label_ar: '🔤 تدريب الحروف والأصوات (Træn bogstaver)', route: 'traen_bogstaver' },
                { label: '🎙️ Leg med udtale', label_zh: '🎙️ 趣味口语发音 (Leg med udtale)', label_ar: '🎙️ تدريب النطق التفاعلي (Leg med udtale)', route: 'leg_med_udtale' }
            ]
        },
        {
            num: 3,
            title: 'Stavelsen & rytmen',
            title_zh: '音节与节奏打拍 (Stavelsen & rytmen)',
            title_ar: 'نبض الكلمة وإيقاع الخبط والبلع (Stavelsen & rytmen)',
            subtitle: 'Ordets puls, hovedtrykket og de dovne, slugte endelser',
            subtitle_zh: '前重后轻的敲击节奏，与嘴巴懒得动的“轻快吞音”',
            subtitle_ar: 'خبطة قوية في البداية، وبقية المقاطع تُبلع برقة وسرعة',
            color: '#818cf8',
            widthPct: 51,
            daLine: `<span class="mss-hl-da">køk</span>-ke-net ➔ Udtales i 2 hurtige slag: første stavelse slås fast, resten mumles`,
            daLine_zh: 'køkkenet（日常快速口语只打 2 拍：词头用力敲，后面像滑滑梯一样轻轻滑过）',
            daLine_ar: 'køkkenet (في الكلام السريع تسمع خبطتين فقط: køk-net؛ المقطع الأوسط يبتلعه اللسان)',
            myLines: {
                en: `<span class="mss-hl-my">kit-chen</span> — Engelsk svækker også tryksvage stavelser ligesom dansk.`,
                ar: `<span class="mss-hl-my">الْـمَـطْـبَـخ (al-mat-bakh)</span> — في العربية كل حرف ومقطع صوتي ينال حقه كاملاً من النطق الواضح دون بلع للنهايات. أما الدنماركي فيضرب ضربة قوية في بداية الكلمة، ثم يبتلع النهاية بتكاسل. واحذر من إضافة كسرة خفيفة بين الحروف الساكنة في النهاية (قل: koldt مثل قفل الباب بحزم، ولا تقل kold-te).`,
                tr: `<span class="mss-hl-my">mut-fak-ta</span> — Tyrkisk giver næsten lige meget plads til hver stavelse med vokalharmoni.`,
                uk: `<span class="mss-hl-my">на кух-ні (na kukh-ni)</span> — Alle vokaler i stavelserne udtales klart og tydeligt.`,
                de: `<span class="mss-hl-my">Kü-che</span> — Tysk svækker også -e, men sluger færre lyde end dansk.`,
                es: `<span class="mss-hl-my">co-ci-na</span> — Spansk er stavelsestællende: hver stavelse og vokal høres helt tydeligt.`,
                vi: `<span class="mss-hl-my">nhà bếp</span> — Hvert ord er én fast stavelse uden tryksvage endelser.`,
                fa: `<span class="mss-hl-my">آشـپـzخـانـه (âsh-paz-khâ-neh)</span> — Hver stavelse udtales tydeligt med tryk til sidst.`,
                zh: `<span class="mss-hl-my">厨-房 (chú-fáng)</span> — 汉字字字清晰、每个字都有饱满的音调；但丹麦语说话像打节拍，力量全砸在第一个主要重音上，后面的小尾巴（如 -e, -et, -er）会像滑滑梯一样懒洋洋含糊带过，甚至直接被吞掉！`
            },
            myLines_da: {
                zh: `Hvert kinesisk tegn står som en fast kile med sin egen tone; dansk banker til på første stavelse og lader resten smuldre dovent eller blive slugt.`,
                ar: `I arabisk udtales alle stavelser med fuld vægt. På dansk trampes der hårdt på første stavelse, mens endelser sluges. Pas på ikke at indsætte små ekstra vokaler mellem konsonanter (sig koldt, ikke kold-te).`
            },
            detailExplain: `<strong>Stavelser & rytme:</strong> Når vi taler, deler vi ordene op i taktslag. På dansk samler man næsten al energien i ét hårdt tramp på den første stavelse (<strong>køk</strong>-). Resten af ordet med <em>-e-</em> udtales helt dovent og afslappet, som en lille mumlelyd, der næsten forsvinder i hurtig tale (så <em>køkkenet</em> i hverdagen føles som to hurtige trin frem for tre).`,
            detailExplain_zh: `<strong>节奏与音节（Stavelsen & rytmen）：</strong>丹麦语说话有强烈的<strong>节奏敲击感</strong>：说话人会把浑身力气重重砸在词头（如 <strong>køk-</strong>），而后面的 <em>-e-</em> 弱音节就像嘴巴懒得动一样，变成一声轻飘飘、含糊的小短音，甚至跟后面的辅音粘在一起直接吞掉。初学丹麦语的中国人最容易习惯性把每个字音节都读得饱满，但要想说得地道，就必须学会“前重后轻、大胆吞音”！`,
            detailExplain_ar: `<strong>نبض الكلمة وإيقاع الخبط والبلع (Stavelsen & rytmen):</strong> الدنماركية لغة إيقاعية تعتمد على نبضات متباعدة: المتحدث يفرغ طاقته في خبطة قوية في بداية الكلمة (<strong>køk-</strong>)، أما المقاطع اللاحقة مثل <em>-e-</em> أو <em>-et</em> فيتعامل معها الفم بكسل شديد ويبلعها حتى تختفي تقريباً (فتبدو كلمة <em>køkkenet</em> في الكلام السريع كأنها خطوتان وليست ثلاث خطوات).<br><br>
نصيحة ذهبية للناطقين بالعربية: لا تضع حركات قصيرة مساعدة بين الحروف الساكنة المتتالية في آخر الكلمة، بل اقفل الكلمة بحزم كأنك تغلق باباً (قل <em>koldt</em> بضربة واحدة حازمة، ولا تقل <em>kold-te</em>).`,
            morePairs: [
                { da: 'spi-ser → [ˈsbisɐ] (r smelter sammen med e)', note: 'Endelsen -er udtales som én kort, åben lyd uden modstand.', note_zh: '写出来是两个音节，实际说话时 -er 融合成一口气轻轻带过。', note_ar: 'كلمة spiser تُكتب بمقطعين، لكنها تُنطق عملياً بنَفَس واحد مستمر دون دحرجة الراء.' },
                { da: 'køk-ke-net → 3 skrevne stavelser, men kun 2 talte slag', note: 'Det midterste -e- forsvinder helt i hverdagssproget.', note_zh: '书面上是三个音节，快速日常说话时中间的 -e- 直接被吞掉，变成两个节拍！', note_ar: 'في الكتابة køk-ke-net ثلاث مقاطع، لكن في الحديث السريع تُبلع الـ -e- الوسطى كلياً وتتحول إلى خبطتين!' }
            ],
            links: [
                { label: '📖 Læsetræning & rytme', label_zh: '📖 语流节奏与朗读训练 (Læsetræning)', label_ar: '📖 تدريب القراءة وإيقاع الكلام (Læsetræning)', route: 'laesetraening' },
                { label: '🎙️ Træn udtale', label_zh: '🎙️ 口语发音训练 (Træn udtale)', label_ar: '🎙️ تدريب النطق الشفهي (Træn udtale)', route: 'traen_udtale' }
            ]
        },
        {
            num: 4,
            title: 'Ordets byggesten',
            title_zh: '拼装积木与小尾巴 (Ordets byggesten)',
            title_ar: 'قطع الليغو والذيل الملتصق بالكلمة (Ordets byggesten)',
            subtitle: 'Stammen og endelsen (f.eks. brød + et = brødet, spise + r = spiser)',
            subtitle_zh: '主干核心词 + 粘在屁股后面的功能小尾巴（如 brød + et = brødet）',
            subtitle_ar: 'جذر الكلمة وذيول التعريف التي تلتصق بآخره (مثل: køkken + et = køkkenet)',
            color: '#a78bfa',
            widthPct: 58,
            daLine: `køkken + <span class="mss-hl-da">-et</span> (den bestemte hale limes bag på ordet)`,
            daLine_zh: 'køkken + -et（想指“特定的那个厨房”，丹麦语把小尾巴 -et 牢牢粘在词尾）',
            daLine_ar: 'køkken + -et (ذيل التعريف يلتصق بظهر الكلمة مباشرة)',
            myLines: {
                en: `<span class="mss-hl-my">the</span> + kitchen — Bestemthed er et selvstændigt ord foran navneordet.`,
                ar: `<span class="mss-hl-my">الـ + مطبخ</span> — في العربية أداة التعريف "الـ" توضع دائماً في <em>مقدمة</em> الكلمة (المطبخ). أما في الدنماركية، فأداة التعريف ليست كلمة منفصلة في البداية، بل هي <strong>ذيل صغير (-en أو -et)</strong> يلتصق كالمغناطيس في مؤخرة الكلمة!`,
                tr: `mutfak + <span class="mss-hl-my">-ta</span> (i køkkenet) — Tyrkisk sætter sted-endelsen (-da/-ta) bag på ordet, men har ingen bestemt artikel.`,
                uk: `<span class="mss-hl-my">кухні (ingen artikel)</span> — Ukrainsk har slet ikke bestemte artikler.`,
                de: `<span class="mss-hl-my">der/die/das (in der)</span> + Küche — Bestemthed og køn står foran navneordet.`,
                es: `<span class="mss-hl-my">la</span> + cocina — Bestemthed står foran navneordet.`,
                vi: `<span class="mss-hl-my">nhà bếp</span> — Ord ændrer aldrig form med bøjningsendelser.`,
                fa: `آشپzخانه — I talesprog kan -e (-ه) sættes bagpå for bestemthed, men ellers ingen fast artikel.`,
                zh: `<span class="mss-hl-my">厨房（不用在词尾贴尾巴）</span> — 汉语不需要在词尾贴额外的小尾巴来表示“这一个”或“复数”，而是直接用“这/那”或者大家心里明白的上下文；丹麦语则把 <strong>-en / -et / -ne</strong> 像磁铁一样直接吸在单词屁股后面！`
            },
            myLines_da: {
                zh: `Kinesisk klistrer ikke små haler bag på ordet for "den bestemte" eller "flere", men bruger ord som "denne/dette" eller lader sammenhængen klare det.`,
                ar: `Arabisk sætter bestemthed foran ordet som "al-", mens dansk klistrer en lille hale (-en/-et) bag på navneordet.`
            },
            detailExplain: `<strong>Ordets byggesten:</strong> Ord er samlet som legoklodser: en grundstamme (ordets kerne) plus små haler, der klikkes på. På dansk viser man for eksempel, at man taler om en helt bestemt ting ved at lime en lille hale (<strong>-en</strong> eller <strong>-et</strong>) bag på navneordet: <em>et køkken → køkken<strong>et</strong></em> (køkken + et).`,
            detailExplain_zh: `<strong>单词的小积木（Ordets byggesten）：</strong>单词就像可以拆装的乐高积木：一块是核心主干，后面插上各种功能性的小尾巴。丹麦语最特别的习惯就是<strong>把“这一个（定指）”做成小尾巴直接粘在屁股上</strong>：比如 <em>et køkken（一个厨房）→ køkken<strong>et</strong>（这个特定的厨房）</em>，把 <strong>-en / -et / -ne</strong> 像小尾巴一样吸上去。汉语没有这种粘尾巴的习惯，都是独立说“这个厨房”或直接看语境。`,
            detailExplain_ar: `<strong>قطع الليغو وذيول الكلمات (Ordets byggesten):</strong> الكلمات تُبنى كقطع الليغو: جذر أساسي وقطع صغيرة تلتصق به لتغير وظيفته. في الدنماركية، الطريقة المعتادة لقول "هذا الشيء المحدد والمعروف" ليست وضع "الـ" في البداية كما في العربية، بل لصق ذيل صغير (<strong>-en</strong> أو <strong>-et</strong>) في آخر الكلمة مباشرة: <em>et køkken (مطبخ ما) ← køkken<strong>et</strong> (المطبخ بعينه)</em>، أو <em>et brød (خبز) ← brød<strong>et</strong> (الخبز المحدد)</em>.`,
            morePairs: [
                { da: 'et køkken ➔ køkkenet (endelsen -et limes på bagtil)', note: 'Bestemthed på dansk laves med en hale (-en/-et) i stedet for et foranstillet ord.', note_zh: '丹麦语把“这一个（定指）”做成小尾巴 -en/-et 粘在词尾，而不是像中文一样放在前面。', note_ar: 'التعريف في الدنماركية يلتصق كذيل (-en/-et) في آخر الكلمة بدلاً من وضعه في المقدمة كـ "الـ" في العربية.' },
                { da: 'køkkener (flere) ➔ køkkenerne (de bestemte køkkener)', note: 'I flertal limes flertals-halen på først (-er), og derefter bestemtheds-halen (-ne).', note_zh: '复数时先贴复数小积木 (-er)，再贴定指小尾巴 (-ne)。', note_ar: 'في صيغة الجمع تلتصق علامة الجمع أولاً (-er)، ثم يلتصق ذيل التعريف (-ne).' }
            ],
            links: [
                { label: '🏷️ Navneord & bestemthed', label_zh: '🏷️ 名词与定指尾巴 (Bestemthed)', label_ar: '🏷️ الأسماء وذيول التعريف (Bestemthed)', route: 'bestemthed' },
                { label: '📦 Top 100 Substantiver', label_zh: '📦 常用前100个名词 (Top 100 Substantiver)', label_ar: '📦 أهم 100 اسم في الدنماركية (Substantiver)', route: 'top100_substantiver' }
            ]
        },
        {
            num: 5,
            title: 'Hele ordet',
            title_zh: '完整单词与词语分工 (Hele ordet)',
            title_ar: 'الكلمة الكاملة وعملها (Hele ordet)',
            subtitle: 'Hvad ordet gør, sammensatte ord og hvorfor handlinger er så enkle',
            subtitle_zh: '动作词、名字词，以及两个词像电焊一样焊在一起的长词',
            subtitle_ar: 'الفعل البسيط المريح الذي لا يتغير مع الضمائر، والكلمات الملحومة معاً',
            color: '#c084fc',
            widthPct: 65,
            daLine: `jeg / du / han / vi <span class="mss-hl-da">spiser</span> (Præcis samme form til ALLE personer!)`,
            daLine_zh: 'jeg / du / han / vi spiser（不管是“我、你、他、我们”，动作词的样子完全一样，超级省心！）',
            daLine_ar: 'jeg / du / han / vi / de spiser (نفس شكل الفعل تماماً مع كل الضمائر، مريح للغاية!)',
            myLines: {
                en: `I <span class="mss-hl-my">eat</span> / she <span class="mss-hl-my">eats</span> — Skifter stadig ved 3. person ental (-s).`,
                ar: `<span class="mss-hl-my">آكلُ / تأكلُ / يأكلُ / نأكلُ</span> — في العربية يتغير شكل الفعل مع كل ضمير حسب المفرد والمثنى والجمع والمذكر والمؤنث. أما في الدنماركية، فالفعل واحد ولا يتغير أبداً مع أي شخص (spiser للجميع)! لكن تذكر دائماً ألا تنسى الضمير (jeg/vi)، ولا تنسَ فعل الكينونة "er" (قل: Jeg er træt، ولا تقل Jeg træt كما في جملة "أنا متعب").`,
                tr: `<span class="mss-hl-my">yiyorum / yiyorsun / yiyor</span> — Person-endelsen sidder direkte på verbet.`,
                uk: `<span class="mss-hl-my">я їм / ти їси / він їсть</span> — Handlingen skifter form for hver eneste person.`,
                de: `ich <span class="mss-hl-my">esse</span> / du <span class="mss-hl-my">isst</span> / wir <span class="mss-hl-my">essen</span> — Handlingen ændrer form efter personen.`,
                es: `<span class="mss-hl-my">como / comes / come / comemos</span> — Personformen er så tydelig, at "jeg" ofte udelades.`,
                vi: `tôi / bạn / anh ấy <span class="mss-hl-my">ăn</span> — Ordet ændrer slet ikke form.`,
                fa: `<span class="mss-hl-my">می‌خورم (-am) / می‌خوری (-i) / می‌خورد (-ad)</span> — Handlingen ændrer form efter personen.`,
                zh: `我 / 你 / 他 / 我们 <strong>吃 (chī)</strong> — 这一点中文和丹麦语简直是孪生兄弟：不管是谁在做动作，动词的样子从头到尾绝不改变，完全不用记麻烦的“我吃你吃他吃各不同”！`
            },
            myLines_da: {
                zh: `Ligesom på dansk ændrer kinesiske verber sig aldrig efter personen!`,
                ar: `Arabiske verber ændrer form efter person, køn og tal. På dansk hedder det spiser for ALLE. Til gengæld må man aldrig glemme kopulaverbet "er" i nutid (Jeg er træt).`
            },
            detailExplain: `<strong>Hele ordet:</strong> Her ser vi på det færdige ord og dets rolle (handlinger, navneord mv.). På dansk er handlinger i nutid utroligt venlige: <em>spiser</em> hedder præcis det samme, uanset om det er <em>jeg, du, han, hun, vi, I eller de</em>! Til gengæld skal man altid huske at have personen med (<em>jeg/han/vi</em>). Og så elsker dansk at svejse to ord sammen til ét langt ord uden mellemrum: <em>rug + brød = rugbrød</em>.`,
            detailExplain_zh: `<strong>完整单词与词语分工（Hele ordet）：</strong>在单个完整单词层面，丹麦语动词有一大天大的好消息：<strong>动词绝不随人称发生改变</strong>！无论做动作的是 <em>jeg（我）、du（你）、han（他）</em> 还是 <em>vi（我们）</em>，现在时统统都叫 <em><strong>spiser</strong></em>！但正因如此，丹麦语绝对不能把人称代词省掉。此外，丹麦语极其擅长将两个词无缝焊在一起组成<strong>复合长词</strong>（如 <em>rug + brød = rugbrød</em> 黑麦面包），中间千万别加空格！`,
            detailExplain_ar: `<strong>الكلمة الكاملة وعملها (Hele ordet):</strong> هنا ننظر إلى الكلمة كوحدة تامة. في الدنماركية، الأفعال في الحاضر هدية رائعة للمتعلم: الفعل <em><strong>spiser</strong></em> يحتفظ بنفس الحروف ونفس النطق تماماً سواء كان الفاعل <em>jeg (أنا)، du (أنت)، han (هو)، vi (نحن)</em> أو <em>de (هم)</em>! لا يوجد تصريف حسب المذكر والمؤنث أو المفرد والجمع في الفعل.<br><br>
لكن هناك قاعدتان ذهبيتان:<br>
1) لأن الفعل لا يتغير، لا يمكنك حذف الضمير؛ يجب أن تذكر دائماً الفاعل (<em>jeg</em>, <em>vi</em> إلخ).<br>
2) لا توجد في الدنماركية جملة اسمية بدون فعل! في العربية نقول ببساطة: "أنا جائع" أو "الطقس جميل"؛ في الدنماركية إياك أن تنسى فعل الكينونة (<strong>er</strong>): <em>Jeg <strong>er</strong> sulten</em> و <em>Vejret <strong>er</strong> godt</em>.<br><br>
وأخيراً، الدنماركية تعشق لحام الكلمات معاً في كلمة واحدة طويلة بدون مسافة: <em>rug + brød = rugbrød</em> (خبز الجاودار).`,
            morePairs: [
                { da: 'rug + brød = rugbrød (ét sammensat ord)', note: 'Dansk limer ord sammen uden mellemrum – med mellemrum betyder det noget helt andet!', note_zh: '丹麦语极其喜欢把两个词紧紧焊接在一起，中间绝不留空格！', note_ar: 'الدنماركية تلحم كلمتين معاً كالقطعة الواحدة بدون فراغ: rugbrød (خبز أسمر). وضع مسافة يغير المعنى تماماً!' },
                { da: 'spiser (nutid) ↔ spiste (datid) ↔ har spist (førnutid)', note: 'Kun tiden ændrer verbets form — aldrig hvem der gør det.', note_zh: '只有时间（现在还是过去）会改变动词样子，谁来做动作绝不影响它！', note_ar: 'الزمن فقط هو ما يغير الفعل (spiser في الحاضر، spiste في الماضي)، وليس من قام بالفعل.' }
            ],
            links: [
                { label: '⚡ Verbernes tider', label_zh: '⚡ 动词时态规律 (Verbernes tider)', label_ar: '⚡ أزمنة الأفعال وقواعدها (Verbernes tider)', route: 'verber_grammatik' },
                { label: '🏃 Top 100 Verber', label_zh: '🏃 常用前100个动词 (Top 100 Verber)', label_ar: '🏃 أهم 100 فعل في الدنماركية (Top 100 Verber)', route: 'top100_verber' },
                { label: '📦 Top 100 Substantiver', label_zh: '📦 常用前100个名词 (Top 100 Substantiver)', label_ar: '📦 أهم 100 اسم في الدنماركية (Top 100 Substantiver)', route: 'top100_substantiver' }
            ]
        },
        {
            num: 6,
            title: 'Ordgruppen',
            title_zh: '紧紧抱团的词语小模块 (Ordgruppen)',
            title_ar: 'المكعب المتماسك من الكلمات (Ordgruppen)',
            subtitle: 'Flere ord der hører sammen og flytter som én samlet kasse (f.eks. "i køkkenet", "i dag")',
            subtitle_zh: '在句子里共同进退的小方块（在厨房里 / 在那个大厨房里）',
            subtitle_ar: 'كلمات تسير معاً كصندوق واحد، وحركة الوصف السحرية ("في المطبخ الكبير")',
            color: '#f472b6',
            widthPct: 72,
            daLine: `<span class="mss-hl-da">i det store køkken</span> (Forholdsord + det + tillægsord-e + navneord)`,
            daLine_zh: 'i det store køkken（小词 i + 蹦到前面的 det + 形容词拖着 -e + 名词）',
            daLine_ar: 'i det store køkken (الصفة تقف أمام الاسم، وذيل التعريف يقفز للأمام ككلمة det مستقلة)',
            myLines: {
                en: `<span class="mss-hl-my">in the big kitchen</span> — Samme rækkefølge som dansk, men tillægsordet får ingen -e-hale.`,
                ar: `<span class="mss-hl-my">في المطبخِ الكبيرِ (fī al-matbakh al-kabīr)</span> — في العربية الصفة تأتي <em>بعد</em> الاسم ("المطبخ الكبير"). أما في الدنماركية، فالصفة تقف دائماً <em>أمام</em> الاسم، وذيل التعريف (-et) يقفز فجأة إلى الأمام ليتحول إلى <strong>det</strong> مستقل مع إضافة -e للصفة: <em>det store køkken</em>!`,
                tr: `<span class="mss-hl-my">büyük mutfak-ta</span> — Tillægsordet står forrest, men "i" (-ta) sidder allerbagest som endelse.`,
                uk: `<span class="mss-hl-my">у великій кухні</span> — Ordene ændrer form efter ordet "у".`,
                de: `<span class="mss-hl-my">in der großen Küche</span> — Tillægsordet står foran navneordet med egen bøjningshale.`,
                es: `<span class="mss-hl-my">en la cocina grande</span> — Tillægsordet står normalt efter navneordet ("i køkkenet store").`,
                vi: `<span class="mss-hl-my">trong nhà bếp lớn</span> — Ordet lớn (stor) står efter nhà bếp (køkken).`,
                fa: `<span class="mss-hl-my">در آشپزخانهٔ بزرگ (dar âshpazkhâneh-ye bozorg)</span> — Tillægsordet står efter navneordet bundet med en lille -e-lyd.`,
                zh: `<span class="mss-hl-my">在大厨房里</span> — 汉语说“在大厨房里”，形容词“大”直接放在“厨房”前面；但在丹麦语里，只要在厨房前加了形容词，原本粘在屁股后面的小尾巴 -et 就会立刻受到惊吓，蹦到最前面变成独立的 <strong>det</strong>，而且形容词屁股必须加上一个小 -e：<em><strong>det</strong> stor<strong>e</strong> køkken</em>！`
            },
            myLines_da: {
                zh: `Kinesisk sætter sted og tid foran handlingen, og lader tillægsordet stå direkte ved navneordet uden at flytte rundt på artikler.`,
                ar: `Arabisk sætter tillægsordet bag efter navneordet ("køkkenet det store"). På dansk står det foran, og bestemtheden hopper ud foran som "det" (det store køkken).`
            },
            detailExplain: `<strong>Ordgruppen (byggeblokken):</strong> En lille gruppe ord, der holder hinanden i hånden og flytter rundt som én samlet kasse i sætningen: f.eks. <em>frisk brød</em>, <em>i køkkenet</em> eller <em>i det store køkken</em>. Bemærk tricket på dansk: Så snart du sætter et tillægsord (f.eks. <em>store</em>) foran køkkenet, hopper den lille hale <em>-et</em> ud og stiller sig helt foran som <strong>det</strong>: <em><strong>det</strong> stor<strong>e</strong> køkken</em>!`,
            detailExplain_zh: `<strong>抱团的词组小积木（Ordgruppen）：</strong>好几个词紧紧抱在一起，在句子里像一个固定箱子一样一起移动（比如 <em>i køkkenet</em> 在厨房里）。丹麦语这里有一个非常顽皮的规则：如果光说厨房，尾巴是粘在后面的（<em>køkken<strong>et</strong></em>）；但只要中间塞进一个形容词（比如大 store），后面的尾巴就会立刻像弹簧一样蹦到最前面变成 <strong>det</strong>，形容词后面还要跟一个 -e：<em><strong>det</strong> stor<strong>e</strong> køkken</em>！`,
            detailExplain_ar: `<strong>المكعب المتماسك من الكلمات (Ordgruppen):</strong> مجموعة كلمات مترابطة تتحرك في الجملة ككتلة واحدة مثل: <em>i køkkenet</em> (في المطبخ) أو <em>i det store køkken</em> (في المطبخ الكبير).<br><br>
لاحظ الحيلة الدنماركية الشهيرة: عندما تقول "المطبخ" بمفرده، يلتصق الذيل في آخره (<em>køkken<strong>et</strong></em>). لكن بمجرد أن تضع صفة مثل "الكبير" (<em>store</em>) أمامه، يقفز هذا الذيل فوراً إلى الأمام ليصبح كلمة مستقلة <strong>det</strong>، وتأخذ الصفة نهاية <strong>-e</strong>: <em><strong>det</strong> stor<strong>e</strong> køkken</em>! وتذكر دائماً أن الصفة تسبق الاسم، على عكس الترتيب العربي المعتاد.`,
            morePairs: [
                { da: 'køkken-et (uden tillægsord) ➔ det store køkken (med tillægsord)', note: 'Endelsen -et flytter frem foran tillægsordet som et selvstændigt "det".', note_zh: '原本在后面的尾巴 -et，一碰到形容词就立刻蹦到前面变成独立的 det！', note_ar: 'køkkenet (بدون صفة، الذيل بالخلف) ➔ det store køkken (مع صفة، التعريف يقفز للأمام).' },
                { da: '[i køkkenet] = én samlet steds-kasse', note: 'Hele ordgruppen flytter samlet rundt i sætningen uden at skilles ad.', note_zh: '“在厨房里”是一整块紧抱的积木，在句子里移动时谁也不能拆散它。', note_ar: 'عبارة [i køkkenet] كتلة مكانية واحدة؛ تتحرك معاً ولا يمكن تفريق كلماتها في الجملة.' }
            ],
            links: [
                { label: '🎨 Adjektiver & bøjning', label_zh: '🎨 形容词变尾规则 (Adjektiver)', label_ar: '🎨 الصفات وقواعد تصريفها (Adjektiver)', route: 'top100_adjektiver' },
                { label: '🏷️ Bestemthed foran ord', label_zh: '🏷️ “这一个”蹦到前面的奥秘 (Bestemthed)', label_ar: '🏷️ قفز أداة التعريف للأمام مع الصفة (Bestemthed)', route: 'bestemthed' }
            ]
        },
        {
            num: 7,
            title: 'Sætningen & ordstillingen',
            title_zh: '整句排队规矩与第二位法则 (Sætningen & ordstillingen)',
            title_ar: 'ترتيب الجملة وقاعدة الفعل في المركز الثاني (Sætningen & ordstillingen)',
            subtitle: 'Hvem gør hvad, og reglen om at handlingen altid skal stå på Plads 2',
            subtitle_zh: '正常排队顺序，与“时间地点放开头，动作立刻抢占第2位（V2 铁律）”',
            subtitle_ar: 'من يفعل ماذا، وقاعدة V2 الصارمة: إذا بدأت بالوقت أو المكان، الفعل يسبق الفاعل!',
            color: '#fb923c',
            widthPct: 79,
            daLine: `1) <span class="mss-hl-da">Jeg spiser</span> brød i køkkenet i dag • 2) I dag <span class="mss-hl-da">spiser jeg</span> brød i køkkenet`,
            daLine_zh: '1) Jeg spiser brød i dag（我做动作：我 吃 面包）• 2) I dag spiser jeg brød（今天一开头，吃 抢占第2位，我 只能退到第3位！）',
            daLine_ar: '1) Jeg spiser brød i dag • 2) I dag spiser jeg brød (إذا بدأت بـ "اليوم"، الفعل spiser يحتل المركز 2 فوراً، و"jeg" تتراجع للمركز 3!)',
            myLines: {
                en: `1) <span class="mss-hl-my">I eat</span> bread today • 2) Today <span class="mss-hl-my">I eat</span> bread... (Engelsk bytter ikke om!)`,
                ar: `<span class="mss-hl-my">اليوم آكل الخبز / آكل الخبز اليوم</span> — في العربية يمكنك تقديم الوقت أو تأخيره دون أن تتأثر بقية الجملة. أما الدنماركية فلديها قاعدة حديدية لا تتزحزح: <strong>الفعل يجب أن يكون دائماً في المركز الثاني (قاعدة V2)</strong>! إذا بدأت بكلمة "اليوم" (I dag)، يقفز الفعل فوراً للمركز 2 وتتراجع "أنا" (jeg) إلى المركز 3: <em>"I dag <strong>spiser jeg</strong>..."</em>.`,
                tr: `Bugün mutfakta ekmek <span class="mss-hl-my">yiyorum</span> — Handlingen står altid allerbagerst.`,
                uk: `Сьогодні <span class="mss-hl-my">я їм</span> хліб — Personen bliver stående foran handlingen, selv når "I dag" står forrest.`,
                de: `1) <span class="mss-hl-my">Ich esse</span>... • 2) Heute <span class="mss-hl-my">esse ich</span>... — Tysk låser også handlingen til Plads 2!`,
                es: `Hoy <span class="mss-hl-my">(yo) como</span> pan en la cocina — Bytter ikke tvunget om efter "Hoy".`,
                vi: `Hôm nay <span class="mss-hl-my">tôi ăn</span> bánh mì — "I dag jeg spiser..." (bytter aldrig om).`,
                fa: `امروز در آشپzخانه نان <span class="mss-hl-my">می‌خورم</span> — Handlingen står altid til allersidst i sætningen.`,
                zh: `<span class="mss-hl-my">今天我吃面包</span> — 汉语说“今天我吃面包”，排队顺序依然是“今天 + 我 + 吃 + 面包”；但丹麦语有一条不可动摇的铁律——<strong>动作词必须永远抢占第 2 个位置（V2 规则）</strong>！如果你把“今天 (I dag)”放到最前面第 1 位，做动作的“吃 (spiser)”就必须马上抢占第 2 位，原本的主角“我 (jeg)”被挤到第 3 位：<em>"I dag <strong>spiser jeg</strong> brød..."</em>！`
            },
            myLines_da: {
                zh: `Kinesisk beholder samme rækkefølge som altid ("I dag jeg spiser..."), mens dansk har en jernregel: <strong>Handlingen skal altid stå på Plads 2</strong>. Starter du med "I dag", bytter "spiser" og "jeg" plads: <em>"I dag spiser jeg..."</em>.`,
                ar: `Arabisk har mere fri ordstilling. Dansk har en ubrydelig jernregel: <strong>Handlingen skal stå på Plads 2</strong>. Sætter du "I dag" forrest, SKAL handlingen komme lige efter: <em>I dag spiser jeg...</em>`
            },
            detailExplain: `<strong>Sætningen & ordstillingen:</strong> Hvordan ordene stiller sig i kø for at danne en hel mening. Grundreglen er: <strong>Hvem (jeg) + Gør (spiser) + Hvad (brød) + Hvor (i køkkenet) + Hvornår (i dag)</strong>. Men dansk har en berømt regel: <strong>Handlingen skal ALTID stå på Plads 2</strong>! Hvis du vælger at starte sætningen med tid eller sted ("I dag..."), skubber det handlingen frem, så personen må rykke om bagved: <em>"I dag <strong>spiser jeg</strong> brød..."</em>.`,
            detailExplain_zh: `<strong>排队顺序与第二位铁律（Sætningen & ordstillingen）：</strong>丹麦语最标准的排队顺序是：<strong>谁 (Jeg) + 做什么 (spiser) + 吃什么 (brød) + 在哪 (i køkkenet) + 什么时候 (i dag)</strong>。但丹麦语最容易让外国人栽跟头的就是<strong>“动词必须站在第2位（V2 铁律）”</strong>：只要你想强调时间或地点，把它拿来开头（例如把 <em>I dag...</em> 放在第 1 位），动作词（<em>spiser</em>）就必须死死守在第 2 位，做动作的人（<em>jeg</em>）只能委屈地挪到第 3 位：<em>"I dag <strong>spiser jeg</strong>..."</em>。中文里习惯说“今天我吃...”，初学者千万别顺嘴说错成 *I dag jeg spiser*！`,
            detailExplain_ar: `<strong>ترتيب الجملة وقاعدة المركز الثاني (Sætningen & ordstillingen):</strong> الترتيب المعتاد للجملة الدنماركية هو:<br><br>
<strong>من (Jeg) + يفعل (spiser) + ماذا (brød) + أين (i køkkenet) + متى (i dag)</strong> (لاحظ أن المكان يسبق الزمان في نهاية الجملة).<br><br>
لكن أهم قاعدة تُميز الدنماركية وتوقع الكثيرين في الخطأ هي <strong>قاعدة الفعل في المركز الثاني (V2)</strong>: إذا أردت إبراز الوقت أو المكان ووضعته في بداية الجملة في المركز 1 (مثل: <em>I dag...</em>)، يلتزم الفعل بالبقاء في المركز 2، ويُجبر الفاعل (<em>jeg</em>) على الانتقال خلفه إلى المركز 3: <em>"I dag <strong>spiser jeg</strong> brød..."</em>. إياك أن تقول بالترتيب العربي المباشر: *I dag jeg spiser*!`,
            morePairs: [
                { da: 'Normal: [Jeg] [spiser] brød [i køkkenet] [i dag] (Sted før Tid)', note: 'På dansk kommer Sted (hvor) normalt før Tid (hvornår) til sidst.', note_zh: '丹麦语句尾排队时，地点（在厨房里）通常排在时间（今天）前面。', note_ar: 'الترتيب الطبيعي: Jeg spiser brød i køkkenet i dag (المكان يسبق الزمان عادة في آخر الجملة).' },
                { da: 'Plads 2-reglen: [I dag] [spiser] [jeg] brød i køkkenet', note: 'Handlingen skal altid blive på Plads 2 i en almindelig sætning.', note_zh: '时间一旦放在第 1 位，动词牢牢霸占第 2 位，主角退至第 3 位。', note_ar: 'قاعدة المركز 2: I dag spiser jeg brød. بدأنا بالزمان، فاحتل الفعل المركز الثاني وتراجع الفاعل للمركز الثالث.' }
            ],
            links: [
                { label: '🏗️ Sådan bygger du en sætning', label_zh: '🏗️ 丹麦语句子骨架搭建 (Byg en sætning)', label_ar: '🏗️ هيكل بناء الجملة الدنماركية (Byg en sætning)', route: 'grounding' },
                { label: '🧩 Ordstilling & Plads 2', label_zh: '🧩 语序与动词第二位 (Ordstilling)', label_ar: '🧩 ترتيب الكلمات وقاعدة المركز الثاني (Ordstilling)', route: 'ordstilling' },
                { label: '⏰ Træn tidsudtryk', label_zh: '⏰ 时间短语表达 (Træn tidsudtryk)', label_ar: '⏰ تعبيرات الوقت والزمان (Træn tidsudtryk)', route: 'traen_tidsudtryk' }
            ]
        },
        {
            num: 8,
            title: 'Talehandlingen (spørgsmål & opfordring)',
            title_zh: '一句话想干什么 (Talehandlingen)',
            title_ar: 'الهدف من الكلام: سؤال أو طلب (Talehandlingen)',
            subtitle: 'Hvad du vil med sætningen: spørge med spørgeord, ja/nej eller give en opfordring',
            subtitle_zh: '打听情况（问什么）、确认是不是（问句动作打头），还是叫人做动作',
            subtitle_ar: 'السؤال بأداة استفهام، السؤال بنعم/لا بتقديم الفعل، وصيغة الأمر بحذف النهاية',
            color: '#facc15',
            widthPct: 86,
            daLine: `Spørgeord: "<span class="mss-hl-da">Hvad spiser du?</span>" • Ja/nej: "<span class="mss-hl-da">Spiser du</span> brød?" • Bydemåde: "<span class="mss-hl-da">Spis</span> brødet!"`,
            daLine_zh: '问什么："Hvad spiser du?" • 问是不是："Spiser du brød?" • 叫人吃："Spis brødet!"',
            daLine_ar: 'سؤال بأداة: "Hvad spiser du?" • سؤال بنعم/لا: "Spiser du brød?" • أمر: "Spis brødet!"',
            myLines: {
                en: `Hv: "What do you eat?" • Ja/nej: "Do you eat bread?" • Imp.: "Eat the bread!"`,
                ar: `أداة: "<span class="mss-hl-my">ماذا تأكل؟</span>" • نعم/لا: "<span class="mss-hl-my">هل تأكل</span> الخبز؟" • أمر: "<span class="mss-hl-my">كُلْ</span> الخبز!"`,
                tr: `Hv: "Ne yiyorsun?" • Ja/nej: "Ekmek yiyor musun?" • Imp.: "Ekmeği ye!"`,
                uk: `Hv: "Що ти їси?" • Ja/nej: "Ти їси хліб?" • Imp.: "Їж хліб!"`,
                de: `Hv: "Was isst du?" • Ja/nej: "Isst du Brot?" • Imp.: "Iss das Brot!"`,
                es: `Hv: "¿Qué comes?" • Ja/nej: "¿Comes pan?" • Imp.: "¡Come el pan!"`,
                vi: `Hv: "Bạn ăn gì?" • Ja/nej: "Bạn ăn bánh mì không?" • Imp.: "Hãy ăn bánh mì đi!"`,
                fa: `Hv: "چه می‌خوری؟" • Ja/nej: "آیا نان می‌خوری؟" • Imp.: "نان را بخور!"`,
                zh: `特殊问: "你吃<span class="mss-hl-my">什么 (shénme)?</span>" • 是非问: "你吃面包<span class="mss-hl-my">吗 (ma)?</span>" • 叫人做: "快<span class="mss-hl-my">吃</span>面包!"`
            },
            myLines_da: {
                zh: `Kinesisk lader spørgeordet stå bagerst ("du spiser hvad?"); ja/nej-spørgsmål bruger spørgepartiklen "ma"; ved opfordringer bruges stammen uden bøjning.`,
                ar: `Hv-spørgsmål har spørgeord + handling; Ja/nej-spørgsmål har handling forrest uden "hal" (هل); Bydemåde er helt ens for alle uden endelse (spis!).`
            },
            detailExplain: `<strong>Talehandlingen (hvad du vil sige):</strong> En sætning bruges altid i den virkelige verden: Vil du have ny viden (spørgsmål med spørgeord), vil du have et ja eller nej, eller vil du give en god opfordring? Her er de 3 måder at bygge det op på:`,
            detailExplain_zh: `<strong>日常说话的意图（Talehandlingen）：</strong>说话到底是为了什么？在丹麦语里有三种最常见的说话方式：<strong>1) 带着疑问小词打听情况（Hvad/Hvor...）</strong>：疑问词占第1位，动作占第2位；<strong>2) 确认是还是不是（Ja/nej 问句）</strong>：不用任何疑问字，直接把动作放到最前面第1位；<strong>3) 叫别人做事或提建议（Imperativ / Bydemåde）</strong>：直接用动词最本来的短身子，把后面的 -er 剪掉，不用带“你 (du)”！`,
            detailExplain_ar: `<strong>الهدف من الكلام (Talehandlingen):</strong> عندما نتحدث في الواقع، نستخدم الجملة لتحقيق هدف محدد: إما لطلب معلومة جديدة، أو للتأكد بنعم/لا، أو لإعطاء نصيحة أو أمر. في الدنماركية هناك 3 قوالب أساسية:`,
            utteranceCards: [
                {
                    badge: '1. ÅBENT SPØRGSMÅL (Spørg med hv-ord)',
                    badge_zh: '1. 带着疑问词打听情况（HV-ORD • 疑问小词打头）',
                    badge_ar: '1. سؤال بأداة استفهام (Hv-ord • طلب معلومة جديدة)',
                    accent: '#38bdf8',
                    daFormula: 'Spørgeord (Plads 1) + Handlingen (Plads 2) + Personen (Plads 3)',
                    daFormula_zh: '疑问小词 (第1位) + 动作词 (第2位) + 谁 (第3位)',
                    daFormula_ar: 'أداة الاستفهام (المركز 1) + الفعل (المركز 2) + الفاعل (المركز 3)',
                    daExample: '"<strong>Hvad</strong> <u>spiser</u> du i køkkenet i dag?" • "<strong>Hvornår</strong> <u>spiser</u> vi?"',
                    daSubNote: 'De vigtigste spørgeord: hvad, hvem, hvor, hvornår, hvorfor, hvordan.',
                    daSubNote_zh: '核心疑问词：hvad (什么), hvem (谁), hvor (哪里), hvornår (何时), hvorfor (为什么), hvordan (如何)。',
                    daSubNote_ar: 'أهم أدوات الاستفهام: hvad (ماذا)، hvem (من)، hvor (أين)، hvornår (متى)، hvorfor (لماذا)، hvordan (كيف).',
                    myByLang: {
                        en: '"<strong>What do</strong> you eat in the kitchen today?" — Engelsk indsætter do/does. Dansk sætter handlingen direkte på Plads 2!',
                        ar: '"<strong>ماذا</strong> تأكل في المطبخ اليوم؟" — في العربية نبدأ بأداة الاستفهام ثم الفعل تماماً مثل الدنماركية، لكن في الدنماركية يبقى الفعل مقيداً بالمركز الثاني ويليه الفاعل مباشرة (Hvad spiser du...).',
                        tr: '"Bugün mutfakta <strong>ne</strong> yiyorsun?" — Spørgeordet ne bliver inde foran handlingen.',
                        uk: '"<strong>Що</strong> ти їси на кухні сьогодні?" — Personen ти står normalt før handlingen.',
                        de: '"<strong>Was</strong> isst du heute in der Küche?" — Samme opbygning: Spørgeord + Handling + Person!',
                        es: '"¿<strong>Qué</strong> comes en la cocina hoy?" — Spørgeord + Handling.',
                        vi: '"Hôm nay bạn ăn <strong>gì</strong> trong nhà bếp?" — Spørgeordet står bagerst på svarets plads.',
                        fa: '"امروز در آشپزخانه <strong>چه</strong> می‌خوری؟" — Spørgeordet står inde i sætningen.',
                        zh: '"今天你在厨房吃<strong>什么</strong>？" — 汉语把“什么”留在最后：“你今天在厨房吃什么？”；但丹麦语必须把疑问词（Hvad）提到最前面，而且动作（spiser）必须抢占在第2位，人（du）排在第3位！'
                    },
                    myByLang_da: {
                        zh: 'Kinesisk lader spørgeordet stå bagerst på svarets plads ("du spiser hvad?"), mens dansk rykker det helt forrest og lader handlingen stå på Plads 2.',
                        ar: 'I arabisk kan spørgeord stå forrest ligesom på dansk; på dansk er handlingen altid låst til Plads 2 efterfulgt af subjektet.'
                    }
                },
                {
                    badge: '2. JA/NEJ-SPØRGSMÅL (Lukket spørgsmål uden spørgeord)',
                    badge_zh: '2. 确认是还是不是（JA/NEJ • 动作词打头阵）',
                    badge_ar: '2. سؤال بنعم أو لا (Ja/Nej • بدون أداة هل)',
                    accent: '#facc15',
                    daFormula: 'Handlingen allerforrest (Plads 1) + Personen (Plads 2)',
                    daFormula_zh: '动作词直接打头阵 (第1位) + 谁 (第2位)',
                    daFormula_ar: 'الفعل مباشرة في البداية (المركز 1) + الفاعل (المركز 2)',
                    daExample: '"<strong>Spiser</strong> <u>du</u> brød i køkkenet i dag?"',
                    daSubNote: 'Dansk bytter bare plads på handling og person — uden ekstra spørgeord.',
                    daSubNote_zh: '丹麦语直接把动作推到最前面变成问句，无需添加辅助疑问词。',
                    daSubNote_ar: 'في الدنماركية لا توجد كلمة تعادل "هل"؛ يكفي أن تنقل الفعل إلى أول الجملة ليتحول الكلام إلى سؤال فوري!',
                    myByLang: {
                        en: '"<strong>Do</strong> you eat bread...?" — Engelsk skal bruge Do/Are forrest. På dansk rykker selve handlingen (Spiser) frem forrest!',
                        ar: '"<strong>هل</strong> تأكل الخبز...؟" — في العربية نستعمل أداة "هل" في البداية. أما في الدنماركية فلا توجد أداة استفهام إضافية، بل كل ما تفعله هو وضع الفعل (<em>Spiser</em>) في بداية الجملة ليصبح سؤالاً: <em>"Spiser du brød?"</em>.',
                        tr: '"Bugün mutfakta ekmek yiyor <strong>musun</strong>?" — Tyrkisk sætter spørgepartiklen til sidst efter handlingen.',
                        uk: '"<strong>Ти їси</strong> хліб на кухні сьогодні?" — Samme rækkefølge; tonefaldet afgør det.',
                        de: '"<strong>Isst du</strong> heute Brot in der Küche?" — Bytter plads på handling og person præcis som dansk.',
                        es: '"¿<strong>Comes</strong> pan en la cocina hoy?" — Afgøres af det stigende tonefald.',
                        vi: '"Hôm nay bạn ăn bánh mì <strong>không</strong>?" — Sætter không allerbagerst.',
                        fa: '"<strong>آیا</strong> امروز نان می‌خوری؟" — Bruger et spørgeord forrest.',
                        zh: '"你今天在厨房吃面包<strong>吗</strong>？" — 汉语习惯在句尾加个“吗”：“你今天在厨房吃面包吗？”；但丹麦语根本没有“吗”这个字，它只要把动作（Spiser）直接拎到最前面第1位，立刻就变成了问句！'
                    },
                    myByLang_da: {
                        zh: 'Kinesisk bruger et lille "ma" til sidst; dansk bytter direkte om på person og handling, så handlingen står forrest.',
                        ar: 'Arabisk indleder med et lille spørgeord som هل (hal); dansk har intet spørgeord, men rykker blot handlingen frem forrest.'
                    }
                },
                {
                    badge: '3. OPFORDRING & RÅD (Bydemåde)',
                    badge_zh: '3. 让人行动或提建议（Bydemåde • 剪掉尾巴直接说）',
                    badge_ar: '3. الأمر والنصيحة (Bydemåde • احذف ذيل الفعل)',
                    accent: '#4ade80',
                    daFormula: 'Kun verbets korte stamme (fjern -er fra nutid) — uden "du"!',
                    daFormula_zh: '只留动作词的短身子（把 -er 尾巴切掉）— 连“你 (du)”都省了！',
                    daFormula_ar: 'جذع الفعل القصير فقط (احذف -er من الحاضر) — بدون ذكر "du" (أنت)!',
                    daExample: '"<strong>Spis</strong> brødet i køkkenet!" • "<strong>Kom</strong> ind og <strong>sæt</strong> dig!"',
                    daSubNote: 'Sådan gøres det: spiser → spis! • læser → læs! • venter → vent!',
                    daSubNote_zh: '口令变化口诀：spiser → spis! (吃吧!) • læser → læs! (读吧!) • venter → vent! (等一下!)',
                    daSubNote_ar: 'قاعدة سحرية: spiser ← spis! (كُلْ!) • læser ← læs! (اقرأ!) • venter ← vent! (انتظر!)',
                    myByLang: {
                        en: '"<strong>Eat</strong> the bread in the kitchen!" — Bruger grundformen uden you, meget ligesom dansk.',
                        ar: '"<strong>كُلْ</strong> الخبز في المطبخ!" — في العربية صيغة الأمر تتغير بحسب المخاطب: كُلْ (للمذكر)، كُلِي (للمؤنث)، كُلُوا (للجمع). أما في الدنماركية فالأمر واحد لا يتغير أبداً للجميع: <strong>spis!</strong> بدون أي إضافات ودون ذكر كلمة "du" (أنت)!',
                        tr: '"Mutfakta ekmeği <strong>ye</strong>!" — Bruger ordets korte rod (ye-) til sidst.',
                        uk: '"<strong>Їж</strong> хліб на кухні!" — Har særskilt form for én (їж) og flere (їжте).',
                        de: '"<strong>Iss</strong> das Brot in der Küche!" — Har forskellige former for du, ihr og Sie.',
                        es: '"¡<strong>Come</strong> el pan en la cocina!" — Skifter form mellem uformel og høflig.',
                        vi: '"<strong>Hãy ăn</strong> bánh mì trong bếp <strong>đi</strong>!" — Bruger opfordringsord.',
                        fa: '"نان را در آشپزخانه <strong>بخور</strong>!" — Dannes med en forstavelse + stammen.',
                        zh: '"在厨房里<strong>吃</strong>面包吧！" — 汉语通常说“在厨房里吃面包吧！”或“快吃！”；丹麦语则是把现在时后面的小尾巴 -er 剪掉，只留下短促有力的根（spis!），而且绝不要带 "du"！'
                    },
                    myByLang_da: {
                        zh: 'Kinesisk bruger verbets grundform (ofte med "ba" eller "kuai"); dansk bruger verbets stamme uden -er og uden "du".',
                        ar: 'Arabisk bøjer bydemåden efter køn og tal (kul, kulī, kulū); på dansk er stammen spis! fuldstændig ens for alle.'
                    }
                }
            ],
            morePairs: [
                { da: 'Almindelig: "Du spiser brød." → Ja/nej-spørgsmål: "Spiser du brød?" → Bydemåde: "Spis brødet!"', note: 'Se hvordan de samme ord skifter mening blot ved rækkefølge og endelse.', note_ar: 'الجملة العادية: "Du spiser brød" ← سؤال نعم/لا: "Spiser du brød?" ← أمر: "Spis brødet!"' },
                { da: 'Høflig opfordring: "Ville du have et stykke brød?" / "Kunne du lukke døren?"', note: 'På dansk bløder man ofte en opfordring op ved at spørge med "Kan/Kunne du...?" fremfor at kommandere.', note_ar: 'الطلب المهذب في الدنماركية يصاغ غالباً بسؤال لطيف: "Kunne du tænke dig...?" أو "Vil du være sød at...؟" بدلاً من الأمر المباشر.' }
            ],
            links: [
                { label: '💬 Lav spørgsmål (Hv- & Ja/nej)', label_zh: '💬 疑问句构造实战 (Lav spørgsmål)', label_ar: '💬 صياغة الأسئلة بالأداة وبنعم/لا (Lav spørgsmål)', route: 'lav_sporgsmal' },
                { label: '⚡ Verbernes tider & former', label_zh: '⚡ 动词所有形态总览 (Verber)', label_ar: '⚡ صيغ الأفعال والأمر (Verber)', route: 'verber_grammatik' },
                { label: '🏃 Top 100 Verber', label_zh: '🏃 常用前100个动词 (Top 100 Verber)', label_ar: '🏃 أهم 100 فعل في الدنماركية (Top 100 Verber)', route: 'top100_verber' }
            ]
        },
        {
            num: 9,
            title: 'Spørgsmål & svar (dialogen)',
            title_zh: '两人聊天一问一答 (Spørgsmål & svar)',
            title_ar: 'سؤال وجواب: كلمة Jo والصدى اللطيف (Spørgsmål & svar)',
            subtitle: 'Når to taler sammen: Spørgsmål, svar og de vigtige vaner som "Ja/Jo" og ekko-svar',
            subtitle_zh: '一问一答对答如流、丹麦人最特别的“Jo”与温暖的“回声答话”（det gør jeg）',
            subtitle_ar: 'عندما يتحدث اثنان: الرد بـ "Jo" على السؤال المنفي، والصدى الودود ("det gør jeg")',
            color: '#4ade80',
            widthPct: 93,
            daLine: `A: "Spiser du <u>ikke</u> brød?" ➔ B: "<span class="mss-hl-da">Jo, det gør jeg!</span>" (Ikke kun et tørt "ja")`,
            daLine_zh: 'A: "难道你不吃面包吗？" ➔ B: "Jo, det gør jeg!"（否定问句想说“吃！”，必须用 Jo，再加上一句温暖的回声）',
            daLine_ar: 'A: "Spiser du ikke brød?" ➔ B: "Jo, det gør jeg!" (سؤال منفي ➔ الجواب الحتمي Jo، مع صدى مهذب)',
            myLines: {
                en: `A: "Don't you eat bread?" ➔ B: "Yes, I do!" — Engelsk har ikke forskel på Ja og Jo.`,
                ar: `A: "ألا تأكل الخبز؟" ➔ B: "<span class="mss-hl-my">بَلَى (Balā)</span>، آكلُه!" — هذا تطابق مذهل بين الدنماركية والعربية! كلمة <strong>Jo</strong> الدنماركية تقابل تماماً كلمة <strong>بَلَى</strong> في القرآن واللغة العربية: إذا سألك أحد بسؤال منفي (فيه ikke / ألا) وأردت إثبات الفعل، إياك أن تقول "Ja"، بل قل حتماً <strong>"Jo!"</strong> مع صدى مهذب.`,
                tr: `B: "Evet, yiyorum" — Tyrkisk gentager handlingen i stedet for "det gør jeg".`,
                uk: `B: "Так, їм" — Bruger samme "Ja" (Так) og gentager selve handlingen.`,
                de: `B: "Doch!" — Tysk har Doch ligesom dansk Jo, men ikke "det gør jeg"-ekko.`,
                es: `B: "Sí, claro" — Spansk bruger Sí til både positive og negative spørgsmål.`,
                vi: `B: "Có, tôi có ăn" — Bruger Có til at bekræfte handlingen.`,
                fa: `B: "چرا (Cherâ)" — Persisk bruger cherâ som dansk Jo! efter et spørgsmål med nej.`,
                zh: `B: "<span class="mss-hl-my">吃啊 / 会啊</span>" — 中国人回答喜欢重复动作：“吃啊！”或“不吃”；而在丹麦语里，如果对方的问题里带着<strong>“ikke（不）”</strong>，而你想反驳说“我吃！”，<strong>千千万万不能说 Ja，必须说 "Jo"</strong>！而且丹麦人极少光秃秃扔下一个词，总会像回声一样跟上一句：<em>"Jo, det gør jeg!"</em>（吃呀，我吃呢！），显得特别礼貌亲切。`
            },
            myLines_da: {
                zh: `Kinesisk svarer ved at bekræfte handlingen (吃/会). På dansk skal du huske "Jo!" hvis spørgsmålet har et "ikke", og altid føje det venlige ekko "det gør jeg" til.`,
                ar: `Arabisk har ordet بَلَى (Balā), der svarer præcis til dansk "Jo!" efter et spørgsmål med "ikke". Og ligesom på dansk gøres svaret høfligt ved at gentage en lille hale.`
            },
            detailExplain: `<strong>Spørgsmål & svar (dialogen):</strong> Når to mennesker taler sammen, hænger replikkerne uløseligt sammen i par. På dansk er der to guldvaner, der får dig til at lyde som en indfødt: 1) Hvis nogen stiller et spørgsmål med <em>"ikke"</em> (f.eks. "Spiser du ikke brød?"), og du vil svare ja, må du ALDRIG sige "Ja" — du skal sige <strong>"Jo!"</strong>. 2) Man svarer sjældent med ét enkelt ord; man tilføjer et lille, venligt ekko: <strong>"Ja, det gør jeg"</strong> eller <strong>"Nej, det gør jeg ikke"</strong>.`,
            detailExplain_zh: `<strong>日常对话的一问一答（Spørgsmål & svar）：</strong>在丹麦生活交流，有两条黄金习惯能让你立刻听起来非常地道又温和：<br>1) <strong>“Jo”的奇妙魔力</strong>：如果对方用带有 <em>ikke（不）</em> 的否定疑问句问你（比如“难道你不想吃吗？”），而你想回答“想吃！”，在丹麦语里<strong>绝对不能说 Ja，必须大声说 "Jo!"</strong>！说 Ja 在丹麦人听来完全摸不着头脑。<br>2) <strong>不当“单字终结者”</strong>：丹麦人极少只扔出一个孤零零的 Ja 或 Nej，那样听起来很生硬冷漠。他们几乎总会在后面挂一句温暖的小回声：<em>"Ja, det gør jeg"</em>（是的，我吃呢）或者 <em>"Nej, det kan jeg ikke"</em>（不好意思，我不行呢）。`,
            detailExplain_ar: `<strong>سؤال وجواب (الحوار الثنائي):</strong> حين يتحاور شخصان، ترتبط الجمل كثنائيات متناغمة. في الدنماركية هناك عادتان ذهبيتان تجعلان كلامك راقياً وطبيعياً جداً:<br><br>
1) <strong>المفاجأة الرائعة: كلمة "Jo" تعادل "بَلَى" تماماً:</strong> إذا سألك شخص سؤالاً يحتوي على نفي (<strong>ikke</strong>) مثل: <em>"Spiser du ikke brød?" (ألا تأكل الخبز؟)</em>، وأردت أن تجيب بالإيجاب (بلى، أنا آكل)، <strong>إياك مطلقاً أن تقول "Ja"</strong>! إذا قلت Ja سيرتبك الدنماركي، بل يجب أن تقول: <strong>"Jo!"</strong> (تماماً كما تقول "بلى" في العربية).<br><br>
2) <strong>الصدى المهذب (لا تكن مجيباً جافاً):</strong> الدنماركيون نادراً ما يجيبون بكلمة وحيدة جافة مثل Ja أو Nej، لأنها تبدو فظة وقاسية. بل يضيفون دائماً صدى صغيراً لطيفاً: <em>"Ja, <strong>det gør jeg</strong>"</em> (نعم، أفعل ذلك) أو <em>"Nej, <strong>det gør jeg ikke</strong>"</em> أو <em>"Jo, <strong>det er jeg</strong>"</em>.`,
            morePairs: [
                { da: 'A: "Spiser du brød?" → B: "Ja, det gør jeg." (Almindeligt spørgsmål → Ja)', note: '"Det gør jeg" gør svaret venligt og naturligt på dansk.', note_ar: 'سؤال مثبت: "Spiser du brød?" ➔ الجواب: "Ja, det gør jeg." (سؤال عادي ➔ Ja).' },
                { da: 'A: "Er du ikke sulten?" → B: "Jo, det er jeg!" (Spørgsmål med "ikke" → Jo)', note: 'Ved ord som "er/har/kan/vil" gentages selve hjælpeordet i stedet for "gør".', note_zh: '问句里有“ikke（不）”，肯定回答千万不能说 Ja，一定要说“Jo”！', note_ar: 'سؤال منفي: "Er du ikke sulten?" ➔ الجواب: "Jo, det er jeg!" (سؤال فيه ikke ➔ حتماً Jo، ومستحيل Ja!).' }
            ],
            links: [
                { label: '🗣️ Samtaletræning', label_zh: '🗣️ 实用情景会话训练 (Samtaletræning)', label_ar: '🗣️ تدريب المحادثة الواقعية (Samtaletræning)', route: 'samtale_traening' },
                { label: '💬 Lav spørgsmål & svar', label_zh: '💬 问答应答轮次练习 (Spørgsmål & svar)', label_ar: '💬 الحوار وسؤال وجواب (Spørgsmål & svar)', route: 'lav_sporgsmal' }
            ]
        },
        {
            num: 10,
            title: 'Den fulde samtale',
            title_zh: '连贯对话与生动聊天 (Den fulde samtale)',
            title_ar: 'المحادثة الحية: جسور الربط وكلمات الابتسامة (Den fulde samtale)',
            subtitle: 'Når sætninger bindes sammen til levende tale med bindeord og småord ("nå", "lige", "ikke?")',
            subtitle_zh: '把几句话串成生动的聊天：用连接词搭桥，用丹麦语神奇小词（nå, jo, lige, ikke?）让话变甜',
            subtitle_ar: 'ربط الجمل بحروف العطف (så, fordi) وإضفاء الدفء بكلمات الحوار السحرية (nå, lige, ikke?)',
            color: '#2dd4bf',
            widthPct: 100,
            daLine: `"<span class="mss-hl-da">Nå</span>, jeg er sulten, <span class="mss-hl-da">så</span> jeg spiser lige noget brød i køkkenet, <span class="mss-hl-da">ikke?</span>"`,
            daLine_zh: '"Nå, jeg er sulten, så jeg spiser lige noget brød, ikke?"（“好啦，我饿了，所以顺便吃点面包，对吧？”）',
            daLine_ar: '"Nå, jeg er sulten, så jeg spiser lige noget brød i køkkenet, ikke?" ("حسناً، أنا جائع، لذا سآكل على السريع بعض الخبز في المطبخ، تمام؟")',
            myLines: {
                en: `"Well, I'm hungry, so I'll just eat some bread in the kitchen, okay?"`,
                ar: `"<span class="mss-hl-my">طيب / يعني</span>، أنا جائع، <span class="mss-hl-my">لذلك</span> سآكل على السريع في المطبخ، <span class="mss-hl-my">مش هيك / تمام؟</span>" — كما نستخدم في العربية العامية كلمات مثل "يعني، طيب، ماشي، تمام" لتلطيف الحديث، يستعمل الدنماركيون كلمات سحرية مثل <strong>nå, lige, jo, ikke?</strong> ليصبح الحديث دافئاً وإنسانياً.`,
                tr: `"Şey / Yani, karnım aç, o yüzden mutfakta biraz ekmek yiyorum, tamam mı?"`,
                uk: `"Ну, я голодний, тому я просто поїм хліба на кухні, добре?"`,
                de: `"Na ja, ich bin hungrig, also esse ich mal Brot in der Küche, oder?"`,
                es: `"Bueno, tengo hambre, así que como pan en la cocina, ¿vale?"`,
                vi: `"À, tôi đói rồi, nên tôi ăn chút bánh mì trong bếp nhé!"`,
                fa: `"خب، گرسنه‌ام، پس توی آشپزخانه کمی نان می‌خورم، باشه؟"`,
                zh: `"<span class="mss-hl-my">哎 (Āi)</span>，我饿了，<span class="mss-hl-my">所以</span>去厨房吃点面包，<span class="mss-hl-my">对吧？</span>" — 中文聊天时，我们会用“呢、吧、啊、嘛”来让气氛轻松；丹麦人也是一样！他们有一批神奇的<strong>“润滑小词”（nå, jo, lige, vel, ikke?）</strong>。比如加一个 <strong>lige</strong>（我“顺便”吃点），语气瞬间变得非常客气随意；句末加一个 <strong>ikke?</strong>（对吧？），立刻拉近了两人的距离！`
            },
            myLines_da: {
                zh: `Kinesisk bruger småpartikler som 呢, 吧, 啊 til at gøre stemningen venlig; dansk bruger sine egne små magiske ord som nå, jo, lige og ikke?`,
                ar: `Arabisk bruger ord som "ya'ni, tayyeb, tamām" til at skabe uformel samtalestemning. På dansk bruger vi bindeord (så, fordi, men) og småord (nå, lige, ikke?), der fungerer som sprogets smileys.`
            },
            detailExplain: `<strong>Den fulde samtale:</strong> Her binder vi flere tanker sammen, så det ikke lyder som en robot, men som et rigtigt levende menneske. På dansk bruger vi to ting til at få sproget til at flyde: 1) <strong>Bindeord</strong> som <em>så, fordi, men, når</em> til at bygge bro mellem sætningerne. 2) <strong>Småord</strong> som <em>nå, jo, lige, vel, ikke?</em>, der fungerer som sprogets smileys og gør samtalen varm og hyggelig.`,
            detailExplain_zh: `<strong>生动的整场聊天（Den fulde samtale）：</strong>在语言阶梯的最顶端，我们终于能把一连串的句子串成生动、温暖的人性化交流。地道丹麦语有两大沟通法宝：<br>1) <strong>搭桥的连接词</strong>：用 <em>fordi（因为）、så（所以）、men（但是）、når（当...时）</em> 把前后几句话连起来。<br>2) <strong>像表情包一样的“润滑小词”</strong>：丹麦人嘴里永远少不了 <em>nå（好啦/原来如此）、lige（顺便/稍微一下下）、jo（正如大家都知道的）、ikke?（对不对呀？）</em>。少用这些小词，丹麦人会觉得你像个严肃冷淡的播音员；一用上它们，你就像在丹麦朋友家里喝咖啡聊天一样自然！`,
            detailExplain_ar: `<strong>المحادثة الكاملة (Den fulde samtale):</strong> في قمة هرم اللغة، نصل إلى نسج عدة أفكار معاً لنبدو كبشر حقيقيين نتواصل بدفء، وليس كروبوتات تقرأ جملاً جافة. لتحقيق ذلك في الدنماركية نستخدم وسيلتين:<br><br>
1) <strong>جسور الربط (حروف العطف):</strong> مثل <em>fordi</em> (لأن)، <em>så</em> (لذلك/إذن)، <em>men</em> (لكن)، <em>når</em> (عندما). انتبه: كلمة <em>fordi</em> لها سحر خاص، فإذا جاء بعدها نفي، يقفز <em>ikke</em> أمام الفعل: <em>"...fordi jeg <strong>ikke</strong> spiser brød"</em>.<br><br>
2) <strong>كلمات الابتسامة السحرية (الرموز التعبيرية في الحديث):</strong> الدنماركيون يزينون كلامهم دائماً بكلمات خفيفة تجعل النبرة ودودة ومهذبة: <em>nå</em> (حسناً / أها!)، <em>lige</em> (على السريع / مجرد خطوة خفيفة)، <em>jo</em> (كما تعلم بالطبع)، و <em>ikke?</em> في نهاية الجملة (أليس كذلك؟ تمام؟). هذه الكلمات الصغيرة هي التي تحول لغتك من لغة كتب باردة إلى دنماركية أصيلة دافئة تشبه جلسة شاي بين الأصدقاء!`,
            morePairs: [
                { da: 'Jeg spiser brød, FORDI jeg er sulten. (Bindeord hvor "ikke" hopper foran handlingen) ↔ Jeg er sulten, SÅ jeg spiser brød.', note: 'Bindeordet styrer rækkefølgen af ordene i næste sætning.', note_zh: '连接词一换，后面的句子排队规矩也跟着变（比如 fordi 后面如果加“不 ikke”，ikke 会超车跳到动作前面）。', note_ar: 'أداة الربط تغير الترتيب: fordi تجعل ikke تسبق الفعل (...fordi jeg ikke spiser brød). أما så فالفعل يحتل المركز الثاني بعدها.' },
                { da: '"Nå!" (Overraskelse/ny info) • "Jeg spiser LIGE..." (Gør handlingen uformel og kort)', note: 'Småordene gør dansk levende i hverdagen.', note_zh: '善用 lige（顺便）和 nå（好啦），瞬间让你的丹麦语脱离书本腔，变得鲜活自然。', note_ar: 'استعمال كلمة lige (على السريع/قليلاً) يجعل أي طلب أو تصرف يبدو لطيفاً وغير متكلف في الحياة اليومية.' }
            ],
            links: [
                { label: '🔗 Konjunktioner & Bindeord', label_zh: '🔗 连词与复合句 (Konjunktioner)', label_ar: '🔗 حروف الربط والعطف (Konjunktioner)', route: 'traen_grammatik' },
                { label: '✨ De små magiske ord (jo, nok, lige)', label_zh: '✨ 丹麦语高频语气小词 (jo, nok, lige)', label_ar: '✨ الكلمات اليومية السحرية (jo, nok, lige)', route: 'adverbier_smaaord' },
                { label: '🕹️ Interaktive historier', label_zh: '🕹️ 沉浸式互动故事 (Interaktive historier)', label_ar: '🕹️ قصص تفاعلية لتعلم المحادثة (Interaktive historier)', route: 'historier_menu' }
            ]
        }
    ];

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'mss-top-bar';
    viewContainer.appendChild(topBar);

    // Notice banner
    const noticeBanner = document.createElement('div');
    noticeBanner.className = 'mss-notice-banner';
    viewContainer.appendChild(noticeBanner);

    // Hero
    const hero = document.createElement('div');
    hero.className = 'mss-hero';
    viewContainer.appendChild(hero);

    const stage = document.createElement('div');
    viewContainer.appendChild(stage);

    function renderStage() {
        const isZh = selectedLang === 'zh';
        const isAr = selectedLang === 'ar';

        // Top bar rendering
        topBar.innerHTML = '';
        const backBtn = document.createElement('button');
        backBtn.className = 'mss-back-btn';
        backBtn.innerHTML = isZh ? 
            `← Tilbage til forsiden (返回主页)` : 
            (isAr ? `← Tilbage til forsiden (العودة إلى الصفحة الرئيسية)` : `← Tilbage til forsiden`);
        backBtn.onclick = () => navigateFn('main');
        topBar.appendChild(backBtn);

        // Notice banner
        if (isZh) {
            noticeBanner.innerHTML = `
                <span class="mss-notice-flag">🇨🇳</span>
                <div>
                    <div class="mss-notice-title">专为中文母语者设计 (Mit sprog sammenlignet med dansk)</div>
                    <div class="mss-notice-sub">从最微小的语音特征到完整对话，十个层级全方位拆解丹麦语与中文的核心差异。随时可点击下方 🇩🇰 Dansk 查看丹麦语教师解析。</div>
                </div>
            `;
        } else if (isAr) {
            noticeBanner.innerHTML = `
                <span class="mss-notice-flag">🇸🇦</span>
                <div dir="rtl">
                    <div class="mss-notice-title">مخصص للناطقين باللغة العربية (Mit sprog sammenlignet med dansk)</div>
                    <div class="mss-notice-sub">مقارنة شاملة عبر 10 مستويات بين اللغة العربية والدنماركية — من مخارج الأصوات وحركات اللسان إلى بناء المحادثة الكاملة. اضغط على 🇩🇰 Dansk في أي وقت للاطلاع على الشرح للمعلمين بالدنماركية.</div>
                </div>
            `;
        } else {
            noticeBanner.innerHTML = `
                <span class="mss-notice-flag">🇩🇰</span>
                <div>
                    <div class="mss-notice-title">Dansk visning: Fuld sproglig & pædagogisk forklaring</div>
                    <div class="mss-notice-sub">Du ser alle 10 sproglige niveauer med danske forklaringer og sammenligninger. Vælg 🇸🇦 Arabisk (العربية) eller 🇨🇳 Kinesisk (中文) for at se kursistens visning.</div>
                </div>
            `;
        }

        // Hero
        if (isZh) {
            hero.innerHTML = `
                <div class="mss-hero-kicker">🌍 语言指南 • 从最小发音特征到完整对话</div>
                <h1>我的母语与丹麦语对比 (Mit sprog sammenlignet med dansk)</h1>
                <p>
                    从最细微的声音特征到整场对话，十个层级全方位拆解丹麦语与中文的核心差异。主线例句：<em>"Jeg spiser brød i køkkenet i dag"</em>（我今天在厨房吃面包）。
                </p>
            `;
        } else if (isAr) {
            hero.innerHTML = `
                <div class="mss-hero-kicker">🌍 دليل مقارنة اللغات • من مخارج الحروف إلى المحادثة الكاملة</div>
                <h1 dir="rtl">لغتي الأم مقارنة باللغة الدنماركية (Mit sprog sammenlignet med dansk)</h1>
                <p dir="rtl">
                    اكتشف كيف تُبنى اللغة الدنماركية خطوة بخطوة عبر 10 مستويات واضحة، مع مقارنة مباشرة وشاملة مع اللغة العربية بالاعتماد على جملتنا المحورية: <em>"Jeg spiser brød i køkkenet i dag"</em> (أنا آكل الخبز في المطبخ اليوم).
                </p>
            `;
        } else {
            hero.innerHTML = `
                <div class="mss-hero-kicker">🌍 Sprog-kompas • Fra mindste lyd til hel samtale</div>
                <h1>Mit sprog sammenlignet med dansk</h1>
                <p>
                    Se hvordan sprog bygges op trin for trin — fra den mindste lille lydforskel til en hel samtale — med direkte sammenligning af <strong>dansk</strong> og andre sprog ved sætningen: <em>"Jeg spiser brød i køkkenet i dag"</em>.
                </p>
            `;
        }

        function buildUtteranceCardsHtml(st) {
            if (!st.utteranceCards || !st.utteranceCards.length) return '';
            return `
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr)); gap:0.85rem; margin-bottom:1.05rem;">
                    ${st.utteranceCards.map(uc => {
                        const myTxt = isZh ? uc.myByLang.zh : (isAr ? uc.myByLang.ar : (uc.myByLang_da?.zh || uc.myByLang.en));
                        const badgeText = isZh ? (uc.badge_zh || uc.badge) : (isAr ? (uc.badge_ar || uc.badge) : uc.badge);
                        const formulaText = isZh ? (uc.daFormula_zh || uc.daFormula) : (isAr ? (uc.daFormula_ar || uc.daFormula) : uc.daFormula);
                        const subNoteText = isZh ? (uc.daSubNote_zh || uc.daSubNote) : (isAr ? (uc.daSubNote_ar || uc.daSubNote) : uc.daSubNote);

                        return `
                            <div style="background:rgba(15,23,42,0.92); border:1.5px solid ${uc.accent}; border-radius:14px; padding:0.9rem 1rem; display:flex; flex-direction:column; gap:0.5rem;">
                                <div style="font-size:0.74rem; font-weight:900; color:${uc.accent}; text-transform:uppercase; letter-spacing:0.03em;">
                                    ${badgeText}
                                </div>
                                <div style="background:rgba(239,68,68,0.12); border-left:3.5px solid #ef4444; border-radius:8px; padding:0.55rem 0.7rem;">
                                    <div style="font-size:0.7rem; font-weight:900; color:#fca5a5; text-transform:uppercase; margin-bottom:0.15rem;">
                                        🇩🇰 ${isZh ? '丹麦语结构公式' : (isAr ? 'القالب الدنماركي' : 'Dansk formel')} (${formulaText})
                                    </div>
                                    <div style="font-size:0.93rem; color:#ffffff; font-weight:800;">${uc.daExample}</div>
                                    <div style="font-size:0.78rem; color:#cbd5e1; margin-top:0.25rem;">${subNoteText}</div>
                                </div>
                                <div style="background:rgba(56,189,248,0.1); border-left:3.5px solid #38bdf8; border-radius:8px; padding:0.55rem 0.7rem;" ${isAr ? 'dir="rtl"' : ''}>
                                    <div style="font-size:0.7rem; font-weight:900; color:#7dd3fc; text-transform:uppercase; margin-bottom:0.15rem;">
                                        ${isZh ? '🇨🇳 中文对比解析' : (isAr ? '🇸🇦 المقارنة بالعربية' : '💡 Pædagogisk forklaring')}
                                    </div>
                                    <div style="font-size:0.86rem; color:#e0f2fe; line-height:1.5;">${myTxt}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        function buildInlineSubViewHtml(idx) {
            const st = STEPS[idx];
            const subTitle = isZh ? 
                `${st.num}. ${st.title_zh || st.title} — ${st.subtitle_zh || st.subtitle}` : 
                (isAr ? `${st.num}. ${st.title_ar || st.title} — ${st.subtitle_ar || st.subtitle}` :
                `${st.num}. ${st.title} — ${st.subtitle}`);
            const closeBtnText = isZh ? '✕ 关闭详情' : (isAr ? '✕ إغلاق التفاصيل' : '✕ Luk underflade');

            let myAnalysisHtml = '';
            if (isZh) {
                myAnalysisHtml = st.myLines.zh;
            } else if (isAr) {
                myAnalysisHtml = st.myLines.ar;
            } else {
                myAnalysisHtml = `
                    <div style="display:flex; flex-direction:column; gap:0.25rem;">
                        <div><strong>🇸🇦 Arabisk:</strong> ${(st.myLines_da && st.myLines_da.ar) || st.myLines.ar}</div>
                        <div><strong>🇨🇳 Kinesisk:</strong> ${(st.myLines_da && st.myLines_da.zh) || st.myLines.zh}</div>
                    </div>
                `;
            }

            return `
                <div class="mss-detail-overlay" style="margin-top:0.45rem; margin-bottom:0.65rem; margin-left:1.35rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                        <div>
                            <span style="font-size:0.75rem; font-weight:900; color:${st.color}; text-transform:uppercase;">
                                ${isZh ? `深度解析 • 第 ${st.num} 级 (Trin ${st.num} af 10)` : (isAr ? `شرح تفصيلي • المستوى ${st.num} (Trin ${st.num} af 10)` : `Underflade • Trin ${st.num} af 10`)}
                            </span>
                            <h2 style="margin:0.15rem 0 0; font-size:1.32rem; font-weight:900; color:#ffffff;">
                                ${subTitle}
                            </h2>
                        </div>
                        <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
                            <button type="button" class="mss-back-btn" data-copy-step-hw="${st.num}" style="border-color:#38bdf8; color:#7dd3fc; font-weight:800;">
                                📋 ${isZh ? '复制作业链接' : (isAr ? 'نسخ رابط الواجب' : 'Kopier lektie-link')} (Trin ${st.num})
                            </button>
                            <button type="button" class="mss-back-btn" data-close-sub="1" style="border-color:#fde68a; color:#fde68a;">
                                ${closeBtnText}
                            </button>
                        </div>
                    </div>

                    <div class="mss-two-lines" style="margin-bottom:0.85rem;">
                        <div class="mss-line-da">
                            <span class="mss-line-tag" style="color:#fca5a5;">🇩🇰 ${isZh ? '丹麦语例句' : (isAr ? 'المثال الدنماركي' : 'Dansk')}:</span>
                            <span>${st.daLine}</span>
                        </div>
                        ${isZh && st.daLine_zh ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-left:0.6rem; margin-top:-0.15rem;">
                                💡 释义: ${st.daLine_zh}
                            </div>
                        ` : ''}
                        ${isAr && st.daLine_ar ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-left:0.6rem; margin-top:-0.15rem;" dir="rtl">
                                💡 المعنى والمخرج: ${st.daLine_ar}
                            </div>
                        ` : ''}
                        <div class="mss-line-my" ${isAr ? 'dir="rtl"' : ''}>
                            <span class="mss-line-tag" style="color:#7dd3fc;">${isZh ? '🇨🇳 中文对比解析' : (isAr ? '🇸🇦 المقارنة بالعربية' : '💡 Sproglig analyse')}:</span>
                            <span>${myAnalysisHtml}</span>
                        </div>
                    </div>

                    <div style="background:rgba(30,41,59,0.75); border:1px solid rgba(148,163,184,0.25); border-radius:12px; padding:0.85rem 1rem; margin-bottom:0.9rem; font-size:0.92rem; line-height:1.6; color:#e2e8f0;" ${isAr ? 'dir="rtl"' : ''}>
                        ${isZh ? (st.detailExplain_zh || st.detailExplain) : (isAr ? (st.detailExplain_ar || st.detailExplain) : st.detailExplain)}
                    </div>

                    ${buildUtteranceCardsHtml(st)}

                    ${st.num === 2 ? `
                        <div style="background: linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(15, 23, 42, 0.92) 100%); border: 2px solid #38bdf8; border-radius: 16px; padding: 1.15rem 1.35rem; margin-bottom: 1.15rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.9rem; box-shadow: 0 8px 24px rgba(0,0,0,0.35);">
                            ${isAr ? `
                                <div style="max-width: 720px;" dir="rtl">
                                    <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                        <span>🇸🇦</span> <span>تدريب عملي على الأصوات الصعبة للناطقين بالعربية</span>
                                    </div>
                                    <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                        أهم 3 مخارج صوتية: حرف d الناعم (مسح النظارات) • انفجار P مقابل B • وحرف r الحلقي (صوت الغراب)
                                    </div>
                                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
                                        1) <strong>حرف d الناعم (mad, brød):</strong> لا تخرجه بين أسنانك كالذال (ذ)! اجعل اللسان يرتاح مسترخياً خلف الأسنان السفلية، وانفخ هواءً دافئاً كأنك تمسح نظاراتك.<br>
                                        2) <strong>الفرق بين P و B:</strong> حرف P يخرج مع اندفاع قوي للهواء يحرّك ورقة أمام فمك (pære)، بينما B هادئ (bære).<br>
                                        3) <strong>حرف r الدنماركي:</strong> يخرج عميقاً من قاع الحلق كصوت غراب ينادي (قريب من حرف الغين غ في كلمة غراب)، وليس بدحرجة طرف اللسان كالراء العربية.
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_arabisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; white-space:nowrap; border-radius:12px;">
                                        🇸🇦 فتح تدريب الأصوات الصعبة للناطقين بالعربية ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.5rem 1.1rem; white-space:nowrap; border-radius:12px;">
                                        🔤 تدريب الحروف والأصوات ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(56,189,248,0.12); border-color:rgba(56,189,248,0.4); color:#ffffff; font-weight:800; font-size:0.84rem; padding:0.45rem 1rem; white-space:nowrap; border-radius:12px;">
                                        🎙️ ألعاب وتحديات النطق ➔
                                    </button>
                                </div>
                            ` : (isZh ? `
                                <div style="max-width: 720px;">
                                    <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                        <span>🇨🇳</span> <span>发音实用突破</span>
                                    </div>
                                    <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                        中国学习者实用突破：L 与 N（嘴角漏风 vs 捏鼻闭气）与软 d（擦眼镜哈气）
                                    </div>
                                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.5;">
                                        看清舌头应该放在哪、空气从哪边溜出，体验捏鼻子自检绝招，并通过麦克风进行三词口语挑战。
                                    </div>
                                </div>
                                <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_kinesisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; white-space:nowrap; border-radius:12px;">
                                    打开实用专练 ➔
                                </button>
                            ` : `
                                <div style="max-width: 720px;">
                                    <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                        <span>💡</span> <span>Udtaletræning & svære sproglyde</span>
                                    </div>
                                    <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                        Målrettede særflader: Arabisk (5 fokuslyde) & Kinesisk (L vs. N, blødt d)
                                    </div>
                                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.5;">
                                        Vælg en målgruppe for at åbne interaktive pædagogiske instruktioner, SVG-diagrammer, lyttequizzer med minimale par og mikrofontræning.
                                    </div>
                                </div>
                                <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_arabisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.88rem; padding:0.6rem 1.15rem; border-radius:12px;">
                                        🇸🇦 Arabisk udtale (5 fokuslyde) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_kinesisk" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.88rem; padding:0.6rem 1.15rem; border-radius:12px;">
                                        🇨🇳 Kinesisk udtale (L vs. N) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(148,163,184,0.18); border-color:rgba(148,163,184,0.4); color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.6rem 1.1rem; border-radius:12px;">
                                        🔤 Træn bogstaver ➔
                                    </button>
                                </div>
                            `)}
                        </div>
                    ` : ''}

                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
                        ${(st.morePairs || []).map(mp => `
                            <div style="background:rgba(15,23,42,0.85); border:1px solid rgba(148,163,184,0.22); border-radius:11px; padding:0.75rem 0.9rem;">
                                <div style="font-weight:900; color:#fde68a; font-size:0.88rem; margin-bottom:0.25rem;">${mp.da}</div>
                                <div style="font-size:0.82rem; color:#cbd5e1;" ${isAr ? 'dir="rtl"' : ''}>${isZh ? (mp.note_zh || mp.note) : (isAr ? (mp.note_ar || mp.note) : mp.note)}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.65rem; padding-top:0.8rem; border-top:1px solid rgba(148,163,184,0.2);">
                        <span style="font-size:0.8rem; font-weight:900; color:#86efac; text-transform:uppercase;">
                            ${isZh ? '在应用中训练此层级 (Træn dette niveau):' : (isAr ? 'تمارين تدريبية لهذا المستوى في التطبيق:' : 'Træn dette niveau i appen:')}
                        </span>
                        <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                            ${(st.links || []).map(lk => {
                                const linkLabel = isZh ? (lk.label_zh || lk.label) : (isAr ? (lk.label_ar || lk.label) : lk.label);
                                return `<button class="mss-link-chip" data-nav="${lk.route}">${linkLabel} ➔</button>`;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        stage.innerHTML = `
            <div class="mss-control-panel">
                <div class="mss-lang-row" style="border-top:none; padding-top:0;">
                    <span style="font-size:0.78rem; font-weight:900; color:#fde68a; text-transform:uppercase; margin-right:0.25rem;">
                        ${isZh ? '选择语言:' : (isAr ? 'اختر اللغة:' : 'Vælg sprog:')}
                    </span>
                    ${LANGUAGES.map(l => {
                        const isSupported = l.code === 'da' || l.code === 'zh' || l.code === 'ar';
                        return `
                            <button class="mss-lang-pill ${selectedLang === l.code ? 'active' : ''}" data-lang="${l.code}" style="${!isSupported ? 'opacity:0.6;' : 'font-weight:900;'}">
                                ${l.flag} ${l.name} ${!isSupported ? '<span style="font-size:0.7rem; opacity:0.8;">(Kommer senere)</span>' : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
                <div id="mss-lang-note" style="display:none; font-size:0.82rem; font-weight:800; color:#fca5a5; background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.35); border-radius:8px; padding:0.4rem 0.75rem;"></div>
            </div>

            <div class="mss-ladder-wrap">
                ${STEPS.map((st, idx) => {
                    const isOpen = openSubStepIndex === idx;
                    const stepTitle = isZh ? 
                        `第 ${st.num} 级: ${st.title_zh || st.title}` : 
                        (isAr ? `المستوى ${st.num}: ${st.title_ar || st.title}` :
                        `Trin ${st.num}. ${st.title}`);
                    const stepSubtitle = isZh ? 
                        (st.subtitle_zh || st.subtitle) : 
                        (isAr ? (st.subtitle_ar || st.subtitle) : st.subtitle);
                    const btnText = isOpen ? 
                        (isZh ? '收起详情 ▲' : (isAr ? 'إغلاق التفاصيل ▲' : 'Luk underflade ▲')) : 
                        (isZh ? '查看详情与练习 ➔' : (isAr ? 'عرض التفاصيل والتمارين ➔' : 'Se mere & links ➔'));

                    let myAnalysisLine = '';
                    if (isZh) {
                        myAnalysisLine = st.myLines.zh;
                    } else if (isAr) {
                        myAnalysisLine = st.myLines.ar;
                    } else {
                        myAnalysisLine = `
                            <div style="display:flex; flex-direction:column; gap:0.2rem;">
                                <div><strong>🇸🇦 Arabisk:</strong> ${(st.myLines_da && st.myLines_da.ar) || st.myLines.ar}</div>
                                <div><strong>🇨🇳 Kinesisk:</strong> ${(st.myLines_da && st.myLines_da.zh) || st.myLines.zh}</div>
                            </div>
                        `;
                    }

                    return `
                        <div>
                            <div class="mss-step-card" style="--step-color:${st.color}; ${isOpen ? 'border-color:#fde68a;' : ''}" data-open-sub="${idx}">
                                <div class="mss-step-dot" style="--step-color:${st.color};">${st.num}</div>
                                <div>
                                    <div style="font-size:0.72rem; font-weight:900; color:${st.color}; text-transform:uppercase;">
                                        ${isZh ? `第 ${st.num} 级 (Trin ${st.num})` : (isAr ? `المستوى ${st.num} (Trin ${st.num})` : `Trin ${st.num} af 10`)}
                                    </div>
                                    <div style="font-size:1.06rem; font-weight:900; color:#ffffff; margin:0.1rem 0 0.2rem;">
                                        ${stepTitle}
                                    </div>
                                    <div style="font-size:0.79rem; color:#cbd5e1; line-height:1.35;">
                                        ${stepSubtitle}
                                    </div>
                                </div>
                                <div class="mss-two-lines">
                                    <div class="mss-line-da">
                                        <span class="mss-line-tag" style="color:#fca5a5;">🇩🇰 ${isZh ? '丹麦语' : (isAr ? 'الدنماركية' : 'Dansk')}:</span>
                                        <span>${st.daLine}</span>
                                    </div>
                                    ${isZh && st.daLine_zh ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-left:0.6rem; margin-top:-0.15rem;">
                                            💡 释义: ${st.daLine_zh}
                                        </div>
                                    ` : ''}
                                    ${isAr && st.daLine_ar ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-left:0.6rem; margin-top:-0.15rem;" dir="rtl">
                                            💡 المعنى والمخرج: ${st.daLine_ar}
                                        </div>
                                    ` : ''}
                                    <div class="mss-line-my" ${isAr ? 'dir="rtl"' : ''}>
                                        <span class="mss-line-tag" style="color:#7dd3fc;">${isZh ? '🇨🇳 中文对比' : (isAr ? '🇸🇦 المقارنة بالعربية' : '💡 Analyse')}:</span>
                                        <span>${myAnalysisLine}</span>
                                    </div>
                                </div>
                                <div>
                                    <button class="mss-sub-btn" data-open-sub="${idx}">
                                        ${btnText}
                                    </button>
                                </div>
                            </div>
                            ${isOpen ? buildInlineSubViewHtml(idx) : ''}
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="mss-bottom-bar" style="margin-top:2.75rem; padding-top:1.5rem; border-top:1px solid rgba(255,255,255,0.12); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                <button class="mss-back-btn" data-nav="main" style="font-weight:900;">
                    ${isZh ? '← Tilbage til forsiden (返回主页)' : (isAr ? '← Tilbage til forsiden (العودة إلى الصفحة الرئيسية)' : '← Tilbage til forsiden')}
                </button>
                <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
                    ${isZh ? `
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_kinesisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.6rem 1.25rem; border-radius:12px;">
                            🇨🇳 华人难点发音专练 (Svære lyde) ➔
                        </button>
                    ` : (isAr ? `
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_arabisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.6rem 1.25rem; border-radius:12px;">
                            🇸🇦 تدريب الأصوات الصعبة للناطقين بالعربية ➔
                        </button>
                        <button class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🔤 تدريب الحروف والأصوات (Træn bogstaver) ➔
                        </button>
                    ` : `
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_arabisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🇸🇦 Arabisk udtale (5 lyde) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_kinesisk" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🇨🇳 Kinesisk udtale (L vs. N) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(148,163,184,0.18); border-color:rgba(148,163,184,0.4); color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🔤 Træn bogstaver & udtale ➔
                        </button>
                    `)}
                </div>
            </div>
        `;

        const langNoteEl = stage.querySelector('#mss-lang-note');
        stage.querySelectorAll('[data-lang]').forEach(btn => {
            btn.onclick = () => {
                const targetLang = btn.dataset.lang;
                if (targetLang !== 'zh' && targetLang !== 'da' && targetLang !== 'ar') {
                    if (langNoteEl) {
                        langNoteEl.textContent = isZh ? 
                            '⚠️ 目前支持丹麦语、阿拉伯语与中文对比，其他语言即将推出。' : 
                            (isAr ? '⚠️ حالياً تدعم المنصة المقارنة بالدنماركية والعربية والصينية، وسيتم إضافة بقية اللغات قريباً.' :
                            '⚠️ Indtil videre er Dansk, Arabisk og Kinesisk fuldt tilgængelige. Andre sprog følger snart.');
                        langNoteEl.style.display = 'block';
                        setTimeout(() => { if (langNoteEl) langNoteEl.style.display = 'none'; }, 3500);
                    }
                    return;
                }
                selectedLang = targetLang;
                localStorage.setItem('mss_selected_lang', targetLang);
                if (openSubStepIndex !== null) {
                    history.pushState(null, '', `#/${selectedLang}/mit_sprog_sammenlignet/${openSubStepIndex + 1}`);
                } else {
                    history.pushState(null, '', `#/${selectedLang}/mit_sprog_sammenlignet`);
                }
                renderStage();
            };
        });

        stage.querySelectorAll('[data-open-sub]').forEach(el => {
            el.onclick = (e) => {
                e.stopPropagation();
                const idx = Number(el.dataset.openSub);
                openSubStepIndex = openSubStepIndex === idx ? null : idx;
                const lang = selectedLang || 'ar';
                if (openSubStepIndex !== null) {
                    history.pushState(null, '', `#/${lang}/mit_sprog_sammenlignet/${openSubStepIndex + 1}`);
                } else {
                    history.pushState(null, '', `#/${lang}/mit_sprog_sammenlignet`);
                }
                renderStage();
            };
        });

        stage.querySelectorAll('[data-close-sub]').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                openSubStepIndex = null;
                const lang = selectedLang || 'ar';
                history.pushState(null, '', `#/${lang}/mit_sprog_sammenlignet`);
                renderStage();
            };
        });

        stage.querySelectorAll('[data-copy-step-hw]').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const stepNum = btn.dataset.copyStepHw;
                const lang = selectedLang || 'ar';
                const url = `${window.location.origin}${window.location.pathname}#/${lang}/mit_sprog_sammenlignet/${stepNum}`;
                const successMsg = isZh ? 
                    `📋 已复制作业链接 (第 ${stepNum} 级):\n${url}` : 
                    (isAr ? `📋 تم نسخ رابط الواجب للمستوى ${stepNum}:\n${url}` : 
                    `📋 Lektie-link til Trin ${stepNum} er kopieret:\n${url}`);
                const promptMsg = isZh ? 
                    '复制作业链接:' : 
                    (isAr ? 'انسخ رابط الواجب من هنا:' : 'Kopier lektie-link her:');

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).then(() => {
                        alert(successMsg);
                    }).catch(() => {
                        prompt(promptMsg, url);
                    });
                } else {
                    prompt(promptMsg, url);
                }
            };
        });

        stage.querySelectorAll('[data-nav]').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                navigateFn(btn.dataset.nav);
            };
        });
    }

    renderStage();
    container.appendChild(viewContainer);
}
