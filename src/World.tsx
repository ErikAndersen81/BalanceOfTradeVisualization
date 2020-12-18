/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useRef } from 'react';
import chroma from 'chroma-js';
import ColorScaleFig from 'ColorScaleFig';
import Countries, { CountryKeys } from './Countries';
import { CountryCodeKey, DoubleRecord, Year } from './types';
import { convertScaleToDivergent, getScale } from './Scaling';
import FetchDataHook from './FetchDataHook';
import Loading from './Loading';
import mergeRecords from './mergeRecords';

type WorldProps = {
  country: CountryCodeKey;
  setCountry: React.Dispatch<React.SetStateAction<CountryCodeKey>>;
  product: string;
  year: Year;
};

const World = (props: WorldProps) => {
  const { country, setCountry, product, year } = { ...props };
  const svgRef = useRef<SVGSVGElement>(null);
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
    importSetParams({ i: 'ITS_MTV_AM', pc: product, ps: year });
    exportSetParams({ i: 'ITS_MTV_AX', pc: product, ps: year });
  }, [country, product, year, importSetParams, exportSetParams]);

  if (exportIsError || importIsError) {
    // TODO: show some meaningfull error to the user};
  }
  if (
    exportIsLoading ||
    exportData.length === 0 ||
    importIsLoading ||
    importData.length === 0
  )
    return <Loading />;
  const exportRecords = exportData.filter(
    (record) =>
      CountryKeys.findIndex((a) => a === record.ReportingEconomyCode) >= 0
  );
  const importRecords = importData.filter(
    (record) =>
      CountryKeys.findIndex((a) => a === record.ReportingEconomyCode) >= 0
  );
  const records: Array<DoubleRecord> = mergeRecords(
    exportRecords,
    importRecords
  );
  let scale = getScale(
    records.map((record) => record.exportValue - record.importValue)
  );
  scale = convertScaleToDivergent(scale);
  const colorCode = ['d7191c', 'fdae61', 'ffffbf', 'a6d96a', '1a9641'];
  const colorScale = chroma.scale(colorCode);
  return (
    <div className='World'>
      <svg
        ref={svgRef}
        width='100%'
        style={{ strokeLinejoin: 'round', stroke: '#000', fill: 'none' }}
        version='1.1'
        viewBox='0 0 2000 1001'
        id='svg2'
      >
        <defs id='defs4'>
          <style type='text/css' id='style6'>
            <path fillRule='evenodd' />
          </style>
        </defs>
        <rect x='20' y='380' width='30' height='30' fill='white' />
        <text
          x='55'
          y='395'
          dominantBaseline='middle'
          textAnchor='left'
          fontSize='20'
          stroke='none'
          fill='black'
        >
          Missing data
        </text>
        <text
          x='1000'
          y='0'
          dominantBaseline='text-before-edge'
          textAnchor='middle'
          fontSize='37'
          stroke='black'
          fill='black'
        >
          {year}
        </text>
        <Countries
          records={records}
          numericScale={scale}
          colorScale={colorScale}
          forwardRef={svgRef}
          setCountry={setCountry}
        />
        <ColorScaleFig
          colorScale={colorScale}
          numericScale={scale}
          unit={records[0].Unit}
        />
      </svg>
    </div>
  );
};
export default World;
