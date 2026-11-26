/**
 * KlodsHansVisualSentence1Lab.js
 *
 * Visuel klik-ramme til Sætning 1 i H.C. Andersens "Klods-Hans" (Scene 1: På bondegården):
 * »Ude på landet var der en gammel gård, og i den var der en gammel far, som havde tre sønner, der var så kloge.«
 *
 * Design:
 * - Hybrid-princip: Konkrete indholdsord vises med separate eventyr-billeder;
 *   tid, reference, relation og grad får et ordløst diagram-lag oven på billedet.
 * - Ingen emojis, ingen oplæsning, ingen meta-forklaringer, ingen bund-opgaver.
 * - Kun stramme monokrome SVG-ikoner og rene kontrast-billeder.
 */

// ============================================================================
// MONOKROME SVG-IKONER (Stram, redaktionel stil — nul emojis)
// ============================================================================
const ICON_EYE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
const ICON_CLOSE = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const ICON_NOT_EQUAL = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><line x1="5" y1="9" x2="19" y2="9"/><line x1="5" y1="15" x2="19" y2="15"/><line x1="17" y1="4" x2="7" y2="20"/></svg>`;
const ICON_DOT_SOLID = `<svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><circle cx="6" cy="6" r="5"/></svg>`;
const ICON_DOT_RING = `<svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="6" cy="6" r="4.5"/></svg>`;
const ICON_REF_LOOP = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>`;
const ICON_CLOCK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 8.5 14"/></svg>`;
const ICON_LINK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="3"/><circle cx="19" cy="6" r="2.5"/><circle cx="19" cy="12" r="2.5"/><circle cx="19" cy="18" r="2.5"/><line x1="8" y1="11" x2="16.5" y2="6.5"/><line x1="8" y1="12" x2="16.5" y2="12"/><line x1="8" y1="13" x2="16.5" y2="17.5"/></svg>`;
const ICON_BARS = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" y1="20" x2="6" y2="14"/><line x1="12" y1="20" x2="12" y2="9"/><line x1="18" y1="20" x2="18" y2="4"/></svg>`;
const ICON_HOME = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/></svg>`;
const ICON_LANDSCAPE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18c4-5 7-5 11-1 2.5-2.5 4.5-2.5 7 1"/><circle cx="17.5" cy="7.5" r="2.5"/></svg>`;
const ICON_PERSON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>`;
const ICON_CROWN = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18h18l-2-10-4.5 4L12 5l-2.5 7L5 8l-2 10Z"/></svg>`;
const ICON_SPEECH = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"/></svg>`;
const ICON_CALENDAR = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>`;
const ICON_SEARCH = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.2" y2="16.2"/></svg>`;
const ICON_TROPHY = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v6a5 5 0 0 1-10 0V4Z"/></svg>`;

