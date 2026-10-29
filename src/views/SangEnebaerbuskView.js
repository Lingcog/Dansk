import { getTranslation, getLang } from '../utils/i18n.js';

/**
 * SangEnebaerbuskView - Sange: "Så går vi rundt om en enebærbusk"
 * Didaktisk flade med moderne vrimlebillede + historisk tankebobbel,
 * Karaoke- og rytmetræning, lytteøvelse, ord-detektiv til moderne og historiske redskaber
 * ("rulle tøj", mangelbræt, vaskebræt, kulstrygejern), parringsøvelser og hyldest til husarbejdet.
 */
export function renderSangEnebaerbuskView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const isEn = getLang() === 'en';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sang-enebaerbusk-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${isEn ? 'Back to Stories' : 'Tilbage til Historier'}`;
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
        .sang-enebaerbusk-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.2rem 4rem;
            color: #f8fafc;
            font-family: inherit;
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
           TAB 4: 🧱 Sætningsbygger (Når & Så)
           ---------------------------------------------------- */
        .builder-card {
            max-width: 860px;
            margin: 0 auto;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .builder-grammar-legend {
            display: flex;
            gap: 0.6rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
            background: #0f172a;
            padding: 0.8rem 1.2rem;
            border-radius: 14px;
            font-size: 0.82rem;
            font-weight: 700;
        }
        .legend-chip { padding: 0.25rem 0.6rem; border-radius: 8px; }
        .chip-forfelt { background: rgba(168, 85, 247, 0.25); color: #c084fc; border: 1px solid #a855f7; }
        .chip-verbum { background: rgba(239, 68, 68, 0.25); color: #f87171; border: 1px solid #ef4444; }
        .chip-subjekt { background: rgba(34, 197, 94, 0.25); color: #4ade80; border: 1px solid #22c55e; }
        .chip-objekt { background: rgba(56, 189, 248, 0.25); color: #38bdf8; border: 1px solid #0284c7; }
        .chip-adverbial { background: rgba(249, 115, 22, 0.25); color: #fb923c; border: 1px solid #ea580c; }

        .builder-drop-zone {
            min-height: 80px;
            background: #0f172a;
            border: 2px dashed #475569;
            border-radius: 16px;
            padding: 1rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.7rem;
            align-items: center;
            margin-bottom: 1.5rem;
            transition: all 0.2s ease;
        }
        .builder-drop-zone.filled { border-color: #38bdf8; background: rgba(15, 23, 42, 0.85); }
        .builder-drop-zone.success { border-color: #22c55e; background: rgba(34, 197, 94, 0.1); }
        .builder-tiles-pool { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-bottom: 1.6rem; min-height: 50px; }
        .builder-word-tile {
            padding: 0.7rem 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            user-select: none;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .builder-word-tile:hover { transform: translateY(-2px); filter: brightness(1.15); }
        .tile-forfelt { background: #581c87; color: #e9d5ff; border: 1.5px solid #a855f7; }
        .tile-verbum { background: #7f1d1d; color: #fecaca; border: 1.5px solid #ef4444; }
        .tile-subjekt { background: #14532d; color: #bbf7d0; border: 1.5px solid #22c55e; }
        .tile-objekt { background: #0c4a6e; color: #bae6fd; border: 1.5px solid #0284c7; }
        .tile-adverbial { background: #7c2d12; color: #fed7aa; border: 1.5px solid #ea580c; }
        .builder-controls-row { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .builder-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .builder-btn-reset { background: #334155; color: #cbd5e1; border: 1px solid #475569; }
        .builder-btn-check { background: #f59e0b; color: #0f172a; border: none; }
        .builder-btn-next { background: #22c55e; color: white; border: none; }

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
            .sang-enebaerbusk-view { padding: 0.8rem 0.6rem 3rem; }
            .hero-song-header h1 { font-size: 1.6rem; }
            .hero-song-header p { font-size: 0.95rem; }
            .vrimmel-card, .detective-card, .builder-card, .history-card, .listening-quiz-card {
                padding: 1.1rem 0.8rem;
                border-radius: 16px;
            }
            .detective-options-grid, .lq-options-grid, .matching-columns-container {
                grid-template-columns: 1fr;
            }
            .verses-grid { grid-template-columns: 1fr; }
            .vrimmel-hotspot { width: 32px; height: 32px; font-size: 0.95rem; }
            .hotspot-detail-card { padding: 1rem; }
            .detail-title { font-size: 1.3rem; }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const hero = document.createElement('div');
    hero.className = 'hero-song-header';
    hero.innerHTML = `
        <div class="hero-song-badge">🎵 ${isEn ? 'Danish Songs & Everyday Life' : 'Danske sange & Hverdagsliv'}</div>
        <h1>${isEn ? 'Så går vi rundt om en enebærbusk' : 'Så går vi rundt om en enebærbusk'}</h1>
        <p>${isEn 
            ? 'Sing along to Denmark’s classic singing game, explore contemporary household tasks alongside 19th-century traditions in the thought bubble, master sentence rhythm ("TÍD-lig MAN-dag MÓR-gen"), and celebrate the dignity of domestic care.' 
            : 'Syng med på den klassiske danske sangleg, udforsk nutidens husarbejde og 1800-tallets traditioner i tankeboblen, træn naturlig dansk rytme ("TÍD-lig MAN-dag MÓR-gen"), og fejr værdigheden i hverdagens omsorgsarbejde.'}</p>
    `;
    viewContainer.appendChild(hero);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'song-tabs-nav';

    const tabsData = [
        { id: 'tab_vrimmel', icon: '🖼️', label: isEn ? '1. Wimmelbild (Bubble)' : '1. Vrimlebillede & Tankebobbel' },
        { id: 'tab_sang', icon: '🎶', label: isEn ? '2. Sing along & Rhythm' : '2. Syng med & Rytme' },
        { id: 'tab_detektiv', icon: '🕵️', label: isEn ? '3. Word Detective' : '3. Ord-detektiv ("Rulle tøj" osv.)' },
        { id: 'tab_saetning', icon: '🧱', label: isEn ? '4. Sentence Builder' : '4. Sætningsbygger (Når & Så)' },
        { id: 'tab_udvikling', icon: '⏳', label: isEn ? '5. Then & Now & Matching' : '5. Dengang & nu & Parring' }
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
        <button class="vrimmel-filter-btn active" data-filter="all">🌟 ${isEn ? 'All (14)' : 'Alle (14 hotspots)'}</button>
        <button class="vrimmel-filter-btn" data-filter="nutid">🏠 ${isEn ? 'Modern Home' : 'Nutidens hjem (7)'}</button>
        <button class="vrimmel-filter-btn" data-filter="historisk">💭 ${isEn ? 'Thought Bubble (1800s)' : 'Historisk tankebobbel (6)'}</button>
    `;
    controlBar.appendChild(filterGroup);

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-toggle-btn';
    let pureModeActive = false;
    pureBtn.innerHTML = `<span>🖼️</span> ${isEn ? 'Image only:' : 'Vis kun billedet:'} <strong id="pure-status">${isEn ? 'OFF' : 'FRA'}</strong>`;
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
        detailCard.innerHTML = `
            <div class="detail-info-left">
                <div class="detail-badges">
                    <span class="badge-pill badge-dag">${item.category === 'historisk' ? '💭' : '🗓️'} ${isEn ? item.dagEn : item.dag}</span>
                    <span class="badge-pill badge-verbum">🔴 ${isEn ? 'Verb & Action' : 'Verbum & Handling'}</span>
                    <span class="badge-pill ${item.category === 'historisk' ? 'badge-historisk-tag' : 'badge-vaerdighed'}">
                        ${item.category === 'historisk' ? (isEn ? '⏳ 1800s Rural Heritage' : '⏳ 1800-tallets kulturarv') : (isEn ? '✨ Modern Domestic Care' : '✨ Moderne omsorgsarbejde')}
                    </span>
                </div>
                <div class="detail-title">
                    <span>${item.icon}</span> ${item.handling}
                </div>
                <div class="detail-forms">
                    ${item.nutid} · ${item.datid} · ${item.foerdatid}
                </div>
                <div class="detail-redskaber">
                    <strong>${item.category === 'historisk' ? (isEn ? 'Historical tools:' : 'Historiske redskaber:') : (isEn ? 'Modern tools:' : 'Moderne redskaber:')}</strong> ${isEn ? item.redskaberEn : item.redskaber}
                </div>
                <div class="detail-saetning-box">
                    "${item.saetning}"
                </div>
                <div class="detail-vaerdighed-note">
                    <span>${item.category === 'historisk' ? '📜' : '💜'}</span> ${isEn ? item.vaerdighedEn : item.vaerdighed}
                </div>
            </div>
            <div class="detail-actions-right">
                <button class="listen-btn" id="btn-listen-hotspot">
                    <span>🔊</span> ${isEn ? 'Listen to sentence' : 'Lyt til sætning'}
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
                <div class="msb-title">Melodi: Dansk traditionel sangleg</div>
                <div class="msb-sub">6/8 takt · Muntert tempo · Naturlig dansk sætningsrytme</div>
            </div>
        </div>
        <div style="display: flex; gap: 0.8rem; align-items: center; flex-wrap: wrap;">
            <a href="https://youtu.be/Gr5KXEBk5F4?si=m2tnGwcTjOeVaGbT" target="_blank" rel="noopener noreferrer" class="saf-youtube-btn">
                <span>▶️</span> ${isEn ? 'Play Melody on YouTube' : 'Hør melodi på YouTube'}
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
                ${isEn ? 'Danish Sentence Rhythm & Word Stress' : 'Dansk rytme og trykfordeling'}
            </strong>
            <p style="color: #cbd5e1; font-size: 0.95rem; margin: 0.25rem 0 0; line-height: 1.5;">
                ${isEn 
                    ? 'The highlighted uppercase syllables show where the natural sentence stress falls (e.g. ”TÍD-lig MAN-dag MÓR-gen”). Practice singing or reading along with the beat!' 
                    : 'De markerede stavelser med store bogstaver og accent viser det naturlige rytmiske tryk i sætningerne (f.eks. ”<span class="stress-syllable">TÍD</span>-lig <span class="stress-syllable">MÁN</span>-dag <span class="stress-syllable">MÓR</span>-gen”). Læg mærke til, hvordan sangens rytme følger hverdagsdanskens naturlige betoning!'}
            </p>
        </div>
    `;
    lyricsContainer.appendChild(rhythmBar);

    // Chorus
    const chorusCard = document.createElement('div');
    chorusCard.className = 'chorus-card';
    chorusCard.innerHTML = `
        <span class="chorus-tag">🌿 ${isEn ? 'Chorus of the Song Game' : 'Sanglegens faste omkvæd'}</span>
        <div class="chorus-text">
            Så <span class="stress-syllable">GÅR</span> vi rundt om en <span class="stress-syllable">É</span>-ne-bær-busk,<br>
            <span class="stress-syllable">É</span>-ne-bær-busk, <span class="stress-syllable">É</span>-ne-bær-busk.<br>
            Så <span class="stress-syllable">GÅR</span> vi rundt om en <span class="stress-syllable">É</span>-ne-bær-busk<br>
            <span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">MÁN</span>-dag <span class="stress-syllable">MÓR</span>-gen!
        </div>
        <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; margin-top: 0.8rem;">
            <button class="listen-btn" id="btn-listen-chorus">
                <span>🔊</span> ${isEn ? 'Listen to Chorus' : 'Lyt til omkvædet'}
            </button>
            <a href="https://youtu.be/Gr5KXEBk5F4?si=m2tnGwcTjOeVaGbT" target="_blank" rel="noopener noreferrer" class="listen-btn" style="background: #ef4444; color: white; text-decoration: none;">
                <span>▶️</span> ${isEn ? 'Play Melody on YouTube' : 'Hør melodi på YouTube'}
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
            dag: 'Mandag',
            dagEn: 'Monday',
            icon: '🧺',
            action: 'vasker',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">VÁS</span>-ker vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">VÁS</span>-ker vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">VÁS</span>-ker vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">VÁS</span>-ker vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">MÁN</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi vasker vort tøj, vasker vort tøj, vasker vort tøj. Så gør vi sådan, når vi vasker vort tøj, tidlig en mandag morgen.',
            modernNote: isEn ? 'Modern: "når vi vasker vores tøj" (vores instead of archaic vort).' : 'Moderne: "når vi vasker vores tøj" (i dag siger vi vores frem for vort).'
        },
        {
            dag: 'Tirsdag',
            dagEn: 'Tuesday',
            icon: '🧼',
            action: 'skyller',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">SKÝL</span>-ler vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">SKÝL</span>-ler vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">SKÝL</span>-ler vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">SKÝL</span>-ler vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">TÍRS</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi skyller vort tøj, skyller vort tøj, skyller vort tøj. Så gør vi sådan, når vi skyller vort tøj, tidlig en tirsdag morgen.',
            modernNote: isEn ? 'Drying & rinsing rhythm in 6/8 meter.' : '6/8 takt med tryk på ugedagen: TÍRS-dag MÓR-gen.'
        },
        {
            dag: 'Onsdag',
            dagEn: 'Wednesday',
            icon: '💨',
            action: 'tørrer',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">TØR</span>-rer vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TØR</span>-rer vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">TØR</span>-rer vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">TØR</span>-rer vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">ÓNS</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi tørrer vort tøj, tørrer vort tøj, tørrer vort tøj. Så gør vi sådan, når vi tørrer vort tøj, tidlig en onsdag morgen.',
            modernNote: isEn ? 'Notice inversion: "Så gør vi sådan" (Så + gør + vi).' : 'Bemærk inversion: "Så gør vi sådan" (Forfelt + Verbum + Subjekt).'
        },
        {
            dag: 'Torsdag',
            dagEn: 'Thursday',
            icon: '🪓',
            action: 'ruller & folder',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">RÚL</span>-ler vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">RÚL</span>-ler vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">RÚL</span>-ler vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">RÚL</span>-ler vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">TÓRS</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi ruller vort tøj, ruller vort tøj, ruller vort tøj. Så gør vi sådan, når vi ruller vort tøj, tidlig en torsdag morgen.',
            modernNote: isEn ? 'Historically: "ruller vort tøj" (mangelbræt). Today: "folder tøjet sammen".' : 'Historisk: "ruller vort tøj" med mangelbræt og rulle. I dag: vi folder tøjet sammen.'
        },
        {
            dag: 'Fredag',
            dagEn: 'Friday',
            icon: '👔',
            action: 'stryger',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">STRÝ</span>-ger vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">STRÝ</span>-ger vort <span class="stress-syllable">TØJ</span>, <span class="stress-syllable">STRÝ</span>-ger vort <span class="stress-syllable">TØJ</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">STRÝ</span>-ger vort <span class="stress-syllable">TØJ</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">FRÉ</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi stryger vort tøj, stryger vort tøj, stryger vort tøj. Så gør vi sådan, når vi stryger vort tøj, tidlig en fredag morgen.',
            modernNote: isEn ? 'Dengang med kulstrygejern · I dag med dampstrygejern.' : 'Dengang med glødende kulstrygejern · I dag med let dampstrygejern.'
        },
        {
            dag: 'Lørdag',
            dagEn: 'Saturday',
            icon: '🧽',
            action: 'skurer & vasker gulv',
            textStress: 'Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">SKÚ</span>-rer vort <span class="stress-syllable">GULV</span>,<br><span class="stress-syllable">SKÚ</span>-rer vort <span class="stress-syllable">GULV</span>, <span class="stress-syllable">SKÚ</span>-rer vort <span class="stress-syllable">GULV</span>.<br>Så <span class="stress-syllable">GØR</span> vi sådan, når vi <span class="stress-syllable">SKÚ</span>-rer vort <span class="stress-syllable">GULV</span>,<br><span class="stress-syllable">TÍD</span>-lig en <span class="stress-syllable">LØR</span>-dag <span class="stress-syllable">MÓR</span>-gen.',
            tts: 'Så gør vi sådan, når vi skurer vort gulv, skurer vort gulv, skurer vort gulv. Så gør vi sådan, når vi skurer vort gulv, tidlig en lørdag morgen.',
            modernNote: isEn ? 'Historically: "skurer vort gulv" on bare knees with sand and brush.' : 'Historisk: "skurer vort gulv" på knæ med sand og skurebørste.'
        },
        {
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
        vCard.innerHTML = `
            <div>
                <div class="verse-header">
                    <span class="verse-day-pill">${v.icon} ${isEn ? v.dagEn : v.dag}</span>
                    <span style="font-size: 0.85rem; color: #94a3b8; font-weight: 700;">${v.action}</span>
                </div>
                <div class="verse-lyrics">${v.textStress}</div>
                <div class="verse-note">💡 ${v.modernNote}</div>
            </div>
            <button class="verse-listen-btn">
                <span>🔊</span> ${isEn ? 'Listen to verse' : 'Lyt til verset'}
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
                        🎧 ${isEn ? 'Listening Exercise' : 'Lytteøvelse (Lydklip)'}
                    </span>
                    <div class="lq-prompt" style="margin-top: 0.6rem;">
                        ${isEn ? 'Which chore or day of the week is being sung about?' : 'Hvilken handling eller ugedag synges der om her?'}
                    </div>
                </div>
                <div style="font-weight: 800; color: #fbbf24; font-size: 1.05rem;">
                    ⭐ ${isEn ? 'Score' : 'Point'}: ${lqScore} / ${listeningQuestions.length}
                </div>
            </div>
            <div class="lq-play-box">
                <button class="lq-play-btn" id="btn-play-lq-clip">
                    <span>🔊</span> ${isEn ? 'Play Audio Clip' : 'Afspil lytteklippet'}
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
                    listeningQuizCard.querySelector('.lq-header div:last-child').textContent = `⭐ ${isEn ? 'Score' : 'Point'}: ${lqScore} / ${listeningQuestions.length}`;
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                            🎉 ${isEn ? 'Spot on!' : 'Helt rigtigt hørt!'} <strong>${opt}</strong>
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
                            ❌ ${isEn ? 'Not quite right.' : 'Ikke helt rigtigt.'} Det rigtige svar er <strong>${q.correct}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.95rem;">${q.tip}</div>
                    `;
                }

                feedbackBox.style.display = 'block';

                const nextBtn = document.createElement('button');
                nextBtn.className = 'detective-next-btn';
                nextBtn.style.marginTop = '1rem';
                nextBtn.innerHTML = lqIndex + 1 < listeningQuestions.length 
                    ? `<span>${isEn ? 'Next Audio Clip' : 'Næste lytteklip'}</span> →` 
                    : `<span>🏆 ${isEn ? 'See Quiz Result' : 'Se lytteresultat'}</span>`;

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
                    ${isEn ? 'Listening Quiz Completed!' : 'Flot klaret! Du har et skarpt dansk øre!'}
                </h3>
                <p style="font-size: 1.15rem; color: #f8fafc; margin-bottom: 1.5rem;">
                    ${isEn ? 'You scored' : 'Du fik'} <strong>${lqScore}</strong> ${isEn ? 'out of' : 'ud af'} <strong>${listeningQuestions.length}</strong> ${isEn ? 'points' : 'point'}!
                </p>
                <button class="detective-next-btn" id="btn-restart-lq">
                    🔄 ${isEn ? 'Try Listening Quiz Again' : 'Tag lyttequizzen igen'}
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
            <button class="det-cat-btn ${currentDetectiveCategory === 'all' ? 'active' : ''}" data-cat="all">🌟 ${isEn ? 'All tools (12)' : 'Alle redskaber (12)'}</button>
            <button class="det-cat-btn ${currentDetectiveCategory === 'historisk' ? 'active' : ''}" data-cat="historisk">⏳ ${isEn ? 'Historical ("rulle tøj", mangelbræt osv.)' : 'Historiske ("Rulle tøj", mangelbræt, vaskebræt m.fl.)'}</button>
            <button class="det-cat-btn ${currentDetectiveCategory === 'moderne' ? 'active' : ''}" data-cat="moderne">✨ ${isEn ? 'Modern appliances' : 'Moderne maskiner (vaskemaskine, dampjern osv.)'}</button>
        `;
        catNav.querySelectorAll('.det-cat-btn').forEach(b => {
            b.onclick = () => filterDetectiveChallenges(b.dataset.cat);
        });
        detectiveCard.appendChild(catNav);

        // Score bar
        const scoreBar = document.createElement('div');
        scoreBar.className = 'detective-score-bar';
        scoreBar.innerHTML = `
            <span style="font-weight: 800; color: #fbbf24;">🕵️ ${isEn ? 'Clue' : 'Gåde'} ${detIdx + 1} / ${detFilteredList.length}</span>
            <span style="font-weight: 800; color: #4ade80;">⭐ ${isEn ? 'Score' : 'Point'}: ${detScore}</span>
        `;
        detectiveCard.appendChild(scoreBar);

        // Clue Box
        const clueBox = document.createElement('div');
        clueBox.className = 'detective-clue-box';
        clueBox.innerHTML = `
            <div class="detective-clue-title">${challenge.category === 'historisk' ? (isEn ? '⏳ Historical Tool / Action' : '⏳ Historisk redskab eller handling') : (isEn ? '✨ Modern Tool' : '✨ Moderne husredskab')}</div>
            <div class="detective-clue-text">"${isEn ? challenge.clueEn : challenge.clue}"</div>
            <button class="listen-btn" id="btn-listen-clue" style="margin: 0 auto; padding: 0.5rem 1rem; font-size: 0.85rem;">
                <span>🔊</span> ${isEn ? 'Listen to clue' : 'Lyt til ledetråd'}
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
                    scoreBar.querySelector('span:nth-child(2)').textContent = `⭐ ${isEn ? 'Score' : 'Point'}: ${detScore}`;
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                            🎉 ${isEn ? 'Correct!' : 'Helt rigtigt!'} <strong>${opt}</strong>
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
                            ❌ ${isEn ? 'Not quite!' : 'Ikke helt!'} Det rigtige svar er <strong>${challenge.target}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">${challenge.explanation}</div>
                    `;
                }

                feedbackBox.style.display = 'block';

                const nextBtn = document.createElement('button');
                nextBtn.className = 'detective-next-btn';
                nextBtn.innerHTML = detIdx + 1 < detFilteredList.length 
                    ? `<span>${isEn ? 'Next Tool' : 'Næste redskab'}</span> →` 
                    : `<span>🏆 ${isEn ? 'See Result' : 'Se dit resultat'}</span>`;
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
                    ${isEn ? 'Outstanding Detective Work!' : 'Fantastisk detektivarbejde!'}
                </h2>
                <p style="font-size: 1.2rem; color: #f8fafc; margin-bottom: 1.5rem;">
                    ${isEn ? 'You scored' : 'Du fik'} <strong>${detScore}</strong> ${isEn ? 'out of' : 'ud af'} <strong>${detFilteredList.length}</strong> ${isEn ? 'points' : 'point'}!
                </p>
                <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6;">
                    ${isEn 
                        ? 'You now master the key Danish terms for both modern laundry tools and historical 19th-century traditions like "at rulle tøj" with a mangle board.' 
                        : 'Du mestrer nu både de moderne redskaber og 1800-tallets historiske traditioner som "at rulle tøj" med mangelbræt, vaskebræt og kulstrygejern.'}
                </p>
                <button class="detective-next-btn" id="btn-restart-detective">
                    🔄 ${isEn ? 'Try Again' : 'Prøv igen'}
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
    // TAB 4: 🧱 SÆTNINGSBYGGER (Når, Så & Inversion)
    // =========================================================================
    const panelSaetning = document.createElement('div');
    panelSaetning.className = `song-panel ${currentTab === 'tab_saetning' ? 'active' : ''}`;
    panelSaetning.dataset.panel = 'tab_saetning';

    const builderCard = document.createElement('div');
    builderCard.className = 'builder-card';

    const builderPuzzles = [
        {
            prompt: 'Byg sætningen om fortidens tøjrulning (Forfelt ➔ Inversion):',
            promptEn: 'Build the sentence about historical mangle rolling (Front field ➔ Inversion):',
            targetTokens: ['I 1800-tallet', 'rullede', 'kvinderne', 'tøjet med et mangelbræt.'],
            tokenTypes: ['forfelt', 'verbum', 'subjekt', 'objekt'],
            fullSentence: 'I 1800-tallet rullede kvinderne tøjet med et mangelbræt.',
            ruleTip: 'Forfelt ("I 1800-tallet") + Verbum på plads 2 ("rullede") + Subjekt ("kvinderne") + Præpositionsled.'
        },
        {
            prompt: 'Byg sætningen med "når" (Ledsætning først ➔ Inversion i hovedsætningen):',
            promptEn: 'Build the sentence with "når" (Subordinate clause first ➔ Inversion in main clause):',
            targetTokens: ['Når vi vasker tøj,', 'sorterer', 'vi', 'farverne først.'],
            tokenTypes: ['forfelt', 'verbum', 'subjekt', 'objekt'],
            fullSentence: 'Når vi vasker tøj, sorterer vi farverne først.',
            ruleTip: 'Når en ledsætning står forrest som Forfelt (Felt 1), kommer verbet på 2. plads: "sorterer" (V) + "vi" (S).'
        },
        {
            prompt: 'Byg sangens klassiske verslinje med "Så" (Forfelt ➔ Verbum ➔ Subjekt):',
            promptEn: 'Build the song’s classic line with "Så" (Front field ➔ Verb ➔ Subject):',
            targetTokens: ['Så', 'gør', 'vi', 'sådan.'],
            tokenTypes: ['forfelt', 'verbum', 'subjekt', 'adverbial'],
            fullSentence: 'Så gør vi sådan.',
            ruleTip: 'Ordet "Så" tager Forfeltet (Felt 1), så verbet "gør" står på 2. plads.'
        },
        {
            prompt: 'Byg sætningen om mandag morgen (Tidsangivelse forrest ➔ Inversion):',
            promptEn: 'Build the time expression (Time in front field ➔ Inversion):',
            targetTokens: ['Tidlig en mandag morgen', 'starter', 'mor', 'vaskemaskinen.'],
            tokenTypes: ['forfelt', 'verbum', 'subjekt', 'objekt'],
            fullSentence: 'Tidlig en mandag morgen starter mor vaskemaskinen.',
            ruleTip: 'Tidsudtrykket "Tidlig en mandag morgen" udgør ét samlet Forfelt. Derefter kommer verbet "starter".'
        },
        {
            prompt: 'Byg sætningen om strygning med dampjern:',
            promptEn: 'Build the sentence about ironing with a steam iron:',
            targetTokens: ['Når skjorten er krøllet,', 'bruger', 'vi', 'et dampstrygejern.'],
            tokenTypes: ['forfelt', 'verbum', 'subjekt', 'objekt'],
            fullSentence: 'Når skjorten er krøllet, bruger vi et dampstrygejern.',
            ruleTip: 'Ledsætning ("Når skjorten er krøllet,") + Verbum ("bruger") + Subjekt ("vi") + Objekt ("et dampstrygejern").'
        }
    ];

    let puzIdx = 0;

    function renderBuilderPuzzle() {
        builderCard.innerHTML = '';
        const puzzle = builderPuzzles[puzIdx];

        // Grammar Legend
        const legend = document.createElement('div');
        legend.className = 'builder-grammar-legend';
        legend.innerHTML = `
            <span style="color: #94a3b8; margin-right: 0.4rem;">${isEn ? 'Grammar code:' : 'Grammatisk farvekode:'}</span>
            <span class="legend-chip chip-forfelt">${isEn ? 'Purple: Front Field / Clause' : 'Lilla: Forfelt / Ledsætning'}</span>
            <span class="legend-chip chip-verbum">${isEn ? 'Red: Verb (Pos. 2)' : 'Rød: Verbum (Plads 2)'}</span>
            <span class="legend-chip chip-subjekt">${isEn ? 'Green: Subject' : 'Grøn: Subjekt'}</span>
            <span class="legend-chip chip-objekt">${isEn ? 'Blue: Object' : 'Blå: Objekt'}</span>
            <span class="legend-chip chip-adverbial">${isEn ? 'Orange: Adverbial' : 'Orange: Adverbial'}</span>
        `;
        builderCard.appendChild(legend);

        // Header
        const header = document.createElement('div');
        header.className = 'builder-task-header';
        header.innerHTML = `
            <span class="builder-prompt-text">${isEn ? puzzle.promptEn : puzzle.prompt}</span>
            <span style="color: #fbbf24; font-weight: 800; font-size: 0.9rem;">${isEn ? 'Exercise' : 'Øvelse'} ${puzIdx + 1} / ${builderPuzzles.length}</span>
        `;
        builderCard.appendChild(header);

        // Drop zone
        const dropZone = document.createElement('div');
        dropZone.className = 'builder-drop-zone';

        // Tiles pool
        const tilesPool = document.createElement('div');
        tilesPool.className = 'builder-tiles-pool';

        let placedTokens = [];

        const shuffledTokens = puzzle.targetTokens.map((token, i) => ({
            text: token,
            type: puzzle.tokenTypes[i],
            origIndex: i
        })).sort(() => Math.random() - 0.5);

        function updateDropZoneUI() {
            dropZone.innerHTML = '';
            if (placedTokens.length === 0) {
                dropZone.innerHTML = `<span style="color: #64748b; font-style: italic;">${isEn ? 'Click tiles below to build the sentence...' : 'Klik på brikkerne nedenfor for at placere dem her...'}</span>`;
                dropZone.classList.remove('filled');
            } else {
                dropZone.classList.add('filled');
                placedTokens.forEach((item, idx) => {
                    const tile = document.createElement('div');
                    tile.className = `builder-word-tile tile-${item.type}`;
                    tile.innerHTML = `<span>${item.text}</span> <span style="font-size: 0.75rem; opacity: 0.7;">✕</span>`;
                    tile.onclick = () => {
                        placedTokens.splice(idx, 1);
                        tilesPool.appendChild(item.element);
                        item.element.style.display = 'inline-flex';
                        updateDropZoneUI();
                        feedbackDiv.style.display = 'none';
                    };
                    dropZone.appendChild(tile);
                });
            }
        }

        shuffledTokens.forEach(item => {
            const tileBtn = document.createElement('div');
            tileBtn.className = `builder-word-tile tile-${item.type}`;
            tileBtn.textContent = item.text;
            item.element = tileBtn;

            tileBtn.onclick = () => {
                placedTokens.push(item);
                tileBtn.style.display = 'none';
                updateDropZoneUI();
                feedbackDiv.style.display = 'none';
            };
            tilesPool.appendChild(tileBtn);
        });

        builderCard.appendChild(dropZone);
        builderCard.appendChild(tilesPool);

        // Feedback box
        const feedbackDiv = document.createElement('div');
        feedbackDiv.style.display = 'none';
        feedbackDiv.style.marginBottom = '1.2rem';
        feedbackDiv.style.padding = '1.1rem';
        feedbackDiv.style.borderRadius = '14px';
        feedbackDiv.style.background = '#0f172a';
        builderCard.appendChild(feedbackDiv);

        // Controls
        const controlsRow = document.createElement('div');
        controlsRow.className = 'builder-controls-row';

        const resetBtn = document.createElement('button');
        resetBtn.className = 'builder-btn builder-btn-reset';
        resetBtn.innerHTML = `<span>🔄</span> ${isEn ? 'Reset' : 'Nulstil'}`;
        resetBtn.onclick = () => { renderBuilderPuzzle(); };
        controlsRow.appendChild(resetBtn);

        const checkBtn = document.createElement('button');
        checkBtn.className = 'builder-btn builder-btn-check';
        checkBtn.innerHTML = `<span>✓</span> ${isEn ? 'Check Sentence' : 'Tjek sætning'}`;
        checkBtn.onclick = () => {
            const currentSentence = placedTokens.map(t => t.text).join(' ');
            const targetSentence = puzzle.targetTokens.join(' ');

            if (currentSentence === targetSentence) {
                dropZone.classList.add('success');
                feedbackDiv.style.display = 'block';
                feedbackDiv.style.border = '1.5px solid #22c55e';
                feedbackDiv.innerHTML = `
                    <div style="color: #4ade80; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">
                        🎉 ${isEn ? 'Perfect Danish word order!' : 'Helt perfekt dansk ordstilling!'}
                    </div>
                    <div style="color: #f8fafc; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
                        "${puzzle.fullSentence}"
                    </div>
                    <div style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.5; margin-bottom: 1rem;">
                        💡 <strong>${isEn ? 'Grammar note:' : 'Grammatik-regel:'}</strong> ${puzzle.ruleTip}
                    </div>
                `;

                speakDanish(puzzle.fullSentence);

                const nextBtn = document.createElement('button');
                nextBtn.className = 'builder-btn builder-btn-next';
                nextBtn.innerHTML = puzIdx + 1 < builderPuzzles.length 
                    ? `<span>${isEn ? 'Next Sentence' : 'Næste sætning'}</span> →` 
                    : `<span>🏆 ${isEn ? 'All Built!' : 'Alle sætninger gennemført!'}</span>`;
                nextBtn.onclick = () => {
                    if (puzIdx + 1 < builderPuzzles.length) {
                        puzIdx++;
                        renderBuilderPuzzle();
                    } else {
                        renderBuilderFinish();
                    }
                };
                feedbackDiv.appendChild(nextBtn);
            } else {
                feedbackDiv.style.display = 'block';
                feedbackDiv.style.border = '1.5px solid #ef4444';
                feedbackDiv.innerHTML = `
                    <div style="color: #f87171; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.4rem;">
                        ❌ ${isEn ? 'Not quite right yet.' : 'Ikke helt rigtigt endnu.'}
                    </div>
                    <div style="color: #cbd5e1; font-size: 0.95rem;">
                        ${isEn ? 'Tip: Remember that the finite verb must occupy Position 2 in the main clause!' : 'Husk V2-reglen: Det bøjede verbum skal altid stå på 2. plads i hovedsætningen!'}
                    </div>
                `;
            }
        };
        controlsRow.appendChild(checkBtn);

        builderCard.appendChild(controlsRow);
        updateDropZoneUI();
    }

    function renderBuilderFinish() {
        builderCard.innerHTML = `
            <div style="text-align: center; padding: 2rem 1rem;">
                <div style="font-size: 3.5rem; margin-bottom: 0.8rem;">🌟🧱🇩🇰</div>
                <h2 style="font-size: 1.8rem; color: #fbbf24; margin-bottom: 0.6rem;">
                    ${isEn ? 'Sentence Master!' : 'Fantastisk! Du mestrer ledsætninger og V2-ordstilling!'}
                </h2>
                <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6; font-size: 1.1rem;">
                    ${isEn 
                        ? 'You have successfully practiced Danish word order with "når", "så", and front-field time expressions.' 
                        : 'Du har mestret inversion efter forfelt og ledsætninger med "når", så dine sætninger flyder naturligt og grammatisk korrekt.'}
                </p>
                <button class="builder-btn builder-btn-check" id="btn-restart-builder" style="margin: 0 auto;">
                    🔄 ${isEn ? 'Try Again' : 'Byg igen'}
                </button>
            </div>
        `;
        builderCard.querySelector('#btn-restart-builder').onclick = () => {
            puzIdx = 0;
            renderBuilderPuzzle();
        };
    }

    renderBuilderPuzzle();
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
                    🔗 ${isEn ? 'Matching Exercise' : 'Parringsøvelse: Forbind verbet med redskabet'}
                </span>
                <div class="mgs-title" style="margin-top: 0.6rem;">
                    ${isEn ? 'Connect the song’s verbs with the historical tools and modern equivalents:' : 'Forbind sangens verber med de historiske og moderne redskaber:'}
                </div>
                <div class="mgs-sub">
                    ${isEn ? 'Click a verb on the left, then click its corresponding tool on the right!' : 'Klik på et verbum til venstre, og klik derefter på det tilhørende redskab til højre!'}
                </div>
            </div>
            <div class="matching-columns-container">
                <div>
                    <div class="mgs-col-title">🔴 ${isEn ? 'Verbs from the song' : 'Sangens verber'}</div>
                    <div class="mgs-cards-list" id="mgs-verbs-list"></div>
                </div>
                <div>
                    <div class="mgs-col-title">⏳ ${isEn ? 'Historical tools (Dengang)' : 'Datidens redskaber (Dengang)'}</div>
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
                                ${isEn ? 'All pairs matched perfectly!' : 'Alle par er forbundet helt perfekt!'}
                            </div>
                            <div style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1rem;">
                                ${isEn ? 'You master all verbs and domestic tools across generations.' : 'Du har fuldt overblik over sangens verber og husarbejdets redskaber gennem tiderne.'}
                            </div>
                            <button class="builder-btn builder-btn-check" id="btn-restart-matching" style="margin: 0 auto;">
                                🔄 ${isEn ? 'Play Matching Again' : 'Spil parring igen'}
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
        <span class="tribute-badge">👑 ${isEn ? 'Tribute to Domestic Care' : 'Hyldest til omsorgsarbejdet i hjemmet'}</span>
        <div class="tribute-text">
            ${isEn 
                ? '“Household care is the silent work that makes all other work possible. When clothes are clean, floors are washed, and the home is peaceful, it provides safety, health, and dignity for everyone. Domestic work deserves the utmost respect and recognition.”' 
                : '“Husarbejde er det usynlige fundament, der gør alt andet arbejde i samfundet muligt. Når tøjet er rent, gulvet er vasket og hjemmet emmer af ro, skaber det sundhed, tryghed og livsglæde for hele familien. Husarbejde er et værdigt og værdifuldt arbejde, der fortjener den dybeste anerkendelse.”'}
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
                    <div class="saf-title">${isEn ? 'Listen to the Melody: "Så går vi rundt om en enebærbusk"' : 'Lyt til melodien: "Så går vi rundt om en enebærbusk"'}</div>
                    <div class="saf-sub">${isEn ? 'Sing along and play the cheerful traditional melody' : 'Syng med og lyt til den klassiske melodi til sanglegen her'}</div>
                </div>
            </div>
            <div class="saf-actions">
                <a href="https://youtu.be/Gr5KXEBk5F4?si=m2tnGwcTjOeVaGbT" target="_blank" rel="noopener noreferrer" class="saf-youtube-btn">
                    <span>▶️</span> ${isEn ? 'Play on YouTube' : 'Hør melodi på YouTube'}
                </a>
                <button class="saf-embed-toggle-btn" id="btn-toggle-yt-player">
                    <span>📺</span> <span id="yt-toggle-label">${isEn ? 'Show Player' : 'Vis afspiller'}</span>
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
            ? (isEn ? 'Hide Player' : 'Skjul afspiller') 
            : (isEn ? 'Show Player' : 'Vis afspiller');
    };

    viewContainer.appendChild(audioFooterCard);

    // Initial subPath routing check
    if (extraData && extraData.subPath) {
        switchTab(extraData.subPath);
    }

    container.appendChild(viewContainer);
}
