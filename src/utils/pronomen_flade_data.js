/**
 * Data og danske tekster til pronomenfladen "Han / ham / hans (Pronominer)".
 *
 * Alle tekster, der skal oversættes, er samlet her. Oversættelser ligger i
 * pronomen_flade_trans.js og er nøglet på de flade nøgler fra FLAT (se buildFlat).
 *
 * Markup i sætninger:
 *   [[S:Hun]]  subjekt (i fokus)        [[O:ham]]  objekt (uden for fokus)
 *   [[P:sin]]  possessiv (ejer)         [[R:sig]]  refleksiv (tilbage på subjektet)
 *   {{svar|fejl1|fejl2#regel}}  hul i øvelse; første valg er det rigtige,
 *   regel: l = lyskeglen, o = øjenkontakt, e = ejer-nøglen, b = boomerangen
 */

export const TXT = {
    hero_title: `Han / ham / hans (Pronominer)`,
    hero_desc: `Pronominer er små ord, der træder i stedet for navneord. Her lærer du, hvilket ord du skal bruge, og hvorfor.`,

    tab_vrimmel: `1. Familiemiddagen`,
    tab_vaerksted: `2. Aha-værkstedet`,
    tab_detektiv: `3. Detektiven`,
    tab_builder: `4. Sætningsbyggeren`,
    tab_kontekst: `5. Kontekst-testen`,
    tab_historier: `6. Historierne`,

    legend_S: `Subjekt (i fokus)`,
    legend_O: `Objekt (uden for fokus)`,
    legend_P: `Possessiv (ejer)`,
    legend_R: `Refleksiv (tilbage på subjektet)`,

    filter_alle: `Alle`,
    filter_subjekt: `Subjekt`,
    filter_objekt: `Objekt`,
    filter_possessiv: `Possessiv`,
    filter_refleksiv: `Refleksiv`,
    filter_oejenkontakt: `Øjenkontakt`,

    show_marks: `Vis markører`,
    hide_marks: `Skjul markører`,
    in_the_scene: `I scenen`,
    example_sentence: `Eksempelsætning`,
    listen: `Hør sætning`,
    prev: `Forrige`,
    next: `Næste`,
    vrimmel_intro: `Klik på en person eller en ting i billedet.`,

    sub_lys: `Lyskeglen`,
    sub_oejen: `Øjenkontakt`,
    sub_ejer: `Ejer-nøglen`,
    sub_boom: `Boomerangen`,

    lys_title: `Subjekt og objekt: hvem står i lyset?`,
    lys_rule_1: `Subjektet står i lyset. Det er den, sætningen handler om, og den, der gør noget.`,
    lys_rule_2: `Objektet står uden for lyset. Det er den, handlingen rammer.`,
    lys_rule_3: `Fordi rollen er forskellig, er ordet forskelligt: han er subjekt, ham er objekt.`,
    lys_try: `Prøv selv: klik på en person for at flytte lyset.`,
    lys_scene_label: `Vælg en handling`,
    lys_table_title: `Subjekt og objekt side om side`,

    oejen_title: `Øjenkontakt: du eller han/hun?`,
    oejen_rule_question: `Ser jeg personen i øjnene, mens jeg taler?`,
    oejen_rule_yes: `Ja: så bruger jeg du (flertal: I).`,
    oejen_rule_no: `Nej, jeg taler om personen: så bruger jeg han eller hun (flertal: de).`,
    oejen_try: `Prøv selv: hvor står Mette?`,
    oejen_near: `Mette står foran mig`,
    oejen_far: `Mette er ikke til stede`,

    ejer_title: `Ejer-nøglen: hvem ejer tingen?`,
    ejer_step1: `Trin 1: Hvem ejer tingen?`,
    ejer_step1_text: `Ejeren afgør ordet. Ejerordet får ofte et s, ligesom ejeformen af navneord.`,
    ejer_step2: `Trin 2: Hvad slags ting er det?`,
    ejer_step2_text: `Kun min, din og sin ændrer form efter tingen. Alle de andre ejerord ændrer sig aldrig.`,
    ejer_en: `en-ord`,
    ejer_et: `et-ord`,
    ejer_flere: `flere ting`,
    ejer_step3: `Trin 3: Sin eller hans?`,
    ejer_step3_text: `Her bruger vi lyskeglen igen. Er ejeren selv subjekt i sætningen, bruger vi sin. Er ejeren en anden, bruger vi hans eller hendes.`,
    ejer_never_sin: `Sin bruges kun om han, hun, den, det og de, og aldrig om jeg, du eller vi.`,
    ejer_try: `Prøv selv: hvem ejer tingen?`,
    ejer_self: `Ejeren er subjektet selv`,
    ejer_other: `Ejeren er en anden`,
    ejer_col_owner: `Ejer`,
    ejer_col_word: `Ejerord`,

    boom_title: `Boomerangen: går handlingen tilbage?`,
    boom_rule_1: `Går handlingen tilbage til subjektet selv, bruger vi sig (som en boomerang).`,
    boom_rule_2: `Rammer handlingen en anden, bruger vi ham, hende, den, det eller dem.`,
    boom_rule_3: `For jeg, du, vi og I bruger vi de almindelige ord: mig, dig, os og jer.`,
    boom_try: `Prøv selv: hvem rammer handlingen?`,
    boom_self: `Handlingen går tilbage til subjektet`,
    boom_other: `Handlingen rammer en anden`,
    boom_fixed: `Nogle verber er altid refleksive:`,
    boom_fixed_list: `skynde sig, glæde sig, sætte sig, more sig, føle sig, interessere sig`,

    table_person: `Person`,
    table_subj: `Subjekt`,
    table_obj: `Objekt`,
    table_poss: `Possessiv`,
    table_refl: `Refleksiv`,

    det_intro: `Læs situationen, og vælg det rigtige ord.`,
    det_riddle: `Gåde`,
    det_correct: `Rigtigt!`,
    det_score: `rigtige`,
    det_next: `Næste gåde`,
    det_restart: `Prøv igen`,
    det_done: `Færdig!`,

    builder_intro: `Skift navnene ud med pronominer. Hvem står i lyset?`,
    builder_check: `Tjek`,
    builder_correct: `Rigtigt!`,
    builder_light_move: `Flyt lyset`,
    builder_swapped: `Nu står den anden i lyset:`,
    builder_next: `Næste sætning`,
    builder_done: `Du har prøvet alle sætningerne.`,
    builder_restart: `Start forfra`,
    builder_slot_subject: `Subjekt`,
    builder_slot_object: `Objekt`,
    builder_pick: `Vælg`,
    builder_wrong: `Ikke helt. Tjek lyskeglen: hvem gør noget, og hvem rammes?`,

    ctx_intro: `Udfyld hullerne i samtalen.`,
    ctx_dialog: `Samtale`,
    ctx_show_trans: `Oversættelse`,

    story_intro: `Læs teksten, og vælg det rigtige ord i hvert hul.`,
    story_check: `Tjek svar`,
    story_retry: `Prøv igen`,
    story_result: `rigtige`,
    story_level_A: `Kort tekst`,
    story_level_B: `Mellem tekst`,
    story_level_C: `Lang tekst`,

    hint_l: `Tjek lyskeglen: hvem gør noget (subjekt), og hvem rammes (objekt)?`,
    hint_o: `Tjek øjenkontakten: kigger du personen i øjnene (du), eller taler du om personen (han/hun)?`,
    hint_e: `Tjek ejer-nøglen: hvem ejer tingen, og hvad slags ting er det?`,
    hint_b: `Tjek boomerangen: går handlingen tilbage til subjektet selv?`,
};

