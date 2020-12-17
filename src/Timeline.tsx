import React, { useEffect, useState } from "react";
import FetchDataHook from "./FetchDataHook";
import Loading from "./Loading";
import { getScale, Scale } from "./Scaling";
import { FitToChart } from "./Scaling";
import { CountryCodeKey, Record, Year } from "./types";

type TimelineProps = {
    country:CountryCodeKey
    product:string
    year:Year
    setYear:React.Dispatch<React.SetStateAction<Year>>
}

export const comparePeriods = (a:Record, b:Record) :number=> {
    let ap = a.Year ? a.Year : 1
    let bp = b.Year ? b.Year :1 
    return  ap - bp
}

// chartHeight refers to height of the part of the chart were the actual lines are displayed = 100
const Timeline = (props:TimelineProps) => {
    const [showExport, setShowExport] = useState<boolean>(true);
    const [showImport, setShowImport] = useState<boolean>(true);
    const {data: exportData, isLoading: exportIsLoading, isError: exportIsError, setParams: exportSetParams} = FetchDataHook();
    const {data: importData, isLoading: importIsLoading, isError: importIsError, setParams:importSetParams} = FetchDataHook();
    useEffect( () => {
        exportSetParams({i:"ITS_MTV_AX",r:props.country, p:"000", pc:props.product, ps:"1995-2020"});
    }, [props.country, props.product, exportSetParams])
    useEffect( () => {
        importSetParams({i:"ITS_MTV_AM", r:props.country, p:"000", pc:props.product, ps:"1995-2020"});
    }, [props.country, props.product, importSetParams])

    if (exportIsError || importIsError) {
        console.log(exportIsError, importIsError);
        return null;
    } else if (exportIsLoading || importIsLoading) return <Loading />;
    if (exportData.length === 0 || importData === null) return null;

    let xOffset = -60;
    let yOffset = -25;
    let unit = exportData[0].Unit;
    let values = exportData.map(record => record.Value).concat(importData.map(record => record.Value));
    let scale = getScale(values);
    let xInterval = Math.floor(1000/exportData.length); 
    let yAxisCoords = scale.ticks.map((value) =>  ` M -15, ${FitToChart(value, 100, scale)} L  -8, ${FitToChart(value, 100, scale)}` )
    let yAxis = <path d={yAxisCoords.reduce((a,b) => a+b)}  fill="none" stroke ="black" strokeWidth="1"/>;
    let yLabels = scale.ticks.map((value,idx) => <text key={"yLabel" + idx} textAnchor="end" dominantBaseline="middle" fontSize="10" x="-20" y={FitToChart(value, 100, scale)}>{value}</text>)
  
    return (
      <div className="Chart">
                  <svg viewBox={`${xOffset} ${yOffset} 1060 130`}
                      preserveAspectRatio="none"
                      height="100%"
                      width="100%">
                          <text strokeWidth="0"
                              fontSize="10"
                              fontWeight="bold"
                              textAnchor="start"
                              dominantBaseline="text-before-edge"
                              x={xOffset + 10}
                              y={yOffset}>{unit}</text>
                              {yAxis} {yLabels}
                              {showExport ? (<><Line xInterval={xInterval} scale={scale} color="#1a9641" data={exportData}/>
                              <Dots xInterval={xInterval} scale={scale} color="#1a9641" data={exportData} year={props.year} setYear={props.setYear}/></>) : null}
                              {showImport ? (<><Line xInterval={xInterval} scale={scale} color="#d7191c" data={importData}/>
                              <Dots xInterval={xInterval} scale={scale} color="#d7191c" data={importData} year={props.year} setYear={props.setYear}/></>) : null}
                              <HeaderBtn x={75} setShow={setShowExport} show={showExport} text="Export" color="#1a9641"/>
                              <HeaderBtn x={150} setShow={setShowImport} show={showImport} text="Import" color="#d7191c"/> 
                  </svg>
              </div>
    );
  }


