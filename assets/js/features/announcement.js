export function initAnnouncementFilter() {
  const filterBtns = document.querySelectorAll('#announcement-filters .filter-btn');
  const cards = document.querySelectorAll('#wisuda-grid .wisuda-card');

  if (filterBtns.length === 0 || cards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Remove active styles from all buttons
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-gold/90', 'text-emerald-950', 'border-gold');
        b.classList.add('text-cream', 'border-gold/50', 'bg-transparent');
      });

      // 2. Add active styles to clicked button
      btn.classList.add('active', 'bg-gold/90', 'text-emerald-950', 'border-gold');
      btn.classList.remove('text-cream', 'border-gold/50', 'bg-transparent');

      // 3. Filter cards
      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        // First hide it to allow animation reset if needed, or simply toggle display
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = '';
          // Small delay for fade-in effect could be added, but display handles layout
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // match duration if we used CSS transition on transform/opacity
        }
      });
    });
  });

}
