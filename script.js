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
