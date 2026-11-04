/**
 * DesignSystemToggle.js
 * Multi-nuance farve-toggle til localhost
 * Giver mulighed for realtime-inspektion og sammenligning på localhost af:
 * - Kombination: Vinrød bund (#4A040B) + Meget mørkegrønne kort (erstatter den grå i klassisk)
 * - Varianter af kombinationen (Skovgrøn, Smaragd, Botanisk)
 * - Ren mørkegrøn flade
 * - Ren vinrød (#380207 benchmark)
 * - Klassisk gråflade
 */

const STORAGE_KEY = 'ds_preview_mode';
export const ADJ_STORAGE_KEY = 'adj_color_nuance';
export const VERB_STORAGE_KEY = 'verb_color_nuance';
export const ADV_STORAGE_KEY = 'adv_color_nuance';
export const KONJ_STORAGE_KEY = 'konj_color_nuance';

export const VERB_PALETTES = {
    'verb-granat': {
        id: 'verb-granat',
        name: 'Dyb Granatrød',
        label: '🍷 Dyb Granat',
        icon: '🍷',
        badge: 'Klassisk & Skarp (Anbefalet)',
        desc: 'Mørk granatflade (#24070B) på vinrød bund (#4A040B) med lysende karminrød verbum-accent (#FF2A55)',
        accentColor: '#FF2A55',
        vars: {
            '--verb-bg': '#4A040B',
            '--verb-bg-glow': '#6B0F1A',
            '--verb-surface': '#24070B',
            '--verb-surface-hover': '#330C12',
            '--verb-surface-input': '#120205',
            '--verb-border': '#5C121B',
            '--verb-border-focus': '#FF3355',
            '--verb-primary': '#FF2A55',
            '--verb-primary-hover': '#E11D48',
            '--verb-glow': 'rgba(255, 42, 85, 0.45)',
            '--verb-text': '#FFFFFF',
            '--verb-text-muted': '#FECDD3',
            '--verb-text-subtle': '#FDA4AF'
        }
    },
    'verb-kirsebaer': {
        id: 'verb-kirsebaer',
        name: 'Sort-Kirsebær',
        label: '🍒 Sort-Kirsebær',
        icon: '🍒',
        badge: 'Dyb Varm Kontrast',
        desc: 'Sort-kirsebærflade (#2B080D) med skarlagenrød/cerise verbum-accent (#F43F5E)',
        accentColor: '#F43F5E',
        vars: {
            '--verb-bg': '#42040B',
            '--verb-bg-glow': '#610813',
            '--verb-surface': '#2B080D',
            '--verb-surface-hover': '#3D0E15',
            '--verb-surface-input': '#150306',
            '--verb-border': '#681822',
            '--verb-border-focus': '#FB7185',
            '--verb-primary': '#F43F5E',
            '--verb-primary-hover': '#E11D48',
            '--verb-glow': 'rgba(244, 63, 94, 0.45)',
            '--verb-text': '#FFFFFF',
            '--verb-text-muted': '#FFE4E6',
            '--verb-text-subtle': '#FECDD3'
        }
    },
    'verb-rubin-koks': {
        id: 'verb-rubin-koks',
        name: 'Rubin-Koksgrå',
        label: '💎 Rubin-Koksgrå',
        icon: '💎',
        badge: 'Maksimal Ordpusle-kontrast',
        desc: 'Ultra-mørk koksgrå modul (#1E1014) – det røde verbum (#FF375F) lyser helt solitært op uden rød-i-rødt',
        accentColor: '#FF375F',
        vars: {
            '--verb-bg': '#3A0308',
            '--verb-bg-glow': '#5A0610',
            '--verb-surface': '#1E1014',
            '--verb-surface-hover': '#2A171D',
            '--verb-surface-input': '#10070A',
            '--verb-border': '#4E2028',
            '--verb-border-focus': '#FF4D6D',
            '--verb-primary': '#FF375F',
            '--verb-primary-hover': '#E61E47',
            '--verb-glow': 'rgba(255, 55, 95, 0.5)',
            '--verb-text': '#FFFFFF',
            '--verb-text-muted': '#E2E8F0',
            '--verb-text-subtle': '#CBD5E1'
        }
    },
    'verb-briket': {
        id: 'verb-briket',
        name: 'Brændt Briket',
        label: '🧱 Brændt Briket',
        icon: '🧱',
        badge: 'Klassisk Didaktisk Rød',
        desc: 'Mørk briketbund (#280D10) med ren dansk grammatik-rød (#EF4444)',
        accentColor: '#EF4444',
        vars: {
            '--verb-bg': '#45050C',
            '--verb-bg-glow': '#660914',
            '--verb-surface': '#280D10',
            '--verb-surface-hover': '#381419',
            '--verb-surface-input': '#150608',
            '--verb-border': '#6B1F26',
            '--verb-border-focus': '#F87171',
            '--verb-primary': '#EF4444',
            '--verb-primary-hover': '#DC2626',
            '--verb-glow': 'rgba(239, 68, 68, 0.45)',
            '--verb-text': '#FFFFFF',
            '--verb-text-muted': '#FEE2E2',
            '--verb-text-subtle': '#FECACA'
        }
    }
};

export function isVerbRoute() {
    if (typeof window === 'undefined') return false;
    const h = window.location.hash.toLowerCase();
    return h.includes('verb') && !h.includes('adverb');
}

export function getActiveVerbNuance() {
    if (typeof window === 'undefined') return 'verb-briket';
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('verb_nuance');
    if (param && VERB_PALETTES[param]) {
        return param;
    }
    const stored = localStorage.getItem(VERB_STORAGE_KEY);
    if (stored && VERB_PALETTES[stored]) {
        return stored;
    }
    return 'verb-briket';
}