export const RULE_NAMES = {
    l: `sub_lys`,
    o: `sub_oejen`,
    e: `sub_ejer`,
    b: `sub_boom`,
};

/* ---------------------------------------------------------------
 * Pronomentabeller
 * ------------------------------------------------------------- */
export const PRON_TABLE = [
    { person: `jeg`, subj: `jeg`, obj: `mig`, poss: `min / mit / mine`, refl: `mig` },
    { person: `du`, subj: `du`, obj: `dig`, poss: `din / dit / dine`, refl: `dig` },
    { person: `han`, subj: `han`, obj: `ham`, poss: `hans (sin / sit / sine)`, refl: `sig` },
    { person: `hun`, subj: `hun`, obj: `hende`, poss: `hendes (sin / sit / sine)`, refl: `sig` },
    { person: `den / det`, subj: `den / det`, obj: `den / det`, poss: `dens / dets (sin / sit / sine)`, refl: `sig` },
    { person: `vi`, subj: `vi`, obj: `os`, poss: `vores`, refl: `os` },
    { person: `I`, subj: `I`, obj: `jer`, poss: `jeres`, refl: `jer` },
    { person: `de`, subj: `de`, obj: `dem`, poss: `deres (sin / sit / sine)`, refl: `sig` },
];

export const OWNER_TABLE = [
    { owner: `jeg`, word: `min / mit / mine` },
    { owner: `du`, word: `din / dit / dine` },
    { owner: `han`, word: `hans` },
    { owner: `hun`, word: `hendes` },
    { owner: `den / det`, word: `dens / dets` },
    { owner: `vi`, word: `vores` },
    { owner: `I`, word: `jeres` },
    { owner: `de`, word: `deres` },
];

