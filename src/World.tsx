import React, { useEffect, useRef } from 'react';
import Countries, { CountryKeys } from './Countries';
import { CountryCodeKey, DoubleRecord, Record, Year} from './types';
import { convertScaleToDivergent, FitToChart, getScale, Scale } from './Scaling';
import chroma from 'chroma-js';
import FetchDataHook from './FetchDataHook';
import Loading from './Loading';

type WorldProps = {
    country:CountryCodeKey
    setCountry: React.Dispatch<React.SetStateAction<CountryCodeKey>>
    product:string 
    year:Year 
    export:boolean
}

const World = (props:WorldProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const {data: exportData, isLoading: exportIsLoading, isError: exportIsError, setParams:exportSetParams} = FetchDataHook();
    const {data: importData, isLoading: importIsLoading, isError: importIsError, setParams:importSetParams} = FetchDataHook();
    useEffect( () => {
        importSetParams({i:"ITS_MTV_AM", pc:props.product, ps:props.year});
        exportSetParams({i:"ITS_MTV_AX", pc:props.product, ps:props.year    });
    }, [props.country, props.product, props.year, importSetParams]);

    if (exportIsError || importIsError) console.log(exportIsError, importIsError);
    if (exportIsLoading || exportData.length === 0 || importIsLoading || importData.length === 0) return <Loading/>;
    let exportRecords = exportData.filter(record => 0 <= CountryKeys.findIndex((a) => a === record.ReportingEconomyCode));
    let importRecords = importData.filter(record => 0 <= CountryKeys.findIndex((a) => a === record.ReportingEconomyCode));
    let records:Array<DoubleRecord> = mergeRecords(exportRecords, importRecords);
    let scale = getScale(records.map(record => record.exportValue-record.importValue));
    scale = convertScaleToDivergent(scale);
    let colorCode = ["d7191c",
        "fdae61",
        "ffffbf",
        "a6d96a",
        "1a9641"]
    const colorScale = chroma.scale(colorCode);
    return ( <div className="World"><svg
    ref={svgRef}
   width="80%"
   style={{strokeLinejoin: "round", stroke:"#000", fill: "none"}}
   version="1.1"
   viewBox="0 0 2000 1001"
   id="svg2">
  <defs
     id="defs4">
    <style
       type="text/css"
       id="style6"><path fillRule="evenodd"/></style>
  </defs>
  <rect x="20" y="940" width="40" height="40" fill="white"/>
  <text x="70" y="960" dominantBaseline="middle" textAnchor="left" fontSize="20" stroke="black" fill="black">Missing data</text>
<text x="1000" y="0" dominantBaseline="text-before-edge" textAnchor="middle" fontSize="37" stroke="black" fill="black">{props.year}</text>
        <Countries  records={records} numericScale={scale} colorScale={colorScale} forwardRef={svgRef} setCountry={props.setCountry}/>
</svg>
<ColorScaleFig colorScale={colorScale} numericScale={scale} unit={records[0].Unit}/>
</div>
    )
}

const mergeRecords = (exportRecs:Array<Record>, importRecs:Array<Record>):Array<DoubleRecord> => {
    let records:Array<DoubleRecord> = exportRecs.map(record => {
        let match = importRecs.find((recordB) => recordMatch(record,recordB));
        if (!match) return null; 
        return {...record, importValue:record.Value, exportValue:match.Value}  as DoubleRecord;
    }).filter((x):x is DoubleRecord => null !== x);
    return records;
}

const recordMatch = (a:Record, b:Record):boolean => {
    return a.ReportingEconomyCode === b.ReportingEconomyCode;
}

const ColorScaleFig = (props:{colorScale:chroma.Scale<chroma.Color>, numericScale:Scale, unit:string}) => {
    let offsets = props.colorScale.colors(10).map((color,idx) => <stop key={"offset"+idx} offset={(idx*10) + "%"} style={{stopColor:color }} />)
    let getPrefix = (value:number, scale:Scale) => {
        let prefix = "";
        if (value === scale.max) prefix += ">";
        if (value === scale.min) prefix += "<";
        return prefix;
    }
    let yTicks = props.numericScale.ticks.map( (val,idx) => (
        <g key={"group-tick" + idx}>
        <text key={"yTick"+idx} 
            x={16} 
            y={FitToChart(val, 100, props.numericScale)} 
            dominantBaseline="middle" 
            textAnchor="end"
            fill="black"
            fontSize="3">{getPrefix(val, props.numericScale) + val}
        </text>
        <path key={"tick" +idx} d={`M 17,${FitToChart(val, 100, props.numericScale)} L 20,${FitToChart(val, 100, props.numericScale)}`} stroke="black" strokeWidth="1"/>
        </g>    
        )
    );
    return (
        <svg height="400px" width="10%" viewBox="0 -20 30 125" >
  <defs>
    <linearGradient id="grad3" x1="0%" y1="100%" x2="0%" y2="0%">
        {offsets}
    </linearGradient>
  </defs>
    <text   x="15" y="-13" fontWeight="bold" textAnchor="middle" dominantBaseline="text-before-edge" fontSize="3">
        <tspan fill="#d7191c">Import</tspan> / <tspan fill="#1a9641">Export</tspan> Balance</text>
    <text x="15" y="-8" fontWeight="bold" textAnchor="middle" dominantBaseline="text-before-edge" fontSize="3">{props.unit}</text>
  <rect x="20" y="0"  width="8" height="100" fill="url(#grad3)" stroke="black" />
  {yTicks}
</svg>
    )
}


export default World;

/*
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!--
*************Map created by Simplemaps.com********************		
*************Attribution is highly appreciated!***************
*************http://simplemaps.com****************************

The MIT License (MIT)

Copyright (c) 2015 Pareto Softare, LLC DBA Simplemaps.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

-->
*/