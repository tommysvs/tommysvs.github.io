window.addEventListener('load', () => {
  const loaderContainer = document.getElementById('loader-threejs');
  if (!loaderContainer) return;

  loaderContainer.style.width = "100vw";
  loaderContainer.style.height = "100vh";
  loaderContainer.style.display = "block";

  const overlay = document.getElementById('loader-overlay');
  overlay.style.backdropFilter = 'blur(32px) saturate(180%)';
  overlay.style.WebkitBackdropFilter = 'blur(32px) saturate(180%)';
  overlay.style.background = 'rgba(10, 10, 18, 0.60)';

  let width = window.innerWidth;
  let height = window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 40;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  loaderContainer.appendChild(renderer.domElement);

  const accentColor = 0xa78bfa;
  const glowColor = 0xa78bfa;

  const barLength = 32;
  const barHeight = 0.45;

  const bgPlaneGeometry = new THREE.PlaneGeometry(barLength * 2, barHeight * 7);
  const bgPlaneMaterial = new THREE.MeshBasicMaterial({
    color: 0x18181b,
    transparent: true,
    opacity: 0.32
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

  // Barra de progreso (morado, con brillo y emisivo)
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
  barFg.scale.x = 0.001; // Empieza vacía
  scene.add(barFg);

  // Luces para efecto neón
  const ambient = new THREE.AmbientLight(0xa78bfa, 0.7);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xa78bfa, 0.8);
  dirLight.position.set(10, 20, 20);
  scene.add(dirLight);

  // Sparkles (destellos) pequeños alrededor de la pantalla
  const sparkles = [];
  const sparkleCount = 22;
  for (let i = 0; i < sparkleCount; i++) {
    const geo = new THREE.SphereGeometry(0.04 + Math.random() * 0.03, 8, 8); // Más pequeños
    const mat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.7 + Math.random() * 0.3
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * barLength * 1.7,
      (Math.random() - 0.5) * barHeight * 12,
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
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});