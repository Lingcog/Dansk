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
            line-height: 1.4;
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

        /* Prototype & Language Switcher Bar */
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
        .mss-proto-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 0.55rem;
        }
        .mss-proto-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.3);
            color: #cbd5e1;
            padding: 0.65rem 0.9rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.84rem;
            cursor: pointer;
            text-align: left;
            transition: all 0.18s ease;
        }
        .mss-proto-btn:hover {
            border-color: #fde68a;
            color: #ffffff;
        }
        .mss-proto-btn.active {
            background: linear-gradient(135deg, rgba(220, 38, 38, 0.45), rgba(153, 27, 27, 0.65));
            border-color: #fde68a;
            color: #ffffff;
            box-shadow: 0 0 16px rgba(251, 191, 36, 0.25);
        }
        .mss-lang-row {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            flex-wrap: wrap;
            padding-top: 0.55rem;
            border-top: 1px solid rgba(148, 163, 184, 0.18);
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

        /* FORSLAG 1: BYGGETRAPPEN (Lodret proceskort) */
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

        /* FORSLAG 2: SPROGSPEJLET (2 søjler side om side) */
        .mss-mirror-table {
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
        }
        .mss-mirror-row {
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            border-radius: 16px;
            padding: 0.8rem 1rem;
            display: grid;
            grid-template-columns: 185px 1fr 1fr auto;
            gap: 0.75rem;
            align-items: center;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .mss-mirror-row:hover {
            border-color: #38bdf8;
            background: rgba(30, 41, 59, 0.92);
        }
        .mss-mirror-col-da {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(248, 113, 113, 0.32);
            border-radius: 11px;
            padding: 0.6rem 0.75rem;
            font-size: 0.88rem;
            color: #ffffff;
            font-weight: 700;
        }
        .mss-mirror-col-my {
            background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.32);
            border-radius: 11px;
            padding: 0.6rem 0.75rem;
            font-size: 0.88rem;
            color: #bae6fd;
            font-weight: 700;
        }
        @media (max-width: 920px) {
            .mss-mirror-row {
                grid-template-columns: 1fr;
            }
        }

        /* FORSLAG 3: BYGGE-PYRAMIDEN + FOKUS-SCENEN */
        .mss-split-stage {
            display: grid;
            grid-template-columns: 310px 1fr;
            gap: 1.1rem;
            align-items: start;
        }
        @media (max-width: 880px) {
            .mss-split-stage {
                grid-template-columns: 1fr;
            }
        }
        .mss-stack-list {
            display: flex;
            flex-direction: column;
            gap: 0.42rem;
        }
        .mss-stack-btn {
            background: rgba(15, 23, 42, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            border-radius: 11px;
            padding: 0.58rem 0.8rem;
            color: #cbd5e1;
            font-weight: 800;
            font-size: 0.84rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            transition: all 0.16s ease;
        }
        .mss-stack-btn:hover {
            border-color: #fde68a;
            color: #ffffff;
        }
        .mss-stack-btn.active {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98));
            border-color: var(--step-color, #fde68a);
            color: #ffffff;
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.25);
        }
        .mss-focus-panel {
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(9, 13, 26, 0.99));
            border: 2px solid var(--step-color, #38bdf8);
            border-radius: 20px;
            padding: 1.3rem 1.45rem;
            box-shadow: 0 16px 38px rgba(0,0,0,0.45);
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

        /* Underflade Modal / Detail Card */
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
    `;
    viewContainer.appendChild(style);

    // Languages for comparison (Dansk og Kinesisk fuldt understøttet)
    const LANGUAGES = [
        { code: 'da', name: 'Dansk', flag: '🇩🇰' },
        { code: 'zh', name: 'Kinesisk (中文)', flag: '🇨🇳' },
        { code: 'en', name: 'Engelsk (English)', flag: '🇬🇧' },
        { code: 'ar', name: 'Arabisk (العربية)', flag: '🇸🇦' },
        { code: 'tr', name: 'Tyrkisk (Türkçe)', flag: '🇹🇷' },
        { code: 'uk', name: 'Ukrainsk (Українська)', flag: '🇺🇦' },
        { code: 'de', name: 'Tysk (Deutsch)', flag: '🇩🇪' },
        { code: 'es', name: 'Spansk (Español)', flag: '🇪🇸' },
        { code: 'vi', name: 'Vietnamesisk (Tiếng Việt)', flag: '🇻🇳' },
        { code: 'fa', name: 'Persisk / Farsi (فارسی)', flag: '🇮🇷' }
    ];

    const appLang = getLang();
    let selectedLang = localStorage.getItem('mss_selected_lang') || 'da';
    let currentProto = 1; // 1 = Byggetrappen, 2 = Sprogspejlet, 3 = Bygge-Pyramiden + Fokus-Scenen
    let activeStepIndex = 6; // Default highlight on 7. Sætningen in Proto 3
    let openSubStepIndex = null; // null = forside, number = underflade for det pågældende trin

    // De 10 trin fra mindste element (1. Lille lydforskel) til største (10. Den fulde samtale)
    // Gennemgående rød-tråd-sætning: "Jeg spiser brød i køkkenet i dag"
    const STEPS = [
        {
            num: 1,
            title: 'Lille lydforskel',
            title_zh: '微小的发音细节 (Lille lydforskel)',
            subtitle: 'En lille ændring i munden eller et lille stop i stemmen, der ændrer hele ordets betydning',
            subtitle_zh: '改变意思的微小动作（嘴唇是圆是扁 / 喉咙踩刹车 stød / 语调高低）',
            daLine_zh: 'brøʼd（嘴唇向前嘟圆 + 喉咙像打嗝般短暂停顿，面包）vs. bred（嘴角拉平微笑，宽阔）',
            color: '#38bdf8',
            widthPct: 38,
            daLine: `Læberne spidses som til et kys + lille stop i stemmen i <span class="mss-hl-da">brøʼd</span> vs. <span class="mss-hl-da">bred</span> (smilende flade læber)`,
            myLines: {
                en: `<span class="mss-hl-my">bread [bɹɛd]</span> — Engelsk har hverken runde læbevokaler som y/ø eller det danske stød.`,
                ar: `<span class="mss-hl-my">خبز (khubz)</span> — Arabisk har 3 grundvokaler (a, i, u); forskellen mellem e/ø/y findes ikke.`,
                tr: `<span class="mss-hl-my">ekmek (ø findes: ö/ü)</span> — Tyrkisk har faktisk <span class="mss-hl-my">ö</span> og <span class="mss-hl-my">ü</span> ligesom dansk ø/y, men intet stød.`,
                uk: `<span class="mss-hl-my">хліб (khlib)</span> — Ukrainsk har ikke rundede læbevokaler (ø/y) eller dansk stød.`,
                de: `<span class="mss-hl-my">Brot (ø findes: ö/ü)</span> — Tysk har <span class="mss-hl-my">ö/ü</span> ligesom dansk ø/y, men ikke dansk stød.`,
                es: `<span class="mss-hl-my">pan</span> — Spansk har 5 faste vokaler (a, e, i, o, u) uden læberundede e/i-lyde (ø/y).`,
                vi: `<span class="mss-hl-my">bánh mì</span> — Vietnamesisk bruger toner til at skelne ord, hvilket minder om det danske stød.`,
                fa: `<span class="mss-hl-my">نان (nân)</span> — Persisk har 6 vokaler uden ø/y og uden stød.`,
                zh: `<span class="mss-hl-my">面包 (miànbāo)</span> — 汉语是用<strong>四声声调</strong>（一声到四声）区分意思，没有丹麦语那种“喉咙突然刹车”（stød）；而且汉语普通话缺少像丹麦语 <strong>ø 和 y</strong> 这样把嘴唇用力向前嘟圆的母音。`
            },
            myLines_da: {
                zh: `Kinesisk skelner betydning med <strong>toner</strong> (høj, stigende, faldende) frem for stød, og mangler vokaler, hvor læberne spidses stramt som i <strong>ø og y</strong>.`
            },
            detailExplain: `<strong>Lille lydforskel:</strong> Den allermindste detalje i munden kan forandre hele ordets betydning — f.eks. om du spidser læberne som til et kys (<em>brød</em>) eller trækker mundvigene til et smil (<em>bred</em>), om lyden holdes kort eller trækkes ud, eller om der er <strong>stød</strong> (et lille stop i stemmen, som et mini-hik: <em>hun</em> vs. <em>hundʼ</em>).`,
            detailExplain_zh: `<strong>微小的发音细节（Lille lydforskel）：</strong>嘴里哪怕只有一丁点动作不同，整个词的意思就彻底变了！比如：嘴唇是像要亲吻一样用力嘟圆（<em>brød</em> 面包），还是嘴角向两边拉开微笑（<em>bred</em> 宽阔）；或者声音有没有<strong>突然被踩了一脚刹车（stød，像轻微打嗝一样短暂停顿）</strong>：<em>hun</em>（她，平顺滑出）vs. <em>hundʼ</em>（狗，有短促刹车）。汉语则是用四个声调的高低升降来区分字词。`,
            morePairs: [
                { da: 'lys (spidsede læber som til et kys) vs. lis (smilende flade læber)', note: 'Kun læbernes form adskiller ordet "lys" fra pigenavnet "Lis".', note_zh: '仅靠嘴唇是嘟圆还是展平，就能区分“光”和一个女孩的名字。' },
                { da: 'måler (uden stød) vs. målʼer (med stød)', note: 'Det lille stop i stemmen (stødet) kan skelne mellem ord og bøjninger.', note_zh: '喉咙里那个短促的小刹车（stød），是丹麦语区分单复数和词性的神奇小开关。' }
            ],
            links: [
                { label: '🎵 Leg med vokaler', label_zh: '🎵 趣味元音辨析 (Leg med vokaler)', route: 'leg_med_vokaler' },
                { label: '⚡ Det danske stød', label_zh: '⚡ 丹麦语发音小停顿 (Det danske stød)', route: 'det_danske_stoed' }
            ]
        },
        {
            num: 2,
            title: 'Sproglyden',
            title_zh: '具体的发音动作 (Sproglyden)',
            subtitle: 'Hvor tungen er og hvordan luften slipper ud (f.eks. blødt d og L vs. N)',
            subtitle_zh: '舌头具体放在哪、空气从哪边溜出（如擦眼镜哈气发软 d，以及 L 与 N 的区别）',
            daLine_zh: 'brød（舌尖平平贴在下门牙背面，像擦眼镜轻轻哈气一样发出软 d 音）',
            color: '#60a5fa',
            widthPct: 44,
            daLine: `brø<span class="mss-hl-da">d</span> — Tungespidsen hviler fladt mod undertænderne (ånde på brillerne)`,
            myLines: {
                en: `brea<span class="mss-hl-my">d [d]</span> — Engelsk har lyden i <em>"the/brother"</em>, men skriver den som <strong>th</strong>, ikke <strong>d</strong>.`,
                ar: `خبز — Arabisk har lyden <span class="mss-hl-my">ذ (dh)</span> mellem tænderne, som ligger tæt på dansk blødt d.`,
                tr: `ekmek — Tyrkisk udtaler altid <span class="mss-hl-my">d som fast [d]</span>; det bløde danske d skal trænes særskilt.`,
                uk: `хліб — Ukrainsk har kun <span class="mss-hl-my">fast [d]</span>; det bløde danske d findes ikke.`,
                de: `Bro<span class="mss-hl-my">t [t]</span> — Tysk gør d hårdt i slutningen af ord (<em>Brot/Hund → [t]</em>) i stedet for blødt.`,
                es: `pare<span class="mss-hl-my">d [ð]</span> — Spansk har faktisk et blødt d i slutningen af ord og mellem vokaler (<em>nada</em>)!`,
                vi: `bánh mì — Vietnamesisk udtaler ikke åbne konsonanter som dansk blødt d i udlyd.`,
                fa: `نان — Persisk har altid <span class="mss-hl-my">fast [d]</span>; det bløde danske d findes ikke.`,
                zh: `<span class="mss-hl-my">面包 (miànbāo)</span> — 汉语没有丹麦语特有的软 d（就像擦眼镜轻轻哈一口热气，舌头平躺在下牙背，千万别碰上颚！）。此外，许多南方方言极易混淆 <strong>L</strong> 与 <strong>N</strong>：发 <strong>L</strong> 时舌尖顶住上牙后但两边嘴角漏风；发 <strong>N</strong> 时嘴巴彻底关门，所有空气全从鼻孔挤出来！`
            },
            myLines_da: {
                zh: `Kinesisk mangler blødt d (ånde på brillerne uden at røre ganen), og har en stor udfordring med at skelne <strong>L</strong> (luften suser frit ud af mundvigene) og <strong>N</strong> (munden forseglet foran, al luft ud ad næsen).`
            },
            detailExplain: `<strong>Sproglyden:</strong> Selve den fysiske bevægelse, du laver med tunge, læber og luft. På dansk skifter bogstaver ofte fuldstændig lyd alt efter, om de står forrest eller bagest i ordet: f.eks. et hårdt, hurtigt <em>d</em> i <strong>d</strong>ag, men et blødt <em>d</em> i brø<strong>d</strong> (hvor du blot ånder lunt ud som på dine briller, mens tungespidsen hviler fladt bag undertænderne). Og husk kragelyden: Dansk <strong>r</strong> laves helt nede bagerst i halsen – som når en krage skriger <em>kraa</em>!`,
            detailExplain_zh: `<strong>具体的发音动作（Sproglyden）：</strong>就是舌头、嘴唇和气流的具体位置。在丹麦语里，同一个字母在词头和词尾完全是两码事：例如字母 <strong>d</strong> 在词首是舌尖轻弹的硬 d（<strong>d</strong>ag），但在词尾则是特有的<strong>软 d</strong>（brø<strong>d</strong> / ma<strong>d</strong>）——“就像你在擦眼镜前对着镜片轻轻哈一口气一样，舌尖平平贴在下门牙背面，让温暖气流懒洋洋滑出，千万别碰天花板！”再如 <strong>L 与 N</strong>：发 L 时舌尖在门牙后、空气从两边嘴角溜走（<em>læse</em> 阅读）；发 N 时嘴巴紧闭、全靠鼻子哼出来（<em>næse</em> 鼻子），丹麦语里绝不可混淆！`,
            morePairs: [
                { da: 'dag (hårdt d i starten) ↔ brød / mad (blødt d som at ånde på briller)', note: 'Samme bogstav, to vidt forskellige måder at bevæge munden på.', note_zh: '同一个字母 d，在词首是舌尖轻点，在词尾则是像擦眼镜哈气一样的软 d！' },
                { da: 'køkken (hård k-lyd) ↔ kage (blød og smeltende g-lyd)', note: 'Bogstaverne bliver bløde og glider sammen med vokalen bagtil.', note_zh: '辅音在元音后常会变懒、变软，几乎融化成滑溜溜的声音。' }
            ],
            links: [
                { label: '🔤 Træn bogstaver & lyde', label_zh: '🔤 字母与发音训练 (Træn bogstaver)', route: 'traen_bogstaver' },
                { label: '🎙️ Leg med udtale', label_zh: '🎙️ 趣味口语发音 (Leg med udtale)', route: 'leg_med_udtale' },
                { label: '🇨🇳 Vanskelige lyde for kinesere (L vs. N & Blødt d)', label_zh: '🇨🇳 中国学习者难点发音：L vs. N & 软 d 专练', route: 'vanskelige_lyde_kinesisk' }
            ]
        },
        {
            num: 3,
            title: 'Stavelsen & rytmen',
            title_zh: '音节与节奏打拍 (Stavelsen & rytmen)',
            subtitle: 'Ordets puls, hovedtrykket og de dovne, slugte endelser',
            subtitle_zh: '前重后轻的敲击节奏，与嘴巴懒得动的“轻快吞音”',
            daLine_zh: 'køkkenet（日常快速口语只打 2 拍：词头用力敲，后面像滑滑梯一样轻轻滑过）',
            color: '#818cf8',
            widthPct: 51,
            daLine: `<span class="mss-hl-da">køk</span>-ke-net ➔ Udtales i 2 hurtige slag: første stavelse slås fast, resten mumles`,
            myLines: {
                en: `<span class="mss-hl-my">kit-chen</span> — Engelsk svækker også tryksvage stavelser ligesom dansk.`,
                ar: `<span class="mss-hl-my">الْـمَـطْـبَـخ (al-mat-bakh)</span> — Hver konsonant og stavelse udtales tydeligt uden at sluge endelsen.`,
                tr: `<span class="mss-hl-my">mut-fak-ta</span> — Tyrkisk giver næsten lige meget plads til hver stavelse med vokalharmoni.`,
                uk: `<span class="mss-hl-my">на кух-ні (na kukh-ni)</span> — Alle vokaler i stavelserne udtales klart og tydeligt.`,
                de: `<span class="mss-hl-my">Kü-che</span> — Tysk svækker også -e, men sluger færre lyde end dansk.`,
                es: `<span class="mss-hl-my">co-ci-na</span> — Spansk er stavelsestællende: hver stavelse og vokal høres helt tydeligt.`,
                vi: `<span class="mss-hl-my">nhà bếp</span> — Hvert ord er én fast stavelse uden tryksvage endelser.`,
                fa: `<span class="mss-hl-my">آشـپـzخـانـه (âsh-paz-khâ-neh)</span> — Hver stavelse udtales tydeligt med tryk til sidst.`,
                zh: `<span class="mss-hl-my">厨-房 (chú-fáng)</span> — 汉字字字清晰、每个字都有饱满的音调；但丹麦语说话像打节拍，力量全砸在第一个主要重音上，后面的小尾巴（如 -e, -et, -er）会像滑滑梯一样懒洋洋含糊带过，甚至直接被吞掉！`
            },
            myLines_da: {
                zh: `Hvert kinesisk tegn står som en fast kile med sin egen tone; dansk banker til på første stavelse og lader resten smuldre dovent eller blive slugt.`
            },
            detailExplain: `<strong>Stavelser & rytme:</strong> Når vi taler, deler vi ordene op i taktslag. På dansk samler man næsten al energien i ét hårdt tramp på den første stavelse (<strong>køk</strong>-). Resten af ordet med <em>-e-</em> udtales helt dovent og afslappet, som en lille mumlelyd, der næsten forsvinder i hurtig tale (så <em>køkkenet</em> i hverdagen føles som to hurtige trin frem for tre).`,
            detailExplain_zh: `<strong>节奏与音节（Stavelsen & rytmen）：</strong>丹麦语说话有强烈的<strong>节奏敲击感</strong>：说话人会把浑身力气重重砸在词头（如 <strong>køk-</strong>），而后面的 <em>-e-</em> 弱音节就像嘴巴懒得动一样，变成一声轻飘飘、含糊的小短音，甚至跟后面的辅音粘在一起直接吞掉。初学丹麦语的中国人最容易习惯性把每个字音节都读得饱满，但要想说得地道，就必须学会“前重后轻、大胆吞音”！`,
            morePairs: [
                { da: 'spi-ser → [ˈsbisɐ] (r smelter sammen med e)', note: 'Endelsen -er udtales som én kort, åben lyd uden modstand.', note_zh: '写出来是两个音节，实际说话时 -er 融合成一口气轻轻带过。' },
                { da: 'køk-ke-net → 3 skrevne stavelser, men kun 2 talte slag', note: 'Det midterste -e- forsvinder helt i hverdagssproget.', note_zh: '书面上是三个音节，快速日常说话时中间的 -e- 直接被吞掉，变成两个节拍！' }
            ],
            links: [
                { label: '📖 Læsetræning & rytme', label_zh: '📖 语流节奏与朗读训练 (Læsetræning)', route: 'laesetraening' },
                { label: '🎙️ Træn udtale', label_zh: '🎙️ 口语发音训练 (Træn udtale)', route: 'traen_udtale' }
            ]
        },
        {
            num: 4,
            title: 'Ordets byggesten',
            title_zh: '拼装积木与小尾巴 (Ordets byggesten)',
            subtitle: 'Stammen og endelsen (f.eks. brød + et = brødet, spise + r = spiser)',
            subtitle_zh: '主干核心词 + 粘在屁股后面的功能小尾巴（如 brød + et = brødet）',
            daLine_zh: 'køkken + -et（想指“特定的那个厨房”，丹麦语把小尾巴 -et 牢牢粘在词尾）',
            color: '#a78bfa',
            widthPct: 58,
            daLine: `køkken + <span class="mss-hl-da">-et</span> (den bestemte hale limes bag på ordet)`,
            myLines: {
                en: `<span class="mss-hl-my">the</span> + kitchen — Bestemthed er et selvstændigt ord <em>foran</em> navneordet.`,
                ar: `<span class="mss-hl-my">الـ (al-)</span> + مطبخ — Bestemthed sættes <em>forrest</em> på ordet (al-matbakh).`,
                tr: `mutfak + <span class="mss-hl-my">-ta</span> (i køkkenet) — Tyrkisk sætter <em>sted-endelsen</em> (-da/-ta) bag på ordet, men har ingen bestemt artikel.`,
                uk: `<span class="mss-hl-my">кухні (ingen artikel)</span> — Ukrainsk har slet ikke bestemte artikler (hverken foran eller bagpå).`,
                de: `<span class="mss-hl-my">der/die/das (in der)</span> + Küche — Bestemthed og køn står <em>foran</em> navneordet.`,
                es: `<span class="mss-hl-my">la</span> + cocina — Bestemthed står <em>foran</em> navneordet.`,
                vi: `<span class="mss-hl-my">nhà bếp (ingen bøjningsendelser)</span> — Ord ændrer aldrig form med endelser.`,
                fa: `آشپzخانه — I talesprog kan <span class="mss-hl-my">-e (-ه)</span> sættes bagpå for bestemthed, men ellers ingen fast artikel.`,
                zh: `<span class="mss-hl-my">厨房（不用在词尾贴尾巴）</span> — 汉语不需要在词尾贴额外的小尾巴来表示“这一个”或“复数”，而是直接用“这/那”或者大家心里明白的上下文；丹麦语则把 <strong>-en / -et / -ne</strong> 像磁铁一样直接吸在单词屁股后面！`
            },
            myLines_da: {
                zh: `Kinesisk klistrer ikke små haler bag på ordet for "den bestemte" eller "flere", men bruger ord som "denne/dette" eller lader sammenhængen klare det.`
            },
            detailExplain: `<strong>Ordets byggesten:</strong> Ord er samlet som legoklodser: en grundstamme (ordets kerne) plus små haler, der klikkes på. På dansk viser man for eksempel, at man taler om en helt bestemt ting ved at lime en lille hale (<strong>-en</strong> eller <strong>-et</strong>) bag på navneordet: <em>et køkken → køkken<strong>et</strong></em> (køkken + et).`,
            detailExplain_zh: `<strong>单词的小积木（Ordets byggesten）：</strong>单词就像可以拆装的乐高积木：一块是核心主干，后面插上各种功能性的小尾巴。丹麦语最特别的习惯就是<strong>把“这一个（定指）”做成小尾巴直接粘在屁股上</strong>：比如 <em>et køkken（一个厨房）→ køkken<strong>et</strong>（这个特定的厨房）</em>，把 <strong>-en / -et / -ne</strong> 像小尾巴一样吸上去。汉语没有这种粘尾巴的习惯，都是独立说“这个厨房”或直接看语境。`
        },
        {
            num: 5,
            title: 'Hele ordet',
            title_zh: '完整单词与词语分工 (Hele ordet)',
            subtitle: 'Hvad ordet gør, sammensatte ord og hvorfor handlinger er så enkle',
            subtitle_zh: '动作词、名字词，以及两个词像电焊一样焊在一起的长词',
            daLine_zh: 'jeg / du / han / vi spiser（不管是“我、你、他、我们”，动作词的样子完全一样，超级省心！）',
            color: '#c084fc',
            widthPct: 65,
            daLine: `jeg / du / han / vi <span class="mss-hl-da">spiser</span> (Præcis samme form til ALLE personer!)`,
            myLines: {
                en: `I <span class="mss-hl-my">eat</span> / she <span class="mss-hl-my">eats</span> — Skifter stadig ved 3. person ental (-s).`,
                ar: `<span class="mss-hl-my">آكل (ākulu) / يأكل (ya'kulu) / نأكل (na'kulu)</span> — Handlingen ændrer form efter både person, køn og tal.`,
                tr: `<span class="mss-hl-my">yiyorum / yiyorsun / yiyor</span> — Person-endelsen sidder direkte på verbet.`,
                uk: `<span class="mss-hl-my">я їм / ти їси / він їсть</span> — Handlingen skifter form for hver eneste person.`,
                de: `ich <span class="mss-hl-my">esse</span> / du <span class="mss-hl-my">isst</span> / wir <span class="mss-hl-my">essen</span> — Handlingen ændrer form efter personen.`,
                es: `<span class="mss-hl-my">como / comes / come / comemos</span> — Personformen er så tydelig, at "jeg" ofte udelades.`,
                vi: `tôi / bạn / anh ấy <span class="mss-hl-my">ăn</span> — Ordet ændrer slet ikke form (hverken efter person eller tid!).`,
                fa: `<span class="mss-hl-my">می‌خورم (-am) / می‌خوری (-i) / می‌خورد (-ad)</span> — Handlingen ændrer form efter personen.`,
                zh: `我 / 你 / 他 / 我们 <strong>吃 (chī)</strong> — 这一点中文和丹麦语简直是孪生兄弟：不管是谁在做动作，动词的样子从头到尾绝不改变，完全不用记麻烦的“我吃你吃他吃各不同”！`
            },
            myLines_da: {
                zh: `Ligesom på dansk ændrer kinesiske verber sig aldrig efter personen!`
            },
            detailExplain: `<strong>Hele ordet:</strong> Her ser vi på det færdige ord og dets rolle (handlinger, navneord mv.). På dansk er handlinger i nutid utroligt venlige: <em>spiser</em> hedder præcis det samme, uanset om det er <em>jeg, du, han, hun, vi, I eller de</em>! Til gengæld skal man altid huske at have personen med (<em>jeg/han/vi</em>). Og så elsker dansk at svejse to ord sammen til ét langt ord uden mellemrum: <em>rug + brød = rugbrød</em>.`,
            detailExplain_zh: `<strong>完整单词与词语分工（Hele ordet）：</strong>在单个完整单词层面，丹麦语动词有一大天大的好消息：<strong>动词绝不随人称发生改变</strong>！无论做动作的是 <em>jeg（我）、du（你）、han（他）</em> 还是 <em>vi（我们）</em>，现在时统统都叫 <em><strong>spiser</strong></em>！但正因如此，丹麦语绝对不能把人称代词省掉。此外，丹麦语极其擅长将两个词无缝焊在一起组成<strong>复合长词</strong>（如 <em>rug + brød = rugbrød</em> 黑麦面包），中间千万别加空格！`,
            morePairs: [
                { da: 'rug + brød = rugbrød (ét sammensat ord)', note: 'Dansk limer ord sammen uden mellemrum – med mellemrum betyder det noget helt andet!', note_zh: '丹麦语极其喜欢把两个词紧紧焊接在一起，中间绝不留空格！' },
                { da: 'spiser (nutid) ↔ spiste (datid) ↔ har spist (førnutid)', note: 'Kun tiden ændrer verbets form — aldrig hvem der gør det.', note_zh: '只有时间（现在还是过去）会改变动词样子，谁来做动作绝不影响它！' }
            ],
            links: [
                { label: '⚡ Verbernes tider', label_zh: '⚡ 动词时态规律 (Verbernes tider)', route: 'verber_grammatik' },
                { label: '🏃 Top 100 Verber', label_zh: '🏃 常用前100个动词 (Top 100 Verber)', route: 'top100_verber' },
                { label: '📦 Top 100 Substantiver', label_zh: '📦 常用前100个名词 (Top 100 Substantiver)', route: 'top100_substantiver' }
            ]
        },
        {
            num: 6,
            title: 'Ordgruppen',
            title_zh: '紧紧抱团的词语小模块 (Ordgruppen)',
            subtitle: 'Flere ord der hører sammen og flytter som én samlet kasse (f.eks. "i køkkenet", "i dag")',
            subtitle_zh: '在句子里共同进退的小方块（在厨房里 / 在那个大厨房里）',
            daLine_zh: 'i det store køkken（小词 i + 蹦到前面的 det + 形容词拖着 -e + 名词）',
            color: '#f472b6',
            widthPct: 72,
            daLine: `<span class="mss-hl-da">i det store køkken</span> (Forholdsord + det + tillægsord-e + navneord)`,
            myLines: {
                en: `<span class="mss-hl-my">in the big kitchen</span> — Samme rækkefølge som dansk, men tillægsordet får ingen -e-hale.`,
                ar: `<span class="mss-hl-my">في المطبخ الكبير (fī al-matbakh al-kabīr)</span> — Tillægsordet står <em>efter</em> navneordet ("i køkkenet det-store").`,
                tr: `<span class="mss-hl-my">büyük mutfak-ta</span> — Tillægsordet står forrest, men "i" (-ta) sidder allerbagest som endelse.`,
                uk: `<span class="mss-hl-my">у великій кухні</span> — Ordene ændrer form efter ordet "у".`,
                de: `<span class="mss-hl-my">in der großen Küche</span> — Tillægsordet står foran navneordet med egen bøjningshale.`,
                es: `<span class="mss-hl-my">en la cocina grande</span> — Tillægsordet står normalt <em>efter</em> navneordet ("i køkkenet store").`,
                vi: `<span class="mss-hl-my">trong nhà bếp lớn</span> — Ordet <em>lớn</em> (stor) står <em>efter</em> <em>nhà bếp</em> (køkken).`,
                fa: `<span class="mss-hl-my">در آشپزخانهٔ بزرگ (dar âshpazkhâneh-ye bozorg)</span> — Tillægsordet står <em>efter</em> navneordet bundet med en lille -e-lyd.`,
                zh: `<span class="mss-hl-my">在大厨房里</span> — 汉语说“在大厨房里”，形容词“大”直接放在“厨房”前面；但在丹麦语里，只要在厨房前加了形容词，原本粘在屁股后面的小尾巴 -et 就会立刻受到惊吓，蹦到最前面变成独立的 <strong>det</strong>，而且形容词屁股必须加上一个小 -e：<em><strong>det</strong> stor<strong>e</strong> køkken</em>！`
            },
            myLines_da: {
                zh: `Kinesisk sætter sted og tid foran selve handlingen, og lader tillægsordet stå direkte ved navneordet uden at flytte rundt på artikler.`
            },
            detailExplain: `<strong>Ordgruppen (byggeblokken):</strong> En lille gruppe ord, der holder hinanden i hånden og flytter rundt som én samlet kasse i sætningen: f.eks. <em>frisk brød</em>, <em>i køkkenet</em> eller <em>i det store køkken</em>. Bemærk tricket på dansk: Så snart du sætter et tillægsord (f.eks. <em>store</em>) foran køkkenet, hopper den lille hale <em>-et</em> ud og stiller sig helt foran som <strong>det</strong>: <em><strong>det</strong> stor<strong>e</strong> køkken</em>!`,
            detailExplain_zh: `<strong>抱团的词组小积木（Ordgruppen）：</strong>好几个词紧紧抱在一起，在句子里像一个固定箱子一样一起移动（比如 <em>i køkkenet</em> 在厨房里）。丹麦语这里有一个非常顽皮的规则：如果光说厨房，尾巴是粘在后面的（<em>køkken<strong>et</strong></em>）；但只要中间塞进一个形容词（比如大 store），后面的尾巴就会立刻像弹簧一样蹦到最前面变成 <strong>det</strong>，形容词后面还要跟一个 -e：<em><strong>det</strong> stor<strong>e</strong> køkken</em>！`,
            morePairs: [
                { da: 'køkken-et (uden tillægsord) ➔ det store køkken (med tillægsord)', note: 'Endelsen -et flytter frem foran tillægsordet som et selvstændigt "det".', note_zh: '原本在后面的尾巴 -et，一碰到形容词就立刻蹦到前面变成独立的 det！' },
                { da: '[i køkkenet] = én samlet steds-kasse', note: 'Hele ordgruppen flytter samlet rundt i sætningen uden at skilles ad.', note_zh: '“在厨房里”是一整块紧抱的积木，在句子里移动时谁也不能拆散它。' }
            ],
            links: [
                { label: '🎨 Adjektiver & bøjning', label_zh: '🎨 形容词变尾规则 (Adjektiver)', route: 'top100_adjektiver' },
                { label: '🏷️ Bestemthed foran ord', label_zh: '🏷️ “这一个”蹦到前面的奥秘 (Bestemthed)', route: 'bestemthed' }
            ]
        },
        {
            num: 7,
            title: 'Sætningen & ordstillingen',
            title_zh: '整句排队规矩与第二位法则 (Sætningen & ordstillingen)',
            subtitle: 'Hvem gør hvad, og reglen om at handlingen altid skal stå på Plads 2',
            subtitle_zh: '正常排队顺序，与“时间地点放开头，动作立刻抢占第2位（V2 铁律）”',
            daLine_zh: '1) Jeg spiser brød i dag（我做动作：我 吃 面包）• 2) I dag spiser jeg brød（今天一开头，吃 抢占第2位，我 只能退到第3位！）',
            color: '#fb923c',
            widthPct: 79,
            daLine: `1) <span class="mss-hl-da">Jeg spiser</span> brød i køkkenet i dag • 2) I dag <span class="mss-hl-da">spiser jeg</span> brød i køkkenet`,
            myLines: {
                en: `1) <span class="mss-hl-my">I eat</span> bread in the kitchen today • 2) Today <span class="mss-hl-my">I eat</span> bread... (Engelsk bytter ikke om!)`,
                ar: `<span class="mss-hl-my">آكل الخبز في المطبخ اليوم</span> — Ordene kan bytte plads mere frit, og tid før sted varierer.`,
                tr: `Bugün mutfakta ekmek <span class="mss-hl-my">yiyorum</span> — Handlingen står altid <em>allerbagerst</em> ("I-dag i-køkkenet brød jeg-spiser").`,
                uk: `Сьогодні <span class="mss-hl-my">я їм</span> хліб на кухні — Personen bliver stående foran handlingen, selv når "I dag" står forrest.`,
                de: `1) <span class="mss-hl-my">Ich esse</span> heute... • 2) Heute <span class="mss-hl-my">esse ich</span>... — Tysk låser også handlingen til Plads 2 ligesom dansk!`,
                es: `Hoy <span class="mss-hl-my">(yo) como</span> pan en la cocina — Bytter ikke tvunget om efter "Hoy".`,
                vi: `Hôm nay <span class="mss-hl-my">tôi ăn</span> bánh mì trong nhà bếp — "I dag jeg spiser..." (bytter aldrig om).`,
                fa: `امروز در آشپzخانه نان <span class="mss-hl-my">می‌خورم</span> — Handlingen står altid til allersidst i sætningen.`,
                zh: `<span class="mss-hl-my">今天我吃面包</span> — 汉语说“今天我吃面包”，排队顺序依然是“今天 + 我 + 吃 + 面包”；但丹麦语有一条不可动摇的铁律——<strong>动作词必须永远抢占第 2 个位置（V2 规则）</strong>！如果你把“今天 (I dag)”放到最前面第 1 位，做动作的“吃 (spiser)”就必须马上抢占第 2 位，原本的主角“我 (jeg)”被挤到第 3 位：<em>"I dag <strong>spiser jeg</strong> brød..."</em>！`
            },
            myLines_da: {
                zh: `Kinesisk beholder samme rækkefølge som altid ("I dag jeg spiser..."), mens dansk har en jernregel: <strong>Handlingen skal altid stå på Plads 2</strong>. Starter du med "I dag", bytter "spiser" og "jeg" plads: <em>"I dag spiser jeg..."</em>.`
            },
            detailExplain: `<strong>Sætningen & ordstillingen:</strong> Hvordan ordene stiller sig i kø for at danne en hel mening. Grundreglen er: <strong>Hvem (jeg) + Gør (spiser) + Hvad (brød) + Hvor (i køkkenet) + Hvornår (i dag)</strong>. Men dansk har en berømt regel: <strong>Handlingen skal ALTID stå på Plads 2</strong>! Hvis du vælger at starte sætningen med tid eller sted ("I dag..."), skubber det handlingen frem, så personen må rykke om bagved: <em>"I dag <strong>spiser jeg</strong> brød..."</em>.`,
            detailExplain_zh: `<strong>排队顺序与第二位铁律（Sætningen & ordstillingen）：</strong>丹麦语最标准的排队顺序是：<strong>谁 (Jeg) + 做什么 (spiser) + 吃什么 (brød) + 在哪 (i køkkenet) + 什么时候 (i dag)</strong>。但丹麦语最容易让外国人栽跟头的就是<strong>“动词必须站在第2位（V2 铁律）”</strong>：只要你想强调时间或地点，把它拿来开头（例如把 <em>I dag...</em> 放在第 1 位），动作词（<em>spiser</em>）就必须死死守在第 2 位，做动作的人（<em>jeg</em>）只能委屈地挪到第 3 位：<em>"I dag <strong>spiser jeg</strong>..."</em>。中文里习惯说“今天我吃...”，初学者千万别顺嘴说错成 *I dag jeg spiser*！`,
            morePairs: [
                { da: 'Normal: [Jeg] [spiser] brød [i køkkenet] [i dag] (Sted før Tid)', note: 'På dansk kommer Sted (hvor) normalt før Tid (hvornår) til sidst.', note_zh: '丹麦语句尾排队时，地点（在厨房里）通常排在时间（今天）前面。' },
                { da: 'Plads 2-reglen: [I dag] [spiser] [jeg] brød i køkkenet', note: 'Handlingen skal altid blive på Plads 2 i en almindelig sætning.', note_zh: '时间一旦放在第 1 位，动词牢牢霸占第 2 位，主角退至第 3 位。' }
            ],
            links: [
                { label: '🏗️ Sådan bygger du en sætning', label_zh: '🏗️ 丹麦语句子骨架搭建 (Byg en sætning)', route: 'grounding' },
                { label: '🧩 Ordstilling & Plads 2', label_zh: '🧩 语序与动词第二位 (Ordstilling)', route: 'ordstilling' },
                { label: '⏰ Træn tidsudtryk', label_zh: '⏰ 时间短语表达 (Træn tidsudtryk)', route: 'traen_tidsudtryk' }
            ]
        },
        {
            num: 8,
            title: 'Talehandlingen (spørgsmål & opfordring)',
            title_zh: '一句话想干什么 (Talehandlingen)',
            subtitle: 'Hvad du vil med sætningen: spørge med spørgeord, ja/nej eller give en opfordring',
            subtitle_zh: '打听情况（问什么）、确认是不是（问句动作打头），还是叫人做动作',
            daLine_zh: '问什么："Hvad spiser du?" • 问是不是："Spiser du brød?" • 叫人吃："Spis brødet!"',
            color: '#facc15',
            widthPct: 86,
            daLine: `Spørgeord: "<span class="mss-hl-da">Hvad spiser du?</span>" • Ja/nej: "<span class="mss-hl-da">Spiser du</span> brød?" • Bydemåde: "<span class="mss-hl-da">Spis</span> brødet!"`,
            myLines: {
                en: `Hv: "<span class="mss-hl-my">What do you eat?</span>" • Ja/nej: "<span class="mss-hl-my">Do you eat</span> bread?" • Imp.: "<span class="mss-hl-my">Eat</span> the bread!"`,
                ar: `Hv: "<span class="mss-hl-my">ماذا تأكل؟</span>" • Ja/nej: "<span class="mss-hl-my">هل تأكل</span> الخبز؟" • Imp.: "<span class="mss-hl-my">كُلْ (Kul)</span> الخبز!"`,
                tr: `Hv: "<span class="mss-hl-my">Ne yiyorsun?</span>" • Ja/nej: "Ekmek yiyor <span class="mss-hl-my">musun?</span>" • Imp.: "Ekmeği <span class="mss-hl-my">ye!</span>"`,
                uk: `Hv: "<span class="mss-hl-my">Що ти їси?</span>" • Ja/nej: "<span class="mss-hl-my">Ти їси</span> хліб?" (tonefald) • Imp.: "<span class="mss-hl-my">Їж</span> хліб!"`,
                de: `Hv: "<span class="mss-hl-my">Was isst du?</span>" • Ja/nej: "<span class="mss-hl-my">Isst du</span> Brot?" • Imp.: "<span class="mss-hl-my">Iss</span> das Brot!"`,
                es: `Hv: "<span class="mss-hl-my">¿Qué comes?</span>" • Ja/nej: "<span class="mss-hl-my">¿Comes</span> pan?" • Imp.: "¡<span class="mss-hl-my">Come</span> el pan!"`,
                vi: `Hv: "Bạn ăn <span class="mss-hl-my">gì?</span>" (til sidst) • Ja/nej: "Bạn ăn bánh mì <span class="mss-hl-my">không?</span>" • Imp.: "<span class="mss-hl-my">Hãy ăn</span> bánh mì đi!"`,
                fa: `Hv: "<span class="mss-hl-my">چه می‌خوری؟</span>" • Ja/nej: "<span class="mss-hl-my">آیا</span> نان می‌خوری؟" • Imp.: "نان را <span class="mss-hl-my">بخور (bokhor)!</span>"`,
                zh: `特殊问: "你吃<span class="mss-hl-my">什么 (shénme)?</span>" • 是非问: "你吃面包<span class="mss-hl-my">吗 (ma)?</span>" • 叫人做: "快<span class="mss-hl-my">吃</span>面包!"`
            },
            myLines_da: {
                zh: `Kinesisk lader spørgeordet stå bagerst ("du spiser hvad?"); ja/nej-spørgsmål bruger spørgepartiklen "ma"; ved opfordringer bruges stammen uden bøjning.`
            },
            detailExplain: `<strong>Talehandlingen (hvad du vil sige):</strong> En sætning bruges altid i den virkelige verden: Vil du have ny viden (spørgsmål med spørgeord), vil du have et ja eller nej, eller vil du give en god opfordring? Her er de 3 måder at bygge det op på:`,
            detailExplain_zh: `<strong>日常说话的意图（Talehandlingen）：</strong>说话到底是为了什么？在丹麦语里有三种最常见的说话方式：<strong>1) 带着疑问小词打听情况（Hvad/Hvor...）</strong>：疑问词占第1位，动作占第2位；<strong>2) 确认是还是不是（Ja/nej 问句）</strong>：不用任何疑问字，直接把动作放到最前面第1位；<strong>3) 叫别人做事或提建议（Imperativ / Bydemåde）</strong>：直接用动词最本来的短身子，把后面的 -er 剪掉，不用带“你 (du)”！`,
            utteranceCards: [
                {
                    badge: '1. ÅBENT SPØRGSMÅL (Spørg med hv-ord)',
                    badge_zh: '1. 带着疑问词打听情况（HV-ORD • 疑问小词打头）',
                    accent: '#38bdf8',
                    daFormula: 'Spørgeord (Plads 1) + Handlingen (Plads 2) + Personen (Plads 3)',
                    daFormula_zh: '疑问小词 (第1位) + 动作词 (第2位) + 谁 (第3位)',
                    daExample: '"<strong>Hvad</strong> <u>spiser</u> du i køkkenet i dag?" • "<strong>Hvornår</strong> <u>spiser</u> vi?"',
                    daSubNote: 'De vigtigste spørgeord: hvad, hvem, hvor, hvornår, hvorfor, hvordan.',
                    daSubNote_zh: '核心疑问词：hvad (什么), hvem (谁), hvor (哪里), hvornår (何时), hvorfor (为什么), hvordan (如何)。',
                    myByLang: {
                        en: '"<strong>What do</strong> you eat in the kitchen today?" — Engelsk indsætter hjælpeordet <em>do/does/did</em>. Dansk sætter selve handlingen direkte på Plads 2!',
                        ar: '"<strong>ماذا</strong> تأكل في المطبخ اليوم؟ (Mādhā ta\'kulu...)" — Spørgeordet står forrest efterfulgt af handlingen.',
                        tr: '"Bugün mutfakta <strong>ne</strong> yiyorsun?" — Spørgeordet <em>ne</em> (hvad) bliver stående inde foran handlingen til sidst.',
                        uk: '"<strong>Що</strong> ти їси на кухні сьогодні?" — Efter spørgeordet <em>Що</em> står personen <em>ти</em> normalt før handlingen.',
                        de: '"<strong>Was</strong> isst du heute in der Küche?" — Præcis samme opbygning som dansk: Spørgeord + Handling + Person!',
                        es: '"¿<strong>Qué</strong> comes (tú) en la cocina hoy?" — Spørgeord + Handling (+ evt. person).',
                        vi: '"Hôm nay bạn ăn <strong>gì</strong> trong nhà bếp?" — Spørgeordet <em>gì</em> (hvad) står <em>efter</em> handlingen på den plads, hvor svaret hører hjemme!',
                        fa: '"امروز در آشپزخانه <strong>چه</strong> می‌خوری؟" — Spørgeordet står inde i sætningen lige foran handlingen til sidst.',
                        zh: '"今天你在厨房吃<strong>什么</strong>？" — 汉语把“什么”留在最后：“你今天在厨房吃什么？”；但丹麦语必须把疑问词（Hvad）提到最前面，而且动作（spiser）必须抢占在第2位，人（du）排在第3位！'
                    },
                    myByLang_da: {
                        zh: 'Kinesisk lader spørgeordet stå bagerst på svarets plads ("du spiser hvad?"), mens dansk rykker det helt forrest og lader handlingen stå på Plads 2.'
                    }
                },
                {
                    badge: '2. JA/NEJ-SPØRGSMÅL (Lukket spørgsmål uden spørgeord)',
                    badge_zh: '2. 确认是还是不是（JA/NEJ • 动作词打头阵）',
                    accent: '#facc15',
                    daFormula: 'Handlingen allerforrest (Plads 1) + Personen (Plads 2)',
                    daFormula_zh: '动作词直接打头阵 (第1位) + 谁 (第2位)',
                    daExample: '"<strong>Spiser</strong> <u>du</u> brød i køkkenet i dag?"',
                    daSubNote: 'Dansk bytter bare plads på handling og person — uden ekstra spørgeord.',
                    daSubNote_zh: '丹麦语直接把动作推到最前面变成问句，无需添加辅助疑问词。',
                    myByLang: {
                        en: '"<strong>Do</strong> you eat bread...?" — Engelsk skal bruge hjælpeordet <em>Do/Are</em> forrest. På dansk rykker selve handlingen (<em>Spiser</em>) frem forrest!',
                        ar: '"<strong>هل (Hal)</strong> تأكل الخبز...؟" — Arabisk sætter et lille spørgeord foran sætningen.',
                        tr: '"Bugün mutfakta ekmek yiyor <strong>musun</strong>?" — Tyrkisk sætter spørgepartiklen til sidst efter handlingen.',
                        uk: '"<strong>Ти їси</strong> хліб на кухні сьогодні?" — Samme rækkefølge som en almindelig sætning; kun det stigende tonefald gør det til et spørgsmål!',
                        de: '"<strong>Isst du</strong> heute Brot in der Küche?" — Bytter plads på handling og person præcis ligesom dansk.',
                        es: '"¿<strong>Comes</strong> pan en la cocina hoy?" — Afgøres af det stigende tonefald.',
                        vi: '"Hôm nay bạn ăn bánh mì <strong>không</strong>?" — Sætter spørgeordet <em>không</em> allerbagerst i sætningen.',
                        fa: '"<strong>آیا (Âyâ)</strong> امروز نان می‌خوری؟" — Bruger et spørgeord forrest eller blot stigende tonefald.',
                        zh: '"你今天在厨房吃面包<strong>吗</strong>？" — 汉语习惯在句尾加个“吗”：“你今天在厨房吃面包吗？”；但丹麦语根本没有“吗”这个字，它只要把动作（Spiser）直接拎到最前面第1位，立刻就变成了问句！'
                    },
                    myByLang_da: {
                        zh: 'Kinesisk bruger et lille "ma" til sidst; dansk bytter direkte om på person og handling, så handlingen står forrest.'
                    }
                },
                {
                    badge: '3. OPFORDRING & RÅD (Bydemåde)',
                    badge_zh: '3. 让人行动或提建议（Bydemåde • 剪掉尾巴直接说）',
                    accent: '#4ade80',
                    daFormula: 'Kun verbets korte stamme (fjern -er fra nutid) — uden "du"!',
                    daFormula_zh: '只留动作词的短身子（把 -er 尾巴切掉）— 连“你 (du)”都省了！',
                    daExample: '"<strong>Spis</strong> brødet i køkkenet!" • "<strong>Kom</strong> ind og <strong>sæt</strong> dig!"',
                    daSubNote: 'Sådan gøres det: spiser → spis! • læser → læs! • venter → vent!',
                    daSubNote_zh: '口令变化口诀：spiser → spis! (吃吧!) • læser → læs! (读吧!) • venter → vent! (等一下!)',
                    myByLang: {
                        en: '"<strong>Eat</strong> the bread in the kitchen!" — Bruger grundformen uden "you", meget ligesom dansk.',
                        ar: '"<strong>كُلْ (Kul)</strong> الخبz في المطبخ!" — Handlingen skifter form efter om man taler til en mand (<em>kul</em>), en kvinde (<em>kulī</em>) eller flere (<em>kulū</em>). På dansk er formen <strong>spis!</strong> ens for alle!',
                        tr: '"Mutfakta ekmeği <strong>ye</strong>!" — Bruger ordets korte rod (<em>ye-</em>) til sidst i sætningen.',
                        uk: '"<strong>Їж</strong> хліб на кухні!" — Har særskilt form for én person (<em>їж</em>) og flere personer (<em>їжте</em>).',
                        de: '"<strong>Iss</strong> das Brot in der Küche!" — Har forskellige former til <em>du (iss!)</em>, <em>ihr (esst!)</em> og <em>Sie (essen Sie!)</em>. Dansk har kun én form!',
                        es: '"¡<strong>Come</strong> el pan en la cocina!" — Skifter form mellem uformel (<em>come</em>), høflig (<em>coma</em>) og flertal.',
                        vi: '"<strong>Hãy ăn</strong> bánh mì trong bếp <strong>đi</strong>!" — Bruger opfordringsord foran eller bagerst.',
                        fa: '"نان را در آشپزخانه <strong>بخور (bokhor)</strong>!" — Dannes med en forstavelse + stammen til sidst.',
                        zh: '"在厨房里<strong>吃</strong>面包吧！" — 汉语通常说“在厨房里吃面包吧！”或“快吃！”；丹麦语则是把现在时后面的小尾巴 -er 剪掉，只留下短促有力的根（spis!），而且绝不要带 "du"！'
                    },
                    myByLang_da: {
                        zh: 'Kinesisk bruger verbets grundform (ofte med "ba" eller "kuai"); dansk bruger verbets stamme uden -er og uden "du".'
                    }
                }
            ],
            morePairs: [
                { da: 'Almindelig: "Du spiser brød." → Ja/nej-spørgsmål: "Spiser du brød?" → Bydemåde: "Spis brødet!"', note: 'Se hvordan de samme ord skifter mening blot ved rækkefølge og endelse.' },
                { da: 'Høflig opfordring: "Ville du have et stykke brød?" / "Kunne du lukke døren?"', note: 'På dansk bløder man ofte en opfordring op ved at spørge med "Kan/Kunne du...?" fremfor at kommandere.' }
            ],
            links: [
                { label: '💬 Lav spørgsmål (Hv- & Ja/nej)', label_zh: '💬 疑问句构造实战 (Lav spørgsmål)', route: 'lav_sporgsmal' },
                { label: '⚡ Verbernes tider & former', label_zh: '⚡ 动词所有形态总览 (Verber)', route: 'verber_grammatik' },
                { label: '🏃 Top 100 Verber', label_zh: '🏃 常用前100个动词 (Top 100 Verber)', route: 'top100_verber' }
            ]
        },
        {
            num: 9,
            title: 'Spørgsmål & svar (dialogen)',
            title_zh: '两人聊天一问一答 (Spørgsmål & svar)',
            subtitle: 'Når to taler sammen: Spørgsmål, svar og de vigtige vaner som "Ja/Jo" og ekko-svar',
            subtitle_zh: '一问一答对答如流、丹麦人最特别的“Jo”与温暖的“回声答话”（det gør jeg）',
            daLine_zh: 'A: "难道你不吃面包吗？" ➔ B: "Jo, det gør jeg!"（否定问句想说“吃！”，必须用 Jo，再加上一句温暖的回声）',
            color: '#4ade80',
            widthPct: 93,
            daLine: `A: "Spiser du <u>ikke</u> brød?" ➔ B: "<span class="mss-hl-da">Jo, det gør jeg!</span>" (Ikke kun et tørt "ja")`,
            myLines: {
                en: `A: "Don't you eat bread?" ➔ B: "<span class="mss-hl-my">Yes, I do!</span>" — Engelsk har ikke forskel på <em>Ja</em> og <em>Jo</em>.`,
                ar: `B: "<span class="mss-hl-my">بلى (Balā)</span>" — Arabisk har faktisk <em>balā</em> efter et nægtende spørgsmål ligesom dansk <em>Jo</em>!`,
                tr: `B: "<span class="mss-hl-my">Evet, yiyorum</span>" — Tyrkisk gentager handlingen ("Ja, jeg-spiser") i stedet for "det gør jeg".`,
                uk: `B: "<span class="mss-hl-my">Так, їм</span>" — Bruger samme "Ja" (Так) og gentager selve handlingen.`,
                de: `B: "<span class="mss-hl-my">Doch!</span>" — Tysk har <em>Doch</em> ligesom dansk <em>Jo</em>, men bruger ikke "det gør jeg"-ekko.`,
                es: `B: "<span class="mss-hl-my">Sí, claro</span>" — Spansk bruger <em>Sí</em> til både positive og negative spørgsmål.`,
                vi: `B: "<span class="mss-hl-my">Có, tôi có ăn</span>" — Bruger <em>Có</em> til at bekræfte handlingen.`,
                fa: `B: "<span class="mss-hl-my">چرا (Cherâ), می‌خورm</span>" — Persisk bruger <em>cherâ</em> som dansk <em>Jo!</em> efter et spørgsmål med nej.`,
                zh: `B: "<span class="mss-hl-my">吃啊 / 会啊</span>" — 中国人回答喜欢重复动作：“吃啊！”或“不吃”；而在丹麦语里，如果对方的问题里带着<strong>“ikke（不）”</strong>，而你想反驳说“我吃！”，<strong>千千万万不能说 Ja，必须说 "Jo"</strong>！而且丹麦人极少光秃秃扔下一个词，总会像回声一样跟上一句：<em>"Jo, det gør jeg!"</em>（吃呀，我吃呢！），显得特别礼貌亲切。`
            },
            myLines_da: {
                zh: `Kinesisk svarer ved at bekræfte handlingen (吃/会). På dansk skal du huske "Jo!" hvis spørgsmålet har et "ikke", og altid føje det venlige ekko "det gør jeg" til.`
            },
            detailExplain: `<strong>Spørgsmål & svar (dialogen):</strong> Når to mennesker taler sammen, hænger replikkerne uløseligt sammen i par. På dansk er der to guldvaner, der får dig til at lyde som en indfødt: 1) Hvis nogen stiller et spørgsmål med <em>"ikke"</em> (f.eks. "Spiser du ikke brød?"), og du vil svare ja, må du ALDRIG sige "Ja" — du skal sige <strong>"Jo!"</strong>. 2) Man svarer sjældent med ét enkelt ord; man tilføjer et lille, venligt ekko: <strong>"Ja, det gør jeg"</strong> eller <strong>"Nej, det gør jeg ikke"</strong>.`,
            detailExplain_zh: `<strong>日常对话的一问一答（Spørgsmål & svar）：</strong>在丹麦生活交流，有两条黄金习惯能让你立刻听起来非常地道又温和：<br>1) <strong>“Jo”的奇妙魔力</strong>：如果对方用带有 <em>ikke（不）</em> 的否定疑问句问你（比如“难道你不想吃吗？”），而你想回答“想吃！”，在丹麦语里<strong>绝对不能说 Ja，必须大声说 "Jo!"</strong>！说 Ja 在丹麦人听来完全摸不着头脑。<br>2) <strong>不当“单字终结者”</strong>：丹麦人极少只扔出一个孤零零的 Ja 或 Nej，那样听起来很生硬冷漠。他们几乎总会在后面挂一句温暖的小回声：<em>"Ja, det gør jeg"</em>（是的，我吃呢）或者 <em>"Nej, det kan jeg ikke"</em>（不好意思，我不行呢）。`,
            morePairs: [
                { da: 'A: "Spiser du brød?" → B: "Ja, det gør jeg." (Almindeligt spørgsmål → Ja)', note: '"Det gør jeg" gør svaret venligt og naturligt på dansk.' },
                { da: 'A: "Er du ikke sulten?" → B: "Jo, det er jeg!" (Spørgsmål med "ikke" → Jo)', note: 'Ved ord som "er/har/kan/vil" gentages selve hjælpeordet i stedet for "gør".', note_zh: '问句里有“ikke（不）”，肯定回答千万不能说 Ja，一定要说“Jo”！' }
            ],
            links: [
                { label: '🗣️ Samtaletræning', label_zh: '🗣️ 实用情景会话训练 (Samtaletræning)', route: 'samtale_traening' },
                { label: '💬 Lav spørgsmål & svar', label_zh: '💬 问答应答轮次练习 (Spørgsmål & svar)', route: 'lav_sporgsmal' }
            ]
        },
        {
            num: 10,
            title: 'Den fulde samtale',
            title_zh: '连贯对话与生动聊天 (Den fulde samtale)',
            subtitle: 'Når sætninger bindes sammen til levende tale med bindeord og småord ("nå", "lige", "ikke?")',
            subtitle_zh: '把几句话串成生动的聊天：用连接词搭桥，用丹麦语神奇小词（nå, jo, lige, ikke?）让话变甜',
            daLine_zh: '"Nå, jeg er sulten, så jeg spiser lige noget brød, ikke?"（“好啦，我饿了，所以顺便吃点面包，对吧？”）',
            color: '#2dd4bf',
            widthPct: 100,
            daLine: `"<span class="mss-hl-da">Nå</span>, jeg er sulten, <span class="mss-hl-da">så</span> jeg spiser lige noget brød i køkkenet, <span class="mss-hl-da">ikke?</span>"`,
            myLines: {
                en: `"<span class="mss-hl-my">Well</span>, I'm hungry, <span class="mss-hl-my">so</span> I'll just eat some bread in the kitchen, <span class="mss-hl-my">okay?</span>"`,
                ar: `"<span class="mss-hl-my">طيب / يعني (Ya'ni)</span>، أنا جائع، <span class="mss-hl-my">لذلك</span> سآكل..." — Bruger andre samtaleord til at binde replikkerne sammen.`,
                tr: `"<span class="mss-hl-my">Şey / Yani</span>, karnım aç, <span class="mss-hl-my">o yüzden</span> mutfakta biraz ekmek yiyorum, <span class="mss-hl-my">tamam mı?</span>"`,
                uk: `"<span class="mss-hl-my">Ну</span>, я голодний, <span class="mss-hl-my">тому</span> я просто поїм хліба на кухні, <span class="mss-hl-my">добре?</span>"`,
                de: `"<span class="mss-hl-my">Na ja</span>, ich bin hungrig, <span class="mss-hl-my">also</span> esse ich mal Brot in der Küche, <span class="mss-hl-my">oder?</span>"`,
                es: `"<span class="mss-hl-my">Bueno</span>, tengo hambre, <span class="mss-hl-my">así que</span> como pan en la cocina, <span class="mss-hl-my">¿vale?</span>"`,
                vi: `"<span class="mss-hl-my">À</span>, tôi đói rồi, <span class="mss-hl-my">nên</span> tôi ăn chút bánh mì trong bếp <span class="mss-hl-my">nhé!</span>"`,
                fa: `"<span class="mss-hl-my">خب (Khob)</span>، گرسنه‌ام، <span class="mss-hl-my">پس</span> توی آشپزخانه کمی نان می‌خورم، <span class="mss-hl-my">باشه؟</span>"`,
                zh: `"<span class="mss-hl-my">哎 (Āi)</span>，我饿了，<span class="mss-hl-my">所以</span>去厨房吃点面包，<span class="mss-hl-my">对吧？</span>" — 中文聊天时，我们会用“呢、吧、啊、嘛”来让气氛轻松；丹麦人也是一样！他们有一批神奇的<strong>“润滑小词”（nå, jo, lige, vel, ikke?）</strong>。比如加一个 <strong>lige</strong>（我“顺便”吃点），语气瞬间变得非常客气随意；句末加一个 <strong>ikke?</strong>（对吧？），立刻拉近了两人的距离！`
            },
            myLines_da: {
                zh: `Kinesisk bruger småpartikler som 呢, 吧, 啊 til at gøre stemningen venlig; dansk bruger sine egne små magiske ord som nå, jo, lige og ikke?`
            },
            detailExplain: `<strong>Den fulde samtale:</strong> Her binder vi flere tanker sammen, så det ikke lyder som en robot, men som et rigtigt levende menneske. På dansk bruger vi to ting til at få sproget til at flyde: 1) <strong>Bindeord</strong> som <em>så, fordi, men, når</em> til at bygge bro mellem sætningerne. 2) <strong>Småord</strong> som <em>nå, jo, lige, vel, ikke?</em>, der fungerer som sprogets smileys og gør samtalen varm og hyggelig.`,
            detailExplain_zh: `<strong>生动的整场聊天（Den fulde samtale）：</strong>在语言阶梯的最顶端，我们终于能把一连串的句子串成生动、温暖的人性化交流。地道丹麦语有两大沟通法宝：<br>1) <strong>搭桥的连接词</strong>：用 <em>fordi（因为）、så（所以）、men（但是）、når（当...时）</em> 把前后几句话连起来。<br>2) <strong>像表情包一样的“润滑小词”</strong>：丹麦人嘴里永远少不了 <em>nå（好啦/原来如此）、lige（顺便/稍微一下下）、jo（正如大家都知道的）、ikke?（对不对呀？）</em>。少用这些小词，丹麦人会觉得你像个严肃冷淡的播音员；一用上它们，你就像在丹麦朋友家里喝咖啡聊天一样自然！`,
            morePairs: [
                { da: 'Jeg spiser brød, FORDI jeg er sulten. (Bindeord hvor "ikke" hopper foran handlingen) ↔ Jeg er sulten, SÅ jeg spiser brød.', note: 'Bindeordet styrer rækkefølgen af ordene i næste sætning.', note_zh: '连接词一换，后面的句子排队规矩也跟着变（比如 fordi 后面如果加“不 ikke”，ikke 会超车跳到动作前面）。' },
                { da: '"Nå!" (Overraskelse/ny info) • "Jeg spiser LIGE..." (Gør handlingen uformel og kort)', note: 'Småordene gør dansk levende i hverdagen.', note_zh: '善用 lige（顺便）和 nå（好啦），瞬间让你的丹麦语脱离书本腔，变得鲜活自然。' }
            ],
            links: [
                { label: '🔗 Konjunktioner & Bindeord', label_zh: '🔗 连词与复合句 (Konjunktioner)', route: 'traen_grammatik' },
                { label: '✨ De små magiske ord (jo, nok, lige)', label_zh: '✨ 丹麦语高频语气小词 (jo, nok, lige)', route: 'adverbier_smaaord' },
                { label: '🕹️ Interaktive historier', label_zh: '🕹️ 沉浸式互动故事 (Interaktive historier)', route: 'historier_menu' }
            ]
        }
    ];

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'mss-top-bar';
    viewContainer.appendChild(topBar);

    // Notice banner: "Kun på kinesisk. Andre sprog følger senere."
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
        const langObj = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];
        const isZh = selectedLang === 'zh';

        // Top bar rendering
        topBar.innerHTML = '';
        const backBtn = document.createElement('button');
        backBtn.className = 'mss-back-btn';
        backBtn.innerHTML = `← Tilbage til forsiden`;
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
        } else {
            noticeBanner.innerHTML = `
                <span class="mss-notice-flag">🇩🇰</span>
                <div>
                    <div class="mss-notice-title">Dansk visning: Fuld sproglig & pædagogisk forklaring</div>
                    <div class="mss-notice-sub">Du ser alle 10 sproglige niveauer med danske forklaringer og sammenligninger. Vælg 🇨🇳 Kinesisk (中文) for at se kursistens kinesiske visning.</div>
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
                        const myTxt = isZh ? uc.myByLang.zh : (uc.myByLang_da?.zh || uc.myByLang.en);
                        const badgeText = isZh ? (uc.badge_zh || uc.badge) : uc.badge;
                        const formulaText = isZh ? (uc.daFormula_zh || uc.daFormula) : uc.daFormula;
                        const subNoteText = isZh ? (uc.daSubNote_zh || uc.daSubNote) : uc.daSubNote;

                        return `
                            <div style="background:rgba(15,23,42,0.92); border:1.5px solid ${uc.accent}; border-radius:14px; padding:0.9rem 1rem; display:flex; flex-direction:column; gap:0.5rem;">
                                <div style="font-size:0.74rem; font-weight:900; color:${uc.accent}; text-transform:uppercase; letter-spacing:0.03em;">
                                    ${badgeText}
                                </div>
                                <div style="background:rgba(239,68,68,0.12); border-left:3.5px solid #ef4444; border-radius:8px; padding:0.55rem 0.7rem;">
                                    <div style="font-size:0.7rem; font-weight:900; color:#fca5a5; text-transform:uppercase; margin-bottom:0.15rem;">
                                        🇩🇰 ${isZh ? '丹麦语结构公式' : 'Dansk formel'} (${formulaText})
                                    </div>
                                    <div style="font-size:0.93rem; color:#ffffff; font-weight:800;">${uc.daExample}</div>
                                    <div style="font-size:0.78rem; color:#cbd5e1; margin-top:0.25rem;">${subNoteText}</div>
                                </div>
                                <div style="background:rgba(56,189,248,0.1); border-left:3.5px solid #38bdf8; border-radius:8px; padding:0.55rem 0.7rem;">
                                    <div style="font-size:0.7rem; font-weight:900; color:#7dd3fc; text-transform:uppercase; margin-bottom:0.15rem;">
                                        ${isZh ? '🇨🇳 中文对比解析' : '💡 Pædagogisk forklaring'}
                                    </div>
                                    <div style="font-size:0.86rem; color:#e0f2fe; line-height:1.4;">${myTxt}</div>
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
                `${st.num}. ${st.title} — ${st.subtitle}`;
            const closeBtnText = isZh ? '✕ 关闭详情' : '✕ Luk underflade';

            return `
                <div class="mss-detail-overlay" style="margin-top:0.45rem; margin-bottom:0.65rem; margin-left:1.35rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                        <div>
                            <span style="font-size:0.75rem; font-weight:900; color:${st.color}; text-transform:uppercase;">
                                ${isZh ? `深度解析 • 第 ${st.num} 级 (Trin ${st.num} af 10)` : `Underflade • Trin ${st.num} af 10`}
                            </span>
                            <h2 style="margin:0.15rem 0 0; font-size:1.32rem; font-weight:900; color:#ffffff;">
                                ${subTitle}
                            </h2>
                        </div>
                        <button class="mss-back-btn" data-close-sub="1" style="border-color:#fde68a; color:#fde68a;">
                            ${closeBtnText}
                        </button>
                    </div>

                    <div class="mss-two-lines" style="margin-bottom:0.85rem;">
                        <div class="mss-line-da">
                            <span class="mss-line-tag" style="color:#fca5a5;">🇩🇰 ${isZh ? '丹麦语例句' : 'Dansk'}:</span>
                            <span>${st.daLine}</span>
                        </div>
                        ${isZh && st.daLine_zh ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-left:0.6rem; margin-top:-0.15rem;">
                                💡 释义: ${st.daLine_zh}
                            </div>
                        ` : ''}
                        <div class="mss-line-my">
                            <span class="mss-line-tag" style="color:#7dd3fc;">${isZh ? '🇨🇳 中文对比解析' : '💡 Sproglig analyse'}:</span>
                            <span>${isZh ? st.myLines.zh : ((st.myLines_da && st.myLines_da.zh) || st.myLines.zh)}</span>
                        </div>
                    </div>

                    <div style="background:rgba(30,41,59,0.75); border:1px solid rgba(148,163,184,0.25); border-radius:12px; padding:0.85rem 1rem; margin-bottom:0.9rem; font-size:0.92rem; line-height:1.5; color:#e2e8f0;">
                        ${isZh ? (st.detailExplain_zh || st.detailExplain) : st.detailExplain}
                    </div>

                    ${buildUtteranceCardsHtml(st)}

                    ${st.num === 2 ? `
                        <div style="background: linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(15, 23, 42, 0.92) 100%); border: 2px solid #38bdf8; border-radius: 16px; padding: 1.15rem 1.35rem; margin-bottom: 1.15rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.9rem; box-shadow: 0 8px 24px rgba(0,0,0,0.35);">
                            <div style="max-width: 720px;">
                                <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                    <span>🇨🇳</span> <span>${isZh ? '发音实用突破' : 'Udtaletræning: Svære lyde for kinesere (L vs. N & Blødt d)'}</span>
                                </div>
                                <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                    ${isZh ? '中国学习者实用突破：L 与 N（嘴角漏风 vs 捏鼻闭气）与软 d（擦眼镜哈气）' : 'Vanskelige lyde for kinesere: L vs. N og blødt d (Mundvigeluft vs. Næseluft & Ånde på brillerne)'}
                                </div>
                                <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.5;">
                                    ${isZh ? 
                                        '看清舌头应该放在哪、空气从哪边溜出，体验捏鼻子自检绝招，并通过麦克风进行三词口语挑战。' : 
                                        'Se præcis hvor tungen skal ligge og hvor luften slipper ud, prøv næseklemmetricket og træn udtalen direkte med mikrofonen.'}
                                </div>
                            </div>
                            <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_kinesisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; white-space:nowrap; border-radius:12px;">
                                ${isZh ? '打开实用专练 ➔' : 'Åbn øvefladen ➔'}
                            </button>
                        </div>
                    ` : ''}

                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
                        ${st.morePairs.map(mp => `
                            <div style="background:rgba(15,23,42,0.85); border:1px solid rgba(148,163,184,0.22); border-radius:11px; padding:0.75rem 0.9rem;">
                                <div style="font-weight:900; color:#fde68a; font-size:0.88rem; margin-bottom:0.25rem;">${mp.da}</div>
                                <div style="font-size:0.82rem; color:#cbd5e1;">${isZh ? (mp.note_zh || mp.note) : mp.note}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.65rem; padding-top:0.8rem; border-top:1px solid rgba(148,163,184,0.2);">
                        <span style="font-size:0.8rem; font-weight:900; color:#86efac; text-transform:uppercase;">
                            ${isZh ? '在应用中训练此层级 (Træn dette niveau):' : 'Træn dette niveau i appen:'}
                        </span>
                        <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                            ${st.links.map(lk => {
                                const linkLabel = isZh ? (lk.label_zh || lk.label) : lk.label;
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
                        ${isZh ? '选择语言:' : 'Vælg sprog:'}
                    </span>
                    ${LANGUAGES.map(l => {
                        const isSupported = l.code === 'da' || l.code === 'zh';
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
                        `Trin ${st.num}. ${st.title}`;
                    const stepSubtitle = isZh ? 
                        (st.subtitle_zh || st.subtitle) : 
                        st.subtitle;
                    const btnText = isOpen ? 
                        (isZh ? '收起详情 ▲' : 'Luk underflade ▲') : 
                        (isZh ? '查看详情与练习 ➔' : 'Se mere & links ➔');

                    return `
                        <div>
                            <div class="mss-step-card" style="--step-color:${st.color}; ${isOpen ? 'border-color:#fde68a;' : ''}" data-open-sub="${idx}">
                                <div class="mss-step-dot" style="--step-color:${st.color};">${st.num}</div>
                                <div>
                                    <div style="font-size:0.72rem; font-weight:900; color:${st.color}; text-transform:uppercase;">
                                        ${isZh ? `第 ${st.num} 级 (Trin ${st.num})` : `Trin ${st.num} af 10`}
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
                                        <span class="mss-line-tag" style="color:#fca5a5;">🇩🇰 ${isZh ? '丹麦语' : 'Dansk'}:</span>
                                        <span>${st.daLine}</span>
                                    </div>
                                    ${isZh && st.daLine_zh ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-left:0.6rem; margin-top:-0.15rem;">
                                            💡 释义: ${st.daLine_zh}
                                        </div>
                                    ` : ''}
                                    <div class="mss-line-my">
                                        <span class="mss-line-tag" style="color:#7dd3fc;">${isZh ? '🇨🇳 中文对比' : '💡 Sproglig analyse'}:</span>
                                        <span>${isZh ? st.myLines.zh : ((st.myLines_da && st.myLines_da.zh) || st.myLines.zh)}</span>
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
        `;

        const langNoteEl = stage.querySelector('#mss-lang-note');
        stage.querySelectorAll('[data-lang]').forEach(btn => {
            btn.onclick = () => {
                const targetLang = btn.dataset.lang;
                if (targetLang !== 'zh' && targetLang !== 'da') {
                    if (langNoteEl) {
                        langNoteEl.textContent = isZh ? 
                            '⚠️ 目前支持丹麦语与中文对比，其他语言即将推出。' : 
                            '⚠️ Indtil videre er Dansk og Kinesisk fuldt tilgængelige. Andre sprog følger snart.';
                        langNoteEl.style.display = 'block';
                        setTimeout(() => { if (langNoteEl) langNoteEl.style.display = 'none'; }, 3500);
                    }
                    return;
                }
                selectedLang = targetLang;
                localStorage.setItem('mss_selected_lang', targetLang);
                renderStage();
            };
        });

        stage.querySelectorAll('[data-open-sub]').forEach(el => {
            el.onclick = (e) => {
                e.stopPropagation();
                const idx = Number(el.dataset.openSub);
                openSubStepIndex = openSubStepIndex === idx ? null : idx;
                renderStage();
            };
        });

        stage.querySelectorAll('[data-close-sub]').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                openSubStepIndex = null;
                renderStage();
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
