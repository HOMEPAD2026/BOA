// ---------- "Build on Arc" nav dropdown ----------
const navDropdown = document.getElementById("nav-dropdown");
const navDropdownTrigger = document.getElementById("nav-dropdown-trigger");
let openBuildDropdown = () => {};
if (navDropdown && navDropdownTrigger) {
  const closeDropdown = () => {
    navDropdown.classList.remove("is-open");
    navDropdownTrigger.setAttribute("aria-expanded", "false");
  };
  const openDropdown = () => {
    navDropdown.classList.add("is-open");
    navDropdownTrigger.setAttribute("aria-expanded", "true");
  };
  openBuildDropdown = openDropdown;
  navDropdownTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const willOpen = !navDropdown.classList.contains("is-open");
    navDropdown.classList.toggle("is-open", willOpen);
    navDropdownTrigger.setAttribute("aria-expanded", String(willOpen));
  });
  document.addEventListener("click", (e) => {
    if (!navDropdown.contains(e.target)) closeDropdown();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });
}

// ---------- Floating utility dock ----------
// Live items (Directory, Spotlight) are real <a> links and navigate
// normally. The still-under-construction items are <button>s with
// nowhere to go yet — tapping one scrolls up and opens the "Build on
// Arc" panel instead of doing nothing.
const dockPendingItems = document.querySelectorAll("button.dock-item");
if (dockPendingItems.length) {
  dockPendingItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      window.scrollTo({ top: 0, behavior: "smooth" });
      openBuildDropdown();
    });
  });
}

// ---------- Scroll reveal: every .reveal section, plus the Build-the-Arc steps ----------
// Progressive enhancement: sections are visible by default (see .reveal in
// style.css — no opacity:0 there), and only get hidden-then-fade-in via the
// .reveal-pending class added here, right before observing. If JS fails to
// run at all, the page still shows everything instead of staying blank.
const revealTargets = document.querySelectorAll(".reveal, .arc-step");
if (revealTargets.length && "IntersectionObserver" in window) {
  revealTargets.forEach((el) => el.classList.add("reveal-pending"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.2 }
  );
  revealTargets.forEach((el) => observer.observe(el));
}

// ---------- Copy contract address ----------
const copyBtn = document.getElementById("copy-ca-btn");
const caEl = document.getElementById("token-ca");
if (copyBtn && caEl) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(caEl.textContent.trim());
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("is-copied");
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("is-copied");
      }, 1600);
    } catch (err) {
      console.error("BOA: failed to copy CA", err);
    }
  });
}

// ---------- Mini game: Tap to Build ----------
(() => {
  const tapBtn = document.getElementById("game-tap");
  const tower = document.getElementById("game-tower");
  const timeEl = document.getElementById("game-time");
  const scoreEl = document.getElementById("game-score");
  const bestEl = document.getElementById("game-best");
  const hintEl = document.getElementById("game-hint");
  const resultEl = document.getElementById("game-result");
  if (!tapBtn) return;

  const DURATION = 10;
  const BEST_KEY = "boa_game_best";
  let active = false;
  let score = 0;
  let timeLeft = DURATION;
  let timer = null;

  const milestoneMessage = (n) => {
    if (n >= 60) return "Legendary builder.";
    if (n >= 40) return "That's a skyscraper.";
    if (n >= 25) return "Solid foundation.";
    if (n >= 10) return "Nice work, builder.";
    return "Every build starts small.";
  };

  const best = Number(localStorage.getItem(BEST_KEY) || 0);
  if (bestEl) bestEl.textContent = String(best);

  function reset() {
    score = 0;
    timeLeft = DURATION;
    if (scoreEl) scoreEl.textContent = "0";
    if (timeEl) timeEl.textContent = String(DURATION);
    if (tower) tower.innerHTML = "";
    if (resultEl) resultEl.textContent = "";
  }

  function start() {
    reset();
    active = true;
    if (hintEl) hintEl.textContent = "Go!";
    timer = setInterval(() => {
      timeLeft -= 1;
      if (timeEl) timeEl.textContent = String(Math.max(0, timeLeft));
      if (timeLeft <= 0) end();
    }, 1000);
  }

  function end() {
    active = false;
    clearInterval(timer);
    if (hintEl) hintEl.textContent = "Tap to build again";
    const currentBest = Number(localStorage.getItem(BEST_KEY) || 0);
    if (score > currentBest) {
      localStorage.setItem(BEST_KEY, String(score));
      if (bestEl) bestEl.textContent = String(score);
      if (resultEl) resultEl.textContent = `New best: ${score} bricks! ${milestoneMessage(score)}`;
    } else if (resultEl) {
      resultEl.textContent = `You built ${score} bricks. ${milestoneMessage(score)}`;
    }
  }

  function tap() {
    if (!active) {
      start();
      return;
    }
    score += 1;
    if (scoreEl) scoreEl.textContent = String(score);

    tapBtn.classList.add("tapped");
    setTimeout(() => tapBtn.classList.remove("tapped"), 90);

    if (tower) {
      const brick = document.createElement("div");
      brick.className = "game-brick";
      tower.appendChild(brick);
      // Cap the DOM so a long session doesn't pile up hundreds of nodes.
      while (tower.children.length > 60) tower.removeChild(tower.firstChild);
    }
  }

  tapBtn.addEventListener("click", (e) => {
    e.preventDefault();
    tap();
  });
})();
