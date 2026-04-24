import { $ } from '../core/dom.js';

export function initCountdown() {
  // Target: 20 Juni 2026, 07:30 WIB (UTC+7)
  const targetDate = new Date('2026-06-20T07:30:00+07:00').getTime();
  
  const elDays = $('#cd-days');
  const elHours = $('#cd-hours');
  const elMins = $('#cd-mins');
  const elSecs = $('#cd-secs');

  if (!elDays) return;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      elDays.innerText = "00"; elHours.innerText = "00";
      elMins.innerText = "00"; elSecs.innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    elDays.innerText = String(days).padStart(2, '0');
    elHours.innerText = String(hours).padStart(2, '0');
    elMins.innerText = String(minutes).padStart(2, '0');
    elSecs.innerText = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}
