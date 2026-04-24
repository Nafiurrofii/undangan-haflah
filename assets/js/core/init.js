import { initGuest } from '../features/guest.js';
import { initOverlay } from '../features/overlay.js';
import { initReveal } from '../features/reveal.js';
import { initParticles } from '../features/particles.js';
import { initParallax } from '../features/parallax.js';
import { initCountdown } from '../features/countdown.js';
import { initRSVP } from '../features/rsvp.js';
import { initAnnouncementFilter } from '../features/announcement.js';

export function initializeApp() {
  document.addEventListener('DOMContentLoaded', () => {
    initGuest();
    initParticles();
    initParallax();
    initCountdown();
    initRSVP();
    initAnnouncementFilter();
    // initReveal is also called via DOMContentLoaded as fallback
    initReveal(); 
  });
  
  // Overlay relies on window.onload
  initOverlay();
}
