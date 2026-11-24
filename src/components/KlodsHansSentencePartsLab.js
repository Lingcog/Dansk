/**
 * KlodsHansSentencePartsLab.js
 *
 * Lag 2 ("Sætningsdele") til Opgaver til scenen i Klods-Hans (Scene 1: På bondegården).
 * Gør det tydeligt gennem konkret manipulation, at en sætning består af sammenhængende
 * byggeklodser: Hvem & Handling, Navne-pakker, Sted & Tid (V2), og Uddybninger (som/der).
 *
 * Stil: Kølig skandinavisk minimalisme (skifer + monokrome knapper + én petrol-accent), nul emojis.
 */

const PARTS_CATEGORIES = [
    {
        key: 'hvem_handling',
        label: 'Hvem & Handling',
        subLabel: 'Subjekt & Verbal',
        tasks: [
            {
                id: 'hh_1',
                kind: 'pick_chunk',
                instruction: 'Klik på hele »Hvem«-klodsen (subjektet) i sætningen:',
                chunks: [
                    { text: 'En dag', role: 'tid' },
                    { text: 'fortalte', role: 'vrb' },
                    { text: 'den gamle far', role: 'sub', isCorrect: true },
                    { text: 'dem', role: 'obj' }
                ],
                feedbackOk: 'Rigtigt. »den gamle far« er én samlet Hvem-klods (subjekt) på tre ord.',
                feedbackNo: 'Prøv igen — find den samlede klods, der fortæller hvem der gør handlingen.'
            },
            {
                id: 'hh_2',
                kind: 'insert_slot',
                instruction: 'Verbal-tangen: Klik der hvor »også« skal stå i sætningen:',
                wordToInsert: 'også',
                segments: ['Jeg', 'vil', 'gå!'],
                correctSlot: 2, // mellem 'vil' og 'gå!'
                feedbackOk: 'Rigtigt: »Jeg vil også gå!« — det lille ord lægger sig inde i verbal-tangen mellem »vil« og »gå«.',
                feedbackNo: 'Ikke helt. Prøv at lægge »også« inde mellem de to verber (»vil« og »gå«).'
            },
            {
                id: 'hh_3',
                kind: 'pick_chunk',
                instruction: 'Hvad er hele »Hvem«-klodsen (subjektet) foran »vinder hende«?',
                chunks: [
                    { text: 'Den, som taler bedst', role: 'sub', isCorrect: true },
                    { text: 'vinder', role: 'vrb' },
                    { text: 'hende', role: 'obj' }
                ],
                feedbackOk: 'Rigtigt. Hele klodsen »Den, som taler bedst« fungerer som ét samlet subjekt.',
                feedbackNo: 'Prøv igen — hvem er det, der vinder hende?'
            }
        ]
    },
    {
        key: 'navne_pakker',
        label: 'Navne-pakker',
        subLabel: 'Adjektiv + navneord',
        tasks: [
            {
                id: 'np_1',
                kind: 'puzzle',
                instruction: 'Saml navne-pakken i rigtig rækkefølge (ubestemt form):',
                pieces: ['gård', 'en', 'gammel'],
                answer: ['en', 'gammel', 'gård'],
                feedbackOk: 'Rigtigt: »en gammel gård« — kendeord + adjektiv + navneord danner én fast pakke.',
                feedbackNo: 'Tjek rækkefølgen: først kendeord (en), så beskrivelse (gammel), så tingen (gård).'
            },
            {
                id: 'np_2',
                kind: 'puzzle',
                instruction: 'Saml navne-pakken i bestemt form (læg mærke til -e på »gamle«):',
                pieces: ['far', 'gamle', 'den'],
                answer: ['den', 'gamle', 'far'],
                feedbackOk: 'Rigtigt: »den gamle far« — når pakken starter med »den«, får adjektivet -e.',
                feedbackNo: 'Prøv igen: først »den«, så »gamle«, så »far«.'
            },
            {
                id: 'np_3',
                kind: 'puzzle',
                instruction: 'Saml den store navne-pakke fra storebrors replik:',
                pieces: ['ting', 'komplicerede', 'store', 'og'],
                answer: ['store', 'og', 'komplicerede', 'ting'],
                feedbackOk: 'Rigtigt: »store og komplicerede ting« — alle fire ord bevæger sig som én samlet klods.',
                feedbackNo: 'Prøv igen: sæt de to beskrivelser foran navneordet »ting«.'
            }
        ]
    },
    {
        key: 'sted_tid',
        label: 'Sted & Tid',
        subLabel: 'Præpositionsfraser & V2',
        tasks: [
            {
                id: 'st_1',
                kind: 'v2_flip',
                instruction: 'Flyt tidspakken »En dag« forrest i sætningen. Hvad sker der med verbet?',
                baseChunks: ['Den gamle far', 'fortalte', 'dem', 'en dag.'],
                movedChunk: 'En dag',
                choices: [
                    { label: 'En dag fortalte den gamle far dem.', isCorrect: true },
                    { label: 'En dag den gamle far fortalte dem.', isCorrect: false }
                ],
                feedbackOk: 'Rigtigt. Verbet (»fortalte«) bliver stående på plads 2, så subjektet hopper om bagved.',
                feedbackNo: 'Husk plads 2-reglen på dansk: verbet (»fortalte«) skal stå lige efter »En dag«.'
            },
            {
                id: 'st_2',
                kind: 'v2_flip',
                instruction: 'Flyt stedpakken »Til slottet« forrest i storebrors sætning:',
                baseChunks: ['Jeg', 'tager', 'til slottet.'],
                movedChunk: 'Til slottet',
                choices: [
                    { label: 'Til slottet tager jeg.', isCorrect: true },
                    { label: 'Til slottet jeg tager.', isCorrect: false }
                ],
                feedbackOk: 'Rigtigt: »Til slottet tager jeg.« — stedpakken fylder plads 1, og verbet står fast på plads 2.',
                feedbackNo: 'Prøv igen — verbet (»tager«) skal stå på plads 2 lige efter »Til slottet«.'
            },
            {
                id: 'st_3',
                kind: 'puzzle',
                instruction: 'Saml stedpakken fra eventyrets første linje:',
                pieces: ['landet', 'Ude', 'på'],
                answer: ['Ude', 'på', 'landet'],
                feedbackOk: 'Rigtigt: »Ude på landet« er én samlet stedpakke, der sætter scenen på plads 1.',
                feedbackNo: 'Prøv igen: start med »Ude«, så »på«, så »landet«.'
            }
        ]
    },
    {
        key: 'uddybninger',
        label: 'Uddybninger (som/der)',
        subLabel: 'Relativsætninger',
        tasks: [
            {
                id: 'ud_1',
                kind: 'merge_rel',
                instruction: 'Flet de to korte sætninger sammen til én med det rigtige bindeord:',
                leftSentence: 'I den var der en gammel far.',
                rightSentence: 'Han havde tre sønner.',
                templateBefore: 'I den var der en gammel far, ',
                templateAfter: ' havde tre sønner.',
                choices: [
                    { label: 'som', isCorrect: true },
                    { label: 'men', isCorrect: false },
                    { label: 'fordi', isCorrect: false }
                ],
                feedbackOk: 'Rigtigt: »en gammel far, som havde tre sønner« — »som« hægter uddybningen fast på faren.',
                feedbackNo: 'Prøv igen — hvilket ord peger tilbage på »en gammel far«?'
            },
            {
                id: 'ud_2',
                kind: 'pick_chunk',
                instruction: 'Hvilken navne-pakke uddyber klodsen »der var så kloge«?',
                chunks: [
                    { text: 'en gammel gård', role: 'np' },
                    { text: 'en gammel far', role: 'np' },
                    { text: 'tre sønner', role: 'np', isCorrect: true }
                ],
                feedbackOk: 'Rigtigt. »der var så kloge« hænger fast på »tre sønner«.',
                feedbackNo: 'Prøv igen — læs sætningen: hvem var det, der var så kloge?'
            },
            {
                id: 'ud_3',
                kind: 'fold_rel',
                instruction: 'Klik på uddybningen for at folde den ind og ud. Kan hovedsætningen stå alene uden den?',
                mainBefore: 'I den var der en gammel far',
                relClause: ', som havde tre sønner',
                mainAfter: '.',
                choices: [
                    { label: 'Ja — hovedsætningen giver stadig mening alene', isCorrect: true },
                    { label: 'Nej — hovedsætningen falder fra hinanden', isCorrect: false }
                ],
                feedbackOk: 'Rigtigt. En relativsætning er en ekstra klods, man kan hægte på eller tage af.',
                feedbackNo: 'Prøv at klikke på klodsen for at skjule den — »I den var der en gammel far.« virker helt fint alene.'
            }
        ]
    }
];

