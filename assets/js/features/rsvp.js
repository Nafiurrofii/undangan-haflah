export function initRSVP() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  const nameInput = document.getElementById('rsvp-name');
  const countInput = document.getElementById('rsvp-count');
  const statusSelect = document.getElementById('rsvp-status');
  const messageInput = document.getElementById('rsvp-message');
  const successMsg = document.getElementById('rsvp-success');

  // Auto-fill name from URL parameter if available
  // The URL parameter is likely ?to=GuestName
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to');
  if (guestName && nameInput) {
    nameInput.value = guestName.replace(/-/g, ' '); // simple formatting
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const count = countInput.value;
    const status = statusSelect.value;
    const message = messageInput.value.trim();

    if (!name || !count || !status) return;

    // Show success message and animation
    successMsg.classList.remove('hidden');
    // small delay to allow display:block to apply before animating opacity
    setTimeout(() => {
      successMsg.classList.remove('opacity-0', 'translate-y-2');
    }, 10);

    // Format WhatsApp message
    // Ganti nomor tujuan dengan nomor panitia yang valid
    const targetPhone = "6281234567890";
    
    let text = `*KONFIRMASI KEHADIRAN HAFLAH*\n\n`;
    text += `Nama: ${name}\n`;
    text += `Jumlah Kehadiran: ${count} Orang\n`;
    text += `Status: ${status}\n`;
    if (message) {
      text += `\nUcapan/Doa:\n"${message}"\n`;
    }

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

    // Redirect to WhatsApp after showing success message briefly
    setTimeout(() => {
      window.open(waUrl, '_blank');
      
      // Reset form visually
      form.reset();
      if (guestName) nameInput.value = guestName.replace(/-/g, ' ');
      
      setTimeout(() => {
        successMsg.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => successMsg.classList.add('hidden'), 300);
      }, 3000);
    }, 1500);
  });
}
