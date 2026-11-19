/**
 * Minimal, informationsbærende monokrome SVG-ikoner til Samtaletræning-fladerne.
 * Bruger stroke="currentColor" så de automatisk arver kontekstfarven uden farvede emojis.
 */

function wrapSvg(paths, size = 15, extraClass = '') {
    return `<svg class="st-ico ${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline-block;vertical-align:-0.16em;flex-shrink:0;">${paths}</svg>`;
}

export const samtaleIcons = {
    // Taler (mikrofon)
    taler: (size = 14) => wrapSvg(
        '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>',
        size
    ),
    // Lytter (øre)
    lytter: (size = 14) => wrapSvg(
        '<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/>',
        size
    ),
    // Begge: Taler & Lytter (udveksling / to-vejs pile)
    begge: (size = 14) => wrapSvg(
        '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
        size
    ),
    // Lydafspilning (højttaler)
    audio: (size = 14) => wrapSvg(
        '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
        size
    ),
    // Video / klip-afspilning
    play: (size = 13) => wrapSvg(
        '<polygon points="6 4 20 12 6 20 6 4"/>',
        size
    ),
    // Høflighed — 4 sociale funktioner (monokrome SVG'er)
    kontakt: (size = 14) => wrapSvg(
        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
        size
    ),
    bloedgoer: (size = 14) => wrapSvg(
        '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
        size
    ),
    tak: (size = 14) => wrapSvg(
        '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
        size
    ),
    afslag: (size = 14) => wrapSvg(
        '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        size
    )
};

export function samtaleRoleIcon(role, size = 14) {
    if (role === 'taler') return samtaleIcons.taler(size);
    if (role === 'lytter') return samtaleIcons.lytter(size);
    return samtaleIcons.begge(size);
}

export function hoeflighedPillarIcon(pillar, size = 14) {
    if (pillar === 'kontakt') return samtaleIcons.kontakt(size);
    if (pillar === 'bloedgoer') return samtaleIcons.bloedgoer(size);
    if (pillar === 'tak') return samtaleIcons.tak(size);
    return samtaleIcons.afslag(size);
}