export function applyVerbNuance(nuanceKey) {
    const palette = VERB_PALETTES[nuanceKey] || VERB_PALETTES['verb-briket'];

    document.documentElement.removeAttribute('data-adj-nuance');
    document.body.removeAttribute('data-adj-nuance');
    document.documentElement.removeAttribute('data-adv-nuance');
    document.body.removeAttribute('data-adv-nuance');

    document.documentElement.setAttribute('data-verb-nuance', palette.id);
    document.body.setAttribute('data-verb-nuance', palette.id);

    if (palette.vars) {
        Object.entries(palette.vars).forEach(([prop, val]) => {
            document.documentElement.style.setProperty(prop, val);
            document.body.style.setProperty(prop, val);
        });
    }
    localStorage.setItem(VERB_STORAGE_KEY, palette.id);

    // Opdater synkroniserede in-page knapper
    document.querySelectorAll('.verb-nuance-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-nuance') === palette.id);
    });

    // Opdater flydende dock
    const container = document.getElementById('ds-toggle-container');
    if (container) {
        container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-mode') === palette.id);
        });
        const indicator = container.querySelector('.ds-toggle-current-dot');
        if (indicator) {
            indicator.style.backgroundColor = palette.accentColor;
            indicator.style.boxShadow = `0 0 10px ${palette.accentColor}`;
        }
    }
}

export const ADJ_PALETTES = {
    'adj-rav': {
        id: 'adj-rav',
        name: 'Mørk Rav',
        label: '🍯 Mørk Rav',
        icon: '🍯',
        badge: 'Varm & Dyb Rav (Anbefalet)',
        desc: 'Dyb ravbrun modulflade (#341808) på vinrød bund (#4A040B) med varm rav-orange accent (#ea580c)',
        accentColor: '#ea580c',
        vars: {
            '--adj-bg': '#4A040B',
            '--adj-bg-glow': '#6B0F1A',
            '--adj-surface': '#341808',
            '--adj-surface-hover': '#48230D',
            '--adj-surface-input': '#1C0B03',
            '--adj-border': '#6E3311',
            '--adj-border-focus': '#fb923c',
            '--adj-primary': '#ea580c',
            '--adj-primary-hover': '#f97316',
            '--adj-text': '#FFFFFF',
            '--adj-text-muted': '#fed7aa',
            '--adj-text-subtle': '#fdba74'
        }
    },
    'adj-terrakotta': {
        id: 'adj-terrakotta',
        name: 'Brændt Terrakotta',
        label: '🧱 Brændt Terrakotta',
        icon: '🧱',
        badge: 'Rustik & Dæmpet Tegl',
        desc: 'Brændt ler/tegl (#2F160E) på vinrød bund (#4A040B) med terrakotta-orange (#c2410c)',
        accentColor: '#c2410c',
        vars: {
            '--adj-bg': '#4A040B',
            '--adj-bg-glow': '#6B0F1A',
            '--adj-surface': '#2F160E',
            '--adj-surface-hover': '#442014',
            '--adj-surface-input': '#1A0B06',
            '--adj-border': '#662D1A',
            '--adj-border-focus': '#f97316',
            '--adj-primary': '#c2410c',
            '--adj-primary-hover': '#ea580c',
            '--adj-text': '#FFFFFF',
            '--adj-text-muted': '#ffedd5',
            '--adj-text-subtle': '#fed7aa'
        }
    },
    'adj-kobber': {
        id: 'adj-kobber',
        name: 'Mørk Kobber & Bronze',
        label: '🥉 Mørk Kobber',
        icon: '🥉',
        badge: 'Antik & Gylden Metallegering',
        desc: 'Mørk patineret kobber/bronze (#281608) på vinrød bund (#4A040B) med gylden rav-accent (#d97706)',
        accentColor: '#d97706',
        vars: {
            '--adj-bg': '#4A040B',
            '--adj-bg-glow': '#6B0F1A',
            '--adj-surface': '#281608',
            '--adj-surface-hover': '#3C220E',
            '--adj-surface-input': '#160A03',
            '--adj-border': '#5C2F0E',
            '--adj-border-focus': '#fbbf24',
            '--adj-primary': '#d97706',
            '--adj-primary-hover': '#f59e0b',
            '--adj-text': '#FFFFFF',
            '--adj-text-muted': '#fde68a',
            '--adj-text-subtle': '#fcd34d'
        }
    },
    'adj-espresso-orange': {
        id: 'adj-espresso-orange',
        name: 'Ristet Espresso-Orange',
        label: '🌰 Ristet Orange',
        icon: '🌰',
        badge: 'Hel-Mørk Espressobund',
        desc: 'Ultra-mørk espressobund (#1C0B04) + mørk ristet tangerin (#331606) og klar orange accent (#f97316)',
        accentColor: '#f97316',
        vars: {
            '--adj-bg': '#1C0B04',
            '--adj-bg-glow': '#381507',
            '--adj-surface': '#331606',
            '--adj-surface-hover': '#4A200B',
            '--adj-surface-input': '#140701',
            '--adj-border': '#6B300F',
            '--adj-border-focus': '#fdba74',
            '--adj-primary': '#f97316',
            '--adj-primary-hover': '#fb923c',
            '--adj-text': '#FFFFFF',
            '--adj-text-muted': '#fed7aa',
            '--adj-text-subtle': '#fbd38d'
        }
    }
};

export function isAdjRoute() {
    if (typeof window === 'undefined') return false;
    const h = window.location.hash.toLowerCase();
    return (h.includes('adjektiv') || h.includes('adjective')) && !h.includes('adverb');
}

export function getActiveAdjNuance() {
    if (typeof window === 'undefined') return 'adj-rav';
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('adj_nuance');
    if (param && ADJ_PALETTES[param]) {
        return param;
    }
    const stored = localStorage.getItem(ADJ_STORAGE_KEY);
    if (stored && ADJ_PALETTES[stored]) {
        return stored;
    }
    return 'adj-rav';
}

