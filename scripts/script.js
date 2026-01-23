// --- TRANSLATIONS ---
if (typeof translations === 'undefined') {
  console.error('Translations not loaded. Include scripts/translations.js before script.js.');
}

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
  const heroLine = document.getElementById("hero-line");

  if (heroButton) heroButton.style.opacity = 0;
  if (heroLine) gsap.set(heroLine, { scaleX: 0 });
  
  if (!heroTyping) {
    initializePageTranslations();
  }

  setTimeout(() => {
    if (loader) {
      loader.classList.add('opacity-0');
      loader.classList.add('-translate-y-10');
      loader.style.pointerEvents = 'none';
      setTimeout(() => {
        loader.remove();
        document.body.classList.remove('body-no-scroll');
        if (heroTyping) {
          typeText(heroTyping, translations[currentLanguage].heroTitle, () => {
            typeText(heroTypingSubtitle, translations[currentLanguage].heroSubtitle, () => {
              if (heroButton) {
                heroButton.style.opacity = 1;
                heroButton.style.transition = "opacity 0.5s";
              }
              if (heroLine) {
                gsap.to(heroLine, {
                  scaleX: 1,
                  duration: 0.8,
                  ease: "power2.out"
                });
              }
            });
          });
        }
        updateFooterLanguage(currentLanguage);
      }, 700);
    } else {
      document.body.classList.remove('body-no-scroll');
      if (heroTyping) {
        typeText(heroTyping, translations[currentLanguage].heroTitle, () => {
          typeText(heroTypingSubtitle, translations[currentLanguage].heroSubtitle, () => {
            if (heroButton) {
              heroButton.style.opacity = 1;
              heroButton.style.transition = "opacity 0.5s";
            }
            if (heroLine) {
              gsap.to(heroLine, {
                scaleX: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        });
      }
      updateFooterLanguage(currentLanguage);
    }
  }, 2000);
});

// --- INITIALIZE TRANSLATIONS FOR NON-HERO PAGES ---
function initializePageTranslations() {
  if (typeof window.currentLanguage === 'undefined') {
    window.currentLanguage = 'en';
  }
  
  document.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.getAttribute("data-lang");
    if (key !== "heroTitle" && key !== "heroSubtitle" && key !== "contact" && key !== "credits") {
      if (translations[window.currentLanguage] && translations[window.currentLanguage][key]) {
        element.textContent = translations[window.currentLanguage][key];
      }
    }
  });
  
  if (typeof AOS !== 'undefined') {
    AOS.init();
  }
}

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

  if (heroTyping && heroTypingSubtitle) {
    typeText(heroTyping, translations[currentLanguage].heroTitle, () => {
      typeText(heroTypingSubtitle, translations[currentLanguage].heroSubtitle, () => {
        if (heroButton) {
          heroButton.style.opacity = 1;
          heroButton.style.transition = "opacity 0.5s";
        }
      });
    });
  }

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

  document.querySelectorAll('a, button, #scroll-top, .skill-badge').forEach(el => {
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

// --- SCROLL TO TOP ---
window.addEventListener('scroll', () => {
  const curtain = document.getElementById('scroll-top');
  if (!curtain) return;
  if (window.scrollY > window.innerHeight * 0.5) {
    curtain.classList.add('visible');
  } else {
    curtain.classList.remove('visible');
  }
});

document.getElementById('scroll-top').onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

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
  const portfolioBtn = document.querySelector('a[href="portfolio/"], a[href="portfolio.html"]');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    fullscreenMenu.classList.toggle('translate-x-full');
    fullscreenMenu.classList.toggle('translate-x-0');
    fullscreenMenu.classList.toggle('pointer-events-none');

    if (fullscreenMenu.classList.contains('translate-x-0')) {
      if (portfolioBtn) portfolioBtn.classList.add('opacity-0', 'pointer-events-none');
      navLinks.forEach((link, i) => {
        setTimeout(() => {
          link.classList.add('opacity-100', 'translate-y-0');
          link.classList.remove('opacity-0', 'translate-y-4');
        }, 100 + i * 120);
      });
    } else {
      if (portfolioBtn) portfolioBtn.classList.remove('opacity-0', 'pointer-events-none');
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
      if (portfolioBtn) portfolioBtn.classList.remove('opacity-0', 'pointer-events-none');
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

// --- CLOCK TIME ZONE ---
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

// --- HIDE TIME ZONE GROUP ON SCROLL ---
window.addEventListener('scroll', () => {
  const tzGroup = document.getElementById('tz-group');
  const tzAvailable = document.getElementById('tz-available');
  const tzParent = tzGroup?.parentElement;
  if (!tzGroup || !tzAvailable || !tzParent) return;

  if (window.scrollY > 10) {
    tzGroup.style.opacity = '0';
    tzGroup.style.pointerEvents = 'none';
    setTimeout(() => {
      if (window.scrollY > 10) tzGroup.style.display = 'none';
    }, 400);
    tzParent.classList.add('tz-group-hidden');
  } else {
    tzGroup.style.display = '';
    setTimeout(() => {
      tzGroup.style.opacity = '1';
      tzGroup.style.pointerEvents = '';
    }, 10);
    tzParent.classList.remove('tz-group-hidden');
  }
});

// --- GSAP GLOW ANIMATION ON PORTFOLIO BUTTON ---
document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap) return;
  const portfolioBtn = document.querySelector('a[href="portfolio/"], a[href="portfolio.html"]');
  if (!portfolioBtn) return;

  portfolioBtn.style.position = 'relative';
  portfolioBtn.style.boxShadow = '0 0 20px rgba(255, 224, 102, 0)';

  gsap.to(portfolioBtn, {
    boxShadow: '0 0 15px rgba(255, 224, 102, 0.35)',
    duration: 1.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });

  portfolioBtn.addEventListener('mouseenter', () => {
    gsap.getProperty(portfolioBtn, 'boxShadow');
    gsap.getTweensOf(portfolioBtn).forEach(tween => tween.pause());
  });

  portfolioBtn.addEventListener('mouseleave', () => {
    gsap.getTweensOf(portfolioBtn).forEach(tween => tween.resume());
  });
});

// --- GSAP RIBBON SCROLL ANIMATION ---
document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap) return;
  const ribbons = gsap.utils.toArray('.skills-ribbon');
  
  ribbons.forEach((ribbon, index) => {
    const track = ribbon.querySelector('.skills-track');
    if (!track) return;
    
    const items = track.querySelectorAll('.skill-badge');
    const clonedItems = Array.from(items).map(item => item.cloneNode(true));
    clonedItems.forEach(item => track.appendChild(item));
    
    const isReverse = index % 2 === 1;
    
    if (isReverse) {
      gsap.set(track, { x: '-50%' });
      const tween = gsap.to(track, {
        x: '0%',
        duration: 30,
        ease: 'none',
        repeat: -1
      });
      ribbon.addEventListener('mouseenter', () => tween.pause());
      ribbon.addEventListener('mouseleave', () => tween.resume());
    } else {
      const tween = gsap.to(track, {
        x: '-50%',
        duration: 30,
        ease: 'none',
        repeat: -1
      });
      ribbon.addEventListener('mouseenter', () => tween.pause());
      ribbon.addEventListener('mouseleave', () => tween.resume());
    }
  });
});