/* ---------------------------------------------------------------
 * Fane 1: vrimlebillede (koordinater i procent af billedet)
 * ------------------------------------------------------------- */
export const HOTSPOTS = [
    { id: `h1`, x: 43, y: 27, cat: `subjekt`, label: `Mormor`,
      scene: `Mormor rækker kartoflerne over bordet til sit barnebarn.`,
      sentence: `[[S:Hun]] rækker [[O:ham]] kartoflerne.`,
      explain: `Mormor gør noget og står i lyset: hun. Barnebarnet rammes af handlingen og står uden for lyset: ham.` },
    { id: `h2`, x: 56, y: 27, cat: `objekt`, label: `Barnebarnet`,
      scene: `Drengen tager imod kartoflerne og smiler til sin mormor.`,
      sentence: `[[S:Han]] tager imod kartoflerne og smiler til [[O:hende]].`,
      explain: `Nu står drengen i lyset: han. Mormor er objekt i den sidste halvdel af sætningen: hende.` },
    { id: `h3`, x: 66, y: 31, cat: `oejenkontakt`, label: `Far`,
      scene: `Far ser Mor i øjnene og peger diskret på deres datter.`,
      sentence: `[[S:Du]] ser det også, ikke? [[S:Hun]] sidder med [[P:sin]] telefon igen.`,
      explain: `Far kigger på Mor i øjnene, så han siger du. Datteren taler han om, så han siger hun.` },
    { id: `h4`, x: 80, y: 42, cat: `possessiv`, label: `Datteren`,
      scene: `Datteren sidder og kigger ned på sin telefon.`,
      sentence: `[[S:Hun]] kigger på [[P:sin]] telefon.`,
      explain: `Hun er både subjekt og ejer af telefonen, så vi bruger sin.` },
    { id: `h5`, x: 79, y: 52, cat: `possessiv`, label: `Morfar`,
      scene: `Morfar skænker rødvin op.`,
      sentence: `[[S:Han]] skænker vin i [[P:sit]] glas.`,
      explain: `Morfar er subjekt og ejer glasset. Glasset er et et-ord, så det hedder sit.` },
    { id: `h6`, x: 46, y: 80, cat: `objekt`, label: `Pigen`,
      scene: `Den lille pige sidder under bordet og giver hunden et stykke kød.`,
      sentence: `[[S:Hun]] giver [[O:den]] en bid kød.`,
      explain: `Pigen gør noget: hun. Hunden er en en-ting og rammes af handlingen: den.` },
    { id: `h7`, x: 56, y: 83, cat: `possessiv`, label: `Hunden`,
      scene: `Hunden tager imod kødet fra pigens hånd.`,
      sentence: `[[S:Den]] spiser kødet fra [[P:hendes]] hånd.`,
      explain: `Hunden er subjekt, men hånden tilhører pigen, ikke hunden. Ejeren er en anden, så vi bruger hendes og ikke sin.` },
    { id: `h8`, x: 84, y: 79, cat: `possessiv`, label: `Drengen`,
      scene: `En lille dreng viser sin tegning frem for sin tante.`,
      sentence: `[[S:Jeg]] har tegnet den til [[O:dig]]. Det er [[P:min]] tegning.`,
      explain: `Drengen taler til sin tante og ser hende i øjnene, så han siger dig. Tegningen er hans egen, og tegning er et en-ord: min.` },
    { id: `h9`, x: 92, y: 62, cat: `objekt`, label: `Tanten`,
      scene: `Tanten kigger på tegningen og smiler til drengen.`,
      sentence: `[[S:Hun]] ser på [[P:hans]] tegning og smiler til [[O:ham]].`,
      explain: `Tanten er subjekt, men tegningen tilhører drengen. Ejeren er en anden: hans. Drengen rammes af hendes smil: ham.` },
    { id: `h10`, x: 25, y: 27, cat: `possessiv`, label: `Værten`,
      scene: `Værten hænger gæstens frakke op.`,
      sentence: `[[S:Han]] tager [[P:hendes]] frakke og hænger [[O:den]] op.`,
      explain: `Værten er subjekt, men frakken tilhører gæsten. Ejeren er en anden: hendes. Frakken rammes af handlingen: den.` },
    { id: `h11`, x: 16, y: 32, cat: `objekt`, label: `Gæsten`,
      scene: `En gæst kommer ind ad døren med en kage.`,
      sentence: `[[S:Hun]] har taget en kage med til [[O:dem]].`,
      explain: `Gæsten er i lyset: hun. Familien står uden for lyset og modtager kagen: dem.` },
    { id: `h12`, x: 33, y: 52, cat: `refleksiv`, label: `Kusinerne`,
      scene: `To børn fniser og hvisker, mens de kigger på deres onkel.`,
      sentence: `[[S:De]] hvisker om [[O:ham]] og morer [[R:sig]].`,
      explain: `De hvisker om onklen, og han rammes af handlingen: ham. Morer sig går tilbage på dem selv: sig.` },
    { id: `h13`, x: 22, y: 61, cat: `refleksiv`, label: `Babyen`,
      scene: `Babyen sidder i sin højstol og kaster med skeen.`,
      sentence: `[[S:Han]] morer [[R:sig]] med at kaste [[P:sin]] ske på gulvet.`,
      explain: `Handlingen går tilbage til babyen selv: sig. Skeen er hans egen, og ske er et en-ord: sin.` },
    { id: `h14`, x: 11, y: 25, cat: `possessiv`, label: `Cykelhjelmen`,
      scene: `På knagerækken hænger der en lille rød cykelhjelm.`,
      sentence: `[[S:Den]] er [[P:hans]], og [[S:han]] har ikke taget [[O:den]] på.`,
      explain: `Ejeren er en anden end hjelmen selv: hans. Hjelmen rammes af handlingen at tage på: den.` },
];

