import { baseUrl } from '../utils/config.js';

/**
 * SansningIntegration.js
 * Etape 1 + Etape 2 for "Grammatik og min sansning af verden":
 * 1. Global Krops- & Hovedflade-navigation (top-menu + stations-strip som i Grounding)
 * 2. Overordnet 4-Zoners Krops- & Verdens-Vrimlebillede til hovedsiden
 * 3. Den Røde Tråd (gennemgående hverdagsfortælling på tværs af stationerne i hver hovedflade)
 * 4. Taktilt Grounding-Laboratorium (interaktive SVG-fysikøvelser + live sætningsbånd + lyd for alle 19 stationer)
 * 5. Automatisk bro-integration på alle 19 understationer (.sansning-station-view)
 */

export function speakSansningDanish(text) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/<[^>]*>/g, '').replace(/[•➔⬅⚡]/g, '').trim();
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = 'da-DK';
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
}

export const SANSNING_REALMS = {
    flade1: {
        id: 'flade1',
        num: 1,
        route: 'sansning_flade1',
        shortTitle: '1. Substans & Bestemthed',
        fullTitle: 'Flade 1: Substans, form og bestemthed (Tingene og deres grænser)',
        bodyAnchor: 'Hvordan sanserne skærer verden ud i flydende stof, enheder og udpegede ting',
        accent: '#38bdf8',
        secondaryAccent: '#fb923c',
        groundingRoute: 'grounding',
        groundingLabel: 'Grounding: Substantiv-anker & Artikel-lås',
        hotspot: { x: 13, y: 66 },
        zoneTitle: 'Zone 1: Substansen på bordet — Stof, Enhed, Spotlight & Adjektiv-kile',
        zoneQuestion: 'Møder vi uafgrænset stof (kaffe, træ), en tællelig enhed (en kop, et træ) eller en kendt, udpeget genstand (koppen, den varme kop)?',
        storyTitle: 'Den røde tråd i Flade 1: Fra rå kaffe og træ til den varme kop på bordet',
        storyDesc: 'Følg hvordan vores sanser først møder rå substans uden grænser (1.1), zoomer mellem materiale og individ (1.2), tænder spotlightet fra ubestemt til bestemt (1.3), kiler en egenskab ind foran tingen (1.4) og pakker en aktivitet ind til en fast ting (1.5):',
        stations: [
            {
                num: '1.1',
                route: 'sansning_form_masse',
                short: 'Masse vs. form',
                title: 'Utællelig masse vs. tællelig form (kaffe/mel vs. en kop/to boller)',
                storyStep: 'Kapitel 1: Fra flydende kaffe til faste kopper',
                storyTilstand: 'Der er varm kaffe og frisk mel i køkkenet.',
                storyForvandling: 'Jeg hælder en kop kaffe op og spiser to boller.',
                tactileTitle: 'Form-støberen: Uafgrænset stof vs. Fast kontur med artikel-anker',
                tactilePrompt: 'Se hvordan dansk grammatik først kan sætte "en/et" eller tal foran, når stoffet støbes ind i en fast, synlig grænse:',
                modes: [
                    {
                        id: 'masse',
                        btnLabel: '🔵 Hæld frit: Uafgrænset masse (ingen artikel)',
                        badge: 'Flydende stof uden kontur • Utælleligt',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Mængdeord', text: 'Der er meget', role: 'pred' },
                            { label: 'Ren masse (0 artikel)', text: 'kaffe og vand', role: 'verb-cool' },
                            { label: 'Sted', text: 'i kanden.', role: 'subj' }
                        ],
                        sentence: 'Der er meget kaffe og vand i kanden.',
                        explain: '<strong>UTÆLLELIG MASSE:</strong> Flydende stoffer og masser (<em>vand, kaffe, mælk, mel, sukker</em>) har ingen fast ydre skal. Derfor står de uden <em>en/et</em>, tager <strong>meget</strong> (ikke mange) og kan ikke tælles.',
                        svgType: 'mass_free'
                    },
                    {
                        id: 'form',
                        btnLabel: '🟠 Sæt fast beholder/kontur om (EN / TO -ER)',
                        badge: 'Afgrænset kontur • Tællelig genstand',
                        color: '#fb923c',
                        slots: [
                            { label: 'Anker / Tal', text: 'En', role: 'obj-warm' },
                            { label: 'Afgrænset form', text: 'kop kaffe', role: 'verb-warm' },
                            { label: 'Flertal (+mange)', text: 'og to boller.', role: 'subj' }
                        ],
                        sentence: 'Jeg tager en kop kaffe og to boller.',
                        explain: '<strong>TÆLLELIG FORM:</strong> Så snart massen får en fast beholder (<em>en kop kaffe, en skive brød</em>) eller bages i en afgrænset form (<em>en bolle ➔ mange boller</em>), griber artikel- og tal-ankeret fat!',
                        svgType: 'mass_molded'
                    }
                ]
            },
            {
                num: '1.2',
                route: 'sansning_stof_enhed',
                short: 'Stof vs. individ',
                title: 'Når samme ord skifter mellem stof og genstand (fisk/en fisk, træ/et træ, meget/mange)',
                storyStep: 'Kapitel 2: Materialet eller individet?',
                storyTilstand: 'Bordet er lavet af træ, og vi spiser fisk og drikker øl.',
                storyForvandling: 'Udenfor står et højt træ, og Mads fanger en fisk og åbner en øl.',
                tactileTitle: 'Zoom-linsen: Makro-zoom på stoffet (0 artikel) vs. Helheds-linse på individet (en/et)',
                tactilePrompt: 'Zoom enten helt tæt ind på selve materialet (træ, fisk, øl, glas) eller træk linsen tilbage så du ser det afgrænsede individ:',
                modes: [
                    {
                        id: 'stof_makro',
                        btnLabel: '🔵 Zoom helt tæt på materialet: Ren substans (TRÆ / FISK / ØL)',
                        badge: 'Makro-linse • Ingen ydre kant • Utælleligt stof',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Genstand', text: 'Bordet er lavet af', role: 'subj' },
                            { label: 'Materiale (0 artikel)', text: 'træ,', role: 'verb-cool' },
                            { label: 'Mad-substans', text: 'og vi får fisk og øl.', role: 'pred' }
                        ],
                        sentence: 'Bordet er lavet af træ, og vi får fisk og øl.',
                        explain: '<strong>STOF-LINSEN (Materiale på tallerkenen eller i hånden):</strong> Når vi zoomer så tæt ind, at vi kun ser teksturen/massen (<em>træ, glas, fisk på tallerkenen, chokolade, øl i fustagen</em>), bruges ingen artikel.',
                        svgType: 'substance_zoom_in'
                    },
                    {
                        id: 'individ_helhed',
                        btnLabel: '🟠 Træk linsen tilbage: Se det hele individ (ET TRÆ / EN FISK / EN ØL)',
                        badge: 'Helheds-linse • Ydre omrids • Tælleligt individ',
                        color: '#fb923c',
                        slots: [
                            { label: 'Sted', text: 'I haven står', role: 'subj' },
                            { label: 'Afgrænset T-ord', text: 'et træ,', role: 'verb-warm' },
                            { label: 'Afgrænset N-ord', text: 'og Mads fanger en fisk.', role: 'obj-warm' }
                        ],
                        sentence: 'I haven står et træ, og Mads fanger en fisk.',
                        explain: '<strong>INDIVID-LINSEN (Afgrænset helhed med omrids):</strong> Når vi træder et skridt tilbage og ser hele organismen eller flasken med ydre kontur (<em>et træ med krone, en levende fisk, en flaske øl, et drikkeglas</em>), låser <strong>en/et</strong> sig straks på!',
                        svgType: 'substance_zoom_out'
                    }
                ]
            },
            {
                num: '1.3',
                route: 'sansning_bestemthed',
                short: 'Ubestemt vs. bestemt',
                title: 'Mentalt spotlight: Ny ukendt enhed (en kop / stole) vs. Kendt i fælles synsfelt (koppen / stolene)',
                storyStep: 'Kapitel 3: Fra en tilfældig kop til koppen på bordet',
                storyTilstand: 'Mads åbner skabet og tager en kop (hvilken som helst af mange).',
                storyForvandling: 'Nu står koppen på bordet — både du og Mads kigger på koppen.',
                tactileTitle: 'Spotlight-keglen: Bred søgekegle i mængden (EN KOP) vs. Låst projektør (KOPPEN)',
                tactilePrompt: 'Skift mellem at introducere en ny, ikke-udpeget ting på scenen (foranstillet en/et) og at låse fokus på den kendte ting (baghængt -en/-et/-ne):',
                modes: [
                    {
                        id: 'ubestemt_ny',
                        btnLabel: '🔵 Bred søgekegle: Introducér ny enhed fra mængden (EN KOP / STOLE)',
                        badge: 'Ubestemt form • Ny for lytteren • Foranstillet en/et',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Handling', text: 'Mads leder efter', role: 'subj' },
                            { label: 'Ubestemt ental', text: 'en kop', role: 'verb-cool' },
                            { label: 'Ubestemt flertal', text: 'og to stole.', role: 'pred' }
                        ],
                        sentence: 'Mads leder efter en kop og to stole.',
                        explain: '<strong>UBESTEMT FORM (en kop / et bord / stole):</strong> Tingen er endnu ikke låst i lytterens bevidsthed — det kan være en hvilken som helst kop i skabet.',
                        svgType: 'spotlight_indef'
                    },
                    {
                        id: 'bestemt_kendt',
                        btnLabel: '🟠 Lås projektøren: Fælles synsfelt (KOP-PEN / STOL-ENE)',
                        badge: 'Bestemt form • Kendt for os begge • Baghængt -en/-et/-ne!',
                        color: '#fb923c',
                        slots: [
                            { label: 'Kendt ting 1 (Ental)', text: 'Koppen', role: 'verb-warm' },
                            { label: 'Placering', text: 'står på bordet ved', role: 'subj' },
                            { label: 'Kendt ting 2 (Flertal)', text: 'stolene.', role: 'obj-warm' }
                        ],
                        sentence: 'Koppen står på bordet ved stolene.',
                        explain: '<strong>BESTEMT FORM (kop-pen / bord-et / stol-ene):</strong> Så snart tingen er inde i vores fælles synsfelt, smelter artiklen på dansk fast <em>bag på</em> substantivet som et fysisk anker!',
                        svgType: 'spotlight_def'
                    }
                ]
            },
            {
                num: '1.4',
                route: 'sansning_adjektiv_bestemthed',
                short: 'Huset vs. det røde hus',
                title: 'Adjektiv-kilen: Baghængt bestemthed (huset/koppen) vs. Foranstillet bestemthed (det røde hus/den varme kop)',
                storyStep: 'Kapitel 4: Når en sanset egenskab kiler sig ind foran tingen',
                storyTilstand: 'Uden adjektiv: Koppen står på bordet ved huset.',
                storyForvandling: 'Med adjektiv-kile: Den varme kop står på bordet ved det røde hus.',
                tactileTitle: 'Magnet-kilen: Skub et adjektiv ind i "hus-et" og se "-et" springe frem som "DET"!',
                tactilePrompt: 'Mærk det fysiske spændingsfelt i dansk: Bestemtheds-ankeret (-en/-et/-ne) sidder bagpå, men skubbes frem foran som DEN/DET/DE, når et adjektiv kiler sig ind:',
                modes: [
                    {
                        id: 'baghaengt_ren',
                        btnLabel: '🔵 Uden adjektiv: Ankeret sidder trygt bagpå (HUS-ET / KOP-PEN)',
                        badge: 'Ingen kile • Baghængt bestemthed (-en / -et / -ne)',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Substantiv + -ET', text: 'Huset', role: 'verb-cool' },
                            { label: 'Verbum', text: 'har udsigt, og', role: 'subj' },
                            { label: 'Substantiv + -EN', text: 'koppen er klar.', role: 'pred' }
                        ],
                        sentence: 'Huset har udsigt, og koppen er klar.',
                        explain: '<strong>BAGHÆNGT ANKER (hus-et / kop-pen / hus-ene):</strong> Når substantivet står alene uden beskrivende adjektiv foran, hænger bestemtheds-endelsen direkte bag på ordet.',
                        svgType: 'def_suffix_back'
                    },
                    {
                        id: 'foranstillet_kile',
                        btnLabel: '🟠 Skub Adjektiv-kilen ind: Ankeret springer frem (DET RØDE HUS)',
                        badge: 'Adjektiv kiler sig ind ➔ -et springer frem som DET + -e!',
                        color: '#fb923c',
                        slots: [
                            { label: 'Fremrykket anker', text: 'Det', role: 'obj-warm' },
                            { label: 'Adjektiv-kile (+e)', text: 'røde', role: 'verb-warm' },
                            { label: 'Nøgent substantiv', text: 'hus (og den varme kop).', role: 'subj' }
                        ],
                        sentence: 'Det røde hus har udsigt, og den varme kop er klar.',
                        explain: '<strong>ADJEKTIV-KILEN (det røde hus / den varme kop / de røde huse):</strong> Når egenskaben (<em>rød / varm</em>) kiler sig ind foran substantivet, skubbes bestemtheds-ankeret frem foran hele gruppen som <strong>den / det / de</strong>, mens adjektivet får <strong>-e</strong> og substantivet står nøgent!',
                        svgType: 'def_wedge_front'
                    }
                ]
            },
            {
                num: '1.5',
                route: 'sansning_aktivitet_til_ting',
                short: 'Fra aktivitet til ting',
                title: 'Når en handling bliver til en fast ting (at træne ➔ træning • at læse ➔ læsning)',
                storyStep: 'Kapitel 5: Fra levende aktivitet til håndgribelig ting',
                storyTilstand: 'Det er sundt at træne og afslappende at læse om aftenen.',
                storyForvandling: 'Træningen starter kl. 17, og læsning giver ro om aftenen.',
                tactileTitle: 'Støbe-kapslen: En aktivitet i bevægelse (at træne) vs. En fast ting (træning)',
                tactilePrompt: 'Se hvordan en handling i bevægelse pakkes ind med -ing / -else og bliver til en ting, du kan pege på og sætte forrest i sætningen:',
                modes: [
                    {
                        id: 'aktivitet_flow',
                        btnLabel: '🔵 I bevægelse: En aktivitet i gang (at træne / at læse)',
                        badge: 'Levende handling i tiden • Verbum (at + ...)',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Ramme', text: 'Det er sundt', role: 'subj' },
                            { label: 'Aktivitet', text: 'at træne', role: 'verb-cool' },
                            { label: 'Tid', text: 'hver tirsdag.', role: 'pred' }
                        ],
                        sentence: 'Det er sundt at træne hver tirsdag.',
                        explain: '<strong>AKTIVITET (at træne / at læse):</strong> Handlingen folder sig ud i tiden som bevægelse. Vi beskriver hvad nogen gør.',
                        svgType: 'activity_flow'
                    },
                    {
                        id: 'fast_ting',
                        btnLabel: '🟠 Støb til ting: Pak aktiviteten ind (TRÆNING / LÆSNING)',
                        badge: 'Fast pakke med -ing / -else • Substantiv',
                        color: '#fb923c',
                        slots: [
                            { label: 'Ting (subjekt)', text: 'Træningen', role: 'obj-warm' },
                            { label: 'Verbum', text: 'starter', role: 'verb-warm' },
                            { label: 'Tid', text: 'kl. 17 hver tirsdag.', role: 'subj' }
                        ],
                        sentence: 'Træningen starter kl. 17 hver tirsdag.',
                        explain: '<strong>FAST TING (træning / læsning / bevægelse):</strong> Med endelsen <em>-ing / -ning / -else</em> støbes hele aktiviteten til en fast ting, man kan pege på og sætte <strong>-en</strong> bagpå.',
                        svgType: 'activity_thing'
                    }
                ]
            }
        ]
    },

    flade2: {
        id: 'flade2',
        num: 2,
        route: 'sansning_flade2',
        shortTitle: '2. Tilstand & Bevægelse',
        fullTitle: 'Flade 2: Tilstand og bevægelse (Hvile, kraft og forandring)',
        bodyAnchor: 'Hviler kroppen og tingen i ro (0 N), eller sker der en kraftoverførsel og et faseskift?',
        accent: '#38bdf8',
        secondaryAccent: '#fb923c',
        groundingRoute: 'grounding',
        groundingLabel: 'Grounding: Verbum-motor & Kraftoverførsel',
        hotspot: { x: 29, y: 54 },
        zoneTitle: 'Zone 2: Kroppens Fysik — Tilstand i ro vs. Bevægelse, Kraft & Forandring',
        zoneQuestion: 'Er noget i ro i en stabil tilstand (er, ligger, hjemme, har arbejdet, sidder og læser), eller sker der en aktiv bevægelse og faseovergang (bliver, lægger, hjem, er gået, sætter sig til)?',
        storyTitle: 'Den røde tråd i Flade 2: Fra stilstand og hvile i rummet til kraft, tærskelskift og forandring',
        storyDesc: 'Alle 5 stationer i Hovedflade 2 deler den samme kognitive kerne: Forskellen på tilstand i ro (🔵) og bevægelse, kraft eller grænseskift gennem rum og tid (🟠):',
        stations: [
            {
                num: '2.1',
                route: 'sansning_vaere_blive',
                short: 'Være vs. blive',
                title: 'Væren vs. tilblivelse (er vs. bliver)',
                storyStep: 'Kapitel 1: Temperaturen',
                storyTilstand: 'Kaffen er varm i kanden.',
                storyForvandling: 'Kaffen bliver kold på bordet.',
                tactileTitle: 'Termometer & Faseskift: Tilstand i ro (er) vs. Overgang (bliver)',
                tactilePrompt: 'Skift mellem en fastfrosset tilstand uden ændring (🔵 ER) og en aktiv temperatur-forvandling i gang (🟠 BLIVER):',
                modes: [
                    {
                        id: 'tilstand',
                        btnLabel: '🔵 Frys tilstand i ro (ER)',
                        badge: '0% ændring • Stabil tilstand',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Subjekt', text: 'Kaffen', role: 'subj' },
                            { label: 'Tilstands-verbum', text: 'er', role: 'verb-cool' },
                            { label: 'Egenskab', text: 'varm.', role: 'pred' }
                        ],
                        sentence: 'Kaffen er varm.',
                        explain: '<strong>ER (Væren i ro):</strong> Termometeret står helt stille. Der sker intet omslag — vi fotograferer blot en eksisterende tilstand.',
                        svgType: 'thermometer_still'
                    },
                    {
                        id: 'forvandling',
                        btnLabel: '🟠 Start fase-forvandling (BLIVER)',
                        badge: 'Aktiv overgang • Ny tilstand opstår',
                        color: '#fb923c',
                        slots: [
                            { label: 'Subjekt', text: 'Kaffen', role: 'subj' },
                            { label: 'Forvandlings-verbum', text: 'bliver', role: 'verb-warm' },
                            { label: 'Ny tilstand', text: 'kold.', role: 'pred-warm' }
                        ],
                        sentence: 'Kaffen bliver kold.',
                        explain: '<strong>BLIVER (Tilblivelse):</strong> Nu bevæger kviksølvet sig! Kaffen krydser grænsen fra én tilstand (varm) til en ny (kold).',
                        svgType: 'thermometer_change'
                    }
                ]
            },
            {
                num: '2.2',
                route: 'sansning_kraft_hvile',
                short: 'Ligge vs. lægge',
                title: 'Tingens hvile vs. kroppens kraft (ligge/lægge, stå/stille, sidde/sætte)',
                storyStep: 'Kapitel 2: Hvile vs. muskelkraft',
                storyTilstand: 'Kaffekoppen står (og bogen ligger) på bordet.',
                storyForvandling: 'Jeg stiller koppen (og lægger bogen) på bordet.',
                tactileTitle: 'Kraft-vektoren: Hvile (0 Newton) vs. Håndens skub (+ Objekt)',
                tactilePrompt: 'Mærk hvad der sker i sætningen, når din hånd griber ind og overfører fysisk kraft til tingen:',
                modes: [
                    {
                        id: 'hvile',
                        btnLabel: '🔵 Slip hånden: Tingen hviler selv (LIGGER / STÅR)',
                        badge: '0 Newton • Intransitiv hvile',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Tingen selv (Subjekt)', text: 'Bogen', role: 'subj' },
                            { label: 'Hvile-verbum', text: 'ligger', role: 'verb-cool' },
                            { label: 'Sted (i ro)', text: 'på bordet.', role: 'pred' }
                        ],
                        sentence: 'Bogen ligger på bordet.',
                        explain: '<strong>LIGGER / STÅR / SIDDER:</strong> Ingen ydre hånd skubber. Bogen er selv subjekt og hviler fladt i ro på bordpladen.',
                        svgType: 'hand_rest'
                    },
                    {
                        id: 'kraft',
                        btnLabel: '🟠 Skub med hånden: Overfør kraft (LÆGGER / STILLER)',
                        badge: 'Muskelkraft ➔ Kræver et objekt!',
                        color: '#fb923c',
                        slots: [
                            { label: 'Agent (Hånden)', text: 'Jeg', role: 'subj' },
                            { label: 'Kraft-verbum', text: 'lægger', role: 'verb-warm' },
                            { label: 'Objekt (Tingen)', text: 'bogen', role: 'obj-warm' },
                            { label: 'Destination', text: 'på bordet.', role: 'pred' }
                        ],
                        sentence: 'Jeg lægger bogen på bordet.',
                        explain: '<strong>LÆGGER / STILLER / SÆTTER:</strong> En aktiv krop (<em>Jeg</em>) sender muskelkraft ind i et objekt (<em>bogen</em>) og flytter den ned på bordet.',
                        svgType: 'hand_push'
                    }
                ]
            },
            {
                num: '2.3',
                route: 'sansning_rummet_taersklen',
                short: 'Hjemme vs. hjem (-e/0)',
                title: 'Rummet og tærsklen: Ro i zonen (-e) vs. Retning over dørtrinet (kort form)',
                storyStep: 'Kapitel 3: Hvile i rummet (-e) vs. over dørtrinet (0)',
                storyTilstand: 'Vi bliver hjemme, og bogen ligger inde i stuen.',
                storyForvandling: 'Nu går vi ud ad døren og bærer bogen ind og tager hjem.',
                tactileTitle: 'Dørtærskel-låsen: Hængelåsen "-E" i hvile vs. Foden der krydser tærsklen (0)',
                tactilePrompt: 'Se hvordan bogstavet "-e" fungerer som en fysisk dørkarm, der holder dig i en tilstand af ro — og falder af i det sekund, du er i bevægelse over tærsklen:',
                modes: [
                    {
                        id: 'zone_e',
                        btnLabel: '🔵 Bliv i tilstand af ro i zonen: Lås med -E (HJEMME / INDE / OPPE)',
                        badge: '0 grænseskift • -E markerer hvile i zonen',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Subjekt + Hvile', text: 'Mads bliver', role: 'subj' },
                            { label: 'Stedsord + E-lås', text: 'hjemme / inde', role: 'verb-cool' },
                            { label: 'Ramme', text: 'i stuen.', role: 'pred' }
                        ],
                        sentence: 'Mads bliver hjemme inde i stuen.',
                        explain: '<strong>MED -E (hjemme, inde, ude, oppe, nede, fremme):</strong> Figuren krydser ingen grænse. Endelsen <strong>-e</strong> omslutter kroppen i en stabil hviletilstand (passer sammen med <em>er, ligger, bliver, har løbet ude</em>).',
                        svgType: 'threshold_inside_e'
                    },
                    {
                        id: 'taerskel_0',
                        btnLabel: '🟠 Bevægelse over dørtrinet: Kast -E af! (HJEM / IND / OP)',
                        badge: 'Grænsen krydses i bevægelse ➔ -E falder af!',
                        color: '#fb923c',
                        slots: [
                            { label: 'Subjekt + Bevægelse', text: 'Mads går', role: 'subj' },
                            { label: 'Kort retningsform (0)', text: 'hjem / ind', role: 'verb-warm' },
                            { label: 'Over grænsen', text: 'gennem døren.', role: 'obj-warm' }
                        ],
                        sentence: 'Mads går hjem ind gennem døren.',
                        explain: '<strong>UDEN -E (hjem, ind, ud, op, ned, frem):</strong> Foden løftes og krydser tærsklen fra ét rum til et andet — i bevægelsen blæser <strong>-e</strong> af (passer sammen med <em>går, lægger ind, er løbet ud</em>)!',
                        svgType: 'threshold_cross_0'
                    }
                ]
            },
            {
                num: '2.4',
                route: 'sansning_har_er',
                short: 'Har vs. er',
                title: 'Aktivitet på stedet vs. tilstandsskift i førnutid (har løbet ude vs. er løbet ud)',
                storyStep: 'Kapitel 4: Proces-motoren vs. grænseskiftet',
                storyTilstand: 'Mads har cyklet rundt ude i parken (og har drukket kaffe).',
                storyForvandling: 'Mads er cyklet ud i parken og hjem (og kaffen er drukket).',
                tactileTitle: 'Proces-motoren (HAR + -e) vs. Grænse- & Tilstandsskiftet (ER + kort form)',
                tactilePrompt: 'Tænd enten for selve arbejdsprocessen inden for zonen (HAR) eller kryds målstregen til et nyt sted / en færdig tilstand (ER):',
                modes: [
                    {
                        id: 'har_motor',
                        btnLabel: '🔵 Tænd Proces-motoren på stedet (HAR)',
                        badge: 'Fokus på aktiviteten • Ingen flyttet grænse',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Subjekt', text: 'Mads', role: 'subj' },
                            { label: 'Proces-hjælpeverbum', text: 'har cyklet', role: 'verb-cool' },
                            { label: 'Varighed (ude i zonen)', text: 'rundt ude i parken.', role: 'pred' }
                        ],
                        sentence: 'Mads har cyklet rundt ude i parken.',
                        explain: '<strong>HAR + førnutid:</strong> Kameraet zoomer ind på muskelarbejdet og aktiviteten inden for samme zone (<em>har spist, har arbejdet, har cyklet rundt ude i skoven</em>) uden at krydse fra A til B.',
                        svgType: 'engine_har'
                    },
                    {
                        id: 'er_graense',
                        btnLabel: '🟠 Kryds målstregen / skift tilstand (ER)',
                        badge: 'Grænsen krydses (A ➔ B) • Ny tilstand',
                        color: '#fb923c',
                        slots: [
                            { label: 'Subjekt', text: 'Mads', role: 'subj' },
                            { label: 'Overgangs-hjælpeverbum', text: 'er cyklet', role: 'verb-warm' },
                            { label: 'Over tærsklen (ud/hjem)', text: 'ud i parken og hjem.', role: 'obj-warm' }
                        ],
                        sentence: 'Mads er cyklet ud i parken og hjem.',
                        explain: '<strong>ER + førnutid:</strong> Subjektet har krydset en grænse fra sted A til sted B (<em>er gået ind, er rejst ud, er cyklet hjem</em>) eller skiftet tilstand (<em>er vågnet, er smeltet</em>)!',
                        svgType: 'threshold_er'
                    }
                ]
            },
            {
                num: '2.5',
                route: 'sansning_aspekt_maade',
                short: 'Aspekt & fart',
                title: 'Kroppens dvælen vs. retningsskift og fart (sidder og læser vs. sætter sig til)',
                storyStep: 'Kapitel 5: Varig tilstand vs. brat bevægelse',
                storyTilstand: 'Mads sidder og drikker kaffe i roligt tempo.',
                storyForvandling: 'Mads sætter sig til at arbejde hurtigt.',
                tactileTitle: 'Aspekt-bølgen: Uafgrænset dvælen (sidder og...) vs. Igangsættelse (sætter sig til...)',
                tactilePrompt: 'Dansk har ikke engelsk "-ing", men bruger i stedet kroppens hvileverber som et dvælende kamera:',
                modes: [
                    {
                        id: 'dvaelen',
                        btnLabel: '🔵 Dvæl i tilstanden (SIDDER OG / LIGGER OG)',
                        badge: 'Uafgrænset varighed (durativt aspekt)',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Subjekt', text: 'Mads', role: 'subj' },
                            { label: 'Dvæle-ramme', text: 'sidder og drikker', role: 'verb-cool' },
                            { label: 'Rolig måde', text: 'kaffe langsomt.', role: 'pred' }
                        ],
                        sentence: 'Mads sidder og drikker kaffe langsomt.',
                        explain: '<strong>SIDDER / LIGGER / STÅR + OG + VERBUM:</strong> To hvileverber koblet med <em>og</em> skaber en rolig, igangværende filmscene uden start- eller slutpunkt.',
                        svgType: 'aspect_wave'
                    },
                    {
                        id: 'igangsaet',
                        btnLabel: '🟠 Skift retning & sæt i gang (SÆTTER SIG TIL AT)',
                        badge: 'Brat igangsættelse (inkoativt omslag)',
                        color: '#fb923c',
                        slots: [
                            { label: 'Subjekt', text: 'Mads', role: 'subj' },
                            { label: 'Start-katapult', text: 'sætter sig til at', role: 'verb-warm' },
                            { label: 'Handling i fart', text: 'arbejde hurtigt.', role: 'obj-warm' }
                        ],
                        sentence: 'Mads sætter sig til at arbejde hurtigt.',
                        explain: '<strong>SÆTTER SIG TIL AT / GÅR I GANG MED:</strong> Kroppen skifter position og skyder en ny handling i gang med et tydeligt startpunkt.',
                        svgType: 'aspect_launch'
                    }
                ]
            }
        ]
    },

    flade3: {
        id: 'flade3',
        num: 3,
        route: 'sansning_flade3',
        shortTitle: '3. Rum, Tid & Relationer',
        fullTitle: 'Flade 3: Rum, tid og relationer (Nærhed vs. afstand)',
        bodyAnchor: 'Hvor står mit kamera? Tæt på kroppen her og nu eller i kikkerten på afstand?',
        accent: '#34d399',
        secondaryAccent: '#fb923c',
        groundingRoute: 'adjective_bridge',
        groundingLabel: 'Grounding: Anker-magnet & Projektør',
        hotspot: { x: 48, y: 50 },
        zoneTitle: 'Zone 3: Hulen, Gribehånden & Kikkerten — Rum, Tid & Deiksis',
        zoneQuestion: 'Er vi omsluttet tæt på kroppen her og nu (i, denne, nutid, sin, du), eller peger vi ud over en flade, en afstand eller en høflighedsbuffer (på, den, datid, hans, kunne du)?',
        storyTitle: 'Den røde tråd i Flade 3: Fra kaffekoppen i hånden til kikkerten og høfligheden',
        storyDesc: 'Mærk hvordan alle 5 stationer i Hovedflade 3 styrer kameraets afstand fra taleren — i rummet (3.1–3.2), i tiden (3.3), i ejerskabet (3.4) og i den sociale relation (3.5):',
        stations: [
            {
                num: '3.1',
                route: 'sansning_i_paa',
                short: 'I vs. på',
                title: 'Præpositioner: i (omsluttende hule) vs. på (eksponeret flade)',
                storyStep: 'Kapitel 1: Hulen vs. bordfladen',
                storyTilstand: 'Kaffen er i koppen, og vi sidder i stuen (i Danmark).',
                storyForvandling: 'Koppen står på bordet, og vi kigger ud på gaden (på Fyn).',
                tactileTitle: 'Kasse-folderen: Rejs 3D-væggene (I) eller klap fladt ned til 2D-flade (PÅ)',
                tactilePrompt: 'Fold væggene op eller ned omkring genstanden i billedet og se præpositionen skifte automatisk:',
                modes: [
                    {
                        id: 'hule_i',
                        btnLabel: '🔵 Rejs 4 vægge omkring tingen (I hulen / beholderen)',
                        badge: '3D Omslutning • Vægge omkring',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Subjekt', text: 'Katten sover trygt', role: 'subj' },
                            { label: '3D-Præposition', text: 'i', role: 'verb-cool' },
                            { label: 'Beholder / Land', text: 'kassen (i Danmark).', role: 'pred' }
                        ],
                        sentence: 'Katten sover trygt i kassen.',
                        explain: '<strong>I (3D-beholder & hule):</strong> Når sider, vægge eller grænser omslutter dig (<em>i kassen, i tasken, i stuen, i supermarkedet, i Danmark</em>), bruger dansk <strong>i</strong>.',
                        svgType: 'box_3d_i'
                    },
                    {
                        id: 'flade_paa',
                        btnLabel: '🟠 Fold væggene fladt ned (PÅ overfladen / øen)',
                        badge: '2D Eksponeret flade • Ingen vægge',
                        color: '#fb923c',
                        slots: [
                            { label: 'Subjekt', text: 'Katten ligger frit', role: 'subj' },
                            { label: '2D-Præposition', text: 'på', role: 'verb-warm' },
                            { label: 'Flade / Ø / Institution', text: 'kassen (på Fyn).', role: 'obj-warm' }
                        ],
                        sentence: 'Katten ligger frit på kassen.',
                        explain: '<strong>PÅ (2D-overflade, ø & institution):</strong> Når låget lukkes, er kassen kun en flade (<em>på bordet, på gaden, på Fyn, på hospitalet, på restaurant</em>).',
                        svgType: 'box_2d_paa'
                    }
                ]
            },
            {
                num: '3.2',
                route: 'sansning_denne_den',
                short: 'Denne vs. den',
                title: 'Pronominal deiksis: denne/dette (i hånden) vs. den/det (derovre)',
                storyStep: 'Kapitel 2: Gribehånden vs. pegefingeren',
                storyTilstand: 'Jeg drikker af denne kop her i min hånd.',
                storyForvandling: 'Kan du se den bil derovre på den anden side af gaden?',
                tactileTitle: 'Kamera-afstand: Inde i gribehånden (DENNE) vs. Ud med pegefingeren (DEN)',
                tactilePrompt: 'Flyt objektet fra din egen håndflade (0,3 meter) ud til horisonten (15 meter):',
                modes: [
                    {
                        id: 'naer_denne',
                        btnLabel: '🔵 Tag tingen ind i hånden (DENNE / DETTE)',
                        badge: 'Rækkevidde: 0–1 m • Berørings-zone',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Handling', text: 'Jeg holder', role: 'subj' },
                            { label: 'Nærheds-anker', text: 'denne kop', role: 'verb-cool' },
                            { label: 'Her-zone', text: 'her i min hånd.', role: 'pred' }
                        ],
                        sentence: 'Jeg holder denne kop her i min hånd.',
                        explain: '<strong>DENNE / DETTE / DISSE:</strong> Tingen befinder sig fysisk (eller mentalt) lige her i talerens gribe-zone.',
                        svgType: 'deixis_near'
                    },
                    {
                        id: 'fjern_den',
                        btnLabel: '🟠 Peg ud på afstand (DEN / DET derovre)',
                        badge: 'Afstand: 10+ m • Pegefinger-zone',
                        color: '#fb923c',
                        slots: [
                            { label: 'Handling', text: 'Se på', role: 'subj' },
                            { label: 'Afstands-anker', text: 'den kop', role: 'verb-warm' },
                            { label: 'Derovre-zone', text: 'derovre på hylden.', role: 'obj-warm' }
                        ],
                        sentence: 'Se på den kop derovre på hylden.',
                        explain: '<strong>DEN / DET / DE (+ derovre):</strong> Tingen ligger uden for din rækkevidde — du må strække armen og pege gennem rummet.',
                        svgType: 'deixis_far'
                    }
                ]
            },
            {
                num: '3.3',
                route: 'sansning_verber_tider',
                short: 'Nutid vs. datid',
                title: 'Tempus og tidens rum: Nu-scenen vs. datids-kikkerten',
                storyStep: 'Kapitel 3: Tidens kamera',
                storyTilstand: 'Jeg drikker kaffe nu — og jeg har lige spist morgenmad.',
                storyForvandling: 'I går drak jeg te klokken syv.',
                tactileTitle: 'Tids-linsen: Scvelyset Her-og-Nu (-R / HAR) vs. Den lukkede Datids-kikkert (-EDE / -TE)',
                tactilePrompt: 'Hold begivenheden inde på den levende nutidsscene, eller skub den bagud gennem datids-kikkerten til et lukket tidspunkt i går:',
                modes: [
                    {
                        id: 'nu_scene',
                        btnLabel: '🔵 Tænd Nu-scenen (NUTID & FØRNUTID)',
                        badge: 'Forbundet med NU • Åben tidslinje',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Subjekt', text: 'Jeg', role: 'subj' },
                            { label: 'Nu-forbundet verbum', text: 'har brygget', role: 'verb-cool' },
                            { label: 'Spor i nuet', text: 'frisk kaffe (den dufter nu!).', role: 'pred' }
                        ],
                        sentence: 'Jeg har brygget frisk kaffe.',
                        explain: '<strong>NUTID (-r) & FØRNUTID (har/er + -t):</strong> Scenen er stadig varm! Selv om brygningen startede før, står den varme kaffe lige foran os nu.',
                        svgType: 'time_now'
                    },
                    {
                        id: 'datid_kikkert',
                        btnLabel: '🟠 Kig gennem Datids-kikkerten (DATID: i går kl. 8)',
                        badge: 'Afsluttet & forseglet i fortiden',
                        color: '#fb923c',
                        slots: [
                            { label: 'Låst fortids-anker', text: 'I går morges', role: 'obj-warm' },
                            { label: 'Datids-verbum', text: 'bryggede', role: 'verb-warm' },
                            { label: 'Resten', text: 'jeg kaffe klokken syv.', role: 'subj' }
                        ],
                        sentence: 'I går morges bryggede jeg kaffe klokken syv.',
                        explain: '<strong>DATID (-ede / -te / stærk):</strong> En dør er smækket mellem dengang og nu (<em>i går, i 2020, da jeg var barn</em>). Vi ser kun scenen på afstand gennem kikkerten.',
                        svgType: 'time_past'
                    }
                ]
            },
            {
                num: '3.4',
                route: 'sansning_sin_hans',
                short: 'Sin vs. hans',
                title: 'Kroppens intime sfære: sin/sit/sine (elastik til subjektet) vs. hans/hendes',
                storyStep: 'Kapitel 4: Hvem ejer frakken i entréen?',
                storyTilstand: 'Mads tager sin frakke (sin egen) på.',
                storyForvandling: 'Mads tager hans frakke (naboens!) ved en fejl.',
                tactileTitle: 'Den Refleksive Elastik: Tilbage til Subjektet selv (SIN) vs. Pil ud til en anden (HANS)',
                tactilePrompt: 'Hæft ejerskabs-snoren enten tilbage i sætningens eget subjekt (Mads ↺ Mads) eller skyd den ud til en person uden for sætningen (Mads ➔ Peter):',
                modes: [
                    {
                        id: 'elastik_sin',
                        btnLabel: '🔵 Spænd elastikken tilbage til Mads selv (SIN / SIT / SINE)',
                        badge: 'Refleksiv løkke ↺ Samme person (Subjekt = Ejer)',
                        color: '#34d399',
                        slots: [
                            { label: 'Subjekt (Person A)', text: 'Mads₁', role: 'subj' },
                            { label: 'Handling', text: 'tager', role: 'pred' },
                            { label: 'Refleksiv elastik ↺', text: 'sin₁ frakke.', role: 'verb-cool' }
                        ],
                        sentence: 'Mads tager sin frakke.',
                        explain: '<strong>SIN / SIT / SINE:</strong> Elastikken springer altid tilbage til sætningens eget subjekt (3. person ental: <em>Mads, hun, barnet</em>). Det er 100% Mads\' egen frakke!',
                        svgType: 'reflexive_sin'
                    },
                    {
                        id: 'pil_hans',
                        btnLabel: '🟠 Peg pilen ud på en anden mand, Peter (HANS / HENDES)',
                        badge: 'Ekstern pil ➔ Anden ejer (Subjekt ≠ Ejer)',
                        color: '#fb923c',
                        slots: [
                            { label: 'Subjekt (Person A)', text: 'Mads₁', role: 'subj' },
                            { label: 'Handling', text: 'tager', role: 'pred' },
                            { label: 'Ekstern pil ➔ B', text: 'hans₂ (Peters) frakke.', role: 'verb-warm' }
                        ],
                        sentence: 'Mads tager hans frakke.',
                        explain: '<strong>HANS / HENDES / DERES:</strong> Når subjektet er 3. person ental, peger <em>hans</em> ALTID væk fra subjektet og ud på en anden person i rummet!',
                        svgType: 'external_hans'
                    }
                ]
            },
            {
                num: '3.5',
                route: 'sansning_social_deiksis',
                short: 'Social deiksis',
                title: 'Social deiksis: Direkte nutids-nærhed vs. høflig datids-buffer',
                storyStep: 'Kapitel 5: Samtalen hos bageren',
                storyTilstand: 'Til vennen: "Hvad vil du have til kaffen?"',
                storyForvandling: 'Til kunden: "Var der andet? Kunne du tænke dig en bolle?"',
                tactileTitle: 'Høfligheds-bufferen: Tæt social kontakt (NUTID) vs. Blød træde-et-skridt-tilbage-buffer (DATID)',
                tactilePrompt: 'Se hvordan dansk bruger tids-afstand (datid) som en blød luftpude, så man ikke træder for tæt på en fremmed:',
                modes: [
                    {
                        id: 'social_naer',
                        btnLabel: '🔵 Direkte nærhed blandt venner (NUTID: vil / kan)',
                        badge: '0 m social buffer • Direkte her-og-nu',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Nutids-verbum', text: 'Vil', role: 'verb-cool' },
                            { label: 'Samtalepartner', text: 'du have', role: 'subj' },
                            { label: 'Tilbud', text: 'en kop kaffe mere?', role: 'pred' }
                        ],
                        sentence: 'Vil du have en kop kaffe mere?',
                        explain: '<strong>DIREKTE NUTID:</strong> Mellem familie og venner er vi allerede i samme intime rum — nutid (<em>Vil du..., Kan du...</em>) føles varmt og ligefremt.',
                        svgType: 'social_close'
                    },
                    {
                        id: 'social_buffer',
                        btnLabel: '🟠 Indsæt høflig luftpude (DATIDS-BUFFER: ville / kunne / var)',
                        badge: 'Høflig afstand • Ingen socialt pres',
                        color: '#fb923c',
                        slots: [
                            { label: 'Datids-buffer', text: 'Kunne du måske', role: 'verb-warm' },
                            { label: 'Bøn / Service', text: 'hjælpe mig —', role: 'subj' },
                            { label: 'Ekspedient-datid', text: 'var der andet?', role: 'obj-warm' }
                        ],
                        sentence: 'Kunne du måske hjælpe mig — var der andet?',
                        explain: '<strong>DATID SOM HØFLIGHEDSBUFFER:</strong> Ved at træde et lille skridt bagud i tid (<em>Kunne du..., Ville det være muligt..., Var der andet?</em>) giver du modtageren plads til at trække vejret frit.',
                        svgType: 'social_buffer'
                    }
                ]
            }
        ]
    },

    flade4: {
        id: 'flade4',
        num: 4,
        route: 'sansning_flade4',
        shortTitle: '4. Sindets Fundament',
        fullTitle: 'Flade 4: Modalitet og evidens (Vished vs. tvivl & kraft)',
        bodyAnchor: 'Hvor fast er grunden under mine fødder, og hvor i kroppen sidder min viden?',
        accent: '#f59e0b',
        secondaryAccent: '#a78bfa',
        groundingRoute: 'modal_force',
        groundingLabel: 'Grounding: Modalverbernes Kraftfelt & Adverbier',
        hotspot: { x: 67, y: 60 },
        zoneTitle: 'Zone 4: Klippegrunden vs. Den Tynde Is — Vished, Kilde & Modalkraft',
        zoneQuestion: 'Står mine fødder på granit (sikkert, jo, ved), mærker min tunge/mave det (synes, nok), eller står jeg på tynd is (måske, vist, tror)?',
        storyTitle: 'Den røde tråd i Flade 4: Mads vurderer vejret, toget og dagens pligter',
        storyDesc: 'Nu træder Mads udenfor og mærker verden: hvor sikker er han på toget, hvorfra ved han det, smager han selv eller gætter han, og hvilke kræfter skubber ham?',
        stations: [
            {
                num: '4.1',
                route: 'sansning_fundament',
                short: 'Klippe vs. tynd is',
                title: 'Fundamentets fasthed: Klippegrund (sikkert) → Plankebro (formentlig) → Tynd is (måske/næppe)',
                storyStep: 'Kapitel 1: Underlaget under fødderne',
                storyTilstand: 'Mads når helt sikkert toget klokken otte.',
                storyForvandling: 'Mads når måske (eller næppe) bussen i snevejret.',
                tactileTitle: 'Underlags-barometeret: Granitklippe (100%) vs. Gyngende planke (70%) vs. Tynd is (25%)',
                tactilePrompt: 'Skift underlaget under talerens fødder og mærk, hvordan modaladverbiet i midterfeltet ændrer hele sætningens bæreevne:',
                modes: [
                    {
                        id: 'klippe_100',
                        btnLabel: '🔵 Stå på Granitklippe (HELT SIKKERT / TYDELIGVIS)',
                        badge: '100% Bæreevne • Urokkelig klippegrund',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Subjekt + Verbum', text: 'Mads når', role: 'subj' },
                            { label: 'Klippe-adverbium', text: 'helt sikkert', role: 'verb-cool' },
                            { label: 'Resten', text: 'toget klokken otte.', role: 'pred' }
                        ],
                        sentence: 'Mads når helt sikkert toget klokken otte.',
                        explain: '<strong>KLIPPEGRUND (helt sikkert, uden tvivl, tydeligvis):</strong> Begge fødder står på massiv granit — taleren garanterer påstanden 100%.',
                        svgType: 'ground_cliff'
                    },
                    {
                        id: 'planke_70',
                        btnLabel: '🟡 Træd ud på Gyngende Plankebro (SANDSYNLIGVIS / FORMENTLIG)',
                        badge: '70% Bæreevne • Fjedrende vurdering',
                        color: '#facc15',
                        slots: [
                            { label: 'Subjekt + Verbum', text: 'Mads når', role: 'subj' },
                            { label: 'Planke-adverbium', text: 'formentlig', role: 'obj-warm' },
                            { label: 'Resten', text: 'toget klokken otte.', role: 'pred' }
                        ],
                        sentence: 'Mads når formentlig toget klokken otte.',
                        explain: '<strong>GYNGENDE PLANKEBRO (sandsynligvis, formentlig, antagelig):</strong> Broen bærer nok, men fjedrer lidt — et kvalificeret skøn.',
                        svgType: 'ground_plank'
                    },
                    {
                        id: 'is_25',
                        btnLabel: '🟠 Gå ud på Krakelerende Tynd Is (MÅSKE / NÆPPE)',
                        badge: '15–40% Bæreevne • Isen knager!',
                        color: '#fb923c',
                        slots: [
                            { label: 'Subjekt + Verbum', text: 'Mads når', role: 'subj' },
                            { label: 'Tynd-is-adverbium', text: 'måske / næppe', role: 'verb-warm' },
                            { label: 'Resten', text: 'toget i snestormen.', role: 'pred' }
                        ],
                        sentence: 'Mads når næppe toget i snestormen.',
                        explain: '<strong>TYND IS (måske, muligvis, næppe):</strong> Underlaget sprækker under fødderne — ren spekulation eller tvivl.',
                        svgType: 'ground_ice'
                    }
                ]
            },
            {
                num: '4.2',
                route: 'sansning_evidens',
                short: 'Nok, jo, vel, vist',
                title: 'Evidensens kilde: Fælles bål (jo), egen mave (nok), udstrakt hånd (vel) & ydre rygte (vist)',
                storyStep: 'Kapitel 2: Hvorfra strømmer din viden?',
                storyTilstand: 'Det er jo fredag (det ved vi begge), og toget kommer nok om lidt.',
                storyForvandling: 'Lokomotivføreren er vist syg (det hørte jeg et rygte om).',
                tactileTitle: 'Evidens-radaren: Fælles grund (JO) vs. Egen mave (NOK) vs. Ydre rygte-fugl (VIST)',
                tactilePrompt: 'Danske småord afslører med ét stavelse, HVOR din viden stammer fra. Klik på kilden i radaren:',
                modes: [
                    {
                        id: 'faelles_jo',
                        btnLabel: '🔵 Tænd Fælles Viden mellem dig og lytteren (JO)',
                        badge: 'Kilde: Os begge to (Delt baggrundsviden)',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Forfelt + Verbum', text: 'Det er', role: 'subj' },
                            { label: 'Fælles-partikel', text: 'jo', role: 'verb-cool' },
                            { label: 'Kendt sandhed', text: 'fredag i dag!', role: 'pred' }
                        ],
                        sentence: 'Det er jo fredag i dag!',
                        explain: '<strong>JO (Fælles bål):</strong> Du peger på noget, som både du og lytteren allerede ved i forvejen ("Som vi begge ved...").',
                        svgType: 'evidens_jo'
                    },
                    {
                        id: 'mave_nok',
                        btnLabel: '🟡 Mærk Indre Mavefornemmelse / Ro (NOK / VEL)',
                        badge: 'Kilde: Mit eget indre skøn (eller søger dit nik med VEL)',
                        color: '#facc15',
                        slots: [
                            { label: 'Subjekt + Verbum', text: 'Toget kommer', role: 'subj' },
                            { label: 'Mave-partikel', text: 'nok', role: 'obj-warm' },
                            { label: 'Skøn', text: 'lige om et øjeblik.', role: 'pred' }
                        ],
                        sentence: 'Toget kommer nok lige om et øjeblik.',
                        explain: '<strong>NOK (Indre kompas):</strong> En rolig, varm tillid inde fra din egen erfaring. (Brug <strong>vel</strong>, hvis du rækker hånden ud og beder lytteren bekræfte!).',
                        svgType: 'evidens_nok'
                    },
                    {
                        id: 'rygte_vist',
                        btnLabel: '🟠 Fang Ydre Rygte / Andenhåndsviden (VIST)',
                        badge: 'Kilde: Hørt udefra gennem andre (Rygte)',
                        color: '#fb923c',
                        slots: [
                            { label: 'Subjekt + Verbum', text: 'Toget er', role: 'subj' },
                            { label: 'Rygte-partikel', text: 'vist', role: 'verb-warm' },
                            { label: 'Andenhånds-info', text: 'aflyst på grund af sne.', role: 'pred' }
                        ],
                        sentence: 'Toget er vist aflyst på grund af sne.',
                        explain: '<strong>VIST (Fuglen udefra):</strong> Du fralægger dig ansvaret! Du har ikke selv set det, men har hørt det fra andre eller læst en besked.',
                        svgType: 'evidens_vist'
                    }
                ]
            },
            {
                num: '4.3',
                route: 'sansning_sindet',
                short: 'Synes vs. tror',
                title: 'Sindets sansning: Kroppens smag/oplevelse (synes) vs. Hovedets gæt (tror)',
                storyStep: 'Kapitel 3: Tungen eller panden?',
                storyTilstand: 'Mads har drukket en tår: "Jeg synes, kaffen er virkelig god!"',
                storyForvandling: 'Mads kigger på skyerne: "Jeg tror, det begynder at regne."',
                tactileTitle: 'Krop- vs. Pande-scanneren: Direkte sansning i kroppen (SYNES) vs. Tanke-gæt i panden (TROR)',
                tactilePrompt: 'Vælg hvor i kroppen oplevelsen sidder — har dine egne sanser (tunge, øjne, hud) mærket det, eller gætter hjernen?',
                modes: [
                    {
                        id: 'krop_synes',
                        btnLabel: '🔵 Aktivér Tunge, Øjne & Mave: Direkte sanset (JEG SYNES)',
                        badge: '100% Egen sanseoplevelse • Kan ikke modbevises',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Sanse-anker', text: 'Jeg synes,', role: 'verb-cool' },
                            { label: 'Selv-oplevet emne', text: 'denne kaffe smager', role: 'subj' },
                            { label: 'Smagsdom', text: 'fantastisk!', role: 'pred' }
                        ],
                        sentence: 'Jeg synes, denne kaffe smager fantastisk!',
                        explain: '<strong>JEG SYNES (Kroppens sanser):</strong> Kaffen har rørt din egen tunge, eller filmen er set med dine egne øjne. Det er din personlige sanseoplevelse.',
                        svgType: 'mind_synes'
                    },
                    {
                        id: 'pande_tror',
                        btnLabel: '🟠 Aktivér Pandens Tankeboble: Uafprøvet gæt (JEG TROR)',
                        badge: 'Mental prognose uden direkte sansning • Fakta-gæt',
                        color: '#fb923c',
                        slots: [
                            { label: 'Tanke-anker', text: 'Jeg tror,', role: 'verb-warm' },
                            { label: 'Uset/fremtidigt faktum', text: 'det bliver regnvejr', role: 'obj-warm' },
                            { label: 'Tid', text: 'i eftermiddag.', role: 'pred' }
                        ],
                        sentence: 'Jeg tror, det bliver regnvejr i eftermiddag.',
                        explain: '<strong>JEG TROR (Pandens gæt):</strong> Du har IKKE smagt kaffen endnu eller kigger ind i fremtiden/fakta, du ikke har sanset direkte.',
                        svgType: 'mind_tror'
                    }
                ]
            },
            {
                num: '4.4',
                route: 'sansning_modalverber',
                short: 'Skal, vil, må, kan',
                title: 'Modalverbernes kraftfelt: Indre vilje/evne (vil/kan) vs. Ydre pres/tilladelse (skal/må)',
                storyStep: 'Kapitel 4: Kræfterne der styrer dagen',
                storyTilstand: 'Jeg vil gerne lære dansk, og jeg kan cykle.',
                storyForvandling: 'Jeg skal møde klokken otte, og man må ikke parkere her.',
                tactileTitle: 'Force Dynamics (Talmy): Indre hjerte/muskel (VIL / KAN) vs. Ydre rygvind/portvagt (SKAL / MÅ)',
                tactilePrompt: 'Skift mellem en kraft, der udspringer indefra din egen krop (vil/kan), og en kraft eller bom, der møder dig udefra (skal/må):',
                modes: [
                    {
                        id: 'indre_vil_kan',
                        btnLabel: '🔵 Tænd Indre Drivkraft & Muskel (VIL / KAN)',
                        badge: 'Kilde: Indefra kroppen (Lyst & Kapacitet)',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Subjekt', text: 'Mads', role: 'subj' },
                            { label: 'Indre modal-motor', text: 'vil gerne / kan', role: 'verb-cool' },
                            { label: 'Infinitiv (mental projektion)', text: 'tale dansk.', role: 'pred' }
                        ],
                        sentence: 'Mads vil gerne tale dansk.',
                        explain: '<strong>VIL (Indre hjerte-motor) & KAN (Indre kapacitet):</strong> Kraften udspringer indefra subjektet selv — intet ydre pres tvinger ham.',
                        svgType: 'modal_internal'
                    },
                    {
                        id: 'ydre_skal_maa',
                        btnLabel: '🟠 Påfør Ydre Pres eller Løft Bommen (SKAL / MÅ)',
                        badge: 'Kilde: Udefra samfundet, uret eller portvagten',
                        color: '#fb923c',
                        slots: [
                            { label: 'Subjekt', text: 'Mads', role: 'subj' },
                            { label: 'Ydre modal-kraft', text: 'skal / må', role: 'verb-warm' },
                            { label: 'Infinitiv', text: 'møde klokken otte.', role: 'obj-warm' }
                        ],
                        sentence: 'Mads skal møde klokken otte.',
                        explain: '<strong>SKAL (Ydre pres/aftale) & MÅ (Portvagtens bom løftes/sænkes):</strong> Kraften kommer udefra (chefen, loven, uret eller en tilladelse).',
                        svgType: 'modal_external'
                    }
                ]
            }
        ]
    },

    flade5: {
        id: 'flade5',
        num: 5,
        route: 'sansning_flade5',
        shortTitle: '5. Tankens Vej & Flow',
        fullTitle: 'Flade 5: Kraftoverførsel og tekstflow (Hængsler & V2-dans)',
        bodyAnchor: 'Hvordan kædes tankerne sammen langs vejen, og hvornår udløses V2-fjederen?',
        accent: '#f472b6',
        secondaryAccent: '#38bdf8',
        groundingRoute: 'conjunction_bridge',
        groundingLabel: 'Grounding: Konjunktions-broen & Ordstilling',
        hotspot: { x: 86, y: 46 },
        zoneTitle: 'Zone 5: Landevejen, Regnmuren, Hængebroen & V2-Svinget — Tekstflow',
        zoneQuestion: 'Ruller vi med strømmen (derfor), kigger vi i bakspejlet (fordi), bryder vi gennem en mur (selvom/alligevel), eller udløser vi V2-stålfjederen?',
        storyTitle: 'Den røde tråd i Flade 5: Mads cykler gennem regn, skilleveje og V2-sving',
        storyDesc: 'Følg Mads ude på cykelstien: hvordan hængslerne mellem sætningerne styrer retningen — og hvordan ethvert ord i forfeltet spænder V2-stålfjederen:',
        stations: [
            {
                num: '5.1',
                route: 'sansning_fremdrift',
                short: 'Derfor vs. fordi',
                title: 'Uhindret fremdrift: Trykbølge fremad (derfor / så) vs. Blikket i bakspejlet (fordi / for)',
                storyStep: 'Kapitel 1: Medvind eller bakspejl?',
                storyTilstand: 'Det øsregner. Derfor tager Mads regnjakken på (Årsag ➔ Virkning).',
                storyForvandling: 'Mads tager regnjakken på, fordi det øsregner (Virkning ⬅ Årsag).',
                tactileTitle: 'Kausal-vektoren: Stempel fremad (DERFOR + V2) vs. Bakspejl bagud (FORDI + SVO)',
                tactilePrompt: 'Vend årsags-pilen enten FREMAD i tidens retning (Årsag ➔ DERFOR ➔ Virkning) eller BAGUD i bakspejlet (Virkning ⬅ FORDI ⬅ Årsag):',
                modes: [
                    {
                        id: 'frem_derfor',
                        btnLabel: '🔵 Skyd fremad med tidens strøm (Årsag ➔ DERFOR + V2)',
                        badge: 'Fremadrettet vektor ➔ Udløser V2-inversion!',
                        color: '#38bdf8',
                        slots: [
                            { label: '1. Årsag', text: 'Det regner,', role: 'subj' },
                            { label: 'Fremad-stempel', text: 'derfor tager', role: 'verb-cool' },
                            { label: '2. Virkning (V-S)', text: 'Mads regnjakken på.', role: 'pred' }
                        ],
                        sentence: 'Det regner, derfor tager Mads regnjakken på.',
                        explain: '<strong>DERFOR / SÅ (Medstrøms-vektor ➔):</strong> Du nævner årsagen først og skubber virkningen fremad. Da <em>derfor</em> står i forfeltet, skubber V2-fjederen verbet (<em>tager</em>) frem før <em>Mads</em>!',
                        svgType: 'causal_forward'
                    },
                    {
                        id: 'bagud_fordi',
                        btnLabel: '🟠 Kig bagud i bakspejlet (Virkning ⬅ FORDI + Ledsætning)',
                        badge: 'Bagudrettet vektor ⬅ Forklarer hvorfor',
                        color: '#fb923c',
                        slots: [
                            { label: '1. Virkning', text: 'Mads tager regnjakken på,', role: 'subj' },
                            { label: 'Bakspejls-hængsel', text: 'fordi', role: 'verb-warm' },
                            { label: '2. Årsag (S-V)', text: 'det regner.', role: 'obj-warm' }
                        ],
                        sentence: 'Mads tager regnjakken på, fordi det regner.',
                        explain: '<strong>FORDI / FOR (Bakspejls-vektor ⬅):</strong> Du starter med handlingen og kigger derefter bagud i bakspejlet for at hente årsagen.',
                        svgType: 'causal_rearview'
                    }
                ]
            },
            {
                num: '5.2',
                route: 'sansning_modstand',
                short: 'Selvom & alligevel',
                title: 'Kraft mod modstand: Regnmuren (selvom) & gennembruddet (alligevel / men)',
                storyStep: 'Kapitel 2: Gennem regnmuren',
                storyTilstand: 'Vejen er fri, så Mads ruller let derudad.',
                storyForvandling: 'Selvom regnen pisker ned, cykler Mads alligevel videre!',
                tactileTitle: 'Barriere-bryderen: Rejs modstandsmuren (SELVOM) og pløj igennem den (ALLIGEVEL)',
                tactilePrompt: 'Rejs en fysisk forhindring på vejen og se, hvordan SELVOM bygger muren op, mens ALLIGEVEL bryder igennem den:',
                modes: [
                    {
                        id: 'knaek_men',
                        btnLabel: '🔵 Skarpt 90° retningsskift i krydset (MEN)',
                        badge: 'Sideordnet kontrast • Vejen drejer brat',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Forventning', text: 'Solen skinner,', role: 'subj' },
                            { label: '90° Knæk-hængsel', text: 'men', role: 'verb-cool' },
                            { label: 'Overraskelse', text: 'vinden er iskold.', role: 'pred' }
                        ],
                        sentence: 'Solen skinner, men vinden er iskold.',
                        explain: '<strong>MEN (Det skarpe sving):</strong> To ligeværdige hovedsætninger, hvor den anden drejer i en uventet retning.',
                        svgType: 'barrier_turn'
                    },
                    {
                        id: 'mur_selvom',
                        btnLabel: '🟠 Bryd gennem Modstandsmuren (SELVOM ... ALLIGEVEL)',
                        badge: 'Forhindring overvindes • Gennembrud + V2!',
                        color: '#fb923c',
                        slots: [
                            { label: 'Muren (Forfelt)', text: 'Selvom det stormer,', role: 'obj-warm' },
                            { label: 'V2-Verbum + Subjekt', text: 'cykler Mads', role: 'verb-warm' },
                            { label: 'Gennembrudskraft', text: 'alligevel!', role: 'subj' }
                        ],
                        sentence: 'Selvom det stormer, cykler Mads alligevel!',
                        explain: '<strong>SELVOM ... ALLIGEVEL:</strong> <em>Selvom</em> rejser en storm-mur, der burde stoppe Mads — men han pløjer lige igennem med <em>alligevel</em> (og ledsætningen i forfeltet udløser V2: <em>cykler Mads</em>)!',
                        svgType: 'barrier_break'
                    }
                ]
            },
            {
                num: '5.3',
                route: 'sansning_skilleveje',
                short: 'Hvis vs. eller',
                title: 'Valg & skilleveje: Den hypotetiske hængebro (hvis ..., så ...) vs. Vejgaflen (eller)',
                storyStep: 'Kapitel 3: Hængebroen og vejgaflen',
                storyTilstand: 'Tager Mads kyststien eller skovvejen?',
                storyForvandling: 'Hvis isen holder, så skyder han genvej over broen.',
                tactileTitle: 'Hængebroen (HVIS ..., SÅ + V2) vs. Sporskiftet (ENTEN ... ELLER)',
                tactilePrompt: 'Byg enten en betinget hængebro over kløften (HVIS) eller skift sporet ved en T-skillevej (ELLER):',
                modes: [
                    {
                        id: 'haengebro_hvis',
                        btnLabel: '🔵 Spænd Hængebroen over kløften (HVIS ..., SÅ + V2)',
                        badge: 'Betingelse (Bro) ➔ Konsekvens på den anden side',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Betingelses-bro (Plads 1)', text: 'Hvis det regner,', role: 'verb-cool' },
                            { label: 'V2-Verbum + Subjekt', text: '(så) tager Mads', role: 'subj' },
                            { label: 'Konsekvens', text: 'toget.', role: 'pred' }
                        ],
                        sentence: 'Hvis det regner, så tager Mads toget.',
                        explain: '<strong>HVIS ..., (SÅ) + V2:</strong> Du når kun over til konsekvensen, hvis betingelses-broen bærer — og når <em>Hvis...</em> står først, hopper verbet (<em>tager</em>) straks frem før subjektet!',
                        svgType: 'bridge_hvis'
                    },
                    {
                        id: 'gaffel_eller',
                        btnLabel: '🟠 Skift sporet ved Vejgaflen (ENTEN ... ELLER)',
                        badge: 'To alternative spor • Sideordnet valg',
                        color: '#fb923c',
                        slots: [
                            { label: 'Spor A', text: 'Enten cykler Mads,', role: 'subj' },
                            { label: 'Sporskifte', text: 'eller også', role: 'verb-warm' },
                            { label: 'Spor B', text: 'tager han bussen.', role: 'obj-warm' }
                        ],
                        sentence: 'Enten cykler Mads, eller også tager han bussen.',
                        explain: '<strong>ELLER (Skillevejen):</strong> Vejen deler sig i to lige mulige spor — vælger du det ene, lukkes det andet.',
                        svgType: 'fork_eller'
                    }
                ]
            },
            {
                num: '5.4',
                route: 'sansning_inversion',
                short: 'V2-fjederen',
                title: 'Sætningsdansen & V2-fjederen: Når Plads 1 fyldes, låses verbet på Plads 2!',
                storyStep: 'Kapitel 4: Den danske V2-stålfjeder',
                storyTilstand: 'Lige vej (S-V): [1. Mads] [2. cykler] på arbejde hver morgen.',
                storyForvandling: 'Spændt V2-fjeder (X-V-S): [1. Hver morgen] [2. cykler ⚡] [3. Mads] på arbejde!',
                tactileTitle: 'Den Fysiske V2-Stålfjeder: Skub Tid/Sted ind på Plads 1 og se Subjektet katapulteres til Plads 3!',
                tactilePrompt: 'På dansk er Plads 2 svejset fast til en stålfjeder for det finitte verbum. Prøv at skubbe "Hver morgen" ind på Plads 1:',
                modes: [
                    {
                        id: 'svo_hvile',
                        btnLabel: '🔵 Normal start: Subjekt på Plads 1 (Fjederen hviler)',
                        badge: 'Plads 1: Subjekt ➔ Plads 2: Verbum (SVO)',
                        color: '#38bdf8',
                        slots: [
                            { label: 'Plads 1 (Forfelt)', text: 'Mads (Subjekt)', role: 'subj' },
                            { label: 'Plads 2 (V2-lås ⚡)', text: 'cykler (Verbum)', role: 'verb-cool' },
                            { label: 'Plads 3 + Rest', text: 'i parken hver morgen.', role: 'pred' }
                        ],
                        sentence: 'Mads cykler i parken hver morgen.',
                        explain: '<strong>LIGE FREM (Subjekt på Plads 1):</strong> Når <em>Mads</em> selv står på Plads 1, står verbet <em>cykler</em> allerede trygt på sin elskede Plads 2.',
                        svgType: 'v2_spring_rest'
                    },
                    {
                        id: 'xvs_fjeder',
                        btnLabel: '🟠 Skub "Hver morgen" ind på Plads 1 (Udløs V2-fjederen! ⚡)',
                        badge: 'Plads 1: Tid/Sted ➔ Plads 2: Verbum ⚡ ➔ Plads 3: Subjekt!',
                        color: '#fb923c',
                        slots: [
                            { label: 'Plads 1 (Forfelt)', text: 'Hver morgen', role: 'obj-warm' },
                            { label: 'Plads 2 (V2-fjeder ⚡)', text: 'cykler (Verbum!)', role: 'verb-warm' },
                            { label: 'Plads 3 (Subjekt skubbet!)', text: 'Mads', role: 'subj' }
                        ],
                        sentence: 'Hver morgen cykler Mads i parken.',
                        explain: '<strong>V2-FJEDEREN UDLØSES (Inversion):</strong> Så snart <em>Hver morgen</em> (eller en ledsætning) træder ind på Plads 1, er der kun plads til ÉN blok før verbet. V2-stålfjederen holder <strong>cykler</strong> låst på Plads 2 og katapulterer <strong>Mads</strong> om på Plads 3!',
                        svgType: 'v2_spring_fired'
                    }
                ]
            }
        ]
    }
};

