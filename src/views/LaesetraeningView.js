import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

/**
 * LaesetraeningView - Lyd for Lyd
 * Indeholder 3 øvelser:
 * 1. Tæl lyde (Sound Boxes)
 * 2. Byg et ord (Pyramid Sound Builder)
 * 3. Kan du høre forskel? (Minimal Pairs Discrimination)
 */
export function renderLaesetraeningView(container, navigateFn, extraData = {}) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container laesetraening-container';

    // Inject Styles once
    if (!document.getElementById('laesetraening-styles')) {
        const style = document.createElement('style');
        style.id = 'laesetraening-styles';
        style.textContent = `
            .laesetraening-container {
                display: flex;
                flex-direction: column;
                min-height: 85vh;
                background-color: #152A24;
                color: #e0e0e0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                position: relative;
                align-items: center;
                padding: 1rem 0.8rem 3rem;
                box-sizing: border-box;
                width: 100%;
                max-width: 700px;
                margin: 0 auto;
                border-radius: 16px;
            }
            .laese-top-bar {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.2rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .laese-back-btn {
                background: none;
                border: none;
                color: #a0b0a8;
                font-size: 0.95rem;
                font-weight: 700;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.3rem;
                padding: 0.3rem 0.6rem;
                border-radius: 8px;
            }
            .laese-back-btn:hover {
                color: white;
                background: rgba(255, 255, 255, 0.08);
            }
            .laese-progress-text {
                font-size: 0.9rem;
                color: #a0b0a8;
                font-weight: bold;
            }

            /* MAIN MENU */
            .laese-main-menu {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.2rem;
                width: 100%;
                max-width: 420px;
                margin-top: 1rem;
            }
            .laese-main-title {
                font-size: 2rem;
                font-weight: 800;
                color: #FFC107;
                text-align: center;
                margin-bottom: 0.2rem;
            }
            .laese-main-subtitle {
                font-size: 1.05rem;
                color: rgba(255, 255, 255, 0.7);
                text-align: center;
                margin-bottom: 1.2rem;
            }
            .laese-mode-btn {
                width: 100%;
                background-color: rgba(30, 58, 47, 0.85);
                border: 2px solid;
                border-radius: 16px;
                padding: 1.4rem 1.5rem;
                font-size: 1.35rem;
                font-weight: 800;
                cursor: pointer;
                transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
                text-align: center;
                box-shadow: 0 6px 16px rgba(0,0,0,0.3);
            }
            .laese-mode-btn:hover {
                transform: translateY(-2px);
                background-color: #234739;
            }
            .laese-mode-btn:active {
                transform: scale(0.98);
            }

            /* SET SELECTION MENU */
            .laese-set-menu {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                width: 100%;
                max-width: 440px;
            }
            .laese-set-btn {
                width: 100%;
                background-color: #1E3A2F;
                border: 2px solid;
                border-radius: 14px;
                padding: 1rem 1.2rem;
                cursor: pointer;
                transition: all 0.2s;
                text-align: left;
                display: flex;
                flex-direction: column;
                box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            }
            .laese-set-btn:hover {
                transform: translateY(-2px);
                background-color: #264b3c;
            }
            .laese-set-title {
                font-weight: 800;
                font-size: 1.25rem;
                margin-bottom: 0.2rem;
            }
            .laese-set-desc {
                font-size: 0.88rem;
                color: rgba(255, 255, 255, 0.7);
            }

            /* BYG ET ORD (PYRAMIDE) */
            .build-pyramid-box {
                background: #1E3A2F;
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 14px;
                padding: 1.5rem 1.8rem;
                min-width: 260px;
                max-width: 90%;
                text-align: center;
                margin-bottom: 1.5rem;
                box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            }
            .build-pyramid-line {
                font-weight: 800;
                letter-spacing: 6px;
                margin-bottom: 0.8rem;
                transition: all 0.2s;
            }
            .build-pyramid-line.active {
                color: #FF9800;
                font-size: 2.2rem;
                letter-spacing: 4px;
            }
            .build-pyramid-line.past {
                color: rgba(255, 255, 255, 0.4);
                font-size: 1.6rem;
            }
            .build-pyramid-line.final {
                color: #4CAF50;
                font-size: 2.6rem;
                letter-spacing: 3px;
            }

            /* KAN DU HØRE FORSKEL */
            .minpairs-audio-btn {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                background: #FF9800;
                color: white;
                border: none;
                font-size: 2.4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
                transition: transform 0.2s, background-color 0.2s;
                margin: 0 auto 1.8rem;
            }
            .minpairs-audio-btn:hover {
                transform: scale(1.06);
                background: #f57c00;
            }
            .minpairs-audio-btn:active {
                transform: scale(0.95);
            }
            .minpairs-cards-row {
                display: flex;
                gap: 1rem;
                width: 100%;
                max-width: 440px;
                justify-content: center;
                margin-bottom: 1.5rem;
            }
            .minpair-card {
                flex: 1;
                background: #1E3A2F;
                border: 2px solid rgba(255, 255, 255, 0.15);
                border-radius: 14px;
                padding: 1.4rem 1rem;
                font-size: 1.6rem;
                font-weight: 800;
                color: white;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            }
            .minpair-card:hover:not(:disabled) {
                background: #264b3c;
                border-color: #FF9800;
                transform: translateY(-2px);
            }
            .minpair-card.correct {
                background: rgba(76, 175, 80, 0.25) !important;
                border-color: #4CAF50 !important;
                color: #81c784 !important;
            }
            .minpair-card.wrong {
                background: rgba(244, 67, 54, 0.25) !important;
                border-color: #f44336 !important;
                color: #e57373 !important;
            }

            /* TÆL LYDE (SOUND BOXES) */
            .laese-token {
                background-color: #4caf50;
                color: white;
                width: 52px;
                height: 52px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 1rem;
                cursor: pointer;
                user-select: none;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                transition: transform 0.15s;
            }
            .laese-token:hover {
                transform: scale(1.05);
            }
            .laese-dropzone {
                width: 95%;
                max-width: 440px;
                min-height: 100px;
                border: 2px solid #3a5c4d;
                border-radius: 12px;
                background-color: #1E3A2F;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin-bottom: 1.5rem;
                position: relative;
                flex-wrap: wrap;
                padding: 10px;
                box-sizing: border-box;
            }
            .laese-dropzone-placeholder {
                color: #6a8c7d;
                position: absolute;
                pointer-events: none;
                font-size: 0.95rem;
            }

            /* ACTION BUTTONS */
            .laese-action-btn {
                background-color: #3e5248;
                color: #b0c4ba;
                border: none;
                border-radius: 10px;
                padding: 0.65rem 1.4rem;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                transition: background-color 0.2s, transform 0.1s;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 0.4rem;
            }
            .laese-action-btn:hover {
                background-color: #4a6356;
                color: white;
            }
            .laese-action-btn:active {
                transform: scale(0.96);
            }
            .laese-action-btn.primary {
                background-color: #FF9800;
                color: white;
            }
            .laese-action-btn.primary:hover {
                background-color: #f57c00;
            }
            .laese-action-btn.green {
                background-color: #4caf50;
                color: white;
            }
            .laese-action-btn.green:hover {
                background-color: #43a047;
            }

            /* MIC BUTTON */
            .laese-btn-mic {
                width: 65px;
                height: 65px;
                border-radius: 50%;
                border: none;
                background-color: #4caf50;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8rem;
                cursor: pointer;
                color: white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                transition: transform 0.2s;
            }
            .laese-btn-mic:active {
                transform: scale(0.92);
            }
            .laese-btn-mic.listening {
                background-color: #f44336;
                animation: pulse-red 1.2s infinite;
            }
            @keyframes pulse-red {
                0% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7); }
                70% { box-shadow: 0 0 0 16px rgba(244, 67, 54, 0); }
                100% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0); }
            }
        `;
        document.head.appendChild(style);
    }

    // -----------------------------------------------------
    // ALL AUDIO FILES SET (Pre-indexed for zero-latency lookup)
    // -----------------------------------------------------
    const RECORDED_AUDIO_FILES = new Set([
        'banan_1.wav', 'banan_2.wav', 'banan_3.wav', 'banan_4.wav', 'banan_5.wav',
        'ben_1.wav', 'ben_2.wav', 'ben_3.wav',
        'blomst_1.wav', 'blomst_2.wav', 'blomst_3.wav', 'blomst_4.wav', 'blomst_5.wav', 'blomst_6.wav',
        'bus_1.wav', 'bus_2.wav', 'bus_3.wav',
        'frisk_1.wav', 'frisk_2.wav', 'frisk_3.wav', 'frisk_4.wav', 'frisk_5.wav',
        'glas_1.wav', 'glas_2.wav', 'glas_3.wav', 'glas_4.wav',
        'hus_1.wav', 'hus_2.wav', 'hus_3.wav',
        'kat_1.wav', 'kat_2.wav', 'kat_3.wav',
        'lys_1.wav', 'lys_2.wav', 'lys_3.wav',
        'mad_1.wav', 'mad_2.wav', 'mad_3.wav',
        'maelk_1.wav', 'maelk_2.wav', 'maelk_3.wav', 'maelk_4.wav',
        'pen_1.wav', 'pen_2.wav', 'pen_3.wav',
        'plakat_1.wav', 'plakat_2.wav', 'plakat_3.wav', 'plakat_4.wav', 'plakat_5.wav', 'plakat_6.wav',
        'prins_1.wav', 'prins_2.wav', 'prins_3.wav', 'prins_4.wav', 'prins_5.wav',
        'sko_1.wav', 'sko_2.wav', 'sko_3.wav',
        'slik_1.wav', 'slik_2.wav', 'slik_3.wav', 'slik_4.wav',
        'sol_1.wav', 'sol_2.wav', 'sol_3.wav',
        'stol_1.wav', 'stol_2.wav', 'stol_3.wav', 'stol_4.wav',
        'stroem_1.wav', 'stroem_2.wav', 'stroem_3.wav', 'stroem_4.wav', 'stroem_5.wav',
        'vin_1.wav', 'vin_2.wav', 'vin_3.wav'
    ]);

    // TTS Setup
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }

    let activeAudio = null;
    function playAudioOrTTS(audioFilename, fallbackText) {
        if (activeAudio) {
            try { activeAudio.pause(); } catch(e){}
            activeAudio = null;
        }

        const safeFilename = audioFilename.replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa');
        if (RECORDED_AUDIO_FILES.has(safeFilename) || RECORDED_AUDIO_FILES.has(audioFilename)) {
            const fileToPlay = RECORDED_AUDIO_FILES.has(safeFilename) ? safeFilename : audioFilename;
            activeAudio = new Audio(`${baseUrl}assets/audio/${fileToPlay}`);
            activeAudio.play().catch(() => speakDanish(fallbackText));
        } else {
            speakDanish(fallbackText);
        }
    }

    // -----------------------------------------------------
    // DATA SETS FOR THE 3 EXERCISES
    // -----------------------------------------------------
    const SETS_DATA = {
        1: {
            title: "Sæt 1",
            subtitle: "Fundamentet (Korte ord)",
            color: "#FFC107",
            countWords: [
                { word: 'sol', count: 3, audioFile: 'laese_set1_sol.m4a' },
                { word: 'bus', count: 3, audioFile: 'laese_set1_bus.m4a' },
                { word: 'mad', count: 3, audioFile: 'laese_set1_mad.m4a' },
                { word: 'hus', count: 3, audioFile: 'laese_set1_hus.m4a' },
                { word: 'banan', count: 5, audioFile: 'laese_set1_banan.m4a' },
                { word: 'pen', count: 3, audioFile: 'laese_set1_pen.m4a' },
                { word: 'vin', count: 3, audioFile: 'laese_set1_vin.m4a' },
                { word: 'ben', count: 3, audioFile: 'laese_set1_ben.m4a' },
                { word: 'kat', count: 3, audioFile: 'laese_set1_kat.m4a' },
                { word: 'lys', count: 3, audioFile: 'laese_set1_lys.m4a' }
            ],
            buildWords: [
                { word: "SOL", segments: ["s", "so", "sol"] },
                { word: "BUS", segments: ["b", "bu", "bus"] },
                { word: "MAD", segments: ["m", "ma", "mad"] },
                { word: "HUS", segments: ["h", "hu", "hus"] },
                { word: "BANAN", segments: ["b", "ba", "ban", "bana", "banan"] },
                { word: "PEN", segments: ["p", "pe", "pen"] },
                { word: "VIN", segments: ["v", "vi", "vin"] },
                { word: "BEN", segments: ["b", "be", "ben"] },
                { word: "KAT", segments: ["k", "ka", "kat"] },
                { word: "LYS", segments: ["l", "ly", "lys"] }
            ],
            minimalPairs: [
                { word1: "SOL", word2: "SAL", correct: "SOL" },
                { word1: "BUS", word2: "HUS", correct: "BUS" },
                { word1: "MAD", word2: "MØD", correct: "MAD" },
                { word1: "HUS", word2: "MUS", correct: "MUS" },
                { word1: "BANAN", word2: "BANAL", correct: "BANAN" },
                { word1: "PEN", word2: "BEN", correct: "BEN" },
                { word1: "VIN", word2: "FIN", correct: "VIN" },
                { word1: "BEN", word2: "BØN", correct: "BØN" },
                { word1: "KAT", word2: "NAT", correct: "KAT" },
                { word1: "LYS", word2: "LÅS", correct: "LYS" }
            ]
        },
        2: {
            title: "Sæt 2",
            subtitle: "Konsonantklynger",
            color: "#FF9800",
            countWords: [
                { word: 'sko', count: 3, audioFile: 'laese_set2_sko.m4a' },
                { word: 'stol', count: 4, audioFile: 'laese_set2_stol.m4a' },
                { word: 'mælk', count: 4, audioFile: 'laese_set2_maelk.m4a' },
                { word: 'plakat', count: 6, audioFile: 'laese_set2_plakat.m4a' },
                { word: 'slik', count: 4, audioFile: 'laese_set2_slik.m4a' },
                { word: 'prins', count: 5, audioFile: 'laese_set2_prins.m4a' },
                { word: 'glas', count: 4, audioFile: 'laese_set2_glas.m4a' },
                { word: 'strøm', count: 5, audioFile: 'laese_set2_stroem.m4a' },
                { word: 'frisk', count: 5, audioFile: 'laese_set2_frisk.m4a' },
                { word: 'blomst', count: 6, audioFile: 'laese_set2_blomst.m4a' }
            ],
            buildWords: [
                { word: "SKO", segments: ["s", "sk", "sko"] },
                { word: "STOL", segments: ["s", "st", "sto", "stol"] },
                { word: "MÆLK", segments: ["m", "mæ", "mæl", "mælk"] },
                { word: "PLAKAT", segments: ["p", "pl", "pla", "plak", "plaka", "plakat"] },
                { word: "SLIK", segments: ["s", "sl", "sli", "slik"] },
                { word: "PRINS", segments: ["p", "pr", "pri", "prin", "prins"] },
                { word: "GLAS", segments: ["g", "gl", "gla", "glas"] },
                { word: "STRØM", segments: ["s", "st", "str", "strø", "strøm"] },
                { word: "FRISK", segments: ["f", "fr", "fri", "fris", "frisk"] },
                { word: "BLOMST", segments: ["b", "bl", "blo", "blom", "bloms", "blomst"] }
            ],
            minimalPairs: [
                { word1: "SKO", word2: "SNO", correct: "SKO" },
                { word1: "STOL", word2: "STÅL", correct: "STOL" },
                { word1: "MÆLK", word2: "MÆRK", correct: "MÆLK" },
                { word1: "PLAKAT", word2: "PRAKAT", correct: "PLAKAT" },
                { word1: "SLIK", word2: "STIK", correct: "SLIK" },
                { word1: "PRINS", word2: "PRINT", correct: "PRINS" },
                { word1: "GLAS", word2: "GLAT", correct: "GLAS" },
                { word1: "STRØM", word2: "STRAM", correct: "STRØM" },
                { word1: "FRISK", word2: "FRIST", correct: "FRISK" },
                { word1: "BLOMST", word2: "KLOMST", correct: "BLOMST" }
            ]
        },
        3: {
            title: "Sæt 3",
            subtitle: "Vokalkombinationer (Hiatus)",
            color: "#2196F3",
            countWords: [
                { word: 'kaos', count: 4, audioFile: 'laese_set3_kaos.m4a' },
                { word: 'kiosk', count: 5, audioFile: 'laese_set3_kiosk.m4a' },
                { word: 'ruin', count: 4, audioFile: 'laese_set3_ruin.m4a' },
                { word: 'viol', count: 4, audioFile: 'laese_set3_viol.m4a' },
                { word: 'oase', count: 4, audioFile: 'laese_set3_oase.m4a' },
                { word: 'poet', count: 4, audioFile: 'laese_set3_poet.m4a' },
                { word: 'radio', count: 5, audioFile: 'laese_set3_radio.m4a' },
                { word: 'piano', count: 5, audioFile: 'laese_set3_piano.m4a' },
                { word: 'koala', count: 5, audioFile: 'laese_set3_koala.m4a' },
                { word: 'fias', count: 4, audioFile: 'laese_set3_fias.m4a' }
            ],
            buildWords: [
                { word: "KAOS", segments: ["k", "ka", "kao", "kaos"] },
                { word: "KIOSK", segments: ["k", "ki", "kio", "kios", "kiosk"] },
                { word: "RUIN", segments: ["r", "ru", "rui", "ruin"] },
                { word: "VIOL", segments: ["v", "vi", "vio", "viol"] },
                { word: "OASE", segments: ["o", "oa", "oas", "oase"] },
                { word: "POET", segments: ["p", "po", "poe", "poet"] },
                { word: "RADIO", segments: ["r", "ra", "rad", "radi", "radio"] },
                { word: "PIANO", segments: ["p", "pi", "pia", "pian", "piano"] },
                { word: "KOALA", segments: ["k", "ko", "koa", "koal", "koala"] },
                { word: "FIAS", segments: ["f", "fi", "fia", "fias"] }
            ],
            minimalPairs: [
                { word1: "KAOS", word2: "KOAS", correct: "KAOS" },
                { word1: "KIOSK", word2: "KUOSK", correct: "KIOSK" },
                { word1: "RUIN", word2: "ROIN", correct: "RUIN" },
                { word1: "VIOL", word2: "VEOL", correct: "VIOL" },
                { word1: "OASE", word2: "UASE", correct: "OASE" },
                { word1: "POET", word2: "PUET", correct: "POET" },
                { word1: "RADIO", word2: "RADEA", correct: "RADIO" },
                { word1: "PIANO", word2: "PEANO", correct: "PIANO" },
                { word1: "KOALA", word2: "KAOLA", correct: "KOALA" },
                { word1: "FIAS", word2: "FEAS", correct: "FIAS" }
            ]
        },
        4: {
            title: "Modultest",
            subtitle: "Vrøvleord (Fonetisk test)",
            color: "#E91E63",
            countWords: [
                { word: 'mys', count: 3, audioFile: 'laese_set4_mys.m4a' },
                { word: 'bøt', count: 3, audioFile: 'laese_set4_boet.m4a' },
                { word: 'dul', count: 3, audioFile: 'laese_set4_dul.m4a' },
                { word: 'sæn', count: 3, audioFile: 'laese_set4_saen.m4a' },
                { word: 'epi', count: 3, audioFile: 'laese_set4_epi.m4a' },
                { word: 'flæ', count: 3, audioFile: 'laese_set4_flae.m4a' },
                { word: 'smø', count: 3, audioFile: 'laese_set4_smoe.m4a' },
                { word: 'prå', count: 3, audioFile: 'laese_set4_praa.m4a' },
                { word: 'klu', count: 3, audioFile: 'laese_set4_klu.m4a' },
                { word: 'vri', count: 3, audioFile: 'laese_set4_vri.m4a' }
            ],
            buildWords: [
                { word: "MYS", segments: ["m", "my", "mys"] },
                { word: "BØT", segments: ["b", "bø", "bøt"] },
                { word: "DUL", segments: ["d", "du", "dul"] },
                { word: "SÆN", segments: ["s", "sæ", "sæn"] },
                { word: "EPI", segments: ["e", "ep", "epi"] },
                { word: "FLÆ", segments: ["f", "fl", "flæ"] },
                { word: "SMØ", segments: ["s", "sm", "smø"] },
                { word: "PRÅ", segments: ["p", "pr", "prå"] },
                { word: "KLU", segments: ["k", "kl", "klu"] },
                { word: "VRI", segments: ["v", "vr", "vri"] }
            ],
            minimalPairs: [
                { word1: "MYS", word2: "MOS", correct: "MYS" },
                { word1: "BØT", word2: "BAT", correct: "BØT" },
                { word1: "DUL", word2: "DAL", correct: "DUL" },
                { word1: "SÆN", word2: "SON", correct: "SÆN" },
                { word1: "EPI", word2: "API", correct: "EPI" },
                { word1: "FLÆ", word2: "FLÅ", correct: "FLÆ" },
                { word1: "SMØ", word2: "SMÅ", correct: "SMØ" },
                { word1: "PRÅ", word2: "PRI", correct: "PRÅ" },
                { word1: "KLU", word2: "KLO", correct: "KLU" },
                { word1: "VRI", word2: "VRE", correct: "VRI" }
            ]
        }
    };

    // App Navigation State
    let currentMode = null; // null (main menu), 'count_sounds', 'build_word', 'minimal_pairs'
    let currentSetId = null; // null (set selection), 1, 2, 3, 4
    let currentItemIdx = 0;
    let score = 0;

    // Speech Recognition setup for pronunciation checking
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'da-DK';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
    }

    function render() {
        viewContainer.innerHTML = '';

        // Top Bar
        const topBar = document.createElement('div');
        topBar.className = 'laese-top-bar';

        const backBtn = document.createElement('button');
        backBtn.className = 'laese-back-btn';
        backBtn.innerHTML = `← Tilbage`;
        backBtn.onclick = () => {
            window.speechSynthesis.cancel();
            if (activeAudio) { activeAudio.pause(); activeAudio = null; }
            if (recognition) recognition.abort();

            if (currentSetId !== null) {
                currentSetId = null;
                currentItemIdx = 0;
                score = 0;
                render();
            } else if (currentMode !== null) {
                currentMode = null;
                render();
            } else {
                navigateFn('traen_udtale');
            }
        };
        topBar.appendChild(backBtn);

        // Progress text
        if (currentMode !== null && currentSetId !== null) {
            const list = getItemsForCurrentMode();
            if (list && currentItemIdx < list.length) {
                const prog = document.createElement('div');
                prog.className = 'laese-progress-text';
                prog.textContent = `${currentItemIdx + 1} / ${list.length}`;
                topBar.appendChild(prog);
            }
        }

        viewContainer.appendChild(topBar);

        // Route Views
        if (currentMode === null) {
            renderMainMenu();
        } else if (currentSetId === null) {
            renderSetMenu();
        } else {
            const list = getItemsForCurrentMode();
            if (currentItemIdx < list.length) {
                if (currentMode === 'count_sounds') renderCountSoundsExercise(list[currentItemIdx]);
                else if (currentMode === 'build_word') renderBuildWordExercise(list[currentItemIdx]);
                else if (currentMode === 'minimal_pairs') renderMinimalPairsExercise(list[currentItemIdx]);
            } else {
                renderCompletion(list.length);
            }
        }
    }

    function getItemsForCurrentMode() {
        if (!currentSetId || !SETS_DATA[currentSetId]) return [];
        if (currentMode === 'count_sounds') return SETS_DATA[currentSetId].countWords;
        if (currentMode === 'build_word') return SETS_DATA[currentSetId].buildWords;
        if (currentMode === 'minimal_pairs') return SETS_DATA[currentSetId].minimalPairs;
        return [];
    }

    // ==========================================
    // 1. MAIN MENU: "Lyd for Lyd"
    // ==========================================
    function renderMainMenu() {
        const wrap = document.createElement('div');
        wrap.className = 'laese-main-menu';

        wrap.innerHTML = `
            <div>
                <div class="laese-main-title">Lyd for Lyd</div>
                <div class="laese-main-subtitle">Vælg en øvelse</div>
            </div>

            <button class="laese-mode-btn" id="btn-mode-count" style="color: #FFC107; border-color: rgba(255, 193, 7, 0.4);">
                Tæl lyde
            </button>

            <button class="laese-mode-btn" id="btn-mode-build" style="color: #FF9800; border-color: rgba(255, 152, 0, 0.4);">
                Byg et ord
            </button>

            <button class="laese-mode-btn" id="btn-mode-minpair" style="color: #FF5722; border-color: rgba(255, 87, 34, 0.4);">
                Kan du høre forskel?
            </button>
        `;

        wrap.querySelector('#btn-mode-count').onclick = () => {
            currentMode = 'count_sounds';
            currentSetId = null;
            render();
        };
        wrap.querySelector('#btn-mode-build').onclick = () => {
            currentMode = 'build_word';
            currentSetId = null;
            render();
        };
        wrap.querySelector('#btn-mode-minpair').onclick = () => {
            currentMode = 'minimal_pairs';
            currentSetId = null;
            render();
        };

        viewContainer.appendChild(wrap);
    }

    // ==========================================
    // 2. SET SELECTION MENU
    // ==========================================
    function renderSetMenu() {
        const wrap = document.createElement('div');
        wrap.className = 'laese-set-menu';

        let modeTitle = "Vælg Sværhedsgrad";
        if (currentMode === 'count_sounds') modeTitle = "Tæl lyde – Vælg Sæt";
        if (currentMode === 'build_word') modeTitle = "Byg et ord – Vælg Sæt";
        if (currentMode === 'minimal_pairs') modeTitle = "Hør forskel – Vælg Sæt";

        wrap.innerHTML = `
            <div style="text-align: center; margin-bottom: 0.8rem;">
                <h2 style="font-size: 1.5rem; font-weight: 800; color: #f8fafc; margin: 0 0 0.3rem;">${modeTitle}</h2>
                <p style="font-size: 0.9rem; color: #94a3b8; margin: 0;">Vælg et sæt for at starte øvelsen</p>
            </div>
        `;

        [1, 2, 3, 4].forEach(setId => {
            const s = SETS_DATA[setId];
            const btn = document.createElement('button');
            btn.className = 'laese-set-btn';
            btn.style.borderColor = s.color + '66';
            btn.innerHTML = `
                <div class="laese-set-title" style="color: ${s.color};">${s.title}</div>
                <div class="laese-set-desc">${s.subtitle}</div>
            `;
            btn.onclick = () => {
                currentSetId = setId;
                currentItemIdx = 0;
                score = 0;
                render();
            };
            wrap.appendChild(btn);
        });

        viewContainer.appendChild(wrap);
    }

    // ==========================================
    // 3. BYG ET ORD (PYRAMID SOUND BUILDER)
    // ==========================================
    function renderBuildWordExercise(item) {
        let currentStep = 0; // 0 = start, 1..N = segments revealed
        const segments = item.segments;
        const targetWord = item.word;

        const wrap = document.createElement('div');
        wrap.style.display = 'flex';
        wrap.style.flexDirection = 'column';
        wrap.style.alignItems = 'center';
        wrap.style.width = '100%';
        wrap.style.maxWidth = '460px';

        wrap.innerHTML = `
            <div style="font-size: 1.15rem; color: rgba(255,255,255,0.7); margin-bottom: 1.2rem; text-align: center;">
                Lyt og læs med: Byg ordet lyd for lyd
            </div>

            <!-- Pyramide Boks -->
            <div class="build-pyramid-box" id="pyramid-box">
                <div id="pyramid-content" style="display: flex; flex-direction: column; align-items: center; min-height: 120px; justify-content: center;">
                    <div style="color: rgba(255,255,255,0.4); font-size: 0.95rem;">Tryk på knappen for at starte</div>
                </div>
            </div>

            <!-- Kontrolknapper -->
            <div id="build-controls" style="display: flex; gap: 0.8rem; align-items: center; justify-content: center; margin-bottom: 1.2rem;">
                <button id="btn-replay-step" class="action-btn-primary" style="background: rgba(255,255,255,0.15); display: none; padding: 0.55rem 0.8rem; font-size: 1.2rem;">
                    🔊
                </button>
                <button id="btn-next-step" class="laese-action-btn primary" style="padding: 0.75rem 1.6rem; font-size: 1.1rem;">
                    Start ➔
                </button>
            </div>

            <!-- Færdig Boks (Vises når hele ordet er bygget) -->
            <div id="build-done-box" style="display: none; width: 100%; background: #264D3F; border: 2px solid #FF9800; border-radius: 14px; padding: 1.2rem; text-align: center; box-sizing: border-box;">
                <div style="font-size: 1.15rem; font-weight: 700; color: white; margin-bottom: 0.3rem;">Flot! Nu er ordet bygget.</div>
                <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin-bottom: 1rem;">Lyt til hele ordet, eller optag dig selv.</div>
                
                <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <button id="btn-speak-whole" class="action-btn-primary" style="background: #0284c7; padding: 0.6rem 1rem; font-size: 1rem;">
                        🔊 Lyt igen
                    </button>
                    ${recognition ? `
                        <button id="btn-mic-build" class="laese-btn-mic" style="width: 55px; height: 55px; font-size: 1.5rem;">
                            🎤
                        </button>
                    ` : ''}
                </div>

                <div id="build-mic-feedback" style="min-height: 1.2rem; font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem;"></div>

                <div style="display: flex; justify-content: center; gap: 0.8rem;">
                    <button id="btn-retry-word" class="laese-action-btn" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Prøv igen</button>
                    <button id="btn-next-word" class="laese-action-btn primary" style="padding: 0.5rem 1.4rem; font-size: 0.95rem;">
                        ${currentItemIdx < getItemsForCurrentMode().length - 1 ? 'Næste ord ➔' : 'Afslut 🏆'}
                    </button>
                </div>
            </div>
        `;

        const pyramidContent = wrap.querySelector('#pyramid-content');
        const replayBtn = wrap.querySelector('#btn-replay-step');
        const nextStepBtn = wrap.querySelector('#btn-next-step');
        const doneBox = wrap.querySelector('#build-done-box');
        const micFeedback = wrap.querySelector('#build-mic-feedback');

        function updatePyramidUI() {
            pyramidContent.innerHTML = '';
            for (let i = 0; i < currentStep; i++) {
                const line = document.createElement('div');
                const isFinal = i === segments.length - 1;
                const isCurrent = i === currentStep - 1;

                if (isFinal && isCurrent) {
                    line.className = 'build-pyramid-line final';
                } else if (isCurrent) {
                    line.className = 'build-pyramid-line active';
                } else {
                    line.className = 'build-pyramid-line past';
                }
                line.textContent = segments[i].toUpperCase();
                pyramidContent.appendChild(line);
            }

            if (currentStep > 0) {
                replayBtn.style.display = 'inline-flex';
            }

            if (currentStep < segments.length) {
                nextStepBtn.textContent = currentStep === 0 ? "Start ➔" : "Afslør næste lyd ➔";
            } else {
                // All sounds revealed!
                nextStepBtn.style.display = 'none';
                replayBtn.style.display = 'none';
                doneBox.style.display = 'block';
            }
        }

        function playStepAudio(step) {
            const clean = targetWord.toLowerCase().trim();
            const filename = `${clean}_${step}.wav`;
            playAudioOrTTS(filename, segments[step - 1]);
        }

        nextStepBtn.onclick = () => {
            if (currentStep < segments.length) {
                currentStep++;
                updatePyramidUI();
                playStepAudio(currentStep);
            }
        };

        replayBtn.onclick = () => {
            if (currentStep > 0) {
                playStepAudio(currentStep);
            }
        };

        wrap.querySelector('#btn-speak-whole').onclick = () => {
            playStepAudio(segments.length);
        };

        wrap.querySelector('#btn-retry-word').onclick = () => {
            currentStep = 0;
            doneBox.style.display = 'none';
            nextStepBtn.style.display = 'inline-flex';
            nextStepBtn.textContent = "Start ➔";
            updatePyramidUI();
            if (micFeedback) micFeedback.textContent = '';
        };

        wrap.querySelector('#btn-next-word').onclick = () => {
            currentItemIdx++;
            render();
        };

        // Mic logic
        if (recognition) {
            const micBtn = wrap.querySelector('#btn-mic-build');
            let isRecording = false;

            recognition.onresult = (e) => {
                const text = e.results[0][0].transcript.toLowerCase();
                if (text.includes(targetWord.toLowerCase())) {
                    micFeedback.style.color = '#4CAF50';
                    micFeedback.textContent = `✓ Fantastisk udtalt! "${targetWord}"`;
                } else {
                    micFeedback.style.color = '#FF9800';
                    micFeedback.textContent = `Jeg hørte "${text}". Prøv igen!`;
                }
            };
            recognition.onerror = () => {
                micBtn.classList.remove('listening');
                isRecording = false;
                micFeedback.style.color = '#f44336';
                micFeedback.textContent = 'Kunne ikke høre mikrofonen. Prøv igen.';
            };
            recognition.onend = () => {
                micBtn.classList.remove('listening');
                isRecording = false;
            };

            micBtn.onclick = () => {
                if (isRecording) {
                    recognition.stop();
                    return;
                }
                try {
                    recognition.start();
                    isRecording = true;
                    micBtn.classList.add('listening');
                    micFeedback.style.color = 'white';
                    micFeedback.textContent = 'Lytter... tal nu!';
                } catch(e) {
                    isRecording = false;
                    micBtn.classList.remove('listening');
                }
            };
        }

        viewContainer.appendChild(wrap);
    }

    // ==========================================
    // 4. KAN DU HØRE FORSKEL? (MINIMAL PAIRS)
    // ==========================================
    function renderMinimalPairsExercise(pair) {
        let isAnswered = false;
        const options = [pair.word1, pair.word2].sort(() => Math.random() - 0.5);

        const wrap = document.createElement('div');
        wrap.style.display = 'flex';
        wrap.style.flexDirection = 'column';
        wrap.style.alignItems = 'center';
        wrap.style.width = '100%';
        wrap.style.maxWidth = '460px';

        wrap.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 700; color: #f8fafc; margin-bottom: 1.2rem; text-align: center;">
                Hvilket ord hører du?
            </div>

            <!-- Big Audio Button -->
            <button class="minpairs-audio-btn" id="btn-play-pair" title="Afspil ord">
                🔊
            </button>

            <!-- 2 Word Cards -->
            <div class="minpairs-cards-row">
                <button class="minpair-card" id="card-0">${options[0]}</button>
                <button class="minpair-card" id="card-1">${options[1]}</button>
            </div>

            <!-- Live Feedback -->
            <div id="pair-feedback" style="min-height: 2rem; font-size: 1.35rem; font-weight: 800; text-align: center; margin-bottom: 1.2rem;"></div>

            <!-- Next Button -->
            <button id="btn-next-pair" class="laese-action-btn primary" style="display: none; padding: 0.75rem 2rem; font-size: 1.05rem;">
                ${currentItemIdx < getItemsForCurrentMode().length - 1 ? 'Næste ➔' : 'Se resultat 🏆'}
            </button>
        `;

        function playCorrectAudio() {
            const word = pair.correct.toLowerCase().trim();
            // Check for step 3 wav, laese_set1 m4a, or TTS
            const wavCandidate = `${word}_3.wav`;
            const m4aCandidate = `laese_set1_${word}.m4a`;
            const safeWav = wavCandidate.replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa');

            if (RECORDED_AUDIO_FILES.has(safeWav) || RECORDED_AUDIO_FILES.has(wavCandidate)) {
                playAudioOrTTS(RECORDED_AUDIO_FILES.has(safeWav) ? safeWav : wavCandidate, pair.correct);
            } else {
                playAudioOrTTS(m4aCandidate, pair.correct);
            }
        }

        wrap.querySelector('#btn-play-pair').onclick = () => playCorrectAudio();

        const card0 = wrap.querySelector('#card-0');
        const card1 = wrap.querySelector('#card-1');
        const feedback = wrap.querySelector('#pair-feedback');
        const nextBtn = wrap.querySelector('#btn-next-pair');

        [card0, card1].forEach(card => {
            card.onclick = () => {
                if (isAnswered) return;
                const chosen = card.textContent.trim();

                if (chosen.toUpperCase() === pair.correct.toUpperCase()) {
                    isAnswered = true;
                    score++;
                    card.classList.add('correct');
                    feedback.style.color = '#4CAF50';
                    feedback.innerHTML = `Rigtigt! 🎉 (${pair.correct})`;
                    nextBtn.style.display = 'inline-flex';
                } else {
                    card.classList.add('wrong');
                    feedback.style.color = '#f44336';
                    feedback.innerHTML = `Prøv igen 😕`;
                    setTimeout(() => {
                        card.classList.remove('wrong');
                    }, 1000);
                }
            };
        });

        nextBtn.onclick = () => {
            currentItemIdx++;
            render();
        };

        viewContainer.appendChild(wrap);

        // Auto play audio upon entering
        setTimeout(() => playCorrectAudio(), 250);
    }

    // ==========================================
    // 5. TÆL LYDE (SOUND BOXES TOKEN GAME)
    // ==========================================
    function renderCountSoundsExercise(wordData) {
        const wrap = document.createElement('div');
        wrap.style.display = 'flex';
        wrap.style.flexDirection = 'column';
        wrap.style.alignItems = 'center';
        wrap.style.width = '100%';

        wrap.innerHTML = `
            <div id="count-header-text" style="font-size: 2.4rem; font-weight: 800; color: white; margin-bottom: 0.8rem; text-align: center;">
                ?
            </div>

            <button id="btn-count-listen" class="laese-action-btn primary" style="background: #2196F3; font-size: 1.05rem; padding: 0.6rem 1.4rem; border-radius: 20px; margin-bottom: 1.2rem;">
                🔊 Lyt til ordet
            </button>

            <div id="count-instruction" style="font-size: 1rem; color: #b0c4ba; margin-bottom: 1.2rem; text-align: center;">
                Hvor mange lyde hører du? Tryk på brikken for at tælle:
            </div>

            <div style="display: flex; justify-content: center; margin-bottom: 1.2rem;">
                <div class="laese-token" id="token-generator" title="Tryk for at tilføje en lyd">Lyd</div>
            </div>

            <div class="laese-dropzone" id="count-dropzone">
                <div class="laese-dropzone-placeholder" id="drop-placeholder">Tryk på den grønne cirkel for at tilføje brikker</div>
            </div>

            <div id="count-feedback" style="min-height: 1.4rem; font-size: 1.1rem; font-weight: 800; margin-bottom: 1rem; text-align: center;"></div>

            <div style="display: flex; gap: 0.8rem; justify-content: center; margin-bottom: 1rem;">
                <button id="btn-clear-tokens" class="laese-action-btn">Ryd</button>
                <button id="btn-check-tokens" class="laese-action-btn green">Tjek svar</button>
                <button id="btn-next-count" class="laese-action-btn primary" style="display: none;">Næste ord ➔</button>
            </div>
        `;

        function playWordSound() {
            if (wordData.audioFile) {
                const audio = new Audio(baseUrl + 'assets/audio/' + wordData.audioFile);
                audio.play().catch(() => speakDanish(wordData.word));
            } else {
                speakDanish(wordData.word);
            }
        }

        wrap.querySelector('#btn-count-listen').onclick = () => playWordSound();

        const dropzone = wrap.querySelector('#count-dropzone');
        const placeholder = wrap.querySelector('#drop-placeholder');
        const tokenGen = wrap.querySelector('#token-generator');
        const clearBtn = wrap.querySelector('#btn-clear-tokens');
        const checkBtn = wrap.querySelector('#btn-check-tokens');
        const nextBtn = wrap.querySelector('#btn-next-count');
        const feedback = wrap.querySelector('#count-feedback');
        const headerText = wrap.querySelector('#count-header-text');

        function addToken() {
            placeholder.style.display = 'none';
            const tok = document.createElement('div');
            tok.className = 'laese-token';
            tok.textContent = 'Lyd';
            tok.onclick = () => {
                tok.remove();
                if (dropzone.querySelectorAll('.laese-token').length === 0) {
                    placeholder.style.display = 'block';
                }
            };
            dropzone.appendChild(tok);
        }

        tokenGen.onclick = () => addToken();

        clearBtn.onclick = () => {
            dropzone.querySelectorAll('.laese-token').forEach(t => t.remove());
            placeholder.style.display = 'block';
            feedback.textContent = '';
        };

        checkBtn.onclick = () => {
            const count = dropzone.querySelectorAll('.laese-token').length;
            if (count === wordData.count) {
                score++;
                headerText.textContent = wordData.word.toUpperCase();
                headerText.style.color = '#4CAF50';
                feedback.style.color = '#4CAF50';
                feedback.textContent = `✓ Rigtigt! "${wordData.word}" har ${wordData.count} lyde.`;
                checkBtn.style.display = 'none';
                clearBtn.style.display = 'none';
                nextBtn.style.display = 'inline-flex';
            } else {
                feedback.style.color = '#FF9800';
                feedback.textContent = `Ikke helt (${count} brikker). Lyt igen og prøv en gang til!`;
            }
        };

        nextBtn.onclick = () => {
            currentItemIdx++;
            render();
        };

        viewContainer.appendChild(wrap);

        // Auto play on enter
        setTimeout(() => playWordSound(), 250);
    }

    // ==========================================
    // 6. COMPLETION SCREEN
    // ==========================================
    function renderCompletion(total) {
        const wrap = document.createElement('div');
        wrap.style.textAlign = 'center';
        wrap.style.padding = '2rem 1rem';

        wrap.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 0.5rem;">⭐</div>
            <h2 style="font-size: 1.8rem; font-weight: 800; color: #4CAF50; margin: 0 0 0.5rem;">Flot klaret!</h2>
            <p style="font-size: 1.15rem; color: #cbd5e1; margin: 0 0 1.5rem;">
                Du har gennemført sættet med <strong style="color: #FFC107;">${score}</strong> rigtige svar!
            </p>
            <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
                <button id="btn-replay-set" class="laese-action-btn">Prøv sættet igen 🔄</button>
                <button id="btn-other-set" class="laese-action-btn primary">Vælg et andet sæt ➔</button>
            </div>
        `;

        wrap.querySelector('#btn-replay-set').onclick = () => {
            currentItemIdx = 0;
            score = 0;
            render();
        };

        wrap.querySelector('#btn-other-set').onclick = () => {
            currentSetId = null;
            currentItemIdx = 0;
            score = 0;
            render();
        };

        viewContainer.appendChild(wrap);
    }

    // Initialize
    container.appendChild(viewContainer);
    render();
}
