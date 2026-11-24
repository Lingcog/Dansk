// ============================================================================
// SamtalePrincipperTab.js
// Fane 8 i SamtaleHoeflighedView: "8. Effektivitet vs. Høflighed"
// Bygger på de to klassiske samtaleprincipper (Effektivitetsreglerne 1-4 og
// Høflighedsreglerne 1-5):
//   A. Vægtskål & "Skru op for høfligheden"-skyder (6 hverdagssituationer)
//   B. De to regelsæt side om side (klikbare regelkort)
//   C. De 5 høflighedsregler i praksis (5 dilemma-cases)
//   D. "Jo – men"-bygger (Høflighedsregel 5 i praksis)
// ============================================================================

const SVG_SPEAK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
const SVG_SCALE = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="3" x2="12" y2="21"/><line x1="4" y1="7" x2="20" y2="7"/><path d="M4 7l-2 7h4l-2-7Z"/><path d="M20 7l-2 7h4l-2-7Z"/><line x1="8" y1="21" x2="16" y2="21"/></svg>`;
const SVG_CHECK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

function speakDa(text) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'da-DK';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
}

const EFFICIENCY_RULES = [
    {
        num: 1,
        title: 'Sig kun det nødvendige',
        desc: 'Hverken for meget eller for lidt i forhold til samtalens formål.',
        example: 'Effektivt: "Klokken er to." · Høfligt omsvøb: "Undskyld, jeg ville bare lige høre, om du måske ved, hvad klokken er?"'
    },
    {
        num: 2,
        title: 'Sig kun det, du mener er sandt',
        desc: 'Lad være med at sige noget, du selv tror er falsk.',
        example: 'Vi bøjer tit reglen for høflighedens skyld: "Åh, kagen var helt nem at lave!" (selvom den tog to timer).'
    },
    {
        num: 3,
        title: 'Vær relevant',
        desc: 'Hold dig til emnet i samtalen.',
        example: 'Ved bløde afslag kan man skifte fokus: "Hvor er det hyggeligt! Hvordan går det forresten med..."'
    },
    {
        num: 4,
        title: 'Udtryk dig klart og direkte',
        desc: 'Uden flertydighed og omsvøb.',
        example: 'Direkte: "Luk vinduet!" — er 100 % klart, men føles ofte for hårdt på dansk.'
    }
];

const POLITENESS_RULES = [
    {
        num: 1,
        title: 'Vær hensynsfuld',
        desc: 'Vær mindst muligt til besvær, og giv den anden handlefrihed.',
        example: '"Kunne du måske lukke vinduet, hvis det ikke er til besvær?"'
    },
    {
        num: 2,
        title: 'Vær gavmild',
        desc: 'Vis, at du gerne vil opfylde andres ønsker — pålæg dig selv besværet.',
        example: '"Vil du ikke have en kop kaffe? Det tager mig kun et øjeblik!"'
    },
    {
        num: 3,
        title: 'Vær positiv',
        desc: 'Undgå hård kritik; giv ros og vis sympati først.',
        example: '"Jeg kan rigtig godt lide starten — måske kunne slutningen bare være lidt kortere?"'
    },
    {
        num: 4,
        title: 'Vær beskeden',
        desc: 'Undgå at rose dig selv, og tag imod ros på en afdæmpet måde.',
        example: '"Hvor er din mad lækker!" → "Åh, tak — det var nu bare en helt enkel opskrift."'
    },
    {
        num: 5,
        title: 'Vær enig (jo – men)',
        desc: 'Søg fælles forståelse og blødgør uenighed med "jo – men".',
        example: '"Jo, det er en god pointe – men måske har vi ikke helt tid nok?"'
    }
];

const SLIDER_CASES = [
    {
        id: 'vindue',
        label: 'Vinduet står åbent',
        situation: 'Du sidder i et lokale, og det trækker fra et åbent vindue.',
        levels: [
            {
                badge: 'Trin 1 · Direkte (Effektivitet)',
                tilt: -14,
                effPct: 90,
                polPct: 15,
                text: 'Luk vinduet!',
                analysis: 'Følger Effektivitetsregel 1 og 4 (kort og direkte), men bryder Høflighedsregel 1 (indskrænker den andens handlefrihed).'
            },
            {
                badge: 'Trin 2 · Blød dansk (Balance)',
                tilt: 4,
                effPct: 55,
                polPct: 75,
                text: 'Kunne du måske lukke vinduet?',
                analysis: 'Spørgsmål + datid ("kunne") + "måske" giver den anden et frit valg (Høflighedsregel 1: hensynsfuld).'
            },
            {
                badge: 'Trin 3 · Ekstra hensynsfuld (Høflighed)',
                tilt: 14,
                effPct: 25,
                polPct: 95,
                text: 'Undskyld, fryser du også lidt – er det okay, hvis vi lukker vinduet?',
                analysis: 'Flere ord og omsvøb (bryder Effektivitet 1 & 4), men skaber fælles forståelse og mindst muligt besvær (Høflighed 1 & 5).'
            }
        ]
    },
    {
        id: 'kuglepen',
        label: 'Låne en kuglepen',
        situation: 'Du skal skrive noget ned og mangler en kuglepen.',
        levels: [
            {
                badge: 'Trin 1 · Direkte (Effektivitet)',
                tilt: -14,
                effPct: 90,
                polPct: 15,
                text: 'Giv mig din kuglepen!',
                analysis: 'Kort og tydeligt (Effektivitet 4), men lyder som en ordre og bryder Høflighedsregel 1.'
            },
            {
                badge: 'Trin 2 · Blød dansk (Balance)',
                tilt: 4,
                effPct: 55,
                polPct: 75,
                text: 'Må jeg lige låne din kuglepen?',
                analysis: 'Småordet "lige" gør tjenesten mindre, så du er mindst muligt til besvær (Høflighedsregel 1).'
            },
            {
                badge: 'Trin 3 · Ekstra hensynsfuld (Høflighed)',
                tilt: 14,
                effPct: 25,
                polPct: 95,
                text: 'Undskyld, må jeg låne din kuglepen et øjeblik, hvis du ikke lige bruger den?',
                analysis: 'Giver en nem udvej ("hvis du ikke lige bruger den") — klassisk dansk Høflighedsregel 1.'
            }
        ]
    },
    {
        id: 'uenig',
        label: 'Uenig på et møde',
        situation: 'En kollega foreslår en plan, som du tror tager for lang tid.',
        levels: [
            {
                badge: 'Trin 1 · Direkte (Effektivitet)',
                tilt: -14,
                effPct: 90,
                polPct: 15,
                text: 'Nej, det er en dårlig idé. Vi har ikke tid.',
                analysis: 'Direkte og ærligt (Effektivitet 2 & 4), men bryder Høflighedsregel 3 (kritik) og 5 (uenighed).'
            },
            {
                badge: 'Trin 2 · Blød dansk (Balance)',
                tilt: 4,
                effPct: 55,
                polPct: 75,
                text: 'Jeg er ikke helt sikker på, at vi har tid nok.',
                analysis: 'Nedtoner kritikken med "ikke helt sikker på" — beskytter relationen (Høflighed 3).'
            },
            {
                badge: 'Trin 3 · Ekstra hensynsfuld (Høflighed)',
                tilt: 14,
                effPct: 25,
                polPct: 95,
                text: 'Jo, det er en rigtig god tanke – men måske mangler vi lidt tid til det?',
                analysis: 'Ros + "jo – men"-konstruktion: du erklærer dig delvist enig først (Høflighed 3 & 5).'
            }
        ]
    },
    {
        id: 'ros',
        label: 'Få ros for mad',
        situation: 'En gæst siger: "Hvor smager din kage fantastisk!"',
        levels: [
            {
                badge: 'Trin 1 · Direkte (Effektivitet)',
                tilt: -14,
                effPct: 85,
                polPct: 20,
                text: 'Ja, jeg er også virkelig god til at bage.',
                analysis: 'Måske 100 % sandt (Effektivitet 2), men bryder Høflighedsregel 4 (beskedenhed) i dansk samtalekultur.'
            },
            {
                badge: 'Trin 2 · Blød dansk (Balance)',
                tilt: 4,
                effPct: 55,
                polPct: 80,
                text: 'Tak! Det er jeg rigtig glad for, at du kan lide.',
                analysis: 'Venlig og varm modtagelse uden selvros (Høflighed 3 & 4).'
            },
            {
                badge: 'Trin 3 · Ekstra beskeden (Høflighed)',
                tilt: 14,
                effPct: 25,
                polPct: 95,
                text: 'Åh, tusind tak — den var nu heldigvis helt nem at lave!',
                analysis: 'Klassisk dansk beskedenhed (Høflighedsregel 4): man nedtoner sin egen indsats, selvom den tog tid.'
            }
        ]
    },
    {
        id: 'afslag',
        label: 'Sige nej til invitation',
        situation: 'En ven inviterer dig til middag på lørdag, men du kan ikke.',
        levels: [
            {
                badge: 'Trin 1 · Direkte (Effektivitet)',
                tilt: -14,
                effPct: 90,
                polPct: 15,
                text: 'Nej, jeg kan ikke komme.',
                analysis: 'Kort og sandt (Effektivitet 1 & 2), men virker brat og mangler varme (Høflighed 3).'
            },
            {
                badge: 'Trin 2 · Blød dansk (Balance)',
                tilt: 4,
                effPct: 55,
                polPct: 75,
                text: 'Jeg kan desværre ikke på lørdag, men tak for invitationen!',
                analysis: '"Desværre" + tak viser sympati og bevarer den gode tone (Høflighed 3).'
            },
            {
                badge: 'Trin 3 · Ekstra hensynsfuld (Høflighed)',
                tilt: 14,
                effPct: 25,
                polPct: 95,
                text: 'Hvor er det sødt af dig at spørge! Jeg kan desværre ikke på lørdag, men kan vi ikke finde en anden dag?',
                analysis: 'Starter positivt og viser vilje (Høflighed 2 & 3), selvom svaret stadig er nej.'
            }
        ]
    },
    {
        id: 'kritik',
        label: 'Give feedback på tekst',
        situation: 'En studiekammerat beder dig læse en tekst, hvor slutningen er for lang.',
        levels: [
            {
                badge: 'Trin 1 · Direkte (Effektivitet)',
                tilt: -14,
                effPct: 90,
                polPct: 15,
                text: 'Slutningen er alt for lang og kedelig.',
                analysis: 'Klart og direkte (Effektivitet 4), men direkte utilfredshed bryder Høflighedsregel 3.'
            },
            {
                badge: 'Trin 2 · Blød dansk (Balance)',
                tilt: 4,
                effPct: 55,
                polPct: 75,
                text: 'Måske kunne slutningen være lidt kortere?',
                analysis: 'Blødgjort forslag ("måske", "kunne", "lidt") giver skribenten handlefrihed (Høflighed 1).'
            },
            {
                badge: 'Trin 3 · Ekstra positiv (Høflighed)',
                tilt: 14,
                effPct: 25,
                polPct: 95,
                text: 'Jeg kan rigtig godt lide starten — måske kunne slutningen bare strammes lidt op?',
                analysis: 'Ros før forslag (Høflighed 3: vær positiv) + lille blødgører ("bare", "lidt").'
            }
        ]
    }
];

const DILEMMA_CASES = [
    {
        ruleTag: 'Høflighedsregel 1 · Hensynsfuld',
        prompt: 'Du vil gerne have din nabo til at passe dine planter i weekenden. Hvad er mest naturligt på dansk?',
        options: [
            { text: 'Du skal vande mine planter i weekenden.', ok: false, why: 'For direkte — indskrænker naboens handlefrihed (bryder Høflighedsregel 1).' },
            { text: 'Undskyld, har du måske mulighed for at vande mine planter i weekenden, hvis det ikke er til besvær?', ok: true, why: 'Spot on! Du giver naboen frihed til at sige nej og viser, at du ikke vil være til besvær (Høflighedsregel 1).' },
            { text: 'Mine planter dør snart, hvis ingen gør noget.', ok: false, why: 'For uklart og indirekte — bryder Effektivitet 4 uden at stille et pænt spørgsmål.' }
        ]
    },
    {
        ruleTag: 'Høflighedsregel 2 · Gavmild',
        prompt: 'En kollega spørger tøvende, om du har tid til at vise et program på computeren. Hvordan svarer du gavmildt?',
        options: [
            { text: 'Okay, men kun i to minutter, jeg har travlt.', ok: false, why: 'Får kollegaen til at føle sig til besvær (modsat Høflighedsregel 2).' },
            { text: 'Ja, selvfølgelig! Det tager kun et øjeblik — lad os kigge på det sammen.', ok: true, why: 'Helt rigtigt! Du viser villighed og nedtoner dit eget besvær (Høflighedsregel 2: vær gavmild).' },
            { text: 'Det står i manualen på side 14.', ok: false, why: 'Effektivt faktasvar, men afvisende i en kollegial samtale.' }
        ]
    },
    {
        ruleTag: 'Høflighedsregel 3 · Positiv',
        prompt: 'Din ven viser stolt sin nye jakke, men farven er ikke lige din smag. Hvordan passer du på stemningen?',
        options: [
            { text: 'Den farve klæder dig slet ikke.', ok: false, why: 'Direkte kritik bryder Høflighedsregel 3 (vær positiv).' },
            { text: 'Den sidder virkelig godt på dig! Og den ser dejlig varm ud.', ok: true, why: 'Du finder noget ægte positivt at rose i stedet for at kritisere (Høflighedsregel 3).' },
            { text: 'Hvor meget kostede den?', ok: false, why: 'Skifter emne (bryder Effektivitet 3) og kan virke som om du ikke kan lide jakken.' }
        ]
    },
    {
        ruleTag: 'Høflighedsregel 4 · Beskeden',
        prompt: 'Din lærer siger foran klassen: "Hvor har du lavet en flot præsentation i dag!" Hvad lyder mest dansk?',
        options: [
            { text: 'Ja, den var virkelig bedre end de andres.', ok: false, why: 'Selvros bryder Høflighedsregel 4 (vær beskeden) på dansk.' },
            { text: 'Tusind tak! Jeg var ellers lidt nervøs, men det var sjovt at lave den.', ok: true, why: 'Naturlig dansk balance: du siger tak, men holder tonen beskeden og nede på jorden (Høflighedsregel 4).' },
            { text: 'Nej, den var faktisk rigtig dårlig.', ok: false, why: 'Overdreven selvkritik kan virke akavet — let beskedenhed + tak fungerer bedst.' }
        ]
    },
    {
        ruleTag: 'Høflighedsregel 5 · Enig (jo – men)',
        prompt: 'En kollega siger: "Vi burde holde alle møder om morgenen kl. 8." Du foretrækker kl. 10. Hvad siger du?',
        options: [
            { text: 'Nej, kl. 8 er et forfærdeligt tidspunkt.', ok: false, why: 'Direkte uenighed skaber modstand og bryder Høflighedsregel 5.' },
            { text: 'Jo, man er jo frisk om morgenen – men kl. 10 passer måske bedre for dem, der afleverer børn?', ok: true, why: 'Perfekt "jo – men"! Du starter med delvis enighed og bringer derefter dit eget synspunkt ind (Høflighedsregel 5).' },
            { text: 'Det bestemmer du selv.', ok: false, why: 'Afslutter samtalen uden at dele dit behov (bryder Effektivitet 1).' }
        ]
    }
];

const JOMEN_PROMPTS = [
    {
        statement: '«Vi burde starte mødet kl. 8 hver dag.»',
        agreeOpts: [
            'Jo, man når meget om morgenen',
            'Ja, på den ene side er det effektivt',
            'Det har du da egentlig ret i'
        ],
        butOpts: [
            'men kl. 10 er måske nemmere for flere.',
            'men nogle har lidt lang transport.',
            'men jeg tænker lidt på dem, der afleverer børn.'
        ]
    },
    {
        statement: '«Dansk vinter er alt for mørk og kedelig.»',
        agreeOpts: [
            'Jo, det er virkelig mørkt i november',
            'Det kan jeg godt forstå, du synes',
            'Ja, man savner helt klart solen'
        ],
        butOpts: [
            'men stearinlys og hygge indendørs er nu også rart.',
            'men foråret føles til gengæld ekstra dejligt.',
            'men sneen kan faktisk gøre det meget lyst.'
        ]
    },
    {
        statement: '«Det er altid bedre at bo i hus end i lejlighed.»',
        agreeOpts: [
            'Jo, det er dejligt med egen have',
            'Det er en god pointe, man har mere plads',
            'Ja, på den ene side er et hus skønt'
        ],
        butOpts: [
            'men en lejlighed kræver mindre arbejde.',
            'men i byen er man tættere på bus og indkøb.',
            'men det kommer måske også an på prisen.'
        ]
    },
    {
        statement: '«Man skal altid svare på beskeder med det samme.»',
        agreeOpts: [
            'Jo, det er rart med hurtige svar',
            'Det har du da ret i, hvis det haster',
            'Ja, det viser helt klart interesse'
        ],
        butOpts: [
            'men nogle gange har man brug for lidt ro.',
            'men på arbejdet kan man ikke altid tjekke telefonen.',
            'men et par timer senere er vel også okay.'
        ]
    }
];

function ensurePrincipperStyles() {
    if (document.getElementById('sh-principper-styles')) return;
    const style = document.createElement('style');
    style.id = 'sh-principper-styles';
    style.textContent = `
        .shp-card {
            background: rgba(15, 23, 42, 0.88);
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 16px;
            padding: 1.25rem 1.35rem;
            margin-bottom: 1.1rem;
            color: #f1f5f9;
        }
        .shp-card h3 {
            margin: 0 0 0.35rem;
            font-size: 1.08rem;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 0.45rem;
            color: #f8fafc;
        }
        .shp-sub {
            margin: 0 0 0.9rem;
            font-size: 0.88rem;
            color: #94a3b8;
            line-height: 1.5;
        }
        .shp-chip-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-bottom: 0.9rem;
        }
        .shp-chip {
            background: rgba(30, 41, 59, 0.9);
            border: 1px solid rgba(148, 163, 184, 0.26);
            color: #cbd5e1;
            padding: 0.38rem 0.78rem;
            border-radius: 999px;
            font-size: 0.82rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .shp-chip:hover {
            border-color: #38bdf8;
            color: #ffffff;
        }
        .shp-chip.active {
            background: #2b6e78;
            border-color: #4c9ba6;
            color: #ffffff;
        }
        .shp-scale-box {
            background: rgba(7, 13, 25, 0.78);
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 14px;
            padding: 1rem 1.1rem;
            margin-bottom: 0.85rem;
        }
        .shp-beam-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
        }
        .shp-meter {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
        }
        .shp-meter-label {
            font-size: 0.76rem;
            font-weight: 700;
            display: flex;
            justify-content: space-between;
        }
        .shp-bar-track {
            height: 7px;
            border-radius: 999px;
            background: rgba(148, 163, 184, 0.16);
            overflow: hidden;
        }
        .shp-bar-fill {
            height: 100%;
            border-radius: 999px;
            transition: width 0.25s ease;
        }
        .shp-slider-tabs {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.45rem;
            margin-bottom: 0.9rem;
        }
        .shp-level-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.24);
            color: #cbd5e1;
            padding: 0.5rem 0.6rem;
            border-radius: 10px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .shp-level-btn.active {
            background: rgba(56, 189, 248, 0.18);
            border-color: #38bdf8;
            color: #f8fafc;
        }
        .shp-sentence-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            flex-wrap: wrap;
            padding: 0.85rem 1rem;
            border-radius: 12px;
            background: rgba(30, 41, 59, 0.65);
            border-left: 3px solid #38bdf8;
            margin-bottom: 0.65rem;
        }
        .shp-sentence-text {
            font-size: 1.05rem;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.45;
        }
        .shp-speak-btn {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.2);
            color: #e2e8f0;
            padding: 0.35rem 0.7rem;
            border-radius: 999px;
            font-size: 0.78rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            flex-shrink: 0;
        }
        .shp-speak-btn:hover {
            border-color: #4c9ba6;
            background: rgba(76, 155, 166, 0.14);
        }
        .shp-analysis {
            font-size: 0.86rem;
            color: #cbd5e1;
            line-height: 1.5;
        }
        .shp-two-col {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 0.85rem;
        }
        .shp-col-box {
            background: rgba(7, 13, 25, 0.68);
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 14px;
            padding: 0.9rem 1rem;
        }
        .shp-col-title {
            font-size: 0.88rem;
            font-weight: 800;
            margin: 0 0 0.65rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .shp-rule-item {
            width: 100%;
            text-align: left;
            background: rgba(30, 41, 59, 0.55);
            border: 1px solid rgba(148, 163, 184, 0.16);
            border-radius: 10px;
            padding: 0.6rem 0.75rem;
            margin-bottom: 0.45rem;
            color: #e2e8f0;
            cursor: pointer;
            transition: border-color 0.15s ease;
        }
        .shp-rule-item:hover {
            border-color: rgba(148, 163, 184, 0.42);
        }
        .shp-rule-head {
            font-size: 0.86rem;
            font-weight: 700;
            color: #f8fafc;
        }
        .shp-rule-desc {
            font-size: 0.8rem;
            color: #94a3b8;
            margin-top: 0.18rem;
            line-height: 1.4;
        }
        .shp-rule-ex {
            margin-top: 0.45rem;
            padding-top: 0.45rem;
            border-top: 1px solid rgba(148, 163, 184, 0.16);
            font-size: 0.8rem;
            color: #7dd3fc;
            line-height: 1.45;
        }
        .shp-opt-btn {
            width: 100%;
            text-align: left;
            background: rgba(30, 41, 59, 0.72);
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 11px;
            padding: 0.7rem 0.9rem;
            margin-bottom: 0.5rem;
            color: #f1f5f9;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .shp-opt-btn:hover {
            border-color: #38bdf8;
        }
        .shp-opt-btn.ok {
            background: rgba(34, 197, 94, 0.16);
            border-color: #22c55e;
        }
        .shp-opt-btn.err {
            background: rgba(239, 68, 68, 0.14);
            border-color: #ef4444;
        }
        .shp-fb {
            margin-top: 0.55rem;
            padding: 0.7rem 0.9rem;
            border-radius: 10px;
            font-size: 0.86rem;
            line-height: 1.45;
        }
        .shp-fb.ok {
            background: rgba(34, 197, 94, 0.14);
            border: 1px solid rgba(34, 197, 94, 0.45);
            color: #dcfce7;
        }
        .shp-fb.err {
            background: rgba(239, 68, 68, 0.14);
            border: 1px solid rgba(239, 68, 68, 0.45);
            color: #fee2e2;
        }
        .shp-input {
            width: 100%;
            box-sizing: border-box;
            background: rgba(7, 13, 25, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 10px;
            padding: 0.55rem 0.8rem;
            color: #f8fafc;
            font-size: 0.88rem;
            margin-top: 0.35rem;
        }
        .shp-input:focus {
            outline: none;
            border-color: #38bdf8;
        }
        @media (max-width: 640px) {
            .shp-slider-tabs { grid-template-columns: 1fr; }
        }
    `;
    document.head.appendChild(style);
}

export function createSamtalePrincipperTab() {
    ensurePrincipperStyles();

    const root = document.createElement('div');

    // =========================================================================
    // A. VÆGTSKÅL & "SKRU OP FOR HØFLIGHEDEN"-SKYDER
    // =========================================================================
    const sliderCard = document.createElement('div');
    sliderCard.className = 'shp-card';
    let caseIdx = 0;
    let levelIdx = 1; // start i "Blød dansk"

    function renderSlider() {
        const c = SLIDER_CASES[caseIdx];
        const lv = c.levels[levelIdx];
        sliderCard.innerHTML = `
            <h3>${SVG_SCALE} <span>A. Vægtskålen: Skru op for høfligheden</span></h3>
            <p class="shp-sub">Vælg en hverdagssituation og mærk forskellen, når du skruer fra ren <strong>effektivitet</strong> (direkte) mod dansk <strong>høflighed</strong>.</p>
            <div class="shp-chip-row">
                ${SLIDER_CASES.map((item, i) => `
                    <button type="button" class="shp-chip ${i === caseIdx ? 'active' : ''}" data-ci="${i}">${item.label}</button>
                `).join('')}
            </div>
            <div style="font-size:0.86rem; color:#cbd5e1; margin-bottom:0.65rem;"><strong>Situation:</strong> ${c.situation}</div>
            <div class="shp-slider-tabs">
                <button type="button" class="shp-level-btn ${levelIdx === 0 ? 'active' : ''}" data-li="0">1. Direkte (Effektiv)</button>
                <button type="button" class="shp-level-btn ${levelIdx === 1 ? 'active' : ''}" data-li="1">2. Blød dansk</button>
                <button type="button" class="shp-level-btn ${levelIdx === 2 ? 'active' : ''}" data-li="2">3. Ekstra hensynsfuld</button>
            </div>
            <div class="shp-scale-box">
                <div class="shp-beam-wrap">
                    <div class="shp-meter">
                        <div class="shp-meter-label" style="color:#fbbf24;"><span>Effektivitet (kort & direkte)</span><span>${lv.effPct}%</span></div>
                        <div class="shp-bar-track"><div class="shp-bar-fill" style="width:${lv.effPct}%; background:#f59e0b;"></div></div>
                    </div>
                    <div class="shp-meter">
                        <div class="shp-meter-label" style="color:#7dd3fc;"><span>Høflighed (relation & hensyn)</span><span>${lv.polPct}%</span></div>
                        <div class="shp-bar-track"><div class="shp-bar-fill" style="width:${lv.polPct}%; background:#38bdf8;"></div></div>
                    </div>
                </div>
                <div class="shp-sentence-row">
                    <div class="shp-sentence-text">»${lv.text}«</div>
                    <button type="button" class="shp-speak-btn" id="shp-slider-speak">${SVG_SPEAK}<span>Lyt</span></button>
                </div>
                <div class="shp-analysis"><strong>Pragmatik-røntgen (${lv.badge}):</strong> ${lv.analysis}</div>
            </div>
        `;
        sliderCard.querySelectorAll('.shp-chip[data-ci]').forEach(b => {
            b.onclick = () => { caseIdx = Number(b.dataset.ci); renderSlider(); };
        });
        sliderCard.querySelectorAll('.shp-level-btn[data-li]').forEach(b => {
            b.onclick = () => { levelIdx = Number(b.dataset.li); renderSlider(); };
        });
        sliderCard.querySelector('#shp-slider-speak').onclick = () => speakDa(lv.text);
    }
    renderSlider();
    root.appendChild(sliderCard);

    // =========================================================================
    // B. DE TO REGELSÆT SIDE OM SIDE (KLIKBARE REGELKORT)
    // =========================================================================
    const rulesCard = document.createElement('div');
    rulesCard.className = 'shp-card';
    let openRuleKey = 'pol_1';

    function renderRules() {
        rulesCard.innerHTML = `
            <h3>B. De to principper i samtalens kunst</h3>
            <p class="shp-sub">Klik på en regel for at se, hvordan den virker i dansk hverdagssprog.</p>
            <div class="shp-two-col">
                <div class="shp-col-box">
                    <div class="shp-col-title" style="color:#fbbf24;">Effektivitetsreglerne (1–4)</div>
                    ${EFFICIENCY_RULES.map(r => {
                        const k = `eff_${r.num}`;
                        const isOpen = openRuleKey === k;
                        return `
                            <button type="button" class="shp-rule-item" data-rk="${k}">
                                <div class="shp-rule-head">${r.num}. ${r.title}</div>
                                <div class="shp-rule-desc">${r.desc}</div>
                                ${isOpen ? `<div class="shp-rule-ex">${r.example}</div>` : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
                <div class="shp-col-box">
                    <div class="shp-col-title" style="color:#7dd3fc;">Høflighedsreglerne (1–5)</div>
                    ${POLITENESS_RULES.map(r => {
                        const k = `pol_${r.num}`;
                        const isOpen = openRuleKey === k;
                        return `
                            <button type="button" class="shp-rule-item" data-rk="${k}">
                                <div class="shp-rule-head">${r.num}. ${r.title}</div>
                                <div class="shp-rule-desc">${r.desc}</div>
                                ${isOpen ? `<div class="shp-rule-ex">${r.example}</div>` : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        rulesCard.querySelectorAll('.shp-rule-item').forEach(b => {
            b.onclick = () => {
                const k = b.dataset.rk;
                openRuleKey = openRuleKey === k ? '' : k;
                renderRules();
            };
        });
    }
    renderRules();
    root.appendChild(rulesCard);

    // =========================================================================
    // C. DE 5 HØFLIGHEDSREGLER I PRAKSIS (DILEMMA-QUIZ)
    // =========================================================================
    const quizCard = document.createElement('div');
    quizCard.className = 'shp-card';
    let qIdx = 0;
    let pickedOpt = null;
    const solvedSet = new Set();

    function renderQuiz() {
        const q = DILEMMA_CASES[qIdx];
        quizCard.innerHTML = `
            <h3>C. De 5 høflighedsregler i praksis (${solvedSet.size}/${DILEMMA_CASES.length})</h3>
            <p class="shp-sub">Vælg det svar, der rammer dansk høflighed bedst, og se hvilken regel der er på spil.</p>
            <div class="shp-chip-row">
                ${DILEMMA_CASES.map((_, i) => `
                    <button type="button" class="shp-chip ${i === qIdx ? 'active' : ''}" data-qi="${i}">
                        ${solvedSet.has(i) ? `${SVG_CHECK} ` : ''}Regel ${i + 1}
                    </button>
                `).join('')}
            </div>
            <div style="font-size:0.78rem; font-weight:700; color:#7dd3fc; margin-bottom:0.3rem;">${q.ruleTag}</div>
            <div style="font-size:0.96rem; font-weight:700; color:#f8fafc; margin-bottom:0.75rem; line-height:1.45;">${q.prompt}</div>
            <div id="shp-q-opts">
                ${q.options.map((opt, oi) => {
                    const cls = pickedOpt === oi ? (opt.ok ? 'ok' : 'err') : '';
                    return `<button type="button" class="shp-opt-btn ${cls}" data-oi="${oi}">»${opt.text}«</button>`;
                }).join('')}
            </div>
            ${pickedOpt !== null ? `
                <div class="shp-fb ${q.options[pickedOpt].ok ? 'ok' : 'err'}">
                    <strong>${q.options[pickedOpt].ok ? 'Rigtigt!' : 'Ikke helt:'}</strong> ${q.options[pickedOpt].why}
                </div>
                ${q.options[pickedOpt].ok && qIdx < DILEMMA_CASES.length - 1 ? `
                    <div style="margin-top:0.65rem;">
                        <button type="button" class="shp-chip active" id="shp-q-next">Næste regel →</button>
                    </div>
                ` : ''}
            ` : ''}
        `;
        quizCard.querySelectorAll('.shp-chip[data-qi]').forEach(b => {
            b.onclick = () => { qIdx = Number(b.dataset.qi); pickedOpt = null; renderQuiz(); };
        });
        quizCard.querySelectorAll('.shp-opt-btn').forEach(b => {
            b.onclick = () => {
                pickedOpt = Number(b.dataset.oi);
                if (q.options[pickedOpt].ok) {
                    solvedSet.add(qIdx);
                    speakDa(q.options[pickedOpt].text);
                }
                renderQuiz();
            };
        });
        const nextBtn = quizCard.querySelector('#shp-q-next');
        if (nextBtn) {
            nextBtn.onclick = () => { qIdx++; pickedOpt = null; renderQuiz(); };
        }
    }
    renderQuiz();
    root.appendChild(quizCard);

    // =========================================================================
    // D. "JO – MEN"-BYGGER (HØFLIGHEDSREGEL 5 I PRAKSIS)
    // =========================================================================
    const jomenCard = document.createElement('div');
    jomenCard.className = 'shp-card';
    let jmIdx = 0;
    let jmAgreeIdx = 0;
    let jmButIdx = 0;
    let jmCustomBut = '';

    function renderJoMen() {
        const item = JOMEN_PROMPTS[jmIdx];
        const agreeText = item.agreeOpts[jmAgreeIdx];
        const butText = jmCustomBut.trim()
            ? (jmCustomBut.trim().toLowerCase().startsWith('men') ? jmCustomBut.trim() : `men ${jmCustomBut.trim()}`)
            : item.butOpts[jmButIdx];
        const fullSentence = `${agreeText} – ${butText}`;

        jomenCard.innerHTML = `
            <h3>D. Byg en «jo – men»-sætning (Høflighedsregel 5)</h3>
            <p class="shp-sub">Når du er uenig på dansk, starter du ofte med <strong>delvis enighed</strong> og tilføjer derefter dit eget synspunkt med <strong>men</strong>.</p>
            <div class="shp-chip-row">
                ${JOMEN_PROMPTS.map((_, i) => `
                    <button type="button" class="shp-chip ${i === jmIdx ? 'active' : ''}" data-jmi="${i}">Påstand ${i + 1}</button>
                `).join('')}
            </div>
            <div style="padding:0.75rem 0.95rem; border-radius:10px; background:rgba(30,41,59,0.55); margin-bottom:0.85rem; font-size:0.95rem; font-weight:700; color:#f8fafc;">
                Samtalepartner siger: ${item.statement}
            </div>
            <div style="margin-bottom:0.75rem;">
                <div style="font-size:0.8rem; font-weight:800; color:#4ade80; margin-bottom:0.35rem;">1. Delvis enighed (blød start):</div>
                <div class="shp-chip-row" style="margin-bottom:0;">
                    ${item.agreeOpts.map((opt, i) => `
                        <button type="button" class="shp-chip ${i === jmAgreeIdx ? 'active' : ''}" data-ai="${i}">${opt}</button>
                    `).join('')}
                </div>
            </div>
            <div style="margin-bottom:0.85rem;">
                <div style="font-size:0.8rem; font-weight:800; color:#7dd3fc; margin-bottom:0.35rem;">2. Dit eget synspunkt (blød uenighed):</div>
                <div class="shp-chip-row" style="margin-bottom:0.35rem;">
                    ${item.butOpts.map((opt, i) => `
                        <button type="button" class="shp-chip ${!jmCustomBut.trim() && i === jmButIdx ? 'active' : ''}" data-bi="${i}">${opt}</button>
                    `).join('')}
                </div>
                <input type="text" id="shp-jm-custom" class="shp-input" value="${jmCustomBut.replace(/"/g, '&quot;')}" placeholder="Eller skriv din egen fortsættelse efter 'men'..." autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" />
            </div>
            <div class="shp-sentence-row" style="margin-bottom:0;">
                <div class="shp-sentence-text"><span style="color:#86efac;">${agreeText}</span> – <span style="color:#7dd3fc;">${butText}</span></div>
                <button type="button" class="shp-speak-btn" id="shp-jm-speak">${SVG_SPEAK}<span>Lyt</span></button>
            </div>
        `;

        jomenCard.querySelectorAll('.shp-chip[data-jmi]').forEach(b => {
            b.onclick = () => { jmIdx = Number(b.dataset.jmi); jmAgreeIdx = 0; jmButIdx = 0; jmCustomBut = ''; renderJoMen(); };
        });
        jomenCard.querySelectorAll('.shp-chip[data-ai]').forEach(b => {
            b.onclick = () => { jmAgreeIdx = Number(b.dataset.ai); renderJoMen(); };
        });
        jomenCard.querySelectorAll('.shp-chip[data-bi]').forEach(b => {
            b.onclick = () => { jmButIdx = Number(b.dataset.bi); jmCustomBut = ''; renderJoMen(); };
        });
        const customInput = jomenCard.querySelector('#shp-jm-custom');
        customInput.oninput = (e) => {
            jmCustomBut = e.target.value;
            const liveText = jomenCard.querySelector('.shp-sentence-text');
            const liveBut = jmCustomBut.trim()
                ? (jmCustomBut.trim().toLowerCase().startsWith('men') ? jmCustomBut.trim() : `men ${jmCustomBut.trim()}`)
                : item.butOpts[jmButIdx];
            if (liveText) {
                liveText.innerHTML = `<span style="color:#86efac;">${agreeText}</span> – <span style="color:#7dd3fc;">${liveBut}</span>`;
            }
        };
        jomenCard.querySelector('#shp-jm-speak').onclick = () => {
            const liveBut = jmCustomBut.trim()
                ? (jmCustomBut.trim().toLowerCase().startsWith('men') ? jmCustomBut.trim() : `men ${jmCustomBut.trim()}`)
                : item.butOpts[jmButIdx];
            speakDa(`${agreeText} – ${liveBut}`);
        };
    }
    renderJoMen();
    root.appendChild(jomenCard);

    return root;
}
