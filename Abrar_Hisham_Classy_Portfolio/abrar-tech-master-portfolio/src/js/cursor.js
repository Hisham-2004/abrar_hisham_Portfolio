export function initCursor() {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring || window.matchMedia("(pointer: coarse)").matches) return;

  let x = innerWidth / 2, y = innerHeight / 2;
  let ringX = x, ringY = y;
  window.addEventListener("mousemove", (event) => {
    x = event.clientX; y = event.clientY;
    dot.style.transform = `translate(${x}px, ${y}px)`;
  });
  const animate = () => {
    ringX += (x - ringX) * 0.14;
    ringY += (y - ringY) * 0.14;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animate);
  };
  animate();

  document.querySelectorAll("a, button, input, textarea").forEach((element) => {
    element.addEventListener("mouseenter", () => ring.classList.add("cursor-hover"));
    element.addEventListener("mouseleave", () => ring.classList.remove("cursor-hover"));
  });
}