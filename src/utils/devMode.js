/**
 * Dev Mode Helper for H.C. Andersen Fairy Tales
 * Strictly localhost-only: visible on localhost / 127.0.0.1, locked ("Kommer snart") on GitHub Pages.
 */

export function isHCDevMode() {
    if (typeof window === 'undefined') return false;

    const host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host.endsWith('.local');
}

export function setHCDevMode() {
    // No-op: H.C. Andersen is strictly localhost-only until explicitly released.
}

