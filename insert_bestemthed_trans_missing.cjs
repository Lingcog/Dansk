const fs = require('fs');

const newTransMissing = {
  de: {
    bestemthed_feedback_correct: "Ganz genau! 🎉",
    bestemthed_feedback_swapped: "Du hast sie verwechselt! Denk daran: Verwende beim ersten Mal 'en/et' und hänge beim nächsten Mal '-en/-et' an.",
    bestemthed_feedback_err1: "Denk daran: Wenn du das Wort zum ersten Mal erwähnst, musst du 'en/et' davor setzen",
    bestemthed_feedback_err2: "Wenn du das Wort bereits erwähnt hast, musst du '-en/-et' anhängen",
    bestemthed_feedback_missing: "Bitte wähle in beiden Sätzen eine Antwort.",
    bestemthed_label_first: "Erstes Mal (Eingeführt):",
    bestemthed_label_next: "Nächstes Mal (Bekannt):"
  },
  es: {
    bestemthed_feedback_correct: "¡Exactamente! 🎉",
    bestemthed_feedback_swapped: "¡Los confundiste! Recuerda: Usa 'en/et' la primera vez y añade '-en/-et' al final la próxima vez.",
    bestemthed_feedback_err1: "Recuerda: La primera vez que mencionas la palabra, debes poner 'en/et' delante",
    bestemthed_feedback_err2: "Cuando ya has mencionado la palabra, debes añadir '-en/-et' al final",
    bestemthed_feedback_missing: "Por favor, selecciona una respuesta en ambas oraciones.",
    bestemthed_label_first: "Primera vez (Introducido):",
    bestemthed_label_next: "Próxima vez (Conocido):"
  },
  ne: {
    bestemthed_feedback_correct: "बिल्कुल सही! 🎉",
    bestemthed_feedback_swapped: "तपाईंले तिनीहरूलाई मिलाउनुभयो! याद राख्नुहोस्: पहिलो पटक 'en/et' प्रयोग गर्नुहोस्, र अर्को पटक अन्त्यमा '-en/-et' थप्नुहोस्।",
    bestemthed_feedback_err1: "याद राख्नुहोस्: पहिलो पटक तपाईंले शब्द उल्लेख गर्दा, तपाईंले अगाडि 'en/et' राख्नु पर्छ",
    bestemthed_feedback_err2: "जब तपाईंले पहिले नै शब्द उल्लेख गरिसक्नुभयो, तपाईंले अन्त्यमा '-en/-et' थप्नु पर्छ",
    bestemthed_feedback_missing: "कृपया दुवै वाक्यमा उत्तर चयन गर्नुहोस्।",
    bestemthed_label_first: "पहिलो पटक (परिचय गरिएको):",
    bestemthed_label_next: "अर्को पटक (ज्ञात):"
  },
  pt: {
    bestemthed_feedback_correct: "Exatamente isso! 🎉",
    bestemthed_feedback_swapped: "Você confundiu! Lembre-se: Use 'en/et' da primeira vez e adicione '-en/-et' no final da próxima vez.",
    bestemthed_feedback_err1: "Lembre-se: A primeira vez que você menciona a palavra, você deve colocar 'en/et' na frente",
    bestemthed_feedback_err2: "Quando você já mencionou a palavra, deve adicionar '-en/-et' no final",
    bestemthed_feedback_missing: "Por favor, selecione uma resposta em ambas as frases.",
    bestemthed_label_first: "Primeira vez (Introduzido):",
    bestemthed_label_next: "Próxima vez (Conhecido):"
  },
  th: {
    bestemthed_feedback_correct: "ถูกต้องเลย! 🎉",
    bestemthed_feedback_swapped: "คุณสลับกัน! จำไว้: ใช้ 'en/et' ในครั้งแรก และเติม '-en/-et' ต่อท้ายในครั้งต่อไป",
    bestemthed_feedback_err1: "จำไว้: ครั้งแรกที่คุณพูดถึงคำนั้น คุณต้องวาง 'en/et' ไว้ข้างหน้า",
    bestemthed_feedback_err2: "เมื่อคุณพูดถึงคำนั้นไปแล้ว คุณต้องเติม '-en/-et' ต่อท้าย",
    bestemthed_feedback_missing: "โปรดเลือกคำตอบในทั้งสองประโยค",
    bestemthed_label_first: "ครั้งแรก (แนะนำ):",
    bestemthed_label_next: "ครั้งต่อไป (รู้จักแล้ว):"
  },
  vi: {
    bestemthed_feedback_correct: "Hoàn toàn chính xác! 🎉",
    bestemthed_feedback_swapped: "Bạn đã nhầm lẫn! Hãy nhớ: Sử dụng 'en/et' lần đầu tiên và thêm '-en/-et' vào cuối lần tiếp theo.",
    bestemthed_feedback_err1: "Hãy nhớ: Lần đầu tiên bạn nhắc đến từ đó, bạn phải đặt 'en/et' ở phía trước",
    bestemthed_feedback_err2: "Khi bạn đã nhắc đến từ đó rồi, bạn phải thêm '-en/-et' vào cuối",
    bestemthed_feedback_missing: "Vui lòng chọn một câu trả lời ở cả hai câu.",
    bestemthed_label_first: "Lần đầu tiên (Được giới thiệu):",
    bestemthed_label_next: "Lần tiếp theo (Đã biết):"
  },
  zh: {
    bestemthed_feedback_correct: "完全正确！ 🎉",
    bestemthed_feedback_swapped: "你把它们搞混了！记住：第一次使用'en/et'，下一次在末尾加上'-en/-et'。",
    bestemthed_feedback_err1: "记住：当你第一次提到这个词时，你必须把'en/et'放在前面",
    bestemthed_feedback_err2: "当你已经提到过这个词时，你必须在末尾加上'-en/-et'",
    bestemthed_feedback_missing: "请在两个句子中都选择一个答案。",
    bestemthed_label_first: "第一次（引入）：",
    bestemthed_label_next: "下一次（已知）："
  }
};

let content = fs.readFileSync('src/utils/translations.js', 'utf-8');

for (const [lang, keys] of Object.entries(newTransMissing)) {
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