export function createSentencePartsLab() {
    if (!document.getElementById('kh-parts-lab-styles')) {
        const st = document.createElement('style');
        st.id = 'kh-parts-lab-styles';
        st.textContent = `
            .kh-parts-lab {
                display: flex;
                flex-direction: column;
                gap: 0.9rem;
            }
            .kh-parts-subtabs {
                display: flex;
                flex-wrap: wrap;
                gap: 0.45rem;
            }
            .kh-parts-tab {
                background: #1a212b;
                border: 1px solid rgba(203, 213, 225, 0.15);
                color: #94a3b8;
                padding: 0.45rem 0.85rem;
                border-radius: 9px;
                font-size: 0.84rem;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 0.1rem;
                transition: all 0.18s ease;
            }
            .kh-parts-tab:hover {
                border-color: rgba(203, 213, 225, 0.35);
                color: #f1f5f9;
            }
            .kh-parts-tab.active {
                background: #e2e8f0;
                border-color: #e2e8f0;
                color: #0f172a;
            }
            .kh-parts-tab-sub {
                font-size: 0.7rem;
                opacity: 0.72;
                font-weight: 500;
            }
            .kh-parts-list {
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
            }
            .kh-part-card {
                background: #12171e;
                border: 1px solid rgba(203, 213, 225, 0.13);
                border-radius: 12px;
                padding: 0.95rem 1.05rem;
                display: flex;
                flex-direction: column;
                gap: 0.7rem;
            }
            .kh-part-instr {
                font-size: 0.9rem;
                font-weight: 700;
                color: #f1f5f9;
                margin: 0;
            }
            .kh-chunk-row {
                display: flex;
                flex-wrap: wrap;
                gap: 0.45rem;
                align-items: center;
            }
            .kh-chunk-btn {
                background: #1a212b;
                border: 1px solid rgba(203, 213, 225, 0.22);
                color: #e2e8f0;
                padding: 0.45rem 0.85rem;
                border-radius: 9px;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.16s ease;
            }
            .kh-chunk-btn:hover {
                border-color: #4c9ba6;
                color: #ffffff;
            }
            .kh-chunk-btn.is-correct {
                background: rgba(43, 110, 120, 0.32);
                border-color: #4c9ba6;
                color: #e2f5f7;
            }
            .kh-chunk-btn.is-wrong {
                background: rgba(185, 28, 28, 0.22);
                border-color: rgba(248, 113, 113, 0.65);
                color: #fecaca;
            }
            .kh-chunk-btn.used {
                opacity: 0.32;
                pointer-events: none;
            }
            .kh-puzzle-tray {
                min-height: 44px;
                background: #151a21;
                border: 1px dashed rgba(203, 213, 225, 0.24);
                border-radius: 10px;
                padding: 0.45rem 0.65rem;
                display: flex;
                flex-wrap: wrap;
                gap: 0.4rem;
                align-items: center;
            }
            .kh-puzzle-placeholder {
                color: #64748b;
                font-size: 0.82rem;
            }
            .kh-puzzle-actions {
                display: flex;
                gap: 0.5rem;
                align-items: center;
            }
            .kh-mini-btn {
                background: transparent;
                border: 1px solid rgba(203, 213, 225, 0.22);
                color: #94a3b8;
                padding: 0.32rem 0.7rem;
                border-radius: 8px;
                font-size: 0.78rem;
                font-weight: 600;
                cursor: pointer;
            }
            .kh-mini-btn:hover {
                color: #f1f5f9;
                border-color: rgba(203, 213, 225, 0.45);
            }
            .kh-slot-btn {
                background: rgba(43, 110, 120, 0.14);
                border: 1.5px dashed rgba(76, 155, 166, 0.6);
                color: #7ec4ce;
                padding: 0.32rem 0.6rem;
                border-radius: 8px;
                font-size: 0.8rem;
                font-weight: 700;
                cursor: pointer;
            }
            .kh-slot-btn:hover {
                background: rgba(43, 110, 120, 0.3);
            }
            .kh-static-word {
                padding: 0.4rem 0.7rem;
                border-radius: 8px;
                background: #1a212b;
                border: 1px solid rgba(203, 213, 225, 0.14);
                color: #f1f5f9;
                font-weight: 700;
                font-size: 0.92rem;
            }
            .kh-static-word.highlight {
                border-color: rgba(76, 155, 166, 0.6);
                color: #7ec4ce;
            }
            .kh-fold-sentence {
                background: #151a21;
                border: 1px solid rgba(203, 213, 225, 0.14);
                border-radius: 10px;
                padding: 0.75rem 0.95rem;
                font-size: 0.96rem;
                line-height: 1.65;
                color: #e2e8f0;
            }
            .kh-fold-clause {
                display: inline-block;
                padding: 0.1rem 0.45rem;
                margin: 0 0.15rem;
                border-radius: 6px;
                background: rgba(43, 110, 120, 0.24);
                border: 1px solid rgba(76, 155, 166, 0.55);
                color: #7ec4ce;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .kh-fold-clause.folded {
                background: rgba(203, 213, 225, 0.06);
                border-style: dashed;
                color: #64748b;
                text-decoration: line-through;
            }
            .kh-part-feedback {
                font-size: 0.83rem;
                line-height: 1.45;
                padding: 0.5rem 0.75rem;
                border-radius: 8px;
                display: none;
            }
            .kh-part-feedback.ok {
                display: block;
                background: rgba(43, 110, 120, 0.22);
                border: 1px solid rgba(76, 155, 166, 0.5);
                color: #d7f0f4;
            }
            .kh-part-feedback.no {
                display: block;
                background: rgba(185, 28, 28, 0.16);
                border: 1px solid rgba(248, 113, 113, 0.45);
                color: #fecaca;
            }
        `;
        document.head.appendChild(st);
    }

    const wrap = document.createElement('div');
    wrap.className = 'kh-parts-lab';

    let activeCatKey = PARTS_CATEGORIES[0].key;
    const stateMap = {};

    function render() {
        wrap.innerHTML = '';

        // Sub-tabs for Lag 2
        const subTabs = document.createElement('div');
        subTabs.className = 'kh-parts-subtabs';

        PARTS_CATEGORIES.forEach(cat => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `kh-parts-tab ${cat.key === activeCatKey ? 'active' : ''}`;
            btn.dataset.partsCat = cat.key;
            btn.innerHTML = `
                <span>${cat.label}</span>
                <span class="kh-parts-tab-sub">${cat.subLabel}</span>
            `;
            btn.onclick = () => {
                activeCatKey = cat.key;
                render();
            };
            subTabs.appendChild(btn);
        });
        wrap.appendChild(subTabs);

        const activeCat = PARTS_CATEGORIES.find(c => c.key === activeCatKey) || PARTS_CATEGORIES[0];
        const list = document.createElement('div');
        list.className = 'kh-parts-list';

        activeCat.tasks.forEach(task => {
            const st = stateMap[task.id] || {};
            const card = document.createElement('div');
            card.className = 'kh-part-card';
            card.dataset.taskId = task.id;

            const instr = document.createElement('p');
            instr.className = 'kh-part-instr';
            instr.textContent = task.instruction;
            card.appendChild(instr);

            const fb = document.createElement('div');
            fb.className = `kh-part-feedback ${st.status || ''}`;
            fb.textContent = st.status === 'ok' ? task.feedbackOk : (st.status === 'no' ? task.feedbackNo : '');

            if (task.kind === 'pick_chunk') {
                const row = document.createElement('div');
                row.className = 'kh-chunk-row';
                task.chunks.forEach((ch, idx) => {
                    const b = document.createElement('button');
                    b.type = 'button';
                    let cls = 'kh-chunk-btn';
                    if (st.picked === idx) cls += ch.isCorrect ? ' is-correct' : ' is-wrong';
                    b.className = cls;
                    b.textContent = ch.text;
                    b.onclick = () => {
                        stateMap[task.id] = { picked: idx, status: ch.isCorrect ? 'ok' : 'no' };
                        render();
                    };
                    row.appendChild(b);
                });
                card.appendChild(row);
            } else if (task.kind === 'insert_slot') {
                const row = document.createElement('div');
                row.className = 'kh-chunk-row';
                task.segments.forEach((seg, idx) => {
                    if (idx > 0) {
                        const slotBtn = document.createElement('button');
                        slotBtn.type = 'button';
                        const isPicked = st.pickedSlot === idx;
                        const ok = idx === task.correctSlot;
                        slotBtn.className = `kh-slot-btn ${isPicked ? (ok ? 'is-correct' : 'is-wrong') : ''}`;
                        slotBtn.textContent = isPicked ? task.wordToInsert : `+ ${task.wordToInsert}`;
                        slotBtn.onclick = () => {
                            stateMap[task.id] = { pickedSlot: idx, status: ok ? 'ok' : 'no' };
                            render();
                        };
                        row.appendChild(slotBtn);
                    }
                    const w = document.createElement('span');
                    w.className = 'kh-static-word';
                    w.textContent = seg;
                    row.appendChild(w);
                });
                card.appendChild(row);
            } else if (task.kind === 'puzzle') {
                const assembled = st.assembled || [];
                const tray = document.createElement('div');
                tray.className = 'kh-puzzle-tray';
                if (assembled.length === 0) {
                    tray.innerHTML = `<span class="kh-puzzle-placeholder">Klik på klodserne nedenfor for at samle pakken...</span>`;
                } else {
                    assembled.forEach((word, pos) => {
                        const chip = document.createElement('button');
                        chip.type = 'button';
                        chip.className = `kh-chunk-btn ${st.status === 'ok' ? 'is-correct' : (st.status === 'no' ? 'is-wrong' : '')}`;
                        chip.textContent = word;
                        chip.onclick = () => {
                            const next = assembled.filter((_, i) => i !== pos);
                            stateMap[task.id] = { assembled: next, status: '' };
                            render();
                        };
                        tray.appendChild(chip);
                    });
                }
                card.appendChild(tray);

                const bank = document.createElement('div');
                bank.className = 'kh-chunk-row';
                task.pieces.forEach(piece => {
                    const isUsed = assembled.includes(piece);
                    const b = document.createElement('button');
                    b.type = 'button';
                    b.className = `kh-chunk-btn ${isUsed ? 'used' : ''}`;
                    b.textContent = piece;
                    b.onclick = () => {
                        const next = [...assembled, piece];
                        let status = '';
                        if (next.length === task.answer.length) {
                            status = next.join(' ') === task.answer.join(' ') ? 'ok' : 'no';
                        }
                        stateMap[task.id] = { assembled: next, status };
                        render();
                    };
                    bank.appendChild(b);
                });
                card.appendChild(bank);

                if (assembled.length > 0) {
                    const actions = document.createElement('div');
                    actions.className = 'kh-puzzle-actions';
                    const resetBtn = document.createElement('button');
                    resetBtn.type = 'button';
                    resetBtn.className = 'kh-mini-btn';
                    resetBtn.textContent = 'Nulstil';
                    resetBtn.onclick = () => {
                        stateMap[task.id] = { assembled: [], status: '' };
                        render();
                    };
                    actions.appendChild(resetBtn);
                    card.appendChild(actions);
                }
            } else if (task.kind === 'v2_flip') {
                const baseRow = document.createElement('div');
                baseRow.className = 'kh-chunk-row';
                task.baseChunks.forEach((ch, idx) => {
                    const sp = document.createElement('span');
                    sp.className = `kh-static-word ${idx === task.baseChunks.length - 1 ? 'highlight' : ''}`;
                    sp.textContent = ch;
                    baseRow.appendChild(sp);
                });
                card.appendChild(baseRow);

                const choicesRow = document.createElement('div');
                choicesRow.className = 'kh-chunk-row';
                task.choices.forEach((ch, idx) => {
                    const b = document.createElement('button');
                    b.type = 'button';
                    let cls = 'kh-chunk-btn';
                    if (st.picked === idx) cls += ch.isCorrect ? ' is-correct' : ' is-wrong';
                    b.className = cls;
                    b.textContent = ch.label;
                    b.onclick = () => {
                        stateMap[task.id] = { picked: idx, status: ch.isCorrect ? 'ok' : 'no' };
                        render();
                    };
                    choicesRow.appendChild(b);
                });
                card.appendChild(choicesRow);
            } else if (task.kind === 'merge_rel') {
                const preview = document.createElement('div');
                preview.className = 'kh-fold-sentence';
                const chosenLabel = st.picked !== undefined ? task.choices[st.picked].label : '___';
                preview.innerHTML = `
                    <div style="font-size:0.82rem; color:#94a3b8; margin-bottom:0.35rem;">${task.leftSentence} + ${task.rightSentence}</div>
                    <div>${task.templateBefore}<span class="kh-static-word highlight" style="padding:0.12rem 0.5rem;">${chosenLabel}</span>${task.templateAfter}</div>
                `;
                card.appendChild(preview);

                const choicesRow = document.createElement('div');
                choicesRow.className = 'kh-chunk-row';
                task.choices.forEach((ch, idx) => {
                    const b = document.createElement('button');
                    b.type = 'button';
                    let cls = 'kh-chunk-btn';
                    if (st.picked === idx) cls += ch.isCorrect ? ' is-correct' : ' is-wrong';
                    b.className = cls;
                    b.textContent = ch.label;
                    b.onclick = () => {
                        stateMap[task.id] = { picked: idx, status: ch.isCorrect ? 'ok' : 'no' };
                        render();
                    };
                    choicesRow.appendChild(b);
                });
                card.appendChild(choicesRow);
            } else if (task.kind === 'fold_rel') {
                const isFolded = !!st.folded;
                const box = document.createElement('div');
                box.className = 'kh-fold-sentence';
                box.innerHTML = `
                    <span>${task.mainBefore}</span><span class="kh-fold-clause ${isFolded ? 'folded' : ''}" title="Klik for at folde ind/ud">${task.relClause}</span><span>${task.mainAfter}</span>
                `;
                box.querySelector('.kh-fold-clause').onclick = () => {
                    stateMap[task.id] = { ...st, folded: !isFolded };
                    render();
                };
                card.appendChild(box);

                const choicesRow = document.createElement('div');
                choicesRow.className = 'kh-chunk-row';
                task.choices.forEach((ch, idx) => {
                    const b = document.createElement('button');
                    b.type = 'button';
                    let cls = 'kh-chunk-btn';
                    if (st.picked === idx) cls += ch.isCorrect ? ' is-correct' : ' is-wrong';
                    b.className = cls;
                    b.textContent = ch.label;
                    b.onclick = () => {
                        stateMap[task.id] = { ...st, picked: idx, status: ch.isCorrect ? 'ok' : 'no' };
                        render();
                    };
                    choicesRow.appendChild(b);
                });
                card.appendChild(choicesRow);
            }

            card.appendChild(fb);
            list.appendChild(card);
        });

        wrap.appendChild(list);
    }

    render();
    return wrap;
}
