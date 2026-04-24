import { $ } from '../core/dom.js';

export function initParticles() {
  const container = $('#particles');
  if (!container) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 2;
    const dur  = (Math.random() * 8 + 10).toFixed(1);
    const del  = (Math.random() * 10).toFixed(1);
    p.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${size}px;
      height:${size}px;
      --dur:${dur}s;
      --delay:${del}s;
      background:${Math.random()>0.5?'rgba(201,168,76,0.6)':'rgba(122,158,126,0.5)'};
    `;
    container.appendChild(p);
  }
}
