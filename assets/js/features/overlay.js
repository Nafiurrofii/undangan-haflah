import { $ } from '../core/dom.js';
import { initReveal } from './reveal.js';

export function initOverlay() {
  const hideOverlay = () => {
    setTimeout(() => {
      const overlay = $('#entrance-overlay');
      if (overlay) overlay.classList.add('hidden');
      // Trigger reveals after overlay fades
      setTimeout(initReveal, 400);
    }, 1500);
  };

  if (document.readyState === 'complete') {
    hideOverlay();
  } else {
    window.addEventListener('load', hideOverlay);
    // Safety fallback just in case 'load' gets stuck
    setTimeout(hideOverlay, 5000);
  }
}
