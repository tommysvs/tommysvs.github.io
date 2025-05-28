// --- SET LANGUAGE ---
let currentLanguage = "en";

// --- TRANSLATIONS ---
const translations = {
  en: {
    about: "About Me",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    heroTitle: "Hi, I'm <span class='text-blue-300'>Tommy</span>!",
    heroSubtitle: "IT Consultant | Full Stack Developer",
    discoverMore: "Discover more",
    contact: "Contact me:",
    credits: "Made with ❤️ by Tommy Vega",
    close: "Close",
    aboutTitle: "About Me",
    aboutDescription:  "Hi! I'm Tommy Vega. I’m passionate about technology and always looking for new ways to solve problems and make things better. I enjoy building digital solutions, automating tasks, and learning new tools or frameworks. I believe in teamwork, continuous improvement, and using tech to create a real impact—whether it’s for a business, a project, or just for fun.",
    aboutExp1: "5+ years of experience in SAP consulting and systems analysis.",
    aboutExp2: "Passionate about continuous learning and teamwork.",
    aboutExp3: "Focused on results, quality, and customer satisfaction.",
    contactMe: "Contact Me",
    cvDescription: "Discover in detail my professional background, skills, and achievements. Download my CV in your preferred language and learn more about my experience in technology, business, and digital transformation."
  },
  es: {
    about: "Sobre mí",
    skills: "Habilidades",
    experience: "Experiencia",
    education: "Educación",
    heroTitle: "¡Hola, soy <span class='text-blue-300'>Tommy</span>!",
    heroSubtitle: "Consultor de TI | Desarrollador Full Stack",
    discoverMore: "Descubre más",
    contact: "Contáctame:",
    credits: "Hecho con ❤️ por Tommy Vega",
    close: "Cerrar",
    aboutTitle: "Sobre mí",
    aboutDescription: "¡Hola! Soy Tommy Vega. Me apasiona la tecnología y siempre busco nuevas formas de resolver problemas y mejorar las cosas. Disfruto crear soluciones digitales, automatizar tareas y aprender nuevas herramientas o frameworks. Creo en el trabajo en equipo, la mejora continua y en usar la tecnología para generar un impacto real, ya sea en un negocio, un proyecto o solo por diversión.",    aboutExp1: "+5 años de experiencia en consultoría SAP y análisis de sistemas.",
    aboutExp2: "Apasionado por el aprendizaje constante y la colaboración en equipo.",
    aboutExp3: "Enfocado en resultados, calidad y satisfacción del cliente.",
    contactMe: "Contáctame",
    cvDescription: "Descubre en detalle mi trayectoria profesional, habilidades y logros. Descarga mi CV en el idioma que prefieras y conoce mi experiencia en tecnología, negocios y transformación digital."
  }
};

// --- UPDATE FOOTER LANGUAGE ---
function updateFooterLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (key === "contact") {
      const emailLink = el.querySelector("a");
      el.innerHTML = `${translations[lang][key]} `;
      if (emailLink) {
        el.appendChild(emailLink);
      }
    } else if (key === "credits") {
      el.innerHTML = translations[lang][key];
    } else {
      el.textContent = translations[lang][key];
    }
  });
}

// --- TYPYNG EFFECT ---
function typeText(el, text, callback) {
  let i = 0;
  function type() {
    el.innerHTML = text.slice(0, i) + '<span class="typing-cursor">|</span>';
    i++;
    if (i <= text.length) {
      setTimeout(type, 60);
    } else {
      el.innerHTML = text;
      if (callback) callback();
    }
  }
  type();
}

// --- HERO TYPING AND LOADER ---
window.addEventListener('load', () => {
  document.body.classList.add('body-no-scroll');

  const loader = document.getElementById('loader-overlay');
  const heroTyping = document.getElementById("hero-typing");
  const heroTypingSubtitle = document.getElementById("hero-typing-subtitle");
  const heroButton = document.getElementById("hero-button");

  if (heroButton) heroButton.style.opacity = 0;

  setTimeout(() => {
    if (loader) {
      loader.classList.add('opacity-0');
      loader.classList.add('-translate-y-10');
      loader.style.pointerEvents = 'none';
      setTimeout(() => {
        loader.remove();
        document.body.classList.remove('body-no-scroll');
        typeText(heroTyping, translations[currentLanguage].heroTitle, () => {
          typeText(heroTypingSubtitle, translations[currentLanguage].heroSubtitle, () => {
            if (heroButton) {
              heroButton.style.opacity = 1;
              heroButton.style.transition = "opacity 0.5s";
            }
          });
        });
        updateFooterLanguage(currentLanguage);
      }, 700);
    } else {
      document.body.classList.remove('body-no-scroll');
      typeText(heroTyping, translations[currentLanguage].heroTitle, () => {
        typeText(heroTypingSubtitle, translations[currentLanguage].heroSubtitle, () => {
          if (heroButton) {
            heroButton.style.opacity = 1;
            heroButton.style.transition = "opacity 0.5s";
          }
        });
      });
      updateFooterLanguage(currentLanguage);
    }
  }, 2000);
});

