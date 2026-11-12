import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * GrammatikSansningView - "Grammatik og min sansning af verdenen"
 * En fænomenologisk overflade, der samler dansk grammatik under
 * den fundamentale sanselige dikotomi:
 *  🔵 VÆREN & STILSTAND (Tilstand i Ro)
 *  🟠 TILBLIVELSE & FORVANDLING (Bevægelse & Kraft)
 */
export function renderGrammatikSansningView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container grammatik-sansning-view';

    const style = document.createElement('style');
    style.textContent = `
        .grammatik-sansning-view {
            max-width: 1180px;
            margin: 0 auto;
            padding: 1rem 1.25rem 5rem;
            color: #f8fafc;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }

        .gs-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
            gap: 0.75rem;
        }

        .gs-back-btn {
            background: #5C0812;
            border: 1.5px solid #851825;
            color: #ffffff;
            padding: 0.55rem 1.1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .gs-back-btn:hover {
            border-color: #FFC9CD;
            background: #73101C;
            transform: translateX(-2px);
        }

        /* Hero */
        .gs-hero {
            text-align: center;
            margin-bottom: 2rem;
            position: relative;
        }
        .gs-hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(92, 8, 18, 0.85);
            border: 1px solid #851825;
            border-radius: 999px;
            padding: 0.35rem 1rem;
            font-size: 0.82rem;
            font-weight: 800;
            color: #FFC9CD;
            letter-spacing: 0.04em;
            margin-bottom: 0.75rem;
        }
        .gs-hero h1 {
            font-size: 2.3rem;
            font-weight: 900;
            margin: 0 0 0.5rem;
            letter-spacing: -0.02em;
            color: #ffffff;
        }
        .gs-hero p {
            color: #FFC9CD;
            font-size: 1.05rem;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.55;
        }

        /* Pedagogical Guide (Accordion) */
        .gs-guide-card {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 20px;
            padding: 1.3rem 1.5rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }
        .gs-guide-summary {
            cursor: pointer;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            font-weight: 800;
            font-size: 1.1rem;
            color: #ffffff;
        }
        .gs-guide-summary::-webkit-details-marker { display: none; }
        .gs-guide-content {
            margin-top: 1.1rem;
            padding-top: 1.1rem;
            border-top: 1px solid #851825;
            color: #FFC9CD;
            font-size: 0.95rem;
            line-height: 1.6;
        }
        .gs-guide-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.1rem;
            margin-top: 1rem;
        }
        .gs-guide-col {
            background: #4A040B;
            border-radius: 14px;
            padding: 1rem 1.1rem;
            border: 1px solid #851825;
        }
        .gs-guide-col h3 {
            margin: 0 0 0.5rem;
            font-size: 1rem;
            font-weight: 800;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }

        /* 4 Bodily Realms / Hovedflader Grid */
        .gs-realms-section {
            margin-bottom: 2.2rem;
        }
        .gs-section-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 1rem;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .gs-section-header h2 {
            font-size: 1.35rem;
            font-weight: 800;
            margin: 0;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .gs-section-header p {
            margin: 0.25rem 0 0;
            color: #FFC9CD;
            font-size: 0.88rem;
        }
        .gs-hovedflader-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.1rem;
        }
        .gs-hovedflade-card {
            border-radius: 18px;
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.25s ease;
            position: relative;
            background: #5C0812;
            border: 1.5px solid #851825;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
        }
        .gs-hovedflade-card.active-flade {
            border-color: #38bdf8;
            background: linear-gradient(165deg, rgba(14, 116, 144, 0.35) 0%, #5C0812 100%);
            box-shadow: 0 12px 30px rgba(56, 189, 248, 0.22);
            cursor: pointer;
        }
        .gs-hovedflade-card.active-flade:hover {
            transform: translateY(-4px);
            border-color: #7dd3fc;
            box-shadow: 0 16px 36px rgba(56, 189, 248, 0.35);
        }
        .gs-hf-tag {
            font-size: 0.72rem;
            font-weight: 800;
            padding: 0.22rem 0.55rem;
            border-radius: 6px;
            letter-spacing: 0.04em;
            display: inline-block;
            margin-bottom: 0.6rem;
            align-self: flex-start;
        }
        .gs-hf-tag.ready {
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
            border: 1px solid rgba(34, 197, 94, 0.4);
        }
        .gs-hf-tag.planned {
            background: rgba(255, 201, 205, 0.12);
            color: #FFC9CD;
            border: 1px solid #851825;
        }
        .gs-hf-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 0.35rem;
        }
        .gs-hf-sub {
            font-size: 0.84rem;
            color: #FFC9CD;
            margin: 0 0 0.8rem;
            line-height: 1.45;
        }
        .gs-hf-bullets {
            list-style: none;
            padding: 0;
            margin: 0 0 1rem;
            font-size: 0.8rem;
            color: #FFC9CD;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
        }
        .gs-hf-bullets li::before {
            content: "• ";
            color: #38bdf8;
            font-weight: bold;
        }
        .gs-hf-btn {
            background: #FF4D5E;
            color: #ffffff;
            border: none;
            padding: 0.6rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.86rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .gs-hf-btn:hover {
            background: #ff6b7a;
            transform: scale(1.02);
        }
    `;
    viewContainer.appendChild(style);

    // 1. Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'gs-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'gs-back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || 'Tilbage til forsiden'}`;
    backBtn.onclick = () => navigateFn('dagens_opgave');
    topBar.appendChild(backBtn);

    const langBadge = document.createElement('span');
    langBadge.className = 'gs-hero-badge';
    langBadge.innerHTML = `Sansegrammatik • DU1 og DU2`;
    topBar.appendChild(langBadge);

    viewContainer.appendChild(topBar);

    // 2. Hero Header
    const hero = document.createElement('div');
    hero.className = 'gs-hero';
    hero.innerHTML = `
        <div class="gs-hero-badge">Fænomenologisk og sanselig grammatik</div>
        <h1>Grammatik og min sansning af verden</h1>
        <p>
            Udforsk det danske sprog gennem kroppens fire fundamentale måder at sanse virkeligheden på.
            Vælg en hovedflade nedenunder for at opleve de interaktive vrimlebilleder og træningsbaner.
        </p>
    `;
    viewContainer.appendChild(hero);

    // 5. De 4 Kropslige Hovedflader (Det store arkitektur-overblik)
    const realmsSection = document.createElement('div');
    realmsSection.className = 'gs-realms-section';
    realmsSection.innerHTML = `
        <div class="gs-section-header">
            <div>
                <h2>Appens 4 kropslige hovedflader</h2>
                <p>Udforsk grammatikken gennem kroppens fire primære sansninger af virkeligheden.</p>
            </div>
        </div>
        <div class="gs-hovedflader-grid">
            <div class="gs-hovedflade-card active-flade" id="btn-open-flade1">
                <div>
                    <span class="gs-hf-tag ready">Aktiv</span>
                    <h3 class="gs-hf-title">Flade 1: Dynamik og form</h3>
                    <p class="gs-hf-sub">Inde i tingen og kroppen: Stilstand vs. forvandling.</p>
                    <ul class="gs-hf-bullets">
                        <li>Være vs. blive (verbernes grundkerne)</li>
                        <li>Ligge vs. lægge (positionsverber)</li>
                        <li>Form og masse (utællelig vs. tællelig)</li>
                        <li>Har vs. er i førnutid (motoren vs. døren)</li>
                        <li>Aspekt, måde og diatese (dvælen vs. fart)</li>
                    </ul>
                </div>
                <button class="gs-hf-btn">
                    Åbn hovedflade 1 →
                </button>
            </div>

            <div class="gs-hovedflade-card">
                <div>
                    <span class="gs-hf-tag planned">Næste fase</span>
                    <h3 class="gs-hf-title">Flade 2: Rum, tid og relationer</h3>
                    <p class="gs-hf-sub">Hvor står mit kamera? Nærhed i hånden vs. afstand i kikkerten.</p>
                    <ul class="gs-hf-bullets">
                        <li>I vs. på (hulen vs. fladen)</li>
                        <li>Denne vs. den (hånden vs. pegefingeren)</li>
                        <li>Nutid vs. datid (scenen vs. kikkerten)</li>
                        <li>Hjemme vs. hjem (zonen vs. tærsklen)</li>
                        <li>Sin vs. hans (kroppens intime sfære)</li>
                    </ul>
                </div>
            </div>

            <div class="gs-hovedflade-card">
                <div>
                    <span class="gs-hf-tag planned">Planlagt</span>
                    <h3 class="gs-hf-title">Flade 3: Modalitet og evidens</h3>
                    <p class="gs-hf-sub">Hvor fast er grunden under mine fødder? Vished vs. tvivl.</p>
                    <ul class="gs-hf-bullets">
                        <li>Klippegrund vs. tynd is (sikkert, måske)</li>
                        <li>Evidensens kilde: nok, jo, vel, vist</li>
                        <li>Kroppens mærken: synes vs. tror</li>
                        <li>Modalverbernes pres: skal, vil, må, kan</li>
                    </ul>
                </div>
            </div>

            <div class="gs-hovedflade-card">
                <div>
                    <span class="gs-hf-tag planned">Planlagt</span>
                    <h3 class="gs-hf-title">Flade 4: Kraft og tekstflow</h3>
                    <p class="gs-hf-sub">Hængslerne mellem scenerne. Kausalitet og sætningsdans.</p>
                    <ul class="gs-hf-bullets">
                        <li>Fri bane: fordi (kilde) vs. derfor (fremdrift)</li>
                        <li>Modstand: selvom (muren) vs. alligevel (gennembrud)</li>
                        <li>Betingelser: hvis (springbræt) vs. eller</li>
                        <li>Sætningsdansen og inversion (felt 1 og 2)</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    const openFlade1Btn = realmsSection.querySelector('#btn-open-flade1');
    if (openFlade1Btn) {
        openFlade1Btn.onclick = () => navigateFn('sansning_flade1');
    }
    viewContainer.appendChild(realmsSection);

    // 4. Pedagogical Guide for Teachers and Students
    const guide = document.createElement('details');
    guide.className = 'gs-guide-card';
    guide.innerHTML = `
        <summary class="gs-guide-summary">
            <span>Lærerens og kursistens sanseguide: sådan sanses grammatikken</span>
            <span>▼</span>
        </summary>
        <div class="gs-guide-content">
            <p>
                Mange sprogkursister kæmper med regler som <em>transitiv/intransitiv</em>, <em>perfektum participium</em> 
                og <em>adverbiel stedfæstelse</em>, fordi disse betegnelser er abstrakte og kliniske. 
                Når vi i stedet forbinder sproget med <strong>kroppens umiddelbare sansning af rum, tid og bevægelse</strong>, 
                opstår forståelsen organisk:
            </p>
            <div class="gs-guide-grid">
                <div class="gs-guide-col">
                    <h3>1. Kropssprogets fagter</h3>
                    <p>
                        Brug hænderne i undervisningen: En flad, rolig håndflade mod bordet symboliserer <strong>tilstand (ligger / er / hjemme)</strong>. 
                        En gribende eller skubbende hånd i fart symboliserer <strong>forvandling (lægger / bliver / hjem)</strong>.
                    </p>
                </div>
                <div class="gs-guide-col">
                    <h3>2. Tærsklens grænse</h3>
                    <p>
                        Vis dørtrinet: Står kursisten inden for døren, er det en lukket ro med <strong>-e</strong> (inde, oppe, hjemme). 
                        Så snart foden løftes og krydser tærsklen, forsvinder <strong>-e</strong>'et (ind, op, hjem).
                    </p>
                </div>
                <div class="gs-guide-col">
                    <h3>3. Tunge vs. pande</h3>
                    <p>
                        Hvor sidder verbet? <strong>"Jeg synes"</strong> sidder i smagsløgene, i maven og på huden (sanseindtryk). 
                        <strong>"Jeg tror"</strong> sidder i panden foran (hovedets gæt uden sansning her og nu).
                    </p>
                </div>
            </div>
        </div>
    `;
    viewContainer.appendChild(guide);

    container.appendChild(viewContainer);
}
