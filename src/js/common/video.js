function playMovie(htmlElement) {
  const videoPlaying = htmlElement.play();

  if (videoPlaying !== undefined) {
    videoPlaying.then(_ => {}).catch(error => {});
  }
}

export { playMovie };