// ============================================================================
// VISUELLE KORT FOR SÆTNING 1
// ============================================================================
export const SENTENCE_1_VISUAL_NODES = [
    {
        id: 'ude_paa_landet',
        icon: ICON_LANDSCAPE,
        chipLabel: 'Ude på landet',
        matchTokens: ['ude', 'på', 'landet', 'land'],
        leftTitle: 'Ude på landet',
        leftImg: 'assets/klods_hans_s1/ude_landet.jpg',
        rightTitle: 'Inde i byen',
        rightImg: 'assets/klods_hans_s1/inde_byen.jpg',
        vrimmelSpot: { x: 22, y: 26, radius: 14, label: 'Ude på landet' }
    },
    {
        id: 'var_der',
        icon: ICON_CLOCK,
        chipLabel: 'var der',
        matchTokens: ['var', 'der', 'være'],
        leftTitle: 'var der (dengang)',
        leftImg: 'assets/klods_hans_s1/var_der_dengang.jpg',
        rightTitle: 'ingen (0)',
        rightImg: 'assets/klods_hans_s1/var_der_tom.jpg',
        vrimmelSpot: { x: 80, y: 28, radius: 14, label: 'var der' }
    },
    {
        id: 'gammel_gaard',
        icon: ICON_HOME,
        chipLabel: 'en gammel gård',
        matchTokens: ['gammel_1'],
        leftTitle: 'Gammel (gård)',
        leftImg: 'assets/klods_hans_s1/gammel_gaard.jpg',
        rightTitle: 'Ny (bygning)',
        rightImg: 'assets/klods_hans_s1/ny_gaard.jpg',
        vrimmelSpot: { x: 80, y: 28, radius: 14, label: 'Gammel gård' }
    },
    {
        id: 'gaard',
        icon: ICON_HOME,
        chipLabel: 'en gård',
        matchTokens: ['gård', 'en_1'],
        leftTitle: 'En gård',
        leftImg: 'assets/klods_hans_s1/en_gaard.jpg',
        rightTitle: 'Et slot',
        rightImg: 'assets/klods_hans_s1/et_slot.jpg',
        vrimmelSpot: { x: 80, y: 28, radius: 14, label: 'En gård' }
    },
    {
        id: 'i_den',
        icon: ICON_REF_LOOP,
        chipLabel: 'og i den',
        matchTokens: ['og', 'i', 'den'],
        leftTitle: 'i den (i gården)',
        leftImg: 'assets/klods_hans_s1/i_den.jpg',
        rightTitle: 'uden for den',
        rightImg: 'assets/klods_hans_s1/uden_for_den.jpg',
        vrimmelSpot: { x: 80, y: 28, radius: 15, label: 'den = gården' }
    },
    {
        id: 'gammel_far',
        icon: ICON_PERSON,
        chipLabel: 'en gammel far',
        matchTokens: ['gammel_2'],
        leftTitle: 'Gammel (person)',
        leftImg: 'assets/klods_hans_s1/gammel_far.jpg',
        rightTitle: 'Ung (person)',
        rightImg: 'assets/klods_hans_s1/ung_mand.jpg',
        vrimmelSpot: { x: 88, y: 58, radius: 13, label: 'Gammel far' }
    },
    {
        id: 'far_havde_soenner',
        icon: ICON_LINK,
        chipLabel: 'far, som havde tre sønner',
        matchTokens: ['far', 'som', 'havde', 'have', 'tre', 'sønner', 'søn'],
        leftTitle: 'Havde 3 sønner',
        leftImg: 'assets/klods_hans_s1/far_tre_soenner.jpg',
        rightTitle: 'Alene (0)',
        rightImg: 'assets/klods_hans_s1/far_alene.jpg',
        vrimmelSpot: {
            x: 88,
            y: 58,
            radius: 12,
            label: 'Far',
            multiTargets: [
                { x: 38, y: 48, label: '1. søn' },
                { x: 52, y: 46, label: '2. søn' },
                { x: 70, y: 60, label: '3. søn' }
            ]
        }
    },
    {
        id: 'der_var_saa_kloge',
        icon: ICON_BARS,
        chipLabel: 'der var så kloge',
        matchTokens: ['der_rel', 'så', 'kloge', 'klog'],
        leftTitle: 'Så kloge',
        leftImg: 'assets/klods_hans_s1/saa_kloge.jpg',
        rightTitle: 'Ikke klog',
        rightImg: 'assets/klods_hans_s1/ikke_klog.jpg',
        vrimmelSpot: {
            x: 38,
            y: 38,
            radius: 13,
            label: 'Så kloge',
            multiTargets: [
                { x: 52, y: 40, label: '2. søn' },
                { x: 70, y: 55, label: '3. søn' }
            ]
        }
    },
    {
        id: 'storebror',
        icon: ICON_LINK,
        chipLabel: 'storebror',
        matchTokens: ['storebror', 'storebroren'],
        leftTitle: 'Storebror (ældst)',
        leftDiagramType: 'family_top',
        rightTitle: 'Yngre brødre',
        rightDiagramType: 'family_not_top',
        vrimmelSpot: { x: 38, y: 46, radius: 13, label: 'Storebror' }
    },
    {
        id: 'mellembror',
        icon: ICON_LINK,
        chipLabel: 'mellembror',
        matchTokens: ['mellembror', 'mellembroren'],
        leftTitle: 'Mellembror (i midten)',
        leftDiagramType: 'family_middle',
        rightTitle: 'Ældst / yngst',
        rightDiagramType: 'family_not_middle',
        vrimmelSpot: { x: 52, y: 46, radius: 13, label: 'Mellembror' }
    },
    // --- SÆTNING 2 (Del 1): En dag fortalte den gamle far dem: »Kongen har sagt, at hans datter skal finde en mand. Den, som taler bedst, vinder hende.« ---
    {
        id: 'en_dag',
        icon: ICON_CALENDAR,
        chipLabel: 'En dag',
        matchTokens: ['dag', 'en'],
        leftTitle: 'En dag (én bestemt dag)',
        leftDiagramType: 's2_one_day',
        rightTitle: 'Alle dage',
        rightDiagramType: 's2_all_days'
    },
    {
        id: 'fortalte_dem',
        icon: ICON_SPEECH,
        chipLabel: 'fortalte dem',
        matchTokens: ['fortalte', 'fortælle', 'dem', 'de'],
        leftTitle: 'Fortalte dem',
        leftImg: 'assets/klods_hans_s1/far_tre_soenner.jpg',
        rightTitle: 'Tavs / alene',
        rightImg: 'assets/klods_hans_s1/far_alene.jpg',
        vrimmelSpot: { x: 88, y: 58, radius: 13, label: 'Far fortæller' }
    },
    {
        id: 'kongen',
        icon: ICON_CROWN,
        chipLabel: 'Kongen',
        matchTokens: ['kongen', 'konge'],
        leftTitle: 'Kongen',
        leftImg: 'assets/klods_hans_s1/kongen.jpg',
        rightTitle: 'En bonde',
        rightImg: 'assets/klods_hans_s1/gammel_far.jpg'
    },
    {
        id: 'har_sagt',
        icon: ICON_CLOCK,
        chipLabel: 'har sagt, at ...',
        matchTokens: ['har sagt', 'sige', 'sagt', 'har', 'at'],
        leftTitle: 'Har sagt (gælder stadig nu)',
        leftDiagramType: 's2_har_sagt',
        rightTitle: 'Tavs / ingen besked',
        rightDiagramType: 's2_ikke_sagt'
    },
    {
        id: 'hans_datter',
        icon: ICON_REF_LOOP,
        chipLabel: 'hans datter',
        matchTokens: ['hans', 'datter'],
        leftTitle: 'Hans datter (kongens)',
        leftImg: 'assets/klods_hans_s1/prinsessen.jpg',
        rightTitle: 'Sønner',
        rightImg: 'assets/klods_hans_s1/far_tre_soenner.jpg'
    },
    {
        id: 'skal_finde_mand',
        icon: ICON_SEARCH,
        chipLabel: 'skal finde en mand',
        matchTokens: ['skal', 'skulle', 'skal finde', 'finde', 'mand'],
        leftTitle: 'Skal finde en mand',
        leftDiagramType: 's2_finde_mand',
        rightTitle: 'Blive alene',
        rightDiagramType: 's2_blive_alene'
    },
    {
        id: 'taler_bedst',
        icon: ICON_BARS,
        chipLabel: 'Den, som taler bedst',
        matchTokens: ['den', 'som', 'taler', 'tale', 'bedst', 'god'],
        leftTitle: 'Taler bedst (nr. 1)',
        leftDiagramType: 's2_taler_bedst',
        rightTitle: 'Taler dårligst',
        rightDiagramType: 's2_taler_daarligst'
    },
    {
        id: 'vinder_hende',
        icon: ICON_TROPHY,
        chipLabel: 'vinder hende',
        matchTokens: ['vinder', 'vinde', 'hende', 'hun'],
        leftTitle: 'Vinder hende (datteren)',
        leftImg: 'assets/klods_hans_s1/prinsessen.jpg',
        rightTitle: 'Taber (0)',
        rightDiagramType: 's2_taber'
    },
    // --- SÆTNING 3 (Del 1, linje 2): Jeg tager til slottet, sagde storebror stolt. Jeg kan tale om store og komplicerede ting. Jeg er meget klog! ---
    {
        id: 'tager_til_slottet',
        icon: ICON_CROWN,
        chipLabel: 'tager til slottet',
        matchTokens: ['jeg', 'tager', 'tage', 'til', 'slottet', 'slot'],
        leftTitle: 'Tager til slottet',
        leftImg: 'assets/klods_hans_s1/et_slot.jpg',
        vrimmelSpot: { x: 59, y: 28, radius: 13, label: 'Slottet' }
    },
    {
        id: 'sagde_stolt',
        icon: ICON_SPEECH,
        chipLabel: 'sagde ... stolt',
        matchTokens: ['sagde', 'sige', 'stolt'],
        leftTitle: 'Sagde stolt',
        leftDiagramType: 's3_stolt',
        rightTitle: 'Genert / stille',
        rightDiagramType: 's3_genert',
        vrimmelSpot: { x: 38, y: 46, radius: 13, label: 'Storebror' }
    },
    {
        id: 'kan_tale',
        icon: ICON_SPEECH,
        chipLabel: 'kan tale om',
        matchTokens: ['kan tale', 'tale', 'kan', 'om'],
        leftTitle: 'Kan tale om (evne)',
        leftDiagramType: 's3_kan_tale',
        rightTitle: 'Tavs / kan ikke',
        rightDiagramType: 's2_ikke_sagt',
        vrimmelSpot: { x: 38, y: 46, radius: 13, label: 'Storebror taler' }
    },
    {
        id: 'store_komplicerede',
        icon: ICON_BARS,
        chipLabel: 'store og komplicerede',
        matchTokens: ['store', 'stor', 'og', 'komplicerede', 'kompliceret', 'ting'],
        leftTitle: 'Store & komplicerede',
        leftDiagramType: 's3_kompliceret',
        rightTitle: 'Lille & enkelt',
        rightDiagramType: 's3_enkelt'
    },
    {
        id: 'meget_klog',
        icon: ICON_BARS,
        chipLabel: 'meget klog',
        matchTokens: ['er', 'være', 'meget', 'klog'],
        leftTitle: 'Meget klog',
        leftImg: 'assets/klods_hans_s1/saa_kloge.jpg',
        rightTitle: 'Ikke klog',
        rightImg: 'assets/klods_hans_s1/ikke_klog.jpg',
        vrimmelSpot: { x: 38, y: 38, radius: 13, label: 'Meget klog' }
    },
    // --- SÆTNING 4 (Del 1, linje 3): Da trådte mellembror frem og smilede: Og jeg vil også gå! Jeg kender mange sange. Ja, jeg er altid glad og god til at synge! ---
    {
        id: 'traadte_frem',
        icon: ICON_PERSON,
        chipLabel: 'trådte frem',
        matchTokens: ['da', 'trådte', 'træde', 'frem'],
        leftTitle: 'Trådte frem',
        leftDiagramType: 's4_frem',
        rightTitle: 'Trådte tilbage',
        rightDiagramType: 's4_tilbage',
        vrimmelSpot: { x: 46, y: 44, radius: 13, label: 'Mellembror' }
    },
    {
        id: 'glad_smilede',
        icon: ICON_PERSON,
        chipLabel: 'smilede / glad',
        matchTokens: ['smilede', 'smile', 'glad'],
        leftTitle: 'Glad & smilende',
        leftDiagramType: 's4_glad',
        rightTitle: 'Ked af det',
        rightDiagramType: 's4_ked',
        vrimmelSpot: { x: 46, y: 44, radius: 13, label: 'Smiler' }
    },
    {
        id: 'vil_ogsaa_gaa',
        icon: ICON_LINK,
        chipLabel: 'vil også gå',
        matchTokens: ['og', 'jeg', 'vil', 'ville', 'også', 'ogsaa', 'gå'],
        leftTitle: 'Vil også gå (+1)',
        leftDiagramType: 's4_ogsaa',
        rightTitle: 'Kun én går',
        rightDiagramType: 's4_kun_en',
        vrimmelSpot: { x: 46, y: 44, radius: 13, label: 'Mellembror vil også' }
    },
    {
        id: 'mange_sange',
        icon: ICON_BARS,
        chipLabel: 'sange / at synge',
        matchTokens: ['kender', 'kende', 'mange', 'sange', 'sang', 'synge'],
        leftTitle: 'Synger sange',
        leftImg: 'assets/klods_hans_s1/synger_sange.jpg',
        rightTitle: 'Ingen sange (0)',
        rightDiagramType: 's4_ingen_sange',
        vrimmelSpot: { x: 46, y: 44, radius: 13, label: 'Synger' }
    },
    {
        id: 'altid',
        icon: ICON_CALENDAR,
        chipLabel: 'altid',
        matchTokens: ['altid'],
        leftTitle: 'Altid (100 %)',
        leftDiagramType: 's2_all_days',
        rightTitle: 'Aldrig (0 %)',
        rightDiagramType: 's4_aldrig'
    },
    {
        id: 'god_til',
        icon: ICON_TROPHY,
        chipLabel: 'god til at synge',
        matchTokens: ['er', 'være', 'god', 'til', 'at', 'synge'],
        leftTitle: 'God til (rammer plet)',
        leftDiagramType: 's4_god_til',
        rightTitle: 'Ikke god til',
        rightDiagramType: 's4_svaer'
    },
    // --- SÆTNING 5 (Del 1, linje 4): Jeg prøver også! råbte Klods-Hans. Jeg har ingen hest, men jeg tager min ged! ---
    {
        id: 'proever_ogsaa',
        icon: ICON_TROPHY,
        chipLabel: 'prøver også',
        matchTokens: ['prøver', 'prøve', 'også', 'ogsaa'],
        leftTitle: 'Prøver (tør forsøge)',
        leftDiagramType: 's5_proever',
        rightTitle: 'Giver op (0)',
        rightDiagramType: 's5_giver_op',
        vrimmelSpot: { x: 68, y: 48, radius: 13, label: 'Klods-Hans prøver' }
    },
    {
        id: 'raabte',
        icon: ICON_SPEECH,
        chipLabel: 'råbte',
        matchTokens: ['råbte', 'råbe'],
        leftTitle: 'Råbte (højt!)',
        leftDiagramType: 's5_raabte',
        rightTitle: 'Hviskede (stille)',
        rightDiagramType: 's5_hviskede',
        vrimmelSpot: { x: 68, y: 48, radius: 13, label: 'Klods-Hans råber' }
    },
    {
        id: 'klods_hans_yngst',
        icon: ICON_PERSON,
        chipLabel: 'Klods-Hans',
        matchTokens: ['klods-hans'],
        leftTitle: 'Klods-Hans (yngst)',
        leftImg: 'assets/klods_hans_s1/klods_hans.jpg',
        rightTitle: 'De fine brødre',
        rightImg: 'assets/klods_hans_s1/hest.jpg',
        vrimmelSpot: { x: 68, y: 48, radius: 13, label: 'Klods-Hans' }
    },
    {
        id: 'hest_vs_ged',
        icon: ICON_REF_LOOP,
        chipLabel: 'ingen hest, men min ged',
        matchTokens: ['jeg', 'har', 'have', 'ingen', 'hest', 'men', 'tager', 'tage', 'min', 'ged'],
        leftTitle: 'Min ged (har)',
        leftImg: 'assets/klods_hans_s1/ged.jpg',
        rightTitle: 'Ingen hest (0)',
        rightImg: 'assets/klods_hans_s1/hest.jpg',
        vrimmelSpot: { x: 72, y: 66, radius: 14, label: 'Geden' }
    },
    // --- SÆTNING 6 (Del 1, linje 5): Faren rystede på hovedet og svarede: Tag du bare geden, Klods-Hans. ---
    {
        id: 'rystede_paa_hovedet',
        icon: ICON_PERSON,
        chipLabel: 'rystede på hovedet',
        matchTokens: ['rystede', 'ryste', 'på', 'hovedet', 'hoved'],
        leftTitle: 'Rystede på hovedet (nej / tvivl)',
        leftDiagramType: 's6_ryste_hoved',
        rightTitle: 'Nikkede (ja / enig)',
        rightDiagramType: 's6_nikke',
        vrimmelSpot: { x: 88, y: 58, radius: 13, label: 'Faren' }
    },
    {
        id: 'svarede',
        icon: ICON_SPEECH,
        chipLabel: 'svarede',
        matchTokens: ['svarede', 'svare', 'og'],
        leftTitle: 'Svarede (retur)',
        leftDiagramType: 's6_svarede',
        rightTitle: 'Tavs (intet svar)',
        rightDiagramType: 's2_ikke_sagt',
        vrimmelSpot: { x: 88, y: 58, radius: 13, label: 'Faren svarer' }
    },
    {
        id: 'tag_du_bare',
        icon: ICON_LINK,
        chipLabel: 'Tag du bare',
        matchTokens: ['tag', 'tage', 'du', 'bare', 'geden'],
        leftTitle: 'Tag du bare (tilladelse)',
        leftDiagramType: 's6_tilladelse',
        rightTitle: 'Nej / forbudt',
        rightDiagramType: 's6_forbud',
        vrimmelSpot: { x: 72, y: 66, radius: 14, label: 'Tag geden' }
    }
];