// --- GSAP TOOLTIP ANIMATION ---
document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap) return;
  document.querySelectorAll('.tooltip-wrap').forEach((wrap) => {
    const bubble = wrap.querySelector('.tooltip-bubble');
    const arrow = wrap.querySelector('.tooltip-arrow');
    if (!bubble || !arrow) return;

    gsap.set(bubble, { autoAlpha: 0, y: 12, scale: 0.85, rotate: -2, filter: 'blur(4px)' });
    gsap.set(arrow, { autoAlpha: 0, y: 8, scale: 0.6, rotate: 45, filter: 'blur(2px)' });

    const tl = gsap.timeline({ paused: true });
    tl.to(bubble, {
      duration: 0.28,
      autoAlpha: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      ease: 'back.out(1.6)',
      boxShadow: '0 12px 34px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,224,102,0.18)'
    })
    .to(arrow, {
      duration: 0.18,
      autoAlpha: 1,
      y: 0,
      scale: 1,
      rotate: 45,
      filter: 'blur(0px)',
      ease: 'back.out(1.4)'
    }, '-=0.16');

    const show = () => tl.play();
    const hide = () => tl.reverse();

    wrap.addEventListener('mouseenter', show);
    wrap.addEventListener('mouseleave', hide);
    wrap.addEventListener('focus', show, true);
    wrap.addEventListener('blur', hide, true);
  });
});