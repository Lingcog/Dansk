import { navigate } from '../main.js';
import { setLanguage, getTranslation } from '../utils/i18n.js';

export function renderLanguageView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    const title = document.createElement('h1');
    title.textContent = 'Træning i dansk';

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Vælg sprog / Select language';

    const langList = document.createElement('div');
    langList.className = 'lang-list';

    const languages = [
        { code: 'da', label: 'Dansk' },
        { code: 'en', label: 'English' },
        { code: 'ar', label: 'العربية' },
        { code: 'ur', label: 'اردو' },
        { code: 'zh', label: '中文' },
        { code: 'ru', label: 'Русский' },
        { code: 'ne', label: 'नेपाली' },
        { code: 'th', label: 'ไทย' },
        { code: 'pt', label: 'Português' },
        { code: 'vi', label: 'Tiếng Việt' },
        { code: 'fa', label: 'فارسی' },
        { code: 'tr', label: 'Türkçe' },
        { code: 'es', label: 'Español' }
    ];

    languages.forEach(l => {
        const btn = document.createElement('button');
        btn.className = 'lang-btn';
        btn.textContent = l.label;
        btn.onclick = () => {
            setLanguage(l.code);
            navigateFn('main');
        };
        langList.appendChild(btn);
    });

    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(langList);

    container.appendChild(viewContainer);
}
