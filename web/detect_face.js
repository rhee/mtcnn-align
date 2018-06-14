
import * as nj from './node_modules/numjs';
import './imgutils';

/**
 *
 * @param {*} img input image
 * @param {*} minsize minimum faces' size
 * @param {*} pnet loaded frozen model
 * @param {*} rnet loaded frozen model
 * @param {*} onet loaded frozen model
 * @param {*} threshold threshold=[th1, th2, th3], th1-3 are three steps's threshold
 * @param {*} factor the factor used to create a scaling pyramid of face sizes to detect in the image.
 *
 */
export function detect_face(img, minsize, pnet, rnet, onet, threshold, factor) {
    /**
     *
     */
    let factor_count = 0;
    // total_boxes = np.empty((0,9));
    const points = [];
    const h = img.srcHeight;
    const w = img.srcWidth;
    let min1 = Math.min(w, h);
    const m = 12.0 / minsize;
    min1 = min1 * m;
    // create scale pyramid
    const scales = []
    while (min >= 12) {
        scales += [m * Math.pow(factor, factor_count)]
        min1 = min1 * factor;
        factor_count += 1;
    }

    // first stage
    scales.forEach((scale) => {
        const hs = Math.ceil(h * scale);
        const ws = Math.ceil(h * scale);
        let im_data = imgResample(img, (hs, ws));
        im_data = (im_data - 127.5) * 0.0078125;
        // XXX TBD
    });

    // XXX TBD

}

/**
 *
 * @param {*} images list containing input images
 * @param {*} detection_window_size_ratio ratio of minimum face size to smallest image dimension
 * @param {*} pnet loaded frozen model
 * @param {*} rnet loaded frozen model
 * @param {*} onet loaded frozen model
 * @param {*} threshold threshold=[th1 th2 th3], th1-3 are three steps's threshold [0-1]
 * @param {*} factor the factor used to create a scaling pyramid of face sizes to detect in the image.
 *
 */
export function bulk_detect_face(images, detection_window_size_ratio, pnet, rnet, onet, threshold, factor) {
    /**
     *
     */
}

/**
 *
 * @param {*} boundingbox
 * @param {*} reg
 *
 * function [boundingbox] = bbreg(boundingbox,reg)
 * Calibrate bounding boxes
 *
 */
export function bbreg(boundingbox, reg) {
    /*
    if reg.shape[1]==1:
        reg = np.reshape(reg, (reg.shape[2], reg.shape[3]))

    w = boundingbox[:,2]-boundingbox[:,0]+1
    h = boundingbox[:,3]-boundingbox[:,1]+1
    b1 = boundingbox[:,0]+reg[:,0]*w
    b2 = boundingbox[:,1]+reg[:,1]*h
    b3 = boundingbox[:,2]+reg[:,2]*w
    b4 = boundingbox[:,3]+reg[:,3]*h
    boundingbox[:,0:4] = np.transpose(np.vstack([b1, b2, b3, b4 ]))
    */
}

/**
 *
 * @param {*} imap
 * @param {*} reg
 * @param {*} scale
 * @param {*} t
 *
 * Use heatmap to generate bounding boxes
 *
 */
export function generateBoundingBox(imap, reg, scale, t) {
    /*
    stride=2
    cellsize=12

    imap = np.transpose(imap)
    dx1 = np.transpose(reg[:,:,0])
    dy1 = np.transpose(reg[:,:,1])
    dx2 = np.transpose(reg[:,:,2])
    dy2 = np.transpose(reg[:,:,3])
    y, x = np.where(imap >= t)
    if y.shape[0]==1:
        dx1 = np.flipud(dx1)
        dy1 = np.flipud(dy1)
        dx2 = np.flipud(dx2)
        dy2 = np.flipud(dy2)
    score = imap[(y,x)]
    reg = np.transpose(np.vstack([ dx1[(y,x)], dy1[(y,x)], dx2[(y,x)], dy2[(y,x)] ]))
    if reg.size==0:
        reg = np.empty((0,3))
    bb = np.transpose(np.vstack([y,x]))
    q1 = np.fix((stride*bb+1)/scale)
    q2 = np.fix((stride*bb+cellsize-1+1)/scale)
    boundingbox = np.hstack([q1, q2, np.expand_dims(score,1), reg])
    return boundingbox, reg
    */
}