/* ---------------------------------------------------------------
 * Fane 2: interaktive eksempler i Aha-værkstedet
 * ------------------------------------------------------------- */
export const LYS_SCENES = [
    { id: `ringer`, label: `ringer til`,
      a: `[[S:Han]] ringer til [[O:hende]].`, b: `[[S:Hun]] ringer til [[O:ham]].` },
    { id: `hjaelper`, label: `hjælper`,
      a: `[[S:Han]] hjælper [[O:hende]] med lektierne.`, b: `[[S:Hun]] hjælper [[O:ham]] med lektierne.` },
    { id: `besoeger`, label: `besøger`,
      a: `[[S:Han]] besøger [[O:hende]] hver søndag.`, b: `[[S:Hun]] besøger [[O:ham]] hver søndag.` },
];

export const OEJEN_SCENES = [
    { id: `jakke`, near: `[[S:Du]] har en flot jakke.`, far: `[[S:Hun]] har en flot jakke.` },
    { id: `ser`, near: `Jeg ser [[O:dig]] i kantinen.`, far: `Jeg ser [[O:hende]] i kantinen.` },
    { id: `ringer`, near: `[[S:Du]] ringer til mig i aften.`, far: `[[S:Hun]] ringer til mig i aften.` },
];

export const EJER_SCENES = [
    { id: `bil`, selfLabel: `Peter vasker sin egen bil`, otherLabel: `Peter vasker Jonas' bil`,
      self: `Peter vasker [[P:sin]] bil.`, other: `Peter vasker [[P:hans]] bil.` },
    { id: `jakke`, selfLabel: `Anna tager sin egen jakke`, otherLabel: `Anna tager Mettes jakke`,
      self: `Anna tager [[P:sin]] jakke.`, other: `Anna tager [[P:hendes]] jakke.` },
    { id: `avis`, selfLabel: `Morfar læser sin egen avis`, otherLabel: `Morfar læser Lars' avis`,
      self: `Morfar læser [[P:sin]] avis.`, other: `Morfar læser [[P:hans]] avis.` },
];

