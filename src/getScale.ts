const getScale = (values:Array<number>):Array<number> => {
    const nTicks:number = 5;
    const baseLine = [125, 150, 250, 500, 750, 1000];
    const max = values.reduce((x,y) => x>y ? x : y);
    const exactInterval:number = Math.ceil(max/nTicks);
    const head = parseInt((`${exactInterval}`).slice(0,3), 10);
    const diffs = baseLine.map(val => Math.abs(val-head));
    const min = diffs.reduce((a,b) => a<b ? a: b);
    let interval = baseLine[diffs.indexOf(min)];
    let exp = 10**(`${exactInterval}`).length-3;
    if (exp*interval*nTicks<max) {
        const idx = baseLine.indexOf(interval);
        if (idx < baseLine.length-1) interval = baseLine[idx+1];
        else {
            interval = 0;
            exp *= 10; 
        } 
    }
    interval *= exp;
    return (Array.from(Array(nTicks).keys()).map(val => val*interval))
}

export const adjustToScale = (value:number, chartHeight:number, maxVal:number) => (
    chartHeight * value / maxVal
)

export default getScale;