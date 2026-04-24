import { $ } from '../core/dom.js';

export function initParallax() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = $('.hero-section');
    if (hero && scrollY < window.innerHeight) {
      hero.style.setProperty('--parallax', `${scrollY * 0.25}px`);
    }
  });
}
