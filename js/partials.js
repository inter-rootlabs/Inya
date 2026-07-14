async function loadPartials() {
  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch('partials/header.html'),
      fetch('partials/footer.html')
    ]);

    const headerHtml = await headerRes.text();
    const footerHtml = await footerRes.text();

    const headerContainer = document.getElementById('site-header-container');
    const footerContainer = document.getElementById('site-footer-container');

    if (headerContainer) headerContainer.innerHTML = headerHtml;
    if (footerContainer) footerContainer.innerHTML = footerHtml;

    // Highlight active link if on menu.html
    if (window.location.pathname.includes('menu.html')) {
      const menuLink = document.querySelector('.nav-links a[href="menu.html"]');
      if (menuLink) {
        menuLink.classList.add('is-active');
      }
    }

    // Re-initialize header logic (scroll and mobile menu)
    initHeaderLogic();
  } catch (error) {
    console.error('Failed to load partials', error);
  }
}

function initHeaderLogic() {
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector("[data-progress]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (!header) return;

  // The scroll progress logic from index.html might look for navSections, which aren't on menu.html
  // So we gracefully check
  let navSections = [];
  if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
     navSections = [...navLinks].map((link) => {
         const href = link.getAttribute("href");
         if(href && href.includes('#')) {
            const id = href.split('#')[1];
            return document.getElementById(id);
         }
         return null;
     }).filter(Boolean);
  }

  function setMenuOpen(isOpen) {
    header.classList.toggle("is-menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    
    // Only update progress if elements exist
    if (progress) {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = scrollable > 0 ? window.scrollY / scrollable : 0;
        progress.style.transform = `scaleX(${Math.min(Math.max(scrolled, 0), 1)})`;
    }

    // Only update section highlights if we are on index.html
    if (navSections.length > 0) {
      const activeSection = navSections
        .filter((section) => section.getBoundingClientRect().top <= 130)
        .pop();

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if(href && href.includes('#')) {
            const id = href.split('#')[1];
            link.classList.toggle("is-active", activeSection && id === activeSection.id);
        }
      });
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      setMenuOpen(!header.classList.contains("is-menu-open"));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      setMenuOpen(false);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });
}

document.addEventListener('DOMContentLoaded', loadPartials);
