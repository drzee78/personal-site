document.getElementById("year").textContent = new Date().getFullYear();

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const stored = localStorage.getItem("theme");

if (stored) {
  root.setAttribute("data-theme", stored);
}

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  const next = isDark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

const gameBox = document.getElementById("game-box");
const gameResult = document.getElementById("game-result");
let gameState = "idle";
let readyAt = 0;
let waitTimer = null;
let bestTime = Number(localStorage.getItem("bestReactionTime")) || null;

if (bestTime) {
  gameResult.textContent = `Best: ${bestTime} ms`;
}

function setGameState(state, label) {
  gameState = state;
  gameBox.className = `game-box game-${state}`;
  gameBox.textContent = label;
}

gameBox.addEventListener("click", () => {
  if (gameState === "idle" || gameState === "result") {
    setGameState("waiting", "Wait for green...");
    const delay = 1000 + Math.random() * 2000;
    waitTimer = setTimeout(() => {
      readyAt = Date.now();
      setGameState("ready", "Click!");
    }, delay);
    return;
  }

  if (gameState === "waiting") {
    clearTimeout(waitTimer);
    setGameState("early", "Too soon! Click to try again");
    gameState = "result";
    return;
  }

  if (gameState === "ready") {
    const reactionTime = Date.now() - readyAt;
    if (!bestTime || reactionTime < bestTime) {
      bestTime = reactionTime;
      localStorage.setItem("bestReactionTime", String(bestTime));
    }
    gameResult.textContent = `${reactionTime} ms (best: ${bestTime} ms)`;
    setGameState("idle", "Click to try again");
    gameState = "result";
  }
});
