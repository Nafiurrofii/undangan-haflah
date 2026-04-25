document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('backsound');
    const audioControl = document.getElementById('audio-control');
    const iconMute = document.getElementById('icon-mute');
    const iconPlay = document.getElementById('icon-play');
    const heroScrollBtn = document.querySelector('.hero-scroll-btn');
    
    let hasInteracted = false;
    let fadeInterval = null;
    let isFadingOut = false;
    
    // Default low volume & custom loop
    audio.volume = 0;
    audio.loop = false; // We handle loop manually for smoothness
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
        isFadingOut = false;
        
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
            isFadingOut = false;
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
    
    // Custom Smooth Loop
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        
        const timeRemaining = audio.duration - audio.currentTime;
        // Start fading out 2 seconds before the end
        if (timeRemaining <= 2 && timeRemaining > 0 && !isFadingOut && !audio.paused) {
            isFadingOut = true;
            if (fadeInterval) clearInterval(fadeInterval);
            
            let vol = audio.volume;
            fadeInterval = setInterval(() => {
                if (vol > 0) {
                    vol -= 0.05;
                    audio.volume = Math.max(0, vol);
                }
                
                if (audio.volume === 0 || audio.currentTime >= audio.duration - 0.1) {
                    clearInterval(fadeInterval);
                    audio.currentTime = 0; // Reset to start
                    fadeInAudio(); // Fade back in (will also play)
                }
            }, 100); // 100ms interval for smooth fade out
        }
    });

    // Fallback if timeupdate misses the exact end
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        fadeInAudio();
    });

    // Sync icons if audio stops naturally
    audio.addEventListener('pause', updateIcons);
    audio.addEventListener('play', updateIcons);
});