// --- CHANGE LANGUAGE ON CLICK ---
const languageSwitcher = document.getElementById("language-switcher");
if (languageSwitcher) {
  languageSwitcher.textContent = currentLanguage.toUpperCase();
  languageSwitcher.addEventListener("click", () => {
    currentLanguage = currentLanguage === "es" ? "en" : "es";
    updateLanguage();
    languageSwitcher.textContent = currentLanguage.toUpperCase();
  });
}

// --- UPDATE LANGUAGE FUNCTION ---
function updateLanguage() {
  const heroTyping = document.getElementById("hero-typing");
  const heroTypingSubtitle = document.getElementById("hero-typing-subtitle");
  const heroButton = document.getElementById("hero-button");

  if (heroButton) 
    heroButton.style.opacity = 0;

  typeText(heroTyping, translations[currentLanguage].heroTitle, () => {
    typeText(heroTypingSubtitle, translations[currentLanguage].heroSubtitle, () => {
      if (heroButton) {
        heroButton.style.opacity = 1;
        heroButton.style.transition = "opacity 0.5s";
      }
    });
  });

  document.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.getAttribute("data-lang");
    if (key !== "heroTitle" && key !== "heroSubtitle" && key !== "contact" && key !== "credits") {
      element.textContent = translations[currentLanguage][key];
    }
  });

  updateFooterLanguage(currentLanguage);

  const heroBtn = document.querySelector(".hero a");
  
  if (heroBtn) 
    heroBtn.textContent = translations[currentLanguage].discoverMore;
}

// --- CUSTOM CURSOR ---
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
});

// --- NAV LINK HOVER ---
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

// --- HERO PARALLAX Y BLUR ---
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

// --- SECTION SCROLL BLUR ---
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

    let maxBlur = 60;
    let blurExponent = 1.8;
    if (window.innerWidth < 640) {
      maxBlur = 30;
      blurExponent = 3.2;
    }

    const blur = Math.pow(scrollRatio, blurExponent) * maxBlur;

    content.style.filter = `blur(${blur}px)`;
    content.style.opacity = `${1 - scrollRatio * 0.5}`;
  });
});

// --- TIMELINE SCROLL ---
document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.getElementById('edu-timeline');
  if (!timeline) return;
  const inner = timeline.querySelector('div.flex');
  const leftBtn = document.getElementById('edu-left');
  const rightBtn = document.getElementById('edu-right');
  let scrollAmount = 260;

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

// --- SCROLL TO TOP ---
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

// --- SPHERE THREE.JS BACKGROUND ---
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('three-bg');
  if (!container) return;

  const width = container.offsetWidth;
  const height = container.offsetHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  const particles = 200;
  const baseRadius = 50;
  const explodedRadius = 70;
  let currentRadius = baseRadius;
  let targetRadius = baseRadius;

  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const basePositions = [];
  for (let i = 0; i < particles; i++) {
    const phi = Math.acos(-1 + (2 * i) / particles);
    const theta = Math.sqrt(particles * Math.PI) * phi;
    const x = Math.cos(theta) * Math.sin(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(phi);
    basePositions.push([x, y, z]);
    positions.push(
      baseRadius * x,
      baseRadius * y,
      baseRadius * z
    );
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0x8b5cf6, size: 1.8, transparent: true, opacity: 0.1 });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  document.body.addEventListener('mouseenter', () => {
    targetRadius = explodedRadius;
  });
  document.body.addEventListener('mouseleave', () => {
    targetRadius = baseRadius;
  });

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);

    currentRadius += (targetRadius - currentRadius) * 0.08;

    const pos = geometry.attributes.position;
    for (let i = 0; i < particles; i++) {
      pos.setXYZ(
        i,
        basePositions[i][0] * currentRadius,
        basePositions[i][1] * currentRadius,
        basePositions[i][2] * currentRadius
      );
    }
    pos.needsUpdate = true;

    points.rotation.y += 0.002 + mouseX * 0.003;
    points.rotation.x += mouseY * 0.003;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
});