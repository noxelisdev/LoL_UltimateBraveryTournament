function playMovie(element, src, loop = false) {
  element.setAttribute('src', src)
  element.loop = loop
  element.play()
}

export { playMovie }
