// Renders the "Builder of the Week" spotlight and the searchable/filterable
// Builder Directory grid from the BUILDERS dataset (builders-data.js).
(() => {
  if (typeof BUILDERS === "undefined") return;

  // ---------- Builder of the Week: deterministic weekly rotation ----------
  // No backend, so "weekly" is computed client-side from the ISO week
  // number — same pick for everyone, changes every Monday, no manual
  // update needed. Pool is every high-evidence entry with at least one
  // verified thing it's actually building.
  function isoWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  function pickBuilderOfTheWeek() {
    const pool = BUILDERS.filter((b) => b.evidence === "high" && b.building.length > 0);
    if (pool.length === 0) return null;
    const week = isoWeek(new Date());
    return pool[week % pool.length];
  }

  function renderSpotlight(builder) {
    const nameEl = document.getElementById("spotlight-name");
    const cardEl = document.getElementById("spotlight-card");
    if (!nameEl || !cardEl) return;
    if (!builder) {
      nameEl.textContent = "Coming soon";
      cardEl.innerHTML = "";
      return;
    }
    nameEl.textContent = builder.name;
    const linkHtml = builder.website
      ? `<a class="btn btn-ghost" href="${builder.website}" target="_blank" rel="noopener">Visit ${hostnameOf(builder.website)} →</a>`
      : "";
    cardEl.innerHTML = `
      <div class="spotlight-body">
        <span class="spotlight-tag">${escapeHtml(builder.category)}</span>
        <p class="spotlight-desc">${buildingListSentence(builder)}</p>
        <p class="spotlight-why"><strong>Why we picked them:</strong> ${escapeHtml(builder.notes)}</p>
        ${linkHtml}
      </div>
    `;
  }

  function buildingListSentence(b) {
    if (b.building.length === 0) return escapeHtml(b.notes);
    return "Building: " + b.building.map(escapeHtml).join(" · ") + ".";
  }

  function hostnameOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (err) {
      return url;
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // ---------- Directory: search + category filter ----------
  const STAGE_LABEL = { live: "Live", building: "Building", public: "Public" };

  function renderFilters() {
    const wrap = document.getElementById("directory-filters");
    if (!wrap) return;
    const buckets = [...new Set(BUILDERS.map((b) => b.bucket))].sort();
    const chips = ["All", ...buckets];
    wrap.innerHTML = chips
      .map((c, i) => `<button type="button" class="filter-chip${i === 0 ? " is-active" : ""}" data-bucket="${escapeHtml(c)}">${escapeHtml(c)}</button>`)
      .join("");
    Array.from(wrap.querySelectorAll(".filter-chip")).forEach((chip) => {
      chip.addEventListener("click", () => {
        Array.from(wrap.querySelectorAll(".filter-chip")).forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        applyFilters();
      });
    });
  }

  function cardHtml(b) {
    const tags = b.building.slice(0, 3).map((t) => `<span class="directory-card-feat">${escapeHtml(t)}</span>`).join("");
    const stageClass = `stage-${b.stageGroup}`;
    const inner = `
      <span class="directory-card-top">
        <span class="directory-card-name">${escapeHtml(b.name)}</span>
        <span class="directory-card-stage ${stageClass}">${STAGE_LABEL[b.stageGroup]}</span>
      </span>
      <span class="directory-card-tag">${escapeHtml(b.category)}</span>
      ${tags ? `<div class="directory-card-feats">${tags}</div>` : ""}
    `;
    return b.website
      ? `<a class="directory-card" href="${b.website}" target="_blank" rel="noopener">${inner}</a>`
      : `<div class="directory-card directory-card-nolink">${inner}</div>`;
  }

  function applyFilters() {
    const grid = document.getElementById("directory-grid");
    const empty = document.getElementById("directory-empty");
    const countEl = document.getElementById("directory-count");
    const searchEl = document.getElementById("directory-search");
    const search = (searchEl ? searchEl.value : "").trim().toLowerCase();
    const activeChip = document.querySelector(".filter-chip.is-active");
    const bucket = activeChip ? activeChip.dataset.bucket : "All";

    const filtered = BUILDERS.filter((b) => {
      const matchesBucket = bucket === "All" || b.bucket === bucket;
      const haystack = (b.name + " " + b.category + " " + b.building.join(" ")).toLowerCase();
      const matchesSearch = !search || haystack.includes(search);
      return matchesBucket && matchesSearch;
    });

    if (grid) grid.innerHTML = filtered.map(cardHtml).join("");
    if (empty) empty.style.display = filtered.length ? "none" : "block";
    if (countEl) countEl.textContent = `${filtered.length} of ${BUILDERS.length} projects`;
  }

  renderSpotlight(pickBuilderOfTheWeek());
  renderFilters();
  applyFilters();

  const searchInput = document.getElementById("directory-search");
  if (searchInput) searchInput.addEventListener("input", applyFilters);
})();
