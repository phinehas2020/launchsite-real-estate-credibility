const header = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.getElementById("site-navigation");
const revealNodes = document.querySelectorAll(".reveal");
const yearNode = document.querySelector("[data-year]");

const closeMenu = () => {
  if (!header || !menuToggle) return;
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
};

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if (header) {
  const updateHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

if (menuToggle && header && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (!header.classList.contains("menu-open")) return;
    if (header.contains(target)) return;
    closeMenu();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 959) {
      closeMenu();
    }
  });
}

if (revealNodes.length) {
  const revealOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.16,
      rootMargin: "0px 0px -7% 0px",
    },
  );

  revealNodes.forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 34, 230)}ms`;
    revealOnScroll.observe(node);
  });
}
