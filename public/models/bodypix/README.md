# BodyPix

BodyPix TFLite files have been generated using [@PINTO0309](https://github.com/PINTO0309)'s work using the [integer quantized models](https://github.com/PINTO0309/PINTO_model_zoo/tree/main/035_BodyPix/03_integer_quantization).

The purpose of these models is to perform the inference through a WASM (and optionnally SIMD) build of TensorFlow Lite. The full integer quantization seems to be the most appropriate for this use case according to [TensorFlow Lite documentation](https://www.tensorflow.org/lite/performance/post_training_quantization#optimization_methods).