export function applyAdjNuance(nuanceKey) {
    const palette = ADJ_PALETTES[nuanceKey] || ADJ_PALETTES['adj-rav'];

    document.documentElement.removeAttribute('data-verb-nuance');
    document.body.removeAttribute('data-verb-nuance');
    document.documentElement.removeAttribute('data-adv-nuance');
    document.body.removeAttribute('data-adv-nuance');

    document.documentElement.setAttribute('data-adj-nuance', palette.id);
    document.body.setAttribute('data-adj-nuance', palette.id);

    if (palette.vars) {
        Object.entries(palette.vars).forEach(([prop, val]) => {
            document.documentElement.style.setProperty(prop, val);
            document.body.style.setProperty(prop, val);
        });
    }
    localStorage.setItem(ADJ_STORAGE_KEY, palette.id);

    // Opdater synkroniserede in-page knapper
    document.querySelectorAll('.adj-nuance-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-nuance') === palette.id);
    });

    // Opdater flydende dock
    const container = document.getElementById('ds-toggle-container');
    if (container) {
        container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-mode') === palette.id);
        });
        const indicator = container.querySelector('.ds-toggle-current-dot');
        if (indicator) {
            indicator.style.backgroundColor = palette.accentColor;
            indicator.style.boxShadow = `0 0 10px ${palette.accentColor}`;
        }
    }
}

export const ADV_PALETTES = {
    'adv-safir': {
        id: 'adv-safir',
        name: 'Dyb Safirblå',
        label: '💎 Dyb Safirblå',
        icon: '💎',
        badge: 'Klassisk & Skarp (Anbefalet)',
        desc: 'Mørk safirblå flade (#0A192F) på vinrød bund (#4A040B) med ren kongeblå adverbium-accent (#3B82F6)',
        accentColor: '#3B82F6',
        vars: {
            '--adv-bg': '#4A040B',
            '--adv-bg-glow': '#6B0F1A',
            '--adv-surface': '#0A192F',
            '--adv-surface-hover': '#112240',
            '--adv-surface-input': '#050E1A',
            '--adv-border': '#1E3A66',
            '--adv-border-focus': '#93C5FD',
            '--adv-primary': '#3B82F6',
            '--adv-primary-hover': '#1D4ED8',
            '--adv-glow': 'rgba(59, 130, 246, 0.7)',
            '--adv-text': '#FFFFFF',
            '--adv-text-muted': '#BFDBFE',
            '--adv-text-subtle': '#93C5FD'
        }
    },
    'adv-petrol': {
        id: 'adv-petrol',
        name: 'Preussisk Havblå',
        label: '🌊 Preussisk Havblå',
        icon: '🌊',
        badge: 'Nordisk Petrol & Cyan',
        desc: 'Dyb petrol/havblå flade (#061D28) på vinrød bund (#4A040B) med lysende azurblå accent (#0EA5E9)',
        accentColor: '#0EA5E9',
        vars: {
            '--adv-bg': '#4A040B',
            '--adv-bg-glow': '#6B0F1A',
            '--adv-surface': '#061D28',
            '--adv-surface-hover': '#0C2E3F',
            '--adv-surface-input': '#031017',
            '--adv-border': '#134B63',
            '--adv-border-focus': '#7DD3FC',
            '--adv-primary': '#0EA5E9',
            '--adv-primary-hover': '#0284C7',
            '--adv-glow': 'rgba(14, 165, 233, 0.7)',
            '--adv-text': '#FFFFFF',
            '--adv-text-muted': '#BAE6FD',
            '--adv-text-subtle': '#7DD3FC'
        }
    },
    'adv-indigo': {
        id: 'adv-indigo',
        name: 'Dyb Indigo-Nat',
        label: '🌌 Dyb Indigo-Nat',
        icon: '🌌',
        badge: 'Fløjlsblød Nattehimmel',
        desc: 'Dyb indigoblå natteflade (#0F1426) på vinrød bund (#4A040B) med elektrisk kornblomst-accent (#6366F1)',
        accentColor: '#6366F1',
        vars: {
            '--adv-bg': '#4A040B',
            '--adv-bg-glow': '#6B0F1A',
            '--adv-surface': '#0F1426',
            '--adv-surface-hover': '#1A213D',
            '--adv-surface-input': '#080B14',
            '--adv-border': '#252E54',
            '--adv-border-focus': '#A5B4FC',
            '--adv-primary': '#6366F1',
            '--adv-primary-hover': '#4F46E5',
            '--adv-glow': 'rgba(99, 102, 241, 0.7)',
            '--adv-text': '#FFFFFF',
            '--adv-text-muted': '#C7D2FE',
            '--adv-text-subtle': '#A5B4FC'
        }
    },
    'adv-skifer': {
        id: 'adv-skifer',
        name: 'Arktisk Skiferblå',
        label: '🏔️ Arktisk Skiferblå',
        icon: '🏔️',
        badge: 'Kølig Koks & Isblå',
        desc: 'Ultra-mørk kold skiferblå (#0D1620) på vinrød bund (#4A040B) med krystalklar isblå accent (#38BDF8)',
        accentColor: '#38BDF8',
        vars: {
            '--adv-bg': '#4A040B',
            '--adv-bg-glow': '#6B0F1A',
            '--adv-surface': '#0D1620',
            '--adv-surface-hover': '#162332',
            '--adv-surface-input': '#060B10',
            '--adv-border': '#1E2F40',
            '--adv-border-focus': '#BAE6FD',
            '--adv-primary': '#38BDF8',
            '--adv-primary-hover': '#0EA5E9',
            '--adv-glow': 'rgba(56, 189, 248, 0.7)',
            '--adv-text': '#FFFFFF',
            '--adv-text-muted': '#E0F2FE',
            '--adv-text-subtle': '#BAE6FD'
        }
    }
};

export function isAdvRoute() {
    if (typeof window === 'undefined') return false;
    const h = window.location.hash.toLowerCase();
    return h.includes('adverbi') || h.includes('adverb');
}

export function getActiveAdvNuance() {
    if (typeof window === 'undefined') return 'adv-safir';
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('adv_nuance');
    if (param && ADV_PALETTES[param]) {
        return param;
    }
    const stored = localStorage.getItem(ADV_STORAGE_KEY);
    if (stored && ADV_PALETTES[stored]) {
        return stored;
    }
    return 'adv-safir';
}