type HeaderBtnProps = {
    x:number
    show:boolean
    text:string 
    color:string 
    setShow:React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderBtn = (props:HeaderBtnProps) => {
    let y = -22;
    let height = 16;
    const handleClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.preventDefault();
        props.setShow(!props.show);
    }
    let classes = props.show ? "Button Up" : "Button Down";
    return (
        <g onClick={e => handleClick(e)}>
        <rect stroke="gray" width="70" height={height} y={y} x={props.x} className={classes}/> 
        <text strokeWidth="0"
            fill={props.color}
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            x={props.x + 35}
            y={y + height/2}> {props.text} </text>
        </g>
    )
}

type DotsProps = {
    xInterval:number
    data:Array<Record>
    scale:Scale
    color:string
    year:Year
    setYear:React.Dispatch<React.SetStateAction<Year>>
}
const Dots = (props:DotsProps) => {
    if (props.data.length === 0) return null;
    let dots = props.data.sort(comparePeriods).map((record,idx) => (
        <Dot key={"dot"+idx} cy={FitToChart(record.Value, 100, props.scale)} cx ={idx * props.xInterval} record={record} color={props.color} year={props.year} setYear={props.setYear} />
        ))
        return (<>{dots}</>) 
}

type LineProps = {
    xInterval:number
    data: Array<Record>
    scale:Scale
    color:string
}

const Line = (props:LineProps) => {
    if (props.data.length === 0) return null;
    let lineCoords = props.data.sort(comparePeriods).map((record, idx) => (
        idx === 0 ? ` M ${idx*props.xInterval}, ${FitToChart(record.Value,100,props.scale)}` : ` L ${idx*props.xInterval}, ${FitToChart(record.Value,100,props.scale)}`)
    )
    let linePath = <path d={lineCoords.reduce((a,b) => a+b)} fill="none" stroke={props.color} strokeWidth=".5"/>
    return linePath
}

type DotProps = {
    record:Record,
    color:string
    cx:number
    cy:number
    year:Year
    setYear:React.Dispatch<React.SetStateAction<Year>>
}

const Dot = (props:DotProps) => {
    const [hover, setHover] = useState<boolean>(false);

    const handleClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.preventDefault();
        props.setYear(props.record.Year ? props.record.Year : props.year )
    }

    let [width, height] = [120, 40]
    let offset = 5;
    let x = props.cx-(width+offset) < 0 ? props.cx  : props.cx-(width+offset);
    let y = props.cy>50  ? props.cy - (height + offset) : props.cy + offset;
    let category = props.color === "#d7191c" ? "Import" : "Export";
    let info = (
    <defs>
    <g id="dotsInfo">
        <rect x={x} 
            y={y} 
            width={width} 
            height={height}
            rx="2"
            fill="gray"
            fillOpacity=".3"
            stroke="black"/>
    <text x={x + width/2 } y={y} fontWeight="bold" fontSize="10" textAnchor="middle" dominantBaseline="text-before-edge">{ category  }</text>
    <text x={x +3 } y={y + 12} fontSize="10" dominantBaseline="text-before-edge">{props.record.Year ? "Year:"  + props.record.Year : ""}</text>
    <text x={x +3 } y={y + 23} fontSize="10" dominantBaseline="text-before-edge">{props.record.Unit +": " + props.record.Value}</text>
     </g></defs>)

    let dot = <circle className="Dot" cy={props.cy} cx ={props.cx} r="5" stroke="white" fill={props.color} strokeWidth="2"/>
    return (
        <g onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)} onClick={handleClick}>  
         {dot} {hover ? info:null}
          
         {
         <use xlinkHref="#dotsInfo" />// xlinkHref IS GOLD WHEN COMPUTATIONALLY ADDING COMPONENTS: Set z-index (or draw last)
         }
         </g>)
}

  export default Timeline;