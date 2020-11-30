export type Scale = {
    ticks: Array<number>
    min:number
    max:number
    interval:number
    range:number
}

export const getScale = (values:Array<number>):Scale => {
    let nTicks:number = 5;
    let stepSizes:Array<number> = [100, 125, 150, 250, 500, 750, 1000];
    let max:number = values.reduce((x,y) => x>y ? x : y);
    let min:number = values.reduce((x,y) => x<y ? x : y);
    let range:number = max - min;
    let digits:number = (max + "").length;
    let exactInterval:number = range/nTicks;
    let exactIntervalHead:number =  parseInt((exactInterval + "").slice(0,3))
    let stepIndex:number = stepSizes.findIndex(x => x > exactIntervalHead) ;
    let interval:number = stepSizes[stepIndex] * Math.pow(10,(digits -3));
    interval = interval > range ? interval/10 : interval;
    let a = 1
    while (a * interval < Math.abs(min) ) { a += 1; }
    let scaleMin:number = min > 0 ? interval * (a-1) : interval * -a;
    if (scaleMin + interval * nTicks  < max) {
        stepIndex = stepIndex === 6 ? 1 : ++stepIndex;
        interval = stepSizes[stepIndex] * Math.pow(10,(digits -3))
        interval = interval > range ? interval/10 : interval;
    } 
    let scale = Array(nTicks).fill(0).map((_ , idx) => scaleMin + idx * interval);
    return {
        ticks:scale,
        min:scaleMin,
        max:scale[scale.length-1],
        range:  scale[scale.length-1] - scale[0],
        interval:interval,
    }
}

export const convertScaleToDivergent = (scale:Scale):Scale => {
    let i = 0;
    let divScale:Array<number>;
    if (scale.min < 0 ) {
        while (i * scale.interval + scale.min < 0) i++;
        divScale = Array(2*i + 1).fill(0).map((_, idx) => idx * scale.interval + scale.min)
    }  else {
        while (i * scale.interval - scale.max < 0) i++;
        divScale = Array(2*i + 1).fill(0).map((_, idx) => idx * scale.interval - scale.max)
    }
    while (divScale.length > scale.ticks.length ) divScale = divScale.filter((_ , idx) => !(idx === 0 || idx === divScale.length-1));
    let min = divScale[0]
    let max = divScale[divScale.length-1];
    let range = max-min;
    return {
        min:min, 
        max:max, 
        range:range,
        ticks:divScale,
        interval:scale.interval
    }
}

export const FitToChart = (value:number, chartHeight:number, scale:Scale) => {
    let scalar = chartHeight/scale.range;
    return chartHeight - (value - scale.min) * scalar;
}
