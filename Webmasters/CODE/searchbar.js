const qs = q => { return document.querySelector(q); };
const qsa = q => { return document.querySelectorAll(q); };

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

function search() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  if (!input) return;

  const words = input.split(" ").filter(Boolean);
  const sections = document.querySelectorAll("[data-search]");

  let bestMatch = null;
  let bestScore = Infinity;

  sections.forEach(section => {
    const keywords = section.dataset.search.split(" ");

    words.forEach(word => {
      keywords.forEach(keyword => {
        const score = levenshtein(word, keyword);
        if (score < bestScore) {
          bestScore = score;
          bestMatch = section;
        }
      });
    });
  });

  if (bestMatch && bestScore <= 3) {
    bestMatch.scrollIntoView({ behavior: "smooth", block: "start" });

    bestMatch.classList.add("highlight");
    setTimeout(() => bestMatch.classList.remove("highlight"), 1500);
  }
}

// Button click
// qs("#searchBtn").addEventListener("click", search);

// Enter key support
document.getElementById("searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    search();
  }
});

// Button click
qs("#searchBtn").addEventListener("click", search);

