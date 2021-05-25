declare function createTFLiteModule(): Promise<TFLite>
declare function createTFLiteSIMDModule(): Promise<TFLite>

export interface TFLite extends EmscriptenModule {
  _getModelBufferMemoryOffset(): number
  _getInputMemoryOffset(): number
  _getInputHeight(): number
  _getInputWidth(): number
  _getInputChannelCount(): number
  _getOutputMemoryOffset(): number
  _getOutputHeight(): number
  _getOutputWidth(): number
  _getOutputChannelCount(): number
  _loadModel(bufferSize: number): number
  _runInference(): number
}

export async function getTFLite() {
  // const [tflite, setTFLite] = useState<TFLite>()
  // const [tfliteSIMD, setTFLiteSIMD] = useState<TFLite>()
  // const [selectedTFLite, setSelectedTFLite] = useState<TFLite>()
  // const [isSIMDSupported, setSIMDSupported] = useState(false)

  let tflite: any;
  let isSIMDSupported: boolean = true;

  async function loadTFLite() {
    try {
      tflite = await createTFLiteSIMDModule();
    } catch (error) {
      isSIMDSupported = false;
      tflite = await createTFLiteModule();
      console.warn('Failed to create TFLite SIMD WebAssembly module.', error)
    }
  }

  async function loadTFLiteModel() {
    if (
      !tflite //||
      // (isSIMDSupported && !tfliteSIMD) ||
      // (!isSIMDSupported && segmentationConfig.backend === 'wasmSimd')
    ) {
      return
    }

    const modelResponse = await fetch(
      `https://volcomix.github.io/virtual-background/models/segm_lite_v681.tflite`
      // `https://volcomix.github.io/virtual-background/models/segm_full_v679.tflite`
    )
    const model = await modelResponse.arrayBuffer()
    const modelBufferOffset = tflite._getModelBufferMemoryOffset()
    tflite.HEAPU8.set(new Uint8Array(model), modelBufferOffset)
    tflite._loadModel(model.byteLength)
  }

  await loadTFLite()
  await loadTFLiteModel()

  return { tflite, isSIMDSupported }
}
