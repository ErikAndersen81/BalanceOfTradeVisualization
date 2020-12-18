/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import { FetchDataHook } from '../WTOAPI';
import Loading from '../Loading';
import { getScale, FitToChart } from '../Scaling';
import { CountryCodeKey, Year } from '../types';
import Line from './Line';
import Dots from './Dots';
import HeaderBtn from './HeaderBtn';

type TimelineProps = {
  country: CountryCodeKey;
  product: string;
  year: Year;
  setYear: React.Dispatch<React.SetStateAction<Year>>;
};

// chartHeight refers to height of the part of the chart were the actual lines are displayed = 100
const Timeline = (props: TimelineProps) => {
  const { country, product, setYear, year } = { ...props };
  const [showExport, setShowExport] = useState<boolean>(true);
  const [showImport, setShowImport] = useState<boolean>(true);
  const {
    data: exportData,
    isLoading: exportIsLoading,
    isError: exportIsError,
    setParams: exportSetParams,
  } = FetchDataHook();
  const {
    data: importData,
    isLoading: importIsLoading,
    isError: importIsError,
    setParams: importSetParams,
  } = FetchDataHook();
  useEffect(() => {
    exportSetParams({
      i: 'ITS_MTV_AX',
      r: country,
      p: '000',
      pc: product,
      ps: '1995-2020',
    });
  }, [country, product, exportSetParams]);
  useEffect(() => {
    importSetParams({
      i: 'ITS_MTV_AM',
      r: country,
      p: '000',
      pc: product,
      ps: '1995-2020',
    });
  }, [country, product, importSetParams]);

  if (exportIsError || importIsError) {
    return null;
  }
  if (exportIsLoading || importIsLoading) return <Loading />;
  if (exportData.length === 0 || importData === null) return null;
  const xOffset = -60;
  const yOffset = -25;
  const unit = exportData[0].Unit;
  const values = exportData
    .map((record) => record.Value)
    .concat(importData.map((record) => record.Value));
  const scale = getScale(values);
  const xInterval = Math.floor(1000 / exportData.length);
  const yAxisCoords = scale.ticks.map(
    (value) =>
      ` M -15, ${FitToChart(value, 100, scale)} L  -8, ${FitToChart(
        value,
        100,
        scale
      )}`
  );
  const yAxis = (
    <path
      d={yAxisCoords.reduce((a, b) => a + b)}
      fill='none'
      stroke='black'
      strokeWidth='1'
    />
  );
  const yLabels = scale.ticks.map((value) => (
    <text
      key={`yLabel${value}`}
      textAnchor='end'
      dominantBaseline='middle'
      fontSize='10'
      x='-20'
      y={FitToChart(value, 100, scale)}
    >
      {value}
    </text>
  ));

  return (
    <div className='Chart'>
      <svg
        viewBox={`${xOffset} ${yOffset} 1060 130`}
        preserveAspectRatio='none'
        height='100%'
        width='100%'
      >
        <text
          strokeWidth='0'
          fontSize='10'
          fontWeight='bold'
          textAnchor='start'
          dominantBaseline='text-before-edge'
          x={xOffset + 10}
          y={yOffset}
        >
          {unit}
        </text>
        {yAxis}
        {yLabels}
        {showExport ? (
          <>
            <Line
              xInterval={xInterval}
              scale={scale}
              color='#1a9641'
              data={exportData}
            />
            <Dots
              xInterval={xInterval}
              scale={scale}
              color='#1a9641'
              data={exportData}
              year={year}
              setYear={setYear}
            />
          </>
        ) : null}
        {showImport ? (
          <>
            <Line
              xInterval={xInterval}
              scale={scale}
              color='#d7191c'
              data={importData}
            />
            <Dots
              xInterval={xInterval}
              scale={scale}
              color='#d7191c'
              data={importData}
              year={year}
              setYear={setYear}
            />
          </>
        ) : null}
        <HeaderBtn
          x={75}
          y={0}
          setShow={setShowExport}
          show={showExport}
          text='Export'
          color='#1a9641'
        />
        <HeaderBtn
          x={150}
          y={0}
          setShow={setShowImport}
          show={showImport}
          text='Import'
          color='#d7191c'
        />
      </svg>
    </div>
  );
};

export default Timeline;
