import { baseUrl } from '../utils/config.js';
import { getTranslation, getLang } from '../utils/i18n.js';
import { dsSvgIcons } from '../utils/designSystemIcons.js';
import {
    TXT, RULE_NAMES, PRON_TABLE, OWNER_TABLE, HOTSPOTS, LYS_SCENES, OEJEN_SCENES, EJER_SCENES,
    BOOM_SCENES, DETEKTIV, BUILDER_SCENES, BUILDER_FORMS, KONTEKST, HISTORIER, plain
} from '../utils/pronomen_flade_data.js';
import { PRON_TRANS } from '../utils/pronomen_flade_trans.js';

/**
 * PronomenFladeView - "Han / ham / hans (Pronominer)"
 *
 * Seks faner: 1. Familiemiddagen (vrimlebillede), 2. Aha-værkstedet (fire regler),
 * 3. Detektiven (enkeltsætninger), 4. Sætningsbyggeren, 5. Kontekst-testen (samtaler)
 * og 6. Historierne (længere tekster). Farvetema: skovgrøn (samme som substantiver).
 *
 * Ruter: #/<sprog>/pronomen/p/<fane>[/<underfane>]
 */

const TAB_IDS = ['vrimmel', 'vaerksted', 'detektiv', 'builder', 'kontekst', 'historier'];

