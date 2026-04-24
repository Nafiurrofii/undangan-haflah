import { initializeApp } from './core/init.js';

// Boot up the application
initializeApp();

// Handle scroll button
document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.querySelector('.scroll-btn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      document.getElementById('detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
