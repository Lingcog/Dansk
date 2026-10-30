import { setLanguage, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export const LANGUAGES = [
    { code: 'da', label: 'Dansk', flag: '🇩🇰' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'ur', label: 'اردو', flag: '🇵🇰', dir: 'rtl' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'ne', label: 'नेपाली', flag: '🇳🇵' },
    { code: 'th', label: 'ไทย', flag: '🇹🇭' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'fa', label: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'uk', label: 'Українська', flag: '🇺🇦', icon: 'ukraine.png' },
    { code: 'ku', label: 'Kurdî', flag: '☀️', icon: 'kurdistan.png' },
    { code: 'ps', label: 'پښتو', flag: '🇦🇫', icon: 'afghanistan.png', dir: 'rtl' },
    { code: 'sq', label: 'Shqip (Albansk)', flag: '🇦🇱' }
];

let isInitialized = false;

export function initGlobalLanguageSwitcher() {
    if (isInitialized || document.getElementById('global-lang-btn')) return;
    isInitialized = true;

    // 1. Inject Styles
    const style = document.createElement('style');
    style.id = 'global-lang-switcher-styles';
    style.textContent = `
        .global-lang-btn {
            position: fixed;
            top: 14px;
            right: 16px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(15, 23, 42, 0.82);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1.5px solid rgba(255, 255, 255, 0.2);
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.25rem;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
            z-index: 99999;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            padding: 0;
            outline: none;
            user-select: none;
        }
        .global-lang-btn:hover {
            transform: scale(1.08);
            background: rgba(30, 41, 59, 0.95);
            border-color: #38bdf8;
            box-shadow: 0 6px 20px rgba(56, 189, 248, 0.35);
        }
        .global-lang-btn:active {
            transform: scale(0.95);
        }
        @media (max-width: 600px) {
            .global-lang-btn {
                top: 10px;
                right: 12px;
                width: 38px;
                height: 38px;
                font-size: 1.15rem;
            }
        }

        .global-lang-overlay {
            position: fixed;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 100000;
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        .global-lang-overlay.open {
            display: flex;
            opacity: 1;
        }
        .global-lang-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
        }
        .global-lang-dialog {
            position: relative;
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.16);
            border-radius: 20px;
            padding: 1.5rem;
            max-width: 520px;
            width: 90%;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
            transform: scale(0.95) translateY(10px);
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 1;
            color: #f8fafc;
        }
        .global-lang-overlay.open .global-lang-dialog {
            transform: scale(1) translateY(0);
        }
        .global-lang-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            padding-bottom: 0.8rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .global-lang-title {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            font-size: 1.1rem;
            font-weight: 700;
            color: #38bdf8;
        }
        .global-lang-close-btn {
            background: rgba(255, 255, 255, 0.08);
            border: none;
            color: #94a3b8;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            transition: all 0.2s;
        }
        .global-lang-close-btn:hover {
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
        }
        .global-lang-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.6rem;
        }
        @media (max-width: 480px) {
            .global-lang-grid {
                grid-template-columns: 1fr;
            }
        }
        .global-lang-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.7rem 0.9rem;
            background: #1e293b;
            border: 1.5px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            color: #e2e8f0;
            cursor: pointer;
            font-size: 0.95rem;
            font-weight: 600;
            transition: all 0.2s;
            text-align: left;
        }
        .global-lang-item:hover {
            background: #334155;
            border-color: #38bdf8;
            transform: translateY(-1px);
        }
        .global-lang-item.active {
            background: rgba(14, 165, 233, 0.18);
            border-color: #0ea5e9;
            color: #38bdf8;
        }
        .global-lang-flag {
            font-size: 1.25rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
        }
        .global-lang-flag-img {
            width: 22px;
            height: 16px;
            object-fit: cover;
            border-radius: 3px;
        }
        .global-lang-name-group {
            display: flex;
            align-items: center;
            gap: 0.65rem;
        }
        .global-lang-check {
            font-size: 0.85rem;
            color: #10b981;
            font-weight: 800;
        }
    `;
    document.head.appendChild(style);

    // 2. Create Floating Button (Pure discreet globe icon, NO text)
    const btn = document.createElement('button');
    btn.id = 'global-lang-btn';
    btn.className = 'global-lang-btn';
    btn.setAttribute('aria-label', 'Vælg sprog / Select language');
    btn.setAttribute('title', 'Vælg sprog / Select language');
    btn.innerHTML = `<span class="global-lang-icon">🌐</span>`;
    document.body.appendChild(btn);

    // 3. Create Modal Elements
    const overlay = document.createElement('div');
    overlay.id = 'global-lang-modal';
    overlay.className = 'global-lang-overlay';

    const backdrop = document.createElement('div');
    backdrop.className = 'global-lang-backdrop';

    const dialog = document.createElement('div');
    dialog.className = 'global-lang-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');

    const header = document.createElement('div');
    header.className = 'global-lang-header';
    header.innerHTML = `
        <div class="global-lang-title">
            <span>🌐</span>
            <span>Vælg sprog / Select language</span>
        </div>
        <button class="global-lang-close-btn" aria-label="Luk">✕</button>
    `;

    const grid = document.createElement('div');
    grid.className = 'global-lang-grid';

    function renderLanguages() {
        grid.innerHTML = '';
        const currentLang = getLang();

        LANGUAGES.forEach(l => {
            const item = document.createElement('button');
            item.className = `global-lang-item ${currentLang === l.code ? 'active' : ''}`;

            const nameGroup = document.createElement('div');
            nameGroup.className = 'global-lang-name-group';

            const flagSpan = document.createElement('span');
            flagSpan.className = 'global-lang-flag';
            if (l.icon) {
                const img = document.createElement('img');
                img.src = `${baseUrl}images/flags/${l.icon}`;
                img.alt = l.label;
                img.className = 'global-lang-flag-img';
                flagSpan.appendChild(img);
            } else {
                flagSpan.textContent = l.flag || '🌐';
            }

            const labelSpan = document.createElement('span');
            labelSpan.textContent = l.label;
            if (l.dir === 'rtl') {
                labelSpan.dir = 'rtl';
            }

            nameGroup.appendChild(flagSpan);
            nameGroup.appendChild(labelSpan);
            item.appendChild(nameGroup);

            if (currentLang === l.code) {
                const checkSpan = document.createElement('span');
                checkSpan.className = 'global-lang-check';
                checkSpan.textContent = '✓';
                item.appendChild(checkSpan);
            }

            item.onclick = () => selectLanguage(l.code);
            grid.appendChild(item);
        });
    }

    dialog.appendChild(header);
    dialog.appendChild(grid);
    overlay.appendChild(backdrop);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    function openModal() {
        renderLanguages();
        overlay.classList.add('open');
    }

    function closeModal() {
        overlay.classList.remove('open');
    }

    function selectLanguage(code) {
        closeModal();
        if (getLang() === code) return;

        setLanguage(code);

        // Update hash keeping path & query intact
        const hash = window.location.hash.replace(/^#\//, '');
        const [pathPart, queryString] = hash.split('?');
        const segments = pathPart.split('/').filter(Boolean);
        const qs = queryString ? '?' + queryString : '';

        if (segments.length > 0) {
            segments[0] = code;
            window.location.hash = '#/' + segments.join('/') + qs;
        } else {
            window.location.hash = '#/' + code + '/main';
        }
    }

    // Events
    btn.onclick = openModal;
    backdrop.onclick = closeModal;
    header.querySelector('.global-lang-close-btn').onclick = closeModal;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeModal();
        }
    });
}
