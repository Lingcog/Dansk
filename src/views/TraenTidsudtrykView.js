import { getTranslation } from '../utils/i18n.js';

export function renderTraenTidsudtrykView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('dagens_opgave');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('traenTidsudtryk');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('traenTidsudtrykDesc');
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);

    const exerciseData = [
        // 1-7: Position at the end
        { text: "Jeg drak kaffe [blank_0].", blanks: [{ answer: "i morges", options: ["i morges", "i morgen", "nu"], hint: "Se på verbet 'drak'. Er det nutid eller datid?" }] },
        { text: "Vi drikker vand [blank_0].", blanks: [{ answer: "nu", options: ["nu", "i går", "på torsdag"], hint: "Se på verbet 'drikker'. Er det nutid eller datid?" }] },
        { text: "Han skal til lægen [blank_0].", blanks: [{ answer: "i morgen", options: ["i morgen", "i går", "nu"], hint: "Se på verbet 'skal'. Det indikerer noget, der sker senere." }] },
        { text: "Hun var i biografen [blank_0].", blanks: [{ answer: "i går", options: ["i går", "nu", "i næste uge"], hint: "Se på verbet 'var'. Er det nutid eller datid?" }] },
        { text: "De spiller fodbold [blank_0].", blanks: [{ answer: "om søndagen", options: ["om søndagen", "i går", "på fredag"], hint: "Her beskrives noget, man gør hver uge." }] },
        { text: "Vi rejser til Spanien [blank_0].", blanks: [{ answer: "i næste uge", options: ["i næste uge", "nu", "i går"], hint: "Det er en plan for fremtiden." }] },
        { text: "Jeg læste en bog [blank_0].", blanks: [{ answer: "i lørdags", options: ["i lørdags", "på søndag", "i morgen"], hint: "Se på verbet 'læste'. Er det nutid eller datid?" }] },
        // 8-15: Mixed position, inversion focus
        { text: "[blank_0] drikker vi kaffe.", blanks: [{ answer: "Om morgenen", options: ["Om morgenen", "I går", "I morgen"], hint: "Vi gør det som en vane hver dag." }] },
        { text: "[blank_0] var jeg træt.", blanks: [{ answer: "I går", options: ["I går", "Nu", "På mandag"], hint: "Se på verbet 'var'. Det er datid." }] },
        { text: "Jeg køber ind [blank_0].", blanks: [{ answer: "i morgen", options: ["i morgen", "nu", "i går"], hint: "Her er tale om en plan for fremtiden." }] },
        { text: "[blank_0] skal vi på ferie.", blanks: [{ answer: "I næste måned", options: ["I næste måned", "I går", "Nu"], hint: "Det er noget, der skal ske i fremtiden." }] },
        { text: "Vi går en tur [blank_0].", blanks: [{ answer: "hver dag", options: ["hver dag", "i går", "i morgen"], hint: "Det er noget, vi gør fast." }] },
        { text: "[blank_0] drak jeg en øl.", blanks: [{ answer: "I fredags", options: ["I fredags", "Nu", "På søndag"], hint: "Se på verbet 'drak'. Det er datid." }] },
        { text: "[blank_0] skal hun til fest.", blanks: [{ answer: "På lørdag", options: ["På lørdag", "I går", "Nu"], hint: "Det er en plan for fremtiden." }] },
        { text: "De ser fjernsyn [blank_0].", blanks: [{ answer: "nu", options: ["nu", "i går", "på torsdag"], hint: "Det foregår lige nu." }] }
    ];

    let currentIdx = 0;
    const gameArea = document.createElement('div');
    gameArea.className = 'exercise-card';
    viewContainer.appendChild(gameArea);

    function renderExercise() {
        gameArea.innerHTML = '';
        const ex = exerciseData[currentIdx];

        const progress = document.createElement('div');
        progress.className = 'exercise-progress';
        progress.style.textAlign = 'center';
        progress.style.marginBottom = '1rem';
        progress.style.fontSize = '0.9rem';
        progress.style.opacity = '0.7';
        progress.textContent = `${currentIdx + 1} / ${exerciseData.length}`;
        gameArea.appendChild(progress);

        const textContainer = document.createElement('div');
        textContainer.className = 'grammatik-text-container';

        const parts = ex.text.split(/(\[blank_\d+\])/);
        parts.forEach(part => {
            const match = part.match(/\[blank_(\d+)\]/);
            if (match) {
                const idx = match[1];
                const wrapper = document.createElement('span');
                wrapper.className = 'select-wrapper';

                const select = document.createElement('select');
                select.className = 'grammatik-select';
                select.dataset.idx = idx;

                const def = document.createElement('option');
                def.value = '';
                def.textContent = '...';
                select.appendChild(def);

                ex.blanks[idx].options.forEach(opt => {
                    const o = document.createElement('option');
                    o.value = opt;
                    o.textContent = opt;
                    select.appendChild(o);
                });

                wrapper.appendChild(select);
                textContainer.appendChild(wrapper);
            } else {
                const span = document.createElement('span');
                span.textContent = part;
                textContainer.appendChild(span);
            }
        });
        gameArea.appendChild(textContainer);

        const feedbackArea = document.createElement('div');
        feedbackArea.className = 'exercise-feedback';
        gameArea.appendChild(feedbackArea);

        const controls = document.createElement('div');
        controls.className = 'game-controls';

        const checkBtn = document.createElement('button');
        checkBtn.className = 'gemini-btn';
        checkBtn.textContent = getTranslation('checkAnswers');
        checkBtn.onclick = () => {
            const selects = textContainer.querySelectorAll('select');
            let allCorrect = true;
            let firstHint = '';

            selects.forEach(s => {
                const idx = s.dataset.idx;
                if (s.value === ex.blanks[idx].answer) {
                    s.classList.add('correct');
                    s.classList.remove('wrong');
                } else {
                    s.classList.add('wrong');
                    s.classList.remove('correct');
                    allCorrect = false;
                    if (!firstHint) firstHint = ex.blanks[idx].hint;
                }
            });

            if (allCorrect) {
                feedbackArea.style.display = 'none';
                checkBtn.style.display = 'none';
                nextBtn.style.display = 'inline-block';
            } else {
                feedbackArea.textContent = firstHint || getTranslation('hintContext');
                feedbackArea.style.display = 'block';
            }
        };

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gemini-btn';
        nextBtn.textContent = currentIdx < exerciseData.length - 1 ? getTranslation('next') : getTranslation('finish');
        nextBtn.style.display = 'none';
        nextBtn.onclick = () => {
            if (currentIdx < exerciseData.length - 1) {
                currentIdx++;
                renderExercise();
            } else {
                navigateFn('dagens_opgave');
            }
        };

        controls.appendChild(checkBtn);
        controls.appendChild(nextBtn);
        gameArea.appendChild(controls);
    }

    renderExercise();
    container.appendChild(viewContainer);
}