export function applyAdvNuance(nuanceKey) {
    const palette = ADV_PALETTES[nuanceKey] || ADV_PALETTES['adv-safir'];

    document.documentElement.removeAttribute('data-verb-nuance');
    document.body.removeAttribute('data-verb-nuance');
    document.documentElement.removeAttribute('data-adj-nuance');
    document.body.removeAttribute('data-adj-nuance');

    document.documentElement.setAttribute('data-adv-nuance', palette.id);
    document.body.setAttribute('data-adv-nuance', palette.id);

    if (palette.vars) {
        Object.entries(palette.vars).forEach(([prop, val]) => {
            document.documentElement.style.setProperty(prop, val);
            document.body.style.setProperty(prop, val);
        });
    }
    localStorage.setItem(ADV_STORAGE_KEY, palette.id);

    // Opdater synkroniserede in-page knapper
    document.querySelectorAll('.adv-nuance-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-nuance') === palette.id);
    });

    // Opdater flydende dock
    const container = document.getElementById('ds-toggle-container');
    if (container) {
        container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-mode') === palette.id);
        });
        const indicator = container.querySelector('.ds-toggle-current-dot');
        if (indicator) {
            indicator.style.backgroundColor = palette.accentColor;
            indicator.style.boxShadow = `0 0 10px ${palette.accentColor}`;
        }
    }
}

export const KONJ_PALETTES = {
    'konj-ametyst': {
        id: 'konj-ametyst',
        name: 'Dyb Ametyst-Nat',
        label: '🔮 Dyb Ametyst',
        icon: '🔮',
        badge: 'Klassisk & Kongelig',
        desc: 'Dyb mørkelilla ametystflade (#1E0E2E) på vinrød bund (#4A040B) med lysende ametyst-accent (#A855F7)',
        accentColor: '#A855F7',
        vars: {
            '--konj-bg': '#4A040B',
            '--konj-bg-glow': '#6B0F1A',
            '--konj-surface': '#1E0E2E',
            '--konj-surface-hover': '#2D1544',
            '--konj-surface-input': '#12071D',
            '--konj-border': '#4C2373',
            '--konj-border-focus': '#C084FC',
            '--konj-primary': '#A855F7',
            '--konj-primary-hover': '#9333EA',
            '--konj-glow': 'rgba(168, 85, 247, 0.6)',
            '--konj-text': '#FFFFFF',
            '--konj-text-muted': '#E9D5FF',
            '--konj-text-subtle': '#C084FC'
        }
    },
    'konj-violet': {
        id: 'konj-violet',
        name: 'Skifer-Violet Midnat',
        label: '🌌 Skifer-Violet',
        icon: '🌌',
        badge: 'Valgt nuance (Skifer-Violet)',
        desc: 'Mørk indigo-violet flade (#160C28) på vinrød bund (#4A040B) med elektrisk iris-violet accent (#8B5CF6)',
        accentColor: '#8B5CF6',
        vars: {
            '--konj-bg': '#4A040B',
            '--konj-bg-glow': '#6B0F1A',
            '--konj-surface': '#160C28',
            '--konj-surface-hover': '#22123D',
            '--konj-surface-input': '#0D061A',
            '--konj-border': '#3B1E6D',
            '--konj-border-focus': '#A78BFA',
            '--konj-primary': '#8B5CF6',
            '--konj-primary-hover': '#7C3AED',
            '--konj-glow': 'rgba(139, 92, 246, 0.6)',
            '--konj-text': '#FFFFFF',
            '--konj-text-muted': '#DDD6FE',
            '--konj-text-subtle': '#A78BFA'
        }
    },
    'konj-bromaer': {
        id: 'konj-bromaer',
        name: 'Mørk Brombær & Orkidé',
        label: '🍇 Mørk Brombær',
        icon: '🍇',
        badge: 'Varm & Fyldig Harmoni',
        desc: 'Mørk fløjlsbrombær flade (#240B2B) på vinrød bund (#4A040B) med neon-orkidé accent (#C026D3)',
        accentColor: '#C026D3',
        vars: {
            '--konj-bg': '#4A040B',
            '--konj-bg-glow': '#6B0F1A',
            '--konj-surface': '#240B2B',
            '--konj-surface-hover': '#35113F',
            '--konj-surface-input': '#16051B',
            '--konj-border': '#581C68',
            '--konj-border-focus': '#E879F9',
            '--konj-primary': '#C026D3',
            '--konj-primary-hover': '#A21CAF',
            '--konj-glow': 'rgba(192, 38, 211, 0.6)',
            '--konj-text': '#FFFFFF',
            '--konj-text-muted': '#F5D0FE',
            '--konj-text-subtle': '#E879F9'
        }
    },
    'konj-obsidian': {
        id: 'konj-obsidian',
        name: 'Obsidian-Aubergine',
        label: '🪨 Obsidian-Aubergine',
        icon: '🪨',
        badge: 'Maksimal Fokus & Ro',
        desc: 'Ultra-mørk obsidian-koksgrå flade (#18101E) på vinrød bund (#4A040B) med purpur aubergine-accent (#9333EA)',
        accentColor: '#9333EA',
        vars: {
            '--konj-bg': '#4A040B',
            '--konj-bg-glow': '#6B0F1A',
            '--konj-surface': '#18101E',
            '--konj-surface-hover': '#261A30',
            '--konj-surface-input': '#0E0912',
            '--konj-border': '#432D54',
            '--konj-border-focus': '#D8B4FE',
            '--konj-primary': '#9333EA',
            '--konj-primary-hover': '#7E22CE',
            '--konj-glow': 'rgba(147, 51, 234, 0.6)',
            '--konj-text': '#FFFFFF',
            '--konj-text-muted': '#F3E8FF',
            '--konj-text-subtle': '#D8B4FE'
        }
    }
};

export function isKonjRoute() {
    if (typeof window === 'undefined') return false;
    const h = window.location.hash.toLowerCase();
    return h.includes('konjunktion') || h.includes('conjunction');
}

export function getActiveKonjNuance() {
    if (typeof window === 'undefined') return 'konj-violet';
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('konj_nuance');
    if (param && KONJ_PALETTES[param]) {
        return param;
    }
    const stored = localStorage.getItem(KONJ_STORAGE_KEY);
    if (stored && KONJ_PALETTES[stored]) {
        return stored;
    }
    return 'konj-violet';
}

