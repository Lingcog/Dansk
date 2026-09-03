// Function to get progress, handles backwards compatibility for pkg1
export function getPackageProgress(pkgId) {
  const key = pkgId === 'pkg1' ? 'danskTalemaaderProgress' : `danskTalemaaderProgress_${pkgId}`;
  return JSON.parse(localStorage.getItem(key) || '{"mod1":false,"mod2":false,"mod3":false,"mod4":false}');
}

export function savePackageProgress(pkgId, progressObj) {
  const key = pkgId === 'pkg1' ? 'danskTalemaaderProgress' : `danskTalemaaderProgress_${pkgId}`;
  localStorage.setItem(key, JSON.stringify(progressObj));
}

export const packagesData = {
  pkg1: {
    id: 'pkg1',
    title: 'Livets omveje 1',
    desc: 'Gå på opdagelse i talemåder og lær om at lykkes, trække sig, fejle og starte forfra.',
    modules: {
      mod1: {
        id: 'mod1', title: 'At lykkes & Målrettet flid', desc: 'Blind høne, skyde papegøjen, ramme plet og at kaste frugt af sig.', image: 'succes_flid.png', overemne: 'At lykkes',
        items: [
          { id: '1', name: 'Blind høne finder også korn', coords: { left: 9, top: 48, width: 17, height: 10 }, options: ['Blind høne finder også korn', 'At skyde papegøjen', 'At ramme plet'] },
          { id: '2', name: 'At skyde papegøjen', coords: { left: 30, top: 78, width: 17, height: 10 }, options: ['At skyde papegøjen', 'Det kører på skinner', 'At kaste frugt af sig'] },
          { id: '3', name: 'At ramme plet', coords: { left: 56, top: 52, width: 17, height: 10 }, options: ['At ramme plet', 'Det kører på skinner', 'Blind høne finder også korn'] },
          { id: '4', name: 'Det kører på skinner', coords: { left: 79, top: 48, width: 17, height: 10 }, options: ['Det kører på skinner', 'At kaste frugt af sig', 'At skyde papegøjen'] },
          { id: '5', name: 'At kaste frugt af sig', coords: { left: 76, top: 78, width: 17, height: 10 }, options: ['At kaste frugt af sig', 'At ramme plet', 'At stikke piben ind'] }
        ]
      },
      mod2: {
        id: 'mod2', title: 'Mental & Handlingsretræte', desc: 'At stikke piben ind, trække i land, slå bak og kaste håndklædet i ringen.', image: 'retraete.png', overemne: 'Retræte',
        items: [
          { id: '1', name: 'At trække følerne til sig', coords: { left: 4, top: 57, width: 17, height: 10 }, options: ['At trække følerne til sig', 'At stikke piben ind', 'At slå bak'] },
          { id: '2', name: 'At stikke piben ind', coords: { left: 27, top: 70, width: 17, height: 10 }, options: ['At stikke piben ind', 'At trække i land', 'At kaste håndklædet i ringen'] },
          { id: '3', name: 'At trække i land', coords: { left: 72, top: 32, width: 17, height: 10 }, options: ['At trække i land', 'At slå bak', 'At trække følerne til sig'] },
          { id: '4', name: 'At slå bak', coords: { left: 56, top: 55, width: 17, height: 10 }, options: ['At slå bak', 'At kaste håndklædet i ringen', 'At stikke piben ind'] },
          { id: '5', name: 'At kaste håndklædet i ringen', coords: { left: 72, top: 78, width: 17, height: 10 }, options: ['At kaste håndklædet i ringen', 'At trække i land', 'At slå bak'] }
        ]
      },
      mod3: {
        id: 'mod3', title: 'Fejltrin & Kollaps', desc: 'At træde i spinaten, gå i baglås, stå med håret i postkassen og gå ned med flaget.', image: 'fejltrin_kollaps.png', overemne: 'Fejltrin & Kollaps',
        items: [
          { id: '1', name: 'At træde i spinaten', coords: { left: 23, top: 27, width: 17, height: 10 }, options: ['At træde i spinaten', 'At gå i baglås', 'At stå med håret i postkassen'] },
          { id: '2', name: 'At gå i baglås', coords: { left: 8, top: 52, width: 17, height: 10 }, options: ['At gå i baglås', 'At slå et større brød op, end man kan bage', 'At gå ned med flaget'] },
          { id: '3', name: 'At slå et større brød op, end man kan bage', coords: { left: 25, top: 76, width: 17, height: 10 }, options: ['At slå et større brød op, end man kan bage', 'At træde i spinaten', 'At stå med håret i postkassen'] },
          { id: '4', name: 'At stå med håret i postkassen', coords: { left: 69, top: 27, width: 17, height: 10 }, options: ['At stå med håret i postkassen', 'At gå ned med flaget', 'At gå i baglås'] },
          { id: '5', name: 'At gå ned med flaget', coords: { left: 77, top: 78, width: 17, height: 10 }, options: ['At gå ned med flaget', 'At slå et større brød op, end man kan bage', 'At træde i spinaten'] }
        ]
      },
      mod4: {
        id: 'mod4', title: 'Starte på en frisk', desc: 'At begynde på en frisk, rejse sig ved det træ man er faldet ved, og op på hesten igen.', image: 'starte_igen.png', overemne: 'Starte igen',
        items: [
          { id: '1', name: 'At begynde på en frisk', coords: { left: 7, top: 58, width: 17, height: 10 }, options: ['At begynde på en frisk', 'At rejse sig ved det træ, man er faldet ved', 'På med vanten igen'] },
          { id: '2', name: 'At rejse sig ved det træ, man er faldet ved', coords: { left: 28, top: 56, width: 17, height: 10 }, options: ['At rejse sig ved det træ, man er faldet ved', 'At tage skeen i den anden hånd', 'At komme op på hesten igen'] },
          { id: '3', name: 'At tage skeen i den anden hånd', coords: { left: 24, top: 79, width: 17, height: 10 }, options: ['At tage skeen i den anden hånd', 'At begynde på en frisk', 'På med vanten igen'] },
          { id: '4', name: 'På med vanten igen', coords: { left: 57, top: 57, width: 17, height: 10 }, options: ['På med vanten igen', 'At komme op på hesten igen', 'At rejse sig ved det træ, man er faldet ved'] },
          { id: '5', name: 'At komme op på hesten igen', coords: { left: 74, top: 76, width: 17, height: 10 }, options: ['At komme op på hesten igen', 'At tage skeen i den anden hånd', 'At begynde på en frisk'] }
        ]
      }
    },
    finale: {
      image: 'kredsloeb.png',
      nodes: [
        {
          id: 'top', title: 'Forberedelse', correctEmne: 'Mental parathed & beslutning', correctIdiom: 'At tage skeen i den anden hånd',
          coords: { left: 24, top: 29, width: 52, height: 8 }, emneOptions: ['Mental parathed & beslutning', 'Målrettet flid & resultat', 'Retræte i handling & handlingsskift'], idiomOptions: ['At tage skeen i den anden hånd', 'At ramme plet', 'At kaste håndklædet i ringen']
        },
        {
          id: 'left', title: 'Succes', correctEmne: 'Målrettet flid & resultat', correctIdiom: 'At ramme plet',
          coords: { left: 4, top: 57, width: 44, height: 8 }, emneOptions: ['Målrettet flid & resultat', 'Fejltrin & procesblokering', 'Mental parathed & beslutning'], idiomOptions: ['At ramme plet', 'At træde i spinaten', 'At begynde på en frisk']
        },
        {
          id: 'right', title: 'Fejltrin', correctEmne: 'Fejltrin & procesblokering', correctIdiom: 'At træde i spinaten',
          coords: { left: 52, top: 57, width: 44, height: 8 }, emneOptions: ['Fejltrin & procesblokering', 'Mental parathed & beslutning', 'Retræte i handling & handlingsskift'], idiomOptions: ['At træde i spinaten', 'At tage skeen i den anden hånd', 'At kaste håndklædet i ringen']
        },
        {
          id: 'bottom_left', title: 'Start Igen', correctEmne: 'Fra forberedelse til handling', correctIdiom: 'At komme op på hesten igen',
          coords: { left: 4, top: 90, width: 44, height: 8 }, emneOptions: ['Fra forberedelse til handling', 'Målrettet flid & resultat', 'Mental parathed & beslutning'], idiomOptions: ['At komme op på hesten igen', 'At ramme plet', 'At stikke piben ind']
        },
        {
          id: 'bottom_right', title: 'Giv Op', correctEmne: 'Retræte i handling & handlingsskift', correctIdiom: 'At kaste håndklædet i ringen',
          coords: { left: 52, top: 90, width: 44, height: 8 }, emneOptions: ['Retræte i handling & handlingsskift', 'Fejltrin & procesblokering', 'Fra forberedelse til handling'], idiomOptions: ['At kaste håndklædet i ringen', 'At træde i spinaten', 'At komme op på hesten igen']
        }
      ],
      expectedOveremne: 'Erfaringens Kredsløb',
      overemneOptions: ['Erfaringens Kredsløb', 'Lykke & Succes', 'Fejl & Genstart', 'Dansk Grammatik']
    },
    arcadeGames: [
      { title: 'Spil 1: Par tegninger', desc: 'Kan du matche de fine illustrationer med de rigtige danske talemåder? Sæt din viden på prøve!', icon: '🧩', url: 'https://arcade.padlet.com/game/6wK7zL1NpJ?link_shared=1' },
      { title: 'Spil 2: Gæt overemner', desc: 'Se de forskellige kategorier og gæt, hvilke overordnede emner talemåderne hører under.', icon: '🧠', url: 'https://arcade.padlet.com/game/9Ljk9qvVKO?link_shared=1' }
    ]
  },
  pkg2: {
    id: 'pkg2',
    title: 'Livets omveje 2',
    desc: 'Udforsk talemåder om sundhed, sygdom, kollaps og restitution.',
    modules: {
      mod1: {
        id: 'mod1', title: 'Forebyggelse & Sundhed', desc: 'At holde lægen fra døren, frisk som en fisk, strut af sundhed osv.', image: 'pkg2_mod3.png', overemne: 'Man gør gode ting for at holde sig sund og stærk, så man har en masse energi i hverdagen og ikke bliver syg.',
        items: [
          { id: '1', name: 'Gode, sunde vaner i hverdagen beskytter dig generelt mod at blive syg.', coords: { left: 10, top: 47, width: 35, height: 8 }, options: ['Gode, sunde vaner i hverdagen beskytter dig generelt mod at blive syg.', 'At bruge naturens egen medicin, når man har brug for at kurere små skavanker.', 'At have let ved at blive rask igen, hvis man først er blevet ramt af en virus.', 'At spise en meget varieret kost for at opbygge store og stærke muskler.'] },
          { id: '2', name: 'At have en utrolig stærk krop og næsten aldrig være syg.', coords: { left: 10, top: 80, width: 35, height: 8 }, options: ['At have en utrolig stærk krop og næsten aldrig være syg.', 'At have rigtig god kondition, fordi man dyrker meget hård motion.', 'At have et positivt sind, som gør det nemt at forblive glad i modgang.', 'At have spist en meget sund og nærende morgenmad, der giver energi.'] },
          { id: '3', name: 'At føle sig helt rask, vågen og fuld af god, frisk energi.', coords: { left: 55, top: 39, width: 35, height: 8 }, options: ['At føle sig helt rask, vågen og fuld af god, frisk energi.', 'At elske at bade i koldt vand for at styrke sit hjerte og sit kredsløb.', 'At have en meget ren og sund hud, fordi man drikker masser af vand.', 'At være dygtig til at slappe af og finde indre ro i en travl hverdag.'] },
          { id: '4', name: 'At se så sund og rask ud, at andre meget tydeligt kan se det på én.', coords: { left: 55, top: 66, width: 35, height: 8 }, options: ['At se så sund og rask ud, at andre meget tydeligt kan se det på én.', 'At føle en stor indre ro, fordi man ved, at man lever et sundt liv.', 'At have overvundet en lang sygdom og endelig være erklæret helt rask.', 'At være meget stolt af sig selv, fordi man motionerer hver eneste dag.'] },
          { id: '5', name: 'At føle sig rigtig godt tilpas og være i en situation, man nyder meget.', coords: { left: 55, top: 91, width: 35, height: 8 }, options: ['At føle sig rigtig godt tilpas og være i en situation, man nyder meget.', 'At føle sig enormt stærk i kroppen, lige efter man har trænet hårdt.', 'At være den person, der altid inspirerer andre til at leve sundt og godt.', 'At være helt fri for smerter i kroppen, fordi man har hvilet sig nok.'] }
        ]
      },
      mod2: {
        id: 'mod2', title: 'Begyndende svækkelse & Inkubation', desc: 'At ligne en hængt kat, at have bly i benene osv.', image: 'pkg2_mod1.png', overemne: 'Man mærker de allerførste tegn på, at man er træt, og man føler sig ikke helt frisk og rask længere.',
        items: [
          { id: '1', name: 'At føle sig meget svag og træt i kroppen uden helt at vide hvorfor.', coords: { left: 5, top: 37, width: 40, height: 8 }, options: ['At føle sig meget svag og træt i kroppen uden helt at vide hvorfor.', 'At have voldsomme smerter i benene efter at have stået op hele dagen.', 'At være utrolig tung i hovedet, fordi man har sovet for meget i weekenden.', 'At bryde fuldstændig sammen og slet ikke kunne rejse sig fra sengen.'] },
          { id: '2', name: 'At være meget uoplagt, mangle energi og se lidt trist ud.', coords: { left: 5, top: 64, width: 40, height: 8 }, options: ['At være meget uoplagt, mangle energi og se lidt trist ud.', 'At have en slem forkølelse, der gør det svært at trække vejret normalt.', 'At være så totalt udmattet, at man pludselig besvimer midt på gaden.', 'At have overvundet en svær tid og nu endelig kunne puste lidt ud.'] },
          { id: '3', name: 'At se meget træt, elendig og medtaget ud, så alle kan se, at man har det skidt.', coords: { left: 5, top: 91, width: 40, height: 8 }, options: ['At se meget træt, elendig og medtaget ud, så alle kan se, at man har det skidt.', 'At være vred og irriteret over en lille ting, der lige er gået galt på arbejdet.', 'At have sovet rigtig dårligt en enkelt nat, fordi det har været for varmt.', 'At være meget klodset og hele tiden tabe ting på gulvet, fordi man har travlt.'] },
          { id: '4', name: 'At føle sig lidt sløj og småsyg, så man ikke kan præstere sit allerbedste.', coords: { left: 56, top: 48, width: 40, height: 8 }, options: ['At føle sig lidt sløj og småsyg, så man ikke kan præstere sit allerbedste.', 'At føle sig enormt stresset over en opgave, man ikke kan finde ud af.', 'At være kommet sig over en sygdom, men stadig mangle den sidste energi.', 'At have mistet absolut alle kræfter, så man overhovedet ikke kan arbejde mere.'] },
          { id: '5', name: 'At føle sig ekstremt tung og træt i kroppen, så det er svært overhovedet at bevæge sig.', coords: { left: 56, top: 88, width: 40, height: 8 }, options: ['At føle sig ekstremt tung og træt i kroppen, så det er svært overhovedet at bevæge sig.', 'At have trænet så meget, at ens benmuskler er vokset og blevet meget stærke.', 'At føle sig helt låst fast i en svær mental beslutning, som man ikke kan træffe.', 'At have meget let ved at falde, fordi man har dårlig balance og er lidt svimmel.'] }
        ]
      },
      mod3: {
        id: 'mod3', title: 'Gradvis svækkelse & Det akutte kollaps', desc: 'At være mat i sokkerne, at gå helt ned med flaget osv.', image: 'pkg2_mod2.png', overemne: 'Man mister alle sine kræfter, og til sidst kan man slet ikke mere, så kroppen tvinger én til at stoppe helt.',
        items: [
          { id: '1', name: 'At føle sig meget svag og træt i kroppen uden helt at vide hvorfor.', coords: { left: 1, top: 38, width: 40, height: 8 }, options: ['At føle sig meget svag og træt i kroppen uden helt at vide hvorfor.', 'At have voldsomme smerter i benene efter at have stået op hele dagen.', 'At være utrolig tung i hovedet, fordi man har sovet for meget i weekenden.', 'At bryde fuldstændig sammen og slet ikke kunne rejse sig fra sengen.'] },
          { id: '2', name: 'At være meget uoplagt, mangle energi og se lidt trist ud.', coords: { left: 30, top: 62, width: 40, height: 8 }, options: ['At være meget uoplagt, mangle energi og se lidt trist ud.', 'At have en slem forkølelse, der gør det svært at trække vejret normalt.', 'At være så totalt udmattet, at man pludselig besvimer midt på gaden.', 'At have overvundet en svær tid og nu endelig kunne puste lidt ud.'] },
          { id: '3', name: 'At føle sig lidt sløj og småsyg, så man ikke kan præstere sit allerbedste.', coords: { left: 1, top: 90, width: 40, height: 8 }, options: ['At føle sig lidt sløj og småsyg, så man ikke kan præstere sit allerbedste.', 'At føle sig enormt stresset over en opgave, man ikke kan finde ud af.', 'At være kommet sig over en sygdom, men stadig mangle den sidste energi.', 'At have mistet absolut alle kræfter, så man overhovedet ikke kan arbejde mere.'] },
          { id: '4', name: 'At bryde fuldstændig sammen af træthed og overbelastning, så man må give op.', coords: { left: 59, top: 53, width: 40, height: 8 }, options: ['At bryde fuldstændig sammen af træthed og overbelastning, så man må give op.', 'At mærke en langsom og let faldende energi i løbet af en meget lang arbejdsdag.', 'At blive ramt af en lille smule stress, som forsvinder helt efter et par dages ro.', 'At være den i firmaet, der altid tager de sværeste opgaver på sine skuldre.'] },
          { id: '5', name: 'At falde om eller kollapse helt akut, fordi kroppen simpelthen ikke kan mere.', coords: { left: 59, top: 82, width: 40, height: 8 }, options: ['At falde om eller kollapse helt akut, fordi kroppen simpelthen ikke kan mere.', 'At få det stille og roligt dårligere over en meget lang periode på flere måneder.', 'At gemme sig for sine problemer ved at blive hjemme i sengen hele dagen lang.', 'At slappe af på sofaen efter en lang og udmattende arbejdsuge.'] }
        ]
      },
      mod4: {
        id: 'mod4', title: 'Mental restitution & Fysisk genrejsning', desc: 'At puste ud, at komme til hægterne igen osv.', image: 'pkg2_mod4.png', overemne: 'Man får det langsomt bedre efter en svær tid, og man samler ny energi, så man er klar til at starte forfra.',
        items: [
          { id: '1', name: 'At slappe helt af i kroppen og lade op efter en hård eller krævende situation.', coords: { left: 9, top: 47, width: 35, height: 8 }, options: ['At slappe helt af i kroppen og lade op efter en hård eller krævende situation.', 'At have svært ved at få luft efter at have løbet alt for hurtigt.', 'At være nødt til at sove hele dagen, fordi man er blevet alvorligt syg.', 'At ignorere sin træthed og fortsætte med at arbejde endnu hårdere.'] },
          { id: '2', name: 'At få sine kræfter og sit helbred langsomt tilbage efter at have været syg.', coords: { left: 9, top: 78, width: 35, height: 8 }, options: ['At få sine kræfter og sit helbred langsomt tilbage efter at have været syg.', 'At bruge medicin til at blive rask hurtigt, så man ikke misser arbejdet.', 'At bryde sammen af stress, fordi man har prøvet at klare alt for meget.', 'At have en fast rutine med at spise meget sundt og træne hver dag.'] },
          { id: '3', name: 'At blive fuldstændig rask og klar igen efter at have ligget syg i sengen.', coords: { left: 55, top: 38, width: 35, height: 8 }, options: ['At blive fuldstændig rask og klar igen efter at have ligget syg i sengen.', 'At rejse sig alt for hurtigt op, så man føler sig en smule svimmel.', 'At mærke de allerførste tegn på, at en forkølelse er ved at ramme én.', 'At nægte at acceptere at man er syg, selvom man har høj feber.'] },
          { id: '4', name: 'At overvinde sit nederlag ved at prøve igen samme sted, hvor det gik galt.', coords: { left: 55, top: 66, width: 35, height: 8 }, options: ['At overvinde sit nederlag ved at prøve igen samme sted, hvor det gik galt.', 'At tage ud i naturen for at få frisk luft og rense sine tanker.', 'At lade andre mennesker hjælpe én, når man ikke selv har flere kræfter.', 'At stoppe helt med at prøve, fordi risikoen for at fejle igen er for stor.'] },
          { id: '5', name: 'At mærke at tingene går godt igen, og at man får ny energi og succes.', coords: { left: 55, top: 92, width: 35, height: 8 }, options: ['At mærke at tingene går godt igen, og at man får ny energi og succes.', 'At mærke et pludseligt fald i kropstemperaturen, så man begynder at fryse.', 'At blive presset af alt for høje forventninger fra de mennesker omkring én.', 'At tage en pause væk fra det hele og rejse langt væk på ferie.'] }
        ]
      }
    },
    finale: {
      image: 'pkg2_kredsloeb.png',
      nodes: [
        {
          id: 'node1', title: 'Forebyggelse', correctEmne: 'Forebyggelse', correctIdiom: 'Gode, sunde vaner i hverdagen beskytter dig generelt mod at blive syg.',
          coords: { left: 9, top: 32, width: 35, height: 8 }, emneOptions: ['Forebyggelse', 'Overbelastning', 'Svækkelse'], idiomOptions: ['Gode, sunde vaner i hverdagen beskytter dig generelt mod at blive syg.', 'At bruge naturens egen medicin, når man har brug for at kurere små skavanker.', 'At have let ved at blive rask igen, hvis man først er blevet ramt af en virus.', 'At spise en meget varieret kost for at opbygge store og stærke muskler.']
        },
        {
          id: 'node2', title: 'Overbelastning', correctEmne: 'Overbelastning', correctIdiom: 'At presse sig selv enormt hårdt ved at arbejde for meget og sove for lidt.',
          coords: { left: 60, top: 42, width: 35, height: 8 }, emneOptions: ['Overbelastning', 'Restitution', 'Kollaps'], idiomOptions: ['At presse sig selv enormt hårdt ved at arbejde for meget og sove for lidt.', 'At blive meget begejstret for et nyt projekt og bruge absolut al sin tid på det.', 'At føle sig enormt stærk, fordi man dyrker hård motion både morgen og aften.', 'At være meget opmærksom på at få løst alle sine problemer hurtigst muligt.']
        },
        {
          id: 'node3', title: 'Svækkelse', correctEmne: 'Svækkelse', correctIdiom: 'At føle sig meget svag og træt i kroppen uden helt at vide hvorfor.',
          coords: { left: 33, top: 61, width: 35, height: 8 }, emneOptions: ['Svækkelse', 'Forebyggelse', 'Kollaps'], idiomOptions: ['At føle sig meget svag og træt i kroppen uden helt at vide hvorfor.', 'At have voldsomme smerter i benene efter at have stået op hele dagen.', 'At være utrolig tung i hovedet, fordi man har sovet for meget i weekenden.', 'At bryde fuldstændig sammen og slet ikke kunne rejse sig fra sengen.']
        },
        {
          id: 'node4', title: 'Kollaps', correctEmne: 'Kollaps', correctIdiom: 'At bryde fuldstændig sammen af træthed og overbelastning, så man må give op.',
          coords: { left: 9, top: 84, width: 35, height: 8 }, emneOptions: ['Kollaps', 'Restitution', 'Overbelastning'], idiomOptions: ['At bryde fuldstændig sammen af træthed og overbelastning, så man må give op.', 'At mærke en langsom og let faldende energi i løbet af en meget lang arbejdsdag.', 'At blive ramt af en lille smule stress, som forsvinder helt efter et par dages ro.', 'At være den i firmaet, der altid tager de allersværeste opgaver på sine skuldre.']
        },
        {
          id: 'node5', title: 'Restitution', correctEmne: 'Restitution', correctIdiom: 'At slappe helt af i kroppen og lade op efter en hård eller krævende situation.',
          coords: { left: 60, top: 92, width: 35, height: 8 }, emneOptions: ['Restitution', 'Forebyggelse', 'Svækkelse'], idiomOptions: ['At slappe helt af i kroppen og lade op efter en hård eller krævende situation.', 'At have enormt svært ved at få luft efter at have løbet alt for hurtigt.', 'At være nødt til at sove hele dagen, fordi man er blevet alvorligt syg.', 'At ignorere sin træthed og fortsætte med at arbejde endnu hårdere.']
        }
      ],
      expectedOveremne: 'Et forløb hvor man gør noget for sit helbred, men så overbelaster sig selv, bliver syg, kollapser og til sidst får samlet ny energi.',
      overemneOptions: ['Et forløb hvor man gør noget for sit helbred, men så overbelaster sig selv, bliver syg, kollapser og til sidst får samlet ny energi.', 'Et forløb hvor man forsøger at opnå succes, begår fejl og må starte forfra med nye ideer.', 'En cyklus hvor man langsomt bliver ældre, mister sin styrke og må acceptere at hvile sig.', 'Et forløb hvor man forsøger at undgå stress på arbejdspladsen ved at sige fra over for chefen i tide.']
    },
    arcadeGames: [
      { title: 'Spil 1: Kommer snart', desc: 'Flere Arcade spil er på vej til denne sektion.', icon: '🕹️', url: 'https://arcade.padlet.com/' },
      { title: 'Spil 2: Kommer snart', desc: 'Hold øje med flere spil.', icon: '⏳', url: 'https://arcade.padlet.com/' }
    ]
  }
};
