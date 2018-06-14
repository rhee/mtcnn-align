/**
 *
 */
import { loadFrozenModel } from '@tensorflow/tfjs-converter';

export class Mtcnn {

    /**
     *
     */
    async loadModel() {
        // const url_base = "http://10.100.0.156:5001";
        const url_base = "http://localhost:5001";
        const MODEL_URL = url_base + "/web_model/tensorflowjs_model.pb";
        const WEIGHTS_URL = url_base + "/web_model/weights_manifest.json";
        const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL); //, {mode:'no-cors'});
        this.model = model;
    }

    /**
     *
     * @param {*} input "pnet/input"
     *
     * @returns XXX "pnet/conv4-2/BiasAdd", "pnet/prob1"
     *
     */
    async pnet(input) {
        console.log('pnet called, model=',this.model,'input=',input);
        const inputs = {
            "pnet/input": input,
            "rnet/input": input,
            "onet/input": input,
        }
        const outputs = ["pnet/conv4-2/BiasAdd", "pnet/prob1"]
        return this.model.execute(inputs, outputs);
    }

    /**
     *
     * @param {*} input "rnet/input"
     *
     * @returns XXX "rnet/conv5-2/conv5-2", "rnet/prob1"
     *
     */
    async rnet(input) {
        const inputs = {
            "pnet/input": input,
            "rnet/input": input,
            "onet/input": input,
        }
        const outputs = ["rnet/conv5-2/conv5-2", "rnet/prob1"]
        return this.model.execute(inputs, outputs);
    }

    /**
     *
     * @param {*} input "onet/input"
     *
     * @returns XXX "onet/conv6-2/conv6-2", "onet/prob1"
     */
    async onet_1(input) {
        const inputs = {
            "pnet/input": input,
            "rnet/input": input,
            "onet/input": input,
        }
        const outputs = ["onet/conv6-2/conv6-2", "onet/prob1"]
        return this.model.execute(inputs, outputs)
    }

    /**
     *
     * @param {*} input "onet/input"
     *
     * @returns XXX "onet/conv6-3/conv6-3", "onet/prob1"
     */
    async onet_2(input) {
        const inputs = {
            "pnet/input": input,
            "rnet/input": input,
            "onet/input": input,
        }
        const outputs = ["onet/conv6-3/conv6-3", "onet/prob1"]
        return this.model.execute(inputs, outputs)
    }

}