export function findSentence2NodeByToken(token) {
    if (!token) return null;
    const rawText = (token.text || '').toLowerCase().trim();
    const rawKey = (token.key || '').toLowerCase().trim();

    if (rawText === 'gamle' || rawText === 'far' || rawKey === 'gammel' || rawKey === 'far') {
        return SENTENCE_1_VISUAL_NODES.find(n => n.id === 'gammel_far') || null;
    }

    const s2Ids = ['en_dag', 'fortalte_dem', 'kongen', 'har_sagt', 'hans_datter', 'skal_finde_mand', 'taler_bedst', 'vinder_hende'];
    for (const id of s2Ids) {
        const node = SENTENCE_1_VISUAL_NODES.find(n => n.id === id);
        if (node && (node.matchTokens.includes(rawText) || node.matchTokens.includes(rawKey))) {
            return node;
        }
    }
    return null;
}

export function findDel1VisualNodeByToken(lineIndex, token) {
    if (!token) return null;
    if (lineIndex === 1) return findSentence2NodeByToken(token);
    const rawText = (token.text || '').toLowerCase().trim();
    const rawKey = (token.key || '').toLowerCase().trim();

    const lineNodeMap = {
        2: ['storebror', 'tager_til_slottet', 'sagde_stolt', 'kan_tale', 'store_komplicerede', 'meget_klog'],
        3: ['mellembror', 'traadte_frem', 'glad_smilede', 'vil_ogsaa_gaa', 'mange_sange', 'altid', 'god_til'],
        4: ['klods_hans_yngst', 'proever_ogsaa', 'raabte', 'hest_vs_ged'],
        5: ['gammel_far', 'rystede_paa_hovedet', 'svarede', 'tag_du_bare', 'klods_hans_yngst']
    };
    const ids = lineNodeMap[lineIndex];
    if (!ids) return null;

    if (lineIndex === 5 && (rawText === 'faren' || rawKey === 'far')) {
        return SENTENCE_1_VISUAL_NODES.find(n => n.id === 'gammel_far') || null;
    }

    for (const id of ids) {
        const node = SENTENCE_1_VISUAL_NODES.find(n => n.id === id);
        if (node && (node.matchTokens.includes(rawText) || node.matchTokens.includes(rawKey))) {
            return node;
        }
    }
    return null;
}

export function findVisualNodeForBrotherToken(token) {
    if (!token) return null;
    const rawText = (token.text || '').toLowerCase().trim();
    const rawKey = (token.key || '').toLowerCase().trim();
    if (rawText === 'storebror' || rawKey === 'storebror') {
        return SENTENCE_1_VISUAL_NODES.find(n => n.id === 'storebror') || null;
    }
    if (rawText === 'mellembror' || rawKey === 'mellembror') {
        return SENTENCE_1_VISUAL_NODES.find(n => n.id === 'mellembror') || null;
    }
    return null;
}

