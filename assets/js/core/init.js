import { initGuest } from '../features/guest.js';
import { initOverlay } from '../features/overlay.js';
import { initReveal } from '../features/reveal.js';
import { initParticles } from '../features/particles.js';
import { initParallax } from '../features/parallax.js';
import { initCountdown } from '../features/countdown.js';

export function initializeApp() {
  document.addEventListener('DOMContentLoaded', () => {
    initGuest();
    initParticles();
    initParallax();
    initCountdown();
    // initReveal is also called via DOMContentLoaded as fallback
    initReveal(); 
  });
  
  // Overlay relies on window.onload
  initOverlay();
}
