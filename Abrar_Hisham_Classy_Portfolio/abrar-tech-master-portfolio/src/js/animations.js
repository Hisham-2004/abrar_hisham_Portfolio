import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
    return;
  }

  gsap.from(".hero-copy > *", {
    y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.15
  });

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.fromTo(element, { y: 28, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: element, start: "top 86%", once: true }
    });
  });
}