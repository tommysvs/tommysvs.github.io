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
    heroSubtitle: "SAP Consultant | Systems Analyst",
    discoverMore: "Discover more",
    contact: "Contact me:",
    credits: "Made with ❤️ by",
    close: "Close",
    aboutTitle: "About Me",
    aboutDescription: "Hi! I'm Tommy Vega, a SAP consultant and systems analyst passionate about technology, innovation, and continuous improvement. I specialize in finding efficient and creative solutions for business challenges, combining technical skills with a strategic vision.",
    aboutExp1: "5+ years of experience in SAP consulting and systems analysis.",
    aboutExp2: "Passionate about continuous learning and teamwork.",
    aboutExp3: "Focused on results, quality, and customer satisfaction.",
    contactMe: "Contact Me",
  },
  es: {
    about: "Sobre mí",
    skills: "Habilidades",
    experience: "Experiencia",
    education: "Educación",
    heroTitle: "¡Hola, soy Tommy!",
    heroSubtitle: "Consultor de SAP | Analista de Sistemas",
    discoverMore: "Descubre más",
    contact: "Contáctame:",
    credits: "Hecho con ❤️ por",
    close: "Cerrar",
    aboutTitle: "Sobre mí",
    aboutDescription: "¡Hola! Soy Tommy Vega, consultor SAP y analista de sistemas con pasión por la tecnología, la innovación y la mejora continua. Me especializo en encontrar soluciones eficientes y creativas para los desafíos de negocio, combinando habilidades técnicas con una visión estratégica.",
    aboutExp1: "+5 años de experiencia en consultoría SAP y análisis de sistemas.",
    aboutExp2: "Apasionado por el aprendizaje constante y la colaboración en equipo.",
    aboutExp3: "Enfocado en resultados, calidad y satisfacción del cliente.",
    contactMe: "Contáctame",
  }
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

document.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const content = document.getElementById('hero-content');
  if (!hero || !content) return;
  const scrolled = window.scrollY;
  const heroRect = hero.getBoundingClientRect();
  if (heroRect.bottom > 0) {
    content.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});