// Data definition for 6 targeted training tracks: Anna, Sara, Lars, Jonas, Lise, Jens
export const targetTrainingTracks = [
  {
    "id": "anna",
    "titleKey": "track_title_anna",
    "defaultTitle": "Indkøb (Anna)",
    "icon": "🛒",
    "descKey": "track_desc_anna",
    "defaultDesc": "Anna køber ind i Netto.",
    "semantic": [
      {
        "situationKey": "anna_sit_1",
        "situationFallback": "📍 Situation 1: Anna køber frugt, grøntsager og kød.",
        "goalKey": "anna_trps_1_hv",
        "goalFallback": "Spørg ind til de ting, hun køber.",
        "sentenceParts": [
          "[ ? ]",
          " køber Anna?"
        ],
        "options": [
          "Hvem",
          "Hvad",
          "Hvornår",
          "Hvor"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_1",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om en ting eller genstand."
      },
      {
        "situationKey": "anna_sit_2",
        "situationFallback": "📍 Situation 2: Anna betaler 100 kr.",
        "goalKey": "anna_trps_2_hv",
        "goalFallback": "Spørg om prisen.",
        "sentenceParts": [
          "[ ? ]",
          " betaler Anna?"
        ],
        "options": [
          "Hvor",
          "Hvordan",
          "Hvor meget",
          "Hvad"
        ],
        "correct": "Hvor meget",
        "explanationKey": "hv_exp_2",
        "explanationFallback": "Vi bruger \"Hvor meget\", når vi spørger om pris eller en mængde, der ikke kan tælles."
      },
      {
        "situationKey": "anna_sit_3",
        "situationFallback": "📍 Situation 3: Anna køber ind i Netto.",
        "goalKey": "anna_trps_3_hv",
        "goalFallback": "Spørg om stedet.",
        "sentenceParts": [
          "[ ? ]",
          " køber Anna ind?"
        ],
        "options": [
          "Hvornår",
          "Hvor",
          "Hvem",
          "Hvorhen"
        ],
        "correct": "Hvor",
        "explanationKey": "hv_exp_3",
        "explanationFallback": "Vi bruger \"Hvor\", når vi spørger om et sted eller en position."
      },
      {
        "situationKey": "anna_sit_4",
        "situationFallback": "📍 Situation 4: Anna køber ind kl. 14 om eftermiddagen.",
        "goalKey": "anna_trps_4_hv",
        "goalFallback": "Spørg om tidspunktet.",
        "sentenceParts": [
          "[ ? ]",
          " køber Anna ind?"
        ],
        "options": [
          "Hvordan",
          "Hvad tid",
          "Hvornår",
          "Hvilken"
        ],
        "correct": "Hvornår",
        "explanationKey": "hv_exp_4",
        "explanationFallback": "Vi bruger \"Hvornår\", når vi spørger om tid eller et tidspunkt."
      },
      {
        "situationKey": "anna_sit_5",
        "situationFallback": "📍 Situation 5: Anna betaler med kort.",
        "goalKey": "anna_trps_5_hv",
        "goalFallback": "Spørg om betalingsmetoden.",
        "sentenceParts": [
          "[ ? ]",
          " betaler Anna?"
        ],
        "options": [
          "Hvad",
          "Hvorfor",
          "Hvem",
          "Hvordan"
        ],
        "correct": "Hvordan",
        "explanationKey": "hv_exp_5",
        "explanationFallback": "Vi bruger \"Hvordan\", når vi spørger om måde, middel eller fremgangsmåde."
      },
      {
        "situationKey": "anna_sit_6",
        "situationFallback": "📍 Situation 6: Anna kører i bil til Netto.",
        "goalKey": "anna_trps_6_hv",
        "goalFallback": "Spørg om transporten.",
        "sentenceParts": [
          "[ ? ]",
          " kommer Anna til Netto?"
        ],
        "options": [
          "Hvor",
          "Hvordan",
          "Hvornår",
          "Hvad"
        ],
        "correct": "Hvordan",
        "explanationKey": "hv_exp_6",
        "explanationFallback": "Vi bruger \"Hvordan\", når vi spørger om transportmiddel og måde."
      },
      {
        "situationKey": "anna_sit_7",
        "situationFallback": "📍 Situation 7: Anna køber ind i Netto sammen med en veninde.",
        "goalKey": "anna_trps_7_hv",
        "goalFallback": "Spørg om hendes selskab.",
        "sentenceParts": [
          "[ ? ]",
          " køber Anna ind sammen med?"
        ],
        "options": [
          "Hvem",
          "Hvilken",
          "Hvad",
          "Hvordan"
        ],
        "correct": "Hvem",
        "explanationKey": "hv_exp_7",
        "explanationFallback": "Vi bruger \"Hvem\", når vi spørger om en person eller personer."
      }
    ],
    "yesNo": [
      {
        "situationKey": "anna_sit_1",
        "situationFallback": "📍 Situation 1: Anna køber frugt, grøntsager og kød.",
        "goalKey": "anna_trps_1_jn",
        "goalFallback": "Nu et ja/nej-spørgsmål: Spørg om hun køber frugt.",
        "sentenceParts": [
          "[ ? ]",
          " Anna frugt?"
        ],
        "options": [
          "Køber",
          "Er",
          "Har",
          "Gør"
        ],
        "correct": "Køber",
        "explanationKey": "jn_exp_anna_1",
        "explanationFallback": "I ja/nej-spørgsmål på dansk starter vi direkte med verbet: \"Køber Anna frugt?\". Vi bruger ikke \"gør\" eller \"er\"."
      },
      {
        "situationKey": "anna_sit_2",
        "situationFallback": "📍 Situation 2: Anna betaler 100 kr.",
        "goalKey": "anna_trps_2_jn",
        "goalFallback": "Spørg om hun betaler 100 kroner.",
        "sentenceParts": [
          "[ ? ]",
          " Anna 100 kroner?"
        ],
        "options": [
          "Betaler",
          "Køber",
          "Har",
          "Gør"
        ],
        "correct": "Betaler",
        "explanationKey": "jn_exp_anna_2",
        "explanationFallback": "Verbet \"Betaler\" står på plads 1 i et ja/nej-spørgsmål."
      },
      {
        "situationKey": "anna_sit_3",
        "situationFallback": "📍 Situation 3: Anna køber ind i Netto.",
        "goalKey": "anna_trps_3_jn",
        "goalFallback": "Spørg om hun køber ind i Netto.",
        "sentenceParts": [
          "[ ? ]",
          " Anna ind i Netto?"
        ],
        "options": [
          "Køber",
          "Går",
          "Er",
          "Gør"
        ],
        "correct": "Køber",
        "explanationKey": "jn_exp_anna_3",
        "explanationFallback": "\"Køber\" er verbet og står først: \"Køber Anna ind i Netto?\"."
      },
      {
        "situationKey": "anna_sit_4",
        "situationFallback": "📍 Situation 4: Anna køber ind kl. 14 om eftermiddagen.",
        "goalKey": "anna_trps_4_jn",
        "goalFallback": "Spørg om hun køber ind klokken 14.",
        "sentenceParts": [
          "[ ? ]",
          " Anna ind klokken 14?"
        ],
        "options": [
          "Køber",
          "Er",
          "Har",
          "Vil"
        ],
        "correct": "Køber",
        "explanationKey": "jn_exp_anna_4",
        "explanationFallback": "Verbet \"Køber\" står forrest i ja/nej-spørgsmålet."
      },
      {
        "situationKey": "anna_sit_5",
        "situationFallback": "📍 Situation 5: Anna betaler med kort.",
        "goalKey": "anna_trps_5_jn",
        "goalFallback": "Spørg om hun betaler med kort.",
        "sentenceParts": [
          "[ ? ]",
          " Anna med kort?"
        ],
        "options": [
          "Betaler",
          "Har",
          "Gør",
          "Vil"
        ],
        "correct": "Betaler",
        "explanationKey": "jn_exp_anna_5",
        "explanationFallback": "Verbet \"Betaler\" indleder spørgsmålet."
      },
      {
        "situationKey": "anna_sit_6",
        "situationFallback": "📍 Situation 6: Anna kører i bil til Netto.",
        "goalKey": "anna_trps_6_jn",
        "goalFallback": "Spørg om hun kører i bil.",
        "sentenceParts": [
          "[ ? ]",
          " Anna i bil?"
        ],
        "options": [
          "Kører",
          "Er",
          "Gør",
          "Har"
        ],
        "correct": "Kører",
        "explanationKey": "jn_exp_anna_6",
        "explanationFallback": "Verbet \"Kører\" står på plads 1: \"Kører Anna i bil?\"."
      },
      {
        "situationKey": "anna_sit_7",
        "situationFallback": "📍 Situation 7: Anna køber ind i Netto sammen med en veninde.",
        "goalKey": "anna_trps_7_jn",
        "goalFallback": "Spørg om hun køber ind alene.",
        "sentenceParts": [
          "[ ? ]",
          " Anna ind alene?"
        ],
        "options": [
          "Køber",
          "Er",
          "Gør",
          "Vil"
        ],
        "correct": "Køber",
        "explanationKey": "jn_exp_anna_7",
        "explanationFallback": "Verbet \"Køber\" står på plads 1: \"Køber Anna ind alene?\"."
      }
    ],
    "wordOrder": [
      "Hvad køber Anna?",
      "Køber Anna frugt?",
      "Hvor meget betaler Anna?",
      "Betaler Anna 100 kroner?",
      "Hvor køber Anna ind?",
      "Køber Anna ind i Netto?",
      "Hvornår køber Anna ind?",
      "Køber Anna ind klokken 14?",
      "Hvordan betaler Anna?",
      "Betaler Anna med kort?",
      "Hvordan kommer Anna til Netto?",
      "Kører Anna i bil?",
      "Hvem køber Anna ind sammen med?",
      "Køber Anna ind alene?"
    ]
  },
  {
    "id": "sara",
    "titleKey": "track_title_sara",
    "defaultTitle": "Fødselsdag (Sara)",
    "icon": "🎂",
    "descKey": "track_desc_sara",
    "defaultDesc": "Sara holder fødselsdagsfest.",
    "semantic": [
      {
        "situationKey": "sara_sit_1",
        "situationFallback": "📍 Situation 1: Saras fødselsdag begynder kl. 18 på lørdag.",
        "goalKey": "sara_trps_1_hv",
        "goalFallback": "Spørg om tidspunktet.",
        "sentenceParts": [
          "[ ? ]",
          " begynder fødselsdagen?"
        ],
        "options": [
          "Hvornår",
          "Hvor",
          "Hvad",
          "Hvem"
        ],
        "correct": "Hvornår",
        "explanationKey": "hv_exp_time",
        "explanationFallback": "Vi bruger \"Hvornår\", når vi spørger om et tidspunkt."
      },
      {
        "situationKey": "sara_sit_2",
        "situationFallback": "📍 Situation 2: Sara inviterer familie og venner.",
        "goalKey": "sara_trps_2_hv",
        "goalFallback": "Spørg om gæsterne.",
        "sentenceParts": [
          "[ ? ]",
          " inviterer Sara?"
        ],
        "options": [
          "Hvem",
          "Hvad",
          "Hvor",
          "Hvorfor"
        ],
        "correct": "Hvem",
        "explanationKey": "hv_exp_person",
        "explanationFallback": "Vi bruger \"Hvem\", når vi spørger om personer (gæsterne)."
      },
      {
        "situationKey": "sara_sit_3",
        "situationFallback": "📍 Situation 3: Sara vil have en ny telefon.",
        "goalKey": "sara_trps_3_hv",
        "goalFallback": "Spørg om gaven.",
        "sentenceParts": [
          "[ ? ]",
          " vil Sara have?"
        ],
        "options": [
          "Hvad",
          "Hvorfor",
          "Hvem",
          "Hvordan"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_thing",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om en ting eller gave."
      },
      {
        "situationKey": "sara_sit_4",
        "situationFallback": "📍 Situation 4: Sara serverer kage.",
        "goalKey": "sara_trps_4_hv",
        "goalFallback": "Spørg om maden.",
        "sentenceParts": [
          "[ ? ]",
          " serverer Sara?"
        ],
        "options": [
          "Hvad",
          "Hvor",
          "Hvornår",
          "Hvem"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_thing",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om maden eller serveringen."
      },
      {
        "situationKey": "sara_sit_5",
        "situationFallback": "📍 Situation 5: Sara holder fødselsdag i lejligheden.",
        "goalKey": "sara_trps_5_hv",
        "goalFallback": "Spørg om stedet.",
        "sentenceParts": [
          "[ ? ]",
          " holder Sara fødselsdag?"
        ],
        "options": [
          "Hvor",
          "Hvornår",
          "Hvem",
          "Hvad"
        ],
        "correct": "Hvor",
        "explanationKey": "hv_exp_place",
        "explanationFallback": "Vi bruger \"Hvor\", når vi spørger om stedet (i lejligheden)."
      },
      {
        "situationKey": "sara_sit_6",
        "situationFallback": "📍 Situation 6: Sara elsker musik.",
        "goalKey": "sara_trps_6_hv",
        "goalFallback": "Spørg om hendes interesse.",
        "sentenceParts": [
          "[ ? ]",
          " elsker Sara?"
        ],
        "options": [
          "Hvad",
          "Hvem",
          "Hvorfor",
          "Hvordan"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_thing",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om interesser eller emner."
      },
      {
        "situationKey": "sara_sit_7",
        "situationFallback": "📍 Situation 7: Fødselsdagen slutter kl. 23.",
        "goalKey": "sara_trps_7_hv",
        "goalFallback": "Spørg om sluttidspunktet.",
        "sentenceParts": [
          "[ ? ]",
          " slutter fødselsdagen?"
        ],
        "options": [
          "Hvornår",
          "Hvor",
          "Hvem",
          "Hvad"
        ],
        "correct": "Hvornår",
        "explanationKey": "hv_exp_time",
        "explanationFallback": "Vi bruger \"Hvornår\", når vi spørger om et tidspunkt."
      }
    ],
    "yesNo": [
      {
        "situationKey": "sara_sit_1",
        "situationFallback": "📍 Situation 1: Saras fødselsdag begynder kl. 18 på lørdag.",
        "goalKey": "sara_trps_1_jn",
        "goalFallback": "Nu et ja/nej-spørgsmål: Spørg om den begynder kl. 18.",
        "sentenceParts": [
          "[ ? ]",
          " fødselsdagen klokken 18?"
        ],
        "options": [
          "Begynder",
          "Er",
          "Gør",
          "Har"
        ],
        "correct": "Begynder",
        "explanationKey": "jn_exp_sara_1",
        "explanationFallback": "Verbet \"Begynder\" står på plads 1 i et ja/nej-spørgsmål."
      },
      {
        "situationKey": "sara_sit_2",
        "situationFallback": "📍 Situation 2: Sara inviterer familie og venner.",
        "goalKey": "sara_trps_2_jn",
        "goalFallback": "Spørg om hun inviterer familie og venner.",
        "sentenceParts": [
          "[ ? ]",
          " Sara familie og venner?"
        ],
        "options": [
          "Inviterer",
          "Er",
          "Har",
          "Gør"
        ],
        "correct": "Inviterer",
        "explanationKey": "jn_exp_sara_2",
        "explanationFallback": "Verbet \"Inviterer\" indleder spørgsmålet."
      },
      {
        "situationKey": "sara_sit_3",
        "situationFallback": "📍 Situation 3: Sara vil have en ny telefon.",
        "goalKey": "sara_trps_3_jn",
        "goalFallback": "Spørg om hun vil have en ny telefon.",
        "sentenceParts": [
          "[ ? ]",
          " Sara have en ny telefon?"
        ],
        "options": [
          "Vil",
          "Skal",
          "Er",
          "Gør"
        ],
        "correct": "Vil",
        "explanationKey": "jn_exp_sara_3",
        "explanationFallback": "Hjælpeverbet \"Vil\" står på plads 1: \"Vil Sara have en ny telefon?\"."
      },
      {
        "situationKey": "sara_sit_4",
        "situationFallback": "📍 Situation 4: Sara serverer kage.",
        "goalKey": "sara_trps_4_jn",
        "goalFallback": "Spørg om hun serverer kage.",
        "sentenceParts": [
          "[ ? ]",
          " Sara kage?"
        ],
        "options": [
          "Serverer",
          "Spiser",
          "Er",
          "Gør"
        ],
        "correct": "Serverer",
        "explanationKey": "jn_exp_sara_4",
        "explanationFallback": "Verbet \"Serverer\" står forrest i spørgsmålet."
      },
      {
        "situationKey": "sara_sit_5",
        "situationFallback": "📍 Situation 5: Sara holder fødselsdag i lejligheden.",
        "goalKey": "sara_trps_5_jn",
        "goalFallback": "Spørg om hun holder fødselsdag i lejligheden.",
        "sentenceParts": [
          "[ ? ]",
          " Sara fødselsdag i lejligheden?"
        ],
        "options": [
          "Holder",
          "Har",
          "Er",
          "Gør"
        ],
        "correct": "Holder",
        "explanationKey": "jn_exp_sara_5",
        "explanationFallback": "Verbet \"Holder\" står på plads 1."
      },
      {
        "situationKey": "sara_sit_6",
        "situationFallback": "📍 Situation 6: Sara elsker musik.",
        "goalKey": "sara_trps_6_jn",
        "goalFallback": "Spørg om hun elsker musik.",
        "sentenceParts": [
          "[ ? ]",
          " Sara musik?"
        ],
        "options": [
          "Elsker",
          "Hører",
          "Er",
          "Gør"
        ],
        "correct": "Elsker",
        "explanationKey": "jn_exp_sara_6",
        "explanationFallback": "Verbet \"Elsker\" står først i ja/nej-spørgsmålet."
      },
      {
        "situationKey": "sara_sit_7",
        "situationFallback": "📍 Situation 7: Fødselsdagen slutter kl. 23.",
        "goalKey": "sara_trps_7_jn",
        "goalFallback": "Spørg om den slutter kl. 23.",
        "sentenceParts": [
          "[ ? ]",
          " fødselsdagen klokken 23?"
        ],
        "options": [
          "Slutter",
          "Begynder",
          "Er",
          "Gør"
        ],
        "correct": "Slutter",
        "explanationKey": "jn_exp_sara_7",
        "explanationFallback": "Verbet \"Slutter\" står først."
      }
    ],
    "wordOrder": [
      "Hvornår begynder fødselsdagen?",
      "Begynder fødselsdagen klokken 18?",
      "Hvem inviterer Sara?",
      "Inviterer Sara familie og venner?",
      "Hvad vil Sara have?",
      "Vil Sara have en ny telefon?",
      "Hvad serverer Sara?",
      "Serverer Sara kage?",
      "Hvor holder Sara fødselsdag?",
      "Holder Sara fødselsdag i lejligheden?",
      "Hvad elsker Sara?",
      "Elsker Sara musik?",
      "Hvornår slutter fødselsdagen?",
      "Slutter fødselsdagen klokken 23?"
    ]
  },
  {
    "id": "lars",
    "titleKey": "track_title_lars",
    "defaultTitle": "Familie (Lars)",
    "icon": "👨‍👩‍👧‍👦",
    "descKey": "track_desc_lars",
    "defaultDesc": "Lars og hans familie.",
    "semantic": [
      {
        "situationKey": "lars_sit_1",
        "situationFallback": "📍 Situation 1: Lars er kok.",
        "goalKey": "lars_trps_1_hv",
        "goalFallback": "Spørg om hans job.",
        "sentenceParts": [
          "[ ? ]",
          " arbejder Lars som?"
        ],
        "options": [
          "Hvad",
          "Hvor",
          "Hvem",
          "Hvornår"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_job",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om profession eller job (\"Hvad arbejder du som?\")."
      },
      {
        "situationKey": "lars_sit_2",
        "situationFallback": "📍 Situation 2: Lars har to børn.",
        "goalKey": "lars_trps_2_hv",
        "goalFallback": "Spørg om antallet af børn.",
        "sentenceParts": [
          "[ ? ]",
          " børn har Lars?"
        ],
        "options": [
          "Hvor mange",
          "Hvor meget",
          "Hvem",
          "Hvad"
        ],
        "correct": "Hvor mange",
        "explanationKey": "hv_exp_count",
        "explanationFallback": "Vi bruger \"Hvor mange\", når vi spørger om et tælleligt antal."
      },
      {
        "situationKey": "lars_sit_3",
        "situationFallback": "📍 Situation 3: Hans søn er 12 år og hans datter er 9 år.",
        "goalKey": "lars_trps_3_hv",
        "goalFallback": "Spørg om børnenes alder.",
        "sentenceParts": [
          "[ ? ]",
          " er Lars' børn?"
        ],
        "options": [
          "Hvor gamle",
          "Hvor mange",
          "Hvor meget",
          "Hvordan"
        ],
        "correct": "Hvor gamle",
        "explanationKey": "hv_exp_age",
        "explanationFallback": "Vi bruger \"Hvor gamle\", når vi spørger om alder på personer."
      },
      {
        "situationKey": "lars_sit_4",
        "situationFallback": "📍 Situation 4: Lars og familien bor i et rækkehus i Farum.",
        "goalKey": "lars_trps_4_hv",
        "goalFallback": "Spørg om bopæl.",
        "sentenceParts": [
          "[ ? ]",
          " bor Lars?"
        ],
        "options": [
          "Hvor",
          "Hvornår",
          "Hvem",
          "Hvad"
        ],
        "correct": "Hvor",
        "explanationKey": "hv_exp_place",
        "explanationFallback": "Vi bruger \"Hvor\", når vi spørger om sted eller bopæl."
      },
      {
        "situationKey": "lars_sit_5",
        "situationFallback": "📍 Situation 5: Lars besøger sine forældre en gang om ugen.",
        "goalKey": "lars_trps_5_hv",
        "goalFallback": "Spørg om hyppighed.",
        "sentenceParts": [
          "[ ? ]",
          " besøger Lars sine forældre?"
        ],
        "options": [
          "Hvor ofte",
          "Hvor meget",
          "Hvornår",
          "Hvor"
        ],
        "correct": "Hvor ofte",
        "explanationKey": "hv_exp_freq",
        "explanationFallback": "Vi bruger \"Hvor ofte\", når vi spørger om hyppighed eller frekvens."
      },
      {
        "situationKey": "lars_sit_6",
        "situationFallback": "📍 Situation 6: Lars ringer til sine forældre hver dag.",
        "goalKey": "lars_trps_6_hv",
        "goalFallback": "Spørg om hvem han ringer til.",
        "sentenceParts": [
          "[ ? ]",
          " ringer Lars til hver dag?"
        ],
        "options": [
          "Hvem",
          "Hvad",
          "Hvor",
          "Hvornår"
        ],
        "correct": "Hvem",
        "explanationKey": "hv_exp_person",
        "explanationFallback": "Vi bruger \"Hvem\", når vi spørger om en person."
      },
      {
        "situationKey": "lars_sit_7",
        "situationFallback": "📍 Situation 7: Familien spiser aftensmad sammen hver aften kl. 18.",
        "goalKey": "lars_trps_7_hv",
        "goalFallback": "Spørg om tidspunktet for aftensmad.",
        "sentenceParts": [
          "[ ? ]",
          " spiser Lars' familie aftensmad sammen?"
        ],
        "options": [
          "Hvornår",
          "Hvor",
          "Hvad",
          "Hvorfor"
        ],
        "correct": "Hvornår",
        "explanationKey": "hv_exp_time",
        "explanationFallback": "Vi bruger \"Hvornår\", når vi spørger om tidspunktet."
      }
    ],
    "yesNo": [
      {
        "situationKey": "lars_sit_1",
        "situationFallback": "📍 Situation 1: Lars er kok.",
        "goalKey": "lars_trps_1_jn",
        "goalFallback": "Spørg om Lars er kok.",
        "sentenceParts": [
          "[ ? ]",
          " Lars kok?"
        ],
        "options": [
          "Er",
          "Har",
          "Gør",
          "Arbejder"
        ],
        "correct": "Er",
        "explanationKey": "jn_exp_lars_1",
        "explanationFallback": "Verbet \"Er\" står på plads 1: \"Er Lars kok?\"."
      },
      {
        "situationKey": "lars_sit_2",
        "situationFallback": "📍 Situation 2: Lars har to børn.",
        "goalKey": "lars_trps_2_jn",
        "goalFallback": "Spørg om han har to børn.",
        "sentenceParts": [
          "[ ? ]",
          " Lars to børn?"
        ],
        "options": [
          "Har",
          "Er",
          "Gør",
          "Får"
        ],
        "correct": "Har",
        "explanationKey": "jn_exp_lars_2",
        "explanationFallback": "Verbet \"Har\" står først: \"Har Lars to børn?\"."
      },
      {
        "situationKey": "lars_sit_3",
        "situationFallback": "📍 Situation 3: Hans søn er 12 år og hans datter er 9 år.",
        "goalKey": "lars_trps_3_jn",
        "goalFallback": "Spørg om hans søn er 12 år.",
        "sentenceParts": [
          "[ ? ]",
          " hans søn 12 år?"
        ],
        "options": [
          "Er",
          "Har",
          "Bliver",
          "Gør"
        ],
        "correct": "Er",
        "explanationKey": "jn_exp_lars_3",
        "explanationFallback": "Verbet \"Er\" indleder spørgsmålet."
      },
      {
        "situationKey": "lars_sit_4",
        "situationFallback": "📍 Situation 4: Lars og familien bor i et rækkehus i Farum.",
        "goalKey": "lars_trps_4_jn",
        "goalFallback": "Spørg om han bor i Farum.",
        "sentenceParts": [
          "[ ? ]",
          " Lars i Farum?"
        ],
        "options": [
          "Bor",
          "Er",
          "Har",
          "Gør"
        ],
        "correct": "Bor",
        "explanationKey": "jn_exp_lars_4",
        "explanationFallback": "Verbet \"Bor\" står forrest: \"Bor Lars i Farum?\"."
      },
      {
        "situationKey": "lars_sit_5",
        "situationFallback": "📍 Situation 5: Lars besøger sine forældre en gang om ugen.",
        "goalKey": "lars_trps_5_jn",
        "goalFallback": "Spørg om han besøger sine forældre en gang om ugen.",
        "sentenceParts": [
          "[ ? ]",
          " Lars sine forældre en gang om ugen?"
        ],
        "options": [
          "Besøger",
          "Ser",
          "Er",
          "Gør"
        ],
        "correct": "Besøger",
        "explanationKey": "jn_exp_lars_5",
        "explanationFallback": "Verbet \"Besøger\" indleder ja/nej-spørgsmålet."
      },
      {
        "situationKey": "lars_sit_6",
        "situationFallback": "📍 Situation 6: Lars ringer til sine forældre hver dag.",
        "goalKey": "lars_trps_6_jn",
        "goalFallback": "Spørg om han ringer til sine forældre hver dag.",
        "sentenceParts": [
          "[ ? ]",
          " Lars til sine forældre hver dag?"
        ],
        "options": [
          "Ringer",
          "Snakker",
          "Er",
          "Gør"
        ],
        "correct": "Ringer",
        "explanationKey": "jn_exp_lars_6",
        "explanationFallback": "Verbet \"Ringer\" står på plads 1."
      },
      {
        "situationKey": "lars_sit_7",
        "situationFallback": "📍 Situation 7: Familien spiser aftensmad sammen hver aften kl. 18.",
        "goalKey": "lars_trps_7_jn",
        "goalFallback": "Spørg om de spiser aftensmad sammen hver dag.",
        "sentenceParts": [
          "[ ? ]",
          " de aftensmad sammen hver dag?"
        ],
        "options": [
          "Spiser",
          "Laver",
          "Er",
          "Gør"
        ],
        "correct": "Spiser",
        "explanationKey": "jn_exp_lars_7",
        "explanationFallback": "Verbet \"Spiser\" står på plads 1."
      }
    ],
    "wordOrder": [
      "Hvad arbejder Lars som?",
      "Er Lars kok?",
      "Hvor mange børn har Lars?",
      "Har Lars to børn?",
      "Hvor gamle er Lars børn?",
      "Er hans søn 12 år?",
      "Hvor bor Lars?",
      "Bor Lars i Farum?",
      "Hvor ofte besøger Lars sine forældre?",
      "Besøger Lars sine forældre en gang om ugen?",
      "Hvem ringer Lars til hver dag?",
      "Ringer Lars til sine forældre hver dag?",
      "Hvornår spiser Lars familie aftensmad sammen?",
      "Spiser de aftensmad sammen hver dag?"
    ]
  },
  {
    "id": "jonas",
    "titleKey": "track_title_jonas",
    "defaultTitle": "Mad (Jonas)",
    "icon": "🍎",
    "descKey": "track_desc_jonas",
    "defaultDesc": "Jonas spiser sundt.",
    "semantic": [
      {
        "situationKey": "jonas_sit_1",
        "situationFallback": "📍 Situation 1: Jonas spiser havregryn eller brød til morgenmad.",
        "goalKey": "jonas_trps_1_hv",
        "goalFallback": "Spørg om hvad han spiser.",
        "sentenceParts": [
          "[ ? ]",
          " spiser Jonas til morgenmad?"
        ],
        "options": [
          "Hvad",
          "Hvem",
          "Hvor",
          "Hvornår"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_thing",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om mad eller ting."
      },
      {
        "situationKey": "jonas_sit_2",
        "situationFallback": "📍 Situation 2: Til frokost spiser Jonas en sandwich.",
        "goalKey": "jonas_trps_2_hv",
        "goalFallback": "Spørg om frokosten.",
        "sentenceParts": [
          "[ ? ]",
          " spiser Jonas til frokost?"
        ],
        "options": [
          "Hvad",
          "Hvor",
          "Hvornår",
          "Hvorfor"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_thing",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om genstanden eller maden."
      },
      {
        "situationKey": "jonas_sit_3",
        "situationFallback": "📍 Situation 3: Jonas kan godt lide varm suppe.",
        "goalKey": "jonas_trps_3_hv",
        "goalFallback": "Spørg om hvad han kan lide.",
        "sentenceParts": [
          "[ ? ]",
          " kan Jonas godt lide?"
        ],
        "options": [
          "Hvad",
          "Hvem",
          "Hvor",
          "Hvordan"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_thing",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger hvad nogen kan lide."
      },
      {
        "situationKey": "jonas_sit_4",
        "situationFallback": "📍 Situation 4: Jonas drikker vand eller mælk.",
        "goalKey": "jonas_trps_4_hv",
        "goalFallback": "Spørg om drikkevarerne.",
        "sentenceParts": [
          "[ ? ]",
          " drikker Jonas?"
        ],
        "options": [
          "Hvad",
          "Hvor",
          "Hvornår",
          "Hvorfor"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_thing",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om drikkevarer."
      },
      {
        "situationKey": "jonas_sit_5",
        "situationFallback": "📍 Situation 5: Jonas spiser frugt hver dag.",
        "goalKey": "jonas_trps_5_hv",
        "goalFallback": "Spørg om frekvensen for frugt.",
        "sentenceParts": [
          "[ ? ]",
          " spiser Jonas frugt?"
        ],
        "options": [
          "Hvor ofte",
          "Hvor meget",
          "Hvornår",
          "Hvor"
        ],
        "correct": "Hvor ofte",
        "explanationKey": "hv_exp_freq",
        "explanationFallback": "Vi bruger \"Hvor ofte\", når vi spørger om hyppighed eller frekvens."
      },
      {
        "situationKey": "jonas_sit_6",
        "situationFallback": "📍 Situation 6: I weekenden spiser Jonas en burger.",
        "goalKey": "jonas_trps_6_hv",
        "goalFallback": "Spørg om hvornår han spiser burger.",
        "sentenceParts": [
          "[ ? ]",
          " spiser Jonas en burger?"
        ],
        "options": [
          "Hvornår",
          "Hvor",
          "Hvad",
          "Hvem"
        ],
        "correct": "Hvornår",
        "explanationKey": "hv_exp_time",
        "explanationFallback": "Vi bruger \"Hvornår\", når vi spørger om tidspunkt eller dag."
      },
      {
        "situationKey": "jonas_sit_7",
        "situationFallback": "📍 Situation 7: Jonas køber ind i Lidl.",
        "goalKey": "jonas_trps_7_hv",
        "goalFallback": "Spørg om butikken/stedet.",
        "sentenceParts": [
          "[ ? ]",
          " køber Jonas ind?"
        ],
        "options": [
          "Hvor",
          "Hvornår",
          "Hvad",
          "Hvem"
        ],
        "correct": "Hvor",
        "explanationKey": "hv_exp_place",
        "explanationFallback": "Vi bruger \"Hvor\", når vi spørger om et sted eller en butik."
      }
    ],
    "yesNo": [
      {
        "situationKey": "jonas_sit_1",
        "situationFallback": "📍 Situation 1: Jonas spiser havregryn eller brød til morgenmad.",
        "goalKey": "jonas_trps_1_jn",
        "goalFallback": "Spørg om han spiser brød til morgenmad.",
        "sentenceParts": [
          "[ ? ]",
          " Jonas brød til morgenmad?"
        ],
        "options": [
          "Spiser",
          "Har",
          "Er",
          "Gør"
        ],
        "correct": "Spiser",
        "explanationKey": "jn_exp_jonas_1",
        "explanationFallback": "Verbet \"Spiser\" står på plads 1 i ja/nej-spørgsmålet."
      },
      {
        "situationKey": "jonas_sit_2",
        "situationFallback": "📍 Situation 2: Til frokost spiser Jonas en sandwich.",
        "goalKey": "jonas_trps_2_jn",
        "goalFallback": "Spørg om han spiser en sandwich.",
        "sentenceParts": [
          "[ ? ]",
          " Jonas en sandwich?"
        ],
        "options": [
          "Spiser",
          "Laver",
          "Er",
          "Gør"
        ],
        "correct": "Spiser",
        "explanationKey": "jn_exp_jonas_2",
        "explanationFallback": "Verbet \"Spiser\" står først."
      },
      {
        "situationKey": "jonas_sit_3",
        "situationFallback": "📍 Situation 3: Jonas kan godt lide varm suppe.",
        "goalKey": "jonas_trps_3_jn",
        "goalFallback": "Spørg om han godt kan lide suppe.",
        "sentenceParts": [
          "[ ? ]",
          " Jonas godt lide suppe?"
        ],
        "options": [
          "Kan",
          "Vil",
          "Er",
          "Gør"
        ],
        "correct": "Kan",
        "explanationKey": "jn_exp_jonas_3",
        "explanationFallback": "Hjælpeverbet \"Kan\" står på plads 1: \"Kan Jonas godt lide suppe?\"."
      },
      {
        "situationKey": "jonas_sit_4",
        "situationFallback": "📍 Situation 4: Jonas drikker vand eller mælk.",
        "goalKey": "jonas_trps_4_jn",
        "goalFallback": "Spørg om han drikker mælk.",
        "sentenceParts": [
          "[ ? ]",
          " Jonas mælk?"
        ],
        "options": [
          "Drikker",
          "Tager",
          "Er",
          "Gør"
        ],
        "correct": "Drikker",
        "explanationKey": "jn_exp_jonas_4",
        "explanationFallback": "Verbet \"Drikker\" indleder spørgsmålet."
      },
      {
        "situationKey": "jonas_sit_5",
        "situationFallback": "📍 Situation 5: Jonas spiser frugt hver dag.",
        "goalKey": "jonas_trps_5_jn",
        "goalFallback": "Spørg om han spiser frugt hver dag.",
        "sentenceParts": [
          "[ ? ]",
          " Jonas frugt hver dag?"
        ],
        "options": [
          "Spiser",
          "Har",
          "Er",
          "Gør"
        ],
        "correct": "Spiser",
        "explanationKey": "jn_exp_jonas_5",
        "explanationFallback": "Verbet \"Spiser\" står forrest."
      },
      {
        "situationKey": "jonas_sit_6",
        "situationFallback": "📍 Situation 6: I weekenden spiser Jonas en burger.",
        "goalKey": "jonas_trps_6_jn",
        "goalFallback": "Spørg om han spiser en burger i weekenden.",
        "sentenceParts": [
          "[ ? ]",
          " Jonas en burger i weekenden?"
        ],
        "options": [
          "Spiser",
          "Får",
          "Er",
          "Gør"
        ],
        "correct": "Spiser",
        "explanationKey": "jn_exp_jonas_6",
        "explanationFallback": "Verbet \"Spiser\" står først."
      },
      {
        "situationKey": "jonas_sit_7",
        "situationFallback": "📍 Situation 7: Jonas køber ind i Lidl.",
        "goalKey": "jonas_trps_7_jn",
        "goalFallback": "Spørg om han køber ind i Lidl.",
        "sentenceParts": [
          "[ ? ]",
          " Jonas ind i Lidl?"
        ],
        "options": [
          "Køber",
          "Går",
          "Er",
          "Gør"
        ],
        "correct": "Køber",
        "explanationKey": "jn_exp_jonas_7",
        "explanationFallback": "Verbet \"Køber\" står på plads 1: \"Køber Jonas ind i Lidl?\"."
      }
    ],
    "wordOrder": [
      "Hvad spiser Jonas til morgenmad?",
      "Spiser Jonas brød til morgenmad?",
      "Hvad spiser Jonas til frokost?",
      "Spiser Jonas en sandwich?",
      "Hvad kan Jonas godt lide?",
      "Kan Jonas godt lide suppe?",
      "Hvad drikker Jonas?",
      "Drikker Jonas mælk?",
      "Hvor ofte spiser Jonas frugt?",
      "Spiser Jonas frugt hver dag?",
      "Hvornår spiser Jonas en burger?",
      "Spiser Jonas en burger i weekenden?",
      "Hvor køber Jonas ind?",
      "Køber Jonas ind i Lidl?"
    ]
  },
  {
    "id": "lise",
    "titleKey": "track_title_lise",
    "defaultTitle": "Sundhed (Lise)",
    "icon": "🩺",
    "descKey": "track_desc_lise",
    "defaultDesc": "Lises helbred og vaner.",
    "semantic": [
      {
        "situationKey": "lise_sit_1",
        "situationFallback": "📍 Situation 1: Lise er pensionist. Hun går til lægen 2 gange om måneden.",
        "goalKey": "lise_trps_1_hv",
        "goalFallback": "Spørg om frekvensen for lægebesøg.",
        "sentenceParts": [
          "[ ? ]",
          " går Lise til lægen?"
        ],
        "options": [
          "Hvor ofte",
          "Hvor meget",
          "Hvornår",
          "Hvorfor"
        ],
        "correct": "Hvor ofte",
        "explanationKey": "hv_exp_freq",
        "explanationFallback": "Vi bruger \"Hvor ofte\", når vi spørger om hyppighed eller frekvens."
      },
      {
        "situationKey": "lise_sit_2",
        "situationFallback": "📍 Situation 2: Lise spiser tre piller hver dag.",
        "goalKey": "lise_trps_2_hv",
        "goalFallback": "Spørg om antallet af piller.",
        "sentenceParts": [
          "[ ? ]",
          " piller spiser Lise?"
        ],
        "options": [
          "Hvor mange",
          "Hvor meget",
          "Hvad",
          "Hvor"
        ],
        "correct": "Hvor mange",
        "explanationKey": "hv_exp_count",
        "explanationFallback": "Vi bruger \"Hvor mange\", når vi spørger om et tælleligt antal (piller)."
      },
      {
        "situationKey": "lise_sit_3",
        "situationFallback": "📍 Situation 3: Lise har tit hovedpine.",
        "goalKey": "lise_trps_3_hv",
        "goalFallback": "Spørg ind til hvad hun har tit.",
        "sentenceParts": [
          "[ ? ]",
          " har Lise tit?"
        ],
        "options": [
          "Hvad",
          "Hvem",
          "Hvor",
          "Hvorfor"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_thing",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om en tilstand eller smerte."
      },
      {
        "situationKey": "lise_sit_4",
        "situationFallback": "📍 Situation 4: Lise er ofte forkølet.",
        "goalKey": "lise_trps_4_hv",
        "goalFallback": "Spørg om hvor ofte hun er forkølet.",
        "sentenceParts": [
          "[ ? ]",
          " er Lise forkølet?"
        ],
        "options": [
          "Hvor ofte",
          "Hvornår",
          "Hvad",
          "Hvor"
        ],
        "correct": "Hvor ofte",
        "explanationKey": "hv_exp_freq",
        "explanationFallback": "Vi bruger \"Hvor ofte\", når vi spørger om frekvens."
      },
      {
        "situationKey": "lise_sit_5",
        "situationFallback": "📍 Situation 5: Lise har været på hospitalet 2 gange.",
        "goalKey": "lise_trps_5_hv",
        "goalFallback": "Spørg om hvor mange gange hun har været på hospitalet.",
        "sentenceParts": [
          "[ ? ]",
          " gange har Lise været på hospitalet?"
        ],
        "options": [
          "Hvor mange",
          "Hvor meget",
          "Hvor",
          "Hvornår"
        ],
        "correct": "Hvor mange",
        "explanationKey": "hv_exp_count",
        "explanationFallback": "Vi bruger \"Hvor mange\", når vi spørger om antal gange."
      },
      {
        "situationKey": "lise_sit_6",
        "situationFallback": "📍 Situation 6: Lise går en tur hver dag.",
        "goalKey": "lise_trps_6_hv",
        "goalFallback": "Spørg om hvor ofte hun går tur.",
        "sentenceParts": [
          "[ ? ]",
          " går Lise en tur?"
        ],
        "options": [
          "Hvor ofte",
          "Hvornår",
          "Hvad",
          "Hvorfor"
        ],
        "correct": "Hvor ofte",
        "explanationKey": "hv_exp_freq",
        "explanationFallback": "Vi bruger \"Hvor ofte\", når vi spørger om hyppighed."
      },
      {
        "situationKey": "lise_sit_7",
        "situationFallback": "📍 Situation 7: Lise sover ikke godt om natten.",
        "goalKey": "lise_trps_7_hv",
        "goalFallback": "Spørg ind til hendes søvn.",
        "sentenceParts": [
          "[ ? ]",
          " sover Lise om natten?"
        ],
        "options": [
          "Hvordan",
          "Hvor",
          "Hvorfor",
          "Hvad"
        ],
        "correct": "Hvordan",
        "explanationKey": "hv_exp_way",
        "explanationFallback": "Vi bruger \"Hvordan\", når vi spørger om kvalitet eller måde."
      },
      {
        "situationKey": "lise_sit_8",
        "situationFallback": "📍 Situation 8: Lise er vegetar.",
        "goalKey": "lise_trps_8_hv",
        "goalFallback": "Spørg ind til hendes kost.",
        "sentenceParts": [
          "[ ? ]",
          " er Lise?"
        ],
        "options": [
          "Hvad",
          "Hvem",
          "Hvor",
          "Hvorfor"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_state",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om hvad nogen er (\"Hvad er Lise?\")."
      }
    ],
    "yesNo": [
      {
        "situationKey": "lise_sit_1",
        "situationFallback": "📍 Situation 1: Lise er pensionist. Hun går til lægen 2 gange om måneden.",
        "goalKey": "lise_trps_1_jn",
        "goalFallback": "Nu et ja/nej-spørgsmål: Spørg om hun går til lægen to gange om måneden.",
        "sentenceParts": [
          "[ ? ]",
          " Lise til lægen to gange om måneden?"
        ],
        "options": [
          "Går",
          "Er",
          "Har",
          "Gør"
        ],
        "correct": "Går",
        "explanationKey": "jn_exp_lise_1",
        "explanationFallback": "Verbet \"Går\" står på plads 1 i ja/nej-spørgsmålet."
      },
      {
        "situationKey": "lise_sit_2",
        "situationFallback": "📍 Situation 2: Lise spiser tre piller hver dag.",
        "goalKey": "lise_trps_2_jn",
        "goalFallback": "Spørg om hun spiser tre piller.",
        "sentenceParts": [
          "[ ? ]",
          " Lise tre piller?"
        ],
        "options": [
          "Spiser",
          "Tager",
          "Er",
          "Gør"
        ],
        "correct": "Spiser",
        "explanationKey": "jn_exp_lise_2",
        "explanationFallback": "Verbet \"Spiser\" står først."
      },
      {
        "situationKey": "lise_sit_3",
        "situationFallback": "📍 Situation 3: Lise har tit hovedpine.",
        "goalKey": "lise_trps_3_jn",
        "goalFallback": "Spørg om hun tit har hovedpine.",
        "sentenceParts": [
          "[ ? ]",
          " Lise tit hovedpine?"
        ],
        "options": [
          "Har",
          "Får",
          "Er",
          "Gør"
        ],
        "correct": "Har",
        "explanationKey": "jn_exp_lise_3",
        "explanationFallback": "Verbet \"Har\" står forrest: \"Har Lise tit hovedpine?\"."
      },
      {
        "situationKey": "lise_sit_4",
        "situationFallback": "📍 Situation 4: Lise er ofte forkølet.",
        "goalKey": "lise_trps_4_jn",
        "goalFallback": "Spørg om hun ofte er forkølet.",
        "sentenceParts": [
          "[ ? ]",
          " Lise ofte forkølet?"
        ],
        "options": [
          "Er",
          "Bliver",
          "Har",
          "Gør"
        ],
        "correct": "Er",
        "explanationKey": "jn_exp_lise_4",
        "explanationFallback": "Verbet \"Er\" indleder ja/nej-spørgsmålet."
      },
      {
        "situationKey": "lise_sit_5",
        "situationFallback": "📍 Situation 5: Lise har været på hospitalet 2 gange.",
        "goalKey": "lise_trps_5_jn",
        "goalFallback": "Spørg om hun har været på hospitalet to gange.",
        "sentenceParts": [
          "[ ? ]",
          " Lise været på hospitalet to gange?"
        ],
        "options": [
          "Har",
          "Er",
          "Var",
          "Gør"
        ],
        "correct": "Har",
        "explanationKey": "jn_exp_lise_5",
        "explanationFallback": "Hjælpeverbet \"Har\" står forrest: \"Har Lise været...?\"."
      },
      {
        "situationKey": "lise_sit_6",
        "situationFallback": "📍 Situation 6: Lise går en tur hver dag.",
        "goalKey": "lise_trps_6_jn",
        "goalFallback": "Spørg om hun går en tur hver dag.",
        "sentenceParts": [
          "[ ? ]",
          " Lise en tur hver dag?"
        ],
        "options": [
          "Går",
          "Er",
          "Tager",
          "Gør"
        ],
        "correct": "Går",
        "explanationKey": "jn_exp_lise_6",
        "explanationFallback": "Verbet \"Går\" står på plads 1."
      },
      {
        "situationKey": "lise_sit_7",
        "situationFallback": "📍 Situation 7: Lise sover ikke godt om natten.",
        "goalKey": "lise_trps_7_jn",
        "goalFallback": "Spørg om hun sover godt om natten.",
        "sentenceParts": [
          "[ ? ]",
          " Lise godt om natten?"
        ],
        "options": [
          "Sover",
          "Har",
          "Er",
          "Gør"
        ],
        "correct": "Sover",
        "explanationKey": "jn_exp_lise_7",
        "explanationFallback": "Verbet \"Sover\" står på plads 1."
      },
      {
        "situationKey": "lise_sit_8",
        "situationFallback": "📍 Situation 8: Lise er vegetar.",
        "goalKey": "lise_trps_8_jn",
        "goalFallback": "Spørg om hun er vegetar.",
        "sentenceParts": [
          "[ ? ]",
          " Lise vegetar?"
        ],
        "options": [
          "Er",
          "Har",
          "Bliver",
          "Gør"
        ],
        "correct": "Er",
        "explanationKey": "jn_exp_lise_8",
        "explanationFallback": "Verbet \"Er\" står på plads 1: \"Er Lise vegetar?\"."
      }
    ],
    "wordOrder": [
      "Hvor ofte går Lise til lægen?",
      "Går Lise til lægen to gange om måneden?",
      "Hvor mange piller spiser Lise?",
      "Spiser Lise tre piller?",
      "Hvad har Lise tit?",
      "Har Lise tit hovedpine?",
      "Hvor ofte er Lise forkølet?",
      "Er Lise ofte forkølet?",
      "Hvor mange gange har Lise været på hospitalet?",
      "Har Lise været på hospitalet to gange?",
      "Hvor ofte går Lise en tur?",
      "Går Lise en tur hver dag?",
      "Hvordan sover Lise om natten?",
      "Sover Lise godt om natten?",
      "Hvad er Lise?",
      "Er Lise vegetar?"
    ]
  },
  {
    "id": "jens",
    "titleKey": "track_title_jens",
    "defaultTitle": "Transport (Jens)",
    "icon": "🚌",
    "descKey": "track_desc_jens",
    "defaultDesc": "Jens og offentlig transport.",
    "semantic": [
      {
        "situationKey": "jens_sit_1",
        "situationFallback": "📍 Situation 1: Jens er pensionist. Han har ikke bil.",
        "goalKey": "jens_trps_1_hv",
        "goalFallback": "Spørg ind til hvad han ikke har.",
        "sentenceParts": [
          "[ ? ]",
          " har Jens ikke?"
        ],
        "options": [
          "Hvad",
          "Hvor",
          "Hvem",
          "Hvorfor"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_thing",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om en ting (en bil)."
      },
      {
        "situationKey": "jens_sit_2",
        "situationFallback": "📍 Situation 2: Jens tager bussen om eftermiddagen.",
        "goalKey": "jens_trps_2_hv",
        "goalFallback": "Spørg om hvornår han tager bussen.",
        "sentenceParts": [
          "[ ? ]",
          " tager Jens bussen?"
        ],
        "options": [
          "Hvornår",
          "Hvor",
          "Hvad",
          "Hvorfor"
        ],
        "correct": "Hvornår",
        "explanationKey": "hv_exp_time",
        "explanationFallback": "Vi bruger \"Hvornår\", når vi spørger om tidspunktet på dagen."
      },
      {
        "situationKey": "jens_sit_3",
        "situationFallback": "📍 Situation 3: Jens bruger rejsekort.",
        "goalKey": "jens_trps_3_hv",
        "goalFallback": "Spørg ind til hvad han bruger.",
        "sentenceParts": [
          "[ ? ]",
          " bruger Jens?"
        ],
        "options": [
          "Hvad",
          "Hvem",
          "Hvor",
          "Hvordan"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_thing",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om tingen (rejsekort)."
      },
      {
        "situationKey": "jens_sit_4",
        "situationFallback": "📍 Situation 4: Jens kan ikke lide at køre med Metro.",
        "goalKey": "jens_trps_4_hv",
        "goalFallback": "Spørg ind til hvad han ikke kan lide.",
        "sentenceParts": [
          "[ ? ]",
          " kan Jens ikke lide?"
        ],
        "options": [
          "Hvad",
          "Hvem",
          "Hvor",
          "Hvornår"
        ],
        "correct": "Hvad",
        "explanationKey": "hv_exp_thing",
        "explanationFallback": "Vi bruger \"Hvad\", når vi spørger om hvad man ikke kan lide."
      },
      {
        "situationKey": "jens_sit_5",
        "situationFallback": "📍 Situation 5: Jens cykler tit til en park.",
        "goalKey": "jens_trps_5_hv",
        "goalFallback": "Spørg om hvor han tit cykler hen.",
        "sentenceParts": [
          "[ ? ]",
          " cykler Jens tit hen?"
        ],
        "options": [
          "Hvor",
          "Hvornår",
          "Hvem",
          "Hvad"
        ],
        "correct": "Hvor",
        "explanationKey": "hv_exp_place",
        "explanationFallback": "Vi bruger \"Hvor\", når vi spørger om sted eller destination."
      },
      {
        "situationKey": "jens_sit_6",
        "situationFallback": "📍 Situation 6: Det tager 10 minutter at cykle til parken.",
        "goalKey": "jens_trps_6_hv",
        "goalFallback": "Spørg om hvor lang tid det tager.",
        "sentenceParts": [
          "[ ? ]",
          " tager det?"
        ],
        "options": [
          "Hvor lang tid",
          "Hvor meget",
          "Hvornår",
          "Hvad"
        ],
        "correct": "Hvor lang tid",
        "explanationKey": "hv_exp_duration",
        "explanationFallback": "Vi bruger \"Hvor lang tid\", når vi spørger om varighed."
      },
      {
        "situationKey": "jens_sit_7",
        "situationFallback": "📍 Situation 7: Jens cykler sammen med en ven.",
        "goalKey": "jens_trps_7_hv",
        "goalFallback": "Spørg ind til hvem han cykler med.",
        "sentenceParts": [
          "[ ? ]",
          " cykler Jens sammen med?"
        ],
        "options": [
          "Hvem",
          "Hvad",
          "Hvorfor",
          "Hvor"
        ],
        "correct": "Hvem",
        "explanationKey": "hv_exp_person",
        "explanationFallback": "Vi bruger \"Hvem\", når vi spørger om personen (en ven)."
      }
    ],
    "yesNo": [
      {
        "situationKey": "jens_sit_1",
        "situationFallback": "📍 Situation 1: Jens er pensionist. Han har ikke bil.",
        "goalKey": "jens_trps_1_jn",
        "goalFallback": "Spørg om han har en bil.",
        "sentenceParts": [
          "[ ? ]",
          " Jens en bil?"
        ],
        "options": [
          "Har",
          "Kører",
          "Er",
          "Gør"
        ],
        "correct": "Har",
        "explanationKey": "jn_exp_jens_1",
        "explanationFallback": "Verbet \"Har\" står på plads 1: \"Har Jens en bil?\"."
      },
      {
        "situationKey": "jens_sit_2",
        "situationFallback": "📍 Situation 2: Jens tager bussen om eftermiddagen.",
        "goalKey": "jens_trps_2_jn",
        "goalFallback": "Spørg om han tager bussen om eftermiddagen.",
        "sentenceParts": [
          "[ ? ]",
          " Jens bussen om eftermiddagen?"
        ],
        "options": [
          "Tager",
          "Kører",
          "Er",
          "Gør"
        ],
        "correct": "Tager",
        "explanationKey": "jn_exp_jens_2",
        "explanationFallback": "Verbet \"Tager\" står forrest."
      },
      {
        "situationKey": "jens_sit_3",
        "situationFallback": "📍 Situation 3: Jens bruger rejsekort.",
        "goalKey": "jens_trps_3_jn",
        "goalFallback": "Spørg om han bruger rejsekort.",
        "sentenceParts": [
          "[ ? ]",
          " Jens rejsekort?"
        ],
        "options": [
          "Bruger",
          "Har",
          "Er",
          "Gør"
        ],
        "correct": "Bruger",
        "explanationKey": "jn_exp_jens_3",
        "explanationFallback": "Verbet \"Bruger\" står først."
      },
      {
        "situationKey": "jens_sit_4",
        "situationFallback": "📍 Situation 4: Jens kan ikke lide at køre med Metro.",
        "goalKey": "jens_trps_4_jn",
        "goalFallback": "Spørg om han kan lide at køre med Metro.",
        "sentenceParts": [
          "[ ? ]",
          " Jens lide at køre med Metro?"
        ],
        "options": [
          "Kan",
          "Vil",
          "Er",
          "Gør"
        ],
        "correct": "Kan",
        "explanationKey": "jn_exp_jens_4",
        "explanationFallback": "Hjælpeverbet \"Kan\" står forrest: \"Kan Jens lide...?\"."
      },
      {
        "situationKey": "jens_sit_5",
        "situationFallback": "📍 Situation 5: Jens cykler tit til en park.",
        "goalKey": "jens_trps_5_jn",
        "goalFallback": "Spørg om han tit cykler til en park.",
        "sentenceParts": [
          "[ ? ]",
          " Jens tit til en park?"
        ],
        "options": [
          "Cykler",
          "Kører",
          "Er",
          "Gør"
        ],
        "correct": "Cykler",
        "explanationKey": "jn_exp_jens_5",
        "explanationFallback": "Verbet \"Cykler\" står på plads 1."
      },
      {
        "situationKey": "jens_sit_6",
        "situationFallback": "📍 Situation 6: Det tager 10 minutter at cykle til parken.",
        "goalKey": "jens_trps_6_jn",
        "goalFallback": "Spørg om det tager 10 minutter.",
        "sentenceParts": [
          "[ ? ]",
          " det ti minutter?"
        ],
        "options": [
          "Tager",
          "Er",
          "Gør",
          "Koster"
        ],
        "correct": "Tager",
        "explanationKey": "jn_exp_jens_6",
        "explanationFallback": "Verbet \"Tager\" står på plads 1: \"Tager det ti minutter?\"."
      },
      {
        "situationKey": "jens_sit_7",
        "situationFallback": "📍 Situation 7: Jens cykler sammen med en ven.",
        "goalKey": "jens_trps_7_jn",
        "goalFallback": "Spørg om han cykler sammen med en ven.",
        "sentenceParts": [
          "[ ? ]",
          " Jens sammen med en ven?"
        ],
        "options": [
          "Cykler",
          "Er",
          "Kører",
          "Gør"
        ],
        "correct": "Cykler",
        "explanationKey": "jn_exp_jens_7",
        "explanationFallback": "Verbet \"Cykler\" står forrest."
      }
    ],
    "wordOrder": [
      "Hvad har Jens ikke?",
      "Har Jens en bil?",
      "Hvornår tager Jens bussen?",
      "Tager Jens bussen om eftermiddagen?",
      "Hvad bruger Jens?",
      "Bruger Jens rejsekort?",
      "Hvad kan Jens ikke lide?",
      "Kan Jens lide at køre med Metro?",
      "Hvor cykler Jens tit hen?",
      "Cykler Jens tit til en park?",
      "Hvor lang tid tager det?",
      "Tager det ti minutter?",
      "Hvem cykler Jens sammen med?",
      "Cykler Jens sammen med en ven?"
    ]
  }
];
