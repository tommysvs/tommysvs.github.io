document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      const rect = link.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
  
      if (mouseX < rect.width / 2) {
        link.classList.add('hover-left');
        link.classList.remove('hover-right');
      } else {
        link.classList.add('hover-right');
        link.classList.remove('hover-left');
      }
    });
  
    link.addEventListener('mouseleave', () => {
      link.classList.remove('hover-left', 'hover-right');
    });
  });

const translations = {
  en: {
    about: "About Me",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    heroTitle: "Hi, I'm Tommy!",
    heroSubtitle: "Developer | Systems Analyst",
    discoverMore: "Discover More",
    contact: "Contact me:",
    credits: "Made with ❤️ by",
  },
  es: {
    about: "Sobre mí",
    skills: "Habilidades",
    experience: "Experiencia",
    education: "Educación",
    heroTitle: "¡Hola, soy Tommy!",
    heroSubtitle: "Desarrollador | Analista de Sistemas",
    discoverMore: "Descubre más",
    contact: "Contáctame:",
    credits: "Hecho con ❤️ por",
  },
};

function updateFooterLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");

    if (key === "contact") {
      const emailLink = el.querySelector("a");
      el.innerHTML = `${translations[lang][key]} `;
      if (emailLink) {
        el.appendChild(emailLink);
      }
    } else {
      el.textContent = translations[lang][key];
    }
  });
}

const languageSwitcher = document.getElementById("language-switcher");
let currentLanguage = "en";

document.addEventListener("DOMContentLoaded", () => {
  updateLanguage();
  languageSwitcher.textContent = currentLanguage.toUpperCase();
});

languageSwitcher.addEventListener("click", () => {
  currentLanguage = currentLanguage === "es" ? "en" : "es";
  updateLanguage();
  languageSwitcher.textContent = currentLanguage.toUpperCase();
});

function updateLanguage() {
  document.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.getAttribute("data-lang");
    element.textContent = translations[currentLanguage][key];
  });

  document.querySelector(".hero h1").textContent =
    translations[currentLanguage].heroTitle;
  document.querySelector(".hero p").textContent =
    translations[currentLanguage].heroSubtitle;
  document.querySelector(".hero a").textContent =
    translations[currentLanguage].discoverMore;
}

updateLanguage();

const navbar = document.getElementById("navbar");
const navbarContent = document.getElementById("navbar-content");
const menuIcon = document.getElementById("menu-icon");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("bg-opacity-80", "px-1", "py-1");
    navbarContent.classList.add("hidden");
    menuIcon.classList.remove("hidden");
  } else {
    navbar.classList.remove("bg-opacity-80", "px-2", "py-2");
    navbarContent.classList.remove("hidden");
    menuIcon.classList.add("hidden");
  }
});