export function applyKonjNuance(nuanceKey) {
    const palette = KONJ_PALETTES[nuanceKey] || KONJ_PALETTES['konj-violet'];

    document.documentElement.removeAttribute('data-verb-nuance');
    document.body.removeAttribute('data-verb-nuance');
    document.documentElement.removeAttribute('data-adj-nuance');
    document.body.removeAttribute('data-adj-nuance');
    document.documentElement.removeAttribute('data-adv-nuance');
    document.body.removeAttribute('data-adv-nuance');

    document.documentElement.setAttribute('data-konj-nuance', palette.id);
    document.body.setAttribute('data-konj-nuance', palette.id);

    if (palette.vars) {
        Object.entries(palette.vars).forEach(([prop, val]) => {
            document.documentElement.style.setProperty(prop, val);
            document.body.style.setProperty(prop, val);
        });
    }
    localStorage.setItem(KONJ_STORAGE_KEY, palette.id);

    // Opdater synkroniserede in-page knapper
    document.querySelectorAll('.konj-nuance-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-nuance') === palette.id);
    });

    // Opdater flydende dock
    const container = document.getElementById('ds-toggle-container');
    if (container) {
        container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-mode') === palette.id);
        });
        const indicator = container.querySelector('.ds-toggle-current-dot');
        if (indicator) {
            indicator.style.backgroundColor = palette.accentColor;
            indicator.style.boxShadow = `0 0 10px ${palette.accentColor}`;
        }
    }
}


export const COLOR_PALETTES = {
    'combo-vinroed-skov': {
        id: 'combo-vinroed-skov',
        name: 'Vinrød + Skovgrøn',
        label: '🍇🌲 Vinrød + Skovgrøn',
        icon: '🍇🌲',
        badge: 'Kombination (Anbefalet)',
        desc: 'Vinrød bund (#4A040B) + meget mørkegrønne kort (#073518) der erstatter den grå',
        accentColor: '#22c55e',
        vars: {
            '--vp-bg': '#4A040B',
            '--vp-bg-glow': '#6B0F1A',
            '--vp-surface': '#073518',
            '--vp-surface-hover': '#0c4f24',
            '--vp-surface-input': '#02220e',
            '--vp-border': '#136832',
            '--vp-border-focus': '#a7f3d0',
            '--vp-text': '#FFFFFF',
            '--vp-text-muted': '#a7f3d0',
            '--vp-text-subtle': '#6ee7b7',
            '--vp-primary': '#22c55e',
            '--vp-accent': '#22c55e',
        }
    },
    'combo-vinroed-smaragd': {
        id: 'combo-vinroed-smaragd',
        name: 'Vinrød + Smaragd',
        label: '🍇💎 Vinrød + Smaragd',
        icon: '🍇💎',
        badge: 'Kombination Juvel',
        desc: 'Vinrød bund (#4A040B) + dyb smaragdgrønne kort (#043626) der erstatter den grå',
        accentColor: '#14b8a6',
        vars: {
            '--vp-bg': '#4A040B',
            '--vp-bg-glow': '#6B0F1A',
            '--vp-surface': '#043626',
            '--vp-surface-hover': '#08523b',
            '--vp-surface-input': '#022318',
            '--vp-border': '#0c6e52',
            '--vp-border-focus': '#99f6e4',
            '--vp-text': '#FFFFFF',
            '--vp-text-muted': '#99f6e4',
            '--vp-text-subtle': '#5eead4',
            '--vp-primary': '#14b8a6',
            '--vp-accent': '#14b8a6',
        }
    },
    'combo-vinroed-botanisk': {
        id: 'combo-vinroed-botanisk',
        name: 'Vinrød + Botanisk',
        label: '🍇🍃 Vinrød + Botanisk',
        icon: '🍇🍃',
        badge: 'Kombination Varm',
        desc: 'Vinrød bund (#4A040B) + ultra-mørk leksikongrøn (#0a2d13) der erstatter den grå',
        accentColor: '#22c55e',
        vars: {
            '--vp-bg': '#4A040B',
            '--vp-bg-glow': '#6B0F1A',
            '--vp-surface': '#0a2d13',
            '--vp-surface-hover': '#12451f',
            '--vp-surface-input': '#041d0b',
            '--vp-border': '#1d612b',
            '--vp-border-focus': '#bbf7d0',
            '--vp-text': '#FFFFFF',
            '--vp-text-muted': '#bbf7d0',
            '--vp-text-subtle': '#86efac',
            '--vp-primary': '#22c55e',
            '--vp-accent': '#22c55e',
        }
    },
    'groen-skov': {
        id: 'groen-skov',
        name: 'Hel-grøn',
        label: '🌲 Hel-grøn (Skovgrøn)',
        icon: '🌲',
        badge: 'Nordic Pine',
        desc: 'Helgrøn flade i klassisk skovgrøn (#063618 / #08441f)',
        accentColor: '#22c55e',
        vars: {
            '--vp-bg': '#063618',
            '--vp-bg-glow': '#0a5426',
            '--vp-surface': '#08441f',
            '--vp-surface-hover': '#0c5c2a',
            '--vp-surface-input': '#032511',
            '--vp-border': '#136832',
            '--vp-border-focus': '#a7f3d0',
            '--vp-text': '#FFFFFF',
            '--vp-text-muted': '#a7f3d0',
            '--vp-text-subtle': '#6ee7b7',
            '--vp-primary': '#22c55e',
            '--vp-accent': '#22c55e',
        }
    },
    'vinroed': {
        id: 'vinroed',
        name: 'Hel-vinrød',
        label: '🍷 Hel-vinrød (#380207)',
        icon: '🍷',
        badge: 'Ren Vinrød',
        desc: 'Original bordeaux vinrød præcision (#380207 / #4A040B)',
        accentColor: '#FF4D5E',
        vars: {
            '--vp-bg': '#4A040B',
            '--vp-bg-glow': '#6B0F1A',
            '--vp-surface': '#5C0812',
            '--vp-surface-hover': '#73101C',
            '--vp-surface-input': '#380207',
            '--vp-border': '#851825',
            '--vp-border-focus': '#FFC9CD',
            '--vp-text': '#FFFFFF',
            '--vp-text-muted': '#FFC9CD',
            '--vp-text-subtle': '#D49B9F',
            '--vp-primary': '#FF4D5E',
            '--vp-accent': '#FF4D5E',
        }
    },
    'classic': {
        id: 'classic',
        name: 'Klassisk Grå',
        label: '🔘 Klassisk (Original grå)',
        icon: '🔘',
        badge: 'Original Grå',
        desc: 'Hidtidig skifergrå grundflade uden præcisionstema',
        accentColor: '#38bdf8',
        vars: null
    }
};

