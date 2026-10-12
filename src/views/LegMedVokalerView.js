import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderLegMedVokalerView(container, navigateFn, extraData = {}) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container vokaler-container';

    if (!document.getElementById('vokaler-styles')) {
        const style = document.createElement('style');
        style.id = 'vokaler-styles';
        style.textContent = `
            .vokaler-container {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                background-color: #1a2f27;
                color: #e0e0e0;
                font-family: sans-serif;
                position: relative;
                align-items: center;
                padding-top: 4rem;
                padding-bottom: 2rem;
            }
            .vokaler-top-bar {
                padding: 1rem;
                display: flex;
                align-items: center;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 10;
            }
            .vokaler-back-btn {
                background: none;
                border: none;
                color: #e0e0e0;
                font-size: 1.2rem;
                cursor: pointer;
            }
            .vokaler-progress-text {
                position: absolute;
                top: 1.2rem;
                right: 1rem;
                font-size: 1rem;
                color: #a0b0a8;
                font-weight: bold;
            }

            /* MENU STYLES */
            .vokaler-menu {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
                width: 90%;
                max-width: 400px;
                margin-top: 2rem;
            }
            .vokaler-menu-title {
                font-size: 2rem;
                color: white;
                margin-bottom: 1rem;
            }
            .vokaler-level-btn {
                width: 100%;
                background-color: #233b31;
                border: 2px solid #3a5c4d;
                border-radius: 12px;
                padding: 1.5rem;
                font-size: 1.2rem;
                color: white;
                cursor: pointer;
                transition: transform 0.2s, background-color 0.2s;
                text-align: left;
                display: flex;
                flex-direction: column;
            }
            .vokaler-level-btn:hover {
                background-color: #2a473a;
            }
            .vokaler-level-btn:active {
                transform: scale(0.98);
            }
            .vokaler-level-title {
                font-weight: bold;
                font-size: 1.3rem;
                margin-bottom: 0.3rem;
            }
            .vokaler-level-desc {
                font-size: 0.9rem;
                color: #a0b0a8;
            }

            /* EXERCISE STYLES */
            .vokaler-header-text {
                font-size: 2.5rem;
                font-weight: bold;
                margin-bottom: 2rem;
                color: #ffffff;
                text-align: center;
                max-width: 90%;
            }
            
            .vokaler-action-area {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;
                width: 100%;
            }

            .vokaler-listen-btn {
                background-color: #64b5f6;
                color: white;
                border: none;
                border-radius: 20px;
                padding: 1rem 2.5rem;
                font-size: 1.2rem;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .vokaler-listen-btn:active {
                transform: scale(0.95);
            }

            .vokaler-btn-mic {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                border: none;
                background-color: #4caf50;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                cursor: pointer;
                color: white;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: transform 0.2s;
            }
            .vokaler-btn-mic:active {
                transform: scale(0.9);
            }
            .vokaler-btn-mic.listening {
                background-color: #f44336;
                animation: pulse-red 1.5s infinite;
            }

            .vokaler-bottom-buttons {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
                justify-content: center;
                width: 100%;
            }
            .vokaler-action-btn {
                background-color: #3e5248;
                color: #b0c4ba;
                border: none;
                border-radius: 20px;
                padding: 0.8rem 1.5rem;
                font-size: 1.1rem;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            .vokaler-action-btn:hover {
                background-color: #4a6356;
            }
            .vokaler-action-btn:active {
                transform: scale(0.95);
            }
            .vokaler-action-btn.primary {
                background-color: #4caf50;
                color: white;
            }
            .vokaler-action-btn.primary:hover {
                background-color: #45a049;
            }

            .vokaler-feedback {
                margin-top: 1rem;
                font-size: 1.2rem;
                font-weight: bold;
                min-height: 1.5rem;
                text-align: center;
                max-width: 90%;
            }

            /* COMPLETION STYLES */
            .vokaler-completion {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                flex: 1;
                width: 90%;
            }
            .vokaler-star {
                font-size: 5rem;
                margin-bottom: 1rem;
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
        `;
        document.head.appendChild(style);
    }

    // Data Sets
    const datasets = {
        'haardt_r': {
            title: "Hårdt 'r'",
            sentences: [
                { text: "Rulle en rotte", audioFile: "vokaler_r_1_rulle_en_rotte.m4a" },
                { text: "Røve en ræv", audioFile: "vokaler_r_2_roeve_en_raev.m4a" },
                { text: "Riste en rose", audioFile: "vokaler_r_3_riste_en_rose.m4a" },
                { text: "Rense en reje", audioFile: "vokaler_r_4_rense_en_reje.m4a" },
                { text: "Rive min ryg", audioFile: "vokaler_r_5_rive_min_ryg.m4a" },
                { text: "Ryste din rust", audioFile: "vokaler_r_6_ryste_din_rust.m4a" },
                { text: "Råbe på Rom", audioFile: "vokaler_r_7_raabe_paa_rom.m4a" }
            ]
        },
        'vokalisk_r': {
            title: "Vokalisk 'r'",
            sentences: [
                { text: "En bager der smager", audioFile: "vokaler_r_8_en_bager_der_smager.m4a" },
                { text: "En lærer der bærer", audioFile: "vokaler_r_9_en_laerer_der_baerer.m4a" },
                { text: "En køber der løber", audioFile: "vokaler_r_10_en_koeber_der_loeber.m4a" },
                { text: "En murer der skurer", audioFile: "vokaler_r_11_en_murer_der_skurer.m4a" },
                { text: "En svømmer der drømmer", audioFile: "vokaler_r_12_en_svoemmer_der_droemmer.m4a" },
                { text: "En maler der taler", audioFile: "vokaler_r_13_en_maler_der_taler.m4a" }
            ]
        },
        'haardt_d': {
            title: "Hårdt 'd'",
            sentences: [
                { text: "Danse med en dåse", audioFile: "vokaler_d_1_danse_med_en_daase.m4a" },
                { text: "Dyppe en due", audioFile: "vokaler_d_2_dyppe_en_due.m4a" },
                { text: "Dele din dyne", audioFile: "vokaler_d_3_dele_din_dyne.m4a" },
                { text: "Drille en drage", audioFile: "vokaler_d_4_drille_en_drage.m4a" },
                { text: "Dække en dør", audioFile: "vokaler_d_5_daekke_en_doer.m4a" },
                { text: "Dreje en dal", audioFile: "vokaler_d_6_dreje_en_dal.m4a" },
                { text: "Dømme en dukke", audioFile: "vokaler_d_7_doemme_en_dukke.m4a" },
                { text: "Drikke en dam", audioFile: "vokaler_d_8_drikke_en_dam.m4a" },
                { text: "Døbe en dolk", audioFile: "vokaler_d_9_doebe_en_dolk.m4a" },
                { text: "Dampe din dug", audioFile: "vokaler_d_10_dampe_din_dug.m4a" }
            ]
        },
        'bloedt_d': {
            title: "Blødt 'd'",
            sentences: [
                { text: "Bade i en flod", audioFile: "vokaler_d_11_bade_i_en_flod.m4a" },
                { text: "Bide i et brød", audioFile: "vokaler_d_12_bide_i_et_broed.m4a" },
                { text: "Møde en smed", audioFile: "vokaler_d_13_moede_en_smed.m4a" },
                { text: "Skyde med et spyd", audioFile: "vokaler_d_14_skyde_med_et_spyd.m4a" },
                { text: "Svede i et bad", audioFile: "vokaler_d_15_svede_i_et_bad.m4a" },
                { text: "Træde på et blad", audioFile: "vokaler_d_16_traede_paa_et_blad.m4a" }
            ]
        },
        'haardt_g': {
            title: "Hårdt 'g'",
            sentences: [
                { text: "Gribe en ged", audioFile: "vokaler_g_1_gribe_en_ged.m4a" },
                { text: "Gemme en gås", audioFile: "vokaler_g_2_gemme_en_gaas.m4a" },
                { text: "Gætte en gris", audioFile: "vokaler_g_3_gaette_en_gris.m4a" },
                { text: "Gnide en gren", audioFile: "vokaler_g_4_gnide_en_gren.m4a" },
                { text: "Grave en gaffel", audioFile: "vokaler_g_5_grave_en_gaffel.m4a" },
                { text: "Grille en gryde", audioFile: "vokaler_g_6_grille_en_gryde.m4a" },
                { text: "Glemme en gade", audioFile: "vokaler_g_7_glemme_en_gade.m4a" },
                { text: "Guffe en globus", audioFile: "vokaler_g_8_guffe_en_globus.m4a" },
                { text: "Give en gople", audioFile: "vokaler_g_9_give_en_gople.m4a" },
                { text: "Gø ad en gæst", audioFile: "vokaler_g_10_goe_ad_en_gaest.m4a" }
            ]
        },
        'stumt_g': {
            title: "Stumt 'g'",
            sentences: [
                { text: "Sælge en bolig", audioFile: "vokaler_g_11_saelge_en_bolig.m4a" },
                { text: "Stryge et flag", audioFile: "vokaler_g_12_stryge_et_flag.m4a" },
                { text: "Søge en læge", audioFile: "vokaler_g_13_soege_en_laege.m4a" },
                { text: "Bage en kage", audioFile: "vokaler_g_14_bage_en_kage.m4a" },
                { text: "Ryge en smøg", audioFile: "vokaler_g_15_ryge_en_smoeg.m4a" },
                { text: "Jage en måge", audioFile: "vokaler_g_16_jage_en_maage.m4a" }
            ]
        }
    };

    // State
    let currentSetId = extraData.subPath && datasets[extraData.subPath] ? extraData.subPath : null;
    let currentIndex = 0;
    let score = 0;

    // TTS Setup
    const synth = window.speechSynthesis;
    let voice = null;
    function loadVoices() {
        const voices = synth.getVoices();
        const daVoices = voices.filter(v => v.lang === 'da-DK' || v.lang === 'da_DK');
        voice = daVoices[0] || voices[0];
    }
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }

    // STT Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'da-DK';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
    }

    function renderView() {
        viewContainer.innerHTML = ''; 

        // Top Bar
        const topBar = document.createElement('div');
        topBar.className = 'vokaler-top-bar';
        
        const backBtn = document.createElement('button');
        backBtn.className = 'vokaler-back-btn';
        backBtn.innerHTML = `← Tilbage`;
        backBtn.onclick = () => {
            synth.cancel();
            if (recognition) recognition.abort();
            if (currentSetId !== null) {
                navigateFn('leg_med_vokaler');
            } else {
                navigateFn('traen_udtale');
            }
        };
        topBar.appendChild(backBtn);

        if (currentSetId !== null) {
            const progress = document.createElement('div');
            progress.className = 'vokaler-progress-text';
            progress.textContent = `${currentIndex + 1} / ${datasets[currentSetId].sentences.length}`;
            topBar.appendChild(progress);
        }

        viewContainer.appendChild(topBar);

        if (currentSetId === null) {
            renderMenu();
        } else if (currentIndex < datasets[currentSetId].sentences.length) {
            renderExercise();
        } else {
            renderCompletion();
        }
    }

    function renderMenu() {
        const menuContainer = document.createElement('div');
        menuContainer.className = 'vokaler-menu';

        const title = document.createElement('div');
        title.className = 'vokaler-menu-title';
        title.textContent = 'Leg med vokaler';
        menuContainer.appendChild(title);

        const menuConfig = [
            { title: 'Træn R-lyden', subs: [{id: 'haardt_r', label: 'Hårdt "r"'}, {id: 'vokalisk_r', label: 'Vokalisk "r"'}] },
            { title: 'Træn D-lyden', subs: [{id: 'haardt_d', label: 'Hårdt "d"'}, {id: 'bloedt_d', label: 'Blødt "d"'}] },
            { title: 'Træn G-lyden', subs: [{id: 'haardt_g', label: 'Hårdt "g"'}, {id: 'stumt_g', label: 'Stumt "g"'}] }
        ];

        menuConfig.forEach(cat => {
            const group = document.createElement('div');
            group.className = 'vokaler-level-btn';
            group.style.cursor = 'default';
            group.style.display = 'flex';
            group.style.flexDirection = 'column';
            group.style.gap = '1rem';
            
            const catTitle = document.createElement('div');
            catTitle.className = 'vokaler-level-title';
            catTitle.textContent = cat.title;
            group.appendChild(catTitle);
            
            const subContainer = document.createElement('div');
            subContainer.style.display = 'flex';
            subContainer.style.gap = '0.8rem';
            subContainer.style.width = '100%';
            
            cat.subs.forEach(sub => {
                const subBtn = document.createElement('button');
                subBtn.textContent = sub.label;
                subBtn.style.flex = '1';
                subBtn.style.padding = '0.8rem';
                subBtn.style.backgroundColor = '#ff9800';
                subBtn.style.color = 'white';
                subBtn.style.border = 'none';
                subBtn.style.borderRadius = '8px';
                subBtn.style.fontWeight = 'bold';
                subBtn.style.fontSize = '1.1rem';
                subBtn.style.cursor = 'pointer';
                subBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                
                subBtn.onmouseover = () => subBtn.style.backgroundColor = '#f57c00';
                subBtn.onmouseout = () => subBtn.style.backgroundColor = '#ff9800';
                
                subBtn.onclick = () => {
                    navigateFn('leg_med_vokaler', { subPath: sub.id });
                };
                subContainer.appendChild(subBtn);
            });
            
            group.appendChild(subContainer);
            menuContainer.appendChild(group);
        });

        viewContainer.appendChild(menuContainer);
    }

    function renderExercise() {
        const rawItem = datasets[currentSetId].sentences[currentIndex];
        const sentence = typeof rawItem === 'string' ? rawItem : rawItem.text;
        const audioFile = typeof rawItem === 'object' ? rawItem.audioFile : null;
        
        const headerText = document.createElement('div');
        headerText.className = 'vokaler-header-text';
        headerText.textContent = sentence;
        viewContainer.appendChild(headerText);

        // Circular Feedback Container
        const circularContainer = document.createElement('div');
        circularContainer.className = 'vokaler-circular-container';
        circularContainer.style.display = 'none';
        circularContainer.style.flexDirection = 'column';
        circularContainer.style.alignItems = 'center';
        circularContainer.style.margin = '0.5rem 0 1.5rem 0';
        circularContainer.style.width = '100%';
        circularContainer.innerHTML = `
            <div style="position: relative; width: 150px; height: 150px; display: flex; align-items: center; justify-content: center;">
                <svg style="transform: rotate(-90deg); width: 100%; height: 100%;" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="56" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="11" />
                    <circle id="vokaler-circle-arc" cx="70" cy="70" r="56" fill="none" stroke="#eab308" stroke-width="11"
                            stroke-dasharray="351.86" stroke-dashoffset="351.86" stroke-linecap="round"
                            style="transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease, filter 0.3s ease;" />
                </svg>
                <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none;">
                    <span id="vokaler-circle-score" style="font-size: 2.3rem; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">0%</span>
                </div>
            </div>
            <div id="vokaler-word-chips" style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 14px; width: 100%; max-width: 440px;"></div>
            <div id="vokaler-heard-box" style="margin-top: 14px; padding: 6px 20px; border-radius: 12px; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.08); text-align: center; max-width: 90%; display: none;">
                <span id="vokaler-heard-text" style="font-size: 1.35rem; color: #ffffff; font-style: italic; font-weight: 600; letter-spacing: 0.01em;">""</span>
            </div>
        `;
        viewContainer.appendChild(circularContainer);

        const actionArea = document.createElement('div');
        actionArea.className = 'vokaler-action-area';

        // Lyt
        const listenBtn = document.createElement('button');
        listenBtn.className = 'vokaler-listen-btn';
        listenBtn.innerHTML = '🔊 Lyt til sætning';
        listenBtn.onclick = () => {
            if (audioFile) {
                synth.cancel();
                const audio = new Audio(baseUrl + 'assets/audio/' + audioFile);
                audio.play().catch(e => console.error(e));
                return;
            }
            synth.cancel();
            if (!voice) loadVoices();
            const utterance = new SpeechSynthesisUtterance(sentence);
            if (voice) utterance.voice = voice;
            utterance.lang = 'da-DK';
            utterance.rate = 0.85; // Slow down a bit for clarity
            synth.speak(utterance);
        };
        actionArea.appendChild(listenBtn);

        // Mikrofon
        const micBtn = document.createElement('button');
        micBtn.className = 'vokaler-btn-mic';
        micBtn.innerHTML = '🎤';
        actionArea.appendChild(micBtn);

        viewContainer.appendChild(actionArea);

        const feedbackText = document.createElement('div');
        feedbackText.className = 'vokaler-feedback';
        viewContainer.appendChild(feedbackText);

        const bottomButtons = document.createElement('div');
        bottomButtons.className = 'vokaler-bottom-buttons';
        
        const skipBtn = document.createElement('button');
        skipBtn.className = 'vokaler-action-btn';
        skipBtn.textContent = 'Spring over';
        skipBtn.onclick = () => {
            if (isListening && recognition) recognition.stop();
            currentIndex++;
            renderView();
        };
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'vokaler-action-btn primary';
        nextBtn.textContent = 'Næste';
        nextBtn.style.display = 'none';
        nextBtn.onclick = () => {
            currentIndex++;
            renderView();
        };

        bottomButtons.appendChild(skipBtn);
        bottomButtons.appendChild(nextBtn);
        viewContainer.appendChild(bottomButtons);

        // Logic
        let isListening = false;
        let attempts = 0;

        // Clean string for comparison (remove punctuation, lower case)
        const normalize = (str) => str.toLowerCase().replace(/[^a-zæøå0-9]/g, '');
        const targetClean = normalize(sentence);

        if (recognition) {
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const transcriptClean = normalize(transcript);
                
                attempts++;

                const words = sentence.split(' ');
                const spokenList = transcript.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);
                
                const wordData = words.map(rawWord => {
                    const cleanWord = normalize(rawWord);
                    let wordScore = 0;
                    for (const spk of spokenList) {
                        const cleanSpk = normalize(spk);
                        if (cleanSpk === cleanWord) {
                            wordScore = 100;
                            break;
                        } else if (cleanWord.length > 2 && (cleanSpk.includes(cleanWord) || cleanWord.includes(cleanSpk))) {
                            const ratio = Math.min(cleanSpk.length, cleanWord.length) / Math.max(cleanSpk.length, cleanWord.length);
                            wordScore = Math.max(wordScore, Math.round(ratio * 90));
                        }
                    }
                    return { word: rawWord, score: wordScore };
                });

                let overallScore = Math.round(wordData.reduce((acc, w) => acc + w.score, 0) / wordData.length);
                if (transcriptClean.includes(targetClean) || (targetClean.includes(transcriptClean) && transcriptClean.length > targetClean.length - 3)) {
                    overallScore = 100;
                    wordData.forEach(w => w.score = 100);
                }

                circularContainer.style.display = 'flex';
                const arc = circularContainer.querySelector('#vokaler-circle-arc');
                const scoreNum = circularContainer.querySelector('#vokaler-circle-score');
                const chips = circularContainer.querySelector('#vokaler-word-chips');

                // Trefarvet regel:
                // Rød: 0 - 30%
                // Gul: 31 - 79%
                // Grøn: 80 - 100%
                let strokeColor = '#ef4444';
                let glowFilter = 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.75))';

                if (overallScore >= 80) {
                    strokeColor = '#22c55e';
                    glowFilter = 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.75))';
                } else if (overallScore > 30) {
                    strokeColor = '#eab308';
                    glowFilter = 'drop-shadow(0 0 12px rgba(234, 179, 8, 0.75))';
                }

                const circ = 351.86;
                const offset = circ - (overallScore / 100) * circ;

                arc.style.strokeDashoffset = offset;
                arc.style.stroke = strokeColor;
                arc.style.filter = glowFilter;
                scoreNum.textContent = overallScore + '%';

                // Ord-feedback brikker i bunden
                chips.innerHTML = '';
                wordData.forEach(item => {
                    const chip = document.createElement('div');
                    chip.style.display = 'flex';
                    chip.style.flexDirection = 'column';
                    chip.style.alignItems = 'center';
                    chip.style.padding = '6px 14px';
                    chip.style.borderRadius = '8px';
                    chip.style.minWidth = '75px';
                    chip.style.transition = 'all 0.3s ease';

                    let chipBg = 'rgba(239, 68, 68, 0.15)';
                    let chipBorder = 'rgba(239, 68, 68, 0.5)';
                    let chipText = '#fca5a5';

                    if (item.score >= 80) {
                        chipBg = 'rgba(34, 197, 94, 0.18)';
                        chipBorder = 'rgba(34, 197, 94, 0.6)';
                        chipText = '#86efac';
                    } else if (item.score > 30) {
                        chipBg = 'rgba(234, 179, 8, 0.18)';
                        chipBorder = 'rgba(234, 179, 8, 0.6)';
                        chipText = '#fde047';
                    }

                    chip.style.background = chipBg;
                    chip.style.border = `1px solid ${chipBorder}`;
                    chip.innerHTML = `
                        <span style="font-size: 0.95rem; font-weight: 600; color: #ffffff;">${item.word}</span>
                        <span style="font-size: 0.75rem; font-weight: 700; color: ${chipText}; margin-top: 2px;">${item.score}%</span>
                    `;
                    chips.appendChild(chip);
                });

                // Opdater feedback-sætning med hvad systemet hørte
                const heardBox = circularContainer.querySelector('#vokaler-heard-box');
                const heardText = circularContainer.querySelector('#vokaler-heard-text');
                if (transcript && transcript.trim()) {
                    heardBox.style.display = 'block';
                    heardText.textContent = `"${transcript}"`;
                } else {
                    heardBox.style.display = 'none';
                }

                if (overallScore >= 80) {
                    if (attempts === 1) score++;
                    feedbackText.style.display = 'none';
                    skipBtn.style.display = 'none';
                    nextBtn.style.display = 'block';
                } else {
                    feedbackText.style.display = 'none';
                    skipBtn.style.display = 'block';
                    nextBtn.style.display = 'none';
                }
            };
            recognition.onerror = (event) => {
                feedbackText.style.display = 'block';
                feedbackText.style.color = '#f44336';
                if (event.error === 'no-speech') {
                    feedbackText.textContent = 'Jeg hørte ikke noget. Prøv at tale tættere på mikrofonen.';
                } else {
                    feedbackText.textContent = `Mikrofon fejl: ${event.error}`;
                }
                micBtn.classList.remove('listening');
                isListening = false;
            };
            recognition.onend = () => {
                micBtn.classList.remove('listening');
                isListening = false;
            };

            micBtn.onclick = () => {
                if (isListening) {
                    recognition.stop();
                    return;
                }
                try {
                    recognition.start();
                    isListening = true;
                    micBtn.classList.add('listening');
                    circularContainer.style.display = 'none';
                    feedbackText.style.display = 'block';
                    feedbackText.style.color = '#ffffff';
                    feedbackText.textContent = 'Lytter...';
                } catch (e) {
                    console.error(e);
                    isListening = false;
                    micBtn.classList.remove('listening');
                }
            };
        } else {
            micBtn.style.display = 'none';
            feedbackText.textContent = 'Stemmegenkendelse understøttes ikke i din browser.';
        }
    }

    function renderCompletion() {
        const total = datasets[currentSetId].sentences.length;
        
        const compContainer = document.createElement('div');
        compContainer.className = 'vokaler-completion';

        const star = document.createElement('div');
        star.className = 'vokaler-star';
        star.textContent = '⭐';
        compContainer.appendChild(star);

        const title = document.createElement('h2');
        title.textContent = 'Niveau Gennemført!';
        compContainer.appendChild(title);

        const scoreText = document.createElement('p');
        scoreText.style.fontSize = '1.2rem';
        scoreText.style.color = '#b0c4ba';
        scoreText.style.marginBottom = '2rem';
        scoreText.textContent = `Du fik ${score} ud af ${total} rigtige i første forsøg.`;
        compContainer.appendChild(scoreText);

        const againBtn = document.createElement('button');
        againBtn.className = 'vokaler-action-btn primary';
        againBtn.textContent = 'Vælg et andet niveau';
        againBtn.onclick = () => {
            navigateFn('leg_med_vokaler');
        };
        compContainer.appendChild(againBtn);

        viewContainer.appendChild(compContainer);
    }

    // Initialize
    container.appendChild(viewContainer);
    renderView();
}
