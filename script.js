/* =========================================================
   PORTFOLIO WEBSITE SCRIPT
   Author: Shivam Singh
========================================================= */

/* =========================================================
   DOM ELEMENTS
========================================================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const revealElements = document.querySelectorAll(".reveal");

const scrollProgress = document.querySelector(".scroll-progress");

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navbar = document.querySelector(".navbar");

const typingElement = document.querySelector(".typing-text");

/* =========================================================
   TYPING EFFECT
========================================================= */
const typingTexts = [
    "MERN Stack Developer",
    "Backend-Focused Engineer",
    "Full Stack Developer + AI",
    "REST API Architect",
    "Database & Systems Builder",
    "Backend · APIs · AI Integration",
    "Turning Ideas into Products"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentText = typingTexts[textIndex];

    if (!isDeleting) {

        typingElement.textContent =
            currentText.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentText.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1600);

            return;
        }

    } else {

        typingElement.textContent =
            currentText.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            textIndex++;

            if (textIndex >= typingTexts.length) {
                textIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

if (typingElement) {
    typeEffect();
}

/* =========================================================
   ACTIVE NAVIGATION HIGHLIGHT
========================================================= */
function activeNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href").includes(currentSection)
        ) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", activeNavigation);

/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */
function revealOnScroll() {

    const triggerBottom =
        window.innerHeight * 0.88;

    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* =========================================================
   SCROLL PROGRESS BAR
========================================================= */
function updateScrollProgress() {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrollPercent =
        (scrollTop / scrollHeight) * 100;

    scrollProgress.style.width =
        `${scrollPercent}%`;

}

window.addEventListener(
    "scroll",
    updateScrollProgress
);

/* =========================================================
   SMOOTH NAVIGATION CLICK
========================================================= */
navLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const targetId =
            link.getAttribute("href");

        const targetSection =
            document.querySelector(targetId);

        if (!targetSection) return;

        window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: "smooth"
        });

    });

});

/* =========================================================
   MOBILE MENU TOGGLE
========================================================= */

if (mobileMenuBtn && navbar) {

    mobileMenuBtn.addEventListener("click", () => {

        navbar.classList.toggle("mobile-active");

        const icon = mobileMenuBtn.querySelector("i");

        if (icon) {
            if (navbar.classList.contains("mobile-active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }

    });

}

/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */

if (mobileMenuBtn && navbar) {

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("mobile-active");

            const icon = mobileMenuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });

}

/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */
navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("mobile-active");

        const icon =
            mobileMenuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});

/* =========================================================
   PARALLAX EFFECT
========================================================= */
window.addEventListener("scroll", () => {

    const scrolled = window.pageYOffset;

    document.body.style.backgroundPositionY =
        `${scrolled * 0.05}px`;

});

/* =========================================================
   CARD HOVER GLOW EFFECT
========================================================= */
const cards =
    document.querySelectorAll(".glass-card");

cards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        card.style.background =
            `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(100,255,218,0.10),
                rgba(17,25,40,0.78) 40%
            )
            `;
    });

    card.addEventListener("mouseleave", () => {

        card.style.background =
            "rgba(17, 25, 40, 0.75)";

    });

});

/* =========================================================
   INTERSECTION OBSERVER
   PERFORMANCE OPTIMIZED REVEALS
========================================================= */
const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach(element => {
    observer.observe(element);
});

/* =========================================================
   RESUME DOWNLOAD BUTTON
========================================================= */
const resumeButton =
    document.querySelector(".primary-btn");

if (resumeButton) {

    resumeButton.addEventListener(
        "click",
        event => {

            /*
                Replace with actual resume path:
                assets/resume/resume.pdf
            */

            console.log(
                "Resume download initiated."
            );

        }
    );

}

/* =========================================================
   DYNAMIC CURRENT YEAR
========================================================= */
const footer =
    document.querySelector(".footer p");

if (footer) {

    const year = new Date().getFullYear();

    footer.innerHTML =
        `Designed & Developed by Shivam Singh © ${year}`;

}

/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape" && navbar) {

        navbar.classList.remove("mobile-active");

        const icon = mobileMenuBtn?.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    }

});
/* =========================================================
   PAGE LOADED ANIMATION
========================================================= */
window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* =========================================================
   PERFORMANCE:
   PASSIVE SCROLL LISTENERS
========================================================= */
window.addEventListener(
    "scroll",
    () => {},
    { passive: true }
);

/* =========================================================
   SCROLL TO TOP BUTTON
========================================================= */

const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {

    window.addEventListener("scroll", () => {

        scrollBtn.classList.toggle(
            "show",
            window.scrollY > 300
        );

    }, { passive: true });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// =========================================================
// EXPERIENCE: READ MORE TOGGLE
// =========================================================
(function () {
  const toggleBtn = document.getElementById("experience-toggle");
  const moreBox = document.getElementById("experience-more");

  if (!toggleBtn || !moreBox) return;

  const label = toggleBtn.querySelector(".read-more-text");

  toggleBtn.addEventListener("click", function () {
    const isOpen = moreBox.classList.toggle("open");

    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    label.textContent = isOpen ? "Show less" : "Read more";

    // When collapsing, bring the card back into view
    if (!isOpen) {
      toggleBtn
        .closest(".timeline-item")
        .scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
})();