export function isLocalhost() {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '' || host.endsWith('.local');
}

export function getActiveDesignTheme() {
    // 1. Tjek URL query param ?design=...
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('design');
    if (param && (COLOR_PALETTES[param] || param === 'alpha' || param === 'classic')) {
        return param === 'alpha' ? 'vinroed' : param;
    }

    // 2. Tjek localStorage (hvis gemt 'combo-vinroed-skov' fra tidligere test, nulstil til vinroed)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored !== 'combo-vinroed-skov' && (COLOR_PALETTES[stored] || stored === 'classic')) {
        return stored === 'alpha' ? 'vinroed' : stored;
    }

    // Standard app-tema: 'vinroed' (Forsiden i ren vinrød præcision med monokrome ikoner)
    return 'vinroed';
}

export function applyDesignTheme(mode) {
    const activeKey = (mode === 'alpha') ? 'vinroed' : mode;

    if (!isAdjRoute()) {
        document.documentElement.removeAttribute('data-adj-nuance');
        document.body.removeAttribute('data-adj-nuance');
    }
    if (!isVerbRoute()) {
        document.documentElement.removeAttribute('data-verb-nuance');
        document.body.removeAttribute('data-verb-nuance');
    }
    if (!isAdvRoute()) {
        document.documentElement.removeAttribute('data-adv-nuance');
        document.body.removeAttribute('data-adv-nuance');
    }

    if (!activeKey || activeKey === 'classic') {
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.removeAttribute('data-color-mode');
        document.body.removeAttribute('data-theme');
        document.body.removeAttribute('data-color-mode');

        const allVars = [
            '--vp-bg', '--vp-bg-glow', '--vp-surface', '--vp-surface-hover',
            '--vp-surface-input', '--vp-border', '--vp-border-focus',
            '--vp-text', '--vp-text-muted', '--vp-text-subtle',
            '--vp-primary', '--vp-accent'
        ];
        allVars.forEach(v => document.documentElement.style.removeProperty(v));
        localStorage.setItem(STORAGE_KEY, 'classic');
    } else {
        const palette = COLOR_PALETTES[activeKey] || COLOR_PALETTES['combo-vinroed-skov'];

        document.documentElement.setAttribute('data-theme', 'vinroed-praecision');
        document.documentElement.setAttribute('data-color-mode', activeKey);
        document.body.setAttribute('data-theme', 'vinroed-praecision');
        document.body.setAttribute('data-color-mode', activeKey);

        if (palette.vars) {
            Object.entries(palette.vars).forEach(([prop, val]) => {
                document.documentElement.style.setProperty(prop, val);
            });
        }
        localStorage.setItem(STORAGE_KEY, activeKey);
    }

    // Opdater aktive knapper i toggle bar
    const container = document.getElementById('ds-toggle-container');
    if (container) {
        container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
            const btnMode = btn.getAttribute('data-mode');
            const isActive = (btnMode === activeKey);
            if (isActive) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Opdater aktiv farveindikator
        const curPalette = COLOR_PALETTES[activeKey];
        const indicator = container.querySelector('.ds-toggle-current-dot');
        if (indicator && curPalette) {
            indicator.style.backgroundColor = curPalette.accentColor || '#22c55e';
            indicator.style.boxShadow = `0 0 10px ${curPalette.accentColor || '#22c55e'}`;
        }
    }
}

