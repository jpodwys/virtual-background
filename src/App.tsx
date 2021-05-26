import { useEffect } from 'react';
import { blur } from './core/vanilla/blur';
import setupVideo from './core/vanilla/track';

function App() {
  useEffect(() => {
    async function setup() {
      const video = document.getElementById('input') as HTMLVideoElement;
      const canvas = document.getElementById('output') as HTMLCanvasElement;
      await setupVideo(video, canvas);
      await blur(video, canvas);
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
