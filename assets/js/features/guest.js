import { $ } from '../core/dom.js';

export function initGuest() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('to') || params.get('name') || '';
  if (name.trim()) {
    const el = $('#guest-name');
    if (el) el.textContent = decodeURIComponent(name.trim());
  }
}
