// --- TRANSLATIONS ---
const translations = {
  en: {
    about: "About Me",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    resume: "Resume",
    contactPhrase: "Let’s build something together",
    heroTitle: "Hi, I'm <span class='text-[#ffe066]'>Tommy</span>!",
    heroSubtitle: "IT Consultant | SAP Specialist",
    discoverMore: "Discover more",
    contact: "Contact me:",
    credits: "2025 &copy; Made with ❤️ by Tommy Vega",
    close: "Close",
    aboutTitle: "About Me",
    aboutDescription:  "Hi! I'm Tommy Vega. I’m passionate about technology and always looking for new ways to solve problems and make things better. I enjoy building digital solutions, automating tasks, and learning new tools or frameworks. I believe in teamwork, continuous improvement, and using tech to create a real impact—whether it’s for a business, a project, or just for fun.",
    aboutExp1: "5+ years of experience in SAP consulting and systems analysis.",
    aboutExp2: "Passionate about continuous learning and teamwork.",
    aboutExp3: "Focused on results, quality, and customer satisfaction.",
    contactMe: "Contact Me",
    sapDesc: "ERP Implementation & Support",
    projectDesc: "Agile & Team Leadership",
    bussanaDesc: "Process Mapping & Solutions",
    analystDesc: "Responsible for analyzing business requirements, designing system solutions, and supporting the implementation of new technologies to improve company operations.",
    managerDesc: "Led the IT department, managed infrastructure and security, coordinated technology projects, and ensured the efficient operation of all IT services.",
    itleadDesc: "Oversaw SAP Business One system across multiple regions, provided training and support, and optimized processes to align with business goals and regional needs.",
    bachelorDegree: "Bachelor of Science in Computer Science",
    associateDegree: "Associate of Science in Programming & Analysis",
    cvDescription: "Discover in detail my professional background, skills, and achievements. Download my CV in your preferred language and learn more about my experience in technology, business, and digital transformation."
  },
  es: {
    about: "Sobre mí",
    skills: "Habilidades",
    experience: "Experiencia",
    education: "Educación",
    resume: "Curriculum",
    contactPhrase: "Construyamos algo juntos",
    heroTitle: "¡Hola, soy <span class='text-[#ffe066]'>Tommy</span>!",
    heroSubtitle: "Consultor de TI | Especialista en SAP",
    discoverMore: "Descubre más",
    contact: "Contáctame:",
    credits: "2025 &copy; Hecho con ❤️ por Tommy Vega",
    close: "Cerrar",
    aboutTitle: "Sobre mí",
    aboutDescription: "¡Hola! Soy Tommy Vega. Me apasiona la tecnología y siempre busco nuevas formas de resolver problemas y mejorar las cosas. Disfruto crear soluciones digitales, automatizar tareas y aprender nuevas herramientas o frameworks. Creo en el trabajo en equipo, la mejora continua y en usar la tecnología para generar un impacto real, ya sea en un negocio, un proyecto o solo por diversión.",    aboutExp1: "+5 años de experiencia en consultoría SAP y análisis de sistemas.",
    aboutExp2: "Apasionado por el aprendizaje constante y la colaboración en equipo.",
    aboutExp3: "Enfocado en resultados, calidad y satisfacción del cliente.",
    contactMe: "Contáctame",
    sapDesc: "Implementación y soporte de ERP",
    projectDesc: "Liderazgo ágil y de equipos",
    bussanaDesc: "Mapeo de procesos y soluciones",
    analystDesc: "Responsable de analizar requerimientos de negocio, diseñar soluciones de sistemas y apoyar la implementación de nuevas tecnologías para mejorar las operaciones de la empresa.",
    managerDesc: "Lideré el departamento de TI, gestioné infraestructura y seguridad, coordiné proyectos tecnológicos y aseguré el funcionamiento eficiente de todos los servicios de TI.",
    itleadDesc: "Supervisé el sistema SAP Business One en múltiples regiones, brindé capacitación y soporte, y optimicé procesos para alinearlos con los objetivos y necesidades regionales del negocio.",
    bachelorDegree: "Ingeniería en Ciencias de la Computación",
    associateDegree: "Associate of Science in Programming & Analysis",
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
  const heroButton = document.getElementById("hero-mouse");

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
document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.getElementById('language-switcher');
  const en = document.getElementById('lang-en');
  const es = document.getElementById('lang-es');

  window.currentLanguage = window.currentLanguage || 'en';
  updateSwitchVisual();

  switcher.addEventListener('click', () => {
    window.currentLanguage = window.currentLanguage === "es" ? "en" : "es";
    updateSwitchVisual();
    if (typeof updateLanguage === "function") updateLanguage();
  });

  function updateSwitchVisual() {
    switcher.classList.toggle('en', window.currentLanguage === 'en');
    switcher.classList.toggle('es', window.currentLanguage === 'es');
  }
});

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
document.addEventListener('DOMContentLoaded', () => {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  document.addEventListener('mousemove', e => {
    cursorDot.style.left = cursorRing.style.left = e.clientX + 'px';
    cursorDot.style.top = cursorRing.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, #curtain-scroll-top').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('grow');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('grow');
    });
  });
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

