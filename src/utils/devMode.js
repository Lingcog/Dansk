/**
 * Dev Mode Helper for H.C. Andersen Fairy Tales
 * Controls visibility during development and testing.
 * - Locked by default both on GitHub Pages and local development
 * - Allows secret unlock on mobile/remote devices via ?dev=true or 5 taps on the lock icon
 */

export function isHCDevMode(extraData = {}) {
    if (typeof window === 'undefined') return false;

    // 1. Query param or hash flag (e.g. ?dev=true or ?dev=1 or &dev=true)
    const href = window.location.href;
    if (href.includes('dev=true') || href.includes('dev=1') || href.includes('dev=antigravity')) {
        return true;
    }

    // 2. Extra data from routing
    if (extraData?.dev === 'true' || extraData?.dev === '1' || extraData?.dev === true) {
        return true;
    }

    // 3. Persistent unlock in localStorage (if explicitly activated by developer)
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

