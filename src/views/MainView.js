import { getTranslation, getLang, setLanguage } from '../utils/i18n.js';

export function renderMainView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Header Title & Subtitle
    const title = document.createElement('h1');
    title.textContent = getTranslation('title');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('subtitle');

    // Cards Data Wrapper with both classic Emoji and Vinrød Præcision Monochrome Vector SVG
    const cardsData = [
        {
            icon: '✨',
            svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="9 16 11 18 15 14"></polyline></svg>`,
            titleKey: 'dagensOpgave',
            descKey: 'dagensOpgaveDesc',
            action: () => navigateFn('dagens_opgave') // Navigates to DagensOpgaveView
        },
        {
            icon: '🌍',
            svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
            titleKey: 'mitSprogSammenlignetTitle',
            descKey: 'mitSprogSammenlignetDesc',
            fallbackTitle: 'Mit sprog sammenlignet med dansk',
            fallbackDesc: 'Fra mindste lydtræk til hel samtale — se forskellen mellem dansk og dit eget sprog trin for trin.',
            requiresLang: 'zh',
            action: () => navigateFn('mit_sprog_sammenlignet')
        },
        {
            icon: '🧠',
            svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><line x1="10" y1="7" x2="16" y2="7"></line><line x1="10" y1="11" x2="14" y2="11"></line></svg>`,
            titleKey: 'laerNyeOrd',
            descKey: 'laerEtNytOrdDesc',
            action: () => navigateFn('word_learning')
        },

        {
            icon: '🕹️',
            svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
            titleKey: 'Interaktive historier',
            descKey: 'Lær dansk ved at læse historier',
            action: () => navigateFn('historier_menu')
        },
        {
            icon: '🎵',
            svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
            titleKey: 'danskeSange',
            fallbackTitle: 'Danske sange',
            descKey: 'danskeSangeDesc',
            fallbackDesc: 'Syng med på elskede danske sange og gå på opdagelse i interaktive vrimlebilleder.',
            action: () => navigateFn('sange')
        },
        {
            icon: '💬',
            svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
            titleKey: 'lavSporgsmal',
            descKey: 'lavSporgsmalDesc',
            action: () => navigateFn('lav_sporgsmal')
        },

        {
            icon: '🎙️',
            svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line><line x1="8" y1="22" x2="16" y2="22"></line></svg>`,
            titleKey: 'traenUdtale',
            descKey: 'udtaleDesc',
            action: () => navigateFn('traen_udtale')
        },
        {
            icon: '🗣️',
            svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
            titleKey: 'samtaleTraening',
            descKey: 'samtaleTraeningDesc',
            action: () => navigateFn('samtale_traening')
        },
        {
            icon: '✍️',
            svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path><path d="M15 5l4 4"></path></svg>`,
            titleKey: 'skriveHjaelp',
            descKey: 'skriveHjaelpDesc',
            action: () => navigateFn('skrive_hjaelp')
        },

        {
            icon: '🎨',
            svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"></path></svg>`,
            titleKey: 'talemaader',
            descKey: 'talemaaderDesc',
            action: () => navigateFn('talemaader')
        }
    ];

    const isLocalhost = typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
    );

    const grid = document.createElement('div');
    grid.className = 'grid';

    cardsData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card';
        const currentLang = getLang();
        const isChineseOnly = data.requiresLang === 'zh';
        const isChineseActive = currentLang === 'zh';

        if (data.comingSoon && !isLocalhost) {
            card.style.opacity = '0.6';
            card.style.cursor = 'not-allowed';
        } else if (isChineseOnly && !isChineseActive) {
            // Locked unless Chinese is selected as app language
            card.style.opacity = '0.75';
            card.style.cursor = 'pointer';
            card.onclick = () => {
                showChineseRequiredModal();
            };
        } else {
            card.onclick = data.action;
        }

        const icon = document.createElement('div');
        icon.className = 'card-icon';
        icon.innerHTML = `
            <span class="card-icon-emoji">${data.icon}</span>
            <span class="card-icon-svg" aria-hidden="true">${data.svgIcon}</span>
        `;

        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        const transTitle = getTranslation(data.titleKey);
        cardTitle.textContent = (transTitle && transTitle !== data.titleKey) ? transTitle : (data.fallbackTitle || transTitle);

        if (isChineseOnly) {
            const badge = document.createElement('span');
            badge.style.display = 'inline-block';
            badge.style.fontSize = '0.72rem';
            badge.style.fontWeight = '800';
            badge.style.padding = '0.18rem 0.55rem';
            badge.style.borderRadius = '8px';
            badge.style.marginLeft = '0.5rem';
            badge.style.verticalAlign = 'middle';
            if (isChineseActive) {
                badge.style.background = 'rgba(56, 189, 248, 0.2)';
                badge.style.border = '1px solid rgba(56, 189, 248, 0.5)';
                badge.style.color = '#38bdf8';
                badge.textContent = '🇨🇳 中文版 (Aktiv)';
            } else {
                badge.style.background = 'rgba(239, 68, 68, 0.16)';
                badge.style.border = '1px solid rgba(239, 68, 68, 0.4)';
                badge.style.color = '#fca5a5';
                badge.textContent = '🔒 Kun ved valg af kinesisk (中文)';
            }
            cardTitle.appendChild(badge);
        } else if (data.badgeText) {
            const badge = document.createElement('span');
            badge.style.display = 'inline-block';
            badge.style.fontSize = '0.72rem';
            badge.style.fontWeight = '800';
            badge.style.background = 'rgba(56, 189, 248, 0.16)';
            badge.style.border = '1px solid rgba(56, 189, 248, 0.45)';
            badge.style.color = '#38bdf8';
            badge.style.padding = '0.18rem 0.55rem';
            badge.style.borderRadius = '8px';
            badge.style.marginLeft = '0.5rem';
            badge.style.verticalAlign = 'middle';
            badge.textContent = data.badgeText;
            cardTitle.appendChild(badge);
        } else if (data.comingSoon) {
            const badge = document.createElement('span');
            badge.style.display = 'inline-block';
            badge.style.fontSize = '0.75rem';
            badge.style.fontWeight = '700';
            badge.style.background = 'rgba(255, 255, 255, 0.14)';
            badge.style.border = '1px solid rgba(255, 255, 255, 0.25)';
            badge.style.padding = '0.18rem 0.55rem';
            badge.style.borderRadius = '8px';
            badge.style.marginLeft = '0.5rem';
            badge.style.verticalAlign = 'middle';
            badge.textContent = `🔒 ${data.comingSoonLabel || 'Kommer senere'}`;
            cardTitle.appendChild(badge);
        }

        const cardDesc = document.createElement('div');
        cardDesc.className = 'card-desc';
        const transDesc = getTranslation(data.descKey);
        cardDesc.textContent = (transDesc && transDesc !== data.descKey) ? transDesc : (data.fallbackDesc || transDesc);

        card.appendChild(icon);
        card.appendChild(cardTitle);
        card.appendChild(cardDesc);
        grid.appendChild(card);
    });

    function showChineseRequiredModal() {
        const existing = document.getElementById('chinese-required-modal');
        if (existing) existing.remove();

        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'chinese-required-modal';
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.inset = '0';
        modalOverlay.style.background = 'rgba(0, 0, 0, 0.78)';
        modalOverlay.style.backdropFilter = 'blur(6px)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.zIndex = '9999';
        modalOverlay.style.padding = '1rem';

        const modalBox = document.createElement('div');
        modalBox.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
        modalBox.style.border = '2px solid rgba(56, 189, 248, 0.5)';
        modalBox.style.borderRadius = '20px';
        modalBox.style.maxWidth = '490px';
        modalBox.style.width = '100%';
        modalBox.style.padding = '1.8rem 1.6rem';
        modalBox.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6)';
        modalBox.style.textAlign = 'center';
        modalBox.style.color = '#ffffff';

        modalBox.innerHTML = `
            <div style="font-size: 2.4rem; margin-bottom: 0.5rem;">🇨🇳</div>
            <h2 style="margin: 0 0 0.4rem; font-size: 1.35rem; font-weight: 900; color: #ffffff;">
                Kun adgang med valg af kinesisk sprog
            </h2>
            <div style="font-size: 0.92rem; font-weight: 800; color: #38bdf8; margin-bottom: 1rem;">
                仅限选择中文语言后开放访问
            </div>
            <p style="font-size: 0.91rem; color: #cbd5e1; line-height: 1.55; margin: 0 0 1.5rem;">
                Denne flade sammenligner dansk med kinesisk og er på nuværende tidspunkt <strong>kun tilgængelig, når appens sprog er sat til kinesisk (中文)</strong>. Andre sprogversioner følger senere.<br><br>
                Vil du skifte sprog til kinesisk nu for at få adgang?
            </p>
            <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
                <button id="crm-cancel-btn" type="button" style="background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(148, 163, 184, 0.35); color: #cbd5e1; padding: 0.65rem 1.2rem; border-radius: 12px; font-weight: 800; font-size: 0.9rem; cursor: pointer;">
                    Annuller
                </button>
                <button id="crm-switch-btn" type="button" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border: 1.5px solid #38bdf8; color: #ffffff; padding: 0.65rem 1.4rem; border-radius: 12px; font-weight: 900; font-size: 0.92rem; cursor: pointer; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);">
                    Skift til kinesisk (切换到中文) ➔
                </button>
            </div>
        `;

        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);

        modalOverlay.onclick = (e) => {
            if (e.target === modalOverlay) modalOverlay.remove();
        };
        modalBox.querySelector('#crm-cancel-btn').onclick = () => modalOverlay.remove();
        modalBox.querySelector('#crm-switch-btn').onclick = () => {
            modalOverlay.remove();
            setLanguage('zh');
            window.location.hash = '#/zh/mit_sprog_sammenlignet';
        };
    }

    const footer = document.createElement('footer');
    footer.innerHTML = `© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.`;

    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(grid);
    viewContainer.appendChild(footer);
    container.appendChild(viewContainer);
}
