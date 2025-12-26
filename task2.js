document.addEventListener("DOMContentLoaded", () => {
  initMouseParallax();
  initTiltEffect();
  console.log("🌲 Enchanted Forest - Move your mouse to explore!");
});

function initMouseParallax() {
  const layers = document.querySelectorAll(".layer");
  const scene = document.querySelector(".scene");

  if (!scene) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  scene.addEventListener("mousemove", (e) => {
    const rect = scene.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetX = (e.clientX - centerX) / centerX;
    targetY = (e.clientY - centerY) / centerY;
  });

  scene.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  function animate() {
    const ease = 0.08;
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0.1;
      const maxMove = 50;

      const moveX = currentX * maxMove * speed;
      const moveY = currentY * maxMove * speed;

      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

function initTiltEffect() {
  const content = document.querySelector(".content-overlay");
  const scene = document.querySelector(".scene");

  if (!content || !scene) return;

  scene.addEventListener("mousemove", (e) => {
    const rect = scene.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((e.clientY - centerY) / centerY) * -5;
    const rotateY = ((e.clientX - centerX) / centerX) * 5;

    content.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  scene.addEventListener("mouseleave", () => {
    content.style.transform =
      "translate(-50%, -50%) perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector(".scene");
  if (!scene) return;

  let touchStartX = 0;
  let touchStartY = 0;

  scene.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  scene.addEventListener("touchmove", (e) => {
    e.preventDefault();

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touchX,
      clientY: touchY,
    });

    scene.dispatchEvent(mouseEvent);
  });

  scene.addEventListener("touchend", () => {
    const mouseEvent = new MouseEvent("mouseleave");
    scene.dispatchEvent(mouseEvent);
  });
});

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (e) => {
    const scene = document.querySelector(".scene");
    const layers = document.querySelectorAll(".layer");

    if (!scene || !layers.length) return;

    const gamma = e.gamma || 0;
    const beta = e.beta || 0;

    const normalizedX = gamma / 45;
    const normalizedY = (beta - 45) / 45;

    layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0.1;
      const maxMove = 30;

      const moveX = Math.max(-1, Math.min(1, normalizedX)) * maxMove * speed;
      const moveY = Math.max(-1, Math.min(1, normalizedY)) * maxMove * speed;

      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}
