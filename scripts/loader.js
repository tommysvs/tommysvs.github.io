window.addEventListener('load', () => {
  const loaderContainer = document.getElementById('loader-threejs');
  if (!loaderContainer) return;

  function getResponsiveValues() {
    const isMobile = window.innerWidth < 600;
    return {
      isMobile,
      barLength: isMobile ? 8 : 16,
      barHeight: isMobile ? 0.10 : 0.18,
      sparkleCount: isMobile ? 10 : 22,
      cameraZ: isMobile ? 28 : 40,
      bgPlaneHeight: isMobile ? 7 : 7,
      bgPlaneWidth: isMobile ? 32 : 64
    };
  }

  function setupLoader() {
    loaderContainer.innerHTML = "";

    loaderContainer.style.width = "100vw";
    loaderContainer.style.height = "100vh";
    loaderContainer.style.display = "block";

    const text = "Loading...";
    const textDiv = document.createElement('div');
    textDiv.style.position = "absolute";
    textDiv.style.bottom = "2rem";
    textDiv.style.right = "2rem";
    textDiv.style.color = "#ffeda5";
    textDiv.style.fontSize = "0.7rem";
    textDiv.style.letterSpacing = "0.08em";
    textDiv.style.textShadow = "0 2px 12px #000, 0 0px 2px #ffe066";
    textDiv.style.pointerEvents = "none";
    textDiv.style.zIndex = "10";
    textDiv.style.whiteSpace = "pre";
    loaderContainer.appendChild(textDiv);

    textDiv.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.opacity = "0";
      span.style.transition = "opacity 0.3s";
      textDiv.appendChild(span);
    }

    setTimeout(() => {
      const spans = textDiv.querySelectorAll('span');
      spans.forEach((span, i) => {
        setTimeout(() => {
          span.style.opacity = "1";
        }, i * 70);
      });
    }, 600);

    const overlay = document.getElementById('loader-overlay');
    overlay.style.backdropFilter = 'blur(24px) saturate(80%)';
    overlay.style.WebkitBackdropFilter = 'blur(24px) saturate(80%)';
    overlay.style.background = '#17151b90';

    let width = window.innerWidth;
    let height = window.innerHeight;

    const { isMobile, barLength, barHeight, sparkleCount, cameraZ, bgPlaneHeight, bgPlaneWidth } = getResponsiveValues();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = cameraZ;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    loaderContainer.appendChild(renderer.domElement);

    const accentColor = 0xffe066;
    const glowColor = 0xa78bfa;

    const bgPlaneGeometry = new THREE.PlaneGeometry(barLength * 2, barHeight * bgPlaneHeight);
    const bgPlaneMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0
    });
    const bgPlane = new THREE.Mesh(bgPlaneGeometry, bgPlaneMaterial);
    bgPlane.position.set(0, 0, -2);
    scene.add(bgPlane);

    const barBgGeometry = new THREE.BoxGeometry(barLength, barHeight, 1);
    const barBgMaterial = new THREE.MeshStandardMaterial({
      color: 0x22223b,
      transparent: true,
      opacity: 0.22,
      metalness: 0.5,
      roughness: 0.7
    });
    const barBg = new THREE.Mesh(barBgGeometry, barBgMaterial);
    barBg.position.set(0, 0, 0);
    scene.add(barBg);

    const glowGeometry = new THREE.BoxGeometry(barLength, barHeight * 2.2, 1.2);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.23
    });
    const barGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    barGlow.position.set(0, 0, -0.5);
    scene.add(barGlow);

    const barFgGeometry = new THREE.BoxGeometry(barLength, barHeight, 1.2);
    const barFgMaterial = new THREE.MeshStandardMaterial({
      color: accentColor,
      metalness: 1,
      roughness: 0.15,
      emissive: accentColor,
      emissiveIntensity: 1.2
    });
    const barFg = new THREE.Mesh(barFgGeometry, barFgMaterial);
    barFg.position.set(0, 0, 0.1);
    barFg.scale.x = 0.001;
    scene.add(barFg);

    const ambient = new THREE.AmbientLight(0xa78bfa, 0.7);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xa78bfa, 0.8);
    dirLight.position.set(10, 20, 20);
    scene.add(dirLight);

    const sparkles = [];
    for (let i = 0; i < sparkleCount; i++) {
      const geo = new THREE.SphereGeometry((isMobile ? 0.02 : 0.04) + Math.random() * (isMobile ? 0.015 : 0.03), 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.3
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * barLength * 1.7,
        (Math.random() - 0.5) * barHeight * (isMobile ? 8 : 12),
        -0.2 + Math.random() * 2
      );
      mesh.userData = {
        baseX: mesh.position.x,
        baseY: mesh.position.y,
        speed: 0.7 + Math.random() * 1.2,
        offset: Math.random() * Math.PI * 2
      };
      scene.add(mesh);
      sparkles.push(mesh);
    }

    let progress = 0;
    let finished = false;

    let fakeLoading = setInterval(() => {
      progress += 0.6;
      if (progress > 100) progress = 100;

      let scale = progress / 100;
      if (scale < 0.001) scale = 0.001;
      barFg.scale.x = scale;

      if (progress >= 100 && !finished) {
        finished = true;
        clearInterval(fakeLoading);
        overlay.style.opacity = 0;
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 600);
      }
    }, 16);

    function animate() {
      requestAnimationFrame(animate);
      barGlow.material.opacity = 0.23 + Math.sin(Date.now() * 0.003) * 0.11;
      sparkles.forEach((sparkle, i) => {
        const t = Date.now() * 0.001 * sparkle.userData.speed + sparkle.userData.offset;
        sparkle.position.x = sparkle.userData.baseX + Math.sin(t) * 0.3;
        sparkle.position.y = sparkle.userData.baseY + Math.cos(t) * 0.3;
        sparkle.material.opacity = 0.6 + Math.abs(Math.sin(t * 2)) * 0.4;
      });
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      setupLoader();
    }, { once: true });
  }

  setupLoader();
});