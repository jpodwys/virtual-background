import { useEffect } from 'react';
import { BackgroundConfig } from './core/helpers/backgroundHelper';
import { SegmentationConfig } from './core/helpers/segmentationHelper';
import pipeline from './core/vanilla/pipeline';
import { getTFLite, TFLite } from './core/vanilla/TFLite';
import setupVideo from './core/vanilla/track';

function App() {
  let tflite;
  let isSIMDSupported: boolean = false;
  let webglPipeline: any;

  useEffect(() => {
    async function setup() {
      try {
        const video = document.getElementById('input') as HTMLVideoElement;
        const canvas = document.getElementById('output') as HTMLCanvasElement;
        await setupVideo(video);
        ({ tflite, isSIMDSupported } = await getTFLite());
        const { videoWidth: width, videoHeight: height } = video;
        canvas.width = width as number;
        canvas.height = height as number;
        video.width = width as number;
        video.height = height as number;
        const backgroundConfig: BackgroundConfig = { type: 'blur' };
        const segmentationConfig: SegmentationConfig = {
          model: 'meet',
          backend: 'wasm',
          inputResolution: '160x96',
          pipeline: 'webgl2'
        };
        ({ webglPipeline } = pipeline(video, canvas, backgroundConfig, segmentationConfig, tflite as TFLite));
        webglPipeline.render();
      } catch (error) {
        console.error('Error opening video camera.', error)
      }
    }

    setup()
  }, [])

  return (
    <div>
      <video id="input"
        autoPlay={true}
        playsInline={true}
        controls={false}
        muted
      ></video>
      <canvas id="output"></canvas>
    </div>
  )
}

export default App
