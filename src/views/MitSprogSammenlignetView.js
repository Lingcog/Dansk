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

    // Languages for comparison (Kinesisk prioriteret som aktiv fuld version)
    const LANGUAGES = [
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
    let selectedLang = 'zh'; // Default til kinesisk ifm. lancering
    let currentProto = 1; // 1 = Byggetrappen, 2 = Sprogspejlet, 3 = Bygge-Pyramiden + Fokus-Scenen
    let activeStepIndex = 6; // Default highlight on 7. Sætningen in Proto 3
    let openSubStepIndex = null; // null = forside, number = underflade for det pågældende trin

    // De 10 trin fra mindste element (1. Distinktivt træk) til største (10. Samtalen / Teksten)
    // Gennemgående rød-tråd-sætning: "Jeg spiser brød i køkkenet i dag"
    const STEPS = [
        {
            num: 1,
            title: 'Distinktivt træk',
            title_zh: '区别特征 (Distinktivt træk)',
            subtitle: 'Lille forskel i lyden, der ændrer betydningen (læberunding / stød)',
            subtitle_zh: '改变词义的微小语音差异（圆唇度 / 喉塞音 stød）',
            color: '#38bdf8',
            widthPct: 38,
            daLine: `Læberunding + stød i <span class="mss-hl-da">brøʼd</span> vs. <span class="mss-hl-da">bred</span> (flade læber)`,
            myLines: {
                en: `<span class="mss-hl-my">bread [bɹɛd]</span> — Engelsk har hverken runde fortungevokaler (y/ø) eller dansk stød.`,
                ar: `<span class="mss-hl-my">خبز (khubz)</span> — Arabisk har 3 grundvokaler (a, i, u); forskellen mellem e/ø/y findes ikke.`,
                tr: `<span class="mss-hl-my">ekmek (ø findes: ö/ü)</span> — Tyrkisk har faktisk <span class="mss-hl-my">ö</span> og <span class="mss-hl-my">ü</span> ligesom dansk ø/y, men intet stød.`,
                uk: `<span class="mss-hl-my">хліб (khlib)</span> — Ukrainsk har ikke rundede fortungevokaler (ø/y) eller dansk stød.`,
                de: `<span class="mss-hl-my">Brot (ø findes: ö/ü)</span> — Tysk har <span class="mss-hl-my">ö/ü</span> ligesom dansk ø/y, men ikke dansk stød.`,
                es: `<span class="mss-hl-my">pan</span> — Spansk har 5 faste vokaler (a, e, i, o, u) uden læberundede e/i-lyde (ø/y).`,
                vi: `<span class="mss-hl-my">bánh mì</span> — Vietnamesisk bruger toner til at skelne ord, hvilket minder om det danske stød.`,
                fa: `<span class="mss-hl-my">نان (nân)</span> — Persisk har 6 vokaler uden ø/y og uden stød.`,
                zh: `<span class="mss-hl-my">面包 (miànbāo)</span> — Kinesisk skelner betydning med <strong>toner</strong> (声调) frem for stød, og mangler rundede fortungevokaler som <strong>ø og y</strong>.`
            },
            detailExplain: `Et <strong>distinktivt træk</strong> er den allermindste byggeklods i udtalen: f.eks. om læberne er runde eller flade (<em>bred</em> → <em>brød</em>), om vokalen er kort eller lang, eller om der er <strong>stød</strong> (<em>hun</em> vs. <em>hundʼ</em>).`,
            detailExplain_zh: `<strong>区别特征（Distinktivt træk）</strong>是语言中能区分词义的最小语音对立。丹麦语最典型的特征是<strong>圆唇元音</strong>（如 <em>ø, y</em>）与<strong>喉塞音（stød）</strong>。例如 <span class="mss-hl-da">brøʼd</span>（圆唇+喉塞音，意为面包）与 <span class="mss-hl-da">bred</span>（展唇无喉塞音，意为宽阔），仅凭极微小的唇形与声门闭合即可区分完全不同的两个词。汉语虽无喉塞音，但有声调（四声）来区分词义。`,
            morePairs: [
                { da: 'lys [y] (rundede læber) vs. lis [i] (flade læber)', note: 'Kun læberundingen adskiller de to ord.', note_zh: '仅靠嘴唇是否拢圆即可区分两个词（光 vs. 姓名）。' },
                { da: 'måler (uden stød) vs. målʼer (med stød)', note: 'Stødet kan skelne mellem ord og bøjningsformer.', note_zh: '喉塞音（stød）是丹麦语区分单复数和词性的秘密武器。' }
            ],
            links: [
                { label: '🎵 Leg med vokaler', route: 'leg_med_vokaler' },
                { label: '⚡ Det danske stød', route: 'det_danske_stoed' }
            ]
        },
        {
            num: 2,
            title: 'Fon',
            title_zh: '音素与发音 (Fon)',
            subtitle: 'Den enkelte sproglyd (f.eks. det bløde d i "brød")',
            subtitle_zh: '单个语流中的具体发音（如 brød 中的软 d [ð]，以及 l 与 n 的区分）',
            color: '#60a5fa',
            widthPct: 44,
            daLine: `brø<span class="mss-hl-da">d [ð]</span> — Tungespidsen bag undermundens tænder (blødt d)`,
            myLines: {
                en: `brea<span class="mss-hl-my">d [d]</span> — Engelsk har lyden i <em>"the/brother"</em>, men skriver den som <strong>th</strong>, ikke <strong>d</strong>.`,
                ar: `خبز — Arabisk har lyden <span class="mss-hl-my">ذ (dh)</span> mellem tænderne, som ligger tæt på dansk blødt d.`,
                tr: `ekmek — Tyrkisk udtaler altid <span class="mss-hl-my">d som fast [d]</span>; det bløde danske d skal trænes særskilt.`,
                uk: `хліб — Ukrainsk har kun <span class="mss-hl-my">fast [d]</span>; det bløde danske [ð] findes ikke.`,
                de: `Bro<span class="mss-hl-my">t [t]</span> — Tysk gør d hårdt i slutningen af ord (<em>Brot/Hund → [t]</em>) i stedet for blødt.`,
                es: `pare<span class="mss-hl-my">d [ð]</span> — Spansk har faktisk et blødt d i slutningen af ord og mellem vokaler (<em>nada</em>)!`,
                vi: `bánh mì — Vietnamesisk udtaler ikke åbne konsonanter som dansk blødt d i udlyd.`,
                fa: `نان — Persisk har altid <span class="mss-hl-my">fast [d]</span>; det bløde danske d findes ikke.`,
                zh: `面包 (miànbāo) — Kinesisk mangler blødt d [ð], og har en stor udfordring med at skelne <strong>L [l]</strong> og <strong>N [n]</strong> (边音/鼻音).`
            },
            detailExplain: `En <strong>fon</strong> er selve sproglyden. På dansk ændrer bogstaver som <strong>d, g og r</strong> ofte lyd alt efter, om de står først eller sidst i ordet (f.eks. hårdt <em>d</em> i <strong>d</strong>ag, men blødt <em>d</em> i brø<strong>d</strong>).`,
            detailExplain_zh: `<strong>音素（Fon）</strong>是人类说话时发出的具体物理声音。丹麦语的辅音在词首和词尾发音截然不同：例如字母 <strong>d</strong> 在词首为硬 d（<strong>d</strong>ag [d]），在元音后则变成独特的<strong>软 d</strong>（brø<strong>d</strong> [ð] / ma<strong>d</strong> [ð]），舌尖必须贴在下齿背面。此外，中国南方许多方言（西南官话、粤语、吴语等）常混淆 <strong>/l/（边音）</strong> 与 <strong>/n/（鼻音）</strong>，而在丹麦语中 <em>læse</em>（阅读）与 <em>næse</em>（鼻子）是绝对不同的音位！`,
            morePairs: [
                { da: 'dag [d] (hårdt d i starten) ↔ brød / mad [ð] (blødt d til sidst)', note: 'Samme bogstav, to helt forskellige lyde.', note_zh: '同一个字母 d，在丹麦语词首与词尾是完全不同的发音动作。' },
                { da: 'køkken [k] ↔ kage [g/j]', note: 'Konsonanter svækkes ofte efter vokalen på dansk.', note_zh: '辅音在元音后常被弱化（弱读化）。' }
            ],
            links: [
                { label: '🔤 Træn bogstaver & lyde', route: 'traen_bogstaver' },
                { label: '🎙️ Leg med udtale', route: 'leg_med_udtale' },
                { label: '🇨🇳 Vanskelige lyde for kinesere (L vs. N)', route: 'vanskelige_lyde_kinesisk' }
            ]
        },
        {
            num: 3,
            title: 'Stavelse',
            title_zh: '音节与节律 (Stavelse)',
            subtitle: 'Rytme, tryk og "slugte" endelser (schwa)',
            subtitle_zh: '重音、节律与丹麦语典型的“弱读吞音”（schwa [ə]）',
            color: '#818cf8',
            widthPct: 51,
            daLine: `<span class="mss-hl-da">køk</span>-ke-net ➔ Udtales i 2 hurtige slag: <span class="mss-hl-da">[ˈkøgnəd]</span>`,
            myLines: {
                en: `<span class="mss-hl-my">kit-chen</span> — Engelsk svækker også tryksvage stavelser til schwa [ə] ligesom dansk.`,
                ar: `<span class="mss-hl-my">الْـمَـطْـبَـخ (al-mat-bakh)</span> — Hver konsonant og stavelse udtales tydeligt uden at sluge endelsen.`,
                tr: `<span class="mss-hl-my">mut-fak-ta</span> — Tyrkisk giver næsten lige meget plads til hver stavelse med vokalharmoni.`,
                uk: `<span class="mss-hl-my">на кух-ні (na kukh-ni)</span> — Alle vokaler i stavelserne udtales klart og tydeligt.`,
                de: `<span class="mss-hl-my">Kü-che</span> — Tysk svækker også -e til [ə], men sluger færre konsonanter end dansk.`,
                es: `<span class="mss-hl-my">co-ci-na</span> — Spansk er stavelsestællende: hver stavelse og vokal høres helt tydeligt.`,
                vi: `<span class="mss-hl-my">nhà bếp</span> — Hvert ord er én fast stavelse uden tryksvage endelser.`,
                fa: `<span class="mss-hl-my">آشـپـزخـانـه (âsh-paz-khâ-neh)</span> — Hver stavelse udtales tydeligt med tryk til sidst.`,
                zh: `<span class="mss-hl-my">厨-房 (chú-fáng)</span> — Hvert kinesisk tegn er én fast stavelse med egen tone; dansk sluger tryksvage endelser til schwa [ə].`
            },
            detailExplain: `I en dansk <strong>stavelse</strong> ligger al energien på den trykstærke stavelse (oftest den første: <strong>køk</strong>-). De efterfølgende stavelser med <em>-e-</em> svækkes til den slappe [ə]-lyd eller smelter helt sammen med nabokonsonanten.`,
            detailExplain_zh: `丹麦语的<strong>音节（Stavelse）</strong>具有强烈的<strong>重音计时（Stress-timed）</strong>特点：能量集中在重读音节（通常是词根如 <strong>køk-</strong>），随后的弱读音节中的元音 <em>-e-</em> 会被极度弱化为央元音 [ə]，甚至与相邻辅音合并（“吞音”）。汉字是一字一音节且每个字都有完整声调，初学丹麦语时最容易把每个音节读得过满，而自然丹麦语必须学会弱读吞音。`,
            morePairs: [
                { da: 'spi-ser → [ˈsbisɐ] (r smelter sammen med e)', note: '-er til sidst udtales som én kort åben vokal.', note_zh: '书写上是两个音节，实际口语中 -er 读成一个简短开音节。' },
                { da: 'køk-ke-net → 3 skrevne stavelser, men 2 talte stavelser', note: 'Midterste -e- forsvinder i naturlig tale.', note_zh: '中间的弱读 -e- 在自然语流中几乎被吞掉。' }
            ],
            links: [
                { label: '📖 Læsetræning & rytme', route: 'laesetraening' },
                { label: '🎙️ Træn udtale', route: 'traen_udtale' }
            ]
        },
        {
            num: 4,
            title: 'Morf',
            title_zh: '语素与后缀构词 (Morf)',
            subtitle: 'Ordets mindste betydnings-byggesten (stamme + endelse)',
            subtitle_zh: '词义的最小构成部分（词根 + 后缀定冠词 -en/-et）',
            color: '#a78bfa',
            widthPct: 58,
            daLine: `køkken + <span class="mss-hl-da">-et</span> (bestemt endelse limes bag på ordet)`,
            myLines: {
                en: `<span class="mss-hl-my">the</span> + kitchen — Bestemthed er et selvstændigt ord <em>foran</em> navneordet.`,
                ar: `<span class="mss-hl-my">الـ (al-)</span> + مطبخ — Bestemthed sættes <em>forrest</em> på ordet (al-matbakh).`,
                tr: `mutfak + <span class="mss-hl-my">-ta</span> (i køkkenet) — Tyrkisk sætter <em>sted-endelsen</em> (-da/-ta) bag på ordet, men har ingen bestemt artikel.`,
                uk: `<span class="mss-hl-my">кухні (ingen artikel)</span> — Ukrainsk har slet ikke bestemte artikler (hverken foran eller bagpå).`,
                de: `<span class="mss-hl-my">der/die/das (in der)</span> + Küche — Bestemthed og køn står <em>foran</em> navneordet.`,
                es: `<span class="mss-hl-my">la</span> + cocina — Bestemthed står <em>foran</em> navneordet.`,
                vi: `<span class="mss-hl-my">nhà bếp (ingen bøjnings-morfemer)</span> — Ord ændrer aldrig form med endelser.`,
                fa: `آشپزخانه — I talesprog kan <span class="mss-hl-my">-e (-ه)</span> sættes bagpå for bestemthed, men ellers ingen fast artikel.`,
                zh: `<span class="mss-hl-my">厨房 (ingen bøjnings-morfemer)</span> — Kinesisk tilføjer ikke bøjningsendelser for bestemthed eller flertal bag på ordet.`
            },
            detailExplain: `En <strong>morf</strong> (morfem) er den mindste del, der bærer en betydning. Dansk er berømt for at sætte bestemthed (<strong>-en / -et / -ne</strong>) bag på substantivet som en hale: <em>et køkken → køkken<strong>et</strong></em>.`,
            detailExplain_zh: `<strong>语素（Morf / Morfem）</strong>是承载语法或词汇意义的最小构件。丹麦语最著名的特点就是<strong>后缀定冠词</strong>：名词表示“特定的那个”时，不使用独立前置词，而是将 <strong>-en / -et / -ne</strong> 像尾巴一样粘在名词词尾（<em>et køkken → køkken<strong>et</strong></em>：厨房 ➔ 这个厨房）。汉语没有屈折后缀，通常用“这/那”或语境来表达定指。`,
            morePairs: [
                { da: 'spis (rod) + -er (nutid) / -te (datid)', note: 'Tiden vises med en lille endelse på verbet.', note_zh: '时态直接通过粘附在动词后面的简短后缀来表达。' },
                { da: 'køkken (rod) + -et (bestemt) / -er (flertal)', note: 'Bestemthed og tal sidder som klodser bag på ordet.', note_zh: '定指与单复数就像积木一样依次粘在名词末尾。' }
            ],
            links: [
                { label: '🏷️ Bestemthed (-en / -et)', route: 'bestemthed' },
                { label: '🧱 Artikler (en / et)', route: 'artikler' }
            ]
        },
        {
            num: 5,
            title: 'Ordet',
            title_zh: '词类与变位 (Ordet)',
            subtitle: 'Ordklasse, sammensætning og bøjning',
            subtitle_zh: '词性、复合词与丹麦语极简的人称变位',
            color: '#c084fc',
            widthPct: 65,
            daLine: `jeg / du / han / vi <span class="mss-hl-da">spiser</span> (Samme form til ALLE personer!)`,
            myLines: {
                en: `I <span class="mss-hl-my">eat</span> / she <span class="mss-hl-my">eats</span> — Skifter stadig ved 3. person ental (-s).`,
                ar: `<span class="mss-hl-my">آكل (ākulu) / يأكل (ya'kulu) / نأكل (na'kulu)</span> — Verbet bøjes efter både person, køn og tal.`,
                tr: `<span class="mss-hl-my">yiyorum / yiyorsun / yiyor</span> — Person-endelsen sidder direkte på verbet.`,
                uk: `<span class="mss-hl-my">я їм / ти їси / він їсть</span> — Verbet skifter endelse for hver eneste person.`,
                de: `ich <span class="mss-hl-my">esse</span> / du <span class="mss-hl-my">isst</span> / wir <span class="mss-hl-my">essen</span> — Verbet bøjes efter personen.`,
                es: `<span class="mss-hl-my">como / comes / come / comemos</span> — Personbøjningen er så tydelig, at "jeg" ofte udelades.`,
                vi: `tôi / bạn / anh ấy <span class="mss-hl-my">ăn</span> — Verbet ændrer slet ikke form (hverken efter person eller tid!).`,
                fa: `<span class="mss-hl-my">می‌خورم (-am) / می‌خوری (-i) / می‌خورد (-ad)</span> — Verbet bøjes altid efter personen.`,
                zh: `我 / 你 / 他 / 我们 <span class="mss-hl-my">吃 (chī)</span> — Ligesom på dansk ændrer kinesiske verber sig aldrig efter personen!`
            },
            detailExplain: `På <strong>ord-niveau</strong> er dansk meget enkelt ved verber: <em>spiser</em> hedder præcis det samme uanset om det er <em>jeg, du, han, hun, vi, I eller de</em>! Til gengæld skal man derfor altid huske pronomenet (<em>jeg/han</em>) foran verbet.`,
            detailExplain_zh: `在<strong>词汇（Ordet）</strong>层面，丹麦语动词有一大显著优势：<strong>动词绝不随人称发生变化</strong>！无论主语是 <em>jeg（我）、du（你）、han（他）</em> 还是 <em>vi（我们）</em>，现在时统统都叫 <em><strong>spiser</strong></em>。但正因如此，丹麦语绝对不能省略人称代词。此外，丹麦语极其擅长将两个词无缝粘合为<strong>复合词（Sammensatte ord）</strong>（如 <em>rug + brød = rugbrød</em> 黑麦面包）。`,
            morePairs: [
                { da: 'rug + brød = rugbrød (ét sammensat ord)', note: 'Dansk limer substantiver sammen til ét ord uden mellemrum.', note_zh: '丹麦语复合词必须紧密连写，不可加空格，否则意思大变。' },
                { da: 'spiser (nutid) ↔ spiste (datid) ↔ har spist (førnutid)', note: 'Kun tiden ændrer verbets form — aldrig personen.', note_zh: '只有时间变化会改变动词后缀，人称绝不改变动词形态。' }
            ],
            links: [
                { label: '⚡ Verbernes tider', route: 'verber_grammatik' },
                { label: '🏃 Top 100 Verber', route: 'top100_verber' },
                { label: '📦 Top 100 Substantiver', route: 'top100_substantiver' }
            ]
        },
        {
            num: 6,
            title: 'Frasen',
            title_zh: '短语与定语结构 (Frasen)',
            subtitle: 'En gruppe ord, der hører sammen som én blok',
            subtitle_zh: '作为一个整体语法块的词组（介词短语 / 形容词前置规则）',
            color: '#f472b6',
            widthPct: 72,
            daLine: `<span class="mss-hl-da">i det store køkken</span> (Præposition + det + adjektiv-e + substantiv)`,
            myLines: {
                en: `<span class="mss-hl-my">in the big kitchen</span> — Samme rækkefølge som dansk, men adjektivet får ingen -e-endelse.`,
                ar: `<span class="mss-hl-my">في المطبخ الكبير (fī al-matbakh al-kabīr)</span> — Adjektivet står <em>efter</em> navneordet ("i køkkenet det-store").`,
                tr: `<span class="mss-hl-my">büyük mutfak-ta</span> — Adjektivet står forrest, men "i" (-ta) sidder allerbagest som endelse.`,
                uk: `<span class="mss-hl-my">у великій кухні</span> — Adjektiv og navneord får kasus-endelse efter præpositionen "у".`,
                de: `<span class="mss-hl-my">in der großen Küche</span> — Adjektivet står foran navneordet med kasus-bøjning.`,
                es: `<span class="mss-hl-my">en la cocina grande</span> — Adjektivet står normalt <em>efter</em> navneordet ("i køkkenet store").`,
                vi: `<span class="mss-hl-my">trong nhà bếp lớn</span> — Adjektivet <em>lớn</em> (stor) står <em>efter</em> navneordet <em>nhà bếp</em>.`,
                fa: `<span class="mss-hl-my">در آشپزخانهٔ بزرگ (dar âshpazkhâneh-ye bozorg)</span> — Adjektivet står <em>efter</em> navneordet bundet med -e (ezâfe).`,
                zh: `<span class="mss-hl-my">在大厨房里</span> — Kinesisk sætter sted- og tidsfraser foran handlingen, og adjektivet foran navneordet.`
            },
            detailExplain: `En <strong>frase</strong> er en lille ordgruppe, der fungerer som én samlet byggeklods i sætningen: f.eks. <em>frisk brød</em>, <em>i køkkenet</em> eller <em>i det store køkken</em>. Bemærk, at på dansk hopper bestemthed frem som <strong>det/den/de</strong>, så snart der kommer et adjektiv ind foran navneordet!`,
            detailExplain_zh: `<strong>短语（Frase）</strong>是在句子中作为一个不可分割整体移动的语块（如 <em>i køkkenet</em> 在厨房里）。丹麦语短语有一项核心规则：名词原本是后缀定指（<em>køkken<strong>et</strong></em>），但只要前方加入形容词，定冠词就会立刻跳到最前面变成独立的 <strong>det / den / de</strong>，且形容词必须加上 -e 结尾：<em><strong>det</strong> stor<strong>e</strong> køkken</em>！`,
            morePairs: [
                { da: 'køkken-et (uden adjektiv) ➔ det store køkken (med adjektiv)', note: 'Endelsen -et flytter frem foran adjektivet som "det".', note_zh: '尾缀 -et 遇到形容词时立刻跃升为前置定冠词 det。' },
                { da: '[i køkkenet] = én samlet steds-frase', note: 'Hele frasen flytter samlet rundt i sætningen.', note_zh: '整个短语在句子中必须作为一个整体模块共同移动。' }
            ],
            links: [
                { label: '🎨 Adjektiver & bøjning', route: 'top100_adjektiver' },
                { label: '🏷️ Bestemthed i fraser', route: 'bestemthed' }
            ]
        },
        {
            num: 7,
            title: 'Sætningen',
            title_zh: '句子与V2语序核心规则 (Sætningen)',
            subtitle: 'Ordenes rækkefølge (SVO + V2-reglen ved tid/sted forrest)',
            subtitle_zh: '词序法则（主谓宾 SVO + 时间/地点置前必倒装的 V2 动词第二位规则）',
            color: '#fb923c',
            widthPct: 79,
            daLine: `1) <span class="mss-hl-da">Jeg spiser</span> brød i køkkenet i dag • 2) I dag <span class="mss-hl-da">spiser jeg</span> brød i køkkenet`,
            myLines: {
                en: `1) <span class="mss-hl-my">I eat</span> bread in the kitchen today • 2) Today <span class="mss-hl-my">I eat</span> bread... (Ingen inversion!)`,
                ar: `<span class="mss-hl-my">آكل الخبز في المطبخ اليوم</span> — Ordforløbet er fleksibelt (VSO/SVO), og tid før sted varierer.`,
                tr: `Bugün mutfakta ekmek <span class="mss-hl-my">yiyorum</span> — Verbet står altid <em>allerbagerst</em> (SOV: "I-dag i-køkkenet brød jeg-spiser").`,
                uk: `Сьогодні <span class="mss-hl-my">я їм</span> хліб на кухні — Subjektet bliver normalt foran verbet, selv når "I dag" står forrest.`,
                de: `1) <span class="mss-hl-my">Ich esse</span> heute... • 2) Heute <span class="mss-hl-my">esse ich</span>... — Tysk har også V2-reglen ligesom dansk!`,
                es: `Hoy <span class="mss-hl-my">(yo) como</span> pan en la cocina — Ingen fast V2-inversion efter "Hoy".`,
                vi: `Hôm nay <span class="mss-hl-my">tôi ăn</span> bánh mì trong nhà bếp — "I dag jeg spiser..." (aldrig inversion).`,
                fa: `امروز در آشپzخانه نان <span class="mss-hl-my">می‌خورم</span> — Verbet står altid til allersidst i sætningen (SOV).`,
                zh: `今天我吃面包 (I dag jeg spiser...) — Kinesisk beholder fast SVO-ordstilling, mens dansk kræver <strong>inversion (V2-reglen)</strong>.`
            },
            detailExplain: `I en dansk <strong>sætning</strong> står der i almindelig ordstilling: <strong>Subjekt + Verbum + Objekt + Sted + Tid</strong> (<em>Jeg spiser brød i køkkenet i dag</em>). Men verbet er låst til <strong>Plads 2 (V2-reglen)</strong>: Hvis du starter med <em>"I dag"</em> eller <em>"I køkkenet"</em> på Plads 1, skal verbet stå lige bagefter: <em>"I dag <strong>spiser jeg</strong>..."</em>.`,
            detailExplain_zh: `丹麦语<strong>陈述句</strong>的基本语序是：<strong>主语 + 动词 + 宾语 + 地点 + 时间</strong>（<em>Jeg spiser brød i køkkenet i dag</em>）。但它受最严格的<strong>动词第二位规则（V2-reglen）</strong>制约：如果你想强调时间或地点，将其放在句首第一位（如 <em>I dag...</em>），<strong>动词必须死守第二位</strong>，主语被迫倒装移至第三位：<em>"I dag <strong>spiser jeg</strong> brød..."</em>！中文依然保持“今天我吃面包”，初学者切勿忘记倒装！`,
            morePairs: [
                { da: 'Normal: [Jeg] [spiser] brød [i køkkenet] [i dag] (Sted før Tid)', note: 'På dansk kommer Sted (i køkkenet) før Tid (i dag) til sidst.', note_zh: '丹麦语句末通常是地点（i køkkenet）先于时间（i dag）。' },
                { da: 'Inversion: [I dag] [spiser] [jeg] brød i køkkenet', note: 'Verbet skal altid blive på Plads 2 i en hovedsætning.', note_zh: '状语放句首，动词牢牢占据第2位，主语退至第3位。' }
            ],
            links: [
                { label: '🏗️ Sådan bygger du en sætning', route: 'grounding' },
                { label: '🧩 Ordstilling & Inversion', route: 'ordstilling' },
                { label: '⏰ Træn tidsudtryk', route: 'traen_tidsudtryk' }
            ]
        },
        {
            num: 8,
            title: 'Ytringen',
            title_zh: '话语功能与句式 (Ytringen)',
            subtitle: 'Hv-spørgsmål, Ja/nej-spørgsmål og Imperativ (bydemåde)',
            subtitle_zh: '特殊疑问句（Hv-）、一般疑问句（Ja/nej）与祈使句（Imperativ）',
            color: '#facc15',
            widthPct: 86,
            daLine: `Hv: "<span class="mss-hl-da">Hvad spiser du?</span>" • Ja/nej: "<span class="mss-hl-da">Spiser du</span> brød?" • Imperativ: "<span class="mss-hl-da">Spis</span> brødet!"`,
            myLines: {
                en: `Hv: "<span class="mss-hl-my">What do you eat?</span>" • Ja/nej: "<span class="mss-hl-my">Do you eat</span> bread?" • Imp.: "<span class="mss-hl-my">Eat</span> the bread!"`,
                ar: `Hv: "<span class="mss-hl-my">ماذا تأكل؟</span>" • Ja/nej: "<span class="mss-hl-my">هل تأكل</span> الخبز؟" • Imp.: "<span class="mss-hl-my">كُلْ (Kul)</span> الخبز!"`,
                tr: `Hv: "<span class="mss-hl-my">Ne yiyorsun?</span>" • Ja/nej: "Ekmek yiyor <span class="mss-hl-my">musun?</span>" • Imp.: "Ekmeği <span class="mss-hl-my">ye!</span>"`,
                uk: `Hv: "<span class="mss-hl-my">Що ти їси?</span>" • Ja/nej: "<span class="mss-hl-my">Ти їси</span> хліб?" (tonefald) • Imp.: "<span class="mss-hl-my">Їж</span> хліб!"`,
                de: `Hv: "<span class="mss-hl-my">Was isst du?</span>" • Ja/nej: "<span class="mss-hl-my">Isst du</span> Brot?" • Imp.: "<span class="mss-hl-my">Iss</span> das Brot!"`,
                es: `Hv: "<span class="mss-hl-my">¿Qué comes?</span>" • Ja/nej: "<span class="mss-hl-my">¿Comes</span> pan?" • Imp.: "¡<span class="mss-hl-my">Come</span> el pan!"`,
                vi: `Hv: "Bạn ăn <span class="mss-hl-my">gì?</span>" (til sidst) • Ja/nej: "Bạn ăn bánh mì <span class="mss-hl-my">không?</span>" • Imp.: "<span class="mss-hl-my">Hãy ăn</span> bánh mì đi!"`,
                fa: `Hv: "<span class="mss-hl-my">چه می‌خوری؟</span>" • Ja/nej: "<span class="mss-hl-my">آیا</span> نان می‌خوری؟" • Imp.: "نان را <span class="mss-hl-my">بخور (bokhor)!</span>"`,
                zh: `Hv: "你吃<span class="mss-hl-my">什么 (shénme)?</span>" • Ja/nej: "你吃面包<span class="mss-hl-my">吗 (ma)?</span>" • Imp.: "快<span class="mss-hl-my">吃</span>面包!"`
            },
            detailExplain: `En <strong>ytring</strong> er sætningen brugt som en konkret talehandling i en situation. Her er de <strong>3 vigtigste ytringstyper</strong> på dansk sammenlignet med dit sprog:`,
            detailExplain_zh: `<strong>话语（Ytring）</strong>是指将句子投入具体实际交际时的言语行为。丹麦语的三大核心句式为：<strong>1) 特殊疑问句（Hv-ord）</strong>：疑问词+动词第2位+主语；<strong>2) 一般疑问句（Ja/nej）</strong>：无需疑问助词，直接将动词提至句首第1位；<strong>3) 祈使句（Imperativ）</strong>：直接使用动词原形词根（去掉 -er），无需主语。`,
            utteranceCards: [
                {
                    badge: '1. HV-SPØRGSMÅL (Åbent spørgsmål med spørgeord)',
                    accent: '#38bdf8',
                    daFormula: 'Hv-ord (Plads 1) + Verbum (Plads 2) + Subjekt (Plads 3)',
                    daExample: '"<strong>Hvad</strong> <u>spiser</u> du i køkkenet i dag?" • "<strong>Hvornår</strong> <u>spiser</u> vi?"',
                    daSubNote: 'De vigtigste hv-ord: <strong>hvad, hvem, hvor, hvornår, hvorfor, hvordan, hvilken/hvilket/hvilke</strong>.',
                    myByLang: {
                        en: '"<strong>What do</strong> you eat in the kitchen today?" — Engelsk indsætter hjælpeverbet <em>do/does/did</em> mellem spørgeordet og "you". Dansk sætter hovedverbet direkte på Plads 2!',
                        ar: '"<strong>ماذا</strong> تأكل في المطبخ اليوم؟ (Mādhā ta\'kulu...)" — Spørgeordet står forrest efterfulgt af det personbøjede verbum.',
                        tr: '"Bugün mutfakta <strong>ne</strong> yiyorsun?" — Spørgeordet <em>ne</em> (hvad) bliver stående inde foran verbet til sidst, i stedet for at trække verbet frem på Plads 2.',
                        uk: '"<strong>Що</strong> ти їси на кухні сьогодні?" — Efter spørgeordet <em>Що</em> står subjektet <em>ти</em> normalt før verbet (ingen tvungen V2-inversion).',
                        de: '"<strong>Was</strong> isst du heute in der Küche?" — Præcis samme opbygning som dansk: Spørgeord + Verbum + Subjekt!',
                        es: '"¿<strong>Qué</strong> comes (tú) en la cocina hoy?" — Spørgeord + Verbum (+ evt. subjekt).',
                        vi: '"Hôm nay bạn ăn <strong>gì</strong> trong nhà bếp?" — Spørgeordet <em>gì</em> (hvad) står <em>efter</em> verbet på den plads, hvor svaret hører hjemme!',
                        fa: '"امروز در آشپزخانه <strong>چه</strong> می‌خوری؟" — Spørgeordet står inde i sætningen lige foran verbet til sidst.',
                        zh: '"今天你在厨房吃<strong>什么</strong>？" — Kinesisk lader spørgeordet stå på objektets plads ("Hvad") i stedet for at rykke det forrest med V2-inversion.'
                    }
                },
                {
                    badge: '2. JA/NEJ-SPØRGSMÅL (Lukket spørgsmål uden spørgeord)',
                    accent: '#facc15',
                    daFormula: 'Verbum allerforrest (Plads 1) + Subjekt (Plads 2)',
                    daExample: '"<strong>Spiser</strong> <u>du</u> brød i køkkenet i dag?"',
                    daSubNote: 'Dansk bytter bare plads på verbum og person — uden ekstra spørgeord.',
                    myByLang: {
                        en: '"<strong>Do</strong> you eat bread...?" — Engelsk skal bruge hjælpeordet <em>Do/Are</em> forrest. På dansk rykker selve verbet (<em>Spiser</em>) frem forrest!',
                        ar: '"<strong>هل (Hal)</strong> تأكل الخبز...؟" — Arabisk sætter spørgepartiklen <em>hal</em> foran sætningen.',
                        tr: '"Bugün mutfakta ekmek yiyor <strong>musun</strong>?" — Tyrkisk sætter spørgepartiklen <em>mı/mi/mu/mü</em> til sidst efter verbet.',
                        uk: '"<strong>Ти їси</strong> хліб на кухні сьогодні?" — Samme ordstilling som en almindelig sætning; kun det stigende tonefald gør det til et spørgsmål!',
                        de: '"<strong>Isst du</strong> heute Brot in der Küche?" — Bytter plads på verbum og subjekt præcis ligesom dansk.',
                        es: '"¿<strong>Comes</strong> pan en la cocina hoy?" — Afgøres af det stigende tonefald.',
                        vi: '"Hôm nay bạn ăn bánh mì <strong>không</strong>?" — Sætter spørgeordet <em>không</em> allerbagerst i sætningen.',
                        fa: '"<strong>آیا (Âyâ)</strong> امروز نان می‌خوری؟" — Bruger spørgeordet <em>âyâ</em> forrest eller blot stigende tonefald.'
                    }
                },
                {
                    badge: '3. IMPERATIV / BYDEMÅDE (Opfordring, instruktion eller råd)',
                    accent: '#4ade80',
                    daFormula: 'Kun verbets stamme (fjern -er fra nutid) — uden "du"!',
                    daExample: '"<strong>Spis</strong> brødet i køkkenet!" • "<strong>Kom</strong> ind og <strong>sæt</strong> dig!"',
                    daSubNote: 'Sådan laves imperativ: <em>spiser → <strong>spis!</strong> • læser → <strong>læs!</strong> • venter → <strong>vent!</strong></em>',
                    myByLang: {
                        en: '"<strong>Eat</strong> the bread in the kitchen!" — Bruger grundformen uden "you", meget ligesom dansk.',
                        ar: '"<strong>كُلْ (Kul)</strong> الخبز في المطبخ!" — Imperativ bøjes efter om man taler til en mand (<em>kul</em>), en kvinde (<em>kulī</em>) eller flere (<em>kulū</em>). På dansk er formen <strong>spis!</strong> ens for alle!',
                        tr: '"Mutfakta ekmeği <strong>ye</strong>!" — Bruger verbets rod (<em>ye-</em>) til sidst i sætningen.',
                        uk: '"<strong>Їж</strong> хліб на кухні!" — Har særskilt imperativform for ental (<em>їж</em>) og flertal/høflig (<em>їжте</em>).',
                        de: '"<strong>Iss</strong> das Brot in der Küche!" — Har forskellige former til <em>du (iss!)</em>, <em>ihr (esst!)</em> og <em>Sie (essen Sie!)</em>. Dansk har kun én form!',
                        es: '"¡<strong>Come</strong> el pan en la cocina!" — Skifter form mellem uformel (<em>come</em>), høflig (<em>coma</em>) og flertal.',
                        vi: '"<strong>Hãy ăn</strong> bánh mì trong bếp <strong>đi</strong>!" — Bruger opfordringsord som <em>hãy</em> foran eller <em>đi</em> til sidst.',
                        fa: '"نان را در آشپزخانه <strong>بخور (bokhor)</strong>!" — Dannes med forstavelsen <em>be-/bo-</em> + nutidsstammen til sidst.'
                    }
                }
            ],
            morePairs: [
                { da: 'Fremsættende: "Du spiser brød." → Ja/nej-spørgsmål: "Spiser du brød?" → Imperativ: "Spis brødet!"', note: 'Se hvordan de samme ord skifter funktion blot ved rækkefølge og endelse.' },
                { da: 'Høflig ytring i datid: "Ville du have et stykke brød?" / "Kunne du lukke døren?"', note: 'På dansk bløder man ofte en opfordring op ved at spørge med "Kan/Kunne du...?" fremfor ren imperativ.' }
            ],
            links: [
                { label: '💬 Lav spørgsmål (Hv- & Ja/nej)', route: 'lav_sporgsmal' },
                { label: '⚡ Verbernes tider & former', route: 'verber_grammatik' },
                { label: '🏃 Top 100 Verber', route: 'top100_verber' }
            ]
        },
        {
            num: 9,
            title: 'Turparet',
            title_zh: '相邻对话对 (Turparet)',
            subtitle: 'Spørgsmål og svar mellem to personer (Ja/Jo + "det gør jeg")',
            subtitle_zh: '问答呼应与丹麦语特有的“Jo”与回声式回答（det gør jeg）',
            color: '#4ade80',
            widthPct: 93,
            daLine: `A: "Spiser du <u>ikke</u> brød?" ➔ B: "<span class="mss-hl-da">Jo, det gør jeg!</span>" (Ikke kun "ja")`,
            myLines: {
                en: `A: "Don't you eat bread?" ➔ B: "<span class="mss-hl-my">Yes, I do!</span>" — Engelsk har ikke forskel på <em>Ja</em> og <em>Jo</em>.`,
                ar: `B: "<span class="mss-hl-my">بلى (Balā)</span>" — Arabisk har faktisk <em>balā</em> efter negativt spørgsmål ligesom dansk <em>Jo</em>!`,
                tr: `B: "<span class="mss-hl-my">Evet, yiyorum</span>" — Tyrkisk gentager hovedverbet ("Ja, jeg-spiser") i stedet for "det gør jeg".`,
                uk: `B: "<span class="mss-hl-my">Так, їм</span>" — Bruger samme "Ja" (Так) og gentager selve verbet.`,
                de: `B: "<span class="mss-hl-my">Doch!</span>" — Tysk har <em>Doch</em> ligesom dansk <em>Jo</em>, men bruger ikke "det gør jeg"-ekko.`,
                es: `B: "<span class="mss-hl-my">Sí, claro</span>" — Spansk bruger <em>Sí</em> til både positive og negative spørgsmål.`,
                vi: `B: "<span class="mss-hl-my">Có, tôi có ăn</span>" — Bruger <em>Có</em> til at bekræfte handlingen.`,
                fa: `B: "<span class="mss-hl-my">چرا (Cherâ), می‌خورm</span>" — Persisk bruger <em>cherâ</em> som dansk <em>Jo!</em> efter et negativt spørgsmål.`,
                zh: `B: "<span class="mss-hl-my">会啊 / 吃啊</span>" — Kinesisk svarer med bekræftelse af verbet (会/吃), og har ikke en direkte modpart til "Jo".`
            },
            detailExplain: `Et <strong>turpar</strong> er to replikker, der hænger uløseligt sammen: f.eks. <em>Spørgsmål → Svar</em> eller <em>Tilbud → Tak</em>. På dansk gælder to vigtige vaner i turpar: 1) Hvis spørgsmålet indeholder <em>"ikke"</em>, skal et positivt svar starte med <strong>"Jo"</strong> (ikke "Ja"). 2) Man runder næsten altid svaret af med et lille ekko-svar: <strong>"Ja, det gør jeg"</strong> / <strong>"Nej, det gør jeg ikke"</strong>.`,
            detailExplain_zh: `<strong>相邻对话对（Turpar）</strong>是人际对话中成对出现的紧密轮次（如问与答）。丹麦语在对话中有两大极其重要的文化习惯：1) 面对<strong>否定提问</strong>（含有 <em>ikke</em>），如果你想表示肯定回答，<strong>绝不能用 Ja，必须使用“Jo”</strong>（相当于中文的“不，我吃！”）；2) 丹麦人极少只说一个字，习惯带上“回声动词”：<em><strong>"Ja, det gør jeg"</strong>（是的，我吃）/ <strong>"Nej, det gør jeg ikke"</strong></em>。`,
            morePairs: [
                { da: 'A: "Spiser du brød?" → B: "Ja, det gør jeg." (Positivt spørgsmål → Ja)', note: '"Det gør jeg" gør svaret venligt og naturligt på dansk.' },
                { da: 'A: "Er du ikke sulten?" → B: "Jo, det er jeg!" (Negativt spørgsmål → Jo)', note: 'Ved "er/har/kan/vil" gentages hjælpeverbet i stedet for "gør".', note_zh: '对方问“难道你不饿吗？”，肯定回答必须用 Jo，绝不可用 Ja！' }
            ],
            links: [
                { label: '🗣️ Samtaletræning', route: 'samtale_traening' },
                { label: '💬 Lav spørgsmål & svar', route: 'lav_sporgsmal' }
            ]
        },
        {
            num: 10,
            title: 'Samtalen / Teksten',
            title_zh: '对话语篇与小词润色 (Samtalen / Teksten)',
            subtitle: 'Flere turpar og sætninger bundet sammen med småord og bindeord',
            subtitle_zh: '通过连接词与丹麦语“神奇小词”（nå, jo, lige, vel）串联自然对话',
            color: '#2dd4bf',
            widthPct: 100,
            daLine: `"<span class="mss-hl-da">Nå</span>, jeg er sulten, <span class="mss-hl-da">så</span> jeg spiser lige noget brød i køkkenet, <span class="mss-hl-da">ikke?</span>"`,
            myLines: {
                en: `"<span class="mss-hl-my">Well</span>, I'm hungry, <span class="mss-hl-my">so</span> I'll just eat some bread in the kitchen, <span class="mss-hl-my">okay?</span>"`,
                ar: `"<span class="mss-hl-my">طيب / يعني (Ya'ni)</span>، أنا جائع، <span class="mss-hl-my">لذلك</span> سآكل..." — Bruger andre samtalemarkører til at binde taleture sammen.`,
                tr: `"<span class="mss-hl-my">Şey / Yani</span>, karnım aç, <span class="mss-hl-my">o yüzden</span> mutfakta biraz ekmek yiyorum, <span class="mss-hl-my">tamam mı?</span>"`,
                uk: `"<span class="mss-hl-my">Ну</span>, я голодний, <span class="mss-hl-my">тому</span> я просто поїм хліба на кухні, <span class="mss-hl-my">добре?</span>"`,
                de: `"<span class="mss-hl-my">Na ja</span>, ich bin hungrig, <span class="mss-hl-my">also</span> esse ich mal Brot in der Küche, <span class="mss-hl-my">oder?</span>"`,
                es: `"<span class="mss-hl-my">Bueno</span>, tengo hambre, <span class="mss-hl-my">así que</span> como pan en la cocina, <span class="mss-hl-my">¿vale?</span>"`,
                vi: `"<span class="mss-hl-my">À</span>, tôi đói rồi, <span class="mss-hl-my">nên</span> tôi ăn chút bánh mì trong bếp <span class="mss-hl-my">nhé!</span>"`,
                fa: `"<span class="mss-hl-my">خب (Khob)</span>، گرسنه‌ام، <span class="mss-hl-my">پس</span> توی آشپزخانه کمی نان می‌خورم، <span class="mss-hl-my">باشه؟</span>"`,
                zh: `"<span class="mss-hl-my">哎 (Āi)</span>，我饿了，<span class="mss-hl-my">所以</span>去厨房吃点面包，<span class="mss-hl-my">对吧？</span>" — Kinesisk bruger语气词 (partikler som 呢/吧/啊) til kontakt og stemning.`
            },
            detailExplain: `Øverst i sproget samles ytringer og turpar til en hel <strong>samtale eller tekst</strong>. Her bruger dansk små dialog-ord som <strong>nå, jo, lige, altså, vel, ikke?</strong> til at vise følelse og kontakt — og bindeord som <strong>så, fordi, derfor, når/da</strong> til at kæde sætningerne sammen.`,
            detailExplain_zh: `在语言金字塔的顶峰，句子被组织为生动的<strong>完整对话与语篇（Samtalen / Teksten）</strong>。地道丹麦语的一大精髓是充斥着<strong>语气小词（småord: jo, nok, lige, vel, ikke?）</strong>，它们不改变句义，却能软化语气、拉近距离。同时，通过 <em>fordi（因为）、så（所以）、da/når（当...时）</em> 等连词精确连接主从从句。`,
            morePairs: [
                { da: 'Jeg spiser brød, FORDI jeg er sulten. (Bisætning) ↔ Jeg er sulten, SÅ jeg spiser brød. (Hovedsætning)', note: 'Bindeordet styrer ordstillingen i næste sætning.', note_zh: '连词的性质（从属/并列）直接决定后续句子的词序（从句有自己的特殊词序）。' },
                { da: '"Nå!" (Overraskelse/ny info) • "Jeg spiser LIGE..." (Gør handlingen uformel og kort)', note: 'Småordene gør dansk levende i hverdagen.', note_zh: '善用 lige 和 nå，能瞬间让你的丹麦语脱离书本腔，变得生动自然。' }
            ],
            links: [
                { label: '🔗 Konjunktioner & Bindeord', route: 'traen_grammatik' },
                { label: '✨ De små magiske ord (jo, nok, lige)', route: 'adverbier_smaaord' },
                { label: '🕹️ Interaktive historier', route: 'historier_menu' }
            ]
        }
    ];

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'mss-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'mss-back-btn';
    backBtn.innerHTML = `← Tilbage til forsiden`;
    backBtn.onclick = () => navigateFn('main');
    topBar.appendChild(backBtn);

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

        noticeBanner.innerHTML = `
            <span class="mss-notice-flag">🇨🇳</span>
            <div>
                <div class="mss-notice-title">Kun på kinesisk. Andre sprog følger senere.</div>
                <div class="mss-notice-sub">${isZh ? '目前仅提供中文版完整对比与发音专项训练，其他语言即将推出。' : 'Currently only available in Chinese. Other languages coming soon.'}</div>
            </div>
        `;

        hero.innerHTML = `
            <div class="mss-hero-kicker">${isZh ? '🌍 语言指南 • 从最小发音特征到完整对话' : '🌍 Sprog-kompas • Fra mindste lyd til hel samtale'}</div>
            <h1>${isZh ? '我的母语与丹麦语对比 (Mit sprog sammenlignet med dansk)' : 'Mit sprog sammenlignet med dansk'}</h1>
            <p>
                ${isZh ? 
                    '从最细微的声音特征到整场对话，十个层级全方位拆解丹麦语与中文的核心差异。主线例句：<em>"Jeg spiser brød i køkkenet i dag"</em>（我今天在厨房吃面包）。' : 
                    'Se hvordan sprog bygges op trin for trin — fra det mindste lydtræk til en hel samtale — med direkte sammenligning af <strong>Dansk</strong> og <strong>dit sprog</strong> ved sætningen: <em>"Jeg spiser brød i køkkenet i dag"</em>.'}
            </p>
        `;

        function buildUtteranceCardsHtml(st) {
            if (!st.utteranceCards || !st.utteranceCards.length) return '';
            return `
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr)); gap:0.85rem; margin-bottom:1.05rem;">
                    ${st.utteranceCards.map(uc => {
                        const myTxt = uc.myByLang[selectedLang] || uc.myByLang.en;
                        return `
                            <div style="background:rgba(15,23,42,0.92); border:1.5px solid ${uc.accent}; border-radius:14px; padding:0.9rem 1rem; display:flex; flex-direction:column; gap:0.5rem;">
                                <div style="font-size:0.74rem; font-weight:900; color:${uc.accent}; text-transform:uppercase; letter-spacing:0.03em;">
                                    ${uc.badge}
                                </div>
                                <div style="background:rgba(239,68,68,0.12); border-left:3.5px solid #ef4444; border-radius:8px; padding:0.55rem 0.7rem;">
                                    <div style="font-size:0.7rem; font-weight:900; color:#fca5a5; text-transform:uppercase; margin-bottom:0.15rem;">🇩🇰 Dansk (${uc.daFormula})</div>
                                    <div style="font-size:0.93rem; color:#ffffff; font-weight:800;">${uc.daExample}</div>
                                    <div style="font-size:0.78rem; color:#cbd5e1; margin-top:0.25rem;">${uc.daSubNote}</div>
                                </div>
                                <div style="background:rgba(56,189,248,0.1); border-left:3.5px solid #38bdf8; border-radius:8px; padding:0.55rem 0.7rem;">
                                    <div style="font-size:0.7rem; font-weight:900; color:#7dd3fc; text-transform:uppercase; margin-bottom:0.15rem;">${langObj.flag} ${langObj.name}</div>
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
            const myText = st.myLines[selectedLang] || st.myLines.en;
            const isZh = selectedLang === 'zh';
            return `
                <div class="mss-detail-overlay" style="margin-top:0.45rem; margin-bottom:0.65rem; margin-left:1.35rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                        <div>
                            <span style="font-size:0.75rem; font-weight:900; color:${st.color}; text-transform:uppercase;">
                                ${isZh ? `深度解析 • 第 ${st.num} 级 (Trin ${st.num} af 10)` : `Underflade • Trin ${st.num} af 10`}
                            </span>
                            <h2 style="margin:0.15rem 0 0; font-size:1.35rem; font-weight:900; color:#ffffff;">
                                ${st.num}. ${isZh ? (st.title_zh || st.title) : st.title} — ${isZh ? (st.subtitle_zh || st.subtitle) : st.subtitle}
                            </h2>
                        </div>
                        <button class="mss-back-btn" data-close-sub="1" style="border-color:#fde68a; color:#fde68a;">
                            ${isZh ? '✕ 关闭详情' : '✕ Luk underflade'}
                        </button>
                    </div>

                    <div class="mss-two-lines" style="margin-bottom:0.85rem;">
                        <div class="mss-line-da">
                            <span class="mss-line-tag" style="color:#fca5a5;">🇩🇰 ${isZh ? '丹麦语 (Dansk)' : 'Dansk'}:</span>
                            <span>${st.daLine}</span>
                        </div>
                        <div class="mss-line-my">
                            <span class="mss-line-tag" style="color:#7dd3fc;">${langObj.flag} ${isZh ? '我的母语 (Kinesisk)' : 'Mit sprog'}:</span>
                            <span>${myText}</span>
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
                                    <span>🇨🇳</span> <span>${isZh ? '发音难点专项模块' : 'Fonetisk Specialistmodul'}</span>
                                </div>
                                <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                    ${isZh ? '针对中国学习者的难点发音：边音 /l/ 与鼻音 /n/ 对比训练 (L vs. N)' : 'Vanskelige lyde for kinesere: L vs. N (侧音与鼻音对比)'}
                                </div>
                                <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.5;">
                                    ${isZh ? 
                                        '探索两套发音器官矢量图解（正视/俯视气流通道），体验捏鼻自检法，并通过麦克风进行三词口语挑战。' : 
                                        'Udforsk de to interaktive munddiagrammer (profil + set oppefra med laterale luftpile), prøv næseklemmetricket og træn udtalen direkte med mikrofonen.'}
                                </div>
                            </div>
                            <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_kinesisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; white-space:nowrap; border-radius:12px;">
                                ${isZh ? '打开专项训练 ➔' : 'Åbn specialistfladen ➔'}
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
                            ${st.links.map(lk => `<button class="mss-link-chip" data-nav="${lk.route}">${lk.label} ➔</button>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        stage.innerHTML = `
            <div class="mss-control-panel">
                <div class="mss-lang-row" style="border-top:none; padding-top:0;">
                    <span style="font-size:0.78rem; font-weight:900; color:#fde68a; text-transform:uppercase; margin-right:0.25rem;">
                        ${isZh ? '选择对比语言 (Vælg sprog):' : 'Vælg dit sprog til sammenligningen:'}
                    </span>
                    ${LANGUAGES.map(l => `
                        <button class="mss-lang-pill ${selectedLang === l.code ? 'active' : ''}" data-lang="${l.code}">
                            ${l.flag} ${l.name}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="mss-ladder-wrap">
                ${STEPS.map((st, idx) => {
                    const myText = st.myLines[selectedLang] || st.myLines.en;
                    const isOpen = openSubStepIndex === idx;
                    return `
                        <div>
                            <div class="mss-step-card" style="--step-color:${st.color}; ${isOpen ? 'border-color:#fde68a;' : ''}" data-open-sub="${idx}">
                                <div class="mss-step-dot" style="--step-color:${st.color};">${st.num}</div>
                                <div>
                                    <div style="font-size:0.72rem; font-weight:900; color:${st.color}; text-transform:uppercase;">
                                        Trin ${st.num} ${isZh ? `(第 ${st.num} 级)` : ''}
                                    </div>
                                    <div style="font-size:1.08rem; font-weight:900; color:#ffffff; margin:0.1rem 0 0.2rem;">
                                        ${isZh ? (st.title_zh || st.title) : st.title}
                                    </div>
                                    <div style="font-size:0.79rem; color:#cbd5e1; line-height:1.35;">
                                        ${isZh ? (st.subtitle_zh || st.subtitle) : st.subtitle}
                                    </div>
                                </div>
                                <div class="mss-two-lines">
                                    <div class="mss-line-da">
                                        <span class="mss-line-tag" style="color:#fca5a5;">🇩🇰 ${isZh ? '丹麦语' : 'Dansk'}:</span>
                                        <span>${st.daLine}</span>
                                    </div>
                                    <div class="mss-line-my">
                                        <span class="mss-line-tag" style="color:#7dd3fc;">${langObj.flag} ${isZh ? '我的母语' : 'Mit sprog'}:</span>
                                        <span>${myText}</span>
                                    </div>
                                </div>
                                <div>
                                    <button class="mss-sub-btn" data-open-sub="${idx}">
                                        ${isOpen ? (isZh ? '收起详情 ▲' : 'Luk underflade ▲') : (isZh ? '查看详情与练习 ➔' : 'Se mere & links ➔')}
                                    </button>
                                </div>
                            </div>
                            ${isOpen ? buildInlineSubViewHtml(idx) : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        stage.querySelectorAll('[data-lang]').forEach(btn => {
            btn.onclick = () => {
                selectedLang = btn.dataset.lang;
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
