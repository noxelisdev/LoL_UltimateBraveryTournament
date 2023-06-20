function playSound(soundFile) {
  if (window.appSettings.soundEnabled) {
    const audioElement = new Audio(soundFile);
    const audioPlaying = audioElement.play();

    if (audioPlaying !== undefined) {
      audioPlaying.then(_ => {}).catch(error => {});
    }

    audioElement.addEventListener('ended', function() {
      this.remove();
    });
  }
}

export { playSound };
