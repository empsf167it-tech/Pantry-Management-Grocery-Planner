document.addEventListener("DOMContentLoaded", () => {
  // Mobile Header Navigation Toggle
  const toggleButtons = document.querySelectorAll(".menu-toggle");
  toggleButtons.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const header = toggle.closest("header") || document;
      const nav = header.querySelector(".main-nav") || document.querySelector(".main-nav");
      if (nav) {
        nav.classList.toggle("open");
      }
    });
  });

  // Mobile Dashboard Sidebar Toggle (for 368px and 768px views)
  const dashMenuToggles = document.querySelectorAll(".dash-menu-toggle, .sidebar-toggle");
  const appSidebar = document.querySelector(".app-sidebar");
  if (dashMenuToggles.length > 0 && appSidebar) {
    dashMenuToggles.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        appSidebar.classList.toggle("open");
      });
    });
  }

  // Close nav / sidebar on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header") && !e.target.closest(".app-top")) {
      document.querySelectorAll(".main-nav.open").forEach((nav) => nav.classList.remove("open"));
    }
    if (appSidebar && appSidebar.classList.contains("open") && !e.target.closest(".app-sidebar") && !e.target.closest(".dash-menu-toggle") && !e.target.closest(".sidebar-toggle")) {
      appSidebar.classList.remove("open");
    }
  });

  // Dashboard Section View Switching
  const sidebarLinks = document.querySelectorAll(".app-sidebar .sidebar-section a");
  const dashViews = document.querySelectorAll(".dash-view");

  if (sidebarLinks.length > 0 && dashViews.length > 0) {
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetId = href.replace("#", "");

          // Update active link class
          sidebarLinks.forEach((l) => l.classList.remove("side-active"));
          link.classList.add("side-active");

          // Show corresponding view
          dashViews.forEach((view) => {
            if (view.id === targetId) {
              view.style.display = "block";
              view.classList.add("visible");
            } else {
              view.style.display = "none";
            }
          });

          // Close sidebar on mobile after selection
          if (appSidebar && appSidebar.classList.contains("open")) {
            appSidebar.classList.remove("open");
          }
        }
      });
    });
  }

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.08 });
    revealElements.forEach((el) => observer.observe(el));
  }

  // Password visibility toggle
  document.querySelectorAll(".show-pass").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector("input");
      if (input) {
        input.type = input.type === "password" ? "text" : "password";
        btn.textContent = input.type === "password" ? "Show" : "Hide";
      }
    });
  });

  // Auth form submissions
  document.querySelectorAll(".demo-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = form.dataset.target;
      if (target) {
        const btn = form.querySelector(".submit-btn");
        if (btn) {
          btn.textContent = "Opening workspace…";
          btn.disabled = true;
        }
        setTimeout(() => location.href = target, 500);
      }
    });
  });

  // Dashboard Item Modal
  const modal = document.getElementById("itemModal");
  const openBtns = document.querySelectorAll(".add-item-trigger");
  if (modal) {
    openBtns.forEach((btn) => {
      btn.addEventListener("click", () => modal.classList.add("open"));
    });
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    }
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
    const itemForm = document.getElementById("itemForm");
    if (itemForm) {
      itemForm.addEventListener("submit", (e) => {
        e.preventDefault();
        modal.classList.remove("open");
        openBtns.forEach((btn) => {
          const originalText = btn.textContent;
          btn.textContent = "✓ Added";
          setTimeout(() => btn.textContent = originalText, 1500);
        });
      });
    }
  }

  // Todo item checklist opacity
  document.querySelectorAll(".todo-list input").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.parentElement) {
        input.parentElement.style.opacity = input.checked ? "0.55" : "1";
      }
    });
  });

  // Back to Top Button Logic
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});