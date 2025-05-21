window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader-overlay');
    if (loader) {
      loader.classList.add('opacity-0');
      loader.classList.add('-translate-y-10');
      loader.style.pointerEvents = 'none';
      setTimeout(() => loader.remove(), 700);
    }
  }, 3000);
});

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
    credits: "Made with ❤️ by Tommy Vega",
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
    credits: "Hecho con ❤️ por Tommy Vega",
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

document.addEventListener('scroll', () => {
  document.querySelectorAll('section').forEach(section => {
    const content = section.querySelector('div, .section-content, .max-w-4xl, #hero-content');
    if (!content) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let scrollRatio = 0;
    if (rect.top < windowHeight && rect.bottom > 0) {
      scrollRatio = Math.min(Math.max(1 - (rect.bottom / windowHeight), 0), 1);
    }

    const maxBlur = 60;
    const blur = Math.pow(scrollRatio, 1.8) * maxBlur;

    content.style.filter = `blur(${blur}px)`;
    content.style.opacity = `${1 - scrollRatio * 0.5}`;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.getElementById('edu-timeline');
  const inner = timeline.querySelector('div.flex');
  const leftBtn = document.getElementById('edu-left');
  const rightBtn = document.getElementById('edu-right');
  let scrollAmount = 260; // Ajusta según el tamaño de tus cards

  leftBtn.onclick = () => {
    timeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };
  rightBtn.onclick = () => {
    timeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  
  let isDown = false, startX, scrollLeft;
  timeline.addEventListener('mousedown', (e) => {
    isDown = true;
    timeline.classList.add('active');
    startX = e.pageX - timeline.offsetLeft;
    scrollLeft = timeline.scrollLeft;
  });
  timeline.addEventListener('mouseleave', () => { isDown = false; timeline.classList.remove('active'); });
  timeline.addEventListener('mouseup', () => { isDown = false; timeline.classList.remove('active'); });
  timeline.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - timeline.offsetLeft;
    const walk = (x - startX) * 1.5;
    timeline.scrollLeft = scrollLeft - walk;
  });
  
  timeline.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - timeline.offsetLeft;
    scrollLeft = timeline.scrollLeft;
  });
  timeline.addEventListener('touchend', () => { isDown = false; });
  timeline.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - timeline.offsetLeft;
    const walk = (x - startX) * 1.5;
    timeline.scrollLeft = scrollLeft - walk;
  });
});

window.addEventListener('scroll', () => {
  const curtain = document.getElementById('curtain-scroll-top');
  if (!curtain) return;
  if (window.scrollY > window.innerHeight * 0.5) {
    curtain.style.display = 'flex';
  } else {
    curtain.style.display = 'none';
  }
});

document.getElementById('curtain-scroll-top').onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};