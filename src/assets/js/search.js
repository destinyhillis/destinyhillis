// Basic client-side search
(function () {
  const toggle = document.querySelector(".search-toggle");
  const bar = document.querySelector(".search-bar");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");

  if (!toggle || !bar || !input || !results) return;

  let index = null;

  toggle.addEventListener("click", () => {
    const isHidden = bar.hasAttribute("hidden");
    if (isHidden) {
      bar.removeAttribute("hidden");
      input.focus();
      if (!index) loadIndex();
    } else {
      bar.setAttribute("hidden", "");
    }
  });

  toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle.click();
    }
  });

  async function loadIndex() {
    try {
      const res = await fetch("/search-index.json");
      index = await res.json();
    } catch {
      results.innerHTML = "<li>Could not load search index.</li>";
    }
  }

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    results.innerHTML = "";

    if (!index || query.length < 2) return;

    const matches = index.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)))
    );

    if (matches.length === 0) {
      results.innerHTML = "<li>No results.</li>";
      return;
    }

    for (const m of matches.slice(0, 10)) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = m.url;
      a.textContent = m.title;
      li.appendChild(a);
      results.appendChild(li);
    }
  });
})();