/**
 *
 * @param {*} boxes
 * @param {*} threshold
 * @param {*} method
 *
 * function pick = nms(boxes,threshold,type)
 *
 */
export function nms(boxes, threshold, method) {
    /*
    if boxes.size==0:
        return np.empty((0,3))
    x1 = boxes[:,0]
    y1 = boxes[:,1]
    x2 = boxes[:,2]
    y2 = boxes[:,3]
    s = boxes[:,4]
    area = (x2-x1+1) * (y2-y1+1)
    I = np.argsort(s)
    pick = np.zeros_like(s, dtype=np.int16)
    counter = 0
    while I.size>0:
        i = I[-1]
        pick[counter] = i
        counter += 1
        idx = I[0:-1]
        xx1 = np.maximum(x1[i], x1[idx])
        yy1 = np.maximum(y1[i], y1[idx])
        xx2 = np.minimum(x2[i], x2[idx])
        yy2 = np.minimum(y2[i], y2[idx])
        w = np.maximum(0.0, xx2-xx1+1)
        h = np.maximum(0.0, yy2-yy1+1)
        inter = w * h
        if method is 'Min':
            o = inter / np.minimum(area[i], area[idx])
        else:
            o = inter / (area[i] + area[idx] - inter)
        I = I[np.where(o<=threshold)]
    pick = pick[0:counter]
    return pick
    */
}

/**
 *
 * @param {*} total_boxes
 * @param {*} w
 * @param {*} h
 *
 * Compute the padding coordinates (pad the bounding boxes to square)
 * function [dy edy dx edx y ey x ex tmpw tmph] = pad(total_boxes,w,h)
 *
 */
export function pad(total_boxes, w, h) {
    /*
    tmpw = (total_boxes[:,2]-total_boxes[:,0]+1).astype(np.int32)
    tmph = (total_boxes[:,3]-total_boxes[:,1]+1).astype(np.int32)
    numbox = total_boxes.shape[0]

    dx = np.ones((numbox), dtype=np.int32)
    dy = np.ones((numbox), dtype=np.int32)
    edx = tmpw.copy().astype(np.int32)
    edy = tmph.copy().astype(np.int32)

    x = total_boxes[:,0].copy().astype(np.int32)
    y = total_boxes[:,1].copy().astype(np.int32)
    ex = total_boxes[:,2].copy().astype(np.int32)
    ey = total_boxes[:,3].copy().astype(np.int32)

    tmp = np.where(ex>w)
    edx.flat[tmp] = np.expand_dims(-ex[tmp]+w+tmpw[tmp],1)
    ex[tmp] = w

    tmp = np.where(ey>h)
    edy.flat[tmp] = np.expand_dims(-ey[tmp]+h+tmph[tmp],1)
    ey[tmp] = h

    tmp = np.where(x<1)
    dx.flat[tmp] = np.expand_dims(2-x[tmp],1)
    x[tmp] = 1

    tmp = np.where(y<1)
    dy.flat[tmp] = np.expand_dims(2-y[tmp],1)
    y[tmp] = 1

    return dy, edy, dx, edx, y, ey, x, ex, tmpw, tmph
    */
}

/**
 *
 * @param {*} bboxA nj.array
 *
 * Convert bboxA to square
 * function [bboxA] = rerec(bboxA)
 *
 */
export function rerec(bboxA) {
    /*
        h = bboxA[:,3]-bboxA[:,1]
        w = bboxA[:,2]-bboxA[:,0]
        l = np.maximum(w, h)
        bboxA[:,0] = bboxA[:,0]+w*0.5-l*0.5
        bboxA[:,1] = bboxA[:,1]+h*0.5-l*0.5
        bboxA[:,2:4] = bboxA[:,0:2] + np.transpose(np.tile(l,(2,1)))
    */
   h = bboxA.slice(null,[3,4]) - bboxA.slice(null,1);
   w = bboxA.slice(null,2) - bboxA.slice(null, 0);
   l = nj.???;
}