/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tf from '@tensorflow/tfjs';

import { Mtcnn } from './mtcnn';
const mtcnn = new Mtcnn();

import { img2NormalizedTensor } from './imgutils';


// import { Webcam } from './webcam';
// const webcamElem = document.getElementById('webcam');
// console.log('webcam=', webcamElem);
// const webcam = new Webcam(webcamElem);

// let isPredicting = true;

// async function predict() {
//     // ui.isPredicting();
//     while (isPredicting) {
//         const predictionResult = tf.tidy(() => {
//             const img = webcam.capture();
//             const results = mtcnn.pnet(img);
//             return results;
//         });

//         console.log(predictionResult);

//         await tf.nextFrame();
//     }
//     // ui.donePredicting();
// }

async function init() {

    // await webcam.setup();

    await mtcnn.loadModel();

    // tf.tidy(() => mtcnn.pnet(webcam.capture())); // Warm up the model

    // window.setTimeout(() => {
    //     predict();
    // }, 0);

    //tf.tidy(() => {
    const imageElem = document.querySelector('#test-image');
    console.log('imageElem', imageElem);
    const image = img2NormalizedTensor(imageElem);
    console.log('image', image);
    mtcnn.pnet(image).then((outputs) => {
        const classification = outputs['pnet/conv4-2/BiasAdd'];
        const probability = outputs['pnet/prob1'];
        console.log('classification.shape', classification.shape, 'probability.shape', probability.shape);
        classification.print();
        probability.print();
    });
    //});

}

document.addEventListener('DOMContentLoaded', () => console.log('DOMContentLoaded'))

document.addEventListener('DOMContentLoaded', function() {
    init();
})