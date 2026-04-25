document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('backsound');
    const audioControl = document.getElementById('audio-control');
    const iconMute = document.getElementById('icon-mute');
    const iconPlay = document.getElementById('icon-play');
    const heroScrollBtn = document.querySelector('.hero-scroll-btn');
    
    let hasInteracted = false;
    let fadeInterval = null;
    
    // Default low volume
    audio.volume = 0;
    const targetVolume = 0.3;

    // --- SCROLL LOCK MECHANISM ---
    function lockScroll() {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
    }

    function unlockScroll() {
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
    }

    // Lock scroll on initial load
    lockScroll();

    // Prevent mobile swipe scroll when locked
    document.addEventListener('touchmove', function(e) {
        if (document.body.style.overflow === 'hidden') {
            e.preventDefault();
        }
    }, { passive: false });
    // -----------------------------

    function updateIcons() {
        if (audio.paused) {
            iconMute.classList.remove('hidden');
            iconPlay.classList.add('hidden');
            audioControl.classList.remove('playing');
        } else {
            iconMute.classList.add('hidden');
            iconPlay.classList.remove('hidden');
            audioControl.classList.add('playing');
        }
    }

    function fadeInAudio() {
        if (fadeInterval) clearInterval(fadeInterval);
        
        let vol = audio.volume;
        
        // Attempt to play
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                updateIcons();
                fadeInterval = setInterval(() => {
                    if (vol < targetVolume) {
                        vol += 0.05;
                        audio.volume = Math.min(vol, targetVolume);
                    } else {
                        audio.volume = targetVolume;
                        clearInterval(fadeInterval);
                    }
                }, 200);
            }).catch(e => {
                console.log('Autoplay prevented by browser:', e);
                updateIcons();
            });
        }
    }

    function toggleAudio(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        hasInteracted = true;
        
        if (audio.paused) {
            fadeInAudio();
        } else {
            if (fadeInterval) clearInterval(fadeInterval);
            audio.pause();
            updateIcons();
        }
    }

    // Toggle on control button click
    if (audioControl) {
        audioControl.addEventListener('click', toggleAudio);
    }

    // Guided Interaction: Unlock scroll, smooth scroll, and play audio
    function startExperience() {
        unlockScroll();
        
        const nextSection = document.getElementById('galeri') || document.getElementById('detail');
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        if (!hasInteracted && audio.paused) {
            hasInteracted = true;
            fadeInAudio();
        }
    }

    // Attach to scroll button if exists
    if (heroScrollBtn) {
        heroScrollBtn.addEventListener('click', startExperience, { once: true });
    }
    
    // Sync icons if audio stops naturally
    audio.addEventListener('pause', updateIcons);
    audio.addEventListener('play', updateIcons);
});
