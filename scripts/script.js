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
  let plain = '';
  let map = [];
  let inTag = false;
  for (let i = 0, j = 0; i < text.length; i++) {
    if (text[i] === '<') inTag = true;
    if (!inTag) {
      plain += text[i];
      map.push(i);
    }
    if (text[i] === '>') inTag = false;
  }
  let k = 0;
  function type() {
    let html = '';
    if (k === 0) {
      html = '';
    } else {
      let lastIdx = map[k - 1] + 1;
      html = text.slice(0, lastIdx);
    }
    html += '<span class="typing-cursor">|</span>';
    el.innerHTML = html;
    k++;
    if (k <= plain.length) {
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

  document.addEventListener('mousemove', e => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, #scroll-top, .naip-card, .skill-badge').forEach(el => {
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

// --- EXPERIENCE TABS ---
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.exp-tab');
  const panels = document.querySelectorAll('.exp-panel');
  function activateTab(tab) {
    tabs.forEach(t => t.classList.remove(
      'border-cyan-400',
      'bg-[#ffe066]/10',
      'focus:bg-[#ffe066]/20',
      'border-cyan-400',
      'bg-[#6a11cb70]',
      'focus:bg-[#6a11cb70]',
      'bg-gradient-to-r',
      'from-[#6a11cb]/60',
      'to-cyan-300/40',
      'from-[#23232b]',
      'to-[#23232b]'
    ));
    panels.forEach(p => p.classList.add('hidden'));
    tabs.forEach(t => t.classList.add('bg-gradient-to-r', 'from-[#23232b]', 'to-[#23232b]'));
    tab.classList.add('border-cyan-400', 'bg-gradient-to-r', 'from-[#6a11cb]/60', 'to-cyan-300/40');
    document.getElementById(tab.getAttribute('data-tab')).classList.remove('hidden');
  }
  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });
  if (tabs.length) activateTab(tabs[0]);
});

// --- EXPERIENCE 3D TILT ANIMATION ---
document.addEventListener('DOMContentLoaded', function() {
  const expContainer = document.querySelector('#experience .flex.md\\:flex-row');
  if (expContainer && window.gsap) {
    let bounds = null;
    const baseGlow = {blur: 18, color: '#6a11cb44', blur2: 4, color2: '#1eb8ff22'};
    function setGlowByTilt(rotateX, rotateY) {
      const offsetX = Math.round(-rotateY * 2.5);
      const offsetY = Math.round(rotateX * 2.5);
      expContainer.style.boxShadow = `${offsetX}px ${offsetY}px ${baseGlow.blur}px 0 ${baseGlow.color}, ${offsetX/2}px ${offsetY/2}px ${baseGlow.blur2}px 0 ${baseGlow.color2}`;
    }
    expContainer.addEventListener('mouseenter', () => {
      bounds = expContainer.getBoundingClientRect();
    });
    expContainer.addEventListener('mousemove', (e) => {
      if (!bounds) bounds = expContainer.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = -((y - centerY) / centerY) * 10;
      gsap.to(expContainer, {
        rotateY,
        rotateX,
        transformPerspective: 900,
        transformOrigin: 'center',
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: function() {
          const curRotateX = gsap.getProperty(expContainer, 'rotateX');
          const curRotateY = gsap.getProperty(expContainer, 'rotateY');
          setGlowByTilt(curRotateX, curRotateY);
        }
      });
      setGlowByTilt(rotateX, rotateY);
    });
    expContainer.addEventListener('mouseleave', () => {
      gsap.to(expContainer, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: function() {
          setGlowByTilt(0, 0);
        }
      });
    });

    setGlowByTilt(0, 0);
  }
});

// --- SMOOTH SCROLL WITHOUT HASH ---
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const menu = document.getElementById('fullscreen-menu');
        if (menu && menu.classList.contains('!translate-x-0')) {
          menu.classList.remove('!translate-x-0');
        }
      }
    });
  });
});

// --- SPOTLIGHT OPACITY ON SCROLL (CLASS TOGGLE) ---
document.addEventListener('DOMContentLoaded', function () {
  const purple = document.querySelector('.global-spotlight-purple');
  const blue = document.querySelector('.global-spotlight-blue');
  function updateSpotlightByScroll() {
    const faint = window.scrollY > 80;
    if (purple) {
      purple.style.transition = 'opacity 0.5s';
      purple.style.opacity = faint ? '0.25' : '0.85';
    }
    if (blue) {
      blue.style.transition = 'opacity 0.5s';
      blue.style.opacity = faint ? '0.15' : '0.75';
    }
  }
  window.addEventListener('scroll', updateSpotlightByScroll);
  updateSpotlightByScroll();
});

// --- GSAP GLITCH EFFECT ON VERTICAL PORTFOLIO LINK ---
document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap) return;
  const verticalText = document.querySelector('.vertical-text');
  if (!verticalText) return;

  function setWhiteText(on) {
    if (on) {
      verticalText.style.background = 'none';
      verticalText.style.webkitBackgroundClip = 'initial';
      verticalText.style.backgroundClip = 'initial';
      verticalText.style.webkitTextFillColor = '#fff';
      verticalText.style.color = '#fff';
    } else {
      verticalText.style.background = 'linear-gradient(to bottom, #7f5af0, #38bdf8)';
      verticalText.style.webkitBackgroundClip = 'text';
      verticalText.style.backgroundClip = 'text';
      verticalText.style.webkitTextFillColor = 'transparent';
      verticalText.style.color = 'transparent';
    }
  }

  function glitch() {
    const tl = gsap.timeline();
    tl.to(verticalText, { x: 2, skewX: 20, duration: 0.05, ease: 'power1.in', onStart: () => setWhiteText(true) })
      .to(verticalText, { x: -2, skewX: -15, duration: 0.04, ease: 'power1.in', onStart: () => setWhiteText(false) })
      .to(verticalText, { x: 1, skewX: 10, duration: 0.03, ease: 'power1.in', onStart: () => setWhiteText(true) })
      .to(verticalText, { x: 0, skewX: 0, duration: 0.08, ease: 'power1.out', onStart: () => setWhiteText(false) });
  }

  verticalText.addEventListener('mouseenter', glitch);

  setInterval(() => {
    if (Math.random() < 0.18) glitch();
  }, 500);
});