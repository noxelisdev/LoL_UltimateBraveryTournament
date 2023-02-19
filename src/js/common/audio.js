function playSound(soundFile) {
  if (window.appSettings.soundEnabled) {
    const audioElement = new Audio(soundFile);
    audioElement.play();

    audioElement.addEventListener('ended', function() {
      this.remove();
    });
  }
}

export { playSound };