export const BOOM_SCENES = [
    { id: `barberer`, self: `Peter barberer [[R:sig]].`, other: `Peter barberer [[O:ham]].` },
    { id: `vasker`, self: `Anna vasker [[R:sig]].`, other: `Anna vasker [[O:hende]].` },
    { id: `ser`, self: `Han ser [[R:sig]] i spejlet.`, other: `Han ser [[O:ham]] i spejlet.` },
];

/* ---------------------------------------------------------------
 * Fane 3: Detektiven (12 gåder, ét hul i hver)
 * ------------------------------------------------------------- */
export const DETEKTIV = [
    { id: `d1`, situation: `Anna skriver en besked til sin bror Peter.`,
      text: `{{Hun|Hende|Hendes#l}} skriver til Peter.` },
    { id: `d2`, situation: `Anna skriver en besked til sin bror Peter.`,
      text: `Anna skriver til {{ham|han|hans#l}}.` },
    { id: `d3`, situation: `Børnene render rundt i haven, og hunden løber efter dem.`,
      text: `Hunden løber efter {{dem|de|deres#l}}.` },
    { id: `d4`, situation: `Mor og far har lavet mad, og nu sidder hele familien ved bordet.`,
      text: `{{De|Dem|Deres#l}} har lavet mad til os.` },
    { id: `d5`, situation: `Du står foran din kollega Marie og ser hende i øjnene.`,
      text: `Marie, har {{du|hun|hende#o}} tid i dag?` },
    { id: `d6`, situation: `Du fortæller en ven om Marie, som ikke er til stede.`,
      text: `{{Hun|Du|Dig#o}} har desværre ikke tid i dag.` },
    { id: `d7`, situation: `Læreren står foran klassen og taler direkte til eleverne.`,
      text: `{{I|De|Dem#o}} skal aflevere opgaven i morgen.` },
    { id: `d8`, situation: `Bilen tilhører Jonas, og Peter har lånt den.`,
      text: `Peter har lånt {{hans|sin|hendes#e}} bil.` },
    { id: `d9`, situation: `Peter har købt en bil, og i dag står han og vasker den.`,
      text: `Peter vasker {{sin|hans|hendes#e}} bil.` },
    { id: `d10`, situation: `Du har tre børn og taler om, hvor meget du elsker dem.`,
      text: `Jeg elsker {{mine|min|mit#e}} børn.` },
    { id: `d11`, situation: `Peter står foran spejlet og barberer sit eget ansigt.`,
      text: `Peter barberer {{sig|ham|hans#b}}.` },
    { id: `d12`, situation: `Peter står bag sin bedstefar og barberer bedstefarens skæg.`,
      text: `Peter barberer {{ham|sig|hans#b}}.` },
];

