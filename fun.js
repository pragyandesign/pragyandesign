// Fun Stuff page — custom video controls (Apple-style minimal overlay)
(function () {
  const video = document.getElementById('funVideo');
  const playBtn = document.getElementById('funPlayToggle');
  const muteBtn = document.getElementById('funMuteToggle');
  if (!video || !playBtn || !muteBtn) return;

  function setPlayIcon(isPlaying) {
    playBtn.querySelector('.icon-pause').hidden = !isPlaying;
    playBtn.querySelector('.icon-play').hidden = isPlaying;
    playBtn.setAttribute('aria-pressed', String(isPlaying));
    playBtn.setAttribute('aria-label', isPlaying ? 'Pause video' : 'Play video');
  }

  function setMuteIcon(isMuted) {
    muteBtn.querySelector('.icon-mute').hidden = !isMuted;
    muteBtn.querySelector('.icon-sound').hidden = isMuted;
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