export function initDesignSystemToggle() {
    // 1. Aktivér altid aktuelt tema
    const initialMode = getActiveDesignTheme();
    applyDesignTheme(initialMode);

    // Lyt på ruteskift for at sikre temaet forbliver aktivt
    window.addEventListener('hashchange', () => {
        applyDesignTheme(getActiveDesignTheme());
    });

    // 2. Toggle-knappen skal KUN være tilgængelig på localhost
    if (!isLocalhost()) {
        const existingContainer = document.getElementById('ds-toggle-container');
        if (existingContainer) existingContainer.remove();
        return;
    }

    // Sikr at styles kun injiceres én gang
    if (!document.getElementById('ds-toggle-styles')) {
        const style = document.createElement('style');
        style.id = 'ds-toggle-styles';
        style.textContent = `
            .ds-toggle-container {
                position: fixed !important;
                bottom: 18px !important;
                left: 18px !important;
                z-index: 9999999 !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                background: rgba(12, 4, 7, 0.94) !important;
                backdrop-filter: blur(18px) !important;
                -webkit-backdrop-filter: blur(18px) !important;
                border: 1.5px solid rgba(255, 255, 255, 0.22) !important;
                border-radius: 9999px !important;
                padding: 6px 8px 6px 14px !important;
                box-shadow: 0 10px 32px rgba(0, 0, 0, 0.75), 0 0 20px rgba(34, 197, 94, 0.35) !important;
                font-family: 'Outfit', -apple-system, sans-serif !important;
                font-size: 0.825rem !important;
                color: #e2e8f0 !important;
                user-select: none !important;
                max-width: calc(100vw - 36px) !important;
                transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease !important;
            }
            .ds-toggle-container:hover {
                box-shadow: 0 14px 40px rgba(0, 0, 0, 0.85), 0 0 26px rgba(34, 197, 94, 0.45) !important;
            }
            .ds-toggle-label {
                font-weight: 700 !important;
                letter-spacing: 0.3px !important;
                color: #FFFFFF !important;
                display: flex !important;
                align-items: center !important;
                gap: 6px !important;
                margin-right: 2px !important;
                white-space: nowrap !important;
                font-size: 0.8rem !important;
            }
            .ds-toggle-current-dot {
                width: 8px !important;
                height: 8px !important;
                border-radius: 50% !important;
                display: inline-block !important;
                transition: background-color 0.25s, box-shadow 0.25s !important;
            }
            .ds-toggle-group {
                display: flex !important;
                align-items: center !important;
                background: rgba(0, 0, 0, 0.6) !important;
                border-radius: 9999px !important;
                padding: 3px !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
                gap: 3px !important;
                overflow-x: auto !important;
            }
            .ds-toggle-btn {
                background: transparent !important;
                border: none !important;
                color: #cbd5e1 !important;
                font-family: inherit !important;
                font-size: 0.75rem !important;
                font-weight: 600 !important;
                padding: 5px 10px !important;
                border-radius: 9999px !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                outline: none !important;
                display: flex !important;
                align-items: center !important;
                gap: 5px !important;
                white-space: nowrap !important;
            }
            .ds-toggle-btn:hover {
                color: #ffffff !important;
                background: rgba(255, 255, 255, 0.1) !important;
            }
            .ds-toggle-btn.active {
                color: #ffffff !important;
                font-weight: 700 !important;
            }
            .ds-toggle-btn[data-mode="combo-vinroed-skov"].active {
                background: #073518 !important;
                border: 1px solid #22c55e !important;
                box-shadow: 0 0 14px rgba(34, 197, 94, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="combo-vinroed-smaragd"].active {
                background: #043626 !important;
                border: 1px solid #14b8a6 !important;
                box-shadow: 0 0 14px rgba(20, 184, 166, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="combo-vinroed-botanisk"].active {
                background: #0a2d13 !important;
                border: 1px solid #22c55e !important;
                box-shadow: 0 0 14px rgba(34, 197, 94, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="groen-skov"].active {
                background: #08441f !important;
                border: 1px solid #22c55e !important;
                box-shadow: 0 0 12px rgba(34, 197, 94, 0.5) !important;
            }
            .ds-toggle-btn[data-mode="vinroed"].active {
                background: #5C0812 !important;
                border: 1px solid #FF4D5E !important;
                box-shadow: 0 0 12px rgba(255, 77, 94, 0.5) !important;
            }
            .ds-toggle-btn[data-mode="classic"].active {
                background: rgba(255, 255, 255, 0.2) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
            }
            .ds-toggle-btn[data-mode="adj-rav"].active {
                background: #341808 !important;
                border: 1px solid #ea580c !important;
                box-shadow: 0 0 14px rgba(234, 88, 12, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="adj-terrakotta"].active {
                background: #2F160E !important;
                border: 1px solid #c2410c !important;
                box-shadow: 0 0 14px rgba(194, 65, 12, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="adj-kobber"].active {
                background: #281608 !important;
                border: 1px solid #d97706 !important;
                box-shadow: 0 0 14px rgba(217, 119, 6, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="adj-espresso-orange"].active {
                background: #331606 !important;
                border: 1px solid #f97316 !important;
                box-shadow: 0 0 14px rgba(249, 115, 22, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="verb-granat"].active {
                background: #24070B !important;
                border: 1px solid #FF2A55 !important;
                box-shadow: 0 0 14px rgba(255, 42, 85, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="verb-kirsebaer"].active {
                background: #2B080D !important;
                border: 1px solid #F43F5E !important;
                box-shadow: 0 0 14px rgba(244, 63, 94, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="verb-rubin-koks"].active {
                background: #1E1014 !important;
                border: 1px solid #FF375F !important;
                box-shadow: 0 0 14px rgba(255, 55, 95, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="verb-briket"].active {
                background: #280D10 !important;
                border: 1px solid #EF4444 !important;
                box-shadow: 0 0 14px rgba(239, 68, 68, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="adv-safir"].active {
                background: #0A192F !important;
                border: 1px solid #3B82F6 !important;
                box-shadow: 0 0 14px rgba(59, 130, 246, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="adv-petrol"].active {
                background: #061D28 !important;
                border: 1px solid #0EA5E9 !important;
                box-shadow: 0 0 14px rgba(14, 165, 233, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="adv-indigo"].active {
                background: #0F1426 !important;
                border: 1px solid #6366F1 !important;
                box-shadow: 0 0 14px rgba(99, 102, 241, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="adv-skifer"].active {
                background: #0D1620 !important;
                border: 1px solid #38BDF8 !important;
                box-shadow: 0 0 14px rgba(56, 189, 248, 0.6) !important;
            }
            @media (max-width: 768px) {
                .ds-toggle-container {
                    bottom: 12px !important;
                    left: 8px !important;
                    padding: 4px 6px !important;
                    border-radius: 14px !important;
                }
                .ds-toggle-label span {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function renderToggleDock(container) {
        if (!container) return;
        const isKonj = isKonjRoute();
        const isAdv = isAdvRoute();
        const isVerb = isVerbRoute();
        const isAdj = isAdjRoute();

        if (isKonj) {
            const activeNuance = getActiveKonjNuance();
            applyKonjNuance(activeNuance);
            const buttonsHtml = Object.values(KONJ_PALETTES).map(pal => `
                <button class="ds-toggle-btn ${pal.id === activeNuance ? "active" : ""}" 
                        data-mode="${pal.id}" 
                        title="${pal.desc}">
                    <span>${pal.icon}</span>
                    <span>${pal.name}</span>
                </button>
            `).join("");

            container.innerHTML = `
                <span class="ds-toggle-label">
                    <span class="ds-toggle-current-dot"></span>
                    <strong>Konjunktioner Lilla-nuance:</strong>
                </span>
                <div class="ds-toggle-btn-group">
                    ${buttonsHtml}
                </div>
            `;

            container.querySelectorAll(".ds-toggle-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const mode = e.currentTarget.getAttribute("data-mode");
                    applyKonjNuance(mode);
                });
            });

            const curPalette = KONJ_PALETTES[activeNuance];
            const indicator = container.querySelector(".ds-toggle-current-dot");
            if (indicator && curPalette) {
                indicator.style.backgroundColor = curPalette.accentColor || "#A855F7";
                indicator.style.boxShadow = `0 0 10px ${curPalette.accentColor || "#A855F7"}`;
            }
            return;
        }

        if (isAdv) {
            const activeNuance = getActiveAdvNuance();
            applyAdvNuance(activeNuance);
            const buttonsHtml = Object.values(ADV_PALETTES).map(pal => `
                <button class="ds-toggle-btn ${pal.id === activeNuance ? 'active' : ''}" 
                        data-mode="${pal.id}" 
                        title="${pal.desc}">
                    <span>${pal.icon}</span>
                    <span>${pal.name}</span>
                </button>
            `).join('');

            container.innerHTML = `
                <span class="ds-toggle-label">
                    <span class="ds-toggle-current-dot"></span>
                    <span>Adverbium (Blå):</span>
                </span>
                <div class="ds-toggle-group">
                    ${buttonsHtml}
                </div>
            `;

            container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const mode = e.currentTarget.getAttribute('data-mode');
                    applyAdvNuance(mode);
                });
            });

            const curPalette = ADV_PALETTES[activeNuance];
            const indicator = container.querySelector('.ds-toggle-current-dot');
            if (indicator && curPalette) {
                indicator.style.backgroundColor = curPalette.accentColor || '#3B82F6';
                indicator.style.boxShadow = `0 0 10px ${curPalette.accentColor || '#3B82F6'}`;
            }
        } else if (isVerb) {
            const activeNuance = getActiveVerbNuance();
            applyVerbNuance(activeNuance);
            const buttonsHtml = Object.values(VERB_PALETTES).map(pal => `
                <button class="ds-toggle-btn ${pal.id === activeNuance ? 'active' : ''}" 
                        data-mode="${pal.id}" 
                        title="${pal.desc}">
                    <span>${pal.icon}</span>
                    <span>${pal.name}</span>
                </button>
            `).join('');

            container.innerHTML = `
                <span class="ds-toggle-label">
                    <span class="ds-toggle-current-dot"></span>
                    <span>Verbum (Rød):</span>
                </span>
                <div class="ds-toggle-group">
                    ${buttonsHtml}
                </div>
            `;

            container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const mode = e.currentTarget.getAttribute('data-mode');
                    applyVerbNuance(mode);
                });
            });

            const curPalette = VERB_PALETTES[activeNuance];
            const indicator = container.querySelector('.ds-toggle-current-dot');
            if (indicator && curPalette) {
                indicator.style.backgroundColor = curPalette.accentColor || '#FF2A55';
                indicator.style.boxShadow = `0 0 10px ${curPalette.accentColor || '#FF2A55'}`;
            }
        } else if (isAdj) {
            const activeNuance = getActiveAdjNuance();
            applyAdjNuance(activeNuance);
            const buttonsHtml = Object.values(ADJ_PALETTES).map(pal => `
                <button class="ds-toggle-btn ${pal.id === activeNuance ? 'active' : ''}" 
                        data-mode="${pal.id}" 
                        title="${pal.desc}">
                    <span>${pal.icon}</span>
                    <span>${pal.name}</span>
                </button>
            `).join('');

            container.innerHTML = `
                <span class="ds-toggle-label">
                    <span class="ds-toggle-current-dot"></span>
                    <span>Adjektiv (Orange):</span>
                </span>
                <div class="ds-toggle-group">
                    ${buttonsHtml}
                </div>
            `;

            container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const mode = e.currentTarget.getAttribute('data-mode');
                    applyAdjNuance(mode);
                });
            });

            const curPalette = ADJ_PALETTES[activeNuance];
            const indicator = container.querySelector('.ds-toggle-current-dot');
            if (indicator && curPalette) {
                indicator.style.backgroundColor = curPalette.accentColor || '#ea580c';
                indicator.style.boxShadow = `0 0 10px ${curPalette.accentColor || '#ea580c'}`;
            }
        } else {
            const activeMode = getActiveDesignTheme();
            applyDesignTheme(activeMode);
            const buttonsHtml = Object.values(COLOR_PALETTES).map(pal => `
                <button class="ds-toggle-btn ${pal.id === activeMode ? 'active' : ''}" 
                        data-mode="${pal.id}" 
                        title="${pal.desc}">
                    <span>${pal.icon}</span>
                    <span>${pal.name}</span>
                </button>
            `).join('');

            container.innerHTML = `
                <span class="ds-toggle-label">
                    <span class="ds-toggle-current-dot"></span>
                    <span>Tema:</span>
                </span>
                <div class="ds-toggle-group">
                    ${buttonsHtml}
                </div>
            `;

            container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const mode = e.currentTarget.getAttribute('data-mode');
                    applyDesignTheme(mode);
                });
            });

            const curPalette = COLOR_PALETTES[activeMode];
            const indicator = container.querySelector('.ds-toggle-current-dot');
            if (indicator && curPalette) {
                indicator.style.backgroundColor = curPalette.accentColor || '#22c55e';
                indicator.style.boxShadow = `0 0 10px ${curPalette.accentColor || '#22c55e'}`;
            }
        }
    }

    let container = document.getElementById('ds-toggle-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ds-toggle-container';
        container.className = 'ds-toggle-container';
        document.body.appendChild(container);
    }
    renderToggleDock(container);

    // Lyt på ruteskift for at opdatere knapper og tema
    window.addEventListener('hashchange', () => {
        if (isAdvRoute()) {
            applyAdvNuance(getActiveAdvNuance());
        } else if (isVerbRoute()) {
            applyVerbNuance(getActiveVerbNuance());
        } else if (isAdjRoute()) {
            applyAdjNuance(getActiveAdjNuance());
        } else {
            applyDesignTheme(getActiveDesignTheme());
        }
        const currentContainer = document.getElementById('ds-toggle-container');
        if (currentContainer) {
            renderToggleDock(currentContainer);
        }
    });
}
