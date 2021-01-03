import chroma from 'chroma-js';

const redGreen = ['d7191c', 'fdae61', 'ffffbf', 'a6d96a', '1a9641'];
const redBlue = ['d7191c','fdae61','ffffbf','abd9e9','2c7bb6']
const purple = ['edf8fb','b3cde3','8c96c6','8856a7','810f7c']
const colorScale = chroma.scale(redBlue);
const colorScaleSequential = chroma.scale(purple);

export { redGreen, redBlue, colorScaleSequential } ;
export default colorScale;