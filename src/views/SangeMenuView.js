import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';

/**
 * SangeMenuView - Hub for danske sange og deres interaktive vrimlebilleder.
 * Præsenteret i samme overskuelige design som top100_substantiver.
 */
export function renderSangeMenuView(container, navigateFn) {
    container.innerHTML = '';

    const isEn = getLang() === 'en';
    const isZh = getLang() === 'zh';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sange-hub';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${isEn ? 'Back' : (isZh ? '返回 (Tilbage)' : 'Tilbage')}`;
    backBtn.onclick = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            navigateFn('main');
        }
    };
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Styling
    const style = document.createElement('style');
    style.textContent = `
        .sange-hub {
            --song-bg: #0b1329;
            --song-surface: #0f1d3a;
            --song-surface-hover: #162a52;
            --song-surface-input: #081124;
            --song-border: #1e3a6a;
            --song-border-light: #2b5192;
            --song-primary: #38bdf8;
            --song-primary-hover: #0ea5e9;
            --song-text: #FFFFFF;
            --song-text-muted: #cbd5e1;
            --song-text-subtle: #93c5fd;

            max-width: 1100px;
            margin: 0 auto;
            padding: 1rem 1rem 4rem;
            color: #f8fafc;
            box-sizing: border-box;
        }

        .sange-hub .ds-icon-emoji {
            display: none !important;
        }
        .sange-hub .ds-icon-svg {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            vertical-align: -0.15em;
            color: currentColor;
        }
        .sange-hub .ds-icon-svg svg {
            display: inline-block;
            vertical-align: middle;
            stroke: currentColor;
        }

        .hub-hero {
            text-align: center;
            margin-bottom: 2.2rem;
        }

        .hub-hero h1 {
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            font-weight: 900;
            margin-bottom: 0.6rem;
            color: #FFFFFF !important;
            letter-spacing: -0.02em;
        }

        .hub-hero p {
            color: #e2e8f0 !important;
            font-size: clamp(0.95rem, 2vw, 1.15rem);
            max-width: 760px;
            margin: 0 auto 1.3rem;
            line-height: 1.6;
        }

        .hub-facts-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid #38bdf8;
            color: #7dd3fc;
            padding: 0.45rem 1.2rem;
            border-radius: 999px;
            font-size: 0.9rem;
            font-weight: 800;
            box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
        }

        .hub-scenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }

        .scene-card {
            background: var(--song-surface, #0f1d3a);
            border: 1.5px solid var(--song-border, #1e3a6a);
            border-radius: 24px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: inherit;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        }

        .scene-card:hover {
            transform: translateY(-8px);
            border-color: var(--song-primary, #38bdf8);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.3);
        }

        .scene-card-img-wrap {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            height: auto;
            overflow: hidden;
            background: var(--song-surface-input, #081124);
        }

        .scene-card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            display: block;
        }

        .scene-card:hover .scene-card-img {
            transform: scale(1.06);
        }

        .scene-pill-badge {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: rgba(8, 17, 36, 0.9);
            border: 1px solid var(--song-border-light, #2b5192);
            backdrop-filter: blur(8px);
            padding: 0.35rem 0.8rem;
            border-radius: 20px;
            font-size: 0.78rem;
            font-weight: 800;
            color: #f1f5f9;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .badge-scene-enebaer {
            border-color: #22c55e;
            color: #86efac;
        }

        .badge-scene-godmorgen {
            border-color: #f59e0b;
            color: #fde047;
        }

        .scene-card-content {
            padding: 1.4rem 1.5rem 1.6rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 1.2rem;
            flex-grow: 1;
        }

        .scene-card-content h3 {
            font-size: 1.35rem;
            font-weight: 800;
            margin: 0;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            gap: 0.55rem;
            line-height: 1.35;
        }

        .scene-action-btn {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: #ffffff;
            border: none;
            padding: 0.85rem 1.4rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 1rem;
            text-align: center;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(2, 132, 199, 0.35);
        }

        .scene-card:hover .scene-action-btn {
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            box-shadow: 0 6px 20px rgba(2, 132, 199, 0.55);
            transform: scale(1.02);
        }

        @media (max-width: 640px) {
            .sange-hub {
                padding: 0.75rem 0.65rem 3.5rem;
            }
            .hub-scenes-grid {
                grid-template-columns: 1fr;
                gap: 1.2rem;
            }
            .scene-card-img-wrap {
                aspect-ratio: 16 / 9;
                height: auto;
            }
            .scene-card-content {
                padding: 1.1rem 1rem;
            }
            .scene-card-content h3 {
                font-size: 1.2rem;
            }
            .scene-card-content p {
                font-size: 0.88rem;
                margin-bottom: 1rem;
            }
            .scene-action-btn {
                padding: 0.75rem 1.1rem;
                font-size: 0.92rem;
            }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'hub-hero';
    hero.innerHTML = `
        <h1>${isEn ? 'Danish Songs' : (isZh ? '丹麦经典歌曲 (Danske sange)' : 'Danske sange')}</h1>
        <p>${
            isEn 
                ? 'Learn Danish through beloved songs with rich, interactive wimmelbilder, pronunciation rhythm, word hunting, and vocabulary training.'
                : (isZh
                    ? '通过丹麦脍炙人口的经典名曲与大型互动全景图（Wimmelbild）学习丹麦语：掌握日常生活做家务、星期与连词，或者遨游丹麦地理海岸线与发音节律。'
                    : 'Lær dansk gennem elskede sange med interaktive vrimlebilleder, udtale, rytme og sprogtræning.')
        }</p>
        <div class="hub-facts-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            <span>${isEn ? '2 interactive song scenes with wimmelbilder' : '2 sange med hver sit vrimlebillede · Billedjagt · Udtale & Grammatik'}</span>
        </div>
    `;
    viewContainer.appendChild(hero);

    // Grid of the two song scenes
    const grid = document.createElement('div');
    grid.className = 'hub-scenes-grid';

    // 1. Song 1: Så går vi rundt om en enebærbusk
    const cardEnebaer = document.createElement('div');
    cardEnebaer.className = 'scene-card';
    cardEnebaer.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/sang_enebaerbusk_vrimmel.jpg" alt="Så går vi rundt om en enebærbusk vrimlebillede" class="scene-card-img">
            <div class="scene-pill-badge badge-scene-enebaer">
                ${renderDsIcon('volume', '', { size: 14 })} ${isEn ? 'DU1 · Module 4 · Household care' : (isZh ? 'DU1 第4级 · 家务劳动与星期' : 'DU1 · Modul 4 · Husarbejde & Ugens dage')}
            </div>
        </div>
        <div class="scene-card-content">
            <h3>
                ${renderDsIcon('volume', '', { size: 24 })}
                <span>Så går vi rundt om en enebærbusk</span>
            </h3>
            <button type="button" class="scene-action-btn">
                ${isEn ? 'Explore song scene' : (isZh ? '开启歌曲与寻宝练习' : 'Udforsk sangen')} →
            </button>
        </div>
    `;
    cardEnebaer.onclick = () => navigateFn('sang_enebaerbusk');
    grid.appendChild(cardEnebaer);

    // 2. Song 2: Godmorgen, lille land
    const cardGodmorgen = document.createElement('div');
    cardGodmorgen.className = 'scene-card';
    cardGodmorgen.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/sang_godmorgen_lille_land_vrimmel.jpg" alt="Godmorgen, lille land vrimlebillede" class="scene-card-img">
            <div class="scene-pill-badge badge-scene-godmorgen">
                ${renderDsIcon('compass', '', { size: 14 })} ${isEn ? 'Folk High School Songbook · Geography' : (isZh ? '民众歌集 #24 · 丹麦地理名胜' : 'Højskolesangbogen · Danmarks geografi')}
            </div>
        </div>
        <div class="scene-card-content">
            <h3>
                ${renderDsIcon('compass', '', { size: 24 })}
                <span>Godmorgen, lille land</span>
            </h3>
            <button type="button" class="scene-action-btn">
                ${isEn ? 'Explore song scene' : (isZh ? '开启歌曲与全景探索' : 'Udforsk sangen')} →
            </button>
        </div>
    `;
    cardGodmorgen.onclick = () => navigateFn('sang_godmorgen_lille_land');
    grid.appendChild(cardGodmorgen);

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
