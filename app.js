async function generateCards() {
  const topic = document.getElementById("topic").value || "basic verbs";

  const res = await fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, count: 6 })
  });

  const data = await res.json();
  const cards = document.getElementById("cards");
  cards.innerHTML = "";

  data.flashcards.forEach(fc => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="front"><b>${fc.front}</b></div>
      <div class="back">${fc.back}<br><i>${fc.example}</i></div>
    `;

    div.onclick = () => {
      const back = div.querySelector(".back");
      back.style.display = back.style.display === "none" ? "block" : "none";
    };

    cards.appendChild(div);
  });
}
