const phrases = {
  "5/21": { english: "How are you doing?", japanese: "元気ですか？" },
  "5/22": { english: "Could I have the menu?", japanese: "メニューをいただけますか？" },
  "5/23": { english: "I’d like a cup of coffee.", japanese: "コーヒーを一杯ください。" },
  "5/24": { english: "Can I sit here?", japanese: "ここに座ってもいいですか？" },
  "5/25": { english: "Where is the restroom?", japanese: "お手洗いはどこですか？" },
  "5/26": { english: "What time do you open?", japanese: "何時に開きますか？" },
  "5/27": { english: "I’m just looking, thank you.", japanese: "見ているだけです、ありがとう。" },
  "5/28": { english: "Could you take a picture of us?", japanese: "写真を撮ってもらえますか？" },
  "5/29": { english: "How much is this?", japanese: "これはいくらですか？" },
  "5/30": { english: "I’m allergic to peanuts.", japanese: "ピーナッツアレルギーです。" }
};

function populateDateSelector() {
  const selector = document.getElementById("dateSelector");
  for (const date in phrases) {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    selector.appendChild(option);
  }

  // 今日の日付があれば選択して表示
  const todayKey = `${new Date().getMonth() + 1}/${new Date().getDate()}`;
  if (phrases[todayKey]) {
    selector.value = todayKey;
    showPhrase(todayKey);
  } else {
    showPhrase(selector.value);
  }

  selector.addEventListener("change", () => {
    showPhrase(selector.value);
  });
}

function showPhrase(dateKey) {
  const phrase = phrases[dateKey] || { english: "Coming soon!", japanese: "お楽しみに！" };
  document.getElementById("date").textContent = `📅 ${dateKey}`;
  document.getElementById("english").textContent = phrase.english;
  document.getElementById("japanese").textContent = phrase.japanese;

  document.getElementById("speakButton").onclick = () => {
    speak(phrase.english);
  };
}

function speak(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

populateDateSelector();
