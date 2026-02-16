let quotes = [];
let API_URL = "https://quote-generator-5qei.onrender.com";

let colors = [
  "#49B587", "#FF6F61", "#FFD700", "#6A5ACD", "#FF8C00",
  "#00CED1", "#FF69B4", "#8A2BE2", "#20B2AA", "#FF4500",
  "#00FA9A", "#FF1493"
];

let darkColors = [
  "#121212", "#1E1E1E", "#2C2C2C", "#3A3A3A", "#2F4F4F",
  "#36454F", "#2E2B5F", "#4B3832", "#22313F"
];

let darkMode = false;
let usedQuotes = [];
let usedColours = [];


function newQuote() {
  if (quotes.length === 0) return;
  if (usedQuotes.length === quotes.length) {
    usedQuotes = [];
  }

  let quoteIndex = Math.floor(Math.random() * quotes.length);
    while (usedQuotes.includes(quoteIndex)) {
    quoteIndex = Math.floor(Math.random() * quotes.length);
  }
  usedQuotes.push(quoteIndex);

  let quote = quotes[quoteIndex];
  document.getElementById("quote").innerHTML =
    `"${quote.text}" <span class="author">${quote.author}</span>`;

  let quoteElem = document.getElementById("quote");
  quoteElem.classList.remove("fade"); // reset if still on
  void quoteElem.offsetWidth; 
  quoteElem.classList.add("fade");

  //background colour changing

  let palette = darkMode ? darkColors : colors;
  let randomIndex = Math.floor(Math.random() * palette.length);
    while (usedColours.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * palette.length);
    }
  usedColours.push(randomIndex);

  document.body.style.backgroundColor = palette[randomIndex];
  if(usedColours.length === palette.length) {
    usedColours = [];
  }
}

function copyQuote() {
  let quoteText = document.getElementById("quote").innerText; 
  navigator.clipboard.writeText(quoteText).then(() => {
    let copyBtn = document.getElementById("copybtn");
    let oldText = copyBtn.innerText;
    copyBtn.innerText = "Copied!";
    setTimeout(() => {
      copyBtn.innerText = oldText;
    }, 1500);
  });
}

function toggleMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode");

  let btn = document.getElementById("modeToggle");
  btn.classList.toggle("active");
  let ball = document.querySelector(".toggle-ball");

  ball.textContent = darkMode ? "🌞" : "🌙";

  document.body.style.backgroundColor = darkMode ? "#121212" : "#49B587";
}


//The category section

let selectedCategory = null;

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const isSame = selectedCategory === category;

    // Clear all active states
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));

    if (isSame) {
      // Deselect → go back to random
      selectedCategory = null;
      fetchQuotes();
    } else {
      // Select new category
      selectedCategory = category;
      btn.classList.add("active");
      fetchQuotes(category);
    }

    console.log("Selected category:", selectedCategory);
  });
});


//fetching quotes from backend

async function fetchQuotes(category = null) {
  try {
    let url = category
      ? `${API_URL}/quotes/category/${category}`
      : `${API_URL}/quotes`;

    const res = await fetch(url);
    quotes = await res.json();

    usedQuotes = []; // reset used quotes when new data loads
    usedColours = [];
    newQuote();
  } catch (err) {
    console.error("Backend not available:", err);
  }
}

fetchQuotes();


async function testAI() {
  const res = await fetch(`${API_URL}/ai-quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      category: "Motivation",
      topic: "discipline"
    })
  });

  const data = await res.json();
  console.log(data);
}