/* ---------------------------------------------------------------
 * Fane 4: Sætningsbyggeren
 * type: m = han/ham, f = hun/hende, p = de/dem, n = den/den
 * ------------------------------------------------------------- */
export const BUILDER_SCENES = [
    { id: `b1`, a: { name: `Mormor`, t: `f` }, b: { name: `Lucas`, t: `m` }, verb: `rækker`, rest: `kartoflerne` },
    { id: `b2`, a: { name: `Peter`, t: `m` }, b: { name: `Anna`, t: `f` }, verb: `hjælper`, rest: `med lektierne` },
    { id: `b3`, a: { name: `Læreren`, t: `m` }, b: { name: `Sofie`, t: `f` }, verb: `roser`, rest: `for opgaven` },
    { id: `b4`, a: { name: `Børnene`, t: `p` }, b: { name: `Mormor`, t: `f` }, verb: `hjælper`, rest: `i haven` },
    { id: `b5`, a: { name: `Naboen`, t: `m` }, b: { name: `Maria`, t: `f` }, verb: `ringer til`, rest: `hver aften` },
    { id: `b6`, a: { name: `Hunden`, t: `n` }, b: { name: `Lisa`, t: `f` }, verb: `følger`, rest: `hjem` },
    { id: `b7`, a: { name: `Karina`, t: `f` }, b: { name: `børnene`, t: `p` }, verb: `kender`, rest: `godt` },
    { id: `b8`, a: { name: `Jonas`, t: `m` }, b: { name: `Thomas`, t: `m` }, verb: `mødte`, rest: `i går` },
];

export const BUILDER_FORMS = {
    m: { s: `han`, o: `ham` },
    f: { s: `hun`, o: `hende` },
    p: { s: `de`, o: `dem` },
    n: { s: `den`, o: `den` },
};

/* ---------------------------------------------------------------
 * Fane 5: Kontekst-testen (korte samtaler)
 * ------------------------------------------------------------- */
export const KONTEKST = [
    { id: `k1`, place: `På café`, lines: [
        { sp: `Anna`, text: `Hej Sara! Har {{du|hun|dig#o}} tid til en kop kaffe?` },
        { sp: `Sara`, text: `Ja, gerne. Jeg har ikke set Mette længe. Har {{du|hun|dig#o}} talt med {{hende|hun|hendes#l}} for nylig?` },
    ] },
    { id: `k2`, place: `På arbejde`, lines: [
        { sp: `Mia`, text: `Hvor er Jens? Jeg kan ikke finde {{ham|han|hans#l}}.` },
        { sp: `Ole`, text: `{{Han|Ham|Hans#l}} er til møde. Det er {{hans|sin|hendes#e}} chef, der har kaldt på {{ham|han|hans#l}}.` },
    ] },
    { id: `k3`, place: `I supermarkedet`, lines: [
        { sp: `Far`, text: `Hvad skal vi have til middag?` },
        { sp: `Mor`, text: `Jeg tænker på at lave {{min|mit|mine#e}} berømte lasagne.` },
        { sp: `Far`, text: `Skal vi ikke ringe til børnene? {{De|Dem|Deres#l}} er sikkert sultne.` },
    ] },
    { id: `k4`, place: `Hos lægen`, lines: [
        { sp: `Lægen`, text: `Hvordan har {{du|dig|dit#l}} det i dag?` },
        { sp: `Patienten`, text: `Jeg har ondt i ryggen, og jeg kan ikke løfte {{min|mit|mine#e}} arm.` },
        { sp: `Lægen`, text: `Skynd {{dig|du|dit#b}} at sætte {{dig|du|dit#b}} ned, så kigger jeg på det.` },
    ] },
    { id: `k5`, place: `Om morgenen derhjemme`, lines: [
        { sp: `Mor`, text: `Skynd {{dig|du|dit#b}}! Vi skal af sted om ti minutter.` },
        { sp: `Barnet`, text: `Jeg skal lige finde {{min|mit|mine#e}} jakke.` },
        { sp: `Mor`, text: `Din bror har allerede fundet {{sin|hans|din#e}} jakke og sat {{sig|ham|han#b}} ind i bilen.` },
    ] },
    { id: `k6`, place: `På gaden`, lines: [
        { sp: `Turisten`, text: `Undskyld, kender {{du|dig|dit#o}} vej til stationen?` },
        { sp: `Lokal`, text: `Ja, jeg skal selv derhen. Følg med {{mig|jeg|min#l}}.` },
    ] },
    { id: `k7`, place: `I telefonen`, lines: [
        { sp: `Lars`, text: `Har du talt med Karin?` },
        { sp: `Eva`, text: `Ja, {{hun|hende|hendes#l}} ringede til {{mig|jeg|min#l}} i går. {{Hun|Hende|Hendes#l}} har købt {{sit|sin|hendes#e}} første hus.` },
    ] },
    { id: `k8`, place: `Før festen`, lines: [
        { sp: `Jonas`, text: `Vi glæder {{os|vi|vores#b}} til festen.` },
        { sp: `Maja`, text: `Det gør {{jeg|mig|min#l}} også. Skal {{vi|os|vores#l}} tage Lars og Eva med? {{De|Dem|Deres#l}} kender ikke så mange.` },
    ] },
];

