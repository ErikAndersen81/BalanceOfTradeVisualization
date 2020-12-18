import {Record} from './types'

const comparePeriods = (a: Record, b: Record): number => {
    const ap = a.Year ? a.Year : 1;
    const bp = b.Year ? b.Year : 1;
    return ap - bp;
  };
  
export default comparePeriods