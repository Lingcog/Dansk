import { getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';

export function renderMitSprogSammenlignetView(container, navigateFn, extraData = {}) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container mit-sprog-sammenlignet-view';

    const style = document.createElement('style');
    style.textContent = `
        #app:has(.mit-sprog-sammenlignet-view) {
            max-width: 1140px;
        }
        .mit-sprog-sammenlignet-view {
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;
            padding: 0.9rem 1rem 3.5rem;
            color: #f8fafc;
            box-sizing: border-box;
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
            gap: 0.45rem;
            background: rgba(9, 14, 26, 0.88);
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 12px;
            padding: 0.65rem 0.9rem;
            width: 100%;
            box-sizing: border-box;
        }
        .mss-line-da {
            display: block;
            font-size: 0.92rem;
            line-height: 1.5;
            color: #ffffff;
            font-weight: 600;
            border-inline-start: 3.5px solid #ef4444;
            padding-inline-start: 0.65rem;
            overflow-wrap: break-word;
        }
        .mss-line-my {
            display: block;
            font-size: 0.9rem;
            line-height: 1.52;
            color: #bae6fd;
            font-weight: 500;
            border-inline-start: 3.5px solid #38bdf8;
            padding-inline-start: 0.65rem;
            overflow-wrap: break-word;
        }
        .mss-line-tag {
            display: inline-block;
            font-size: 0.69rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            margin-inline-end: 0.45rem;
            padding: 0.08rem 0.42rem;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.08);
            vertical-align: baseline;
            white-space: normal;
        }
        .mss-hl-da {
            background: rgba(239, 68, 68, 0.24);
            border: 1px solid rgba(248, 113, 113, 0.55);
            color: #fecaca;
            padding: 0.04rem 0.35rem;
            border-radius: 6px;
            font-weight: 800;
        }
        .mss-hl-my {
            background: rgba(56, 189, 248, 0.2);
            border: 1px solid rgba(56, 189, 248, 0.5);
            color: #fde68a;
            padding: 0.04rem 0.35rem;
            border-radius: 6px;
            font-weight: 800;
        }

        /* Ladder Wrap */
        .mss-ladder-wrap {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 0.7rem;
            padding-left: 1rem;
        }
        .mss-ladder-wrap::before {
            content: '';
            position: absolute;
            left: 22px;
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
            padding: 0.78rem 1rem;
            margin-left: 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
            transition: all 0.18s ease;
            cursor: pointer;
        }
        .mss-step-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
        }
        .mss-step-head-text {
            flex: 1 1 280px;
            min-width: 0;
        }
        .mss-step-card:hover {
            border-color: #fde68a;
            transform: translateX(3px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
        .mss-step-dot {
            position: absolute;
            left: -2.05rem;
            top: 1.35rem;
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
        @media (max-width: 640px) {
            .mit-sprog-sammenlignet-view {
                padding: 0.75rem 0.65rem 3rem;
            }
            .mss-ladder-wrap {
                padding-left: 0.5rem;
            }
            .mss-ladder-wrap::before {
                left: 11px;
            }
            .mss-step-card {
                margin-left: 0.9rem;
                padding: 0.7rem 0.78rem;
            }
            .mss-step-dot {
                left: -1.65rem;
                width: 24px;
                height: 24px;
                font-size: 0.7rem;
            }
            .mss-detail-overlay {
                margin-left: 0.45rem !important;
                padding: 0.95rem !important;
            }
        }

        .mss-sub-btn {
            background: linear-gradient(135deg, #ef4444, #b91c1c);
            border: 1px solid rgba(254, 202, 202, 0.45);
            color: #ffffff;
            padding: 0.44rem 0.85rem;
            border-radius: 10px;
            font-size: 0.78rem;
            font-weight: 800;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.16s ease;
            flex-shrink: 0;
        }
        .mss-sub-btn:hover {
            filter: brightness(1.12);
        }

        /* Detail Overlay */
        .mss-detail-overlay {
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(9, 13, 26, 0.99));
            border: 2px solid #fde68a;
            border-radius: 18px;
            padding: 1.15rem 1.25rem;
            margin-bottom: 1.1rem;
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
            max-width: 100%;
            white-space: normal;
            text-align: left;
            box-sizing: border-box;
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

    // Languages for comparison (Dansk, Engelsk, Arabisk, Ukrainsk, Vietnamesisk, Urdu og Kinesisk fuldt understøttet)
    const LANGUAGES = [
        { code: 'da', name: 'Dansk', flag: '🇩🇰' },
        { code: 'en', name: 'Engelsk (English)', flag: '🇬🇧' },
        { code: 'ar', name: 'Arabisk (العربية)', flag: '🇸🇦' },
        { code: 'uk', name: 'Ukrainsk (Українська)', flag: '🇺🇦' },
        { code: 'vi', name: 'Vietnamesisk (Tiếng Việt)', flag: '🇻🇳' },
        { code: 'ur', name: 'Urdu (اردو)', flag: '🇵🇰' },
        { code: 'zh', name: 'Kinesisk (中文)', flag: '🇨🇳' },
        { code: 'tr', name: 'Tyrkisk (Türkçe)', flag: '🇹🇷' },
        { code: 'de', name: 'Tysk (Deutsch)', flag: '🇩🇪' },
        { code: 'es', name: 'Spansk (Español)', flag: '🇪🇸' },
        { code: 'pt', name: 'Portugisisk (Português)', flag: '🇵🇹' },
        { code: 'fa', name: 'Persisk / Farsi (فارسی)', flag: '🇮🇷' }
    ];

    const SUPPORTED_MSS_LANGS = ['da', 'en', 'ar', 'uk', 'vi', 'ur', 'fa', 'pt', 'es', 'zh'];
    const appLang = getLang();
    let selectedLang = localStorage.getItem('mss_selected_lang') || (SUPPORTED_MSS_LANGS.includes(appLang) ? appLang : 'da');

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
        if (SUPPORTED_MSS_LANGS.includes(segs[0])) {
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
            title_en: 'Subtle Sound Shifts (Lille lydforskel)',
            title_uk: 'Тонка різниця у звуках (Lille lydforskel)',
            title_vi: 'Khác biệt âm thanh nhỏ (Lille lydforskel)',
            title_ur: 'آواز کا باریک فرق جو معنی بدل دے (Lille lydforskel)',
            title_fa: 'تفاوت ظریف آوایی که معنی را عوض می‌کند (Lille lydforskel)',
            title_pt: 'Diferença sutil de som que muda o significado (Lille lydforskel)',
            title_es: 'Pequeña diferencia de sonido que cambia el significado (Lille lydforskel)',
            subtitle: 'En lille ændring i munden eller et lille stop i stemmen, der ændrer hele ordets betydning',
            subtitle_zh: '改变意思的微小动作（嘴唇是圆是扁 / 喉咙踩刹车 stød / 语调高低）',
            subtitle_ar: 'حركة صغيرة في الشفاه أو فرملة سريعة في الحنجرة تقلب معنى الكلمة بالكامل',
            subtitle_en: 'A tiny shift in lip shape or vocal brake that flips the whole word’s meaning',
            subtitle_uk: 'Маленький рух губ або коротка зупинка голосу (stød), що повністю змінює значення слова',
            subtitle_vi: 'Chỉ một thay đổi nhỏ ở hình dáng môi (tròn như hôn vs. cười) hoặc tiếng ngắt cổ họng (stød) cũng đổi hẳn nghĩa từ',
            subtitle_ur: 'ہونٹوں کی معمولی گولائی یا گلے میں ہلکی سی بریک (stød) جو پورے لفظ کا مطلب بدل دیتی ہے',
            subtitle_fa: 'تغییر کوچک در شکل لب‌ها (غنچه یا لبخند) یا ترمز سریع حنجره (stød) که معنی کل کلمه را تغییر می‌دهد',
            subtitle_pt: 'Um pequeno ajuste nos lábios (biquinho vs. sorriso) ou uma travada rápida na voz (stød) que muda toda a palavra',
            subtitle_es: 'Un pequeño giro en los labios (besito vs. sonrisa) o un freno rápido de voz (stød) que cambia toda la palabra',
            color: '#38bdf8',
            widthPct: 38,
            daLine: `Læberne spidses som til et kys + lille stop i stemmen i <span class="mss-hl-da">brøʼd</span> vs. <span class="mss-hl-da">bred</span> (smilende flade læber)`,
            daLine_zh: 'brøʼd（嘴唇向前嘟圆 + 喉咙像打嗝般短暂停顿，面包）vs. bred（嘴角拉平微笑，宽阔）',
            daLine_ar: 'brøʼd (ضم الشفتين للأمام كأنك تقبّل + فرملة صوتية قصيرة في الحلق) مقابل bred (ابتسامة عريضة مع بسط الشفتين)',
            daLine_en: 'brøʼd (lips rounded firmly forward into a kiss + vocal brake / stød) vs. bred (smiling flat lips, wide)',
            daLine_uk: 'brøʼd (губи зібрані трубочкою вперед + голосове гальмо / stød) порівняно з bred (широка посмішка, плоскі губи)',
            daLine_vi: 'brøʼd (chu môi tròn ra trước + tiếng ngắt stød) so với bred (kéo môi cười phẳng)',
            daLine_ur: 'brøʼd (بوسہ دینے کی طرح گول ہونٹ + گلے میں ہلکا جھٹکا / stød) بمقابلہ bred (مسکراہٹ کی طرح کھلے چپٹے ہونٹ)',
            daLine_fa: 'brøʼd (لب‌های غنچه‌ای به جلو + ترمز کوتاه حنجره / stød) در برابر bred (لب‌های کشیده مثل لبخند)',
            daLine_pt: 'brøʼd (lábios num biquinho firme + freio vocal / stød) vs. bred (lábios esticados num sorriso)',
            daLine_es: 'brøʼd (labios en besito firme hacia delante + freno vocal / stød) vs. bred (labios estirados en sonrisa)',
            myLines: {
                en: `<span class="mss-hl-my">bread [bɹɛd]</span> — English has standard vowels and no stød. Danish has 20+ distinct vowel sounds with strict lip positions: round kissy lips (<strong>ø, y</strong>) vs. wide smiling lips (<strong>e, i</strong>), plus the quick throat brake (<strong>stød</strong>) that separates words like <em>hun</em> (she) from <em>hundʼ</em> (dog).`,
                ar: `<span class="mss-hl-my">خبز (khubz)</span> — في العربية توجد 3 حركات أساسية فقط (فتحة، ضمة، كسرة)، ولا توجد حركات تزم فيها الشفتين وتدفعهما بقوة للأمام كأنك تقبّل مثل <strong>ø و y</strong>؛ كما لا توجد فرملة الصوت السريعة (stød) التي توقف الكلمة فجأة في الحلق.`,
                tr: `<span class="mss-hl-my">ekmek (ø findes: ö/ü)</span> — Tyrkisk har ö og ü ligesom dansk ø/y, men intet stød.`,
                uk: `<span class="mss-hl-my">хліб (khlib)</span> — В українській мові є лише 6 чітких голосних (а, о, у, е, и, і), і немає округлених передніх голосних <strong>ø та y</strong> (губи вперед трубочкою без звука «й/ю»), а також немає данського <strong>stød</strong> (короткої зупинки голосу в горлі, яка відрізняє <em>hun</em> [вона] від <em>hundʼ</em> [собака]).`,
                de: `<span class="mss-hl-my">Brot (ø findes: ö/ü)</span> — Tysk har ö/ü ligesom dansk ø/y, men ikke dansk stød.`,
                es: `<span class="mss-hl-my">pan [pan]</span> — El español tiene solo 5 vocales fijas (a, e, i, o, u), todas muy limpias. En danés hay más de 20 sonidos vocálicos, incluyendo vocales delanteras con besito firme (<strong>ø y y</strong>) y el freno rápido en las cuerdas vocales (<strong>stød</strong>) que separa <em>hun</em> (ella) de <em>hundʼ</em> (perro).`,
                vi: `<span class="mss-hl-my">bánh mì</span> — Tiếng Việt dùng 6 thanh điệu để phân biệt nghĩa, còn tiếng Đan Mạch có tiếng ngắt cổ họng (<strong>stød</strong> — rất giống cảm giác ngắt thanh <em>ngã/nặng</em>!) và nguyên âm tròn môi phía trước (<strong>ø, y</strong>) mà người Việt hay đọc nhầm thành <em>ơ, ư</em> hoặc <em>i, ê</em> phẳng.`,
                ur: `<span class="mss-hl-my">روٹی (roti)</span> — اردو میں ای، اے، او، او تو ہیں مگر سامنے زبان رکھ کر ہونٹوں کو آگے گول سکیڑنے والے مصوتے <strong>ø اور y</strong> نہیں ہیں؛ نہ ہی ڈینش کا <strong>stød</strong> (گلے میں آواز کا اچانک بریک، جو <em>hun</em> «وہ» اور <em>hundʼ</em> «کتا» میں فرق کرتا ہے)۔`,
                fa: `<span class="mss-hl-my">نان (nân)</span> — در زبان فارسی فقط ۶ مصوت داریم (اَ، آ، اِ، ای، اُ، او) و صداهای لب‌غنچه‌ای جلویی <strong>ø و y</strong> را نداریم؛ همچنین ترمز سریع حنجره (<strong>stød</strong>) که در دانمارکی کلماتی مثل <em>hun</em> (او) را از <em>hundʼ</em> (سگ) جدا می‌کند در فارسی وجود ندارد.`,
                pt: `<span class="mss-hl-my">pão [pɐ̃w̃]</span> — O português tem vogais nasais ricas (ão, õe), mas não tem vogais anteriores com biquinho firme (<strong>ø e y</strong>), nem o freio rápido nas cordas vocais (<strong>stød</strong>) que separa <em>hun</em> (ela) de <em>hundʼ</em> (cachorro).`,
                zh: `<span class="mss-hl-my">面包 (miànbāo)</span> — 汉语是用<strong>四声声调</strong>（一声到四声）区分意思，没有丹麦语那种“喉咙突然刹车”（stød）；而且汉语普通话缺少像丹麦语 <strong>ø 和 y</strong> 这样把嘴唇用力向前嘟圆的母音。`
            },
            myLines_da: {
                en: `Engelsk skelner ikke med stød (bruger tryk og intonation) og mangler stramt læberundede forvokaler som <strong>ø og y</strong>.`,
                zh: `Kinesisk skelner betydning med <strong>toner</strong> frem for stød, og mangler vokaler med stramt spidsede læber som <strong>ø og y</strong>.`,
                ar: `Arabisk har 3 grundvokaler (a, i, u) og mangler helt runde læbevokaler som <strong>ø og y</strong> samt det danske stød (den hurtige stemmebremse i halsen).`,
                uk: `Ukrainsk har kun 6 rene vokaler og mangler runde kysse-vokaler (<strong>y, ø</strong> – ofte høres i/e eller "ju" i stedet!) samt betydningsadskillende <strong>stød</strong> og vokallængde.`,
                vi: `Vietnamesisk skelner ord med 6 <strong>toner</strong> (thanh ngã/nặng minder faktisk om dansk <strong>stød</strong>!), men mangler spidsede læbevokaler som <strong>y og ø</strong> (erstattes let af flade <em>ư/ơ</em> eller <em>i/e</em>).`,
                ur: `Urdu mangler forrest spidsede kysse-vokaler som <strong>y og ø</strong> (erstattes let af i/e eller u/o) samt det danske <strong>stød</strong> (den korte stemmebremse i struben).`,
                fa: `Farsi (persisk) har 6 vokaler uden rundede fortungevokaler som <strong>y og ø</strong> (erstattes let af i/e eller u/o) og mangler det danske <strong>stød</strong>.`,
                pt: `Portugisisk skelner med næsevokaler ("pão"), men mangler spidsede fortungevokaler som <strong>y og ø</strong> (bliver let til flade i/e eller bagtil u/o) samt det danske <strong>stød</strong>.`,
                es: `Spansk har kun 5 rene vokaler (a, e, i, o, u) og mangler spidsede fortungevokaler som <strong>y og ø</strong> (bliver let til i/e eller u/o) samt det danske <strong>stød</strong>.`
            },
            detailExplain: `<strong>Lille lydforskel:</strong> Den allermindste detalje i munden kan forandre hele ordets betydning — f.eks. om du spidser læberne som til et kys (<em>brød</em>) eller trækker mundvigene til et smil (<em>bred</em>), om lyden holdes kort eller trækkes ud, eller om der er <strong>stød</strong> (et lille stop i stemmen, som et mini-hik: <em>hun</em> vs. <em>hundʼ</em>).`,
            detailExplain_zh: `<strong>微小的发音细节（Lille lydforskel）：</strong>嘴里哪怕只有一丁点动作不同，整个词的意思就彻底变了！比如：嘴唇是像要亲吻一样用力嘟圆（<em>brød</em> 面包），还是嘴角向两边拉开微笑（<em>bred</em> 宽阔）；或者声音有没有<strong>突然被踩了一脚刹车（stød，像轻微打嗝一样短暂停顿）</strong>：<em>hun</em>（她，平顺滑出）vs. <em>hundʼ</em>（狗，有短促刹车）。汉语则是用四个声调的高低升降来区分字词。`,
            detailExplain_ar: `<strong>فارق صوتي دقيق يغير المعنى (Lille lydforskel):</strong> في الدنماركية، حركة صغيرة جداً في شفتيك أو لسانك تقلب معنى الكلمة 180 درجة! على سبيل المثال: هل تزم شفتيك وتدفعهما بقوة للأمام كأنك تقبّل (<em>brød</em> خبز)، أم تبسط شفتيك كأنك تبتسم (<em>bred</em> عريض)؟ وهل تدع الصوت ينساب براحة، أم تضغط فرملة مفاجئة في الحلق مثل شهقة خفيفة سريعة (<strong>stød</strong>)؟ مثل الفرق بين <em>hun</em> (هي - بانسياب) و <em>hundʼ</em> (كلب - مع فرملة صوتية سريعة). في العربية، الفروق تعتمد على الحركات الثلاث والمد بالألف والواو والياء.`,
            detailExplain_en: `<strong>Subtle Sound Shifts (Lille lydforskel):</strong> In Danish, the tiniest mouth gesture flips the entire meaning of a word! English speakers face two key phonetic tools they aren't used to:<br><br>1) <strong>Lip Posture (Kissy Lips vs. Smiles):</strong> Danish strictly distinguishes whether your lips are tightly pushed forward like giving a kiss (<em>brød</em> bread, <em>lys</em> light) or pulled back in a relaxed smile (<em>bred</em> wide, <em>lis</em>). Flattening your lips turns "candle/light" (<em>lys</em>) into a girl's name (<em>Lis</em>)!<br><br>2) <strong>The Danish Stød (The Vocal Brake):</strong> A sudden, gentle brake in your vocal cords — like a mini-hiccup or stepping on the brakes mid-syllable. It differentiates words like <em>hun</em> (she, smooth) from <em>hundʼ</em> (dog, with brake), or <em>bønner</em> (beans) from <em>bønderʼ</em> (farmers). English uses tone and stress, but never cuts vowels with a stød.`,
            detailExplain_uk: `<strong>Тонка різниця у звуках (Lille lydforskel):</strong> У данській мові найменший рух губ або голосу повністю змінює слово! Для українців тут є два головні відкриття:<br><br>1) <strong>Форма губ (трубочка vs. посмішка) — без «ю»!</strong> В українській мові звук у «ю» завжди починається з «й» (<em>люди</em>). У данських словах <em>lys</em> (світло) та <em>ny</em> (новий) такого «й» немає: зафіксуйте язик на «і» й міцно витягніть губи вперед трубочкою. Якщо розслабити губи в посмішку, <em>lys</em> перетвориться на жіноче ім’я <em>Lis</em>!<br><br>2) <strong>Данський stød (голосове гальмо) і довжина голосного:</strong> В українській мові голосні не бувають довгими чи короткими для зміни значення. Данська ж може відрізняти слова короткою зупинкою в горлі (<em>hun</em> — вона [плавно] vs. <em>hundʼ</em> — собака [із зупинкою], <em>bønner</em> — боби vs. <em>bønderʼ</em> — фермери).`,
            detailExplain_vi: `<strong>Khác biệt âm thanh nhỏ (Lille lydforskel):</strong> Chỉ một cử động rất nhỏ của môi hoặc dây thanh quản trong tiếng Đan Mạch cũng đủ làm đổi hẳn nghĩa từ! Đối với người Việt có hai điểm cực kỳ quan trọng:<br><br>1) <strong>Chu tròn môi (Y, Ø) chứ không phải <em>ư, ơ</em>:</strong> Tiếng Việt có <em>ư</em> và <em>ơ</em>, nhưng đều thả lỏng môi phẳng và thụt lưỡi về sau. Âm <strong>y</strong> (<em>lys</em>) và <strong>ø</strong> (<em>brød</em>) của tiếng Đan Mạch đặt lưỡi ở phía trước (như khi nói <em>i/ê</em>) nhưng <strong>phải chu tròn hai môi thật chặt ra trước như đang hôn</strong>! Nếu thả phẳng môi, <em>lys</em> (ánh sáng) sẽ biến thành tên riêng <em>Lis</em>!<br><br>2) <strong>Tiếng ngắt Stød — Người bạn quen thuộc của người Việt:</strong> Trong tiếng Đan Mạch có độ ngắt ngắn ở cổ họng (<em>hun</em> «cô ấy» trơn tru vs. <em>hundʼ</em> «con chó» có ngắt). Cảm giác siết nhẹ thanh quản này gần giống thanh <em>ngã</em> hoặc <em>nặng</em> trong tiếng Việt — một lợi thế lớn cho bạn!`,
            detailExplain_ur: `<strong>آواز کا باریک فرق (Lille lydforskel):</strong> ڈینش میں ہونٹوں یا آواز کی ایک چھوٹی سی حرکت پورا مطلب بدل دیتی ہے! اردو بولنے والوں کے لیے دو اہم باتیں:<br><br>1) <strong>گول ہونٹ بمقابلہ مسکراہٹ (Y, Ø vs. I, E):</strong> اردو میں <em>ی</em> اور <em>ے</em> بولتے وقت ہونٹ سیدھے رہتے ہیں۔ ڈینش <strong>y</strong> (<em>lys</em>) اور <strong>ø</strong> (<em>brød</em>) میں زبان تو آگے «ای/اے» پر رہتی ہے مگر ہونٹوں کو آگے سے چھوٹے گول دائرے میں سکیڑنا ضروری ہے! ہونٹ ڈھیلے چھوڑ دیں تو <em>lys</em> (روشنی) کی جگہ لڑکی کا نام <em>Lis</em> بن جاتا ہے!<br><br>2) <strong>ڈینش Stød (گلے کی ہلکی سی بریک):</strong> لفظ کے درمیان گلے میں ہلکا سا جھٹکا یا بریک، جو <em>hun</em> (وہ، رواں) کو <em>hundʼ</em> (کتا، جھٹکے کے ساتھ) سے الگ کرتا ہے۔ اردو میں اس کی جگہ زیر، زبر، پیش اور کھینچ کر بولنے سے فرق ہوتا ہے۔`,
            detailExplain_fa: `<strong>تفاوت ظریف آوایی (Lille lydforskel):</strong> در دانمارکی کوچک‌ترین حرکت لب یا حنجره معنی کل کلمه را عوض می‌کند! دو نکته کلیدی برای فارسی‌زبانان:<br><br>۱) <strong>لب غنچه‌ای در برابر لبخند (Y, Ø در برابر I, E):</strong> در فارسی هنگام گفتن «ای» و «اِ» لب‌ها صاف و کشیده‌اند. در صدای دانمارکی <strong>y</strong> (<em>lys</em>) و <strong>ø</strong> (<em>brød</em>) زبان جلو در جای «ای/اِ» می‌ماند، اما لب‌ها باید مثل غنچه به جلو جمع شوند! اگر لب‌ها را صاف نگه دارید، کلمه <em>lys</em> (نور) به اسم <em>Lis</em> تبدیل می‌شود!<br><br>۲) <strong>ترمز صوتی دانمارکی (Stød):</strong> یک مکث بسیار ظریف و ناگهانی در تارهای صوتی (مثل سکسکه خیلی کوچک)، که کلمه <em>hun</em> (او، روان) را از <em>hundʼ</em> (سگ، با ترمز) جدا می‌کند.`,
            detailExplain_pt: `<strong>Diferença sutil de som (Lille lydforskel):</strong> Um pequeno detalhe na boca muda completamente a palavra! Dois segredos essenciais para quem fala português:<br><br>1) <strong>Biquinho firme vs. Sorriso (Y, Ø vs. I, E):</strong> Em português temos «i» e «ê» planos e muitas vogais nasais (<em>pão, mãe</em>), mas não temos vogais frontais com biquinho como <strong>y</strong> (<em>lys</em>) e <strong>ø</strong> (<em>brød</em>). Deixe a língua na posição de i/ê, mas projete os lábios num biquinho firme para a frente! Se relaxar os lábios, <em>lys</em> (luz) vira o nome feminino <em>Lis</em>!<br><br>2) <strong>O Stød dinamarquês (freio vocal):</strong> Uma leve travada rápida nas cordas vocais que diferencia palavras como <em>hun</em> (ela, suave) de <em>hundʼ</em> (cachorro, com travada).`,
            detailExplain_es: `<strong>Pequeña diferencia de sonido (Lille lydforskel):</strong> ¡El más mínimo ajuste en la boca cambia por completo la palabra! Dos claves esenciales para hispanohablantes:<br><br>1) <strong>Labios en besito vs. Sonrisa (Y, Ø vs. I, E):</strong> El español solo usa 5 vocales (<em>a, e, i, o, u</em>) sin redondear la «i» ni la «e». En <strong>y</strong> (<em>lys</em>) y <strong>ø</strong> (<em>brød</em>), deja la lengua en la posición de «i» o «e» pero empuja los labios hacia delante como dando un besito firme. Si los relajas en sonrisa, <em>lys</em> (luz) suena como el nombre <em>Lis</em>!<br><br>2) <strong>El Stød danés (freno vocal):</strong> Un corte breve y suave en la garganta que distingue pares como <em>hun</em> (ella, suave) de <em>hundʼ</em> (perro, con freno).`,
            morePairs: [
                { da: 'lys (spidsede læber som til et kys) vs. lis (smilende flade læber)', note: 'Kun læbernes form adskiller ordet "lys" fra pigenavnet "Lis".', note_zh: '仅靠嘴唇是嘟圆还是展平，就能区分“光”和一个女孩的名字。', note_ar: 'مجرد ضم الشفتين للأمام أو بسطهما يفرق بين كلمة "ضوء" (lys) واسم الفتاة "Lis".', note_en: 'Only the shape of your lips separates the word "light" (lys) from the girl\'s name "Lis".', note_uk: 'Лише форма губ (трубочка чи посмішка) відрізняє «світло» (lys) від імені «Ліс» (Lis) — і без жодного «й» перед голосним!', note_vi: 'Chỉ riêng việc chu tròn môi hay kéo môi phẳng đã phân biệt «ánh sáng» (lys) với tên riêng «Lis» (không dùng âm ư)!', note_ur: 'صرف ہونٹوں کو آگے گول کرنے یا چپٹا رکھنے سے «روشنی» (lys) اور نام «Lis» میں فرق ہو جاتا ہے!', note_fa: 'فقط گرد کردن یا کشیدن لب‌ها تفاوت بین «نور» (lys) و اسم «Lis» را می‌سازد!', note_pt: 'Apenas o formato dos lábios (biquinho vs. sorriso) separa «luz» (lys) do nome «Lis»!', note_es: '¡Solo la forma de los labios (besito vs. sonrisa) separa «luz» (lys) del nombre «Lis»!' },
                { da: 'måler (uden stød) vs. målʼer (med stød)', note: 'Det lille stop i stemmen (stødet) kan skelne mellem ord og bøjninger.', note_zh: '喉咙里那个短促的小刹车（stød），是丹麦语区分单复数和词性的神奇小开关。', note_ar: 'فرملة الصوت السريعة في الحلق (stød) هي مفتاح سحري في الدنماركية للتفريق بين الكلمات المفردة والجمع والمشتقات.', note_en: 'The quick vocal brake (stød) acts as an essential switch between word forms and meanings.', note_uk: 'Коротка зупинка голосу в горлі (stød) розрізняє форми слів (наприклад, <em>hun</em> «вона» і <em>hundʼ</em> «собака»).', note_vi: 'Tiếng ngắt cổ họng (stød) giống thanh ngã/nặng giúp phân biệt từ loại và nghĩa trong tiếng Đan Mạch (vd. hun vs. hundʼ).', note_ur: 'گلے میں ہلکی سی آواز کی بریک (stød) ڈینش میں الفاظ اور صیغوں میں فرق کرنے کا اہم بٹن ہے (جیسے hun بمقابلہ hundʼ)۔', note_fa: 'مکث کوتاه صدا در گلو (stød) مثل یک کلید دقیق معنی و شکل کلمات را در دانمارکی از هم جدا می‌کند (مثلاً hun در برابر hundʼ).', note_pt: 'A travada rápida na garganta (stød) funciona como uma chave que diferencia palavras e formas gramaticais (ex.: hun vs. hundʼ).', note_es: 'El freno rápido en la garganta (stød) funciona como interruptor entre palabras y formas gramaticales (ej.: hun vs. hundʼ).' }
            ],
            links: [
                { label: '🎵 Leg med vokaler', label_zh: '🎵 趣味元音辨析 (Leg med vokaler)', label_ar: '🎵 تمييز حركات الفم والأصوات (Leg med vokaler)', label_en: '🎵 Play with vowels (Leg med vokaler)', label_uk: '🎵 Гра з голосними (Leg med vokaler)', label_vi: '🎵 Luyện tập nguyên âm (Leg med vokaler)', label_ur: '🎵 مصوتوں کی مشق (Leg med vokaler)', label_fa: '🎵 تمرین مصوت‌ها (Leg med vokaler)', label_pt: '🎵 Praticar vogais (Leg med vokaler)', label_es: '🎵 Practicar vocales (Leg med vokaler)', route: 'leg_med_vokaler' },
                { label: '⚡ Det danske stød', label_zh: '⚡ 丹麦语发音小停顿 (Det danske stød)', label_ar: '⚡ فرملة الصوت السريعة الدنماركية (Det danske stød)', label_en: '⚡ The Danish Stød (Det danske stød)', label_uk: '⚡ Данське голосове гальмо (Det danske stød)', label_vi: '⚡ Luyện âm ngắt Stød (Det danske stød)', label_ur: '⚡ ڈینش بریک stød کی مشق (Det danske stød)', label_fa: '⚡ تمرین ترمز صوتی stød (Det danske stød)', label_pt: '⚡ O stød dinamarquês (Det danske stød)', label_es: '⚡ El stød danés (Det danske stød)', route: 'det_danske_stoed' }
            ]
        },
        {
            num: 2,
            title: 'Sproglyden',
            title_zh: '具体的发音动作 (Sproglyden)',
            title_ar: 'حركة الفم ومخرج الصوت (Sproglyden)',
            title_en: 'Mouth Position & Sound Physics (Sproglyden)',
            title_uk: 'Артикуляція та складні звуки (Sproglyden)',
            title_vi: 'Khẩu hình & 5 âm khó cho người Việt (Sproglyden)',
            title_ur: 'منہ کی ساخت اور 5 اہم آوازیں (Sproglyden)',
            title_fa: 'وضعیت دهان و ۵ چالش اصلی تلفظ برای فارسی‌زبانان (Sproglyden)',
            title_pt: 'Posição da boca e os 5 sons mais difíceis (Sproglyden)',
            title_es: 'Posición de la boca y los 5 sonidos más difíciles (Sproglyden)',
            subtitle: 'Hvor tungen er og hvordan luften slipper ud (blødt d, pust på P/T/K, svælg-r og ng)',
            subtitle_zh: '舌头具体放在哪、空气从哪边溜出（如擦眼镜哈气发软 d，以及 L 与 N 的区别）',
            subtitle_ar: 'أين يرتاح اللسان وكيف يهرب الهواء (مثل حرف d الناعم وحرف r من قاع الحلق)',
            subtitle_en: 'Where the tongue rests and how air escapes: soft d (breath on glasses) & the deep throat r',
            subtitle_uk: '5 головних пасток для українців: м’яке d, придихові P/T/K, горлове R, округлені Y/Ø та носове NG',
            subtitle_vi: '5 thử thách phát âm lớn nhất: Âm cuối & cụm phụ âm (-s, -st, sk-), D mềm, P/T/K bật hơi, R họng & Y/Ø',
            subtitle_ur: 'اردو بولنے والوں کے 5 چیلنج: نرم d • پھ/تھ/کھ جیسی ہوا (P/T/K) • گلے کا R • گول Y/Ø • اور دانتوں والا V و sk-/sp-',
            subtitle_fa: '۵ چالش بزرگ فارسی‌زبانان: d نرم (ها روی عینک) • پُف P/T/K • R حلقی (غ) • لب غنچه‌ای Y/Ø • و sk-/sp- بدون «اِ-»',
            subtitle_pt: '5 desafios principais: d suave • sopro em P/T/K • R na garganta & H ativo • Y/Ø • sk-/sp- sem «es-» e L/S finais',
            subtitle_es: '5 retos clave: d suave • soplo en P/T/K • Y/Ø & H sonora • R de garganta & V (no = B) • sk-/sp- sin «es-»',
            color: '#60a5fa',
            widthPct: 44,
            daLine: `brø<span class="mss-hl-da">d</span> — Tungespidsen hviler fladt mod undertænderne (ånde på brillerne)`,
            daLine_zh: 'brød（舌尖平平贴在下门牙背面，像擦眼镜轻轻哈气一样发出软 d 音）',
            daLine_ar: 'brød (اللسان يرتاح مسطحاً خلف الأسنان السفلية مع إخراج هواء دافئ مثل مسح نظاراتك)',
            daLine_en: 'brød (tongue rests flat against bottom teeth — breathing on glasses) vs. dag (hard d tapping front teeth)',
            daLine_uk: 'brød (язик рівно лежить за нижніми зубами — тепле дихання на окуляри, НЕ українське тверде [д]!)',
            daLine_vi: 'brød (đầu lưỡi nằm phẳng sau răng dưới — hà hơi lau kính, KHÔNG bỏ mất âm cuối và không đọc cứng!)',
            daLine_ur: 'brød (زبان نیچے کے دانتوں کے پیچھے چپٹی — عینک پر بھاپ دینے کی طرح، سخت اردو د/ڈ نہیں!)',
            daLine_fa: 'brød (نوک زبان پشت دندان‌های پایین صاف است — مثل ها کردن روی عینک، نه دال سفت فارسی!)',
            daLine_pt: 'brød (língua plana atrás dos dentes de baixo — baforar nos óculos, NUNCA [d] duro nem [dʒ]!)',
            daLine_es: 'brød (lengua plana tras los dientes de abajo — vaho en gafas, distinta de «cada» y sin [d] dura)',
            myLines: {
                en: `brea<span class="mss-hl-my">d [d]</span> — English has a hard d at the end of "bread", and uses the tongue between the teeth for "the/weather" [ð]. Danish soft d (<strong>blødt d</strong>) is completely different: never stick your tongue out! Keep it flat behind your lower front teeth and blow warm air like misting a pair of glasses (<em>brø...d, ma...d</em>). And Danish <strong>r</strong> comes deep from the throat like a crow’s call (<em>rød, ris</em>) — never curling the tip of the tongue!`,
                ar: `<span class="mss-hl-my">خبز</span> — في الدنماركية حرف <strong>d الناعم</strong> ليس حرف الذال (ذ) ولا يخرج بين الأسنان أبداً! دعه يرتاح مسطحاً خلف الأسنان السفلية واخرج هواءً دافئاً كأنك تمسح نظاراتك. وحرف <strong>r الدنماركي</strong> يخرج عميقاً من قاع الحلق مثل صوت الغراب (قاع الحلق كالغين) وليس بدحرجة طرف اللسان كالراء العربية.`,
                tr: `ekmek — Tyrkisk udtaler altid d som fast [d]; det bløde danske d skal trænes særskilt.`,
                uk: `<span class="mss-hl-my">хліб [д] • п/т/к без видиху • р кінчиком язика</span> — Українські приголосні створюють 5 типових пасток у данській: <strong>1) М’яке d (brød, mad):</strong> не тверде «д» і не англ. «th», а теплий видих із язиком за нижніми зубами; <strong>2) P, T, K:</strong> українські п, т, к звучать без поштовху повітря, тому данці чують <em>b, d, g</em> (kaffe → gaffe!); <strong>3) Горлове R (rød):</strong> глибоко в горлі без вібрації кінчика язика «р»; <strong>4) Y та Ø:</strong> губи трубочкою без «й/ю»; <strong>5) Легке H (без «х») і чисте носове NG (без «г/к» у кінці)</strong>.`,
                de: `Bro<span class="mss-hl-my">t [t]</span> — Tysk gør d hårdt i slutningen af ord i stedet for blødt.`,
                es: `pare<span class="mss-hl-my">d [ð]</span> • P/T/K sin aire • «eskole» — 5 puntos clave para hispanohablantes: <strong>1) d suave (brød, mad):</strong> aunque el español tiene [ð] en <em>cada</em>, en danés la lengua descansa abajo detrás de los dientes inferiores echando vaho tibio; <strong>2) P, T, K:</strong> ¡suelta aire fuerte (prueba del papel), si no el danés escucha B, D, G!; <strong>3) Y/Ø con besito y H sonora</strong> (nunca muda como en <em>hola</em>!); <strong>4) R de garganta</strong> (nunca vibrante como <em>perro</em>) y <strong>V con dientes</strong> (nunca igual que B en <em>vaca=baca</em>!); <strong>5) sk-/sp- sin «e-» (*eskole)!</strong>`,
                vi: `<span class="mss-hl-my">bánh mì</span> — 5 thử thách phát âm lớn nhất cho người Việt: <strong>1) Âm cuối & cụm phụ âm:</strong> không làm rơi <em>-s, -t, -st, -ld</em> (<em>fest</em> ≠ <em>fe</em>, <em>lys</em> ≠ <em>ly</em>) và không chèn âm «ơ» vào <em>sp-, sk-</em>; <strong>2) D mềm (brød, mad):</strong> hà hơi nhẹ qua răng dưới (không bỏ mất!); <strong>3) P, T, K bật hơi:</strong> phải thổi mạnh hơn <em>b, d, g</em>; <strong>4) R cuống họng:</strong> sâu trong họng, không phải [z] hay R uốn lưỡi; <strong>5) Y & Ø chu môi tròn</strong> (không đọc thành <em>ư, ơ</em>!).`,
                ur: `<span class="mss-hl-my">روٹی [ڈ/د] • پ/ت/ک بمقابلہ پھ/تھ/کھ • ر/ڑ</span> — اردو بولنے والوں کے لیے 5 اہم نکتے: <strong>1) نرم d (mad, brød):</strong> زبان کو نہ د (دانت) سے ٹکرائیں اور نہ ڈ کی طرح پیچھے موڑیں — نیچے کے دانتوں کے پیچھے رکھ کر گرم سانس چھوڑیں! <strong>2) P, T, K:</strong> ہمیشہ اردو <em>پھ، تھ، کھ</em> کی طرح ہوا کے ساتھ بولیں ورنہ ڈینش لوگ <em>B, D, G</em> سنیں گے (اور ٹ کی طرح زبان پیچھے نہ موڑیں)! <strong>3) گلے کا R:</strong> اردو ر/ڑ کے بجائے گلے سے <em>غ</em> کے قریب نکالیں۔ <strong>4) Y اور Ø:</strong> ہونٹ آگے گول سکیڑیں۔ <strong>5) V (دانت نچلے ہونٹ پر، «و» نہیں)</strong> اور <em>skole/spiser</em> کے شروع میں «اِ» مت لگائیں!`,
                fa: `<span class="mss-hl-my">نان [د] • ر نوک‌زبانی • «اِسکولِه»</span> — ۵ نکته کلیدی برای فارسی‌زبانان: <strong>۱) d نرم (brød, mad):</strong> مثل «د» یا «ز» نیست — زبان را پشت دندان‌های پایین بخوابانید و نفس گرم بدهید؛ <strong>۲) P, T, K:</strong> با پُف قوی هوا، وگرنه دانمارکی‌ها B, D, G می‌شنوند؛ <strong>۳) R حلقی:</strong> از عمق گلو مثل یک <em>غ</em> ملایم (نه ر لرزان فارسی!)؛ <strong>۴) Y و Ø غنچه‌ای</strong>؛ <strong>۵) V (دندان روی لب) و sk-/sp- بدون گذاشتن «اِ-» اول کلمه</strong> (*eskole غلط است)!`,
                pt: `<span class="mss-hl-my">pão [d] • R como [h] • «eskole»</span> — 5 pontos-chave para falantes de português: <strong>1) d suave (brød, mad):</strong> não bata a língua em cima nem faça «dj» (<em>dia</em>) — deite a língua atrás dos dentes de baixo e bafore nos óculos; <strong>2) P, T, K:</strong> solte ar forte (teste do papel), senão o dinamarquês ouve B, D, G; <strong>3) R fundo na garganta (rød) + H soprado (hej)</strong> — ao contrário do português em que H é mudo (<em>hoje</em>); <strong>4) Y e Ø de biquinho</strong>; <strong>5) sk-/sp- SEM «es-» (*eskole), L final firme (não virar U em *sou) e S limpo (não *sh)!</strong>`,
                zh: `<span class="mss-hl-my">面包 (miànbāo)</span> — 汉语没有丹麦语特有的软 d（就像擦眼镜轻轻哈一口热气，舌头平躺在下牙背，千万别碰上颚！）。此外，发 <strong>L</strong> 时舌尖顶住上牙后但两边嘴角漏风；发 <strong>N</strong> 时嘴巴彻底关门，所有空气全从鼻孔挤出来！`
            },
            myLines_da: {
                en: `Engelsktalende bruger ofte hårdt d i udlyd (som i "bread") eller stikker tungen mellem tænderne som i "weather". Dansk blødt d laves med tungen fladt mod undertænderne (ånde på brillerne). Dansk r laves i svælget frem for med krøllet tungespids.`,
                zh: `Kinesisk mangler blødt d (ånde på brillerne), og har en stor udfordring med at skelne <strong>L</strong> (mundvigeluft) og <strong>N</strong> (næseluft).`,
                ar: `Arabisk ذ (dhāl) laves mellem tænderne, men dansk blødt d laves ved at ånde lunt på brillerne med tungen mod undertænderne. Dansk r er dybt i halsen (som en krages kraa eller غ) modsat arabisk tungespids-r.`,
                uk: `Ukrainere har især 5 lyd-udfordringer på dansk: <strong>1) Blødt d</strong> (ukrainsk har kun hårdt [д]); <strong>2) Uaspirerede п, т, к</strong> (danskere hører pære/tale/kaffe som bære/dale/gaffe uden pust!); <strong>3) Svælg-r</strong> (modsat ukrainsk rullet [р]); <strong>4) Runde Y/Ø uden j-forslag ("ю")</strong>; <strong>5) Let h (ikke skrabende х) & rent ng uden -g/-k til sidst</strong>.`,
                vi: `Vietnamesere har især 5 lyd-udfordringer på dansk: <strong>1) Slutkonsonanter & klynger</strong> (vietnamesisk mangler <em>-s, -t, -st, -ld</em> og <em>sp-/sk-</em>, så endelser falder let væk!); <strong>2) Blødt d</strong> (falder let ud eller bliver hårdt t/đ); <strong>3) Pust på P, T, K</strong> (vietnamesisk t/k mangler pust); <strong>4) Svælg-r</strong> (ikke nordvietnamesisk [z] eller sydvietnamesisk tungespids-r); <strong>5) Runde Y/Ø</strong> (ikke flade <em>ư/ơ</em>).`,
                ur: `Urdutalende har især 5 lyd-udfordringer på dansk: <strong>1) Blødt d</strong> (ikke urdu د eller retrofleks ڈ); <strong>2) Pust på P, T, K</strong> (skal lyde som urdu پھ/تھ/کھ – ikke upustede پ/ت/ک eller retrofleks ٹ!); <strong>3) Svælg-r</strong> (tæt på غ, ikke tungespids-ر/ڑ); <strong>4) Runde forvokaler Y/Ø</strong>; <strong>5) V med tænder mod underlæbe (ikke urdu و) samt sk-/sp- uden indsat "i-"</strong>.`,
                fa: `Farsi-talende har især 5 lyd-udfordringer på dansk: <strong>1) Blødt d</strong> (persisk har kun hårdt د); <strong>2) Tydeligt pust på P, T, K</strong> mod ustemte B, D, G; <strong>3) Svælg-r</strong> (dybt som persisk غ frem for tungespids-ر!); <strong>4) Runde forvokaler Y/Ø</strong>; <strong>5) V (tænder mod underlæbe) samt sk-/sp-/st- UDEN hjælpevokalen "e-" foran ("eskole")</strong>.`,
                pt: `Portugisisktalende har især 5 lyd-udfordringer på dansk: <strong>1) Blødt d</strong> (ikke hårdt d eller brasiliansk "dj"); <strong>2) Pust på P, T, K</strong> (portugisisk mangler pust og "ti" må ikke blive "tchi"!); <strong>3) Svælg-r vs. aktivt h</strong> (aldrig stumt h som i "hoje" eller brasiliansk [h] for r); <strong>4) Runde Y/Ø</strong>; <strong>5) sk-/sp- uden "es-" (*eskole), rent slut-L (ikke [w]) & rent slut-S (ikke [ʃ])</strong>.`,
                es: `Spansktalende har især 5 lyd-udfordringer på dansk: <strong>1) Blødt d</strong> (tungespids bag undertænderne, ikke oppe på fortænderne som spansk "cada"); <strong>2) Pust på P, T, K</strong> (spansk p/t/k har nul pust og lyder som danske b/d/g!); <strong>3) Y/Ø med kyssemund & aktivt H</strong> (aldrig stumt som "hola" og aldrig krads [x]); <strong>4) Svælg-r</strong> (ikke rullet [r]) & <strong>V mod underlæben</strong> (spansk skelner ikke V/B i "vaca/baca"); <strong>5) sk-/sp-/st- uden "es-" (*eskole)</strong>.`
            },
            detailExplain: `<strong>Sproglyden:</strong> Selve den fysiske bevægelse, du laver med tunge, læber og luft. På dansk skifter bogstaver ofte fuldstændig lyd alt efter, om de står forrest eller bagest i ordet: f.eks. et hårdt, hurtigt <em>d</em> i <strong>d</strong>ag, men et blødt <em>d</em> i brø<strong>d</strong> (hvor du blot ånder lunt ud som på dine briller, mens tungespidsen hviler fladt bag undertænderne). Og husk kragelyden: Dansk <strong>r</strong> laves helt nede bagerst i halsen – som når en krage skriger <em>kraa</em>!`,
            detailExplain_zh: `<strong>具体的发音动作（Sproglyden）：</strong>就是舌头、嘴唇和气流的具体位置。在丹麦语里，同一个字母在词头和词尾完全是两码事：例如字母 <strong>d</strong> 在词首是舌尖轻弹的硬 d（<strong>d</strong>ag），但在词尾则是特有的<strong>软 d</strong>（brø<strong>d</strong> / ma<strong>d</strong>）——“就像你在擦眼镜前对着镜片轻轻哈一口气一样，舌尖平平贴在下门牙背面，让温暖气流懒洋洋滑出，千万别碰天花板！”再如 <strong>L 与 N</strong>：发 L 时舌尖在门牙后、空气从两边嘴角溜走（<em>læse</em>）；发 N 时嘴巴紧闭、全靠鼻腔哼出来（<em>næse</em>）！`,
            detailExplain_ar: `<strong>حركة الفم ومخرج الصوت (Sproglyden):</strong> الموضع الدقيق للسان والشفتين وطريقة خروج الهواء. في الدنماركية، الحرف نفسه يتغير صوته تماماً حسب مكانه في الكلمة:<br><br>
1) <strong>حرف d الناعم (Blødt d):</strong> أكبر فخ للناطقين بالعربية هو نطقه مثل الذال (ذ) بإخراج اللسان بين الأسنان! الطريقة الصحيحة: افعل تماماً كما تفعل عندما تنفخ هواءً دافئاً على عدسات نظاراتك لتنظيفها، مع ترك طرف اللسان مسترخياً ومسطحاً خلف الأسنان السفلية، ودع الهواء ينساب بكسل: <em>ma...d</em>، <em>brø...d</em> دون أن يلمس سقف الحلق إطلاقاً!<br><br>
2) <strong>حرف r الدنماركي:</strong> لا يُنطق بدحرجة طرف اللسان كالراء العربية (ر)، بل يخرج من قاع الحلق كصوت غراب ينادي "كراا"، وهو قريب جداً من مخرج حرف الغين (غ) في كلمة "غراب".<br><br>
3) <strong>الفرق بين P و B:</strong> حرف P الدنماركي يخرج مع انفجار قوي للهواء يحرك ورقة أمام فمك (<em>pære</em> كمثرى)، بينما B هادئ وناعم (<em>bære</em> يحمل).`,
            detailExplain_en: `<strong>Mouth Position & Sound Physics (Sproglyden):</strong> The exact placement of your tongue, lips, and airflow. In Danish, letters change their physical sound completely depending on where they sit in a word:<br><br>1) <strong>The Soft d (Det bløde d):</strong> The #1 trap for English speakers! Many either pronounce it as a hard d (like in English "bread") or stick their tongue between their teeth like in English "the" or "weather". Don’t do either! Keep your tongue tip resting flat and relaxed against the back of your bottom front teeth. Let warm air glide lazily over the tongue without touching the roof of your mouth: <em>ma...d</em>, <em>brø...d</em>. Do exactly what you do when blowing warm breath onto your glasses before wiping them clean!<br><br>2) <strong>The Danish Throat r:</strong> English r curls the tip of the tongue backwards without touching the palate. Danish r is produced deep in the back of your throat, like a crow calling "kraa" (similar to a French or German gargled r: <em>rød, ris</em>). At the end of words (<em>mor, lærer</em>), the consonant vanishes into an open, relaxed vowel.<br><br>3) <strong>The Paper Test (P vs. B):</strong> Hold a sheet of paper before your lips: when saying Danish <em>pære</em>, a sharp burst of air blows the paper forward; with <em>bære</em>, the paper stays calm.`,
            detailExplain_uk: `<strong>Артикуляція та 5 найскладніших звуків для українців (Sproglyden):</strong> Точне положення язика, губ і повітряного потоку. У данській мові одна й та сама літера звучить зовсім по-різному залежно від місця у слові:<br><br>
1) <strong>М’яке d (Det bløde d — mad, brød):</strong> Українці часто кажуть тверде [д] наприкінці слів або англійське міжзубне [th]. Секрет данського м’якого d: <strong>язик розслаблено лежить ЗА нижніми зубами</strong>, а ви просто тепло видихаєте поверх нього, ніби грієте скельця окулярів!<br><br>
2) <strong>Сильний видих у P, T, K проти B, D, G (Тест із папірцем):</strong> В українській мові <em>п, т, к</em> вимовляються без пориву повітря. Для данців українське <em>kaffe</em> без видиху звучить як <em>gaffe</em>, а <em>pære</em> як <em>bære</em>! Піднесіть папірець до рота: на <strong>p, t, k</strong> папір має помітно відхилятися!<br><br>
3) <strong>Данське горлове R (проти вібрації «р»):</strong> Не вібруйте кінчиком язика! Звук <em>rød, ris</em> народжується глибоко в горлі (схоже на м’яке українське горлове «г» без участі кінчика язика), а в кінці слова (<em>mor, spiser</em>) взагалі розчиняється у плавному голосному.<br><br>
4) <strong>Губи трубочкою Y та Ø (без «й/ю»):</strong> Тримайте язик спереду на «і»/«е», але губи витягніть вперед у щільний овал: <em>lys</em> (світло) ≠ <em>Lis</em>, <em>ny</em> (новий) ≠ <em>ni</em>.<br><br>
5) <strong>Легке H (не тверде «х») і чисте носове NG (без «г/к» у кінці):</strong> У словах <em>hej, hus</em> — лише теплий вільний видих (без тертя українського «х»), а в словах <em>lang, seng</em> звук плавно завмирає в носі — ніколи не додавайте в кінці тверде [г] чи [к]!`,
            detailExplain_vi: `<strong>Khẩu hình & 5 thử thách phát âm lớn nhất cho người Việt (Sproglyden):</strong><br><br>
1) <strong>Âm cuối & cụm phụ âm (<em>-s, -t, -st, -ld, sp-, sk-</em>):</strong> Tiếng Việt chỉ có vài âm cuối đóng kín (-p, -t, -c, -m, -n, -ng) và không bao giờ có cụm phụ âm như <em>fest, kold, lys</em> hay <em>skole</em>! Người Việt hay nuốt mất âm cuối (<em>lys</em> thành <em>ly</em>, <em>fest</em> thành <em>fe</em>) hoặc chèn âm «ơ» vào đầu từ (<em>spise</em> thành *sơ-pise). Hãy giữ gió -s và đọc liền mạch!<br><br>
2) <strong>Âm D mềm (<em>mad, brød, gade</em>):</strong> Không phải âm «đ» cứng và tuyệt đối không bỏ qua! Hãy đặt đầu lưỡi nằm phẳng sau hàm răng dưới rồi thổi một làn hơi ấm nhẹ như khi lau kính.<br><br>
3) <strong>Bật hơi mạnh ở P, T, K (Bài test tờ giấy):</strong> Chữ <em>t</em> và <em>k</em> tiếng Việt không bật hơi (chỉ <em>th</em> mới bật hơi). Trong tiếng Đan Mạch, <em>p, t, k</em> đầu từ phải thổi bay tờ giấy (<em>pære, tale, kaffe</em>), nếu không người Đan Mạch sẽ nghe nhầm thành <em>bære, dale, gaffe</em>!<br><br>
4) <strong>Âm R từ cuống họng (<em>rød, ris</em>):</strong> Không đọc giống chữ «z» (kiểu miền Bắc) và không uốn đầu lưỡi (kiểu miền Nam) — hãy tạo độ rung sâu ở cuống họng, còn <em>r</em> ở cuối từ (<em>mor, spiser</em>) thì thả mở nhẹ nhàng.<br><br>
5) <strong>Y & Ø chu môi tròn:</strong> Đừng thụt lưỡi ra sau thành <em>ư/ơ</em> và đừng kéo môi thành <em>i/e</em> — hãy chu môi thật tròn về phía trước!`,
            detailExplain_ur: `<strong>منہ کی پوزیشن اور اردو بولنے والوں کے 5 بڑے صوتی چیلنج (Sproglyden):</strong><br><br>
1) <strong>نرم d (<em>mad, brød, gade</em>):</strong> اردو کے سخت <strong>د</strong> یا پیچھے مڑے ہوئے <strong>ڈ</strong> سے بچیں! زبان کی نوک نیچے کے سامنے والے دانتوں کے پیچھے چپٹی رکھیں اور اوپر سے گرم ہوا نکالیں گویا عینک صاف کر رہے ہوں۔<br><br>
2) <strong>پھ، تھ، کھ جیسا تیز ہوا کا جھونکا (P, T, K بمقابلہ B, D, G):</strong> اردو میں <em>پ، ت، ک</em> اور <em>پھ، تھ، کھ</em> الگ ہیں۔ ڈینش میں لفظ کے شروع کے <strong>p, t, k</strong> ہمیشہ <strong>پھ، تھ، کھ</strong> کی طرح تیز ہوا سے بولے جاتے ہیں (<em>pære, tale, kaffe</em>)، ورنہ ڈینش کان انہیں <em>bære, dale, gade</em> سنتے ہیں! نیز <strong>T</strong> دانتوں کے پاس سے بولیں، <strong>ٹ</strong> کی طرح زبان پیچھے نہ موڑیں۔<br><br>
3) <strong>ڈینش گلے والا R (اردو ر/ڑ کے برعکس):</strong> شروع میں <em>rød, ris</em> گلے کی گہرائی (اردو <strong>غ</strong> کے قریب) سے بولیں، اور آخر میں (<em>mor, spiser</em>) ر کی آواز بالکل گھل جاتی ہے۔<br><br>
4) <strong>گول ہونٹوں والے Y اور Ø:</strong> زبان کو آگے «ای/اے» پر رکھ کر ہونٹوں کو آگے چھوٹے دائرے میں سکیڑیں (<em>lys ≠ Lis</em>)۔<br><br>
5) <strong>دانتوں والا V (اردو «و» نہیں) اور sk-/sp- بغیر «اِ» لگائے:</strong> <em>vand, vinter</em> میں اوپر کے دانت نچلے ہونٹ پر لگائیں (دونوں ہونٹ گول «و» کی طرح نہیں)، اور <em>skole, spiser</em> کے شروع میں «اِ» مت جوڑیں (<em>sss-kole</em> بولیں، *iskole نہیں)!`,
            detailExplain_fa: `<strong>وضعیت دهان و ۵ چالش اصلی تلفظ برای فارسی‌زبانان (Sproglyden):</strong><br><br>
۱) <strong>حرف d نرم (<em>mad, brød, gade</em>):</strong> هرگز آن را مثل «د» سفت یا «ز» نگویید! نوک زبان را پشت دندان‌های پایین بخوابانید و نفس گرم بدهید مثل «ها» کردن روی عینک.<br><br>
۲) <strong>فشار هوای قوی در P, T, K در برابر B, D, G (آزمایش کاغذ):</strong> اول کلمات با <strong>p, t, k</strong> (<em>pære, tale, kaffe</em>) هوا را محکم بیرون بدهید تا برگه کاغذ تکان بخورد، وگرنه دانمارکی‌ها آن را <em>bære, dale, gade</em> می‌شنوند!<br><br>
۳) <strong>R حلقی (شبیه حرف «غ» فارسی — هرگز ر نوک‌زبانی نگویید!):</strong> در دانمارکی <em>rød, ris</em> از ته گلو (مثل غِ ملایم) ساخته می‌شود و در آخر کلمه (<em>mor, spiser</em>) اصلاً «ر» تلفظ نمی‌شود.<br><br>
۴) <strong>لب غنچه‌ای برای Y و Ø:</strong> زبان در جای «ای/اِ»، لب‌ها گردِ جلو (<em>lys ≠ Lis</em>) — نه مثل اُ/او و نه صاف!<br><br>
۵) <strong>بدون «اِ-» اولِ sk-/sp-/st- و دندان روی لب در V:</strong> فارسی‌زبانان اغلب قبل از <em>skole, spiser</em> یک «اِ» اضافه می‌کنند (<em>*eskole</em>)! با «سسس-» شروع کنید (<em>sss-kole</em>)، و در <em>vand, hvad</em> دندان بالا را روی لب پایین بگذارید.`,
            detailExplain_pt: `<strong>Posição da boca e os 5 maiores desafios para falantes de português (Sproglyden):</strong><br><br>
1) <strong>O d suave (<em>mad, brød, gade</em>):</strong> Não bata a língua no céu da boca e evite «dj» (como no Brasil em <em>dia</em>)! Deite a ponta da língua atrás dos dentes de baixo e solte ar morno como quem bafora nos óculos.<br><br>
2) <strong>P, T, K com sopro forte vs. B, D, G (Teste do papel):</strong> Em português, <em>p, t, k</em> não têm sopro (<em>pão, café</em>). Em dinamarquês, <em>pære, tale, kaffe</em> precisam empurrar uma folha de papel — senão soam como <em>bære, dale, gade</em>! (E «ti» nunca vira «tchi»!)<br><br>
3) <strong>R fundo da garganta vs. H ativo:</strong> O H de <em>hej, hus</em> deve ser soprado (não mudo como <em>hoje</em>!), enquanto o R de <em>rød, ris</em> vibra fundo atrás na garganta — e o -r final (<em>mor, spiser</em>) some na vogal.<br><br>
4) <strong>Y e Ø de biquinho firme:</strong> Língua na frente em «i/ê», lábios arredondados (<em>lys ≠ Lis</em>).<br><br>
5) <strong>sk-/sp-/st- SEM «es-» (*eskole) e L/S limpos no final:</strong> Comece direto no S (<em>sss-kole</em>), e não transforme L final em U (<em>sol</em> ≠ *sou) nem S final em «sh» (<em>lys</em> ≠ *lysh)!`,
            detailExplain_es: `<strong>Posición de la boca y los 5 mayores retos para hispanohablantes (Sproglyden):</strong><br><br>
1) <strong>La «d» suave (<em>mad, brød, gade</em>):</strong> Aunque el español tiene [ð] en <em>cada</em>, ahí tocas arriba los dientes. En danés, deja la punta de la lengua plana detrás de los <strong>dientes de abajo</strong> y echa vaho tibio como al limpiar unas gafas.<br><br>
2) <strong>P, T, K con soplo fuerte vs. B, D, G (Prueba del papel):</strong> En español <em>p, t, k</em> no llevan aire (<em>pelo, todo, casa</em>). En danés, <em>pære, tale, kaffe</em> tienen que mover una hoja de papel con el aire — ¡si no, suenan como <em>bære, dale, gade</em>!<br><br>
3) <strong>Y/Ø con besito y H danesa sonora:</strong> En danés la H de <em>hej, hus</em> se pronuncia soltando aire suave (¡no es muda como en <em>hola</em>!), y en Y/Ø debes redondear los labios (<em>lys ≠ Lis</em>).<br><br>
4) <strong>R de garganta y V con dientes (no = B):</strong> Nunca vibres la punta de la lengua (<em>rød</em> nace atrás en la garganta, y el final <em>mor, spiser</em> se funde en vocal). Y para <strong>V</strong> (<em>vin, varm</em>), apoya los dientes superiores en el labio inferior — ¡V y B son muy distintas!<br><br>
5) <strong>sk-, sp-, st- SIN «e-» (*eskole):</strong> Empieza directo con el silbido <em>sss-kole</em>, nunca metas una «e» delante!`,
            morePairs: [
                { da: 'dag (hårdt d i starten) ↔ brød / mad (blødt d som at ånde på briller)', note: 'Samme bogstav, to vidt forskellige måder at bevæge munden på.', note_zh: '同一个字母 d，在词首是舌尖轻点，在词尾则是像擦眼镜哈气一样的软 d！', note_ar: 'حرف d في بداية الكلمة (dag) ينطق بطرقة طرف اللسان، أما في آخر الكلمة (brød) فهو ناعم كالنفخ على النظارات!', note_en: 'The same letter "d", two totally different ways to move your mouth: sharp tap in front, warm lazy breath at the end.', note_uk: 'Одна літера d: на початку слова (dag) — тверда як українське «д», а всередині й у кінці (brød, mad) — м’який видих за нижніми зубами!', note_vi: 'Cùng một chữ d: ở đầu từ (dag) phát âm như «đ» nhẹ, nhưng ở giữa/cuối từ (brød, mad) là hơi ấm nhẹ sau răng dưới — đừng bỏ quên!', note_ur: 'ایک ہی حرف d: شروع میں (dag) اردو «د» جیسا، مگر آخر میں (brød, mad) عینک پر گرم سانس دینے جیسا نرم!', note_fa: 'یک حرف واحد d: در اول کلمه (dag) سفت است مثل «د»، اما در آخر کلمه (brød, mad) نرم است مثل «ها» کردن روی عینک!', note_pt: 'A mesma letra d: firme no início (dag, sem virar "dj") e um sopro morno atrás dos dentes de baixo no fim (brød, mad)!', note_es: 'La misma letra d: firme al inicio (dag) y un vaho tibio detrás de los dientes de abajo al final (brød, mad)!' },
                { da: 'pære / tale / kaffe (med pust!) ↔ bære / dale / gade (uden pust)', note: 'Hold et papir foran munden ved P/T/K — og undgå ekstra støttevokaler foran sk-/sp-/st-.', note_zh: '拿张纸放在嘴前：发 p 时纸片被气流吹飞，发 b 时纸片保持不动。', note_ar: 'ضع ورقة أمام فمك: مع p الدنماركية تطير الورقة باندفاع الهواء، ومع b تبقى ثابتة.', note_en: 'Hold a piece of paper in front of your mouth: at "p" the paper flies; at "b" it stands still.', note_uk: 'Тест із папірцем: на p, t, k повітря різко штовхає папір; без видиху данці почують b, d, g (наприклад, benge замість penge)!', note_vi: 'Cảnh giác mất đuôi từ: thiếu -s ở «lys» sẽ thành «ly», thiếu -st ở «fest» thành «fe», thiếu -ld ở «kold» thành «ko»!', note_ur: 'منہ کے آگے کاغذ رکھیں: ڈینش P/T/K (اردو پھ، تھ، کھ کی طرح) کاغذ اڑا دیں، ورنہ ڈینش لوگ B/D/G سنیں گے!', note_fa: 'یک کاغذ جلوی دهان بگیرید: با P/T/K کاغذ تکان بخورد! و اول sk-/sp- اصلاً «اِ-» نگذارید (*eskole غلط است).', note_pt: 'Teste do papel na frente da boca: P/T/K precisam mover a folha! E não coloque «es-» antes de sk-/sp- (*eskole é erro).', note_es: 'Prueba del papel frente a la boca: P/T/K deben mover la hoja! Y nunca pongas «e-» antes de sk-/sp- (*eskole es error).' }
            ],
            links: [
                { label: '🇮🇷 Svære lyde for persisktalende', label_zh: '🇨🇳 5个丹麦语难点发音训练 (Kinesisk)', label_ar: '🇸🇦 تدريب الأصوات الدنماركية الصعبة (Arabisk)', label_en: '🇬🇧 4 tricky Danish sounds (English)', label_uk: '🇺🇦 Тренажер 5 складних звуків (Українська)', label_vi: '🇻🇳 Trình luyện 5 âm khó cho người Việt', label_ur: '🇵🇰 اردو بولنے والوں کے 5 مشکل حروف کی مشق', label_fa: '🇮🇷 تمرین ویژه ۵ صدای سخت برای فارسی‌زبانان', label_pt: '🇵🇹 Treino dos 5 sons mais difíceis (Português)', label_es: '🇪🇸 Entrenamiento de los 5 sonidos más difíciles (Español)', onlyIfLangMatch: true, routeByLang: { en: 'vanskelige_lyde_engelsk', zh: 'vanskelige_lyde_kinesisk', ar: 'vanskelige_lyde_arabisk', uk: 'vanskelige_lyde_ukrainsk', vi: 'vanskelige_lyde_vietnamesisk', ur: 'vanskelige_lyde_urdu', fa: 'vanskelige_lyde_farsi', pt: 'vanskelige_lyde_portugisisk', es: 'vanskelige_lyde_spansk' } },
                { label: '🔤 Træn bogstaver & lyde', label_zh: '🔤 字母与发音训练 (Træn bogstaver)', label_ar: '🔤 تدريب الحروف والأصوات (Træn bogstaver)', label_en: '🔤 Practice letters & sounds (Træn bogstaver)', label_uk: '🔤 Тренування букв і звуків (Træn bogstaver)', label_vi: '🔤 Luyện chữ cái & phát âm (Træn bogstaver)', label_ur: '🔤 حروف اور آوازوں کی مشق (Træn bogstaver)', label_fa: '🔤 تمرین حروف و صداها (Træn bogstaver)', label_pt: '🔤 Praticar letras e sons (Træn bogstaver)', label_es: '🔤 Practicar letras y sonidos (Træn bogstaver)', route: 'traen_bogstaver' },
                { label: '🎙️ Leg med udtale', label_zh: '🎙️ 趣味口语发音 (Leg med udtale)', label_ar: '🎙️ تدريب النطق التفاعلي (Leg med udtale)', label_en: '🎙️ Pronunciation challenges (Leg med udtale)', label_uk: '🎙️ Ігри на вимову (Leg med udtale)', label_vi: '🎙️ Trò chơi luyện phát âm (Leg med udtale)', label_ur: '🎙️ تلفظ کے دلچسپ کھیل (Leg med udtale)', label_fa: '🎙️ بازی‌ها و چالش‌های تلفظ (Leg med udtale)', label_pt: '🎙️ Jogos de pronúncia (Leg med udtale)', label_es: '🎙️ Juegos de pronunciación (Leg med udtale)', route: 'leg_med_udtale' }
            ]
        },
        {
            num: 3,
            title: 'Stavelsen & rytmen',
            title_zh: '音节与节奏打拍 (Stavelsen & rytmen)',
            title_ar: 'نبض الكلمة وإيقاع الخبط والبلع (Stavelsen & rytmen)',
            title_en: 'Syllable Pulse & Swallowed Endings (Stavelsen & rytmen)',
            title_uk: 'Склад, наголос і «проковтування» кінцівок (Stavelsen & rytmen)',
            title_vi: 'Âm tiết & nhịp điệu «nuốt âm» (Stavelsen & rytmen)',
            title_ur: 'لفظ کی تال اور آخر کے حروف نگلنے کی عادت (Stavelsen & rytmen)',
            title_fa: 'ضرب‌آهنگ کلمه و بلعیدن بخش‌های پایانی (Stavelsen & rytmen)',
            title_pt: 'Ritmo da palavra e finais engolidos (Stavelsen & rytmen)',
            title_es: 'Ritmo de la palabra y finales tragados (Stavelsen & rytmen)',
            subtitle: 'Ordets puls, hovedtrykket og de dovne, slugte endelser',
            subtitle_zh: '前重后轻的敲击节奏，与嘴巴懒得动的“轻快吞音”',
            subtitle_ar: 'نبض الكلمة وإيقاع الخبط والبلع',
            subtitle_en: 'Punching the first beat and mumbling or swallowing unstressed endings',
            subtitle_uk: 'Сильний наголос на першому складі та дуже слабке, ліниве закінчення слова',
            subtitle_vi: 'Nhấn mạnh vào âm tiết đầu tiên và đọc lướt rất nhẹ phần đuôi từ',
            subtitle_ur: 'پہلے حصے پر مضبوط زور اور لفظ کے آخر کے کمزور حصوں کا دھندلا جانا',
            subtitle_fa: 'تکیه محکم روی بخش اول کلمه (برخلاف فارسی که تکیه آخر کلمه است!) و بلعیده شدن پایان کلمه',
            subtitle_pt: 'Batida forte na primeira sílaba e finais átonos fracos ou engolidos na fala rápida',
            subtitle_es: 'Golpe fuerte en la primera sílaba y finales átonos relajados o tragados al hablar rápido',
            color: '#818cf8',
            widthPct: 51,
            daLine: `<span class="mss-hl-da">køk</span>-ke-net ➔ Udtales i 2 hurtige slag: første stavelse slås fast, resten mumles`,
            daLine_zh: 'køkkenet（日常快速口语只打 2 拍：词头用力敲，后面像滑滑梯一样轻轻滑过）',
            daLine_ar: 'køkkenet (في الكلام السريع تسمع خبطتين فقط: køk-net؛ المقطع الأوسط يبتلعه اللسان)',
            daLine_en: 'køkkenet ➔ Spoken in only 2 swift beats: heavy stomp on "køk-", trailing off into "-net"',
            daLine_uk: 'køkkenet ➔ У швидкому мовленні звучить як 2 короткі удари (køk-net): перший склад чіткий, решта майже зникає',
            daLine_vi: 'køkkenet ➔ Khi nói nhanh chỉ còn 2 nhịp: nhấn mạnh âm đầu (køk-) rồi lướt nhẹ rất nhanh (-net)',
            daLine_ur: 'køkkenet ➔ تیز گفتگو میں صرف 2 تیز ضربیں (køk-net): پہلا حصہ مضبوط، درمیانی حصہ غائب ہو جاتا ہے!',
            daLine_fa: 'køkkenet ➔ در گفتار سریع فقط ۲ ضربه دارد (køk-net): بخش اول محکم، بخش میانی محو می‌شود!',
            daLine_pt: 'køkkenet ➔ Na fala rápida tem só 2 batidas (køk-net): 1ª sílaba firme, o meio quase desaparece!',
            daLine_es: 'køkkenet ➔ Al hablar rápido solo tiene 2 golpes (køk-net): 1.ª sílaba firme, ¡el centro casi desaparece!',
            myLines: {
                en: `<span class="mss-hl-my">kit-chen</span> — English also reduces unstressed syllables to schwa, but Danish goes much further: it punches the first stressed syllable with maximum energy and lazily swallows unstressed endings (-e, -et, -er), turning a 3-syllable written word like <em>køkkenet</em> into two swift beats (<em>køk-net</em>).`,
                ar: `<span class="mss-hl-my">الْـمَـطْـبَـخ (al-mat-bakh)</span> — في العربية كل حرف ومقطع صوتي ينال حقه كاملاً من النطق الواضح دون بلع للنهايات. أما الدنماركي فيضرب ضربة قوية في بداية الكلمة، ثم يبتلع النهاية بتكاسل. واحذر من إضافة كسرة خفيفة بين الحروف الساكنة في النهاية (قل: koldt مثل قفل الباب بحزم، ولا تقل kold-te).`,
                tr: `<span class="mss-hl-my">mut-fak-ta</span> — Tyrkisk giver næsten lige meget plads til hver stavelse med vokalharmoni.`,
                uk: `<span class="mss-hl-my">на кух-ні (na kukh-ni)</span> — В українській мові кожен склад і голосний вимовляється досить чітко й розбірливо. У данській уся енергія б’є у перший склад (<strong>køk-</strong>), а ненаголошені закінчення (-e, -et, -er) ліниво «проковтуються» і перетворюються на ледве чутний звук (<em>køk-ke-net → køk-net</em>).`,
                de: `<span class="mss-hl-my">Kü-che</span> — Tysk svækker også -e, men sluger færre lyde end dansk.`,
                es: `<span class="mss-hl-my">co-ci-na</span> — El español marca cada sílaba y cada vocal con total claridad. En danés ocurre lo opuesto: toda la fuerza cae en la <strong>1.ª sílaba</strong> (<strong>køk-</strong>) y las terminaciones (<em>-e-, -et, -er</em>) se debilitan o se tragan rápido (<em>køk-ke-net ➔ køk-net</em>). ¡Y nunca metas una «e-» delante de <em>skole / spiser</em>!`,
                vi: `<span class="mss-hl-my">nhà bếp</span> — Trong tiếng Việt mỗi chữ là một âm tiết tách bạch, rõ ràng và mang thanh điệu riêng. Ngược lại, một từ tiếng Đan Mạch có thể dài 2–3 âm tiết: toàn bộ lực dồn vào âm đầu (<strong>køk-</strong>), còn các âm <em>-e-, -et, -er</em> phía sau được đọc lướt nhẹ như nuốt đi (<em>køk-ke-net → køk-net</em>)!`,
                ur: `<span class="mss-hl-my">با-ور-چی-خا-نے میں</span> — اردو میں لفظ کا ہر حصہ واضح اور پورا بولا جاتا ہے، مگر ڈینش میں سارا زور پہلے حصے (<strong>køk-</strong>) پر پڑتا ہے اور بعد کے کمزور حصے (<em>-e-, -et, -er</em>) سستی سے آدھے نگل لیے جاتے ہیں (<em>køk-ke-net ➔ køk-net</em>)!`,
                fa: `<span class="mss-hl-my">آشـپـزخـانـه (âsh-paz-khâ-NEH)</span> — در فارسی هر بخش واضح است و تکیه معمولاً روی بخش <strong>آخر</strong> کلمه می‌افتد! اما در دانمارکی تمام انرژی روی بخش <strong>اول</strong> (<strong>køk-</strong>) می‌کوبد و بخش‌های آخر (<em>-e-, -et, -er</em>) کاملاً سست و بلعیده می‌شوند (<em>køk-ke-net ➔ køk-net</em>)! و مراقب باشید اول <em>skole/spiser</em> صدای «اِ» نگذارید.`,
                pt: `<span class="mss-hl-my">co-zi-nha</span> — No português do Brasil cada vogal costuma soar clara, enquanto em Portugal já se reduzem vogais átonas! No dinamarquês, a força cai na <strong>1ª sílaba</strong> (<strong>køk-</strong>) e as terminações (<em>-e-, -et, -er</em>) são engolidas rápido (<em>køk-ke-net ➔ køk-net</em>) — e lembre-se de nunca pôr «es-» antes de <em>skole/spiser</em>!`,
                zh: `<span class="mss-hl-my">厨-房 (chú-fáng)</span> — 汉字字字清晰、每个字都有饱满的音调；但丹麦语说话像打节拍，力量全砸在第一个主要重音上，后面的小尾巴（如 -e, -et, -er）会像滑滑梯一样懒洋洋含糊带过，甚至直接被吞掉！`
            },
            myLines_da: {
                en: `Engelsk svækker også tryksvage stavelser, men dansk sluger ofte hele endelser og smelter konsonanter sammen i hurtig tale.`,
                zh: `Hvert kinesisk tegn står som en fast kile med sin egen tone; dansk banker til på første stavelse og lader resten smuldre dovent eller blive slugt.`,
                ar: `I arabisk udtales alle stavelser med fuld vægt. På dansk trampes der hårdt på første stavelse, mens endelser sluges. Pas på ikke at indsætte små ekstra vokaler mellem konsonanter (sig koldt, ikke kold-te).`,
                uk: `Ukrainsk udtaler alle stavelser klart og tydeligt. På dansk lægges al kraft på 1. stavelse, mens endelser (-e, -et, -er) næsten sluges helt.`,
                vi: `Vietnamesisk består af adskilte énstavelsesord med hver sin tone ("nhà bếp"). Dansk samler trykket på 1. stavelse og sluger/svækker endelser (-e, -et, -er), så man ikke må give hver stavelse lige meget vægt.`,
                ur: `Urdu udtaler alle stavelser tydeligt (اور sætter ofte et lille "i-" foran sk-/sp-, fx "iskole"). Dansk lægger al vægt på 1. stavelse og sluger endelser som -e-, -et, -er.`,
                fa: `Farsi lægger normalt hovedtrykket på ORDETS SIDSTE stavelse og udtaler alle vokaler klart (samt sætter let "e-" foran sk-/sp-, fx "eskole"). Dansk lægger modsat al vægt på 1. stavelse og sluger endelser (-e-, -et, -er).`,
                pt: `Brasiliansk portugisisk udtaler vokaler ret tydeligt (mens europæisk portugisisk faktisk sluger mange vokaler ligesom dansk!). Portugisisk sætter dog ofte støttevokalen "es-/is-" foran sk-/sp- (*eskole). Dansk stamper på 1. stavelse og lader -e/-et/-er smelte.`,
                es: `Spansk er et stavelsestællende sprog, hvor hver eneste vokal udtales klart (og spansk indsætter næsten altid "e-" foran sk-/sp-/st-, fx "escuela/eskole"). Dansk er stærkt tryktællende: tramper på 1. stavelse og sluger -e/-et/-er.`
            },
            detailExplain: `<strong>Stavelser & rytme:</strong> Når vi taler, deler vi ordene op i taktslag. På dansk samler man næsten al energien i ét hårdt tramp på den første stavelse (<strong>køk</strong>-). Resten af ordet med <em>-e-</em> udtales helt dovent og afslappet, som en lille mumlelyd, der næsten forsvinder i hurtig tale (så <em>køkkenet</em> i hverdagen føles som to hurtige trin frem for tre).`,
            detailExplain_zh: `<strong>节奏与音节（Stavelsen & rytmen）：</strong>丹麦语说话有强烈的<strong>节奏敲击感</strong>：说话人会把浑身力气重重砸在词头（如 <strong>køk-</strong>），而后面的 <em>-e-</em> 弱音节就像嘴巴懒得动一样，变成一声轻飘飘、含糊的小短音，甚至跟后面的辅音粘在一起直接吞掉。初学丹麦语的中国人最容易习惯性把每个字音节都读得饱满，但要想说得地道，就必须学会“前重后轻、大胆吞音”！`,
            detailExplain_ar: `<strong>نبض الكلمة وإيقاع الخبط والبلع (Stavelsen & rytmen):</strong> الدنماركية لغة إيقاعية تعتمد على نبضات متباعدة: المتحدث يفرغ طاقته في خبطة قوية في بداية الكلمة (<strong>køk-</strong>)، أما المقاطع اللاحقة مثل <em>-e-</em> أو <em>-et</em> فيتعامل معها الفم بكسل شديد ويبلعها حتى تختفي تقريباً (فتبدو كلمة <em>køkkenet</em> في الكلام السريع كأنها خطوتان وليست ثلاث خطوات).<br><br>
نصيحة ذهبية للناطقين بالعربية: لا تضع حركات قصيرة مساعدة بين الحروف الساكنة المتتالية في آخر الكلمة، بل اقفل الكلمة بحزم كأنك تغلق باباً (قل <em>koldt</em> بضربة واحدة حازمة، ولا تقل <em>kold-te</em>).`,
            detailExplain_en: `<strong>Syllable Pulse & Rhythm (Stavelsen & rytmen):</strong> When speaking Danish, words are grouped into rhythmic beats. Danes unload their energy into a firm, heavy stomp on the first stressed syllable (<strong>køk-</strong>). The rest of the word (<em>-e-, -et, -er</em>) is mumbled so lazily and effortlessly that vowels often vanish in everyday conversation (making <em>køkkenet</em> feel like two quick steps rather than three). While English speakers naturally try to pronounce each syllable distinctly, natural Danish sounds much more authentic when you hit the first beat and let the endings slide away.`,
            detailExplain_uk: `<strong>Склад і ритм (Stavelsen & rytmen):</strong> У живій данській мові слова звучать як нерівні ритмічні удари: усю силу мовець вкладає в перший наголошений склад (<strong>køk-</strong>). А ненаголошені <em>-e-, -et, -er</em> вимовляються максимально розслаблено й тихо, тож середнє <em>-e-</em> у <em>køkkenet</em> часто просто зникає, залишаючи два швидкі кроки замість трьох! Для українців, які звикли чітко вимовляти кожен голосний та закінчення, дуже корисно тренуватися «відпускати» закінчення легко й без напруги.`,
            detailExplain_vi: `<strong>Âm tiết và nhịp điệu (Stavelsen & rytmen):</strong> Trong tiếng Việt, mỗi chữ đứng tách bạch thành một âm tiết ngang sức và có thanh điệu riêng (<em>nhà - bếp</em>). Ngược lại, tiếng Đan Mạch nói theo nhịp trọng âm: người nói dồn toàn bộ năng lượng vào âm tiết đầu tiên (<strong>køk-</strong>), còn các âm <em>-e-, -et, -er</em> phía sau bị thả lỏng và lướt nhanh như bị nuốt đi (<em>køk-ke-net</em> chỉ còn 2 nhịp <em>køk-net</em>). Lưu ý: dù đọc nhẹ, đừng đánh rơi phụ âm cuối quan trọng như <em>-t</em> hay <em>-s</em> nhé!`,
            detailExplain_ur: `<strong>لفظ کی تال اور اختتام نگلنا (Stavelsen & rytmen):</strong> اردو میں ہر حرکت اور ہر حرف پورا ادا ہوتا ہے، لیکن ڈینش کی تال بالکل مختلف ہے: بولنے والا ساری طاقت لفظ کے پہلے حصے (<strong>køk-</strong>) پر لگاتا ہے، اور بعد کے کمزور حصے (<em>-e-, -et, -er</em>) اتنے ڈھیلے پن سے بولے جاتے ہیں کہ عام گفتگو میں درمیانی آواز غائب ہی ہو جاتی ہے (تین حصوں والا <em>køk-ke-net</em> بولنے میں دو تیز قدموں <em>køk-net</em> جیسا لگتا ہے)۔ اور یاد رکھیں: <em>skole, spiser</em> کے شروع میں اضافی «اِ» مت لگائیں!`,
            detailExplain_fa: `<strong>ضرب‌آهنگ کلمه و بلعیدن پایان‌ها (Stavelsen & rytmen):</strong> در فارسی تکیه معمولاً روی بخش آخر کلمه است و تمام حروف صدادار واضح خوانده می‌شوند. اما در دانمارکی برعکس است: تمام قدرت روی بخش <strong>اول</strong> کلمه می‌افتد (<strong>køk-</strong>)، و بخش‌های کم‌جانِ بعدی (<em>-e-, -et, -er</em>) آن‌قدر راحت و سریع رد می‌شوند که در گفتار روزمره بخش میانی اصلاً ناپدید می‌شود (کلمه سه‌بخشی <em>køk-ke-net</em> دو ضربه‌ای <em>køk-net</em> شنیده می‌شود)! و حتماً یادتان باشد قبل از <em>skole, spiser</em> صدای «اِ» اضافه نکنید!`,
            detailExplain_pt: `<strong>Pulso da palavra e finais engolidos (Stavelsen & rytmen):</strong> No português do Brasil quase toda vogal átona ainda se ouve bem (enquanto em Portugal as átonas já somem bastante!). No dinamarquês, toda a energia vai para um soco firme na <strong>1ª sílaba</strong> (<strong>køk-</strong>), e os finais <em>-e-, -et, -er</em> ficam tão relaxados que <em>køkkenet</em> (3 sílabas escritas) vira 2 batidas rápidas: <em>køk-net</em>! E lembre-se: nunca insira «es-» antes de <em>skole, spiser</em> (*eskole)!`,
            detailExplain_es: `<strong>Ritmo de la palabra y finales tragados (Stavelsen & rytmen):</strong> En español cada sílaba suena nítida y nunca tragamos las vocales. En danés el ritmo va por golpes fuertes de acento: toda la energía cae en la <strong>1.ª sílaba</strong> (<strong>køk-</strong>), mientras que las sílabas átonas (<em>-e-, -et, -er</em>) se pronuncian tan relajadas que la vocal del medio desaparece (<em>køkkenet</em> suena como 2 golpes: <em>køk-net</em>)! Y recuerda: ¡jamás añadas «e-» delante de <em>skole, spiser</em> (*eskole)!`,
            morePairs: [
                { da: 'spi-ser → [ˈsbisɐ] (r smelter sammen med e)', note: 'Endelsen -er udtales som én kort, åben lyd uden modstand.', note_zh: '写出来是两个音节，实际说话时 -er 融合成一口气轻轻带过。', note_ar: 'كلمة spiser تُكتب بمقطعين، لكنها تُنطق عملياً بنَفَس واحد مستمر دون دحرجة الراء.', note_en: 'Written as two syllables, spoken as one smooth breath where -er melts into an open vowel.', note_uk: 'На письмі 2 склади, але в живій вимові закінчення -er зливається в один короткий відкритий звук без вібрації «р».', note_vi: 'Viết là 2 âm tiết (spi-ser), nhưng đọc lướt mượt như một hơi thở nhẹ — phần -er mở nhẹ ra chứ không rung chữ r.', note_ur: 'لکھنے میں 2 حصے (spi-ser)، مگر بولنے میں ایک ہی نرم سانس میں آخر کھل کر ادا ہوتا ہے — ر تھرتھراتی نہیں!', note_fa: 'در نوشتار ۲ بخش (spi-ser)، اما در گفتار با یک نفس کوتاه و باز تمام می‌شود — اصلاً «ر» لرزان نیست!', note_pt: 'Escreve-se em 2 sílabas (spi-ser), mas fala-se num sopro curto e aberto — sem nenhum R de "rato" ou "caro" no fim!', note_es: 'Se escribe en 2 sílabas (spi-ser), pero se dice en un soplo abierto y corto — ¡sin ninguna R vibrante de «caro»!' },
                { da: 'køk-ke-net → 3 skrevne stavelser, men kun 2 talte slag', note: 'Det midterste -e- forsvinder helt i hverdagssproget.', note_zh: '书面上是三个音节，快速日常说话时中间的 -e- 直接被吞掉，变成两个节拍！', note_ar: 'في الكتابة køk-ke-net ثلاث مقاطع، لكن في الحديث السريع تُبلع الـ -e- الوسطى كلياً وتتحول إلى خبطتين!', note_en: 'Three written syllables, but only two spoken beats in everyday Danish as the middle -e- vanishes.', note_uk: 'У слові køk-ke-net написано 3 склади, але в повсякденній мові середнє -e- зникає — чути лише 2 удари!', note_vi: 'Viết 3 âm tiết (køk-ke-net), nhưng trong giao tiếp hàng ngày âm -e- ở giữa biến mất, chỉ còn 2 nhịp!', note_ur: 'تحریر میں 3 حصے (køk-ke-net)، مگر روزمرہ بول چال میں درمیان کا -e- غائب ہو کر صرف 2 ضربیں رہ جاتی ہیں!', note_fa: 'در نوشتار ۳ بخش (køk-ke-net)، ولی در مکالمه روزمره بخش وسط کاملاً محو می‌شود و فقط ۲ ضربه می‌ماند!', note_pt: 'São 3 sílabas escritas (køk-ke-net), mas na fala do dia a dia o -e- do meio some e viram só 2 batidas!', note_es: 'Son 3 sílabas escritas (køk-ke-net), pero al hablar la -e- central desaparece y solo quedan 2 golpes!' }
            ],
            links: [
                { label: '📖 Læsetræning & rytme', label_zh: '📖 语流节奏与朗读训练 (Læsetræning)', label_ar: '📖 تدريب القراءة وإيقاع الكلام (Læsetræning)', label_en: '📖 Reading practice & rhythm (Læsetræning)', label_uk: '📖 Читання і ритм (Læsetræning)', label_vi: '📖 Luyện đọc & nhịp điệu (Læsetræning)', label_ur: '📖 پڑھنے اور تال کی مشق (Læsetræning)', label_fa: '📖 تمرین خواندن و ضرب‌آهنگ (Læsetræning)', label_pt: '📖 Treino de leitura e ritmo (Læsetræning)', label_es: '📖 Práctica de lectura y ritmo (Læsetræning)', route: 'laesetraening' },
                { label: '🎙️ Træn udtale', label_zh: '🎙️ 口语发音训练 (Træn udtale)', label_ar: '🎙️ تدريب النطق الشفهي (Træn udtale)', label_en: '🎙️ Spoken pronunciation (Træn udtale)', label_uk: '🎙️ Тренування вимови (Træn udtale)', label_vi: '🎙️ Luyện phát âm (Træn udtale)', label_ur: '🎙️ زبانی تلفظ کی مشق (Træn udtale)', label_fa: '🎙️ تمرین تلفظ شفاهی (Træn udtale)', label_pt: '🎙️ Praticar pronúncia (Træn udtale)', label_es: '🎙️ Practicar pronunciación (Træn udtale)', route: 'traen_udtale' }
            ]
        },
        {
            num: 4,
            title: 'Ordets byggesten',
            title_zh: '拼装积木与小尾巴 (Ordets byggesten)',
            title_ar: 'قطع الليغو والذيل الملتصق بالكلمة (Ordets byggesten)',
            title_en: 'Word Building Blocks & The Definite Tail (Ordets byggesten)',
            title_uk: 'Частини слова й «хвостик» означеності (Ordets byggesten)',
            title_vi: 'Các mảnh ghép của từ & «đuôi xác định» (Ordets byggesten)',
            title_ur: 'لفظ کے حصے اور پچھلی دُم (Ordets byggesten)',
            title_fa: 'اجزای سازنده کلمه و «دُم معین‌ساز» (Ordets byggesten)',
            title_pt: 'Blocos da palavra e a «cauda definida» (Ordets byggesten)',
            title_es: 'Piezas de la palabra y la «cola definida» (Ordets byggesten)',
            subtitle: 'Stammen og endelsen (f.eks. brød + et = brødet, spise + r = spiser)',
            subtitle_zh: '主干核心词 + 粘在屁股后面的功能小尾巴（如 brød + et = brødet）',
            subtitle_ar: 'جذر الكلمة وذيول التعريف التي تلتصق بآخره (مثل: køkken + et = køkkenet)',
            subtitle_en: 'Core stems and attached endings (e.g. brød + et = brødet, spise + r = spiser)',
            subtitle_uk: 'Основа + хвостик означеності (-en/-et) замість українських відмінків і без окремих артиклів',
            subtitle_vi: 'Gốc từ + đuôi gắn phía sau (vd. køkken + et = køkkenet, khác hẳn tiếng Việt không biến đổi hình thức từ)',
            subtitle_ur: 'لفظ کی جڑ اور اس کے پیچھے لگنے والی علامتیں (جیسے køkken + et = køkkenet)',
            subtitle_fa: 'ریشه کلمه و پسوندهای انتهایی (مثل køkken + et = køkkenet؛ شبیه «-ه» در فارسی محاوره برای معرفه!)',
            subtitle_pt: 'Radical + terminações grudadas atrás (ex.: køkken + et = køkkenet, não «a cozinha» com artigo na frente!)',
            subtitle_es: 'Raíz + terminaciones pegadas detrás (ej.: køkken + et = køkkenet, ¡no «la cocina» delante!)',
            color: '#a78bfa',
            widthPct: 58,
            daLine: `køkken + <span class="mss-hl-da">-et</span> (den bestemte hale limes bag på ordet)`,
            daLine_zh: 'køkken + -et（想指“特定的那个厨房”，丹麦语把小尾巴 -et 牢牢粘在词尾）',
            daLine_ar: 'køkken + -et (ذيل التعريف يلتصق بظهر الكلمة مباشرة)',
            daLine_en: 'køkken + -et (the definite article "the" is a magnetic tail clamped onto the back of the word)',
            daLine_uk: 'køkken + -et (означений «хвостик» -et приклеюється до кінця слова)',
            daLine_vi: 'køkken + -et (đuôi xác định -et dính thẳng vào cuối danh từ thay cho «cái ... này/đó»)',
            daLine_ur: 'køkken + -et (خاص/مخصوص چیز بتانے کے لیے -et یا -en لفظ کے پیچھے چپک جاتا ہے)',
            daLine_fa: 'køkken + -et (پسوند معرفه مثل آهن‌ربا به آخر اسم می‌چسبد — درست مثل «آشپزخونه-ه» در فارسی گفتاری!)',
            daLine_pt: 'køkken + -et (o artigo «o / a» gruda como um ímã no FINAL do substantivo!)',
            daLine_es: 'køkken + -et (¡el artículo «el / la» se pega como un imán al FINAL del sustantivo!)',
            myLines: {
                en: `<span class="mss-hl-my">the + kitchen</span> — In English, "the" is always an independent word placed in FRONT of the noun. In Danish, definiteness ("the") is a little magnetic tail (<strong>-en</strong> or <strong>-et</strong>) clamped directly onto the BACK of the noun: <em>et køkken</em> (a kitchen) ➔ <em>køkken<strong>et</strong></em> (the kitchen).`,
                ar: `<span class="mss-hl-my">الـ + مطبخ</span> — في العربية أداة التعريف "الـ" توضع دائماً في <em>مقدمة</em> الكلمة (المطبخ). أما في الدنماركية، فأداة التعريف ليست كلمة منفصلة في البداية، بل هي <strong>ذيل صغير (-en أو -et)</strong> يلتصق كالمغناطيس في مؤخرة الكلمة!`,
                tr: `mutfak + <span class="mss-hl-my">-ta</span> (i køkkenet) — Tyrkisk sætter sted-endelsen (-da/-ta) bag på ordet, men har ingen bestemt artikel.`,
                uk: `<span class="mss-hl-my">кухні (відмінки, але без артиклів)</span> — В українській мові взагалі немає артиклів («a/the»)! Тому українцям часто незвично завжди ставити <strong>en/et</strong> спереду (<em>et køkken</em>) або приклеювати «хвостик» означеності <strong>-en / -et</strong> ззаду (<em>køkken<strong>et</strong></em> — саме ця відома кухня).`,
                de: `<span class="mss-hl-my">der/die/das (in der)</span> + Küche — Bestemthed og køn står foran navneordet.`,
                es: `<span class="mss-hl-my">la + cocina / el + pan</span> — En español el artículo definido («el, la, los, las») va siempre DELANTE del sustantivo. En danés, el artículo definido es una pequeña cola magnética (<strong>-en</strong> o <strong>-et</strong>) pegada DETRÁS de la palabra: <em>et køkken</em> (una cocina) ➔ <em>køkken<strong>et</strong></em> (la cocina)!`,
                vi: `<span class="mss-hl-my">(cái) nhà bếp</span> — Tiếng Việt là ngôn ngữ đơn lập: từ <em>nhà bếp</em> không bao giờ thêm đuôi số nhiều hay xác định, mà dùng từ đứng riêng phía trước (những, cái, này). Ngược lại, tiếng Đan Mạch gắn chặt đuôi <strong>-en / -et / -er / -ne</strong> ngay sau danh từ (<em>et køkken ➔ køkken<strong>et</strong></em>)!`,
                ur: `<span class="mss-hl-my">باورچی خانہ (بغیر کسی آرٹیکل کے)</span> — اردو میں «a» یا «the» جیسے آرٹیکلز نہیں ہوتے (اور «میں/کو» بعد میں آتے ہیں)۔ ڈینش میں غیر خاص چیز کے آگے <strong>en/et</strong> (<em>et køkken</em>) اور خاص چیز کے پیچھے دُم <strong>-en / -et</strong> لگتی ہے (<em>køkken<strong>et</strong></em> = وہ خاص باورچی خانہ)!`,
                fa: `<span class="mss-hl-my">آشپزخانه / آشپزخونه-ه</span> — یک شباهت جالب! در فارسیِ گفتاری برای اشاره به چیز خاص، یک «ـه» به آخر اسم می‌چسبانیم («آشپزخونه-ه»، «کتابه»)، و برای ناشناس «یک» می‌آوریم! در دانمارکی دقیقاً همین‌طور است: چیز ناشناس با <strong>en/et</strong> در جلو (<em>et køkken</em>)، و چیز خاص با پسوند <strong>-en / -et</strong> در انتها (<em>køkken<strong>et</strong></em>)!`,
                pt: `<span class="mss-hl-my">a + cozinha / o + pão</span> — Em português o artigo definido («o, a, os, as») vai sempre ANTES do substantivo! Em dinamarquês, o artigo definido é uma cauda magnética (<strong>-en</strong> ou <strong>-et</strong>) grudada ATRÁS da palavra: <em>et køkken</em> (uma cozinha) ➔ <em>køkken<strong>et</strong></em> (a cozinha)!`,
                zh: `<span class="mss-hl-my">厨房（不用在词尾贴尾巴）</span> — 汉语不需要在词尾贴额外的小尾巴来表示“这一个”或“复数”，而是直接用“这/那”或者大家心里明白的上下文；丹麦语则把 <strong>-en / -et / -ne</strong> 像磁铁一样直接吸在单词屁股后面！`
            },
            myLines_da: {
                en: `Engelsk sætter "the" foran navneordet; dansk limer bestemthed som en hale (-en/-et) bag på ordet.`,
                zh: `Kinesisk klistrer ikke små haler bag på ordet for "den bestemte" eller "flere", men bruger ord som "denne/dette" eller lader sammenhængen klare det.`,
                ar: `Arabisk sætter bestemthed foran ordet som "al-", mens dansk klistrer en lille hale (-en/-et) bag på navneordet.`,
                uk: `Ukrainsk bruger slet ikke artikler (hverken en/et eller bestemt hale), men bøjer i 7 kasus; på dansk skal man huske både en/et og den bestemte hale (-en/-et).`,
                vi: `Vietnamesisk er isolerende og sætter aldrig bøjningshaler på ord (bruger løse ord som <em>cái, những</em> foran). På dansk limes både flertal og bestemthed fast bag på ordet (<em>køkkenet, køkkenerne</em>).`,
                ur: `Urdu mangler bestemthedsartikler som "en/et" og "-en/-et" helt (bruger postpositioner bagefter som میں/کو). På dansk skal navneord have enten foranstillet en/et eller bagvedhæftet -en/-et.`,
                fa: `Sjov lighed: Talesprogsfarsi kan klistre "-e" bag på navneordet for bestemthed ("ketâb-e" = bogen), næsten ligesom dansk klistrer "-en/-et" bagpå (køkkenet)! Dansk kræver blot også ubestemt en/et og køn (en/et).`,
                pt: `Portugisisk sætter bestemte artikler FORAN (o/a/os/as) og skelner maskulinum/femininum. Dansk limer bestemthed som en hale (-en/-et/-ne) BAG på ordet og har fælleskøn/intetkøn (en/et).`,
                es: `Spansk sætter bestemte artikler FORAN (el/la/los/las) og skelner hankøn/hunkøn. Dansk limer bestemthed som en hale (-en/-et/-ne) BAG på ordet og har fælleskøn/intetkøn (en/et).`
            },
            detailExplain: `<strong>Ordets byggesten:</strong> Ord er samlet som legoklodser: en grundstamme (ordets kerne) plus små haler, der klikkes på. På dansk viser man for eksempel, at man taler om en helt bestemt ting ved at lime en lille hale (<strong>-en</strong> eller <strong>-et</strong>) bag på navneordet: <em>et køkken → køkken<strong>et</strong></em> (køkken + et).`,
            detailExplain_zh: `<strong>单词的小积木（Ordets byggesten）：</strong>单词就像可以拆装的乐高积木：一块是核心主干，后面插上各种功能性的小尾巴。丹麦语最特别的习惯就是<strong>把“这一个（定指）”做成小尾巴直接粘在屁股上</strong>：比如 <em>et køkken（一个厨房）→ køkken<strong>et</strong>（这个特定的厨房）</em>，把 <strong>-en / -et / -ne</strong> 像小尾巴一样吸上去。汉语没有这种粘尾巴的习惯，都是独立说“这个厨房”或直接看语境。`,
            detailExplain_ar: `<strong>قطع الليغو وذيول الكلمات (Ordets byggesten):</strong> الكلمات تُبنى كقطع الليغو: جذر أساسي وقطع صغيرة تلتصق به لتغير وظيفته. في الدنماركية، الطريقة المعتادة لقول "هذا الشيء المحدد والمعروف" ليست وضع "الـ" في البداية كما في العربية، بل لصق ذيل صغير (<strong>-en</strong> أو <strong>-et</strong>) في آخر الكلمة مباشرة: <em>et køkken (مطبخ ما) ← køkken<strong>et</strong> (المطبخ بعينه)</em>، أو <em>et brød (خبز) ← brød<strong>et</strong> (الخبز المحدد)</em>.`,
            detailExplain_en: `<strong>Word Building Blocks (Ordets byggesten):</strong> Words are assembled like Lego blocks: a core stem plus functional tails snapped into place. On Danish nouns, showing that you are talking about a specific, known object is done by gluing a tail (<strong>-en</strong> or <strong>-et</strong>) to the back:<br><br>• <strong>Indefinite (a/an):</strong> <em>et køkken</em> (a kitchen) / <em>et brød</em> (a loaf of bread)<br>• <strong>Definite (the):</strong> <em>køkken<strong>et</strong></em> (the kitchen) / <em>brød<strong>et</strong></em> (the bread)<br>• <strong>Plural (the ...s):</strong> <em>køkken<strong>erne</strong></em> (the kitchens) / <em>brød<strong>ene</strong></em> (the breads).<br><br>English speakers must resist the urge to invent a separate "the" in front: always look for the tail on the back!`,
            detailExplain_uk: `<strong>Будівельні блоки слова (Ordets byggesten):</strong> У данській мові слова складаються як конструктор LEGO: основа + функціональний «хвостик». Оскільки в українській мові взагалі немає артиклів (замість цього слова змінюються за відмінками: <em>кухня, на кухні, кухню</em>), важливо запам’ятати данську звичку:<br><br>• <strong>Неозначений предмет (уперше згадуємо):</strong> ставимо <em>en</em> або <em>et</em> перед іменником — <em>et køkken</em> (якась кухня).<br>• <strong>Означений предмет (конкретна, відома річ):</strong> приклеюємо «хвостик» <strong>-en</strong> або <strong>-et</strong> ззаду — <em>køkken<strong>et</strong></em> (ця/наша кухня)!<br>• <strong>Множина:</strong> спершу множина (<em>-er</em>), а потім означений хвостик (<em>-ne</em>): <em>køkkener<strong>ne</strong></em>.`,
            detailExplain_vi: `<strong>Các mảnh ghép của từ (Ordets byggesten):</strong> Trong tiếng Việt, từ gốc giữ nguyên hình dạng mãi mãi và ta đặt các từ rời phía trước (như <em>một, cái, những, các</em>). Nhưng trong tiếng Đan Mạch, các từ được lắp ghép như khối LEGO: <strong>gốc từ + đuôi chức năng</strong>!<br><br>• <strong>Chưa xác định (một ...):</strong> đặt <em>en</em> hoặc <em>et</em> phía trước — <em>et køkken</em> (một nhà bếp).<br>• <strong>Đã xác định (căn bếp đó):</strong> gắn đuôi <strong>-en</strong> hoặc <strong>-et</strong> như nam châm vào ĐẰNG SAU từ — <em>køkken<strong>et</strong></em>!<br>• <strong>Số nhiều:</strong> gắn đuôi số nhiều trước (<em>-er</em>), rồi gắn thêm đuôi xác định (<em>-ne</em>) vào cuối: <em>køkkener<strong>ne</strong></em> (những nhà bếp đó). Đừng bao giờ bỏ quên phần đuôi này khi nói nhé!`,
            detailExplain_ur: `<strong>الفاظ کی بناوٹ اور دُم (Ordets byggesten):</strong> اردو میں کوئی مخصوص آرٹیکل (a یا the) نہیں ہوتا، بلکہ «یہ/وہ» یا جملے کے سیاق سے پتا چلتا ہے۔ ڈینش میں الفاظ لیگو بلاکس کی طرح جڑتے ہیں:<br><br>• <strong>عام/غیر خاص چیز:</strong> آگے <em>en</em> یا <em>et</em> لگتا ہے — <em>et køkken</em> (کوئی باورچی خانہ)۔<br>• <strong>خاص/معروف چیز:</strong> لفظ کے پیچھے مقناطیس کی طرح <strong>-en</strong> یا <strong>-et</strong> کی دُم جڑ جاتی ہے — <em>køkken<strong>et</strong></em> (وہ خاص باورچی خانہ)۔<br>• <strong>جمع:</strong> پہلے جمع کا نشان (<em>-er</em>) اور پھر خاص ہونے کی دُم (<em>-ne</em>) لگتی ہے: <em>køkkener<strong>ne</strong></em>!`,
            detailExplain_fa: `<strong>اجزای سازنده کلمه (Ordets byggesten):</strong> یک شباهت شیرین با فارسی محاوره! در فارسی برای اسم ناشناس «یک» می‌گوییم و برای اسم مشخص در گفتار یک «ـه» به آخرش می‌چسبانیم («کتابه»، «آشپزخونه‌هه»). در دانمارکی دقیقاً همین نظام هست، فقط با دو جنس دستوری <em>en</em> و <em>et</em>:<br><br>• <strong>ناشناس (یک ...):</strong> <em>et køkken</em> (یک آشپزخانه) / <em>en stol</em> (یک صندلی).<br>• <strong>معرفه / مشخص (همان ...):</strong> پسوند <strong>-en</strong> یا <strong>-et</strong> به آخر اسم می‌چسبد — <em>køkken<strong>et</strong></em> / <em>stol<strong>en</strong></em>!<br>• <strong>جمع معرفه:</strong> اول علامت جمع (<em>-er</em>) و بعد پسوند معرفه (<em>-ne</em>): <em>køkkener<strong>ne</strong></em>!`,
            detailExplain_pt: `<strong>Blocos de construção da palavra (Ordets byggesten):</strong> As palavras dinamarquesas se montam como peças de LEGO: radical + cauda funcional! Em português colocamos o artigo definido sempre ANTES (<em>o pão, a cozinha</em>); no dinamarquês a definição é uma <strong>cauda (-en ou -et) grudada atrás</strong>:<br><br>• <strong>Indefinido (um/uma):</strong> <em>et køkken</em> (uma cozinha) / <em>en stol</em> (uma cadeira).<br>• <strong>Definido (o/a):</strong> <em>køkken<strong>et</strong></em> (a cozinha) / <em>stol<strong>en</strong></em> (a cadeira).<br>• <strong>Plural definido (os/as):</strong> primeiro o plural (<em>-er</em>), depois a cauda definida (<em>-ne</em>): <em>køkkener<strong>ne</strong></em> (as cozinhas)!`,
            detailExplain_es: `<strong>Piezas de la palabra (Ordets byggesten):</strong> Las palabras danesas se arman como piezas de LEGO: raíz + cola funcional! En español el artículo definido va siempre DELANTE (<em>el pan, la cocina</em>); en danés es una <strong>cola (-en o -et) pegada detrás</strong>:<br><br>• <strong>Indefinido (un/una):</strong> <em>et køkken</em> (una cocina) / <em>en stol</em> (una silla).<br>• <strong>Definido (el/la):</strong> <em>køkken<strong>et</strong></em> (la cocina) / <em>stol<strong>en</strong></em> (la silla).<br>• <strong>Plural definido (los/las):</strong> primero el plural (<em>-er</em>), luego la cola definida (<em>-ne</em>): <em>køkkener<strong>ne</strong></em> (las cocinas)!`,
            morePairs: [
                { da: 'et køkken ➔ køkkenet (endelsen -et limes på bagtil)', note: 'Bestemthed på dansk laves med en hale (-en/-et) i stedet for et foranstillet ord.', note_zh: '丹麦语把“这一个（定指）”做成小尾巴 -en/-et 粘在词尾，而不是像中文一样放在前面。', note_ar: 'التعريف في الدنماركية يلتصق كذيل (-en/-et) في آخر الكلمة بدلاً من وضعه في المقدمة كـ "الـ" في العربية.', note_en: 'Definiteness in Danish is an attached tail (-en/-et) rather than a separate word in front.', note_uk: 'В українській немає артиклів; у данській «конкретна кухня» передається приклеєним ззаду хвостиком -et (køkkenet).', note_vi: 'Nghĩa xác định trong tiếng Đan Mạch không dùng từ đứng trước mà gắn trực tiếp đuôi -en/-et ra phía sau!', note_ur: 'اردو میں «the» جیسا کوئی لفظ نہیں؛ ڈینش میں خاص چیز کے آخر میں -en یا -et لگتا ہے (køkkenet)۔', note_fa: 'معرفه در دانمارکی مثل «ـه» گفتاری فارسی به آخر کلمه می‌چسبد (køkkenet) و این با فارسی معیار که حرف تعریف معین ندارد فرق دارد.', note_pt: 'A definição ("o/a") no dinamarquês vira uma cauda (-en/-et) grudada atrás, em vez de ficar na frente como em português!', note_es: 'El artículo definido («el/la») en danés es una cola (-en/-et) pegada atrás, ¡en lugar de ir delante como en español!' },
                { da: 'køkkener (flere) ➔ køkkenerne (de bestemte køkkener)', note: 'I flertal limes flertals-halen på først (-er), og derefter bestemtheds-halen (-ne).', note_zh: '复数时先贴复数小积木 (-er)，再贴定指小尾巴 (-ne)。', note_ar: 'في صيغة الجمع تلتصق علامة الجمع أولاً (-er)، ثم يلتصق ذيل التعريف (-ne).', note_en: 'In the plural, the plural brick (-er) attaches first, followed by the definite tail (-ne).', note_uk: 'У множині спершу додається закінчення множини (-er), а потім хвостик означеності (-ne).', note_vi: 'Ở dạng số nhiều, gắn đuôi số nhiều (-er) trước, rồi mới gắn đuôi xác định (-ne) ở cuối.', note_ur: 'جمع میں پہلے جمع کا حصہ (-er) اور پھر خاص ہونے کی دُم (-ne) جڑتی ہے۔', note_fa: 'در جمع، اول پسوند جمع (-er) و بعد پسوند معرفه (-ne) به انتهای کلمه می‌چسبد.', note_pt: 'No plural, primeiro entra a peça de plural (-er) e depois a cauda definida (-ne): køkkenerne!', note_es: 'En plural, primero va la pieza de plural (-er) y después la cola definida (-ne): køkkenerne!' }
            ],
            links: [
                { label: '🏷️ Navneord & bestemthed', label_zh: '🏷️ 名词与定指尾巴 (Bestemthed)', label_ar: '🏷️ الأسماء وذيول التعريف (Bestemthed)', label_en: '🏷️ Nouns & the definite tail (Bestemthed)', label_uk: '🏷️ Іменники й артиклі (Bestemthed)', label_vi: '🏷️ Danh từ & đuôi xác định (Bestemthed)', label_ur: '🏷️ اسم اور خاص دُم کی مشق (Bestemthed)', label_fa: '🏷️ اسم‌ها و پسوند معرفه (Bestemthed)', label_pt: '🏷️ Substantivos e definição (Bestemthed)', label_es: '🏷️ Sustantivos y artículo definido (Bestemthed)', route: 'bestemthed' },
                { label: '📦 Top 100 Substantiver', label_zh: '📦 常用前100个名词 (Top 100 Substantiver)', label_ar: '📦 أهم 100 اسم في الدنماركية (Substantiver)', label_en: '📦 Top 100 Danish Nouns (Substantiver)', label_uk: '📦 Топ-100 іменників (Top 100 Substantiver)', label_vi: '📦 Top 100 Danh từ Đan Mạch (Substantiver)', label_ur: '📦 ڈینش کے 100 اہم اسم (Substantiver)', label_fa: '📦 ۱۰۰ اسم پرکاربرد دانمارکی (Substantiver)', label_pt: '📦 Top 100 Substantivos (Substantiver)', label_es: '📦 Top 100 Sustantivos (Substantiver)', route: 'top100_substantiver' }
            ]
        },
        {
            num: 5,
            title: 'Hele ordet',
            title_zh: '完整单词与词语分工 (Hele ordet)',
            title_ar: 'الكلمة الكاملة وعملها (Hele ordet)',
            title_en: 'The Whole Word: Verbs & Welded Compounds (Hele ordet)',
            title_uk: 'Ціле слово: прості дієслова та злиті слова (Hele ordet)',
            title_vi: 'Từ hoàn chỉnh: Động từ đơn giản & từ ghép dính liền (Hele ordet)',
            title_ur: 'مکمل لفظ: آسان فعل اور جڑے ہوئے الفاظ (Hele ordet)',
            title_fa: 'کلمه کامل: فعل‌های آسان و کلمات مرکب به‌هم‌چسبیده (Hele ordet)',
            title_pt: 'A palavra inteira: verbos fáceis e palavras soldadas (Hele ordet)',
            subtitle: 'Hvad ordet gør, sammensatte ord og hvorfor handlinger er så enkle',
            subtitle_zh: '动作词、名字词，以及两个词像电焊一样焊在一起的长词',
            subtitle_ar: 'الفعل البسيط المريح الذي لا يتغير مع الضمائر، والكلمات الملحومة معاً',
            subtitle_en: 'No verb endings for person (spiser for everyone!), but compounds are welded with zero spaces',
            subtitle_uk: 'Дієслово не змінюється за особами (spiser для всіх!), але не забувайте «er» і злиті слова',
            subtitle_vi: 'Động từ không chia theo ngôi (spiser dùng cho tất cả!), nhưng phải có «er» và viết liền từ ghép',
            subtitle_ur: 'فعل مذکر/مؤنث یا واحد/جمع سے نہیں بدلتا (سب کے لیے spiser!) — اور دو الفاظ بغیر فاصلے کے جڑتے ہیں',
            subtitle_fa: 'فعل برای هیچ شخصی عوض نمی‌شود (برای همه spiser!) — و کلمات مرکب بدون فاصله به هم جوش می‌خورند',
            subtitle_pt: 'O verbo nunca muda por pessoa (spiser para todos!) — e compostos são soldados sem espaço',
            subtitle_es: 'El verbo nunca cambia según la persona (¡spiser para todos!) y los compuestos van soldados sin espacios',
            color: '#c084fc',
            widthPct: 65,
            daLine: `jeg / du / han / vi <span class="mss-hl-da">spiser</span> (Præcis samme form til ALLE personer!)`,
            daLine_zh: 'jeg / du / han / vi spiser（不管是“我、你、他、我们”，动作词的样子完全一样，超级省心！）',
            daLine_ar: 'jeg / du / han / vi / de spiser (نفس شكل الفعل تماماً مع كل الضمائر، مريح للغاية!)',
            daLine_en: 'jeg / du / han / vi / de spiser (Exact same verb form for EVERY person!)',
            daLine_uk: 'jeg / du / han / vi / de spiser (Однакова форма дієслова для ВСІХ осіб — на відміну від «я їм / ти їси / він їсть»!)',
            daLine_vi: 'jeg / du / han / vi / de spiser (Cùng MỘT dạng động từ cho MỌI ngôi — cực kỳ nhẹ đầu giống tiếng Việt!)',
            daLine_ur: 'jeg / du / han / vi / de spiser (ہر شخص اور جنس کے لیے بالکل ایک ہی شکل: اردو «کھاتا/کھاتی/کھاتے» کی طرح نہیں بدلتی!)',
            daLine_fa: 'jeg / du / han / vi / de spiser (فقط یک شکل برای همه! برخلاف فارسی: می‌خورم / می‌خوری / می‌خورد / می‌خوریم)',
            daLine_pt: 'jeg / du / han / vi / de spiser (A MESMA forma para todas as pessoas! Bem diferente de «eu como / nós comemos»!)',
            daLine_es: 'jeg / du / han / vi / de spiser (¡LA MISMA forma para todas las personas! Muy distinto de «yo como / nosotros comemos»)',
            myLines: {
                en: `I <span class="mss-hl-my">eat</span> / she <span class="mss-hl-my">eats</span> — English still adds an -s for 3rd person singular ("he eats"). In Danish, present tense verbs are identical for EVERY pronoun (<em>spiser</em> for all!). However: Danish has NO continuous -ing form ("I am eating" is NOT *Jeg er spiser), and Danish welds compound nouns together into single words with zero spaces (<em>rug + brød = rugbrød</em>).`,
                ar: `<span class="mss-hl-my">آكلُ / تأكلُ / يأكلُ / نأكلُ</span> — في العربية يتغير شكل الفعل مع كل ضمير حسب المفرد والمثنى والجمع والمذكر والمؤنث. أما في الدنماركية، فالفعل واحد ولا يتغير أبداً مع أي شخص (spiser للجميع)! لكن تذكر دائماً ألا تنسى الضمير (jeg/vi)، ولا تنسَ فعل الكينونة "er" (قل: Jeg er træt، ولا تقل Jeg træt كما في جملة "أنا متعب").`,
                tr: `<span class="mss-hl-my">yiyorum / yiyorsun / yiyor</span> — Person-endelsen sidder direkte på verbet.`,
                uk: `<span class="mss-hl-my">я їм / ти їси / він їсть / ми їмо</span> — В українській дієслово змінює закінчення для кожної особи. У данській усе набагато легше: <strong>spiser</strong> звучить однаково для всіх! Але пам’ятайте 2 правила: 1) Ніколи не пропускайте дієслово <strong>er</strong> («Я вдома» = <em>Jeg <strong>er</strong> hjemme</em>, а не *Jeg hjemme!); 2) Складні іменники пишуться разом без пробілу (<em>rugbrød</em>).`,
                de: `ich <span class="mss-hl-my">esse</span> / du <span class="mss-hl-my">isst</span> / wir <span class="mss-hl-my">essen</span> — Handlingen ændrer form efter personen.`,
                es: `<span class="mss-hl-my">como / comes / come / comemos</span> — En español el verbo cambia para cada persona (por eso omitimos «yo/nosotros»). En danés hay una noticia fantástica: <strong>spiser</strong> es 100% idéntico para TODAS las personas! Recuerda 3 reglas: 1) Nunca omitas el pronombre (<em>jeg, du, vi</em>); 2) No digas «estoy comiendo» como *Jeg er spiser* (usa solo <em>Jeg spiser</em>); 3) Las palabras compuestas se sueldan sin espacio (<em>rugbrød</em>).`,
                vi: `tôi / bạn / anh ấy <span class="mss-hl-my">ăn</span> — Tin cực vui: giống tiếng Việt, động từ tiếng Đan Mạch KHÔNG đổi theo ngôi (<em>spiser</em> cho mọi người)! Nhưng hãy nhớ 3 khác biệt: 1) Thì hiện tại luôn thêm <strong>-r</strong> (<em>spiser</em>), quá khứ đổi thành <em>spiste</em> (không dùng từ rời như đã/đang); 2) Luôn phải có động từ <strong>er</strong> («Tôi mệt» ➔ <em>Jeg <strong>er</strong> træt</em>, không được thiếu «er»); 3) Từ ghép viết dính liền không dấu cách (<em>rugbrød</em>).`,
                ur: `میں <span class="mss-hl-my">کھاتا ہوں / کھاتی ہوں</span> • ہم <span class="mss-hl-my">کھاتے ہیں</span> — اردو میں فعل شخص، تعداد اور جنس (مذکر/مؤنث) سب کے ساتھ بدلتا ہے! ڈینش میں بڑی آسانی ہے: <strong>spiser</strong> ہر کسی کے لیے بالکل یکساں رہتا ہے! بس دو باتیں یاد رکھیں: 1) ڈینش میں «er» (ہے/ہوں) کبھی مت چھوڑیں، اور «Jeg er spiser» مت کہیں (صرف <em>Jeg spiser</em> کافی ہے)؛ 2) جڑے ہوئے اسم بغیر فاصلے کے اکٹھے لکھے جاتے ہیں (<em>rugbrød</em>)۔`,
                fa: `<span class="mss-hl-my">می‌خورم (-am) / می‌خوری (-i) / می‌خورد (-ad)</span> — در فارسی انتهای فعل برای هر شخص عوض می‌شود و به همین دلیل گاهی «من/تو» را حذف می‌کنیم! در دانمارکی یک خبر عالی است: <strong>spiser</strong> برای همه اشخاص کاملاً یکی است! فقط یادتان باشد: ۱) ضمیر (<em>jeg, du, vi</em>) را هیچ‌وقت حذف نکنید؛ ۲) کلمات مرکب بدون فاصله به هم می‌چسبند (<em>rugbrød</em>).`,
                pt: `<span class="mss-hl-my">eu como / tu comes / nós comemos</span> — Em português o verbo muda para cada pessoa (por isso omitimos «eu/nós» frequentemente). Em dinamarquês há uma ótima notícia: <strong>spiser</strong> é 100% igual para TODAS as pessoas! Atenção a 3 regras: 1) Nunca omita o pronome (<em>jeg, du, vi</em>); 2) Não traduza «estou comendo / a comer» como *Jeg er spiser* (use apenas <em>Jeg spiser</em>); 3) Palavras compostas soldam-se sem espaço (<em>rugbrød</em>).`,
                zh: `我 / 你 / 他 / 我们 <strong>吃 (chī)</strong> — 这一点中文和丹麦语简直是孪生兄弟：不管是谁在做动作，动词的样子从头到尾绝不改变，完全不用记麻烦的“我吃你吃他吃各不同”！`
            },
            myLines_da: {
                en: `Engelsk bøjer verbet i 3. person (he eats); på dansk hedder det spiser for ALLE. Til gengæld mangler dansk den engelske -ing form, og sammensatte ord SKAL svejses sammen uden mellemrum (rugbrød).`,
                zh: `Ligesom på dansk ændrer kinesiske verber sig aldrig efter personen!`,
                ar: `Arabiske verber ændrer form efter person, køn og tal. På dansk hedder det spiser for ALLE. Til gengæld må man aldrig glemme kopulaverbet "er" i nutid (Jeg er træt).`,
                uk: `Ukrainske verber skifter endelse for hver person (їм/їси/їсть); på dansk er <em>spiser</em> ens for ALLE! Husk blot aldrig at udelade <strong>"er"</strong> i nutid ("Я вдома" ➔ Jeg <em>er</em> hjemme) samt at sammensatte ord skrives ud i ét (<em>rugbrød</em>).`,
                vi: `Ligesom på vietnamesisk bøjes danske verber aldrig efter person! Men vietnamesere skal huske: 1) At tiden ligger i selve verbets endelse (nutid <em>-r</em>, datid <em>-te</em>) i stedet for ord som "đã/đang"; 2) Aldrig at glemme "er" foran tillægsord ("Jeg træt" ➔ Jeg <em>er</em> træt); 3) At sammensatte ord skrives ud i ét (<em>rugbrød</em>).`,
                ur: `Urdu bøjer verber efter både person, tal OG køn (کھاتا ہوں / کھاتی ہوں / کھاتے ہیں); på dansk hedder det <em>spiser</em> for ALLE! Pas dog på ikke at lave urdu-oversættelsen "Jeg er spiser" (Jeg er + nutid = forkert) samt at sammensatte ord svejses i ét (<em>rugbrød</em>).`,
                fa: `Persiske verber har personendelser (-am, -i, -ad), så pronominet ofte udelades; på dansk er <em>spiser</em> ens for ALLE, så man SKAL altid have personen (jeg, du, han) med, ligesom han/hun ikke skelnes som "o" (او)! Sammensatte ord skrives i ét (<em>rugbrød</em>).`,
                pt: `Portugisisk bøjer verber efter person og udelader ofte subjektet ("como") samt bruger progressiv ("estou comendo / a comer"); på dansk er <em>spiser</em> ens for ALLE, så subjektet SKAL altid med — og *Jeg er spiser* skal undgås! Sammensatte ord skrives i ét (<em>rugbrød</em>).`,
                es: `Spansk bøjer verber efter person og udelader normalt subjektet ("como") samt bruger progressiv ("estoy comiendo"); på dansk er <em>spiser</em> ens for ALLE, så subjektet SKAL altid med — og *Jeg er spiser* skal undgås! Sammensatte ord skrives i ét (<em>rugbrød</em>).`
            },
            detailExplain: `<strong>Hele ordet:</strong> Her ser vi på det færdige ord og dets rolle (handlinger, navneord mv.). På dansk er handlinger i nutid utroligt venlige: <em>spiser</em> hedder præcis det samme, uanset om det er <em>jeg, du, han, hun, vi, I eller de</em>! Til gengæld skal man altid huske at have personen med (<em>jeg/han/vi</em>). Og så elsker dansk at svejse to ord sammen til ét langt ord uden mellemrum: <em>rug + brød = rugbrød</em>.`,
            detailExplain_zh: `<strong>完整单词与词语分工（Hele ordet）：</strong>在单个完整单词层面，丹麦语动词有一大天大的好消息：<strong>动词绝不随人称发生改变</strong>！无论做动作的是 <em>jeg（我）、du（你）、han（他）</em> 还是 <em>vi（我们）</em>，现在时统统都叫 <em><strong>spiser</strong></em>！但正因如此，丹麦语绝对不能把人称代词省掉。此外，丹麦语极其擅长将两个词无缝焊在一起组成<strong>复合长词</strong>（如 <em>rug + brød = rugbrød</em> 黑麦面包），中间千万别加空格！`,
            detailExplain_ar: `<strong>الكلمة الكاملة وعملها (Hele ordet):</strong> هنا ننظر إلى الكلمة كوحدة تامة. في الدنماركية، الأفعال في الحاضر هدية رائعة للمتعلم: الفعل <em><strong>spiser</strong></em> يحتفظ بنفس الحروف ونفس النطق تماماً سواء كان الفاعل <em>jeg (أنا)، du (أنت)، han (هو)، vi (نحن)</em> أو <em>de (هم)</em>! لا يوجد تصريف حسب المذكر والمؤنث أو المفرد والجمع في الفعل.<br><br>
لكن هناك قاعدتان ذهبيتان:<br>
1) لأن الفعل لا يتغير، لا يمكنك حذف الضمير؛ يجب أن تذكر دائماً الفاعل (<em>jeg</em>, <em>vi</em> إلخ).<br>
2) لا توجد في الدنماركية جملة اسمية بدون فعل! في العربية نقول ببساطة: "أنا جائع" أو "الطقس جميل"؛ في الدنماركية إياك أن تنسى فعل الكينونة (<strong>er</strong>): <em>Jeg <strong>er</strong> sulten</em> و <em>Vejret <strong>er</strong> godt</em>.<br><br>
وأخيراً، الدنماركية تعشق لحام الكلمات معاً في كلمة واحدة طويلة بدون مسافة: <em>rug + brød = rugbrød</em> (خبز الجاودار).`,
            detailExplain_en: `<strong>The Whole Word (Hele ordet):</strong> Looking at the completed word. In Danish, present tense verbs are a wonderful relief: <em><strong>spiser</strong></em> stays 100% identical whether the subject is <em>jeg</em> (I), <em>du</em> (you), <em>han</em> (he), <em>hun</em> (she), <em>vi</em> (we), <em>I</em> (you all), or <em>de</em> (they)! There is no "-s" ending for he/she.<br><br>⚠️ <strong>Two Vital Traps for English Speakers:</strong><br>1) <strong>No "-ing" form:</strong> English speakers often translate "I am eating" word-for-word into *\*Jeg er spiser*. This is completely ungrammatical in Danish! Simply say: <em>"Jeg spiser brød"</em> (or <em>"Jeg sidder og spiser brød"</em> if you want to stress the ongoing activity).<br>2) <strong>Welded Compound Words:</strong> English writes compound nouns as separate words: <em>rye bread, bus stop, kitchen table</em>. Danish welds them tightly together with no spaces: <em>rugbrød, busstoppested, køkkenbord</em>. Splitting words with a space often changes the meaning completely!`,
            detailExplain_uk: `<strong>Ціле слово (Hele ordet):</strong> У данській мові дієслова в теперішньому часі дуже прості: слово <em><strong>spiser</strong></em> абсолютно однакове для <em>jeg, du, han, hun, vi, I, de</em> (немає закінчень на кшталт <em>їм / їси / їсть / їмо</em>)!<br><br>⚠️ <strong>Дві типові помилки українців:</strong><br>1) <strong>Дієслово «er» (є) — обов’язкове!</strong> В українській у теперішньому часі «є» зазвичай опускають: <em>«Я вдома», «Вона втомлена»</em>. У данській без дієслова речення неможливе: завжди кажіть <em>Jeg <strong>er</strong> hjemme</em>, <em>Hun <strong>er</strong> træt</em>!<br>2) <strong>Складні слова пишуться разом без пробілу:</strong> <em>rug + brød = rugbrød</em> (житній хліб), <em>køkken + bord = køkkenbord</em> (кухонний стіл).`,
            detailExplain_vi: `<strong>Từ hoàn chỉnh (Hele ordet):</strong> Về mặt chia động từ theo ngôi, tiếng Đan Mạch rất giống tiếng Việt: từ <em><strong>spiser</strong></em> giữ nguyên 100% cho mọi đại từ <em>jeg, du, han, hun, vi, I, de</em>!<br><br>⚠️ <strong>3 lưu ý quan trọng cho người Việt:</strong><br>1) <strong>Thời gian nằm ở đuôi động từ:</strong> Tiếng Việt dùng từ rời (<em>đã, đang, sẽ</em>), còn tiếng Đan Mạch đổi đuôi động từ: hiện tại có <strong>-r</strong> (<em>spiser</em>), quá khứ đổi thành <em>spiste</em>.<br>2) <strong>Không được thiếu «er» trước tính từ:</strong> Tiếng Việt nói trực tiếp «Tôi mệt», «Cô ấy đói». Trong tiếng Đan Mạch bắt buộc phải có <strong>er</strong> (thì/là): <em>Jeg <strong>er</strong> træt</em>, <em>Hun <strong>er</strong> sulten</em>!<br>3) <strong>Từ ghép viết liền không dấu cách:</strong> Tiếng Việt tách chữ (<em>bánh mì, bàn ăn</em>), nhưng tiếng Đan Mạch hàn hai danh từ lại không dấu cách: <em>rug + brød = rugbrød</em>, <em>køkken + bord = køkkenbord</em>.`,
            detailExplain_ur: `<strong>مکمل لفظ (Hele ordet):</strong> ڈینش فعل اردو بولنے والوں کے لیے بہت بڑی خوشخبری ہے! اردو میں فعل مذکر، مؤنث اور جمع سب کے مطابق بدلتا ہے (<em>کھاتا ہوں / کھاتی ہوں / کھاتے ہیں</em>)، لیکن ڈینش میں <em><strong>spiser</strong></em> ہر کسی (<em>jeg, du, han, hun, vi, de</em>) کے لیے 100% ایک جیسا رہتا ہے!<br><br>⚠️ <strong>دو اہم احتیاطیں:</strong><br>1) اردو کے «کھاتا ہوں» کا لفظی ترجمہ *\*Jeg er spiser* ہرگز نہ کریں — صرف <em>Jeg spiser</em> کہیں! (البتہ صفت کے ساتھ <strong>er</strong> ضروری ہے: <em>Jeg <strong>er</strong> træt</em>)۔<br>2) ڈینش میں دو اسم بغیر خالی جگہ کے جڑ کر ایک لفظ بنتے ہیں: <em>rug + brød = rugbrød</em>، <em>køkken + bord = køkkenbord</em>۔`,
            detailExplain_fa: `<strong>کلمه کامل (Hele ordet):</strong> فعل‌های زمان حال در دانمارکی یک هدیه بزرگ برای فارسی‌زبانان هستند! در فارسی فعل با شخص عوض می‌شود (<em>می‌خورم، می‌خوری، می‌خورد، می‌خوریم</em>)، اما در دانمارکی کلمه <em><strong>spiser</strong></em> برای همه یکسان می‌ماند!<br><br>⚠️ <strong>۳ نکته مهم برای فارسی‌زبانان:</strong><br>۱) چون فعل عوض نمی‌شود، <strong>هرگز فاعل (jeg, du, vi) را حذف نکنید</strong> (و بین <em>han</em> «او آقا» و <em>hun</em> «او خانم» فرق بگذارید).<br>۲) برای «در حالِ ... هستم» نگویید *\*Jeg er spiser*! فقط <em>Jeg spiser</em> کافی است (البته برای صفت، فعل <strong>er</strong> لازم است: <em>Jeg <strong>er</strong> træt</em>).<br>۳) اسم‌های مرکب بدون فاصله به هم می‌چسبند: <em>rug + brød = rugbrød</em>، <em>køkken + bord = køkkenbord</em>.`,
            detailExplain_pt: `<strong>A palavra inteira (Hele ordet):</strong> Os verbos dinamarqueses no presente são um grande alívio para falantes de português! Enquanto em português conjugamos cada pessoa (<em>como, comes, come, comemos, comem</em>), em dinamarquês a forma <em><strong>spiser</strong></em> é 100% idêntica para TODAS as pessoas (<em>jeg, du, han, hun, vi, I, de</em>)!<br><br>⚠️ <strong>3 armadilhas importantes para lusófonos:</strong><br>1) <strong>Nunca omita o sujeito:</strong> Como o verbo não mostra a pessoa, é obrigatório dizer sempre <em>jeg, du, vi</em> (nunca diga apenas *<em>Spiser brød</em>*).<br>2) <strong>Sem forma progressiva com «er»:</strong> Nunca traduza «estou a comer / estou comendo» como *\*Jeg er spiser*! Em dinamarquês basta dizer <em>Jeg spiser</em> (ou <em>Jeg sidder og spiser</em> para enfatizar o momento).<br>3) <strong>Palavras compostas soldadas:</strong> Em português escrevemos «pão de centeio» ou «mesa de cozinha» separados; em dinamarquês soldam-se sem espaço: <em>rug + brød = rugbrød</em>, <em>køkken + bord = køkkenbord</em>.`,
            detailExplain_es: `<strong>La palabra entera (Hele ordet):</strong> ¡Los verbos en presente en danés son un enorme alivio para hispanohablantes! Mientras en español conjugamos cada persona (<em>como, comes, come, comemos, comen</em>), en danés la forma <em><strong>spiser</strong></em> es 100% igual para TODAS las personas (<em>jeg, du, han, hun, vi, I, de</em>)!<br><br>⚠️ <strong>3 trampas clave para hispanohablantes:</strong><br>1) <strong>Nunca omitas el sujeto:</strong> Como el verbo no muestra la persona, es obligatorio incluir siempre <em>jeg, du, vi</em> (jamás digas solo *<em>Spiser brød</em>*).<br>2) <strong>Sin forma progresiva con «er»:</strong> Nunca traduzcas «estoy comiendo» como *\*Jeg er spiser*! En danés basta decir <em>Jeg spiser</em> (o <em>Jeg sidder og spiser</em> para marcar el momento).<br>3) <strong>Palabras compuestas soldadas:</strong> En español decimos «pan de centeno» o «mesa de cocina» separados; en danés se sueldan sin espacio: <em>rug + brød = rugbrød</em>, <em>køkken + bord = køkkenbord</em>.`,
            morePairs: [
                { da: 'rug + brød = rugbrød (ét sammensat ord)', note: 'Dansk limer ord sammen uden mellemrum – med mellemrum betyder det noget helt andet!', note_zh: '丹麦语极其喜欢把两个词紧紧焊接在一起，中间绝不留空格！', note_ar: 'الدنماركية تلحم كلمتين معاً كالقطعة الواحدة بدون فراغ: rugbrød (خبز أسمر). وضع مسافة يغير المعنى تماماً!', note_en: 'Danish glues compound nouns together without spaces — adding a space changes the meaning or creates an error!', note_uk: 'Данська «зварює» два іменники в одне слово без пробілу: rugbrød, køkkenbord!', note_vi: 'Tiếng Đan Mạch hàn các danh từ ghép lại liền nhau không dấu cách: rugbrød, køkkenbord (khác với cách tách âm tiết tiếng Việt).', note_ur: 'ڈینش میں دو اسم بغیر فاصلے کے جڑ کر ایک لفظ بن جاتے ہیں: rugbrød، køkkenbord!', note_fa: 'در دانمارکی دو اسم بدون فاصله به هم جوش می‌خورند: rugbrød، køkkenbord (نه با فاصله)!', note_pt: 'O dinamarquês solda dois substantivos sem espaço nem «de»: rugbrød, køkkenbord!', note_es: '¡El danés suelda dos sustantivos sin espacios ni «de»: rugbrød, køkkenbord!' },
                { da: 'spiser (nutid) ↔ spiste (datid) ↔ har spist (førnutid)', note: 'Kun tiden ændrer verbets form — aldrig hvem der gør det.', note_zh: '只有时间（现在还是过去）会改变动词样子，谁来做动作绝不影响它！', note_ar: 'الزمن فقط هو ما يغير الفعل (spiser في الحاضر، spiste في الماضي)، وليس من قام بالفعل.', note_en: 'Only tense (present, past) changes the verb — never the person who performs the action.', note_uk: 'Лише час змінює форму дієслова (spiser / spiste), але ніколи не особа! І не забувайте про «er» у теперішньому часі.', note_vi: 'Chỉ thì của động từ mới làm từ đổi dạng (spiser / spiste), người thực hiện không bao giờ làm đổi dạng! Và nhớ luôn dùng «er» trước tính từ.', note_ur: 'صرف زمانہ (حال/ماضی) فعل کو بدلتا ہے، کرنے والے کی جنس یا تعداد نہیں!', note_fa: 'فقط زمان (حال/گذشته) شکل فعل را تغییر می‌دهد — نه اینکه چه کسی کار را انجام می‌دهد!', note_pt: 'Só o tempo verbal muda o verbo (spiser / spiste), nunca a pessoa! E nunca use «er» antes de outro verbo no presente.', note_es: 'Solo el tiempo verbal cambia el verbo (spiser / spiste), nunca la persona! Y no uses «er» delante de otro verbo en presente.' }
            ],
            links: [
                { label: '⚡ Verbernes tider', label_zh: '⚡ 动词时态规律 (Verbernes tider)', label_ar: '⚡ أزمنة الأفعال وقواعدها (Verbernes tider)', label_en: '⚡ Verb tenses & patterns (Verber)', label_uk: '⚡ Часи дієслів (Verbernes tider)', label_vi: '⚡ Các thì của động từ (Verbernes tider)', label_ur: '⚡ فعل کے زمانے (Verbernes tider)', label_fa: '⚡ زمان‌های فعل (Verbernes tider)', label_pt: '⚡ Tempos verbais (Verbernes tider)', label_es: '⚡ Tiempos verbales (Verbernes tider)', route: 'verber_grammatik' },
                { label: '🏃 Top 100 Verber', label_zh: '🏃 常用前100个动词 (Top 100 Verber)', label_ar: '🏃 أهم 100 فعل في الدنماركية (Top 100 Verber)', label_en: '🏃 Top 100 Danish Verbs (Verber)', label_uk: '🏃 Топ-100 дієслів (Top 100 Verber)', label_vi: '🏃 Top 100 Động từ Đan Mạch (Top 100 Verber)', label_ur: '🏃 ڈینش کے 100 اہم افعال (Top 100 Verber)', label_fa: '🏃 ۱۰۰ فعل پرکاربرد دانمارکی (Top 100 Verber)', label_pt: '🏃 Top 100 Verbos Dinamarqueses (Verber)', label_es: '🏃 Top 100 Verbos Daneses (Verber)', route: 'top100_verber' },
                { label: '📦 Top 100 Substantiver', label_zh: '📦 常用前100个名词 (Top 100 Substantiver)', label_ar: '📦 أهم 100 اسم في الدنماركية (Top 100 Substantiver)', label_en: '📦 Top 100 Danish Nouns (Substantiver)', label_uk: '📦 Топ-100 іменників (Top 100 Substantiver)', label_vi: '📦 Top 100 Danh từ (Top 100 Substantiver)', label_ur: '📦 ڈینش کے 100 اہم اسم (Substantiver)', label_fa: '📦 ۱۰۰ اسم پرکاربرد دانمارکی (Substantiver)', label_pt: '📦 Top 100 Substantivos (Substantiver)', label_es: '📦 Top 100 Sustantivos (Substantiver)', route: 'top100_substantiver' }
            ]
        },
        {
            num: 6,
            title: 'Ordgruppen',
            title_zh: '紧紧抱团的词语小模块 (Ordgruppen)',
            title_ar: 'المكعب المتماسك من الكلمات (Ordgruppen)',
            title_en: 'Word Bundles & The Adjective Jump (Ordgruppen)',
            title_uk: 'Групи слів і «стрибок артикля» (Ordgruppen)',
            title_vi: 'Cụm từ & bước nhảy mạo từ (Ordgruppen)',
            title_ur: 'الفاظ کا مجموعہ اور آرٹیکل کی چھلانگ (Ordgruppen)',
            title_fa: 'گروه کلمات و پرشِ حرفِ تعریف (Ordgruppen)',
            title_pt: 'Grupos de palavras e o salto do artigo (Ordgruppen)',
            title_es: 'Grupos de palabras y el salto del artículo (Ordgruppen)',
            subtitle: 'Flere ord der hører sammen og flytter som én samlet kasse (f.eks. "i køkkenet", "i dag")',
            subtitle_zh: '在句子里共同进退的小方块（在厨房里 / 在那个大厨房里）',
            subtitle_ar: 'كلمات تسير معاً كصندوق واحد، وحركة الوصف السحرية ("في المطبخ الكبير")',
            subtitle_en: 'Words moving together as a fixed box, and how adding an adjective makes the definite tail jump out front',
            subtitle_uk: 'Слова, що рухаються єдиним блоком, та стрибок артикля det перед прикметником',
            subtitle_vi: 'Các từ đi chung thành một khối và mẹo đuôi -et nhảy ra trước thành «det» khi có tính từ',
            subtitle_ur: 'الفاظ کا وہ جوڑ جو ایک ڈبے کی طرح ساتھ چلتا ہے اور صفت آنے پر -et کی جگہ آگے «det» آ جانا',
            subtitle_fa: 'کلماتی که مثل یک جعبه با هم حرکت می‌کنند و وقتی صفت می‌آید، پسوند -et به جلو می‌پرد (det store køkken)',
            subtitle_pt: 'Palavras que viajam juntas num bloco e por que o sufixo -et salta para a frente como «det» com um adjetivo',
            subtitle_es: 'Palabras que viajan juntas en bloque y por qué el sufijo -et salta delante como «det» con un adjetivo',
            color: '#f472b6',
            widthPct: 72,
            daLine: `<span class="mss-hl-da">i det store køkken</span> (Forholdsord + det + tillægsord-e + navneord)`,
            daLine_zh: 'i det store køkken（小词 i + 蹦到前面的 det + 形容词拖着 -e + 名词）',
            daLine_ar: 'i det store køkken (الصفة تقف أمام الاسم، وذيل التعريف يقفز للأمام ككلمة det مستقلة)',
            daLine_en: 'i det store køkken (preposition + det + adjective-e + noun)',
            daLine_uk: 'i det store køkken (прийменник + det попереду + прикметник на -e + іменник)',
            daLine_vi: 'i det store køkken (giới từ + det ở trước + tính từ đuôi -e + danh từ)',
            daLine_ur: 'i det store køkken (حرفِ جار i آگے + det + صفت پر -e + اسم — اردو «میں» پیچھے نہیں لگتا!)',
            daLine_fa: 'i det store køkken (حرف اضافه i + det + صفت با -e + اسم — برخلاف فارسی که صفت بعد از اسم می‌آید!)',
            daLine_pt: 'i det store køkken (preposição i + det na frente + adjetivo com -e + substantivo — ao contrário de «na cozinha grande»!)',
            daLine_es: 'i det store køkken (preposición i + det delante + adjetivo con -e + sustantivo — al revés de «en la cocina grande»)',
            myLines: {
                en: `<span class="mss-hl-my">in the big kitchen</span> — Same word order as English, but in Danish the definite tail (-et) gets startled by the adjective, jumps out front as an independent word "<strong>det</strong>", and the adjective gets an <strong>-e</strong> ending: <em>køkkenet ➔ det store køkken</em>!`,
                ar: `<span class="mss-hl-my">في المطبخِ الكبيرِ (fī al-matbakh al-kabīr)</span> — في العربية الصفة تأتي <em>بعد</em> الاسم ("المطبخ الكبير"). أما في الدنماركية، فالصفة تقف دائماً <em>أمام</em> الاسم، وذيل التعريف (-et) يقفز فجأة إلى الأمام ليتحول إلى <strong>det</strong> مستقل مع إضافة -e للصفة: <em>det store køkken</em>!`,
                tr: `<span class="mss-hl-my">büyük mutfak-ta</span> — Tillægsordet står forrest, men "i" (-ta) sidder allerbagest som endelse.`,
                uk: `<span class="mss-hl-my">у великій кухні</span> — В українській прикметник також стоїть перед іменником, але має відмінкові закінчення. У данській немає відмінків: натомість «хвостик» <em>-et</em> (у <em>køkkenet</em>) під впливом прикметника перестрибує на початок як самостійне слово <strong>det</strong>, а прикметник отримує <strong>-e</strong>: <em>det stor<strong>e</strong> køkken</em>!`,
                de: `<span class="mss-hl-my">in der großen Küche</span> — Tillægsordet står foran navneordet med egen bøjningshale.`,
                es: `<span class="mss-hl-my">en la cocina grande</span> — En español el adjetivo suele ir DESPUÉS del sustantivo («cocina grande»). En danés el adjetivo va SIEMPRE ANTES, y al añadir un adjetivo, la cola <em>-et</em> salta delante como palabra aparte <strong>det</strong> + <strong>-e</strong> en el adjetivo: <em>i <strong>det</strong> stor<strong>e</strong> køkken</em>!`,
                vi: `<span class="mss-hl-my">trong nhà bếp lớn</span> — Trong tiếng Việt tính từ <em>lớn</em> đứng SAU danh từ (nhà bếp lớn). Trong tiếng Đan Mạch tính từ phải đứng TRƯỚC danh từ, và đuôi <em>-et</em> nhảy ra đầu thành chữ <strong>det</strong> kèm đuôi <strong>-e</strong> ở tính từ: <em><strong>det</strong> stor<strong>e</strong> køkken</em>!`,
                ur: `<span class="mss-hl-my">بڑے باورچی خانے میں</span> — اردو میں صفت (بڑے) تو اسم سے پہلے آتی ہے مگر «میں» (i) ہمیشہ سب سے پیچھے آتا ہے! ڈینش میں <strong>i</strong> آگے آتا ہے، اور صفت لگتے ہی پیچھے والی دُم <em>-et</em> چھلانگ لگا کر آگے <strong>det</strong> بن جاتی ہے اور صفت پر <strong>-e</strong> لگتا ہے: <em>i <strong>det</strong> stor<strong>e</strong> køkken</em>!`,
                fa: `<span class="mss-hl-my">در آشپزخانهٔ بزرگ (dar âshpazkhâneh-ye bozorg)</span> — در فارسی صفت همیشه <em>بعد از</em> اسم می‌آید و با کسره (ـِ) وصل می‌شود («آشپزخانهٔ بزرگ»)! در دانمارکی دقیقاً برعکس است: صفت <em>قبل از</em> اسم می‌نشیند و وقتی صفت اضافه شود، پسوند <em>-et</em> به جلو می‌پرد و به صورت <strong>det</strong> ظاهر می‌شود: <em>i <strong>det</strong> stor<strong>e</strong> køkken</em>!`,
                pt: `<span class="mss-hl-my">na cozinha grande</span> — Em português o adjetivo costuma vir DEPOIS do substantivo («cozinha grande»). Em dinamarquês o adjetivo vem SEMPRE ANTES do substantivo, e quando aparece um adjetivo, a cauda <em>-et</em> salta para a frente como <strong>det</strong> + <strong>-e</strong> no adjetivo: <em>i <strong>det</strong> stor<strong>e</strong> køkken</em>!`,
                zh: `<span class="mss-hl-my">在大厨房里</span> — 汉语说“在大厨房里”，形容词“大”直接放在“厨房”前面；但在丹麦语里，只要在厨房前加了形容词，原本粘在屁股后面的小尾巴 -et 就会立刻受到惊吓，蹦到最前面变成独立的 <strong>det</strong>，而且形容词屁股必须加上一个小 -e：<em><strong>det</strong> stor<strong>e</strong> køkken</em>！`
            },
            myLines_da: {
                en: `Engelsk har samme rækkefølge som dansk (in the big kitchen), men ændrer ikke artikelform. På dansk hopper bestemtheden frem som en selvstændig artikel (køkkenet ➔ det store køkken) og adjektivet får -e.`,
                zh: `Kinesisk sætter sted og tid foran handlingen, og lader tillægsordet stå direkte ved navneordet uden at flytte rundt på artikler.`,
                ar: `Arabisk sætter tillægsordet bag efter navneordet ("køkkenet det store"). På dansk står det foran, og bestemtheden hopper ud foran som "det" (det store køkken).`,
                uk: `Ukrainsk bøjer "i stort køkken" med kasusendelser (у великій кухні). På dansk er rækkefølgen ens, men bestemtheden hopper ud foran som <strong>det</strong> og giver tillægsordet <strong>-e</strong> (<em>det store køkken</em>).`,
                vi: `Vietnamesisk sætter tillægsordet EFTER navneordet ("nhà bếp lớn" = køkken stor). På dansk står det FORAN, og endelsen <em>-et</em> hopper frem som <strong>det</strong> + <strong>-e</strong> på tillægsordet (<em>det store køkken</em>).`,
                ur: `Urdu sætter tillægsord foran ligesom dansk, men bruger postpositionen <em>میں</em> bagest ("store køkken i"). Dansk sætter forholdsordet <em>i</em> forrest og lader <em>-et</em> hoppe frem som <strong>det</strong> (<em>i det store køkken</em>).`,
                fa: `Farsi sætter tillægsordet EFTER navneordet bundet med ezafe (-e): "âshpazkhâneh-ye bozorg" (køkken-e stor). Dansk sætter tillægsordet FORAN og lader bestemtheden (-et) hoppe ud som <strong>det</strong> (<em>det store køkken</em>).`,
                pt: `Portugisisk sætter normalt tillægsordet EFTER navneordet ("na cozinha grande"). Dansk sætter det FORAN og lader bestemtheden (-et) hoppe ud foran som <strong>det</strong> + <strong>-e</strong> på tillægsordet (<em>i det store køkken</em>).`,
                es: `Spansk sætter normalt tillægsordet EFTER navneordet ("en la cocina grande"). Dansk sætter det FORAN og lader bestemtheden (-et) hoppe ud foran som <strong>det</strong> + <strong>-e</strong> på tillægsordet (<em>i det store køkken</em>).`
            },
            detailExplain: `<strong>Ordgruppen (byggeblokken):</strong> En lille gruppe ord, der holder hinanden i hånden og flytter rundt som én samlet kasse i sætningen: f.eks. <em>frisk brød</em>, <em>i køkkenet</em> eller <em>i det store køkken</em>. Bemærk tricket på dansk: Så snart du sætter et tillægsord (f.eks. <em>store</em>) foran køkkenet, hopper den lille hale <em>-et</em> ud og stiller sig helt foran som <strong>det</strong>: <em><strong>det</strong> stor<strong>e</strong> køkken</em>!`,
            detailExplain_zh: `<strong>抱团的词组小积木（Ordgruppen）：</strong>好几个词紧紧抱在一起，在句子里像一个固定箱子一样一起移动（比如 <em>i køkkenet</em> 在厨房里）。丹麦语这里有一个非常顽皮的规则：如果光说厨房，尾巴是粘在后面的（<em>køkken<strong>et</strong></em>）；但只要中间塞进一个形容词（比如大 store），后面的尾巴就会立刻像弹簧一样蹦到最前面变成 <strong>det</strong>，形容词后面还要跟一个 -e：<em><strong>det</strong> stor<strong>e</strong> køkken</em>！`,
            detailExplain_ar: `<strong>المكعب المتماسك من الكلمات (Ordgruppen):</strong> مجموعة كلمات مترابطة تتحرك في الجملة ككتلة واحدة مثل: <em>i køkkenet</em> (في المطبخ) أو <em>i det store køkken</em> (في المطبخ الكبير).<br><br>
لاحظ الحيلة الدنماركية الشهيرة: عندما تقول "المطبخ" بمفرده، يلتصق الذيل في آخره (<em>køkken<strong>et</strong></em>). لكن بمجرد أن تضع صفة مثل "الكبير" (<em>store</em>) أمامه، يقفز هذا الذيل فوراً إلى الأمام ليصبح كلمة مستقلة <strong>det</strong>، وتأخذ الصفة نهاية <strong>-e</strong>: <em><strong>det</strong> stor<strong>e</strong> køkken</em>! وتذكر دائماً أن الصفة تسبق الاسم، على عكس الترتيب العربي المعتاد.`,
            detailExplain_en: `<strong>Word Bundles (Ordgruppen):</strong> Words group together into tight bundles that travel as a single box in the sentence (e.g., <em>[i køkkenet]</em>, <em>[i dag]</em>).<br><br>Notice the famous Danish <strong>"Article Jump"</strong>:<br>• When talking about "the kitchen" alone, the tail sits at the back: <em>køkken<strong>et</strong></em>.<br>• But as soon as you insert an adjective like "big" (<em>stor</em>), the tail jumps all the way to the front as an independent word <strong>det</strong>, and the adjective takes an <strong>-e</strong> ending: <em><strong>det</strong> stor<strong>e</strong> køkken</em>!<br>(For "en"-words: <em>en bil ➔ bilen ➔ <strong>den</strong> stor<strong>e</strong> bil</em>).`,
            detailExplain_uk: `<strong>Група слів (Ordgruppen):</strong> Слова об’єднуються в єдиний «контейнер», який не розривається в реченні (наприклад, <em>[i køkkenet]</em>, <em>[i dag]</em>). В українській після «у» змінюються закінчення (<em>у великій кухні</em>), а в данській діє знаменитий <strong>«стрибок артикля»</strong>:<br><br>• Без прикметника: «хвостик» <em>-et</em> сидить ззаду: <em>køkken<strong>et</strong></em>.<br>• Щойно з’являється прикметник (<em>stor</em>): «хвостик» стрибає вперед як самостійне слово <strong>det</strong> (або <strong>den</strong> для en-слів), а прикметник бере закінчення <strong>-e</strong>: <em><strong>det</strong> stor<strong>e</strong> køkken</em>!`,
            detailExplain_vi: `<strong>Cụm từ cố định (Ordgruppen):</strong> Trong tiếng Việt, ta đặt tính từ SAU danh từ: <em>nhà bếp lớn</em>, <em>bánh mì tươi</em>. Trong tiếng Đan Mạch hoàn toàn ngược lại — tính từ luôn đứng TRƯỚC danh từ, và xảy ra quy tắc <strong>«bước nhảy mạo từ»</strong> rất thú vị:<br><br>• Khi chỉ nói «nhà bếp đó»: đuôi <em>-et</em> nằm ở cuối: <em>køkken<strong>et</strong></em>.<br>• Ngay khi thêm tính từ (<em>stor</em> = lớn): đuôi <em>-et</em> bật nhảy lên phía trước thành từ đứng riêng <strong>det</strong> (hoặc <strong>den</strong> cho từ nhóm en), đồng thời tính từ thêm <strong>-e</strong>: <em><strong>det</strong> stor<strong>e</strong> køkken</em>!`,
            detailExplain_ur: `<strong>الفاظ کا مجموعہ (Ordgruppen):</strong> یہ الفاظ ایک مضبوط ڈبے کی طرح جملے میں ساتھ چلتے ہیں (مثلاً <em>[i køkkenet]</em>، <em>[i dag]</em>)۔ اردو میں «میں، پر، سے» اسم کے بعد آتے ہیں (<em>بڑے باورچی خانے <strong>میں</strong></em>)، جبکہ ڈینش میں <strong>i</strong> شروع میں آتا ہے اور صفت لگتے ہی ڈینش کا مشہور <strong>«آرٹیکل جمپ»</strong> ہوتا ہے:<br><br>• بغیر صفت کے: دُم آخر میں ہوتی ہے: <em>køkken<strong>et</strong></em>۔<br>• جیسے ہی صفت (<em>stor</em>) سامنے آتی ہے: آخر والی دُم <em>-et</em> چھلانگ لگا کر آگے الگ لفظ <strong>det</strong> (یا <strong>den</strong>) بن جاتی ہے اور صفت پر <strong>-e</strong> لگتا ہے: <em>i <strong>det</strong> stor<strong>e</strong> køkken</em>!`,
            detailExplain_fa: `<strong>گروه کلمات (Ordgruppen):</strong> کلماتی که دست هم را می‌گیرند و مثل یک جعبه با هم حرکت می‌کنند (مثل <em>[i køkkenet]</em>، <em>[i dag]</em>). در فارسی صفت همیشه <em>بعد از</em> اسم می‌آید و با کسره اضافه به آن وصل می‌شود (<em>آشپزخانهٔ بزرگ</em>)، اما در دانمارکی صفت <em>قبل از</em> اسم می‌آید و قانون معروف <strong>«پرشِ حرفِ تعریف»</strong> رخ می‌دهد:<br><br>• بدون صفت: پسوند <em>-et</em> در انتهاست: <em>køkken<strong>et</strong></em>.<br>• همین که صفت (<em>stor</em>) بیاید: پسوند <em>-et</em> می‌پرد جلو و تبدیل به کلمه مستقل <strong>det</strong> (یا <strong>den</strong>) می‌شود و صفت <strong>-e</strong> می‌گیرد: <em>i <strong>det</strong> stor<strong>e</strong> køkken</em>!`,
            detailExplain_pt: `<strong>Grupos de palavras (Ordgruppen):</strong> Palavras que andam juntas como um bloco único na frase (ex.: <em>[i køkkenet]</em>, <em>[i dag]</em>). Em português, dizemos «na cozinha grande» (substantivo antes do adjetivo). Em dinamarquês, o adjetivo vem SEMPRE antes e acontece o famoso <strong>«salto do artigo»</strong>:<br><br>• Sem adjetivo: a cauda <em>-et</em> fica atrás: <em>køkken<strong>et</strong></em>.<br>• Quando entra um adjetivo (<em>stor</em>): a cauda <em>-et</em> salta para a frente como palavra independente <strong>det</strong> (ou <strong>den</strong> para palavras-en) e o adjetivo ganha <strong>-e</strong>: <em>i <strong>det</strong> stor<strong>e</strong> køkken</em>!`,
            detailExplain_es: `<strong>Grupos de palabras (Ordgruppen):</strong> Palabras que viajan juntas como una caja fija en la frase (ej.: <em>[i køkkenet]</em>, <em>[i dag]</em>). En español decimos «en la cocina grande» (sustantivo antes que adjetivo). En danés, el adjetivo va SIEMPRE delante y ocurre el famoso <strong>«salto del artículo»</strong>:<br><br>• Sin adjetivo: la cola <em>-et</em> va atrás: <em>køkken<strong>et</strong></em>.<br>• Al añadir un adjetivo (<em>stor</em>): la cola <em>-et</em> salta hacia delante como palabra independiente <strong>det</strong> (o <strong>den</strong> para palabras-en) y el adjetivo recibe <strong>-e</strong>: <em>i <strong>det</strong> stor<strong>e</strong> køkken</em>!`,
            morePairs: [
                { da: 'køkken-et (uden tillægsord) ➔ det store køkken (med tillægsord)', note: 'Endelsen -et flytter frem foran tillægsordet som et selvstændigt "det".', note_zh: '原本在后面的尾巴 -et，一碰到形容词就立刻蹦到前面变成独立的 det！', note_ar: 'køkkenet (بدون صفة، الذيل بالخلف) ➔ det store køkken (مع صفة، التعريف يقفز للأمام).', note_en: 'The ending -et jumps out front as an independent "det" when an adjective steps in.', note_uk: 'Хвостик -et перестрибує наперед перед прикметником у вигляді самостійного «det»!', note_vi: 'Đuôi -et từ cuối từ nhảy ra đứng trước tính từ thành «det» và tính từ thêm -e (det store køkken)!', note_ur: 'صفت کے آنے پر آخر والا -et چھلانگ لگا کر آگے «det» بن جاتا ہے اور صفت پر -e لگتا ہے!', note_fa: 'وقتی صفت می‌آید، پسوند -et از آخر به جلو می‌پرد و به «det» تبدیل می‌شود و صفت -e می‌گیرد (det store køkken)!', note_pt: 'Com adjetivo, o sufixo -et salta para a frente como «det» e o adjetivo recebe -e (det store køkken)!', note_es: 'Con un adjetivo, el sufijo -et salta hacia delante como «det» y el adjetivo recibe -e (det store køkken)!' },
                { da: '[i køkkenet] = én samlet steds-kasse', note: 'Hele ordgruppen flytter samlet rundt i sætningen uden at skilles ad.', note_zh: '“在厨房里”是一整块紧抱的积木，在句子里移动时谁也不能拆散它。', note_ar: 'عبارة [i køkkenet] كتلة مكانية واحدة؛ تتحرك معاً ولا يمكن تفريق كلماتها في الجملة.', note_en: 'The whole prepositional phrase travels as a single indivisible block in the sentence.', note_uk: 'Уся конструкція [i køkkenet] переноситься разом як неподільний блок.', note_vi: 'Cả cụm từ [i køkkenet] di chuyển cùng nhau như một khối thống nhất.', note_ur: 'پورا گروہ [i køkkenet] جملے میں ایک ساتھ منتقل ہوتا ہے (اور i ہمیشہ آگے رہتا ہے، اردو «میں» کی طرح پیچھے نہیں)۔', note_fa: 'کل عبارت [i køkkenet] مثل یک بسته واحد در جمله جابه‌جا می‌شود و از هم جدا نمی‌شود.', note_pt: 'O bloco inteiro [i køkkenet] move-se junto pela frase sem se separar.', note_es: 'El bloque entero [i køkkenet] se mueve unido por la frase sin separarse.' }
            ],
            links: [
                { label: '🎨 Adjektiver & bøjning', label_zh: '🎨 形容词变尾规则 (Adjektiver)', label_ar: '🎨 الصفات وقواعد تصريفها (Adjektiver)', label_en: '🎨 Adjectives & endings (Adjektiver)', label_uk: '🎨 Прикметники й закінчення (Adjektiver)', label_vi: '🎨 Tính từ & cách chia đuôi (Adjektiver)', label_ur: '🎨 صفات اور ان کی بناوٹ (Adjektiver)', label_fa: '🎨 صفت‌ها و صرف آن‌ها (Adjektiver)', label_pt: '🎨 Adjetivos e flexão (Adjektiver)', label_es: '🎨 Adjetivos y flexión (Adjektiver)', route: 'top100_adjektiver' },
                { label: '🏷️ Bestemthed foran ord', label_zh: '🏷️ “这一个”蹦到前面的奥秘 (Bestemthed)', label_ar: '🏷️ قفز أداة التعريف للأمام مع الصفة (Bestemthed)', label_en: '🏷️ The jumping article (Bestemthed)', label_uk: '🏷️ Стрибок артикля (Bestemthed)', label_vi: '🏷️ Mạo từ nhảy ra trước (Bestemthed)', label_ur: '🏷️ آرٹیکل کی چھلانگ (Bestemthed)', label_fa: '🏷️ پرش حرف تعریف معین (Bestemthed)', label_pt: '🏷️ O salto do artigo (Bestemthed)', label_es: '🏷️ El salto del artículo (Bestemthed)', route: 'bestemthed' }
            ]
        },
        {
            num: 7,
            title: 'Sætningen & ordstillingen',
            title_zh: '整句排队规矩与第二位法则 (Sætningen & ordstillingen)',
            title_ar: 'ترتيب الجملة وقاعدة الفعل في المركز الثاني (Sætningen & ordstillingen)',
            title_en: 'Sentence Structure & The Iron V2 Rule (Sætningen & ordstillingen)',
            title_uk: 'Порядок слів і правило 2-го місця V2 (Sætningen & ordstillingen)',
            title_vi: 'Trật tự câu & quy tắc thép V2 (Sætningen & ordstillingen)',
            title_ur: 'جملے کی ترتیب اور فعل کا دوسرا نمبر V2 (Sætningen & ordstillingen)',
            title_fa: 'ساختار جمله و قانون آهنی جایگاه دوم فعل V2 (Sætningen & ordstillingen)',
            title_pt: 'Estrutura da frase e a regra de ferro V2 (Sætningen & ordstillingen)',
            title_es: 'Estructura de la frase y la regla de hierro V2 (Sætningen & ordstillingen)',
            subtitle: 'Hvem gør hvad, og reglen om at handlingen altid skal stå på Plads 2',
            subtitle_zh: '正常排队顺序，与“时间地点放开头，动作立刻抢占第2位（V2 铁律）”',
            subtitle_ar: 'من يفعل ماذا، وقاعدة V2 الصارمة: إذا بدأت بالوقت أو المكان، الفعل يسبق الفاعل!',
            subtitle_en: 'Who does what, and why the verb MUST stay on Seat #2 (Inversion after Time & Place)',
            subtitle_uk: 'Хто що робить і залізне правило V2: якщо речення починається з часу чи місця — дієслово стоїть перед підметом!',
            subtitle_vi: 'Ai làm gì & quy tắc V2 bất di bất dịch: đưa thời gian/nơi chốn lên đầu thì động từ PHẢI giữ vị trí số 2!',
            subtitle_ur: 'اردو میں فعل آخر میں ہوتا ہے، مگر ڈینش میں فعل ہمیشہ دوسرے نمبر (V2) پر رہتا ہے!',
            subtitle_fa: 'در فارسی فعل همیشه آخرِ جمله است، اما در دانمارکی فعل باید همیشه در صندلی دوم (V2) بماند!',
            subtitle_pt: 'Quem faz o quê e a regra V2: se começar pelo tempo ou lugar, o verbo TEM de ficar no Lugar 2!',
            subtitle_es: 'Quién hace qué y la regla V2: si empiezas por tiempo o lugar, ¡el verbo DEBE quedarse en el Lugar 2!',
            color: '#fb923c',
            widthPct: 79,
            daLine: `1) <span class="mss-hl-da">Jeg spiser</span> brød i køkkenet i dag • 2) I dag <span class="mss-hl-da">spiser jeg</span> brød i køkkenet`,
            daLine_zh: '1) Jeg spiser brød i dag（我做动作：我 吃 面包）• 2) I dag spiser jeg brød（今天一开头，吃 抢占第2位，我 只能退到第3位！）',
            daLine_ar: '1) Jeg spiser brød i dag • 2) I dag spiser jeg brød (إذا بدأت بـ "اليوم"، الفعل spiser يحتل المركز 2 فوراً، و"jeg" تتراجع للمركز 3!)',
            daLine_en: '1) Jeg spiser brød i dag • 2) I dag spiser jeg brød (Time in Seat 1 pushes the verb to Seat 2, bumping "jeg" to Seat 3!)',
            daLine_uk: '1) Jeg spiser brød i dag • 2) I dag spiser jeg brød (Час на 1-му місці змушує дієслово стати на 2-ге місце, а «jeg» — на 3-тє!)',
            daLine_vi: '1) Jeg spiser brød i dag • 2) I dag spiser jeg brød (Đưa thời gian lên vị trí 1 thì động từ chiếm vị trí 2, đẩy «jeg» sang số 3!)',
            daLine_ur: '1) Jeg spiser brød i dag • 2) I dag spiser jeg brød (وقت آگے آنے پر فعل نمبر 2 پر رہتا ہے اور «jeg» نمبر 3 پر چلا جاتا ہے!)',
            daLine_fa: '1) Jeg spiser brød i dag • 2) I dag spiser jeg brød (اگر «امروز» اول بیاید، فعل در جایگاه ۲ می‌ماند و «jeg» به جایگاه ۳ می‌رود!)',
            daLine_pt: '1) Jeg spiser brød i dag • 2) I dag spiser jeg brød (Com o tempo no Lugar 1, o verbo fica no Lugar 2 e «jeg» recua para o Lugar 3!)',
            daLine_es: '1) Jeg spiser brød i dag • 2) I dag spiser jeg brød (¡Con el tiempo en el Lugar 1, el verbo queda en el Lugar 2 y «jeg» pasa al Lugar 3!)',
            myLines: {
                en: `1) <span class="mss-hl-my">I eat</span> bread today • 2) Today <span class="mss-hl-my">I eat</span> bread... — English NEVER inverts! English keeps Subject + Verb regardless. Danish has an unbreakable iron rule: <strong>THE VERB MUST ALWAYS BE IN SEAT #2 (V2 rule)</strong>. If you start with "I dag" (Seat 1), the verb "spiser" claims Seat 2, forcing "jeg" to Seat 3: <em>"I dag <strong>spiser jeg</strong> brød"</em>!`,
                ar: `<span class="mss-hl-my">اليوم آكل الخبز / آكل الخبز اليوم</span> — في العربية يمكنك تقديم الوقت أو تأخيره دون أن تتأثر بقية الجملة. أما الدنماركية فلديها قاعدة حديدية لا تتزحزح: <strong>الفعل يجب أن يكون دائماً في المركز الثاني (قاعدة V2)</strong>! إذا بدأت بكلمة "اليوم" (I dag)، يقفز الفعل فوراً للمركز 2 وتتراجع "أنا" (jeg) إلى المركز 3: <em>"I dag <strong>spiser jeg</strong>..."</em>.`,
                tr: `Bugün mutfakta ekmek <span class="mss-hl-my">yiyorum</span> — Handlingen står altid allerbagerst.`,
                uk: `<span class="mss-hl-my">Сьогодні я їм хліб на кухні</span> — В українській мові завдяки відмінкам порядок слів вільний: після «Сьогодні» ми все одно кажемо <em>«я їм»</em>. У данській діє залізне <strong>правило V2 (дієслово завжди на 2-му місці)</strong>: якщо на першому місці «I dag» (час) або «I køkkenet» (місце), дієслово <strong>spiser</strong> негайно стає на 2-ге місце перед <em>jeg</em>: <em>"I dag <strong>spiser jeg</strong> brød"</em>!`,
                de: `1) <span class="mss-hl-my">Ich esse</span>... • 2) Heute <span class="mss-hl-my">esse ich</span>... — Tysk låser også handlingen til Plads 2!`,
                es: `Hoy <span class="mss-hl-my">(yo) como</span> pan en la cocina — En español, después de «Hoy», mantenemos «yo como» (o lo omitimos). En danés hay una regla de hierro: <strong>el verbo TIENE que ocupar siempre el Lugar 2 (regla V2)</strong>! Si empiezas por «I dag» (Lugar 1), el verbo <em>spiser</em> se queda en el Lugar 2 y empuja a <em>jeg</em> al Lugar 3: <em>"I dag <strong>spiser jeg</strong> brød"</em>!`,
                vi: `Hôm nay <span class="mss-hl-my">tôi ăn</span> bánh mì — Trong tiếng Việt, dù đặt «Hôm nay» ở đầu câu thì «tôi» vẫn đứng trước «ăn». Nhưng tiếng Đan Mạch có <strong>quy tắc thép V2: Động từ LUÔN đứng ở vị trí số 2</strong>! Nếu câu bắt đầu bằng <em>I dag</em> (số 1), động từ <strong>spiser</strong> chiếm ngay vị trí số 2 và đẩy <em>jeg</em> ra sau: <em>"I dag <strong>spiser jeg</strong> brød"</em>!`,
                ur: `آج میں باورچی خانے میں روٹی <span class="mss-hl-my">کھاتا ہوں</span> — اردو میں فعل (کھاتا ہوں) جملے کے <strong>بالکل آخر میں</strong> آتا ہے! ڈینش میں فعل ہمیشہ <strong>دوسرے نمبر (V2)</strong> پر ہوتا ہے: <em>Jeg <strong>spiser</strong> brød...</em> اور اگر آپ «آج» (<em>I dag</em>) کو پہلے نمبر پر رکھیں تو فعل نمبر 2 پر جما رہتا ہے اور «jeg» تیسرے نمبر پر آ جاتا ہے: <em>"I dag <strong>spiser jeg</strong> brød"</em>!`,
                fa: `امروز در آشپزخانه نان <span class="mss-hl-my">می‌خورم</span> — در فارسی فعل همیشه در <strong>آخر جمله</strong> می‌نشیند! اما در دانمارکی فعل همیشه باید <strong>جایگاه دوم (V2)</strong> باشد: <em>Jeg <strong>spiser</strong> brød...</em> و اگر «امروز» (<em>I dag</em>) را در جایگاه ۱ بگذارید، فعل در جایگاه ۲ می‌ماند و «من» (<em>jeg</em>) به جایگاه ۳ می‌رود: <em>"I dag <strong>spiser jeg</strong> brød"</em>!`,
                pt: `Hoje <span class="mss-hl-my">(eu) como</span> pão na cozinha — Em português, depois de «Hoje», mantemos «eu como» (ou omitimos «eu»). Em dinamarquês há uma regra inquebrável: <strong>o verbo TEM de ocupar sempre o Lugar 2 (regra V2)</strong>! Se começar com «I dag» (Lugar 1), o verbo <em>spiser</em> fica no Lugar 2 e empurra <em>jeg</em> para o Lugar 3: <em>"I dag <strong>spiser jeg</strong> brød"</em>!`,
                zh: `<span class="mss-hl-my">今天我吃面包</span> — 汉语说“今天我吃面包”，排队顺序依然是“今天 + 我 + 吃 + 面包”；但丹麦语有一条不可动摇的铁律——<strong>动作词必须永远抢占第 2 个位置（V2 规则）</strong>！如果你把“今天 (I dag)”放到最前面第 1 位，做动作的“吃 (spiser)”就必须马上抢占第 2 位，原本的主角“我 (jeg)”被挤到第 3 位：<em>"I dag <strong>spiser jeg</strong> brød..."</em>！`
            },
            myLines_da: {
                en: `Engelsk bytter aldrig om efter tidsudtryk ("Today I eat"). Dansk har en ubrydelig V2-jernregel: Handlingen SKAL stå på Plads 2. Starter du med "I dag", bytter handling og person plads: <em>"I dag spiser jeg..."</em>. Dette er den suverænt hyppigste fejl for engelsktalende.`,
                zh: `Kinesisk beholder samme rækkefølge som altid ("I dag jeg spiser..."), mens dansk har en jernregel: <strong>Handlingen skal altid stå på Plads 2</strong>. Starter du med "I dag", bytter "spiser" og "jeg" plads: <em>"I dag spiser jeg..."</em>.`,
                ar: `Arabisk har mere fri ordstilling. Dansk har en ubrydelig jernregel: <strong>Handlingen skal stå på Plads 2</strong>. Sætter du "I dag" forrest, SKAL handlingen komme lige efter: <em>I dag spiser jeg...</em>`,
                uk: `Ukrainsk har friere ordstilling via kasusendelser ("Сьогодні я їм" beholder subjekt foran verbum). På dansk kræver <strong>V2-reglen</strong> altid inversion efter tid/sted: <em>I dag <strong>spiser jeg</strong> brød</em>.`,
                vi: `Vietnamesisk laver aldrig inversion efter tids- eller stedsudtryk ("Hôm nay tôi ăn" = ordret I dag jeg spiser). På dansk kræver <strong>V2-reglen</strong> altid handlingen på Plads 2: <em>I dag <strong>spiser jeg</strong> brød</em>.`,
                ur: `Urdu sætter ALTID handlingen helt til sidst i sætningen (SOV: "آج میں باورچی خانے میں روٹی کھاتا ہوں"). På dansk skal handlingen frem på Plads 2 — og efter "I dag" kommer verbet FØR subjektet: <em>I dag <strong>spiser jeg</strong> brød</em>.`,
                fa: `Farsi sætter ALTID handlingen helt til sidst i sætningen (SOV: "Emruz dar âshpazkhâne nân mikhoram"). På dansk skal handlingen frem på Plads 2 — og efter "I dag" kommer verbet FØR subjektet: <em>I dag <strong>spiser jeg</strong> brød</em>.`,
                pt: `Portugisisk inverterer ikke efter tid/sted ("Hoje eu como pão") og udelader ofte subjektet. På dansk kræver <strong>V2-reglen</strong> altid verbet på Plads 2 — efter "I dag" kommer verbet FØR subjektet: <em>I dag <strong>spiser jeg</strong> brød</em>.`,
                es: `Spansk inverterer ikke tvunget efter tid/sted ("Hoy yo como pan") og udelader ofte subjektet. På dansk kræver <strong>V2-reglen</strong> altid verbet på Plads 2 — efter "I dag" kommer verbet FØR subjektet: <em>I dag <strong>spiser jeg</strong> brød</em>.`
            },
            detailExplain: `<strong>Sætningen & ordstillingen:</strong> Hvordan ordene stiller sig i kø for at danne en hel mening. Grundreglen er: <strong>Hvem (jeg) + Gør (spiser) + Hvad (brød) + Hvor (i køkkenet) + Hvornår (i dag)</strong>. Men dansk har en berømt regel: <strong>Handlingen skal ALTID stå på Plads 2</strong>! Hvis du vælger at starte sætningen med tid eller sted ("I dag..."), skubber det handlingen frem, så personen må rykke om bagved: <em>"I dag <strong>spiser jeg</strong> brød..."</em>.`,
            detailExplain_zh: `<strong>排队顺序与第二位铁律（Sætningen & ordstillingen）：</strong>丹麦语最标准的排队顺序是：<strong>谁 (Jeg) + 做什么 (spiser) + 吃什么 (brød) + 在哪 (i køkkenet) + 什么时候 (i dag)</strong>。但丹麦语最容易让外国人栽跟头的就是<strong>“动词必须站在第2位（V2 铁律）”</strong>：只要你想强调时间或地点，把它拿来开头（例如把 <em>I dag...</em> 放在第 1 位），动作词（<em>spiser</em>）就必须死死守在第 2 位，做动作的人（<em>jeg</em>）只能委屈地挪到第 3 位：<em>"I dag <strong>spiser jeg</strong>..."</em>。中文里习惯说“今天我吃...”，初学者千万别顺嘴说错成 *I dag jeg spiser*！`,
            detailExplain_ar: `<strong>ترتيب الجملة وقاعدة المركز الثاني (Sætningen & ordstillingen):</strong> الترتيب المعتاد للجملة الدنماركية هو:<br><br>
<strong>من (Jeg) + يفعل (spiser) + ماذا (brød) + أين (i køkkenet) + متى (i dag)</strong> (لاحظ أن المكان يسبق الزمان في نهاية الجملة).<br><br>
لكن أهم قاعدة تُميز الدنماركية وتوقع الكثيرين في الخطأ هي <strong>قاعدة الفعل في المركز الثاني (V2)</strong>: إذا أردت إبراز الوقت أو المكان ووضعته في بداية الجملة في المركز 1 (مثل: <em>I dag...</em>)، يلتزم الفعل بالبقاء في المركز 2، ويُجبر الفاعل (<em>jeg</em>) على الانتقال خلفه إلى المركز 3: <em>"I dag <strong>spiser jeg</strong> brød..."</em>. إياك أن تقول بالترتيب العربي المباشر: *I dag jeg spiser*!`,
            detailExplain_en: `<strong>Sentence Structure & Word Order (Sætningen & ordstillingen):</strong> How words queue up to express a complete thought. The standard baseline order is:<br><br><strong>Subject (Jeg) + Verb (spiser) + Object (brød) + Place (i køkkenet) + Time (i dag)</strong><br>(Notice: in Danish, Place generally comes before Time at the end of the sentence!).<br><br>⚠️ <strong>The #1 Habit to Break for English Speakers — The V2 Rule:</strong><br>In English, you can place a time or place at the beginning of a sentence without altering the rest: <em>"Today I eat bread"</em>. In Danish, this is an immediate error. Danish follows an unbreakable law: <strong>the verb must occupy Seat #2</strong>. If you put "I dag" in Seat #1, the verb (<em>spiser</em>) claims Seat #2, and the subject (<em>jeg</em>) is displaced to Seat #3:<br>• Standard: <em>"<strong>Jeg spiser</strong> brød i køkkenet i dag."</em><br>• Inverted: <em>"I dag <strong>spiser jeg</strong> brød i køkkenet."</em><br>• Inverted: <em>"I køkkenet <strong>spiser jeg</strong> brød i dag."</em><br>Never say *\*I dag jeg spiser*!`,
            detailExplain_uk: `<strong>Будова речення й правило 2-го місця (Sætningen & ordstillingen):</strong> Стандартний данський порядок: <strong>Хто (Jeg) + Дія (spiser) + Що (brød) + Де (i køkkenet) + Коли (i dag)</strong>.<br><br>⚠️ <strong>Головна пастка для українців — правило V2 (інверсія):</strong><br>В українській ми легко кажемо: <em>«Сьогодні я їм хліб»</em>, залишаючи «я» перед дієсловом. У данській це груба помилка! <strong>Особове дієслово (spiser) ЗАВЖДИ мусить стояти на 2-му місці (V2)</strong>. Якщо ви ставите на 1-ше місце час (<em>I dag</em>) або місце (<em>I køkkenet</em>), дієслово стає другим, а підмет відсувається на 3-тє місце:<br>• Звичайний порядок: <em>"<strong>Jeg spiser</strong> brød i køkkenet i dag."</em><br>• Інверсія: <em>"I dag <strong>spiser jeg</strong> brød i køkkenet."</em><br>Ніколи не кажіть *\*I dag jeg spiser*!`,
            detailExplain_vi: `<strong>Trật tự câu & quy tắc V2 (Sætningen & ordstillingen):</strong> Thứ tự chuẩn trong tiếng Đan Mạch là: <strong>Ai (Jeg) + Làm gì (spiser) + Cái gì (brød) + Ở đâu (i køkkenet) + Khi nào (i dag)</strong>.<br><br>⚠️ <strong>Lỗi kinh điển của người Việt — Quy tắc V2 (đảo ngữ):</strong><br>Trong tiếng Việt ta nói rất tự nhiên: <em>«Hôm nay tôi ăn bánh mì»</em> (tôi vẫn đứng trước ăn). Trong tiếng Đan Mạch thì sai ngay! <strong>Động từ chính (spiser) LUÔN phải chiếm vị trí số 2 (V2)</strong>. Khi đưa thời gian (<em>I dag</em>) hoặc địa điểm (<em>I køkkenet</em>) lên vị trí số 1, động từ giữ nguyên ghế số 2, còn chủ ngữ phải nhường chỗ sang ghế số 3:<br>• Chuẩn: <em>"<strong>Jeg spiser</strong> brød i køkkenet i dag."</em><br>• Đảo ngữ: <em>"I dag <strong>spiser jeg</strong> brød i køkkenet."</em><br>Tuyệt đối không nói *\*I dag jeg spiser*!`,
            detailExplain_ur: `<strong>جملے کی ترتیب اور V2 قانون (Sætningen & ordstillingen):</strong> اردو جملے کا ڈھانچہ ڈینش سے بالکل الٹ ہے: اردو میں فعل ہمیشہ سب سے آخر میں آتا ہے (<em>آج میں باورچی خانے میں روٹی <strong>کھاتا ہوں</strong></em>)۔ ڈینش میں سیدھی ترتیب یہ ہے:<br><strong>کون (Jeg) + کام (spiser) + کیا (brød) + کہاں (i køkkenet) + کب (i dag)</strong><br><br>⚠️ <strong>اہم ترین اصول (V2 قانون):</strong> ڈینش میں فعل کو ہمیشہ <strong>دوسری کرسی (Seat #2)</strong> پر بیٹھنا ہوتا ہے! اگر آپ وقت (<em>I dag</em>) یا جگہ (<em>I køkkenet</em>) کو نمبر 1 پر لے آئیں، تو فعل نمبر 2 پر رہے گا اور «jeg» نمبر 3 پر چلا جائے گا:<br>• عام ترتیب: <em>"<strong>Jeg spiser</strong> brød i køkkenet i dag."</em><br>• الٹ ترتیب: <em>"I dag <strong>spiser jeg</strong> brød i køkkenet."</em><br>کبھی *\*I dag jeg spiser* نہ کہیں!`,
            detailExplain_fa: `<strong>ساختار جمله و قانون آهنی جایگاه دوم V2 (Sætningen & ordstillingen):</strong> ترتیب جمله فارسی کاملاً با دانمارکی فرق دارد: در فارسی فعل همیشه در <strong>آخرِ جمله</strong> می‌آید (<em>من امروز در آشپزخانه نان <strong>می‌خورم</strong></em>)! در دانمارکی الگوی پایه این است:<br><strong>چه کسی (Jeg) + چه کار (spiser) + چه چیز (brød) + کجا (i køkkenet) + کی (i dag)</strong><br><br>⚠️ <strong>مهم‌ترین قانون دانمارکی (قانون V2):</strong> فعل همیشه باید در <strong>صندلی دوم (جایگاه ۲)</strong> بنشیند! اگر جمله را با زمان (<em>I dag</em>) یا مکان (<em>I køkkenet</em>) شروع کنید، فعل روی جایگاه ۲ می‌ماند و «jeg» مجبور است به جایگاه ۳ برود:<br>• عادی: <em>"<strong>Jeg spiser</strong> brød i køkkenet i dag."</em><br>• با وارونگی: <em>"I dag <strong>spiser jeg</strong> brød i køkkenet."</em><br>هرگز نگویید *\*I dag jeg spiser*!`,
            detailExplain_pt: `<strong>Estrutura da frase e regra V2 (Sætningen & ordstillingen):</strong> A ordem básica em dinamarquês é:<br><strong>Quem (Jeg) + Verbo (spiser) + O quê (brød) + Onde (i køkkenet) + Quando (i dag)</strong><br>(Repare que no fim da frase o Lugar vem normalmente antes do Tempo!)<br><br>⚠️ <strong>O erro n.º 1 dos lusófonos — a regra V2 (inversão):</strong><br>Em português dizemos «Hoje eu como pão» sem inverter o verbo. Em dinamarquês existe uma regra de ferro: <strong>o verbo conjugado TEM de ficar no Lugar 2</strong>! Se colocar Tempo (<em>I dag</em>) ou Lugar (<em>I køkkenet</em>) no Lugar 1, o verbo segura o Lugar 2 e o sujeito passa para o Lugar 3:<br>• Normal: <em>"<strong>Jeg spiser</strong> brød i køkkenet i dag."</em><br>• Invertido: <em>"I dag <strong>spiser jeg</strong> brød i køkkenet."</em><br>Nunca diga *\*I dag jeg spiser*!`,
            detailExplain_es: `<strong>Estructura de la frase y regla V2 (Sætningen & ordstillingen):</strong> El orden básico en danés es:<br><strong>Quién (Jeg) + Verbo (spiser) + Qué (brød) + Dónde (i køkkenet) + Cuándo (i dag)</strong><br>(Fíjate en que al final de la frase, el Lugar suele ir antes del Tiempo).<br><br>⚠️ <strong>El error n.º 1 de hispanohablantes — la regla V2 (inversión):</strong><br>En español decimos «Hoy yo como pan» sin invertir. En danés existe una ley de hierro: <strong>el verbo conjugado DEBE estar en el Lugar 2</strong>! Si pones Tiempo (<em>I dag</em>) o Lugar (<em>I køkkenet</em>) en el Lugar 1, el verbo retiene el Lugar 2 y el sujeto pasa al Lugar 3:<br>• Normal: <em>"<strong>Jeg spiser</strong> brød i køkkenet i dag."</em><br>• Invertido: <em>"I dag <strong>spiser jeg</strong> brød i køkkenet."</em><br>¡Nunca digas *\*I dag jeg spiser*!`,
            morePairs: [
                { da: 'Normal: [Jeg] [spiser] brød [i køkkenet] [i dag] (Sted før Tid)', note: 'På dansk kommer Sted (hvor) normalt før Tid (hvornår) til sidst.', note_zh: '丹麦语句尾排队时，地点（在厨房里）通常排在时间（今天）前面。', note_ar: 'الترتيب الطبيعي: Jeg spiser brød i køkkenet i dag (المكان يسبق الزمان عادة في آخر الجملة).', note_en: 'In Danish, Place (hvor) typically precedes Time (hvornår) at the end of a sentence.', note_uk: 'У кінці данського речення місце (де) зазвичай іде перед часом (коли).', note_vi: 'Ở cuối câu tiếng Đan Mạch, Nơi chốn (i køkkenet) thường đứng trước Thời gian (i dag).', note_ur: 'ڈینش جملے کے آخر میں عموماً جگہ (i køkkenet) وقت (i dag) سے پہلے آتی ہے — اردو کے برعکس!', note_fa: 'در آخر جمله دانمارکی، معمولاً مکان (i køkkenet) قبل از زمان (i dag) می‌آید — برخلاف فارسی!', note_pt: 'No fim da frase em dinamarquês, o Lugar (i køkkenet) costuma vir antes do Tempo (i dag).', note_es: 'Al final de la frase en danés, el Lugar (i køkkenet) suele ir antes del Tiempo (i dag).' },
                { da: 'Plads 2-reglen: [I dag] [spiser] [jeg] brød i køkkenet', note: 'Handlingen skal altid blive på Plads 2 i en almindelig sætning.', note_zh: '时间一旦放在第 1 位，动词牢牢霸占第 2 位，主角退至第 3 位。', note_ar: 'قاعدة المركز 2: I dag spiser jeg brød. بدأنا بالزمان، فاحتل الفعل المركز الثاني وتراجع الفاعل للمركز الثالث.', note_en: 'Starting with time forces the verb to stay in Seat #2, bumping the subject to Seat #3.', note_uk: 'Коли час стоїть на 1-му місці, дієслово тримає 2-ге місце, а підмет (jeg) стає третім!', note_vi: 'Khi Thời gian lên đầu câu (vị trí 1), động từ đứng ngay vị trí 2 và chủ ngữ «jeg» sang vị trí 3!', note_ur: 'وقت نمبر 1 پر آنے سے فعل نمبر 2 پر جم جاتا ہے اور فاعل (jeg) نمبر 3 پر آ جاتا ہے۔', note_fa: 'با آمدن زمان در جایگاه ۱، فعل در جایگاه ۲ می‌ماند و فاعل (jeg) به جایگاه ۳ می‌رود.', note_pt: 'Ao começar com o tempo (Lugar 1), o verbo fica no Lugar 2 e «jeg» passa para o Lugar 3!', note_es: '¡Al empezar con el tiempo (Lugar 1), el verbo queda en el Lugar 2 y «jeg» pasa al Lugar 3!' }
            ],
            links: [
                { label: '🏗️ Sådan bygger du en sætning', label_zh: '🏗️ 丹麦语句子骨架搭建 (Byg en sætning)', label_ar: '🏗️ هيكل بناء الجملة الدنماركية (Byg en sætning)', label_en: '🏗️ How to build a Danish sentence (Grounding)', label_uk: '🏗️ Як побудувати речення (Grounding)', label_vi: '🏗️ Cách ghép khung câu (Grounding)', label_ur: '🏗️ جملہ بنانے کی مشق (Grounding)', label_fa: '🏗️ ساختن اسکلت جمله (Grounding)', label_pt: '🏗️ Como construir uma frase (Grounding)', label_es: '🏗️ Cómo construir una frase (Grounding)', route: 'grounding' },
                { label: '🧩 Ordstilling & Plads 2', label_zh: '🧩 语序与动词第二位 (Ordstilling)', label_ar: '🧩 ترتيب الكلمات وقاعدة المركز الثاني (Ordstilling)', label_en: '🧩 Word order & Seat #2 (Ordstilling)', label_uk: '🧩 Порядок слів і місце №2 (Ordstilling)', label_vi: '🧩 Trật tự từ & Vị trí số 2 (Ordstilling)', label_ur: '🧩 الفاظ کی ترتیب اور V2 اصول (Ordstilling)', label_fa: '🧩 ترتیب کلمات و جایگاه دوم (Ordstilling)', label_pt: '🧩 Ordem das palavras e Lugar 2 (Ordstilling)', label_es: '🧩 Orden de palabras y Lugar 2 (Ordstilling)', route: 'ordstilling' },
                { label: '⏰ Træn tidsudtryk', label_zh: '⏰ 时间短语表达 (Træn tidsudtryk)', label_ar: '⏰ تعبيرات الوقت والزمان (Træn tidsudtryk)', label_en: '⏰ Practice time expressions (Tidsudtryk)', label_uk: '⏰ Вирази часу (Træn tidsudtryk)', label_vi: '⏰ Luyện cụm từ chỉ thời gian (Tidsudtryk)', label_ur: '⏰ وقت کے الفاظ کی مشق (Tidsudtryk)', label_fa: '⏰ تمرین عبارت‌های زمانی (Tidsudtryk)', label_pt: '⏰ Praticar expressões de tempo (Tidsudtryk)', label_es: '⏰ Practicar expresiones de tiempo (Tidsudtryk)', route: 'traen_tidsudtryk' }
            ]
        },
        {
            num: 8,
            title: 'Talehandlingen (spørgsmål & opfordring)',
            title_zh: '一句话想干什么 (Talehandlingen)',
            title_ar: 'الهدف من الكلام: سؤال أو طلب (Talehandlingen)',
            title_uk: 'Комунікативна мета: запитання і прохання (Talehandlingen)',
            title_en: 'Speech Acts: Questions & Commands (Talehandlingen)',
            title_vi: 'Mục đích câu nói: Câu hỏi & Câu mệnh lệnh (Talehandlingen)',
            title_ur: 'جملے کا مقصد: سوال پوچھنا اور حکم/مشورہ دینا (Talehandlingen)',
            title_fa: 'هدف جمله: پرسیدن سؤال و دادن دستور/پیشنهاد (Talehandlingen)',
            title_es: 'El acto de habla: hacer preguntas y dar órdenes/consejos (Talehandlingen)',
            subtitle: 'Hvad du vil med sætningen: spørge med spørgeord, ja/nej eller give en opfordring',
            subtitle_zh: '打听情况（问什么）、确认是不是（问句动作打头），还是叫人做动作',
            subtitle_ar: 'السؤال بأداة استفهام، السؤال بنعم/لا بتقديم الفعل، وصيغة الأمر بحذف النهاية',
            subtitle_uk: 'Відкриті запитання (Hv-слова), запитання «так/ні» (дієслово на 1-му місці) та наказовий спосіб',
            subtitle_en: 'Hv-questions, Yes/No questions (NO "do" helper needed!), and crisp commands (Imperative)',
            subtitle_vi: 'Câu hỏi có từ để hỏi (Hv-ord), câu hỏi Có/Không (đảo động từ lên đầu!) và câu yêu cầu cắt đuôi -er',
            subtitle_ur: 'سوالیہ الفاظ والے سوال (Hv-ord)، ہاں/نہیں والے سوال (بغیر "کیا" کے، فعل سب سے پہلے!) اور حکم/مشورہ (صرف -er کاٹ دیں)',
            subtitle_fa: 'سؤال با کلمه پرسشی (Hv-ord)، سؤال بله/خیر (بدون «آیا» و با فعل در اول جمله!) و فعل امر (حذف -er)',
            subtitle_pt: 'Perguntas com Hv-ord, Sim/Não (verbo na 1.ª posição!) e imperativo curto (corte o -er)',
            subtitle_es: 'Preguntas con palabras Hv, Sí/No (¡verbo en 1.ª posición!) e imperativo corto (quita el -er)',
            color: '#facc15',
            widthPct: 86,
            daLine: `Spørgeord: "<span class="mss-hl-da">Hvad spiser du?</span>" • Ja/nej: "<span class="mss-hl-da">Spiser du</span> brød?" • Bydemåde: "<span class="mss-hl-da">Spis</span> brødet!"`,
            daLine_zh: '问什么："Hvad spiser du?" • 问是不是："Spiser du brød?" • 叫人吃："Spis brødet!"',
            daLine_ar: 'سؤال بأداة: "Hvad spiser du?" • سؤال بنعم/لا: "Spiser du brød?" • أمر: "Spis brødet!"',
            daLine_uk: 'Питальне слово: "Hvad spiser du?" • Так/ні: "Spiser du brød?" • Прохання/наказ: "Spis brødet!"',
            daLine_en: 'Hv: "Hvad spiser du?" • Ja/nej: "Spiser du brød?" (No "do"!) • Command: "Spis brødet!"',
            daLine_vi: 'Từ để hỏi: "Hvad spiser du?" • Có/không: "Spiser du brød?" • Mệnh lệnh: "Spis brødet!"',
            daLine_ur: 'سوالیہ لفظ: "Hvad spiser du?" • ہاں/نہیں: "Spiser du brød?" (بغیر "کیا" کے!) • حکم: "Spis brødet!"',
            daLine_fa: 'پرسشی: "Hvad spiser du?" • بله/خیر: "Spiser du brød?" (بدون «آیا»!) • امر: "Spis brødet!"',
            daLine_pt: 'Hv: "Hvad spiser du?" • Sim/Não: "Spiser du brød?" (Verbo primeiro!) • Ordem: "Spis brødet!"',
            daLine_es: 'Hv: "Hvad spiser du?" • Sí/No: "Spiser du brød?" (¡Verbo primero!) • Orden: "Spis brødet!"',
            myLines: {
                en: `Hv: "What do you eat?" • Ja/nej: "Do you eat bread?" • Imp.: "Eat the bread!" — English relies heavily on the auxiliary verb "do/does". Danish NEVER uses "do" to form questions: simply place the main verb in Seat #1 ("Spiser du...?"). Commands simply clip off the -er ending ("Spis!").`,
                ar: `أداة: "<span class="mss-hl-my">ماذا تأكل؟</span>" • نعم/لا: "<span class="mss-hl-my">هل تأكل</span> الخبز؟" • أمر: "<span class="mss-hl-my">كُلْ</span> الخبز!"`,
                tr: `Hv: "Ne yiyorsun?" • Ja/nej: "Ekmek yiyor musun?" • Imp.: "Ekmeği ye!"`,
                uk: `Hv: "<span class="mss-hl-my">Що</span> ти їси?" • Ja/nej: "<span class="mss-hl-my">(Чи) ти їси</span> хліб?" • Imp.: "<span class="mss-hl-my">Їж / Їжте</span> хліб!" — Головна пастка для українців: у нас можна спитати лише інтонацією («Ти їси хліб?»), не змінюючи порядку слів. У данській це НЕМОЖЛИВО: у запитанні «так/ні» дієслово (<em>Spiser</em>) обов'язково перестрибує на 1-е місце, а після питального слова (<em>Hvad</em>) завжди стоїть на 2-му місці (<strong>Hvad spiser du?</strong>, а не *Hvad du spiser?*). Наказовий спосіб ще простіший: одна коротка основа без закінчення -er для всіх (<strong>spis!</strong>).`,
                de: `Hv: "Was isst du?" • Ja/nej: "Isst du Brot?" • Imp.: "Iss das Brot!"`,
                es: `Hv: "¿Qué comes?" • Sí/No: "¿Comes pan?" (solo entonación, sin invertir) • Imp.: "¡Come / Coma el pan!"`,
                vi: `Hv: "Bạn ăn <span class="mss-hl-my">gì</span>?" • Ja/nej: "Bạn ăn bánh mì <span class="mss-hl-my">không</span>?" • Imp.: "<span class="mss-hl-my">Hãy ăn</span> bánh mì đi!" — Trong tiếng Việt, từ để hỏi (<em>gì, đâu</em>) và từ <em>không</em> nằm ở CUỐI câu! Trong tiếng Đan Mạch hoàn toàn khác: 1) Từ để hỏi (<em>Hvad</em>) nhảy lên đầu, động từ (<em>spiser</em>) khóa chặt vị trí 2: <strong>Hvad spiser du?</strong>; 2) Câu hỏi Có/Không đưa thẳng động từ lên đầu: <strong>Spiser du brød?</strong>; 3) Mệnh lệnh chỉ việc cắt đuôi -er: <strong>Spis!</strong>`,
                ur: `Hv: "آپ <span class="mss-hl-my">کیا</span> کھاتے ہیں؟" • Ja/nej: "<span class="mss-hl-my">کیا</span> آپ روٹی کھاتے ہیں؟" • Imp.: "روٹی <span class="mss-hl-my">کھاؤ / کھائیے</span>!" — اردو میں سوالیہ لفظ (کیا، کہاں، کب) جملے کے اندر رہتا ہے، اور ہاں/نہیں والے سوال کے شروع میں "کیا" لگایا جاتا ہے۔ ڈینش میں کوئی اضافی "کیا" نہیں ہوتا! 1) سوالیہ لفظ سب سے پہلے اور فعل فوراً دوسری جگہ: <strong>Hvad spiser du?</strong>؛ 2) ہاں/نہیں والے سوال میں فعل خود سب سے پہلے آ جاتا ہے: <strong>Spiser du brød?</strong>؛ 3) حکم/مشورے کے لیے "کھا / کھاؤ / کھائیے" جیسی الگ شکلیں نہیں بلکہ سب کے لیے بس -er کاٹ کر ایک لفظ: <strong>spis!</strong>`,
                fa: `Hv: "شما <span class="mss-hl-my">چه</span> می‌خورید؟" • Ja/nej: "<span class="mss-hl-my">آیا</span> نان می‌خورید؟" • Imp.: "نان را <span class="mss-hl-my">بخور / بخورید</span>!" — در فارسی کلمه پرسشی (چه، کجا، کی) داخل جمله می‌ماند، و سؤال بله/خیر با «آیا» یا تغییر لحن صدا ساخته می‌شود. در دانمارکی «آیا» وجود ندارد: ۱) کلمه پرسشی در اول و فعل فوراً در جایگاه ۲: <strong>Hvad spiser du?</strong>؛ ۲) در سؤال بله/خیر فعل خودش در جایگاه ۱ می‌آید: <strong>Spiser du brød?</strong>؛ ۳) برای امر به جای «بخور / بخورید» فقط -er را از آخر فعل حذف کنید: <strong>spis!</strong>`,
                pt: `Hv: "O que <span class="mss-hl-my">(tu/você) comes/come</span>?" • Ja/nej: "<span class="mss-hl-my">Comes/Você come</span> pão?" • Imp.: "<span class="mss-hl-my">Come / Coma</span> o pão!" — Em português fazemos perguntas Sim/Não só com a entoação, sem trocar a ordem! Em dinamarquês isso é impossível: 1) Em Sim/Não, o verbo vai para o Lugar 1: <strong>Spiser du brød?</strong>; 2) Depois de <em>Hvad</em>, o verbo fica no Lugar 2: <strong>Hvad spiser du?</strong>; 3) O imperativo tem uma só forma curta para todos (corte -er): <strong>spis!</strong>`,
                zh: `特殊问: "你吃<span class="mss-hl-my">什么 (shénme)?</span>" • 是非问: "你吃面包<span class="mss-hl-my">吗 (ma)?</span>" • 叫人做: "快<span class="mss-hl-my">吃</span>面包!"`
            },
            myLines_da: {
                en: `Engelsk skal bruge do/does ("Do you eat...?"). Dansk rykker blot verbet frem ("Spiser du...?"). Bydemåde dannes ved at fjerne -er (spis!).`,
                zh: `Kinesisk lader spørgeordet stå bagerst ("du spiser hvad?"); ja/nej-spørgsmål bruger spørgepartiklen "ma"; ved opfordringer bruges stammen uden bøjning.`,
                ar: `Hv-spørgsmål har spørgeord + handling; Ja/nej-spørgsmål har handling forrest uden "hal" (هل); Bydemåde er helt ens for alle uden endelse (spis!).`,
                uk: `Ukrainsk kan lave ja/nej-spørgsmål med intonation alene ("Ти їси хліб?") og sætter subjektet før verbet efter spørgeord ("Що ти їси?"). På dansk skal handlingen altid helt frem på plads 1 i ja/nej ("Spiser du...?") og på plads 2 efter spørgeord ("Hvad spiser du?"). Bydemåde har kun én kort form (spis!) i stedet for їж/їжте.`,
                vi: `Vietnamesisk lader spørgeordet ("gì") og spørgepartiklen ("không") stå bagerst på svarets plads. Dansk rykker hv-ordet helt forrest med handling på Plads 2 ("Hvad spiser du?") eller handlingen allerforrest ("Spiser du...?"). Bydemåde er blot stammen uden -er (spis!).`,
                ur: `Urdu lader spørgeordet ("kya / kahan") stå inde foran verbet, og ja/nej-spørgsmål starter med partiklen "Kya...?". På dansk findes intet "kya": handlingen står fast på Plads 2 efter hv-ord ("Hvad spiser du?") eller allerforrest i ja/nej ("Spiser du...?"). Bydemåde har kun én kort form (spis!) i stedet for اردو's tre høflighedsgrader (کھا / کھاؤ / کھائیے).`,
                fa: `Farsi lader spørgeordet ("che / kojâ") stå inde i sætningen foran verbet, og ja/nej-spørgsmål bruger "Âyâ...?" eller blot intonation. På dansk rykkes hv-ordet helt forrest med verbet på Plads 2, eller verbet allerforrest i ja/nej ("Spiser du...?"). Bydemåde har kun stammen (spis!) uden "bo-" præfiks.`,
                pt: `Portugisisk danner ja/nej-spørgsmål kun med intonation ("Você come pão?") og skifter bydemåde mellem tu/você/vocês ("come/coma/comam!"). På dansk SKAL verbet på Plads 1 i ja/nej ("Spiser du...?"), Plads 2 efter hv-ord ("Hvad spiser du?") og bydemåde er ens for alle (spis!).`,
                es: `Spansk danner ja/nej-spørgsmål med stigende intonation ("¿Comes pan?") og skifter bydemåde efter du/De/I ("come/coma/comed!"). På dansk SKAL verbet fysisk på Plads 1 i ja/nej ("Spiser du...?"), Plads 2 efter hv-ord ("Hvad spiser du?") og bydemåde er én kort stamme for alle (spis!).`
            },
            detailExplain: `<strong>Talehandlingen (hvad du vil sige):</strong> En sætning bruges altid i den virkelige verden: Vil du have ny viden (spørgsmål med spørgeord), vil du have et ja eller nej, eller vil du give en god opfordring? Her er de 3 måder at bygge det op på:`,
            detailExplain_zh: `<strong>日常说话的意图（Talehandlingen）：</strong>说话到底是为了什么？在丹麦语里有三种最常见的说话方式：<strong>1) 带着疑问小词打听情况（Hvad/Hvor...）</strong>：疑问词占第1位，动作占第2位；<strong>2) 确认是还是不是（Ja/nej 问句）</strong>：不用任何疑问字，直接把动作放到最前面第1位；<strong>3) 叫别人做事或提建议（Imperativ / Bydemåde）</strong>：直接用动词最本来的短身子，把后面的 -er 剪掉，不用带“你 (du)”！`,
            detailExplain_ar: `<strong>الهدف من الكلام (Talehandlingen):</strong> عندما نتحدث في الواقع، نستخدم الجملة لتحقيق هدف محدد: إما لطلب معلومة جديدة، أو للتأكد بنعم/لا، أو لإعطاء نصيحة أو أمر. في الدنماركية هناك 3 قوالب أساسية:`,
            detailExplain_uk: `<strong>Комунікативна мета речення (Talehandlingen):</strong> У живому спілкуванні ми будуємо речення залежно від того, що хочемо зробити: дізнатися нову інформацію, перепитати «так чи ні» або попросити чи порадити щось зробити. У данській є 3 чіткі моделі:<br><br>1) <strong>Відкриті запитання (Hv-слова):</strong> Питальне слово на 1-му місці, дієслово (дія) — залізно на 2-му, людина — на 3-му: <em>"<strong>Hvad spiser</strong> du?"</em> (Увага: в українській ми кажемо «Що <u>ти їси</u>?», тому не ставте <em>du</em> перед <em>spiser</em>!).<br>2) <strong>Запитання «так/ні» (Ja/nej):</strong> В українській ми часто питаємо просто інтонацією («Ти їси хліб?») або додаємо «Чи». У данській інтонації замало — <strong>дієслово завжди стає на 1-е місце</strong>: <em>"<strong>Spiser du</strong> brød?"</em>.<br>3) <strong>Прохання та наказовий спосіб (Bydemåde):</strong> Просто візьміть теперішній час і відріжте закінчення <em>-er</em>: <em>spiser ➔ <strong>spis!</strong></em>, <em>læser ➔ <strong>læs!</strong></em>, <em>venter ➔ <strong>vent!</strong></em> Без «du» і однаково для «ти» та «ви»!`,
            detailExplain_en: `<strong>Speech Acts (Talehandlingen):</strong> In real-life communication, sentences perform actions: asking for information, checking yes/no, or prompting someone to do something. Danish has 3 clean, efficient templates:<br><br>1) <strong>Open Questions (Hv-words):</strong> Put the question word in Seat 1, the verb in Seat 2, and the person in Seat 3: <em>"<strong>Hvad spiser</strong> du?"</em> (English: "What <em>do</em> you eat?"). Danish does not use "do" auxiliary verbs!<br>2) <strong>Yes/No Questions:</strong> Move the verb directly to Seat 1: <em>"<strong>Spiser du</strong> brød?"</em> (English: "<em>Do</em> you eat bread?"). No filler word required!<br>3) <strong>Commands & Advice (Imperative):</strong> Simply take the short verb stem by clipping off the <em>-er</em> ending from the present tense: <em>spiser ➔ <strong>spis!</strong></em>, <em>læser ➔ <strong>læs!</strong></em>, <em>venter ➔ <strong>vent!</strong></em> No "du" needed!`,
            detailExplain_vi: `<strong>Mục đích giao tiếp (Talehandlingen):</strong> Trong giao tiếp thực tế, câu được dùng để hỏi thông tin mới, hỏi Có/Không, hoặc đề nghị ai đó làm gì. Tiếng Đan Mạch có 3 mẫu câu rất gọn:<br><br>1) <strong>Câu hỏi mở (Hv-ord):</strong> Tiếng Việt giữ từ để hỏi ở cuối (<em>«Bạn ăn gì?»</em>). Tiếng Đan Mạch đưa từ để hỏi lên ghế 1, động từ lên ghế 2, người sang ghế 3: <em>"<strong>Hvad spiser</strong> du?"</em>.<br>2) <strong>Câu hỏi Có/Không (Ja/nej):</strong> Tiếng Việt thêm chữ «không» ở cuối câu (<em>«Bạn ăn bánh mì không?»</em>). Tiếng Đan Mạch không có chữ «không» ở cuối — chỉ cần đưa động từ lên đầu câu: <em>"<strong>Spiser du</strong> brød?"</em>.<br>3) <strong>Câu yêu cầu / mệnh lệnh (Bydemåde):</strong> Chỉ cần cắt bỏ đuôi <em>-er</em> của thì hiện tại, không cần dùng «hãy» hay «du»: <em>spiser ➔ <strong>spis!</strong></em>, <em>læser ➔ <strong>læs!</strong></em>, <em>venter ➔ <strong>vent!</strong></em>`,
            detailExplain_ur: `<strong>جملے کا مقصد (Talehandlingen):</strong> روزمرہ گفتگو میں ہم تین طرح کے کام لیتے ہیں: معلومات پوچھنا، ہاں/نہیں کی تصدیق کرنا، یا کسی کو کام کہنے/مشورہ دینا۔ ڈینش میں اس کے 3 صاف اور آسان طریقے ہیں:<br><br>1) <strong>سوالیہ لفظ والے سوال (Hv-ord):</strong> اردو میں سوالیہ لفظ (کیا، کہاں، کب) جملے کے اندر رہتا ہے (<em>"آپ <u>کیا</u> کھاتے ہیں؟"</em>)۔ ڈینش میں سوالیہ لفظ نمبر 1 پر، فعل ہمیشہ نمبر 2 پر، اور شخص نمبر 3 پر آتا ہے: <em>"<strong>Hvad spiser</strong> du?"</em>۔<br>2) <strong>ہاں یا نہیں والے سوال (Ja/nej):</strong> اردو میں ہم شروع میں «کیا» لگاتے ہیں (<em>"کیا آپ روٹی کھاتے ہیں؟"</em>)۔ ڈینش میں کوئی «کیا» نہیں ہوتا — بس <strong>فعل کو اٹھا کر نمبر 1 پر رکھ دیں</strong>: <em>"<strong>Spiser du</strong> brød?"</em>۔<br>3) <strong>حکم یا مشورہ (Bydemåde):</strong> اردو میں «کھا / کھاؤ / کھائیے» تین شکلیں ہوتی ہیں، مگر ڈینش میں ہر کسی کے لیے صرف ایک مختصر شکل ہے — حال کے فعل سے <em>-er</em> کاٹ دیں اور <em>du</em> نہ لگائیں: <em>spiser ➔ <strong>spis!</strong></em>، <em>læser ➔ <strong>læs!</strong></em>، <em>venter ➔ <strong>vent!</strong></em>`,
            detailExplain_fa: `<strong>هدف جمله در گفتگو (Talehandlingen):</strong> در زندگی واقعی سه مدل اصلی جمله داریم: پرسیدن اطلاع جدید، پرسش بله/خیر، و دستور یا پیشنهاد. در دانمارکی هر سه بسیار منظم و شفاف‌اند:<br><br>۱) <strong>سؤال‌های باز (Hv-ord):</strong> در فارسی کلمه پرسشی داخل جمله می‌ماند (<em>«امروز <u>چه</u> می‌خوری؟»</em>)؛ در دانمارکی کلمه پرسشی در جایگاه ۱، فعل حتماً در جایگاه ۲، و فاعل در جایگاه ۳ می‌آید: <em>"<strong>Hvad spiser</strong> du?"</em>.<br>۲) <strong>سؤال بله/خیر (Ja/nej):</strong> در فارسی با «آیا...؟» یا آهنگ صدا سؤال می‌سازیم؛ در دانمارکی «آیا» وجود ندارد — کافی است <strong>فعل را به جایگاه ۱ ببرید</strong>: <em>"<strong>Spiser du</strong> brød?"</em>.<br>۳) <strong>امر و پیشنهاد (Bydemåde):</strong> به جای پیشوند «بـ» و تفاوت مفرد/جمع («بخور/بخورید»)، فقط <em>-er</em> را از آخر فعل زمان حال بردارید و <em>du</em> نگذارید: <em>spiser ➔ <strong>spis!</strong></em>، <em>læser ➔ <strong>læs!</strong></em>، <em>venter ➔ <strong>vent!</strong></em>`,
            detailExplain_pt: `<strong>Atos de fala (Talehandlingen):</strong> Na conversa diária fazemos três coisas: pedir informação nova, confirmar Sim/Não ou dar uma ordem/sugestão. Em dinamarquês há 3 modelos limpos:<br><br>1) <strong>Perguntas abertas (Hv-ord):</strong> Palavra interrogativa no Lugar 1, verbo obrigatoriamente no Lugar 2 e pessoa no Lugar 3: <em>"<strong>Hvad spiser</strong> du?"</em> (Nunca diga *<em>Hvad du spiser?</em>).<br>2) <strong>Perguntas Sim/Não (Ja/nej):</strong> Em português basta subir a entoação no fim (<em>«Você come pão?»</em>). Em dinamarquês não chega a entoação — <strong>o verbo TEM de ir para o Lugar 1</strong>: <em>"<strong>Spiser du</strong> brød?"</em>.<br>3) <strong>Imperativo e conselhos (Bydemåde):</strong> Em português mudamos entre «come / coma / comam». Em dinamarquês existe uma única forma curta: corte o <em>-er</em> do presente e não use <em>du</em>: <em>spiser ➔ <strong>spis!</strong></em>, <em>læser ➔ <strong>læs!</strong></em>, <em>venter ➔ <strong>vent!</strong></em>`,
            detailExplain_es: `<strong>Actos de habla (Talehandlingen):</strong> En la conversación diaria hacemos tres cosas: pedir información nueva, confirmar Sí/No o dar una orden/consejo. En danés hay 3 reglas muy limpias:<br><br>1) <strong>Preguntas abiertas (Hv-ord):</strong> La palabra interrogativa va en el Lugar 1, el verbo obligatoriamente en el Lugar 2 y la persona en el Lugar 3: <em>"<strong>Hvad spiser</strong> du?"</em> (¡Nunca digas *<em>Hvad du spiser?</em>).<br>2) <strong>Preguntas Sí/No (Ja/nej):</strong> En español basta con subir la entonación (<em>«¿Comes pan?»</em>). En danés la entonación sola NO basta: <strong>el verbo TIENE que ir al Lugar 1</strong> delante de <em>du</em>: <em>"<strong>Spiser du</strong> brød?"</em>.<br>3) <strong>Imperativo y consejos (Bydemåde):</strong> En español cambiamos entre «come / coma / comed / coman». En danés hay una sola forma para todo el mundo: quita la <em>-er</em> del presente y no pongas <em>du</em>: <em>spiser ➔ <strong>spis!</strong></em>, <em>læser ➔ <strong>læs!</strong></em>, <em>venter ➔ <strong>vent!</strong></em>.`,
            utteranceCards: [
                {
                    badge: '1. ÅBENT SPØRGSMÅL (Spørg med hv-ord)',
                    badge_zh: '1. 带着疑问词打听情况（HV-ORD • 疑问小词打头）',
                    badge_ar: '1. سؤال بأداة استفهام (Hv-ord • طلب معلومة جديدة)',
                    badge_uk: '1. ВІДКРИТЕ ЗАПИТАННЯ (Питальне слово • Hv-ord)',
                    badge_en: '1. OPEN QUESTION (Question words • Hv-ord)',
                    badge_vi: '1. CÂU HỎI MỞ (Từ để hỏi • Hv-ord)',
                    badge_ur: '1. کھلا سوال (سوالیہ لفظ کے ساتھ • Hv-ord)',
                    badge_fa: '۱. سؤال باز (با کلمه پرسشی • Hv-ord)',
                    badge_pt: '1. PERGUNTA ABERTA (Palavras interrogativas • Hv-ord)',
                    badge_es: '1. PREGUNTA ABIERTA (Palabras interrogativas • Hv-ord)',
                    accent: '#38bdf8',
                    daFormula: 'Spørgeord (Plads 1) + Handlingen (Plads 2) + Personen (Plads 3)',
                    daFormula_zh: '疑问小词 (第1位) + 动作词 (第2位) + 谁 (第3位)',
                    daFormula_ar: 'أداة الاستفهام (المركز 1) + الفعل (المركز 2) + الفاعل (المركز 3)',
                    daFormula_uk: 'Питальне слово (Місце 1) + Дія (Місце 2) + Людина (Місце 3)',
                    daFormula_en: 'Question Word (Seat 1) + Verb (Seat 2) + Person (Seat 3)',
                    daFormula_vi: 'Từ để hỏi (Số 1) + Động từ (Số 2) + Người (Số 3)',
                    daFormula_ur: 'سوالیہ لفظ (جگہ 1) + فعل/عمل (جگہ 2) + شخص (جگہ 3)',
                    daFormula_fa: 'کلمه پرسشی (جایگاه ۱) + فعل (جایگاه ۲) + شخص (جایگاه ۳)',
                    daFormula_pt: 'Palavra Hv (Lugar 1) + Verbo (Lugar 2) + Pessoa (Lugar 3)',
                    daFormula_es: 'Palabra Hv (Lugar 1) + Verbo (Lugar 2) + Persona (Lugar 3)',
                    daExample: '"<strong>Hvad</strong> <u>spiser</u> du i køkkenet i dag?" • "<strong>Hvornår</strong> <u>spiser</u> vi?"',
                    daSubNote: 'De vigtigste spørgeord: hvad, hvem, hvor, hvornår, hvorfor, hvordan.',
                    daSubNote_zh: '核心疑问词：hvad (什么), hvem (谁), hvor (哪里), hvornår (何时), hvorfor (为什么), hvordan (如何)。',
                    daSubNote_ar: 'أهم أدوات الاستفهام: hvad (ماذا)، hvem (من)، hvor (أين)، hvornår (متى)، hvorfor (لماذا)، hvordan (كيف).',
                    daSubNote_uk: 'Головні питальні слова: hvad (що), hvem (хто), hvor (де), hvornår (коли), hvorfor (чому), hvordan (як).',
                    daSubNote_en: 'Key question words: hvad (what), hvem (who), hvor (where), hvornår (when), hvorfor (why), hvordan (how).',
                    daSubNote_vi: 'Từ để hỏi cốt lõi: hvad (gì), hvem (ai), hvor (đâu), hvornår (khi nào), hvorfor (tại sao), hvordan (như thế nào).',
                    daSubNote_ur: 'اہم سوالیہ الفاظ: hvad (کیا)، hvem (کون)، hvor (کہاں)، hvornår (کب)، hvorfor (کیوں)، hvordan (کیسے)۔',
                    daSubNote_fa: 'مهم‌ترین کلمات پرسشی: hvad (چه)، hvem (کی)، hvor (کجا)، hvornår (کی)، hvorfor (چرا)، hvordan (چطور).',
                    daSubNote_pt: 'Principais palavras Hv: hvad (o quê), hvem (quem), hvor (onde), hvornår (quando), hvorfor (porquê), hvordan (como).',
                    daSubNote_es: 'Principales palabras Hv: hvad (qué), hvem (quién), hvor (dónde), hvornår (cuándo), hvorfor (por qué), hvordan (cómo).',
                    myByLang: {
                        en: '"<strong>What do</strong> you eat in the kitchen today?" — English must insert do/does. Danish puts the action verb directly into Seat 2!',
                        ar: '"<strong>ماذا</strong> تأكل في المطبخ اليوم؟" — في العربية نبدأ بأداة الاستفهام ثم الفعل تماماً مثل الدنماركية، لكن في الدنماركية يبقى الفعل مقيداً بالمركز الثاني ويليه الفاعل مباشرة (Hvad spiser du...).',
                        tr: '"Bugün mutfakta <strong>ne</strong> yiyorsun?" — Spørgeordet ne bliver inde foran handlingen.',
                        uk: '"<strong>Що</strong> ти їси на кухні сьогодні?" — В українській після «Що» зазвичай стоїть людина («ти їси»). У данській же після питального слова дієслово (<em>spiser</em>) ЗАВЖДИ стоїть на 2-му місці перед людиною: <strong>Hvad spiser du...?</strong>',
                        de: '"<strong>Was</strong> isst du heute in der Küche?" — Samme opbygning: Spørgeord + Handling + Person!',
                        es: '"¿<strong>Qué</strong> comes en la cocina hoy?" — Spørgeord + Handling (sin "tú", o en Caribe/Latinoamérica: "¿Qué tú comes?").',
                        vi: '"Hôm nay bạn ăn <strong>gì</strong> trong nhà bếp?" — Tiếng Việt để chữ «gì» ở chỗ câu trả lời! Còn tiếng Đan Mạch đưa <strong>Hvad</strong> lên đầu câu (số 1) và bắt buộc đặt động từ (<strong>spiser</strong>) ngay ghế số 2 trước «du»: <em>Hvad spiser du...?</em>',
                        ur: '"آپ آج باورچی خانے میں <strong>کیا</strong> کھاتے ہیں؟" — اردو میں سوالیہ لفظ «کیا» فعل سے پہلے جملے کے اندر رہتا ہے۔ ڈینش میں <strong>Hvad</strong> نمبر 1 پر آتا ہے اور فعل (<strong>spiser</strong>) ہمیشہ نمبر 2 پر شخص سے پہلے رہتا ہے: <em>Hvad spiser du...?</em>',
                        fa: '"امروز در آشپزخانه <strong>چه</strong> می‌خوری؟" — در فارسی کلمه پرسشی «چه» داخل جمله پیش از فعل می‌ماند؛ در دانمارکی <strong>Hvad</strong> به جایگاه ۱ می‌آید و فعل (<strong>spiser</strong>) بلافاصله در جایگاه ۲ پیش از «du» قفل می‌شود: <em>Hvad spiser du...?</em>',
                        pt: '"O que <strong>você come</strong> hoje na cozinha?" — Em português, depois de «O que», o sujeito vem antes do verbo («você come»). Em dinamarquês, o verbo (<strong>spiser</strong>) trava no Lugar 2 logo após <em>Hvad</em>, antes de «du»: <em>Hvad spiser du...?</em>',
                        zh: '"今天你在厨房吃<strong>什么</strong>？" — 汉语把“什么”留在最后：“你今天在厨房吃什么？”；但丹麦语必须把疑问词（Hvad）提到最前面，而且动作（spiser）必须抢占在第2位，人（du）排在第3位！'
                    },
                    myByLang_da: {
                        en: 'Engelsk indsætter do/does ("What do you eat?"). Dansk sætter handlingen direkte på Plads 2 ("Hvad spiser du?").',
                        zh: 'Kinesisk lader spørgeordet stå bagerst på svarets plads ("du spiser hvad?"), mens dansk rykker det helt forrest og lader handlingen stå på Plads 2.',
                        ar: 'I arabisk kan spørgeord stå forrest ligesom på dansk; på dansk er handlingen altid låst til Plads 2 efterfulgt af subjektet.',
                        uk: 'Ukrainsk sætter normalt personen før handlingen efter spørgeordet ("Що ти їси?"). Dansk låser handlingen på Plads 2 ("Hvad spiser du?").',
                        vi: 'Vietnamesisk lader spørgeordet (gì) stå til sidst ("bạn ăn gì?"); dansk rykker det forrest og låser handlingen til Plads 2 ("Hvad spiser du?").',
                        ur: 'Urdu lader spørgeordet ("kya") stå inde i sætningen før verbet ("aap kya khate hain?"); dansk rykker det forrest med handlingen fastlåst på Plads 2 ("Hvad spiser du?").',
                        fa: 'Farsi lader spørgeordet ("che") stå inde i sætningen før verbet ("emruz che mikhori?"); dansk rykker det forrest med handlingen fastlåst på Plads 2 ("Hvad spiser du?").',
                        pt: 'Portugisisk sætter ofte subjektet før verbet efter spørgeordet ("O que você come?") eller udelader det ("Que comes?"); dansk låser verbet på Plads 2 ("Hvad spiser du?").',
                        es: 'Spansk kan udelade subjektet ("¿Qué comes?") eller i visse varianter sætte subjektet før verbet ("¿Qué tú comes?"); dansk låser ALTID verbet på Plads 2 og bevarer subjektet ("Hvad spiser du?").'
                    }
                },
                {
                    badge: '2. JA/NEJ-SPØRGSMÅL (Lukket spørgsmål uden spørgeord)',
                    badge_zh: '2. 确认是还是不是（JA/NEJ • 动作词打头阵）',
                    badge_ar: '2. سؤال بنعم أو لا (Ja/Nej • بدون أداة هل)',
                    badge_uk: '2. ЗАПИТАННЯ «ТАК / НІ» (Без слова «чи» • Дія на старті)',
                    badge_en: '2. YES/NO QUESTION (Direct inversion • No "do")',
                    badge_vi: '2. CÂU HỎI CÓ / KHÔNG (Không có chữ «không» • Động từ đứng đầu)',
                    badge_ur: '2. ہاں / نہیں والا سوال (بغیر "کیا" کے • فعل سب سے پہلے)',
                    badge_fa: '۲. سؤال بله / خیر (بدون «آیا» • فعل در اول جمله)',
                    badge_pt: '2. PERGUNTA SIM / NÃO (Sem palavra extra • Verbo na 1.ª posição)',
                    badge_es: '2. PREGUNTA SÍ / NO (Sin palabra extra • Verbo en 1.ª posición)',
                    accent: '#facc15',
                    daFormula: 'Handlingen allerforrest (Plads 1) + Personen (Plads 2)',
                    daFormula_zh: '动作词直接打头阵 (第1位) + 谁 (第2位)',
                    daFormula_ar: 'الفعل مباشرة في البداية (المركز 1) + الفاعل (المركز 2)',
                    daFormula_uk: 'Дія на самому початку (Місце 1) + Людина (Місце 2)',
                    daFormula_en: 'Verb in the lead (Seat 1) + Person (Seat 2)',
                    daFormula_vi: 'Động từ lên đầu câu (Số 1) + Người (Số 2)',
                    daFormula_ur: 'فعل سب سے آگے (جگہ 1) + شخص (جگہ 2)',
                    daFormula_fa: 'فعل مستقیم در اول جمله (جایگاه ۱) + شخص (جایگاه ۲)',
                    daFormula_pt: 'Verbo na frente (Lugar 1) + Pessoa (Lugar 2)',
                    daFormula_es: 'Verbo delante (Lugar 1) + Persona (Lugar 2)',
                    daExample: '"<strong>Spiser</strong> <u>du</u> brød i køkkenet i dag?"',
                    daSubNote: 'Dansk bytter bare plads på handling og person — uden ekstra spørgeord.',
                    daSubNote_zh: '丹麦语直接把动作推到最前面变成问句，无需添加辅助疑问词。',
                    daSubNote_ar: 'في الدنماركية لا توجد كلمة تعادل "هل"؛ يكفي أن تنقل الفعل إلى أول الجملة ليتحول الكلام إلى سؤال فوري!',
                    daSubNote_uk: 'Данська просто міняє місцями дію та людину — жодного слова «чи» не потрібно!',
                    daSubNote_en: 'Danish simply swaps the verb and subject — without any auxiliary "do".',
                    daSubNote_vi: 'Tiếng Đan Mạch chỉ đổi chỗ động từ và người — không cần thêm chữ «không» ở cuối câu!',
                    daSubNote_ur: 'ڈینش میں "کیا" جیسا کوئی سوالیہ لفظ نہیں — بس فعل اور شخص کی جگہ بدل دیں!',
                    daSubNote_fa: 'در دانمارکی کلمه «آیا» وجود ندارد — کافی است جای فعل و شخص را عوض کنید!',
                    daSubNote_pt: 'O dinamarquês troca apenas a ordem do verbo e do sujeito — a entoação sozinha não chega!',
                    daSubNote_es: 'El danés cambia de sitio el verbo y la persona — ¡subir solo la entonación NO basta!',
                    myByLang: {
                        en: '"<strong>Do</strong> you eat bread...?" — English requires Do/Are in front. In Danish, the main verb itself (Spiser) steps up to Seat 1!',
                        ar: '"<strong>هل</strong> تأكل الخبز...؟" — في العربية نستعمل أداة "هل" في البداية. أما في الدنماركية فلا توجد أداة استفهام إضافية، بل كل ما تفعله هو وضع الفعل (<em>Spiser</em>) في بداية الجملة ليصبح سؤالاً: <em>"Spiser du brød?"</em>.',
                        tr: '"Bugün mutfakta ekmek yiyor <strong>musun</strong>?" — Tyrkisk sætter spørgepartiklen til sidst efter handlingen.',
                        uk: '"<strong>(Чи) ти їси</strong> хліб на кухні сьогодні?" — В українській ми часто залишаємо «Ти їси хліб?» і просто піднімаємо голос у кінці. У данській інтонації замало — треба поміняти слова місцями: <strong>Spiser du brød?</strong>',
                        de: '"<strong>Isst du</strong> heute Brot in der Küche?" — Bytter plads på handling og person præcis som dansk.',
                        es: '"¿<strong>Comes</strong> pan en la cocina hoy?" — Solo sube la entonación (¡en danés eso suena a afirmación!).',
                        vi: '"Hôm nay bạn ăn bánh mì <strong>không</strong>?" — Tiếng Việt thêm chữ «không» vào cuối câu; tiếng Đan Mạch không có chữ đó, mà đưa thẳng động từ <strong>Spiser</strong> lên ghế số 1: <em>Spiser du brød?</em>',
                        ur: '"<strong>کیا</strong> آپ آج باورچی خانے میں روٹی کھاتے ہیں؟" — اردو شروع میں «کیا» لگاتی ہے اور ترتیب نہیں بدلتی؛ ڈینش میں کوئی «کیا» نہیں بلکہ فعل (<strong>Spiser</strong>) سیدھا نمبر 1 پر آ جاتا ہے: <em>Spiser du brød?</em>',
                        fa: '"<strong>آیا</strong> امروز نان می‌خوری؟" — فارسی در اول جمله «آیا» می‌گذارد یا با لحن سؤال می‌پرسد؛ در دانمارکی «آیا» نیست، بلکه خود فعل (<strong>Spiser</strong>) مستقیماً به جایگاه ۱ می‌آید: <em>Spiser du brød?</em>',
                        pt: '"<strong>Você come / Comes</strong> pão hoje?" — Em português fazemos perguntas só com a melodia da voz! Em dinamarquês isso não funciona: o verbo (<strong>Spiser</strong>) tem de ir para o Lugar 1: <em>Spiser du brød?</em>',
                        zh: '"你今天在厨房吃面包<strong>吗</strong>？" — 汉语习惯在句尾加个“吗”：“你今天在厨房吃面包吗？”；但丹麦语根本没有“吗”这个字，它只要把动作（Spiser）直接拎到最前面第1位，立刻就变成了问句！'
                    },
                    myByLang_da: {
                        en: 'Engelsk kræver Do/Are foran ("Do you eat...?"). På dansk rykker selve handlingen frem forrest ("Spiser du...?").',
                        zh: 'Kinesisk bruger et lille "ma" til sidst; dansk bytter direkte om på person og handling, så handlingen står forrest.',
                        ar: 'Arabisk indleder med et lille spørgeord som هل (hal); dansk har intet spørgeord, men rykker blot handlingen frem forrest.',
                        uk: 'Ukrainsk kan beholde normal ordstilling med stigende intonation ("Ти їси хліб?") eller "Чи". På dansk skal handlingen fysisk frem på Plads 1 ("Spiser du...?").',
                        vi: 'Vietnamesisk sætter partiklen "không" helt til sidst; dansk bytter direkte om på person og handling, så handlingen står forrest ("Spiser du...?").',
                        ur: 'Urdu starter med spørgepartiklen "Kya" og beholder SOV-ordstilling; dansk har intet "kya", men rykker verbet helt frem på Plads 1 ("Spiser du...?").',
                        fa: 'Farsi starter med spørgeordet "Âyâ...?" (eller blot tonefald); dansk har intet "âyâ", men rykker verbet helt frem på Plads 1 ("Spiser du...?").',
                        pt: 'Portugisisk bruger blot stigende intonation ("Você come pão?"); på dansk SKAL verbet fysisk frem på Plads 1 ("Spiser du...?").',
                        es: 'Spansk bruger blot stigende intonation ("¿Comes pan?"); på dansk SKAL verbet fysisk frem på Plads 1 foran subjektet ("Spiser du...?").'
                    }
                },
                {
                    badge: '3. OPFORDRING & RÅD (Bydemåde)',
                    badge_zh: '3. 让人行动或提建议（Bydemåde • 剪掉尾巴直接说）',
                    badge_ar: '3. الأمر والنصيحة (Bydemåde • احذف ذيل الفعل)',
                    badge_uk: '3. ПРОХАННЯ І ПОРАДА (Наказовий спосіб • Відріж хвіст)',
                    badge_en: '3. COMMANDS & SUGGESTIONS (Imperative • Cut the tail)',
                    badge_vi: '3. ĐỀ NGHỊ & MỆNH LỆNH (Bydemåde • Cắt đuôi -er)',
                    badge_ur: '3. مشورہ اور حکم (Bydemåde • آخری -er کاٹ دیں)',
                    badge_fa: '۳. امر و پیشنهاد (Bydemåde • حذف -er از آخر فعل)',
                    badge_pt: '3. ORDENS E CONSELHOS (Imperativo • Corte o -er)',
                    badge_es: '3. ÓRDENES Y CONSEJOS (Imperativo • Quita el -er)',
                    accent: '#4ade80',
                    daFormula: 'Kun verbets korte stamme (fjern -er fra nutid) — uden "du"!',
                    daFormula_zh: '只留动作词的短身子（把 -er 尾巴切掉）— 连“你 (du)”都省了！',
                    daFormula_ar: 'جذع الفعل القصير فقط (احذف -er من الحاضر) — بدون ذكر "du" (أنت)!',
                    daFormula_uk: 'Тільки коротка основа дієслова (відріжте -er від теперішнього часу) — без "du"!',
                    daFormula_en: 'Only the short verb stem (remove -er from present tense) — without "du"!',
                    daFormula_vi: 'Chỉ giữ gốc động từ ngắn (cắt bỏ -er ở hiện tại) — không cần "du"!',
                    daFormula_ur: 'صرف فعل کی مختصر بنیاد (حال سے -er ہٹائیں) — بغیر "du" کے!',
                    daFormula_fa: 'فقط ریشه کوتاه فعل (-er را از زمان حال بردارید) — بدون «du»!',
                    daFormula_pt: 'Apenas o radical curto do verbo (tire o -er do presente) — sem «du»!',
                    daFormula_es: 'Solo la raíz corta del verbo (quita -er del presente) — ¡sin «du»!',
                    daExample: '"<strong>Spis</strong> brødet i køkkenet!" • "<strong>Kom</strong> ind og <strong>sæt</strong> dig!"',
                    daSubNote: 'Sådan gøres det: spiser → spis! • læser → læs! • venter → vent!',
                    daSubNote_zh: '口令变化口诀：spiser → spis! (吃吧!) • læser → læs! (读吧!) • venter → vent! (等一下!)',
                    daSubNote_ar: 'قاعدة سحرية: spiser ← spis! (كُلْ!) • læser ← læs! (اقرأ!) • venter ← vent! (انتظر!)',
                    daSubNote_uk: 'Просте правило: spiser → spis! (їж/їжте!) • læser → læs! (читай/те!) • venter → vent! (чекай/те!)',
                    daSubNote_en: 'Quick formula: spiser → spis! • læser → læs! • venter → vent!',
                    daSubNote_vi: 'Công thức nhanh: spiser → spis! (ăn đi!) • læser → læs! (đọc đi!) • venter → vent! (đợi chút!)',
                    daSubNote_ur: 'آسان فارمولا: spiser → spis! (کھاؤ!) • læser → læs! (پڑھو!) • venter → vent! (انتظار کرو!)',
                    daSubNote_fa: 'فرمول سریع: spiser → spis! (بخور!) • læser → læs! (بخوان!) • venter → vent! (صبر کن!)',
                    daSubNote_pt: 'Fórmula rápida: spiser → spis! (come!) • læser → læs! (lê!) • venter → vent! (espera!)',
                    daSubNote_es: 'Fórmula rápida: spiser → spis! (¡come!) • læser → læs! (¡lee!) • venter → vent! (¡espera!)',
                    myByLang: {
                        en: '"<strong>Eat</strong> the bread in the kitchen!" — Uses the base form without you, very similar to Danish.',
                        ar: '"<strong>كُلْ</strong> الخبز في المطبخ!" — في العربية صيغة الأمر تتغير بحسب المخاطب: كُلْ (للمذكر)، كُلِي (للمؤنث)، كُلُوا (للجمع). أما في الدنماركية فالأمر واحد لا يتغير أبداً للجميع: <strong>spis!</strong> بدون أي إضافات ودون ذكر كلمة "du" (أنت)!',
                        tr: '"Mutfakta ekmeği <strong>ye</strong>!" — Bruger ordets korte rod (ye-) til sidst.',
                        uk: '"<strong>Їж / Їжте</strong> хліб на кухні!" — В українській ми міняємо закінчення для «ти» (їж) і «ви» (їжте). У данській одна коротка форма підходить і до друга, і до групи людей: просто відріжте -er ➔ <strong>spis!</strong>',
                        de: '"<strong>Iss</strong> das Brot in der Küche!" — Har forskellige former for du, ihr og Sie.',
                        es: '"¡<strong>Come / Coma / Comed</strong> el pan en la cocina!" — En español cambia según tú, usted, vosotros o ustedes; en danés es una sola forma corta.',
                        vi: '"<strong>Hãy ăn</strong> bánh mì trong bếp <strong>đi</strong>!" — Tiếng Việt thêm «Hãy ... đi!». Tiếng Đan Mạch chỉ việc cắt đuôi -er của thì hiện tại để lấy gốc ngắn: <em>spiser ➔ <strong>spis!</strong></em> và bỏ chữ «du».',
                        ur: '"باورچی خانے میں روٹی <strong>کھاؤ / کھائیے</strong>!" — اردو میں احترام کے لحاظ سے «کھا / کھاؤ / کھائیے» بدلتا ہے۔ ڈینش میں سب کے لیے بس ایک ہی مختصر شکل ہے — فعل کے آخر سے -er ہٹا دیں: <em>spiser ➔ <strong>spis!</strong></em> اور «du» بھی ہٹا دیں!',
                        fa: '"نان را در آشپزخانه <strong>بخور / بخورید</strong>!" — در فارسی با پیشوند «بـ» و شناسه «بخور / بخورید» ساخته می‌شود؛ در دانمارکی یک شکل کوتاه برای همه هست: فقط -er را از آخر فعل بردارید: <em>spiser ➔ <strong>spis!</strong></em> (بدون «du»)!',
                        pt: '"<strong>Come / Coma</strong> o pão na cozinha!" — Em português mudamos entre <em>tu (come)</em>, <em>você (coma)</em> e <em>vocês (comam)</em>. Em dinamarquês uma única forma serve para todos: basta cortar -er: <em>spiser ➔ <strong>spis!</strong></em> (sem «du»)!',
                        zh: '"在厨房里<strong>吃</strong>面包吧！" — 汉语通常说“在厨房里吃面包吧！”或“快吃！”；丹麦语则是把现在时后面的小尾巴 -er 剪掉，只留下短促有力的根（spis!），而且绝不要带 "du"！'
                    },
                    myByLang_da: {
                        en: 'Bruger grundformen uden you, meget ligesom på dansk.',
                        zh: 'Kinesisk bruger verbets grundform (ofte med "ba" eller "kuai"); dansk bruger verbets stamme uden -er og uden "du".',
                        ar: 'Arabisk bøjer bydemåden efter køn og tal (kul, kulī, kulū); på dansk er stammen spis! fuldstændig ens for alle.',
                        uk: 'Ukrainsk har særskilt form for ental (їж) og flertal/høflig form (їжте); på dansk er stammen (spis!) ens for alle.',
                        vi: 'Vietnamesisk bruger opfordringsord som "Hãy ... đi!"; dansk fjerner -er fra nutid (spis!) uden subjekt.',
                        ur: 'Urdu skelner mellem tre høflighedsformer i bydemåde (کھا / کھاؤ / کھائیے); på dansk er stammen (spis!) ens for alle uden "du".',
                        fa: 'Farsi danner bydemåde med præfikset "bo-/be-" og forskel på ental/høflig ("bokhor / bokhorid"); dansk fjerner blot -er (spis!) ens for alle.',
                        pt: 'Portugisisk skelner mellem tu/você/vocês i bydemåde ("come / coma / comam!"); på dansk fjerner man blot -er (spis!) ens for alle.',
                        es: 'Spansk skelner mellem tú/usted/vosotros/ustedes i bydemåde ("come / coma / comed / coman!"); på dansk fjerner man blot -er (spis!) ens for alle.'
                    }
                }
            ],
            morePairs: [
                { da: 'Almindelig: "Du spiser brød." → Ja/nej-spørgsmål: "Spiser du brød?" → Bydemåde: "Spis brødet!"', note: 'Se hvordan de samme ord skifter mening blot ved rækkefølge og endelse.', note_ar: 'الجملة العادية: "Du spiser brød" ← سؤال نعم/لا: "Spiser du brød?" ← أمر: "Spis brødet!"', note_uk: 'Звичайне: "Du spiser brød." ➔ Запитання: "Spiser du brød?" ➔ Наказ: "Spis brødet!"', note_en: 'See how the exact same words change meaning simply through word order and endings.', note_vi: 'Câu thường: "Du spiser brød." ➔ Câu hỏi: "Spiser du brød?" ➔ Mệnh lệnh: "Spis brødet!"', note_ur: 'عام جملہ: "Du spiser brød." ← سوال: "Spiser du brød?" ← حکم: "Spis brødet!"', note_fa: 'جمله عادی: "Du spiser brød." ← سؤال: "Spiser du brød?" ← امر: "Spis brødet!"', note_pt: 'Frase normal: "Du spiser brød." ➔ Pergunta: "Spiser du brød?" ➔ Ordem: "Spis brødet!"', note_es: 'Frase normal: "Du spiser brød." ➔ Pregunta: "Spiser du brød?" ➔ Orden: "Spis brødet!"' },
                { da: 'Høflig opfordring: "Ville du have et stykke brød?" / "Kunne du lukke døren?"', note: 'På dansk bløder man ofte en opfordring op ved at spørge med "Kan/Kunne du...?" fremfor at kommandere.', note_ar: 'الطلب المهذب في الدنماركية يصاغ غالباً بسؤال لطيف: "Kunne du tænke dig...?" أو "Vil du være sød at...؟" بدلاً من الأمر المباشر.', note_uk: 'Ввічливе прохання у Данії найчастіше формулюють як запитання: "Kan/Kunne du...?" (Не могли б ви...?) замість прямого наказу.', note_en: 'In Danish, commands are often softened into polite questions: "Vil du have...?" or "Kunne du lukke døren?"', note_vi: 'Lời nhờ lịch sự ở Đan Mạch thường dùng dạng câu hỏi: "Kan/Kunne du...?" (Bạn có thể...?) thay vì ra lệnh trực tiếp.', note_ur: 'ڈینش میں شائستہ درخواست حکم کے بجائے سوال کے انداز میں کی جاتی ہے: "Kan/Kunne du...?" (کیا آپ... کر سکتے ہیں؟)۔', note_fa: 'در دانمارکی درخواست مؤدبانه معمولاً به جای دستور مستقیم، به شکل سؤال پرسیده می‌شود: "Kan/Kunne du...?" (می‌توانید...؟).', note_pt: 'Na Dinamarca, pedidos educados são feitos em forma de pergunta: "Kan/Kunne du...?" (Poderia...?) em vez de dar ordens diretas.', note_es: 'En Dinamarca, las peticiones amables se hacen como pregunta: "Kan/Kunne du...?" (¿Podrías...?) en lugar de dar órdenes directas.' }
            ],
            links: [
                { label: '💬 Lav spørgsmål (Hv- & Ja/nej)', label_zh: '💬 疑问句构造实战 (Lav spørgsmål)', label_ar: '💬 صياغة الأسئلة بالأداة وبنعم/لا (Lav spørgsmål)', label_uk: '💬 Побудова запитань (Hv- та Так/ні)', label_en: '💬 Construct questions (Hv & Yes/No)', label_vi: '💬 Luyện đặt câu hỏi (Hv- & Có/Không)', label_ur: '💬 سوال بنانے کی مشق (Hv- اور ہاں/نہیں)', label_fa: '💬 تمرین ساختن سؤال (Hv- و بله/خیر)', label_pt: '💬 Criar perguntas (Hv- e Sim/Não)', label_es: '💬 Crear preguntas (Hv- y Sí/No)', route: 'lav_sporgsmal' },
                { label: '⚡ Verbernes tider & former', label_zh: '⚡ 动词所有形态总览 (Verber)', label_ar: '⚡ صيغ الأفعال والأمر (Verber)', label_uk: '⚡ Форми дієслова та наказовий спосіб', label_en: '⚡ Verb forms & imperative (Verber)', label_vi: '⚡ Các dạng động từ & mệnh lệnh', label_ur: '⚡ افعال کی شکلیں اور حکم (Verber)', label_fa: '⚡ شکل‌های فعل و امر (Verber)', label_pt: '⚡ Tempos verbais e imperativo (Verber)', label_es: '⚡ Tiempos verbales e imperativo (Verber)', route: 'verber_grammatik' },
                { label: '🏃 Top 100 Verber', label_zh: '🏃 常用前100个动词 (Top 100 Verber)', label_ar: '🏃 أهم 100 فعل في الدنماركية (Top 100 Verber)', label_en: '🏃 Top 100 Danish Verbs (Verber)', label_uk: '🏃 Топ 100 данських дієслів', label_vi: '🏃 Top 100 Động từ Đan Mạch', label_ur: '🏃 ڈینش کے 100 اہم افعال (Top 100 Verber)', label_fa: '🏃 ۱۰۰ فعل پرکاربرد دانمارکی (Top 100 Verber)', label_pt: '🏃 Top 100 Verbos Dinamarqueses', label_es: '🏃 Top 100 Verbos Daneses', route: 'top100_verber' }
            ]
        },
        {
            num: 9,
            title: 'Spørgsmål & svar (dialogen)',
            title_zh: '两人聊天一问一答 (Spørgsmål & svar)',
            title_ar: 'سؤال وجواب: كلمة Jo والصدى اللطيف (Spørgsmål & svar)',
            title_uk: 'Запитання та відповіді: магія "Jo!" і ввічливе відлуння (Spørgsmål & svar)',
            title_en: 'Conversational Turns: The Magic "Jo" & Polite Echoes (Spørgsmål & svar)',
            title_vi: 'Hỏi & đáp: Chữ «Jo!» thần kỳ và câu hồi âm lịch sự (Spørgsmål & svar)',
            title_ur: 'سوال و جواب: جادوئی لفظ «Jo!» اور شائستہ جواب (Spørgsmål & svar)',
            title_fa: 'پرسش و پاسخ: کلمه جادویی «Jo!» و بازتاب مؤدبانه (Spørgsmål & svar)',
            title_pt: 'Perguntas e respostas: o mágico «Jo!» e ecos educados (Spørgsmål & svar)',
            title_es: 'Preguntas y respuestas: el mágico «Jo!» y ecos amables (Spørgsmål & svar)',
            subtitle: 'Når to taler sammen: Spørgsmål, svar og de vigtige vaner som "Ja/Jo" og ekko-svar',
            subtitle_zh: '一问一答对答如流、丹麦人最特别的“Jo”与温暖的“回声答话”（det gør jeg）',
            subtitle_ar: 'عندما يتحدث اثنان: الرد بـ "Jo" على السؤال المنفي، والصدى الودود ("det gør jeg")',
            subtitle_uk: 'Коли двоє спілкуються: обов’язкове "Jo!" після заперечення і тепле відлуння ("det gør jeg")',
            subtitle_en: 'Responding with "Jo!" to negative questions, and avoiding dry one-word answers with "det gør jeg"',
            subtitle_vi: 'Khi hai người trò chuyện: bắt buộc dùng «Jo!» sau câu hỏi phủ định và thêm đuôi lịch sự «det gør jeg»',
            subtitle_ur: 'بات چیت کے اصول: منفی سوال پر لازمی «Jo!» اور اکیلے "ہاں/نہیں" کے بجائے شائستہ جواب ("det gør jeg")',
            subtitle_fa: 'قوانین گفتگو: کلمه الزامی «Jo!» بعد از سؤال منفی و افزودن پاسخ مؤدبانه («det gør jeg») به جای بله/خیر خشک',
            subtitle_pt: 'Responder com «Jo!» a perguntas negativas e evitar respostas secas usando «det gør jeg»',
            subtitle_es: 'Responder con «Jo!» a preguntas negativas y evitar respuestas secas usando «det gør jeg»',
            color: '#4ade80',
            widthPct: 93,
            daLine: `A: "Spiser du <u>ikke</u> brød?" ➔ B: "<span class="mss-hl-da">Jo, det gør jeg!</span>" (Ikke kun et tørt "ja")`,
            daLine_zh: 'A: "难道你不吃面包吗？" ➔ B: "Jo, det gør jeg!"（否定问句想说“吃！”，必须用 Jo，再加上一句温暖的回声）',
            daLine_ar: 'A: "Spiser du ikke brød?" ➔ B: "Jo, det gør jeg!" (سؤال منفي ➔ الجواب الحتمي Jo، مع صدى مهذب)',
            daLine_uk: 'A: "Spiser du ikke brød?" ➔ B: "Jo, det gør jeg!" (Заперечне питання ➔ ОБОВ’ЯЗКОВО "Jo!", а не "Ja" + ввічливе відлуння)',
            daLine_en: 'A: "Spiser du ikke brød?" ➔ B: "Jo, det gør jeg!" (Negative question ➔ Mandatory "Jo!", never "Ja")',
            daLine_vi: 'A: "Spiser du ikke brød?" ➔ B: "Jo, det gør jeg!" (Câu hỏi có «ikke» ➔ BẮT BUỘC nói «Jo!», đừng nói «Ja» + câu hồi âm)',
            daLine_ur: 'A: "Spiser du ikke brød?" ➔ B: "Jo, det gør jeg!" (سوال میں «ikke» ہو ➔ لازمی «Jo!» کہیں، «Ja» نہیں + شائستہ دم)',
            daLine_fa: 'A: "Spiser du ikke brød?" ➔ B: "Jo, det gør jeg!" (سؤال منفی ➔ حتماً «Jo!» بگویید مثل «چرا!»، نه «Ja»!)',
            daLine_pt: 'A: "Spiser du ikke brød?" ➔ B: "Jo, det gør jeg!" (Pergunta negativa ➔ «Jo!» obrigatório, nunca «Ja»!)',
            daLine_es: 'A: "Spiser du ikke brød?" ➔ B: "Jo, det gør jeg!" (Pregunta negativa ➔ «Jo!» obligatorio, ¡nunca «Ja»!)',
            myLines: {
                en: `A: "Don't you eat bread?" ➔ B: "<span class="mss-hl-my">Yes, I do!</span>" — English has no distinct word like "Jo" (English just says "Yes"). In Danish, if someone asks a question containing "ikke" (not) and you want to say yes, you MUST say "<strong>Jo!</strong>". Saying "Ja" sounds contradictory to a Dane. And just like English says "Yes, I do", Danish uses the polite echo "<em>Ja, det gør jeg</em>" instead of a blunt one-word answer.`,
                ar: `A: "ألا تأكل الخبز؟" ➔ B: "<span class="mss-hl-my">بَلَى (Balā)</span>، آكلُه!" — هذا تطابق مذهل بين الدنماركية والعربية! كلمة <strong>Jo</strong> الدنماركية تقابل تماماً كلمة <strong>بَلَى</strong> في القرآن واللغة العربية: إذا سألك أحد بسؤال منفي (فيه ikke / ألا) وأردت إثبات الفعل، إياك أن تقول "Ja"، بل قل حتماً <strong>"Jo!"</strong> مع صدى مهذب.`,
                tr: `B: "Evet, yiyorum" — Tyrkisk gentager handlingen i stedet for "det gør jeg".`,
                uk: `A: "Хіба ти не їси хліб?" ➔ B: "<span class="mss-hl-my">Та ні, їм!</span>" — В українській ми кажемо «Так» або «Та ні, їм» і повторюємо саме дієслово («Їм»). У данській же діють два золоті правила: 1) Якщо в питанні є слово <strong>ikke</strong> («не»), а ви хочете підтвердити дію, <strong>НІКОЛИ не кажіть "Ja"</strong> — треба обов’язково сказати <strong>"Jo!"</strong>. 2) Замість сухого одного слова «Ja/Nej» данці завжди додають коротке дружнє відлуння: <em>"Jo, det gør jeg!"</em>.`,
                de: `B: "Doch!" — Tysk har Doch ligesom dansk Jo, men ikke "det gør jeg"-ekko.`,
                es: `A: "¿No comes pan?" ➔ B: "<span class="mss-hl-my">¡Sí, claro que sí!</span>" — En español respondemos «Sí» tanto a preguntas positivas como negativas (o repetimos el verbo: «¡Como!»). En danés hay 2 reglas de oro: 1) Si la pregunta lleva <strong>ikke</strong> (no) y quieres afirmar, <strong>NUNCA digas «Ja»</strong> — es obligatorio decir <strong>«Jo!»</strong>; 2) Un «Ja/Nej» a secas suena frío, así que añade el eco amable: <em>«Jo, det gør jeg!»</em>.`,
                vi: `A: "Bạn không ăn bánh mì à?" ➔ B: "<span class="mss-hl-my">Có chứ, tôi có ăn!</span>" — Trong tiếng Việt, ta chỉ nói «Có» hoặc lặp lại động từ («Ăn chứ!»). Trong tiếng Đan Mạch có 2 thói quen vàng: 1) Nếu câu hỏi có chữ <strong>ikke</strong> (không) mà bạn muốn khẳng định LÀ CÓ, <strong>tuyệt đối KHÔNG nói "Ja"</strong> — phải nói <strong>"Jo!"</strong>; 2) Trả lời cộc lốc mỗi «Ja/Nej» nghe khá lạnh lùng, người Đan Mạch luôn thêm đuôi lịch sự: <em>"Jo, det gør jeg!"</em>.`,
                ur: `A: "کیا آپ روٹی نہیں کھاتے؟" ➔ B: "<span class="mss-hl-my">جی ہاں، کیوں نہیں / کھاتا ہوں!</span>" — اردو میں ہم "جی ہاں" یا فعل دہرا کر جواب دیتے ہیں ("کھاتا ہوں!")۔ مگر ڈینش میں دو سنہری اصول ہیں: 1) اگر سوال میں <strong>ikke</strong> (نہیں) ہو اور آپ ہاں کہنا چاہیں تو <strong>کبھی "Ja" نہ کہیں</strong> — بلکہ لازمی <strong>"Jo!"</strong> کہیں (جیسے عربی میں "بَلَى")۔ 2) صرف ایک خشک لفظ "Ja/Nej" روکھا لگتا ہے، اس لیے ساتھ شائستہ دم لگائیں: <em>"Jo, det gør jeg!"</em>`,
                fa: `A: "مگر نان نمی‌خوری؟" ➔ B: "<span class="mss-hl-my">چرا، می‌خورم! (Cherâ!)</span>" — یک شباهت شگفت‌انگیز بین فارسی و دانمارکی! کلمه دانمارکی <strong>Jo!</strong> دقیقاً معادل <strong>«چرا!»</strong> در فارسی است: هر وقت کسی سؤال منفی (با <em>ikke</em>) پرسید و جواب شما مثبت بود، هرگز نگویید «Ja» — حتماً بگویید <strong>"Jo!"</strong>! و به جای یک «بله/نه» خشک، مثل دانمارکی‌ها یک دمِ دوستانه بچسبانید: <em>"Jo, det gør jeg!"</em>.`,
                pt: `A: "Não comes pão?" ➔ B: "<span class="mss-hl-my">Sim, como!</span>" — Em português respondemos «Sim» tanto a perguntas positivas como negativas (ou repetimos o verbo: «Como!»). Em dinamarquês há 2 hábitos de ouro: 1) Se a pergunta tiver <strong>ikke</strong> (não) e a resposta for positiva, <strong>NUNCA diga «Ja»</strong> — é obrigatório dizer <strong>«Jo!»</strong>; 2) Um simples «Ja/Nej» soa seco, por isso acrescente o eco educado: <em>«Jo, det gør jeg!»</em>.`,
                zh: `B: "<span class="mss-hl-my">吃啊 / 会啊</span>" — 中国人回答喜欢重复动作：“吃啊！”或“不吃”；而在丹麦语里，如果对方的问题里带着<strong>“ikke（不）”</strong>，而你想反驳说“我吃！”，<strong>千千万万不能说 Ja，必须说 "Jo"</strong>！而且丹麦人极少光秃秃扔下一个词，总会像回声一样跟上一句：<em>"Jo, det gør jeg!"</em>（吃呀，我吃呢！），显得特别礼貌亲切。`
            },
            myLines_da: {
                en: `Engelsk har ikke forskel på Ja og Jo (bruger altid "Yes"). Engelsktalende glemmer ofte at sige "Jo!" ved spørgsmål med "ikke". Begge sprog bruger høflige ekkosvar ("Yes, I do" / "Ja, det gør jeg").`,
                zh: `Kinesisk svarer ved at bekræfte handlingen (吃/会). På dansk skal du huske "Jo!" hvis spørgsmålet har et "ikke", og altid føje det venlige ekko "det gør jeg" til.`,
                ar: `Arabisk har ordet بَلَى (Balā), der svarer præcis til dansk "Jo!" efter et spørgsmål med "ikke". Og ligesom på dansk gøres svaret høfligt ved at gentage en lille hale.`,
                uk: `Ukrainsk bruger normalt "Так" (ja) eller "Та ні, їм" og gentager selve udsagnsordet ("Їм") i stedet for "det gør jeg". Derfor er både tvunget "Jo!" efter "ikke" og ekkosvaret ("Ja, det gør jeg") to nye vaner at øve.`,
                vi: `Vietnamesisk svarer normalt med "Có" eller gentager verbet ("Có, tôi có ăn"). På dansk skal man huske tvunget <strong>Jo!</strong> efter "ikke" og undgå nøgent Ja/Nej ved at tilføje det høflige ekko <em>"det gør jeg"</em>.`,
                ur: `Urdu bruger "Ji haan" eller gentager hovedverbet ("khata hoon") uden forskel på Ja og Jo. På dansk skal man lære tvunget <strong>Jo!</strong> efter spørgsmål med "ikke" samt det venlige ekkosvar <em>"det gør jeg"</em>.`,
                fa: `Fantastisk lighed: Persisk har præcis samme ord "چرا (Cherâ!)" som dansk <strong>Jo!</strong> efter et negativt spørgsmål! Hvor persisk blot gentager selve verbet i svaret ("mikhoram"), bruger dansk hjælpeekkoet <em>"det gør jeg"</em>.`,
                pt: `Portugisisk bruger altid "Sim" (uden forskel på Ja og Jo) og gentager ofte hovedverbet ("Como!"). På dansk SKAL man sige <strong>Jo!</strong> efter "ikke" og bruge hjælpeekkoet <em>"det gør jeg"</em>.`,
                es: `Spansk bruger altid "Sí" (uden forskel på Ja og Jo) og gentager ofte hovedverbet ("¡Como!"). På dansk SKAL man sige <strong>Jo!</strong> efter "ikke" og bruge hjælpeekkoet <em>"det gør jeg"</em>.`
            },
            detailExplain: `<strong>Spørgsmål & svar (dialogen):</strong> Når to mennesker taler sammen, hænger replikkerne uløseligt sammen i par. På dansk er der to guldvaner, der får dig til at lyde som en indfødt: 1) Hvis nogen stiller et spørgsmål med <em>"ikke"</em> (f.eks. "Spiser du ikke brød?"), og du vil svare ja, må du ALDRIG sige "Ja" — du skal sige <strong>"Jo!"</strong>. 2) Man svarer sjældent med ét enkelt ord; man tilføjer et lille, venligt ekko: <strong>"Ja, det gør jeg"</strong> eller <strong>"Nej, det gør jeg ikke"</strong>.`,
            detailExplain_zh: `<strong>日常对话的一问一答（Spørgsmål & svar）：</strong>在丹麦生活交流，有两条黄金习惯能让你立刻听起来非常地道又温和：<br>1) <strong>“Jo”的奇妙魔力</strong>：如果对方用带有 <em>ikke（不）</em> 的否定疑问句问你（比如“难道你不想吃吗？”），而你想回答“想吃！”，在丹麦语里<strong>绝对不能说 Ja，必须大声说 "Jo!"</strong>！说 Ja 在丹麦人听来完全摸不着头脑。<br>2) <strong>不当“单字终结者”</strong>：丹麦人极少只扔出一个孤零零的 Ja 或 Nej，那样听起来很生硬冷漠。他们几乎总会在后面挂一句温暖的小回声：<em>"Ja, det gør jeg"</em>（是的，我吃呢）或者 <em>"Nej, det kan jeg ikke"</em>（不好意思，我不行呢）。`,
            detailExplain_ar: `<strong>سؤال وجواب (الحوار الثنائي):</strong> حين يتحاور شخصان، ترتبط الجمل كثنائيات متناغمة. في الدنماركية هناك عادتان ذهبيتان تجعلان كلامك راقياً وطبيعياً جداً:<br><br>
1) <strong>المفاجأة الرائعة: كلمة "Jo" تعادل "بَلَى" تماماً:</strong> إذا سألك شخص سؤالاً يحتوي على نفي (<strong>ikke</strong>) مثل: <em>"Spiser du ikke brød?" (ألا تأكل الخبز؟)</em>، وأردت أن تجيب بالإيجاب (بلى، أنا آكل)، <strong>إياك مطلقاً أن تقول "Ja"</strong>! إذا قلت Ja سيرتبك الدنماركي، بل يجب أن تقول: <strong>"Jo!"</strong> (تماماً كما تقول "بلى" في العربية).<br><br>
2) <strong>الصدى المهذب (لا تكن مجيباً جافاً):</strong> الدنماركيون نادراً ما يجيبون بكلمة وحيدة جافة مثل Ja أو Nej، لأنها تبدو فظة وقاسية. بل يضيفون دائماً صدى صغيراً لطيفاً: <em>"Ja, <strong>det gør jeg</strong>"</em> (نعم، أفعل ذلك) أو <em>"Nej, <strong>det gør jeg ikke</strong>"</em> أو <em>"Jo, <strong>det er jeg</strong>"</em>.`,
            detailExplain_uk: `<strong>Запитання та відповіді (Живий діалог):</strong> У розмові репліки поєднані у пари. Є дві «золоті звички», з якими ваша данська одразу звучатиме тепло та природно:<br><br>1) <strong>Чарівне слово "Jo!":</strong> Якщо співрозмовник питає вас із запереченням <em>ikke</em> (наприклад: <em>"Spiser du <u>ikke</u> brød?"</em> — Хіба ти не їси хліб?), а ви хочете відповісти ствердно («Та ні, їм!» / «Звісно їм!»), <strong>НІКОЛИ не кажіть "Ja"</strong>. Якщо скажете "Ja", данець розгубиться. Обов’язково кажіть: <strong>"Jo!"</strong>.<br><br>2) <strong>Ввічливе відлуння замість сухого «Так/Ні»:</strong> В українській ми часто відповідаємо просто «Так», «Ні» або повторюємо дієслово («Їм»). У Данії сухе одне "Ja" або "Nej" звучить різко і холодно. Завжди додавайте короткий хвостик-відлуння: <em>"Ja, <strong>det gør jeg</strong>"</em>, <em>"Nej, <strong>det gør jeg ikke</strong>"</em> або <em>"Jo, <strong>det er jeg</strong>"</em>!`,
            detailExplain_en: `<strong>Conversational Turns (Spørgsmål & svar):</strong> In dialogue, statements and answers form linked pairs. Two habits will make you sound natural and warm:<br><br>1) <strong>The Essential "Jo!":</strong> If someone asks a question containing a negative word like <em>ikke</em> (e.g. <em>"Spiser du <u>ikke</u> brød?"</em> Don’t you eat bread?), and you want to say "Yes, I DO!", <strong>never say "Ja"</strong>. Saying "Ja" sounds contradictory or confused. You must say: <strong>"Jo!"</strong>.<br><br>2) <strong>The Polite Echo (Don\'t be a one-word robot):</strong> English speakers naturally say *"Yes, I do"* or *"No, I don\'t"*. Danes do the exact same! Dropping a blunt, single "Ja" or "Nej" can feel abrupt and cold. Always soften it with a friendly echo: <em>"Ja, <strong>det gør jeg</strong>"</em>, <em>"Nej, <strong>det gør jeg ikke</strong>"</em>, or <em>"Jo, <strong>det er jeg</strong>"</em>.`,
            detailExplain_vi: `<strong>Hỏi & đáp trong giao tiếp (Spørgsmål & svar):</strong> Trong hội thoại hằng ngày, hai thói quen vàng này giúp bạn nói tiếng Đan Mạch tự nhiên và thân thiện như người bản xứ:<br><br>1) <strong>Chữ «Jo!» thần kỳ:</strong> Nếu ai đó hỏi một câu có chứa từ phủ định <em>ikke</em> (vd: <em>"Spiser du <u>ikke</u> brød?"</em> — Bạn không ăn bánh mì à?) mà bạn muốn trả lời «Có chứ, tôi có ăn!», <strong>tuyệt đối ĐỪNG nói "Ja"</strong>. Nói "Ja" sẽ khiến người Đan Mạch hiểu nhầm ngay! Bạn bắt buộc phải nói: <strong>"Jo!"</strong>.<br><br>2) <strong>Câu hồi âm lịch sự (đừng trả lời cụt lủn):</strong> Người Việt hay nói gọn «Có» hoặc lặp lại động từ («Ăn»). Nhưng ở Đan Mạch, chỉ buông một chữ "Ja" hay "Nej" trơ trọi nghe rất khô khan. Hãy luôn nối thêm đuôi thân thiện: <em>"Ja, <strong>det gør jeg</strong>"</em>, <em>"Nej, <strong>det gør jeg ikke</strong>"</em> hoặc <em>"Jo, <strong>det er jeg</strong>"</em>.`,
            detailExplain_ur: `<strong>سوال و جواب (گفتگو کے اصول):</strong> روزمرہ ڈینش گفتگو میں یہ دو سنہری عادتیں آپ کو فوراً قدرتی اور شائستہ بنا دیتی ہیں:<br><br>1) <strong>جادوئی لفظ «Jo!»:</strong> اگر کوئی آپ سے منفی لفظ <em>ikke</em> کے ساتھ سوال پوچھے (مثلاً: <em>"Spiser du <u>ikke</u> brød?"</em> — کیا آپ روٹی نہیں کھاتے؟) اور آپ ہاں کہنا چاہیں («کیوں نہیں، کھاتا ہوں!»)، تو <strong>کبھی "Ja" نہ کہیں</strong>۔ ڈینش میں اس کا مطلب الجھن پیدا کرتا ہے — آپ کو لازمی <strong>"Jo!"</strong> کہنا ہوگا (بالکل عربی کے «بَلَى» کی طرح)۔<br><br>2) <strong>شائستہ گونج (صرف ایک خشک لفظ نہ بولیں):</strong> اردو میں ہم کبھی صرف «ہاں» یا فعل دہرا کر «کھاتا ہوں» کہتے ہیں؛ ڈینش میں اکیلا "Ja" یا "Nej" تھوڑا روکھا لگتا ہے، اس لیے ہمیشہ پیچھے ایک دوستانہ دم لگائیں: <em>"Ja, <strong>det gør jeg</strong>"</em>، <em>"Nej, <strong>det gør jeg ikke</strong>"</em> یا <em>"Jo, <strong>det er jeg</strong>"</em>۔`,
            detailExplain_fa: `<strong>پرسش و پاسخ در مکالمه (Spørgsmål & svar):</strong> دو عادت طلایی که دانمارکی شما را فوراً گرم و طبیعی می‌کند:<br><br>۱) <strong>کلمه شگفت‌انگیز «Jo!» = دقیقاً «چرا!» در فارسی:</strong> اگر کسی سؤالی با کلمه منفی <em>ikke</em> بپرسد (مثلاً: <em>"Spiser du <u>ikke</u> brød?"</em> — مگر نان نمی‌خوری؟) و شما بخواهید بگویید «چرا، می‌خورم!»، <strong>هرگز نگویید «Ja»</strong>! اگر «Ja» بگویید دانمارکی‌ها گیج می‌شوند — باید حتماً بگویید: <strong>"Jo!"</strong> (دقیقاً مثل «چرا!» در فارسی).<br><br>۲) <strong>پاسخ کوتاه و مؤدبانه:</strong> در فارسی کافی است خود فعل را تکرار کنیم («می‌خورم»)، اما در دانمارکی یک «Ja» یا «Nej» تنها کمی خشک است. همیشه یک بازتاب صمیمی اضافه کنید: <em>"Ja, <strong>det gør jeg</strong>"</em>، <em>"Nej, <strong>det gør jeg ikke</strong>"</em> یا <em>"Jo, <strong>det er jeg</strong>"</em>.`,
            detailExplain_pt: `<strong>Perguntas e respostas (Spørgsmål & svar):</strong> No diálogo, dois hábitos de ouro fazem o seu dinamarquês soar natural e simpático:<br><br>1) <strong>O essencial «Jo!»:</strong> Se alguém fizer uma pergunta com negação <em>ikke</em> (ex.: <em>"Spiser du <u>ikke</u> brød?"</em> — Não comes pão?) e você quiser dizer «Sim, como!», <strong>NUNCA diga «Ja»</strong>. Dizer «Ja» confunde os dinamarqueses — tem de dizer <strong>«Jo!»</strong>.<br><br>2) <strong>O eco educado:</strong> Em português repetimos muitas vezes o verbo principal (<em>«Como!» / «Sou!»</em>). Em dinamarquês, um simples «Ja» ou «Nej» sozinho soa frio e seco. Acrescente sempre o eco simpático com <em>gør</em> (ou repita <em>er/har/kan</em>): <em>"Ja, <strong>det gør jeg</strong>"</em>, <em>"Nej, <strong>det gør jeg ikke</strong>"</em> ou <em>"Jo, <strong>det er jeg</strong>"</em>.`,
            detailExplain_es: `<strong>Preguntas y respuestas (Spørgsmål & svar):</strong> En el diálogo, dos hábitos de oro hacen que tu danés suene natural y simpático:<br><br>1) <strong>El obligatorio «Jo!»:</strong> Si alguien hace una pregunta negativa con <em>ikke</em> (ej.: <em>"Spiser du <u>ikke</u> brød?"</em> — ¿No comes pan?) y quieres responder «¡Sí que como!», <strong>NUNCA digas «Ja»</strong>. Decir «Ja» confunde muchísimo — tienes que decir <strong>«Jo!»</strong>.<br><br>2) <strong>El eco amable:</strong> En español solemos repetir el verbo principal (<em>«¡Como!» / «¡Soy!»</em>) o decir «Sí/No» a secas. En danés, un simple «Ja» o «Nej» suelto suena frío y cortante. Añade siempre el eco simpático con <em>gør</em> (o repite <em>er/har/kan</em>): <em>"Ja, <strong>det gør jeg</strong>"</em>, <em>"Nej, <strong>det gør jeg ikke</strong>"</em> o <em>"Jo, <strong>det er jeg</strong>"</em>.`,
            morePairs: [
                { da: 'A: "Spiser du brød?" → B: "Ja, det gør jeg." (Almindeligt spørgsmål → Ja)', note: '"Det gør jeg" gør svaret venligt og naturligt på dansk.', note_ar: 'سؤال مثبت: "Spiser du brød?" ➔ الجواب: "Ja, det gør jeg." (سؤال عادي ➔ Ja).', note_uk: 'Звичайне питання (без ikke): "Spiser du brød?" ➔ "Ja, det gør jeg." (Тут кажемо Ja + відлуння).', note_en: 'Positive question ➔ Answer with "Ja" + the polite echo "det gør jeg".', note_vi: 'Câu hỏi thường (không có ikke): "Spiser du brød?" ➔ "Ja, det gør jeg." (Dùng Ja + câu hồi âm).', note_ur: 'مثبت سوال (بغیر ikke): "Spiser du brød?" ➔ جواب: "Ja, det gør jeg." (عام سوال ➔ Ja + شائستہ دم)۔', note_fa: 'سؤال مثبت (بدون ikke): "Spiser du brød?" ➔ پاسخ: "Ja, det gør jeg." (بله، می‌خورم + دمِ مؤدبانه).', note_pt: 'Pergunta positiva (sem ikke): "Spiser du brød?" ➔ "Ja, det gør jeg." (Ja + eco educado).', note_es: 'Pregunta positiva (sin ikke): "Spiser du brød?" ➔ "Ja, det gør jeg." (Ja + eco amable).' },
                { da: 'A: "Er du ikke sulten?" → B: "Jo, det er jeg!" (Spørgsmål med "ikke" → Jo)', note: 'Ved ord som "er/har/kan/vil" gentages selve hjælpeordet i stedet for "gør".', note_zh: '问句里有“ikke（不）”，肯定回答千万不能说 Ja，一定要说“Jo”！', note_ar: 'سؤال منفي: "Er du ikke sulten?" ➔ الجواب: "Jo, det er jeg!" (سؤال فيه ikke ➔ حتماً Jo، ومستحيل Ja!).', note_uk: 'Питання з "ikke": "Er du ikke sulten?" ➔ "Jo, det er jeg!" (Обов’язково Jo! З дієсловами er/har/kan повторюємо саме їх замість gør).', note_en: 'Negative question containing "ikke" ➔ Mandatory "Jo!". For modal/auxiliary verbs (er, har, kan), echo that specific verb.', note_vi: 'Câu hỏi có "ikke": "Er du ikke sulten?" ➔ "Jo, det er jeg!" (Bắt buộc dùng Jo! Với các từ er/har/kan thì lặp lại chính từ đó thay cho gør).', note_ur: 'منفی سوال (مع ikke): "Er du ikke sulten?" ➔ جواب: "Jo, det er jeg!" (لازمی Jo! اور er/har/kan کے لیے gør کی جگہ وہی لفظ دہراتے ہیں)۔', note_fa: 'سؤال منفی (با ikke): "Er du ikke sulten?" ➔ پاسخ: "Jo, det er jeg!" («چرا، هستم!» — با er/har/kan همان کلمه تکرار می‌شود).', note_pt: 'Pergunta negativa com "ikke": "Er du ikke sulten?" ➔ "Jo, det er jeg!" (Jo! obrigatório; com er/har/kan repete-se o próprio verbo em vez de gør).', note_es: 'Pregunta negativa con "ikke": "Er du ikke sulten?" ➔ "Jo, det er jeg!" (¡Jo! obligatorio; con er/har/kan se repite el mismo verbo en vez de gør).' }
            ],
            links: [
                { label: '🗣️ Samtaletræning', label_zh: '🗣️ 实用情景会话训练 (Samtaletræning)', label_ar: '🗣️ تدريب المحادثة الواقعية (Samtaletræning)', label_uk: '🗣️ Тренування живого діалогу', label_en: '🗣️ Real-life dialogue practice (Samtaletræning)', label_vi: '🗣️ Luyện hội thoại thực tế (Samtaletræning)', label_ur: '🗣️ حقیقی مکالمے کی مشق (Samtaletræning)', label_fa: '🗣️ تمرین مکالمه واقعی (Samtaletræning)', label_pt: '🗣️ Treino de conversação (Samtaletræning)', label_es: '🗣️ Práctica de conversación (Samtaletræning)', route: 'samtale_traening' },
                { label: '💬 Lav spørgsmål & svar', label_zh: '💬 问答应答轮次练习 (Spørgsmål & svar)', label_ar: '💬 الحوار وسؤال وجواب (Spørgsmål & svar)', label_uk: '💬 Запитання та відповіді (Spørgsmål & svar)', label_en: '💬 Questions and answers (Spørgsmål & svar)', label_vi: '💬 Luyện hỏi & đáp (Spørgsmål & svar)', label_ur: '💬 سوال و جواب کی مشق (Spørgsmål & svar)', label_fa: '💬 تمرین سؤال و جواب (Spørgsmål & svar)', label_pt: '💬 Perguntas e respostas (Spørgsmål & svar)', label_es: '💬 Preguntas y respuestas (Spørgsmål & svar)', route: 'lav_sporgsmal' }
            ]
        },
        {
            num: 10,
            title: 'Den fulde samtale',
            title_zh: '连贯对话与生动聊天 (Den fulde samtale)',
            title_ar: 'المحادثة الحية: جسور الربط وكلمات الابتسامة (Den fulde samtale)',
            title_uk: 'Повноцінна розмова: містки та «слова-усмішки» (Den fulde samtale)',
            title_en: 'The Full Flowing Conversation: Bridges & Smiley Words (Den fulde samtale)',
            title_vi: 'Cuộc trò chuyện trọn vẹn: Từ nối & «từ làm mềm câu» (Den fulde samtale)',
            title_ur: 'مکمل گفتگو: ربط والے الفاظ اور «مسکراہٹ کے الفاظ» (Den fulde samtale)',
            title_fa: 'مکالمه کامل: حروف ربط و کلمات صمیمی (Den fulde samtale)',
            title_pt: 'A conversa completa: conectores e palavras-sorriso (Den fulde samtale)',
            title_es: 'La conversación completa: conectores y palabras amables (Den fulde samtale)',
            subtitle: 'Når sætninger bindes sammen til levende tale med bindeord og småord ("nå", "lige", "ikke?")',
            subtitle_zh: '把几句话串成生动的聊天：用连接词搭桥，用丹麦语神奇小词（nå, jo, lige, ikke?）让话变甜',
            subtitle_ar: 'ربط الجمل بحروف العطف (så, fordi) وإضفاء الدفء بكلمات الحوار السحرية (nå, lige, ikke?)',
            subtitle_uk: 'Як з’єднати думки в живу розмову за допомогою сполучників (så, fordi) та маленьких розмовних слів (nå, lige, ikke?)',
            subtitle_en: 'Linking thoughts with conjunctions (så, fordi) and adding warmth with little conversational words (nå, lige, ikke?)',
            subtitle_vi: 'Kết nối ý bằng từ nối (så, fordi) và làm câu nói ấm áp với những từ đệm kỳ diệu (nå, lige, ikke?)',
            subtitle_ur: 'خیالات کو جوڑنے والے الفاظ (så, fordi) اور گفتگو کو نرم بنانے والے چھوٹے الفاظ (nå, lige, ikke?)',
            subtitle_fa: 'وصل کردن جملات با کلمات ربط (så, fordi) و نرم کردن لحن گفتگو با کلمات جادویی (nå, lige, ikke?)',
            subtitle_pt: 'Ligar frases com conjunções (så, fordi) e dar calor humano com pequenas partículas (nå, lige, ikke?)',
            subtitle_es: 'Conectar frases con conjunciones (så, fordi) y dar cercanía con pequeñas partículas (nå, lige, ikke?)',
            color: '#2dd4bf',
            widthPct: 100,
            daLine: `"<span class="mss-hl-da">Nå</span>, jeg er sulten, <span class="mss-hl-da">så</span> jeg spiser lige noget brød i køkkenet, <span class="mss-hl-da">ikke?</span>"`,
            daLine_zh: '"Nå, jeg er sulten, så jeg spiser lige noget brød, ikke?"（“好啦，我饿了，所以顺便吃点面包，对吧？”）',
            daLine_ar: '"Nå, jeg er sulten, så jeg spiser lige noget brød i køkkenet, ikke?" ("حسناً، أنا جائع، لذا سآكل على السريع بعض الخبز في المطبخ، تمام؟")',
            daLine_uk: '"Nå, jeg er sulten, så jeg spiser lige noget brød i køkkenet, ikke?" («Ну, я голодний, тому швиденько перекушу хлібом на кухні, добре?»)',
            daLine_en: '"Nå, jeg er sulten, så jeg spiser lige noget brød i køkkenet, ikke?" ("Well, I\'m hungry, so I\'ll just grab some bread in the kitchen, right?")',
            daLine_vi: '"Nå, jeg er sulten, så jeg spiser lige noget brød i køkkenet, ikke?" («À, tôi đói rồi, nên tôi ăn chút bánh mì trong bếp nhé?»)',
            daLine_ur: '"Nå, jeg er sulten, så jeg spiser lige noget brød i køkkenet, ikke?" («اچھا، مجھے بھوک لگی ہے، تو میں ذرا باورچی خانے میں روٹی کھا لوں، ٹھیک ہے نا؟»)',
            daLine_fa: '"Nå, jeg er sulten, så jeg spiser lige noget brød i køkkenet, ikke?" («خب، گرسنه‌ام، پس یک کم نان توی آشپزخانه می‌خورم، باشه/مگه نه؟»)',
            daLine_pt: '"Nå, jeg er sulten, så jeg spiser lige noget brød i køkkenet, ikke?" («Bem, estou com fome, então vou ali comer um pão na cozinha, tá?»)',
            daLine_es: '"Nå, jeg er sulten, så jeg spiser lige noget brød i køkkenet, ikke?" («Bueno, tengo hambre, así que voy a comer un poco de pan en la cocina, ¿vale?»)',
            myLines: {
                en: `"<span class="mss-hl-my">Well</span>, I'm hungry, <span class="mss-hl-my">so</span> I'll <span class="mss-hl-my">just</span> eat some bread in the kitchen, <span class="mss-hl-my">okay?</span>" — English uses conversational fillers like "well", "just", "you know", "right?". Danish does the exact same with small magic words: <strong>nå</strong> (well/oh), <strong>lige</strong> (just/casually), and <strong>ikke?</strong> (right?). Notice that "fordi" (because) makes "ikke" jump in front of the verb: "...fordi jeg ikke spiser brød".`,
                ar: `<span class="mss-hl-my">طيب / يعني</span>، أنا جائع، <span class="mss-hl-my">لذلك</span> سآكل على السريع في المطبخ، <span class="mss-hl-my">مش هيك / تمام؟</span>" — كما نستخدم في العربية العامية كلمات مثل "يعني، طيب، ماشي، تمام" لتلطيف الحديث، يستعمل الدنماركيون كلمات سحرية مثل <strong>nå, lige, jo, ikke?</strong> ليصبح الحديث دافئاً وإنسانياً.`,
                tr: `"Şey / Yani, karnım aç, o yüzden mutfakta biraz ekmek yiyorum, tamam mı?"`,
                uk: `"<span class="mss-hl-my">Ну</span>, я голодний, <span class="mss-hl-my">тому</span> я <span class="mss-hl-my">просто</span> поїм хліба на кухні, <span class="mss-hl-my">добре?</span>" — Як і в українській («ну, просто, ж, правда?»), в данській мові маленькі розмовні слова <strong>nå, lige, jo, ikke?</strong> перетворюють «сухе» речення з підручника на теплу людську розмову! І ще підказка: після <strong>fordi</strong> («тому що») слово <em>ikke</em> перестрибує ПЕРЕД дієслово (<em>...fordi jeg <strong>ikke</strong> spiser</em>), майже як наше «бо я <u>не</u> їм»!`,
                de: `"Na ja, ich bin hungrig, also esse ich mal Brot in der Küche, oder?"`,
                es: `"<span class="mss-hl-my">Bueno / Pues</span>, tengo hambre, <span class="mss-hl-my">así que</span> como un poco de pan en la cocina, <span class="mss-hl-my">¿vale / no?</span>" — Igual que en español hablado usamos «bueno, pues, nada, ¿vale? / ¿no?» para sonar cercanos, los daneses usan <strong>nå, lige, jo, ikke?</strong>! Y una gran noticia: después de <strong>fordi</strong> (porque), el negativo <em>ikke</em> salta DELANTE del verbo: <em>"...fordi jeg <strong>ikke</strong> spiser"</em> — ¡igual que en español «porque yo <u>no</u> como»!`,
                vi: `"<span class="mss-hl-my">À</span>, tôi đói rồi, <span class="mss-hl-my">nên</span> tôi ăn <span class="mss-hl-my">chút</span> bánh mì trong bếp <span class="mss-hl-my">nhé!</span>" — Giống như các tiểu từ cuối câu tiếng Việt (<em>à, nhé, nha, đấy, chút</em>) giúp lời nói trở nên thân mật, tiếng Đan Mạch dùng những «từ cười» như <strong>nå, lige, jo, ikke?</strong> để cuộc trò chuyện mềm mại và tự nhiên! Và chú ý: sau chữ <strong>fordi</strong> (bởi vì), từ <em>ikke</em> nhảy lên TRƯỚC động từ: <em>"...fordi jeg <strong>ikke</strong> spiser"</em> — gần giống tiếng Việt «vì tôi <u>không</u> ăn»!`,
                ur: `"<span class="mss-hl-my">اچھا / تو</span>، مجھے بھوک لگی ہے، <span class="mss-hl-my">اس لیے</span> میں <span class="mss-hl-my">ذرا</span> باورچی خانے میں روٹی کھا لیتا ہوں، <span class="mss-hl-my">ٹھیک ہے نا؟</span>" — بالکل ویسے ہی جیسے اردو میں ہم بات کو نرم بنانے کے لیے «اچھا، تو، ذرا، بھئی، نا؟» استعمال کرتے ہیں، ڈینش لوگ <strong>nå, lige, jo, ikke?</strong> جیسے الفاظ لگاتے ہیں! اور خوشخبری: <strong>fordi</strong> (کیونکہ) کے بعد <em>ikke</em> فعل سے پہلے آ جاتا ہے: <em>"...fordi jeg <strong>ikke</strong> spiser"</em> — بالکل اردو «کیونکہ میں <u>نہیں</u> کھاتا» کی طرح!`,
                fa: `"<span class="mss-hl-my">خب</span>، گرسنه‌ام، <span class="mss-hl-my">پس</span> توی آشپزخانه <span class="mss-hl-my">یه کمی</span> نان می‌خورم، <span class="mss-hl-my">باشه؟</span>" — درست مثل فارسی گفتاری که با کلماتی مثل «خب، یه لحظه، دیگه، باشه/نه؟» لحن را گرم می‌کنیم، دانمارکی‌ها از <strong>nå, lige, jo, ikke?</strong> استفاده می‌کنند! و یک نکته عالی: بعد از <strong>fordi</strong> (چون/زیرا)، کلمه منفی <em>ikke</em> می‌پرد <u>قبل از</u> فعل: <em>"...fordi jeg <strong>ikke</strong> spiser"</em> (دقیقاً مثل «چون نان <u>نـ</u>می‌خورم» در فارسی)!`,
                pt: `"<span class="mss-hl-my">Bem / Olha</span>, estou com fome, <span class="mss-hl-my">então</span> vou <span class="mss-hl-my">ali</span> comer um pão na cozinha, <span class="mss-hl-my">né / tá?</span>" — Tal como no português falado usamos «bem, então, ali, né?, tá?» para suavizar a frase, os dinamarqueses usam <strong>nå, lige, jo, ikke?</strong>! E uma ótima notícia: depois de <strong>fordi</strong> (porque), a negação <em>ikke</em> salta para ANTES do verbo: <em>"...fordi jeg <strong>ikke</strong> spiser"</em> — igualzinho ao português «porque eu <u>não</u> como»!`,
                zh: `"<span class="mss-hl-my">哎 (Āi)</span>，我饿了，<span class="mss-hl-my">所以</span>去厨房吃点面包，<span class="mss-hl-my">对吧？</span>" — 中文聊天时，我们会用“呢、吧、啊、嘛”来让气氛轻松；丹麦人也是一样！他们有一批神奇的<strong>“润滑小词”（nå, jo, lige, vel, ikke?）</strong>。比如加一个 <strong>lige</strong>（我“顺便”吃点），语气瞬间变得非常客气随意；句末加一个 <strong>ikke?</strong>（对吧？），立刻拉近了两人的距离！`
            },
            myLines_da: {
                en: `Engelsk bruger fillers som "well, just, right?". Dansk bruger bindeord (så, fordi, men) og småord som "nå, lige, jo, vel, ikke?". Bemærk ledsætningsordstilling efter "fordi", hvor ikke hopper foran verbet.`,
                zh: `Kinesisk bruger småpartikler som 呢, 吧, 啊 til at gøre stemningen venlig; dansk bruger sine egne små magiske ord som nå, jo, lige og ikke?`,
                ar: `Arabisk bruger ord som "ya'ni, tayyeb, tamām" til at skabe uformel samtalestemning. På dansk bruger vi bindeord (så, fordi, men) og småord (nå, lige, ikke?), der fungerer som sprogets smileys.`,
                uk: `Ukrainsk bruger småord som "ну, просто, ж, добре?" præcis som dansk bruger "nå, lige, jo, ikke?". En bonus for ukrainere: i ledsætninger med "fordi" står "ikke" FORAN verbet ("...fordi jeg ikke spiser"), hvilket ligner ukrainsk ("бо я не їм")!`,
                vi: `Vietnamesisk bruger hyggeligt småord som "à, nhé, nha, chút" — præcis ligesom dansk "nå, lige, jo, ikke?". Bonus efter "fordi": i ledsætning står "ikke" FORAN verbet ("...fordi jeg ikke spiser"), hvilket ligner vietnamesisk ("vì tôi không ăn")!`,
                ur: `Urdu bruger hyggelige småord som "accha, zara, na?" — præcis som dansk "nå, lige, jo, ikke?". Bonus efter "fordi": i ledsætning står "ikke" FORAN verbet ("...fordi jeg ikke spiser"), ligesom i urdu ("kyunki main nahi khata")!`,
                fa: `Farsi bruger hyggelige småord som "khob, dige, bâshe/na?" — ligesom dansk "nå, lige, jo, ikke?". Bonus efter "fordi": i ledsætning står "ikke" FORAN verbet ("...fordi jeg ikke spiser"), ligesom i farsi ("chon man na-mikhoram")!`,
                pt: `Portugisisk bruger hyggelige småord som "bem, ali, né?, tá?" — ligesom dansk "nå, lige, jo, ikke?". Bonus efter "fordi": i ledsætning står "ikke" FORAN verbet ("...fordi jeg ikke spiser"), præcis som portugisisk ("porque eu não como")!`,
                es: `Spansk bruger hyggelige småord som "bueno, pues, ¿vale?, ¿no?" — ligesom dansk "nå, lige, jo, ikke?". Bonus efter "fordi": i ledsætning står "ikke" FORAN verbet ("...fordi jeg ikke spiser"), præcis som spansk ("porque yo no como")!`
            },
            detailExplain: `<strong>Den fulde samtale:</strong> Her binder vi flere tanker sammen, så det ikke lyder som en robot, men som et rigtigt levende menneske. På dansk bruger vi to ting til at få sproget til at flyde: 1) <strong>Bindeord</strong> som <em>så, fordi, men, når</em> til at bygge bro mellem sætningerne. 2) <strong>Småord</strong> som <em>nå, jo, lige, vel, ikke?</em>, der fungerer som sprogets smileys og gør samtalen varm og hyggelig.`,
            detailExplain_zh: `<strong>生动的整场聊天（Den fulde samtale）：</strong>在语言阶梯的最顶端，我们终于能把一连串的句子串成生动、温暖的人性化交流。地道丹麦语有两大沟通法宝：<br>1) <strong>搭桥的连接词</strong>：用 <em>fordi（因为）、så（所以）、men（但是）、når（当...时）</em> 把前后几句话连起来。<br>2) <strong>像表情包一样的“润滑小词”</strong>：丹麦人嘴里永远少不了 <em>nå（好啦/原来如此）、lige（顺便/稍微一下下）、jo（正如大家都知道的）、ikke?（对不对呀？）</em>。少用这些小词，丹麦人会觉得你像个严肃冷淡的播音员；一用上它们，你就像在丹麦朋友家里喝咖啡聊天一样自然！`,
            detailExplain_ar: `<strong>المحادثة الكاملة (Den fulde samtale):</strong> في قمة هرم اللغة، نصل إلى نسج عدة أفكار معاً لنبدو كبشر حقيقيين نتواصل بدفء، وليس كروبوتات تقرأ جملاً جافة. لتحقيق ذلك في الدنماركية نستخدم وسيلتين:<br><br>
1) <strong>جسور الربط (حروف العطف):</strong> مثل <em>fordi</em> (لأن)، <em>så</em> (لذلك/إذن)، <em>men</em> (لكن)، <em>når</em> (عندما). انتبه: كلمة <em>fordi</em> لها سحر خاص، فإذا جاء بعدها نفي، يقفز <em>ikke</em> أمام الفعل: <em>"...fordi jeg <strong>ikke</strong> spiser brød"</em>.<br><br>
2) <strong>كلمات الابتسامة السحرية (الرموز التعبيرية في الحديث):</strong> الدنماركيون يزينون كلامهم دائماً بكلمات خفيفة تجعل النبرة ودودة ومهذبة: <em>nå</em> (حسناً / أها!)، <em>lige</em> (على السريع / مجرد خطوة خفيفة)، <em>jo</em> (كما تعلم بالطبع)، و <em>ikke?</em> في نهاية الجملة (أليس كذلك؟ تمام؟). هذه الكلمات الصغيرة هي التي تحول لغتك من لغة كتب باردة إلى دنماركية أصيلة دافئة تشبه جلسة شاي بين الأصدقاء!`,
            detailExplain_uk: `<strong>Повноцінна жива розмова (Den fulde samtale):</strong> На вершині мовної драбини ми поєднуємо думки в одне ціле, щоб звучати як жива людина, а не як робот. У данській для цього працюють два інструменти:<br><br>1) <strong>Сполучники-містки:</strong> <em>så</em> (тому), <em>fordi</em> (тому що), <em>men</em> (але), <em>når</em> (коли). Зверніть увагу на <em>fordi</em>: у підрядному реченні після <em>fordi</em> заперечення <em>ikke</em> перестрибує ПЕРЕД дієслово: <em>"...fordi jeg <strong>ikke</strong> spiser brød"</em> — це якраз схоже на українське «бо я <u>не</u> їм»!<br><br>2) <strong>Маленькі «слова-усмішки» (Småord):</strong> Данці постійно прикрашають мовлення легкими словами: <em><strong>nå</strong></em> (ну / ага / зрозуміло), <em><strong>lige</strong></em> (просто / на секунду / пом’якшення прохання), <em><strong>jo</strong></em> (адже ми обидва це знаємо), <em><strong>ikke?</strong></em> (правда ж?). Без них мовлення звучить сухо, а з ними — тепло й по-домашньому!`,
            detailExplain_en: `<strong>The Full Flowing Conversation (Den fulde samtale):</strong> Connecting multiple thoughts into authentic human conversation. In Danish, this is driven by two tools:<br><br>1) <strong>Bridge Words (Conjunctions):</strong> Words like <em>så</em> (so/therefore), <em>fordi</em> (because), <em>men</em> (but), and <em>når</em> (when/if). Watch out for <em>fordi</em>: in clauses starting with <em>fordi</em>, if you use a negative word like <em>ikke</em>, it jumps in FRONT of the verb: <em>"...fordi jeg <strong>ikke</strong> spiser brød"</em> (unlike standard sentences where it follows the verb!).<br><br>2) <strong>Conversational Smiley Words (The Social Lubricant):</strong> Danes constantly sprinkle small words into speech to soften the tone: <em><strong>nå</strong></em> (well / I see), <em><strong>lige</strong></em> (just quickly / casually), <em><strong>jo</strong></em> (as you know), and <em><strong>ikke?</strong></em> (right? / isn’t that so?). Without these, Danish sounds formal and rigid; with them, you sound like a local chatting over coffee!`,
            detailExplain_vi: `<strong>Cuộc trò chuyện trôi chảy tự nhiên (Den fulde samtale):</strong> Ở bậc cao nhất, ta nối nhiều ý thành giao tiếp sống động như người thật. Tiếng Đan Mạch có hai công cụ chính:<br><br>1) <strong>Từ nối (Bindeord):</strong> <em>så</em> (nên/vì vậy), <em>fordi</em> (bởi vì), <em>men</em> (nhưng), <em>når</em> (khi). Lưu ý thú vị với <em>fordi</em>: ở mệnh đề sau <em>fordi</em>, chữ phủ định <em>ikke</em> nhảy lên TRƯỚC động từ: <em>"...fordi jeg <strong>ikke</strong> spiser brød"</em> — điểm này rất giống tiếng Việt «vì tôi <u>không</u> ăn bánh mì»!<br><br>2) <strong>Những «từ đệm nụ cười» (Småord):</strong> Giống như tiếng Việt rất hay dùng <em>à, nhé, nha, chút</em> ở đầu/cuối câu để giữ hòa khí, người Đan Mạch rắc thêm <em><strong>nå</strong></em> (à / thế à), <em><strong>lige</strong></em> (một chút / nhẹ nhàng), <em><strong>jo</strong></em> (như bạn biết đấy), và <em><strong>ikke?</strong></em> (đúng không / nhé?). Có những từ nhỏ này, câu nói sẽ mềm mại và tự nhiên hẳn lên!`,
            detailExplain_ur: `<strong>مکمل اور رواں گفتگو (Den fulde samtale):</strong> زبان کی سیڑھی کے آخری درجے پر ہم کئی جملوں کو جوڑ کر کتابی روبوٹ کے بجائے حقیقی انسان کی طرح بات کرتے ہیں۔ ڈینش میں اس کے دو اہم راز ہیں:<br><br>1) <strong>جوڑنے والے الفاظ (Bindeord):</strong> جیسے <em>så</em> (تو / اس لیے)، <em>fordi</em> (کیونکہ)، <em>men</em> (مگر)، <em>når</em> (جب)۔ دلچسپ بات: <em>fordi</em> کے بعد منفی لفظ <em>ikke</em> فعل سے پہلے آ جاتا ہے: <em>"...fordi jeg <strong>ikke</strong> spiser brød"</em> — بالکل اردو «کیونکہ میں روٹی <u>نہیں</u> کھاتا» کی طرح!<br><br>2) <strong>گفتگو کے «مسکراہٹ والے الفاظ» (Småord):</strong> جیسے اردو میں ہم <em>اچھا، ذرا، نا؟</em> کہہ کر لہجہ نرم کرتے ہیں، ڈینش لوگ <em><strong>nå</strong></em> (اچھا/سمجھا)، <em><strong>lige</strong></em> (ذرا / جلدی سے)، <em><strong>jo</strong></em> (جیسا کہ ہم جانتے ہیں) اور <em><strong>ikke?</strong></em> (ٹھیک ہے نا؟) شامل کرتے ہیں۔ ان سے ڈینش بہت دوستانہ لگتی ہے!`,
            detailExplain_fa: `<strong>مکالمه روان و طبیعی (Den fulde samtale):</strong> در آخرین پله، جملات را به هم می‌بافیم تا به جای متن خشک کتابی، مثل یک انسان صمیمی صحبت کنیم:<br><br>۱) <strong>کلمات ربط (Bindeord):</strong> مثل <em>så</em> (پس/بنابراین)، <em>fordi</em> (چون/زیرا)، <em>men</em> (اما)، <em>når</em> (وقتی که). نکته جالب بعد از <em>fordi</em>: کلمه منفی <em>ikke</em> به <u>جلوِ</u> فعل می‌پرد: <em>"...fordi jeg <strong>ikke</strong> spiser brød"</em> — دقیقاً مثل فارسی «چون نان <u>نـ</u>می‌خورم»!<br><br>۲) <strong>کلمات لطیف‌کننده گفتگو (Småord):</strong> همان‌طور که در فارسی می‌گوییم «خب، یه لحظه، دیگه، باشه/مگه نه؟»، دانمارکی‌ها همیشه از <em><strong>nå</strong></em> (خب / آهان)، <em><strong>lige</strong></em> (یک لحظه / سریع و خودمانی)، <em><strong>jo</strong></em> (همان‌طور که می‌دانی) و <em><strong>ikke?</strong></em> (درسته؟ / مگه نه؟) استفاده می‌کنند تا مکالمه گرم و دوستانه شود!`,
            detailExplain_pt: `<strong>A conversa completa (Den fulde samtale):</strong> No último degrau ligamos várias ideias numa conversa fluida e humana:<br><br>1) <strong>Conjunções-ponte (Bindeord):</strong> Como <em>så</em> (então/por isso), <em>fordi</em> (porque), <em>men</em> (mas), <em>når</em> (quando). Dica boa após <em>fordi</em>: na oração subordinada o negativo <em>ikke</em> salta para ANTES do verbo: <em>"...fordi jeg <strong>ikke</strong> spiser brød"</em> — exatamente igual ao português «porque eu <u>não</u> como pão»!<br><br>2) <strong>Palavras-sorriso (Småord):</strong> Tal como em português usamos «bem, ali, lá, né?, tá?» para deixar a conversa calorosa, os dinamarqueses usam <em><strong>nå</strong></em> (ah, bom), <em><strong>lige</strong></em> (só um instante / sem cerimónia), <em><strong>jo</strong></em> (como sabes) e <em><strong>ikke?</strong></em> (não é? / né?). Sem elas, a fala soa rígida!`,
            detailExplain_es: `<strong>La conversación completa (Den fulde samtale):</strong> En el último escalón unimos varias ideas en una charla fluida y humana:<br><br>1) <strong>Conjunciones puente (Bindeord):</strong> Como <em>så</em> (así que/entonces), <em>fordi</em> (porque), <em>men</em> (pero), <em>når</em> (cuando). Un truco genial tras <em>fordi</em>: en la subordinada, la negación <em>ikke</em> salta DELANTE del verbo: <em>"...fordi jeg <strong>ikke</strong> spiser brød"</em> — ¡igualito al español «porque yo <u>no</u> como pan»!<br><br>2) <strong>Palabras de cercanía (Småord):</strong> Igual que en español usamos «bueno, pues, un momento, ¿vale?, ¿no?» para dar calor a la frase, los daneses usan <em><strong>nå</strong></em> (bueno / ah), <em><strong>lige</strong></em> (un momento / sin rodeos), <em><strong>jo</strong></em> (como ya sabes) e <em><strong>ikke?</strong></em> (¿verdad? / ¿no?). ¡Sin ellas el habla suena rígida!`,
            morePairs: [
                { da: 'Jeg spiser brød, FORDI jeg er sulten. (Bindeord hvor "ikke" hopper foran handlingen) ↔ Jeg er sulten, SÅ jeg spiser brød.', note: 'Bindeordet styrer rækkefølgen af ordene i næste sætning.', note_zh: '连接词一换，后面的句子排队规矩也跟着变（比如 fordi 后面如果加“不 ikke”，ikke 会超车跳到动作前面）。', note_ar: 'أداة الربط تغير الترتيب: fordi تجعل ikke تسبق الفعل (...fordi jeg ikke spiser brød). أما så فالفعل يحتل المركز الثاني بعدها.', note_uk: 'Сполучник задає порядок слів: після "fordi" слово "ikke" стоїть ПЕРЕД дієсловом, а після "så" зберігається звичайний порядок.', note_en: 'The conjunction dictates the word order of the following clause (e.g. "ikke" jumps in front of the verb after "fordi").', note_vi: 'Từ nối quyết định trật tự từ phía sau: sau "fordi", chữ "ikke" nhảy lên TRƯỚC động từ (giống tiếng Việt!), còn sau "så" giữ nguyên trật tự thường.', note_ur: 'ربط کا لفظ اگلے حصے کی ترتیب بدلتا ہے: "fordi" کے بعد "ikke" فعل سے پہلے آتا ہے (بالکل اردو کی طرح!)، جبکہ "så" کے بعد V2 ترتیب رہتی ہے۔', note_fa: 'کلمه ربط ترتیب جمله بعدی را تعیین می‌کند: بعد از «fordi» کلمه «ikke» قبل از فعل می‌آید (مثل فارسی!)، اما بعد از «så» قانون V2 برقرار است.', note_pt: 'A conjunção manda na ordem: depois de «fordi», o «ikke» fica ANTES do verbo (como em português!), enquanto «så» mantém a frase normal.', note_es: 'La conjunción manda en el orden: después de «fordi», «ikke» va ANTES del verbo (¡como en español!), mientras que «så» mantiene el orden normal.' },
                { da: '"Nå!" (Overraskelse/ny info) • "Jeg spiser LIGE..." (Gør handlingen uformel og kort)', note: 'Småordene gør dansk levende i hverdagen.', note_zh: '善用 lige（顺便）和 nå（好啦），瞬间让你的丹麦语脱离书本腔，变得鲜活自然。', note_ar: 'استعمال كلمة lige (على السريع/قليلاً) يجعل أي طلب أو تصرف يبدو لطيفاً وغير متكلف في الحياة اليومية.', note_uk: 'Маленькі слова ("nå!", "lige", "jo") роблять повсякденну данську живою, теплою та невимушеною.', note_en: 'Small filler words make spoken Danish warm, natural, and friendly in everyday life.', note_vi: 'Những từ đệm nhỏ (nå, lige, jo, ikke?) biến tiếng Đan Mạch giao tiếp hằng ngày trở nên ấm áp và tự nhiên như nhé/nha của tiếng Việt.', note_ur: 'چھوٹے الفاظ ("nå!", "lige", "jo") روزمرہ ڈینش کو کتابی لہجے سے نکال کر قدرتی اور دوستانہ بنا دیتے ہیں۔', note_fa: 'این کلمات کوچک ("nå!", "lige", "jo") دانمارکی روزمره را از حالت کتابی خارج و صمیمی می‌کنند.', note_pt: 'As pequenas partículas («nå!», «lige», «jo») tornam o dinamarquês do dia a dia vivo, leve e simpático.', note_es: 'Las pequeñas partículas («nå!», «lige», «jo») hacen que el danés diario sea vivo, ligero y cercano.' }
            ],
            links: [
                { label: '🔗 Konjunktioner & Bindeord', label_zh: '🔗 连词与复合句 (Konjunktioner)', label_ar: '🔗 حروف الربط والعطف (Konjunktioner)', label_uk: '🔗 Сполучники та складені речення', label_en: '🔗 Conjunctions & clauses (Konjunktioner)', label_vi: '🔗 Từ nối & câu ghép (Konjunktioner)', label_ur: '🔗 جوڑنے والے الفاظ اور مرکب جملے (Konjunktioner)', label_fa: '🔗 حروف ربط و جملات مرکب (Konjunktioner)', label_pt: '🔗 Conjunções e conectores (Konjunktioner)', label_es: '🔗 Conjunciones y conectores (Konjunktioner)', route: 'traen_grammatik' },
                { label: '✨ De små magiske ord (jo, nok, lige)', label_zh: '✨ 丹麦语高频语气小词 (jo, nok, lige)', label_ar: '✨ الكلمات اليومية السحرية (jo, nok, lige)', label_uk: '✨ Маленькі чарівні слова (jo, nok, lige)', label_en: '✨ Small magic words (jo, nok, lige)', label_vi: '✨ Các tiểu từ thân mật (jo, nok, lige)', label_ur: '✨ روزمرہ کے جادوئی الفاظ (jo, nok, lige)', label_fa: '✨ کلمات کوچک و پرکاربرد (jo, nok, lige)', label_pt: '✨ Pequenas palavras mágicas (jo, nok, lige)', label_es: '✨ Pequeñas palabras mágicas (jo, nok, lige)', route: 'adverbier_smaaord' },
                { label: '🕹️ Interaktive historier', label_zh: '🕹️ 沉浸式互动故事 (Interaktive historier)', label_ar: '🕹️ قصص تفاعلية لتعلم المحادثة (Interaktive historier)', label_uk: '🕹️ Інтерактивні діалоги та історії', label_en: '🕹️ Interactive dialogue stories (Historier)', label_vi: '🕹️ Truyện tương tác luyện đọc', label_ur: '🕹️ دلچسپ کہانیاں اور مکالمے (Historier)', label_fa: '🕹️ داستان‌های تعاملی (Historier)', label_pt: '🕹️ Histórias interativas (Historier)', label_es: '🕹️ Historias interactivas (Historier)', route: 'historier_menu' }
            ]
        }
    ];

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'mss-top-bar';
    viewContainer.appendChild(topBar);

    // Hero
    const hero = document.createElement('div');
    hero.className = 'mss-hero';
    viewContainer.appendChild(hero);

    const stage = document.createElement('div');
    viewContainer.appendChild(stage);

    function renderStage() {
        const isZh = selectedLang === 'zh';
        const isAr = selectedLang === 'ar';
        const isEn = selectedLang === 'en';
        const isUk = selectedLang === 'uk';
        const isVi = selectedLang === 'vi';
        const isUr = selectedLang === 'ur';
        const isFa = selectedLang === 'fa';
        const isPt = selectedLang === 'pt';
        const isEs = selectedLang === 'es';
        const isRtl = isAr || isUr || isFa;

        // Top bar rendering
        topBar.innerHTML = '';
        const backBtn = document.createElement('button');
        backBtn.className = 'mss-back-btn';
        backBtn.innerHTML = isZh ? 
            `← Tilbage til forsiden (返回主页)` : 
            (isAr ? `← Tilbage til forsiden (العودة إلى الصفحة الرئيسية)` : 
            (isUk ? `← На головну (Tilbage til forsiden)` :
            (isVi ? `← Về trang chủ (Tilbage til forsiden)` :
            (isUr ? `← مرکزی صفحے پر واپس جائیں (Tilbage til forsiden)` :
            (isFa ? `← بازگشت به صفحه اصلی (Tilbage til forsiden)` :
            (isPt ? `← Voltar ao menu principal (Tilbage til forsiden)` :
            (isEs ? `← Volver al menú principal (Tilbage til forsiden)` :
            (isEn ? `← Back to main menu (Tilbage til forsiden)` : `← Tilbage til forsiden`))))))));
        backBtn.onclick = () => navigateFn('main');
        topBar.appendChild(backBtn);

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
        } else if (isUk) {
            hero.innerHTML = `
                <div class="mss-hero-kicker">🌍 Мовний компас • Від найменшого звука до живої розмови</div>
                <h1>Моя рідна мова порівняно з данською (Mit sprog sammenlignet med dansk)</h1>
                <p>
                    Дізнайтеся, як влаштована данська мова крок за кроком на 10 зрозумілих рівнях — у прямому порівнянні з українською мовою на прикладі базового речення: <em>"Jeg spiser brød i køkkenet i dag"</em> (Я їм хліб на кухні сьогодні).
                </p>
            `;
        } else if (isVi) {
            hero.innerHTML = `
                <div class="mss-hero-kicker">🌍 La bàn ngôn ngữ • Từ chi tiết phát âm nhỏ nhất đến giao tiếp trọn vẹn</div>
                <h1>Ngôn ngữ của tôi so sánh với tiếng Đan Mạch (Tiếng Việt)</h1>
                <p>
                    Khám phá từng bước cách vận hành của tiếng Đan Mạch qua 10 cấp độ rõ ràng — so sánh trực tiếp với tiếng Việt qua câu mẫu xuyên suốt: <em>"Jeg spiser brød i køkkenet i dag"</em> (Hôm nay tôi ăn bánh mì trong bếp).
                </p>
            `;
        } else if (isUr) {
            hero.innerHTML = `
                <div class="mss-hero-kicker" dir="rtl">🌍 زبان کا رہنما • آواز کے باریک فرق سے لے کر مکمل گفتگو تک</div>
                <h1 dir="rtl">میری مادری زبان اور ڈینش کا موازنہ (Urdu / اردو)</h1>
                <p dir="rtl">
                    10 آسان مراحل میں جانیں کہ ڈینش زبان کیسے بنتی ہے — اردو کے ساتھ براہِ راست موازنہ ہمارے بنیادی جملے کے ذریعے: <em>"Jeg spiser brød i køkkenet i dag"</em> (میں آج باورچی خانے میں روٹی کھا رہا ہوں / کھاتا ہوں)۔
                </p>
            `;
        } else if (isFa) {
            hero.innerHTML = `
                <div class="mss-hero-kicker" dir="rtl">🌍 راهنمای زبان • از ریزترین تفاوت صوتی تا مکالمه کامل</div>
                <h1 dir="rtl">مقایسه زبان مادری من با دانمارکی (Persisk / فارسی)</h1>
                <p dir="rtl">
                    گام‌به‌گام در ۱۰ سطح یاد بگیرید که زبان دانمارکی چگونه ساخته می‌شود — با مقایسه مستقیم با زبان فارسی بر پایه جمله محوری ما: <em>"Jeg spiser brød i køkkenet i dag"</em> (من امروز در آشپزخانه نان می‌خورم).
                </p>
            `;
        } else if (isPt) {
            hero.innerHTML = `
                <div class="mss-hero-kicker">🌍 Guia linguístico • Do menor som à conversa completa</div>
                <h1>A minha língua comparada com o dinamarquês (Português)</h1>
                <p>
                    Descubra passo a passo como o dinamarquês funciona em 10 níveis claros — em comparação direta com o português (europeu e brasileiro) através da nossa frase-modelo: <em>"Jeg spiser brød i køkkenet i dag"</em> (Eu como pão na cozinha hoje).
                </p>
            `;
        } else if (isEs) {
            hero.innerHTML = `
                <div class="mss-hero-kicker">🌍 Guía lingüística • Del sonido más pequeño a la charla completa</div>
                <h1>Mi idioma comparado con el danés (Español)</h1>
                <p>
                    Descubre paso a paso cómo funciona el danés en 10 niveles claros — en comparación directa con el español (España y Latinoamérica) con nuestra frase modelo: <em>"Jeg spiser brød i køkkenet i dag"</em> (Hoy como pan en la cocina).
                </p>
            `;
        } else if (isEn) {
            hero.innerHTML = `
                <div class="mss-hero-kicker">🌍 Language Guide • From subtle sounds to full conversation</div>
                <h1>My Language Compared to Danish (English)</h1>
                <p>
                    Explore how Danish works step-by-step across 10 clear levels, directly contrasted with English using our central reference sentence: <em>"Jeg spiser brød i køkkenet i dag"</em> (I eat bread in the kitchen today).
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
                        const myTxt = isZh ? uc.myByLang.zh : (isAr ? uc.myByLang.ar : (isUk ? uc.myByLang.uk : (isVi ? uc.myByLang.vi : (isUr ? uc.myByLang.ur : (isFa ? uc.myByLang.fa : (isPt ? uc.myByLang.pt : (isEs ? uc.myByLang.es : (isEn ? uc.myByLang.en : (uc.myByLang_da?.en || uc.myByLang_da?.zh || uc.myByLang.en)))))))));
                        const badgeText = isZh ? (uc.badge_zh || uc.badge) : (isAr ? (uc.badge_ar || uc.badge) : (isUk ? (uc.badge_uk || uc.badge) : (isVi ? (uc.badge_vi || uc.badge) : (isUr ? (uc.badge_ur || uc.badge) : (isFa ? (uc.badge_fa || uc.badge) : (isPt ? (uc.badge_pt || uc.badge) : (isEs ? (uc.badge_es || uc.badge) : (isEn ? (uc.badge_en || uc.badge) : uc.badge))))))));
                        const formulaText = isZh ? (uc.daFormula_zh || uc.daFormula) : (isAr ? (uc.daFormula_ar || uc.daFormula) : (isUk ? (uc.daFormula_uk || uc.daFormula) : (isVi ? (uc.daFormula_vi || uc.daFormula) : (isUr ? (uc.daFormula_ur || uc.daFormula) : (isFa ? (uc.daFormula_fa || uc.daFormula) : (isPt ? (uc.daFormula_pt || uc.daFormula) : (isEs ? (uc.daFormula_es || uc.daFormula) : (isEn ? (uc.daFormula_en || uc.daFormula) : uc.daFormula))))))));
                        const subNoteText = isZh ? (uc.daSubNote_zh || uc.daSubNote) : (isAr ? (uc.daSubNote_ar || uc.daSubNote) : (isUk ? (uc.daSubNote_uk || uc.daSubNote) : (isVi ? (uc.daSubNote_vi || uc.daSubNote) : (isUr ? (uc.daSubNote_ur || uc.daSubNote) : (isFa ? (uc.daSubNote_fa || uc.daSubNote) : (isPt ? (uc.daSubNote_pt || uc.daSubNote) : (isEs ? (uc.daSubNote_es || uc.daSubNote) : (isEn ? (uc.daSubNote_en || uc.daSubNote) : uc.daSubNote))))))));

                        return `
                            <div style="background:rgba(15,23,42,0.92); border:1.5px solid ${uc.accent}; border-radius:14px; padding:0.9rem 1rem; display:flex; flex-direction:column; gap:0.5rem;">
                                <div style="font-size:0.74rem; font-weight:900; color:${uc.accent}; text-transform:uppercase; letter-spacing:0.03em;" ${isRtl ? 'dir="rtl"' : ''}>
                                    ${badgeText}
                                </div>
                                <div style="background:rgba(239,68,68,0.12); border-left:3.5px solid #ef4444; border-radius:8px; padding:0.55rem 0.7rem;">
                                    <div style="font-size:0.7rem; font-weight:900; color:#fca5a5; text-transform:uppercase; margin-bottom:0.15rem;" ${isRtl ? 'dir="rtl"' : ''}>
                                        🇩🇰 ${isZh ? '丹麦语结构公式' : (isAr ? 'القالب الدنماركي' : (isUk ? 'Данська формула' : (isVi ? 'Công thức tiếng Đan Mạch' : (isUr ? 'ڈینش فارمولا' : (isFa ? 'فرمول دانمارکی' : (isPt ? 'Fórmula Dinamarquesa' : (isEs ? 'Fórmula Danesa' : (isEn ? 'Danish Formula' : 'Dansk formel'))))))))} (${formulaText})
                                    </div>
                                    <div style="font-size:0.93rem; color:#ffffff; font-weight:800;">${uc.daExample}</div>
                                    <div style="font-size:0.78rem; color:#cbd5e1; margin-top:0.25rem;" ${isRtl ? 'dir="rtl"' : ''}>${subNoteText}</div>
                                </div>
                                <div style="background:rgba(56,189,248,0.1); border-left:3.5px solid #38bdf8; border-radius:8px; padding:0.55rem 0.7rem;" ${isRtl ? 'dir="rtl"' : ''}>
                                    <div style="font-size:0.7rem; font-weight:900; color:#7dd3fc; text-transform:uppercase; margin-bottom:0.15rem;">
                                        ${isZh ? '🇨🇳 中文对比解析' : (isAr ? '🇸🇦 المقارنة بالعربية' : (isUk ? '🇺🇦 Українське порівняння' : (isVi ? '🇻🇳 So sánh với tiếng Việt' : (isUr ? '🇵🇰 اردو کے ساتھ موازنہ' : (isFa ? '🇮🇷 مقایسه با فارسی' : (isPt ? '🇵🇹 Comparação com Português' : (isEs ? '🇪🇸 Comparación con Español' : (isEn ? '🇬🇧 English Contrast Analysis' : '💡 Pædagogisk forklaring'))))))))}
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
                (isUk ? `${st.num}. ${st.title_uk || st.title} — ${st.subtitle_uk || st.subtitle}` :
                (isVi ? `${st.num}. ${st.title_vi || st.title} — ${st.subtitle_vi || st.subtitle}` :
                (isUr ? `${st.num}. ${st.title_ur || st.title} — ${st.subtitle_ur || st.subtitle}` :
                (isFa ? `${st.num}. ${st.title_fa || st.title} — ${st.subtitle_fa || st.subtitle}` :
                (isPt ? `${st.num}. ${st.title_pt || st.title} — ${st.subtitle_pt || st.subtitle}` :
                (isEs ? `${st.num}. ${st.title_es || st.title} — ${st.subtitle_es || st.subtitle}` :
                (isEn ? `${st.num}. ${st.title_en || st.title} — ${st.subtitle_en || st.subtitle}` :
                `${st.num}. ${st.title} — ${st.subtitle}`))))))));
            const closeBtnText = isZh ? '✕ 关闭详情' : (isAr ? '✕ إغلاق التفاصيل' : (isUk ? '✕ Закрити деталі' : (isVi ? '✕ Đóng chi tiết' : (isUr ? '✕ تفصیل بند کریں' : (isFa ? '✕ بستن جزئیات' : (isPt ? '✕ Fechar detalhes' : (isEs ? '✕ Cerrar detalles' : (isEn ? '✕ Close details' : '✕ Luk underflade'))))))));

            let myAnalysisHtml = '';
            if (isZh) {
                myAnalysisHtml = st.myLines.zh;
            } else if (isAr) {
                myAnalysisHtml = st.myLines.ar;
            } else if (isUk) {
                myAnalysisHtml = st.myLines.uk;
            } else if (isVi) {
                myAnalysisHtml = st.myLines.vi;
            } else if (isUr) {
                myAnalysisHtml = st.myLines.ur;
            } else if (isFa) {
                myAnalysisHtml = st.myLines.fa;
            } else if (isPt) {
                myAnalysisHtml = st.myLines.pt;
            } else if (isEs) {
                myAnalysisHtml = st.myLines.es;
            } else if (isEn) {
                myAnalysisHtml = st.myLines.en;
            } else {
                myAnalysisHtml = `
                    <div style="display:flex; flex-direction:column; gap:0.3rem; margin-top:0.2rem;">
                        <div><strong>🇬🇧 Engelsk:</strong> ${(st.myLines_da && st.myLines_da.en) || st.myLines.en}</div>
                        <div><strong>🇸🇦 Arabisk:</strong> ${(st.myLines_da && st.myLines_da.ar) || st.myLines.ar}</div>
                        <div><strong>🇺🇦 Ukrainsk:</strong> ${(st.myLines_da && st.myLines_da.uk) || st.myLines.uk}</div>
                        <div><strong>🇻🇳 Vietnamesisk:</strong> ${(st.myLines_da && st.myLines_da.vi) || st.myLines.vi}</div>
                        <div><strong>🇵🇰 Urdu:</strong> ${(st.myLines_da && st.myLines_da.ur) || st.myLines.ur}</div>
                        <div><strong>🇮🇷 Persisk/Farsi:</strong> ${(st.myLines_da && st.myLines_da.fa) || st.myLines.fa}</div>
                        <div><strong>🇵🇹 Portugisisk:</strong> ${(st.myLines_da && st.myLines_da.pt) || st.myLines.pt}</div>
                        <div><strong>🇪🇸 Spansk:</strong> ${(st.myLines_da && st.myLines_da.es) || st.myLines.es}</div>
                        <div><strong>🇨🇳 Kinesisk:</strong> ${(st.myLines_da && st.myLines_da.zh) || st.myLines.zh}</div>
                    </div>
                `;
            }

            return `
                <div class="mss-detail-overlay" style="margin-top:0.45rem; margin-bottom:0.65rem; margin-left:1.25rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                        <div>
                            <span style="font-size:0.75rem; font-weight:900; color:${st.color}; text-transform:uppercase;">
                                ${isZh ? `深度解析 • 第 ${st.num} 级 (Trin ${st.num} af 10)` : (isAr ? `شرح تفصيلي • المستوى ${st.num} (Trin ${st.num} af 10)` : (isUk ? `Детальний розбір • Рівень ${st.num} з 10` : (isVi ? `Phân tích chi tiết • Bậc ${st.num} / 10` : (isUr ? `تفصیلی وضاحت • مرحلہ ${st.num} / 10` : (isFa ? `توضیح کامل • سطح ${st.num} از ۱۰` : (isPt ? `Análise Detalhada • Nível ${st.num} de 10` : (isEs ? `Análisis Detallado • Nivel ${st.num} de 10` : (isEn ? `Deep Dive • Level ${st.num} of 10` : `Underflade • Trin ${st.num} af 10`))))))))}
                            </span>
                            <h2 style="margin:0.15rem 0 0; font-size:1.28rem; font-weight:900; color:#ffffff;" ${isRtl ? 'dir="rtl"' : ''}>
                                ${subTitle}
                            </h2>
                        </div>
                        <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
                            <button type="button" class="mss-back-btn" data-copy-step-hw="${st.num}" style="border-color:#38bdf8; color:#7dd3fc; font-weight:800;">
                                📋 ${isZh ? '复制作业链接' : (isAr ? 'نسخ رابط الواجب' : (isUk ? 'Копіювати посилання' : (isVi ? 'Sao chép liên kết bài tập' : (isUr ? 'ہوم ورک لنک کاپی کریں' : (isFa ? 'کپی لینک تمرین' : (isPt ? 'Copiar link de trabalho de casa' : (isEs ? 'Copiar enlace de tarea' : (isEn ? 'Copy homework link' : 'Kopier lektie-link'))))))))} (Trin ${st.num})
                            </button>
                            <button type="button" class="mss-back-btn" data-close-sub="1" style="border-color:#fde68a; color:#fde68a;">
                                ${closeBtnText}
                            </button>
                        </div>
                    </div>

                    <div class="mss-two-lines" style="margin-bottom:0.85rem;">
                        <div class="mss-line-da">
                            <span class="mss-line-tag" style="color:#fca5a5;">🇩🇰 ${isZh ? '丹麦语例句' : (isAr ? 'المثال الدنماركي' : (isUk ? 'Данський приклад' : (isVi ? 'Ví dụ Đan Mạch' : (isUr ? 'ڈینش مثال' : (isFa ? 'مثال دانمارکی' : (isPt ? 'Exemplo Dinamarquês' : (isEs ? 'Ejemplo Danés' : (isEn ? 'Danish Example' : 'Dansk'))))))))}:</span>
                            <span>${st.daLine}</span>
                        </div>
                        ${isZh && st.daLine_zh ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                💡 释义: ${st.daLine_zh}
                            </div>
                        ` : ''}
                        ${isAr && st.daLine_ar ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;" dir="rtl">
                                💡 المعنى والمخرج: ${st.daLine_ar}
                            </div>
                        ` : ''}
                        ${isUk && st.daLine_uk ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                💡 Значення і звучання: ${st.daLine_uk}
                            </div>
                        ` : ''}
                        ${isVi && st.daLine_vi ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                💡 Ý nghĩa & phát âm: ${st.daLine_vi}
                            </div>
                        ` : ''}
                        ${isUr && st.daLine_ur ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;" dir="rtl">
                                💡 مطلب اور تلفظ: ${st.daLine_ur}
                            </div>
                        ` : ''}
                        ${isFa && st.daLine_fa ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;" dir="rtl">
                                💡 معنی و تلفظ: ${st.daLine_fa}
                            </div>
                        ` : ''}
                        ${isPt && st.daLine_pt ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                💡 Significado e fonética: ${st.daLine_pt}
                            </div>
                        ` : ''}
                        ${isEs && st.daLine_es ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                💡 Significado y sonido: ${st.daLine_es}
                            </div>
                        ` : ''}
                        ${isEn && st.daLine_en ? `
                            <div style="font-size:0.82rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                💡 Meaning & phonetics: ${st.daLine_en}
                            </div>
                        ` : ''}
                        <div class="mss-line-my" ${isRtl ? 'dir="rtl"' : ''}>
                            <span class="mss-line-tag" style="color:#7dd3fc;">${isZh ? '🇨🇳 中文对比解析' : (isAr ? '🇸🇦 المقارنة بالعربية' : (isUk ? '🇺🇦 Порівняння з українською' : (isVi ? '🇻🇳 So sánh tiếng Việt' : (isUr ? '🇵🇰 اردو کے ساتھ موازنہ' : (isFa ? '🇮🇷 مقایسه با فارسی' : (isPt ? '🇵🇹 Comparação com Português' : (isEs ? '🇪🇸 Comparación con Español' : (isEn ? '🇬🇧 English Comparison' : '💡 Sproglig analyse'))))))))}:</span>
                            <span>${myAnalysisHtml}</span>
                        </div>
                    </div>

                    <div style="background:rgba(30,41,59,0.75); border:1px solid rgba(148,163,184,0.25); border-radius:12px; padding:0.85rem 1rem; margin-bottom:0.9rem; font-size:0.92rem; line-height:1.6; color:#e2e8f0;" ${isRtl ? 'dir="rtl"' : ''}>
                        ${isZh ? (st.detailExplain_zh || st.detailExplain) : (isAr ? (st.detailExplain_ar || st.detailExplain) : (isUk ? (st.detailExplain_uk || st.detailExplain) : (isVi ? (st.detailExplain_vi || st.detailExplain) : (isUr ? (st.detailExplain_ur || st.detailExplain) : (isFa ? (st.detailExplain_fa || st.detailExplain) : (isPt ? (st.detailExplain_pt || st.detailExplain) : (isEs ? (st.detailExplain_es || st.detailExplain) : (isEn ? (st.detailExplain_en || st.detailExplain) : st.detailExplain))))))))}
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
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_arabisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; border-radius:12px;">
                                        🇸🇦 فتح تدريب الأصوات الصعبة للناطقين بالعربية ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.5rem 1.1rem; border-radius:12px;">
                                        🔤 تدريب الحروف والأصوات ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(56,189,248,0.12); border-color:rgba(56,189,248,0.4); color:#ffffff; font-weight:800; font-size:0.84rem; padding:0.45rem 1rem; border-radius:12px;">
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
                                <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_kinesisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; border-radius:12px;">
                                    打开实用专练 ➔
                                </button>
                            ` : (isUk ? `
                                <div style="max-width: 720px;">
                                    <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                        <span>🇺🇦</span> <span>5 головних фонетичних пасток для українців</span>
                                    </div>
                                    <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                        М’яке d • Придихові P/T/K («тест із папірцем») • Горлове R • Голосні Y/Ø • Легке H та чисте NG
                                    </div>
                                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
                                        1) <strong>М’яке d (mad, brød):</strong> не українське тверде «д» і не англійське «th» — кінчик язика лежить за нижніми зубами, мов теплий видих на окуляри.<br>
                                        2) <strong>Сильне придихове P, T, K vs. B, D, G:</strong> українські п/т/к без видиху данці сприймають як b/d/g! Справжнє данське P/T/K має здувати аркуш паперу.<br>
                                        3) <strong>Горлове R & злите вокальне r:</strong> глибоко в горлі (без вібрації кінчиком язика р-р-р), а в кінці слів зливається з голосним (mor, bror).<br>
                                        4) <strong>Округлені Y & Ø vs. плоскі I & E:</strong> губи міцним «поцілунком», але без українського призвуку «й/ю»!<br>
                                        5) <strong>Легке H & носове NG:</strong> h як теплий подих (ніколи не «х»!), а -ng без твердого «г/к» у кінці.
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_ukrainsk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; border-radius:12px;">
                                        🇺🇦 Відкрити спецтренажер: 5 складних звуків ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.5rem 1.1rem; border-radius:12px;">
                                        🔤 Тренування літер і звуків ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(56,189,248,0.12); border-color:rgba(56,189,248,0.4); color:#ffffff; font-weight:800; font-size:0.84rem; padding:0.45rem 1rem; border-radius:12px;">
                                        🎙️ Ігри та тести з вимови ➔
                                    </button>
                                </div>
                            ` : (isVi ? `
                                <div style="max-width: 720px;">
                                    <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                        <span>🇻🇳</span> <span>5 thử thách phát âm lớn nhất cho người Việt</span>
                                    </div>
                                    <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                        Âm cuối & cụm phụ âm (-s, -st, sk-) • D mềm • Bật hơi P/T/K • R cuống họng • Chu môi Y/Ø (không đọc ư/ơ)
                                    </div>
                                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
                                        1) <strong>Âm cuối & cụm phụ âm:</strong> không nuốt đuôi -s, -st, -ld (<em>lys ≠ ly, fest ≠ fe, kold ≠ ko</em>) và không chèn âm «ơ» vào <em>sp-, sk-</em>.<br>
                                        2) <strong>D mềm (mad, brød):</strong> lưỡi đặt phẳng dưới răng dưới rồi hà hơi ấm nhẹ như lau kính (không bỏ mất!).<br>
                                        3) <strong>P, T, K bật hơi:</strong> thổi mạnh làm bay tờ giấy để phân biệt với B, D, G (<em>pære ≠ bære</em>).<br>
                                        4) <strong>R cuống họng & cuối từ:</strong> sâu trong họng như tiếng quạ (không phải [z] hay uốn đầu lưỡi), còn cuối từ như <em>mor, spiser</em> mở nhẹ.<br>
                                        5) <strong>Y & Ø chu môi tròn:</strong> giữ lưỡi phía trước và chu tròn môi như hôn (không lùi thành <em>ư/ơ</em>!).
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_vietnamesisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; border-radius:12px;">
                                        🇻🇳 Mở trình luyện phát âm chuyên sâu (5 âm khó) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.5rem 1.1rem; border-radius:12px;">
                                        🔤 Luyện chữ cái & âm Đan Mạch ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(56,189,248,0.12); border-color:rgba(56,189,248,0.4); color:#ffffff; font-weight:800; font-size:0.84rem; padding:0.45rem 1rem; border-radius:12px;">
                                        🎙️ Trò chơi luyện phát âm ➔
                                    </button>
                                </div>
                            ` : (isUr ? `
                                <div style="max-width: 720px;" dir="rtl">
                                    <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                        <span>🇵🇰</span> <span>اردو بولنے والوں کے لیے ڈینش کے 5 سب سے مشکل حروف و آوازیں</span>
                                    </div>
                                    <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                        نرم d (عینک صاف کرنا) • ہوا والے P/T/K (جیسے پھ/تھ/کھ!) • حلق کی R • گول ہونٹوں والے Y اور Ø • اوپر کے دانتوں والا V اور sk/sp/st
                                    </div>
                                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
                                        1) <strong>نرم d (mad, brød):</strong> زبان کو دانتوں کے درمیان نہ لائیں (ڈ/د نہیں)! زبان نچلے دانتوں کے پیچھے ڈھیلی رکھیں اور عینک پر گرم بھاپ چھوڑنے جیسا نرم سانس نکالیں۔<br>
                                        2) <strong>ہوا والے P, T, K اور B, D, G کا فرق:</strong> ڈینش کے p/t/k اردو کے <em>پھ، تھ، کھ</em> کی طرح تیز ہوا (پُھونک) کے ساتھ نکلتے ہیں! سادہ اردو <em>پ/ت/ک</em> کو ڈینش سننے والے b/d/g سمجھ لیتے ہیں۔<br>
                                        3) <strong>حلق کی R اور آخری -r:</strong> زبان کی نوک سے اردو «ر» یا «ڑ» نہ گھمائیں! ڈینش r گلے کی گہرائی سے کوّے کی آواز (تقریباً <em>غ</em>) کی طرح نکلتی ہے، اور لفظ کے آخر میں حرفِ علت میں گھل جاتی ہے (<em>mor, bror</em>)۔<br>
                                        4) <strong>گول ہونٹوں والے Y اور Ø:</strong> ہونٹوں کو سیٹی/بوسے کی طرح گول کر کے <em>i / e</em> بولیں — <em>یو</em> یا <em>او</em> نہ بنائیں!<br>
                                        5) <strong>V بمقابلہ W اور شروعاتی جھرمٹ (sk-, sp-, st-):</strong> ڈینش <em>v</em> میں اوپر کے دانت لازماً نچلے ہونٹ کو چھوئیں (اردو «و» کی طرح دونوں ہونٹ گول نہ کریں)؛ اور <em>skole</em> کے شروع میں «اِ-» (iskole) نہ لگائیں!
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_urdu" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; border-radius:12px;">
                                        🇵🇰 اردو بولنے والوں کے 5 مشکل حروف کی خصوصی مشق کھولیں ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.5rem 1.1rem; border-radius:12px;">
                                        🔤 حروف اور آوازوں کی مشق (Træn bogstaver) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(56,189,248,0.12); border-color:rgba(56,189,248,0.4); color:#ffffff; font-weight:800; font-size:0.84rem; padding:0.45rem 1rem; border-radius:12px;">
                                        🎙️ تلفظ کے کھیل اور چیلنجز (Leg med udtale) ➔
                                    </button>
                                </div>
                            ` : (isFa ? `
                                <div style="max-width: 720px;" dir="rtl">
                                    <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                        <span>🇮🇷</span> <span>۵ چالش اصلی تلفظ دانمارکی برای فارسی‌زبانان</span>
                                    </div>
                                    <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                        d نرم (ها روی عینک) • پُف P/T/K در برابر B/D/G • R حلقی (شبیه غ!) • لب غنچه‌ای Y/Ø • و sk-/sp- بدون «اِ-»
                                    </div>
                                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
                                        ۱) <strong>d نرم (mad, brød):</strong> مثل «د» یا «ز» نگویید! نوک زبان را پشت دندان‌های پایین صاف نگه دارید و نفس گرم بدهید مثل ها کردن روی شیشه عینک.<br>
                                        ۲) <strong>پُف P, T, K و B, D, G (آزمایش کاغذ):</strong> اول کلمات <em>pære, tale, kaffe</em> محکم هوا بیرون بدهید تا برگه کاغذ تکان بخورد، وگرنه B, D, G شنیده می‌شود!<br>
                                        ۳) <strong>R حلقی (مثل غ فارسی):</strong> هرگز با نوک زبان «ر» فارسی نچرخانید! دانمارکی r از ته گلو مثل غ ملایم می‌آید و آخر کلمه (<em>mor, spiser</em>) محو می‌شود.<br>
                                        ۴) <strong>واکه‌های لب‌غنچه‌ای Y و Ø:</strong> زبان در جای <em>i / e</em> بماند ولی لب‌ها مثل غنچه گرد شوند!<br>
                                        ۵) <strong>V (دندان روی لب پایین) و شروع sk-/sp-/st-:</strong> هرگز اول <em>skole, spiser</em> صدای «اِ-» نگذارید (<em>*eskole</em> غلط است)!
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_farsi" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; border-radius:12px;">
                                        🇮🇷 باز کردن تمرین ویژه ۵ صدای سخت برای فارسی‌زبانان ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.5rem 1.1rem; border-radius:12px;">
                                        🔤 تمرین حروف و صداها (Træn bogstaver) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(56,189,248,0.12); border-color:rgba(56,189,248,0.4); color:#ffffff; font-weight:800; font-size:0.84rem; padding:0.45rem 1rem; border-radius:12px;">
                                        🎙️ بازی‌ها و چالش‌های تلفظ (Leg med udtale) ➔
                                    </button>
                                </div>
                            ` : (isPt ? `
                                <div style="max-width: 720px;">
                                    <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                        <span>🇵🇹</span> <span>Os 5 maiores desafios de pronúncia para falantes de Português</span>
                                    </div>
                                    <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                        d suave (bafo nos óculos) • Sopro P/T/K vs B/D/G • R de garganta &amp; H ativo • Vogais Y/Ø • sk-/sp-/st- sem «es-» e -L/-S finais
                                    </div>
                                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
                                        1) <strong>d suave (mad, brød):</strong> não use o [d] duro (nem o [dʒ] brasileiro antes de i)! Deixe a língua relaxada atrás dos dentes de baixo e sopre ar morno como a embaciar os óculos.<br>
                                        2) <strong>P, T, K com sopro (Teste do Papel):</strong> em <em>pære, tale, kaffe</em> liberte um jato forte de ar para distinguir de B, D, G (e nunca diga <em>ti</em> como «tchi»!).<br>
                                        3) <strong>R de garganta &amp; H sempre soprado:</strong> nada de R vibrante na ponta da língua — e pronuncie o <strong>H</strong> dinamarquês (<em>hej, hus</em>) com ar audível, diferente do H mudo em <em>hoje</em>!<br>
                                        4) <strong>Vogais arredondadas Y e Ø:</strong> faça biquinho de beijo dizendo <em>i / e</em> (sem nasalizar!).<br>
                                        5) <strong>Grupos sk-, sp-, st- e finais -L/-S:</strong> nunca ponha «es-» antes de <em>skole</em> (*eskole); mantenha o -L final na ponta da língua (não [w]) e o -S final claro [s] (não «ch» [ʃ] europeu).
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_portugisisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; border-radius:12px;">
                                        🇵🇹 Abrir treinador especial: 5 sons difíceis ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.5rem 1.1rem; border-radius:12px;">
                                        🔤 Treinar letras e sons (Træn bogstaver) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(56,189,248,0.12); border-color:rgba(56,189,248,0.4); color:#ffffff; font-weight:800; font-size:0.84rem; padding:0.45rem 1rem; border-radius:12px;">
                                        🎙️ Jogos e desafios de pronúncia (Leg med udtale) ➔
                                    </button>
                                </div>
                            ` : (isEs ? `
                                <div style="max-width: 720px;">
                                    <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                        <span>🇪🇸</span> <span>Los 5 mayores retos de pronunciación para hispanohablantes</span>
                                    </div>
                                    <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                        d suave (vaho en gafas) • Soplo P/T/K vs B/D/G • Vocales Y/Ø &amp; H sonora • R de garganta &amp; V con dientes • sk-/sp-/st- sin «es-»
                                    </div>
                                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
                                        1) <strong>d suave (mad, brød):</strong> no es una «d» española ni una «z»; relaja la lengua detrás de los dientes de abajo y echa aire tibio como empañando gafas.<br>
                                        2) <strong>P, T, K con soplo (Prueba del Papel):</strong> en <em>pære, tale, kaffe</em> suelta una ráfaga de aire fuerte; nuestras p/t/k suaves suenan como B/D/G para un danés!<br>
                                        3) <strong>Vocales Y/Ø &amp; H activa:</strong> pon boca de beso diciendo <em>i / e</em>, y pronuncia la <strong>H</strong> danesa (<em>hej, hus</em>) con aire (¡nunca muda como en <em>hola</em>!).<br>
                                        4) <strong>R de garganta &amp; V con dientes:</strong> nada de R vibrante con la punta de la lengua, y en <strong>V</strong> (<em>vin</em>) toca el labio inferior con los dientes de arriba (no suena como B).<br>
                                        5) <strong>Grupos sk-, sp-, st- sin «e-»:</strong> nunca digas *<em>eskole</em> para <em>skole</em> — empieza directo en «sss».
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_spansk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; border-radius:12px;">
                                        🇪🇸 Abrir entrenador especial: 5 sonidos difíciles ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.5rem 1.1rem; border-radius:12px;">
                                        🔤 Practicar letras y sonidos (Træn bogstaver) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(56,189,248,0.12); border-color:rgba(56,189,248,0.4); color:#ffffff; font-weight:800; font-size:0.84rem; padding:0.45rem 1rem; border-radius:12px;">
                                        🎙️ Juegos y retos de pronunciación (Leg med udtale) ➔
                                    </button>
                                </div>
                            ` : (isEn ? `
                                <div style="max-width: 720px;">
                                    <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                        <span>🇬🇧</span> <span>English Speakers: Core Danish Pronunciation Keys</span>
                                    </div>
                                    <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                        The 3 biggest traps: The Soft d (breath on glasses) • The Throat r (crow's call) • and The Paper Test (P vs. B)
                                    </div>
                                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
                                        1) <strong>Soft d (mad, brød):</strong> Never use your teeth! Rest your tongue flat behind your bottom teeth and blow warm air like misting your glasses.<br>
                                        2) <strong>Throat r (rød, ris):</strong> Deep in the back of your throat like a crow calling "kraa" (never curl the tongue tip like English r!).<br>
                                        3) <strong>P vs. B (The Paper Test):</strong> Danish P releases a heavy burst of air blowing a paper away (<em>pære</em>), while B is soft and quiet (<em>bære</em>).
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                                    <button type="button" class="mss-link-chip" data-nav="traen_bogstaver" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.65rem 1.25rem; border-radius:12px;">
                                        🔤 Practice Letters & Sounds ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.5rem 1.1rem; border-radius:12px;">
                                        🎙️ Pronunciation Games & Challenges ➔
                                    </button>
                                </div>
                            ` : `
                                <div style="max-width: 720px;">
                                    <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size: 0.74rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px; margin-bottom:0.35rem;">
                                        <span>💡</span> <span>Udtaletræning & svære sproglyde</span>
                                    </div>
                                    <div style="font-size: 1.15rem; font-weight: 900; color: #ffffff; margin-bottom: 0.25rem;">
                                        Målrettede særflader: Arabisk (5 fokuslyde), Ukrainsk (5 fokuslyde), Vietnamesisk (5 fokuslyde), Urdu (5 fokuslyde), Persisk/Farsi (5 fokuslyde), Portugisisk (5 fokuslyde), Spansk (5 fokuslyde) & Kinesisk (L vs. N)
                                    </div>
                                    <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.5;">
                                        Vælg en målgruppe for at åbne interaktive pædagogiske instruktioner, SVG-diagrammer, lyttequizzer med minimale par og mikrofontræning.
                                    </div>
                                </div>
                                <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_arabisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.88rem; padding:0.6rem 1.15rem; border-radius:12px;">
                                        🇸🇦 Arabisk udtale (5 fokuslyde) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_ukrainsk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.88rem; padding:0.6rem 1.15rem; border-radius:12px;">
                                        🇺🇦 Ukrainsk udtale (5 fokuslyde) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_vietnamesisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.88rem; padding:0.6rem 1.15rem; border-radius:12px;">
                                        🇻🇳 Vietnamesisk udtale (5 fokuslyde) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_urdu" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.88rem; padding:0.6rem 1.15rem; border-radius:12px;">
                                        🇵🇰 Urdu udtale (5 fokuslyde) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_farsi" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.88rem; padding:0.6rem 1.15rem; border-radius:12px;">
                                        🇮🇷 Persisk/Farsi udtale (5 fokuslyde) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_portugisisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.88rem; padding:0.6rem 1.15rem; border-radius:12px;">
                                        🇵🇹 Portugisisk udtale (5 fokuslyde) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_spansk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.88rem; padding:0.6rem 1.15rem; border-radius:12px;">
                                        🇪🇸 Spansk udtale (5 fokuslyde) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="vanskelige_lyde_kinesisk" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.88rem; padding:0.6rem 1.15rem; border-radius:12px;">
                                        🇨🇳 Kinesisk udtale (L vs. N) ➔
                                    </button>
                                    <button type="button" class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(148,163,184,0.18); border-color:rgba(148,163,184,0.4); color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.6rem 1.1rem; border-radius:12px;">
                                        🔤 Træn bogstaver ➔
                                    </button>
                                </div>
                            `))))))))}
                        </div>
                    ` : ''}

                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
                        ${(st.morePairs || []).map(mp => `
                            <div style="background:rgba(15,23,42,0.85); border:1px solid rgba(148,163,184,0.22); border-radius:11px; padding:0.75rem 0.9rem;">
                                <div style="font-weight:900; color:#fde68a; font-size:0.88rem; margin-bottom:0.25rem;">${mp.da}</div>
                                <div style="font-size:0.82rem; color:#cbd5e1;" ${isRtl ? 'dir="rtl"' : ''}>${isZh ? (mp.note_zh || mp.note) : (isAr ? (mp.note_ar || mp.note) : (isUk ? (mp.note_uk || mp.note) : (isVi ? (mp.note_vi || mp.note) : (isUr ? (mp.note_ur || mp.note) : (isFa ? (mp.note_fa || mp.note) : (isPt ? (mp.note_pt || mp.note) : (isEs ? (mp.note_es || mp.note) : (isEn ? (mp.note_en || mp.note) : mp.note))))))))}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.65rem; padding-top:0.8rem; border-top:1px solid rgba(148,163,184,0.2);">
                        <span style="font-size:0.8rem; font-weight:900; color:#86efac; text-transform:uppercase;">
                            ${isZh ? '在应用中训练此层级 (Træn dette niveau):' : (isAr ? 'تمارين تدريبية لهذا المستوى في التطبيق:' : (isUk ? 'Тренуйте цей рівень у додатку:' : (isVi ? 'Luyện tập cấp độ này trong ứng dụng:' : (isUr ? 'اس مرحلے کی ایپ میں مشق کریں:' : (isFa ? 'تمرین این سطح در برنامه:' : (isPt ? 'Praticar este nível na aplicação:' : (isEs ? 'Practicar este nivel en la app:' : (isEn ? 'Practice this level in the app (Træn dette niveau):' : 'Træn dette niveau i appen:'))))))))}
                        </span>
                        <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                            ${(st.links || []).map(lk => {
                                const targetRoute = (lk.routeByLang && lk.routeByLang[selectedLang]) || lk.route;
                                if (!targetRoute || (lk.onlyIfLangMatch && !(lk.routeByLang && lk.routeByLang[selectedLang]))) return '';
                                const linkLabel = isZh ? (lk.label_zh || lk.label) : (isAr ? (lk.label_ar || lk.label) : (isUk ? (lk.label_uk || lk.label) : (isVi ? (lk.label_vi || lk.label) : (isUr ? (lk.label_ur || lk.label) : (isFa ? (lk.label_fa || lk.label) : (isPt ? (lk.label_pt || lk.label) : (isEs ? (lk.label_es || lk.label) : (isEn ? (lk.label_en || lk.label) : lk.label))))))));
                                return `<button class="mss-link-chip" data-nav="${targetRoute}">${linkLabel} ➔</button>`;
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
                        ${isZh ? '选择语言:' : (isAr ? 'اختر اللغة:' : (isUk ? 'Оберіть мову:' : (isVi ? 'Chọn ngôn ngữ:' : (isUr ? 'زبان منتخب کریں:' : (isFa ? 'زبان خود را انتخاب کنید:' : (isPt ? 'Escolha o idioma:' : (isEs ? 'Elige el idioma:' : (isEn ? 'Select language:' : 'Vælg sprog:'))))))))}
                    </span>
                    ${LANGUAGES.map(l => {
                        const isSupported = SUPPORTED_MSS_LANGS.includes(l.code);
                        return `
                            <button class="mss-lang-pill ${selectedLang === l.code ? 'active' : ''}" data-lang="${l.code}" style="${!isSupported ? 'opacity:0.6;' : 'font-weight:900;'}">
                                ${l.flag} ${l.name} ${!isSupported ? '<span style="font-size:0.7rem; opacity:0.8;">(Kommer senere)</span>' : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
                <div id="mss-lang-note" style="display:none; font-size:0.8rem; color:#fde047; padding:0.35rem 0.6rem; background:rgba(234,179,8,0.14); border-radius:8px;"></div>
            </div>

            <div class="mss-ladder-wrap">
                ${STEPS.map((st, idx) => {
                    const isOpen = openSubStepIndex === idx;
                    const stepTitle = isZh ? 
                        `第 ${st.num} 级: ${st.title_zh || st.title}` : 
                        (isAr ? `المستوى ${st.num}: ${st.title_ar || st.title}` :
                        (isUk ? `Рівень ${st.num}: ${st.title_uk || st.title}` :
                        (isVi ? `Bậc ${st.num}: ${st.title_vi || st.title}` :
                        (isUr ? `مرحلہ ${st.num}: ${st.title_ur || st.title}` :
                        (isFa ? `سطح ${st.num}: ${st.title_fa || st.title}` :
                        (isPt ? `Nível ${st.num}: ${st.title_pt || st.title}` :
                        (isEs ? `Nivel ${st.num}: ${st.title_es || st.title}` :
                        (isEn ? `Level ${st.num}: ${st.title_en || st.title}` :
                        `Trin ${st.num}. ${st.title}`))))))));
                    const stepSubtitle = isZh ? 
                        (st.subtitle_zh || st.subtitle) : 
                        (isAr ? (st.subtitle_ar || st.subtitle) : (isUk ? (st.subtitle_uk || st.subtitle) : (isVi ? (st.subtitle_vi || st.subtitle) : (isUr ? (st.subtitle_ur || st.subtitle) : (isFa ? (st.subtitle_fa || st.subtitle) : (isPt ? (st.subtitle_pt || st.subtitle) : (isEs ? (st.subtitle_es || st.subtitle) : (isEn ? (st.subtitle_en || st.subtitle) : st.subtitle))))))));
                    const btnText = isOpen ? 
                        (isZh ? '收起详情 ▲' : (isAr ? 'إغلاق التفاصيل ▲' : (isUk ? 'Згорнути деталі ▲' : (isVi ? 'Thu gọn ▲' : (isUr ? 'تفصیل بند کریں ▲' : (isFa ? 'بستن جزئیات ▲' : (isPt ? 'Fechar detalhes ▲' : (isEs ? 'Cerrar detalles ▲' : (isEn ? 'Close details ▲' : 'Luk underflade ▲'))))))))) : 
                        (isZh ? '查看详情与练习 ➔' : (isAr ? 'عرض التفاصيل والتمارين ➔' : (isUk ? 'Детальніше та вправи ➔' : (isVi ? 'Chi tiết & bài tập ➔' : (isUr ? 'تفصیل اور مشقیں دیکھیں ➔' : (isFa ? 'جزئیات و تمرین‌ها ➔' : (isPt ? 'Ver detalhes e exercícios ➔' : (isEs ? 'Ver detalles y ejercicios ➔' : (isEn ? 'View details & practice ➔' : 'Se mere & links ➔')))))))));

                    let myAnalysisLine = '';
                    if (isZh) {
                        myAnalysisLine = st.myLines.zh;
                    } else if (isAr) {
                        myAnalysisLine = st.myLines.ar;
                    } else if (isUk) {
                        myAnalysisLine = st.myLines.uk;
                    } else if (isVi) {
                        myAnalysisLine = st.myLines.vi;
                    } else if (isUr) {
                        myAnalysisLine = st.myLines.ur;
                    } else if (isFa) {
                        myAnalysisLine = st.myLines.fa;
                    } else if (isPt) {
                        myAnalysisLine = st.myLines.pt;
                    } else if (isEs) {
                        myAnalysisLine = st.myLines.es;
                    } else if (isEn) {
                        myAnalysisLine = st.myLines.en;
                    } else {
                        myAnalysisLine = `
                            <div style="display:flex; flex-direction:column; gap:0.25rem; margin-top:0.2rem;">
                                <div><strong>🇬🇧 Engelsk:</strong> ${(st.myLines_da && st.myLines_da.en) || st.myLines.en}</div>
                                <div><strong>🇸🇦 Arabisk:</strong> ${(st.myLines_da && st.myLines_da.ar) || st.myLines.ar}</div>
                                <div><strong>🇺🇦 Ukrainsk:</strong> ${(st.myLines_da && st.myLines_da.uk) || st.myLines.uk}</div>
                                <div><strong>🇻🇳 Vietnamesisk:</strong> ${(st.myLines_da && st.myLines_da.vi) || st.myLines.vi}</div>
                                <div><strong>🇵🇰 Urdu:</strong> ${(st.myLines_da && st.myLines_da.ur) || st.myLines.ur}</div>
                                <div><strong>🇮🇷 Persisk/Farsi:</strong> ${(st.myLines_da && st.myLines_da.fa) || st.myLines.fa}</div>
                                <div><strong>🇵🇹 Portugisisk:</strong> ${(st.myLines_da && st.myLines_da.pt) || st.myLines.pt}</div>
                                <div><strong>🇪🇸 Spansk:</strong> ${(st.myLines_da && st.myLines_da.es) || st.myLines.es}</div>
                                <div><strong>🇨🇳 Kinesisk:</strong> ${(st.myLines_da && st.myLines_da.zh) || st.myLines.zh}</div>
                            </div>
                        `;
                    }

                    return `
                        <div>
                            <div class="mss-step-card" style="--step-color:${st.color}; ${isOpen ? 'border-color:#fde68a;' : ''}" data-open-sub="${idx}">
                                <div class="mss-step-dot" style="--step-color:${st.color};">${st.num}</div>
                                <div class="mss-step-head">
                                    <div class="mss-step-head-text">
                                        <div style="display:flex; align-items:baseline; gap:0.5rem; flex-wrap:wrap;">
                                            <span style="font-size:0.7rem; font-weight:900; color:${st.color}; text-transform:uppercase; white-space:nowrap;">
                                                ${isZh ? `第 ${st.num} 级` : (isAr ? `المستوى ${st.num}` : (isUk ? `Рівень ${st.num}/10` : (isVi ? `Bậc ${st.num}/10` : (isUr ? `مرحلہ ${st.num}/10` : (isFa ? `سطح ${st.num}/۱۰` : (isPt ? `Nível ${st.num}/10` : (isEs ? `Nivel ${st.num}/10` : (isEn ? `Level ${st.num}/10` : `Trin ${st.num}/10`))))))))}
                                            </span>
                                            <span style="font-size:1.04rem; font-weight:900; color:#ffffff;" ${isRtl ? 'dir="rtl"' : ''}>
                                                ${stepTitle}
                                            </span>
                                        </div>
                                        <div style="font-size:0.79rem; color:#cbd5e1; line-height:1.35; margin-top:0.12rem;" ${isRtl ? 'dir="rtl"' : ''}>
                                            ${stepSubtitle}
                                        </div>
                                    </div>
                                    <button class="mss-sub-btn" data-open-sub="${idx}">
                                        ${btnText}
                                    </button>
                                </div>
                                <div class="mss-two-lines">
                                    <div class="mss-line-da">
                                        <span class="mss-line-tag" style="color:#fca5a5;">🇩🇰 ${isZh ? '丹麦语' : (isAr ? 'الدنماركية' : (isUk ? 'Данська' : (isVi ? 'Tiếng Đan Mạch' : (isUr ? 'ڈینش' : (isFa ? 'دانمارکی' : (isPt ? 'Dinamarquês' : (isEs ? 'Danés' : (isEn ? 'Danish' : 'Dansk'))))))))}:</span>
                                        <span>${st.daLine}</span>
                                    </div>
                                    ${isZh && st.daLine_zh ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                            💡 释义: ${st.daLine_zh}
                                        </div>
                                    ` : ''}
                                    ${isAr && st.daLine_ar ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;" dir="rtl">
                                            💡 المعنى والمخرج: ${st.daLine_ar}
                                        </div>
                                    ` : ''}
                                    ${isUk && st.daLine_uk ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                            💡 Значення і звучання: ${st.daLine_uk}
                                        </div>
                                    ` : ''}
                                    ${isVi && st.daLine_vi ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                            💡 Ý nghĩa & phát âm: ${st.daLine_vi}
                                        </div>
                                    ` : ''}
                                    ${isUr && st.daLine_ur ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;" dir="rtl">
                                            💡 مطلب اور تلفظ: ${st.daLine_ur}
                                        </div>
                                    ` : ''}
                                    ${isFa && st.daLine_fa ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;" dir="rtl">
                                            💡 معنی و تلفظ: ${st.daLine_fa}
                                        </div>
                                    ` : ''}
                                    ${isPt && st.daLine_pt ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                            💡 Significado e som: ${st.daLine_pt}
                                        </div>
                                    ` : ''}
                                    ${isEs && st.daLine_es ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                            💡 Significado y sonido: ${st.daLine_es}
                                        </div>
                                    ` : ''}
                                    ${isEn && st.daLine_en ? `
                                        <div style="font-size:0.8rem; color:#fca5a5; opacity:0.88; padding-inline-start:0.65rem;">
                                            💡 Meaning: ${st.daLine_en}
                                        </div>
                                    ` : ''}
                                    <div class="mss-line-my" ${isRtl ? 'dir="rtl"' : ''}>
                                        <span class="mss-line-tag" style="color:#7dd3fc;">${isZh ? '🇨🇳 中文对比' : (isAr ? '🇸🇦 المقارنة بالعربية' : (isUk ? '🇺🇦 Українська' : (isVi ? '🇻🇳 Tiếng Việt' : (isUr ? '🇵🇰 اردو موازنہ' : (isFa ? '🇮🇷 مقایسه فارسی' : (isPt ? '🇵🇹 Português' : (isEs ? '🇪🇸 Español' : (isEn ? '🇬🇧 English' : '💡 Analyse'))))))))}:</span>
                                        <span>${myAnalysisLine}</span>
                                    </div>
                                </div>
                            </div>
                            ${isOpen ? buildInlineSubViewHtml(idx) : ''}
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="mss-bottom-bar" style="margin-top:2.75rem; padding-top:1.5rem; border-top:1px solid rgba(255,255,255,0.12); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                <button class="mss-back-btn" data-nav="main" style="font-weight:900;">
                    ${isZh ? '← Tilbage til forsiden (返回主页)' : (isAr ? '← Tilbage til forsiden (العودة إلى الصفحة الرئيسية)' : (isUk ? '← На головну (Tilbage til forsiden)' : (isVi ? '← Về trang chủ (Tilbage til forsiden)' : (isUr ? '← مرکزی صفحے پر واپس جائیں (Tilbage til forsiden)' : (isFa ? '← بازگشت به صفحه اصلی (Tilbage til forsiden)' : (isPt ? '← Voltar ao menu principal (Tilbage til forsiden)' : (isEs ? '← Volver al menú principal (Tilbage til forsiden)' : (isEn ? '← Back to main menu (Tilbage til forsiden)' : '← Tilbage til forsiden'))))))))}
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
                    ` : (isUk ? `
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_ukrainsk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.6rem 1.25rem; border-radius:12px;">
                            🇺🇦 Складні данські звуки для українців (5 звуків) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🔤 Тренування літер і звуків (Træn bogstaver) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(148,163,184,0.18); border-color:rgba(148,163,184,0.4); color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🎙️ Ігри з вимови (Leg med udtale) ➔
                        </button>
                    ` : (isVi ? `
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_vietnamesisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.6rem 1.25rem; border-radius:12px;">
                            🇻🇳 5 âm tiếng Đan Mạch khó nhất cho người Việt ➔
                        </button>
                        <button class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🔤 Luyện chữ cái & phát âm (Træn bogstaver) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(148,163,184,0.18); border-color:rgba(148,163,184,0.4); color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🎙️ Trò chơi luyện phát âm (Leg med udtale) ➔
                        </button>
                    ` : (isUr ? `
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_urdu" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.6rem 1.25rem; border-radius:12px;">
                            🇵🇰 اردو بولنے والوں کے 5 مشکل ڈینش حروف کی مشق ➔
                        </button>
                        <button class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🔤 حروف اور تلفظ کی مشق (Træn bogstaver) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(148,163,184,0.18); border-color:rgba(148,163,184,0.4); color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🎙️ تلفظ کے کھیل (Leg med udtale) ➔
                        </button>
                    ` : (isFa ? `
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_farsi" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.6rem 1.25rem; border-radius:12px;">
                            🇮🇷 تمرین ویژه ۵ صدای سخت برای فارسی‌زبانان ➔
                        </button>
                        <button class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🔤 تمرین حروف و تلفظ (Træn bogstaver) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(148,163,184,0.18); border-color:rgba(148,163,184,0.4); color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🎙️ بازی‌های تلفظ (Leg med udtale) ➔
                        </button>
                    ` : (isPt ? `
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_portugisisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.6rem 1.25rem; border-radius:12px;">
                            🇵🇹 Treinador de 5 sons difíceis para Português ➔
                        </button>
                        <button class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🔤 Letras e sons (Træn bogstaver) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(148,163,184,0.18); border-color:rgba(148,163,184,0.4); color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🎙️ Jogos de pronúncia (Leg med udtale) ➔
                        </button>
                    ` : (isEs ? `
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_spansk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.6rem 1.25rem; border-radius:12px;">
                            🇪🇸 Entrenador de 5 sonidos difíciles para Español ➔
                        </button>
                        <button class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🔤 Letras y sonidos (Træn bogstaver) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(148,163,184,0.18); border-color:rgba(148,163,184,0.4); color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🎙️ Juegos de pronunciación (Leg med udtale) ➔
                        </button>
                    ` : (isEn ? `
                        <button class="mss-link-chip" data-nav="traen_bogstaver" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.92rem; padding:0.6rem 1.25rem; border-radius:12px;">
                            🔤 Letters & Sounds (Træn bogstaver) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="leg_med_udtale" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🎙️ Pronunciation Games (Leg med udtale) ➔
                        </button>
                    ` : `
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_arabisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🇸🇦 Arabisk udtale (5 lyde) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_ukrainsk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🇺🇦 Ukrainsk udtale (5 lyde) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_vietnamesisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🇻🇳 Vietnamesisk udtale (5 lyde) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_urdu" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🇵🇰 Urdu udtale (5 lyde) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_farsi" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🇮🇷 Persisk/Farsi udtale (5 lyde) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_portugisisk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🇵🇹 Portugisisk udtale (5 lyde) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_spansk" style="background:#0284c7; border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🇪🇸 Spansk udtale (5 lyde) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="vanskelige_lyde_kinesisk" style="background:rgba(56,189,248,0.2); border-color:#38bdf8; color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🇨🇳 Kinesisk udtale (L vs. N) ➔
                        </button>
                        <button class="mss-link-chip" data-nav="traen_bogstaver" style="background:rgba(148,163,184,0.18); border-color:rgba(148,163,184,0.4); color:#ffffff; font-weight:800; font-size:0.86rem; padding:0.55rem 1.1rem; border-radius:12px;">
                            🔤 Træn bogstaver & udtale ➔
                        </button>
                    `))))))))}
                </div>
            </div>
        `;

        const langNoteEl = stage.querySelector('#mss-lang-note');
        stage.querySelectorAll('[data-lang]').forEach(btn => {
            btn.onclick = () => {
                const targetLang = btn.dataset.lang;
                if (!SUPPORTED_MSS_LANGS.includes(targetLang)) {
                    if (langNoteEl) {
                        langNoteEl.textContent = isZh ? 
                            '⚠️ 目前支持丹麦语、英语、阿拉伯语、乌克兰语、越南语、乌尔都语、波斯语、葡萄牙语、西班牙语与中文对比，其他语言即将推出。' : 
                            (isAr ? '⚠️ حالياً تدعم المنصة المقارنة بالدنماركية والإنجليزية والعربية والأوكرانية والفيتنامية والأردية والفارسية والبرتغالية والإسبانية والصينية، وسيتم إضافة بقية اللغات قريباً.' :
                            (isUk ? '⚠️ Наразі повністю підтримуються данська, англійська, арабська, українська, в’єтнамська, урду, перська, португальська, іспанська та китайська мови. Інші мови з’являться незабаром.' :
                            (isVi ? '⚠️ Hiện ứng dụng hỗ trợ đầy đủ tiếng Đan Mạch, tiếng Anh, tiếng Ả Rập, tiếng Ukraina, tiếng Việt, tiếng Urdu, tiếng Ba Tư, tiếng Bồ Đào Nha, tiếng Tây Ban Nha và tiếng Trung. Các ngôn ngữ khác sẽ sớm ra mắt.' :
                            (isUr ? '⚠️ فی الحال ڈینش، انگریزی، عربی، یوکرینی، ویتنامی، اردو، فارسی، پرتگالی، ہسپانوی اور چینی زبانیں مکمل طور پر دستیاب ہیں۔ دیگر زبانیں جلد شامل کی جائیں گی۔' :
                            (isFa ? '⚠️ در حال حاضر زبان‌های دانمارکی، انگلیسی، عربی، اوکراینی، ویتنامی، اردو، فارسی، پرتغالی، اسپانیایی و چینی به‌طور کامل فعال هستند و سایر زبان‌ها به‌زودی اضافه می‌شوند.' :
                            (isPt ? '⚠️ De momento o Dinamarquês, Inglês, Árabe, Ucraniano, Vietnamita, Urdu, Persa, Português, Espanhol e Chinês estão totalmente disponíveis. Mais idiomas em breve.' :
                            (isEs ? '⚠️ Por ahora están totalmente disponibles Danés, Inglés, Árabe, Ucraniano, Vietnamita, Urdu, Persa, Portugués, Español y Chino. Pronto llegarán más idiomas.' :
                            (isEn ? '⚠️ Currently Danish, English, Arabic, Ukrainian, Vietnamese, Urdu, Farsi, Portuguese, Spanish, and Chinese are fully supported. More languages coming soon.' :
                            '⚠️ Indtil videre er Dansk, Engelsk, Arabisk, Ukrainsk, Vietnamesisk, Urdu, Persisk/Farsi, Portugisisk, Spansk og Kinesisk fuldt tilgængelige. Andre sprog følger snart.'))))))));
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
                const lang = selectedLang || 'da';
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
                const lang = selectedLang || 'da';
                history.pushState(null, '', `#/${lang}/mit_sprog_sammenlignet`);
                renderStage();
            };
        });

        stage.querySelectorAll('[data-copy-step-hw]').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const stepNum = btn.dataset.copyStepHw;
                const lang = selectedLang || 'da';
                const url = `${window.location.origin}${window.location.pathname}#/${lang}/mit_sprog_sammenlignet/${stepNum}`;
                const successMsg = isZh ? 
                    `📋 已复制作业链接 (第 ${stepNum} 级):\n${url}` : 
                    (isAr ? `📋 تم نسخ رابط الواجب للمستوى ${stepNum}:\n${url}` : 
                    (isUk ? `📋 Посилання на завдання (Рівень ${stepNum}) скопійовано:\n${url}` :
                    (isVi ? `📋 Đã sao chép liên kết bài tập (Bậc ${stepNum}):\n${url}` :
                    (isUr ? `📋 مرحلہ ${stepNum} کا ہوم ورک لنک کاپی ہو گیا:\n${url}` :
                    (isFa ? `📋 لینک تمرین سطح ${stepNum} کپی شد:\n${url}` :
                    (isPt ? `📋 Link do trabalho de casa para o Nível ${stepNum} copiado:\n${url}` :
                    (isEs ? `📋 Enlace de tarea para el Nivel ${stepNum} copiado:\n${url}` :
                    (isEn ? `📋 Homework link for Level ${stepNum} copied:\n${url}` :
                    `📋 Lektie-link til Trin ${stepNum} er kopieret:\n${url}`))))))));
                const promptMsg = isZh ? 
                    '复制作业链接:' : 
                    (isAr ? 'انسخ رابط الواجب من هنا:' : 
                    (isUk ? 'Скопіюйте посилання на завдання тут:' :
                    (isVi ? 'Sao chép liên kết bài tập tại đây:' :
                    (isUr ? 'یہاں سے ہوم ورک لنک کاپی کریں:' :
                    (isFa ? 'لینک تمرین را از اینجا کپی کنید:' :
                    (isPt ? 'Copie aqui o link do trabalho de casa:' :
                    (isEs ? 'Copia aquí el enlace de tarea:' :
                    (isEn ? 'Copy homework link here:' : 'Kopier lektie-link her:'))))))));

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
