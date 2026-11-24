import { getLang } from '../utils/i18n.js';
import { mbT, isMbRtl } from '../utils/min_bolig_translations.js';

const UDTALE_STORAGE_KEY = 'lingcog_min_bolig_udtale_v1';

const SVG_MIC = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`;
const SVG_SPEAK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
const SVG_REFRESH = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`;
const SVG_CHECK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

function normalizeDa(str) {
    return (str || '')
        .toLowerCase()
        .replace(/[.,!?;:»«"()–—-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function speakDanish(text, rate = 0.88) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'da-DK';
    u.rate = rate;
    window.speechSynthesis.speak(u);
}

function scoreSentencePronunciation(targetSentence, spokenTranscript) {
    const rawWords = targetSentence.trim().split(/\s+/).filter(Boolean);
    const spokenList = normalizeDa(spokenTranscript).split(/\s+/).filter(Boolean);
    const targetClean = normalizeDa(targetSentence);
    const transcriptClean = normalizeDa(spokenTranscript);

    const wordData = rawWords.map(rawWord => {
        const cleanWord = normalizeDa(rawWord);
        if (!cleanWord) return { word: rawWord, score: 100 };
        let wordScore = 0;
        for (const spk of spokenList) {
            if (spk === cleanWord) {
                wordScore = 100;
                break;
            } else if (cleanWord.length > 2 && (spk.includes(cleanWord) || cleanWord.includes(spk))) {
                const ratio = Math.min(spk.length, cleanWord.length) / Math.max(spk.length, cleanWord.length);
                wordScore = Math.max(wordScore, Math.round(ratio * 90));
            }
        }
        return { word: rawWord, score: wordScore };
    });

    let overallScore = wordData.length > 0
        ? Math.round(wordData.reduce((acc, w) => acc + w.score, 0) / wordData.length)
        : 0;

    if (
        transcriptClean &&
        (transcriptClean.includes(targetClean) ||
            (targetClean.includes(transcriptClean) && transcriptClean.length >= Math.max(4, targetClean.length - 3)))
    ) {
        overallScore = 100;
        wordData.forEach(w => { w.score = 100; });
    }

    return { overallScore, wordData, transcript: spokenTranscript };
}

function ensureUdtaleStyles() {
    if (document.getElementById('mb-udtale-tab-styles')) return;
    const style = document.createElement('style');
    style.id = 'mb-udtale-tab-styles';
    style.textContent = `
        .mb-ud-root { color: #f1f5f9; }
        .mb-ud-header-card {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.13);
            border-radius: 16px;
            padding: 1.15rem 1.25rem;
            margin-bottom: 1rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 0.75rem;
        }
        .mb-ud-title {
            margin: 0 0 0.2rem;
            font-size: 1.05rem;
            font-weight: 800;
            color: #f1f5f9;
        }
        .mb-ud-sub {
            margin: 0;
            font-size: 0.84rem;
            color: #94a3b8;
            line-height: 1.45;
        }
        .mb-ud-pill {
            font-size: 0.78rem;
            font-weight: 700;
            color: #7ec4ce;
            background: #101419;
            border: 1px solid rgba(76, 155, 166, 0.4);
            padding: 0.28rem 0.72rem;
            border-radius: 999px;
        }
        .mb-ud-list {
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
        }
        .mb-ud-box {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 16px;
            padding: 1.1rem 1.2rem;
            transition: border-color 0.2s ease;
        }
        .mb-ud-box.passed {
            border-color: rgba(34, 197, 94, 0.55);
        }
        .mb-ud-box-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 0.6rem;
        }
        .mb-ud-cat-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.75rem;
            font-weight: 800;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.18);
            color: #cbd5e1;
        }
        .mb-ud-sentence {
            font-size: 1.14rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.55;
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.12);
            border-radius: 12px;
            padding: 0.85rem 1rem;
            margin-bottom: 0.8rem;
        }
        .mb-ud-controls {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
        }
        .mb-ud-btn-mic {
            background: #2b6e78;
            border: 1px solid #3d8b96;
            color: #ffffff;
            padding: 0.52rem 1.05rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            transition: all 0.16s ease;
        }
        .mb-ud-btn-mic:hover { background: #35838f; }
        .mb-ud-btn-mic.listening {
            background: #dc2626;
            border-color: #f87171;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.28);
        }
        .mb-ud-btn-ghost {
            background: transparent;
            border: 1px solid rgba(203, 213, 225, 0.2);
            color: #cbd5e1;
            padding: 0.48rem 0.85rem;
            border-radius: 9px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
        }
        .mb-ud-btn-ghost:hover { border-color: #4c9ba6; color: #ffffff; }

        /* Visuel cirkulær feedback fra LegMedVokalerView (haardt_r) */
        .mb-ud-feedback {
            margin-top: 0.95rem;
            padding-top: 0.9rem;
            border-top: 1px solid rgba(203, 213, 225, 0.12);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.85rem;
        }
        .mb-ud-ring-wrap {
            position: relative;
            width: 112px;
            height: 112px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .mb-ud-ring-svg {
            width: 112px;
            height: 112px;
            transform: rotate(-90deg);
        }
        .mb-ud-ring-score {
            position: absolute;
            font-size: 1.55rem;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        .mb-ud-word-chips {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.45rem;
            width: 100%;
        }
        .mb-ud-word-chip {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0.35rem 0.7rem;
            border-radius: 8px;
            min-width: 58px;
        }
        .mb-ud-heard {
            font-size: 0.82rem;
            color: #94a3b8;
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.12);
            border-radius: 9px;
            padding: 0.45rem 0.8rem;
            width: 100%;
            box-sizing: border-box;
            text-align: center;
        }
        .mb-ud-empty {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 16px;
            padding: 1.4rem 1.3rem;
            text-align: center;
            color: #cbd5e1;
        }
    `;
    document.head.appendChild(style);
}

export function saveMinBoligUdtaleSentences(entries) {
    try {
        localStorage.setItem(UDTALE_STORAGE_KEY, JSON.stringify(entries || []));
    } catch {}
}

export function createMinBoligUdtaleTab({ boxMetaMap, getImportedCandidates, switchTab }) {
    ensureUdtaleStyles();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'da-DK';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
    }

    let entries = []; // [{ id, boxId, text }]
    let resultsByIdx = {}; // idx -> { overallScore, wordData, transcript }
    let listeningIdx = null;
    let errorMsgByIdx = {};

    function loadSaved() {
        try {
            const raw = JSON.parse(localStorage.getItem(UDTALE_STORAGE_KEY) || '[]');
            if (Array.isArray(raw) && raw.length > 0) {
                entries = raw;
                return;
            }
        } catch {}
        entries = [];
    }
    loadSaved();

    const root = document.createElement('div');
    root.className = 'mb-ud-root';

    function startListeningFor(idx) {
        if (!recognition) {
            errorMsgByIdx[idx] = 'Talegenkendelse understøttes ikke i denne browser (prøv Chrome eller Safari). Du kan stadig lytte og gentage højt.';
            render();
            return;
        }
        if (listeningIdx === idx) {
            try { recognition.stop(); } catch {}
            listeningIdx = null;
            render();
            return;
        }
        if (listeningIdx !== null) {
            try { recognition.stop(); } catch {}
        }
        window.speechSynthesis?.cancel();
        listeningIdx = idx;
        delete errorMsgByIdx[idx];
        render();

        recognition.onresult = (event) => {
            const transcript = event.results?.[0]?.[0]?.transcript || '';
            const target = entries[idx]?.text || '';
            resultsByIdx[idx] = scoreSentencePronunciation(target, transcript);
            listeningIdx = null;
            render();
        };
        recognition.onerror = (ev) => {
            listeningIdx = null;
            errorMsgByIdx[idx] = ev?.error === 'not-allowed'
                ? 'Mikrofon-adgang blev afvist. Tillad mikrofonen i browseren for at få visuel udtale-feedback.'
                : 'Kunne ikke høre noget — prøv at trykke Tal nu igen og tal tydeligt tæt på mikrofonen.';
            render();
        };
        recognition.onend = () => {
            if (listeningIdx === idx) {
                listeningIdx = null;
                render();
            }
        };

        try {
            recognition.start();
        } catch {
            listeningIdx = null;
            render();
        }
    }

    function render() {
        const lang = getLang() || 'da';
        const rtlAttr = isMbRtl(lang) ? ' dir="rtl"' : '';
        const isEn = lang === 'en';
        const passedCount = entries.filter((_, i) => (resultsByIdx[i]?.overallScore || 0) >= 80).length;

        root.innerHTML = '';

        const headerCard = document.createElement('div');
        headerCard.className = 'mb-ud-header-card';
        headerCard.innerHTML = `
            <div${rtlAttr}>
                <h3 class="mb-ud-title">${isEn ? '7. Practice pronunciation' : '7. Træn udtale'}</h3>
                <p class="mb-ud-sub">${isEn
                    ? 'Listen to each sentence, press Speak now, and get visual word-by-word pronunciation feedback.'
                    : 'Lyt til hver sætning, tryk på »Tal nu«, og få visuel ord-for-ord feedback på din udtale.'}</p>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:0.5rem; align-items:center;">
                ${entries.length > 0 ? `<span class="mb-ud-pill">${isEn ? 'Passed' : 'Bestået'}: ${passedCount} / ${entries.length}</span>` : ''}
                <button type="button" class="mb-ud-btn-ghost" id="mb-ud-import-now">
                    ${SVG_REFRESH}<span>${isEn ? 'Import from Mindmap / Writing' : 'Hent sætninger fra Fane 5–6'}</span>
                </button>
            </div>
        `;
        headerCard.querySelector('#mb-ud-import-now').onclick = () => {
            const fresh = typeof getImportedCandidates === 'function' ? getImportedCandidates() : [];
            if (fresh.length > 0) {
                entries = fresh;
                resultsByIdx = {};
                errorMsgByIdx = {};
                saveMinBoligUdtaleSentences(entries);
                render();
            } else if (typeof switchTab === 'function') {
                switchTab('tab_mindmap');
            }
        };
        root.appendChild(headerCard);

        if (entries.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'mb-ud-empty';
            empty.innerHTML = `
                <p style="margin:0 0 0.9rem; font-size:0.92rem; line-height:1.55;">
                    ${isEn
                        ? 'No sentences imported yet. Go to <strong>6. Mindmap (Del 1)</strong> and press <em>Import sentences to 7. Practice pronunciation</em> — or import directly below.'
                        : 'Der er ingen sætninger importeret endnu. Gå til <strong>6. Mindmap (Del 1)</strong> og tryk på <em>Importér til 7. Træn udtale</em> — eller hent dem direkte herunder.'}
                </p>
                <div style="display:flex; justify-content:center; flex-wrap:wrap; gap:0.55rem;">
                    <button type="button" class="mb-ud-btn-mic" id="mb-ud-empty-import">${SVG_REFRESH}<span>${isEn ? 'Import sentences now' : 'Importér sætninger nu'}</span></button>
                    <button type="button" class="mb-ud-btn-ghost" id="mb-ud-empty-goto6">${isEn ? 'Go to 6. Mindmap →' : 'Gå til 6. Mindmap →'}</button>
                </div>
            `;
            empty.querySelector('#mb-ud-empty-import').onclick = () => {
                const fresh = typeof getImportedCandidates === 'function' ? getImportedCandidates() : [];
                if (fresh.length > 0) {
                    entries = fresh;
                    saveMinBoligUdtaleSentences(entries);
                    render();
                }
            };
            empty.querySelector('#mb-ud-empty-goto6').onclick = () => {
                if (typeof switchTab === 'function') switchTab('tab_mindmap');
            };
            root.appendChild(empty);
            return;
        }

        const list = document.createElement('div');
        list.className = 'mb-ud-list';

        entries.forEach((entry, idx) => {
            const boxMeta = entry.boxId && boxMetaMap ? boxMetaMap[entry.boxId] : null;
            const res = resultsByIdx[idx];
            const isListening = listeningIdx === idx;
            const isPassed = res && res.overallScore >= 80;

            const box = document.createElement('div');
            box.className = `mb-ud-box ${isPassed ? 'passed' : ''}`;

            let feedbackHtml = '';
            if (res) {
                let strokeColor = '#ef4444';
                let glowFilter = 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.7))';
                if (res.overallScore >= 80) {
                    strokeColor = '#22c55e';
                    glowFilter = 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.7))';
                } else if (res.overallScore > 30) {
                    strokeColor = '#eab308';
                    glowFilter = 'drop-shadow(0 0 10px rgba(234, 179, 8, 0.7))';
                }
                const r = 46;
                const circ = 2 * Math.PI * r;
                const offset = circ - (res.overallScore / 100) * circ;

                feedbackHtml = `
                    <div class="mb-ud-feedback">
                        <div class="mb-ud-ring-wrap">
                            <svg class="mb-ud-ring-svg" viewBox="0 0 112 112" aria-hidden="true">
                                <circle cx="56" cy="56" r="${r}" fill="none" stroke="rgba(203,213,225,0.14)" stroke-width="8"></circle>
                                <circle cx="56" cy="56" r="${r}" fill="none" stroke="${strokeColor}" stroke-width="8" stroke-linecap="round"
                                    stroke-dasharray="${circ.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"
                                    style="filter:${glowFilter}; transition: stroke-dashoffset 0.55s ease;"></circle>
                            </svg>
                            <span class="mb-ud-ring-score">${res.overallScore}%</span>
                        </div>
                        <div class="mb-ud-word-chips" dir="ltr">
                            ${res.wordData.map(item => {
                                let bg = 'rgba(239, 68, 68, 0.15)';
                                let border = 'rgba(239, 68, 68, 0.5)';
                                let txt = '#fca5a5';
                                if (item.score >= 80) {
                                    bg = 'rgba(34, 197, 94, 0.18)';
                                    border = 'rgba(34, 197, 94, 0.6)';
                                    txt = '#86efac';
                                } else if (item.score > 30) {
                                    bg = 'rgba(234, 179, 8, 0.18)';
                                    border = 'rgba(234, 179, 8, 0.6)';
                                    txt = '#fde047';
                                }
                                return `
                                    <div class="mb-ud-word-chip" style="background:${bg}; border:1px solid ${border};">
                                        <span style="font-size:0.9rem; font-weight:700; color:#ffffff;">${escapeHtml(item.word)}</span>
                                        <span style="font-size:0.72rem; font-weight:800; color:${txt}; margin-top:2px;">${item.score}%</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        ${res.transcript ? `
                            <div class="mb-ud-heard" dir="ltr">
                                ${isEn ? 'Heard:' : 'Systemet hørte:'} <strong style="color:#f1f5f9;">»${escapeHtml(res.transcript)}«</strong>
                            </div>
                        ` : ''}
                    </div>
                `;
            }

            box.innerHTML = `
                <div class="mb-ud-box-head">
                    <span class="mb-ud-cat-tag" style="${boxMeta ? `border-color:${boxMeta.border}; color:${boxMeta.color};` : ''}">
                        <span>#${idx + 1}</span>
                        ${boxMeta ? `<span>· ${mbT('box_' + entry.boxId, lang)}</span>` : ''}
                    </span>
                    ${isPassed ? `<span style="color:#4ade80; font-size:0.78rem; font-weight:800; display:inline-flex; align-items:center; gap:0.25rem;">${SVG_CHECK}<span>${isEn ? 'Great!' : 'Godt udtalt'}</span></span>` : ''}
                </div>
                <div class="mb-ud-sentence" dir="ltr">${escapeHtml(entry.text)}</div>
                <div class="mb-ud-controls">
                    <button type="button" class="mb-ud-btn-mic ${isListening ? 'listening' : ''}" data-ud-mic="${idx}">
                        ${SVG_MIC}<span>${isListening ? (isEn ? 'Listening...' : 'Lytter...') : (isEn ? 'Speak now' : 'Tal nu')}</span>
                    </button>
                    <button type="button" class="mb-ud-btn-ghost" data-ud-listen="${idx}">
                        ${SVG_SPEAK}<span>${isEn ? 'Listen' : 'Lyt'}</span>
                    </button>
                    <button type="button" class="mb-ud-btn-ghost" data-ud-slow="${idx}">
                        <span>${isEn ? 'Slow' : 'Langsom'}</span>
                    </button>
                </div>
                ${errorMsgByIdx[idx] ? `<div style="margin-top:0.65rem; font-size:0.8rem; color:#fca5a5;">${escapeHtml(errorMsgByIdx[idx])}</div>` : ''}
                ${feedbackHtml}
            `;

            box.querySelector(`[data-ud-mic="${idx}"]`).onclick = () => startListeningFor(idx);
            box.querySelector(`[data-ud-listen="${idx}"]`).onclick = () => speakDanish(entry.text, 0.9);
            box.querySelector(`[data-ud-slow="${idx}"]`).onclick = () => speakDanish(entry.text, 0.66);

            list.appendChild(box);
        });

        root.appendChild(list);
    }

    render();

    root.importAndRefresh = (newEntries) => {
        if (Array.isArray(newEntries) && newEntries.length > 0) {
            entries = newEntries;
            resultsByIdx = {};
            errorMsgByIdx = {};
            saveMinBoligUdtaleSentences(entries);
        } else {
            loadSaved();
        }
        render();
    };

    return root;
}