function renderCustomDiagram(variant) {
    // 1. Familietræ (storebror / mellembror)
    if (variant.startsWith('family_')) {
        return renderFamilyTreeDiagram(variant);
    }

    // 2. Sætning 2 ordløse universelle diagrammer
    switch (variant) {
        case 's2_one_day':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <g fill="rgba(51,65,85,0.45)" stroke="#475569" stroke-width="2">
                        <rect x="20" y="54" width="26" height="42" rx="5"/>
                        <rect x="54" y="54" width="26" height="42" rx="5"/>
                        <rect x="88" y="54" width="26" height="42" rx="5"/>
                        <rect x="156" y="54" width="26" height="42" rx="5"/>
                        <rect x="190" y="54" width="26" height="42" rx="5"/>
                    </g>
                    <rect x="122" y="42" width="26" height="66" rx="6" fill="#fde047" stroke="#38bdf8" stroke-width="2.5"/>
                    <circle cx="135" cy="24" r="6" fill="#fde047"/>
                </svg>
            `;
        case 's2_all_days':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <g fill="rgba(251,146,60,0.45)" stroke="#fb923c" stroke-width="2">
                        <rect x="20" y="54" width="26" height="42" rx="5"/>
                        <rect x="54" y="54" width="26" height="42" rx="5"/>
                        <rect x="88" y="54" width="26" height="42" rx="5"/>
                        <rect x="122" y="54" width="26" height="42" rx="5"/>
                        <rect x="156" y="54" width="26" height="42" rx="5"/>
                        <rect x="190" y="54" width="26" height="42" rx="5"/>
                    </g>
                </svg>
            `;
        case 's2_har_sagt':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <!-- Konge-krone ved fortidspunkt + lydbølger -->
                    <polygon points="48,54 53,42 64,50 75,42 80,54" fill="#fde047"/>
                    <path d="M 92 40 Q 104 52 92 64" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                    <path d="M 102 33 Q 118 52 102 71" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
                    <!-- Perfektum-tidslinje: før → gælder stadig NU -->
                    <line x1="22" y1="112" x2="216" y2="112" stroke="#475569" stroke-width="3"/>
                    <line x1="64" y1="112" x2="180" y2="112" stroke="#fde047" stroke-width="4"/>
                    <polygon points="178,105 192,112 178,119" fill="#fde047"/>
                    <circle cx="64" cy="112" r="8" fill="#fde047"/>
                    <line x1="192" y1="92" x2="192" y2="132" stroke="#38bdf8" stroke-width="3"/>
                    <circle cx="192" cy="112" r="7" fill="#38bdf8"/>
                </svg>
            `;
        case 's2_ikke_sagt':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="120" cy="64" r="24" fill="none" stroke="#fb923c" stroke-width="3" stroke-dasharray="5,4"/>
                    <line x1="102" y1="82" x2="138" y2="46" stroke="#fb923c" stroke-width="3.5"/>
                    <line x1="22" y1="116" x2="216" y2="116" stroke="#475569" stroke-width="2.5" stroke-dasharray="5,5"/>
                </svg>
            `;
        case 's2_finde_mand':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <!-- Prinsesse-node til venstre + fremtidspil mod mål (par) -->
                    <circle cx="52" cy="75" r="18" fill="rgba(244,114,182,0.25)" stroke="#f472b6" stroke-width="3"/>
                    <line x1="76" y1="75" x2="142" y2="75" stroke="#fde047" stroke-width="3.5" stroke-dasharray="6,4"/>
                    <polygon points="140,68 154,75 140,82" fill="#fde047"/>
                    <!-- Mål: Par (to sammenkoblede cirkler) -->
                    <circle cx="176" cy="75" r="16" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" stroke-width="3"/>
                    <circle cx="198" cy="75" r="16" fill="rgba(253,224,71,0.25)" stroke="#fde047" stroke-width="3"/>
                </svg>
            `;
        case 's2_blive_alene':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="80" cy="75" r="18" fill="rgba(148,163,184,0.2)" stroke="#94a3b8" stroke-width="2.5"/>
                    <circle cx="164" cy="75" r="20" fill="none" stroke="#fb923c" stroke-width="2.5" stroke-dasharray="5,4"/>
                    <line x1="148" y1="91" x2="180" y2="59" stroke="#fb923c" stroke-width="3"/>
                </svg>
            `;
        case 's2_taler_bedst':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <!-- 3 stigende søjler (god → bedre → BEDST) -->
                    <rect x="36" y="96" width="32" height="34" rx="4" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
                    <rect x="82" y="72" width="32" height="58" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
                    <rect x="128" y="42" width="36" height="88" rx="5" fill="#ca8a04" stroke="#fde047" stroke-width="3"/>
                    <!-- Krone over den højeste søjle -->
                    <polygon points="134,34 138,22 146,30 154,22 158,34" fill="#fde047"/>
                    <!-- Talebølger ud fra nr. 1 -->
                    <path d="M 176 58 Q 190 74 176 90" fill="none" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
                    <path d="M 188 48 Q 208 74 188 100" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
            `;
        case 's2_taler_daarligst':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <rect x="44" y="108" width="34" height="22" rx="4" fill="rgba(251,146,60,0.45)" stroke="#fb923c" stroke-width="2"/>
                    <rect x="92" y="42" width="34" height="88" rx="5" fill="none" stroke="#475569" stroke-width="2" stroke-dasharray="4,4"/>
                    <line x1="158" y1="62" x2="188" y2="92" stroke="#fb923c" stroke-width="3.5" stroke-linecap="round"/>
                    <line x1="188" y1="62" x2="158" y2="92" stroke="#fb923c" stroke-width="3.5" stroke-linecap="round"/>
                </svg>
            `;
        case 's2_taber':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="120" cy="75" r="32" fill="none" stroke="#fb923c" stroke-width="3" stroke-dasharray="6,4"/>
                    <line x1="100" y1="55" x2="140" y2="95" stroke="#fb923c" stroke-width="3.5" stroke-linecap="round"/>
                    <line x1="140" y1="55" x2="100" y2="95" stroke="#fb923c" stroke-width="3.5" stroke-linecap="round"/>
                </svg>
            `;
        // --- SÆTNING 3 (Linje 2) ---
        case 's3_stolt':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <circle cx="105" cy="54" r="16" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" stroke-width="3"/>
                    <path d="M 80 124 Q 105 84 130 124" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="3"/>
                    <polygon points="92,32 97,20 105,28 113,20 118,32" fill="#fde047"/>
                    <line x1="142" y1="74" x2="142" y2="34" stroke="#fde047" stroke-width="3.5" stroke-linecap="round"/>
                    <polygon points="135,38 142,24 149,38" fill="#fde047"/>
                    <path d="M 164 46 Q 178 62 164 78" fill="none" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
                    <path d="M 176 38 Q 196 62 176 86" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
            `;
        case 's3_genert':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="115" cy="82" r="14" fill="rgba(148,163,184,0.18)" stroke="#94a3b8" stroke-width="2.5"/>
                    <path d="M 96 126 Q 115 104 134 126" fill="none" stroke="#94a3b8" stroke-width="2.5"/>
                    <line x1="154" y1="54" x2="154" y2="94" stroke="#fb923c" stroke-width="3" stroke-linecap="round"/>
                    <polygon points="147,90 154,104 161,90" fill="#fb923c"/>
                </svg>
            `;
        case 's3_kan_tale':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <circle cx="58" cy="76" r="18" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" stroke-width="3"/>
                    <path d="M 88 58 Q 102 76 88 94" fill="none" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
                    <path d="M 100 46 Q 120 76 100 106" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="154" cy="52" r="13" fill="rgba(253,224,71,0.2)" stroke="#fde047" stroke-width="2.5"/>
                    <circle cx="188" cy="82" r="16" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" stroke-width="2.5"/>
                    <circle cx="150" cy="104" r="11" fill="rgba(43,110,120,0.4)" stroke="#7ec4ce" stroke-width="2.5"/>
                </svg>
            `;
        case 's3_kompliceret':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <g stroke="#38bdf8" stroke-width="2.2" opacity="0.85">
                        <line x1="56" y1="42" x2="120" y2="34"/><line x1="120" y1="34" x2="184" y2="50"/>
                        <line x1="56" y1="42" x2="88" y2="88"/><line x1="120" y1="34" x2="152" y2="84"/>
                        <line x1="184" y1="50" x2="152" y2="84"/><line x1="88" y1="88" x2="152" y2="84"/>
                        <line x1="88" y1="88" x2="62" y2="120"/><line x1="152" y1="84" x2="182" y2="118"/>
                        <line x1="62" y1="120" x2="124" y2="116"/><line x1="124" y1="116" x2="182" y2="118"/>
                        <line x1="56" y1="42" x2="152" y2="84"/><line x1="120" y1="34" x2="88" y2="88"/>
                    </g>
                    <g fill="#fde047" stroke="#0b1326" stroke-width="2">
                        <circle cx="56" cy="42" r="9"/><circle cx="120" cy="34" r="11"/><circle cx="184" cy="50" r="9"/>
                        <circle cx="88" cy="88" r="10"/><circle cx="152" cy="84" r="11"/>
                        <circle cx="62" cy="120" r="8"/><circle cx="124" cy="116" r="9"/><circle cx="182" cy="118" r="8"/>
                    </g>
                </svg>
            `;
        case 's3_enkelt':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <line x1="70" y1="75" x2="170" y2="75" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="70" cy="75" r="9" fill="#fb923c"/>
                    <circle cx="170" cy="75" r="9" fill="#fb923c"/>
                </svg>
            `;
        // --- SÆTNING 4 (Linje 3) ---
        case 's4_frem':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <circle cx="52" cy="54" r="11" fill="rgba(148,163,184,0.22)" stroke="#64748b" stroke-width="2"/>
                    <circle cx="52" cy="96" r="11" fill="rgba(148,163,184,0.22)" stroke="#64748b" stroke-width="2"/>
                    <line x1="78" y1="75" x2="152" y2="75" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                    <polygon points="150,67 166,75 150,83" fill="#fde047"/>
                    <circle cx="186" cy="75" r="16" fill="#fde047" stroke="#38bdf8" stroke-width="3"/>
                </svg>
            `;
        case 's4_tilbage':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="58" cy="75" r="15" fill="rgba(251,146,60,0.3)" stroke="#fb923c" stroke-width="2.5"/>
                    <line x1="164" y1="75" x2="90" y2="75" stroke="#fb923c" stroke-width="3.5" stroke-dasharray="5,4"/>
                    <polygon points="92,67 76,75 92,83" fill="#fb923c"/>
                    <circle cx="182" cy="75" r="13" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>
                </svg>
            `;
        case 's4_glad':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <circle cx="120" cy="75" r="42" fill="rgba(253,224,71,0.14)" stroke="#fde047" stroke-width="3.5"/>
                    <circle cx="104" cy="64" r="4.5" fill="#fde047"/>
                    <circle cx="136" cy="64" r="4.5" fill="#fde047"/>
                    <path d="M 98 84 Q 120 106 142 84" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                </svg>
            `;
        case 's4_ked':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="120" cy="75" r="42" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" stroke-width="3"/>
                    <circle cx="104" cy="64" r="4" fill="#94a3b8"/>
                    <circle cx="136" cy="64" r="4" fill="#94a3b8"/>
                    <path d="M 98 98 Q 120 78 142 98" fill="none" stroke="#fb923c" stroke-width="3.5" stroke-linecap="round"/>
                </svg>
            `;
        case 's4_ogsaa':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <circle cx="56" cy="52" r="14" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" stroke-width="2.5"/>
                    <line x1="76" y1="52" x2="170" y2="66" stroke="#38bdf8" stroke-width="3"/>
                    <circle cx="56" cy="100" r="14" fill="#fde047" stroke="#38bdf8" stroke-width="2.5"/>
                    <line x1="76" y1="100" x2="170" y2="82" stroke="#fde047" stroke-width="3.5"/>
                    <polygon points="168,75 184,78 169,88" fill="#fde047"/>
                    <circle cx="196" cy="75" r="14" fill="rgba(253,224,71,0.22)" stroke="#fde047" stroke-width="2.5"/>
                </svg>
            `;
        case 's4_kun_en':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="56" cy="52" r="14" fill="rgba(148,163,184,0.25)" stroke="#94a3b8" stroke-width="2.5"/>
                    <line x1="76" y1="52" x2="174" y2="52" stroke="#94a3b8" stroke-width="3"/>
                    <polygon points="172,46 186,52 172,58" fill="#94a3b8"/>
                    <circle cx="56" cy="104" r="14" fill="none" stroke="#fb923c" stroke-width="2.5" stroke-dasharray="4,3"/>
                    <line x1="82" y1="94" x2="104" y2="114" stroke="#fb923c" stroke-width="3"/>
                    <line x1="104" y1="94" x2="82" y2="114" stroke="#fb923c" stroke-width="3"/>
                </svg>
            `;
        case 's4_mange_sange':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <g stroke="#fde047" stroke-width="3" fill="#fde047">
                        <circle cx="52" cy="96" r="7"/><line x1="59" y1="96" x2="59" y2="52"/>
                        <circle cx="88" cy="88" r="7"/><line x1="95" y1="88" x2="95" y2="44"/>
                        <line x1="59" y1="52" x2="95" y2="44" stroke-width="4.5"/>
                    </g>
                    <g stroke="#38bdf8" stroke-width="3" fill="#38bdf8">
                        <circle cx="136" cy="76" r="7"/><line x1="143" y1="76" x2="143" y2="34"/>
                        <circle cx="176" cy="68" r="7"/><line x1="183" y1="68" x2="183" y2="26"/>
                        <line x1="143" y1="34" x2="183" y2="26" stroke-width="4.5"/>
                    </g>
                    <g stroke="#7ec4ce" stroke-width="2.5" fill="#7ec4ce">
                        <circle cx="146" cy="118" r="6"/><line x1="152" y1="118" x2="152" y2="84"/>
                        <circle cx="192" cy="110" r="6"/><line x1="198" y1="110" x2="198" y2="76"/>
                        <line x1="152" y1="84" x2="198" y2="76" stroke-width="3.5"/>
                    </g>
                </svg>
            `;
        case 's4_ingen_sange':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="114" cy="92" r="9" fill="none" stroke="#64748b" stroke-width="2.5"/>
                    <line x1="123" y1="92" x2="123" y2="48" stroke="#64748b" stroke-width="2.5"/>
                    <line x1="88" y1="108" x2="152" y2="42" stroke="#fb923c" stroke-width="4" stroke-linecap="round"/>
                </svg>
            `;
        case 's4_aldrig':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <g fill="rgba(51,65,85,0.3)" stroke="#475569" stroke-width="2" stroke-dasharray="4,3">
                        <rect x="20" y="54" width="26" height="42" rx="5"/>
                        <rect x="54" y="54" width="26" height="42" rx="5"/>
                        <rect x="88" y="54" width="26" height="42" rx="5"/>
                        <rect x="122" y="54" width="26" height="42" rx="5"/>
                        <rect x="156" y="54" width="26" height="42" rx="5"/>
                        <rect x="190" y="54" width="26" height="42" rx="5"/>
                    </g>
                    <line x1="30" y1="108" x2="210" y2="42" stroke="#fb923c" stroke-width="3.5" stroke-linecap="round"/>
                </svg>
            `;
        case 's4_god_til':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <circle cx="146" cy="75" r="42" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.5"/>
                    <circle cx="146" cy="75" r="25" fill="none" stroke="#38bdf8" stroke-width="3"/>
                    <circle cx="146" cy="75" r="10" fill="#fde047"/>
                    <line x1="36" y1="75" x2="132" y2="75" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                    <polygon points="128,67 144,75 128,83" fill="#fde047"/>
                </svg>
            `;
        case 's4_svaer':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="152" cy="75" r="38" fill="none" stroke="#64748b" stroke-width="2.5" stroke-dasharray="5,4"/>
                    <circle cx="152" cy="75" r="12" fill="none" stroke="#64748b" stroke-width="2"/>
                    <path d="M 34 86 Q 82 96 108 118" fill="none" stroke="#fb923c" stroke-width="3.5" stroke-linecap="round"/>
                    <polygon points="102,122 118,124 110,110" fill="#fb923c"/>
                </svg>
            `;
        // --- SÆTNING 5 (Linje 4) ---
        case 's5_proever':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <circle cx="48" cy="102" r="14" fill="#fde047" stroke="#38bdf8" stroke-width="2.5"/>
                    <rect x="108" y="82" width="14" height="44" rx="4" fill="#475569"/>
                    <path d="M 64 96 Q 115 24 176 62" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                    <polygon points="172,54 188,67 170,70" fill="#fde047"/>
                    <circle cx="196" cy="74" r="13" fill="rgba(56,189,248,0.28)" stroke="#38bdf8" stroke-width="3"/>
                </svg>
            `;
        case 's5_giver_op':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="62" cy="102" r="14" fill="rgba(148,163,184,0.25)" stroke="#94a3b8" stroke-width="2.5"/>
                    <rect x="114" y="42" width="14" height="84" rx="4" fill="#fb923c" opacity="0.65"/>
                    <line x1="78" y1="102" x2="104" y2="102" stroke="#fb923c" stroke-width="3" stroke-dasharray="4,4"/>
                </svg>
            `;
        case 's5_raabte':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <circle cx="62" cy="75" r="20" fill="rgba(253,224,71,0.22)" stroke="#fde047" stroke-width="3.5"/>
                    <path d="M 96 54 Q 114 75 96 96" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                    <path d="M 116 38 Q 144 75 116 112" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                    <path d="M 140 24 Q 178 75 140 126" fill="none" stroke="#7ec4ce" stroke-width="3.5" stroke-linecap="round"/>
                </svg>
            `;
        case 's5_hviskede':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="88" cy="75" r="16" fill="rgba(148,163,184,0.18)" stroke="#94a3b8" stroke-width="2.5"/>
                    <path d="M 116 68 Q 124 75 116 82" fill="none" stroke="#fb923c" stroke-width="2" stroke-dasharray="3,3"/>
                </svg>
            `;
        // --- SÆTNING 6 (Linje 5) ---
        case 's6_ryste_hoved':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <circle cx="120" cy="75" r="28" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="3"/>
                    <line x1="78" y1="75" x2="36" y2="75" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                    <polygon points="40,67 24,75 40,83" fill="#fde047"/>
                    <line x1="162" y1="75" x2="204" y2="75" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                    <polygon points="200,67 216,75 200,83" fill="#fde047"/>
                </svg>
            `;
        case 's6_nikke':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <circle cx="120" cy="75" r="26" fill="rgba(148,163,184,0.18)" stroke="#94a3b8" stroke-width="2.5"/>
                    <line x1="120" y1="40" x2="120" y2="18" stroke="#fb923c" stroke-width="3.5" stroke-linecap="round"/>
                    <polygon points="113,22 120,10 127,22" fill="#fb923c"/>
                    <line x1="120" y1="110" x2="120" y2="132" stroke="#fb923c" stroke-width="3.5" stroke-linecap="round"/>
                    <polygon points="113,128 120,140 127,128" fill="#fb923c"/>
                </svg>
            `;
        case 's6_svarede':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <rect x="26" y="34" width="76" height="40" rx="10" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="2.5"/>
                    <rect x="138" y="76" width="76" height="40" rx="10" fill="rgba(253,224,71,0.22)" stroke="#fde047" stroke-width="3"/>
                    <path d="M 108 54 Q 134 54 146 72" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="4,3"/>
                    <path d="M 132 96 Q 94 96 74 82" fill="none" stroke="#fde047" stroke-width="3.5"/>
                    <polygon points="79,77 65,77 73,88" fill="#fde047"/>
                </svg>
            `;
        case 's6_tilladelse':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#0b1326"/>
                    <line x1="120" y1="26" x2="120" y2="50" stroke="#7ec4ce" stroke-width="5" stroke-linecap="round"/>
                    <line x1="120" y1="100" x2="120" y2="124" stroke="#7ec4ce" stroke-width="5" stroke-linecap="round"/>
                    <line x1="46" y1="75" x2="180" y2="75" stroke="#fde047" stroke-width="4.5" stroke-linecap="round"/>
                    <polygon points="176,66 196,75 176,84" fill="#fde047"/>
                </svg>
            `;
        case 's6_forbud':
            return `
                <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
                    <rect width="240" height="150" rx="9" fill="#18121e"/>
                    <line x1="128" y1="24" x2="128" y2="126" stroke="#fb923c" stroke-width="6" stroke-linecap="round"/>
                    <circle cx="76" cy="75" r="22" fill="none" stroke="#fb923c" stroke-width="3.5"/>
                    <line x1="60" y1="91" x2="92" y2="59" stroke="#fb923c" stroke-width="3.5"/>
                </svg>
            `;
        default:
            return '';
    }
}

function renderFamilyTreeDiagram(variant) {
    // 1 forældre-node til venstre → 3 sønne-prikker lodret til højre (øverst = storebror, midt = mellembror, nederst = yngste)
    const nodes = [
        { y: 34, key: 'top' },
        { y: 75, key: 'middle' },
        { y: 116, key: 'bottom' }
    ];

    const isLit = (key) => {
        if (variant === 'family_top') return key === 'top';
        if (variant === 'family_middle') return key === 'middle';
        if (variant === 'family_not_top') return key !== 'top';
        if (variant === 'family_not_middle') return key !== 'middle';
        return false;
    };

    const isPrimary = variant === 'family_top' || variant === 'family_middle';
    const bg = isPrimary ? '#0b1326' : '#18121e';
    const activeFill = isPrimary ? '#fde047' : '#fb923c';
    const activeGlow = isPrimary ? 'rgba(253, 224, 71, 0.28)' : 'rgba(251, 146, 60, 0.22)';
    const activeStroke = isPrimary ? '#38bdf8' : '#fdba74';

    const branches = nodes.map(n => {
        const lit = isLit(n.key);
        return `<line x1="74" y1="75" x2="156" y2="${n.y}" stroke="${lit ? activeFill : '#334155'}" stroke-width="${lit ? 3.5 : 2}" stroke-dasharray="${lit ? '' : '4,4'}"/>`;
    }).join('');

    const dots = nodes.map(n => {
        const lit = isLit(n.key);
        if (lit) {
            return `
                <circle cx="176" cy="${n.y}" r="22" fill="${activeGlow}"/>
                <circle cx="176" cy="${n.y}" r="14" fill="${activeFill}" stroke="${activeStroke}" stroke-width="2.5"/>
            `;
        }
        return `
            <circle cx="176" cy="${n.y}" r="11" fill="rgba(51,65,85,0.45)" stroke="#475569" stroke-width="2"/>
        `;
    }).join('');

    return `
        <svg viewBox="0 0 240 150" width="100%" style="display:block; aspect-ratio:16/10; border-radius:9px;" aria-hidden="true">
            <rect width="240" height="150" rx="9" fill="${bg}"/>
            <!-- Forældre-node (far) -->
            <circle cx="52" cy="75" r="22" fill="rgba(56,189,248,0.16)" stroke="#94a3b8" stroke-width="2.5"/>
            <circle cx="52" cy="69" r="6.5" fill="#cbd5e1"/>
            <path d="M 41 86 Q 52 77 63 86" fill="none" stroke="#cbd5e1" stroke-width="2.8" stroke-linecap="round"/>
            ${branches}
            ${dots}
        </svg>
    `;
}

export function findSentence1NodeByToken(token, tokenIndex = 0) {
    if (!token) return SENTENCE_1_VISUAL_NODES[0];
    const rawText = (token.text || '').toLowerCase().trim();
    const rawKey = (token.key || '').toLowerCase().trim();

    if (rawText === 'gammel' || rawKey === 'gammel') {
        return tokenIndex <= 9
            ? SENTENCE_1_VISUAL_NODES.find(n => n.id === 'gammel_gaard')
            : SENTENCE_1_VISUAL_NODES.find(n => n.id === 'gammel_far');
    }

    if (rawText === 'der' || rawKey === 'der') {
        if (token.type === 'pro' || tokenIndex >= 20) {
            return SENTENCE_1_VISUAL_NODES.find(n => n.id === 'der_var_saa_kloge');
        }
        return SENTENCE_1_VISUAL_NODES.find(n => n.id === 'var_der');
    }

    if (rawText === 'var' || rawKey === 'være') {
        if (tokenIndex >= 20) {
            return SENTENCE_1_VISUAL_NODES.find(n => n.id === 'der_var_saa_kloge');
        }
        return SENTENCE_1_VISUAL_NODES.find(n => n.id === 'var_der');
    }

    for (const node of SENTENCE_1_VISUAL_NODES) {
        if (node.matchTokens.includes(rawText) || node.matchTokens.includes(rawKey)) {
            return node;
        }
    }
    return SENTENCE_1_VISUAL_NODES[0];
}

// ============================================================================
// ORDLØSE DIAGRAM-LAG TIL GRAMMATISKE / RELATIONELLE ORD
// ============================================================================
const HYBRID_DIAGRAM_IDS = new Set([
    'var_der', 'i_den', 'far_havde_soenner', 'der_var_saa_kloge',
    'fortalte_dem', 'hans_datter', 'vinder_hende',
    'tager_til_slottet', 'hest_vs_ged'
]);

function renderHybridOverlaySvg(nodeId, side) {
    if (!HYBRID_DIAGRAM_IDS.has(nodeId)) return '';
    const isLeft = side === 'left';

    switch (nodeId) {
        case 'var_der':
            return isLeft
                ? `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="0" y="106" width="240" height="44" fill="rgba(6, 11, 25, 0.78)"/>
                        <line x1="20" y1="128" x2="214" y2="128" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
                        <polygon points="212,122 224,128 212,134" fill="#94a3b8"/>
                        <line x1="180" y1="114" x2="180" y2="142" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="3,3"/>
                        <path d="M 174 120 Q 124 96 76 120" fill="none" stroke="#fde047" stroke-width="3"/>
                        <polygon points="80,113 69,122 83,123" fill="#fde047"/>
                        <circle cx="68" cy="128" r="8" fill="#fde047" stroke="#0b1326" stroke-width="2"/>
                        <circle cx="68" cy="128" r="14" fill="none" stroke="#38bdf8" stroke-width="2"/>
                    </svg>
                `
                : `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <circle cx="120" cy="60" r="24" fill="rgba(15,23,42,0.52)" stroke="#fb923c" stroke-width="3" stroke-dasharray="6,4"/>
                        <line x1="102" y1="78" x2="138" y2="42" stroke="#fb923c" stroke-width="3.5"/>
                        <rect x="0" y="106" width="240" height="44" fill="rgba(24, 18, 30, 0.78)"/>
                        <line x1="20" y1="128" x2="214" y2="128" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
                        <polygon points="212,122 224,128 212,134" fill="#94a3b8"/>
                        <circle cx="68" cy="128" r="6" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="3,2"/>
                        <line x1="180" y1="112" x2="180" y2="144" stroke="#fb923c" stroke-width="2.5"/>
                        <circle cx="180" cy="128" r="8" fill="#fb923c"/>
                    </svg>
                `;

        case 'i_den':
            return isLeft
                ? `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="28" y="22" width="124" height="104" rx="10" fill="rgba(56,189,248,0.10)" stroke="#38bdf8" stroke-width="3"/>
                        <circle cx="206" cy="110" r="16" fill="rgba(244,114,182,0.88)" stroke="#ffffff" stroke-width="2.5"/>
                        <circle cx="206" cy="110" r="5" fill="#ffffff"/>
                        <path d="M 202 90 Q 176 22 118 68" fill="none" stroke="#fde047" stroke-width="4.5" stroke-linecap="round"/>
                        <polygon points="126,71 108,76 117,59" fill="#fde047"/>
                    </svg>
                `
                : `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="14" y="22" width="102" height="104" rx="10" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6,4"/>
                        <line x1="122" y1="78" x2="176" y2="78" stroke="#fb923c" stroke-width="4.5" stroke-linecap="round"/>
                        <polygon points="172,70 188,78 172,86" fill="#fb923c"/>
                        <circle cx="206" cy="78" r="14" fill="rgba(251,146,60,0.85)" stroke="#ffffff" stroke-width="2.5"/>
                    </svg>
                `;

        case 'far_havde_soenner':
            return isLeft
                ? `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="0" y="102" width="240" height="48" fill="rgba(6, 15, 28, 0.78)"/>
                        <circle cx="48" cy="126" r="13" fill="#0284c7" stroke="#fde047" stroke-width="2.5"/>
                        <line x1="62" y1="120" x2="132" y2="112" stroke="#4ade80" stroke-width="3"/>
                        <line x1="62" y1="126" x2="132" y2="126" stroke="#4ade80" stroke-width="3"/>
                        <line x1="62" y1="132" x2="132" y2="140" stroke="#4ade80" stroke-width="3"/>
                        <circle cx="144" cy="112" r="6" fill="#4ade80"/>
                        <circle cx="144" cy="126" r="6" fill="#4ade80"/>
                        <circle cx="144" cy="140" r="6" fill="#4ade80"/>
                        <circle cx="186" cy="126" r="5" fill="#fde047"/>
                        <circle cx="202" cy="126" r="5" fill="#fde047"/>
                        <circle cx="218" cy="126" r="5" fill="#fde047"/>
                    </svg>
                `
                : `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="0" y="102" width="240" height="48" fill="rgba(24, 18, 30, 0.78)"/>
                        <circle cx="56" cy="126" r="13" fill="#334155" stroke="#94a3b8" stroke-width="2.5"/>
                        <line x1="74" y1="126" x2="148" y2="126" stroke="#fb923c" stroke-width="3" stroke-dasharray="6,5"/>
                        <circle cx="176" cy="126" r="15" fill="none" stroke="#fb923c" stroke-width="3" stroke-dasharray="5,3"/>
                        <line x1="164" y1="138" x2="188" y2="114" stroke="#fb923c" stroke-width="3"/>
                    </svg>
                `;

        case 'der_var_saa_kloge':
            return isLeft
                ? `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="10" y="72" width="84" height="68" rx="10" fill="rgba(6, 11, 25, 0.82)" stroke="#fde047" stroke-width="2"/>
                        <rect x="20" y="112" width="14" height="20" rx="3" fill="#1e3a5f" stroke="#38bdf8" stroke-width="1.5"/>
                        <rect x="42" y="96" width="14" height="36" rx="3" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
                        <rect x="64" y="80" width="18" height="52" rx="4" fill="#ca8a04" stroke="#fde047" stroke-width="2"/>
                        <path d="M 73 72 L 75 76 L 79 78 L 75 80 L 73 84 L 71 80 L 67 78 L 71 76 Z" fill="#fde047"/>
                    </svg>
                `
                : `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="10" y="72" width="84" height="68" rx="10" fill="rgba(24, 18, 30, 0.82)" stroke="#fb923c" stroke-width="2"/>
                        <rect x="22" y="120" width="18" height="12" rx="3" fill="rgba(251,146,60,0.45)" stroke="#fb923c" stroke-width="1.5"/>
                        <rect x="52" y="80" width="20" height="52" rx="4" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="4,3"/>
                        <line x1="56" y1="98" x2="68" y2="110" stroke="#fb923c" stroke-width="2.5" stroke-linecap="round"/>
                        <line x1="68" y1="98" x2="56" y2="110" stroke="#fb923c" stroke-width="2.5" stroke-linecap="round"/>
                    </svg>
                `;
        case 'fortalte_dem':
            return isLeft
                ? `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="0" y="106" width="240" height="44" fill="rgba(6, 11, 25, 0.78)"/>
                        <circle cx="48" cy="128" r="11" fill="#fde047"/>
                        <path d="M 68 118 Q 78 128 68 138" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                        <path d="M 78 113 Q 92 128 78 143" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
                        <line x1="98" y1="128" x2="152" y2="128" stroke="#fde047" stroke-width="3"/>
                        <polygon points="150,122 162,128 150,134" fill="#fde047"/>
                        <circle cx="180" cy="128" r="6" fill="#4ade80"/>
                        <circle cx="198" cy="128" r="6" fill="#4ade80"/>
                        <circle cx="216" cy="128" r="6" fill="#4ade80"/>
                    </svg>
                `
                : `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="0" y="106" width="240" height="44" fill="rgba(24, 18, 30, 0.78)"/>
                        <circle cx="120" cy="128" r="14" fill="none" stroke="#fb923c" stroke-width="2.5" stroke-dasharray="4,3"/>
                        <line x1="109" y1="139" x2="131" y2="117" stroke="#fb923c" stroke-width="3"/>
                    </svg>
                `;
        case 'hans_datter':
            return isLeft
                ? `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="0" y="104" width="240" height="46" fill="rgba(6, 11, 25, 0.8)"/>
                        <polygon points="34,132 39,120 48,128 57,120 62,132" fill="#fde047"/>
                        <line x1="72" y1="128" x2="154" y2="128" stroke="#f472b6" stroke-width="3"/>
                        <polygon points="152,122 164,128 152,134" fill="#f472b6"/>
                        <circle cx="184" cy="128" r="12" fill="rgba(244,114,182,0.3)" stroke="#f472b6" stroke-width="2.5"/>
                        <circle cx="184" cy="128" r="5" fill="#f472b6"/>
                    </svg>
                `
                : '';
        case 'vinder_hende':
            return isLeft
                ? `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="10" y="10" width="66" height="42" rx="10" fill="rgba(6, 11, 25, 0.82)" stroke="#fde047" stroke-width="2"/>
                        <polygon points="26,38 31,24 43,32 55,24 60,38" fill="#fde047"/>
                        <path d="M 80 32 Q 112 32 126 56" fill="none" stroke="#fde047" stroke-width="3.5" stroke-linecap="round"/>
                        <polygon points="119,56 130,64 131,50" fill="#fde047"/>
                    </svg>
                `
                : '';
        case 'tager_til_slottet':
            return isLeft
                ? `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="0" y="108" width="240" height="42" fill="rgba(6, 11, 25, 0.72)"/>
                        <circle cx="34" cy="129" r="7" fill="#38bdf8"/>
                        <line x1="48" y1="129" x2="188" y2="129" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                        <polygon points="184,121 202,129 184,137" fill="#fde047"/>
                        <circle cx="212" cy="129" r="8" fill="#fde047"/>
                    </svg>
                `
                : '';
        case 'hest_vs_ged':
            return isLeft
                ? `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect x="6" y="6" width="228" height="138" rx="8" fill="none" stroke="#38bdf8" stroke-width="3"/>
                    </svg>
                `
                : `
                    <svg class="kh-s1-hybrid-overlay" viewBox="0 0 240 150" preserveAspectRatio="none" aria-hidden="true">
                        <rect width="240" height="150" fill="rgba(16, 20, 25, 0.42)"/>
                        <circle cx="120" cy="75" r="36" fill="rgba(16, 20, 25, 0.65)" stroke="#fb923c" stroke-width="4"/>
                        <line x1="94" y1="49" x2="146" y2="101" stroke="#fb923c" stroke-width="4.5" stroke-linecap="round"/>
                        <line x1="146" y1="49" x2="94" y2="101" stroke="#fb923c" stroke-width="4.5" stroke-linecap="round"/>
                    </svg>
                `;
        default:
            return '';
    }
}

// ============================================================================
// RENDER-FUNKTION: KUN DEN VALGTE KASSE DUKKER OP VED KLIK PÅ ET ORD
// ============================================================================
export function createSentence1VisualLab(vrimmelStageEl) {
    if (!document.getElementById('kh-s1-visual-styles')) {
        const st = document.createElement('style');
        st.id = 'kh-s1-visual-styles';
        st.textContent = `
            .kh-s1-hint-pill {
                margin-top: 0.55rem;
                display: inline-flex;
                align-items: center;
                gap: 0.45rem;
                background: rgba(21, 26, 33, 0.72);
                border: 1px dashed rgba(203, 213, 225, 0.24);
                color: #94a3b8;
                padding: 0.3rem 0.75rem;
                border-radius: 999px;
                font-size: 0.78rem;
                font-weight: 600;
            }
            .kh-s1-lab-wrap {
                margin-top: 0.75rem;
                background: #12171e;
                border: 1.5px solid rgba(76, 155, 166, 0.55);
                border-radius: 14px;
                padding: 0.85rem 1rem;
                box-shadow: 0 10px 24px rgba(0, 0, 0, 0.36);
                color: #f1f5f9;
            }
            .kh-s1-top-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.65rem;
            }
            .kh-s1-active-pill {
                background: #1a212b;
                border: 1px solid rgba(76, 155, 166, 0.55);
                color: #f1f5f9;
                padding: 0.3rem 0.8rem;
                border-radius: 999px;
                font-size: 0.86rem;
                font-weight: 700;
                display: inline-flex;
                align-items: center;
                gap: 0.45rem;
            }
            .kh-s1-close-btn {
                background: transparent;
                border: 1px solid rgba(203, 213, 225, 0.18);
                color: #94a3b8;
                padding: 0.28rem 0.65rem;
                border-radius: 8px;
                font-size: 0.78rem;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.35rem;
                transition: all 0.16s ease;
            }
            .kh-s1-close-btn:hover {
                color: #f1f5f9;
                border-color: rgba(203, 213, 225, 0.45);
                background: rgba(255, 255, 255, 0.05);
            }
            .kh-s1-dichotomy-grid {
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                gap: 0.65rem;
                align-items: stretch;
            }
            @media (max-width: 680px) {
                .kh-s1-dichotomy-grid {
                    grid-template-columns: 1fr;
                }
            }
            .kh-s1-pic-card {
                background: #1a212b;
                border-radius: 11px;
                padding: 0.55rem;
                border: 1px solid rgba(76, 155, 166, 0.42);
                display: flex;
                flex-direction: column;
                gap: 0.4rem;
            }
            .kh-s1-pic-card.antonym {
                border-color: rgba(203, 213, 225, 0.16);
            }
            .kh-s1-card-title {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                font-size: 0.82rem;
                font-weight: 700;
                color: #7ec4ce;
            }
            .kh-s1-pic-card.antonym .kh-s1-card-title {
                color: #94a3b8;
            }
            .kh-s1-hybrid-stage {
                position: relative;
                width: 100%;
                border-radius: 8px;
                overflow: hidden;
            }
            .kh-s1-illus-img {
                width: 100%;
                aspect-ratio: 16 / 10;
                object-fit: cover;
                border-radius: 8px;
                border: 1px solid rgba(203, 213, 225, 0.14);
                display: block;
            }
            .kh-s1-hybrid-overlay {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            .kh-s1-vs-pillar {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .kh-s1-vs-badge {
                background: #151a21;
                border: 1.5px solid rgba(76, 155, 166, 0.6);
                color: #7ec4ce;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 34px;
                height: 34px;
                border-radius: 999px;
            }
            .kh-vrimmel-spotlight-ring {
                position: absolute;
                transform: translate(-50%, -50%);
                border: 2.5px solid #7ec4ce;
                background: rgba(76, 155, 166, 0.16);
                border-radius: 999px;
                box-shadow: 0 0 0 4px rgba(16, 20, 25, 0.45), 0 0 22px rgba(76, 155, 166, 0.75);
                pointer-events: none;
                z-index: 18;
                display: flex;
                align-items: flex-end;
                justify-content: center;
                animation: khPulseSpot 1.6s infinite ease-in-out;
            }
            .kh-vrimmel-spotlight-lbl {
                transform: translateY(115%);
                background: rgba(16, 20, 25, 0.94);
                border: 1px solid rgba(126, 196, 206, 0.7);
                color: #e2e8f0;
                font-size: 0.73rem;
                font-weight: 700;
                padding: 0.18rem 0.55rem;
                border-radius: 999px;
                white-space: nowrap;
            }
            @keyframes khPulseSpot {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.07); }
            }
        `;
        document.head.appendChild(st);
    }

    const host = document.createElement('div');
    let activeNodeId = null;
    let showIdleHint = true;

    function clearVrimmelOverlay() {
        if (!vrimmelStageEl) return;
        vrimmelStageEl.querySelectorAll('.kh-vrimmel-spotlight-ring').forEach(el => el.remove());
    }

    function updateVrimmelOverlay(node) {
        clearVrimmelOverlay();
        if (!vrimmelStageEl || !node || !node.vrimmelSpot) return;

        const spots = [node.vrimmelSpot, ...(node.vrimmelSpot.multiTargets || [])];
        spots.forEach(sp => {
            const ring = document.createElement('div');
            ring.className = 'kh-vrimmel-spotlight-ring';
            const size = (sp.radius || 12) * 5.2;
            ring.style.left = `${sp.x}%`;
            ring.style.top = `${sp.y}%`;
            ring.style.width = `${size}px`;
            ring.style.height = `${size}px`;
            ring.innerHTML = `<span class="kh-vrimmel-spotlight-lbl">${sp.label}</span>`;
            vrimmelStageEl.appendChild(ring);
        });
    }

    function render() {
        if (!activeNodeId) {
            clearVrimmelOverlay();
            host.innerHTML = showIdleHint
                ? `<div class="kh-s1-hint-pill">${ICON_EYE}<span>Klik på et ord i sætningen</span></div>`
                : '';
            return;
        }

        const node = SENTENCE_1_VISUAL_NODES.find(n => n.id === activeNodeId) || SENTENCE_1_VISUAL_NODES[0];
        updateVrimmelOverlay(node);

        const leftMedia = node.leftDiagramType
            ? renderCustomDiagram(node.leftDiagramType)
            : `
                <div class="kh-s1-hybrid-stage">
                    <img src="${node.leftImg}" alt="${node.leftTitle}" class="kh-s1-illus-img" />
                    ${renderHybridOverlaySvg(node.id, 'left')}
                </div>
            `;

        const hasRight = Boolean(node.rightDiagramType || node.rightImg);
        const rightMedia = !hasRight ? '' : (node.rightDiagramType
            ? renderCustomDiagram(node.rightDiagramType)
            : `
                <div class="kh-s1-hybrid-stage">
                    <img src="${node.rightImg}" alt="${node.rightTitle}" class="kh-s1-illus-img" />
                    ${renderHybridOverlaySvg(node.id, 'right')}
                </div>
            `);

        host.innerHTML = `
            <div class="kh-s1-lab-wrap mode-hybrid">
                <div class="kh-s1-top-bar">
                    <span class="kh-s1-active-pill">
                        ${node.icon}
                        <span>${node.chipLabel}</span>
                    </span>
                    <button type="button" class="kh-s1-close-btn" id="kh-s1-close-btn">
                        ${ICON_CLOSE}
                        <span>Luk</span>
                    </button>
                </div>

                <div class="kh-s1-dichotomy-grid" ${!hasRight ? 'style="grid-template-columns: minmax(0, 340px); justify-content: center;"' : ''}>
                    <div class="kh-s1-pic-card" id="kh-s1-left-pic">
                        <div class="kh-s1-card-title">${ICON_DOT_SOLID}<span>${node.leftTitle}</span></div>
                        ${leftMedia}
                    </div>
                    ${hasRight ? `
                        <div class="kh-s1-vs-pillar">
                            <span class="kh-s1-vs-badge" aria-label="Modsat">${ICON_NOT_EQUAL}</span>
                        </div>

                        <div class="kh-s1-pic-card antonym" id="kh-s1-right-pic">
                            <div class="kh-s1-card-title">${ICON_DOT_RING}<span>${node.rightTitle}</span></div>
                            ${rightMedia}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        const closeBtn = host.querySelector('#kh-s1-close-btn');
        if (closeBtn) {
            closeBtn.onclick = () => {
                activeNodeId = null;
                render();
            };
        }
    }

    host.selectToken = (token, tokenIdx = 0) => {
        const brotherMatch = findVisualNodeForBrotherToken(token);
        const matched = brotherMatch || findSentence1NodeByToken(token, tokenIdx);
        if (matched) {
            activeNodeId = matched.id;
            render();
        }
    };

    host.selectNodeById = (nodeId) => {
        if (!nodeId) return;
        activeNodeId = nodeId;
        render();
    };

    host.close = (hideHint = false) => {
        activeNodeId = null;
        showIdleHint = !hideHint;
        render();
    };

    render();
    return host;
}
