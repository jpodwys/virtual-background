const setupVideo = (videoElement: HTMLVideoElement): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const constraints = {
      video: {
        width: 640, height: 480,
        // frameRate: { ideal: 30, max: 30 }
      }
    }
    videoElement.addEventListener('loadeddata', () => {
      videoElement.width = 640
      videoElement.height = 480
      resolve()
    });
    videoElement.srcObject = await navigator.mediaDevices.getUserMedia(constraints)
  });
}

export default setupVideo;
