// ============================================================================
// arbejdeMonoIcons.js
// Monokrome SVG-ikoner + emoji- & AI-clutter-oprydning til "Mit hverdagsliv: Arbejde"
// (Hub + På bilværkstedet + Som køkkenassistent).
// ============================================================================

const S = (d, size = 15) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; display:inline-block; flex-shrink:0;" aria-hidden="true">${d}</svg>`;

export const ARBEJDE_ICONS = {
    briefcase: S(`<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>`),
    wrench: S(`<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/>`),
    utensils: S(`<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>`),
    image: S(`<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>`),
    search: S(`<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`),
    shuffle: S(`<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21 21"/><line x1="4" y1="4" x2="9" y2="9"/>`),
    book: S(`<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`),
    pen: S(`<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>`),
    message: S(`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`),
    mic: S(`<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>`),
    volume: S(`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>`),
    check: S(`<polyline points="20 6 9 17 4 12"/>`),
    cross: S(`<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`),
    refresh: S(`<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>`),
    arrowRight: S(`<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`, 14),
    stethoscope: S(`<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>`),
    phone: S(`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`),
    pill: S(`<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>`),
    download: S(`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`),
    fileText: S(`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>`),
    mapPin: S(`<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`),
    award: S(`<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>`),
    lightbulb: S(`<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>`)
};

export function monoIconSvg(name, size = 24) {
    const raw = ARBEJDE_ICONS[name] || '';
    return raw.replace(/width="\d+"/, `width="${size}"`).replace(/height="\d+"/, `height="${size}"`);
}

// Matcher alle farvede Unicode-emojis, ZWJ-sekvenser og variation selectors
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]+/gu;

export function stripArbejdeEmojis(str) {
    if (!str || typeof str !== 'string') return '';
    return str
        .replace(EMOJI_RE, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

const KEY_EMOJI_TO_SVG = [
    [/🔊|🔉|🔈/gu, ARBEJDE_ICONS.volume],
    [/🎙️?|🎤/gu, ARBEJDE_ICONS.mic],
    [/🔄|🔁/gu, ARBEJDE_ICONS.refresh],
    [/✅|✓/gu, ARBEJDE_ICONS.check],
    [/❌/gu, ARBEJDE_ICONS.cross],
    [/💬/gu, ARBEJDE_ICONS.message],
    [/📥/gu, ARBEJDE_ICONS.download],
    [/📄/gu, ARBEJDE_ICONS.fileText],
    [/📍/gu, ARBEJDE_ICONS.mapPin],
    [/🏆/gu, ARBEJDE_ICONS.award],
    [/💡/gu, ARBEJDE_ICONS.lightbulb],
    [/➔/gu, ARBEJDE_ICONS.arrowRight]
];

function sanitizeNodeTree(rootEl) {
    if (!rootEl) return;
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null);
    const toUpdate = [];
    let n;
    while ((n = walker.nextNode())) {
        if (!n.nodeValue) continue;
        const parentTag = n.parentElement?.tagName;
        if (parentTag === 'STYLE' || parentTag === 'SCRIPT' || parentTag === 'TEXTAREA') continue;
        if (EMOJI_RE.test(n.nodeValue)) {
            EMOJI_RE.lastIndex = 0;
            toUpdate.push(n);
        }
    }

    toUpdate.forEach(textNode => {
        const raw = textNode.nodeValue;
        // Hvis noden indeholder en af de 5 funktionelle knap-emojis, erstat med monokrom SVG
        let matchedSvg = null;
        let matchedAtEnd = false;
        let replaced = raw;
        for (const [re, svg] of KEY_EMOJI_TO_SVG) {
            if (re.test(replaced)) {
                re.lastIndex = 0;
                const trimmedRaw = replaced.trim();
                const match = trimmedRaw.match(re);
                if (match && trimmedRaw.endsWith(match[match.length - 1]) && !trimmedRaw.startsWith(match[0])) {
                    matchedAtEnd = true;
                }
                matchedSvg = svg;
                replaced = replaced.replace(re, '').trim();
                break;
            }
        }
        const cleaned = stripArbejdeEmojis(replaced);
        if (matchedSvg && textNode.parentNode) {
            const frag = document.createDocumentFragment();
            const span = document.createElement('span');
            span.innerHTML = matchedSvg;
            const svgEl = span.firstChild;
            if (matchedAtEnd && cleaned) {
                frag.appendChild(document.createTextNode(cleaned + ' '));
                frag.appendChild(svgEl);
            } else {
                frag.appendChild(svgEl);
                if (cleaned) {
                    frag.appendChild(document.createTextNode(' ' + cleaned));
                }
            }
            textNode.parentNode.replaceChild(frag, textNode);
        } else {
            textNode.nodeValue = cleaned;
        }
    });
}

/**
 * Holder en Arbejde-flade 100 % fri for farvede emojis og erstatter centrale
 * funktions-emojis med monokrome SVG-ikoner — også efter dynamiske re-renders.
 */
export function attachArbejdeEmojiCleaner(viewContainer) {
    if (!viewContainer) return;
    let rafId = 0;
    const run = () => {
        rafId = 0;
        sanitizeNodeTree(viewContainer);
    };
    const schedule = () => {
        if (!rafId) rafId = requestAnimationFrame(run);
    };

    sanitizeNodeTree(viewContainer);
    if (typeof MutationObserver !== 'undefined') {
        const obs = new MutationObserver(schedule);
        obs.observe(viewContainer, { childList: true, subtree: true, characterData: true });
    }
}