// Map enhver station-route til dens hovedflade og stations-objekt
export function findStationContext(routeOrViewId) {
    if (!routeOrViewId) return null;
    for (const flade of Object.values(SANSNING_REALMS)) {
        if (flade.route === routeOrViewId || flade.id === routeOrViewId) {
            return { flade, station: null, stationIdx: -1 };
        }
        const idx = flade.stations.findIndex(s => s.route === routeOrViewId);
        if (idx !== -1) {
            return { flade, station: flade.stations[idx], stationIdx: idx };
        }
    }
    return null;
}

// ============================================================================
// 1. GLOBAL STATIONS- & HOVEDFLADE-NAVIGATION (Ligesom GrammarMenu i Grounding)
// ============================================================================
export function injectSansningIntegrationStyles() {
    if (typeof document === 'undefined' || document.getElementById('sansning-integration-styles')) return;
    const style = document.createElement('style');
    style.id = 'sansning-integration-styles';
    style.textContent = `
        .si-global-nav-card {
            background: linear-gradient(145deg, rgba(74, 4, 11, 0.96) 0%, rgba(92, 8, 18, 0.96) 100%);
            border: 1.5px solid #851825;
            border-radius: 18px;
            padding: 0.85rem 1.1rem;
            margin-bottom: 1.4rem;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.42);
        }
        .si-nav-top-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            padding-bottom: 0.65rem;
            border-bottom: 1px solid rgba(255, 201, 205, 0.16);
        }
        .si-realms-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            align-items: center;
        }
        .si-realm-pill {
            background: rgba(15, 23, 42, 0.65);
            border: 1px solid rgba(255, 201, 205, 0.25);
            color: #FFC9CD;
            padding: 0.42rem 0.82rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.18s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
        }
        .si-realm-pill:hover {
            color: #ffffff;
            border-color: #38bdf8;
            transform: translateY(-1px);
        }
        .si-realm-pill.active {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: #ffffff;
            border-color: #7dd3fc;
            box-shadow: 0 0 14px rgba(56, 189, 248, 0.38);
        }
        .si-realm-pill.grounding-bridge-pill {
            background: rgba(245, 158, 11, 0.16);
            border-color: rgba(251, 191, 36, 0.5);
            color: #fde68a;
        }
        .si-realm-pill.grounding-bridge-pill:hover {
            background: rgba(245, 158, 11, 0.28);
            color: #ffffff;
        }
        .si-stations-subrow {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.4rem;
            margin-top: 0.65rem;
        }
        .si-stations-label {
            font-size: 0.74rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            margin-right: 0.25rem;
        }
        .si-station-pill {
            background: rgba(74, 4, 11, 0.85);
            border: 1px solid #851825;
            color: #FFC9CD;
            padding: 0.32rem 0.72rem;
            border-radius: 10px;
            font-size: 0.77rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .si-station-pill:hover {
            border-color: #7dd3fc;
            color: #ffffff;
        }
        .si-station-pill.active {
            background: #FF4D5E;
            border-color: #FFC9CD;
            color: #ffffff;
            font-weight: 800;
            box-shadow: 0 0 12px rgba(255, 77, 94, 0.45);
        }
        .si-station-arrow {
            color: rgba(255, 201, 205, 0.45);
            font-size: 0.75rem;
            font-weight: 800;
        }

        /* Overordnet 4-Zoners Vrimlebillede (Etape 1) */
        .si-master-vrimmel-card {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 22px;
            padding: 1.35rem 1.45rem;
            margin-bottom: 2.2rem;
            box-shadow: 0 16px 42px rgba(0, 0, 0, 0.52);
        }
        .si-mv-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 0.85rem;
            margin-bottom: 1rem;
        }
        .si-mv-header h2 {
            margin: 0 0 0.25rem;
            font-size: 1.4rem;
            font-weight: 900;
            color: #ffffff;
        }
        .si-mv-header p {
            margin: 0;
            font-size: 0.9rem;
            color: #FFC9CD;
            max-width: 760px;
            line-height: 1.45;
        }
        .si-mv-canvas {
            position: relative;
            width: 100%;
            height: 350px;
            border-radius: 16px;
            overflow: hidden;
            background: #0b132b;
            border: 1.5px solid rgba(56, 189, 248, 0.35);
            box-shadow: inset 0 0 32px rgba(0, 0, 0, 0.65);
            margin-bottom: 1rem;
        }
        @media (max-width: 680px) {
            .si-mv-canvas { height: 245px; }
        }
        .si-mv-canvas img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.4s ease;
        }
        .si-mv-zone-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            background: rgba(15, 23, 42, 0.92);
            border: 2px solid #38bdf8;
            color: #ffffff;
            padding: 0.42rem 0.8rem;
            border-radius: 999px;
            font-size: 0.78rem;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
            transition: all 0.2s ease;
            white-space: nowrap;
            z-index: 3;
        }
        .si-mv-zone-hotspot:hover, .si-mv-zone-hotspot.active {
            background: #0284c7;
            border-color: #ffffff;
            transform: translate(-50%, -50%) scale(1.08);
            box-shadow: 0 0 22px rgba(56, 189, 248, 0.75);
        }
        .si-mv-inspector {
            background: #4A040B;
            border: 1.5px solid #851825;
            border-radius: 16px;
            padding: 1.1rem 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .si-mv-journey-strip {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 0.65rem;
            margin-top: 0.35rem;
        }
        .si-mv-journey-step {
            background: rgba(15, 23, 42, 0.72);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 12px;
            padding: 0.75rem 0.9rem;
            cursor: pointer;
            transition: all 0.18s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 0.4rem;
        }
        .si-mv-journey-step.active {
            border-color: #38bdf8;
            background: rgba(14, 116, 144, 0.28);
            box-shadow: 0 0 18px rgba(56, 189, 248, 0.22);
        }

        /* Rød Tråd Fortællings-kæde på hver hovedflade */
        .si-red-thread-card {
            background: linear-gradient(145deg, #4A040B 0%, #5C0812 100%);
            border: 1.5px solid #851825;
            border-radius: 20px;
            padding: 1.2rem 1.35rem;
            margin-bottom: 1.9rem;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }
        .si-rt-steps-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(205px, 1fr));
            gap: 0.65rem;
            margin-top: 0.85rem;
        }
        .si-rt-step-box {
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(255, 201, 205, 0.2);
            border-radius: 13px;
            padding: 0.75rem 0.85rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 0.45rem;
            transition: all 0.18s ease;
            cursor: pointer;
        }
        .si-rt-step-box:hover, .si-rt-step-box.active {
            border-color: #38bdf8;
            background: rgba(14, 116, 144, 0.24);
            transform: translateY(-2px);
        }

        /* ETAPE 2: TAKTILT GROUNDING-LABORATORIUM */
        .si-tactile-lab-card {
            background: linear-gradient(160deg, #0b132b 0%, #1e1b4b 55%, #3b0712 100%);
            border: 2px solid #38bdf8;
            border-radius: 22px;
            padding: 1.3rem 1.4rem;
            margin-bottom: 2.2rem;
            box-shadow: 0 16px 44px rgba(0, 0, 0, 0.55), 0 0 26px rgba(56, 189, 248, 0.16);
        }
        .si-tactile-lab-card.pulse-glow {
            box-shadow: 0 0 34px rgba(56, 189, 248, 0.62);
        }
        .si-tl-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-bottom: 0.9rem;
        }
        .si-tl-kicker {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(56, 189, 248, 0.18);
            border: 1px solid rgba(56, 189, 248, 0.45);
            color: #7dd3fc;
            padding: 0.26rem 0.75rem;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            text-transform: uppercase;
        }
        .si-tl-station-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem;
            background: rgba(15, 23, 42, 0.82);
            padding: 0.3rem;
            border-radius: 12px;
            border: 1px solid rgba(148, 163, 184, 0.25);
        }
        .si-tl-st-tab {
            background: transparent;
            border: none;
            color: #cbd5e1;
            padding: 0.4rem 0.78rem;
            border-radius: 8px;
            font-size: 0.79rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.16s ease;
        }
        .si-tl-st-tab:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.08);
        }
        .si-tl-st-tab.active {
            background: #0284c7;
            color: #ffffff;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
        }
        .si-tl-stage-frame {
            background: #070d19;
            border: 1.5px solid rgba(148, 163, 184, 0.26);
            border-radius: 16px;
            padding: 0.75rem 0.9rem;
            margin: 0.85rem 0;
        }
        .si-tl-svg-wrap {
            width: 100%;
            max-width: 680px;
            margin: 0 auto;
        }
        .si-tl-slots-strip {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 0.6rem;
            background: rgba(15, 23, 42, 0.92);
            border: 1px solid rgba(148, 163, 184, 0.24);
            border-radius: 12px;
            padding: 0.65rem 0.85rem;
            margin-top: 0.65rem;
        }
        .si-tl-slots-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            flex: 1;
        }
        .si-tl-slot {
            flex: 1;
            min-width: 115px;
            background: rgba(30, 41, 59, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.32);
            border-radius: 9px;
            padding: 0.42rem 0.65rem;
            display: flex;
            flex-direction: column;
            gap: 0.12rem;
        }
        .si-tl-slot.subj {
            border-color: rgba(74, 222, 128, 0.55);
            background: rgba(22, 163, 74, 0.16);
        }
        .si-tl-slot.verb-cool {
            border-color: #38bdf8;
            background: rgba(2, 132, 199, 0.25);
        }
        .si-tl-slot.verb-warm {
            border-color: #fb923c;
            background: rgba(234, 88, 12, 0.25);
        }
        .si-tl-slot.obj-warm {
            border-color: #facc15;
            background: rgba(202, 138, 4, 0.2);
        }
        .si-tl-slot-lbl {
            font-size: 0.68rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #94a3b8;
        }
        .si-tl-slot-val {
            font-size: 0.96rem;
            font-weight: 900;
            color: #ffffff;
        }
        .si-tl-controls-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin: 0.85rem 0;
        }
        .si-tl-action-btn {
            flex: 1;
            min-width: 210px;
            background: rgba(30, 41, 59, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.35);
            color: #e2e8f0;
            padding: 0.7rem 1rem;
            border-radius: 12px;
            font-size: 0.86rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.18s ease;
            text-align: left;
        }
        .si-tl-action-btn:hover {
            border-color: #7dd3fc;
            transform: translateY(-1px);
        }
        .si-tl-action-btn.active {
            background: linear-gradient(135deg, rgba(2, 132, 199, 0.38) 0%, rgba(30, 41, 59, 0.95) 100%);
            border-color: #38bdf8;
            color: #ffffff;
            box-shadow: 0 0 18px rgba(56, 189, 248, 0.32);
        }
        .si-tl-explain-box {
            background: rgba(15, 23, 42, 0.82);
            border-left: 4px solid #38bdf8;
            border-radius: 11px;
            padding: 0.8rem 1rem;
            font-size: 0.9rem;
            color: #e2e8f0;
            line-height: 1.55;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.75rem;
        }
        .si-footer-bridge {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.13);
            border-radius: 14px;
            padding: 0.9rem 1.15rem;
            margin-top: 1.6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.75rem;
        }

        /* ================================================================== */
        /* FORSLAG 1: NORDISK SKIFER & BLÅT LAB (Globalt tema på Sansning)    */
        /* ================================================================== */
        .grammatik-sansning-view,
        .sansning-station-view {
            color: #f1f5f9 !important;
        }
        .si-global-nav-card {
            background: #151a21 !important;
            border: 1px solid rgba(203, 213, 225, 0.13) !important;
            border-radius: 14px !important;
            box-shadow: none !important;
        }
        .si-nav-top-row {
            border-bottom-color: rgba(203, 213, 225, 0.12) !important;
        }
        .si-realm-pill,
        .si-station-pill,
        .gs-back-btn,
        .ss-back-btn,
        .si-tl-st-tab,
        .ss-lab-pill {
            background: #1a212b !important;
            border: 1px solid rgba(203, 213, 225, 0.15) !important;
            color: #94a3b8 !important;
            box-shadow: none !important;
        }
        .si-realm-pill:hover,
        .si-station-pill:hover,
        .gs-back-btn:hover,
        .ss-back-btn:hover,
        .si-tl-st-tab:hover,
        .ss-lab-pill:hover {
            background: rgba(255, 255, 255, 0.07) !important;
            border-color: rgba(203, 213, 225, 0.35) !important;
            color: #f1f5f9 !important;
            transform: none !important;
        }
        .si-realm-pill.active,
        .si-station-pill.active,
        .si-tl-st-tab.active,
        .ss-lab-pill.active {
            background: #e2e8f0 !important;
            border-color: #e2e8f0 !important;
            color: #0f172a !important;
            box-shadow: none !important;
        }
        .si-realm-pill.grounding-bridge-pill {
            background: transparent !important;
            border: 1px solid rgba(203, 213, 225, 0.22) !important;
            color: #cbd5e1 !important;
        }
        #si-tl-open-station,
        .si-footer-bridge .si-realm-pill.active {
            background: #2b6e78 !important;
            border-color: #3d8b96 !important;
            color: #ffffff !important;
        }
        #si-tl-open-station:hover,
        .si-footer-bridge .si-realm-pill.active:hover {
            background: #35838f !important;
            border-color: #4c9ba6 !important;
        }

        /* Hero, kort & faner i rolig skifer */
        .grammatik-sansning-view .gs-hero-badge,
        .sansning-station-view .ss-station-badge {
            background: rgba(43, 110, 120, 0.2) !important;
            border: 1px solid rgba(76, 155, 166, 0.45) !important;
            color: #7ec4ce !important;
        }
        .grammatik-sansning-view .gs-hero p,
        .sansning-station-view .ss-hero p,
        .grammatik-sansning-view .gs-station-sub,
        .grammatik-sansning-view .gs-flade-desc {
            color: #94a3b8 !important;
        }
        .grammatik-sansning-view .gs-station-card,
        .grammatik-sansning-view .gs-flade-card,
        .sansning-station-view .ss-card,
        .sansning-station-view .ss-pair-card,
        .sansning-station-view .ss-slider-box,
        .sansning-station-view .svb-card,
        .sansning-station-view .skh-card {
            background: #151a21 !important;
            border: 1px solid rgba(203, 213, 225, 0.13) !important;
            box-shadow: none !important;
        }
        .sansning-station-view .ss-pair-card,
        .sansning-station-view .ss-slider-box {
            background: #1a212b !important;
        }
        .grammatik-sansning-view .gs-station-card:hover,
        .grammatik-sansning-view .gs-flade-card:hover,
        .sansning-station-view .ss-pair-card:hover {
            border-color: rgba(56, 189, 248, 0.45) !important;
            background: #1a212b !important;
        }
        .sansning-station-view .ss-tab-btn,
        .sansning-station-view .ss-quiz-opt {
            background: #1a212b !important;
            border: 1px solid rgba(203, 213, 225, 0.16) !important;
            color: #cbd5e1 !important;
            box-shadow: none !important;
        }
        .sansning-station-view .ss-tab-btn.active {
            background: #2b6e78 !important;
            border-color: #3d8b96 !important;
            color: #ffffff !important;
            box-shadow: none !important;
        }
        .sansning-station-view .ss-quiz-opt.correct {
            background: rgba(43, 110, 120, 0.34) !important;
            border-color: #4c9ba6 !important;
            color: #e2f5f7 !important;
        }
        .sansning-station-view .ss-quiz-opt.wrong {
            background: rgba(185, 28, 28, 0.24) !important;
            border-color: rgba(248, 113, 113, 0.65) !important;
            color: #fecaca !important;
        }

        /* Det Blå Taktile Laboratorium (signatur-blokken i Forslag 1) */
        .si-tactile-lab-card {
            background: #0b1528 !important;
            border: 1.5px solid rgba(56, 189, 248, 0.45) !important;
            border-radius: 16px !important;
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35) !important;
        }
        .si-tl-kicker {
            color: #7dd3fc !important;
        }
        .si-tl-action-btn {
            background: #111c33 !important;
            border: 1px solid rgba(148, 197, 233, 0.18) !important;
        }
        .si-tl-action-btn.active {
            background: rgba(56, 189, 248, 0.15) !important;
            border-color: rgba(56, 189, 248, 0.62) !important;
            box-shadow: none !important;
        }
        .si-tl-stage-frame {
            background: #08101f !important;
            border: 1px solid rgba(56, 189, 248, 0.22) !important;
        }
        .si-tl-explain-box {
            background: #111c33 !important;
            border-left-width: 3px !important;
        }
        #si-tl-speak-btn {
            background: transparent !important;
            border: 1px solid rgba(203, 213, 225, 0.24) !important;
            color: #e2e8f0 !important;
        }
        /* Skjul duplikeret top-bar på understationer når global nav allerede er indsat */
        .sansning-station-view .si-global-nav-card ~ .ss-top-bar {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}

export function renderSansningGlobalNav(activeRealmId, navigateFn, activeStationRoute = null) {
    injectSansningIntegrationStyles();

    const nav = document.createElement('div');
    nav.className = 'si-global-nav-card';

    const realmItems = [
        { id: 'overview', label: 'Oversigt', route: 'grammatik_sansning' },
        { id: 'flade1', label: '1. Substans & Bestemthed', route: 'sansning_flade1' },
        { id: 'flade2', label: '2. Tilstand & Bevægelse', route: 'sansning_flade2' },
        { id: 'flade3', label: '3. Rum, Tid & Grænser', route: 'sansning_flade3' },
        { id: 'flade4', label: '4. Sindets Fundament', route: 'sansning_flade4' },
        { id: 'flade5', label: '5. Tankens Vej & Flow', route: 'sansning_flade5' }
    ];

    const currentFlade = SANSNING_REALMS[activeRealmId] || null;

    nav.innerHTML = `
        <div class="si-nav-top-row">
            <div class="si-realms-pills">
                ${realmItems.map(item => `
                    <button type="button" class="si-realm-pill ${item.id === activeRealmId ? 'active' : ''}" data-realm-route="${item.route}">
                        ${item.label}
                    </button>
                `).join('')}
            </div>
            <button type="button" class="si-realm-pill grounding-bridge-pill" id="si-btn-grounding-chain">
                🎈 Taktil Grounding-kæde →
            </button>
        </div>
        ${currentFlade ? `
            <div class="si-stations-subrow">
                <span class="si-stations-label">Rød tråd i Hovedflade ${currentFlade.num}:</span>
                <button type="button" class="si-station-pill ${!activeStationRoute ? 'active' : ''}" data-st-route="${currentFlade.route}">
                    Oversigt & Taktilt Lab
                </button>
                ${currentFlade.stations.map(st => `
                    <span class="si-station-arrow">➔</span>
                    <button type="button" class="si-station-pill ${activeStationRoute === st.route ? 'active' : ''}" data-st-route="${st.route}">
                        ${st.num} ${st.short}
                    </button>
                `).join('')}
            </div>
        ` : ''}
    `;

    nav.querySelectorAll('[data-realm-route]').forEach(btn => {
        btn.onclick = () => navigateFn(btn.getAttribute('data-realm-route'));
    });

    nav.querySelectorAll('[data-st-route]').forEach(btn => {
        btn.onclick = () => navigateFn(btn.getAttribute('data-st-route'));
    });

    const groundingBtn = nav.querySelector('#si-btn-grounding-chain');
    if (groundingBtn) {
        groundingBtn.onclick = () => navigateFn(currentFlade ? currentFlade.groundingRoute : 'grounding');
    }

    return nav;
}

// ============================================================================
// 2. OVERORDNET 5-ZONERS KROPS- & VERDENS-VRIMLEBILLEDE (På GrammatikSansningView)
// ============================================================================
export function renderOverordnetVrimmelMaster(navigateFn) {
    injectSansningIntegrationStyles();

    const box = document.createElement('div');
    box.className = 'si-master-vrimmel-card';

    let selectedFladeKey = 'flade1';
    let pureImage = false;

    const journeySteps = [
        {
            key: 'flade1',
            badge: '1. Substans & Bestemthed',
            title: 'Flade 1: Substans, form og bestemthed',
            storySent: 'Fra varm kaffe og træ til en kop, koppen og den varme kop på bordet.',
            grammarFocus: 'masse/form • stof/individ • en kop/koppen • huset/det røde hus',
            route: 'sansning_flade1'
        },
        {
            key: 'flade2',
            badge: '2. Tilstand & Bevægelse',
            title: 'Flade 2: Tilstand og bevægelse',
            storySent: 'Kaffen bliver varm, Mads stiller koppen inde i stuen og går ud og hjem.',
            grammarFocus: 'er/bliver • ligger/lægger • hjemme/hjem (-e/0) • har/er • aspekt',
            route: 'sansning_flade2'
        },
        {
            key: 'flade3',
            badge: '3. Rum, Tid & Relationer',
            title: 'Flade 3: Rum, tid og relationer',
            storySent: 'Mads tager denne kop i hånden, tager sin jakke på og spørger høfligt.',
            grammarFocus: 'i/på • denne/den • nutid/datid • sin/hans • høflig datidsbuffer',
            route: 'sansning_flade3'
        },
        {
            key: 'flade4',
            badge: '4. Sindets Fundament',
            title: 'Flade 4: Modalitet og evidens',
            storySent: 'Han synes kaffen er god, og toget kommer helt sikkert (jo/nok).',
            grammarFocus: 'sikkert/måske • jo/nok/vel/vist • synes/tror • skal/må/vil/kan',
            route: 'sansning_flade4'
        },
        {
            key: 'flade5',
            badge: '5. Tankens Vej & Flow',
            title: 'Flade 5: Kraftoverførsel & V2-flow',
            storySent: 'Selvom det regner, cykler Mads alligevel, fordi han skal møde.',
            grammarFocus: 'derfor/fordi • selvom/alligevel • hvis/eller • V2-stålfjederen',
            route: 'sansning_flade5'
        }
    ];

    function render() {
        const activeRealm = SANSNING_REALMS[selectedFladeKey];
        const activeJourney = journeySteps.find(j => j.key === selectedFladeKey) || journeySteps[0];

        box.innerHTML = `
            <div class="si-mv-header">
                <div>
                    <div class="si-tl-kicker" style="margin-bottom:0.4rem;">Overordnet Vrimlebillede • De 5 Kognitive Zoner i Én Scene</div>
                    <h2>Fra substansen på bordet over kroppens bevægelse og ud på landevejen</h2>
                    <p>
                        Klik på de <strong>5 kognitive zoner</strong> i vrimlebilledet (eller på de 5 kapitler nedenunder) for at se, hvordan dansk grammatik bygger verden op fra rå substans til tilstand/bevægelse, rum/tid, sindets holdning og sætningsflow:
                    </p>
                </div>
                <button type="button" class="si-realm-pill" id="si-mv-pure-btn">
                    ${pureImage ? 'Vis de 5 zone-markeringer' : 'Vis rent vrimlebillede'}
                </button>
            </div>

            <div class="si-mv-canvas">
                <img src="${baseUrl}assets/sansning_verden_vrimmel.jpg" alt="Overordnet vrimlebillede med de 4 kropslige hovedflader" onerror="this.src='${baseUrl}assets/sansning_vaere_venstre.jpg'" />
                ${!pureImage ? Object.values(SANSNING_REALMS).map(r => `
                    <button type="button"
                            class="si-mv-zone-hotspot ${r.id === selectedFladeKey ? 'active' : ''}"
                            style="left:${r.hotspot.x}%; top:${r.hotspot.y}%;"
                            data-zone-key="${r.id}">
                        ${r.shortTitle}
                    </button>
                `).join('') : ''}
            </div>

            <div class="si-mv-inspector">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem;">
                    <div>
                        <div style="font-size:0.76rem; font-weight:800; color:#7dd3fc; text-transform:uppercase; letter-spacing:0.04em;">
                            ${activeRealm.zoneTitle}
                        </div>
                        <div style="font-size:1.1rem; font-weight:900; color:#ffffff; margin-top:0.15rem;">
                            ${activeRealm.zoneQuestion}
                        </div>
                    </div>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <button type="button" class="si-realm-pill" id="si-mv-speak-btn">
                            🔊 Lyt til kapitlet
                        </button>
                        <button type="button" class="si-realm-pill grounding-bridge-pill" id="si-mv-grounding-btn">
                            🎈 ${activeRealm.groundingLabel}
                        </button>
                        <button type="button" class="si-realm-pill active" id="si-mv-open-flade-btn">
                            Åbn Hovedflade ${activeRealm.num} (${activeRealm.stations.length} stationer) →
                        </button>
                    </div>
                </div>

                <div class="si-mv-journey-strip">
                    ${journeySteps.map(step => `
                        <div class="si-mv-journey-step ${step.key === selectedFladeKey ? 'active' : ''}" data-step-key="${step.key}">
                            <div>
                                <div style="font-size:0.74rem; font-weight:800; color:#38bdf8;">${step.badge}</div>
                                <div style="font-size:0.92rem; font-weight:800; color:#ffffff; margin:0.2rem 0;">»${step.storySent}«</div>
                            </div>
                            <div style="font-size:0.75rem; color:#FFC9CD;">${step.grammarFocus}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        box.querySelector('#si-mv-pure-btn').onclick = () => {
            pureImage = !pureImage;
            render();
        };

        box.querySelectorAll('[data-zone-key]').forEach(btn => {
            btn.onclick = () => {
                selectedFladeKey = btn.getAttribute('data-zone-key');
                render();
            };
        });

        box.querySelectorAll('[data-step-key]').forEach(el => {
            el.onclick = () => {
                selectedFladeKey = el.getAttribute('data-step-key');
                render();
            };
        });

        box.querySelector('#si-mv-speak-btn').onclick = () => {
            speakSansningDanish(activeJourney.storySent);
        };

        box.querySelector('#si-mv-grounding-btn').onclick = () => {
            navigateFn(activeRealm.groundingRoute);
        };

        box.querySelector('#si-mv-open-flade-btn').onclick = () => {
            navigateFn(activeRealm.route);
        };
    }

    render();
    return box;
}

// ============================================================================
// 3. DEN RØDE TRÅD I HVER HOVEDFLADE (Sammenhængende fortælling mellem stationer)
// ============================================================================
export function renderRedThreadStoryStrip(fladeId, navigateFn, onSelectStationIdx = null) {
    injectSansningIntegrationStyles();
    const flade = SANSNING_REALMS[fladeId];
    if (!flade) return document.createElement('div');

    const card = document.createElement('div');
    card.className = 'si-red-thread-card';

    card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.75rem;">
            <div>
                <div class="si-tl-kicker" style="margin-bottom:0.35rem;">Den Røde Tråd • Sammenhæng mellem alle ${flade.stations.length} underflader</div>
                <h2 style="margin:0 0 0.25rem; font-size:1.25rem; font-weight:900; color:#ffffff;">${flade.storyTitle}</h2>
                <p style="margin:0; font-size:0.88rem; color:#FFC9CD; max-width:820px; line-height:1.45;">${flade.storyDesc}</p>
            </div>
            <button type="button" class="si-realm-pill" id="si-rt-play-all">
                🔊 Lyt til hele kæden (${flade.stations.length} kapitler)
            </button>
        </div>

        <div class="si-rt-steps-grid">
            ${flade.stations.map((st, idx) => `
                <div class="si-rt-step-box" data-rt-idx="${idx}" data-rt-route="${st.route}">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                            <span style="font-size:0.74rem; font-weight:900; color:#38bdf8;">Station ${st.num} • ${st.short}</span>
                            <span style="font-size:0.7rem; color:#94a3b8;">${st.storyStep}</span>
                        </div>
                        <div style="font-size:0.82rem; color:#7dd3fc; margin-bottom:0.2rem;">🔵 ${st.storyTilstand}</div>
                        <div style="font-size:0.82rem; color:#fdba74; font-weight:700;">🟠 ${st.storyForvandling}</div>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.08); font-size:0.74rem;">
                        <span style="color:#fde68a; font-weight:800;" data-try-tactile="${idx}">⚡ Prøv taktilt her</span>
                        <span style="color:#ffffff; font-weight:800;">Åbn station →</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    card.querySelector('#si-rt-play-all').onclick = () => {
        const fullStory = flade.stations.map(s => `${s.storyTilstand} ${s.storyForvandling}`).join(' ');
        speakSansningDanish(fullStory);
    };

    card.querySelectorAll('.si-rt-step-box').forEach(boxEl => {
        boxEl.onclick = (e) => {
            const idx = parseInt(boxEl.getAttribute('data-rt-idx'), 10);
            if (e.target && e.target.hasAttribute('data-try-tactile') && onSelectStationIdx) {
                e.stopPropagation();
                onSelectStationIdx(idx);
                return;
            }
            navigateFn(boxEl.getAttribute('data-rt-route'));
        };
    });

    return card;
}

// ============================================================================
// 4. SVG-GENERATOR TIL DET TAKTILE GROUNDING-LABORATORIUM (ETAPE 2)
// ============================================================================
function renderTactileSvgScene(svgType) {
    switch (svgType) {
        // 1.1 Være vs. Blive (Termometer & kaffekop)
        case 'thermometer_still':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="26" fill="#7dd3fc" font-size="11" font-weight="800">TILSTAND I RO (0% overgang)</text>
                    <!-- Kaffekop i ro -->
                    <rect x="75" y="55" width="52" height="42" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
                    <path d="M 127 64 C 142 64, 142 86, 127 86" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
                    <line x1="50" y1="98" x2="155" y2="98" stroke="#475569" stroke-width="3"/>
                    <!-- Termometer fastlåst -->
                    <rect x="215" y="25" width="18" height="72" rx="9" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
                    <rect x="219" y="45" width="10" height="48" rx="5" fill="#38bdf8"/>
                    <circle cx="224" cy="94" r="11" fill="#38bdf8"/>
                    <text x="250" y="62" fill="#7dd3fc" font-size="12" font-weight="900">Fastfrosset: ER varm</text>
                    <text x="250" y="80" fill="#94a3b8" font-size="10">Ingen ændring i gang</text>
                </svg>
            `;
        case 'thermometer_change':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="26" fill="#fdba74" font-size="11" font-weight="800">FASE-FORVANDLING I GANG (Varm ➔ Kold)</text>
                    <!-- Kaffekop der køler -->
                    <rect x="75" y="55" width="52" height="42" rx="8" fill="#1e293b" stroke="#fb923c" stroke-width="2.5"/>
                    <path d="M 127 64 C 142 64, 142 86, 127 86" fill="none" stroke="#fb923c" stroke-width="2.5"/>
                    <path d="M 145 72 L 195 72" stroke="#fb923c" stroke-width="3" stroke-dasharray="5,4"/>
                    <polygon points="195,67 205,72 195,77" fill="#fb923c"/>
                    <!-- Termometer i bevægelse -->
                    <rect x="215" y="25" width="18" height="72" rx="9" fill="#1e293b" stroke="#fb923c" stroke-width="2"/>
                    <rect x="219" y="68" width="10" height="25" rx="5" fill="#fb923c">
                        <animate attributeName="y" values="38;72;38" dur="2.2s" repeatCount="infinite"/>
                        <animate attributeName="height" values="55;21;55" dur="2.2s" repeatCount="infinite"/>
                    </rect>
                    <circle cx="224" cy="94" r="11" fill="#fb923c"/>
                    <text x="245" y="62" fill="#fdba74" font-size="12" font-weight="900">Overgang: BLIVER kold</text>
                    <text x="245" y="80" fill="#cbd5e1" font-size="10">Tilstanden skifter live!</text>
                </svg>
            `;

        // 1.2 Ligge vs. Lægge (Hvile vs. Håndens kraftvektor)
        case 'hand_rest':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="26" fill="#7dd3fc" font-size="11" font-weight="800">0 NEWTON • INGEN YDRE HÅND (Intransitiv hvile)</text>
                    <!-- Bordplade -->
                    <line x1="45" y1="95" x2="315" y2="95" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
                    <!-- Bog der hviler vandret -->
                    <rect x="125" y="75" width="110" height="18" rx="4" fill="#0284c7" stroke="#7dd3fc" stroke-width="2"/>
                    <text x="180" y="62" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="900">Bogen LIGGER i ro på bordet</text>
                </svg>
            `;
        case 'hand_push':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">KRAFTOVERFØRSEL: HÅNDEN (Subjekt) ➔ BOGEN (Objekt)</text>
                    <line x1="45" y1="98" x2="315" y2="98" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
                    <!-- Animeret hånd + kraftpil + bog -->
                    <g>
                        <animateTransform attributeName="transform" type="translate" values="0,-16; 0,0; 0,-16" dur="1.8s" repeatCount="infinite"/>
                        <circle cx="115" cy="48" r="13" fill="#fb923c"/>
                        <text x="115" y="52" text-anchor="middle" fill="#fff" font-size="10" font-weight="900">HÅND</text>
                        <line x1="132" y1="53" x2="158" y2="72" stroke="#fde047" stroke-width="3.5"/>
                        <polygon points="159,66 164,76 153,75" fill="#fde047"/>
                        <rect x="145" y="76" width="105" height="18" rx="4" fill="#ea580c" stroke="#fed7aa" stroke-width="2"/>
                    </g>
                    <text x="255" y="56" text-anchor="middle" fill="#fde047" font-size="11.5" font-weight="900">Jeg LÆGGER bogen ↓</text>
                </svg>
            `;

        // 1.1 Masse vs. Form
        case 'mass_free':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="25" fill="#7dd3fc" font-size="11" font-weight="800">UAFGRÆNSET MASSE (Ingen fast ydre kontur = 0 artikel)</text>
                    <path d="M 55 78 Q 95 62 135 78 T 215 78 T 295 78 L 295 102 L 55 102 Z" fill="rgba(56,189,248,0.35)" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="5,4"/>
                    <text x="180" y="55" text-anchor="middle" fill="#7dd3fc" font-size="12" font-weight="900">meget vand • kaffe • mel (utælleligt)</text>
                </svg>
            `;
        case 'mass_molded':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="25" fill="#fdba74" font-size="11" font-weight="800">FAST KONTUR & BEHOLDER (Artikel- og tal-anker låser sig på!)</text>
                    <rect x="65" y="46" width="52" height="52" rx="8" fill="rgba(251,146,60,0.28)" stroke="#fb923c" stroke-width="3"/>
                    <text x="91" y="76" text-anchor="middle" fill="#fff" font-size="11" font-weight="900">EN kop</text>
                    <circle cx="195" cy="74" r="22" fill="rgba(250,204,21,0.28)" stroke="#fde047" stroke-width="3"/>
                    <circle cx="250" cy="74" r="22" fill="rgba(250,204,21,0.28)" stroke="#fde047" stroke-width="3"/>
                    <text x="222" y="42" text-anchor="middle" fill="#fde047" font-size="11.5" font-weight="900">TO / MANGE boller (-er)</text>
                </svg>
            `;

        // 1.2 Stof vs. Individ (Zoom-linse)
        case 'substance_zoom_in':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">MAKRO-LINSE TÆT PÅ STOFFET (Ingen ydre kant = 0 artikel)</text>
                    <circle cx="105" cy="74" r="34" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="3" stroke-dasharray="5,3"/>
                    <line x1="80" y1="64" x2="130" y2="64" stroke="#7dd3fc" stroke-width="2.5"/>
                    <line x1="76" y1="74" x2="134" y2="74" stroke="#7dd3fc" stroke-width="2.5"/>
                    <line x1="82" y1="84" x2="128" y2="84" stroke="#7dd3fc" stroke-width="2.5"/>
                    <text x="235" y="64" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="900">lavet af TRÆ • spiser FISK</text>
                    <text x="235" y="84" text-anchor="middle" fill="#7dd3fc" font-size="10.5" font-weight="800">Kun tekstur og materiale i fokus</text>
                </svg>
            `;
        case 'substance_zoom_out':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">HELHEDS-LINSE PÅ INDIVIDET (Ydre kontur = EN / ET)</text>
                    <!-- Et træ med stamme og krone -->
                    <rect x="78" y="78" width="12" height="24" fill="#a16207"/>
                    <circle cx="84" cy="60" r="22" fill="rgba(74,222,128,0.3)" stroke="#4ade80" stroke-width="2.5"/>
                    <text x="84" y="114" text-anchor="middle" fill="#86efac" font-size="10.5" font-weight="900">ET træ</text>
                    <!-- En fisk med hale -->
                    <ellipse cx="220" cy="72" rx="34" ry="16" fill="rgba(251,146,60,0.3)" stroke="#fb923c" stroke-width="2.5"/>
                    <polygon points="254,72 272,58 272,86" fill="#fb923c"/>
                    <text x="228" y="110" text-anchor="middle" fill="#fde047" font-size="11" font-weight="900">EN fisk • EN øl</text>
                </svg>
            `;

        // 1.3 Ubestemt vs. Bestemt (Spotlight-kegle)
        case 'spotlight_indef':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">BRED SØGEKEGLE OVER MÆNGDEN (Ubestemt: EN kop / stole)</text>
                    <rect x="55" y="56" width="38" height="36" rx="6" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,3"/>
                    <rect x="115" y="56" width="38" height="36" rx="6" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,3"/>
                    <rect x="175" y="56" width="38" height="36" rx="6" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,3"/>
                    <text x="134" y="112" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="800">Hvilken som helst: »EN kop« (ny på scenen)</text>
                    <text x="295" y="78" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="900">? EN / ET ?</text>
                </svg>
            `;
        case 'spotlight_def':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">LÅST PROJEKTØR I FÆLLES SYNSFELT (Bestemt: KOP-PEN / STOL-ENE)</text>
                    <!-- Spotlight kegle -->
                    <polygon points="180,28 125,98 235,98" fill="rgba(250,204,21,0.16)"/>
                    <rect x="148" y="52" width="64" height="44" rx="8" fill="#ea580c" stroke="#fde047" stroke-width="3"/>
                    <text x="180" y="78" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="900">kop-PEN</text>
                    <text x="180" y="115" text-anchor="middle" fill="#fde047" font-size="11" font-weight="900">🔒 Ankeret (-EN / -ET / -NE) låser sig fast bagpå!</text>
                </svg>
            `;

        // 1.4 Baghængt vs. Foranstillet bestemthed (Adjektiv-kilen)
        case 'def_suffix_back':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">UDEN ADJEKTIV: Bestemtheds-ankeret hænger trygt BAGPÅ</text>
                    <rect x="85" y="48" width="110" height="46" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
                    <text x="140" y="76" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="900">hus</text>
                    <rect x="195" y="48" width="75" height="46" rx="10" fill="#0284c7" stroke="#7dd3fc" stroke-width="3"/>
                    <text x="232" y="76" text-anchor="middle" fill="#fde047" font-size="15" font-weight="900">-ET 🔒</text>
                    <text x="180" y="114" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="800">hus-et • kop-pen • hus-ene</text>
                </svg>
            `;
        case 'def_wedge_front':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="18" y="24" fill="#fdba74" font-size="10.5" font-weight="800">ADJEKTIV-KILEN SKUBBER ANKERET FREM FORAN (DET + RØDE + HUS)</text>
                    <!-- Bue der viser at -ET er sprunget bagfra og frem foran -->
                    <path d="M 295 45 Q 180 15 65 45" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="4,3"/>
                    <polygon points="68,39 58,47 71,48" fill="#fde047"/>
                    <rect x="28" y="50" width="76" height="44" rx="9" fill="#ca8a04" stroke="#fde047" stroke-width="3"/>
                    <text x="66" y="76" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="900">DET ⚡</text>
                    <rect x="116" y="50" width="108" height="44" rx="9" fill="#ea580c" stroke="#fed7aa" stroke-width="2.5"/>
                    <text x="170" y="76" text-anchor="middle" fill="#ffffff" font-size="13.5" font-weight="900">rød-E (kile)</text>
                    <rect x="236" y="50" width="94" height="44" rx="9" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
                    <text x="283" y="76" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="900">hus (0)</text>
                </svg>
            `;

        // 1.5 Fra aktivitet til ting (at træne -> træning)
        case 'activity_flow':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">AKTIVITET I BEVÆGELSE (at + verbum)</text>
                    <path d="M 24 78 Q 85 40 150 78 T 275 78 T 335 68" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                    <polygon points="325,60 342,68 326,76" fill="#38bdf8"/>
                    <text x="180" y="68" text-anchor="middle" fill="#ffffff" font-size="18" font-weight="900">at træne</text>
                    <text x="180" y="112" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="700">Levende handling i tiden</text>
                </svg>
            `;
        case 'activity_thing':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">STØBT TIL EN FAST TING (stamme + -ing)</text>
                    <rect x="70" y="42" width="220" height="50" rx="12" fill="rgba(251,146,60,0.22)" stroke="#fb923c" stroke-width="3"/>
                    <text x="180" y="73" text-anchor="middle" fill="#ffffff" font-size="18" font-weight="900">træn-ing / træningen</text>
                    <text x="180" y="112" text-anchor="middle" fill="#fde047" font-size="11" font-weight="800">Nu en fast enhed man kan pege på</text>
                </svg>
            `;

        // 1.4 Har vs. Er
        case 'engine_har':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="25" fill="#7dd3fc" font-size="11" font-weight="800">PROCES-MOTOREN (HAR): Aktivitet inden for samme zone</text>
                    <rect x="55" y="40" width="250" height="62" rx="12" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6,4"/>
                    <circle cx="135" cy="74" r="16" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6,4">
                        <animateTransform attributeName="transform" type="rotate" from="0 135 74" to="360 135 74" dur="2s" repeatCount="infinite"/>
                    </circle>
                    <text x="225" y="72" text-anchor="middle" fill="#7dd3fc" font-size="12" font-weight="900">HAR cyklet rundt</text>
                    <text x="225" y="89" text-anchor="middle" fill="#94a3b8" font-size="10">Fokus på selve arbejdet</text>
                </svg>
            `;
        case 'threshold_er':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="25" fill="#fdba74" font-size="11" font-weight="800">GRÆNSESKIFT (ER): Fra Zone A over målstregen til Zone B!</text>
                    <text x="70" y="75" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="800">Zone A (Hjem)</text>
                    <line x1="175" y1="36" x2="175" y2="105" stroke="#fde047" stroke-width="3" stroke-dasharray="4,3"/>
                    <path d="M 110 72 L 235 72" stroke="#fb923c" stroke-width="4"/>
                    <polygon points="235,65 250,72 235,79" fill="#fb923c"/>
                    <text x="295" y="72" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="900">ER cyklet (Zone B)</text>
                </svg>
            `;

        // 1.5 Aspekt
        case 'aspect_wave':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="25" fill="#7dd3fc" font-size="11" font-weight="800">DVÆLENDE BØLGE (SIDDER OG + VERBUM): Ingen start/slut-kant</text>
                    <path d="M 35 75 Q 75 50 115 75 T 195 75 T 275 75 T 335 75" fill="none" stroke="#38bdf8" stroke-width="4"/>
                    <text x="180" y="106" text-anchor="middle" fill="#7dd3fc" font-size="11.5" font-weight="800">sidder og drikker • ligger og læser (rolig strøm)</text>
                </svg>
            `;
        case 'aspect_launch':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="25" fill="#fdba74" font-size="11" font-weight="800">START-KATAPULT (SÆTTER SIG TIL AT): Skarpt startpunkt!</text>
                    <circle cx="80" cy="82" r="8" fill="#fde047"/>
                    <path d="M 80 82 L 155 48 L 310 48" fill="none" stroke="#fb923c" stroke-width="4"/>
                    <polygon points="310,42 324,48 310,54" fill="#fb923c"/>
                    <text x="195" y="88" text-anchor="middle" fill="#fdba74" font-size="11.5" font-weight="900">⚡ sætter sig til at arbejde hurtigt!</text>
                </svg>
            `;

        // 2.1 Kasse-folderen (I vs. PÅ)
        case 'box_3d_i':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">3D HULE MED REJSTE VÆGGE ➔ OMSLUTTET (I)</text>
                    <!-- Høje kassevægge omkring katten -->
                    <path d="M 110 38 L 110 98 L 250 98 L 250 38" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="180" cy="76" r="15" fill="#38bdf8"/>
                    <text x="180" y="80" text-anchor="middle" fill="#0b1528" font-size="10" font-weight="900">KAT</text>
                    <text x="180" y="116" text-anchor="middle" fill="#7dd3fc" font-size="11.5" font-weight="900">Væggene omslutter: I kassen • I stuen • I Danmark</text>
                </svg>
            `;
        case 'box_2d_paa':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">2D FLAD OVERFLADE UDEN VÆGGE ➔ EKSPONERET (PÅ)</text>
                    <!-- Kassen klappet helt fladt ned -->
                    <line x1="75" y1="88" x2="285" y2="88" stroke="#fb923c" stroke-width="6" stroke-linecap="round"/>
                    <circle cx="180" cy="68" r="15" fill="#fb923c"/>
                    <text x="180" y="72" text-anchor="middle" fill="#fff" font-size="10" font-weight="900">KAT</text>
                    <text x="180" y="114" text-anchor="middle" fill="#fdba74" font-size="11.5" font-weight="900">Kun en flade under: PÅ kassen • PÅ bordet • PÅ Fyn</text>
                </svg>
            `;

        // 2.2 Denne vs. Den
        case 'deixis_near':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">GRIBE-ZONEN (0,3 m): Lige her i min hånd (DENNE / DETTE)</text>
                    <circle cx="95" cy="72" r="28" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" stroke-width="2.5"/>
                    <text x="95" y="76" text-anchor="middle" fill="#fff" font-size="11" font-weight="900">DENNE kop</text>
                    <text x="235" y="76" text-anchor="middle" fill="#7dd3fc" font-size="11.5" font-weight="800">Tæt nok til at røre ved!</text>
                </svg>
            `;
        case 'deixis_far':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">PEGEFINGER-ZONEN (15 m): Langt derovre (DEN / DET)</text>
                    <circle cx="65" cy="75" r="12" fill="#94a3b8"/>
                    <line x1="82" y1="75" x2="255" y2="75" stroke="#fb923c" stroke-width="3" stroke-dasharray="6,4"/>
                    <polygon points="255,69 268,75 255,81" fill="#fb923c"/>
                    <circle cx="298" cy="75" r="20" fill="rgba(251,146,60,0.25)" stroke="#fb923c" stroke-width="2.5"/>
                    <text x="298" y="79" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="900">DEN kop</text>
                </svg>
            `;

        // 2.3 Tidens kamera
        case 'time_now':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">NU-SCENEN ER TÆNDT (Nutid -r & Førnutid har/er)</text>
                    <circle cx="180" cy="74" r="34" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" stroke-width="3"/>
                    <text x="180" y="78" text-anchor="middle" fill="#fff" font-size="12" font-weight="900">HER & NU (Scvelys)</text>
                </svg>
            `;
        case 'time_past':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">LUKKET DATIDS-KIKKERT (Datid -ede/-te: I går kl. 7)</text>
                    <rect x="45" y="52" width="110" height="44" rx="8" fill="rgba(251,146,60,0.2)" stroke="#fb923c" stroke-width="2.5"/>
                    <text x="100" y="78" text-anchor="middle" fill="#fdba74" font-size="11" font-weight="900">I går (Lukket boks)</text>
                    <line x1="185" y1="38" x2="185" y2="108" stroke="#ef4444" stroke-width="3"/>
                    <text x="270" y="78" text-anchor="middle" fill="#94a3b8" font-size="11">Adskilt fra nuet</text>
                </svg>
            `;

        // 2.4 Dørtærskel-låsen (-e vs. 0)
        case 'threshold_inside_e':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">INDEN FOR DØRKARMEN I RO ➔ LÅST MED "-E"</text>
                    <rect x="65" y="38" width="145" height="68" rx="10" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="3"/>
                    <text x="137" y="75" text-anchor="middle" fill="#fff" font-size="14" font-weight="900">hjemm-E • ind-E</text>
                    <text x="285" y="75" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="800">🔒 -E holder roen</text>
                </svg>
            `;
        case 'threshold_cross_0':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">FODEN KRYDSER DØRTRINET ➔ "-E" FALDER AF!</text>
                    <line x1="175" y1="35" x2="175" y2="108" stroke="#fde047" stroke-width="4" stroke-dasharray="5,3"/>
                    <path d="M 85 72 L 235 72" stroke="#fb923c" stroke-width="5"/>
                    <polygon points="235,64 252,72 235,80" fill="#fb923c"/>
                    <text x="120" y="58" text-anchor="middle" fill="#fff" font-size="13" font-weight="900">går HJEM / IND</text>
                    <text x="295" y="88" text-anchor="middle" fill="#f87171" font-size="12" font-weight="900">✂️ (-e faldt af!)</text>
                </svg>
            `;

        // 2.5 Sin vs. Hans (Refleksiv elastik)
        case 'reflexive_sin':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#071c18"/>
                    <text x="20" y="24" fill="#4ade80" font-size="11" font-weight="800">REFLEKSIV ELASTIK (SIN): Springer tilbage til Subjektet selv!</text>
                    <circle cx="95" cy="82" r="22" fill="#16a34a" stroke="#86efac" stroke-width="2.5"/>
                    <text x="95" y="86" text-anchor="middle" fill="#fff" font-size="11" font-weight="900">Mads₁</text>
                    <!-- Elastik-bue ud til frakken og tilbage til Mads -->
                    <path d="M 117 75 Q 180 28 235 72" fill="none" stroke="#4ade80" stroke-width="3.5"/>
                    <polygon points="122,68 114,77 125,79" fill="#4ade80"/>
                    <rect x="235" y="58" width="90" height="36" rx="8" fill="#064e3b" stroke="#4ade80" stroke-width="2.5"/>
                    <text x="280" y="80" text-anchor="middle" fill="#86efac" font-size="11.5" font-weight="900">SIN₁ frakke</text>
                </svg>
            `;
        case 'external_hans':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">EKSTERN PIL (HANS): Peger VÆK fra Mads ud på Peter!</text>
                    <circle cx="70" cy="82" r="20" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
                    <text x="70" y="86" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="800">Mads₁</text>
                    <path d="M 92 82 L 245 82" stroke="#fb923c" stroke-width="3.5" stroke-dasharray="6,3"/>
                    <polygon points="245,76 258,82 245,88" fill="#fb923c"/>
                    <circle cx="290" cy="82" r="22" fill="#ea580c" stroke="#fed7aa" stroke-width="2.5"/>
                    <text x="290" y="80" text-anchor="middle" fill="#fff" font-size="10" font-weight="900">Peter₂</text>
                    <text x="290" y="93" text-anchor="middle" fill="#fde047" font-size="9.5" font-weight="900">(HANS₂)</text>
                </svg>
            `;

        // 2.6 Social deiksis
        case 'social_close':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">DIREKTE NÆRHED (NUTID): 0 m buffer mellem nære venner</text>
                    <circle cx="145" cy="75" r="20" fill="#0284c7"/>
                    <circle cx="215" cy="75" r="20" fill="#0284c7"/>
                    <line x1="165" y1="75" x2="195" y2="75" stroke="#7dd3fc" stroke-width="4"/>
                    <text x="180" y="112" text-anchor="middle" fill="#7dd3fc" font-size="11.5" font-weight="900">»Vil du have en kop kaffe?«</text>
                </svg>
            `;
        case 'social_buffer':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">HØFLIGHEDS-LUFTPUDE (DATID): Giver fremmede rum til at sige nej</text>
                    <circle cx="85" cy="75" r="18" fill="#475569"/>
                    <rect x="125" y="55" width="110" height="38" rx="19" fill="rgba(251,146,60,0.22)" stroke="#fb923c" stroke-width="2" stroke-dasharray="4,3"/>
                    <text x="180" y="78" text-anchor="middle" fill="#fde047" font-size="10.5" font-weight="900">Datids-buffer</text>
                    <circle cx="275" cy="75" r="18" fill="#ea580c"/>
                </svg>
            `;

        // 3.1 Klippe vs. Plankebro vs. Tynd is
        case 'ground_cliff':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">GRANITKLIPPE UNDER FØDDERNE (100% Vished: helt sikkert)</text>
                    <path d="M 40 82 L 320 82 L 335 115 L 25 115 Z" fill="#334155" stroke="#38bdf8" stroke-width="3"/>
                    <text x="180" y="103" text-anchor="middle" fill="#7dd3fc" font-size="12" font-weight="900">MASSIV GRANIT • 100% FAST GRUND</text>
                </svg>
            `;
        case 'ground_plank':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#17160b"/>
                    <text x="20" y="24" fill="#fde047" font-size="11" font-weight="800">FJEDRENDE PLANKEBRO (70% Skøn: formentlig / sandsynligvis)</text>
                    <path d="M 45 78 Q 180 96 315 78" fill="none" stroke="#facc15" stroke-width="6" stroke-linecap="round"/>
                    <text x="180" y="62" text-anchor="middle" fill="#fde047" font-size="12" font-weight="900">Planken fjedrer lidt under fødderne</text>
                </svg>
            `;
        case 'ground_ice':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">KRAKELERENDE TYND IS (15–40% Tvivl: måske / næppe)</text>
                    <line x1="40" y1="82" x2="320" y2="82" stroke="#fb923c" stroke-width="2.5" stroke-dasharray="8,5"/>
                    <path d="M 145 82 L 160 98 L 175 86 L 195 104" fill="none" stroke="#ef4444" stroke-width="2.5"/>
                    <text x="180" y="64" text-anchor="middle" fill="#fca5a5" font-size="12" font-weight="900">⚡ Isen slår revner under vægten!</text>
                </svg>
            `;

        // 3.2 Evidensens kilde (jo, nok, vist)
        case 'evidens_jo':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">FÆLLES VIDENS-CIRKEL MELLEM TALER & LYTTER (JO)</text>
                    <circle cx="145" cy="76" r="32" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" stroke-width="2.5"/>
                    <circle cx="215" cy="76" r="32" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" stroke-width="2.5"/>
                    <text x="180" y="80" text-anchor="middle" fill="#fff" font-size="13" font-weight="900">JO (Os begge)</text>
                </svg>
            `;
        case 'evidens_nok':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#17160b"/>
                    <text x="20" y="24" fill="#fde047" font-size="11" font-weight="800">INDRE MAVE-KOMPAS (NOK) & UDSTRAKT HÅND (VEL?)</text>
                    <circle cx="180" cy="76" r="28" fill="rgba(250,204,21,0.22)" stroke="#facc15" stroke-width="3"/>
                    <text x="180" y="80" text-anchor="middle" fill="#fde047" font-size="12.5" font-weight="900">NOK (Egen mave)</text>
                </svg>
            `;
        case 'evidens_vist':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">ANDENHÅNDS-RYGTE UDEFRA BYEN (VIST)</text>
                    <path d="M 45 55 Q 115 35 175 72" fill="none" stroke="#fb923c" stroke-width="3" stroke-dasharray="5,4"/>
                    <polygon points="175,66 186,74 173,78" fill="#fb923c"/>
                    <rect x="195" y="54" width="125" height="40" rx="10" fill="rgba(251,146,60,0.2)" stroke="#fb923c" stroke-width="2"/>
                    <text x="257" y="78" text-anchor="middle" fill="#fed7aa" font-size="11.5" font-weight="900">Hørt udefra: VIST</text>
                </svg>
            `;

        // 3.3 Synes vs. Tror
        case 'mind_synes':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">KROPPENS SANSER (Tunge, Øjne, Hud) ➔ JEG SYNES</text>
                    <rect x="65" y="60" width="46" height="36" rx="6" fill="#0284c7"/>
                    <text x="88" y="82" text-anchor="middle" fill="#fff" font-size="10" font-weight="800">KAFFE</text>
                    <path d="M 118 76 L 210 76" stroke="#38bdf8" stroke-width="4"/>
                    <polygon points="210,69 224,76 210,83" fill="#38bdf8"/>
                    <circle cx="265" cy="76" r="28" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" stroke-width="2.5"/>
                    <text x="265" y="74" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="900">TUNGE &amp;</text>
                    <text x="265" y="88" text-anchor="middle" fill="#7dd3fc" font-size="10.5" font-weight="900">MAVE</text>
                </svg>
            `;
        case 'mind_tror':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">PANDENS TANKE-PROJEKTION (Uafprøvet gæt) ➔ JEG TROR</text>
                    <circle cx="115" cy="82" r="22" fill="#334155" stroke="#fb923c" stroke-width="2.5"/>
                    <text x="115" y="86" text-anchor="middle" fill="#fff" font-size="10" font-weight="900">PANDE</text>
                    <path d="M 142 72 L 220 58" stroke="#fb923c" stroke-width="3" stroke-dasharray="5,4"/>
                    <ellipse cx="272" cy="62" rx="55" ry="26" fill="rgba(251,146,60,0.2)" stroke="#fb923c" stroke-width="2" stroke-dasharray="4,3"/>
                    <text x="272" y="66" text-anchor="middle" fill="#fed7aa" font-size="11" font-weight="900">? Gæt om regn ?</text>
                </svg>
            `;

        // 3.4 Modalverber
        case 'modal_internal':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">INDRE DRIVKRAFT & KAPACITET (VIL = Hjerte • KAN = Muskel)</text>
                    <circle cx="125" cy="76" r="26" fill="rgba(56,189,248,0.28)" stroke="#38bdf8" stroke-width="3"/>
                    <text x="125" y="80" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="900">VIL / KAN</text>
                    <path d="M 156 76 L 285 76" stroke="#38bdf8" stroke-width="4"/>
                    <polygon points="285,69 300,76 285,83" fill="#38bdf8"/>
                </svg>
            `;
        case 'modal_external':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">YDRE PRES & PORTVAGT (SKAL = Pres bagfra • MÅ = Bom løftes)</text>
                    <path d="M 45 76 L 135 76" stroke="#fb923c" stroke-width="5"/>
                    <polygon points="135,68 150,76 135,84" fill="#fb923c"/>
                    <circle cx="185" cy="76" r="22" fill="#ea580c"/>
                    <text x="185" y="80" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="900">SKAL/MÅ</text>
                    <line x1="255" y1="42" x2="295" y2="88" stroke="#4ade80" stroke-width="4" stroke-linecap="round"/>
                </svg>
            `;

        // 4.1 Derfor vs. Fordi
        case 'causal_forward':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">MEDSTRØMS-VEKTOR FREMAD: Årsag ➔ DERFOR (+ V2) ➔ Virkning</text>
                    <rect x="30" y="54" width="92" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
                    <text x="76" y="78" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">1. Årsag</text>
                    <path d="M 130 74 L 222 74" stroke="#38bdf8" stroke-width="4"/>
                    <polygon points="222,67 236,74 222,81" fill="#38bdf8"/>
                    <text x="180" y="63" text-anchor="middle" fill="#fde047" font-size="11" font-weight="900">DERFOR ➔</text>
                    <rect x="242" y="54" width="92" height="40" rx="8" fill="#0284c7" stroke="#7dd3fc" stroke-width="2"/>
                    <text x="288" y="78" text-anchor="middle" fill="#fff" font-size="11" font-weight="900">2. Virkning</text>
                </svg>
            `;
        case 'causal_rearview':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">BAKSPEJLS-VEKTOR BAGUD: Virkning ⬅ FORDI ⬅ Årsag</text>
                    <rect x="30" y="54" width="92" height="40" rx="8" fill="#ea580c" stroke="#fed7aa" stroke-width="2"/>
                    <text x="76" y="78" text-anchor="middle" fill="#fff" font-size="11" font-weight="900">1. Virkning</text>
                    <path d="M 230 74 L 138 74" stroke="#fb923c" stroke-width="4"/>
                    <polygon points="138,67 124,74 138,81" fill="#fb923c"/>
                    <text x="180" y="63" text-anchor="middle" fill="#fde047" font-size="11" font-weight="900">⬅ FORDI</text>
                    <rect x="242" y="54" width="92" height="40" rx="8" fill="#1e293b" stroke="#fb923c" stroke-width="2"/>
                    <text x="288" y="78" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">2. Årsag</text>
                </svg>
            `;

        // 4.2 Men vs. Selvom/Alligevel
        case 'barrier_turn':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">90° RETNINGSKNÆK (MEN): Vejen drejer brat i krydset</text>
                    <path d="M 55 92 L 185 92 L 185 45" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
                    <polygon points="178,48 185,34 192,48" fill="#38bdf8"/>
                    <text x="245" y="72" fill="#7dd3fc" font-size="12" font-weight="900">Knæk: ... MEN vinden er kold</text>
                </svg>
            `;
        case 'barrier_break':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">GENNEMBRUD (SELVOM ... ALLIGEVEL): Pløjer gennem muren!</text>
                    <rect x="165" y="38" width="22" height="68" rx="4" fill="rgba(239,68,68,0.45)" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,3"/>
                    <path d="M 55 74 L 295 74" stroke="#fde047" stroke-width="5"/>
                    <polygon points="295,66 312,74 295,82" fill="#fde047"/>
                    <text x="105" y="60" text-anchor="middle" fill="#fca5a5" font-size="10.5" font-weight="900">SELVOM (Mur)</text>
                    <text x="255" y="60" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="900">ALLIGEVEL! ⚡</text>
                </svg>
            `;

        // 4.3 Hvis vs. Eller
        case 'bridge_hvis':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="24" fill="#7dd3fc" font-size="11" font-weight="800">BETINGELSES-HÆNGEBROEN (HVIS ..., SÅ + V2)</text>
                    <path d="M 55 78 Q 180 48 305 78" fill="none" stroke="#38bdf8" stroke-width="4"/>
                    <text x="180" y="96" text-anchor="middle" fill="#7dd3fc" font-size="11.5" font-weight="900">Hvis broen holder ➔ så tager Mads toget</text>
                </svg>
            `;
        case 'fork_eller':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="24" fill="#fdba74" font-size="11" font-weight="800">SPORSKIFTET VED VEJGAFLEN (ENTEN ... ELLER)</text>
                    <path d="M 55 75 L 155 75 L 275 48 M 155 75 L 275 100" fill="none" stroke="#fb923c" stroke-width="4" stroke-linecap="round"/>
                    <text x="312" y="52" text-anchor="middle" fill="#fde047" font-size="11" font-weight="900">Spor A</text>
                    <text x="312" y="103" text-anchor="middle" fill="#fdba74" font-size="11" font-weight="900">Spor B</text>
                </svg>
            `;

        // 4.4 Den Fysiske V2-Stålfjeder (Sætningsdansen)
        case 'v2_spring_rest':
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#0b1528"/>
                    <text x="20" y="23" fill="#7dd3fc" font-size="11" font-weight="800">PLADS 1 = SUBJEKT ➔ V2-FJEDEREN HVILER I LIGESVÆGT</text>
                    <rect x="24" y="42" width="96" height="44" rx="8" fill="rgba(22,163,74,0.25)" stroke="#4ade80" stroke-width="2.5"/>
                    <text x="72" y="68" text-anchor="middle" fill="#86efac" font-size="11.5" font-weight="900">1. Mads (S)</text>
                    <rect x="132" y="42" width="96" height="44" rx="8" fill="rgba(2,132,199,0.3)" stroke="#38bdf8" stroke-width="2.5"/>
                    <text x="180" y="68" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="900">2. cykler (V2)</text>
                    <rect x="240" y="42" width="96" height="44" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
                    <text x="288" y="68" text-anchor="middle" fill="#cbd5e1" font-size="11">3. i parken</text>
                </svg>
            `;
        default: // 'v2_spring_fired'
            return `
                <svg viewBox="0 0 360 125" width="100%" height="125">
                    <rect width="360" height="125" rx="12" fill="#1a1118"/>
                    <text x="20" y="23" fill="#fde047" font-size="11" font-weight="800">⚡ V2-FJEDEREN UDLØST! Verbet LÅSES på Plads 2 ➔ Subjekt til Plads 3!</text>
                    <rect x="24" y="42" width="96" height="44" rx="8" fill="rgba(234,88,12,0.3)" stroke="#fb923c" stroke-width="2.5"/>
                    <text x="72" y="68" text-anchor="middle" fill="#fed7aa" font-size="11" font-weight="900">1. Hver morgen</text>
                    <rect x="132" y="42" width="96" height="44" rx="8" fill="rgba(239,68,68,0.35)" stroke="#fde047" stroke-width="3"/>
                    <text x="180" y="68" text-anchor="middle" fill="#fde047" font-size="11.5" font-weight="900">2. cykler ⚡</text>
                    <!-- Katapult-bue fra Plads 1 over Plads 2 til Plads 3 -->
                    <path d="M 85 40 Q 180 14 275 40" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-dasharray="4,3"/>
                    <rect x="240" y="42" width="96" height="44" rx="8" fill="rgba(22,163,74,0.3)" stroke="#4ade80" stroke-width="2.5"/>
                    <text x="288" y="68" text-anchor="middle" fill="#86efac" font-size="11.5" font-weight="900">3. Mads (S!)</text>
                </svg>
            `;
    }
}

// ============================================================================
// 5. DET TAKTILE GROUNDING-LABORATORIUM (Etape 2 — på alle 4 hovedflader & stationer)
// ============================================================================
export function renderSansningTactileLab(fladeId, navigateFn, initialStationIdx = 0, compactForStation = false) {
    injectSansningIntegrationStyles();
    const flade = SANSNING_REALMS[fladeId];
    if (!flade) return document.createElement('div');

    const lab = document.createElement('div');
    lab.className = 'si-tactile-lab-card';

    let stIdx = Math.max(0, Math.min(initialStationIdx, flade.stations.length - 1));
    let modeIdx = 0;

    function flashLab() {
        lab.classList.remove('pulse-glow');
        void lab.offsetWidth;
        lab.classList.add('pulse-glow');
        setTimeout(() => lab.classList.remove('pulse-glow'), 550);
    }

    function render() {
        const st = flade.stations[stIdx];
        const mode = st.modes[modeIdx] || st.modes[0];

        const cleanLabel = (s) => (s || '').replace(/^[\u{1F300}-\u{1FAFF}\u2600-\u27BF]+\s*/u, '');

        lab.innerHTML = `
            <div class="si-tl-top">
                <div>
                    <span class="si-tl-kicker">Taktilt Grounding-Laboratorium • Hovedflade ${flade.num}</span>
                    <h2 style="margin:0.35rem 0 0.15rem; font-size:1.22rem; font-weight:800; color:#f1f5f9;">${st.tactileTitle}</h2>
                    <p style="margin:0; font-size:0.86rem; color:#94a3b8;">${st.tactilePrompt}</p>
                </div>
                ${!compactForStation ? `
                    <div class="si-tl-station-tabs">
                        ${flade.stations.map((s, idx) => `
                            <button type="button" class="si-tl-st-tab ${idx === stIdx ? 'active' : ''}" data-tl-st="${idx}">
                                ${s.num} ${s.short}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>

            <!-- Taktile Manipulations-knapper -->
            <div class="si-tl-controls-row">
                ${st.modes.map((m, idx) => `
                    <button type="button" class="si-tl-action-btn ${idx === modeIdx ? 'active' : ''}" data-tl-mode="${idx}">
                        <div style="display:inline-flex; align-items:center; gap:0.45rem;">
                            <span style="display:inline-block; width:9px; height:9px; border-radius:999px; background:${idx === 0 ? '#38bdf8' : '#e08e5a'}; flex-shrink:0;"></span>
                            <span>${cleanLabel(m.btnLabel)}</span>
                        </div>
                        <div style="font-size:0.74rem; color:#94a3b8; font-weight:600; margin-top:0.18rem;">${m.badge}</div>
                    </button>
                `).join('')}
            </div>

            <!-- Live SVG Scene + Sætningsbånd -->
            <div class="si-tl-stage-frame">
                <div class="si-tl-svg-wrap">
                    ${renderTactileSvgScene(mode.svgType)}
                </div>
                <div class="si-tl-slots-strip">
                    <div class="si-tl-slots-row">
                        ${mode.slots.map(sl => `
                            <div class="si-tl-slot ${sl.role}">
                                <span class="si-tl-slot-lbl">${sl.label}</span>
                                <span class="si-tl-slot-val">${sl.text}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button type="button" class="si-realm-pill" id="si-tl-speak-btn">
                        Lyt: »${mode.sentence}«
                    </button>
                </div>
            </div>

            <div class="si-tl-explain-box" style="border-left-color:${mode.color};">
                <div style="flex:1; min-width:240px;">${mode.explain}</div>
                <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                    <button type="button" class="si-realm-pill grounding-bridge-pill" id="si-tl-open-grounding">
                        ${flade.groundingLabel}
                    </button>
                    ${!compactForStation ? `
                        <button type="button" class="si-realm-pill active" id="si-tl-open-station">
                            Træn Station ${st.num} i dybden →
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        lab.querySelectorAll('[data-tl-st]').forEach(btn => {
            btn.onclick = () => {
                stIdx = parseInt(btn.getAttribute('data-tl-st'), 10);
                modeIdx = 0;
                render();
                flashLab();
            };
        });

        lab.querySelectorAll('[data-tl-mode]').forEach(btn => {
            btn.onclick = () => {
                modeIdx = parseInt(btn.getAttribute('data-tl-mode'), 10);
                render();
                flashLab();
                const curMode = flade.stations[stIdx].modes[modeIdx];
                if (curMode) speakSansningDanish(curMode.sentence);
            };
        });

        const speakBtn = lab.querySelector('#si-tl-speak-btn');
        if (speakBtn) {
            speakBtn.onclick = () => speakSansningDanish(mode.sentence);
        }

        const groundingBtn = lab.querySelector('#si-tl-open-grounding');
        if (groundingBtn) {
            groundingBtn.onclick = () => navigateFn(flade.groundingRoute);
        }

        const openStBtn = lab.querySelector('#si-tl-open-station');
        if (openStBtn) {
            openStBtn.onclick = () => navigateFn(st.route);
        }
    }

    lab.setStationIdx = (newIdx) => {
        stIdx = Math.max(0, Math.min(newIdx, flade.stations.length - 1));
        modeIdx = 0;
        render();
        flashLab();
        lab.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    render();
    return lab;
}

// ============================================================================
// 6. FOOTER-BRO MELLEM STATIONER OG HOVEDFLADER
// ============================================================================
export function renderSansningFooterBridge(fladeId, navigateFn, activeStationRoute = null) {
    injectSansningIntegrationStyles();
    const flade = SANSNING_REALMS[fladeId];
    if (!flade) return document.createElement('div');

    const footer = document.createElement('div');
    footer.className = 'si-footer-bridge';

    const fladeOrder = ['flade1', 'flade2', 'flade3', 'flade4', 'flade5'];
    const curFladeOrderIdx = fladeOrder.indexOf(fladeId);
    const nextFlade = curFladeOrderIdx >= 0 && curFladeOrderIdx < fladeOrder.length - 1
        ? SANSNING_REALMS[fladeOrder[curFladeOrderIdx + 1]]
        : null;

    if (activeStationRoute) {
        const stIdx = flade.stations.findIndex(s => s.route === activeStationRoute);
        const prevSt = stIdx > 0 ? flade.stations[stIdx - 1] : null;
        const nextSt = stIdx >= 0 && stIdx < flade.stations.length - 1 ? flade.stations[stIdx + 1] : null;

        footer.innerHTML = `
            <div>
                <div style="font-size:0.75rem; font-weight:800; color:#7dd3fc; text-transform:uppercase;">Den røde tråd i Hovedflade ${flade.num}</div>
                <div style="font-size:0.95rem; font-weight:800; color:#ffffff; margin-top:0.15rem;">
                    ${nextSt ? `Næste kapitel i kæden: Station ${nextSt.num} — ${nextSt.title}` : `Du har gennemført alle ${flade.stations.length} stationer i Hovedflade ${flade.num}!`}
                </div>
            </div>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                ${prevSt ? `<button type="button" class="si-realm-pill" data-fb-nav="${prevSt.route}">← ${prevSt.num} ${prevSt.short}</button>` : ''}
                <button type="button" class="si-realm-pill" data-fb-nav="${flade.route}">Oversigt for Hovedflade ${flade.num}</button>
                ${nextSt
                    ? `<button type="button" class="si-realm-pill active" data-fb-nav="${nextSt.route}">Næste station: ${nextSt.num} ${nextSt.short} →</button>`
                    : (nextFlade
                        ? `<button type="button" class="si-realm-pill active" data-fb-nav="${nextFlade.route}">Videre til ${nextFlade.shortTitle} →</button>`
                        : `<button type="button" class="si-realm-pill grounding-bridge-pill" data-fb-nav="grounding">🎈 Gå til Grounding-kæden →</button>`)}
            </div>
        `;
    } else {
        footer.innerHTML = `
            <div>
                <div style="font-size:0.75rem; font-weight:800; color:#7dd3fc; text-transform:uppercase;">Fortsæt rejsen gennem de 5 kognitive hovedflader</div>
                <div style="font-size:0.95rem; font-weight:800; color:#ffffff; margin-top:0.15rem;">
                    ${nextFlade ? `Næste kognitive cirkel: ${nextFlade.fullTitle}` : 'Alle 5 kognitive hovedflader er forbundet med Grounding-kæden'}
                </div>
            </div>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <button type="button" class="si-realm-pill" data-fb-nav="grammatik_sansning">🧭 Tilbage til Krops-kompasset</button>
                <button type="button" class="si-realm-pill grounding-bridge-pill" data-fb-nav="${flade.groundingRoute}">🎈 ${flade.groundingLabel}</button>
                ${nextFlade ? `<button type="button" class="si-realm-pill active" data-fb-nav="${nextFlade.route}">Videre til ${nextFlade.shortTitle} →</button>` : ''}
            </div>
        `;
    }

    footer.querySelectorAll('[data-fb-nav]').forEach(btn => {
        btn.onclick = () => navigateFn(btn.getAttribute('data-fb-nav'));
    });

    return footer;
}

// ============================================================================
// 7. AUTOMATISK ENHANCER TIL ALLE 22 UNDERSTATIONER (.sansning-station-view)
// ============================================================================
function getStationRouteFromHash() {
    if (typeof window === 'undefined') return null;
    const raw = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    const parts = raw.split('/');
    // hash: #/da/sansning_i_paa eller #/da/grammatik_sansning/i_paa
    const target = parts[1] || '';
    const sub = parts[2] || '';
    const aliasMap = {
        i_paa: 'sansning_i_paa',
        denne_den: 'sansning_denne_den',
        sin_hans: 'sansning_sin_hans',
        social_deiksis: 'sansning_social_deiksis',
        form_masse: 'sansning_form_masse',
        stof_enhed: 'sansning_stof_enhed',
        bestemthed: 'sansning_bestemthed',
        adjektiv_bestemthed: 'sansning_adjektiv_bestemthed',
        aktivitet_til_ting: 'sansning_aktivitet_til_ting',
        aspekt_maade: 'sansning_aspekt_maade',
        vaere_blive: 'sansning_vaere_blive',
        sansning_tider: 'sansning_verber_tider',
        verbernes_tider: 'sansning_verber_tider',
        verber_tider_4: 'sansning_verber_tider',
        har_er: 'sansning_har_er',
        verber_har_er: 'sansning_har_er',
        kraft_hvile: 'sansning_kraft_hvile',
        verber_kraft_hvile: 'sansning_kraft_hvile',
        verber_ligger_og_laeser: 'sansning_kraft_hvile',
        rummet_taersklen: 'sansning_rummet_taersklen',
        sindets_sansning: 'sansning_sindet',
        sindet: 'sansning_sindet',
        fundamentets_fasthed: 'sansning_fundament',
        fundament: 'sansning_fundament',
        evidensens_kilde: 'sansning_evidens',
        evidens: 'sansning_evidens',
        modalverbernes_pres: 'sansning_modalverber',
        modalverber: 'sansning_modalverber',
        uhindret_fremdrift: 'sansning_fremdrift',
        fremdrift: 'sansning_fremdrift',
        kraft_mod_modstand: 'sansning_modstand',
        modstand: 'sansning_modstand',
        valg_skilleveje: 'sansning_skilleveje',
        skilleveje: 'sansning_skilleveje',
        saetningsdansen: 'sansning_inversion',
        inversion: 'sansning_inversion'
    };
    if (target === 'grammatik_sansning' && sub) {
        return aliasMap[sub] || `sansning_${sub}`;
    }
    return aliasMap[target] || target;
}

function navigateByHash(route) {
    if (typeof window === 'undefined') return;
    const raw = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    const lang = raw.split('/')[0] || 'da';
    window.location.hash = `#/${lang}/${route}`;
}

function enhanceStationViewIfNeeded() {
    if (typeof document === 'undefined') return;
    const stationView = document.querySelector('.sansning-station-view');
    if (!stationView || stationView.dataset.siEnhanced === 'true') return;

    const route = getStationRouteFromHash();
    const ctx = findStationContext(route);
    if (!ctx || !ctx.station) return;

    stationView.dataset.siEnhanced = 'true';
    const host = stationView.querySelector('.ss-inner') || stationView;

    // 0. Synkronisér Tilbage-knap og Stations-badge med Model B Hovedflade 1..5
    const backBtn = host.querySelector('.ss-back-btn');
    if (backBtn) {
        backBtn.innerHTML = `← Tilbage til Hovedflade ${ctx.flade.num} (${ctx.flade.shortTitle.replace(/^\d+\.\s*/, '')})`;
        backBtn.onclick = () => navigateByHash(ctx.flade.route);
    }
    const stationBadge = host.querySelector('.ss-station-badge');
    if (stationBadge) {
        stationBadge.textContent = `Hovedflade ${ctx.flade.num} • Station ${ctx.station.num}: ${ctx.station.short}`;
    }

    // 1. Indsæt Global Hovedflade- & Stations-navigation lige under .ss-top-bar
    const topBar = host.querySelector('.ss-top-bar');
    const globalNav = renderSansningGlobalNav(ctx.flade.id, navigateByHash, ctx.station.route);
    if (topBar && topBar.parentNode) {
        topBar.parentNode.insertBefore(globalNav, topBar.nextSibling);
    } else {
        host.prepend(globalNav);
    }

    // 2. Indsæt Taktilt Grounding-Laboratorium for netop denne station lige over fanerne (.ss-tabs-nav)
    const tabsNav = host.querySelector('.ss-tabs-nav');
    const tactileLab = renderSansningTactileLab(ctx.flade.id, navigateByHash, ctx.stationIdx, true);
    if (tabsNav && tabsNav.parentNode) {
        tabsNav.parentNode.insertBefore(tactileLab, tabsNav);
    } else {
        host.appendChild(tactileLab);
    }

    // 3. Indsæt Footer-bro nederst
    const footerBridge = renderSansningFooterBridge(ctx.flade.id, navigateByHash, ctx.station.route);
    host.appendChild(footerBridge);
}

if (typeof window !== 'undefined' && typeof MutationObserver !== 'undefined') {
    const obs = new MutationObserver(() => {
        enhanceStationViewIfNeeded();
    });
    if (document.body) {
        obs.observe(document.body, { childList: true, subtree: true });
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            obs.observe(document.body, { childList: true, subtree: true });
        });
    }
}