/* ---------------------------------------------------------------
 * Fane 6: Historierne (tre tekster med stigende længde)
 * ------------------------------------------------------------- */
export const HISTORIER = [
    { id: `A`, title: `En besked til en veninde`,
      paragraphs: [
        `Hej Karen! {{Jeg|Mig|Min#l}} håber, at {{du|dig|dit#o}} har det godt. I går mødte jeg Thomas i byen. {{Han|Ham|Hans#l}} fortalte, at {{han|ham|hans#l}} har fået nyt job, og at {{hans|sin|hendes#e}} nye chef er en dejlig kvinde. {{Hun|Hende|Hendes#l}} hedder Lone.`,
        `Jeg glæder {{mig|jeg|min#b}} til at høre mere. Skal vi mødes på fredag? Jeg kan hente {{dig|du|dit#l}} klokken syv. Knus fra Mette`,
      ] },
    { id: `B`, title: `En mandag hos familien Hansen`,
      paragraphs: [
        `Peter vågner klokken seks. {{Han|Ham|Hans#l}} står op og børster {{sine|hans|hendes#e}} tænder. I køkkenet står hans kone, Anna. {{Hun|Hende|Hendes#l}} har allerede lavet kaffe.`,
        `»God morgen,« siger Peter og smiler til {{hende|hun|hendes#l}}. »Har {{du|dig|dit#o}} sovet godt?« »Ja tak,« svarer Anna. »Men børnene har ikke sovet så godt. {{De|Dem|Deres#l}} var oppe flere gange i nat.«`,
        `Peter går ind til børnene. {{Han|Ham|Hans#l}} rusker blidt i {{dem|de|deres#l}}. »Skynd {{jer|I|jeres#b}}, ellers kommer I for sent i skole!« Den lille pige sætter {{sig|hende|hendes#b}} op i sengen og gnider {{sine|hendes|hans#e}} øjne. Hendes storebror finder allerede {{sin|hans|hendes#e}} skoletaske.`,
        `Anna kalder fra køkkenet: »Jeres morgenmad er klar!« Børnene løber ned til {{hende|hun|hendes#l}}, og alle spiser sammen.`,
      ] },
    { id: `C`, title: `Maja skriver i sin dagbog`,
      paragraphs: [
        `Kære dagbog. I dag var vi til middag hos mormor og morfar. {{Jeg|Mig|Min#l}} glædede {{mig|jeg|min#b}} hele ugen, fordi {{de|dem|deres#l}} altid laver verdens bedste mad.`,
        `Da vi kom, åbnede morfar døren og tog {{min|mit|mine#e}} jakke. »Hvor er det dejligt at se {{dig|du|dit#o}}!« sagde {{han|ham|hans#l}}. Mormor stod i køkkenet. {{Hun|Hende|Hendes#l}} havde lavet flæskesteg, og {{hendes|sin|hans#e}} kartofler var perfekte.`,
        `Min lillebror Emil sad ved siden af mig. {{Han|Ham|Hans#l}} ville ikke spise grøntsager, så mor sagde til {{ham|han|hans#l}}: »Du skal smage bare lidt.« Emil rakte ud efter {{sit|sin|hans#e}} glas, men væltede det. »Pas på, Emil!« råbte far. Mormor grinede og tørrede bordet.`,
        `Efter maden viste jeg mormor min tegning. {{Hun|Hende|Hendes#l}} kiggede længe på {{den|det|dem#l}} og sagde: »Den er smuk, Maja! Må jeg beholde {{den|det|dem#l}}?« Jeg smilede og sagde ja.`,
        `Onkel Henrik sad og så på {{sin|hans|hendes#e}} telefon, men tante Lise tog den fra {{ham|han|hans#l}} med et grin. »Nu er det familietid,« sagde hun. Alle morede {{sig|dem|deres#b}} godt. På vej hjem kunne jeg ikke lade være med at tænke på, hvor heldige {{vi|os|vores#l}} er.`,
      ] },
];

