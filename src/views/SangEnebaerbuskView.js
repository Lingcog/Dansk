import { getTranslation, getLang } from '../utils/i18n.js';

/**
 * SangEnebaerbuskView - Sange: "Så går vi rundt om en enebærbusk"
 * Didaktisk flade med moderne vrimlebillede + historisk tankebobbel,
 * Karaoke- og rytmetræning, lytteøvelse, ord-detektiv til moderne og historiske redskaber
 * ("rulle tøj", mangelbræt, vaskebræt, kulstrygejern), parringsøvelser og hyldest til husarbejdet.
 */
export function renderSangEnebaerbuskView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const lang = getLang();
    const isDa = lang === 'da';
    const isEn = lang === 'en';
    const t = (key, fallback) => getTranslation(key, fallback);

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sang-enebaerbusk-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${t('back', isEn ? 'Back to Stories' : 'Tilbage til Historier')}`;
    backBtn.onclick = () => navigateFn('historier_menu');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // TTS Audio Helper
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .sang-enebaerbusk-view,
        .sang-enebaerbusk-view * {
            box-sizing: border-box;
        }
        .sang-enebaerbusk-view {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.2rem 4rem;
            color: #f8fafc;
            font-family: inherit;
            overflow-x: hidden;
        }

        .hero-song-header {
            text-align: center;
            margin-bottom: 1.8rem;
        }
        .hero-song-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid rgba(245, 158, 11, 0.45);
            color: #fbbf24;
            padding: 0.35rem 0.9rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.8rem;
        }
        .hero-song-header h1 {
            font-size: 2.1rem;
            font-weight: 800;
            margin-bottom: 0.4rem;
            background: linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero-song-header p {
            color: #cbd5e1;
            font-size: 1.05rem;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.5;
        }

        /* Song Switcher Bar */
        .song-switcher-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 0.75rem 0 1.25rem;
            padding: 0.65rem;
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            align-items: center;
        }
        .song-switcher-label {
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            padding: 0 0.5rem;
        }
        .song-switch-pill {
            background: #1e293b;
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.55rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .song-switch-pill:hover {
            background: #334155;
            color: #ffffff;
        }
        .song-switch-pill.active {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #ffffff;
            border-color: #fbbf24;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
        }

        /* Tabs Navigation (Vertical Overview Table) */
        .song-tabs-nav {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            margin-bottom: 1.8rem;
            background: rgba(15, 23, 42, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 0.75rem;
        }
        .song-tab-btn {
            background: #1e293b;
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.75rem 1.15rem;
            border-radius: 11px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 0.65rem;
        }
        .song-tab-btn .mono-svg-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            color: currentColor;
            opacity: 0.9;
        }
        .song-tab-btn:hover {
            color: white;
            background: #334155;
            border-color: rgba(255, 255, 255, 0.2);
        }
        .song-tab-btn.active {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            border-color: #fbbf24;
            box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
        }

        .song-panel {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .song-panel.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* ----------------------------------------------------
           TAB 1: Vrimlebillede med Tankebobbel
           ---------------------------------------------------- */
        .vrimmel-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .vrimmel-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.8rem;
            margin-bottom: 0.9rem;
            padding: 0.6rem 0.8rem;
            background: #0f172a;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .vrimmel-filter-group {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .vrimmel-filter-btn {
            background: #1e293b;
            color: #94a3b8;
            border: 1px solid #475569;
            padding: 0.35rem 0.75rem;
            border-radius: 8px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .vrimmel-filter-btn:hover { color: white; border-color: #fbbf24; }
        .vrimmel-filter-btn.active {
            background: #f59e0b;
            color: #0f172a;
            border-color: #fbbf24;
        }

        .pure-toggle-btn {
            background: #334155;
            color: white;
            border: 1px solid #475569;
            padding: 0.45rem 0.9rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .pure-toggle-btn:hover { border-color: #fbbf24; }
        .pure-toggle-btn.active {
            background: #f59e0b;
            border-color: #fbbf24;
            color: #0f172a;
        }

        .vrimmel-stage {
            position: relative;
            width: 100%;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.5);
            line-height: 0;
            user-select: none;
        }
        .vrimmel-stage img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
        }

        /* Hotspots */
        .vrimmel-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 10;
        }
        .hotspot-nutid {
            background: rgba(245, 158, 11, 0.9);
            border: 2.5px solid #ffffff;
            color: #0f172a;
            box-shadow: 0 0 16px rgba(245, 158, 11, 0.7);
        }
        .hotspot-historisk {
            background: rgba(168, 85, 247, 0.9);
            border: 2.5px solid #ffffff;
            color: #ffffff;
            box-shadow: 0 0 16px rgba(168, 85, 247, 0.7);
        }
        .vrimmel-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.3);
        }
        .hotspot-nutid:hover { background: #fbbf24; box-shadow: 0 0 24px #fbbf24; }
        .hotspot-historisk:hover { background: #c084fc; box-shadow: 0 0 24px #c084fc; }
        .vrimmel-hotspot.active {
            transform: translate(-50%, -50%) scale(1.35);
            background: #ec4899 !important;
            color: white !important;
            border-color: #fdf2f8 !important;
            box-shadow: 0 0 26px #ec4899 !important;
        }
        .pure-mode .vrimmel-hotspot {
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Hotspot Detail Card */
        .hotspot-detail-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.4rem;
            margin-top: 1.2rem;
            border: 1.5px solid rgba(245, 158, 11, 0.4);
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 1.2rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
        .detail-info-left { flex: 1; min-width: 280px; }
        .detail-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.6rem; }
        .badge-pill {
            padding: 0.25rem 0.65rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }
        .badge-dag { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid #f59e0b; }
        .badge-historisk-tag { background: rgba(168, 85, 247, 0.25); color: #d8b4fe; border: 1px solid #a855f7; }
        .badge-verbum { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; }
        .badge-vaerdighed { background: rgba(34, 197, 94, 0.2); color: #86efac; border: 1px solid #22c55e; }

        .detail-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.3rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .detail-forms {
            color: #38bdf8;
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 0.6rem;
        }
        .detail-redskaber {
            color: #cbd5e1;
            font-size: 0.95rem;
            margin-bottom: 0.6rem;
        }
        .detail-redskaber strong { color: #4ade80; }
        .detail-saetning-box {
            background: rgba(30, 41, 59, 0.7);
            border-left: 3px solid #f59e0b;
            padding: 0.7rem 1rem;
            border-radius: 0 10px 10px 0;
            margin-bottom: 0.6rem;
            font-size: 1.05rem;
            color: #f1f5f9;
        }
        .detail-vaerdighed-note {
            color: #d8b4fe;
            font-size: 0.92rem;
            font-style: italic;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .detail-actions-right {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
        }

        .listen-btn {
            background: #f59e0b;
            color: #0f172a;
            border: none;
            padding: 0.75rem 1.3rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .listen-btn:hover {
            background: #fbbf24;
            transform: scale(1.04);
            box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4);
        }

        /* ----------------------------------------------------
           TAB 2: 🎶 Syng med & Rytme (Tekst & Trykfordeling)
           ---------------------------------------------------- */
        .song-lyrics-container {
            max-width: 900px;
            margin: 0 auto;
        }

        /* Musical Staff Banner */
        .music-staff-banner {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(15, 23, 42, 0.95));
            border: 2px solid rgba(245, 158, 11, 0.5);
            border-radius: 18px;
            padding: 1.4rem 1.8rem;
            margin-bottom: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.2rem;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
        }
        .msb-left {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .msb-icon {
            font-size: 2.5rem;
            background: rgba(245, 158, 11, 0.2);
            border: 1px solid rgba(245, 158, 11, 0.4);
            width: 58px;
            height: 58px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .msb-info {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }
        .msb-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #f8fafc;
        }
        .msb-sub {
            font-size: 0.9rem;
            color: #cbd5e1;
        }

        /* Rhythm & Stress Guide Banner */
        .rhythm-guide-banner {
            background: #0f172a;
            border: 1.5px solid rgba(245, 158, 11, 0.35);
            border-radius: 14px;
            padding: 1rem 1.4rem;
            margin-bottom: 1.6rem;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }
        .rgb-icon {
            font-size: 1.8rem;
            flex-shrink: 0;
            margin-top: 0.1rem;
        }
        .rgb-content {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        /* Chorus Card */
        .chorus-card {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(15, 23, 42, 0.95));
            border: 2px solid rgba(245, 158, 11, 0.5);
            border-radius: 18px;
            padding: 1.6rem;
            margin-bottom: 1.8rem;
            text-align: center;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .chorus-tag {
            background: #f59e0b;
            color: #0f172a;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            display: inline-block;
            margin-bottom: 0.8rem;
        }
        .chorus-text {
            font-size: 1.3rem;
            line-height: 1.9;
            font-weight: 600;
            color: #f8fafc;
            margin-bottom: 1rem;
        }

        /* Verses Grid */
        .verses-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 1.4rem;
            margin-bottom: 2.5rem;
        }
        .verse-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.25s ease;
        }
        .verse-card:hover {
            border-color: rgba(245, 158, 11, 0.5);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        .verse-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.8rem;
        }
        .verse-day-pill {
            font-size: 0.88rem;
            font-weight: 800;
            background: rgba(245, 158, 11, 0.2);
            color: #fbbf24;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            border: 1px solid rgba(245, 158, 11, 0.4);
        }
        .verse-lyrics {
            font-size: 1.08rem;
            line-height: 1.8;
            color: #f1f5f9;
            margin-bottom: 0.8rem;
        }
        .stress-syllable {
            color: #fbbf24;
            font-weight: 800;
            background: rgba(245, 158, 11, 0.15);
            padding: 0.1rem 0.3rem;
            border-radius: 4px;
            border-bottom: 2px solid #f59e0b;
            letter-spacing: 0.3px;
        }
        .verse-note {
            font-size: 0.85rem;
            color: #94a3b8;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            padding-top: 0.6rem;
            margin-bottom: 0.8rem;
        }
        .verse-note strong { color: #38bdf8; }

        /* Interactive Listening Quiz */
        .listening-quiz-card {
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(15, 23, 42, 0.95));
            border: 2px solid rgba(56, 189, 248, 0.45);
            border-radius: 20px;
            padding: 1.8rem;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .lq-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .lq-prompt {
            font-size: 1.2rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.8rem;
        }
        .lq-play-box {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .lq-play-btn {
            background: #0284c7;
            color: white;
            border: none;
            padding: 0.85rem 1.8rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            box-shadow: 0 4px 16px rgba(2, 132, 199, 0.4);
        }
        .lq-play-btn:hover { background: #0369a1; transform: scale(1.04); }
        .lq-options-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 1.2rem;
        }
        .lq-opt-btn {
            background: #0f172a;
            border: 2px solid #334155;
            color: white;
            padding: 1rem;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .lq-opt-btn:hover { border-color: #38bdf8; transform: translateY(-2px); }
        .lq-opt-btn.correct { background: rgba(34, 197, 94, 0.25) !important; border-color: #22c55e !important; color: #4ade80 !important; }
        .lq-opt-btn.wrong { background: rgba(239, 68, 68, 0.25) !important; border-color: #ef4444 !important; color: #f87171 !important; }

        /* ----------------------------------------------------
           TAB 3: 🕵️ Ord-detektiv (Billedjagt på vrimlebilledet & Gåder)
           ---------------------------------------------------- */
        .det-submode-nav {
            display: flex;
            justify-content: center;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin-bottom: 1.4rem;
        }
        .det-submode-btn {
            background: #1e293b;
            color: #94a3b8;
            border: 1.5px solid #475569;
            padding: 0.65rem 1.3rem;
            border-radius: 14px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .det-submode-btn:hover {
            border-color: #22c55e;
            color: white;
        }
        .det-submode-btn.active {
            background: linear-gradient(135deg, #16a34a, #15803d);
            color: white;
            border-color: #22c55e;
            box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
        }

        /* Visual Detektiv Billedjagt */
        .det-visual-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .det-top-bar {
            background: #0f172a;
            border: 1.5px solid #22c55e;
            border-radius: 16px;
            padding: 1.1rem 1.4rem;
            margin-bottom: 0.9rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            box-shadow: 0 4px 14px rgba(34, 197, 94, 0.15);
        }
        .det-clue-title {
            font-size: 1.15rem;
            font-weight: 700;
            color: #ffffff;
            flex: 1;
            min-width: 250px;
            line-height: 1.5;
        }
        .det-status-pill {
            background: rgba(34, 197, 94, 0.18);
            color: #4ade80;
            border: 1px solid #22c55e;
            padding: 0.45rem 1.1rem;
            border-radius: 20px;
            font-weight: 800;
            white-space: nowrap;
            font-size: 0.95rem;
        }
        .det-feedback-bar {
            min-height: 38px;
            margin-bottom: 0.8rem;
            font-weight: 800;
            text-align: center;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .det-stage-viewport {
            width: 100%;
            border-radius: 16px;
            border: 2px solid rgba(255, 255, 255, 0.14);
            background: #090d16;
            overflow: auto;
            position: relative;
            max-height: 72vh;
        }
        .det-stage {
            position: relative;
            width: 100%;
            line-height: 0;
            user-select: none;
        }
        .det-stage img {
            width: 100%;
            display: block;
            border-radius: 14px;
        }
        .det-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 26px;
            height: 26px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            color: #ffffff;
            font-weight: 800;
            font-size: 0.78rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.65);
            transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.2s;
            z-index: 5;
            padding: 0;
            line-height: 1;
        }
        .det-hotspot.hs-substantiv { background: rgba(22, 163, 74, 0.92); }
        .det-hotspot.hs-verbum { background: rgba(220, 38, 38, 0.92); }
        .det-hotspot.hs-adjektiv { background: rgba(234, 88, 12, 0.92); }
        .det-hotspot.hs-adverbium { background: rgba(2, 132, 199, 0.92); }
        .det-hotspot:hover, .det-hotspot.active {
            transform: translate(-50%, -50%) scale(1.4);
            z-index: 20;
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.4), 0 6px 14px rgba(0, 0, 0, 0.8);
        }
        .det-hotspot.correct-hit {
            background: #22c55e !important;
            transform: translate(-50%, -50%) scale(1.6) !important;
            box-shadow: 0 0 0 5px rgba(74, 222, 128, 0.6), 0 0 24px #22c55e !important;
            z-index: 30 !important;
        }
        .det-hotspot.wrong-hit {
            background: #ef4444 !important;
            animation: shakeDet 0.4s ease;
        }
        @keyframes shakeDet {
            0%, 100% { transform: translate(-50%, -50%); }
            25% { transform: translate(-58%, -50%); }
            75% { transform: translate(-42%, -50%); }
        }
        @media (max-width: 680px) {
            .det-hotspot {
                width: 20px;
                height: 20px;
                font-size: 0.62rem;
                border-width: 1.5px;
            }
        }

        .detective-card {
            max-width: 860px;
            margin: 0 auto;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .det-category-nav {
            display: flex;
            gap: 0.6rem;
            margin-bottom: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        .det-cat-btn {
            background: #0f172a;
            border: 1px solid #475569;
            color: #cbd5e1;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .det-cat-btn:hover { border-color: #fbbf24; color: white; }
        .det-cat-btn.active {
            background: #f59e0b;
            color: #0f172a;
            border-color: #fbbf24;
        }
        .detective-score-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #0f172a;
            padding: 0.8rem 1.4rem;
            border-radius: 14px;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .detective-clue-box {
            background: #0f172a;
            border: 1.5px solid rgba(56, 189, 248, 0.4);
            border-radius: 16px;
            padding: 1.6rem;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .detective-clue-title {
            font-size: 0.85rem;
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 0.6px;
            color: #38bdf8;
            margin-bottom: 0.6rem;
        }
        .detective-clue-text {
            font-size: 1.25rem;
            line-height: 1.6;
            color: #f8fafc;
            font-weight: 600;
            margin-bottom: 0.8rem;
        }
        .detective-options-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .detective-opt-btn {
            background: #0f172a;
            border: 2px solid #334155;
            color: white;
            padding: 1.1rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .detective-opt-btn:hover { border-color: #f59e0b; transform: translateY(-2px); }
        .detective-opt-btn.correct { background: rgba(34, 197, 94, 0.25) !important; border-color: #22c55e !important; color: #4ade80 !important; }
        .detective-opt-btn.wrong { background: rgba(239, 68, 68, 0.25) !important; border-color: #ef4444 !important; color: #f87171 !important; }
        .detective-feedback-box {
            background: #0f172a;
            border-radius: 14px;
            padding: 1.2rem;
            margin-bottom: 1.2rem;
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .detective-next-btn {
            background: #f59e0b;
            color: #0f172a;
            border: none;
            padding: 0.85rem 1.8rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: block;
            margin: 0 auto;
        }
        .detective-next-btn:hover { background: #fbbf24; transform: scale(1.03); }

        /* ----------------------------------------------------
           TAB 4: 🧱 Sætningsbygger & Pusleopgave (Ugens gøremål)
           ---------------------------------------------------- */
        .builder-card {
            max-width: 920px;
            margin: 0 auto;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .saetning-intro-banner {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .saetning-intro-badge {
            background: rgba(245, 158, 11, 0.15);
            color: #fbbf24;
            border: 1px solid rgba(245, 158, 11, 0.4);
            padding: 0.35rem 0.9rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
            margin-bottom: 0.6rem;
        }
        .saetning-intro-title {
            font-size: 1.5rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.4rem;
        }
        .saetning-intro-desc {
            color: #cbd5e1;
            font-size: 0.98rem;
            max-width: 760px;
            margin: 0 auto;
            line-height: 1.5;
        }

        /* Sub tabs */
        .saetning-sub-tabs {
            display: flex;
            gap: 0.6rem;
            margin-bottom: 1.8rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        .saetning-sub-tab-btn {
            background: #0f172a;
            border: 1.5px solid #475569;
            color: #cbd5e1;
            padding: 0.7rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .saetning-sub-tab-btn:hover { border-color: #fbbf24; color: white; }
        .saetning-sub-tab-btn.active {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            border-color: #fbbf24;
            box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
        }

        .saetning-sub-panel {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .saetning-sub-panel.active {
            display: block;
        }

        /* Pusleopgave styles */
        .puzzle-wrapper {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.6rem;
        }
        .puzzle-header { text-align: center; margin-bottom: 1.5rem; }
        .puzzle-pills-row { display: flex; gap: 0.45rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.2rem; }
        .puzzle-pill {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.08);
            color: #cbd5e1;
            font-size: 0.95rem;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        .puzzle-pill:hover { background: rgba(255, 255, 255, 0.2); transform: scale(1.08); }
        .puzzle-pill.active {
            border-color: #f59e0b;
            background: #f59e0b;
            color: #0f172a;
            transform: scale(1.12);
            box-shadow: 0 2px 10px rgba(245, 158, 11, 0.4);
        }
        .puzzle-pill.completed { border-color: #22c55e; background: #15803d; color: #fff; }
        .puzzle-pill.completed.active { border-color: #4ade80; background: #22c55e; box-shadow: 0 2px 10px rgba(34, 197, 94, 0.4); }

        .puzzle-counter { font-size: 0.88rem; color: #fbbf24; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem; }
        .puzzle-question-card {
            background: rgba(245, 158, 11, 0.12);
            border: 1.5px solid rgba(245, 158, 11, 0.35);
            border-radius: 14px;
            padding: 1rem 1.4rem;
            margin-bottom: 1.2rem;
            display: inline-block;
        }
        .puzzle-question-title {
            font-size: 1.35rem;
            font-weight: 800;
            color: #f8fafc;
            margin: 0;
        }
        .puzzle-guide-hint { color: #94a3b8; font-size: 0.92rem; }

        .puzzle-slots {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.85rem;
            margin: 1.5rem 0;
        }
        @media (max-width: 820px) {
            .puzzle-slots { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
            .puzzle-slots { grid-template-columns: 1fr; }
        }

        .puzzle-slot {
            background: rgba(0, 0, 0, 0.35);
            border: 2px dashed rgba(255, 255, 255, 0.25);
            border-radius: 14px;
            min-height: 90px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 0.8rem 0.6rem;
            text-align: center;
            transition: all 0.25s ease;
            position: relative;
        }
        .puzzle-slot.filled {
            border-style: solid;
            cursor: pointer;
        }
        .puzzle-slot.slot-tid { border-color: rgba(168, 85, 247, 0.5); }
        .puzzle-slot.slot-tid.filled { border-color: #a855f7; background: rgba(168, 85, 247, 0.2); }
        .puzzle-slot.slot-verbum { border-color: rgba(239, 68, 68, 0.5); }
        .puzzle-slot.slot-verbum.filled { border-color: #ef4444; background: rgba(239, 68, 68, 0.2); }
        .puzzle-slot.slot-subjekt { border-color: rgba(34, 197, 94, 0.5); }
        .puzzle-slot.slot-subjekt.filled { border-color: #22c55e; background: rgba(34, 197, 94, 0.2); }
        .puzzle-slot.slot-objekt { border-color: rgba(56, 189, 248, 0.5); }
        .puzzle-slot.slot-objekt.filled { border-color: #0284c7; background: rgba(56, 189, 248, 0.2); }

        .slot-hint-text {
            font-size: 0.82rem;
            color: #cbd5e1;
            font-weight: 700;
            line-height: 1.3;
        }
        .slot-grammar-tag {
            font-size: 0.72rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.15rem 0.45rem;
            border-radius: 6px;
            margin-top: 0.25rem;
            display: inline-block;
        }
        .tag-tid { background: rgba(168, 85, 247, 0.3); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.4); }
        .tag-verbum { background: rgba(239, 68, 68, 0.3); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.4); }
        .tag-subjekt { background: rgba(34, 197, 94, 0.3); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.4); }
        .tag-objekt { background: rgba(56, 189, 248, 0.3); color: #7dd3fc; border: 1px solid rgba(56, 189, 248, 0.4); }

        .slot-badge-num {
            position: absolute;
            top: 6px;
            left: 8px;
            font-size: 0.75rem;
            font-weight: 800;
            opacity: 0.8;
            color: #94a3b8;
        }
        .slot-word-content {
            font-size: 1.12rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0.4rem 0;
            line-height: 1.3;
        }
        .slot-remove-btn {
            position: absolute;
            top: 6px;
            right: 8px;
            font-size: 0.75rem;
            color: #ef4444;
            font-weight: 800;
        }

        .puzzle-word-bank {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            justify-content: center;
            margin-bottom: 1.6rem;
        }
        .puzzle-chip-btn {
            background: #1e293b;
            border: 2px solid #475569;
            color: #f8fafc;
            padding: 0.75rem 1.3rem;
            border-radius: 20px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .puzzle-chip-btn:hover:not(:disabled) {
            background: #334155;
            border-color: #fbbf24;
            transform: translateY(-2px);
        }
        .puzzle-chip-btn:disabled {
            opacity: 0.28;
            cursor: not-allowed;
            border-style: dashed;
        }

        .puzzle-feedback-area {
            text-align: center;
            min-height: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.8rem;
        }
        .puzzle-msg {
            font-size: 1.15rem;
            padding: 0.9rem 1.4rem;
            border-radius: 12px;
            line-height: 1.5;
            max-width: 650px;
        }
        .puzzle-msg.success {
            background: rgba(34, 197, 94, 0.2);
            border: 1.5px solid #22c55e;
            color: #86efac;
        }
        .puzzle-msg.error {
            background: rgba(239, 68, 68, 0.2);
            border: 1.5px solid #ef4444;
            color: #fca5a5;
        }
        .puzzle-action-row {
            display: flex;
            gap: 0.8rem;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
        }
        .next-task-btn, .retry-task-btn {
            padding: 0.7rem 1.4rem;
            border-radius: 20px;
            font-size: 1rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .next-task-btn { background: #22c55e; color: white; }
        .next-task-btn:hover { background: #16a34a; transform: scale(1.04); }
        .retry-task-btn { background: #f59e0b; color: #0f172a; }
        .retry-task-btn:hover { background: #fbbf24; transform: scale(1.04); }

        /* Sætningsbygger Trin-for-trin styles */
        .step-builder-wrapper {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.6rem;
            display: flex;
            flex-direction: column;
            gap: 1.4rem;
        }
        .builder-guided-row {
            background: rgba(255, 255, 255, 0.03);
            border-radius: 14px;
            padding: 1.1rem;
            border-left: 4px solid #fff;
        }
        .builder-guided-row.row-tid { border-left-color: #a855f7; }
        .builder-guided-row.row-verbum { border-left-color: #ef4444; }
        .builder-guided-row.row-subjekt { border-left-color: #22c55e; }
        .builder-guided-row.row-objekt { border-left-color: #0284c7; }

        .builder-guided-title {
            font-size: 1.05rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 0.4rem;
        }
        .builder-options-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
        }
        .builder-choice-chip {
            background: rgba(255, 255, 255, 0.08);
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            color: #e2e8f0;
            padding: 0.55rem 1rem;
            border-radius: 18px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .builder-choice-chip:hover {
            background: rgba(255, 255, 255, 0.16);
            border-color: #94a3b8;
        }
        .builder-choice-chip.selected {
            font-weight: 800;
            transform: scale(1.04);
            color: white;
        }
        .builder-choice-chip.selected.sel-tid { background: #581c87; border-color: #c084fc; box-shadow: 0 0 10px rgba(168, 85, 247, 0.4); }
        .builder-choice-chip.selected.sel-verbum { background: #7f1d1d; border-color: #f87171; box-shadow: 0 0 10px rgba(239, 68, 68, 0.4); }
        .builder-choice-chip.selected.sel-subjekt { background: #14532d; border-color: #4ade80; box-shadow: 0 0 10px rgba(34, 197, 94, 0.4); }
        .builder-choice-chip.selected.sel-objekt { background: #0c4a6e; border-color: #38bdf8; box-shadow: 0 0 10px rgba(56, 189, 248, 0.4); }

        .live-sentence-display {
            background: #111e15;
            border: 2px solid #22c55e;
            border-radius: 16px;
            padding: 1.4rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.6rem;
        }
        .live-badge-label {
            font-size: 0.82rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #86efac;
            font-weight: 800;
        }
        .live-sentence-text {
            font-size: 1.55rem;
            font-weight: 800;
            line-height: 1.4;
            color: #ffffff;
        }
        .live-rule-hint {
            font-size: 0.92rem;
            color: #cbd5e1;
            line-height: 1.5;
        }
        .word-color-tid { color: #d8b4fe; }
        .word-color-verbum { color: #f87171; }
        .word-color-subjekt { color: #4ade80; }
        .word-color-objekt { color: #38bdf8; }

        /* ----------------------------------------------------
           TAB 5: ⏳ Dengang og nu (Værdighed & Parringsøvelser)
           ---------------------------------------------------- */
        .history-card {
            max-width: 900px;
            margin: 0 auto;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        /* Parringsøvelse Section */
        .matching-game-section {
            background: #0f172a;
            border: 2px solid rgba(245, 158, 11, 0.45);
            border-radius: 18px;
            padding: 1.6rem;
            margin-bottom: 2rem;
        }
        .mgs-header {
            text-align: center;
            margin-bottom: 1.4rem;
        }
        .mgs-title {
            font-size: 1.3rem;
            font-weight: 800;
            color: #fbbf24;
            margin-bottom: 0.4rem;
        }
        .mgs-sub { font-size: 0.92rem; color: #cbd5e1; }
        .matching-columns-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 1.2rem;
        }
        .mgs-col-title {
            font-size: 0.95rem;
            font-weight: 800;
            text-transform: uppercase;
            color: #38bdf8;
            margin-bottom: 0.8rem;
            text-align: center;
        }
        .mgs-cards-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .match-card-btn {
            background: #1e293b;
            border: 2px solid #334155;
            color: #f8fafc;
            padding: 0.9rem 1.1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .match-card-btn:hover { border-color: #f59e0b; transform: translateX(3px); }
        .match-card-btn.selected {
            background: rgba(245, 158, 11, 0.2);
            border-color: #f59e0b;
            color: #fbbf24;
            box-shadow: 0 0 12px rgba(245, 158, 11, 0.35);
        }
        .match-card-btn.matched {
            background: rgba(34, 197, 94, 0.2) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
            cursor: default;
        }

        .tribute-box {
            background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(15, 23, 42, 0.9));
            border: 1.5px solid rgba(236, 72, 153, 0.4);
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            text-align: center;
        }
        .tribute-badge {
            background: #ec4899;
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
            margin-bottom: 0.6rem;
        }
        .tribute-text {
            font-size: 1.15rem;
            line-height: 1.6;
            color: #fdf2f8;
            font-weight: 500;
        }
        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.2rem;
            margin-bottom: 2.5rem;
        }
        .comparison-item {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1.4rem;
        }
        .comp-header {
            font-size: 1.1rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .comp-era { margin-bottom: 0.8rem; font-size: 0.92rem; line-height: 1.5; }
        .comp-era.then { color: #cbd5e1; padding-left: 0.6rem; border-left: 2px solid #ef4444; }
        .comp-era.now { color: #4ade80; padding-left: 0.6rem; border-left: 2px solid #22c55e; }

        .discussion-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.2rem;
        }
        .discussion-card {
            background: #0f172a;
            border: 1px solid rgba(168, 85, 247, 0.3);
            border-radius: 16px;
            padding: 1.4rem;
            transition: all 0.25s ease;
        }
        .discussion-card:hover { border-color: #a855f7; transform: translateY(-2px); }
        .disc-icon { font-size: 1.6rem; margin-bottom: 0.5rem; }
        .disc-question {
            font-size: 1.05rem;
            font-weight: 700;
            color: #f8fafc;
            margin-bottom: 0.8rem;
            line-height: 1.4;
        }
        .disc-helpers {
            font-size: 0.85rem;
            color: #c084fc;
            background: rgba(168, 85, 247, 0.1);
            padding: 0.5rem 0.8rem;
            border-radius: 10px;
        }

        /* ----------------------------------------------------
           Melodi- og lydafspiller (Nederst på fladen)
           ---------------------------------------------------- */
        .song-audio-footer-card {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(15, 23, 42, 0.96));
            border: 2px solid rgba(245, 158, 11, 0.45);
            border-radius: 20px;
            padding: 1.5rem 1.8rem;
            margin-top: 2.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        }
        .saf-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.2rem;
        }
        .saf-left { display: flex; align-items: center; gap: 1rem; }
        .saf-icon {
            font-size: 2.2rem;
            background: rgba(245, 158, 11, 0.2);
            border: 1px solid rgba(245, 158, 11, 0.4);
            width: 54px;
            height: 54px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .saf-text { display: flex; flex-direction: column; gap: 0.25rem; }
        .saf-title { font-size: 1.25rem; font-weight: 800; color: #f8fafc; }
        .saf-sub { font-size: 0.92rem; color: #cbd5e1; }
        .saf-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; align-items: center; }
        .saf-youtube-btn {
            background: #ef4444;
            color: white;
            text-decoration: none;
            padding: 0.75rem 1.4rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s ease;
            box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
        }
        .saf-youtube-btn:hover {
            background: #dc2626;
            transform: scale(1.04);
            box-shadow: 0 6px 18px rgba(239, 68, 68, 0.5);
        }
        .saf-embed-toggle-btn {
            background: #334155;
            color: #f8fafc;
            border: 1px solid #64748b;
            padding: 0.75rem 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.92rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s ease;
        }
        .saf-embed-toggle-btn:hover { background: #475569; border-color: #fbbf24; }
        .saf-embed-toggle-btn.active {
            background: #f59e0b;
            color: #0f172a;
            border-color: #fbbf24;
        }
        .saf-embed-container {
            margin-top: 1.4rem;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: #000;
            max-width: 680px;
            margin-left: auto;
            margin-right: auto;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
        }
        .saf-embed-container iframe { display: block; border: none; }

        /* ----------------------------------------------------
           Tab 2: Sekventielt sang-flow & klikbart verbum-udsnit
           ---------------------------------------------------- */
        .song-sequence-flow {
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
            max-width: 780px;
            margin: 0 auto 2.5rem;
        }
        .song-sequence-flow .chorus-card {
            margin-bottom: 0;
            padding: 1.25rem 1.5rem;
        }
        .song-sequence-flow .verse-card {
            width: 100%;
        }
        .clickable-song-verb {
            display: inline-flex;
            align-items: center;
            gap: 0.28rem;
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(217, 119, 6, 0.22));
            border: 2px solid #fbbf24;
            color: #fef08a;
            padding: 0.1rem 0.5rem;
            border-radius: 9px;
            cursor: pointer;
            font-weight: 800;
            font-family: inherit;
            font-size: inherit;
            transition: all 0.2s ease;
            box-shadow: 0 3px 10px rgba(245, 158, 11, 0.25);
        }
        .clickable-song-verb:hover {
            background: rgba(245, 158, 11, 0.42);
            transform: translateY(-1px) scale(1.03);
            box-shadow: 0 5px 14px rgba(245, 158, 11, 0.4);
        }
        .clickable-song-verb .verb-zoom-icon {
            font-size: 0.85em;
        }
        .verse-crop-drawer {
            display: none;
            margin-top: 1rem;
            background: rgba(15, 23, 42, 0.95);
            border: 2px solid rgba(251, 191, 36, 0.55);
            border-radius: 16px;
            padding: 1rem;
            animation: fadeIn 0.25s ease;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
        }
        .verse-crop-drawer.open {
            display: flex;
            gap: 1.1rem;
            align-items: center;
            flex-wrap: wrap;
        }
        .verse-crop-thumb {
            width: 210px;
            height: 155px;
            border-radius: 12px;
            border: 2px solid #fbbf24;
            background-image: url('assets/sang_enebaerbusk_vrimmel.jpg');
            background-repeat: no-repeat;
            flex-shrink: 0;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
        }
        .verse-crop-info {
            flex: 1;
            min-width: 200px;
        }
        .verse-crop-badge {
            display: inline-block;
            background: rgba(245, 158, 11, 0.2);
            color: #fbbf24;
            font-size: 0.78rem;
            font-weight: 800;
            padding: 0.2rem 0.65rem;
            border-radius: 999px;
            margin-bottom: 0.4rem;
            text-transform: uppercase;
        }
        .verse-crop-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.3rem;
        }
        .verse-crop-desc {
            font-size: 0.95rem;
            color: #cbd5e1;
            line-height: 1.45;
            margin-bottom: 0.6rem;
        }
        .verse-crop-close {
            background: #334155;
            color: #e2e8f0;
            border: 1px solid #475569;
            padding: 0.35rem 0.8rem;
            border-radius: 8px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
        }
        .verse-crop-close:hover {
            background: #475569;
        }

        /* ----------------------------------------------------
           Tab 6: Andet husarbejde (20 aktiviteter)
           ---------------------------------------------------- */
        .ah-sub-nav {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            margin-bottom: 1.4rem;
            background: rgba(15, 23, 42, 0.55);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 0.65rem;
        }
        .ah-sub-nav .det-submode-btn {
            width: 100%;
            text-align: left;
            justify-content: flex-start;
            display: flex;
            align-items: center;
            gap: 0.65rem;
            padding: 0.7rem 1.1rem;
        }
        .ah-sub-nav .mono-svg-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            flex-shrink: 0;
            color: currentColor;
            opacity: 0.9;
        }
        .ah-step-nav-btns {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .ah-step-btn {
            background: #334155;
            color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.65rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ah-step-btn:hover {
            background: #475569;
            border-color: #fbbf24;
        }
        .vrimmel-hotspot.ah-number-spot {
            font-size: 0.82rem;
            font-weight: 900;
            color: #0f172a;
            background: #fbbf24;
            border: 2.5px solid #ffffff;
            width: 32px;
            height: 32px;
        }
        .vrimmel-hotspot.ah-number-spot.active {
            background: #22c55e;
            color: #ffffff;
            transform: translate(-50%, -50%) scale(1.28);
            z-index: 30;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
            .sang-enebaerbusk-view {
                padding: 0.5rem 0.65rem 3rem;
            }
            .hero-song-header {
                margin-bottom: 1.2rem;
            }
            .hero-song-header h1 {
                font-size: 1.45rem;
                line-height: 1.25;
                word-break: break-word;
            }
            .hero-song-header p {
                font-size: 0.88rem;
                line-height: 1.45;
            }
            .hero-song-badge {
                font-size: 0.75rem;
                padding: 0.25rem 0.7rem;
            }

            /* Tabs */
            .song-tabs-nav {
                gap: 0.35rem;
                margin-bottom: 1.2rem;
                padding-bottom: 0.4rem;
                -webkit-overflow-scrolling: touch;
            }
            .song-tab-btn {
                padding: 0.48rem 0.8rem;
                font-size: 0.82rem;
                border-radius: 10px;
                flex-shrink: 0;
            }

            /* Cards General */
            .vrimmel-card, .detective-card, .builder-card, .history-card, 
            .listening-quiz-card, .music-staff-banner, .chorus-card, 
            .song-audio-footer-card, .tribute-box {
                padding: 0.9rem 0.7rem;
                border-radius: 14px;
            }

            /* Tab 1: Vrimmel */
            .vrimmel-control-bar {
                flex-direction: column;
                align-items: stretch;
                gap: 0.6rem;
                padding: 0.5rem;
            }
            .vrimmel-filter-group {
                justify-content: center;
                gap: 0.35rem;
            }
            .vrimmel-filter-btn {
                padding: 0.3rem 0.6rem;
                font-size: 0.78rem;
            }
            .pure-toggle-btn {
                padding: 0.35rem 0.7rem;
                font-size: 0.8rem;
                justify-content: center;
            }
            .vrimmel-hotspot {
                width: 28px;
                height: 28px;
                font-size: 0.82rem;
                border-width: 2px;
            }
            .vrimmel-hotspot.active {
                transform: translate(-50%, -50%) scale(1.22);
            }
            .hotspot-detail-card {
                padding: 0.9rem 0.75rem;
                flex-direction: column;
                gap: 0.85rem;
            }
            .detail-info-left {
                min-width: 0;
                width: 100%;
            }
            .detail-title {
                font-size: 1.22rem;
                flex-wrap: wrap;
            }
            .detail-forms, .detail-redskaber, .detail-vaerdighed-note {
                font-size: 0.84rem;
            }
            .detail-saetning-box {
                font-size: 0.92rem;
                padding: 0.6rem 0.8rem;
            }
            .detail-actions-right {
                width: 100%;
            }
            .detail-actions-right .listen-btn {
                width: 100%;
                justify-content: center;
            }

            /* Tab 2: Sing Along */
            .music-staff-banner {
                flex-direction: column;
                align-items: stretch;
                text-align: center;
                gap: 0.8rem;
            }
            .msb-left {
                flex-direction: column;
                align-items: center;
                text-align: center;
                gap: 0.4rem;
            }
            .msb-icon {
                width: 46px;
                height: 46px;
                font-size: 1.8rem;
            }
            .msb-title {
                font-size: 1.1rem;
            }
            .msb-sub {
                font-size: 0.82rem;
            }
            #btn-open-youtube-modal {
                width: 100%;
                justify-content: center;
            }
            .rhythm-guide-banner {
                padding: 0.75rem 0.7rem;
                font-size: 0.84rem;
                gap: 0.6rem;
            }
            .chorus-card {
                padding: 1rem 0.75rem;
            }
            .chorus-text {
                font-size: 1.05rem;
                line-height: 1.6;
            }
            .verses-grid {
                grid-template-columns: 1fr;
                gap: 0.85rem;
            }
            .verse-card {
                padding: 1rem 0.75rem;
            }
            .verse-lyrics {
                font-size: 0.95rem;
                line-height: 1.5;
            }
            .stress-syllable {
                font-size: 0.92rem;
                padding: 0.05rem 0.25rem;
            }
            .verse-listen-btn {
                width: 100%;
                justify-content: center;
                padding: 0.6rem;
                font-size: 0.85rem;
            }
            .listening-quiz-card {
                padding: 1rem 0.75rem;
            }
            .lq-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }
            .lq-prompt {
                font-size: 1.05rem;
            }
            .lq-options-grid {
                grid-template-columns: 1fr;
                gap: 0.55rem;
            }
            .lq-opt-btn {
                padding: 0.75rem 0.7rem;
                font-size: 0.9rem;
            }

            /* Tab 3: Detective */
            .det-category-nav {
                gap: 0.35rem;
            }
            .det-cat-btn {
                padding: 0.4rem 0.65rem;
                font-size: 0.78rem;
            }
            .detective-score-bar {
                padding: 0.6rem 0.8rem;
                font-size: 0.84rem;
            }
            .detective-clue-box {
                padding: 1rem 0.75rem;
            }
            .detective-clue-text {
                font-size: 1.05rem;
                line-height: 1.45;
            }
            .detective-options-grid {
                grid-template-columns: 1fr;
                gap: 0.55rem;
            }
            .detective-opt-btn {
                padding: 0.8rem 0.7rem;
                font-size: 0.92rem;
            }

            /* Tab 4: Builder & Puzzle */
            .saetning-intro-title {
                font-size: 1.25rem;
            }
            .saetning-intro-desc {
                font-size: 0.86rem;
                line-height: 1.45;
            }
            .saetning-sub-tabs {
                gap: 0.35rem;
                margin-bottom: 1.2rem;
            }
            .saetning-sub-tab-btn {
                padding: 0.5rem 0.75rem;
                font-size: 0.82rem;
            }
            .puzzle-wrapper {
                padding: 0.85rem 0.6rem;
            }
            .puzzle-pills-row {
                gap: 0.3rem;
                margin-bottom: 0.85rem;
            }
            .puzzle-pill {
                width: 30px;
                height: 30px;
                font-size: 0.84rem;
            }
            .puzzle-question-card {
                padding: 0.75rem 0.85rem;
                margin-bottom: 0.8rem;
                width: 100%;
            }
            .puzzle-question-title {
                font-size: 1.08rem;
            }
            .puzzle-slots {
                grid-template-columns: 1fr;
                gap: 0.65rem;
                margin: 1.1rem 0;
            }
            .puzzle-slot {
                min-height: 68px;
                padding: 0.6rem 0.5rem;
            }
            .slot-hint-text {
                font-size: 0.8rem;
            }
            .slot-word-content {
                font-size: 1.05rem;
            }
            .puzzle-word-bank {
                gap: 0.45rem;
                margin-bottom: 1.2rem;
            }
            .puzzle-chip-btn {
                padding: 0.55rem 0.9rem;
                font-size: 0.88rem;
            }
            .puzzle-msg {
                font-size: 0.92rem;
                padding: 0.75rem 0.85rem;
            }
            .next-task-btn, .retry-task-btn {
                padding: 0.6rem 1.1rem;
                font-size: 0.88rem;
            }

            .step-builder-wrapper {
                padding: 0.85rem 0.6rem;
                gap: 0.9rem;
            }
            .builder-guided-row {
                padding: 0.75rem 0.65rem;
            }
            .builder-guided-title {
                font-size: 0.92rem;
                flex-direction: column;
                align-items: flex-start;
                gap: 0.25rem;
            }
            .builder-options-chips {
                gap: 0.4rem;
            }
            .builder-choice-chip {
                padding: 0.45rem 0.75rem;
                font-size: 0.84rem;
            }
            .live-sentence-display {
                padding: 1rem 0.75rem;
            }
            .live-sentence-text {
                font-size: 1.25rem;
            }
            .live-rule-hint {
                font-size: 0.82rem;
            }

            /* Tab 5: History & Matching */
            .matching-game-section {
                padding: 0.9rem 0.7rem;
            }
            .mgs-title {
                font-size: 1.1rem;
            }
            .matching-columns-container {
                grid-template-columns: 1fr;
                gap: 0.85rem;
            }
            .match-card-btn {
                padding: 0.7rem 0.8rem;
                font-size: 0.88rem;
            }
            .tribute-box {
                padding: 0.9rem 0.75rem;
            }
            .tribute-text {
                font-size: 0.92rem;
                line-height: 1.5;
            }
            .comparison-grid, .discussion-cards-grid {
                grid-template-columns: 1fr;
                gap: 0.85rem;
            }
            .comparison-item, .discussion-card {
                padding: 0.9rem 0.75rem;
            }
            .comp-header, .disc-question {
                font-size: 0.98rem;
            }

            /* Footer Audio */
            .song-audio-footer-card {
                padding: 1rem 0.75rem;
                margin-top: 1.8rem;
            }
            .saf-header {
                flex-direction: column;
                align-items: stretch;
                text-align: center;
                gap: 0.8rem;
            }
            .saf-left {
                flex-direction: column;
                align-items: center;
                text-align: center;
                gap: 0.4rem;
            }
            .saf-icon {
                width: 44px;
                height: 44px;
                font-size: 1.8rem;
            }
            .saf-title {
                font-size: 1.1rem;
            }
            .saf-sub {
                font-size: 0.82rem;
            }
            .saf-actions {
                flex-direction: column;
                width: 100%;
                gap: 0.5rem;
            }
            .saf-youtube-btn, .saf-embed-toggle-btn {
                width: 100%;
                justify-content: center;
                font-size: 0.88rem;
                padding: 0.65rem 1rem;
            }
            .saf-embed-container iframe {
                width: 100%;
                height: 220px;
            }
        }

        @media (max-width: 480px) {
            .sang-enebaerbusk-view {
                padding: 0.25rem 0.45rem 2.5rem;
            }
            .hero-song-header h1 {
                font-size: 1.25rem;
            }
            .hero-song-header p {
                font-size: 0.82rem;
            }
            .song-tab-btn {
                padding: 0.42rem 0.65rem;
                font-size: 0.78rem;
            }
            .vrimmel-hotspot {
                width: 24px;
                height: 24px;
                font-size: 0.72rem;
            }
            .puzzle-pill {
                width: 27px;
                height: 27px;
                font-size: 0.78rem;
            }
            .live-sentence-text {
                font-size: 1.15rem;
            }
            .chorus-text {
                font-size: 0.95rem;
            }
        }
    `;
    viewContainer.appendChild(style);

    // Song Switcher Bar
    const switcherBar = document.createElement('div');
    switcherBar.className = 'song-switcher-bar';
    switcherBar.innerHTML = `
        <span class="song-switcher-label">Vælg sang:</span>
        <button type="button" class="song-switch-pill active" id="btn-switch-enebaer">
            1. Så går vi rundt om en enebærbusk (Husarbejde)
        </button>
        <button type="button" class="song-switch-pill" id="btn-switch-godmorgen">
            2. Godmorgen, lille land (Danmarks geografi)
        </button>
    `;
    switcherBar.querySelector('#btn-switch-godmorgen').onclick = () => navigateFn('sang_godmorgen_lille_land');
    viewContainer.appendChild(switcherBar);

    // Hero Header
    const hero = document.createElement('div');
    hero.className = 'hero-song-header';
    hero.innerHTML = `
        <div class="hero-song-badge">${t('sange_hero_badge', 'Danske sange & Hverdagsliv (DU1, modul 4)').replace(/^🎵\s*/, '')}</div>
        <h1>${t('sange_hero_title', 'Så går vi rundt om en enebærbusk')}</h1>
        <p>${t('sange_hero_desc', 'Dansk sang om husarbejde på ugens dage.')}</p>
    `;
    viewContainer.appendChild(hero);

    // Tabs Menu (Monochrome SVG icons, stacked vertically)
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'song-tabs-nav';

    const monoSvgs = {
        image: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
        music: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
        search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        puzzle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
        home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
        chores: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2v6a2 2 0 0 0 2 2h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/><path d="M4 22h16a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"/></svg>`
    };

    const tabsData = [
        { id: 'tab_vrimmel', icon: monoSvgs.image, label: t('sange_tab_vrimmel', '1. Vrimlebillede') },
        { id: 'tab_sang', icon: monoSvgs.music, label: t('sange_tab_sang', '2. Syng med & Rytme') },
        { id: 'tab_detektiv', icon: monoSvgs.search, label: t('sange_tab_detektiv', isEn ? '3. Word Detective (Find Objects)' : '3. Ord-detektiv (Billedjagt)') },
        { id: 'tab_saetning', icon: monoSvgs.puzzle, label: t('sange_tab_saetning', '4. Sætningsbygger & Puslespil') },
        { id: 'tab_udvikling', icon: monoSvgs.home, label: t('sange_tab_udvikling', '5. Ugens husarbejde & Parring') },
        { id: 'tab_andet_husarbejde', icon: monoSvgs.chores, label: '6. Andet husarbejde' }
    ];

    let currentTab = extraData.activeTab || 'tab_vrimmel';

    tabsData.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `song-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.innerHTML = `<span class="mono-svg-icon">${t.icon}</span> <span>${t.label}</span>`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    panelsHolder.className = 'panels-holder';
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', `#/${lang}/sang_enebaerbusk/${tabId}`);
        tabsMenu.querySelectorAll('.song-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.song-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // =========================================================================
    // DATA DEFINITION: Hotspots (Korte DU1 modul 4 sætninger)
    // =========================================================================
    const husarbejdeItems = [
        // NUTIDIGE OPGAVER (DU1, modul 4 korte sætninger)
        {
            id: 'mandag',
            category: 'nutid',
            dag: 'Mandag',
            dagEn: 'Monday',
            icon: '🧺',
            handling: 'at vaske tøj',
            handlingEn: 'to wash clothes',
            nutid: 'vasker tøj',
            datid: 'vaskede tøj',
            foerdatid: 'har vasket tøj',
            redskaber: 'en vaskemaskine, sæbe, en kurv',
            redskaberEn: 'a washing machine, soap, a basket',
            saetning: 'Vi vasker tøj i maskinen.',
            saetningEn: 'We wash clothes in the machine.',
            vaerdighed: 'Rent tøj er godt for familien.',
            vaerdighedEn: 'Clean clothes are good for the family.',
            x: 14,
            y: 55
        },
        {
            id: 'tirsdag',
            category: 'nutid',
            dag: 'Tirsdag',
            dagEn: 'Tuesday',
            icon: '🧼',
            handling: 'at skylle tøj og tømme maskinen',
            handlingEn: 'to rinse clothes and empty the machine',
            nutid: 'skyller / tømmer',
            datid: 'skyllede / tømte',
            foerdatid: 'har skyllet / har tømt',
            redskaber: 'en vasketøjskurv, skyllemiddel',
            redskaberEn: 'a laundry basket, fabric softener',
            saetning: 'Drengen tømmer maskinen.',
            saetningEn: 'The boy empties the machine.',
            vaerdighed: 'Vi hjælper hinanden derhjemme.',
            vaerdighedEn: 'We help each other at home.',
            x: 24,
            y: 75
        },
        {
            id: 'onsdag',
            category: 'nutid',
            dag: 'Onsdag',
            dagEn: 'Wednesday',
            icon: '💨',
            handling: 'at hænge tøj op',
            handlingEn: 'to hang clothes up',
            nutid: 'tørrer tøj / hænger op',
            datid: 'tørrede tøj / hængte op',
            foerdatid: 'har tørret tøj / har hængt op',
            redskaber: 'et tørrestativ, klemmer',
            redskaberEn: 'a drying rack, clothespins',
            saetning: 'Vi hænger tøj op.',
            saetningEn: 'We hang clothes up.',
            vaerdighed: 'Tøjet tørrer i frisk luft.',
            vaerdighedEn: 'The clothes dry in fresh air.',
            x: 32,
            y: 45
        },
        {
            id: 'torsdag',
            category: 'nutid',
            dag: 'Torsdag',
            dagEn: 'Thursday',
            icon: '📦',
            handling: 'at lægge tøj sammen',
            handlingEn: 'to fold clothes',
            nutid: 'folder / lægger sammen',
            datid: 'foldede / lagde sammen',
            foerdatid: 'har foldet / har lagt sammen',
            redskaber: 'et bord, et skab',
            redskaberEn: 'a table, a closet',
            saetning: 'Vi lægger tøj sammen.',
            saetningEn: 'We fold the clothes.',
            vaerdighed: 'Der er orden i skabet.',
            vaerdighedEn: 'The closet is tidy.',
            x: 42,
            y: 42
        },
        {
            id: 'fredag',
            category: 'nutid',
            dag: 'Fredag',
            dagEn: 'Friday',
            icon: '👔',
            handling: 'at stryge tøj',
            handlingEn: 'to iron clothes',
            nutid: 'stryger tøj',
            datid: 'strøg tøj',
            foerdatid: 'har strøget tøj',
            redskaber: 'et strygejern, et strygebræt',
            redskaberEn: 'an iron, an ironing board',
            saetning: 'Vi stryger skjorter.',
            saetningEn: 'We iron shirts.',
            vaerdighed: 'Tøjet bliver glat og pænt.',
            vaerdighedEn: 'The clothes become smooth and neat.',
            x: 55,
            y: 56
        },
        {
            id: 'loerdag',
            category: 'nutid',
            dag: 'Lørdag',
            dagEn: 'Saturday',
            icon: '✨',
            handling: 'at vaske gulv',
            handlingEn: 'to wash the floor',
            nutid: 'vasker gulv',
            datid: 'vaskede gulv',
            foerdatid: 'har vasket gulv',
            redskaber: 'en moppe, en spand med vand',
            redskaberEn: 'a mop, a bucket of water',
            saetning: 'Vi vasker gulv.',
            saetningEn: 'We wash the floor.',
            vaerdighed: 'Hjemmet bliver rent og pænt.',
            vaerdighedEn: 'The home becomes clean and nice.',
            x: 74,
            y: 62
        },
        {
            id: 'soendag',
            category: 'nutid',
            dag: 'Søndag',
            dagEn: 'Sunday',
            icon: '☕',
            handling: 'at holde fri',
            handlingEn: 'to take the day off',
            nutid: 'holder fri',
            datid: 'holdt fri',
            foerdatid: 'har holdt fri',
            redskaber: 'en kop kaffe, en sofa',
            redskaberEn: 'a cup of coffee, a sofa',
            saetning: 'Om søndagen holder vi fri.',
            saetningEn: 'On Sunday we take the day off.',
            vaerdighed: 'Vi slapper af med familien.',
            vaerdighedEn: 'We relax with the family.',
            x: 65,
            y: 45
        },
        {
            id: 'enebaerbusk',
            category: 'nutid',
            dag: 'Haven',
            dagEn: 'The Garden',
            icon: '🌲',
            handling: 'enebærbusken i haven',
            handlingEn: 'the juniper bush in the garden',
            nutid: 'står i haven',
            datid: 'stod i haven',
            foerdatid: 'har stået i haven',
            redskaber: 'en grøn busk, en have',
            redskaberEn: 'a green bush, a garden',
            saetning: 'Busken står i haven.',
            saetningEn: 'The bush stands in the garden.',
            vaerdighed: 'Busken er grøn hele året.',
            vaerdighedEn: 'The bush is green all year.',
            x: 24,
            y: 35
        },

        // HISTORISK TANKEBOBBEL (Korte sætninger)
        {
            id: 'hist_vaske',
            category: 'historisk',
            dag: 'Gamle dage (Mandag)',
            dagEn: 'Old days (Monday)',
            icon: '🪵',
            handling: 'at vaske tøj i hånden',
            handlingEn: 'to wash clothes by hand',
            nutid: 'vasker i hånden',
            datid: 'vaskede i hånden',
            foerdatid: 'har vasket i hånden',
            redskaber: 'et vaskebræt, en balje, sæbe',
            redskaberEn: 'a washboard, a tub, soap',
            saetning: 'De vaskede tøj i hånden.',
            saetningEn: 'They washed clothes by hand.',
            vaerdighed: 'Det var hårdt arbejde.',
            vaerdighedEn: 'It was hard work.',
            x: 64,
            y: 16
        },
        {
            id: 'hist_gruekedel',
            category: 'historisk',
            dag: 'Gamle dage (Kogevask)',
            dagEn: 'Old days (Boiling water)',
            icon: '🔥',
            handling: 'at koge vand og tøj',
            handlingEn: 'to boil water and clothes',
            nutid: 'koger vand',
            datid: 'kogte vand',
            foerdatid: 'har kogt vand',
            redskaber: 'en stor gryde, ild, vand',
            redskaberEn: 'a big pot, fire, water',
            saetning: 'De kogte vand over ild.',
            saetningEn: 'They boiled water over fire.',
            vaerdighed: 'Vandet var meget varmt.',
            vaerdighedEn: 'The water was very hot.',
            x: 76,
            y: 18
        },
        {
            id: 'hist_rulle',
            category: 'historisk',
            dag: 'Gamle dage (Torsdag)',
            dagEn: 'Old days (Thursday)',
            icon: '🪓',
            handling: 'at rulle tøj',
            handlingEn: 'to roll clothes',
            nutid: 'ruller tøj',
            datid: 'rullede tøj',
            foerdatid: 'har rullet tøj',
            redskaber: 'et bræt af træ, et bord',
            redskaberEn: 'a wooden board, a table',
            saetning: 'De rullede tøjet glat.',
            saetningEn: 'They rolled the clothes smooth.',
            vaerdighed: 'Tøjet blev glat uden strøm.',
            vaerdighedEn: 'The clothes became smooth without electricity.',
            x: 93,
            y: 24
        },
        {
            id: 'hist_toerre',
            category: 'historisk',
            dag: 'Gamle dage (Onsdag)',
            dagEn: 'Old days (Wednesday)',
            icon: '🌳',
            handling: 'at tørre tøj ude',
            handlingEn: 'to dry clothes outside',
            nutid: 'tørrer tøj ude',
            datid: 'tørrede tøj ude',
            foerdatid: 'har tørret tøj ude',
            redskaber: 'en tørresnor, klemmer',
            redskaberEn: 'a clothesline, pegs',
            saetning: 'Tøjet hang på en snor.',
            saetningEn: 'The clothes hung on a line.',
            vaerdighed: 'Sol og vind tørrede tøjet.',
            vaerdighedEn: 'Sun and wind dried the clothes.',
            x: 91,
            y: 11
        },
        {
            id: 'hist_stryge',
            category: 'historisk',
            dag: 'Gamle dage (Fredag)',
            dagEn: 'Old days (Friday)',
            icon: '🪨',
            handling: 'at stryge med varmt jern',
            handlingEn: 'to iron with a hot iron',
            nutid: 'stryger tøj',
            datid: 'strøg tøj',
            foerdatid: 'har strøget tøj',
            redskaber: 'et tungt strygejern',
            redskaberEn: 'a heavy iron',
            saetning: 'Strygejernet var meget tungt.',
            saetningEn: 'The iron was very heavy.',
            vaerdighed: 'Man skulle passe på varmen.',
            vaerdighedEn: 'One had to be careful with the heat.',
            x: 84,
            y: 34
        },
        {
            id: 'hist_skure',
            category: 'historisk',
            dag: 'Gamle dage (Lørdag)',
            dagEn: 'Old days (Saturday)',
            icon: '🧽',
            handling: 'at skure gulv',
            handlingEn: 'to scrub the floor',
            nutid: 'skurer gulv',
            datid: 'skurede gulv',
            foerdatid: 'har skuret gulv',
            redskaber: 'en børste, en spand',
            redskaberEn: 'a brush, a bucket',
            saetning: 'De vaskede gulv med en børste.',
            saetningEn: 'They washed the floor with a brush.',
            x: 92,
            y: 48,
            vaerdighed: 'Gulvet blev rent og pænt.',
            vaerdighedEn: 'The floor became clean and nice.'
        }
    ];

    // =========================================================================
    // TAB 1: 🖼️ VRIMLEBILLEDE & TANKEBOBBEL
    // =========================================================================
    const panelVrimmel = document.createElement('div');
    panelVrimmel.className = `song-panel ${currentTab === 'tab_vrimmel' ? 'active' : ''}`;
    panelVrimmel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'vrimmel-card';

    // Control bar with category filter
    const controlBar = document.createElement('div');
    controlBar.className = 'vrimmel-control-bar';

    const filterGroup = document.createElement('div');
    filterGroup.className = 'vrimmel-filter-group';
    filterGroup.innerHTML = `
        <button class="vrimmel-filter-btn active" data-filter="all">${t('sange_filter_all', isEn ? '🌟 All (14)' : '🌟 Alle (14 hotspots)')}</button>
        <button class="vrimmel-filter-btn" data-filter="nutid">${t('sange_filter_nutid', isEn ? '✨ Present (Modern home)' : '🏠 Nutidens hjem (8)')}</button>
        <button class="vrimmel-filter-btn" data-filter="historisk">${t('sange_filter_historisk', isEn ? '⏳ Historical (Thought bubble)' : '💭 Tankebobbel (6)')}</button>
    `;
    controlBar.appendChild(filterGroup);

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-toggle-btn';
    let pureModeActive = false;
    pureBtn.innerHTML = `<span>🖼️</span> ${t('sange_pure_show', isEn ? 'Pure illustration' : 'Vis kun billedet:')} <strong id="pure-status">${isEn ? 'OFF' : 'FRA'}</strong>`;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-status').textContent = pureModeActive ? (isEn ? 'ON' : 'TIL') : (isEn ? 'OFF' : 'FRA');
    };
    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/sang_enebaerbusk_vrimmel.jpg';
    img.alt = 'Så går vi rundt om en enebærbusk - Vrimlebillede';
    stage.appendChild(img);

    // Detail card container
    const detailCard = document.createElement('div');
    detailCard.className = 'hotspot-detail-card';

    function showItemDetail(item) {
        const dagTrans = t(`sange_item_${item.id}_dag`, isEn ? item.dagEn : item.dag);
        const handlingTrans = t(`sange_item_${item.id}_handling`, isEn ? item.handlingEn : item.handling);
        const redskaberTrans = t(`sange_item_${item.id}_redskaber`, isEn ? item.redskaberEn : item.redskaber);
        const saetningTrans = t(`sange_item_${item.id}_saetning`, isEn ? item.saetningEn : item.saetning);
        const vaerdighedTrans = t(`sange_item_${item.id}_vaerdighed`, isEn ? item.vaerdighedEn : item.vaerdighed);

        detailCard.innerHTML = `
            <div class="detail-info-left">
                <div class="detail-badges">
                    <span class="badge-pill badge-dag">${item.category === 'historisk' ? '💭' : '🗓️'} ${item.dag} ${!isDa && dagTrans !== item.dag ? `(${dagTrans})` : ''}</span>
                </div>
                <div class="detail-title">
                    <span>${item.icon}</span> ${item.handling}
                    ${!isDa && handlingTrans !== item.handling ? `<div style="font-size: 0.95rem; font-weight: 500; color: #94a3b8; margin-top: 0.15rem;">${handlingTrans}</div>` : ''}
                </div>
                <div class="detail-forms">
                    ${item.nutid} · ${item.datid} · ${item.foerdatid}
                </div>
                <div class="detail-redskaber">
                    <strong>${t('sange_tools_label', isEn ? 'Tools:' : 'Redskaber:')}</strong> ${item.redskaber}
                    ${!isDa && redskaberTrans !== item.redskaber ? `<div style="font-size: 0.88rem; color: #94a3b8; margin-top: 0.2rem;">${redskaberTrans}</div>` : ''}
                </div>
                <div class="detail-saetning-box">
                    "${item.saetning}"
                    ${!isDa && saetningTrans !== item.saetning ? `<div style="font-size: 0.88rem; color: #cbd5e1; margin-top: 0.35rem; font-style: italic;">${saetningTrans}</div>` : ''}
                </div>
                <div class="detail-vaerdighed-note">
                    <span>${item.category === 'historisk' ? '📜' : '💜'}</span> ${vaerdighedTrans}
                </div>
            </div>
            <div class="detail-actions-right">
                <button class="listen-btn" id="btn-listen-hotspot">
                    <span>🔊</span> ${t('sange_listen_sentence', isEn ? 'Listen to sentence' : 'Lyt til sætning')}
                </button>
            </div>
        `;
        detailCard.querySelector('#btn-listen-hotspot').onclick = () => {
            speakDanish(item.saetning);
        };
    }

    // Default select Mandag
    showItemDetail(husarbejdeItems[0]);

    // Create hotspots
    const hotspotElements = [];
    husarbejdeItems.forEach((item, index) => {
        const dot = document.createElement('div');
        dot.className = `vrimmel-hotspot ${item.category === 'historisk' ? 'hotspot-historisk' : 'hotspot-nutid'} ${index === 0 ? 'active' : ''}`;
        dot.style.left = `${item.x}%`;
        dot.style.top = `${item.y}%`;
        dot.textContent = item.icon;
        dot.title = `${item.dag}: ${item.handling}`;
        dot.dataset.category = item.category;

        dot.onclick = () => {
            stage.querySelectorAll('.vrimmel-hotspot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            showItemDetail(item);
            speakDanish(item.handling);
        };
        stage.appendChild(dot);
        hotspotElements.push(dot);
    });

    // Filter handling
    filterGroup.querySelectorAll('.vrimmel-filter-btn').forEach(btn => {
        btn.onclick = () => {
            filterGroup.querySelectorAll('.vrimmel-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.filter;

            hotspotElements.forEach(dot => {
                if (cat === 'all') {
                    dot.style.display = 'flex';
                } else if (dot.dataset.category === cat) {
                    dot.style.display = 'flex';
                } else {
                    dot.style.display = 'none';
                }
            });
        };
    });

    vrimmelCard.appendChild(stage);
    vrimmelCard.appendChild(detailCard);
    panelVrimmel.appendChild(vrimmelCard);
    panelsHolder.appendChild(panelVrimmel);

    // =========================================================================
    // TAB 2: 🎶 SYNG MED & RYTME (Omkvæd mellem versene & klikbare verber)
    // =========================================================================
    const panelSang = document.createElement('div');
    panelSang.className = `song-panel ${currentTab === 'tab_sang' ? 'active' : ''}`;
    panelSang.dataset.panel = 'tab_sang';

    const lyricsContainer = document.createElement('div');
    lyricsContainer.className = 'song-lyrics-container';

    // Rhythm & Stress Guide Banner
    const rhythmBar = document.createElement('div');
    rhythmBar.className = 'rhythm-guide-banner';
    rhythmBar.innerHTML = `
        <div class="rgb-icon">🥁</div>
        <div class="rgb-content">
            <strong style="color: #fbbf24; font-size: 1.05rem;">
                ${t('sange_rhythm_title', isEn ? 'Sentence Rhythm & Word Stress' : 'Dansk rytme og trykfordeling')}
            </strong>
            <p style="color: #cbd5e1; font-size: 0.95rem; margin: 0.25rem 0 0; line-height: 1.4;">
                De fremhævede stavelser viser trykket i sangen. <strong>💡 Tip:</strong> Klik på det første aktivitets-verbum i hvert vers (f.eks. <span class="clickable-song-verb" style="pointer-events:none; padding: 0.05rem 0.35rem; font-size: 0.85rem;">VÁS-ker 🔍</span>) for at se udsnit af vrimlebilledet!
            </p>
        </div>
    `;
    lyricsContainer.appendChild(rhythmBar);

    function createChorusElement(stepNum, totalSteps) {
        const cCard = document.createElement('div');
        cCard.className = 'chorus-card';
        cCard.innerHTML = `
            <span class="chorus-tag">🌿 ${t('sange_chorus_tag', isEn ? 'Chorus' : 'Omkvæd')} (${stepNum}/${totalSteps})</span>
            <div class="chorus-text">
                Så <span class="stress-syllable">GÅR</span> vi rundt om en <span class="stress-syllable">É</span>-ne-bær-busk,<br>
                <span class="stress-syllable">É</span>-ne-bær-busk, <span class="stress-syllable">É</span>-ne-bær-busk.<br>
                Så <span class="stress-syllable">GÅR</span> vi rundt om en <span class="stress-syllable">É</span>-ne-bær-busk<br>
                <span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">MÁN</span>-dag <span class="stress-syllable">MÓR</span>-gen!
            </div>
            <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; margin-top: 0.8rem;">
                <button class="listen-btn btn-listen-chorus-inst">
                    <span>🔊</span> ${t('sange_chorus_listen', isEn ? 'Listen to Chorus' : 'Lyt til omkvædet')}
                </button>
            </div>
        `;
        cCard.querySelector('.btn-listen-chorus-inst').onclick = () => {
            speakDanish('Så går vi rundt om en enebærbusk, enebærbusk, enebærbusk. Så går vi rundt om en enebærbusk, tidlig en mandag morgen!');
        };
        return cCard;
    }

    // Verses Data with clickable first activity verb and crop coordinates from sang_enebaerbusk_vrimmel.jpg
    const versesData = [
        {
            id: 'mandag',
            dag: 'Mandag',
            dagEn: 'Monday',
            icon: '🧺',
            clickableLabel: '<span class="stress-syllable">VÁS</span>-ker',
            verbSpeak: 'vasker',
            cropBgPos: '64% 14%',
            cropBgSize: '460%',
            cropTitle: 'at vaske tøj (1800-tallet)',
            cropDesc: 'Kvinden vasker tøj i hånden på et vaskebræt i baljen.',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi __CLICK_VERB__ vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">VÁS</span>-ker vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">VÁS</span>-ker vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">VÁS</span>-ker vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">MÁN</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi vasker vort tøj, vasker vort tøj, vasker vort tøj. Så gør vi sådan, når vi vasker vort tøj, tidlig en mandag morgen.'
        },
        {
            id: 'tirsdag',
            dag: 'Tirsdag',
            dagEn: 'Tuesday',
            icon: '🧼',
            clickableLabel: '<span class="stress-syllable">SKÝL</span>-ler',
            verbSpeak: 'skyller',
            cropBgPos: '76% 15%',
            cropBgSize: '460%',
            cropTitle: 'at skylle og koge tøj (1800-tallet)',
            cropDesc: 'Kvinden skyller og koger tøjet i den store gryde over ild.',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi __CLICK_VERB__ vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">SKÝL</span>-ler vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">SKÝL</span>-ler vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">SKÝL</span>-ler vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">TÍRS</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi skyller vort tøj, skyller vort tøj, skyller vort tøj. Så gør vi sådan, når vi skyller vort tøj, tidlig en tirsdag morgen.'
        },
        {
            id: 'onsdag',
            dag: 'Onsdag',
            dagEn: 'Wednesday',
            icon: '💨',
            clickableLabel: '<span class="stress-syllable">TØR</span>-rer',
            verbSpeak: 'tørrer',
            cropBgPos: '92% 7%',
            cropBgSize: '450%',
            cropTitle: 'at tørre tøj (1800-tallet)',
            cropDesc: 'Det våde tøj hænger til tørre på en snor mellem træerne.',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi __CLICK_VERB__ vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TØR</span>-rer vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">TØR</span>-rer vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">TØR</span>-rer vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">ÓNS</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi tørrer vort tøj, tørrer vort tøj, tørrer vort tøj. Så gør vi sådan, når vi tørrer vort tøj, tidlig en onsdag morgen.'
        },
        {
            id: 'torsdag',
            dag: 'Torsdag',
            dagEn: 'Thursday',
            icon: '🪓',
            clickableLabel: '<span class="stress-syllable">RÚL</span>-ler',
            verbSpeak: 'ruller',
            cropBgPos: '93% 21%',
            cropBgSize: '450%',
            cropTitle: 'at rulle tøj (1800-tallet)',
            cropDesc: 'Kvinden ruller tøjet glat med et bræt af træ på bordet.',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi __CLICK_VERB__ vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">RÚL</span>-ler vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">RÚL</span>-ler vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">RÚL</span>-ler vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">TÓRS</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi ruller vort tøj, ruller vort tøj, ruller vort tøj. Så gør vi sådan, når vi ruller vort tøj, tidlig en torsdag morgen.'
        },
        {
            id: 'fredag',
            dag: 'Fredag',
            dagEn: 'Friday',
            icon: '👔',
            clickableLabel: '<span class="stress-syllable">STRÝ</span>-ger',
            verbSpeak: 'stryger',
            cropBgPos: '84% 33%',
            cropBgSize: '480%',
            cropTitle: 'at stryge tøj (1800-tallet)',
            cropDesc: 'Kvinden stryger tøjet med et tungt, varmt strygejern.',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi __CLICK_VERB__ vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">STRÝ</span>-ger vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">STRÝ</span>-ger vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">STRÝ</span>-ger vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">FRÉ</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi stryger vort tøj, stryger vort tøj, stryger vort tøj. Så gør vi sådan, når vi stryger vort tøj, tidlig en fredag morgen.'
        },
        {
            id: 'loerdag',
            dag: 'Lørdag',
            dagEn: 'Saturday',
            icon: '🧽',
            clickableLabel: '<span class="stress-syllable">SKÚ</span>-rer',
            verbSpeak: 'skurer',
            cropBgPos: '92% 48%',
            cropBgSize: '450%',
            cropTitle: 'at skure gulv (1800-tallet)',
            cropDesc: 'Kvinden ligger på knæ og skurer gulvet med en børste og vand.',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi __CLICK_VERB__ vort <span class="stress-syllable">GULV</span>,<br><span class="stress-syllable">SKÚ</span>-rer vort <span class="stress-syllable">GULV</span>, <span class="stress-syllable">SKÚ</span>-rer vort <span class="stress-syllable">GULV</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">SKÚ</span>-rer vort <span class="stress-syllable">GULV</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">LØR</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi skurer vort gulv, skurer vort gulv, skurer vort gulv. Så gør vi sådan, når vi skurer vort gulv, tidlig en lørdag morgen.'
        },
        {
            id: 'soendag',
            dag: 'Søndag',
            dagEn: 'Sunday',
            icon: '☕',
            clickableLabel: '<span class="stress-syllable">HÓL</span>-der',
            verbSpeak: 'holder fri',
            cropBgPos: '65% 43%',
            cropBgSize: '420%',
            cropTitle: 'at holde fri (Søndag)',
            cropDesc: 'Familien sidder i sofaen, drikker kaffe og holder fri.',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi __CLICK_VERB__ vor <span class="stress-syllable">FRI</span>,<br><span class="stress-syllable">HÓL</span>-der vor <span class="stress-syllable">FRI</span>, <span class="stress-syllable">HÝG</span>-ger os <span class="stress-syllable">BRAVT</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">HÓL</span>-der vor <span class="stress-syllable">FRI</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">SØN</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi holder vor fri, holder vor fri, hygger os bravt. Så gør vi sådan, når vi holder vor fri, tidlig en søndag morgen.'
        }
    ];

    const songFlow = document.createElement('div');
    songFlow.className = 'song-sequence-flow';
    const totalChoruses = versesData.length + 1;

    versesData.forEach((v, idx) => {
        // Place chorus before each verse
        songFlow.appendChild(createChorusElement(idx + 1, totalChoruses));

        const vCard = document.createElement('div');
        vCard.className = 'verse-card';
        const dayTrans = t(`sange_item_${v.id}_dag`, isEn ? v.dagEn : v.dag);
        const clickableBtnHtml = `<button type="button" class="clickable-song-verb" title="Klik for at se billede af aktiviteten">${v.clickableLabel} <span class="verb-zoom-icon">🔍</span></button>`;
        const lyricsHtml = v.textStress.replace('__CLICK_VERB__', clickableBtnHtml);

        vCard.innerHTML = `
            <div>
                <div class="verse-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                    <span class="verse-day-pill">${v.icon} Vers ${idx + 1}: ${v.dag} ${!isDa && dayTrans !== v.dag ? `(${dayTrans})` : ''}</span>
                    <span style="font-size:0.8rem; color:#fbbf24; font-weight:700;">👆 Klik på det markerede verbum i 1. linje</span>
                </div>
                <div class="verse-lyrics">${lyricsHtml}</div>
                <div class="verse-crop-drawer">
                    <div class="verse-crop-thumb" style="background-position: ${v.cropBgPos}; background-size: ${v.cropBgSize};"></div>
                    <div class="verse-crop-info">
                        <span class="verse-crop-badge">🖼️ Udsnit fra vrimlebilledet</span>
                        <div class="verse-crop-title">${v.cropTitle}</div>
                        <div class="verse-crop-desc">${v.cropDesc}</div>
                        <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
                            <button type="button" class="verse-crop-close">✕ Luk billede</button>
                        </div>
                    </div>
                </div>
            </div>
            <button class="verse-listen-btn" style="margin-top:0.9rem;">
                <span>🔊</span> ${t('sange_verse_listen', isEn ? 'Listen to verse' : 'Lyt til verset')}
            </button>
        `;

        const verbBtn = vCard.querySelector('.clickable-song-verb');
        const cropDrawer = vCard.querySelector('.verse-crop-drawer');
        const closeBtn = vCard.querySelector('.verse-crop-close');

        verbBtn.onclick = () => {
            const isOpen = cropDrawer.classList.toggle('open');
            if (isOpen) {
                speakDanish(v.verbSpeak);
            }
        };
        closeBtn.onclick = () => {
            cropDrawer.classList.remove('open');
        };

        vCard.querySelector('.verse-listen-btn').onclick = () => {
            speakDanish(v.tts);
        };
        songFlow.appendChild(vCard);
    });

    // Final concluding chorus after Sunday verse
    songFlow.appendChild(createChorusElement(totalChoruses, totalChoruses));

    lyricsContainer.appendChild(songFlow);

    // =========================================================================
    // INTERAKTIV LYTTEØVELSE I FANE 2: Små lytteklip
    // =========================================================================
    const listeningQuizCard = document.createElement('div');
    listeningQuizCard.className = 'listening-quiz-card';

    const listeningQuestions = [
        {
            clipText: 'Så gør vi sådan, når vi ruller vort tøj, ruller vort tøj, ruller vort tøj.',
            correct: 'Torsdag – at rulle tøj',
            options: ['Torsdag – at rulle tøj', 'Mandag – at vaske tøj', 'Fredag – at stryge tøj', 'Lørdag – at skure gulv'],
            tip: 'Verbet er "at rulle tøj" (torsdag).'
        },
        {
            clipText: 'Så gør vi sådan, når vi vasker vort tøj, tidlig en mandag morgen.',
            correct: 'Mandag – at vaske tøj',
            options: ['Mandag – at vaske tøj', 'Tirsdag – at skylle tøj', 'Onsdag – at tørre tøj', 'Lørdag – at vaske gulv'],
            tip: 'Mandag vasker vi tøj.'
        },
        {
            clipText: 'Så gør vi sådan, når vi skurer vort gulv, tidlig en lørdag morgen.',
            correct: 'Lørdag – at skure gulv',
            options: ['Lørdag – at skure gulv', 'Onsdag – at tørre tøj', 'Torsdag – at rulle tøj', 'Søndag – at holde fri'],
            tip: 'Lørdag skurer vi gulv.'
        },
        {
            clipText: 'Så gør vi sådan, når vi stryger vort tøj, tidlig en fredag morgen.',
            correct: 'Fredag – at stryge tøj',
            options: ['Fredag – at stryge tøj', 'Tirsdag – at skylle tøj', 'Mandag – at vaske tøj', 'Onsdag – at tørre tøj'],
            tip: 'Fredag stryger vi tøj.'
        },
        {
            clipText: 'Så gør vi sådan, når vi tørrer vort tøj, tidlig en onsdag morgen.',
            correct: 'Onsdag – at tørre tøj',
            options: ['Onsdag – at tørre tøj', 'Torsdag – at rulle tøj', 'Fredag – at stryge tøj', 'Mandag – at vaske tøj'],
            tip: 'Onsdag tørrer vi tøj.'
        },
        {
            clipText: 'Så gør vi sådan, når vi holder vor fri, hygger os bravt tidlig en søndag morgen.',
            correct: 'Søndag – at holde fri og hygge',
            options: ['Søndag – at holde fri og hygge', 'Lørdag – at skure gulv', 'Torsdag – at rulle tøj', 'Tirsdag – at skylle tøj'],
            tip: 'Søndag holder vi fri.'
        }
    ];

    let lqIndex = 0;
    let lqScore = 0;

    function renderListeningQuestion() {
        listeningQuizCard.innerHTML = '';
        const q = listeningQuestions[lqIndex];

        listeningQuizCard.innerHTML = `
            <div class="lq-header">
                <div>
                    <span style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 800; font-size: 0.8rem; text-transform: uppercase;">
                        🎧 ${t('sange_lq_tag', isEn ? 'Listening Exercise' : 'Lytteøvelse (Lydklip)')}
                    </span>
                    <div class="lq-prompt" style="margin-top: 0.6rem;">
                        ${t('sange_lq_prompt', isEn ? 'Which chore or day of the week is being sung about?' : 'Hvilken handling eller ugedag synges der om her?')}
                    </div>
                </div>
                <div style="font-weight: 800; color: #fbbf24; font-size: 1.05rem;">
                    ⭐ ${t('sange_lq_score', isEn ? 'Score' : 'Point')}: ${lqScore} / ${listeningQuestions.length}
                </div>
            </div>
            <div class="lq-play-box">
                <button class="lq-play-btn" id="btn-play-lq-clip">
                    <span>🔊</span> ${t('sange_lq_play', isEn ? 'Play Audio Clip' : 'Afspil lytteklippet')}
                </button>
            </div>
            <div class="lq-options-grid" id="lq-options-container"></div>
            <div id="lq-feedback" style="display: none; background: #0f172a; padding: 1.2rem; border-radius: 14px; margin-top: 1rem; animation: fadeIn 0.3s ease;"></div>
        `;

        const playBtn = listeningQuizCard.querySelector('#btn-play-lq-clip');
        playBtn.onclick = () => {
            speakDanish(q.clipText);
        };

        const optsContainer = listeningQuizCard.querySelector('#lq-options-container');
        const feedbackBox = listeningQuizCard.querySelector('#lq-feedback');
        let answered = false;

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'lq-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                if (answered) return;
                answered = true;
                const isCorrect = opt === q.correct;

                if (isCorrect) {
                    btn.classList.add('correct');
                    lqScore++;
                    listeningQuizCard.querySelector('.lq-header div:last-child').textContent = `⭐ ${t('sange_lq_score', isEn ? 'Score' : 'Point')}: ${lqScore} / ${listeningQuestions.length}`;
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                            🎉 ${t('sange_lq_correct', isEn ? 'Spot on!' : 'Helt rigtigt hørt!')} <strong>${opt}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.95rem;">${q.tip}</div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optsContainer.querySelectorAll('.lq-opt-btn').forEach(b => {
                        if (b.textContent === q.correct) b.classList.add('correct');
                    });
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                            ❌ ${t('sange_lq_wrong', isEn ? 'Not quite right.' : 'Ikke helt rigtigt.')} ${isEn ? 'The correct answer is' : 'Det rigtige svar er'} <strong>${q.correct}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.95rem;">${q.tip}</div>
                    `;
                }

                feedbackBox.style.display = 'block';

                const nextBtn = document.createElement('button');
                nextBtn.className = 'detective-next-btn';
                nextBtn.style.marginTop = '1rem';
                nextBtn.innerHTML = lqIndex + 1 < listeningQuestions.length 
                    ? `<span>${t('sange_lq_next', isEn ? 'Next Audio Clip' : 'Næste lytteklip')}</span> →` 
                    : `<span>🏆 ${t('sange_lq_finish_btn', isEn ? 'See Quiz Result' : 'Se lytteresultat')}</span>`;

                nextBtn.onclick = () => {
                    if (lqIndex + 1 < listeningQuestions.length) {
                        lqIndex++;
                        renderListeningQuestion();
                    } else {
                        renderListeningFinish();
                    }
                };
                feedbackBox.appendChild(nextBtn);
            };

            optsContainer.appendChild(btn);
        });
    }

    function renderListeningFinish() {
        listeningQuizCard.innerHTML = `
            <div style="text-align: center; padding: 1.8rem 1rem;">
                <div style="font-size: 3.2rem; margin-bottom: 0.6rem;">🎧🎉🎶</div>
                <h3 style="font-size: 1.6rem; color: #38bdf8; margin-bottom: 0.5rem;">
                    ${t('sange_lq_finish_title', isEn ? 'Listening Quiz Completed!' : 'Flot klaret! Du har et skarpt dansk øre!')}
                </h3>
                <p style="font-size: 1.15rem; color: #f8fafc; margin-bottom: 1.5rem;">
                    ${t('sange_lq_finish_scored', isEn ? 'You scored' : 'Du fik')} <strong>${lqScore}</strong> ${t('sange_lq_finish_outof', isEn ? 'out of' : 'ud af')} <strong>${listeningQuestions.length}</strong> ${t('sange_lq_finish_points', isEn ? 'points!' : 'point!')}
                </p>
                <button class="detective-next-btn" id="btn-restart-lq">
                    🔄 ${t('sange_lq_restart', isEn ? 'Try Listening Quiz Again' : 'Tag lyttequizzen igen')}
                </button>
            </div>
        `;
        listeningQuizCard.querySelector('#btn-restart-lq').onclick = () => {
            lqIndex = 0;
            lqScore = 0;
            renderListeningQuestion();
        };
    }

    renderListeningQuestion();
    lyricsContainer.appendChild(listeningQuizCard);

    panelSang.appendChild(lyricsContainer);
    panelsHolder.appendChild(panelSang);

    // =========================================================================
    // TAB 3: 🕵️ ORD-DETEKTIV (Billedjagt på vrimlebilledet & Gådequiz)
    // =========================================================================
    const panelDetektiv = document.createElement('div');
    panelDetektiv.className = `song-panel ${currentTab === 'tab_detektiv' ? 'active' : ''}`;
    panelDetektiv.dataset.panel = 'tab_detektiv';

    // Sub-mode navigation for Ord-detektiv
    const detSubmodeNav = document.createElement('div');
    detSubmodeNav.className = 'det-submode-nav';
    detSubmodeNav.innerHTML = `
        <button class="det-submode-btn active" id="btn-det-visual">
            🎯 ${isEn ? '1. Visual Picture Hunt (8 Missions)' : '1. Billedjagt på vrimlebilledet (8 opgaver)'}
        </button>
        <button class="det-submode-btn" id="btn-det-quiz">
            📝 ${isEn ? '2. Tool Quiz (6 Questions)' : '2. Forståelsesopgave: Redskaber (6 spørgsmål)'}
        </button>
    `;
    panelDetektiv.appendChild(detSubmodeNav);

    const detVisualWrap = document.createElement('div');
    detVisualWrap.className = 'det-visual-wrap';

    const detQuizWrap = document.createElement('div');
    detQuizWrap.className = 'det-quiz-wrap';
    detQuizWrap.style.display = 'none';

    detSubmodeNav.querySelector('#btn-det-visual').onclick = () => {
        detVisualWrap.style.display = 'block';
        detQuizWrap.style.display = 'none';
        detSubmodeNav.querySelector('#btn-det-visual').classList.add('active');
        detSubmodeNav.querySelector('#btn-det-quiz').classList.remove('active');
    };

    detSubmodeNav.querySelector('#btn-det-quiz').onclick = () => {
        detVisualWrap.style.display = 'none';
        detQuizWrap.style.display = 'block';
        detSubmodeNav.querySelector('#btn-det-quiz').classList.add('active');
        detSubmodeNav.querySelector('#btn-det-visual').classList.remove('active');
    };

    // -------------------------------------------------------------------------
    // 1. VISUEL BILLEDJAGT PÅ VRIMLEBILLEDET (KUN NUTIDIGE HVERDAGSORD - DU1 M4)
    // -------------------------------------------------------------------------
    const DETEKTIV_ITEMS = [
        {
            id: 'vasketoejskurv',
            word: 'en vasketøjskurv',
            wordEn: 'a laundry basket',
            wordClass: 'substantiv',
            category: 'moderne',
            x: 22,
            y: 73
        },
        {
            id: 'vaskemaskine',
            word: 'en vaskemaskine',
            wordEn: 'a washing machine',
            wordClass: 'substantiv',
            category: 'moderne',
            x: 14,
            y: 56
        },
        {
            id: 'vaskemiddel',
            word: 'vaskemiddel',
            wordEn: 'laundry detergent',
            wordClass: 'substantiv',
            category: 'moderne',
            x: 16,
            y: 46
        },
        {
            id: 'toerrestativ',
            word: 'et tørrestativ',
            wordEn: 'a drying rack',
            wordClass: 'substantiv',
            category: 'moderne',
            x: 33,
            y: 48
        },
        {
            id: 'enebaerbusk',
            word: 'enebærbusken i haven',
            wordEn: 'the juniper bush in the garden',
            wordClass: 'adverbium',
            category: 'moderne',
            x: 23,
            y: 36
        },
        {
            id: 'toejbunker',
            word: 'rent tøj på bordet',
            wordEn: 'clean folded clothes',
            wordClass: 'substantiv',
            category: 'moderne',
            x: 43,
            y: 44
        },
        {
            id: 'dampstrygejern',
            word: 'et strygejern',
            wordEn: 'an iron',
            wordClass: 'substantiv',
            category: 'moderne',
            x: 56,
            y: 55
        },
        {
            id: 'fladmoppe',
            word: 'en gulvmoppe',
            wordEn: 'a mop',
            wordClass: 'substantiv',
            category: 'moderne',
            x: 74,
            y: 62
        },
        {
            id: 'gulvspand',
            word: 'en spand med vand',
            wordEn: 'a bucket of water',
            wordClass: 'substantiv',
            category: 'moderne',
            x: 84,
            y: 80
        },
        {
            id: 'kaffekop',
            word: 'en kop kaffe ved sofaen',
            wordEn: 'a cup of coffee by the sofa',
            wordClass: 'substantiv',
            category: 'moderne',
            x: 65,
            y: 44
        }
    ];

    const DETEKTIV_MISSIONS = [
        {
            targetId: 'vaskemaskine',
            clue: '🕵️ Opgave 1: Find vaskemaskinen. Vi vasker tøj her om mandagen!',
            clueEn: '🕵️ Mission 1: Find the washing machine!'
        },
        {
            targetId: 'vasketoejskurv',
            clue: '🕵️ Opgave 2: Find kurven med tøj på gulvet ved drengen!',
            clueEn: '🕵️ Mission 2: Find the laundry basket on the floor!'
        },
        {
            targetId: 'vaskemiddel',
            clue: '🕵️ Opgave 3: Find flasken med sæbe (vaskemiddel) til vaskemaskinen!',
            clueEn: '🕵️ Mission 3: Find the bottle of detergent!'
        },
        {
            targetId: 'toerrestativ',
            clue: '🕵️ Opgave 4: Find tørrestativet, hvor hun hænger vådt tøj op!',
            clueEn: '🕵️ Mission 4: Find the drying rack!'
        },
        {
            targetId: 'toejbunker',
            clue: '🕵️ Opgave 5: Find det rene tøj, som ligger sammenlagt på bordet!',
            clueEn: '🕵️ Mission 5: Find the folded clothes on the counter!'
        },
        {
            targetId: 'dampstrygejern',
            clue: '🕵️ Opgave 6: Find strygejernet på strygebrættet!',
            clueEn: '🕵️ Mission 6: Find the iron on the ironing board!'
        },
        {
            targetId: 'fladmoppe',
            clue: '🕵️ Opgave 7: Find moppen, som kvinden vasker gulv med!',
            clueEn: '🕵️ Mission 7: Find the mop used to wash the floor!'
        },
        {
            targetId: 'kaffekop',
            clue: '🕵️ Opgave 8: Find familien i sofaen, som drikker kaffe og holder fri om søndagen!',
            clueEn: '🕵️ Mission 8: Find the family on the sofa drinking coffee!'
        }
    ];

    let visIdx = 0;
    let visScore = 0;
    let visClickLocked = false;

    const detVisualCard = document.createElement('div');
    detVisualCard.className = 'det-visual-card';

    const detTopBar = document.createElement('div');
    detTopBar.className = 'det-top-bar';

    const detClueEl = document.createElement('div');
    detClueEl.className = 'det-clue-title';

    const detStatusEl = document.createElement('div');
    detStatusEl.className = 'det-status-pill';

    detTopBar.appendChild(detClueEl);
    detTopBar.appendChild(detStatusEl);
    detVisualCard.appendChild(detTopBar);

    const detFeedbackEl = document.createElement('div');
    detFeedbackEl.className = 'det-feedback-bar';
    detVisualCard.appendChild(detFeedbackEl);

    const detViewport = document.createElement('div');
    detViewport.className = 'det-stage-viewport';

    const detStage = document.createElement('div');
    detStage.className = 'det-stage';

    const detImg = document.createElement('img');
    detImg.src = 'assets/sang_enebaerbusk_vrimmel.jpg';
    detImg.alt = 'Ord-detektiv vrimlebillede';
    detStage.appendChild(detImg);

    function renderVisualMission() {
        const m = DETEKTIV_MISSIONS[visIdx];
        detClueEl.textContent = isEn ? m.clueEn : m.clue;
        detStatusEl.textContent = `${isEn ? 'Task' : 'Opgave'} ${visIdx + 1} / ${DETEKTIV_MISSIONS.length} • ${isEn ? 'Points' : 'Point'}: ${visScore}`;
        detFeedbackEl.innerHTML = '';
        visClickLocked = false;
    }

    DETEKTIV_ITEMS.forEach(item => {
        const spot = document.createElement('button');
        spot.type = 'button';
        spot.className = `det-hotspot hs-${item.wordClass}`;
        spot.style.left = `${item.x}%`;
        spot.style.top = `${item.y}%`;
        spot.textContent = '?';
        spot.title = isEn ? item.wordEn : item.word;

        spot.onclick = (e) => {
            e.stopPropagation();
            if (visClickLocked) return;

            const currentMission = DETEKTIV_MISSIONS[visIdx];
            const isCorrect = item.id === currentMission.targetId;

            if (isCorrect) {
                visClickLocked = true;
                visScore++;
                spot.classList.add('correct-hit');
                speakDanish(item.word);
                detFeedbackEl.innerHTML = `<span style="color:#4ade80;">✓ ${isEn ? 'Great find!' : 'Flot fundet!'} Det er "<strong>${item.word}</strong>"</span>`;
                detStatusEl.textContent = `${isEn ? 'Task' : 'Opgave'} ${visIdx + 1} / ${DETEKTIV_MISSIONS.length} • ${isEn ? 'Points' : 'Point'}: ${visScore}`;

                setTimeout(() => {
                    spot.classList.remove('correct-hit');
                    if (visIdx + 1 < DETEKTIV_MISSIONS.length) {
                        visIdx++;
                        renderVisualMission();
                    } else {
                        renderVisualFinish();
                    }
                }, 1200);
            } else {
                spot.classList.add('wrong-hit');
                speakDanish(item.word);
                detFeedbackEl.innerHTML = `<span style="color:#f87171;">✗ Det er "<strong>${item.word}</strong>" – prøv en anden cirkel!</span>`;
                setTimeout(() => {
                    spot.classList.remove('wrong-hit');
                }, 500);
            }
        };

        detStage.appendChild(spot);
    });

    function renderVisualFinish() {
        detVisualCard.innerHTML = `
            <div style="text-align: center; padding: 2.5rem 1rem;">
                <div style="font-size: 3.5rem; margin-bottom: 0.8rem;">🕵️‍♂️🎉🏆🧺</div>
                <h2 style="font-size: 1.8rem; color: #4ade80; margin-bottom: 0.6rem;">
                    ${isEn ? 'Great Job!' : 'Flot klaret!'}
                </h2>
                <p style="font-size: 1.2rem; color: #f8fafc; margin-bottom: 1rem;">
                    Du fandt alle 8 ting på billedet!
                </p>
                <div style="font-size: 1.4rem; color: #fbbf24; font-weight: 800; margin-bottom: 1.8rem;">
                    ⭐ ${isEn ? 'Score' : 'Point'}: ${visScore} / ${DETEKTIV_MISSIONS.length}
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="detective-next-btn" id="btn-restart-visual-hunt" style="margin: 0;">
                        🔄 ${isEn ? 'Play Again' : 'Prøv igen'}
                    </button>
                    <button class="detective-next-btn" id="btn-go-to-quiz" style="margin: 0; background: #0284c7; color: white;">
                        📝 ${isEn ? 'Try Tool Quiz' : 'Prøv spørgsmål om redskaber'}
                    </button>
                </div>
            </div>
        `;
        detVisualCard.querySelector('#btn-restart-visual-hunt').onclick = () => {
            visIdx = 0;
            visScore = 0;
            detVisualCard.innerHTML = '';
            detVisualCard.appendChild(detTopBar);
            detVisualCard.appendChild(detFeedbackEl);
            detVisualCard.appendChild(detViewport);
            renderVisualMission();
        };
        detVisualCard.querySelector('#btn-go-to-quiz').onclick = () => {
            detSubmodeNav.querySelector('#btn-det-quiz').click();
        };
    }

    renderVisualMission();
    detViewport.appendChild(detStage);
    detVisualCard.appendChild(detViewport);
    detVisualWrap.appendChild(detVisualCard);

    // -------------------------------------------------------------------------
    // 2. FORSTÅELSESQUIZ OM MODERNE REDSKABER (6 KORTE SPØRGSMÅL - DU1 M4)
    // -------------------------------------------------------------------------
    const detectiveCard = document.createElement('div');
    detectiveCard.className = 'detective-card';

    const allDetectiveChallenges = [
        {
            category: 'moderne',
            clue: 'Vi vasker snavset tøj med vand og sæbe i denne maskine om mandagen. Hvad er det?',
            clueEn: 'We wash dirty clothes with water and soap in this machine on Monday. What is it?',
            target: 'en vaskemaskine',
            options: ['en vaskemaskine', 'en tørretumbler', 'en gulvmoppe', 'et strygebræt'],
            explanation: 'Vi vasker tøj i en vaskemaskine.'
        },
        {
            category: 'moderne',
            clue: 'Vi hælder denne flydende sæbe ind i vaskemaskinen, så tøjet bliver rent. Hvad er det?',
            clueEn: 'We pour this liquid soap into the washing machine so the clothes get clean.',
            target: 'vaskemiddel',
            options: ['vaskemiddel', 'en kaffekop', 'en kurv', 'et tørrestativ'],
            explanation: 'Vi bruger vaskemiddel (sæbe), når vi vasker tøj.'
        },
        {
            category: 'moderne',
            clue: 'Vi hænger det våde tøj op på dette stativ om onsdagen, så det kan tørre. Hvad er det?',
            clueEn: 'We hang wet clothes on this rack on Wednesday so they can dry.',
            target: 'et tørrestativ',
            options: ['et tørrestativ', 'et strygejern', 'en vaskemaskine', 'et skab'],
            explanation: 'Tøjet hænger og tørrer på et tørrestativ.'
        },
        {
            category: 'moderne',
            clue: 'Vi bærer det våde eller rene tøj i denne kurv. Hvad er det?',
            clueEn: 'We carry wet or clean clothes in this basket.',
            target: 'en vasketøjskurv',
            options: ['en vasketøjskurv', 'en spand', 'en sofa', 'en moppe'],
            explanation: 'Drengen lægger tøjet i en vasketøjskurv.'
        },
        {
            category: 'moderne',
            clue: 'Det bliver varmt og gør skjorter glatte om fredagen. Hvad er det?',
            clueEn: 'It gets hot and makes shirts smooth on Friday.',
            target: 'et strygejern',
            options: ['et strygejern', 'et tørrestativ', 'en vaskemaskine', 'en gulvmoppe'],
            explanation: 'Vi stryger skjorter med et varmt strygejern.'
        },
        {
            category: 'moderne',
            clue: 'Den har et langt skaft. Vi vasker gulv med den og en spand vand om lørdagen. Hvad er det?',
            clueEn: 'It has a long handle. We wash the floor with it and a bucket of water on Saturday.',
            target: 'en gulvmoppe',
            options: ['en gulvmoppe', 'et strygejern', 'et tørrestativ', 'en kaffekop'],
            explanation: 'Om lørdagen vasker vi gulvet med en gulvmoppe.'
        }
    ];

    let detFilteredList = [...allDetectiveChallenges];
    let detIdx = 0;
    let detScore = 0;

    function renderDetectiveRound() {
        detectiveCard.innerHTML = '';
        const challenge = detFilteredList[detIdx];

        const scoreBar = document.createElement('div');
        scoreBar.className = 'detective-score-bar';
        scoreBar.innerHTML = `
            <span style="font-weight: 800; color: #fbbf24;">🕵️ Spørgsmål ${detIdx + 1} / ${detFilteredList.length}</span>
            <span style="font-weight: 800; color: #4ade80;">⭐ Point: ${detScore}</span>
        `;
        detectiveCard.appendChild(scoreBar);

        const clueBox = document.createElement('div');
        clueBox.className = 'detective-clue-box';
        clueBox.innerHTML = `
            <div class="detective-clue-title">✨ Redskab i hjemmet</div>
            <div class="detective-clue-text">"${isEn ? challenge.clueEn : challenge.clue}"</div>
            <button class="listen-btn" id="btn-listen-clue" style="margin: 0 auto; padding: 0.5rem 1rem; font-size: 0.85rem;">
                <span>🔊</span> Lyt til spørgsmål
            </button>
        `;
        clueBox.querySelector('#btn-listen-clue').onclick = () => {
            speakDanish(challenge.clue);
        };
        detectiveCard.appendChild(clueBox);

        const optsGrid = document.createElement('div');
        optsGrid.className = 'detective-options-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'detective-feedback-box';

        let answered = false;

        challenge.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'detective-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                if (answered) return;
                answered = true;

                const isCorrect = opt === challenge.target;
                if (isCorrect) {
                    btn.classList.add('correct');
                    detScore++;
                    scoreBar.querySelector('span:nth-child(2)').textContent = `⭐ Point: ${detScore}`;
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                            🎉 Helt rigtigt! <strong>${opt}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">${challenge.explanation}</div>
                    `;
                    speakDanish(opt);
                } else {
                    btn.classList.add('wrong');
                    optsGrid.querySelectorAll('.detective-opt-btn').forEach(b => {
                        if (b.textContent === challenge.target) b.classList.add('correct');
                    });
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                            ❌ Det rigtige svar er <strong>${challenge.target}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">${challenge.explanation}</div>
                    `;
                }

                feedbackBox.style.display = 'block';

                const nextBtn = document.createElement('button');
                nextBtn.className = 'detective-next-btn';
                nextBtn.innerHTML = detIdx + 1 < detFilteredList.length 
                    ? `<span>Næste spørgsmål</span> →` 
                    : `<span>🏆 Se dit resultat</span>`;
                nextBtn.onclick = () => {
                    if (detIdx + 1 < detFilteredList.length) {
                        detIdx++;
                        renderDetectiveRound();
                    } else {
                        renderDetectiveFinish();
                    }
                };
                feedbackBox.appendChild(nextBtn);
            };

            optsGrid.appendChild(btn);
        });

        detectiveCard.appendChild(optsGrid);
        detectiveCard.appendChild(feedbackBox);
    }

    function renderDetectiveFinish() {
        detectiveCard.innerHTML = `
            <div style="text-align: center; padding: 2rem 1rem;">
                <div style="font-size: 3.5rem; margin-bottom: 0.8rem;">🎉🧺🏆</div>
                <h2 style="font-size: 1.8rem; color: #fbbf24; margin-bottom: 0.6rem;">
                    Flot klaret!
                </h2>
                <p style="font-size: 1.2rem; color: #f8fafc; margin-bottom: 1.5rem;">
                    Du fik <strong>${detScore}</strong> ud af <strong>${detFilteredList.length}</strong> point!
                </p>
                <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6;">
                    Du kender nu ordene for de vigtigste redskaber til tøjvask og rengøring i hjemmet.
                </p>
                <button class="detective-next-btn" id="btn-restart-detective">
                    🔄 Prøv igen
                </button>
            </div>
        `;
        detectiveCard.querySelector('#btn-restart-detective').onclick = () => {
            detIdx = 0;
            detScore = 0;
            renderDetectiveRound();
        };
    }

    renderDetectiveRound();
    detQuizWrap.appendChild(detectiveCard);

    panelDetektiv.appendChild(detVisualWrap);
    panelDetektiv.appendChild(detQuizWrap);
    panelsHolder.appendChild(panelDetektiv);

    // =========================================================================
    // TAB 4: 🧱 SÆTNINGSBYGGER & PUSLEOPGAVE (Korte DU1 modul 4 sætninger)
    // =========================================================================
    const panelSaetning = document.createElement('div');
    panelSaetning.className = `song-panel ${currentTab === 'tab_saetning' ? 'active' : ''}`;
    panelSaetning.dataset.panel = 'tab_saetning';

    const builderCard = document.createElement('div');
    builderCard.className = 'builder-card';

    const introBanner = document.createElement('div');
    introBanner.className = 'saetning-intro-banner';
    introBanner.innerHTML = `
        <span class="saetning-intro-badge">🧩 Ordstilling (DU1, modul 4)</span>
        <h2 class="saetning-intro-title">Svar på spørgsmål om ugen</h2>
        <p class="saetning-intro-desc">
            Sæt ordene i rigtig rækkefølge. Verbet (handlingen) står altid på 2. plads!
        </p>
    `;
    builderCard.appendChild(introBanner);

    const subTabsNav = document.createElement('div');
    subTabsNav.className = 'saetning-sub-tabs';
    subTabsNav.innerHTML = `
        <button class="saetning-sub-tab-btn active" data-subtab="puzzle">
            <span>🧩</span> 1. Pusleopgaver (8 spørgsmål)
        </button>
        <button class="saetning-sub-tab-btn" data-subtab="builder">
            <span>🧱</span> 2. Trin-for-trin sætningsbygger
        </button>
    `;
    builderCard.appendChild(subTabsNav);

    const puzzleContainer = document.createElement('div');
    puzzleContainer.className = 'saetning-sub-panel active';
    puzzleContainer.id = 'panel-puzzle-view';

    const stepBuilderContainer = document.createElement('div');
    stepBuilderContainer.className = 'saetning-sub-panel';
    stepBuilderContainer.id = 'panel-step-builder-view';

    builderCard.appendChild(puzzleContainer);
    builderCard.appendChild(stepBuilderContainer);

    subTabsNav.querySelectorAll('.saetning-sub-tab-btn').forEach(btn => {
        btn.onclick = () => {
            subTabsNav.querySelectorAll('.saetning-sub-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.dataset.subtab;
            if (target === 'puzzle') {
                puzzleContainer.classList.add('active');
                stepBuilderContainer.classList.remove('active');
            } else {
                stepBuilderContainer.classList.add('active');
                puzzleContainer.classList.remove('active');
            }
        };
    });

    // -------------------------------------------------------------------------
    // 1. PUSLEOPGAVE (Kun nutidige DU1 modul 4 spørgsmål, 8 korte sætninger)
    // -------------------------------------------------------------------------
    function setupPuzzleExercise(container) {
        const tasks = [
            {
                question: 'Hvad laver hun om mandagen?',
                questionEn: 'What does she do on Monday?',
                correct: ['Om mandagen', 'vasker', 'hun', 'tøj.'],
                scrambled: ['vasker', 'tøj.', 'Om mandagen', 'hun'],
                ruleTip: 'Når "Om mandagen" står først, står verbet "vasker" på 2. plads.'
            },
            {
                question: 'Hvad laver drengen om tirsdagen?',
                questionEn: 'What does the boy do on Tuesday?',
                correct: ['Om tirsdagen', 'tømmer', 'han', 'maskinen.'],
                scrambled: ['maskinen.', 'Om tirsdagen', 'han', 'tømmer'],
                ruleTip: 'Verbet "tømmer" står på 2. plads lige efter tidsordet.'
            },
            {
                question: 'Hvad laver hun om onsdagen?',
                questionEn: 'What does she do on Wednesday?',
                correct: ['Om onsdagen', 'hænger', 'hun', 'tøj op.'],
                scrambled: ['hun', 'Om onsdagen', 'hænger', 'tøj op.'],
                ruleTip: 'Om onsdagen hænger hun det våde tøj op.'
            },
            {
                question: 'Hvad laver hun om torsdagen?',
                questionEn: 'What does she do on Thursday?',
                correct: ['Om torsdagen', 'lægger', 'hun', 'tøj sammen.'],
                scrambled: ['lægger', 'tøj sammen.', 'Om torsdagen', 'hun'],
                ruleTip: 'Om torsdagen lægger hun det tørre tøj sammen.'
            },
            {
                question: 'Hvad laver hun om fredagen?',
                questionEn: 'What does she do on Friday?',
                correct: ['Om fredagen', 'stryger', 'hun', 'skjorter.'],
                scrambled: ['stryger', 'skjorter.', 'hun', 'Om fredagen'],
                ruleTip: 'Om fredagen stryger hun skjorter med et strygejern.'
            },
            {
                question: 'Hvad laver hun om lørdagen?',
                questionEn: 'What does she do on Saturday?',
                correct: ['Om lørdagen', 'vasker', 'hun', 'gulv.'],
                scrambled: ['gulv.', 'vasker', 'Om lørdagen', 'hun'],
                ruleTip: 'Om lørdagen vasker hun gulv med en moppe.'
            },
            {
                question: 'Hvad laver familien om søndagen?',
                questionEn: 'What does the family do on Sunday?',
                correct: ['Om søndagen', 'holder', 'familien', 'fri.'],
                scrambled: ['familien', 'fri.', 'Om søndagen', 'holder'],
                ruleTip: 'Om søndagen holder familien fri og drikker kaffe.'
            },
            {
                question: 'Hvornår går vi rundt om busken?',
                questionEn: 'When do we walk around the bush?',
                correct: ['Hver morgen', 'går', 'vi', 'rundt om busken.'],
                scrambled: ['går', 'rundt om busken.', 'Hver morgen', 'vi'],
                ruleTip: 'Tidsudtrykket "Hver morgen" står først, og verbet "går" står på 2. plads.'
            }
        ];

        let currentTaskIdx = 0;
        let userSlots = [null, null, null, null];
        const completedTasks = new Set();

        const puzzleWrapper = document.createElement('div');
        puzzleWrapper.className = 'puzzle-wrapper';

        const slotPrompts = [
            {
                text: 'Hvornår?',
                grammar: 'Tid (1)',
                colorClass: 'slot-tid',
                tagClass: 'tag-tid'
            },
            {
                text: 'Hvad gør man?',
                grammar: 'Verbum (2)',
                colorClass: 'slot-verbum',
                tagClass: 'tag-verbum'
            },
            {
                text: 'Hvem?',
                grammar: 'Subjekt (3)',
                colorClass: 'slot-subjekt',
                tagClass: 'tag-subjekt'
            },
            {
                text: 'Hvad / Hvor?',
                grammar: 'Objekt (4)',
                colorClass: 'slot-objekt',
                tagClass: 'tag-objekt'
            }
        ];

        function renderCurrentTask() {
            puzzleWrapper.innerHTML = '';
            userSlots = [null, null, null, null];

            const task = tasks[currentTaskIdx];

            const header = document.createElement('div');
            header.className = 'puzzle-header';

            const pillsRow = document.createElement('div');
            pillsRow.className = 'puzzle-pills-row';
            tasks.forEach((_, tIdx) => {
                const pill = document.createElement('button');
                pill.className = `puzzle-pill ${tIdx === currentTaskIdx ? 'active' : ''} ${completedTasks.has(tIdx) ? 'completed' : ''}`;
                pill.textContent = tIdx + 1;
                pill.title = `Opgave ${tIdx + 1}`;
                pill.onclick = () => {
                    currentTaskIdx = tIdx;
                    renderCurrentTask();
                };
                pillsRow.appendChild(pill);
            });
            header.appendChild(pillsRow);

            const counterEl = document.createElement('div');
            counterEl.className = 'puzzle-counter';
            counterEl.textContent = `Spørgsmål ${currentTaskIdx + 1} / ${tasks.length}`;
            header.appendChild(counterEl);

            const qCard = document.createElement('div');
            qCard.className = 'puzzle-question-card';
            qCard.innerHTML = `
                <h3 class="puzzle-question-title">❓ ${task.question}</h3>
            `;
            header.appendChild(qCard);

            const guideEl = document.createElement('div');
            guideEl.className = 'puzzle-guide-hint';
            guideEl.textContent = 'Klik på ordene nedenfor for at sætte dem i rigtig rækkefølge:';
            header.appendChild(guideEl);

            puzzleWrapper.appendChild(header);

            const slotsContainer = document.createElement('div');
            slotsContainer.className = 'puzzle-slots';

            slotPrompts.forEach((promptItem, idx) => {
                const slot = document.createElement('div');
                slot.className = `puzzle-slot ${promptItem.colorClass}`;
                slot.dataset.idx = idx;

                slot.onclick = () => {
                    if (userSlots[idx]) {
                        userSlots[idx] = null;
                        updateSlotsAndBank();
                    }
                };

                slotsContainer.appendChild(slot);
            });
            puzzleWrapper.appendChild(slotsContainer);

            const bankContainer = document.createElement('div');
            bankContainer.className = 'puzzle-word-bank';
            puzzleWrapper.appendChild(bankContainer);

            const feedbackBox = document.createElement('div');
            feedbackBox.className = 'puzzle-feedback-area';
            puzzleWrapper.appendChild(feedbackBox);

            function updateSlotsAndBank() {
                slotsContainer.querySelectorAll('.puzzle-slot').forEach((slotEl, idx) => {
                    const word = userSlots[idx];
                    const promptItem = slotPrompts[idx];

                    if (word) {
                        slotEl.classList.add('filled');
                        slotEl.innerHTML = `
                            <span class="slot-badge-num">${idx + 1}</span>
                            <div class="slot-word-content">${word}</div>
                            <span class="slot-grammar-tag ${promptItem.tagClass}">[${promptItem.grammar}]</span>
                            <span class="slot-remove-btn" title="Fjern ord">✕</span>
                        `;
                    } else {
                        slotEl.classList.remove('filled');
                        slotEl.innerHTML = `
                            <span class="slot-badge-num">${idx + 1}</span>
                            <div class="slot-hint-text">${promptItem.text}</div>
                            <span class="slot-grammar-tag ${promptItem.tagClass}">[${promptItem.grammar}]</span>
                        `;
                    }
                });

                bankContainer.innerHTML = '';
                task.scrambled.forEach(word => {
                    const isPlaced = userSlots.includes(word);
                    const btn = document.createElement('button');
                    btn.className = 'puzzle-chip-btn';
                    btn.textContent = word;
                    btn.disabled = isPlaced;

                    btn.onclick = () => {
                        const emptyIdx = userSlots.indexOf(null);
                        if (emptyIdx !== -1) {
                            userSlots[emptyIdx] = word;
                            updateSlotsAndBank();
                            checkAnswer();
                        }
                    };
                    bankContainer.appendChild(btn);
                });
            }

            function checkAnswer() {
                if (userSlots.includes(null)) {
                    feedbackBox.innerHTML = '';
                    return;
                }

                const isCorrect = userSlots.every((w, i) => w === task.correct[i]);
                const sentence = userSlots.join(' ');

                if (isCorrect) {
                    completedTasks.add(currentTaskIdx);
                    pillsRow.querySelectorAll('.puzzle-pill').forEach((pill, idx) => {
                        if (completedTasks.has(idx)) pill.classList.add('completed');
                    });

                    feedbackBox.innerHTML = `
                        <div class="puzzle-msg success">
                            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.35rem;">
                                🎉 Helt rigtigt! "<strong>${sentence}</strong>"
                            </div>
                            <div style="font-size: 0.95rem; color: #f0fdf4; margin-top: 0.3rem;">
                                💡 ${task.ruleTip}
                            </div>
                        </div>
                        <div class="puzzle-action-row">
                            <button class="next-task-btn" id="puzzle-listen-btn" style="background: #f59e0b; color: #0f172a;">
                                <span>🔊</span> Lyt til udtale
                            </button>
                            <button class="next-task-btn" id="puzzle-next-btn">
                                <span>${currentTaskIdx < tasks.length - 1 ? 'Næste spørgsmål' : 'Start forfra'}</span> →
                            </button>
                        </div>
                    `;
                    feedbackBox.querySelector('#puzzle-listen-btn').onclick = () => speakDanish(sentence);
                    feedbackBox.querySelector('#puzzle-next-btn').onclick = () => {
                        currentTaskIdx = (currentTaskIdx + 1) % tasks.length;
                        renderCurrentTask();
                    };
                    speakDanish(sentence);
                } else {
                    feedbackBox.innerHTML = `
                        <div class="puzzle-msg error">
                            <div style="font-weight: 800; margin-bottom: 0.3rem;">
                                ❌ Prøv igen!
                            </div>
                            <div style="font-size: 0.92rem;">
                                Husk: Verbet (handlingen) skal altid stå på 2. plads lige efter tidsordet!
                            </div>
                        </div>
                        <div class="puzzle-action-row">
                            <button class="retry-task-btn" id="puzzle-retry-btn">
                                <span>🔄</span> Prøv igen
                            </button>
                        </div>
                    `;
                    feedbackBox.querySelector('#puzzle-retry-btn').onclick = () => {
                        userSlots = [null, null, null, null];
                        feedbackBox.innerHTML = '';
                        updateSlotsAndBank();
                    };
                }
            }

            updateSlotsAndBank();
        }

        renderCurrentTask();
        container.appendChild(puzzleWrapper);
    }

    // -------------------------------------------------------------------------
    // 2. TRIN-FOR-TRIN SÆTNINGSBYGGER (Kun nutidige DU1 modul 4 ord)
    // -------------------------------------------------------------------------
    function setupStepBuilder(container) {
        const categories = [
            {
                q: '1. Hvornår? (Tid)',
                grammar: 'Tid (1)',
                rowClass: 'row-tid',
                selClass: 'sel-tid',
                colorWord: 'word-color-tid',
                options: ['Om mandagen', 'Om tirsdagen', 'Om onsdagen', 'Om torsdagen', 'Om fredagen', 'Om lørdagen', 'Om søndagen', 'I dag']
            },
            {
                q: '2. Hvad gør man? (Verbum)',
                grammar: 'Verbum (2)',
                rowClass: 'row-verbum',
                selClass: 'sel-verbum',
                colorWord: 'word-color-verbum',
                options: ['vasker', 'tømmer', 'tørrer', 'folder', 'stryger', 'holder']
            },
            {
                q: '3. Hvem? (Subjekt)',
                grammar: 'Subjekt (3)',
                rowClass: 'row-subjekt',
                selClass: 'sel-subjekt',
                colorWord: 'word-color-subjekt',
                options: ['hun', 'han', 'vi', 'jeg', 'familien']
            },
            {
                q: '4. Hvad? (Objekt)',
                grammar: 'Objekt (4)',
                rowClass: 'row-objekt',
                selClass: 'sel-objekt',
                colorWord: 'word-color-objekt',
                options: ['tøj', 'maskinen', 'skjorter', 'gulv', 'fri']
            }
        ];

        let selections = ['Om mandagen', 'vasker', 'hun', 'tøj'];

        const wrapper = document.createElement('div');
        wrapper.className = 'step-builder-wrapper';

        const outputBox = document.createElement('div');
        outputBox.className = 'live-sentence-display';

        function updateLiveDisplay() {
            outputBox.innerHTML = `
                <div class="live-badge-label">✨ Din sætning (Verbum på 2. plads)</div>
                <div class="live-sentence-text">
                    <span class="word-color-tid">${selections[0]}</span> 
                    <span class="word-color-verbum">${selections[1]}</span> 
                    <span class="word-color-subjekt">${selections[2]}</span> 
                    <span class="word-color-objekt">${selections[3]}</span>.
                </div>
                <div class="live-rule-hint">
                    💡 <strong>Led i sætningen:</strong> 
                    1. <span class="word-color-tid">${selections[0]}</span> (Tid) ➔ 
                    2. <span class="word-color-verbum">${selections[1]}</span> (Verbum) ➔ 
                    3. <span class="word-color-subjekt">${selections[2]}</span> (Subjekt) ➔ 
                    4. <span class="word-color-objekt">${selections[3]}</span> (Objekt)
                </div>
                <button class="listen-btn" id="btn-live-listen" style="margin-top: 0.4rem; padding: 0.65rem 1.4rem;">
                    <span>🔊</span> Lyt til sætningen
                </button>
            `;
            outputBox.querySelector('#btn-live-listen').onclick = () => {
                speakDanish(`${selections[0]} ${selections[1]} ${selections[2]} ${selections[3]}`);
            };
        }

        categories.forEach((cat, catIdx) => {
            const row = document.createElement('div');
            row.className = `builder-guided-row ${cat.rowClass}`;

            const title = document.createElement('div');
            title.className = 'builder-guided-title';
            title.innerHTML = `
                <span>${cat.q}</span>
                <span class="slot-grammar-tag ${cat.rowClass.replace('row-', 'tag-')}">[${cat.grammar}]</span>
            `;
            row.appendChild(title);

            const chipsWrap = document.createElement('div');
            chipsWrap.className = 'builder-options-chips';

            cat.options.forEach(opt => {
                const chip = document.createElement('button');
                const isSelected = selections[catIdx] === opt;
                chip.className = `builder-choice-chip ${isSelected ? 'selected ' + cat.selClass : ''}`;
                chip.textContent = opt;

                chip.onclick = () => {
                    selections[catIdx] = opt;
                    row.querySelectorAll('.builder-choice-chip').forEach(c => {
                        c.className = 'builder-choice-chip';
                    });
                    chip.classList.add('selected', cat.selClass);
                    updateLiveDisplay();
                };

                chipsWrap.appendChild(chip);
            });

            row.appendChild(chipsWrap);
            wrapper.appendChild(row);
        });

        wrapper.appendChild(outputBox);
        container.appendChild(wrapper);
        updateLiveDisplay();
    }

    setupPuzzleExercise(puzzleContainer);
    setupStepBuilder(stepBuilderContainer);

    panelSaetning.appendChild(builderCard);
    panelsHolder.appendChild(panelSaetning);

    // =========================================================================
    // TAB 5: 🏠 UGENS HUSARBEJDE, PARRINGSØVELSE & SAMTALE (DU1, MODUL 4)
    // =========================================================================
    const panelUdvikling = document.createElement('div');
    panelUdvikling.className = `song-panel ${currentTab === 'tab_udvikling' ? 'active' : ''}`;
    panelUdvikling.dataset.panel = 'tab_udvikling';

    const historyCard = document.createElement('div');
    historyCard.className = 'history-card';

    // PARRINGSØVELSE: Forbind handling med redskab i hjemmet (DU1, modul 4)
    const matchingSection = document.createElement('div');
    matchingSection.className = 'matching-game-section';

    const matchPairs = [
        {
            verbId: 'vaske',
            verb: '🧺 at vaske tøj',
            toolId: 'vaskemaskine',
            toolNu: 'en vaskemaskine og sæbe',
            feedback: 'Vi vasker tøj i en vaskemaskine.'
        },
        {
            verbId: 'toerre',
            verb: '💨 at hænge tøj op',
            toolId: 'toerrestativ',
            toolNu: 'et tørrestativ og klemmer',
            feedback: 'Vi hænger vådt tøj op på et tørrestativ.'
        },
        {
            verbId: 'folde',
            verb: '📦 at lægge tøj sammen',
            toolId: 'klaedeskab',
            toolNu: 'et bord og et klædeskab',
            feedback: 'Vi lægger tøjet sammen og lægger det i skabet.'
        },
        {
            verbId: 'stryge',
            verb: '👔 at stryge skjorter',
            toolId: 'strygejern',
            toolNu: 'et strygejern og strygebræt',
            feedback: 'Vi stryger skjorter med et strygejern.'
        },
        {
            verbId: 'gulv',
            verb: '✨ at vaske gulv',
            toolId: 'moppe',
            toolNu: 'en gulvmoppe og en spand vand',
            feedback: 'Vi vasker gulv med en moppe og vand.'
        }
    ];

    let selectedVerb = null;
    let selectedTool = null;
    let matchedCount = 0;

    function renderMatchingGame() {
        matchingSection.innerHTML = `
            <div class="mgs-header">
                <span style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 800; font-size: 0.8rem; text-transform: uppercase;">
                    🔗 Parringsøvelse: Handling og redskab
                </span>
                <div class="mgs-title" style="margin-top: 0.6rem;">
                    Hvilket redskab passer til handlingen?
                </div>
                <div class="mgs-sub">
                    Klik på en handling til venstre, og klik derefter på redskabet til højre!
                </div>
            </div>
            <div class="matching-columns-container">
                <div>
                    <div class="mgs-col-title">🔴 Handlinger (Verber)</div>
                    <div class="mgs-cards-list" id="mgs-verbs-list"></div>
                </div>
                <div>
                    <div class="mgs-col-title">🏠 Redskaber i hjemmet</div>
                    <div class="mgs-cards-list" id="mgs-tools-list"></div>
                </div>
            </div>
            <div id="mgs-feedback-box" style="background: #1e293b; border-radius: 14px; padding: 1.1rem; display: none; text-align: center; border: 1.5px solid #22c55e;"></div>
        `;

        const verbsList = matchingSection.querySelector('#mgs-verbs-list');
        const toolsList = matchingSection.querySelector('#mgs-tools-list');
        const feedbackBox = matchingSection.querySelector('#mgs-feedback-box');

        const shuffledTools = [...matchPairs].sort(() => Math.random() - 0.5);

        matchPairs.forEach(p => {
            const vBtn = document.createElement('button');
            vBtn.className = 'match-card-btn';
            vBtn.dataset.verbId = p.verbId;
            vBtn.innerHTML = `<span>${p.verb}</span> <span>➔</span>`;
            vBtn.onclick = () => {
                if (vBtn.classList.contains('matched')) return;
                verbsList.querySelectorAll('.match-card-btn').forEach(b => b.classList.remove('selected'));
                vBtn.classList.add('selected');
                selectedVerb = p;
                checkMatch();
            };
            verbsList.appendChild(vBtn);
        });

        shuffledTools.forEach(p => {
            const tBtn = document.createElement('button');
            tBtn.className = 'match-card-btn';
            tBtn.dataset.toolId = p.toolId;
            tBtn.innerHTML = `<span>${p.toolNu}</span>`;
            tBtn.onclick = () => {
                if (tBtn.classList.contains('matched')) return;
                toolsList.querySelectorAll('.match-card-btn').forEach(b => b.classList.remove('selected'));
                tBtn.classList.add('selected');
                selectedTool = p;
                checkMatch();
            };
            toolsList.appendChild(tBtn);
        });

        function checkMatch() {
            if (!selectedVerb || !selectedTool) return;

            if (selectedVerb.verbId === selectedTool.verbId) {
                const vBtn = verbsList.querySelector(`[data-verb-id="${selectedVerb.verbId}"]`);
                const tBtn = toolsList.querySelector(`[data-tool-id="${selectedTool.toolId}"]`);

                vBtn.classList.add('matched');
                tBtn.classList.add('matched');
                vBtn.innerHTML = `<span>${selectedVerb.verb}</span> <span>✅</span>`;
                tBtn.innerHTML = `<span>${selectedTool.toolNu}</span> <span>✅</span>`;

                feedbackBox.style.display = 'block';
                feedbackBox.innerHTML = `
                    <div style="color: #4ade80; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.3rem;">
                        🎉 Rigtigt!
                    </div>
                    <div style="color: #f8fafc; font-size: 0.95rem;">${selectedVerb.feedback}</div>
                `;
                speakDanish(selectedVerb.feedback);

                matchedCount++;
                selectedVerb = null;
                selectedTool = null;

                if (matchedCount === matchPairs.length) {
                    setTimeout(() => {
                        feedbackBox.innerHTML = `
                            <div style="font-size: 2.2rem; margin-bottom: 0.4rem;">🏆🌟</div>
                            <div style="color: #fbbf24; font-weight: 800; font-size: 1.3rem; margin-bottom: 0.4rem;">
                                Flot! Alle par er forbundet rigtigt!
                            </div>
                            <button class="builder-btn builder-btn-check" id="btn-restart-matching" style="margin: 0.6rem auto 0;">
                                🔄 Prøv igen
                            </button>
                        `;
                        feedbackBox.querySelector('#btn-restart-matching').onclick = () => {
                            matchedCount = 0;
                            selectedVerb = null;
                            selectedTool = null;
                            renderMatchingGame();
                        };
                    }, 600);
                }
            } else {
                feedbackBox.style.display = 'block';
                feedbackBox.style.borderColor = '#ef4444';
                feedbackBox.innerHTML = `
                    <div style="color: #f87171; font-weight: 800;">
                        ❌ Prøv et andet redskab!
                    </div>
                `;
                setTimeout(() => {
                    verbsList.querySelectorAll('.match-card-btn').forEach(b => {
                        if (!b.classList.contains('matched')) b.classList.remove('selected');
                    });
                    toolsList.querySelectorAll('.match-card-btn').forEach(b => {
                        if (!b.classList.contains('matched')) b.classList.remove('selected');
                    });
                    selectedVerb = null;
                    selectedTool = null;
                    feedbackBox.style.display = 'none';
                    feedbackBox.style.borderColor = '#22c55e';
                }, 1100);
            }
        }
    }

    renderMatchingGame();
    historyCard.appendChild(matchingSection);

    // Tribute Box
    const tributeBox = document.createElement('div');
    tributeBox.className = 'tribute-box';
    tributeBox.innerHTML = `
        <span class="tribute-badge">🏠 Et godt og rent hjem</span>
        <div class="tribute-text">
            “Når vi hjælper hinanden med husarbejdet, bliver hjemmet rent og rart for hele familien.”
        </div>
    `;
    historyCard.appendChild(tributeBox);

    // Discussion Cards
    const discTitle = document.createElement('h3');
    discTitle.style.fontSize = '1.3rem';
    discTitle.style.color = '#fbbf24';
    discTitle.style.marginBottom = '1rem';
    discTitle.textContent = '💬 Samtalekort til makkerpar';
    historyCard.appendChild(discTitle);

    const discGrid = document.createElement('div');
    discGrid.className = 'discussion-cards-grid';

    const discCards = [
        {
            icon: '🤝',
            q: 'Hvem laver husarbejdet hjemme hos dig?',
            helpers: 'Hjælpeord: jeg, min partner, vi deles om det, hver dag'
        },
        {
            icon: '🧺',
            q: 'Hvilken dag vasker du tøj og gør rent?',
            helpers: 'Hjælpeord: om mandagen, om lørdagen, i weekenden'
        },
        {
            icon: '☕',
            q: 'Hvad kan du godt lide at lave om søndagen, når du holder fri?',
            helpers: 'Hjælpeord: at drikke kaffe, at slappe af, at gå en tur, at se tv'
        }
    ];

    discCards.forEach(d => {
        const dCard = document.createElement('div');
        dCard.className = 'discussion-card';
        dCard.innerHTML = `
            <div class="disc-icon">${d.icon}</div>
            <div class="disc-question">${d.q}</div>
            <div class="disc-helpers">${d.helpers}</div>
        `;
        discGrid.appendChild(dCard);
    });

    historyCard.appendChild(discGrid);
    panelUdvikling.appendChild(historyCard);
    panelsHolder.appendChild(panelUdvikling);

    // =========================================================================
    // TAB 6: ANDET HUSARBEJDE (20 aktiviteter, forståelse & sætningsbygning)
    // =========================================================================
    const panelAndet = document.createElement('div');
    panelAndet.className = `song-panel ${currentTab === 'tab_andet_husarbejde' ? 'active' : ''}`;
    panelAndet.dataset.panel = 'tab_andet_husarbejde';

    const andetActivities = [
        // SOVEVÆRELSE (1-4)
        {
            num: 1,
            id: 'lufte_ud',
            room: 'sovevaerelse',
            roomLabel: 'Soveværelse',
            handling: 'at lufte ud',
            forms: 'lufter ud · luftede ud · har luftet ud',
            redskaber: 'et åbent vindue, frisk luft',
            saetning: 'Vi lufter ud i værelset.',
            x: 14,
            y: 22
        },
        {
            num: 2,
            id: 'rede_seng',
            room: 'sovevaerelse',
            roomLabel: 'Soveværelse',
            handling: 'at rede sengen',
            forms: 'reder · redte · har redt',
            redskaber: 'en dyne, en pude, en seng',
            saetning: 'Hun reder sengen hver morgen.',
            x: 23,
            y: 31
        },
        {
            num: 3,
            id: 'skifte_sengetoej',
            room: 'sovevaerelse',
            roomLabel: 'Soveværelse',
            handling: 'at skifte sengetøj',
            forms: 'skifter · skiftede · har skiftet',
            redskaber: 'rent sengetøj, lagen, betræk',
            saetning: 'Vi skifter sengetøj om fredagen.',
            x: 16,
            y: 37
        },
        {
            num: 4,
            id: 'rydde_op',
            room: 'sovevaerelse',
            roomLabel: 'Soveværelse',
            handling: 'at rydde op',
            forms: 'rydder op · ryddede op · har ryddet op',
            redskaber: 'en kurv, legetøj, hylder',
            saetning: 'Drengen rydder sit legetøj op.',
            x: 35,
            y: 42
        },

        // BADEVÆRELSE (5-6)
        {
            num: 5,
            id: 'goere_bad_rent',
            room: 'badevaerelse',
            roomLabel: 'Badeværelse',
            handling: 'at gøre badeværelset rent',
            forms: 'gør rent · gjorde rent · har gjort rent',
            redskaber: 'en svamp, sæbe, et spejl',
            saetning: 'Hun gør badeværelset rent.',
            x: 48,
            y: 25
        },
        {
            num: 6,
            id: 'rense_toilet',
            room: 'badevaerelse',
            roomLabel: 'Badeværelse',
            handling: 'at rense toilettet',
            forms: 'renser · rensede · har renset',
            redskaber: 'en toiletbørste, rengøringsmiddel',
            saetning: 'Vi renser toilettet med en børste.',
            x: 55,
            y: 38
        },

        // STUE (7-10)
        {
            num: 7,
            id: 'stoevsuge',
            room: 'stue',
            roomLabel: 'Stue',
            handling: 'at støvsuge gulvet',
            forms: 'støvsuger · støvsugede · har støvsuget',
            redskaber: 'en støvsuger, et gulvtæppe',
            saetning: 'Manden støvsuger tæppet i stuen.',
            x: 70,
            y: 34
        },
        {
            num: 8,
            id: 'stoeve_af',
            room: 'stue',
            roomLabel: 'Stue',
            handling: 'at støve af',
            forms: 'støver af · støvede af · har støvet af',
            redskaber: 'en støvekost, en klud, en reol',
            saetning: 'Vi støver hylderne af.',
            x: 75,
            y: 23
        },
        {
            num: 9,
            id: 'pudse_vinduer',
            room: 'stue',
            roomLabel: 'Stue',
            handling: 'at pudse vinduer',
            forms: 'pudser · pudsede · har pudset',
            redskaber: 'en vinduesskraber, vand og sæbe',
            saetning: 'Kvinden pudser vinduet i stuen.',
            x: 82,
            y: 26
        },
        {
            num: 10,
            id: 'vande_blomster',
            room: 'stue',
            roomLabel: 'Stue',
            handling: 'at vande blomster',
            forms: 'vander · vandede · har vandet',
            redskaber: 'en vandkande, potteplanter',
            saetning: 'Vi vander blomsterne i vinduet.',
            x: 85,
            y: 34
        },

        // KØKKEN (11-15)
        {
            num: 11,
            id: 'lave_mad',
            room: 'koekken',
            roomLabel: 'Køkken',
            handling: 'at lave mad',
            forms: 'laver mad · lavede mad · har lavet mad',
            redskaber: 'en gryde, et komfur, en ske',
            saetning: 'Han laver varm mad i gryden.',
            x: 17,
            y: 73
        },
        {
            num: 12,
            id: 'bage_i_ovn',
            room: 'koekken',
            roomLabel: 'Køkken',
            handling: 'at bage i ovnen',
            forms: 'bager · bagte · har bagt',
            redskaber: 'en ovn, en bageplade',
            saetning: 'Vi bager brød i ovnen.',
            x: 16,
            y: 83
        },
        {
            num: 13,
            id: 'vaske_op',
            room: 'koekken',
            roomLabel: 'Køkken',
            handling: 'at vaske op',
            forms: 'vasker op · vaskede op · har vasket op',
            redskaber: 'en opvaskebørste, varmt vand, opvaskemiddel',
            saetning: 'Hun vasker op i køkkenet.',
            x: 25,
            y: 71
        },
        {
            num: 14,
            id: 'fylde_opvaskemaskine',
            room: 'koekken',
            roomLabel: 'Køkken',
            handling: 'at fylde opvaskemaskinen',
            forms: 'fylder · fyldte · har fyldt',
            redskaber: 'en opvaskemaskine, tallerkener, glas',
            saetning: 'Vi sætter glas i opvaskemaskinen.',
            x: 32,
            y: 79
        },
        {
            num: 15,
            id: 'saette_i_koeleskab',
            room: 'koekken',
            roomLabel: 'Køkken',
            handling: 'at sætte varer i køleskabet',
            forms: 'sætter · satte · har sat',
            redskaber: 'et køleskab, madvarer, mælk',
            saetning: 'Vi sætter mælk i køleskabet.',
            x: 38,
            y: 69
        },

        // SPISESTUE & ENTRÉ (16-20)
        {
            num: 16,
            id: 'toerre_bord_af',
            room: 'spisestue_entre',
            roomLabel: 'Spisestue & Entré',
            handling: 'at tørre bordet af',
            forms: 'tørrer af · tørrede af · har tørret af',
            redskaber: 'en klud, et spisebord',
            saetning: 'Hun tørrer bordet af med en klud.',
            x: 48,
            y: 74
        },
        {
            num: 17,
            id: 'daekke_bord',
            room: 'spisestue_entre',
            roomLabel: 'Spisestue & Entré',
            handling: 'at dække bord',
            forms: 'dækker · dækkede · har dækket',
            redskaber: 'tallerkener, glas, bestik',
            saetning: 'Vi dækker bord til aftensmad.',
            x: 56,
            y: 77
        },
        {
            num: 18,
            id: 'fodre_dyr',
            room: 'spisestue_entre',
            roomLabel: 'Spisestue & Entré',
            handling: 'at fodre hunden og katten',
            forms: 'fodrer · fodrede · har fodret',
            redskaber: 'en madskål, dyremad',
            saetning: 'Vi giver hunden og katten mad.',
            x: 52,
            y: 91
        },
        {
            num: 19,
            id: 'feje_gulv',
            room: 'spisestue_entre',
            roomLabel: 'Spisestue & Entré',
            handling: 'at feje gulvet',
            forms: 'fejer · fejede · har fejet',
            redskaber: 'en kost, en fejebakke',
            saetning: 'Han fejer gulvet med en kost.',
            x: 73,
            y: 78
        },
        {
            num: 20,
            id: 'baere_skrald_ud',
            room: 'spisestue_entre',
            roomLabel: 'Spisestue & Entré',
            handling: 'at sortere affald og bære skrald ud',
            forms: 'bærer ud · bar ud · har båret ud',
            redskaber: 'en skraldepose, affaldsspande',
            saetning: 'Drengen bærer skraldeposen ud.',
            x: 84,
            y: 79
        }
    ];

    // Sub-mode navigation inside "Andet husarbejde" (Monochrome SVGs, stacked vertically)
    const ahSubNav = document.createElement('div');
    ahSubNav.className = 'det-submode-nav ah-sub-nav';
    ahSubNav.innerHTML = `
        <button class="det-submode-btn active" data-ahsub="vrimmel">
            <span class="mono-svg-icon">${monoSvgs.image}</span>
            <span>1. Vrimlebillede (20 aktiviteter)</span>
        </button>
        <button class="det-submode-btn" data-ahsub="forstaaelse">
            <span class="mono-svg-icon">${monoSvgs.chores}</span>
            <span>2. Forståelsesopgaver (10 spørgsmål)</span>
        </button>
        <button class="det-submode-btn" data-ahsub="saetning">
            <span class="mono-svg-icon">${monoSvgs.puzzle}</span>
            <span>3. Sætningsbygning (Nye termer)</span>
        </button>
    `;
    panelAndet.appendChild(ahSubNav);

    const ahVrimmelSection = document.createElement('div');
    const ahForstaaelseSection = document.createElement('div');
    ahForstaaelseSection.style.display = 'none';
    const ahSaetningSection = document.createElement('div');
    ahSaetningSection.style.display = 'none';

    ahSubNav.querySelectorAll('.det-submode-btn').forEach(btn => {
        btn.onclick = () => {
            ahSubNav.querySelectorAll('.det-submode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.dataset.ahsub;
            ahVrimmelSection.style.display = target === 'vrimmel' ? 'block' : 'none';
            ahForstaaelseSection.style.display = target === 'forstaaelse' ? 'block' : 'none';
            ahSaetningSection.style.display = target === 'saetning' ? 'block' : 'none';
        };
    });

    // -------------------------------------------------------------------------
    // DEL 1: VRIMLEBILLEDE MED DE 20 MEST ALMINDELIGE AKTIVITETER I HJEMMET
    // -------------------------------------------------------------------------
    const ahVrimmelCard = document.createElement('div');
    ahVrimmelCard.className = 'vrimmel-card';

    const ahControlBar = document.createElement('div');
    ahControlBar.className = 'vrimmel-control-bar';

    const ahFilterGroup = document.createElement('div');
    ahFilterGroup.className = 'vrimmel-filter-group';
    ahFilterGroup.innerHTML = `
        <button class="vrimmel-filter-btn active" data-room="all">Alle (20)</button>
        <button class="vrimmel-filter-btn" data-room="sovevaerelse">Soveværelse (4)</button>
        <button class="vrimmel-filter-btn" data-room="badevaerelse">Badeværelse (2)</button>
        <button class="vrimmel-filter-btn" data-room="stue">Stue (4)</button>
        <button class="vrimmel-filter-btn" data-room="koekken">Køkken (5)</button>
        <button class="vrimmel-filter-btn" data-room="spisestue_entre">Spisestue & Entré (5)</button>
    `;
    ahControlBar.appendChild(ahFilterGroup);

    const ahPureBtn = document.createElement('button');
    ahPureBtn.className = 'pure-toggle-btn';
    let ahPureActive = false;
    ahPureBtn.innerHTML = `Vis kun billedet: <strong id="ah-pure-status">FRA</strong>`;
    ahPureBtn.onclick = () => {
        ahPureActive = !ahPureActive;
        ahStage.classList.toggle('pure-mode', ahPureActive);
        ahPureBtn.classList.toggle('active', ahPureActive);
        ahPureBtn.querySelector('#ah-pure-status').textContent = ahPureActive ? 'TIL' : 'FRA';
    };
    ahControlBar.appendChild(ahPureBtn);
    ahVrimmelCard.appendChild(ahControlBar);

    const ahStage = document.createElement('div');
    ahStage.className = 'vrimmel-stage';

    const ahImg = document.createElement('img');
    ahImg.src = 'assets/andet_husarbejde_vrimmel.jpg';
    ahImg.alt = 'Andet husarbejde - Vrimlebillede med de 20 mest almindelige aktiviteter i et hjem';
    ahStage.appendChild(ahImg);

    const ahDetailCard = document.createElement('div');
    ahDetailCard.className = 'hotspot-detail-card';

    const ahDots = [];
    let currentAndetIdx = 0;

    function selectAndetItem(item) {
        currentAndetIdx = andetActivities.findIndex(a => a.num === item.num);
        ahDots.forEach(d => d.classList.toggle('active', Number(d.dataset.num) === item.num));

        ahDetailCard.innerHTML = `
            <div class="detail-info-left">
                <div class="detail-badges">
                    <span class="badge-pill badge-dag">Aktivitet ${item.num} af ${andetActivities.length} · ${item.roomLabel}</span>
                </div>
                <div class="detail-title">
                    ${item.handling}
                </div>
                <div class="detail-forms">
                    ${item.forms}
                </div>
                <div class="detail-redskaber">
                    <strong>Redskaber:</strong> ${item.redskaber}
                </div>
                <div class="detail-saetning-box">
                    "${item.saetning}"
                </div>
            </div>
            <div class="detail-actions-right ah-step-nav-btns">
                <button class="ah-step-btn" id="btn-ah-prev" type="button">← Forrige</button>
                <button class="listen-btn" id="btn-listen-ah-hotspot" type="button">
                    Lyt til sætning
                </button>
                <button class="ah-step-btn" id="btn-ah-next" type="button">Næste →</button>
            </div>
        `;
        ahDetailCard.querySelector('#btn-listen-ah-hotspot').onclick = () => {
            speakDanish(item.saetning);
        };
        ahDetailCard.querySelector('#btn-ah-prev').onclick = () => {
            const prevIdx = (currentAndetIdx - 1 + andetActivities.length) % andetActivities.length;
            selectAndetItem(andetActivities[prevIdx]);
        };
        ahDetailCard.querySelector('#btn-ah-next').onclick = () => {
            const nextIdx = (currentAndetIdx + 1) % andetActivities.length;
            selectAndetItem(andetActivities[nextIdx]);
        };
    }

    andetActivities.forEach((item, idx) => {
        const dot = document.createElement('div');
        dot.className = `vrimmel-hotspot ah-number-spot ${idx === 0 ? 'active' : ''}`;
        dot.style.left = `${item.x}%`;
        dot.style.top = `${item.y}%`;
        dot.textContent = item.num;
        dot.title = `${item.num}. ${item.handling}`;
        dot.dataset.room = item.room;
        dot.dataset.num = item.num;

        dot.onclick = () => {
            selectAndetItem(item);
            speakDanish(item.handling);
        };
        ahStage.appendChild(dot);
        ahDots.push(dot);
    });

    selectAndetItem(andetActivities[0]);

    ahFilterGroup.querySelectorAll('.vrimmel-filter-btn').forEach(btn => {
        btn.onclick = () => {
            ahFilterGroup.querySelectorAll('.vrimmel-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const room = btn.dataset.room;
            ahDots.forEach(d => {
                d.style.display = (room === 'all' || d.dataset.room === room) ? 'flex' : 'none';
            });
            const firstMatch = andetActivities.find(a => room === 'all' || a.room === room);
            if (firstMatch) selectAndetItem(firstMatch);
        };
    });

    ahVrimmelCard.appendChild(ahStage);
    ahVrimmelCard.appendChild(ahDetailCard);
    ahVrimmelSection.appendChild(ahVrimmelCard);

    // -------------------------------------------------------------------------
    // DEL 2: SMÅ FORSTÅELSESOPGAVER MED DE 20 NYE TERMER (10 SPØRGSMÅL)
    // -------------------------------------------------------------------------
    const ahQuizCard = document.createElement('div');
    ahQuizCard.className = 'detective-card';

    const ahComprehensionTasks = [
        {
            q: 'Gulvtæppet i stuen er snavset. Hvad gør manden?',
            target: 'Han støvsuger gulvet.',
            options: ['Han støvsuger gulvet.', 'Han vander blomster.', 'Han reder sengen.', 'Han bager brød.'],
            tip: 'Vi bruger en støvsuger til at støvsuge gulvtæppet (#7).'
        },
        {
            q: 'Der er pletter på vinduet i stuen. Hvad gør kvinden?',
            target: 'Hun pudser vinduet.',
            options: ['Hun pudser vinduet.', 'Hun laver mad.', 'Hun skifter sengetøj.', 'Hun fodrer hunden.'],
            tip: 'Vi pudser vinduer med vand og en vinduesskraber (#9).'
        },
        {
            q: 'Planterne i vinduet er tørre og mangler vand. Hvad gør vi?',
            target: 'Vi vander blomsterne.',
            options: ['Vi vander blomsterne.', 'Vi støver hylderne af.', 'Vi renser toilettet.', 'Vi fejer gulvet.'],
            tip: 'Vi vander blomsterne med en vandkande (#10).'
        },
        {
            q: 'Det er morgen, og vi vil have frisk luft ind i soveværelset. Hvad gør vi?',
            target: 'Vi lufter ud.',
            options: ['Vi lufter ud.', 'Vi bager i ovnen.', 'Vi vasker op.', 'Vi dækker bord.'],
            tip: 'Når vi åbner vinduet for at få frisk luft, lufter vi ud (#1).'
        },
        {
            q: 'Der ligger legetøj overalt på gulvet i værelset. Hvad gør drengen?',
            target: 'Han rydder sit legetøj op.',
            options: ['Han rydder sit legetøj op.', 'Han sætter mælk i køleskabet.', 'Han pudser vinduer.', 'Han laver varm mad.'],
            tip: 'Drengen samler legetøjet i kurven og rydder op (#4).'
        },
        {
            q: 'Vi skal snart spise aftensmad. Hvad gør vi ved spisebordet?',
            target: 'Vi dækker bord med tallerkener og glas.',
            options: ['Vi dækker bord med tallerkener og glas.', 'Vi skifter sengetøj.', 'Vi renser toilettet.', 'Vi støvsuger tæppet.'],
            tip: 'Før maden dækker vi bord med tallerkener, glas og bestik (#17).'
        },
        {
            q: 'Vi er færdige med at spise, og bordet er vådt. Hvad gør hun?',
            target: 'Hun tørrer bordet af med en klud.',
            options: ['Hun tørrer bordet af med en klud.', 'Hun reder sengen.', 'Hun bager brød.', 'Hun lufter ud.'],
            tip: 'Efter maden tørrer vi bordet af med en klud (#16).'
        },
        {
            q: 'Skraldespanden i køkkenet er helt fuld. Hvad gør drengen?',
            target: 'Han bærer skraldeposen ud.',
            options: ['Han bærer skraldeposen ud.', 'Han vander blomster.', 'Han støver bøger af.', 'Han reder sengen.'],
            tip: 'Drengen bærer skraldeposen ud til affaldsspandene (#20).'
        },
        {
            q: 'Hunden og katten står ved deres skål og er sultne. Hvad gør vi?',
            target: 'Vi fodrer hunden og katten.',
            options: ['Vi fodrer hunden og katten.', 'Vi fylder opvaskemaskinen.', 'Vi gør badeværelset rent.', 'Vi pudser vinduer.'],
            tip: 'Vi fodrer hunden og katten (giver dem mad i skålen, #18).'
        },
        {
            q: 'Vi har købt mælk og ost i supermarkedet. Hvor sætter vi varerne ind?',
            target: 'Vi sætter varerne i køleskabet.',
            options: ['Vi sætter varerne i køleskabet.', 'Vi sætter dem i opvaskemaskinen.', 'Vi lægger dem i sengen.', 'Vi bærer dem ud i skraldespanden.'],
            tip: 'Mælk og kolde madvarer sættes ind i køleskabet (#15).'
        }
    ];

    let ahQIdx = 0;
    let ahQScore = 0;

    function renderAhComprehension() {
        ahQuizCard.innerHTML = '';
        const item = ahComprehensionTasks[ahQIdx];

        const scoreBar = document.createElement('div');
        scoreBar.className = 'detective-score-bar';
        scoreBar.innerHTML = `
            <span style="font-weight: 800; color: #fbbf24;">Forståelsesopgave ${ahQIdx + 1} / ${ahComprehensionTasks.length}</span>
            <span style="font-weight: 800; color: #4ade80;">Point: ${ahQScore}</span>
        `;
        ahQuizCard.appendChild(scoreBar);

        const clueBox = document.createElement('div');
        clueBox.className = 'detective-clue-box';
        clueBox.innerHTML = `
            <div class="detective-clue-title">Hvad gør man i hjemmet? (DU1, modul 4)</div>
            <div class="detective-clue-text">"${item.q}"</div>
            <button class="listen-btn" id="btn-listen-ah-q" style="margin: 0 auto; padding: 0.5rem 1rem; font-size: 0.85rem;">
                Lyt til spørgsmål
            </button>
        `;
        clueBox.querySelector('#btn-listen-ah-q').onclick = () => speakDanish(item.q);
        ahQuizCard.appendChild(clueBox);

        const optsGrid = document.createElement('div');
        optsGrid.className = 'detective-options-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'detective-feedback-box';

        let answered = false;

        item.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'detective-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                if (answered) return;
                answered = true;

                const isCorrect = opt === item.target;
                if (isCorrect) {
                    btn.classList.add('correct');
                    ahQScore++;
                    scoreBar.querySelector('span:nth-child(2)').textContent = `Point: ${ahQScore}`;
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                            Helt rigtigt! <strong>${opt}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.95rem;">${item.tip}</div>
                    `;
                    speakDanish(opt);
                } else {
                    btn.classList.add('wrong');
                    optsGrid.querySelectorAll('.detective-opt-btn').forEach(b => {
                        if (b.textContent === item.target) b.classList.add('correct');
                    });
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                            Det rigtige svar er: <strong>${item.target}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.95rem;">${item.tip}</div>
                    `;
                }

                feedbackBox.style.display = 'block';

                const nextBtn = document.createElement('button');
                nextBtn.className = 'detective-next-btn';
                nextBtn.innerHTML = ahQIdx + 1 < ahComprehensionTasks.length
                    ? `<span>Næste spørgsmål</span> →`
                    : `<span>Se dit resultat</span>`;
                nextBtn.onclick = () => {
                    if (ahQIdx + 1 < ahComprehensionTasks.length) {
                        ahQIdx++;
                        renderAhComprehension();
                    } else {
                        ahQuizCard.innerHTML = `
                            <div style="text-align: center; padding: 2rem 1rem;">
                                <h2 style="font-size: 1.8rem; color: #fbbf24; margin-bottom: 0.6rem;">Flot klaret!</h2>
                                <p style="font-size: 1.2rem; color: #f8fafc; margin-bottom: 1.5rem;">
                                    Du fik <strong>${ahQScore}</strong> ud af <strong>${ahComprehensionTasks.length}</strong> rigtige!
                                </p>
                                <button class="detective-next-btn" id="btn-restart-ah-q">Prøv igen</button>
                            </div>
                        `;
                        ahQuizCard.querySelector('#btn-restart-ah-q').onclick = () => {
                            ahQIdx = 0;
                            ahQScore = 0;
                            renderAhComprehension();
                        };
                    }
                };
                feedbackBox.appendChild(nextBtn);
            };
            optsGrid.appendChild(btn);
        });

        ahQuizCard.appendChild(optsGrid);
        ahQuizCard.appendChild(feedbackBox);
    }

    renderAhComprehension();
    ahForstaaelseSection.appendChild(ahQuizCard);

    // -------------------------------------------------------------------------
    // DEL 3: SÆTNINGSBYGNING MED DE NYE TERMER (PUSLESPIL + TRIN-FOR-TRIN)
    // -------------------------------------------------------------------------
    const ahBuilderCard = document.createElement('div');
    ahBuilderCard.className = 'builder-card';

    const ahIntroBanner = document.createElement('div');
    ahIntroBanner.className = 'saetning-intro-banner';
    ahIntroBanner.innerHTML = `
        <span class="saetning-intro-badge">Sætningsbygning (Andet husarbejde)</span>
        <h2 class="saetning-intro-title">Byg sætninger med de 20 nye aktiviteter</h2>
        <p class="saetning-intro-desc">
            Træn korte hverdagssætninger med verbet på 2. plads (DU1, modul 4).
        </p>
    `;
    ahBuilderCard.appendChild(ahIntroBanner);

    const ahSubTabs = document.createElement('div');
    ahSubTabs.className = 'saetning-sub-tabs';
    ahSubTabs.innerHTML = `
        <button class="saetning-sub-tab-btn active" data-ahst="puzzle">
            1. Pusleopgaver (8 sætninger)
        </button>
        <button class="saetning-sub-tab-btn" data-ahst="step">
            2. Trin-for-trin sætningsbygger
        </button>
    `;
    ahBuilderCard.appendChild(ahSubTabs);

    const ahPuzzleBox = document.createElement('div');
    ahPuzzleBox.className = 'saetning-sub-panel active';

    const ahStepBox = document.createElement('div');
    ahStepBox.className = 'saetning-sub-panel';

    ahBuilderCard.appendChild(ahPuzzleBox);
    ahBuilderCard.appendChild(ahStepBox);

    ahSubTabs.querySelectorAll('.saetning-sub-tab-btn').forEach(btn => {
        btn.onclick = () => {
            ahSubTabs.querySelectorAll('.saetning-sub-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.ahst === 'puzzle') {
                ahPuzzleBox.classList.add('active');
                ahStepBox.classList.remove('active');
            } else {
                ahStepBox.classList.add('active');
                ahPuzzleBox.classList.remove('active');
            }
        };
    });

    // A. Pusleopgaver med de nye termer
    (function setupAhPuzzle(container) {
        const tasks = [
            {
                question: 'Hvad laver manden i stuen?',
                correct: ['I stuen', 'støvsuger', 'manden', 'gulvet.'],
                scrambled: ['støvsuger', 'gulvet.', 'I stuen', 'manden'],
                ruleTip: 'Stedet "I stuen" står på 1. plads, og verbet "støvsuger" står på 2. plads.'
            },
            {
                question: 'Hvad gør hun i soveværelset hver morgen?',
                correct: ['Hver morgen', 'reder', 'hun', 'sengen.'],
                scrambled: ['reder', 'sengen.', 'hun', 'Hver morgen'],
                ruleTip: 'Tidsudtrykket "Hver morgen" står først, og verbet "reder" står på 2. plads.'
            },
            {
                question: 'Hvad laver kvinden ved vinduet?',
                correct: ['Om lørdagen', 'pudser', 'hun', 'vinduer.'],
                scrambled: ['vinduer.', 'Om lørdagen', 'pudser', 'hun'],
                ruleTip: 'Verbet "pudser" står på 2. plads lige efter "Om lørdagen".'
            },
            {
                question: 'Hvad gør drengen på værelset?',
                correct: ['På værelset', 'rydder', 'drengen', 'legetøj op.'],
                scrambled: ['drengen', 'legetøj op.', 'På værelset', 'rydder'],
                ruleTip: 'Verbet "rydder" står på 2. plads.'
            },
            {
                question: 'Hvad laver manden i køkkenet?',
                correct: ['I køkkenet', 'laver', 'han', 'mad.'],
                scrambled: ['mad.', 'laver', 'I køkkenet', 'han'],
                ruleTip: 'I køkkenet (1) + laver (2) + han (3) + mad (4).'
            },
            {
                question: 'Hvad gør kvinden efter maden?',
                correct: ['Efter maden', 'tørrer', 'hun', 'bordet af.'],
                scrambled: ['tørrer', 'bordet af.', 'Efter maden', 'hun'],
                ruleTip: 'Efter maden (1) + tørrer (2) + hun (3) + bordet af (4).'
            },
            {
                question: 'Hvad gør drengen med skraldeposen?',
                correct: ['Om aftenen', 'bærer', 'drengen', 'skrald ud.'],
                scrambled: ['skrald ud.', 'Om aftenen', 'drengen', 'bærer'],
                ruleTip: 'Om aftenen (1) + bærer (2) + drengen (3) + skrald ud (4).'
            },
            {
                question: 'Hvad gør vi med blomsterne i vinduet?',
                correct: ['I dag', 'vander', 'vi', 'blomsterne.'],
                scrambled: ['blomsterne.', 'vi', 'I dag', 'vander'],
                ruleTip: 'I dag (1) + vander (2) + vi (3) + blomsterne (4).'
            }
        ];

        let currentIdx = 0;
        let userSlots = [null, null, null, null];
        const doneSet = new Set();

        const wrap = document.createElement('div');
        wrap.className = 'puzzle-wrapper';

        const slotPrompts = [
            { text: 'Hvornår / Hvor?', grammar: 'Tid / Sted (1)', colorClass: 'slot-tid', tagClass: 'tag-tid' },
            { text: 'Hvad gør man?', grammar: 'Verbum (2)', colorClass: 'slot-verbum', tagClass: 'tag-verbum' },
            { text: 'Hvem?', grammar: 'Subjekt (3)', colorClass: 'slot-subjekt', tagClass: 'tag-subjekt' },
            { text: 'Hvad?', grammar: 'Objekt (4)', colorClass: 'slot-objekt', tagClass: 'tag-objekt' }
        ];

        function renderTask() {
            wrap.innerHTML = '';
            userSlots = [null, null, null, null];
            const task = tasks[currentIdx];

            const header = document.createElement('div');
            header.className = 'puzzle-header';

            const pillsRow = document.createElement('div');
            pillsRow.className = 'puzzle-pills-row';
            tasks.forEach((_, i) => {
                const pill = document.createElement('button');
                pill.className = `puzzle-pill ${i === currentIdx ? 'active' : ''} ${doneSet.has(i) ? 'completed' : ''}`;
                pill.textContent = i + 1;
                pill.onclick = () => {
                    currentIdx = i;
                    renderTask();
                };
                pillsRow.appendChild(pill);
            });
            header.appendChild(pillsRow);

            const qCard = document.createElement('div');
            qCard.className = 'puzzle-question-card';
            qCard.innerHTML = `<h3 class="puzzle-question-title">${task.question}</h3>`;
            header.appendChild(qCard);

            wrap.appendChild(header);

            const slotsContainer = document.createElement('div');
            slotsContainer.className = 'puzzle-slots';
            slotPrompts.forEach((p, idx) => {
                const slot = document.createElement('div');
                slot.className = `puzzle-slot ${p.colorClass}`;
                slot.onclick = () => {
                    if (userSlots[idx]) {
                        userSlots[idx] = null;
                        updateUI();
                    }
                };
                slotsContainer.appendChild(slot);
            });
            wrap.appendChild(slotsContainer);

            const bank = document.createElement('div');
            bank.className = 'puzzle-word-bank';
            wrap.appendChild(bank);

            const feedback = document.createElement('div');
            feedback.className = 'puzzle-feedback-area';
            wrap.appendChild(feedback);

            function updateUI() {
                slotsContainer.querySelectorAll('.puzzle-slot').forEach((s, idx) => {
                    const w = userSlots[idx];
                    const p = slotPrompts[idx];
                    if (w) {
                        s.classList.add('filled');
                        s.innerHTML = `
                            <span class="slot-badge-num">${idx + 1}</span>
                            <div class="slot-word-content">${w}</div>
                            <span class="slot-grammar-tag ${p.tagClass}">[${p.grammar}]</span>
                            <span class="slot-remove-btn">✕</span>
                        `;
                    } else {
                        s.classList.remove('filled');
                        s.innerHTML = `
                            <span class="slot-badge-num">${idx + 1}</span>
                            <div class="slot-hint-text">${p.text}</div>
                            <span class="slot-grammar-tag ${p.tagClass}">[${p.grammar}]</span>
                        `;
                    }
                });

                bank.innerHTML = '';
                task.scrambled.forEach(w => {
                    const btn = document.createElement('button');
                    btn.className = 'puzzle-chip-btn';
                    btn.textContent = w;
                    btn.disabled = userSlots.includes(w);
                    btn.onclick = () => {
                        const empty = userSlots.indexOf(null);
                        if (empty !== -1) {
                            userSlots[empty] = w;
                            updateUI();
                            if (!userSlots.includes(null)) {
                                const ok = userSlots.every((val, i) => val === task.correct[i]);
                                const sent = userSlots.join(' ');
                                if (ok) {
                                    doneSet.add(currentIdx);
                                    feedback.innerHTML = `
                                        <div class="puzzle-msg success">
                                            <div style="font-size: 1.2rem; font-weight: 800;">Helt rigtigt! "<strong>${sent}</strong>"</div>
                                            <div style="font-size: 0.92rem; margin-top: 0.25rem;">${task.ruleTip}</div>
                                        </div>
                                        <div class="puzzle-action-row">
                                            <button class="next-task-btn" id="ah-pz-listen" style="background:#f59e0b; color:#0f172a;">Lyt</button>
                                            <button class="next-task-btn" id="ah-pz-next">Næste →</button>
                                        </div>
                                    `;
                                    feedback.querySelector('#ah-pz-listen').onclick = () => speakDanish(sent);
                                    feedback.querySelector('#ah-pz-next').onclick = () => {
                                        currentIdx = (currentIdx + 1) % tasks.length;
                                        renderTask();
                                    };
                                    speakDanish(sent);
                                } else {
                                    feedback.innerHTML = `
                                        <div class="puzzle-msg error">Prøv igen! Husk at verbet skal stå på 2. plads.</div>
                                        <div class="puzzle-action-row">
                                            <button class="retry-task-btn" id="ah-pz-retry">Prøv igen</button>
                                        </div>
                                    `;
                                    feedback.querySelector('#ah-pz-retry').onclick = () => {
                                        userSlots = [null, null, null, null];
                                        feedback.innerHTML = '';
                                        updateUI();
                                    };
                                }
                            }
                        }
                    };
                    bank.appendChild(btn);
                });
            }

            updateUI();
        }

        renderTask();
        container.appendChild(wrap);
    })(ahPuzzleBox);

    // B. Trin-for-trin sætningsbygger med de nye termer
    (function setupAhStepBuilder(container) {
        const categories = [
            {
                q: '1. Hvornår eller hvor? (1. plads)',
                grammar: 'Tid / Sted (1)',
                rowClass: 'row-tid',
                selClass: 'sel-tid',
                options: ['Hver morgen', 'Om eftermiddagen', 'Efter maden', 'I stuen', 'I køkkenet', 'På badeværelset']
            },
            {
                q: '2. Hvad gør man? (Verbum på 2. plads)',
                grammar: 'Verbum (2)',
                rowClass: 'row-verbum',
                selClass: 'sel-verbum',
                options: ['støvsuger', 'reder', 'pudser', 'vander', 'vasker', 'tørrer', 'dækker', 'fejer', 'fodrer']
            },
            {
                q: '3. Hvem? (Subjekt på 3. plads)',
                grammar: 'Subjekt (3)',
                rowClass: 'row-subjekt',
                selClass: 'sel-subjekt',
                options: ['jeg', 'vi', 'hun', 'han', 'drengen', 'familien']
            },
            {
                q: '4. Hvad? (Objekt på 4. plads)',
                grammar: 'Objekt (4)',
                rowClass: 'row-objekt',
                selClass: 'sel-objekt',
                options: ['gulvet', 'sengen', 'vinduerne', 'blomsterne', 'op', 'bordet af', 'bord', 'hunden og katten']
            }
        ];

        let selections = ['Hver morgen', 'reder', 'jeg', 'sengen'];

        const wrapper = document.createElement('div');
        wrapper.className = 'step-builder-wrapper';

        const outputBox = document.createElement('div');
        outputBox.className = 'live-sentence-display';

        function updateLive() {
            outputBox.innerHTML = `
                <div class="live-badge-label">Din sætning med nye husarbejde-ord</div>
                <div class="live-sentence-text">
                    <span class="word-color-tid">${selections[0]}</span> 
                    <span class="word-color-verbum">${selections[1]}</span> 
                    <span class="word-color-subjekt">${selections[2]}</span> 
                    <span class="word-color-objekt">${selections[3]}</span>.
                </div>
                <button class="listen-btn" id="btn-ah-live-listen" style="margin-top: 0.5rem; padding: 0.65rem 1.4rem;">
                    Lyt til sætningen
                </button>
            `;
            outputBox.querySelector('#btn-ah-live-listen').onclick = () => {
                speakDanish(`${selections[0]} ${selections[1]} ${selections[2]} ${selections[3]}`);
            };
        }

        categories.forEach((cat, catIdx) => {
            const row = document.createElement('div');
            row.className = `builder-guided-row ${cat.rowClass}`;

            const title = document.createElement('div');
            title.className = 'builder-guided-title';
            title.innerHTML = `
                <span>${cat.q}</span>
                <span class="slot-grammar-tag ${cat.rowClass.replace('row-', 'tag-')}">[${cat.grammar}]</span>
            `;
            row.appendChild(title);

            const chipsWrap = document.createElement('div');
            chipsWrap.className = 'builder-options-chips';

            cat.options.forEach(opt => {
                const chip = document.createElement('button');
                const isSelected = selections[catIdx] === opt;
                chip.className = `builder-choice-chip ${isSelected ? 'selected ' + cat.selClass : ''}`;
                chip.textContent = opt;
                chip.onclick = () => {
                    selections[catIdx] = opt;
                    row.querySelectorAll('.builder-choice-chip').forEach(c => {
                        c.className = 'builder-choice-chip';
                    });
                    chip.classList.add('selected', cat.selClass);
                    updateLive();
                };
                chipsWrap.appendChild(chip);
            });

            row.appendChild(chipsWrap);
            wrapper.appendChild(row);
        });

        wrapper.appendChild(outputBox);
        container.appendChild(wrapper);
        updateLive();
    })(ahStepBox);

    ahSaetningSection.appendChild(ahBuilderCard);

    panelAndet.appendChild(ahVrimmelSection);
    panelAndet.appendChild(ahForstaaelseSection);
    panelAndet.appendChild(ahSaetningSection);
    panelsHolder.appendChild(panelAndet);

    // =========================================================================
    // NEDERST: Melodi- og lydafspiller (YouTube)
    // =========================================================================
    const audioFooterCard = document.createElement('div');
    audioFooterCard.className = 'song-audio-footer-card';
    audioFooterCard.innerHTML = `
        <div class="saf-header">
            <div class="saf-left">
                <div class="saf-text">
                    <div class="saf-title">${t('sange_saf_title', isEn ? 'Listen to the Melody: "Så går vi rundt om en enebærbusk"' : 'Lyt til melodien: "Så går vi rundt om en enebærbusk"')}</div>
                    <div class="saf-sub">${t('sange_saf_sub', isEn ? 'Sing along and play the cheerful traditional melody' : 'Syng med og lyt til den klassiske melodi til sanglegen her')}</div>
                </div>
            </div>
            <div class="saf-actions">
                <a href="https://youtu.be/Gr5KXEBk5F4?si=m2tnGwcTjOeVaGbT" target="_blank" rel="noopener noreferrer" class="saf-youtube-btn">
                    ${t('sange_saf_open_yt', isEn ? 'Play on YouTube' : 'Hør melodi på YouTube')}
                </a>
                <button class="saf-embed-toggle-btn" id="btn-toggle-yt-player">
                    <span id="yt-toggle-label">${t('sange_saf_embed', isEn ? 'Show Player' : 'Vis afspiller')}</span>
                </button>
            </div>
        </div>
        <div class="saf-embed-container" id="yt-embed-box" style="display: none;">
            <iframe 
                width="100%" 
                height="320" 
                src="https://www.youtube-nocookie.com/embed/Gr5KXEBk5F4" 
                title="Så går vi rundt om en enebærbusk - Melodi" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        </div>
    `;

    let ytPlayerOpen = false;
    const toggleBtn = audioFooterCard.querySelector('#btn-toggle-yt-player');
    const embedBox = audioFooterCard.querySelector('#yt-embed-box');
    const toggleLabel = audioFooterCard.querySelector('#yt-toggle-label');

    toggleBtn.onclick = () => {
        ytPlayerOpen = !ytPlayerOpen;
        embedBox.style.display = ytPlayerOpen ? 'block' : 'none';
        toggleBtn.classList.toggle('active', ytPlayerOpen);
        toggleLabel.textContent = ytPlayerOpen 
            ? t('sange_saf_hide_embed', isEn ? 'Hide Player' : 'Skjul afspiller') 
            : t('sange_saf_embed', isEn ? 'Show Player' : 'Vis afspiller');
    };

    viewContainer.appendChild(audioFooterCard);

    // Initial subPath routing check
    if (extraData && extraData.subPath) {
        switchTab(extraData.subPath);
    }

    container.appendChild(viewContainer);
}
