// Fun Stuff page — custom video controls (Apple-style minimal overlay)
(function () {
  const video = document.getElementById('funVideo');
  const playBtn = document.getElementById('funPlayToggle');
  const muteBtn = document.getElementById('funMuteToggle');
  if (!video || !playBtn || !muteBtn) return;

  function setPlayIcon(isPlaying) {
    const pauseIcon = playBtn.querySelector('.icon-pause');
    const playIcon = playBtn.querySelector('.icon-play');
    pauseIcon.removeAttribute('hidden');
    playIcon.removeAttribute('hidden');
    pauseIcon.style.display = isPlaying ? 'block' : 'none';
    playIcon.style.display = isPlaying ? 'none' : 'block';
    playBtn.setAttribute('aria-pressed', String(isPlaying));
    playBtn.setAttribute('aria-label', isPlaying ? 'Pause video' : 'Play video');
  }

  function setMuteIcon(isMuted) {
    const muteIcon = muteBtn.querySelector('.icon-mute');
    const soundIcon = muteBtn.querySelector('.icon-sound');
    muteIcon.removeAttribute('hidden');
    soundIcon.removeAttribute('hidden');
    muteIcon.style.display = isMuted ? 'block' : 'none';
    soundIcon.style.display = isMuted ? 'none' : 'block';
    muteBtn.setAttribute('aria-pressed', String(isMuted));
    muteBtn.setAttribute('aria-label', isMuted ? 'Unmute video' : 'Mute video');
  }

  playBtn.addEventListener('click', () => {
    if (video.paused) video.play();
    else video.pause();
  });

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    setMuteIcon(video.muted);
  });

  video.addEventListener('play', () => setPlayIcon(true));
  video.addEventListener('pause', () => setPlayIcon(false));

  // Clicking the video itself toggles play, like a real player
  video.addEventListener('click', () => {
    if (video.paused) video.play();
    else video.pause();
  });

  setPlayIcon(!video.paused);
  setMuteIcon(video.muted);
})();
