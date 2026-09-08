const fs = require('fs');

const newTrans = {
  da: {
    bestemthed_feedback_correct: "Helt rigtigt! 🎉",
    bestemthed_feedback_swapped: "Du har byttet om på dem! Husk: Brug 'en/et' første gang, og sæt '-en/-et' bagpå næste gang.",
    bestemthed_feedback_err1: "Husk: Første gang du nævner ordet, skal du sætte 'en/et' foran",
    bestemthed_feedback_err2: "Når du allerede har nævnt ordet, skal du sætte '-en/-et' bagpå",
    bestemthed_feedback_missing: "Vælg venligst et svar i begge sætninger.",
    bestemthed_label_first: "Første gang (Præsenteres):",
    bestemthed_label_next: "Næste gang (Kendt):"
  },
  en: {
    bestemthed_feedback_correct: "Exactly right! 🎉",
    bestemthed_feedback_swapped: "You mixed them up! Remember: Use 'en/et' the first time, and add '-en/-et' to the end the next time.",
    bestemthed_feedback_err1: "Remember: The first time you mention the word, you must put 'en/et' in front",
    bestemthed_feedback_err2: "When you have already mentioned the word, you must add '-en/-et' to the end",
    bestemthed_feedback_missing: "Please select an answer in both sentences.",
    bestemthed_label_first: "First time (Introduced):",
    bestemthed_label_next: "Next time (Known):"
  },
  ar: {
    bestemthed_feedback_correct: "صحيح تماماً! 🎉",
    bestemthed_feedback_swapped: "لقد خلطت بينهما! تذكر: استخدم 'en/et' في المرة الأولى، وأضف '-en/-et' في النهاية في المرة القادمة.",
    bestemthed_feedback_err1: "تذكر: في المرة الأولى التي تذكر فيها الكلمة، يجب أن تضع 'en/et' في المقدمة",
    bestemthed_feedback_err2: "عندما تكون قد ذكرت الكلمة بالفعل، يجب أن تضيف '-en/-et' في النهاية",
    bestemthed_feedback_missing: "يرجى تحديد إجابة في كلتا الجملتين.",
    bestemthed_label_first: "المرة الأولى (مقدمة):",
    bestemthed_label_next: "المرة القادمة (معروفة):"
  },
  fa: {
    bestemthed_feedback_correct: "کاملا درست است! 🎉",
    bestemthed_feedback_swapped: "آنها را با هم اشتباه گرفتید! به یاد داشته باشید: بار اول از 'en/et' استفاده کنید و دفعه بعد '-en/-et' را به انتها اضافه کنید.",
    bestemthed_feedback_err1: "به یاد داشته باشید: اولین باری که کلمه را ذکر می کنید، باید 'en/et' را در جلو قرار دهید",
    bestemthed_feedback_err2: "هنگامی که قبلا کلمه را ذکر کرده اید، باید '-en/-et' را به انتها اضافه کنید",
    bestemthed_feedback_missing: "لطفا در هر دو جمله یک پاسخ را انتخاب کنید.",
    bestemthed_label_first: "بار اول (معرفی شده):",
    bestemthed_label_next: "دفعه بعد (شناخته شده):"
  },
  pl: {
    bestemthed_feedback_correct: "Dokładnie tak! 🎉",
    bestemthed_feedback_swapped: "Pomyliłeś je! Pamiętaj: użyj 'en/et' za pierwszym razem, a następnym razem dodaj '-en/-et' na końcu.",
    bestemthed_feedback_err1: "Pamiętaj: gdy po raz pierwszy wspominasz o słowie, musisz wstawić 'en/et' na początku",
    bestemthed_feedback_err2: "Gdy już wspomniałeś o słowie, musisz dodać '-en/-et' na końcu",
    bestemthed_feedback_missing: "Wybierz odpowiedź w obu zdaniach.",
    bestemthed_label_first: "Pierwszy raz (Wprowadzenie):",
    bestemthed_label_next: "Następny raz (Znane):"
  },
  ti: {
    bestemthed_feedback_correct: "ልክ እዩ! 🎉",
    bestemthed_feedback_swapped: "ኣደናጊርካዮም! ዘክር: ኣብ ፈላማይ እዋን 'en/et' ተጠቐም፣ ኣብ ዝቕጽል እዋን ድማ '-en/-et' ኣብ መወዳእታ ወስኽ።",
    bestemthed_feedback_err1: "ዘክር: ነቲ ቃል ንፈለማ እዋን ክትጠቅሶ ኸለኻ 'en/et' ኣብ ቅድሚት ክትገብር ኣለካ",
    bestemthed_feedback_err2: "ነቲ ቃል ድሮ ምስ ጠቐስካዮ '-en/-et' ኣብ መወዳእታ ክትውስኽ ኣለካ",
    bestemthed_feedback_missing: "በጃኹም ኣብ ክልቲኡ ምሉእ ሓሳባት መልሲ ምረጹ።",
    bestemthed_label_first: "ፈላማይ እዋን (ዝተተኣታተወ):",
    bestemthed_label_next: "ዝቕጽል እዋን (ዝፍለጥ):"
  },
  so: {
    bestemthed_feedback_correct: "Aad bay u saxan tahay! 🎉",
    bestemthed_feedback_swapped: "Waad isku qasday! Xusuusnow: Isticmaal 'en/et' markii ugu horreysay, markaas ku dar '-en/-et' dhamaadka marka xigta.",
    bestemthed_feedback_err1: "Xusuusnow: Marka ugu horreysa ee aad sheegto erayga, waa inaad hordhigtaa 'en/et'",
    bestemthed_feedback_err2: "Markaad hore u sheegtay erayga, waa inaad ku dartaa '-en/-et' dhamaadka",
    bestemthed_feedback_missing: "Fadlan dooro jawaab labada jumlado.",
    bestemthed_label_first: "Markii ugu horreysay (Hordhac):",
    bestemthed_label_next: "Marka xigta (La yaqaan):"
  },
  uk: {
    bestemthed_feedback_correct: "Абсолютно вірно! 🎉",
    bestemthed_feedback_swapped: "Ви їх переплутали! Пам'ятайте: використовуйте 'en/et' першого разу, а наступного разу додавайте '-en/-et' в кінці.",
    bestemthed_feedback_err1: "Пам'ятайте: коли ви вперше згадуєте слово, ви повинні поставити 'en/et' на початку",
    bestemthed_feedback_err2: "Коли ви вже згадали слово, ви повинні додати '-en/-et' в кінці",
    bestemthed_feedback_missing: "Будь ласка, виберіть відповідь в обох реченнях.",
    bestemthed_label_first: "Перший раз (Представлено):",
    bestemthed_label_next: "Наступного разу (Відомо):"
  },
  ru: {
    bestemthed_feedback_correct: "Совершенно верно! 🎉",
    bestemthed_feedback_swapped: "Вы их перепутали! Помните: используйте 'en/et' в первый раз, а в следующий раз добавляйте '-en/-et' в конце.",
    bestemthed_feedback_err1: "Помните: когда вы впервые упоминаете слово, вы должны поставить 'en/et' перед ним",
    bestemthed_feedback_err2: "Когда вы уже упомянули слово, вы должны добавить '-en/-et' в конце",
    bestemthed_feedback_missing: "Пожалуйста, выберите ответ в обоих предложениях.",
    bestemthed_label_first: "Первый раз (Представлено):",
    bestemthed_label_next: "В следующий раз (Известно):"
  },
  sw: {
    bestemthed_feedback_correct: "Sahihi kabisa! 🎉",
    bestemthed_feedback_swapped: "Umechanganya! Kumbuka: Tumia 'en/et' mara ya kwanza, na uongeze '-en/-et' mwishoni mara inayofuata.",
    bestemthed_feedback_err1: "Kumbuka: Mara ya kwanza unapotaja neno, lazima uweke 'en/et' mbele",
    bestemthed_feedback_err2: "Wakati tayari umetaja neno, lazima uongeze '-en/-et' mwishoni",
    bestemthed_feedback_missing: "Tafadhali chagua jibu katika sentensi zote mbili.",
    bestemthed_label_first: "Mara ya kwanza (Imetambulishwa):",
    bestemthed_label_next: "Mara inayofuata (Inajulikana):"
  },
  ro: {
    bestemthed_feedback_correct: "Exact! 🎉",
    bestemthed_feedback_swapped: "Le-ai încurcat! Reține: Folosește 'en/et' prima dată, și adaugă '-en/-et' la sfârșit data viitoare.",
    bestemthed_feedback_err1: "Reține: Prima dată când menționezi cuvântul, trebuie să pui 'en/et' în față",
    bestemthed_feedback_err2: "Când ai menționat deja cuvântul, trebuie să adaugi '-en/-et' la sfârșit",
    bestemthed_feedback_missing: "Te rog selectează un răspuns în ambele propoziții.",
    bestemthed_label_first: "Prima dată (Introdus):",
    bestemthed_label_next: "Data viitoare (Cunoscut):"
  },
  tr: {
    bestemthed_feedback_correct: "Kesinlikle doğru! 🎉",
    bestemthed_feedback_swapped: "Onları karıştırdın! Unutma: İlk seferde 'en/et' kullan, bir dahaki sefere sona '-en/-et' ekle.",
    bestemthed_feedback_err1: "Unutma: Kelimeden ilk bahsettiğinde önüne 'en/et' koymalısın",
    bestemthed_feedback_err2: "Kelimeden daha önce bahsettiysen, sonuna '-en/-et' eklemelisin",
    bestemthed_feedback_missing: "Lütfen her iki cümlede de bir cevap seçin.",
    bestemthed_label_first: "İlk sefer (Tanıtılan):",
    bestemthed_label_next: "Bir dahaki sefere (Bilinen):"
  },
  ku: {
    bestemthed_feedback_correct: "Tevahî rast e! 🎉",
    bestemthed_feedback_swapped: "Te ew tevlîhev kirin! Bîr bîne: Cara yekem 'en/et' bi kar bîne, û cara pêşîn '-en/-et' li dawiyê zêde bike.",
    bestemthed_feedback_err1: "Bîr bîne: Cara yekem ku tu qala peyvê dikî, divê tu 'en/et' li pêşiyê deynî",
    bestemthed_feedback_err2: "Dema ku te berê qala peyvê kiribe, divê tu '-en/-et' li dawiyê zêde bikî",
    bestemthed_feedback_missing: "Ji kerema xwe di her du hevokan de bersivek hilbijêre.",
    bestemthed_label_first: "Cara yekem (Tê naskirin):",
    bestemthed_label_next: "Cara pêşîn (Tê zanîn):"
  },
  ps: {
    bestemthed_feedback_correct: "بیخي سمه ده! 🎉",
    bestemthed_feedback_swapped: "تا ګډوډ کړل! په یاد ولرئ: لومړی ځل 'en/et' وکاروئ، او بل ځل په پای کې '-en/-et' اضافه کړئ.",
    bestemthed_feedback_err1: "په یاد ولرئ: کله چې تاسو لومړی ځل د کلمې یادونه کوئ، تاسو باید په مخکې کې 'en/et' واچوئ",
    bestemthed_feedback_err2: "کله چې تاسو دمخه د کلمې یادونه کړې وي، تاسو باید په پای کې '-en/-et' اضافه کړئ",
    bestemthed_feedback_missing: "مهرباني وکړئ په دواړو جملو کې یو ځواب وټاکئ.",
    bestemthed_label_first: "لومړی ځل (معرفي شوی):",
    bestemthed_label_next: "بل ځل (پیژندل شوی):"
  },
  ur: {
    bestemthed_feedback_correct: "بالکل درست! 🎉",
    bestemthed_feedback_swapped: "آپ نے انہیں ملا دیا! یاد رکھیں: پہلی بار 'en/et' استعمال کریں، اور اگلی بار آخر میں '-en/-et' شامل کریں۔",
    bestemthed_feedback_err1: "یاد رکھیں: جب آپ پہلی بار لفظ کا ذکر کرتے ہیں، تو آپ کو شروع میں 'en/et' لگانا ہوگا",
    bestemthed_feedback_err2: "جب آپ پہلے ہی لفظ کا ذکر کر چکے ہیں، تو آپ کو آخر میں '-en/-et' شامل کرنا ہوگا",
    bestemthed_feedback_missing: "براہ کرم دونوں جملوں میں ایک جواب منتخب کریں۔",
    bestemthed_label_first: "پہلی بار (متعارف کرایا گیا):",
    bestemthed_label_next: "اگلی بار (معلوم):"
  },
  ckb: {
    bestemthed_feedback_correct: "تەواو ڕاستە! 🎉",
    bestemthed_feedback_swapped: "تێکەڵت کردن! بیرت بێت: جاری یەکەم 'en/et' بەکاربهێنە، وە جاری داهاتوو '-en/-et' بخەرە کۆتاییەکەی.",
    bestemthed_feedback_err1: "بیرت بێت: یەکەم جار کە باسی وشەکە دەکەیت، دەبێت 'en/et' لە پێشەوە دابنێیت",
    bestemthed_feedback_err2: "کاتیك پێشتر باسی وشەکەت کردووە، دەبێت '-en/-et' بخەیتە کۆتاییەکەی",
    bestemthed_feedback_missing: "تکایە وەڵامێک لە هەردوو ڕستەکەدا هەڵبژێرە.",
    bestemthed_label_first: "جاری یەکەم (ناسێندراو):",
    bestemthed_label_next: "جاری داهاتوو (زانراو):"
  }
};

let content = fs.readFileSync('src/utils/translations.js', 'utf-8');

for (const [lang, keys] of Object.entries(newTrans)) {
  const matchStr = `  ${lang}: {\n`;
  if (content.includes(matchStr)) {
    let toInsert = '';
    for (const [key, val] of Object.entries(keys)) {
      toInsert += `    "${key}": "${val.replace(/"/g, '\\"')}",\n`;
    }
    content = content.replace(matchStr, matchStr + toInsert);
  } else {
      console.log('Could not find lang:', lang);
  }
}

fs.writeFileSync('src/utils/translations.js', content, 'utf-8');
console.log('Translations added successfully!');
