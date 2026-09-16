// Mobile nav toggle
const navToggle = document.getElementById("nav-toggle");
const mobileNav = document.getElementById("mobile-nav");
if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("is-open");
  });
  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mobileNav.classList.remove("is-open"));
  });
}

// "Build the Arc" — each step lights up as it scrolls into view.
const arcSteps = document.querySelectorAll(".arc-step");
if (arcSteps.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.4 }
  );
  arcSteps.forEach((step) => observer.observe(step));
} else {
  arcSteps.forEach((step) => step.classList.add("is-visible"));
}
