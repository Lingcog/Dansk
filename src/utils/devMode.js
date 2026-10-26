/**
 * Dev Mode Helper for H.C. Andersen Fairy Tales
 * Controls visibility during development and testing.
 * - Always open on localhost / 127.0.0.1 (Antigravity & local dev)
 * - Publicly displays 'Kommer snart' on GitHub Pages
 * - Allows secret unlock on mobile/remote devices via ?dev=true or 5 taps on the icon
 */

export function isHCDevMode(extraData = {}) {
    if (typeof window === 'undefined') return true;

    // 1. Always open on localhost / 127.0.0.1 (Antigravity local dev)
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host === '') {
        return true;
    }

    // 2. Query param or hash flag (e.g. ?dev=true or ?dev=1 or &dev=true)
    const href = window.location.href;
    if (href.includes('dev=true') || href.includes('dev=1') || href.includes('dev=antigravity')) {
        try { localStorage.setItem('hc_andersen_dev_unlocked', 'true'); } catch (e) {}
        return true;
    }

    // 3. Extra data from routing
    if (extraData?.dev === 'true' || extraData?.dev === '1' || extraData?.dev === true) {
        try { localStorage.setItem('hc_andersen_dev_unlocked', 'true'); } catch (e) {}
        return true;
    }

    // 4. Persistent unlock in localStorage (e.g. unlocked on mobile)
    try {
        if (localStorage.getItem('hc_andersen_dev_unlocked') === 'true') {
            return true;
        }
    } catch (e) {}

    return false;
}

export function setHCDevMode(unlocked = true) {
    try {
        if (unlocked) {
            localStorage.setItem('hc_andersen_dev_unlocked', 'true');
        } else {
            localStorage.removeItem('hc_andersen_dev_unlocked');
        }
    } catch (e) {}
}
