const setupVideo = (videoElement: HTMLVideoElement): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const width = 640
    const height = 480

    const constraints = {
      video: {
        width, height,
        frameRate: { ideal: 30, max: 30 }
      }
    }
    videoElement.addEventListener('loadeddata', () => {
      videoElement.width = width
      videoElement.height = height
      resolve()
    });
    videoElement.srcObject = await navigator.mediaDevices.getUserMedia(constraints)
  });
}

export default setupVideo;
