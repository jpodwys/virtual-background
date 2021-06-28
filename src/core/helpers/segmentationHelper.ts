export type SegmentationModel = 'meet'
export type SegmentationBackend = 'webgl' | 'wasm' | 'wasmSimd'
export type InputResolution = '256x144' | '160x96' | '144x256' | '256x256'

export const inputResolutions: {
  [resolution in InputResolution]: [number, number]
} = {
  '256x144': [256, 144],
  '160x96': [160, 96],
  '144x256': [144, 256],
  '256x256': [256, 256]
}

export type PipelineName = 'webgl2'

export type SegmentationConfig = {
  model: SegmentationModel
  backend: SegmentationBackend
  inputResolution: InputResolution
  pipeline: PipelineName
}
