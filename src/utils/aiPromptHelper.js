/**
 * Shared UI helper for converting legacy Gembot links into visible,
 * one-click copyable AI system prompts usable in any free AI chat tool
 * (Google Gemini, ChatGPT, etc.).
 */

function injectPromptFlowStyles() {
    if (document.getElementById('ai-prompt-flow-styles')) return;
    const style = document.createElement('style');
    style.id = 'ai-prompt-flow-styles';
    style.textContent = `
        .ai-flow-wrap {
            width: 100%;
            margin-top: 1.4rem;
            box-sizing: border-box;
        }
        .sh-guide-card {
            width: 100%;
            background: rgba(15, 23, 42, 0.78);
            border: 1.5px solid rgba(255, 255, 255, 0.14);
            border-radius: 18px;
            padding: 1.2rem 1.35rem;
            margin: 1rem 0 1.2rem;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
            text-align: left;
            box-sizing: border-box;
        }
        .sh-guide-title {
            margin: 0 0 0.8rem;
            font-size: 1.04rem;
            font-weight: 800;
            color: #fbbf24;
            letter-spacing: 0.01em;
        }
        .sh-steps {
            margin: 0;
            padding-left: 1.25rem;
            display: grid;
            gap: 0.5rem;
            color: #e2e8f0;
            font-size: 0.94rem;
            line-height: 1.5;
        }
        .sh-actions-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin: 1rem 0 1.3rem;
        }
        .sh-copy-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.95rem 1.7rem;
            border-radius: 14px;
            border: 2px solid #f59e0b;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #0f172a;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
            transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
            box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);
        }
        .sh-copy-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(245, 158, 11, 0.42);
        }
        .sh-copy-btn.copied {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            border-color: #4ade80;
            color: #052e16;
            box-shadow: 0 6px 20px rgba(34, 197, 94, 0.35);
        }
        .sh-ai-link-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            padding: 0.85rem 1.25rem;
            border-radius: 14px;
            border: 1.5px solid rgba(255, 255, 255, 0.22);
            background: rgba(30, 41, 59, 0.85);
            color: #f8fafc;
            font-weight: 700;
            font-size: 0.94rem;
            text-decoration: none;
            transition: all 0.2s ease;
        }
        .sh-ai-link-btn:hover {
            background: rgba(51, 65, 85, 0.95);
            border-color: rgba(255, 255, 255, 0.45);
            transform: translateY(-2px);
        }
        .sh-prompt-box {
            width: 100%;
            background: rgba(7, 13, 25, 0.86);
            border: 1.5px solid rgba(148, 163, 184, 0.28);
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
            text-align: left;
            box-sizing: border-box;
        }
        .sh-prompt-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            flex-wrap: wrap;
            padding: 0.85rem 1.2rem;
            background: rgba(30, 41, 59, 0.75);
            border-bottom: 1px solid rgba(148, 163, 184, 0.22);
        }
        .sh-prompt-label {
            font-size: 0.9rem;
            font-weight: 800;
            color: #f8fafc;
            letter-spacing: 0.02em;
        }
        .sh-mini-copy-btn {
            padding: 0.4rem 0.85rem;
            border-radius: 9px;
            border: 1px solid rgba(251, 191, 36, 0.5);
            background: rgba(251, 191, 36, 0.14);
            color: #fde68a;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .sh-mini-copy-btn.copied {
            border-color: #4ade80;
            background: rgba(34, 197, 94, 0.2);
            color: #86efac;
        }
        .sh-prompt-pre {
            margin: 0;
            padding: 1.15rem 1.25rem;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.85rem;
            line-height: 1.62;
            color: #e2e8f0;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
            word-break: break-word;
            max-height: 440px;
            overflow-y: auto;
        }
        @media (max-width: 600px) {
            .sh-guide-card { padding: 1rem; }
            .sh-actions-bar { flex-direction: column; align-items: stretch; }
            .sh-copy-btn, .sh-ai-link-btn { width: 100%; box-sizing: border-box; }
            .sh-prompt-pre { font-size: 0.8rem; padding: 0.95rem 1rem; max-height: 340px; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Copies prompt text to clipboard with a DOM fallback and temporary visual feedback.
 */
export async function copyPromptText(text, buttons) {
    let ok = false;
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            ok = true;
        }
    } catch (_) {
        ok = false;
    }

    if (!ok) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
            ok = document.execCommand('copy');
        } catch (_) {
            ok = false;
        }
        document.body.removeChild(ta);
    }

    if (!ok) return;

    buttons.forEach(btn => {
        if (!btn.dataset.origLabel) btn.dataset.origLabel = btn.textContent;
        btn.classList.add('copied');
        btn.textContent = btn.classList.contains('sh-copy-btn')
            ? '✓ Kopieret! Indsæt den i Gemini eller ChatGPT'
            : '✓ Kopieret!';
    });

    setTimeout(() => {
        buttons.forEach(btn => {
            btn.classList.remove('copied');
            if (btn.dataset.origLabel) btn.textContent = btn.dataset.origLabel;
        });
    }, 3000);
}

/**
 * Renders the 3-step AI guide, one-click Copy button, free AI tool links,
 * and visible system-prompt box.
 */
export function createPromptFlowSection({
    guideTitle = 'Sådan bruger du øvelsen med en gratis AI-assistent',
    stepsHtml = [
        'Klik på <strong>Kopiér AI-instruktion</strong> herunder.',
        'Åbn dit foretrukne gratis AI-værktøj (f.eks. <strong>Google Gemini</strong> eller <strong>ChatGPT</strong>).',
        'Indsæt hele instruktionen i chatten, skriv <strong>"Hej"</strong>, og følg vejledningen.'
    ],
    promptLabel = 'System-prompt (kan læses og kopieres med ét klik)',
    promptText,
    idPrefix = 'ai-prompt'
}) {
    injectPromptFlowStyles();

    const wrap = document.createElement('div');
    wrap.className = 'ai-flow-wrap';

    const guideCard = document.createElement('div');
    guideCard.className = 'sh-guide-card';
    guideCard.innerHTML = `
        <h3 class="sh-guide-title">${guideTitle}</h3>
        <ol class="sh-steps">
            ${stepsHtml.map(s => `<li>${s}</li>`).join('')}
        </ol>
    `;

    const actionsBar = document.createElement('div');
    actionsBar.className = 'sh-actions-bar';

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.id = `${idPrefix}-copy-btn`;
    copyBtn.className = 'sh-copy-btn';
    copyBtn.textContent = '📋 Kopiér AI-instruktion';

    const geminiLink = document.createElement('a');
    geminiLink.href = 'https://gemini.google.com/app';
    geminiLink.target = '_blank';
    geminiLink.rel = 'noopener noreferrer';
    geminiLink.className = 'sh-ai-link-btn';
    geminiLink.textContent = 'Åbn Google Gemini ↗';

    const chatgptLink = document.createElement('a');
    chatgptLink.href = 'https://chatgpt.com/';
    chatgptLink.target = '_blank';
    chatgptLink.rel = 'noopener noreferrer';
    chatgptLink.className = 'sh-ai-link-btn';
    chatgptLink.textContent = 'Åbn ChatGPT ↗';

    actionsBar.appendChild(copyBtn);
    actionsBar.appendChild(geminiLink);
    actionsBar.appendChild(chatgptLink);

    const promptBox = document.createElement('div');
    promptBox.className = 'sh-prompt-box';

    const promptHeader = document.createElement('div');
    promptHeader.className = 'sh-prompt-header';

    const labelEl = document.createElement('span');
    labelEl.className = 'sh-prompt-label';
    labelEl.textContent = promptLabel;

    const miniCopyBtn = document.createElement('button');
    miniCopyBtn.type = 'button';
    miniCopyBtn.className = 'sh-mini-copy-btn';
    miniCopyBtn.textContent = 'Kopiér prompt';

    promptHeader.appendChild(labelEl);
    promptHeader.appendChild(miniCopyBtn);

    const promptPre = document.createElement('pre');
    promptPre.className = 'sh-prompt-pre';
    promptPre.textContent = promptText;

    promptBox.appendChild(promptHeader);
    promptBox.appendChild(promptPre);

    const buttons = [copyBtn, miniCopyBtn];
    copyBtn.onclick = () => copyPromptText(promptText, buttons);
    miniCopyBtn.onclick = () => copyPromptText(promptText, buttons);

    wrap.appendChild(guideCard);
    wrap.appendChild(actionsBar);
    wrap.appendChild(promptBox);

    return wrap;
}
