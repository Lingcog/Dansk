export function renderGrammarMenu(currentView, navigateFn) {
    const menuContainer = document.createElement('div');
    menuContainer.className = 'grammar-nav-menu';

    const menuItems = [
        { id: 'intro', label: 'Intro', route: 'grounding' },
        { id: 'modalverber', label: 'Modalverber', route: 'modal_force' },
        { id: 'adjektiver', label: 'Adjektiver', route: 'adjective_bridge' },
        { id: 'adverbier', label: 'Adverbier', route: 'adverb_bridge' },
        { id: 'konjunktioner', label: 'Konjunktioner', route: 'conjunction_bridge' }
    ];

    const scrollWrapper = document.createElement('div');
    scrollWrapper.className = 'grammar-nav-scroll';

    menuItems.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'grammar-nav-btn' + (item.id === currentView ? ' active' : '');
        btn.textContent = item.label;
        btn.onclick = () => {
            if (item.id !== currentView) {
                navigateFn(item.route);
            }
        };
        scrollWrapper.appendChild(btn);
    });

    menuContainer.appendChild(scrollWrapper);

    // CSS
    if (!document.getElementById('grammar-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'grammar-menu-styles';
        style.textContent = `
            .grammar-nav-menu {
                width: 100%;
                margin-bottom: 1.5rem;
                background: rgba(0, 0, 0, 0.15);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                padding: 0.5rem 0;
            }
            .grammar-nav-scroll {
                display: flex;
                overflow-x: auto;
                gap: 0.5rem;
                padding: 0 1rem;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE/Edge */
            }
            .grammar-nav-scroll::-webkit-scrollbar {
                display: none; /* Chrome/Safari */
            }
            .grammar-nav-btn {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.8);
                padding: 0.4rem 1rem;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                white-space: nowrap;
                transition: all 0.2s;
            }
            .grammar-nav-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                color: white;
            }
            .grammar-nav-btn.active {
                background: var(--accent-light, #ffeb3b);
                color: black;
                border-color: var(--accent-light, #ffeb3b);
            }
        `;
        document.head.appendChild(style);
    }

    return menuContainer;
}