function resolveInitial(extra) {
    const parts = String(extra.subPath || '').split('/');
    const key = extra.viewMode || (parts[0] === 'p' ? parts[1] : '');
    let tab = 'vrimmel';
    let sub = 0;
    if (TAB_IDS.includes(key)) {
        tab = key;
        const n = parseInt(parts[2], 10);
        if (key === 'vaerksted' && n >= 0 && n <= 3) sub = n;
    } else if (key === 'subjekt' || key === 'objekt') {
        tab = 'vaerksted'; sub = 0;
    } else if (key === 'possessiv') {
        tab = 'vaerksted'; sub = 2;
    } else if (key === 'refleksiv') {
        tab = 'vaerksted'; sub = 3;
    }
    return { tab, sub };
}

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function cap(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function renderPronomenFladeView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    const lang = getLang();
    const initial = resolveInitial(extraData);

    // ------------------------------------------------------------------
    // Hjælpere: oversættelser, markup, tale
    // ------------------------------------------------------------------
    function tr(key) {
        if (!lang || lang === 'da') return '';
        return (PRON_TRANS[lang] && PRON_TRANS[lang][key]) || '';
    }
    function trBlock(key) {
        const t = tr(key);
        return t ? `<div class="pr-trans">${t}</div>` : '';
    }
    function tb(k) {
        return `${TXT[k]}${trBlock('txt.' + k)}`;
    }
    function mk(str) {
        return String(str).replace(/\[\[([SOPR]):([^\]]+)\]\]/g,
            (m, r, w) => `<span class="pr-role pr-role-${r}" data-role="${r}">${w}</span>`);
    }
    function speak(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'da-DK';
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
    }
    function icon(name, size = 16) {
        const fn = dsSvgIcons[name];
        return fn ? `<span class="pr-ico" aria-hidden="true">${fn(size)}</span>` : '';
    }
    function img(src, alt, cls = '') {
        return `<img class="pr-img ${cls}" src="${baseUrl}${src}" alt="${alt}">`;
    }
    function legendHTML(roles = ['S', 'O', 'P', 'R']) {
        return `<div class="pr-legend">${roles.map(r =>
            `<span class="pr-role pr-role-${r}" data-role="${r}">${TXT['legend_' + r]}</span>`).join('')}</div>`;
    }
    function tableHTML(headers, rows) {
        return `<div class="pr-table-wrap"><table class="pr-table">
            <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="pr-td-first"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>`;
    }
    function hintHTML(rule) {
        return `<strong>${TXT[RULE_NAMES[rule]]}</strong>: ${tb('hint_' + rule)}`;
    }

    /** Bygger tekst med rullemenuer til {{svar|fejl#regel}}-huller. */
    function buildBlanks(text, onChange) {
        const frag = document.createDocumentFragment();
        const blanks = [];
        const re = /\{\{([^}]+)\}\}/g;
        let last = 0;
        let m;
        while ((m = re.exec(text))) {
            if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
            const [body, rule] = m[1].split('#');
            const opts = body.split('|');
            const sel = document.createElement('select');
            sel.className = 'pr-select';
            const d = document.createElement('option');
            d.value = '';
            d.textContent = '...';
            sel.appendChild(d);
            shuffle(opts).forEach(o => {
                const op = document.createElement('option');
                op.value = o;
                op.textContent = o;
                sel.appendChild(op);
            });
            const b = { sel, ans: opts[0], rule, state: 'idle' };
            blanks.push(b);
            sel.onchange = () => {
                b.state = sel.value === '' ? 'idle' : (sel.value === b.ans ? 'ok' : 'bad');
                sel.classList.toggle('ok', b.state === 'ok');
                sel.classList.toggle('bad', b.state === 'bad');
                if (onChange) onChange(b, blanks);
            };
            frag.appendChild(sel);
            last = re.lastIndex;
        }
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        return { frag, blanks };
    }

    // ------------------------------------------------------------------
    // Skelet: topbar, hero, faner
    // ------------------------------------------------------------------
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container pronomen-flade';

    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('pronomen');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const style = document.createElement('style');
    style.textContent = `
        .pronomen-flade {
            --pr-bg: #4A040B;
            --pr-surface: #073518;
            --pr-surface-hover: #0c4f24;
            --pr-surface-input: #02220e;
            --pr-border: #136832;
            --pr-border-light: #1b793c;
            --pr-primary: #22c55e;
            --pr-text: #FFFFFF;
            --pr-muted: #a7f3d0;
            --pr-subtle: #86efac;
            max-width: 1100px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .pronomen-flade .pr-ico { display: inline-flex; vertical-align: -0.15em; }
        .pronomen-flade .pr-ico svg { stroke: currentColor; }
        .pr-hero { text-align: center; margin-bottom: 1.6rem; }
        .pr-hero h1 {
            font-size: 2.2rem; font-weight: 800; margin-bottom: 0.6rem;
            color: #FFFFFF !important; background: none !important;
            -webkit-background-clip: unset !important; -webkit-text-fill-color: #FFFFFF !important;
        }
        .pr-hero p { color: #FFFFFF; opacity: 0.95; font-size: 1.1rem; max-width: 720px; margin: 0 auto; line-height: 1.55; }
        .pr-tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.6rem; }
        .pr-tab, .pr-subtab, .pr-filter {
            display: inline-flex; align-items: center; gap: 0.45rem;
            background: var(--pr-surface-input); border: 1.5px solid var(--pr-border);
            color: var(--pr-muted); padding: 0.55rem 1rem; border-radius: 12px;
            font-weight: 700; font-size: 0.92rem; cursor: pointer; transition: all 0.2s ease;
        }
        .pr-tab:hover, .pr-subtab:hover, .pr-filter:hover { background: var(--pr-surface-hover); color: #fff; }
        .pr-tab.active, .pr-subtab.active, .pr-filter.active {
            background: var(--pr-primary); border-color: var(--pr-primary); color: #02220e;
        }
        .pr-card {
            background: var(--pr-surface); border: 1.5px solid var(--pr-border);
            border-radius: 20px; padding: 1.4rem; box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            margin-bottom: 1.2rem;
        }
        .pr-card h2, .pr-card h3 { color: #fff; margin: 0 0 0.7rem; font-weight: 800; }
        .pr-card h2 { font-size: 1.4rem; }
        .pr-card h3 { font-size: 1.1rem; }
        .pr-card p { color: var(--pr-muted); line-height: 1.6; margin: 0 0 0.4rem; }
        .pr-instr { color: var(--pr-muted); font-size: 1rem; margin-bottom: 1rem; }
        .pr-trans { font-size: 0.92rem; color: var(--pr-subtle); font-style: italic; margin-top: 0.25rem; line-height: 1.45; font-weight: 500; }
        .pr-role { font-weight: 800; padding: 0 0.25em; border-radius: 6px; white-space: nowrap; }
        .pr-role::after { content: attr(data-role); font-size: 0.55em; vertical-align: super; margin-left: 0.15em; opacity: 0.85; }
        .pr-role-S { color: #fde047; background: rgba(253,224,71,0.12); border-bottom: 2px solid #fde047; }
        .pr-role-O { color: #93c5fd; background: rgba(147,197,253,0.12); border-bottom: 2px solid #93c5fd; }
        .pr-role-P { color: #4ade80; background: rgba(74,222,128,0.12); border-bottom: 2px solid #4ade80; }
        .pr-role-R { color: #f0abfc; background: rgba(240,171,252,0.12); border-bottom: 2px solid #f0abfc; }
        .pr-legend { display: flex; flex-wrap: wrap; gap: 0.6rem; margin: 0.4rem 0 1rem; }
        .pr-img { max-width: 100%; border-radius: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .pr-img-row { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin: 1rem 0; }
        .pr-img-row .pr-img { max-height: 280px; width: auto; }
        .pr-table-wrap { overflow-x: auto; margin: 0.8rem 0; }
        .pr-table { width: 100%; border-collapse: collapse; font-size: 0.98rem; }
        .pr-table th { text-align: left; color: var(--pr-muted); padding: 0.5rem 0.7rem; border-bottom: 2px solid var(--pr-border-light); }
        .pr-table td { padding: 0.45rem 0.7rem; border-bottom: 1px solid var(--pr-border); color: #fff; }
        .pr-td-first { font-weight: 800; color: var(--pr-subtle) !important; }
        .pr-sentence-big { font-size: 1.5rem; font-weight: 700; line-height: 1.5; color: #fff; margin: 0.6rem 0; }
        .pr-btn {
            background: var(--pr-primary); color: #02220e; border: none; padding: 0.65rem 1.2rem;
            border-radius: 12px; font-weight: 800; cursor: pointer; font-size: 0.95rem;
            display: inline-flex; align-items: center; gap: 0.4rem; transition: all 0.2s ease;
        }
        .pr-btn:hover { background: #4ade80; }
        .pr-btn.ghost { background: var(--pr-surface-input); color: var(--pr-muted); border: 1.5px solid var(--pr-border); }
        .pr-btn.ghost:hover { background: var(--pr-surface-hover); color: #fff; }
        .pr-btn:disabled { opacity: 0.45; cursor: default; }
        .pr-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1rem; }
        .pr-select {
            background: var(--pr-surface-input); color: #fff; border: 2px solid var(--pr-border-light);
            border-radius: 10px; padding: 0.3rem 0.5rem; font-size: 1.05rem; font-weight: 700; margin: 0 0.15rem;
        }
        .pr-select.ok { border-color: #4ade80; background: rgba(34,197,94,0.25); }
        .pr-select.bad { border-color: #f87171; background: rgba(248,113,113,0.2); }
        .pr-feedback { margin-top: 0.8rem; padding: 0.7rem 0.9rem; border-radius: 12px; font-size: 0.95rem; line-height: 1.5; }
        .pr-feedback.good { background: rgba(34,197,94,0.18); border: 1px solid #4ade80; color: #fff; }
        .pr-feedback.wrong { background: rgba(248,113,113,0.15); border: 1px solid #f87171; color: #fff; }
        .pr-progress { color: var(--pr-muted); font-weight: 700; font-size: 0.9rem; margin-bottom: 0.6rem; }

        /* Vrimlebillede */
        .pr-stage-controls { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; }
        .pr-filters { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .pr-stage { position: relative; width: 100%; border-radius: 16px; overflow: hidden; }
        .pr-stage img { display: block; width: 100%; height: auto; }
        .pr-pin {
            position: absolute; transform: translate(-50%, -50%);
            min-width: 30px; height: 30px; border-radius: 15px; padding: 0 0.45rem;
            background: var(--pr-primary); color: #02220e; border: 2px solid #fff;
            font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; justify-content: center;
            gap: 0.3rem; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.5); transition: transform 0.15s ease; white-space: nowrap;
        }
        .pr-pin:hover { transform: translate(-50%, -50%) scale(1.15); }
        .pr-pin.active { background: #fde047; box-shadow: 0 0 0 4px rgba(253,224,71,0.45); }
        .pr-pin-label { font-size: 0.78rem; }
        .pr-inspector { margin-top: 1rem; background: var(--pr-surface-input); border: 1.5px solid var(--pr-border-light); border-radius: 16px; padding: 1.2rem; }
        .pr-inspector h3 { margin-bottom: 0.3rem; }
        .pr-badge { display: inline-block; background: var(--pr-surface); border: 1px solid var(--pr-border-light); color: var(--pr-subtle); padding: 0.2rem 0.7rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.6rem; }
        .pr-explain { border-left: 4px solid var(--pr-primary); padding-left: 0.8rem; margin-top: 0.8rem; color: var(--pr-muted); line-height: 1.55; }

        /* Aha-værksted */
        .pr-subtabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .pr-persons { display: flex; gap: 1rem; flex-wrap: wrap; margin: 0.8rem 0; }
        .pr-person {
            flex: 1; min-width: 150px; text-align: center; padding: 1rem; border-radius: 16px; cursor: pointer;
            background: var(--pr-surface-input); border: 2px solid var(--pr-border); color: var(--pr-muted);
            font-weight: 800; font-size: 1.1rem; transition: all 0.25s ease;
        }
        .pr-person.light { background: rgba(253,224,71,0.14); border-color: #fde047; color: #fde047; box-shadow: 0 0 22px rgba(253,224,71,0.35); }
        .pr-person small { display: block; font-weight: 600; font-size: 0.8rem; margin-top: 0.2rem; opacity: 0.9; }
        .pr-toggle-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.8rem 0; }
        .pr-example-pick { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.6rem 0; }
        .pr-rule-list { margin: 0.4rem 0 0.8rem; padding-left: 0; list-style: none; }
        .pr-rule-list li { margin-bottom: 0.6rem; color: #fff; line-height: 1.5; font-size: 1.02rem; }
        .pr-question { font-size: 1.25rem; font-weight: 800; color: #fde047; margin: 0.4rem 0; }

        /* Sætningsbygger, kontekst, historier */
        .pr-context-line { font-size: 1.15rem; color: #fff; margin: 0.4rem 0 1rem; font-weight: 600; }
        .pr-build-line { font-size: 1.35rem; font-weight: 700; color: #fff; line-height: 2.2; }
        .pr-dialog-line { margin: 0.5rem 0; font-size: 1.08rem; line-height: 2; color: #fff; }
        .pr-speaker { display: inline-block; min-width: 5.5rem; font-weight: 800; color: var(--pr-subtle); margin-right: 0.4rem; }
        .pr-place { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: var(--pr-subtle); margin-bottom: 0.4rem; }
        .pr-story-p { font-size: 1.1rem; line-height: 2.1; color: #fff; margin-bottom: 0.9rem; }
        .pr-solved { border-color: #4ade80; }
        @media (max-width: 640px) {
            .pr-hero h1 { font-size: 1.7rem; }
            .pr-pin-label { display: none; }
        }
    `;
    viewContainer.appendChild(style);

    const hero = document.createElement('div');
    hero.className = 'pr-hero';
    hero.innerHTML = `<h1>${TXT.hero_title}</h1><p>${TXT.hero_desc}</p>${trBlock('txt.hero_desc')}`;
    viewContainer.appendChild(hero);

    const tabsDef = [
        { id: 'vrimmel', label: TXT.tab_vrimmel, icon: 'image' },
        { id: 'vaerksted', label: TXT.tab_vaerksted, icon: 'lightbulb' },
        { id: 'detektiv', label: TXT.tab_detektiv, icon: 'search' },
        { id: 'builder', label: TXT.tab_builder, icon: 'bricks' },
        { id: 'kontekst', label: TXT.tab_kontekst, icon: 'target' },
        { id: 'historier', label: TXT.tab_historier, icon: 'bookOpen' },
    ];
    const nav = document.createElement('div');
    nav.className = 'pr-tabs';
    tabsDef.forEach(t => {
        const b = document.createElement('button');
        b.className = 'pr-tab';
        b.id = `pr-tab-${t.id}`;
        b.innerHTML = `${icon(t.icon)} <span>${t.label}</span>`;
        b.onclick = () => switchTab(t.id);
        nav.appendChild(b);
    });
    viewContainer.appendChild(nav);

    const content = document.createElement('div');
    content.className = 'pr-content';
    viewContainer.appendChild(content);

    let currentTab = initial.tab;
    let vSub = initial.sub;

    function switchTab(tabId, push = true) {
        currentTab = tabId;
        if (push) history.pushState(null, '', `#/${lang}/pronomen/p/${tabId}`);
        nav.querySelectorAll('.pr-tab').forEach(b => b.classList.toggle('active', b.id === `pr-tab-${tabId}`));
        content.innerHTML = '';
        if (tabId === 'vrimmel') renderVrimmel(content);
        else if (tabId === 'vaerksted') renderVaerksted(content);
        else if (tabId === 'detektiv') renderDetektiv(content);
        else if (tabId === 'builder') renderBuilder(content);
        else if (tabId === 'kontekst') renderKontekst(content);
        else if (tabId === 'historier') renderHistorier(content);
    }

    // ==================================================================
    // FANE 1: Familiemiddagen (vrimlebillede)
    // ==================================================================
    let vFilter = 'alle';
    let vMarks = true;
    let vSelected = HOTSPOTS[0];

    function renderVrimmel(parent) {
        parent.innerHTML = '';
        const card = document.createElement('div');
        card.className = 'pr-card';

        const controls = document.createElement('div');
        controls.className = 'pr-stage-controls';
        const filters = document.createElement('div');
        filters.className = 'pr-filters';
        ['alle', 'subjekt', 'objekt', 'possessiv', 'refleksiv', 'oejenkontakt'].forEach(f => {
            const b = document.createElement('button');
            b.className = `pr-filter ${vFilter === f ? 'active' : ''}`;
            b.textContent = TXT['filter_' + f];
            b.onclick = () => { vFilter = f; renderVrimmel(parent); };
            filters.appendChild(b);
        });
        const marksBtn = document.createElement('button');
        marksBtn.className = 'pr-filter';
        marksBtn.textContent = vMarks ? TXT.hide_marks : TXT.show_marks;
        marksBtn.onclick = () => { vMarks = !vMarks; renderVrimmel(parent); };
        controls.appendChild(filters);
        controls.appendChild(marksBtn);
        card.appendChild(controls);

        const intro = document.createElement('p');
        intro.className = 'pr-instr';
        intro.innerHTML = `${TXT.vrimmel_intro}${trBlock('txt.vrimmel_intro')}`;
        card.appendChild(intro);

        const stage = document.createElement('div');
        stage.className = 'pr-stage';
        stage.innerHTML = img('assets/pronominer_familiemiddag_vrimmel.jpg', TXT.tab_vrimmel);
        const visible = HOTSPOTS.filter(h => vFilter === 'alle' || h.cat === vFilter);
        if (!visible.includes(vSelected)) vSelected = visible[0] || HOTSPOTS[0];

        visible.forEach((h, i) => {
            const pin = document.createElement('button');
            pin.className = `pr-pin ${vSelected.id === h.id ? 'active' : ''}`;
            pin.dataset.id = h.id;
            pin.style.left = `${h.x}%`;
            pin.style.top = `${h.y}%`;
            pin.innerHTML = `<span>${i + 1}</span>${vMarks ? `<span class="pr-pin-label">${h.label}</span>` : ''}`;
            pin.onclick = e => { e.stopPropagation(); showInspector(h, true); speak(plain(h.sentence)); };
            stage.appendChild(pin);
        });
        card.appendChild(stage);
        card.insertAdjacentHTML('beforeend', legendHTML());

        const inspector = document.createElement('div');
        inspector.className = 'pr-inspector';
        card.appendChild(inspector);
        parent.appendChild(card);

        function showInspector(h, scroll) {
            vSelected = h;
            stage.querySelectorAll('.pr-pin').forEach(p => p.classList.toggle('active', p.dataset.id === h.id));
            const idx = visible.findIndex(x => x.id === h.id);
            inspector.innerHTML = `
                <span class="pr-badge">${TXT['filter_' + h.cat]}</span>
                <h3>${h.label}${tr(`hs.${h.id}.label`) ? ` <span class="pr-trans" style="display:inline">(${tr(`hs.${h.id}.label`)})</span>` : ''}</h3>
                <p>${h.scene}</p>${trBlock(`hs.${h.id}.scene`)}
                <div class="pr-sentence-big">${mk(h.sentence)}</div>
                ${trBlock(`hs.${h.id}.sentence`)}
                <div class="pr-explain">${h.explain}${trBlock(`hs.${h.id}.explain`)}</div>
                <div class="pr-actions">
                    <button class="pr-btn ghost" id="pr-prev">← ${TXT.prev}</button>
                    <button class="pr-btn ghost" id="pr-listen">${icon('volume')} ${TXT.listen}</button>
                    <button class="pr-btn" id="pr-next">${TXT.next} →</button>
                </div>`;
            inspector.querySelector('#pr-listen').onclick = () => speak(plain(h.sentence));
            inspector.querySelector('#pr-prev').onclick = () => {
                const p = visible[(idx - 1 + visible.length) % visible.length];
                showInspector(p, true); speak(plain(p.sentence));
            };
            inspector.querySelector('#pr-next').onclick = () => {
                const n = visible[(idx + 1) % visible.length];
                showInspector(n, true); speak(plain(n.sentence));
            };
            if (scroll) inspector.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        showInspector(vSelected, false);
    }

    // ==================================================================
    // FANE 2: Aha-værkstedet
    // ==================================================================
    function renderVaerksted(parent) {
        parent.innerHTML = '';
        const subs = [TXT.sub_lys, TXT.sub_oejen, TXT.sub_ejer, TXT.sub_boom];
        const bar = document.createElement('div');
        bar.className = 'pr-subtabs';
        subs.forEach((label, i) => {
            const b = document.createElement('button');
            b.className = `pr-subtab ${vSub === i ? 'active' : ''}`;
            b.textContent = `${String.fromCharCode(97 + i)}) ${label}`;
            b.onclick = () => {
                vSub = i;
                history.pushState(null, '', `#/${lang}/pronomen/p/vaerksted/${i}`);
                renderVaerksted(parent);
            };
            bar.appendChild(b);
        });
        parent.appendChild(bar);
        const slot = document.createElement('div');
        parent.appendChild(slot);
        [renderLys, renderOejen, renderEjer, renderBoom][vSub](slot);
    }

    // a) Lyskeglen
    function renderLys(slot) {
        const card = document.createElement('div');
        card.className = 'pr-card';
        card.innerHTML = `
            <h2>${TXT.lys_title}</h2>${trBlock('txt.lys_title')}
            <ul class="pr-rule-list">
                <li>${TXT.lys_rule_1}${trBlock('txt.lys_rule_1')}</li>
                <li>${TXT.lys_rule_2}${trBlock('txt.lys_rule_2')}</li>
                <li>${TXT.lys_rule_3}${trBlock('txt.lys_rule_3')}</li>
            </ul>
            <div class="pr-img-row">
                ${img('pronominer_spotlight.png', 'Subjekt, objekt og possessiv i lyskeglen')}
                ${img('pronominer_objekt.png', 'Han gav ham et glas vand')}
            </div>`;
        slot.appendChild(card);

        const tryCard = document.createElement('div');
        tryCard.className = 'pr-card';
        tryCard.innerHTML = `<h3>${TXT.lys_try}</h3>${trBlock('txt.lys_try')}`;
        let light = 'a';
        let sceneIdx = 0;
        const scenesPick = document.createElement('div');
        scenesPick.className = 'pr-example-pick';
        LYS_SCENES.forEach((s, i) => {
            const b = document.createElement('button');
            b.className = 'pr-filter';
            b.textContent = s.label;
            b.onclick = () => { sceneIdx = i; draw(); };
            scenesPick.appendChild(b);
        });
        const persons = document.createElement('div');
        persons.className = 'pr-persons';
        const pa = document.createElement('div');
        pa.className = 'pr-person';
        pa.innerHTML = `Anders<small>${TXT.legend_S}</small>`;
        const pb = document.createElement('div');
        pb.className = 'pr-person';
        pb.innerHTML = `Maria<small>${TXT.legend_O}</small>`;
        persons.appendChild(pa);
        persons.appendChild(pb);
        const out = document.createElement('div');
        function draw() {
            scenesPick.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === sceneIdx));
            pa.classList.toggle('light', light === 'a');
            pb.classList.toggle('light', light === 'b');
            pa.querySelector('small').textContent = light === 'a' ? TXT.legend_S : TXT.legend_O;
            pb.querySelector('small').textContent = light === 'b' ? TXT.legend_S : TXT.legend_O;
            const s = LYS_SCENES[sceneIdx];
            const key = light === 'a' ? 'a' : 'b';
            out.innerHTML = `<div class="pr-sentence-big">${mk(s[key])}</div>${trBlock(`lys.${s.id}.${key}`)}`;
        }
        pa.onclick = () => { light = 'a'; draw(); speak(plain(LYS_SCENES[sceneIdx].a)); };
        pb.onclick = () => { light = 'b'; draw(); speak(plain(LYS_SCENES[sceneIdx].b)); };
        tryCard.appendChild(scenesPick);
        tryCard.appendChild(persons);
        tryCard.appendChild(out);
        tryCard.insertAdjacentHTML('beforeend', legendHTML(['S', 'O']));
        slot.appendChild(tryCard);
        draw();

        const tableCard = document.createElement('div');
        tableCard.className = 'pr-card';
        tableCard.innerHTML = `<h3>${TXT.lys_table_title}</h3>${trBlock('txt.lys_table_title')}${tableHTML(
            [TXT.table_person, TXT.table_subj, TXT.table_obj],
            PRON_TABLE.map(r => [r.person,
                `<span class="pr-role pr-role-S" data-role="S">${r.subj}</span>`,
                `<span class="pr-role pr-role-O" data-role="O">${r.obj}</span>`])
        )}`;
        slot.appendChild(tableCard);
    }

    // b) Øjenkontakt
    function renderOejen(slot) {
        const card = document.createElement('div');
        card.className = 'pr-card';
        card.innerHTML = `
            <h2>${TXT.oejen_title}</h2>${trBlock('txt.oejen_title')}
            <div class="pr-question">${TXT.oejen_rule_question}</div>${trBlock('txt.oejen_rule_question')}
            <ul class="pr-rule-list">
                <li>${TXT.oejen_rule_yes}${trBlock('txt.oejen_rule_yes')}</li>
                <li>${TXT.oejen_rule_no}${trBlock('txt.oejen_rule_no')}</li>
            </ul>
            <div class="pr-img-row">${img('pronominer_guide.png', 'Jeg, du, han/hun, vi, I og de')}</div>`;
        slot.appendChild(card);

        const tryCard = document.createElement('div');
        tryCard.className = 'pr-card';
        tryCard.innerHTML = `<h3>${TXT.oejen_try}</h3>${trBlock('txt.oejen_try')}`;
        let near = true;
        const toggles = document.createElement('div');
        toggles.className = 'pr-toggle-row';
        const bNear = document.createElement('button');
        bNear.textContent = TXT.oejen_near;
        const bFar = document.createElement('button');
        bFar.textContent = TXT.oejen_far;
        toggles.appendChild(bNear);
        toggles.appendChild(bFar);
        const out = document.createElement('div');
        function draw() {
            bNear.className = `pr-subtab ${near ? 'active' : ''}`;
            bFar.className = `pr-subtab ${!near ? 'active' : ''}`;
            out.innerHTML = OEJEN_SCENES.map(s => {
                const key = near ? 'near' : 'far';
                return `<div class="pr-sentence-big">${mk(s[key])}</div>${trBlock(`oejen.${s.id}.${key}`)}`;
            }).join('');
        }
        bNear.onclick = () => { near = true; draw(); };
        bFar.onclick = () => { near = false; draw(); };
        tryCard.appendChild(toggles);
        tryCard.appendChild(out);
        slot.appendChild(tryCard);
        draw();
    }

    // c) Ejer-nøglen
    function renderEjer(slot) {
        const card = document.createElement('div');
        card.className = 'pr-card';
        card.innerHTML = `
            <h2>${TXT.ejer_title}</h2>${trBlock('txt.ejer_title')}
            <h3>${TXT.ejer_step1}</h3>${trBlock('txt.ejer_step1')}
            <p>${TXT.ejer_step1_text}</p>${trBlock('txt.ejer_step1_text')}
            ${tableHTML([TXT.ejer_col_owner, TXT.ejer_col_word], OWNER_TABLE.map(r => [r.owner, r.word]))}
            <h3 style="margin-top:1.2rem">${TXT.ejer_step2}</h3>${trBlock('txt.ejer_step2')}
            <p>${TXT.ejer_step2_text}</p>${trBlock('txt.ejer_step2_text')}
            ${tableHTML(['', TXT.ejer_en, TXT.ejer_et, TXT.ejer_flere], [
                ['jeg', 'min bil', 'mit hus', 'mine børn'],
                ['du', 'din bil', 'dit hus', 'dine børn'],
                ['han / hun', 'sin bil', 'sit hus', 'sine børn'],
            ])}
            <div class="pr-img-row">
                ${img('pronominer_possessiv.png', 'Hendes hund, vores træ')}
                ${img('ejefald_guide_voksne.jpg', 'Min, hendes og vores')}
            </div>`;
        slot.appendChild(card);

        const step3 = document.createElement('div');
        step3.className = 'pr-card';
        step3.innerHTML = `
            <h3>${TXT.ejer_step3}</h3>${trBlock('txt.ejer_step3')}
            <p>${TXT.ejer_step3_text}</p>${trBlock('txt.ejer_step3_text')}
            <p><strong>${TXT.ejer_never_sin}</strong></p>${trBlock('txt.ejer_never_sin')}
            <div class="pr-img-row">${img('assets/pronominer_sin_hans.jpg', 'Peter vasker sin bil / Peter vasker hans bil')}</div>
            <h3>${TXT.ejer_try}</h3>${trBlock('txt.ejer_try')}`;
        let self = true;
        let idx = 0;
        const pick = document.createElement('div');
        pick.className = 'pr-example-pick';
        const toggles = document.createElement('div');
        toggles.className = 'pr-toggle-row';
        const bSelf = document.createElement('button');
        const bOther = document.createElement('button');
        toggles.appendChild(bSelf);
        toggles.appendChild(bOther);
        const out = document.createElement('div');
        EJER_SCENES.forEach((s, i) => {
            const b = document.createElement('button');
            b.className = 'pr-filter';
            b.textContent = i + 1;
            b.onclick = () => { idx = i; draw(); };
            pick.appendChild(b);
        });
        function draw() {
            const s = EJER_SCENES[idx];
            pick.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === idx));
            bSelf.className = `pr-subtab ${self ? 'active' : ''}`;
            bOther.className = `pr-subtab ${!self ? 'active' : ''}`;
            bSelf.textContent = s.selfLabel;
            bOther.textContent = s.otherLabel;
            const key = self ? 'self' : 'other';
            out.innerHTML = `<div class="pr-sentence-big">${mk(s[key])}</div>
                ${trBlock(`ejer.${s.id}.${key}`)}
                ${trBlock(`ejer.${s.id}.${key}Label`)}`;
        }
        bSelf.onclick = () => { self = true; draw(); speak(plain(EJER_SCENES[idx].self)); };
        bOther.onclick = () => { self = false; draw(); speak(plain(EJER_SCENES[idx].other)); };
        step3.appendChild(pick);
        step3.appendChild(toggles);
        step3.appendChild(out);
        step3.insertAdjacentHTML('beforeend', legendHTML(['P']));
        slot.appendChild(step3);
        draw();
    }

    // d) Boomerangen
    function renderBoom(slot) {
        const card = document.createElement('div');
        card.className = 'pr-card';
        card.innerHTML = `
            <h2>${TXT.boom_title}</h2>${trBlock('txt.boom_title')}
            <ul class="pr-rule-list">
                <li>${TXT.boom_rule_1}${trBlock('txt.boom_rule_1')}</li>
                <li>${TXT.boom_rule_2}${trBlock('txt.boom_rule_2')}</li>
                <li>${TXT.boom_rule_3}${trBlock('txt.boom_rule_3')}</li>
            </ul>
            <div class="pr-img-row">
                ${img('assets/pronominer_sig_ham.jpg', 'Peter barberer sig / Peter barberer ham')}
                ${img('refleksiv_guide.jpg', 'Jeg skynder mig til toget')}
            </div>
            ${tableHTML([TXT.table_person, TXT.table_obj, TXT.table_refl],
                PRON_TABLE.map(r => [r.person, r.obj, `<span class="pr-role pr-role-R" data-role="R">${r.refl}</span>`]))}
            <p style="margin-top:1rem"><strong>${TXT.boom_fixed}</strong> ${TXT.boom_fixed_list}</p>${trBlock('txt.boom_fixed')}${trBlock('txt.boom_fixed_list')}`;
        slot.appendChild(card);

        const tryCard = document.createElement('div');
        tryCard.className = 'pr-card';
        tryCard.innerHTML = `<h3>${TXT.boom_try}</h3>${trBlock('txt.boom_try')}`;
        let self = true;
        const toggles = document.createElement('div');
        toggles.className = 'pr-toggle-row';
        const bSelf = document.createElement('button');
        bSelf.textContent = TXT.boom_self;
        const bOther = document.createElement('button');
        bOther.textContent = TXT.boom_other;
        toggles.appendChild(bSelf);
        toggles.appendChild(bOther);
        const out = document.createElement('div');
        function draw() {
            bSelf.className = `pr-subtab ${self ? 'active' : ''}`;
            bOther.className = `pr-subtab ${!self ? 'active' : ''}`;
            const key = self ? 'self' : 'other';
            out.innerHTML = BOOM_SCENES.map(s =>
                `<div class="pr-sentence-big">${mk(s[key])}</div>${trBlock(`boom.${s.id}.${key}`)}`).join('');
        }
        bSelf.onclick = () => { self = true; draw(); };
        bOther.onclick = () => { self = false; draw(); };
        tryCard.appendChild(toggles);
        tryCard.appendChild(out);
        tryCard.insertAdjacentHTML('beforeend', legendHTML(['R', 'O']));
        slot.appendChild(tryCard);
        draw();
    }

    // ==================================================================
    // FANE 3: Detektiven
    // ==================================================================
    let detIdx = 0;
    let detScore = 0;

    function renderDetektiv(parent) {
        parent.innerHTML = '';
        const card = document.createElement('div');
        card.className = 'pr-card';
        parent.appendChild(card);

        if (detIdx >= DETEKTIV.length) {
            card.innerHTML = `<h2>${TXT.det_done}</h2>
                <p class="pr-sentence-big">${detScore} / ${DETEKTIV.length} ${TXT.det_score}</p>
                <div class="pr-actions"><button class="pr-btn" id="pr-det-restart">${icon('refresh')} ${TXT.det_restart}</button></div>`;
            card.querySelector('#pr-det-restart').onclick = () => { detIdx = 0; detScore = 0; renderDetektiv(parent); };
            return;
        }

        const d = DETEKTIV[detIdx];
        card.innerHTML = `
            <div class="pr-progress">${TXT.det_riddle} ${detIdx + 1} / ${DETEKTIV.length}</div>
            <p class="pr-instr">${TXT.det_intro}${trBlock('txt.det_intro')}</p>
            <p style="color:#fff;font-weight:700;font-size:1.1rem">${d.situation}</p>${trBlock(`det.${d.id}.situation`)}
            <div class="pr-sentence-big" id="pr-det-sentence"></div>
            <div id="pr-det-fb"></div>
            <div class="pr-actions" id="pr-det-actions"></div>`;
        const sentenceEl = card.querySelector('#pr-det-sentence');
        const fb = card.querySelector('#pr-det-fb');
        const actions = card.querySelector('#pr-det-actions');
        let mistakes = 0;
        const { frag } = buildBlanks(d.text, (b) => {
            if (b.state === 'ok') {
                if (mistakes === 0) detScore++;
                fb.innerHTML = `<div class="pr-feedback good">${TXT.det_correct}${trBlock(`det.${d.id}.text`)}</div>`;
                b.sel.disabled = true;
                speak(plain(d.text));
                actions.innerHTML = `<button class="pr-btn" id="pr-det-next">${TXT.det_next} →</button>`;
                actions.querySelector('#pr-det-next').onclick = () => { detIdx++; renderDetektiv(parent); };
            } else if (b.state === 'bad') {
                mistakes++;
                fb.innerHTML = `<div class="pr-feedback wrong">${hintHTML(b.rule)}</div>`;
            } else {
                fb.innerHTML = '';
            }
        });
        sentenceEl.appendChild(frag);
    }

    // ==================================================================
    // FANE 4: Sætningsbyggeren
    // ==================================================================
    let bldIdx = 0;

    function renderBuilder(parent) {
        parent.innerHTML = '';
        const card = document.createElement('div');
        card.className = 'pr-card';
        parent.appendChild(card);

        if (bldIdx >= BUILDER_SCENES.length) {
            card.innerHTML = `<h2>${TXT.builder_done}</h2>${trBlock('txt.builder_done')}
                <div class="pr-actions"><button class="pr-btn" id="pr-bld-restart">${icon('refresh')} ${TXT.builder_restart}</button></div>`;
            card.querySelector('#pr-bld-restart').onclick = () => { bldIdx = 0; renderBuilder(parent); };
            return;
        }

        const s = BUILDER_SCENES[bldIdx];
        const fa = BUILDER_FORMS[s.a.t];
        const fb2 = BUILDER_FORMS[s.b.t];
        const options = shuffle(Array.from(new Set([fa.s, fa.o, fb2.s, fb2.o])));

        card.innerHTML = `
            <div class="pr-progress">${bldIdx + 1} / ${BUILDER_SCENES.length}</div>
            <p class="pr-instr">${TXT.builder_intro}${trBlock('txt.builder_intro')}</p>
            <div class="pr-context-line">${mk(`[[S:${s.a.name}]]`)} ${s.verb} ${mk(`[[O:${s.b.name}]]`)} ${s.rest}.</div>
            <div class="pr-build-line" id="pr-bld-line"></div>
            <div id="pr-bld-fb"></div>
            <div class="pr-actions" id="pr-bld-actions"></div>`;

        function makeSelect(label) {
            const sel = document.createElement('select');
            sel.className = 'pr-select';
            sel.setAttribute('aria-label', label);
            const d = document.createElement('option');
            d.value = '';
            d.textContent = `${label}...`;
            sel.appendChild(d);
            options.forEach(o => {
                const op = document.createElement('option');
                op.value = o;
                op.textContent = o;
                sel.appendChild(op);
            });
            return sel;
        }
        const selS = makeSelect(TXT.builder_slot_subject);
        const selO = makeSelect(TXT.builder_slot_object);
        const line = card.querySelector('#pr-bld-line');
        line.appendChild(selS);
        line.appendChild(document.createTextNode(` ${s.verb} `));
        line.appendChild(selO);
        line.appendChild(document.createTextNode(` ${s.rest}.`));

        const fbEl = card.querySelector('#pr-bld-fb');
        const actions = card.querySelector('#pr-bld-actions');
        const checkBtn = document.createElement('button');
        checkBtn.className = 'pr-btn';
        checkBtn.textContent = TXT.builder_check;
        actions.appendChild(checkBtn);

        checkBtn.onclick = () => {
            if (!selS.value || !selO.value) return;
            const okS = selS.value === fa.s;
            const okO = selO.value === fb2.o;
            selS.classList.toggle('ok', okS); selS.classList.toggle('bad', !okS);
            selO.classList.toggle('ok', okO); selO.classList.toggle('bad', !okO);
            if (okS && okO) {
                selS.disabled = true; selO.disabled = true;
                const full = `${cap(fa.s)} ${s.verb} ${fb2.o} ${s.rest}.`;
                speak(full);
                fbEl.innerHTML = `<div class="pr-feedback good">${TXT.builder_correct}</div>`;
                actions.innerHTML = `
                    <button class="pr-btn ghost" id="pr-bld-swap">${icon('compare')} ${TXT.builder_light_move}</button>
                    <button class="pr-btn" id="pr-bld-next">${TXT.builder_next} →</button>`;
                actions.querySelector('#pr-bld-swap').onclick = () => {
                    const sw = `[[S:${cap(fb2.s)}]] ${s.verb} [[O:${fa.o}]] ${s.rest}.`;
                    fbEl.innerHTML = `<div class="pr-feedback good">${TXT.builder_swapped}${trBlock('txt.builder_swapped')}
                        <div class="pr-sentence-big">${mk(sw)}</div></div>`;
                    speak(plain(sw));
                };
                actions.querySelector('#pr-bld-next').onclick = () => { bldIdx++; renderBuilder(parent); };
            } else {
                fbEl.innerHTML = `<div class="pr-feedback wrong">${TXT.builder_wrong}${trBlock('txt.builder_wrong')}</div>`;
            }
        };
    }

    // ==================================================================
    // FANE 5: Kontekst-testen
    // ==================================================================
    function renderKontekst(parent) {
        parent.innerHTML = '';
        const head = document.createElement('div');
        head.className = 'pr-card';
        head.innerHTML = `<p class="pr-instr" style="margin:0">${TXT.ctx_intro}${trBlock('txt.ctx_intro')}</p>
            <div class="pr-progress" id="pr-ctx-score" style="margin:0.6rem 0 0"></div>`;
        parent.appendChild(head);
        const scoreEl = head.querySelector('#pr-ctx-score');
        let solved = 0;
        function updateScore() { scoreEl.textContent = `${solved} / ${KONTEKST.length}`; }
        updateScore();

        KONTEKST.forEach(k => {
            const card = document.createElement('div');
            card.className = 'pr-card';
            card.innerHTML = `<div class="pr-place">${k.place}</div>${trBlock(`ctx.${k.id}.place`)}`;
            const allBlanks = [];
            const fbEl = document.createElement('div');
            let done = false;
            k.lines.forEach((l, i) => {
                const row = document.createElement('div');
                row.className = 'pr-dialog-line';
                const sp = document.createElement('span');
                sp.className = 'pr-speaker';
                sp.textContent = l.sp + ':';
                row.appendChild(sp);
                const { frag, blanks } = buildBlanks(l.text, (b) => {
                    if (b.state === 'bad') {
                        fbEl.innerHTML = `<div class="pr-feedback wrong">${hintHTML(b.rule)}</div>`;
                    } else {
                        fbEl.innerHTML = '';
                    }
                    if (!done && allBlanks.every(x => x.state === 'ok')) {
                        done = true;
                        solved++;
                        updateScore();
                        card.classList.add('pr-solved');
                        const lines = k.lines.map((ll, j) => trBlock(`ctx.${k.id}.l${j}`)).join('');
                        fbEl.innerHTML = `<div class="pr-feedback good">${TXT.det_correct}${lines}</div>`;
                    }
                });
                allBlanks.push(...blanks);
                row.appendChild(frag);
                card.appendChild(row);
            });
            card.appendChild(fbEl);
            parent.appendChild(card);
        });
    }

    // ==================================================================
    // FANE 6: Historierne
    // ==================================================================
    let storyId = 'A';

    function renderHistorier(parent) {
        parent.innerHTML = '';
        const picker = document.createElement('div');
        picker.className = 'pr-subtabs';
        HISTORIER.forEach(s => {
            const b = document.createElement('button');
            b.className = `pr-subtab ${storyId === s.id ? 'active' : ''}`;
            b.textContent = `${TXT['story_level_' + s.id]}: ${s.title}`;
            b.onclick = () => { storyId = s.id; renderHistorier(parent); };
            picker.appendChild(b);
        });
        parent.appendChild(picker);

        const story = HISTORIER.find(s => s.id === storyId);
        const card = document.createElement('div');
        card.className = 'pr-card';
        card.innerHTML = `<h2>${story.title}</h2>${trBlock(`story.${story.id}.title`)}
            <p class="pr-instr">${TXT.story_intro}${trBlock('txt.story_intro')}</p>`;
        const all = [];
        const transSlots = [];
        story.paragraphs.forEach((p, i) => {
            const para = document.createElement('div');
            para.className = 'pr-story-p';
            const { frag, blanks } = buildBlanks(p);
            all.push(...blanks);
            para.appendChild(frag);
            card.appendChild(para);
            const slot = document.createElement('div');
            transSlots.push({ slot, key: `story.${story.id}.p${i}` });
            card.appendChild(slot);
        });
        const result = document.createElement('div');
        const actions = document.createElement('div');
        actions.className = 'pr-actions';
        const check = document.createElement('button');
        check.className = 'pr-btn';
        check.textContent = TXT.story_check;
        const retry = document.createElement('button');
        retry.className = 'pr-btn ghost';
        retry.innerHTML = `${icon('refresh')} ${TXT.story_retry}`;
        retry.onclick = () => renderHistorier(parent);
        actions.appendChild(check);
        actions.appendChild(retry);
        card.appendChild(actions);
        card.appendChild(result);
        parent.appendChild(card);

        check.onclick = () => {
            let ok = 0;
            const wrongRules = new Set();
            all.forEach(b => {
                const good = b.sel.value === b.ans;
                b.state = good ? 'ok' : 'bad';
                b.sel.classList.toggle('ok', good);
                b.sel.classList.toggle('bad', !good);
                if (good) ok++; else wrongRules.add(b.rule);
            });
            const hints = Array.from(wrongRules).map(r => `<li>${hintHTML(r)}</li>`).join('');
            result.innerHTML = `<div class="pr-feedback ${wrongRules.size ? 'wrong' : 'good'}">
                <strong>${ok} / ${all.length} ${TXT.story_result}</strong>
                ${hints ? `<ul class="pr-rule-list" style="margin-top:0.6rem">${hints}</ul>` : ''}</div>`;
            transSlots.forEach(t => { t.slot.innerHTML = trBlock(t.key); });
        };
    }

    // ------------------------------------------------------------------
    container.appendChild(viewContainer);
    switchTab(initial.tab, false);
}
