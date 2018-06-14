;
import * as nj from './node_modules/numjs';
import * as tf from '@tensorflow/tfjs';

export function img2NormalizedTensor(img) {
    // Reads the image as a Tensor from the webcam <video> element.
    const _img = tf.fromPixels(img);

    // Crop the image so we're using the center square of the rectangular
    // webcam.
    const croppedImage = cropImage(_img);

    // Expand the outer most dimension so we have a batch size of 1.
    const batchedImage = croppedImage.expandDims(0);

    // Normalize the image between -1 and 1. The image comes in between 0-255,
    // so we divide by 127 and subtract 1.
    return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
}

/**
 * Crops an image tensor so we get a square image with no white space.
 * @param {Tensor4D} img An input image Tensor to crop.
 */
export function cropImage(img) {
    const size = Math.min(img.shape[0], img.shape[1]);
    const centerHeight = img.shape[0] / 2;
    const beginHeight = centerHeight - (size / 2);
    const centerWidth = img.shape[1] / 2;
    const beginWidth = centerWidth - (size / 2);
    return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
}

export function img2tensor(img) {
    // Reads the image as a Tensor from the webcam <video> element.
    const _img = tf.fromPixels(img);
    return _img;
}

/**
 *
 * @param {*} img
 * @param {*} sz
 *
 *
 *   python code: im_data = cv2.resize(img, (sz[1], sz[0]), interpolation=cv2.INTER_AREA) #@UndefinedVariable
 *
 */
export async function imresample(img, sz) {
    /*
    im_data = cv2.resize(img, (sz[1], sz[0]), interpolation=cv2.INTER_AREA) #@UndefinedVariable
    */
    const image = new Image();
}