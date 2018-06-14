# mtcnn-align

ongoing trial to implement mtcnn in tensorflow.js.
base code copied from https://github.com/davidsandberg/facenet.

# current status

- load model / weights from facenet/src/align
- save loaded model / weights as savedmodel (tensorflowjs_model.pb, weights_manifest.json, ...)
- load savedmodel pnet into tensorflow.js
- TBD implement glue logic (e.g.: detect_face() in detect_face.py) in javascript

