function playSound(soundFile) {
  if (window.settings.get('soundEnabled')) {
    const audioElement = new Audio(soundFile)
    audioElement.play()

    audioElement.addEventListener('ended', function() {
      audioElement.remove()
    })
  }
}

export { playSound }
