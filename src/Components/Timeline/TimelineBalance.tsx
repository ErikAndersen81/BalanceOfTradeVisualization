/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';
import { FetchDataHook } from '../WTOAPI';
import Loading from '../Loading';
import { getScale, FitToChart } from '../Scaling';
import { CountryCodeKey, Year, Record } from '../types';
import Line from './Line';
import Dots from './Dots';
import mergeRecords from '../mergeRecords';

type TimelineProps = {
  country: CountryCodeKey;
  product: string;
  year: Year;
  setYear: React.Dispatch<React.SetStateAction<Year>>;
};

// chartHeight refers to height of the part of the chart were the actual lines are displayed = 100
const TimelineBalance = (props: TimelineProps) => {
  const { country, product, setYear, year } = { ...props };
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
  if (exportData.length === 0 || importData.length === null) return null;
  const records: Record[] = mergeRecords(exportData, importData).map(
    (record) => ({
      PartnerEconomy: record.PartnerEconomy,
      PartnerEconomyCode: record.PartnerEconomyCode,
      PeriodeCode: record.PeriodeCode,
      ProductOrSector: record.ProductOrSector,
      ReportingEconomy: record.ReportingEconomy,
      ReportingEconomyCode: record.ReportingEconomyCode,
      Unit: record.Unit,
      Year: record.Year ? record.Year : 1999,
      Value: record.exportValue - record.importValue,
    })
  );
  const xOffset = -60;
  const yOffset = -25;
  const unit = exportData[0].Unit;
  const values = records.map((record) => record.Value);
  if (values.length === 0) return null;
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
    <div className='Timeline'>
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
        <g>
          <rect
            stroke='gray'
            width='84'
            height={16}
            y={-16}
            x={75}
            rx='5'
            className='Button'
          />
          <text
            strokeWidth='0'
            fill='lightgray'
            fontSize='12'
            fontWeight='bold'
            textAnchor='middle'
            dominantBaseline='text-after-edge'
            x={117}
            y={0}
          >
            Trade Balance
          </text>
        </g>
        <>
          <Line
            xInterval={xInterval}
            scale={scale}
            color='black'
            data={records}
          />
          <Dots
            xInterval={xInterval}
            category='Trade Balance'
            scale={scale}
            color='black'
            data={records}
            year={year}
            setYear={setYear}
          />
        </>
      </svg>
    </div>
  );
};

export default TimelineBalance;
