window.addEventListener('load', () => {
  const loaderContainer = document.getElementById('loader-threejs');
  if (!loaderContainer) return;

  function setupLoader() {
    loaderContainer.innerHTML = "";

    loaderContainer.style.width = "100vw";
    loaderContainer.style.height = "100vh";
    loaderContainer.style.display = "flex";
    loaderContainer.style.alignItems = "center";
    loaderContainer.style.justifyContent = "center";
    loaderContainer.style.position = "fixed";
    loaderContainer.style.top = "0";
    loaderContainer.style.left = "0";
    loaderContainer.style.zIndex = "1000";
    loaderContainer.style.background = "transparent";

    const text = "LOADING";
    const textDiv = document.createElement('div');
    textDiv.style.position = "relative";
    textDiv.style.color = "#fff";
    textDiv.style.fontSize = "0.7rem";
    textDiv.style.letterSpacing = "0.08em";
    textDiv.style.textShadow = "0 2px 12px #000, 0 0px 2px #ffe066";
    textDiv.style.pointerEvents = "none";
    textDiv.style.zIndex = "10";
    textDiv.style.whiteSpace = "pre";
    textDiv.style.fontFamily = "'Fira Mono', 'IBM Plex Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'";
    textDiv.style.textAlign = "center";
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
    if (overlay) {
      overlay.style.backdropFilter = 'blur(32px) saturate(80%)';
      overlay.style.WebkitBackdropFilter = 'blur(32px) saturate(80%)';
      overlay.style.background = '#1a1a1b';

      setTimeout(() => {
        overlay.style.opacity = 0;
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 600);
      }, 2000);
    }
  }

  setupLoader();
});