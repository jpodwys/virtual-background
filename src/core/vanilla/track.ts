const setupVideo = (video: HTMLVideoElement, canvas: HTMLCanvasElement): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const width = 640
    const height = 480

    const constraints = {
      video: {
        width, height,
        frameRate: { ideal: 30, max: 30 }
      }
    }
    video.addEventListener('loadeddata', () => {
      video.width = width as number;
      video.height = height as number;
      canvas.width = width as number;
      canvas.height = height as number;
      resolve()
    });
    video.srcObject = await navigator.mediaDevices.getUserMedia(constraints)
  });
}

export default setupVideo;