// --- SECTION SCROLL BLUR ---
document.addEventListener('scroll', () => {
  document.querySelectorAll('section').forEach(section => {
    const content = section.querySelector('.section-content');
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

// --- GSAP TIMELINE SCROLL ---
document.addEventListener('DOMContentLoaded', () => {
  if (window.gsap && window.ScrollTrigger) {
    const section = document.getElementById('education');
    const timeline = document.getElementById('edu-timeline');
    if (!section || !timeline) return;

    const totalWidth = timeline.scrollWidth;
    const viewportWidth = section.offsetWidth;

    const cards = timeline.children.length;
    const card = timeline.children[0];
    const cardWidth = card ? card.offsetWidth : 340;
    const gap = 48;
    const lastCardOffset = (viewportWidth - cardWidth) / 2;
    const scrollDistance = (cardWidth + gap) * (cards - 1) - lastCardOffset;

    if (totalWidth > viewportWidth) {
      gsap.to(timeline, {
        x: () => `-${scrollDistance}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });
    } else {
      timeline.style.transform = "none";
    }
  }
});

// --- THREE.JS RANDOM PARTICLES ---
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('three-bg');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = 0;
  renderer.domElement.style.left = 0;
  renderer.domElement.style.pointerEvents = "none";
  container.appendChild(renderer.domElement);

  const particleCount = 100;
  const spread = 200;
  const positions = [];
  const basePositions = [];
  const animOffsets = [];
  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * spread * 2;
    const y = (Math.random() - 0.5) * spread * 2;
    const z = (Math.random() - 0.5) * spread * 2;
    positions.push(x, y, z);
    basePositions.push(x, y, z);
    animOffsets.push(Math.random() * Math.PI * 2);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0xffe066,
    size: 0.3,
    transparent: true,
    opacity: 0.5
  });
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  function animateParticles() {
    requestAnimationFrame(animateParticles);
    const time = performance.now() * 0.7 * 0.001;
    const pos = geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      let bx = basePositions[i * 3 + 0];
      let by = basePositions[i * 3 + 1];
      let bz = basePositions[i * 3 + 2];

      let fx = bx + Math.sin(time + animOffsets[i]) * 1.2;
      let fy = by + Math.cos(time * 1.2 + animOffsets[i]) * 1.2;
      let fz = bz + Math.sin(time * 0.7 + animOffsets[i]) * 1.2;

      pos[i * 3 + 0] = fx;
      pos[i * 3 + 1] = fy;
      pos[i * 3 + 2] = fz;
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }
  animateParticles();

  window.addEventListener('resize', () => {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
  });
});

// --- FULL SCREEN MENU TOGGLE ---
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const fullscreenMenu = document.getElementById('fullscreen-menu');
  const navLinks = fullscreenMenu.querySelectorAll('.fullscreen-nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    fullscreenMenu.classList.toggle('translate-x-full');
    fullscreenMenu.classList.toggle('translate-x-0');
    fullscreenMenu.classList.toggle('pointer-events-none');

    if (fullscreenMenu.classList.contains('translate-x-0')) {
      navLinks.forEach((link, i) => {
        setTimeout(() => {
          link.classList.add('opacity-100', 'translate-y-0');
          link.classList.remove('opacity-0', 'translate-y-4');
        }, 100 + i * 120);
      });
    } else {
      navLinks.forEach((link) => {
        link.classList.remove('opacity-100', 'translate-y-0');
        link.classList.add('opacity-0', 'translate-y-4');
      });
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      fullscreenMenu.classList.add('translate-x-full');
      fullscreenMenu.classList.remove('translate-x-0');
      fullscreenMenu.classList.add('pointer-events-none');
      menuToggle.classList.remove('open');
      navLinks.forEach((l) => {
        l.classList.remove('opacity-100', 'translate-y-0');
        l.classList.add('opacity-0', 'translate-y-4');
      });
    });
  });
});

// --- HIDE MOBILE SOCIAL ICONS ON FOOTER INTERSECTION WITH FADE ---
document.addEventListener("DOMContentLoaded", function () {
  const mobileSocial = document.querySelector('.fixed.left-4.bottom-16.z-\\[9997\\]');
  const footer = document.getElementById('footer');

  if (!mobileSocial || !footer) return;

  mobileSocial.style.transition = 'opacity 0.4s';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          mobileSocial.style.opacity = '0';
          mobileSocial.style.pointerEvents = 'none';
        } else {
          mobileSocial.style.opacity = '1';
          mobileSocial.style.pointerEvents = '';
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(footer);
});

// --- SCROLL EFFECTS ---
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

// --- CLOCK FOR HONDURAS TIME ZONE ---
function updateClock() {
  const tz = 'America/Tegucigalpa';
  const now = new Date();
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: tz };
  document.getElementById('tz-label').textContent = tz.replace('_', ' ');
  document.getElementById('tz-time').textContent = now.toLocaleTimeString('en-US', options);
}
setInterval(updateClock, 1000);
updateClock();

// --- NAIP STACK CARD INTERACTION ---
document.addEventListener("DOMContentLoaded", function () {
  const cards = Array.from(document.querySelectorAll("#naip-stack .naip-card"));
  cards.forEach(card => {
    card.addEventListener("click", function () {
      cards.forEach(c => c.classList.remove("active"));
      this.classList.add("active");
      this.style.zIndex = 20;
      cards.filter(c => c !== this).forEach((c, i) => {
        c.style.zIndex = 10 - i;
      });
    });
  });
  if (cards[0]) cards[0].classList.add("active");
});