import { getLang } from '../utils/i18n.js';

/**
 * VanskeligeLydeArabiskView
 * Komplet pædagogisk træningsflade til arabisktalende danskkursister.
 * 
 * Formuleret i 100% letforståeligt hverdagssprog uden lingvistisk fagjargon:
 * 1. P vs. B (Papir-testen & lufttryk)
 * 2. Blødt d (Ånde på brillerne – aldrig arabisk ذ)
 * 3. Dansk r (Kragelyden i halsen & det slugte vokal-r)
 * 4. Konsonantklynger (Smæk døren i – undgå ekstra støttevokal)
 * 5. Læberundede vokaler: Y & Ø (Kyssemunden mod smilet)
 */

export function renderVanskeligeLydeArabiskView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    // Navigation handlers
    function handleBackToMain() {
        if (typeof navigateFn === 'function') {
            navigateFn('main');
        } else {
            const lang = getLang() || 'ar';
            window.location.hash = `#/${lang}/main`;
        }
    }

    function handleBackToMSS() {
        if (typeof navigateFn === 'function') {
            navigateFn('mit_sprog_sammenlignet');
        } else {
            const lang = getLang() || 'ar';
            window.location.hash = `#/${lang}/mit_sprog_sammenlignet`;
        }
    }

    // Clipboard & Toast helpers
    function showCopyToast(msg) {
        let toast = document.querySelector('#vla-copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'vla-copy-toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 24px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #0284c7, #0369a1);
                color: #ffffff;
                padding: 0.75rem 1.4rem;
                border-radius: 9999px;
                font-weight: 800;
                font-size: 0.92rem;
                box-shadow: 0 10px 25px rgba(0,0,0,0.45);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                pointer-events: none;
                transition: all 0.25s ease;
            `;
            document.body.appendChild(toast);
        }
        toast.innerHTML = msg;
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
                showCopyToast(`📋 ${label} kopieret til udklipsholder!`);
            }).catch(() => {
                fallbackCopy(text, label);
            });
        } else {
            fallbackCopy(text, label);
        }
    }

    function fallbackCopy(text, label) {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showCopyToast(`📋 ${label} kopieret!`);
    }

    function getFullHomeworkUrl(modId, tabId) {
        const origin = window.location.origin;
        const pathname = window.location.pathname;
        const lang = getLang() || 'ar';
        return `${origin}${pathname}#/${lang}/vanskelige_lyde_arabisk/${modId}/${tabId}`;
    }

    // Modal to view and copy ALL homework URLs
    function openHomeworkOverviewModal() {
        const existing = document.querySelector('#vla-hw-modal');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'vla-hw-modal';
        overlay.className = 'vla-modal-overlay';

        const tabNames = {
            principles: { da: '1. Mundstilling & Princip (Teori)', ar: '1. حركة الفم والخدعة العملية' },
            pairs: { da: '2. Minimale Par (Lyttequiz)', ar: '2. تمييز الأصوات (اختبار الاستماع)' },
            speech: { da: '3. Mikrofontræning (Udtaleopgave)', ar: '3. تحدي النطق بالمايكروفون' }
        };

        overlay.innerHTML = `
            <div class="vla-modal-card">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.12); padding-bottom:0.75rem;">
                    <div>
                        <div style="font-size:0.75rem; font-weight:900; color:#38bdf8; text-transform:uppercase;">📚 Lærer-værktøj • Hjemmearbejde URL'er (روابط الواجبات)</div>
                        <h2 style="margin:0.2rem 0 0; font-size:1.3rem; font-weight:900; color:#ffffff;">Direkte links til alle lektier og opgaver</h2>
                    </div>
                    <button type="button" class="vla-back-btn" id="vla-modal-close" style="padding:0.4rem 0.8rem;">✕ Luk (إغلاق)</button>
                </div>
                <div style="font-size:0.86rem; color:#cbd5e1; margin-bottom:1.15rem; line-height:1.45;">
                    Klik på <strong>Kopier link</strong> ud for den ønskede opgave for at sende kursisten direkte ind på modulet og den specifikke fane.
                </div>
                <div style="display:flex; flex-direction:column; gap:1.15rem;">
                    ${SOUND_MODULES.map(mod => `
                        <div style="background:rgba(30,41,59,0.7); border:1px solid rgba(148,163,184,0.22); border-radius:12px; padding:0.9rem 1rem;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; flex-wrap:wrap; gap:0.4rem;">
                                <div>
                                    <span style="font-size:0.7rem; font-weight:800; background:rgba(56,189,248,0.2); color:#7dd3fc; padding:0.15rem 0.5rem; border-radius:9999px;">${mod.badge}</span>
                                    <strong style="color:#ffffff; font-size:1.02rem; margin-left:0.35rem;">${mod.titleDa}</strong>
                                    <span style="color:#94a3b8; font-size:0.84rem; margin-left:0.25rem;">(${mod.titleAr})</span>
                                </div>
                            </div>
                            <div style="display:flex; flex-direction:column; gap:0.45rem;">
                                ${['principles', 'pairs', 'speech'].map(tabId => {
                                    const url = getFullHomeworkUrl(mod.id, tabId);
                                    const tName = tabNames[tabId];
                                    return `
                                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(15,23,42,0.65); padding:0.45rem 0.75rem; border-radius:8px; gap:0.5rem; flex-wrap:wrap;">
                                            <div style="font-size:0.82rem; color:#e2e8f0;">
                                                <strong>${tName.da}</strong> <span style="color:#94a3b8; font-size:0.76rem;">${tName.ar}</span>
                                            </div>
                                            <button type="button" class="vla-copy-btn" data-hw-url="${url}" data-hw-label="${mod.titleDa} - ${tName.da}">
                                                📋 Kopier link (نسخ)
                                            </button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        overlay.querySelector('#vla-modal-close').onclick = () => overlay.remove();
        overlay.onclick = (e) => {
            if (e.target === overlay) overlay.remove();
        };

        overlay.querySelectorAll('[data-hw-url]').forEach(btn => {
            btn.onclick = () => {
                copyToClipboard(btn.dataset.hwUrl, btn.dataset.hwLabel);
            };
        });

        document.body.appendChild(overlay);
    }

    // Parse initial module and tab from extraData.subPath or window.location.hash
    let initialModuleId = 'p_vs_b';
    let initialTab = 'principles';

    const subPathStr = extraData.subPath || '';
    if (subPathStr) {
        const parts = subPathStr.split('/').filter(Boolean);
        if (parts[0] && ['p_vs_b', 'bloedt_d', 'dansk_r', 'stoettevokal', 'y_og_oe'].includes(parts[0])) {
            initialModuleId = parts[0];
        }
        if (parts[1] && ['principles', 'pairs', 'speech'].includes(parts[1])) {
            initialTab = parts[1];
        }
    } else {
        try {
            const rawHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
            const segs = rawHash.split('/');
            const idx = segs.findIndex(s => s === 'vanskelige_lyde_arabisk' || s === 'arabiske_lyde');
            if (idx !== -1) {
                if (segs[idx + 1] && ['p_vs_b', 'bloedt_d', 'dansk_r', 'stoettevokal', 'y_og_oe'].includes(segs[idx + 1])) {
                    initialModuleId = segs[idx + 1];
                }
                if (segs[idx + 2] && ['principles', 'pairs', 'speech'].includes(segs[idx + 2])) {
                    initialTab = segs[idx + 2];
                }
            }
        } catch (e) {}
    }

    // Active state
    let activeModuleId = initialModuleId;
    let activeTarget = 'p'; // depends on activeModule
    let activeTab = initialTab; // 'principles', 'pairs', 'speech'

    function syncUrl(replace = false) {
        const lang = getLang() || 'ar';
        const newHash = `#/${lang}/vanskelige_lyde_arabisk/${activeModuleId}/${activeTab}`;
        if (window.location.hash !== newHash) {
            if (replace) {
                history.replaceState(null, '', newHash);
            } else {
                history.pushState(null, '', newHash);
            }
        }
    }
    
    // Quiz state for Tab 2
    let pairQuizIdx = 0;
    let pairScore = 0;
    
    // Speech recording state for Tab 3
    let speechExerciseIdx = 0;
    let isSpeechRecording = false;
    let consecutiveSpeechStreak = 0;

    // Outer wrapper
    const viewContainer = document.createElement('div');
    viewContainer.className = 'vla-wrapper';

    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .vla-wrapper {
            max-width: 1040px;
            margin: 0 auto;
            padding: 1.25rem 1rem 3.5rem 1rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #f8fafc;
        }

        .vla-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-bottom: 1.35rem;
            padding-bottom: 0.85rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .vla-back-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.35);
            color: #f8fafc;
            padding: 0.55rem 1.05rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.16s ease;
            text-decoration: none;
            backdrop-filter: blur(8px);
        }

        .vla-back-btn:hover {
            background: rgba(51, 65, 85, 0.95);
            border-color: #38bdf8;
            color: #38bdf8;
            transform: translateY(-1px);
        }

        .vla-back-btn-primary {
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(30, 41, 59, 0.85));
            border-color: #38bdf8;
            color: #7dd3fc;
        }

        .vla-back-btn-primary:hover {
            background: #0284c7;
            color: #ffffff;
            border-color: #38bdf8;
        }

        .vla-badge-top {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.78rem;
            font-weight: 800;
            color: #cbd5e1;
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 9999px;
            padding: 0.35rem 0.8rem;
        }

        .vla-bottom-bar {
            margin-top: 2.75rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        /* Top Module Tabs */
        .vla-nav-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
            gap: 0.65rem;
            margin-bottom: 1.5rem;
        }

        .vla-mod-card {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
            position: relative;
            backdrop-filter: blur(8px);
        }

        .vla-mod-card:hover {
            transform: translateY(-2px);
            border-color: rgba(96, 165, 250, 0.4);
            background: rgba(30, 41, 59, 0.9);
        }

        .vla-mod-card.active {
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.3) 0%, rgba(30, 41, 59, 0.9) 100%);
            border-color: #3b82f6;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.25);
        }

        .vla-mod-badge {
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.18rem 0.5rem;
            border-radius: 9999px;
            display: inline-block;
            margin-bottom: 0.4rem;
            background: rgba(59, 130, 246, 0.2);
            color: #93c5fd;
            border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .vla-mod-card.active .vla-mod-badge {
            background: #3b82f6;
            color: #ffffff;
            border-color: #60a5fa;
        }

        .vla-mod-title-da {
            font-size: 1.05rem;
            font-weight: 800;
            color: #f1f5f9;
            margin-bottom: 0.15rem;
        }

        .vla-mod-title-ar {
            font-size: 0.84rem;
            color: #94a3b8;
            line-height: 1.35;
        }

        .vla-mod-card.active .vla-mod-title-ar {
            color: #cbd5e1;
            font-weight: 600;
        }

        /* Hero Header */
        .vla-hero {
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 18px;
            padding: 1.35rem 1.45rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }

        .vla-hero-title {
            font-size: 1.35rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 0.35rem;
        }

        .vla-hero-desc {
            font-size: 0.92rem;
            color: #cbd5e1;
            line-height: 1.55;
            margin-bottom: 0.6rem;
        }

        /* Action bar for Copy HW */
        .vla-action-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 0.65rem;
            margin-top: 0.85rem;
            padding-top: 0.75rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .vla-copy-btn {
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid #38bdf8;
            color: #7dd3fc;
            padding: 0.45rem 0.85rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.82rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .vla-copy-btn:hover {
            background: #0284c7;
            color: #ffffff;
        }

        /* Internal 3 Tabs */
        .vla-tab-bar {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.25rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 0.5rem;
            overflow-x: auto;
        }

        .vla-tab-btn {
            background: none;
            border: none;
            color: #94a3b8;
            padding: 0.55rem 1rem;
            font-size: 0.92rem;
            font-weight: 800;
            cursor: pointer;
            border-radius: 10px;
            white-space: nowrap;
            transition: all 0.15s ease;
        }

        .vla-tab-btn:hover {
            color: #f8fafc;
            background: rgba(255, 255, 255, 0.05);
        }

        .vla-tab-btn.active {
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.15);
        }

        /* Sub controls inside Tab 1 */
        .vla-sub-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1.25rem;
            flex-wrap: wrap;
        }
        .vla-sub-label {
            font-size: 0.82rem;
            font-weight: 800;
            color: #fde68a;
            text-transform: uppercase;
        }
        .vla-sub-btn {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(148, 163, 184, 0.3);
            color: #cbd5e1;
            padding: 0.4rem 0.85rem;
            border-radius: 9999px;
            font-size: 0.84rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .vla-sub-btn:hover {
            border-color: #38bdf8;
            color: #ffffff;
        }
        .vla-sub-btn.active-target {
            background: #0284c7;
            border-color: #38bdf8;
            color: #ffffff;
        }

        /* Diagram Grid */
        .vla-diagram-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 1.15rem;
            margin-bottom: 1.35rem;
        }
        .vla-diagram-card {
            background: rgba(15, 23, 42, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            border-radius: 16px;
            padding: 1.1rem;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .vla-diagram-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.85rem;
            padding-bottom: 0.45rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .vla-diagram-title {
            font-size: 0.96rem;
            font-weight: 800;
            color: #f8fafc;
        }
        .vla-diagram-tag {
            font-size: 0.72rem;
            font-weight: 900;
            text-transform: uppercase;
            padding: 0.18rem 0.5rem;
            border-radius: 6px;
        }
        .vla-svg-wrapper {
            background: #090e1a;
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 12px;
            padding: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 200px;
        }
        .vla-diagram-notes {
            margin-top: 0.85rem;
            font-size: 0.86rem;
            color: #cbd5e1;
            line-height: 1.55;
        }

        /* Pinch / Self-Test Card */
        .vla-pinch-card {
            background: linear-gradient(135deg, rgba(234, 179, 8, 0.16) 0%, rgba(15, 23, 42, 0.94) 100%);
            border: 1.5px solid rgba(251, 191, 36, 0.5);
            border-radius: 16px;
            padding: 1.15rem 1.35rem;
            margin-bottom: 1.35rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
        }

        /* Bilingual Guide */
        .vla-bilingual-card {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 16px;
            padding: 1.15rem 1.35rem;
            margin-bottom: 1.35rem;
        }

        /* Tab 2: Quiz */
        .vla-quiz-container {
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(56, 189, 248, 0.35);
            border-radius: 18px;
            padding: 1.5rem;
            text-align: center;
        }
        .vla-quiz-progress {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.25rem;
            font-size: 0.86rem;
            color: #94a3b8;
            font-weight: 800;
        }
        .vla-quiz-score-pill {
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
            border: 1px solid rgba(34, 197, 94, 0.4);
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-weight: 900;
        }
        .vla-listen-btn-big {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: 1.5px solid #38bdf8;
            color: #ffffff;
            font-size: 1.15rem;
            font-weight: 900;
            padding: 0.85rem 1.8rem;
            border-radius: 16px;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(2, 132, 199, 0.4);
            transition: all 0.18s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            margin: 1rem 0 1.5rem;
        }
        .vla-listen-btn-big:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 28px rgba(2, 132, 199, 0.55);
        }
        .vla-quiz-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
            max-width: 640px;
            margin: 0 auto 1.25rem;
        }
        .vla-pair-choice-btn {
            background: rgba(30, 41, 59, 0.9);
            border: 2px solid rgba(148, 163, 184, 0.35);
            border-radius: 16px;
            padding: 1.2rem 1rem;
            cursor: pointer;
            transition: all 0.16s ease;
            text-align: center;
        }
        .vla-pair-choice-btn:hover {
            border-color: #38bdf8;
            background: rgba(51, 65, 85, 0.95);
            transform: translateY(-2px);
        }
        .vla-pair-word {
            font-size: 1.55rem;
            font-weight: 900;
            margin-bottom: 0.3rem;
        }
        .vla-pair-meaning {
            font-size: 0.88rem;
            color: #cbd5e1;
        }
        .vla-quiz-feedback {
            margin-top: 1rem;
            padding: 0.85rem 1rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.94rem;
            display: none;
        }

        /* Tab 3: Speech Recognition */
        .vla-speech-card {
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(248, 113, 113, 0.4);
            border-radius: 18px;
            padding: 1.5rem;
            text-align: center;
        }
        .vla-speech-meta-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            font-size: 0.86rem;
            color: #94a3b8;
        }
        .vla-speech-prompt {
            font-size: clamp(1.4rem, 2.5vw, 1.85rem);
            font-weight: 900;
            color: #ffffff;
            margin-bottom: 0.4rem;
        }
        .vla-speech-sub {
            font-size: 0.92rem;
            color: #94a3b8;
            margin-bottom: 1.25rem;
        }
        .vla-mic-row {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            margin: 1.25rem 0;
            flex-wrap: wrap;
        }
        .vla-listen-model-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.35);
            color: #f8fafc;
            padding: 0.7rem 1.25rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .vla-listen-model-btn:hover {
            border-color: #38bdf8;
            background: rgba(51, 65, 85, 0.95);
        }
        .vla-mic-btn {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ef4444, #b91c1c);
            border: 3px solid rgba(254, 202, 202, 0.6);
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 10px 28px rgba(239, 68, 68, 0.4);
            transition: all 0.2s ease;
        }
        .vla-mic-btn:hover {
            transform: scale(1.06);
            box-shadow: 0 14px 34px rgba(239, 68, 68, 0.55);
        }
        .vla-mic-btn.listening {
            animation: vla-pulse 1.4s infinite;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            border-color: #86efac;
        }
        @keyframes vla-pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
            70% { transform: scale(1.08); box-shadow: 0 0 0 16px rgba(34, 197, 94, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        .vla-speech-status {
            font-size: 0.9rem;
            font-weight: 800;
            color: #cbd5e1;
            min-height: 1.4rem;
        }
        .vla-speech-feedback-box {
            margin-top: 1rem;
            padding: 0.85rem 1rem;
            border-radius: 12px;
            font-size: 0.94rem;
            font-weight: 800;
            display: none;
        }
        .vla-nav-step-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.35);
            color: #f8fafc;
            padding: 0.6rem 1.25rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .vla-nav-step-btn:hover:not(:disabled) {
            border-color: #38bdf8;
            background: rgba(51, 65, 85, 0.95);
        }
        .vla-nav-step-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        /* Modal Overlay */
        .vla-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.25rem;
        }
        .vla-modal-card {
            background: #0f172a;
            border: 2px solid #38bdf8;
            border-radius: 20px;
            max-width: 680px;
            width: 100%;
            max-height: 88vh;
            overflow-y: auto;
            padding: 1.35rem 1.5rem;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
        }
        .vla-rtl {
            direction: rtl;
            text-align: right;
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
            id: 'p_vs_b',
            titleDa: '1. P vs. B (Papir-testen)',
            titleAr: '١. الفرق بين P و B (اختبار الورقة)',
            badge: 'Fokus 1',
            descDa: 'På arabisk findes kun B (ب) og intet P. Derfor forveksles "penge" med "benge", og "pære" med "bære". Pustet er afgørende: Ved P skal munden eksplodere og blæse et stykke papir væk foran læberne. Ved B er læberne bløde og rolige uden pust.',
            descAr: 'في اللغة العربية يوجد فقط حرف الباء (ب) ولا يوجد حرف P إطلاقاً! لذلك يقع الكثيرون في فخ نطق penge كأنها benge، أو pære (كمثرى) كأنها bære (يحمل). السر يكمن في اندفاع الهواء: مع حرف P تنفجر الشفتان بهواء قوي يطيّر ورقة أمام فمك، بينما مع B تكون الشفتان هادئتين دون اندفاع للهواء.',
            heroTitleAr: 'الصوت الصعب رقم ١: انفجار P مقابل هدوء B',
            heroSubAr: 'اختبار الورقة: عند نطق P يجب أن تطير الورقة من اندفاع الهواء، وعند نطق B تبقى ثابتة!',
            subControls: {
                labelAr: 'المقارنة المباشرة:',
                options: [
                    { id: 'p', label: 'حرف P المتفجر', sub: 'Pære, Penge', activeClass: 'active-target' },
                    { id: 'b', label: 'حرف B الهادئ', sub: 'Bære, Bænke', activeClass: 'active-target' }
                ]
            },
            diagCard1: (tgt) => {
                const isP = tgt === 'p';
                return {
                    title: isP ? 'حرف P: انفجار قوي للشفتين' : 'حرف B: تلامس هادئ للشفتين',
                    tag: isP ? 'انفجار هواء' : 'صوت حنجري هادئ',
                    tagStyle: isP ? 'background:rgba(239,68,68,0.2); color:#fca5a5;' : 'background:rgba(56,189,248,0.2); color:#7dd3fc;',
                    svg: `
                        <svg viewBox="0 0 240 160" width="100%" height="160">
                            <!-- Head Profile -->
                            <path d="M 40 30 Q 80 15 120 20 Q 150 25 170 60 Q 185 85 185 110" fill="none" stroke="#475569" stroke-width="3"/>
                            <!-- Lips -->
                            ${isP ? `
                                <ellipse cx="85" cy="95" rx="14" ry="8" fill="#ef4444" opacity="0.9"/>
                                <!-- Air explosion burst -->
                                <path d="M 65 95 L 20 85 M 65 95 L 15 95 M 65 95 L 20 105" stroke="#fde047" stroke-width="3.5" stroke-linecap="round"/>
                                <circle cx="35" cy="85" r="3" fill="#fde047"/>
                                <circle cx="28" cy="105" r="3" fill="#fde047"/>
                                <text x="25" y="65" fill="#fde047" font-size="12" font-weight="bold">اندفاع هواء قوي!</text>
                            ` : `
                                <ellipse cx="85" cy="95" rx="12" ry="7" fill="#38bdf8" opacity="0.8"/>
                                <!-- Vocal cord vibration -->
                                <circle cx="150" cy="120" r="10" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="3,3"/>
                                <text x="25" y="65" fill="#94a3b8" font-size="12">لا يوجد اندفاع هواء</text>
                            `}
                        </svg>
                    `,
                    notes: isP ? 
                        '<strong>حرف P:</strong> الشفتان تنطبقان بقوة وتحبسان الهواء في الفم، ثم تنفتحان فجأة كبالون ينفجر. الهواء المندفع هو ما يصنع الفرق!' : 
                        '<strong>حرف B:</strong> الشفتان تتلامسان برقة وهدوء دون حبس شديد للهواء. الصوت يتولد باهتزاز الأحبال الصوتية دون أي نفخة هواء.'
                };
            },
            diagCard2: (tgt) => {
                const isP = tgt === 'p';
                return {
                    title: isP ? 'اختبار الورقة أمام الفم (P)' : 'اختبار الورقة أمام الفم (B)',
                    tag: isP ? 'الورقة تطير 💨' : 'الورقة ثابتة ✋',
                    tagStyle: isP ? 'background:rgba(234,179,8,0.2); color:#fde047;' : 'background:rgba(34,197,94,0.2); color:#86efac;',
                    svg: `
                        <svg viewBox="0 0 240 160" width="100%" height="160">
                            <!-- Mouth -->
                            <path d="M 80 80 Q 95 80 100 85 Q 95 90 80 90 Z" fill="#f87171"/>
                            <!-- Sheet of paper -->
                            ${isP ? `
                                <!-- Tilted moving paper -->
                                <line x1="50" y1="50" x2="25" y2="120" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
                                <path d="M 75 85 Q 55 80 35 75" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="4,3"/>
                                <text x="10" y="40" fill="#fde047" font-size="12" font-weight="bold">الورقة تطير!</text>
                            ` : `
                                <!-- Straight hanging paper -->
                                <line x1="50" y1="50" x2="50" y2="120" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
                                <text x="15" y="40" fill="#86efac" font-size="12" font-weight="bold">الورقة ثابتة تماماً</text>
                            `}
                        </svg>
                    `,
                    notes: isP ? 
                        'امسك ورقة ملاحظات صغيرة بيدك على بعد 5 سم من فمك وقل <strong>"pære"</strong> أو <strong>"penge"</strong>. يجب أن تطير الورقة إلى الوراء بقوة!' : 
                        'قل الآن <strong>"bære"</strong> أو <strong>"bænk"</strong> مع إبقاء الورقة في نفس المكان. يجب ألا تتحرك الورقة على الإطلاق.'
                };
            },
            pinchCardHtml: `
                <div style="display:flex; align-items:center; gap:0.6rem; font-size:0.78rem; font-weight:900; color:#fde047; text-transform:uppercase; margin-bottom:0.4rem;">
                    <span>📄</span> <span>اختبار ورقة الملاحظات الذاتي (Papir-testen)</span>
                </div>
                <div style="font-size:1.1rem; font-weight:900; color:#ffffff; margin-bottom:0.35rem;">
                    كيف تتأكد بنفسك خلال ثانية واحدة من نطقك لحرف P؟
                </div>
                <div style="font-size:0.88rem; color:#e2e8f0; line-height:1.55;" dir="rtl">
                    ضع ورقة بيضاء عادية أمام شفتيك، وانطق الزوجين بالتبادل:<br>
                    • <strong>pære</strong> (الورقة تنحني بقوة) ↔ <strong>bære</strong> (الورقة تظل ساكنة).<br>
                    إذا تحركت الورقة عند نطق bære، فأنت تضغط شفتيك أكثر من اللازم! وإذا لم تتحرك عند نطق pære، فأنت تنطقها باءً عربية عادية.
                </div>
            `,
            bilingualGuideHtml: `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.65rem;">
                    <strong style="color:#fde68a; font-size:0.95rem;">💡 دليل المعلم والتدريب النطقي (Guide):</strong>
                    <span style="font-size:0.75rem; color:#94a3b8;">Dansk & Arabisk</span>
                </div>
                <div style="font-size:0.88rem; color:#cbd5e1; line-height:1.55;">
                    <strong>Dansk:</strong> P på dansk er en kraftigt aspireret klusil (med et hørbart luftstød [pʰ]), mens B er uaspireret og ustemt [b̥]. På arabisk findes kun /b/, så kursister udtaler ofte P som B.<br>
                    <div style="margin-top:0.5rem;" dir="rtl">
                        <strong>العربية:</strong> حرف P ليس مجرد باء ثقيلة، بل هو انفجار هوائي حقيقي. تذكر دائماً: بدون نفخة الهواء التي تحرك الورقة، سيفهمك الدنماركي دائماً أنك تنطق حرف B!
                    </div>
                </div>
            `,
            minimalPairs: [
                { l: 'pære', meanL_ar: 'كمثرى (إجاص)', n: 'bære', meanN_ar: 'يحمل', contextL: 'Jeg spiser en sød pære.', contextN: 'Kan du bære posen?' },
                { l: 'penge', meanL_ar: 'نقود / فلوس', n: 'bænke', meanN_ar: 'مقاعد للجلوس', contextL: 'Jeg har ingen penge.', contextN: 'Der er bænke i parken.' },
                { l: 'pakke', meanL_ar: 'طرد / يحزم أمتعته', n: 'bakke', meanN_ar: 'تلة / صينية طعام', contextL: 'Her er en pakke til dig.', contextN: 'Bussen kører op ad en bakke.' },
                { l: 'parkere', meanL_ar: 'يركن السيارة', n: 'barkere', meanN_ar: 'يقشر لحاء الشجر', contextL: 'Hvor må jeg parkere?', contextN: 'Træets bark er brun.' },
                { l: 'pande', meanL_ar: 'مقلاة / جبين', n: 'bande', meanN_ar: 'يشتم / عصابة', contextL: 'Ægget er på panden.', contextN: 'Man må ikke bande her.' },
                { l: 'pille', meanL_ar: 'حبة دواء', n: 'bille', meanN_ar: 'خنفساء', contextL: 'Tag en pille mod smerter.', contextN: 'En bille kravler på gulvet.' },
                { l: 'par', meanL_ar: 'زوج / اثنان', n: 'bar', meanN_ar: 'مقهى / حافٍ', contextL: 'Et par sko.', contextN: 'Vi mødes på en bar.' }
            ],
            speechExercises: [
                {
                    text: 'Jeg spiser en pære i parken.',
                    targetWords: ['pære', 'parken'],
                    hintDa: 'Husk luft-eksplosionen på både "pære" og "parken"!',
                    hintAr: 'احرص على اندفاع الهواء بقوة في كلمتي pære و parken!'
                },
                {
                    text: 'Kan du bære denne store pakke?',
                    targetWords: ['bære', 'pakke'],
                    hintDa: 'Bære er blød og rolig; pakke har et kraftigt luft-pust på P!',
                    hintAr: 'كلمة bære هادئة بدون هواء، أما pakke فتحتاج اندفاع هواء حاسم!'
                },
                {
                    text: 'Han har mange penge i lommen.',
                    targetWords: ['penge'],
                    hintDa: 'Penge må ALDRIG lyde som "benge"!',
                    hintAr: 'إياك أن تنطق penge كأنها benge بالباء العربية!'
                },
                {
                    text: 'Vi sidder på en bænk og drikker kaffe.',
                    targetWords: ['bænk'],
                    hintDa: 'Bænk udtales roligt med B uden ekstra pust.',
                    hintAr: 'كلمة bænk تنطق بهدوء وببساطة دون تكلف في الهواء.'
                }
            ]
        },
        {
            id: 'bloedt_d',
            titleDa: '2. Blødt d (Ånde på brillerne)',
            titleAr: '٢. حرف d الناعم (مسح النظارات)',
            badge: 'Fokus 2',
            descDa: 'Mange arabisktalende stikker tungespidsen ud mellem tænderne som ved arabisk ذ (dhāl som i "the"). Det giver en hård og læspende lyd. På dansk skal tungespidsen hvile fladt og dovent bag undertænderne, mens luften blot ånder lunt ud: "ma... d", "brø... d", "hvi... d".',
            descAr: 'أكبر فخ يقع فيه الناطقون بالعربية هو إخراج اللسان بين الأسنان كنطق حرف الذال (ذ) في كلمة "ذكر" أو the بالإنجليزية! في الدنماركية، اللسان يرتاح مسترخياً تماماً ومسطحاً خلف الأسنان السفلية، وتتنفس هواءً دافئاً كأنك تمسح نظاراتك: mad, brød, hvid.',
            heroTitleAr: 'الصوت الصعب رقم ٢: حرف d الناعم ليس حرف الذال (ذ)!',
            heroSubAr: 'اترك لسانك مسترخياً خلف الأسنان السفلية وانفخ هواءً دافئاً كأنك تمسح نظاراتك (ma...d, brø...d)',
            subControls: {
                labelAr: 'المقارنة المباشرة:',
                options: [
                    { id: 'bloedt_d', label: 'حرف d الناعم (mad, brød)', sub: 'Ånde på brillerne', activeClass: 'active-target' },
                    { id: 'haardt_d', label: 'حرف d الصلب (dag, dør)', sub: 'Spids mod ganen', activeClass: 'active-target' }
                ]
            },
            diagCard1: (tgt) => {
                const isSoft = tgt === 'bloedt_d';
                return {
                    title: isSoft ? 'حرف d الناعم: اللسان مسطح خلف الأسنان السفلية' : 'حرف d الصلب: نقرة بطرف اللسان',
                    tag: isSoft ? 'هواء دافئ منساب' : 'طرقة حازمة',
                    tagStyle: isSoft ? 'background:rgba(56,189,248,0.2); color:#7dd3fc;' : 'background:rgba(234,179,8,0.2); color:#fde047;',
                    svg: `
                        <svg viewBox="0 0 240 160" width="100%" height="160">
                            <!-- Mouth Cavity -->
                            <path d="M 60 50 Q 120 40 170 50 Q 190 70 190 110" fill="none" stroke="#475569" stroke-width="3"/>
                            <!-- Upper Teeth -->
                            <rect x="75" y="65" width="10" height="15" rx="3" fill="#ffffff"/>
                            <!-- Lower Teeth -->
                            <rect x="78" y="105" width="10" height="15" rx="3" fill="#ffffff"/>
                            ${isSoft ? `
                                <!-- Tongue flat behind lower teeth -->
                                <path d="M 88 115 Q 120 120 160 115" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
                                <!-- Gentle warm air flow -->
                                <path d="M 150 95 Q 110 90 70 95" fill="none" stroke="#fde047" stroke-width="3.5" stroke-dasharray="4,4"/>
                                <text x="70" y="35" fill="#38bdf8" font-size="11" font-weight="bold">اللسان مرتاح خلف الأسنان السفلية</text>
                            ` : `
                                <!-- Tongue hitting upper alveolar ridge -->
                                <path d="M 85 80 Q 120 110 160 115" fill="none" stroke="#fb923c" stroke-width="8" stroke-linecap="round"/>
                                <circle cx="85" cy="80" r="5" fill="#f87171"/>
                                <text x="70" y="35" fill="#fb923c" font-size="11" font-weight="bold">طرف اللسان يلمس سقف الحلق</text>
                            `}
                        </svg>
                    `,
                    notes: isSoft ? 
                        '<strong>حرف d الناعم (brød, mad):</strong> طرف اللسان يستقر مسترخياً تماماً ومسطحاً خلف الأسنان السفلية. الهواء الدافئ يمر فوق اللسان دون أي احتكاك حاد!' : 
                        '<strong>حرف d الصلب (dag, dåse):</strong> طرف اللسان يصعد إلى الأعلى وينقر المنطقة خلف الأسنان العلوية مباشرة.'
                };
            },
            diagCard2: (tgt) => {
                return {
                    title: 'التحذير الأهم: إياك وإخراج لسانك بين الأسنان (ذ)!',
                    tag: 'خطأ شائع جداً ❌',
                    tagStyle: 'background:rgba(239,68,68,0.2); color:#fca5a5;',
                    svg: `
                        <svg viewBox="0 0 240 160" width="100%" height="160">
                            <!-- Upper Teeth -->
                            <rect x="90" y="55" width="12" height="18" rx="2" fill="#ffffff"/>
                            <!-- Lower Teeth -->
                            <rect x="92" y="100" width="12" height="18" rx="2" fill="#ffffff"/>
                            <!-- Tongue sticking out (Wrong!) -->
                            <path d="M 130 90 L 70 90" stroke="#ef4444" stroke-width="12" stroke-linecap="round"/>
                            <!-- Red Cross over tongue -->
                            <line x1="60" y1="75" x2="90" y2="105" stroke="#ef4444" stroke-width="4"/>
                            <line x1="90" y1="75" x2="60" y2="105" stroke="#ef4444" stroke-width="4"/>
                            <text x="35" y="35" fill="#fca5a5" font-size="12" font-weight="bold">ممنوع إخراج اللسان بين الأسنان!</text>
                        </svg>
                    `,
                    notes: 'إذا أخرجت طرف لسانك بين الأسنان كنطق حرف الذال (ذ)، سيصبح الصوت حاداً ولادغاً، ولن يبدو دنماركياً على الإطلاق. اجعل لسانك نائماً في قاع الفم.'
                };
            },
            pinchCardHtml: `
                <div style="display:flex; align-items:center; gap:0.6rem; font-size:0.78rem; font-weight:900; color:#fde047; text-transform:uppercase; margin-bottom:0.4rem;">
                    <span>👓</span> <span>خدعة مسح النظارات (Ånde på brillerne)</span>
                </div>
                <div style="font-size:1.1rem; font-weight:900; color:#ffffff; margin-bottom:0.35rem;">
                    قاعدة سحرية تجعلك تتقن حرف d الناعم خلال 5 ثوانٍ!
                </div>
                <div style="font-size:0.88rem; color:#e2e8f0; line-height:1.55;" dir="rtl">
                    افعل تماماً كما تفعل عندما تنفخ هواءً دافئاً على عدسات نظاراتك لتنظيفها، مع ترك طرف اللسان مسترخياً ومسطحاً خلف الأسنان السفلية، وضع نبرة صوتية خفيفة:<br>
                    • <strong>ma... d</strong> • <strong>brø... d</strong> • <strong>hvi... d</strong><br>
                    اشعر بالهواء الدافئ ينساب بكسل ولطف شديد فوق لسانك دون أي مقاومة أو صوت صفير!
                </div>
            `,
            bilingualGuideHtml: `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.65rem;">
                    <strong style="color:#fde68a; font-size:0.95rem;">💡 دليل المعلم والتدريب النطقي (Guide):</strong>
                    <span style="font-size:0.75rem; color:#94a3b8;">Dansk & Arabisk</span>
                </div>
                <div style="font-size:0.88rem; color:#cbd5e1; line-height:1.55;">
                    <strong>Dansk:</strong> Dansk blødt d er en velariseret laminal approksimant [ð̠˕]. Den må aldrig forveksles med arabisk interdentalt ذ ([ð]). Tungen skal forblive flad nede bag undertænderne.<br>
                    <div style="margin-top:0.5rem;" dir="rtl">
                        <strong>العربية:</strong> الفرق الجوهري هو أن الذال العربية احتكاكية بين الأسنان، أما d الدنماركية الناعمة فهي مجرد هواء دافئ ينساب فوق اللسان المسترخي في قاع الفم.
                    </div>
                </div>
            `,
            minimalPairs: [
                { l: 'mad', meanL_ar: 'طعام (d ناعم)', n: 'mat', meanN_ar: 'باهت (t صلب)', contextL: 'Jeg laver lækker mad.', contextN: 'Farven er helt mat.' },
                { l: 'hvid', meanL_ar: 'أبيض (d ناعم)', n: 'hvidt', meanN_ar: 'أبيض للمحايد (t صلب)', contextL: 'En hvid skjorte.', contextN: 'Et hvidt hus.' },
                { l: 'rød', meanL_ar: 'أحمر (d ناعم)', n: 'rødt', meanN_ar: 'أحمر للمحايد (t صلب)', contextL: 'En rød cykel.', contextN: 'Et rødt æble.' },
                { l: 'glad', meanL_ar: 'سعيد (d ناعم)', n: 'glat', meanN_ar: 'أملس / زلق', contextL: 'Jeg er meget glad.', contextN: 'Vejen er meget glat.' },
                { l: 'bad', meanL_ar: 'حمام / يستحم', n: 'bat', meanN_ar: 'مضرب تنس', contextL: 'Jeg tager et bad.', contextN: 'Et bat til bordtennis.' },
                { l: 'brød', meanL_ar: 'خبز (d ناعم)', n: 'brud', meanN_ar: 'عروس (d صلب)', contextL: 'Jeg spiser rugbrød.', contextN: 'Her er den smukke brud.' }
            ],
            speechExercises: [
                {
                    text: 'Jeg spiser dejlig mad i dag.',
                    targetWords: ['mad', 'dag'],
                    hintDa: 'Husk det bløde d i "mad" (ånde lunt uden at røre ganen)!',
                    hintAr: 'انفخ هواءً دافئاً في mad دون إخراج لسانك بين أسنانك!'
                },
                {
                    text: 'Bilen er helt hvid og ren.',
                    targetWords: ['hvid'],
                    hintDa: 'Hvid slutter med et blødt d som et lunt pust.',
                    hintAr: 'كلمة hvid تنتهي بهواء دافئ ناعم كمسح النظارات.'
                },
                {
                    text: 'Han er meget glad for sit arbejde.',
                    targetWords: ['glad'],
                    hintDa: 'Glad har blødt d – rør ikke fortænderne!',
                    hintAr: 'في كلمة glad احرص على بقاء اللسان مسترخياً في الأسفل.'
                },
                {
                    text: 'Vil du have et stykke frisk brød?',
                    targetWords: ['brød'],
                    hintDa: 'Brød: spids læberne til "ø" og ånd blødt ud på "d"!',
                    hintAr: 'في كلمة brød ضم شفتيك لحرف ø وانفخ هواءً دافئاً في d!'
                }
            ]
        },
        {
            id: 'dansk_r',
            titleDa: '3. Dansk r (Kragelyd & slugt r)',
            titleAr: '٣. حرف r الدنماركي (صوت الغراب والراء المبتلعة)',
            badge: 'Fokus 3',
            descDa: 'Arabisk har et flot rulle-r med tungespidsen (ر). Men på dansk findes to helt andre r-lyde: 1) Foran en vokal laves r dybt nede i halsen som kragens "kraa-kraa" eller arabisk غ (rød, rejse). 2) Efter en vokal og i endelser som -er forvandles r til en åben vokal eller sluges helt (spiser, lærer, mor).',
            descAr: 'في العربية نستخدم الراء المفخمة برول اللسان (ر). لكن الدنماركية لا تلفظ الراء بطرف اللسان أبداً: 1) في أول الكلمة تخرج من قاع الحلق كصوت غراب ينادي "كراا" (قريب من حرف الغين غ في كلمة غراب) مثل rød, rejse. 2) في آخر الكلمة واللواحق مثل -er تبتلع تماماً وتتحول إلى حركة مفتوحة شبيهة بالألف الممالة (spiser, lærer, mor).',
            heroTitleAr: 'الصوت الصعب رقم ٣: لا تدحرج لسانك كالراء العربية (ر)!',
            heroSubAr: 'في البداية يخرج الصوت كغراب من قاع الحلق (غ)، وفي النهاية يُبتلع الراء تماماً!',
            subControls: {
                labelAr: 'المقارنة المباشرة:',
                options: [
                    { id: 'hals_r', label: 'حرف r في بداية الكلمة (rød, rejse)', sub: 'صوت الغراب في الحلق', activeClass: 'active-target' },
                    { id: 'vokal_r', label: 'حرف r المبتلع في النهاية (mor, lærer)', sub: 'يتحول لحركة مفتوحة', activeClass: 'active-target' }
                ]
            },
            diagCard1: (tgt) => {
                const isStart = tgt === 'hals_r';
                return {
                    title: isStart ? 'في أول الكلمة: اهتزاز في قاع الحلق (غراب / غ)' : 'في آخر الكلمة: بلع الراء وتحولها لحركة مفتوحة',
                    tag: isStart ? 'قاع الحلق (غ)' : 'بلع الحرف',
                    tagStyle: isStart ? 'background:rgba(239,68,68,0.2); color:#fca5a5;' : 'background:rgba(34,197,94,0.2); color:#86efac;',
                    svg: `
                        <svg viewBox="0 0 240 160" width="100%" height="160">
                            <!-- Throat Outline -->
                            <path d="M 70 30 Q 110 20 160 30 Q 185 60 185 130" fill="none" stroke="#475569" stroke-width="3"/>
                            ${isStart ? `
                                <!-- Deep uvular friction -->
                                <circle cx="165" cy="80" r="14" fill="#ef4444" opacity="0.8"/>
                                <path d="M 155 75 L 175 85 M 155 85 L 175 75" stroke="#ffffff" stroke-width="2.5"/>
                                <text x="45" y="45" fill="#fca5a5" font-size="12" font-weight="bold">صوت الغراب العميق (kraa / غ)</text>
                            ` : `
                                <!-- Open vocal tract -->
                                <path d="M 110 85 Q 140 100 170 100" fill="none" stroke="#38bdf8" stroke-width="6"/>
                                <text x="35" y="45" fill="#86efac" font-size="12" font-weight="bold">اللسان مسترخٍ تماماً، الراء تبتلع!</text>
                            `}
                        </svg>
                    `,
                    notes: isStart ? 
                        '<strong>r في أول الكلمة (rød, rig, rejse):</strong> ينطق باحتكاك خفيف في أقصى قاع الحلق عند اللهاة، كصوت نعيق الغراب "كراا" أو مخرج حرف الغين (غ) في العربية.' : 
                        '<strong>r في آخر الكلمة (mor, spiser, lærer):</strong> لا تدحرج لسانك أبداً! الحرف يتحول تلقائياً إلى حركة مفتوحة وكسولة مثل ألف ممالة قصيرة: [sbisɐ]!'
                };
            },
            diagCard2: (tgt) => {
                return {
                    title: 'التحذير الأكبر: إياك ودحرجة طرف اللسان (ر)!',
                    tag: 'خطأ شائع جداً ❌',
                    tagStyle: 'background:rgba(239,68,68,0.2); color:#fca5a5;',
                    svg: `
                        <svg viewBox="0 0 240 160" width="100%" height="160">
                            <!-- Upper Teeth -->
                            <rect x="85" y="60" width="10" height="15" rx="2" fill="#ffffff"/>
                            <!-- Tongue rolling at teeth (Wrong!) -->
                            <path d="M 85 75 Q 120 110 160 115" fill="none" stroke="#ef4444" stroke-width="7"/>
                            <!-- Vibration lines -->
                            <path d="M 80 65 Q 75 75 80 85" stroke="#fde047" stroke-width="2.5" fill="none"/>
                            <text x="30" y="35" fill="#fca5a5" font-size="12" font-weight="bold">لا تدحرج طرف اللسان كالراء العربية!</text>
                        </svg>
                    `,
                    notes: 'إذا دحرجت لسانك وقلت "ر-ر-ر" كما في العربية، سيبدو كلامك غريباً وثقيلاً في الدنماركية. دع طرف اللسان مسترخياً دائماً!'
                };
            },
            pinchCardHtml: `
                <div style="display:flex; align-items:center; gap:0.6rem; font-size:0.78rem; font-weight:900; color:#fde047; text-transform:uppercase; margin-bottom:0.4rem;">
                    <span>🦅</span> <span>خدعة نعيق الغراب والغرغرة (Kragens kraa)</span>
                </div>
                <div style="font-size:1.1rem; font-weight:900; color:#ffffff; margin-bottom:0.35rem;">
                    كيف تضبط مخرج حرف r الدنماركي؟
                </div>
                <div style="font-size:0.88rem; color:#e2e8f0; line-height:1.55;" dir="rtl">
                    ١) <strong>في البداية:</strong> تظاهر بأنك تغرغر بقليل من الماء، أو قلد صوت غراب ينادي "كراا.. كراا" — ستشعر بالاحتكاك في قاع حلقك بالضبط، وهذا هو r الدنماركي الصحيح (*rød*، *rejse*).<br>
                    ٢) <strong>في النهاية:</strong> قل *lærer* دون أن يتحرك طرف لسانك إطلاقاً؛ دعه ينتهي بنَفَس دافئ مفتوح كأنك تقول [lɛː-ɐ].
                </div>
            `,
            bilingualGuideHtml: `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.65rem;">
                    <strong style="color:#fde68a; font-size:0.95rem;">💡 دليل المعلم والتدريب النطقي (Guide):</strong>
                    <span style="font-size:0.75rem; color:#94a3b8;">Dansk & Arabisk</span>
                </div>
                <div style="font-size:0.88rem; color:#cbd5e1; line-height:1.55;">
                    <strong>Dansk:</strong> Dansk r er en uvulær approksimant [ʁ] foran en vokal, og en vokaliseret vokal [ɐ] efter en vokal. Arabisk r er en alveolær trill [r]. Rulning med tungespidsen skal aflæres helt.<br>
                    <div style="margin-top:0.5rem;" dir="rtl">
                        <strong>العربية:</strong> الراء الدنماركية في أول الكلمة تشبه صوت الغين (غ)، وفي آخر الكلمة تبتلع وتتحول إلى صوت حركة مريحة دون أي دحرجة.
                    </div>
                </div>
            `,
            minimalPairs: [
                { l: 'rød', meanL_ar: 'أحمر', n: 'død', meanN_ar: 'ميت', contextL: 'Bilen er flot rød.', contextN: 'Blomsten er desværre død.' },
                { l: 'rejse', meanL_ar: 'يسافر / رحلة', n: 'pejse', meanN_ar: 'مدافئ', contextL: 'Jeg vil gerne rejse.', contextN: 'Ild i to pejse.' },
                { l: 'spiser', meanL_ar: 'يأكل (حاضر مع بلع الراء)', n: 'spise', meanN_ar: 'أن يأكل (مصدر)', contextL: 'Jeg spiser et æble.', contextN: 'Jeg vil gerne spise.' },
                { l: 'lærer', meanL_ar: 'معلم / يتعلم', n: 'lære', meanN_ar: 'أن يتعلم', contextL: 'Min lærer er flink.', contextN: 'Jeg vil lære dansk.' },
                { l: 'mor', meanL_ar: 'أم (الراء تبتلع)', n: 'mod', meanN_ar: 'شجاعة (d ناعم)', contextL: 'Min mor bor her.', contextN: 'Han har stort mod.' },
                { l: 'ret', meanL_ar: 'صحيح / وجبة', n: 'let', meanN_ar: 'سهل / خفيف', contextL: 'Det har du helt ret i.', contextN: 'Opgaven er meget let.' }
            ],
            speechExercises: [
                {
                    text: 'Min lærer hedder Peter.',
                    targetWords: ['lærer', 'Peter'],
                    hintDa: 'Slug r-lyden i "lærer" og "Peter" – ingen rulle-r!',
                    hintAr: 'ابلع الراء في lærer و Peter دون دحرجة باللسان!'
                },
                {
                    text: 'Bussen rejser klokken otte.',
                    targetWords: ['rejser'],
                    hintDa: 'Rejser har kragelyd i starten og en blød vokal i slutningen.',
                    hintAr: 'تبدأ rejser بصوت الغراب في الحلق وتنتهي بحركة مفتوحة.'
                },
                {
                    text: 'Min mor spiser røde æbler.',
                    targetWords: ['mor', 'spiser', 'røde'],
                    hintDa: 'Læg mærke til forskellen på r i "røde" (hals) og "mor" (vokal)!',
                    hintAr: 'لاحظ الفرق بين r الحلقية في røde، والراء المبتلعة في mor!'
                },
                {
                    text: 'Det er et rigtig godt spørgsmål.',
                    targetWords: ['rigtig'],
                    hintDa: 'Rigtig starter dybt bagerst i halsen.',
                    hintAr: 'كلمة rigtig تبدأ من قاع الحلق كصوت الغراب.'
                }
            ]
        },
        {
            id: 'stoettevokal',
            titleDa: '4. Konsonantklynger (Smæk døren i)',
            titleAr: '٤. تتابع السواكن (اقفل الباب بحزم)',
            badge: 'Fokus 4',
            descDa: 'På arabisk må ord sjældent have to konsonanter i træk i starten og aldrig tre til sidst. Derfor kommer arabisktalende tit til at hænge en lille støttevokal på: "skole" bliver til "es-kole", og "koldt" bliver til "kold-te". Træn at smække døren i og lukke munden brat uden den ekstra lyd!',
            descAr: 'في قواعد اللغة العربية "لا يلتقي ساكنان" ولا تبدأ كلمة بساكن؛ لذلك يميل الناطقون بالعربية تلقائياً إلى إضافة همزة وصل أو كسرة: skole تصبح es-kole، و koldt تصبح kold-te، و tekst تصبح tek-set. في الدنماركية يجب أن تتعلم "إغلاق الباب بحزم" وحبس الصوت فوراً دون فتح فمك بحركة إضافية!',
            heroTitleAr: 'الصوت الصعب رقم ٤: احذر من إضافة كسرة أو همزة وصل مساعدة!',
            heroSubAr: 'اقفل الباب بحزم: قل koldt بضربة واحدة حازمة، ولا تقل kold-te أو es-kole!',
            subControls: {
                labelAr: 'المقارنة المباشرة:',
                options: [
                    { id: 'start_klynge', label: 'السواكن في بداية الكلمة (skole, sprog)', sub: 'انزلاق الأفعى sssss', activeClass: 'active-target' },
                    { id: 'slut_klynge', label: 'السواكن في نهاية الكلمة (koldt, tekst)', sub: 'اقفل الباب واحبس النفس', activeClass: 'active-target' }
                ]
            },
            diagCard1: (tgt) => {
                const isStart = tgt === 'start_klynge';
                return {
                    title: isStart ? 'بداية الكلمة: انزلق بصوت السين مباشرة دون همزة (es)' : 'نهاية الكلمة: اقفل فمك كالباب ولا تفتحه ثانية',
                    tag: isStart ? 'انزلاق الأفعى 🐍' : 'قفل الباب 🚪',
                    tagStyle: isStart ? 'background:rgba(56,189,248,0.2); color:#7dd3fc;' : 'background:rgba(234,179,8,0.2); color:#fde047;',
                    svg: `
                        <svg viewBox="0 0 240 160" width="100%" height="160">
                            ${isStart ? `
                                <!-- Snake hiss ssss into k -->
                                <path d="M 30 80 Q 60 60 90 80 T 150 80 L 190 80" fill="none" stroke="#38bdf8" stroke-width="4"/>
                                <text x="30" y="50" fill="#fde047" font-size="14" font-weight="bold">sssss... kole</text>
                                <text x="30" y="125" fill="#f87171" font-size="11">❌ ممنوع: es-kole</text>
                            ` : `
                                <!-- Door slamming shut -->
                                <rect x="80" y="40" width="80" height="90" rx="4" fill="none" stroke="#ef4444" stroke-width="3"/>
                                <line x1="80" y1="40" x2="160" y2="130" stroke="#ef4444" stroke-width="3"/>
                                <text x="50" y="25" fill="#86efac" font-size="12" font-weight="bold">koldt! (حبس النفس فوراً)</text>
                                <text x="50" y="150" fill="#f87171" font-size="11">❌ ممنوع: kold-te</text>
                            `}
                        </svg>
                    `,
                    notes: isStart ? 
                        '<strong>بداية الكلمة (skole, sprog):</strong> ابدأ بصفير السين المستمر مثل الأفعى (sssss) ثم انزلق مباشرة إلى الحرف التالي دون إضافة أي همزة أو كسرة في البداية.' : 
                        '<strong>نهاية الكلمة (koldt, tekst):</strong> عندما يلفظ لسانك حرف t، جمد فمك واحبس النفس لثانية كاملة. لا تسمح بخروج أي حركة صوتية بعده!'
                };
            },
            diagCard2: (tgt) => {
                return {
                    title: 'لماذا يحدث هذا الخطأ للناطقين بالعربية؟',
                    tag: 'السبب اللغوي 💡',
                    tagStyle: 'background:rgba(96,165,250,0.2); color:#93c5fd;',
                    svg: `
                        <svg viewBox="0 0 240 160" width="100%" height="160">
                            <!-- Visual comparison box -->
                            <rect x="20" y="30" width="95" height="100" rx="10" fill="#1e293b" stroke="#f87171" stroke-width="2"/>
                            <text x="30" y="55" fill="#fca5a5" font-size="11" font-weight="bold">العربية</text>
                            <text x="30" y="80" fill="#ffffff" font-size="11">لا يلتقي ساكنان</text>
                            <text x="30" y="105" fill="#94a3b8" font-size="10">يضاف كسر تلقائياً</text>

                            <rect x="125" y="30" width="95" height="100" rx="10" fill="#1e293b" stroke="#4ade80" stroke-width="2"/>
                            <text x="135" y="55" fill="#86efac" font-size="11" font-weight="bold">الدنماركية</text>
                            <text x="135" y="80" fill="#ffffff" font-size="11">3 سواكن متتالية!</text>
                            <text x="135" y="105" fill="#86efac" font-size="10">قفل فوري حازم</text>
                        </svg>
                    `,
                    notes: 'في العربية، الأذن والدماغ مبرمجان على كسر الساكن لتسهيل النطق. في الدنماركية، الكلمات تنتهي وتغلق بقوة مثل قفل الباب، وهذا ما يعطي اللغة إيقاعها المميز.'
                };
            },
            pinchCardHtml: `
                <div style="display:flex; align-items:center; gap:0.6rem; font-size:0.78rem; font-weight:900; color:#fde68a; text-transform:uppercase; margin-bottom:0.4rem;">
                    <span>🚪</span> <span>تمرين قفل الباب بحزم (Smæk døren)</span>
                </div>
                <div style="font-size:1.1rem; font-weight:900; color:#ffffff; margin-bottom:0.35rem;">
                    كيف تتدرب على قفل الكلمة دون همسة إضافية؟
                </div>
                <div style="font-size:0.88rem; color:#e2e8f0; line-height:1.55;" dir="rtl">
                    انطق كلمة <strong>koldt</strong>، وبمجرد أن يلمس لسانك مخرج حرف T، اعقد شفتيك واحبس نفسك ولا تفتح فمك لمدة ثانية كاملة!<br>
                    إذا سمعت صوتاً خفيفاً يشبه "إيه" أو "تيه"، فهذا يعني أنك فتحت فمك قبل الأوان. كرر التمرين حتى تقفل الكلمة بصرامة وبحزم.
                </div>
            `,
            bilingualGuideHtml: `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.65rem;">
                    <strong style="color:#fde68a; font-size:0.95rem;">💡 دليل المعلم والتدريب النطقي (Guide):</strong>
                    <span style="font-size:0.75rem; color:#94a3b8;">Dansk & Arabisk</span>
                </div>
                <div style="font-size:0.88rem; color:#cbd5e1; line-height:1.55;">
                    <strong>Dansk:</strong> Dansk tillader komplekse konsonantklynger i både anlyd (sp-, sk-, st-) og udlyd (-ldt, -kst). Arabisk fonotaks forbyder dette, hvilket skaber epentese (støttevokal: *kold-te*).<br>
                    <div style="margin-top:0.5rem;" dir="rtl">
                        <strong>العربية:</strong> التخلص من إضافة الهمزة والكسرة المساعدة يمنح كلامك بالدنماركية انسيابية واحترافية فورية تبهر المعلمين والمتحدثين الأصليين.
                    </div>
                </div>
            `,
            minimalPairs: [
                { l: 'koldt', meanL_ar: 'بارد للمحايد (smækkes i)', n: 'kold', meanN_ar: 'بارد للمفرد المشترك', contextL: 'Vandet er meget koldt.', contextN: 'En kold vinterdag.' },
                { l: 'skole', meanL_ar: 'مدرسة (uden es-)', n: 'kole', meanN_ar: 'يبرد', contextL: 'Børnene er i skole.', contextN: 'Suppen skal køle af.' },
                { l: 'tekst', meanL_ar: 'نص (uden -te)', n: 'tægt', meanN_ar: 'أخذ / ريع', contextL: 'Læs denne svære tekst.', contextN: 'En gammel lov.' },
                { l: 'først', meanL_ar: 'أولاً (uden -te)', n: 'før', meanN_ar: 'قبل', contextL: 'Kom først i mål.', contextN: 'Jeg så ham før.' },
                { l: 'sidst', meanL_ar: 'أخيراً (uden -te)', n: 'sidste', meanN_ar: 'الأخير (fuldt ord med e)', contextL: 'Hvem kom sidst?', contextN: 'Den sidste time.' },
                { l: 'frisk', meanL_ar: 'طازج (uden f-risk)', n: 'fisk', meanN_ar: 'سمك', contextL: 'Frisk mælk hver dag.', contextN: 'En levende fisk.' }
            ],
            speechExercises: [
                {
                    text: 'Vandet er meget koldt i dag.',
                    targetWords: ['koldt'],
                    hintDa: 'Luk munden brat på "koldt" – ingen lille ekstra "e"-lyd til sidst!',
                    hintAr: 'اقفل فمك بحزم عند نطق koldt دون أي حركة إضافية في النهاية!'
                },
                {
                    text: 'Børnene går i skole hver dag.',
                    targetWords: ['skole'],
                    hintDa: 'Start med sssss-kole, ALDRIG "es-kole"!',
                    hintAr: 'انزلق بصوت السين مباشرة في skole، وإياك أن تقول es-kole!'
                },
                {
                    text: 'Dansk er et spændende sprog.',
                    targetWords: ['sprog'],
                    hintDa: 'Sprog: glid direkte fra S til P uden en vokal i starten.',
                    hintAr: 'في كلمة sprog ابدأ بالسين مباشرة دون همزة وصل سابقة.'
                },
                {
                    text: 'Jeg læser en spændende tekst.',
                    targetWords: ['tekst'],
                    hintDa: 'Tekst slutter kontant på tre konsonanter uden støttevokal.',
                    hintAr: 'كلمة tekst تنتهي بالسواكن بحزم دون فتح الفم بكسرة زائدة.'
                }
            ]
        },
        {
            id: 'y_og_oe',
            titleDa: '5. Læberundede vokaler: Y & Ø (Kyssemunden)',
            titleAr: '٥. الحركات المدوّرة: Y و Ø (حركة التقبيل)',
            badge: 'Fokus 5',
            descDa: 'Arabisk har kun 3 vokalkvaliteter (a, i, u) og mangler fuldstændig forvokaler med spidsede læber som y og ø. Siger man "lys" med flade læber som et smil, bliver det til "lis". Siger man "høre" uden at spidse læberne, risikerer man at sige et helt andet ord ("hore"!).',
            descAr: 'في العربية توجد حركات أساسية (فتحة، كسرة، ضمة) ولا توجد حركات تجمع بين الكسرة في الحلق وضم الشفتين للأمام كأنك تقبّل مثل y و ø. إذا لم تضم شفتيك للأمام ستنطق lys (ضوء) كأنها Lis (اسم فتاة)، وستنطق høre (يسمع) كأنها كلمة غير لائقة تماماً (hore)!',
            heroTitleAr: 'الصوت الصعب رقم ٥: زم شفتيك وادفعهما للأمام كأنك تقبّل (Kyssemunden)!',
            heroSubAr: 'الفرق بين "الضوء" واسم فتاة، وبين "يسمع" وكلمة بذيئة، هو فقط شكل الشفتين!',
            subControls: {
                labelAr: 'المقارنة المباشرة:',
                options: [
                    { id: 'y_lyd', label: 'حرف Y (Lys, By, Syv)', sub: 'ضم الشفتين مع حركة i', activeClass: 'active-target' },
                    { id: 'oe_lyd', label: 'حرف Ø (Brød, Høre, Dør)', sub: 'ضم الشفتين مع حركة e', activeClass: 'active-target' }
                ]
            },
            diagCard1: (tgt) => {
                const isY = tgt === 'y_lyd';
                return {
                    title: isY ? 'حرف Y: الشفتان مدورتان للأمام كأنك تقبّل' : 'حرف Ø: فتحة مدورة للأمام',
                    tag: isY ? 'تدوير كامل (Y)' : 'تدوير متوسط (Ø)',
                    tagStyle: isY ? 'background:rgba(56,189,248,0.2); color:#7dd3fc;' : 'background:rgba(234,179,8,0.2); color:#fde047;',
                    svg: `
                        <svg viewBox="0 0 240 160" width="100%" height="160">
                            <!-- Round Lips Frontal View -->
                            <ellipse cx="120" cy="80" rx="35" ry="35" fill="none" stroke="#f87171" stroke-width="8"/>
                            <circle cx="120" cy="80" r="${isY ? '12' : '18'}" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
                            <!-- Kiss indication arrows -->
                            <path d="M 60 80 L 75 80 M 180 80 L 165 80" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
                            <text x="50" y="30" fill="#fde047" font-size="12" font-weight="bold">شفتان مضمومتان للأمام بقوة (Kyssemund)</text>
                        </svg>
                    `,
                    notes: isY ? 
                        '<strong>حرف Y (lys, by):</strong> اجعل لسانك في موضع الكسرة (i)، ثم ادفع شفتيك بقوة للأمام واجعلهما في شكل دائرة ضيقة جداً كأنك تقبّل طفلاً صغيراً!' : 
                        '<strong>حرف Ø (brød, høre):</strong> اجعل لسانك في موضع الفتحة الممالة (e)، ثم زم شفتيك للأمام في دائرة متوسطة.'
                };
            },
            diagCard2: (tgt) => {
                const isY = tgt === 'y_lyd';
                return {
                    title: isY ? 'مقارنة الشفتين: Y (مضمومة) مقابل I (مبسوطة)' : 'مقارنة الشفتين: Ø (مضمومة) مقابل E (مبسوطة)',
                    tag: 'السر في الشفاه 👄',
                    tagStyle: 'background:rgba(168,85,247,0.2); color:#c084fc;',
                    svg: `
                        <svg viewBox="0 0 240 160" width="100%" height="160">
                            <!-- Left: Flat Smiling Lips -->
                            <rect x="25" y="65" width="75" height="25" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
                            <text x="35" y="50" fill="#38bdf8" font-size="11" font-weight="bold">ابتسامة (I / E)</text>
                            <text x="35" y="115" fill="#94a3b8" font-size="10">Lis (فتاة) / bred</text>

                            <!-- Right: Rounded Pouting Lips -->
                            <circle cx="170" cy="78" r="22" fill="#1e293b" stroke="#f43f5e" stroke-width="3.5"/>
                            <circle cx="170" cy="78" r="9" fill="#0f172a"/>
                            <text x="140" y="50" fill="#f43f5e" font-size="11" font-weight="bold">تقبيل (Y / Ø)</text>
                            <text x="140" y="115" fill="#fde047" font-size="10">lys (ضوء) / brød</text>
                        </svg>
                    `,
                    notes: 'إذا كانت زوايا فمك مشدودة للجانبين كأنك تبتسم، فلن يخرج حرف Y أو Ø أبداً! يجب دفع الشفتين للأمام لتغيير الرنين الصوتي بالكامل.'
                };
            },
            pinchCardHtml: `
                <div style="display:flex; align-items:center; gap:0.6rem; font-size:0.78rem; font-weight:900; color:#fde047; text-transform:uppercase; margin-bottom:0.4rem;">
                    <span>☝️</span> <span>اختبار طرف الإصبع (Fingerspids-testen)</span>
                </div>
                <div style="font-size:1.1rem; font-weight:900; color:#ffffff; margin-bottom:0.35rem;">
                    خدعة طرف الإصبع لنطق Y و Ø باحتراف:
                </div>
                <div style="font-size:0.88rem; color:#e2e8f0; line-height:1.55;" dir="rtl">
                    ١) ضع طرف إصبعك برفق أمام شفتيك.<br>
                    ٢) انطق حرف "إي" (i) بابتسامة عريضة.<br>
                    ٣) والآن، ادفع شفتيك بقوة للأمام لتلمس إصبعك في شكل دائرة ضيقة، <strong>دون أن تحرك لسانك إطلاقاً</strong> — ستجد نفسك تنطق حرف **Y** الدنماركي النقي (*lys*, *by*)!<br>
                    ٤) كرر نفس الحركة انطلاقاً من "إيه" (e) وادفع شفتيك للأمام، لتحصل على حرف **Ø** الدنماركي (*brød*, *dør*).
                </div>
            `,
            bilingualGuideHtml: `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.65rem;">
                    <strong style="color:#fde68a; font-size:0.95rem;">💡 دليل المعلم والتدريب النطقي (Guide):</strong>
                    <span style="font-size:0.75rem; color:#94a3b8;">Dansk & Arabisk</span>
                </div>
                <div style="font-size:0.88rem; color:#cbd5e1; line-height:1.55;">
                    <strong>Dansk:</strong> Y og Ø er rundede fortungevokaler ([y] og [ø]). På arabisk findes kun urundede forvokaler (i, e) og rundede bagtungevokaler (u, o). Læberundingen er afgørende for at undgå pinlige misforståelser (*høre* vs. *hore*).<br>
                    <div style="margin-top:0.5rem;" dir="rtl">
                        <strong>العربية:</strong> الفرق بين الكلمتين يعتمد فقط على شكل الشفتين. احتفظ بلسانك في الأمام واستخدم شفتيك بجرأة!
                    </div>
                </div>
            `,
            minimalPairs: [
                { l: 'lys', meanL_ar: 'ضوء / شمعة', n: 'lis', meanN_ar: 'اسم فتاة (ليس)', contextL: 'Tænd et lys i mørket.', contextN: 'Lis er min kollega.' },
                { l: 'høre', meanL_ar: 'يسمع', n: 'here', meanN_ar: 'hære (جيوش)', contextL: 'Kan du høre mig?', contextN: 'Kongens store hære.' },
                { l: 'by', meanL_ar: 'مدينة', n: 'bi', meanN_ar: 'نحلة', contextL: 'Aarhus er en dejlig by.', contextN: 'En bi laver honning.' },
                { l: 'brød', meanL_ar: 'خبز', n: 'bred', meanN_ar: 'عريض / واسع', contextL: 'Friskbagt brød.', contextN: 'Gaden er meget bred.' },
                { l: 'syv', meanL_ar: 'سبعة (رقم 7)', n: 'siv', meanN_ar: 'قصب الماء', contextL: 'Klokken er syv.', contextN: 'Siv vokser ved søen.' },
                { l: 'dør', meanL_ar: 'باب', n: 'der', meanN_ar: 'هناك', contextL: 'Luk venligst døren.', contextN: 'Bogen ligger der.' }
            ],
            speechExercises: [
                {
                    text: 'Der er et smukt lys i stuen.',
                    targetWords: ['lys'],
                    hintDa: 'Spids læberne til "lys" som til et kys!',
                    hintAr: 'زم شفتيك للأمام في lys لتنطقها ضوءاً وليس اسم فتاة!'
                },
                {
                    text: 'København er en stor by.',
                    targetWords: ['by'],
                    hintDa: 'By udtales med spidsede læber, ikke som en bi!',
                    hintAr: 'في كلمة by الزم حركة التقبيل بالشفتين كي لا تصبح نحلة (bi)!'
                },
                {
                    text: 'Kan du høre hvad jeg siger?',
                    targetWords: ['høre'],
                    hintDa: 'Spids læberne godt i "høre" for at undgå pinlige ord!',
                    hintAr: 'شكل الشفتين للأمام في høre هو الفارق بين يسمع وكلمة غير لائقة!'
                },
                {
                    text: 'Jeg køber frisk brød hos bageren.',
                    targetWords: ['brød'],
                    hintDa: 'Brød: Spidsede læber på ø + blød ånde på d!',
                    hintAr: 'في كلمة brød اجمع بين حركة الشفتين للأمام والنَفَس الدافئ في d!'
                }
            ]
        }
    ];

    // Main view renderer
    function renderView() {
        viewContainer.innerHTML = '';

        const currentMod = SOUND_MODULES.find(m => m.id === activeModuleId) || SOUND_MODULES[0];

        // Top bar
        const topBar = document.createElement('div');
        topBar.className = 'vla-top-bar';
        topBar.innerHTML = `
            <div style="display:flex; align-items:center; gap:0.55rem; flex-wrap:wrap;">
                <button type="button" class="vla-back-btn" id="vla-top-back-main">
                    ← Tilbage til forsiden (العودة للرئيسية)
                </button>
                <button type="button" class="vla-back-btn" id="vla-top-back-mss">
                    ← Sammenligning (المقارنة)
                </button>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                <button type="button" class="vla-back-btn vla-back-btn-primary" id="vla-open-all-hw">
                    📚 Vis alle lektie-links (جميع روابط الواجبات)
                </button>
            </div>
        `;
        topBar.querySelector('#vla-top-back-main').onclick = handleBackToMain;
        topBar.querySelector('#vla-top-back-mss').onclick = handleBackToMSS;
        topBar.querySelector('#vla-open-all-hw').onclick = openHomeworkOverviewModal;
        viewContainer.appendChild(topBar);

        // Sound Modules Grid (Navigation)
        const navGrid = document.createElement('div');
        navGrid.className = 'vla-nav-grid';
        SOUND_MODULES.forEach(mod => {
            const card = document.createElement('div');
            card.className = `vla-mod-card ${mod.id === activeModuleId ? 'active' : ''}`;
            card.innerHTML = `
                <div class="vla-mod-badge">${mod.badge}</div>
                <div class="vla-mod-title-da">${mod.titleDa}</div>
                <div class="vla-mod-title-ar">${mod.titleAr}</div>
            `;
            card.onclick = () => {
                if (activeModuleId !== mod.id) {
                    activeModuleId = mod.id;
                    activeTab = 'principles';
                    pairQuizIdx = 0;
                    pairScore = 0;
                    speechExerciseIdx = 0;
                    if (mod.id === 'p_vs_b') activeTarget = 'p';
                    else if (mod.id === 'bloedt_d') activeTarget = 'bloedt_d';
                    else if (mod.id === 'dansk_r') activeTarget = 'hals_r';
                    else if (mod.id === 'stoettevokal') activeTarget = 'start_klynge';
                    else if (mod.id === 'y_og_oe') activeTarget = 'y_lyd';
                    syncUrl();
                    renderView();
                }
            };
            navGrid.appendChild(card);
        });
        viewContainer.appendChild(navGrid);

        // Hero Header
        const hero = document.createElement('div');
        hero.className = 'vla-hero';
        hero.innerHTML = `
            <div style="display:inline-flex; align-items:center; gap:0.4rem; font-size:0.75rem; font-weight:900; color:#38bdf8; text-transform:uppercase; margin-bottom:0.35rem; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:6px;">
                <span>🇸🇦</span> <span>${currentMod.badge} • تدريب عملي للناطقين بالعربية</span>
            </div>
            <div class="vla-hero-title">${currentMod.heroTitleAr}</div>
            <div class="vla-hero-desc" dir="rtl">${currentMod.descAr}</div>
            
            <div class="vla-action-row">
                <div style="font-size:0.84rem; color:#94a3b8;">
                    <strong>Fokus på dansk:</strong> ${currentMod.descDa}
                </div>
                <button type="button" class="vla-copy-btn" id="vla-copy-current-hw">
                    📋 Kopier lektie-link (نسخ رابط الواجب لهذه الصفحة)
                </button>
            </div>
        `;
        hero.querySelector('#vla-copy-current-hw').onclick = () => {
            const currentUrl = getFullHomeworkUrl(currentMod.id, activeTab);
            copyToClipboard(currentUrl, `${currentMod.titleDa} (${activeTab})`);
        };
        viewContainer.appendChild(hero);

        // 3 Sub-Tabs
        const tabBar = document.createElement('div');
        tabBar.className = 'vla-tab-bar';

        const tabs = [
            { id: 'principles', label: '1. Mundstilling & Princip (حركة الفم والخدعة)' },
            { id: 'pairs', label: '2. Minimale Par (اختبار الاستماع)' },
            { id: 'speech', label: '3. Mikrofontræning (تحدي النطق بالمايك)' }
        ];

        tabs.forEach(t => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `vla-tab-btn ${activeTab === t.id ? 'active' : ''}`;
            btn.innerHTML = t.label;
            btn.onclick = () => {
                activeTab = t.id;
                syncUrl();
                renderView();
            };
            tabBar.appendChild(btn);
        });
        viewContainer.appendChild(tabBar);

        // Tab Content Container
        const contentWrap = document.createElement('div');
        if (activeTab === 'principles') {
            renderPrinciplesTab(contentWrap, currentMod);
        } else if (activeTab === 'pairs') {
            renderPairsTab(contentWrap, currentMod);
        } else if (activeTab === 'speech') {
            renderSpeechTab(contentWrap, currentMod);
        }
        viewContainer.appendChild(contentWrap);

        // Bottom Bar
        const bottomBar = document.createElement('div');
        bottomBar.className = 'vla-bottom-bar';
        bottomBar.innerHTML = `
            <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
                <button type="button" class="vla-back-btn" id="vla-btm-back-main">
                    ← Tilbage til forsiden (العودة للرئيسية)
                </button>
                <button type="button" class="vla-back-btn" id="vla-btm-back-mss">
                    ← Sammenligning (المقارنة)
                </button>
            </div>
            <button type="button" class="vla-copy-btn" id="vla-btm-copy-hw">
                📋 Kopier lektie-link til denne opgave
            </button>
        `;
        bottomBar.querySelector('#vla-btm-back-main').onclick = handleBackToMain;
        bottomBar.querySelector('#vla-btm-back-mss').onclick = handleBackToMSS;
        bottomBar.querySelector('#vla-btm-copy-hw').onclick = () => {
            const currentUrl = getFullHomeworkUrl(currentMod.id, activeTab);
            copyToClipboard(currentUrl, `${currentMod.titleDa} (${activeTab})`);
        };
        viewContainer.appendChild(bottomBar);
    }

    // Render Tab 1: Principles
    function renderPrinciplesTab(wrap, modData) {
        // Sub-selector (Sound targets)
        const subRow = document.createElement('div');
        subRow.className = 'vla-sub-controls';
        subRow.innerHTML = `<span class="vla-sub-label">${modData.subControls.labelAr}</span>`;

        modData.subControls.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const isActive = activeTarget === opt.id;
            btn.className = `vla-sub-btn ${isActive ? opt.activeClass : ''}`;
            btn.innerHTML = `<span>${opt.label}</span> <span style="font-size:0.75rem; opacity:0.8;">(${opt.sub})</span>`;
            btn.onclick = () => {
                activeTarget = opt.id;
                renderView();
            };
            subRow.appendChild(btn);
        });
        wrap.appendChild(subRow);

        // Diagrams Grid
        const grid = document.createElement('div');
        grid.className = 'vla-diagram-grid';

        const c1 = modData.diagCard1(activeTarget);
        const card1 = document.createElement('div');
        card1.className = 'vla-diagram-card';
        card1.innerHTML = `
            <div class="vla-diagram-header">
                <div class="vla-diagram-title">${c1.title}</div>
                <div class="vla-diagram-tag" style="${c1.tagStyle}">${c1.tag}</div>
            </div>
            <div class="vla-svg-wrapper">${c1.svg}</div>
            <div class="vla-diagram-notes" dir="rtl">${c1.notes}</div>
        `;
        grid.appendChild(card1);

        const c2 = modData.diagCard2(activeTarget);
        const card2 = document.createElement('div');
        card2.className = 'vla-diagram-card';
        card2.innerHTML = `
            <div class="vla-diagram-header">
                <div class="vla-diagram-title">${c2.title}</div>
                <div class="vla-diagram-tag" style="${c2.tagStyle}">${c2.tag}</div>
            </div>
            <div class="vla-svg-wrapper">${c2.svg}</div>
            <div class="vla-diagram-notes" dir="rtl">${c2.notes}</div>
        `;
        grid.appendChild(card2);

        wrap.appendChild(grid);

        // Practical Self-Test Card
        const pinchCard = document.createElement('div');
        pinchCard.className = 'vla-pinch-card';
        pinchCard.innerHTML = modData.pinchCardHtml;
        wrap.appendChild(pinchCard);

        // Bilingual Guide
        const guideCard = document.createElement('div');
        guideCard.className = 'vla-bilingual-card';
        guideCard.innerHTML = modData.bilingualGuideHtml;
        wrap.appendChild(guideCard);
    }

    // Render Tab 2: Minimal Pairs Listening Quiz
    function renderPairsTab(wrap, modData) {
        const pairs = modData.minimalPairs;
        const currentPair = pairs[pairQuizIdx];

        // Randomize target sound: 'l' or 'n'
        if (typeof currentPair._targetSound === 'undefined') {
            currentPair._targetSound = Math.random() < 0.5 ? 'l' : 'n';
        }

        const quizCard = document.createElement('div');
        quizCard.className = 'vla-quiz-container';

        const targetWord = currentPair._targetSound === 'l' ? currentPair.l : currentPair.n;

        quizCard.innerHTML = `
            <div class="vla-quiz-progress">
                <span>المجموعة ${pairQuizIdx + 1} من ${pairs.length}</span>
                <span class="vla-quiz-score-pill">النتيجة: ${pairScore} / ${pairs.length}</span>
            </div>

            <div style="font-size:1.1rem; color:#cbd5e1; margin-bottom:0.25rem;" dir="rtl">
                اضغط على الزر للاستماع إلى النطق الدنماركي، ثم اختر الكلمة التي سمعتها:
            </div>

            <button type="button" class="vla-listen-btn-big" id="vla-play-target">
                <span>🔊</span>
                <span>استمع للنطق (Lyt)</span>
            </button>

            <div class="vla-quiz-options">
                <button type="button" class="vla-pair-choice-btn" id="choice-btn-l">
                    <div class="vla-pair-word" style="color:#38bdf8;">${currentPair.l}</div>
                    <div class="vla-pair-meaning">${currentPair.meanL_ar}</div>
                    <div style="font-size:0.75rem; color:#64748b; margin-top:0.35rem;">مثال: "${currentPair.contextL}"</div>
                </button>
                <button type="button" class="vla-pair-choice-btn" id="choice-btn-n">
                    <div class="vla-pair-word" style="color:#f472b6;">${currentPair.n}</div>
                    <div class="vla-pair-meaning">${currentPair.meanN_ar}</div>
                    <div style="font-size:0.75rem; color:#64748b; margin-top:0.35rem;">مثال: "${currentPair.contextN}"</div>
                </button>
            </div>

            <div class="vla-quiz-feedback" id="vla-quiz-fb"></div>

            <div style="display:flex; justify-content:space-between; margin-top:1.75rem; gap:0.5rem; flex-wrap:wrap;">
                <button type="button" class="vla-nav-step-btn" id="prev-pair" ${pairQuizIdx === 0 ? 'disabled' : ''}>
                    ← المجموعة السابقة
                </button>
                <button type="button" class="vla-nav-step-btn" id="next-pair">
                    ${pairQuizIdx === pairs.length - 1 ? 'إعادة من البداية ↺' : 'المجموعة التالية →'}
                </button>
            </div>
        `;

        // Audio listener
        quizCard.querySelector('#vla-play-target').onclick = () => {
            playAudio(targetWord, 0.8);
        };

        const fb = quizCard.querySelector('#vla-quiz-fb');
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
                fb.innerHTML = `🎉 <strong>إجابة صحيحة تماماً!</strong> الكلمة المنطوقة هي <em>"${targetWord}"</em>.`;
            } else {
                fb.style.display = 'block';
                fb.style.background = 'rgba(239,68,68,0.2)';
                fb.style.color = '#f87171';
                fb.style.border = '1px solid rgba(239,68,68,0.4)';
                fb.innerHTML = `❌ <strong>للأسف لم تكن دقيقة!</strong> الكلمة الصحيحة هي <em>"${targetWord}"</em>. استمع إليها ثانية ولاحظ الفرق!`;
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
        speechCard.className = 'vla-speech-card';

        // Words markup
        const promptHtml = ex.text.split(' ').map(w => {
            const clean = w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '');
            const isTarget = ex.targetWords.some(tw => tw.toLowerCase() === clean);
            if (isTarget) {
                return `<span style="color:#38bdf8; text-decoration:underline;">${w}</span>`;
            }
            return `<span>${w}</span>`;
        }).join(' ');

        speechCard.innerHTML = `
            <div class="vla-speech-meta-bar">
                <span>التمرين ${speechExerciseIdx + 1} من ${exercises.length}</span>
                <span style="font-weight:bold; font-size:0.78rem; color:#7dd3fc; background:rgba(56,189,248,0.2); padding:0.2rem 0.6rem; border-radius:9999px;">
                    تدريب النطق بالمايكروفون
                </span>
            </div>

            <div class="vla-speech-prompt">${promptHtml}</div>
            <div class="vla-speech-sub" dir="rtl">اقرأ الجملة بصوت عالٍ وواضح مع التركيز على الكلمات المميزة باللون الأزرق!</div>

            ${consecutiveSpeechStreak > 0 ? `
                <div style="display:inline-flex; align-items:center; gap:0.4rem; background:rgba(234,179,8,0.2); border:1px solid #fde047; color:#fde047; padding:0.35rem 0.85rem; border-radius:9999px; font-weight:800; font-size:0.86rem; margin-bottom:1rem;">
                    <span>🔥</span>
                    <span>نطق ممتاز لـ ${consecutiveSpeechStreak} جمل متتالية!</span>
                </div>
            ` : ''}

            <div class="vla-mic-row">
                <button type="button" class="vla-listen-model-btn" id="vla-speech-listen">
                    <span>🔊 استمع للنموذج الصوتي (Lyt)</span>
                </button>
                <button type="button" class="vla-mic-btn" id="vla-speech-mic" title="اضغط لبدء التسجيل الصوتي">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                </button>
            </div>

            <div class="vla-speech-status" id="vla-mic-status" dir="rtl">
                اضغط على المايكروفون الأحمر واقرأ الجملة بوضوح
            </div>

            <div class="vla-speech-feedback-box" id="vla-speech-fb"></div>

            <div style="background:rgba(30,41,59,0.7); border-radius:12px; padding:0.85rem 1rem; margin-top:1.2rem; font-size:0.86rem; color:#cbd5e1; text-align:left;">
                <strong style="color:#fde68a;">Instruktion:</strong> ${ex.hintDa}<br>
                <span style="font-size:0.82rem; color:#94a3b8; display:inline-block; margin-top:0.3rem;" dir="rtl">نصيحة النطق: ${ex.hintAr}</span>
            </div>

            <div style="display:flex; justify-content:space-between; margin-top:1.5rem; gap:0.5rem; flex-wrap:wrap;">
                <button type="button" class="vla-nav-step-btn" id="prev-speech" ${speechExerciseIdx === 0 ? 'disabled' : ''}>
                    ← الجملة السابقة
                </button>
                <button type="button" class="vla-nav-step-btn" id="next-speech">
                    ${speechExerciseIdx === exercises.length - 1 ? 'إعادة التدريب ↺' : 'الجملة التالية →'}
                </button>
            </div>
        `;

        // Listen model utterance
        speechCard.querySelector('#vla-speech-listen').onclick = () => {
            playAudio(ex.text, 0.85);
        };

        // Mic Speech Recognition setup
        const micBtn = speechCard.querySelector('#vla-speech-mic');
        const statusEl = speechCard.querySelector('#vla-mic-status');
        const fbEl = speechCard.querySelector('#vla-speech-fb');

        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRec) {
            statusEl.textContent = 'متصفحك لا يدعم التعرف الصوتي المباشر (يرجى استخدام Chrome أو Safari).';
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
                    statusEl.textContent = '🎙️ جاري الاستماع، تحدث الآن...';
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

                statusEl.textContent = `تم التعرف: قرأت "${transcript}"`;
                statusEl.style.color = '#93c5fd';

                // Check match of target words
                const cleanUserWords = transcript.toLowerCase().split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ''));
                const matchedTargets = ex.targetWords.filter(tw => cleanUserWords.includes(tw.toLowerCase()));
                const allTargetsHit = matchedTargets.length === ex.targetWords.length;

                fbEl.style.display = 'block';
                if (allTargetsHit) {
                    consecutiveSpeechStreak++;
                    fbEl.style.background = 'rgba(34,197,94,0.2)';
                    fbEl.style.color = '#4ade80';
                    fbEl.style.border = '1px solid rgba(34,197,94,0.4)';
                    fbEl.innerHTML = `🌟 <strong>نطق ممتاز ومطابق للأصل!</strong> تم التعرف على جميع الكلمات المستهدفة (${matchedTargets.join(', ')}) بوضوح تام!`;
                } else {
                    consecutiveSpeechStreak = 0;
                    fbEl.style.background = 'rgba(239,68,68,0.2)';
                    fbEl.style.color = '#f87171';
                    fbEl.style.border = '1px solid rgba(239,68,68,0.4)';
                    fbEl.innerHTML = `💡 <strong>محاولة جيدة!</strong> تأكد من ضبط مخارج الكلمات (${ex.targetWords.join(', ')}). استمع إلى النموذج ثانية وحاول مرة أخرى!`;
                }
            };

            recognition.onerror = (err) => {
                isSpeechRecording = false;
                micBtn.classList.remove('listening');
                statusEl.textContent = 'تعذر التقاط الصوت بوضوح، يرجى المحاولة مرة أخرى.';
                statusEl.style.color = '#f87171';
            };

            recognition.onend = () => {
                isSpeechRecording = false;
                micBtn.classList.remove('listening');
            };
        }

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
                consecutiveSpeechStreak = 0;
            }
            renderView();
        };

        wrap.appendChild(speechCard);
    }

    renderView();
    container.appendChild(viewContainer);
}
