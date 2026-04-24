import { $ } from '../core/dom.js';
import { initReveal } from './reveal.js';

export function initOverlay() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const overlay = $('#entrance-overlay');
      if (overlay) overlay.classList.add('hidden');
      // Trigger reveals after overlay fades
      setTimeout(initReveal, 400);
    }, 1800);
  });
}
