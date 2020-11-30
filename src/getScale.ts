const getScale = (values:Array<number>):Array<number> => {
    let nTicks:number = 5;
    let baseLine = [125, 150, 250, 500, 750, 1000];
    let max = values.reduce((x,y) => x>y ? x : y);
    let exactInterval:number = Math.ceil(max/nTicks);
    let head = parseInt((exactInterval + "").slice(0,3));
    let diffs = baseLine.map(val => Math.abs(val-head));
    let min = diffs.reduce((a,b) => a<b ? a: b);
    let interval = baseLine[diffs.indexOf(min)];
    let exp = Math.pow(10,(exactInterval + "").length-3);
    if (exp*interval*nTicks<max) {
        let idx = baseLine.indexOf(interval);
        if (idx < baseLine.length-1) interval = baseLine[idx+1];
        else {
            interval = 0;
            exp *= 10; 
        } 
    }
    interval = interval * exp;
    return (Array.from(Array(nTicks).keys()).map(val => val*interval))
}

export const adjustToScale = (value:number, chartHeight:number, maxVal:number) => {
    return chartHeight * value / maxVal;
}

export default getScale;