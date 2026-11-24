/**
 * Station 3.6: Forestilling og hypoteser – virkelighed (nutid) vs. ønske & afstand (datid)
 * Hovedflade 3: Rum, tid og relationer (nærhed vs. afstand)
 */
export function renderSansningHypoteseDatidView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sansning-station-view';

    const pairs = [
        {
            id: 'betingelse',
            shortTitle: 'Hvis jeg har tid vs. Hvis jeg havde tid',
            wordTitle: 'Realistisk plan (nutid) vs. Hypotese (datid)',
            category: 'Betingelser (hvis...)',
            leftLabel: 'Nærhed til virkeligheden (nutid)',
            rightLabel: 'Afstand / hypotese (datid)',
            leftSent: 'Hvis jeg <span class="ss-box-verb-highlight">har</span> tid i morgen, <span class="ss-box-verb-highlight">kommer</span> jeg forbi.',
            rightSent: 'Hvis jeg <span class="ss-box-verb-highlight">havde</span> tid, <span class="ss-box-verb-highlight">ville</span> jeg rejse jorden rundt.',
            leftExp: 'Nutidsformen <strong>har</strong> viser, at situationen ligger tæt på virkeligheden: det er realistisk og kan sagtens ske i morgen.',
            rightExp: 'Datidsformen <strong>havde</strong> (+ <strong>ville</strong>) handler ikke om i går — den skaber <strong>afstand til virkeligheden</strong>, fordi du netop ikke har tiden lige nu.',
            aha: 'På dansk bruger vi <strong>datid</strong> som en mental afstandsmåler: jo længere væk fra virkeligheden noget er (usikkert eller ønsket), desto længere bagud i tid flytter vi verbet.',
            langs: {
                en: 'If I have time, I will come vs. If I had time, I would travel',
                de: 'Wenn ich Zeit habe, komme ich vs. Wenn ich Zeit hätte, würde ich reisen',
                es: 'Si tengo tiempo, vengo vs. Si tuviera tiempo, viajaría',
                ar: 'إذا كان لدي وقت سآتي (واقعي) مقابل لو كان لدي وقت لسافرت (افتراضي)'
            }
        },
        {
            id: 'oenske',
            shortTitle: 'Jeg vil gerne vs. Jeg ville ønske / Bare jeg var',
            wordTitle: 'Konkret ønske (nutid) vs. Drøm uden hold i virkeligheden (datid)',
            category: 'Ønsker og drømme',
            leftLabel: 'Tæt på virkeligheden (nutid)',
            rightLabel: 'Langt fra virkeligheden (datid)',
            leftSent: 'Jeg <span class="ss-box-verb-highlight">vil</span> gerne have en ny cykel til sommer.',
            rightSent: 'Bare jeg <span class="ss-box-verb-highlight">var</span> rig, og jeg <span class="ss-box-verb-highlight">kunne</span> flyve!',
            leftExp: 'Med <strong>vil</strong> står ønsket med begge ben på jorden — det er en konkret plan, som du kan gøre til virkelighed.',
            rightExp: 'Med <strong>var</strong> og <strong>kunne</strong> træder vi ud i fantasiens rum. Datiden signalerer med det samme: <em>”Sådan er virkeligheden ikke lige nu.”</em>',
            aha: 'Ord som <strong>Bare ...</strong>, <strong>Gid ...</strong> og <strong>Jeg ville ønske, at ...</strong> udløser næsten altid datid på dansk, fordi ønsket mangler hold i virkeligheden.',
            langs: {
                en: 'I want a new bike vs. If only I were rich and could fly!',
                de: 'Ich will ein neues Fahrrad vs. Wenn ich nur reich wäre und fliegen könnte!',
                es: 'Quiero una bici nueva vs. ¡Ojalá fuera rico y pudiera volar!',
                ar: 'أريد دراجة جديدة مقابل ليتني كنت غنياً وأستطيع الطيران!'
            }
        },
        {
            id: 'taenk_hvis',
            shortTitle: 'Hvis det regner vs. Tænk hvis vi boede ved havet',
            wordTitle: 'Mulig hverdag (nutid) vs. Tankeeksperiment (datid)',
            category: 'Tankeeksperiment',
            leftLabel: 'Reel mulighed (nutid)',
            rightLabel: 'Forestilling (datid)',
            leftSent: 'Hvis det <span class="ss-box-verb-highlight">regner</span> i eftermiddag, <span class="ss-box-verb-highlight">bliver</span> vi inde.',
            rightSent: 'Tænk, hvis vi <span class="ss-box-verb-highlight">boede</span> lige ved havet og <span class="ss-box-verb-highlight">vågnede</span> til bølgerne!',
            leftExp: 'Regn i eftermiddag er en konkret, mulig virkelighed — derfor holder vi os i nutid (<strong>regner / bliver</strong>).',
            rightExp: '<strong>Tænk, hvis ...</strong> åbner en forestillet verden. Datiden <strong>boede / vågnede</strong> markerer tydeligt, at vi drømmer os væk fra virkeligheden.',
            aha: 'Når du skifter fra <strong>bor</strong> til <strong>boede</strong> efter <em>hvis</em>, flytter du sætningen fra virkelighedens faste grund ud i et forestillet rum.',
            langs: {
                en: 'If it rains, we stay inside vs. Imagine if we lived by the sea!',
                de: 'Wenn es regnet, bleiben wir drinnen vs. Stell dir vor, wir wohnten am Meer!',
                es: 'Si llueve, nos quedamos dentro vs. ¡Imagina si viviéramos junto al mar!',
                ar: 'إذا أمطرت سنبقى في الداخل مقابل تخيل لو كنا نعيش بجانب البحر!'
            }
        },
        {
            id: 'foerdatid',
            shortTitle: 'Hvis jeg læser vs. Hvis jeg havde læst mere',
            wordTitle: 'Åben mulighed (nutid) vs. Dobbelt afstand i fortiden (førdatid)',
            category: 'Dobbelt afstand (førdatid)',
            leftLabel: 'Kan stadig ske (nutid)',
            rightLabel: 'Dobbelt afstand / for sent (førdatid)',
            leftSent: 'Hvis jeg <span class="ss-box-verb-highlight">læser</span> i aften, <span class="ss-box-verb-highlight">består</span> jeg prøven.',
            rightSent: 'Hvis jeg <span class="ss-box-verb-highlight">havde læst</span> mere, <span class="ss-box-verb-highlight">ville</span> jeg have bestået.',
            leftExp: 'Prøven er ikke slut endnu — virkeligheden er åben, og du kan stadig påvirke den i nutid.',
            rightExp: 'Her er der <strong>dobbelt afstand</strong>: både tidsligt (prøven er forbi) og virkelighedsmæssigt (du læste ikke nok). Derfor bruger dansk førdatid (<strong>havde læst</strong>).',
            aha: 'Nutid = muligt nu · Datid = forestilling/ønske nu · <strong>Førdatid</strong> = umulig forestilling om noget, der allerede er forbi.',
            langs: {
                en: 'If I study tonight, I will pass vs. If I had studied more, I would have passed',
                de: 'Wenn ich lerne, bestehe ich vs. Wenn ich mehr gelernt hätte, hätte ich bestanden',
                es: 'Si estudio hoy, apruebo vs. Si hubiera estudiado más, habría aprobado',
                ar: 'إذا درست سأنجح مقابل لو كنت قد درست أكثر لكنت نجحت'
            }
        },
        {
            id: 'som_om',
            shortTitle: 'Fordi han ved alt vs. Som om han ejede verden',
            wordTitle: 'Fakta (nutid) vs. Forestillet sammenligning (som om + datid)',
            category: 'Som om ...',
            leftLabel: 'Virkelighed / årsag (nutid)',
            rightLabel: 'Skin / forestilling (datid)',
            leftSent: 'Han taler højt, fordi han <span class="ss-box-verb-highlight">kender</span> svaret.',
            rightSent: 'Han taler, som om han <span class="ss-box-verb-highlight">ejede</span> hele verden.',
            leftExp: 'Efter <strong>fordi</strong> beskriver nutiden en faktisk grund i virkeligheden.',
            rightExp: 'Efter <strong>som om</strong> viser datiden <strong>ejede</strong>, at taleren ikke tror på det — det er kun en forestilling eller et billede, ikke virkelighed.',
            aha: 'Efter <strong>som om</strong> er datid dit tydeligste signal om skepsis eller forestilling: <em>”Det ser sådan ud, men det passer ikke i virkeligheden.”</em>',
            langs: {
                en: 'Because he knows the answer vs. As if he owned the whole world',
                de: 'Weil er die Antwort kennt vs. Als ob ihm die ganze Welt gehörte',
                es: 'Porque sabe la respuesta vs. Como si fuera dueño del mundo entero',
                ar: 'لأنه يعرف الإجابة مقابل وكأنه يملك العالم كله'
            }
        }
    ];

    const realityLadder = [
        {
            id: 'trin1',
            tag: 'Trin 1 · Fast grund (fakta)',
            sent: 'Jeg bor i en lille lejlighed.',
            meter: 15,
            isClose: true,
            expl: '<strong>0 % afstand (nutid):</strong> Vi står midt i virkeligheden. Intet er usikkert — det er et faktum her og nu.'
        },
        {
            id: 'trin2',
            tag: 'Trin 2 · Realistisk mulighed (hvis + nutid)',
            sent: 'Hvis jeg sparer op, køber jeg et hus.',
            meter: 42,
            isClose: true,
            expl: '<strong>Lille afstand (nutid):</strong> Betingelsen ligger tæt på virkeligheden. Du vurderer selv, at planen faktisk kan lykkes.'
        },
        {
            id: 'trin3',
            tag: 'Trin 3 · Forestilling & ønske (hvis + datid)',
            sent: 'Hvis jeg vandt i lotto, købte jeg et hus ved havet.',
            meter: 75,
            isClose: false,
            expl: '<strong>Stor afstand til virkeligheden (datid):</strong> Sætningen handler om nutid/fremtid, ikke fortid — men datidsformerne <em>vandt</em> og <em>købte</em> (eller <em>ville købe</em>) markerer, at det er usikkert og kun en drøm.'
        },
        {
            id: 'trin4',
            tag: 'Trin 4 · Dobbelt afstand (førdatid)',
            sent: 'Hvis jeg havde købt huset dengang, ville vi have haft udsigt til havet nu.',
            meter: 100,
            isClose: false,
            expl: '<strong>Maksimal afstand (førdatid):</strong> Chancen er allerede forbi, og det skete aldrig. Førdatid (<em>havde købt</em>) viser, at scenen er lukket og ren forestilling.'
        }
    ];

    const patternExamples = [
        {
            verb: 'Hvis jeg var dig ...',
            phrase: 'Hvis jeg var dig, ville jeg tage jobbet.',
            note: 'Du er naturligvis ikke den anden person — derfor bruges datid "var" som ren forestilling ved råd.'
        },
        {
            verb: 'Bare + datid',
            phrase: 'Bare det snart var sommer!',
            note: 'Udtrykker et stærkt ønske, som endnu ikke har hold i virkeligheden.'
        },
        {
            verb: 'Jeg ville ønske, at + datid',
            phrase: 'Jeg ville ønske, at jeg boede tættere på arbejdet.',
            note: 'Kombinationen af "ville" og "boede" viser tydeligt, at det er en drøm i nutiden.'
        },
        {
            verb: 'Tænk, hvis + datid',
            phrase: 'Tænk, hvis vi havde fri hver fredag!',
            note: 'Åbner et legende tankeeksperiment på sikker afstand af hverdagen.'
        },
        {
            verb: 'Det ville være dejligt, hvis + datid',
            phrase: 'Det ville være dejligt, hvis solen skinnede i morgen.',
            note: 'Blød, usikker forhåbning — man tør ikke love det i virkeligheden.'
        },
        {
            verb: 'Som om + datid',
            phrase: 'Hun smilte, som om intet var sket.',
            note: 'Viser at det kun ser sådan ud på overfladen — i virkeligheden er der sket noget.'
        }
    ];

    const quizQuestions = [
        {
            prompt: 'Du har faktisk fri i morgen, og du regner med at besøge din ven. Hvilken sætning viser nærhed til virkeligheden?',
            options: [
                'Hvis jeg har tid i morgen, kommer jeg forbi.',
                'Hvis jeg havde tid i morgen, ville jeg komme forbi.'
            ],
            correct: 'Hvis jeg har tid i morgen, kommer jeg forbi.',
            expl: 'Nutid ("har" / "kommer") bruges, når noget er realistisk og tæt på virkeligheden.'
        },
        {
            prompt: 'Du drømmer om at vinde 10 millioner kroner, selvom du ved, det er meget usandsynligt. Hvad passer bedst?',
            options: [
                'Hvis jeg vinder 10 millioner, køber jeg en ø.',
                'Hvis jeg vandt 10 millioner, ville jeg købe en ø.'
            ],
            correct: 'Hvis jeg vandt 10 millioner, ville jeg købe en ø.',
            expl: 'Datidsformerne "vandt" og "ville" skaber afstand fra virkeligheden og markerer en usikker drøm.'
        },
        {
            prompt: 'Du vil give en god ven et råd i en svær situation. Hvilken fast dansk vending bruger forestillings-datid?',
            options: [
                'Hvis jeg er dig, tager jeg en pause.',
                'Hvis jeg var dig, ville jeg tage en pause.'
            ],
            correct: 'Hvis jeg var dig, ville jeg tage en pause.',
            expl: 'Fordi du ikke er din ven i virkeligheden, bruger dansk altid datid: "Hvis jeg var dig ...".'
        },
        {
            prompt: 'Hvorfor står verbet i datid i sætningen: "Bare det var weekend nu!"?',
            options: [
                'Fordi det handler om sidste weekend.',
                'Fordi det er et ønske, der ikke er virkelighed lige nu.'
            ],
            correct: 'Fordi det er et ønske, der ikke er virkelighed lige nu.',
            expl: 'Her måler datid ikke tid i kalenderen, men afstand til virkeligheden: det er ikke weekend endnu.'
        },
        {
            prompt: 'Eksamen er allerede overstået, og du fortryder, at du ikke øvede mere. Hvilken form udtrykker denne dobbelte afstand?',
            options: [
                'Hvis jeg havde øvet mere, ville jeg have fået en bedre karakter.',
                'Hvis jeg øver mere, får jeg en bedre karakter.'
            ],
            correct: 'Hvis jeg havde øvet mere, ville jeg have fået en bedre karakter.',
            expl: 'Førdatid ("havde øvet") udtrykker dobbelt afstand: både at tiden er forbi, og at det ikke skete i virkeligheden.'
        },
        {
            prompt: 'Du sidder i din lejlighed i byen og leger med tanken om et helt andet liv. Hvilken sætning åbner et tankeeksperiment?',
            options: [
                'Tænk, hvis vi bor lige ved havet!',
                'Tænk, hvis vi boede lige ved havet!'
            ],
            correct: 'Tænk, hvis vi boede lige ved havet!',
            expl: '"Tænk, hvis..." åbner en forestillet verden, og datiden "boede" viser tydeligt, at det er en drøm og ikke virkelighed.'
        },
        {
            prompt: 'En kollega opfører sig, som om han bestemmer alt, selvom han ikke er chef. Hvilken sætning viser, at det kun er en forestilling?',
            options: [
                'Han taler, som om han ejede hele firmaet.',
                'Han taler, fordi han ejer hele firmaet.'
            ],
            correct: 'Han taler, som om han ejede hele firmaet.',
            expl: 'Efter "som om" bruger dansk datid ("ejede") for at markere, at det ikke passer i virkeligheden.'
        },
        {
            prompt: 'Du har meget travlt i hverdagen og savner fritid. Hvordan udtrykker du et ønske, der ikke er virkelighed lige nu?',
            options: [
                'Jeg ville ønske, at jeg havde mere tid i hverdagen.',
                'Jeg ønsker, at jeg har mere tid i går.'
            ],
            correct: 'Jeg ville ønske, at jeg havde mere tid i hverdagen.',
            expl: 'Kombinationen "ville ønske" + datid ("havde") udtrykker et ønske i nutiden, som har mindre hold i virkeligheden.'
        },
        {
            prompt: 'Vejrudsigten er usikker, men du håber forsigtigt på godt vejr til jeres udflugt i morgen:',
            options: [
                'Det ville være dejligt, hvis solen skinnede i morgen.',
                'Solen skinner sikkert i går.'
            ],
            correct: 'Det ville være dejligt, hvis solen skinnede i morgen.',
            expl: 'Datidsformerne "ville" og "skinnede" markerer en blød, usikker forhåbning om fremtiden — ikke fortid.'
        },
        {
            prompt: 'I kom for sent til toget, og det er allerede kørt. Hvilken sætning udtrykker dobbelt afstand (både forbi i tid og skete ikke)?',
            options: [
                'Hvis vi tager af sted tidligere, når vi toget.',
                'Hvis vi var taget af sted tidligere, ville vi have nået toget.'
            ],
            correct: 'Hvis vi var taget af sted tidligere, ville vi have nået toget.',
            expl: 'Førdatid ("var taget af sted") + "ville have nået" udtrykker dobbelt afstand: tiden er lukket, og det skete ikke i virkeligheden.'
        }
    ];

    const style = document.createElement('style');
    style.textContent = `
        .sansning-station-view {
            max-width: 1180px;
            width: 100%;
            box-sizing: border-box;
            margin: 0 auto;
            padding: 1rem 1.25rem 5rem;
            color: #ffffff;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }
        .sansning-station-view *, .sansning-station-view *::before, .sansning-station-view *::after {
            box-sizing: border-box;
        }
        .ss-hero {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .ss-station-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(92, 8, 18, 0.9);
            border: 1px solid #851825;
            border-radius: 999px;
            padding: 0.35rem 0.95rem;
            font-size: 0.82rem;
            font-weight: 800;
            color: #FFC9CD;
            letter-spacing: 0.04em;
            margin-bottom: 0.7rem;
        }
        .ss-hero h1 {
            font-size: clamp(1.55rem, 3.2vw, 2.15rem);
            font-weight: 900;
            margin: 0 0 0.45rem;
            letter-spacing: -0.02em;
            color: #ffffff;
        }
        .ss-hero p {
            color: #FFC9CD;
            font-size: 1rem;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.55;
        }
        .ss-tabs-nav {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.55rem;
            margin-bottom: 1.6rem;
            background: #5C0812;
            border: 1.5px solid #851825;
            padding: 0.45rem;
            border-radius: 16px;
        }
        .ss-tab-btn {
            background: transparent;
            border: none;
            color: #FFC9CD;
            padding: 0.6rem 1.15rem;
            border-radius: 12px;
            font-size: 0.88rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ss-tab-btn:hover { color: #ffffff; background: rgba(255, 255, 255, 0.08); }
        .ss-tab-btn.active { background: #FF4D5E; color: #ffffff; }
        .ss-tab-panel { display: none; }
        .ss-tab-panel.active { display: block; animation: ssFade 0.25s ease; }
        @keyframes ssFade {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .hyp-diagram-card {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 20px;
            padding: 1.15rem 1.35rem;
            margin-bottom: 1.35rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
        }
        .hyp-strip {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-top: 0.95rem;
            justify-content: center;
        }
        .ss-strip-btn {
            background: #4A040B;
            border: 1px solid #851825;
            color: #FFC9CD;
            padding: 0.48rem 0.85rem;
            border-radius: 10px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .ss-strip-btn:hover { border-color: #FFC9CD; color: #ffffff; }
        .ss-strip-btn.active { background: #FF4D5E; border-color: #FF4D5E; color: #ffffff; }
        .ss-detail-card {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 20px;
            padding: 1.35rem 1.45rem;
            box-shadow: 0 14px 36px rgba(0, 0, 0, 0.42);
        }
        .ss-detail-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 1rem;
        }
        .ss-main-word { font-size: 1.2rem; font-weight: 900; color: #ffffff; }
        .ss-cat-pill {
            font-size: 0.76rem;
            font-weight: 800;
            color: #fde68a;
            background: #4A040B;
            border: 1px solid #851825;
            padding: 0.28rem 0.75rem;
            border-radius: 999px;
        }
        .ss-congruence-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        @media (max-width: 740px) {
            .ss-congruence-grid { grid-template-columns: 1fr; }
        }
        .ss-contrast-box {
            border-radius: 14px;
            padding: 1.05rem 1.15rem;
            background: #4A040B;
            border: 1.5px solid #851825;
        }
        .ss-contrast-box.naerhed { border-color: rgba(56, 189, 248, 0.55); }
        .ss-contrast-box.afstand { border-color: rgba(251, 146, 60, 0.55); }
        .ss-box-badge {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 800;
            padding: 0.22rem 0.6rem;
            border-radius: 7px;
            margin-bottom: 0.55rem;
        }
        .ss-contrast-box.naerhed .ss-box-badge { background: rgba(56, 189, 248, 0.18); color: #7dd3fc; }
        .ss-contrast-box.afstand .ss-box-badge { background: rgba(251, 146, 60, 0.18); color: #fdba74; }
        .ss-box-sent { font-size: 1.08rem; font-weight: 800; color: #ffffff; margin-bottom: 0.5rem; line-height: 1.45; }
        .ss-contrast-box.naerhed .ss-box-verb-highlight { color: #38bdf8; text-decoration: underline; text-underline-offset: 3px; }
        .ss-contrast-box.afstand .ss-box-verb-highlight { color: #fb923c; text-decoration: underline; text-underline-offset: 3px; }
        .ss-box-exp { font-size: 0.88rem; color: #FFC9CD; line-height: 1.5; }
        .ss-insp-aha {
            background: rgba(15, 23, 42, 0.55);
            border: 1px solid rgba(251, 146, 60, 0.45);
            border-left: 4px solid #fb923c;
            border-radius: 12px;
            padding: 0.85rem 1rem;
            font-size: 0.9rem;
            color: #f8fafc;
            line-height: 1.55;
            margin-bottom: 0.95rem;
        }
        .ss-insp-languages {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.5rem;
            background: #4A040B;
            border-radius: 12px;
            padding: 0.8rem 1rem;
            font-size: 0.82rem;
            color: #FFC9CD;
            border: 1px dashed #851825;
        }
        .ss-phrases-shell { display: flex; flex-direction: column; gap: 1.35rem; }
        .ss-phrases-card {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 20px;
            padding: 1.35rem 1.45rem;
        }
        .ss-phrases-card h2 { margin: 0 0 0.45rem; font-size: 1.28rem; font-weight: 800; color: #ffffff; }
        .ss-phrases-lead { margin: 0 0 1rem; font-size: 0.92rem; color: #FFC9CD; line-height: 1.55; }
        .ss-ladder-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.75rem;
            margin-bottom: 1rem;
        }
        .ss-ladder-step {
            background: #4A040B;
            border: 1.5px solid #851825;
            border-radius: 14px;
            padding: 0.9rem;
            text-align: left;
            color: #ffffff;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            transition: all 0.18s ease;
        }
        .ss-ladder-step:hover { border-color: #fb923c; }
        .ss-ladder-step.close-tier.active { border-color: #38bdf8; background: rgba(14, 116, 144, 0.25); }
        .ss-ladder-step.active:not(.close-tier) { border-color: #fb923c; background: rgba(194, 65, 12, 0.28); }
        .ss-ladder-tag { font-size: 0.74rem; font-weight: 800; color: #FFC9CD; }
        .ss-ladder-sent { font-size: 0.92rem; font-weight: 800; color: #ffffff; line-height: 1.35; }
        .ss-ladder-meter { height: 7px; border-radius: 999px; background: rgba(255, 255, 255, 0.12); overflow: hidden; margin-top: auto; }
        .ss-ladder-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #38bdf8, #fb923c); }
        .ss-ladder-detail {
            background: #4A040B;
            border: 1px solid #851825;
            border-radius: 12px;
            padding: 0.9rem 1.05rem;
            font-size: 0.92rem;
            color: #f8fafc;
            line-height: 1.55;
        }
        .ss-datid-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 0.85rem;
        }
        .ss-datid-item {
            background: #4A040B;
            border: 1px solid #851825;
            border-radius: 14px;
            padding: 0.95rem 1.05rem;
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
        }
        .ss-datid-verb { font-size: 0.76rem; font-weight: 800; color: #fb923c; text-transform: uppercase; letter-spacing: 0.04em; }
        .ss-datid-phrase { font-size: 0.98rem; font-weight: 800; color: #ffffff; }
        .ss-datid-note { font-size: 0.84rem; color: #FFC9CD; line-height: 1.45; }
        .ss-quiz-card {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 20px;
            padding: 1.5rem;
            max-width: 760px;
            margin: 0 auto;
        }
        .ss-quiz-progress {
            display: flex;
            justify-content: space-between;
            font-size: 0.84rem;
            font-weight: 800;
            color: #FFC9CD;
            margin-bottom: 0.9rem;
        }
        .ss-quiz-question-box {
            background: #4A040B;
            border: 1px solid #851825;
            border-radius: 14px;
            padding: 1.1rem 1.2rem;
            font-size: 1.04rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.5;
            margin-bottom: 1rem;
        }
        .ss-quiz-options { display: flex; flex-direction: column; gap: 0.65rem; }
        .ss-quiz-opt-btn {
            background: #4A040B;
            border: 1.5px solid #851825;
            color: #ffffff;
            padding: 0.85rem 1.05rem;
            border-radius: 12px;
            text-align: left;
            font-size: 0.96rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .ss-quiz-opt-btn:hover:not(:disabled) { border-color: #FFC9CD; background: #73101C; }
        .ss-quiz-opt-btn.correct { border-color: #22c55e; background: rgba(34, 197, 94, 0.22); }
        .ss-quiz-opt-btn.wrong { border-color: #ef4444; background: rgba(239, 68, 68, 0.22); }
        .ss-quiz-feedback {
            display: none;
            margin-top: 1rem;
            padding: 0.9rem 1.05rem;
            border-radius: 12px;
            font-size: 0.9rem;
            line-height: 1.5;
        }
        .ss-quiz-feedback.show { display: block; }
        .ss-quiz-feedback.correct { background: rgba(34, 197, 94, 0.16); border: 1px solid #22c55e; color: #dcfce7; }
        .ss-quiz-feedback.wrong { background: rgba(251, 146, 60, 0.16); border: 1px solid #fb923c; color: #ffedd5; }
        .ss-quiz-next-btn {
            display: none;
            margin-top: 1rem;
            background: #FF4D5E;
            color: #ffffff;
            border: none;
            padding: 0.7rem 1.35rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
        }
        .ss-back-btn {
            background: #5C0812;
            border: 1.5px solid #851825;
            color: #ffffff;
            padding: 0.55rem 1.1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        @media (max-width: 640px) {
            .sansning-station-view { padding: 0.7rem 0.75rem 3.5rem; }
            .ss-detail-card, .ss-phrases-card, .hyp-diagram-card, .ss-quiz-card { padding: 1rem 0.9rem; }
        }
    `;
    viewContainer.appendChild(style);

    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <div class="ss-station-badge">Station 3.6 · Rum, tid og relationer</div>
        <h1>Forestilling og hypoteser: nutid (virkelighed) vs. datid (ønske &amp; afstand)</h1>
        <p>
            På dansk bruges <strong>datidsformer</strong> ikke kun om i går. Når noget er <strong>usikkert</strong>,
            noget du <strong>ønsker dig</strong>, eller en ren <strong>forestilling</strong> med mindre hold i virkeligheden,
            skaber sproget afstand ved at flytte verbet fra nutid til datid.
        </p>
    `;
    viewContainer.appendChild(hero);

    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    tabsNav.innerHTML = `
        <button class="ss-tab-btn active" data-tab="contrast">1. Virkelighed vs. Forestilling</button>
        <button class="ss-tab-btn" data-tab="ladder">2. Virkeligheds-stigen &amp; mønstre</button>
        <button class="ss-tab-btn" data-tab="quiz">3. Afstandsprøven (Quiz)</button>
    `;
    viewContainer.appendChild(tabsNav);

    const panelsContainer = document.createElement('div');
    viewContainer.appendChild(panelsContainer);

    // PANEL 1: KONTRAST-LABORATORIUM
    const panelContrast = document.createElement('div');
    panelContrast.className = 'ss-tab-panel active';
    panelContrast.id = 'panel-contrast';

    let activePairId = pairs[0].id;

    const diagramCard = document.createElement('div');
    diagramCard.className = 'hyp-diagram-card';
    diagramCard.innerHTML = `
        <svg viewBox="0 0 720 138" width="100%" style="display:block; max-height:150px;" aria-label="Diagram: Nærhed til virkeligheden (nutid) vs. Afstand til virkeligheden (datid)">
            <rect x="0" y="0" width="720" height="138" rx="14" fill="#0b1324"/>
            <!-- Venstre: Virkelighed / Nutid -->
            <rect x="20" y="22" width="230" height="94" rx="12" fill="rgba(56,189,248,0.14)" stroke="#38bdf8" stroke-width="1.8"/>
            <text x="135" y="47" text-anchor="middle" fill="#7dd3fc" font-size="12" font-weight="800">NÆRHED · VIRKELIGHED</text>
            <text x="135" y="71" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="900">NUTID (har / vil / bor)</text>
            <text x="135" y="96" text-anchor="middle" fill="#cbd5e1" font-size="11.5">Fast grund · Realistisk plan</text>

            <!-- Midt: Afstandspil -->
            <line x1="265" y1="69" x2="445" y2="69" stroke="#fb923c" stroke-width="2.5" stroke-dasharray="6,4"/>
            <polygon points="455,69 441,62 441,76" fill="#fb923c"/>
            <rect x="292" y="34" width="136" height="24" rx="12" fill="rgba(251,146,60,0.18)" stroke="rgba(251,146,60,0.5)"/>
            <text x="360" y="50" text-anchor="middle" fill="#fdba74" font-size="11" font-weight="800">Mindre hold i virkeligheden</text>
            <text x="360" y="92" text-anchor="middle" fill="#94a3b8" font-size="11">Usikkerhed · Ønske · Drøm</text>

            <!-- Højre: Forestilling / Datid -->
            <rect x="470" y="22" width="230" height="94" rx="12" fill="rgba(251,146,60,0.14)" stroke="#fb923c" stroke-width="1.8" stroke-dasharray="6,4"/>
            <text x="585" y="47" text-anchor="middle" fill="#fdba74" font-size="12" font-weight="800">AFSTAND · FORESTILLING</text>
            <text x="585" y="71" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="900">DATID (havde / ville / boede)</text>
            <text x="585" y="96" text-anchor="middle" fill="#cbd5e1" font-size="11.5">Hypotese · Ønske · Tankeeksperiment</text>
        </svg>
        <div class="hyp-strip" id="hyp-strip"></div>
    `;
    panelContrast.appendChild(diagramCard);

    const detailCard = document.createElement('div');
    detailCard.className = 'ss-detail-card';
    panelContrast.appendChild(detailCard);

    function renderStripAndDetail() {
        const strip = diagramCard.querySelector('#hyp-strip');
        strip.innerHTML = '';
        pairs.forEach(p => {
            const btn = document.createElement('button');
            btn.className = `ss-strip-btn ${p.id === activePairId ? 'active' : ''}`;
            btn.textContent = p.shortTitle;
            btn.onclick = () => {
                activePairId = p.id;
                renderStripAndDetail();
            };
            strip.appendChild(btn);
        });

        const p = pairs.find(x => x.id === activePairId) || pairs[0];
        detailCard.innerHTML = `
            <div class="ss-detail-header">
                <span class="ss-main-word">${p.wordTitle}</span>
                <span class="ss-cat-pill">${p.category}</span>
            </div>
            <div class="ss-congruence-grid">
                <div class="ss-contrast-box naerhed">
                    <span class="ss-box-badge">${p.leftLabel}</span>
                    <div class="ss-box-sent">${p.leftSent}</div>
                    <div class="ss-box-exp">${p.leftExp}</div>
                </div>
                <div class="ss-contrast-box afstand">
                    <span class="ss-box-badge">${p.rightLabel}</span>
                    <div class="ss-box-sent">${p.rightSent}</div>
                    <div class="ss-box-exp">${p.rightExp}</div>
                </div>
            </div>
            <div class="ss-insp-aha">
                <strong>Aha-indsigt:</strong> ${p.aha}
            </div>
            <div class="ss-insp-languages">
                <div><strong>Engelsk:</strong> ${p.langs.en}</div>
                <div><strong>Tysk:</strong> ${p.langs.de}</div>
                <div><strong>Spansk:</strong> ${p.langs.es}</div>
                <div><strong>Arabisk:</strong> ${p.langs.ar}</div>
            </div>
        `;
    }

    renderStripAndDetail();
    panelsContainer.appendChild(panelContrast);

    // PANEL 2: VIRKELIGHEDS-STIGEN & MØNSTRE
    const panelLadder = document.createElement('div');
    panelLadder.className = 'ss-tab-panel';
    panelLadder.id = 'panel-ladder';

    let activeLadderId = 'trin3';

    function renderLadderTab() {
        const activeStep = realityLadder.find(s => s.id === activeLadderId) || realityLadder[2];
        panelLadder.innerHTML = `
            <div class="ss-phrases-shell">
                <div class="ss-phrases-card">
                    <h2>Fra fast grund til ren forestilling (4 afstandstrin)</h2>
                    <p class="ss-phrases-lead">
                        Klik på trinnene herunder og mærk, hvordan dansk bruger <strong>nutid → datid → førdatid</strong>
                        til at måle, hvor langt væk sætningen bevæger sig fra virkeligheden:
                    </p>
                    <div class="ss-ladder-grid">
                        ${realityLadder.map(step => `
                            <button class="ss-ladder-step ${step.isClose ? 'close-tier' : ''} ${step.id === activeLadderId ? 'active' : ''}" data-step="${step.id}">
                                <span class="ss-ladder-tag">${step.tag}</span>
                                <span class="ss-ladder-sent">"${step.sent}"</span>
                                <div class="ss-ladder-meter">
                                    <div class="ss-ladder-fill" style="width: ${step.meter}%;"></div>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                    <div class="ss-ladder-detail">${activeStep.expl}</div>
                    <div class="ss-insp-aha" style="margin-top: 1rem; margin-bottom: 0;">
                        <strong>Hovedregel:</strong> Datid betyder ikke kun <em>fortid</em> — datid betyder <strong>afstand</strong>. I Station 3.3 er det afstand i <em>tid</em>, i Station 3.5 er det afstand i <em>høflighed</em>, og her i Station 3.6 er det afstand til <em>virkeligheden</em>.
                    </div>
                </div>

                <div class="ss-phrases-card">
                    <h2>6 faste danske mønstre til hypoteser og ønsker</h2>
                    <p class="ss-phrases-lead">
                        Alle disse hverdagsudtryk handler om <strong>nutiden eller fremtiden</strong>, men bruger datid for at vise, at det er en forestilling eller et ønske:
                    </p>
                    <div class="ss-datid-grid">
                        ${patternExamples.map(ex => `
                            <div class="ss-datid-item">
                                <span class="ss-datid-verb">${ex.verb}</span>
                                <span class="ss-datid-phrase">"${ex.phrase}"</span>
                                <span class="ss-datid-note">${ex.note}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        panelLadder.querySelectorAll('.ss-ladder-step').forEach(btn => {
            btn.onclick = () => {
                activeLadderId = btn.getAttribute('data-step');
                renderLadderTab();
            };
        });
    }

    renderLadderTab();
    panelsContainer.appendChild(panelLadder);

    // PANEL 3: QUIZ
    const panelQuiz = document.createElement('div');
    panelQuiz.className = 'ss-tab-panel';
    panelQuiz.id = 'panel-quiz';

    let currentQuestionIdx = 0;
    let quizScore = 0;

    function renderQuizTrack() {
        if (currentQuestionIdx >= quizQuestions.length) {
            panelQuiz.innerHTML = `
                <div class="ss-quiz-card" style="text-align: center;">
                    <h2 style="font-size: 1.65rem; margin: 0.4rem 0 0.9rem; color: #fde68a;">
                        Afstandsprøven gennemført
                    </h2>
                    <p style="font-size: 1.05rem; color: #FFC9CD; margin-bottom: 1.5rem;">
                        Du fik <strong>${quizScore} af ${quizQuestions.length}</strong> rigtige.
                    </p>
                    <button class="ss-back-btn" id="btn-restart-quiz" style="margin: 0 auto; background: #FF4D5E; border-color: #FF4D5E;">
                        Tag prøven igen
                    </button>
                </div>
            `;
            panelQuiz.querySelector('#btn-restart-quiz').onclick = () => {
                currentQuestionIdx = 0;
                quizScore = 0;
                renderQuizTrack();
            };
            return;
        }

        const q = quizQuestions[currentQuestionIdx];
        panelQuiz.innerHTML = `
            <div class="ss-quiz-card">
                <div class="ss-quiz-progress">
                    <span>Opgave ${currentQuestionIdx + 1} af ${quizQuestions.length}</span>
                    <span>Score: ${quizScore} rigtige</span>
                </div>
                <div class="ss-quiz-question-box">${q.prompt}</div>
                <div class="ss-quiz-options">
                    ${q.options.map(opt => `<button class="ss-quiz-opt-btn" data-val="${opt}">${opt}</button>`).join('')}
                </div>
                <div class="ss-quiz-feedback" id="quiz-feedback"></div>
                <button class="ss-quiz-next-btn" id="quiz-next-btn">Næste opgave →</button>
            </div>
        `;

        const feedbackBox = panelQuiz.querySelector('#quiz-feedback');
        const nextBtn = panelQuiz.querySelector('#quiz-next-btn');

        panelQuiz.querySelectorAll('.ss-quiz-opt-btn').forEach(btn => {
            btn.onclick = () => {
                panelQuiz.querySelectorAll('.ss-quiz-opt-btn').forEach(b => { b.disabled = true; });
                const isCorrect = btn.getAttribute('data-val') === q.correct;
                if (isCorrect) {
                    quizScore++;
                    btn.classList.add('correct');
                    feedbackBox.className = 'ss-quiz-feedback show correct';
                    feedbackBox.innerHTML = `<strong>Rigtigt!</strong> ${q.expl}`;
                } else {
                    btn.classList.add('wrong');
                    const rightBtn = panelQuiz.querySelector(`[data-val="${q.correct}"]`);
                    if (rightBtn) rightBtn.classList.add('correct');
                    feedbackBox.className = 'ss-quiz-feedback show wrong';
                    feedbackBox.innerHTML = `<strong>Mærk afstanden til virkeligheden:</strong> Det rigtige svar er <em>"${q.correct}"</em>. ${q.expl}`;
                }
                nextBtn.style.display = 'inline-flex';
            };
        });

        nextBtn.onclick = () => {
            currentQuestionIdx++;
            renderQuizTrack();
        };
    }

    renderQuizTrack();
    panelsContainer.appendChild(panelQuiz);

    // Tab switching
    tabsNav.querySelectorAll('.ss-tab-btn').forEach(btn => {
        btn.onclick = () => {
            tabsNav.querySelectorAll('.ss-tab-btn').forEach(b => b.classList.remove('active'));
            panelsContainer.querySelectorAll('.ss-tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetId = `panel-${btn.getAttribute('data-tab')}`;
            panelsContainer.querySelector(`#${targetId}`).classList.add('active');
        };
    });

    container.appendChild(viewContainer);
}
