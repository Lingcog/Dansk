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

        /* Tabs Navigation */
        .song-tabs-nav {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.8rem;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 0.5rem;
            overflow-x: auto;
            scrollbar-width: thin;
        }
        .song-tab-btn {
            background: #1e293b;
            color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.65rem 1.1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 0.45rem;
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
           TAB 3: 🕵️ Ord-detektiv (Moderne & Historiske redskaber)
           ---------------------------------------------------- */
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

    // Hero Header
    const hero = document.createElement('div');
    hero.className = 'hero-song-header';
    hero.innerHTML = `
        <div class="hero-song-badge">${t('sange_hero_badge', '🎵 Danske sange & Hverdagsliv')}</div>
        <h1>${t('sange_hero_title', 'Så går vi rundt om en enebærbusk')}</h1>
        <p>${t('sange_hero_desc', 'Syng med på den klassiske danske sangleg, udforsk nutidens husarbejde og 1800-tallets traditioner i tankeboblen, træn naturlig dansk rytme ("TÍD-lig MAN-dag MÓR-gen"), og fejr værdigheden i hverdagens omsorgsarbejde.')}</p>
    `;
    viewContainer.appendChild(hero);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'song-tabs-nav';

    const tabsData = [
        { id: 'tab_vrimmel', icon: '🖼️', label: t('sange_tab_vrimmel', '1. Vrimlebillede & Tankebobbel') },
        { id: 'tab_sang', icon: '🎶', label: t('sange_tab_sang', '2. Syng med & Rytme') },
        { id: 'tab_detektiv', icon: '🕵️', label: t('sange_tab_detektiv', '3. Ord-detektiv ("Rulle tøj" osv.)') },
        { id: 'tab_saetning', icon: '🧩', label: t('sange_tab_saetning', '4. Sætningsbygger & Puslespil') },
        { id: 'tab_udvikling', icon: '⏳', label: t('sange_tab_udvikling', '5. Dengang & nu & Parring') }
    ];

    let currentTab = extraData.activeTab || 'tab_vrimmel';

    tabsData.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `song-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.innerHTML = `<span>${t.icon}</span> ${t.label}`;
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
    // DATA DEFINITION: Hotspots (Nutid + Historisk Tankebobbel)
    // =========================================================================
    const husarbejdeItems = [
        // NUTIDIGE OPGAVER
        {
            id: 'mandag',
            category: 'nutid',
            dag: 'Mandag (Nu)',
            dagEn: 'Monday (Now)',
            icon: '🧺',
            handling: 'at vaske tøj i maskinen',
            handlingEn: 'to wash clothes in the washing machine',
            nutid: 'vasker tøj',
            datid: 'vaskede tøj',
            foerdatid: 'har vasket tøj',
            redskaber: 'en moderne vaskemaskine, flydende vaskemiddel, en vasketøjskurv',
            redskaberEn: 'a modern washing machine, liquid detergent, laundry basket',
            saetning: 'Når vi vasker tøj i dag, doserer vi vaskemidlet og lader maskinen klare det tunge arbejde.',
            saetningEn: 'When we do laundry today, we dose the detergent and let the machine do the heavy work.',
            vaerdighed: 'At vaske tøj er omsorg for familien, som sikrer renlighed og god sundhed i hverdagen.',
            vaerdighedEn: 'Doing laundry is family care that ensures cleanliness and good health in daily life.',
            x: 14,
            y: 55
        },
        {
            id: 'tirsdag',
            category: 'nutid',
            dag: 'Tirsdag (Nu)',
            dagEn: 'Tuesday (Now)',
            icon: '🧼',
            handling: 'at skylle og tømme maskinen',
            handlingEn: 'to rinse & empty the machine',
            nutid: 'skyller / tømmer maskinen',
            datid: 'skyllede / tømte maskinen',
            foerdatid: 'har skyllet / har tømt maskinen',
            redskaber: 'en vasketøjskurv, et skyllemiddel, en centrifuge',
            redskaberEn: 'a laundry basket, fabric softener, spin cycle',
            saetning: 'Når vaskemaskinen er færdig, hjælper drengen med at lægge det rene tøj i kurven.',
            saetningEn: 'When the machine finishes, the boy helps transfer the clean laundry into the basket.',
            vaerdighed: 'Når børn og voksne hjælper hinanden med vasketøjet, styrkes fællesskabet i hjemmet.',
            vaerdighedEn: 'When children and adults help each other with laundry, family cooperation is strengthened.',
            x: 24,
            y: 75
        },
        {
            id: 'onsdag',
            category: 'nutid',
            dag: 'Onsdag (Nu)',
            dagEn: 'Wednesday (Now)',
            icon: '💨',
            handling: 'at tørre tøj på tørrestativ',
            handlingEn: 'to dry clothes on a rack',
            nutid: 'tørrer tøj / hænger tøj op',
            datid: 'tørrede tøj / hængte tøj op',
            foerdatid: 'har tørret tøj / har hængt tøj op',
            redskaber: 'et tørrestativ, tøjklemmer, en tørretumbler',
            redskaberEn: 'a drying rack, clothespins, a tumble dryer',
            saetning: 'Når den milde vind blæser, hænger vi tøjet op på tørrestativet ved den åbne havedør.',
            saetningEn: 'When the gentle breeze blows, we hang the clothes on the drying rack by the open garden door.',
            vaerdighed: 'Naturlig lufttørring sparer strøm, skåner tøjets fibre og dufter vidunderligt af sommer.',
            vaerdighedEn: 'Natural air drying saves electricity, preserves clothing fibers, and smells wonderfully like summer.',
            x: 32,
            y: 45
        },
        {
            id: 'torsdag',
            category: 'nutid',
            dag: 'Torsdag (Nu)',
            dagEn: 'Thursday (Now)',
            icon: '📦',
            handling: 'at folde og lægge tøj sammen',
            handlingEn: 'to fold and put away',
            nutid: 'folder tøj / lægger sammen',
            datid: 'foldede tøj / lagde sammen',
            foerdatid: 'har foldet tøj / har lagt sammen',
            redskaber: 'et rent bord, nydelige bunker, et klædeskab',
            redskaberEn: 'a clean counter, neat stacks, a wardrobe',
            saetning: 'Når tøjet er helt tørt, folder vi det omhyggeligt i bunker og lægger det på plads i skabet.',
            saetningEn: 'When the laundry is dry, we fold it carefully into neat piles and place it in the wardrobe.',
            vaerdighed: 'Et ryddeligt klædeskab skaber ro i sindet og gør morgenerne lette og overskuelige.',
            vaerdighedEn: 'An orderly wardrobe brings peace of mind and makes busy mornings smooth and easy.',
            x: 42,
            y: 42
        },
        {
            id: 'fredag',
            category: 'nutid',
            dag: 'Fredag (Nu)',
            dagEn: 'Friday (Now)',
            icon: '👔',
            handling: 'at stryge med dampstrygejern',
            handlingEn: 'to iron with a modern steam iron',
            nutid: 'stryger skjorter og kjoler',
            datid: 'strøg skjorter og kjoler',
            foerdatid: 'har strøget skjorter og kjoler',
            redskaber: 'et ergonomisk dampstrygejern, et strygebræt, bøjler',
            redskaberEn: 'an ergonomic steam iron, an ironing board, hangers',
            saetning: 'Når vi stryger skjorter, bruger vi varm damp, så alle krøller og folder glattes helt ud.',
            saetningEn: 'When we iron shirts, we use hot steam so that all creases and wrinkles vanish completely.',
            vaerdighed: 'Nystrøget tøj giver personlig værdighed, elegance og selvtillid til fest og arbejde.',
            vaerdighedEn: 'Crisply pressed clothes provide personal dignity, elegance, and confidence for work and gatherings.',
            x: 55,
            y: 56
        },
        {
            id: 'loerdag',
            category: 'nutid',
            dag: 'Lørdag (Nu)',
            dagEn: 'Saturday (Now)',
            icon: '✨',
            handling: 'at vaske gulv med fladmoppe',
            handlingEn: 'to mop the floor with an ergonomic flat mop',
            nutid: 'vasker gulv / gør rent',
            datid: 'vaskede gulv / gjorde rent',
            foerdatid: 'har vasket gulv / har gjort rent',
            redskaber: 'en ergonomisk gulvmoppe, en spand med sæbevand, universalrengøring',
            redskaberEn: 'an ergonomic flat mop, a soapy bucket, all-purpose cleaner',
            saetning: 'Om lørdagen vasker vi gulvet stående oprejst med moppen, så hele huset dufter friskt.',
            saetningEn: 'On Saturday we mop the floor standing upright with the mop so the whole house smells clean.',
            vaerdighed: 'Rene gulve og et hygiejnisk hjem danner den trygge ramme om hele familiens liv.',
            vaerdighedEn: 'Clean floors and a hygienic home form the safe foundation for the whole family life.',
            x: 74,
            y: 62
        },
        {
            id: 'soendag',
            category: 'nutid',
            dag: 'Søndag (Nu)',
            dagEn: 'Sunday (Now)',
            icon: '☕',
            handling: 'at holde fri og hygge sig',
            handlingEn: 'to rest and relax together',
            nutid: 'holder fri / hygger sig',
            datid: 'holdt fri / hyggede sig',
            foerdatid: 'har holdt fri / har hygget sig',
            redskaber: 'en kaffekop, sofaen, tid til familien, søndagsro',
            redskaberEn: 'a coffee cup, the sofa, family time, Sunday peace',
            saetning: 'Om søndagen slapper vi af med kaffe og samtale i et rent, fredeligt og velholdt hjem.',
            saetningEn: 'On Sunday we relax with coffee and conversation in a clean, quiet, and well-kept home.',
            vaerdighed: 'Efter en uges flittigt arbejde er hvilen fuldt fortjent. Hjemmet er familiens trygge havn.',
            vaerdighedEn: 'After a week of diligent care, rest is fully earned. Home is the family safe haven.',
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
            nutid: 'vokser i haven',
            datid: 'voksede i haven',
            foerdatid: 'har vokset i haven',
            redskaber: 'en stedsegrøn enebærbusk, haven, naturen',
            redskaberEn: 'an evergreen juniper bush, garden, nature',
            saetning: 'Gennem vinduet ses den grønne enebærbusk, som har givet navn til den elskede sangleg.',
            saetningEn: 'Through the window sits the green juniper bush that gave name to the beloved singing game.',
            vaerdighed: 'Enebærbusken er stedsegrøn hele vinteren og er et gammelt symbol på sundhed og styrke.',
            vaerdighedEn: 'The juniper bush stays evergreen all winter and is an ancient symbol of health and strength.',
            x: 24,
            y: 35
        },

        // HISTORISK TANKEBOBBEL & FORTIDENS REDSKABER
        {
            id: 'hist_vaske',
            category: 'historisk',
            dag: 'Dengang (Mandag)',
            dagEn: 'In the 1800s (Monday)',
            icon: '🪵',
            handling: 'at vaske på vaskebræt i vaskekar',
            handlingEn: 'to wash on a washboard in a wooden washtub',
            nutid: 'vasker i hånden med vaskebræt',
            datid: 'vaskede i hånden på vaskebræt',
            foerdatid: 'har vasket på vaskebræt',
            redskaber: 'et vaskebræt af zink eller træ, et vaskekar af egetræ, brun sæbe',
            redskaberEn: 'a washboard of zinc or wood, an oak washtub, brown soap',
            saetning: 'I 1800-tallet vaskede kvinderne alt tøj i hånden ved at gnide det hårdt mod et riflet vaskebræt.',
            saetningEn: 'In the 1800s, women washed all clothes by hand by scrubbing hard against a corrugated washboard.',
            vaerdighed: 'Det var et ufatteligt hårdt slid, der sled huden af hænderne i iskoldt vand.',
            vaerdighedEn: 'It was unimaginably hard labor that tore at the skin of their hands in freezing water.',
            x: 64,
            y: 16
        },
        {
            id: 'hist_gruekedel',
            category: 'historisk',
            dag: 'Dengang (Storvask)',
            dagEn: 'In the 1800s (Wash Cauldron)',
            icon: '🔥',
            handling: 'gruekedlen: at koge kogevask',
            handlingEn: 'the wash cauldron: boiling the laundry',
            nutid: 'koger tøj i gruekedlen',
            datid: 'kogte tøj i gruekedlen',
            foerdatid: 'har kogt tøj i gruekedlen',
            redskaber: 'en indmuret gruekedel, åben ild, lud og aske, en træspand',
            redskaberEn: 'a built-in cauldron, open fire, lye and ash, a wooden bucket',
            saetning: 'Vandet blev varmet op i en gruekedel over åben ild, så sengetøjet og arbejdstøjet kunne koges rent.',
            saetningEn: 'Water was heated in a cauldron over an open fire so linens and work clothes could be boiled clean.',
            vaerdighed: 'Ilden og den tunge røg krævede stor agtpågivenhed og fysisk råstyrke.',
            vaerdighedEn: 'The fire and heavy smoke required constant vigilance and immense physical strength.',
            x: 76,
            y: 18
        },
        {
            id: 'hist_rulle',
            category: 'historisk',
            dag: 'Dengang (Torsdag)',
            dagEn: 'In the 1800s (Thursday)',
            icon: '🪓',
            handling: 'at rulle tøj med mangelbræt ("rulle vort tøj")',
            handlingEn: 'to roll linen with a mangle board ("rulle vort tøj")',
            nutid: 'ruller tøj med mangelbræt',
            datid: 'rullede tøj med mangelbræt',
            foerdatid: 'har rullet tøj med mangelbræt',
            redskaber: 'et mangelbræt af udskåret træ, en rullestok, et solidt træbord',
            redskaberEn: 'a carved wooden mangle board, a wooden roller, a sturdy table',
            saetning: 'I sangen synger man: "Så gør vi sådan, når vi ruller vort tøj" – her brugte man et tungt mangelbræt til at glatte linned.',
            saetningEn: 'In the song they sing: "when we roll our clothes" – here they used a heavy mangle board over a rolling pin.',
            vaerdighed: 'Mangelbrættet var ofte en kærlighedsgave fra brudgommen med fine udskæringer af heste og hjerter.',
            vaerdighedEn: 'The mangle board was often a courtship gift carved with horses and hearts, passed down with love.',
            x: 93,
            y: 24
        },
        {
            id: 'hist_toerre',
            category: 'historisk',
            dag: 'Dengang (Onsdag)',
            dagEn: 'In the 1800s (Wednesday)',
            icon: '🌳',
            handling: 'at tørre tøj på tørresnor i det fri',
            handlingEn: 'to dry linen on a clothesline between trees',
            nutid: 'hænger tøj på tørresnor',
            datid: 'hængte tøj på tørresnor',
            foerdatid: 'har hængt tøj på tørresnor',
            redskaber: 'en tørresnor af hamp, tøjklemmer af træ, sol og vind',
            redskaberEn: 'a hemp clothesline, wooden pegs, sun and wind',
            saetning: 'Det hvide linned blev hængt ud i haven mellem store træer, så solen kunne blege stoffet naturligt hvidt.',
            saetningEn: 'White linens were hung outdoors between tall trees so the sun could naturally bleach the fabric white.',
            vaerdighed: 'Solen og vinden var naturens eget blegemiddel og gav tøjet en frisk, ren duft.',
            vaerdighedEn: 'Sun and wind were nature’s own bleaching agents, bestowing a fresh, crisp outdoor scent.',
            x: 91,
            y: 11
        },
        {
            id: 'hist_stryge',
            category: 'historisk',
            dag: 'Dengang (Fredag)',
            dagEn: 'In the 1800s (Friday)',
            icon: '🪨',
            handling: 'at stryge med et tungt kulstrygejern',
            handlingEn: 'to iron with a heavy charcoal iron',
            nutid: 'stryger med kulstrygejern',
            datid: 'strøg med kulstrygejern',
            foerdatid: 'har strøget med kulstrygejern',
            redskaber: 'et støbejerns-strygejern med hængsellåg, glødende trækul',
            redskaberEn: 'a cast iron iron with a hinged lid, glowing hot coals',
            saetning: 'Jernet blev fyldt med glødende kul fra ilden, og det vejede flere kilo at føre hen over skjortebrysterne.',
            saetningEn: 'The iron was filled with glowing coals from the hearth and weighed several kilos to press across shirts.',
            vaerdighed: 'Det krævede stor øvelse, for gløderne måtte ikke drysse ud og svitse det fine tøj.',
            vaerdighedEn: 'It required great skill to ensure the flying sparks did not singe the precious white linens.',
            x: 84,
            y: 34
        },
        {
            id: 'hist_skure',
            category: 'historisk',
            dag: 'Dengang (Lørdag)',
            dagEn: 'In the 1800s (Saturday)',
            icon: '🧽',
            handling: 'at skure gulv på knæ ("skure vort gulv")',
            handlingEn: 'to scrub the floor on knees with sand and brush',
            nutid: 'skurer gulv på knæ',
            datid: 'skurede gulv på knæ',
            foerdatid: 'har skuret gulv på knæ',
            redskaber: 'en stiv skurebørste af svinebørster, fint hvidt sand, ludvand og spand',
            redskaberEn: 'a stiff scrubbing brush, fine white sand, lye water and bucket',
            saetning: 'I sangen synger man: "når vi skurer vort gulv" – pigerne lå på bare knæ og skurede rå fyrretræsplanker med sand.',
            saetningEn: 'In the song they sing: "when we scour our floor" – maids knelt on bare knees scrubbing raw planks with sand.',
            vaerdighed: 'Skurebørsten og det fine sand gjorde træet kridhvidt til søndag, men sled hårdt på ryg og knæ.',
            vaerdighedEn: 'The brush and fine white sand made the wood pristine for Sunday, but severely wore down their knees.',
            x: 92,
            y: 48
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
        <button class="vrimmel-filter-btn" data-filter="nutid">${t('sange_filter_nutid', isEn ? '✨ Present (Modern home)' : '🏠 Nutidens hjem (7)')}</button>
        <button class="vrimmel-filter-btn" data-filter="historisk">${t('sange_filter_historisk', isEn ? '⏳ Historical (Thought bubble)' : '💭 Historisk tankebobbel (6)')}</button>
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
    img.alt = 'Så går vi rundt om en enebærbusk - Vrimlebillede med moderne husarbejde og historisk tankebobbel';
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
                    <span class="badge-pill badge-verbum">🔴 ${t('sange_action_label', isEn ? 'Action' : 'Handling')}</span>
                    <span class="badge-pill ${item.category === 'historisk' ? 'badge-historisk-tag' : 'badge-vaerdighed'}">
                        ${item.category === 'historisk' ? t('sange_filter_historisk', isEn ? '⏳ 1800s Rural Heritage' : '⏳ 1800-tallets kulturarv') : t('sange_tribute_badge', isEn ? '✨ Modern Domestic Care' : '✨ Moderne omsorgsarbejde')}
                    </span>
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
    // TAB 2: 🎶 SYNG MED & RYTME (Tekst, Melodi, Trykfordeling & Lytteøvelse)
    // =========================================================================
    const panelSang = document.createElement('div');
    panelSang.className = `song-panel ${currentTab === 'tab_sang' ? 'active' : ''}`;
    panelSang.dataset.panel = 'tab_sang';

    const lyricsContainer = document.createElement('div');
    lyricsContainer.className = 'song-lyrics-container';

    // Musical Staff Banner
    const musicBanner = document.createElement('div');
    musicBanner.className = 'music-staff-banner';
    musicBanner.innerHTML = `
        <div class="msb-left">
            <div class="msb-icon">🎼</div>
            <div class="msb-info">
                <div class="msb-title">${t('sange_msb_title', 'Melodi: Dansk traditionel sangleg')}</div>
                <div class="msb-sub">${t('sange_msb_sub', '6/8 takt · Muntert tempo · Naturlig dansk sætningsrytme')}</div>
            </div>
        </div>
        <div style="display: flex; gap: 0.8rem; align-items: center; flex-wrap: wrap;">
            <a href="https://youtu.be/Gr5KXEBk5F4?si=m2tnGwcTjOeVaGbT" target="_blank" rel="noopener noreferrer" class="saf-youtube-btn">
                <span>▶️</span> ${t('sange_msb_open_yt', isEn ? 'Play Melody on YouTube' : 'Hør melodi på YouTube')}
            </a>
        </div>
    `;
    lyricsContainer.appendChild(musicBanner);

    // Rhythm & Stress Guide Banner
    const rhythmBar = document.createElement('div');
    rhythmBar.className = 'rhythm-guide-banner';
    rhythmBar.innerHTML = `
        <div class="rgb-icon">🥁</div>
        <div class="rgb-content">
            <strong style="color: #fbbf24; font-size: 1.05rem;">
                ${t('sange_rhythm_guide_title', isEn ? 'Danish Sentence Rhythm & Word Stress' : 'Dansk rytme og trykfordeling')}
            </strong>
            <p style="color: #cbd5e1; font-size: 0.95rem; margin: 0.25rem 0 0; line-height: 1.5;">
                ${t('sange_rhythm_guide_desc', isEn 
                    ? 'The highlighted uppercase syllables show where the natural sentence stress falls (e.g. ”TÍD-lig MAN-dag MÓR-gen”). Practice singing or reading along with the beat!' 
                    : 'De markerede stavelser med store bogstaver og accent viser det naturlige rytmiske tryk i sætningerne (f.eks. ”<span class="stress-syllable">TÍD</span>-lig <span class="stress-syllable">MÁN</span>-dag <span class="stress-syllable">MÓR</span>-gen”). Læg mærke til, hvordan sangens rytme følger hverdagsdanskens naturlige betoning!')}
            </p>
        </div>
    `;
    lyricsContainer.appendChild(rhythmBar);

    // Chorus
    const chorusCard = document.createElement('div');
    chorusCard.className = 'chorus-card';
    chorusCard.innerHTML = `
        <span class="chorus-tag">🌿 ${t('sange_chorus_tag', isEn ? 'Chorus of the Song Game' : 'Sanglegens faste omkvæd')}</span>
        <div class="chorus-text">
            Så <span class="stress-syllable">GÅR</span> vi rundt om en <span class="stress-syllable">É</span>-ne-bær-busk,<br>
            <span class="stress-syllable">É</span>-ne-bær-busk, <span class="stress-syllable">É</span>-ne-bær-busk.<br>
            Så <span class="stress-syllable">GÅR</span> vi rundt om en <span class="stress-syllable">É</span>-ne-bær-busk<br>
            <span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">MÁN</span>-dag <span class="stress-syllable">MÓR</span>-gen!
        </div>
        <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; margin-top: 0.8rem;">
            <button class="listen-btn" id="btn-listen-chorus">
                <span>🔊</span> ${t('sange_listen_chorus', isEn ? 'Listen to Chorus' : 'Lyt til omkvædet')}
            </button>
            <a href="https://youtu.be/Gr5KXEBk5F4?si=m2tnGwcTjOeVaGbT" target="_blank" rel="noopener noreferrer" class="listen-btn" style="background: #ef4444; color: white; text-decoration: none;">
                <span>▶️</span> ${t('sange_msb_open_yt', isEn ? 'Play Melody on YouTube' : 'Hør melodi på YouTube')}
            </a>
        </div>
    `;
    chorusCard.querySelector('#btn-listen-chorus').onclick = () => {
        speakDanish('Så går vi rundt om en enebærbusk, enebærbusk, enebærbusk. Så går vi rundt om en enebærbusk, tidlig en mandag morgen!');
    };
    lyricsContainer.appendChild(chorusCard);

    // Verses Data with permanent rhythm/stress marks
    const versesData = [
        {
            id: 'mandag',
            dag: 'Mandag',
            dagEn: 'Monday',
            icon: '🧺',
            action: 'vasker',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">VÁS</span>-ker vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">VÁS</span>-ker vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">VÁS</span>-ker vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">VÁS</span>-ker vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">MÁN</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi vasker vort tøj, vasker vort tøj, vasker vort tøj. Så gør vi sådan, når vi vasker vort tøj, tidlig en mandag morgen.',
            modernNote: isEn ? 'Modern: "når vi vasker vores tøj" (vores instead of archaic vort).' : 'Moderne: "når vi vasker vores tøj" (i dag siger vi vores frem for vort).'
        },
        {
            id: 'tirsdag',
            dag: 'Tirsdag',
            dagEn: 'Tuesday',
            icon: '🧼',
            action: 'skyller',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">SKÝL</span>-ler vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">SKÝL</span>-ler vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">SKÝL</span>-ler vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">SKÝL</span>-ler vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">TÍRS</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi skyller vort tøj, skyller vort tøj, skyller vort tøj. Så gør vi sådan, når vi skyller vort tøj, tidlig en tirsdag morgen.',
            modernNote: isEn ? 'Drying & rinsing rhythm in 6/8 meter.' : '6/8 takt med tryk på ugedagen: TÍRS-dag MÓR-gen.'
        },
        {
            id: 'onsdag',
            dag: 'Onsdag',
            dagEn: 'Wednesday',
            icon: '💨',
            action: 'tørrer',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">TØR</span>-rer vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TØR</span>-rer vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">TØR</span>-rer vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">TØR</span>-rer vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">ÓNS</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi tørrer vort tøj, tørrer vort tøj, tørrer vort tøj. Så gør vi sådan, når vi tørrer vort tøj, tidlig en onsdag morgen.',
            modernNote: isEn ? 'Notice inversion: "Så gør vi sådan" (Så + gør + vi).' : 'Bemærk inversion: "Så gør vi sådan" (Forfelt + Verbum + Subjekt).'
        },
        {
            id: 'torsdag',
            dag: 'Torsdag',
            dagEn: 'Thursday',
            icon: '🪓',
            action: 'ruller & folder',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">RÚL</span>-ler vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">RÚL</span>-ler vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">RÚL</span>-ler vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">RÚL</span>-ler vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">TÓRS</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi ruller vort tøj, ruller vort tøj, ruller vort tøj. Så gør vi sådan, når vi ruller vort tøj, tidlig en torsdag morgen.',
            modernNote: isEn ? 'Historically: "ruller vort tøj" (mangelbræt). Today: "folder tøjet sammen".' : 'Historisk: "ruller vort tøj" med mangelbræt og rulle. I dag: vi folder tøjet sammen.'
        },
        {
            id: 'fredag',
            dag: 'Fredag',
            dagEn: 'Friday',
            icon: '👔',
            action: 'stryger',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">STRÝ</span>-ger vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">STRÝ</span>-ger vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">STRÝ</span>-ger vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">STRÝ</span>-ger vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">FRÉ</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi stryger vort tøj, stryger vort tøj, stryger vort tøj. Så gør vi sådan, når vi stryger vort tøj, tidlig en fredag morgen.',
            modernNote: isEn ? 'Dengang med kulstrygejern · I dag med dampstrygejern.' : 'Dengang med glødende kulstrygejern · I dag med let dampstrygejern.'
        },
        {
            id: 'loerdag',
            dag: 'Lørdag',
            dagEn: 'Saturday',
            icon: '🧽',
            action: 'skurer & vasker gulv',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">SKÚ</span>-rer vort <span class="stress-syllable">GULV</span>,<br><span class="stress-syllable">SKÚ</span>-rer vort <span class="stress-syllable">GULV</span>, <span class="stress-syllable">SKÚ</span>-rer vort <span class="stress-syllable">GULV</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">SKÚ</span>-rer vort <span class="stress-syllable">GULV</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">LØR</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi skurer vort gulv, skurer vort gulv, skurer vort gulv. Så gør vi sådan, når vi skurer vort gulv, tidlig en lørdag morgen.',
            modernNote: isEn ? 'Historically: "skurer vort gulv" on bare knees with sand and brush.' : 'Historisk: "skurer vort gulv" på knæ med sand og skurebørste.'
        },
        {
            id: 'soendag',
            dag: 'Søndag',
            dagEn: 'Sunday',
            icon: '☕',
            action: 'holder fri & hygger',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">HÓL</span>-der vor <span class="stress-syllable">FRI</span>,<br><span class="stress-syllable">HÓL</span>-der vor <span class="stress-syllable">FRI</span>, <span class="stress-syllable">HÝG</span>-ger os <span class="stress-syllable">BRAVT</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">HÓL</span>-der vor <span class="stress-syllable">FRI</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">SØN</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi holder vor fri, holder vor fri, hygger os bravt. Så gør vi sådan, når vi holder vor fri, tidlig en søndag morgen.',
            modernNote: isEn ? 'Sunday: Rest, reflection, family time, and well-deserved hygge.' : 'Søndag: Velfortjent hvile, ro, familietid og kaffehygge i det rene hjem.'
        }
    ];

    const versesGrid = document.createElement('div');
    versesGrid.className = 'verses-grid';

    versesData.forEach(v => {
        const vCard = document.createElement('div');
        vCard.className = 'verse-card';
        const dayTrans = t(`sange_item_${v.id}_dag`, isEn ? v.dagEn : v.dag);
        const noteTrans = t(`sange_verse_${v.id}_note`, v.modernNote);
        vCard.innerHTML = `
            <div>
                <div class="verse-header">
                    <span class="verse-day-pill">${v.icon} ${v.dag} ${!isDa && dayTrans !== v.dag ? `(${dayTrans})` : ''}</span>
                    <span style="font-size: 0.85rem; color: #94a3b8; font-weight: 700;">${v.action}</span>
                </div>
                <div class="verse-lyrics">${v.textStress}</div>
                <div class="verse-note">💡 ${noteTrans}</div>
            </div>
            <button class="verse-listen-btn">
                <span>🔊</span> ${t('sange_listen_verse', isEn ? 'Listen to verse' : 'Lyt til verset')}
            </button>
        `;
        vCard.querySelector('.verse-listen-btn').onclick = () => {
            speakDanish(v.tts);
        };
        versesGrid.appendChild(vCard);
    });

    lyricsContainer.appendChild(versesGrid);

    // =========================================================================
    // INTERAKTIV LYTTEØVELSE I FANE 2: Små lytteklip
    // =========================================================================
    const listeningQuizCard = document.createElement('div');
    listeningQuizCard.className = 'listening-quiz-card';

    const listeningQuestions = [
        {
            clipText: 'Så gør vi sådan, når vi ruller vort tøj, ruller vort tøj, ruller vort tøj.',
            correct: 'Torsdag – at rulle tøj (mangelbræt)',
            options: ['Torsdag – at rulle tøj (mangelbræt)', 'Mandag – at vaske tøj', 'Fredag – at stryge tøj', 'Lørdag – at skure gulv'],
            tip: 'Verbet er "at rulle tøj" med et mangelbræt, som traditionelt hørte til om torsdagen!'
        },
        {
            clipText: 'Så gør vi sådan, når vi vasker vort tøj, tidlig en mandag morgen.',
            correct: 'Mandag – at vaske tøj',
            options: ['Mandag – at vaske tøj', 'Tirsdag – at skylle tøj', 'Onsdag – at tørre tøj', 'Lørdag – at vaske gulv'],
            tip: 'Mandag var den faste vaskedag for ugens snavsede tøj!'
        },
        {
            clipText: 'Så gør vi sådan, når vi skurer vort gulv, tidlig en lørdag morgen.',
            correct: 'Lørdag – at skure gulv',
            options: ['Lørdag – at skure gulv', 'Onsdag – at tørre tøj', 'Torsdag – at rulle tøj', 'Søndag – at holde fri'],
            tip: 'Lørdag skurede man gulvene rene med børste og sand inden søndag.'
        },
        {
            clipText: 'Så gør vi sådan, når vi stryger vort tøj, tidlig en fredag morgen.',
            correct: 'Fredag – at stryge tøj',
            options: ['Fredag – at stryge tøj', 'Tirsdag – at skylle tøj', 'Mandag – at vaske tøj', 'Onsdag – at tørre tøj'],
            tip: 'Fredag strøg man det tørre og rullede tøj med et varmt strygejern.'
        },
        {
            clipText: 'Så gør vi sådan, når vi tørrer vort tøj, tidlig en onsdag morgen.',
            correct: 'Onsdag – at tørre tøj',
            options: ['Onsdag – at tørre tøj', 'Torsdag – at rulle tøj', 'Fredag – at stryge tøj', 'Mandag – at vaske tøj'],
            tip: 'Onsdag hang tøjet til tørre i den friske blæst!'
        },
        {
            clipText: 'Så gør vi sådan, når vi holder vor fri, hygger os bravt tidlig en søndag morgen.',
            correct: 'Søndag – at holde fri og hygge',
            options: ['Søndag – at holde fri og hygge', 'Lørdag – at skure gulv', 'Torsdag – at rulle tøj', 'Tirsdag – at skylle tøj'],
            tip: 'Søndag var ugens hviledag med fællesskab og velfortjent ro.'
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
    // TAB 3: 🕵️ ORD-DETEKTIV ("Rulle tøj", mangelbræt, moderne & historiske redskaber)
    // =========================================================================
    const panelDetektiv = document.createElement('div');
    panelDetektiv.className = `song-panel ${currentTab === 'tab_detektiv' ? 'active' : ''}`;
    panelDetektiv.dataset.panel = 'tab_detektiv';

    const detectiveCard = document.createElement('div');
    detectiveCard.className = 'detective-card';

    const allDetectiveChallenges = [
        // HISTORISKE REDSKABER
        {
            category: 'historisk',
            clue: 'Gammelt redskab af træ med håndtag og udskæringer, som man rullede frem og tilbage over en træstok for at glatte linned og sengetøj ("at rulle vort tøj").',
            clueEn: 'Historical wooden board with handle and carvings, pressed over a rolling pin to smooth linens ("at rulle vort tøj").',
            target: 'et mangelbræt (at rulle tøj)',
            options: ['et mangelbræt (at rulle tøj)', 'et vaskebræt', 'en skurebørste', 'en gruekedel'],
            explanation: 'Før man havde elektriske strygejern, rullede man tøjet med et mangelbræt og en trævalse. I sangen hedder torsdagen: "når vi ruller vort tøj"!'
        },
        {
            category: 'historisk',
            clue: 'Riflet bræt af træ eller zinkblik, som man gned og skurede det våde, sæbeindsmurte tøj hårdt imod med hænderne.',
            clueEn: 'Corrugated board of wood or zinc that women rubbed wet soapy laundry against by hand.',
            target: 'et vaskebræt',
            options: ['et vaskebræt', 'et mangelbræt (at rulle tøj)', 'et strygejern', 'en tørresnor'],
            explanation: 'Vaskebrættet krævede enormt knofedt og fysisk udholdenhed, når tøjet skulle vaskes rent i iskoldt vand.'
        },
        {
            category: 'historisk',
            clue: 'Kæmpe stor indmuret jerngryde over åben ild, hvor man kogte vand, lud og sæbe til månedens store koge- og linnedvask.',
            clueEn: 'Huge iron cauldron built over an open fire where they boiled water, lye and linen laundry.',
            target: 'en gruekedel',
            options: ['en gruekedel', 'et vaskekar', 'en tørretumbler', 'en kaffekande'],
            explanation: 'Gruekedlen stod ofte i bryggerset eller i et særskilt vaskehus for at koge tøjet fri for snavs og bakterier.'
        },
        {
            category: 'historisk',
            clue: 'Tungt jern med hængslet låg, som man fyldte med glødende trækul fra komfuret for at gøre metallet gloende varmt til strygning.',
            clueEn: 'Heavy cast iron with a hinged lid filled with glowing coals from the hearth to iron shirts.',
            target: 'et kulstrygejern',
            options: ['et kulstrygejern', 'et dampstrygejern', 'et mangelbræt (at rulle tøj)', 'en skurebørste'],
            explanation: 'Kulstrygejernet vejede flere kilo. Kvinderne skulle passe på, at gløder og aske ikke svitsede det hvide tøj.'
        },
        {
            category: 'historisk',
            clue: 'Stiv børste af træ og svinebørster, som man brugte på bare knæ med sand og sæbelud til at skure det rå trægulv kridhvidt ("at skure vort gulv").',
            clueEn: 'Stiff wooden brush used on bare knees with fine sand and lye to scrub wooden floorboards clean.',
            target: 'en skurebørste',
            options: ['en skurebørste', 'en ergonomisk gulvmoppe', 'et vaskebræt', 'et mangelbræt'],
            explanation: 'I sangen hedder lørdagen: "når vi skurer vort gulv". Pigerne lå på knæ i timevis for at få plankerne rene.'
        },
        {
            category: 'historisk',
            clue: 'Stor rund balje af træstave og tøndebånd, som man bar spandevis af vand hen til for at vaske og skylle tøjet.',
            clueEn: 'Large round tub made of wooden staves used to hold water for washing and rinsing laundry.',
            target: 'et vaskekar',
            options: ['et vaskekar', 'en vaskemaskine', 'en gruekedel', 'et tørrestativ'],
            explanation: 'Vaskekaret var tungt at fylde og tømme med vand båret med åg fra brønden.'
        },

        // MODERNE REDSKABER
        {
            category: 'moderne',
            clue: 'Elektrisk hvidvare, som vasker tøjet automatisk rent med vand og sæbe ved 40° eller 60° ved tryk på en knap.',
            clueEn: 'Modern electrical appliance that washes clothes automatically with soap and water at 40° or 60°.',
            target: 'en vaskemaskine',
            options: ['en vaskemaskine', 'et vaskebræt', 'en tørretumbler', 'en gulvmoppe'],
            explanation: 'Vaskemaskinen er en af historiens største opfindelser, der befriede hjemmet for dages hårdt slid.'
        },
        {
            category: 'moderne',
            clue: 'Sæbe i flydende form, som vi måler af i låget og hælder i maskinens sæbeskuffe.',
            clueEn: 'Liquid soap measured into the cap and poured into the machine dispenser.',
            target: 'flydende vaskemiddel',
            options: ['flydende vaskemiddel', 'et skyllemiddel', 'en spand lud', 'en skurebørste'],
            explanation: 'Flydende vaskemiddel opløses hurtigt i vandet og er skånsomt for både tøjets farver og miljøet.'
        },
        {
            category: 'moderne',
            clue: 'Sammenklappeligt stativ af metal, hvor vi hænger våde skjorter og bukser til tørre ved havedøren.',
            clueEn: 'Foldable metal rack where we hang damp shirts and trousers to dry by the garden breeze.',
            target: 'et tørrestativ',
            options: ['et tørrestativ', 'et strygebræt', 'en vaskemaskine', 'et klædeskab'],
            explanation: 'Tørrestativet gør det let at lade tøjet tørre i den milde brise ved den åbne havedør.'
        },
        {
            category: 'moderne',
            clue: 'Maskine med roterende tromle og varm luft, som gør håndklæder bløde og tørre på kort tid.',
            clueEn: 'Machine with a rotating drum and warm air that dries towels quickly and softly.',
            target: 'en tørretumbler',
            options: ['en tørretumbler', 'en vaskemaskine', 'et dampstrygejern', 'en gulvmoppe'],
            explanation: 'Tørretumbleren sparer tid på regnvejrsdage og gør sengetøj og håndklæder vidunderligt bløde.'
        },
        {
            category: 'moderne',
            clue: 'Let apparat med teflonsål og varm damp, der udglatter alle krøller og folder på en skjorte uden røg eller kul.',
            clueEn: 'Light appliance with steam and a smooth sole that glides easily over shirts without smoke or coals.',
            target: 'et dampstrygejern',
            options: ['et dampstrygejern', 'et kulstrygejern', 'et mangelbræt', 'et tørrestativ'],
            explanation: 'Dampstrygejernet sender hed damp dybt ind i stoffets fibre, så skjorter bliver fuldstændig glatte.'
        },
        {
            category: 'moderne',
            clue: 'Skaft med fladt led og mikrofiberklud, som bruges til at vaske trægulve stående oprejst uden at ligge på knæ.',
            clueEn: 'Long handle with a flat head and microfiber cloth to mop floors standing upright without kneeling.',
            target: 'en ergonomisk gulvmoppe',
            options: ['en ergonomisk gulvmoppe', 'en skurebørste', 'et strygebræt', 'et vaskebræt'],
            explanation: 'Den ergonomiske moppe skåner ryg og knæ, så gulvet skinner rent på få minutter.'
        }
    ];

    let currentDetectiveCategory = 'all';
    let detFilteredList = [...allDetectiveChallenges];
    let detIdx = 0;
    let detScore = 0;

    function filterDetectiveChallenges(cat) {
        currentDetectiveCategory = cat;
        if (cat === 'all') {
            detFilteredList = [...allDetectiveChallenges];
        } else {
            detFilteredList = allDetectiveChallenges.filter(c => c.category === cat);
        }
        detIdx = 0;
        detScore = 0;
        renderDetectiveRound();
    }

    function renderDetectiveRound() {
        detectiveCard.innerHTML = '';
        const challenge = detFilteredList[detIdx];

        // Category filter navigation
        const catNav = document.createElement('div');
        catNav.className = 'det-category-nav';
        catNav.innerHTML = `
            <button class="det-cat-btn ${currentDetectiveCategory === 'all' ? 'active' : ''}" data-cat="all">${t('sange_det_cat_all', isEn ? '🌟 All tools (12)' : '🌟 Alle redskaber (12)')}</button>
            <button class="det-cat-btn ${currentDetectiveCategory === 'historisk' ? 'active' : ''}" data-cat="historisk">${t('sange_det_cat_hist', isEn ? '⏳ Historical ("rulle tøj", mangelbræt osv.)' : '⏳ Historiske ("Rulle tøj", mangelbræt, vaskebræt m.fl.)')}</button>
            <button class="det-cat-btn ${currentDetectiveCategory === 'moderne' ? 'active' : ''}" data-cat="moderne">${t('sange_det_cat_mod', isEn ? '✨ Modern appliances' : '✨ Moderne maskiner (vaskemaskine, dampjern osv.)')}</button>
        `;
        catNav.querySelectorAll('.det-cat-btn').forEach(b => {
            b.onclick = () => filterDetectiveChallenges(b.dataset.cat);
        });
        detectiveCard.appendChild(catNav);

        // Score bar
        const scoreBar = document.createElement('div');
        scoreBar.className = 'detective-score-bar';
        scoreBar.innerHTML = `
            <span style="font-weight: 800; color: #fbbf24;">🕵️ ${t('sange_det_clue', isEn ? 'Clue' : 'Gåde')} ${detIdx + 1} / ${detFilteredList.length}</span>
            <span style="font-weight: 800; color: #4ade80;">⭐ ${t('sange_det_score', isEn ? 'Score' : 'Point')}: ${detScore}</span>
        `;
        detectiveCard.appendChild(scoreBar);

        // Clue Box
        const clueBox = document.createElement('div');
        clueBox.className = 'detective-clue-box';
        clueBox.innerHTML = `
            <div class="detective-clue-title">${challenge.category === 'historisk' ? t('sange_det_hist_title', isEn ? '⏳ Historical Tool / Action' : '⏳ Historisk redskab eller handling') : t('sange_det_mod_title', isEn ? '✨ Modern Tool' : '✨ Moderne husredskab')}</div>
            <div class="detective-clue-text">"${isEn ? challenge.clueEn : challenge.clue}"</div>
            <button class="listen-btn" id="btn-listen-clue" style="margin: 0 auto; padding: 0.5rem 1rem; font-size: 0.85rem;">
                <span>🔊</span> ${t('sange_det_listen_clue', isEn ? 'Listen to clue' : 'Lyt til ledetråd')}
            </button>
        `;
        clueBox.querySelector('#btn-listen-clue').onclick = () => {
            speakDanish(challenge.clue);
        };
        detectiveCard.appendChild(clueBox);

        // Options Grid
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
                    scoreBar.querySelector('span:nth-child(2)').textContent = `⭐ ${t('sange_det_score', isEn ? 'Score' : 'Point')}: ${detScore}`;
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                            🎉 ${t('sange_det_correct', isEn ? 'Correct!' : 'Helt rigtigt!')} <strong>${opt}</strong>
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
                            ❌ ${t('sange_det_wrong', isEn ? 'Not quite!' : 'Ikke helt!')} ${isEn ? 'The correct answer is' : 'Det rigtige svar er'} <strong>${challenge.target}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">${challenge.explanation}</div>
                    `;
                }

                feedbackBox.style.display = 'block';

                const nextBtn = document.createElement('button');
                nextBtn.className = 'detective-next-btn';
                nextBtn.innerHTML = detIdx + 1 < detFilteredList.length 
                    ? `<span>${t('sange_det_next', isEn ? 'Next Tool' : 'Næste redskab')}</span> →` 
                    : `<span>🏆 ${t('sange_det_see_result', isEn ? 'See Result' : 'Se dit resultat')}</span>`;
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
                <div style="font-size: 3.5rem; margin-bottom: 0.8rem;">🎉🧺🪵🏆</div>
                <h2 style="font-size: 1.8rem; color: #fbbf24; margin-bottom: 0.6rem;">
                    ${t('sange_det_finish_title', isEn ? 'Outstanding Detective Work!' : 'Fantastisk detektivarbejde!')}
                </h2>
                <p style="font-size: 1.2rem; color: #f8fafc; margin-bottom: 1.5rem;">
                    ${t('sange_lq_finish_scored', isEn ? 'You scored' : 'Du fik')} <strong>${detScore}</strong> ${t('sange_lq_finish_outof', isEn ? 'out of' : 'ud af')} <strong>${detFilteredList.length}</strong> ${t('sange_lq_finish_points', isEn ? 'points!' : 'point!')}
                </p>
                <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6;">
                    ${t('sange_det_finish_desc', isEn 
                        ? 'You now master the key Danish terms for both modern laundry tools and historical 19th-century traditions like "at rulle tøj" with a mangle board.' 
                        : 'Du mestrer nu både de moderne redskaber og 1800-tallets historiske traditioner som "at rulle tøj" med mangelbræt, vaskebræt og kulstrygejern.')}
                </p>
                <button class="detective-next-btn" id="btn-restart-detective">
                    🔄 ${t('sange_det_restart', isEn ? 'Try Again' : 'Prøv igen')}
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
    panelDetektiv.appendChild(detectiveCard);
    panelsHolder.appendChild(panelDetektiv);

    // =========================================================================
    // TAB 4: 🧱 SÆTNINGSBYGGER & PUSLEOPGAVE (Ugens gøremål & V2-ordstilling)
    // =========================================================================
    const panelSaetning = document.createElement('div');
    panelSaetning.className = `song-panel ${currentTab === 'tab_saetning' ? 'active' : ''}`;
    panelSaetning.dataset.panel = 'tab_saetning';

    const builderCard = document.createElement('div');
    builderCard.className = 'builder-card';

    // Intro Banner
    const introBanner = document.createElement('div');
    introBanner.className = 'saetning-intro-banner';
    introBanner.innerHTML = `
        <span class="saetning-intro-badge">🧩 ${t('sange_sb_badge', isEn ? 'Sentence Order & Questions' : 'Ordstilling & Spørgsmål')}</span>
        <h2 class="saetning-intro-title">${t('sange_sb_title', isEn ? 'Word Order: Answer Questions about the Week' : 'Sætningsbygger & Pusleopgaver: Svar på spørgsmål om ugen')}</h2>
        <p class="saetning-intro-desc">
            ${t('sange_sb_desc', isEn 
                ? 'Learn how to answer questions like <strong>"What does the mother do on Monday?"</strong> (Answer: <em>"Om mandagen vasker hun tøj"</em>). Notice the slots: the questions in each slot guide where the words belong!' 
                : 'Lær at besvare spørgsmål som <strong>"Hvad laver moren om mandagen?"</strong> (Svar: <em>"Om mandagen vasker hun tøj"</em>). Spørgsmålene i felterne guider dig trin for trin til, hvor hvert ord skal anbringes!')}
        </p>
    `;
    builderCard.appendChild(introBanner);

    // Sub-tabs navigation
    const subTabsNav = document.createElement('div');
    subTabsNav.className = 'saetning-sub-tabs';
    subTabsNav.innerHTML = `
        <button class="saetning-sub-tab-btn active" data-subtab="puzzle">
            <span>🧩</span> ${t('sange_subtab_puzzle', isEn ? '1. Puzzle Tasks (10 Questions)' : '1. Pusleopgaver (10 spørgsmål)')}
        </button>
        <button class="saetning-sub-tab-btn" data-subtab="builder">
            <span>🧱</span> ${t('sange_subtab_builder', isEn ? '2. Step-by-Step Builder' : '2. Trin-for-trin sætningsbygger')}
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
    // 1. PUSLEOPGAVE (Spørgsmål som: "Hvad laver moren om mandagen?")
    // -------------------------------------------------------------------------
    function setupPuzzleExercise(container) {
        const tasks = [
            {
                question: 'Hvad laver moren om mandagen?',
                questionEn: 'What does the mother do on Monday?',
                correct: ['Om mandagen', 'vasker', 'hun', 'tøj.'],
                scrambled: ['vasker', 'tøj.', 'Om mandagen', 'hun'],
                ruleTip: 'Når tidsleddet "Om mandagen" står forrest, kommer verbet "vasker" på 2. plads og subjektet "hun" på 3. plads (inversion)!'
            },
            {
                question: 'Hvad laver drengen om tirsdagen?',
                questionEn: 'What does the boy do on Tuesday?',
                correct: ['Om tirsdagen', 'tømmer', 'han', 'maskinen.'],
                scrambled: ['maskinen.', 'Om tirsdagen', 'han', 'tømmer'],
                ruleTip: 'Handlingen (verbet "tømmer") skal altid stå på 2. plads lige efter tidsudtrykket!'
            },
            {
                question: 'Hvad laver kvinden om onsdagen?',
                questionEn: 'What does the woman do on Wednesday?',
                correct: ['Om onsdagen', 'tørrer', 'hun', 'tøjet.'],
                scrambled: ['hun', 'Om onsdagen', 'tørrer', 'tøjet.'],
                ruleTip: 'Tidsudtrykket ("Om onsdagen") tager 1. plads, hvorefter verbet ("tørrer") straks følger.'
            },
            {
                question: 'Hvad laver kvinden om torsdagen?',
                questionEn: 'What does the woman do on Thursday?',
                correct: ['Om torsdagen', 'folder', 'hun', 'tøjet sammen.'],
                scrambled: ['folder', 'tøjet sammen.', 'Om torsdagen', 'hun'],
                ruleTip: 'Om torsdagen foldes det rene tøj omhyggeligt i bunker.'
            },
            {
                question: 'Hvad laver moren om fredagen?',
                questionEn: 'What does the mother do on Friday?',
                correct: ['Om fredagen', 'stryger', 'hun', 'skjorterne.'],
                scrambled: ['stryger', 'skjorterne.', 'hun', 'Om fredagen'],
                ruleTip: 'Dampstrygejernet glatter alle krøller ud til weekenden.'
            },
            {
                question: 'Hvad laver moren om lørdagen?',
                questionEn: 'What does the mother do on Saturday?',
                correct: ['Om lørdagen', 'vasker', 'hun', 'gulvet.'],
                scrambled: ['gulvet.', 'vasker', 'Om lørdagen', 'hun'],
                ruleTip: 'Med den ergonomiske fladmoppe vasker hun gulvet stående oprejst.'
            },
            {
                question: 'Hvad laver familien om søndagen?',
                questionEn: 'What does the family do on Sunday?',
                correct: ['Om søndagen', 'slapper', 'familien', 'af i sofaen.'],
                scrambled: ['familien', 'af i sofaen.', 'Om søndagen', 'slapper'],
                ruleTip: 'Søndag er ugens velfortjente hviledag med ro, kaffe og hygge.'
            },
            {
                question: 'Hvad gjorde kvinderne i 1800-tallet om torsdagen?',
                questionEn: 'What did women do on Thursday in the 1800s?',
                correct: ['I 1800-tallet', 'rullede', 'kvinderne', 'tøjet med et mangelbræt.'],
                scrambled: ['rullede', 'tøjet med et mangelbræt.', 'kvinderne', 'I 1800-tallet'],
                ruleTip: 'I sangen: "når vi ruller vort tøj" – kvinderne brugte et tungt mangelbræt og trærulle.'
            },
            {
                question: 'Hvad gjorde pigen i 1800-tallet om lørdagen?',
                questionEn: 'What did the maid do on Saturday in the 1800s?',
                correct: ['I 1800-tallet', 'skurede', 'pigen', 'gulvet på knæ med sand.'],
                scrambled: ['skurede', 'gulvet på knæ med sand.', 'I 1800-tallet', 'pigen'],
                ruleTip: 'I sangen: "når vi skurer vort gulv" – pigerne lå på knæ og skurede med børste og fint sand.'
            },
            {
                question: 'Hvornår danser vi rundt om enebærbusken?',
                questionEn: 'When do we dance around the juniper bush?',
                correct: ['Tidlig mandag morgen', 'går', 'vi', 'rundt om en enebærbusk.'],
                scrambled: ['går', 'rundt om en enebærbusk.', 'Tidlig mandag morgen', 'vi'],
                ruleTip: 'Tidsudtrykket "Tidlig mandag morgen" udgør forfeltet, og derefter følger verbet "går".'
            }
        ];

        let currentTaskIdx = 0;
        let userSlots = [null, null, null, null];
        const completedTasks = new Set();

        const puzzleWrapper = document.createElement('div');
        puzzleWrapper.className = 'puzzle-wrapper';

        const slotPrompts = [
            {
                text: t('sange_slot_1_hint', isEn ? '1. When does it happen? (Time first)' : '1. Hvornår sker det? (Tid forrest)'),
                grammar: t('sange_slot_1_tag', isEn ? 'Time adverbial' : 'Tidsadverbium / Forfelt'),
                colorClass: 'slot-tid',
                tagClass: 'tag-tid'
            },
            {
                text: t('sange_slot_2_hint', isEn ? '2. What is the action? (Verb in pos. 2!)' : '2. Hvad laver personen? (Handlingen er altid nr. 2!)'),
                grammar: t('sange_slot_2_tag', isEn ? 'Verb (V2)' : 'Verbum (V2)'),
                colorClass: 'slot-verbum',
                tagClass: 'tag-verbum'
            },
            {
                text: t('sange_slot_3_hint', isEn ? '3. Who does it? (Subject moves behind)' : '3. Hvem gør det? (Personen rykker bagved)'),
                grammar: t('sange_slot_3_tag', isEn ? 'Subject' : 'Subjekt'),
                colorClass: 'slot-subjekt',
                tagClass: 'tag-subjekt'
            },
            {
                text: t('sange_slot_4_hint', isEn ? '4. What or where? (Object / place)' : '4. Hvad eller hvor? (Hvad gør de ved det?)'),
                grammar: t('sange_slot_4_tag', isEn ? 'Object / Place' : 'Objekt / Sted'),
                colorClass: 'slot-objekt',
                tagClass: 'tag-objekt'
            }
        ];

        function renderCurrentTask() {
            puzzleWrapper.innerHTML = '';
            userSlots = [null, null, null, null];

            const task = tasks[currentTaskIdx];

            // Header
            const header = document.createElement('div');
            header.className = 'puzzle-header';

            // Pills navigation
            const pillsRow = document.createElement('div');
            pillsRow.className = 'puzzle-pills-row';
            tasks.forEach((_, tIdx) => {
                const pill = document.createElement('button');
                pill.className = `puzzle-pill ${tIdx === currentTaskIdx ? 'active' : ''} ${completedTasks.has(tIdx) ? 'completed' : ''}`;
                pill.textContent = tIdx + 1;
                pill.title = `${isEn ? 'Exercise' : 'Opgave'} ${tIdx + 1}`;
                pill.onclick = () => {
                    currentTaskIdx = tIdx;
                    renderCurrentTask();
                };
                pillsRow.appendChild(pill);
            });
            header.appendChild(pillsRow);

            // Counter
            const counterEl = document.createElement('div');
            counterEl.className = 'puzzle-counter';
            counterEl.textContent = `${isEn ? 'Question' : 'Spørgsmål'} ${currentTaskIdx + 1} / ${tasks.length}`;
            header.appendChild(counterEl);

            // Question Card
            const qCard = document.createElement('div');
            qCard.className = 'puzzle-question-card';
            const qTrans = t(`sange_pq_${currentTaskIdx + 1}`, isEn ? task.questionEn : task.question);
            qCard.innerHTML = `
                <h3 class="puzzle-question-title">❓ ${task.question} ${!isDa && qTrans !== task.question ? `<div style="font-size: 0.95rem; font-weight: normal; color: #94a3b8; margin-top: 0.25rem;">(${qTrans})</div>` : ''}</h3>
            `;
            header.appendChild(qCard);

            const guideEl = document.createElement('div');
            guideEl.className = 'puzzle-guide-hint';
            guideEl.innerHTML = `
                ${isEn ? 'Click the word chips below to place them in the correct slots in order:' : 'Klik på ordbrikkerne nedenfor for at placere dem i den rigtige rækkefølge i felterne:'}
            `;
            header.appendChild(guideEl);

            puzzleWrapper.appendChild(header);

            // 4 Guided Slots
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

            // Word Bank
            const bankContainer = document.createElement('div');
            bankContainer.className = 'puzzle-word-bank';
            puzzleWrapper.appendChild(bankContainer);

            // Feedback Area
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
                            <span class="slot-remove-btn" title="${isEn ? 'Remove word' : 'Fjern ord'}">✕</span>
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
                                🎉 ${t('sange_puzzle_success', isEn ? 'Perfect word order!' : 'Helt rigtigt!')} "<strong>${sentence}</strong>"
                            </div>
                            <div style="font-size: 0.95rem; color: #f0fdf4; margin-top: 0.3rem;">
                                💡 ${task.ruleTip}
                            </div>
                        </div>
                        <div class="puzzle-action-row">
                            <button class="next-task-btn" id="puzzle-listen-btn" style="background: #f59e0b; color: #0f172a;">
                                <span>🔊</span> ${t('sange_puzzle_listen', isEn ? 'Listen' : 'Lyt til udtale')}
                            </button>
                            <button class="next-task-btn" id="puzzle-next-btn">
                                <span>${currentTaskIdx < tasks.length - 1 ? t('sange_puzzle_next', isEn ? 'Next Question' : 'Næste spørgsmål') : t('sange_puzzle_start_over', isEn ? 'Start Over' : 'Start forfra')}</span> →
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
                                ❌ ${isEn ? 'Not quite right yet!' : 'Ikke helt rigtigt!'}
                            </div>
                            <div style="font-size: 0.92rem;">
                                ${t('sange_puzzle_error', isEn 
                                    ? 'Remember: The finite verb (action) MUST always stand in Position 2 immediately after the time phrase!' 
                                    : 'Husk grundreglen: Handlingen (verbet) SKAL altid stå på 2. plads lige efter tidsudtrykket!')}
                            </div>
                        </div>
                        <div class="puzzle-action-row">
                            <button class="retry-task-btn" id="puzzle-retry-btn">
                                <span>🔄</span> ${t('sange_puzzle_try_again', isEn ? 'Try Again' : 'Prøv igen')}
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
    // 2. TRIN-FOR-TRIN SÆTNINGSBYGGER (med vejledende spørgsmål i felterne)
    // -------------------------------------------------------------------------
    function setupStepBuilder(container) {
        const categories = [
            {
                q: t('sange_sb_cat_1', isEn ? '1. When does it happen? (Time in front position = pos. 1)' : '1. Hvornår sker det? (Tidsleddet forrest = 1. plads)'),
                grammar: t('sange_slot_1_tag', isEn ? 'Time Adverbial / Front Field' : 'Tidsadverbium / Forfelt'),
                rowClass: 'row-tid',
                selClass: 'sel-tid',
                colorWord: 'word-color-tid',
                options: ['Om mandagen', 'Om tirsdagen', 'Om onsdagen', 'Om torsdagen', 'Om fredagen', 'Om lørdagen', 'Om søndagen', 'Tidlig mandag morgen', 'I 1800-tallet']
            },
            {
                q: t('sange_sb_cat_2', isEn ? '2. What is the action? (The verb MUST be in position 2!)' : '2. Hvad laver personen? (Handlingen skal ALTID stå på 2. plads!)'),
                grammar: t('sange_slot_2_tag', isEn ? 'Verb (V2)' : 'Verbum (V2)'),
                rowClass: 'row-verbum',
                selClass: 'sel-verbum',
                colorWord: 'word-color-verbum',
                options: ['vasker', 'skyller', 'tømmer', 'tørrer', 'folder', 'rullede', 'stryger', 'skurer', 'slapper']
            },
            {
                q: t('sange_sb_cat_3', isEn ? '3. Who performs the action? (Subject moves behind the verb)' : '3. Hvem laver handlingen? (Personen rykker om bag handlingen)'),
                grammar: t('sange_slot_3_tag', isEn ? 'Subject' : 'Subjekt'),
                rowClass: 'row-subjekt',
                selClass: 'sel-subjekt',
                colorWord: 'word-color-subjekt',
                options: ['hun', 'moren', 'drengen', 'kvinden', 'vi', 'familien', 'pigerne']
            },
            {
                q: t('sange_sb_cat_4', isEn ? '4. What or where? (Object or prepositional phrase)' : '4. Hvad eller hvor? (Hvad sker der med tøjet / gulvet?)'),
                grammar: t('sange_slot_4_tag', isEn ? 'Object / Place' : 'Objekt / Sted'),
                rowClass: 'row-objekt',
                selClass: 'sel-objekt',
                colorWord: 'word-color-objekt',
                options: ['tøj', 'maskinen', 'tøjet på tørrestativet', 'tøjet i nydelige bunker', 'skjorterne med dampjern', 'tøjet med et mangelbræt', 'gulvet med en fladmoppe', 'af med en god kop kaffe']
            }
        ];

        let selections = ['Om mandagen', 'vasker', 'hun', 'tøj'];

        const wrapper = document.createElement('div');
        wrapper.className = 'step-builder-wrapper';

        const outputBox = document.createElement('div');
        outputBox.className = 'live-sentence-display';

        function updateLiveDisplay() {
            outputBox.innerHTML = `
                <div class="live-badge-label">✨ ${t('sange_sb_live_badge', isEn ? 'Built Sentence (V2 Word Order)' : 'Din sammensatte sætning (V2-ordstilling)')}</div>
                <div class="live-sentence-text">
                    <span class="word-color-tid">${selections[0]}</span> 
                    <span class="word-color-verbum">${selections[1]}</span> 
                    <span class="word-color-subjekt">${selections[2]}</span> 
                    <span class="word-color-objekt">${selections[3]}</span>.
                </div>
                <div class="live-rule-hint">
                    💡 <strong>${t('sange_sb_analysis_label', isEn ? 'Word order analysis:' : 'Ordstillingsanalyse:')}</strong> 
                    1. <span class="word-color-tid">${selections[0]}</span> (Tid) ➔ 
                    2. <span class="word-color-verbum">${selections[1]}</span> (Verbum) ➔ 
                    3. <span class="word-color-subjekt">${selections[2]}</span> (Subjekt) ➔ 
                    4. <span class="word-color-objekt">${selections[3]}</span> (Objekt/Sted)
                </div>
                <button class="listen-btn" id="btn-live-listen" style="margin-top: 0.4rem; padding: 0.65rem 1.4rem;">
                    <span>🔊</span> ${t('sange_sb_listen', isEn ? 'Listen to sentence' : 'Lyt til sætningen')}
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
    // TAB 5: ⏳ DENGANG & NU, PARRINGSØVELSER & VÆRDIGHED
    // =========================================================================
    const panelUdvikling = document.createElement('div');
    panelUdvikling.className = `song-panel ${currentTab === 'tab_udvikling' ? 'active' : ''}`;
    panelUdvikling.dataset.panel = 'tab_udvikling';

    const historyCard = document.createElement('div');
    historyCard.className = 'history-card';

    // PARINGSØVELSE: Forbind verbet med det rigtige redskab (Dengang & Nu)
    const matchingSection = document.createElement('div');
    matchingSection.className = 'matching-game-section';

    const matchPairs = [
        {
            verbId: 'vaske',
            verb: '🧺 at vaske',
            toolId: 'vaskekar',
            toolDengang: 'vaskebræt & vaskekar (gruekedel)',
            toolNu: 'vaskemaskine',
            feedback: 'at vaske ➔ Dengang gned man tøjet mod et vaskebræt i et vaskekar. I dag klarer vaskemaskinen det!'
        },
        {
            verbId: 'toerre',
            verb: '💨 at tørre',
            toolId: 'toerresnor',
            toolDengang: 'tørresnor & træklemmer',
            toolNu: 'tørrestativ & tørretumbler',
            feedback: 'at tørre ➔ Dengang hang tøjet på tørresnor i haven mellem træer. I dag bruger vi tørrestativ eller tumbler!'
        },
        {
            verbId: 'rulle',
            verb: '🪓 at rulle ("rulle vort tøj")',
            toolId: 'mangelbraet',
            toolDengang: 'mangelbræt & strygerulle',
            toolNu: 'at folde tøjet sammen',
            feedback: 'at rulle ➔ Dengang rullede man tøjet med et mangelbræt og trærulle på bordet for at presse folder ud!'
        },
        {
            verbId: 'stryge',
            verb: '👔 at stryge',
            toolId: 'kulstrygejern',
            toolDengang: 'tungt kulstrygejern med gløder',
            toolNu: 'ergonomisk dampstrygejern',
            feedback: 'at stryge ➔ Dengang fyldte man strygejernet med glødende kul. I dag bruger vi et let dampstrygejern!'
        },
        {
            verbId: 'skure',
            verb: '🧽 at skure ("skure vort gulv")',
            toolId: 'skureboerste',
            toolDengang: 'skurebørste og spand på knæ',
            toolNu: 'ergonomisk fladmoppe',
            feedback: 'at skure ➔ Dengang lå man på knæ og skurede med børste og sand. I dag bruger vi en ergonomisk moppe!'
        }
    ];

    let selectedVerb = null;
    let selectedTool = null;
    let matchedCount = 0;

    function renderMatchingGame() {
        matchingSection.innerHTML = `
            <div class="mgs-header">
                <span style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 800; font-size: 0.8rem; text-transform: uppercase;">
                    🔗 ${t('sange_match_tag', isEn ? 'Matching Exercise' : 'Parringsøvelse: Forbind verbet med redskabet')}
                </span>
                <div class="mgs-title" style="margin-top: 0.6rem;">
                    ${t('sange_match_title', isEn ? 'Connect the song’s verbs with the historical tools and modern equivalents:' : 'Forbind sangens verber med de historiske og moderne redskaber:')}
                </div>
                <div class="mgs-sub">
                    ${t('sange_match_sub', isEn ? 'Click a verb on the left, then click its corresponding tool on the right!' : 'Klik på et verbum til venstre, og klik derefter på det tilhørende redskab til højre!')}
                </div>
            </div>
            <div class="matching-columns-container">
                <div>
                    <div class="mgs-col-title">🔴 ${t('sange_match_col_verbs', isEn ? 'Verbs from the song' : 'Sangens verber')}</div>
                    <div class="mgs-cards-list" id="mgs-verbs-list"></div>
                </div>
                <div>
                    <div class="mgs-col-title">⏳ ${t('sange_match_col_tools', isEn ? 'Historical tools (Dengang)' : 'Datidens redskaber (Dengang)')}</div>
                    <div class="mgs-cards-list" id="mgs-tools-list"></div>
                </div>
            </div>
            <div id="mgs-feedback-box" style="background: #1e293b; border-radius: 14px; padding: 1.1rem; display: none; text-align: center; border: 1.5px solid #22c55e;"></div>
        `;

        const verbsList = matchingSection.querySelector('#mgs-verbs-list');
        const toolsList = matchingSection.querySelector('#mgs-tools-list');
        const feedbackBox = matchingSection.querySelector('#mgs-feedback-box');

        // Shuffled tool cards
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
            tBtn.innerHTML = `<span>${p.toolDengang}</span>`;
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
                // Correct match!
                const vBtn = verbsList.querySelector(`[data-verb-id="${selectedVerb.verbId}"]`);
                const tBtn = toolsList.querySelector(`[data-tool-id="${selectedTool.toolId}"]`);

                vBtn.classList.add('matched');
                tBtn.classList.add('matched');
                vBtn.innerHTML = `<span>${selectedVerb.verb}</span> <span>✅</span>`;
                tBtn.innerHTML = `<span>${selectedTool.toolDengang}</span> <span>✅</span>`;

                feedbackBox.style.display = 'block';
                feedbackBox.innerHTML = `
                    <div style="color: #4ade80; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.3rem;">
                        🎉 ${isEn ? 'Correct match!' : 'Flot parret!'}
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
                            <div style="font-size: 2.2rem; margin-bottom: 0.4rem;">🏆🌟👑</div>
                            <div style="color: #fbbf24; font-weight: 800; font-size: 1.3rem; margin-bottom: 0.4rem;">
                                ${t('sange_match_all_done', isEn ? 'All pairs matched perfectly!' : 'Alle par er forbundet helt perfekt!')}
                            </div>
                            <div style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1rem;">
                                ${isEn ? 'You master all verbs and domestic tools across generations.' : 'Du har fuldt overblik over sangens verber og husarbejdets redskaber gennem tiderne.'}
                            </div>
                            <button class="builder-btn builder-btn-check" id="btn-restart-matching" style="margin: 0 auto;">
                                🔄 ${t('sange_match_reset', isEn ? 'Play Matching Again' : 'Spil parring igen')}
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
                // Wrong match
                feedbackBox.style.display = 'block';
                feedbackBox.style.borderColor = '#ef4444';
                feedbackBox.innerHTML = `
                    <div style="color: #f87171; font-weight: 800;">
                        ❌ ${isEn ? 'Not quite right. Try connecting another tool with this verb!' : 'Ikke det rette par. Prøv et andet redskab til dette verbum!'}
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
                }, 1300);
            }
        }
    }

    renderMatchingGame();
    historyCard.appendChild(matchingSection);

    // Tribute Box
    const tributeBox = document.createElement('div');
    tributeBox.className = 'tribute-box';
    tributeBox.innerHTML = `
        <span class="tribute-badge">👑 ${t('sange_tribute_badge', isEn ? 'Tribute to Domestic Care' : 'Hyldest til omsorgsarbejdet i hjemmet')}</span>
        <div class="tribute-text">
            ${t('sange_tribute_text', isEn 
                ? '“Household care is the silent work that makes all other work possible. When clothes are clean, floors are washed, and the home is peaceful, it provides safety, health, and dignity for everyone. Domestic work deserves the utmost respect and recognition.”' 
                : '“Husarbejde er det usynlige fundament, der gør alt andet arbejde i samfundet muligt. Når tøjet er rent, gulvet er vasket og hjemmet emmer af ro, skaber det sundhed, tryghed og livsglæde for hele familien. Husarbejde er et værdigt og værdifuldt arbejde, der fortjener den dybeste anerkendelse.”')}
        </div>
    `;
    historyCard.appendChild(tributeBox);

    // Comparison Grid
    const comparisonGrid = document.createElement('div');
    comparisonGrid.className = 'comparison-grid';

    const compData = [
        {
            title: isEn ? '1. Laundry: From River to A+++' : '1. Tøjvask: Fra gruekedel til A+++',
            icon: '🧺',
            then: isEn 
                ? '1800s: Heavy wooden washboards, caustic soda, freezing river water, and boiling gruekedler. Took 2–3 full days of backbreaking labor every month.' 
                : 'Dengang: Tunge vaskebrætter, lud, iskoldt åvand og tunge gruekedler over åben ild. Det tog 2-3 dages hårdt slid hver måned for kvinderne.',
            now: isEn 
                ? 'Today: Modern energy-efficient front-loader with specialized cycles. Clothes come out fresh at the press of a button.' 
                : 'I dag: Moderne vaskemaskine med skåneprogram og timer. Maskinen klarer det tunge arbejde, mens vi kan bruge tiden på familie og uddannelse.'
        },
        {
            title: isEn ? '2. Ironing: From Coals to Steam' : '2. Strygning: Fra glødende kul til damp',
            icon: '👔',
            then: isEn 
                ? '1800s: Heavy cast-iron irons filled with glowing hot embers from the stove. Sparks, smoke, and constant soot hazards.' 
                : 'Dengang: Tunge jern fyldt med glødende kul eller opvarmet på komfuret. Risiko for sod, brand og røg.',
            now: isEn 
                ? 'Today: Lightweight ergonomic steam irons and presses that smooth collars and fabrics gently in minutes.' 
                : 'I dag: Letvægts dampstrygejern med teflonsål og fin damp, der glatter skjorter og kjoler ergonomisk på få minutter.'
        },
        {
            title: isEn ? '3. Floor Care: From Knees to Mop' : '3. Gulve: Fra knæslid til ergonomisk moppe',
            icon: '✨',
            then: isEn 
                ? '1800s: Scrubbing unpainted floorboards on hands and knees with abrasive sand and stiff horsehair brushes.' 
                : 'Dengang: Skuring af rå trægulve på knæ med sand og stive børster, hvilket ødelagde knæ og ryg.',
            now: isEn 
                ? 'Today: Ergonomic flat microfibre mops and eco-friendly soap solutions that clean quickly while standing tall.' 
                : 'I dag: Ergonomisk fladmoppe med mikrofiberklud og mild universalrengøring, der skåner ryg og led.'
        }
    ];

    compData.forEach(c => {
        const item = document.createElement('div');
        item.className = 'comparison-item';
        item.innerHTML = `
            <div class="comp-header"><span>${c.icon}</span> ${c.title}</div>
            <div class="comp-era then"><strong>${isEn ? 'Then:' : 'Dengang:'}</strong> ${c.then}</div>
            <div class="comp-era now"><strong>${isEn ? 'Now:' : 'I dag:'}</strong> ${c.now}</div>
        `;
        comparisonGrid.appendChild(item);
    });

    historyCard.appendChild(comparisonGrid);

    // Discussion Cards
    const discTitle = document.createElement('h3');
    discTitle.style.fontSize = '1.3rem';
    discTitle.style.color = '#fbbf24';
    discTitle.style.marginBottom = '1rem';
    discTitle.textContent = isEn ? '💬 Conversation Starters for Pair Work' : '💬 Samtalekort til makkerpar og klasse';
    historyCard.appendChild(discTitle);

    const discGrid = document.createElement('div');
    discGrid.className = 'discussion-cards-grid';

    const discCards = [
        {
            icon: '🤝',
            q: isEn ? 'Who does what chores at your home? Do you share the tasks?' : 'Hvem laver husarbejdet hjemme hos dig? Deler I opgaverne?',
            helpers: isEn ? 'Keywords: at deles om opgaverne, at lave mad, at vaske op, at gøre rent' : 'Hjælpeord: at deles om det, at lave mad, at vaske op, at støvsuge'
        },
        {
            icon: '🌸',
            q: isEn ? 'Which household task gives you the greatest satisfaction when completed?' : 'Hvilket husarbejde giver dig den bedste følelse, når du er færdig?',
            helpers: isEn ? 'Keywords: duften af rent tøj, nystrøgede skjorter, skinnende gulve' : 'Hjælpeord: duften af rent tøj, nystrøgede skjorter, et rent og pænt hjem'
        },
        {
            icon: '👵',
            q: isEn ? 'How did your grandparents wash and dry clothes when they were young?' : 'Hvordan vaskede dine forældre eller bedsteforældre tøj, da de var unge?',
            helpers: isEn ? 'Keywords: i hånden, i en balje, i en gammel maskine, i solskin' : 'Hjælpeord: i hånden, i en balje, i en gammeldags maskine, tørresnor i haven'
        },
        {
            icon: '🏡',
            q: isEn ? 'What does the Danish expression "hjem kære hjem" (home sweet home) mean to you?' : 'Hvad betyder udtrykket "hjem kære hjem" for dig?',
            helpers: isEn ? 'Keywords: tryghed, varme, ro, familie, omsorg' : 'Hjælpeord: tryghed, varme, ro, familie, fællesskab, omsorg'
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
    // NEDERST: Melodi- og lydafspiller (YouTube)
    // =========================================================================
    const audioFooterCard = document.createElement('div');
    audioFooterCard.className = 'song-audio-footer-card';
    audioFooterCard.innerHTML = `
        <div class="saf-header">
            <div class="saf-left">
                <div class="saf-icon">🎵</div>
                <div class="saf-text">
                    <div class="saf-title">${t('sange_saf_title', isEn ? 'Listen to the Melody: "Så går vi rundt om en enebærbusk"' : 'Lyt til melodien: "Så går vi rundt om en enebærbusk"')}</div>
                    <div class="saf-sub">${t('sange_saf_sub', isEn ? 'Sing along and play the cheerful traditional melody' : 'Syng med og lyt til den klassiske melodi til sanglegen her')}</div>
                </div>
            </div>
            <div class="saf-actions">
                <a href="https://youtu.be/Gr5KXEBk5F4?si=m2tnGwcTjOeVaGbT" target="_blank" rel="noopener noreferrer" class="saf-youtube-btn">
                    <span>▶️</span> ${t('sange_saf_open_yt', isEn ? 'Play on YouTube' : 'Hør melodi på YouTube')}
                </a>
                <button class="saf-embed-toggle-btn" id="btn-toggle-yt-player">
                    <span>📺</span> <span id="yt-toggle-label">${t('sange_saf_embed', isEn ? 'Show Player' : 'Vis afspiller')}</span>
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
