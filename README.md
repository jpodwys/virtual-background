# Virtual Background

> Google Meet background blur function. Based on volcomix/virtual-background.

[Try it live here!](https://jpodwys.github.io/virtual-background/)

## Performance

Here are the performance observed for the whole rendering pipelines, including inference and post-processing, when using the device camera on smartphone **Pixel 3 (Chrome)**.

| Model   | Input resolution | Backend          | Pipeline        | FPS |
| ------- | ---------------- | ---------------- | --------------- | --- |
| Meet    | 256x144          | WebAssembly      | Canvas 2D + CPU | 14  |
| Meet    | 256x144          | WebAssembly      | WebGL 2         | 16  |
| Meet    | 256x144          | WebAssembly SIMD | Canvas 2D + CPU | 26  |
| Meet    | 256x144          | WebAssembly SIMD | WebGL 2         | 31  |
| Meet    | 160x96           | WebAssembly      | Canvas 2D + CPU | 29  |
| Meet    | 160x96           | WebAssembly      | WebGL 2         | 35  |
| Meet    | 160x96           | WebAssembly SIMD | Canvas 2D + CPU | 48  |
| Meet    | 160x96           | WebAssembly SIMD | WebGL 2         | 60  |

## Possible improvements

- Rely on alpha channel to save texture fetches from the segmentation mask.
- Blur the background image outside of the rendering loop and use it for light wrapping instead of the original background image. This should produce better rendering results for large light wrapping masks.
- Optimize joint bilateral filter shader to prevent unnecessary variables, calculations and costly functions like `exp`.
- Try [separable approximation](https://www.researchgate.net/publication/4181202_Separable_bilateral_filtering_for_fast_video_preprocessing) for joint bilateral filter.
- Compute everything on lower source resolution (scaling down at the beginning of the pipeline).
- Build TFLite and XNNPACK with multithreading support. Few configuration examples are in [TensorFlow.js WASM backend](https://github.com/tensorflow/tfjs/blob/master/tfjs-backend-wasm/src/cc/BUILD).
- Detect WASM features to load automatically the right TFLite WASM runtime. Inspirations could be taken from [TensorFlow.js WASM backend](https://github.com/tensorflow/tfjs/blob/master/tfjs-backend-wasm/src/flags_wasm.ts) which is based on [GoogleChromeLabs/wasm-feature-detect](https://github.com/GoogleChromeLabs/wasm-feature-detect).
- Experiment with [DeepLabv3+](https://github.com/tensorflow/models/tree/master/research/deeplab) and maybe retrain `MobileNetv3-small` model directly.

## Related work

You can learn more about a pre-trained TensorFlow.js model in the [BodyPix repository](https://github.com/tensorflow/tfjs-models/blob/master/body-pix).

Here is a technical overview of [background features in Google Meet](https://ai.googleblog.com/2020/10/background-features-in-google-meet.html) which relies on:

- [MediaPipe](https://mediapipe.dev/)
- [WebAssembly](https://webassembly.org/)
- [WebAssembly SIMD](https://github.com/WebAssembly/simd)
- [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [XNNPACK](https://github.com/google/XNNPACK)
- [TFLite](https://blog.tensorflow.org/2020/07/accelerating-tensorflow-lite-xnnpack-integration.html)
- [Custom segmentation ML models from Google](https://mediapipe.page.link/meet-mc)
- Custom rendering effects through OpenGL shaders from Google

## Running locally

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Building TensorFlow Lite tool

Docker is required to build TensorFlow Lite inference tool locally.

### `yarn build:tflite`

Builds WASM functions that can infer Meet and ML Kit segmentation models. The TFLite tool is built both with and without SIMD support.
