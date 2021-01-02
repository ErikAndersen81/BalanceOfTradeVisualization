import chroma from 'chroma-js';

const redGreen = ['d7191c', 'fdae61', 'ffffbf', 'a6d96a', '1a9641'];
const redBlue = ['d7191c','fdae61','ffffbf','abd9e9','2c7bb6']
const colorScale = chroma.scale(redBlue);

export { redGreen, redBlue } ;
export default colorScale;