/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useRef } from 'react';
import ColorScaleFig from './ColorScaleFig';
import CountriesSingleValue, { CountryKeys } from './CountriesSingleValue';
import { CountryCodeKey, Year } from '../types';
import { getScale } from '../Scaling';
import { FetchDataHook } from '../WTOAPI';
import Loading from '../Loading';
import { colorScaleSequential } from '../colorScale';

type MapSingleValueProps = {
  setCountry: React.Dispatch<React.SetStateAction<CountryCodeKey>>;
  category: string;
  product: string;
  year: Year;
};

const MapSingleValue = (props: MapSingleValueProps) => {
  const { setCountry, product, year, category } = { ...props };
  const svgRef = useRef<SVGSVGElement>(null);
  const { data, isLoading, isError, setParams } = FetchDataHook();
  useEffect(() => {
    const i = category === 'import' ? 'ITS_MTV_AM' : 'ITS_MTV_AX';
    setParams({ i, pc: product, ps: year });
  }, [product, year, category, setParams]);

  if (isError) {
    // TODO: show some meaningfull error to the user};
  }
  const records = data.filter(
    (record) =>
      CountryKeys.findIndex((a) => a === record.ReportingEconomyCode) >= 0
  );
  if (isLoading || records.length === 0)
    return (
      <div className='World'>
        <Loading />
      </div>
    );

  const scale = getScale(records.map((record) => record.Value));

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
        <CountriesSingleValue
          category={category}
          records={records}
          numericScale={scale}
          colorScale={colorScaleSequential}
          forwardRef={svgRef}
          setCountry={setCountry}
        />
        <ColorScaleFig
          category={category}
          colorScale={colorScaleSequential}
          numericScale={scale}
          unit={records[0].Unit}
        />
      </svg>
    </div>
  );
};
export default MapSingleValue;