/* ---------------------------------------------------------------
 * Hjælpere
 * ------------------------------------------------------------- */

/** Fjerner [[X:ord]]-markup og {{svar|...}}-huller, så der står ren tekst (med de rigtige svar). */
export function plain(text) {
    return String(text || '')
        .replace(/\[\[[A-Z]:([^\]]+)\]\]/g, '$1')
        .replace(/\{\{([^}#|]+)[^}]*\}\}/g, '$1');
}

/** Alle oversættelige tekster som { nøgle: dansk tekst }. */
export function buildFlat() {
    const f = {};
    Object.entries(TXT).forEach(([k, v]) => { f['txt.' + k] = v; });
    HOTSPOTS.forEach(h => {
        f[`hs.${h.id}.label`] = h.label;
        f[`hs.${h.id}.scene`] = h.scene;
        f[`hs.${h.id}.sentence`] = plain(h.sentence);
        f[`hs.${h.id}.explain`] = h.explain;
    });
    LYS_SCENES.forEach(s => {
        f[`lys.${s.id}.a`] = plain(s.a);
        f[`lys.${s.id}.b`] = plain(s.b);
    });
    OEJEN_SCENES.forEach(s => {
        f[`oejen.${s.id}.near`] = plain(s.near);
        f[`oejen.${s.id}.far`] = plain(s.far);
    });
    EJER_SCENES.forEach(s => {
        f[`ejer.${s.id}.selfLabel`] = s.selfLabel;
        f[`ejer.${s.id}.otherLabel`] = s.otherLabel;
        f[`ejer.${s.id}.self`] = plain(s.self);
        f[`ejer.${s.id}.other`] = plain(s.other);
    });
    BOOM_SCENES.forEach(s => {
        f[`boom.${s.id}.self`] = plain(s.self);
        f[`boom.${s.id}.other`] = plain(s.other);
    });
    DETEKTIV.forEach(d => {
        f[`det.${d.id}.situation`] = d.situation;
        f[`det.${d.id}.text`] = plain(d.text);
    });
    BUILDER_SCENES.forEach(s => {
        f[`bld.${s.id}.rest`] = s.rest;
        f[`bld.${s.id}.verb`] = s.verb;
    });
    KONTEKST.forEach(k => {
        f[`ctx.${k.id}.place`] = k.place;
        k.lines.forEach((l, i) => { f[`ctx.${k.id}.l${i}`] = plain(l.text); });
    });
    HISTORIER.forEach(s => {
        f[`story.${s.id}.title`] = s.title;
        s.paragraphs.forEach((p, i) => { f[`story.${s.id}.p${i}`] = plain(p); });
    });
    return f;
}
