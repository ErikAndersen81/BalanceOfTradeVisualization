/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import chroma from 'chroma-js';
import { CountryCodeKey, Record } from '../types';
import CountryCodes from '../CountryCodes';
import CountryPaths from './CountryPaths';
import { FitToChart, Scale } from '../Scaling';

export const CountryKeys: Array<CountryCodeKey> = Object.keys(
  CountryPaths
).filter(
  (key) => CountryPaths[key as CountryCodeKey] !== ''
) as Array<CountryCodeKey>;

const IrelevantCountry = (props: { country: CountryCodeKey }) => {
  const { country } = { ...props };
  const d = CountryPaths[country];
  return (
    <path
      id={country}
      data-id={country}
      d={d}
      fill='white'
      fillRule='evenodd'
      stroke='gray'
    />
  );
};

type CountryProps = {
  record: Record;
  fill: string;
  active: boolean;
  setCountry: React.Dispatch<React.SetStateAction<CountryCodeKey>>;
};

const Country = (props: CountryProps) => {
  const { record, fill, active, setCountry } = { ...props };
  const d = CountryPaths[record.ReportingEconomyCode];
  if (d === '') {
    return null;
  }
  const handleClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    e.preventDefault();
    setCountry(record.ReportingEconomyCode);
  };

  return (
    <g onClick={(e) => handleClick(e)} className='Country'>
      <path
        id={record.ReportingEconomyCode}
        data-id={record.ReportingEconomyCode}
        d={d}
        strokeWidth={active ? '5' : '1'}
        stroke={active ? 'gray' : ''}
        fill={fill}
        fillRule='evenodd'
      />
    </g>
  );
};

type InfoProps = {
  category: string;
  country: string;
  Value: number;
  offset: { x: number; y: number };
  unit: string;
} | null;

const Info = (props: InfoProps) => {
  const { country, Value, unit, offset, category } = {
    ...props,
  };
  let { x, y } = offset || { x: 0, y: 0 };
  x = x > 1000 ? x - 400 : x + 50;
  y = y < 500 ? y - 115 : y - 5;
  return (
    <g id='countryInfo'>
      <rect
        rx='5'
        fillOpacity='.6'
        fill='white'
        stroke='black'
        x={2 + x}
        y={2 + y}
        width='300'
        height='110'
      />
      <text
        x={5 + x}
        y={5 + y}
        textAnchor='left'
        fontSize='30'
        fontWeight='bold'
        fill='black'
        textLength='290'
        stroke='none'
        dominantBaseline='text-before-edge'
      >
        {country}
      </text>
      <text
        x={5 + x}
        y={50 + y}
        textAnchor='left'
        fontSize='20'
        stroke='none'
        fill='black'
        dominantBaseline='text-before-edge'
      >
        {`${category}:  ${Value} ${unit}`}
      </text>
    </g>
  );
};

type CountriesProps = {
  records: Array<Record>;
  colorScale: chroma.Scale<chroma.Color>;
  numericScale: Scale;
  forwardRef: React.RefObject<SVGSVGElement>;
  category: string;
  setCountry: React.Dispatch<React.SetStateAction<CountryCodeKey>>;
};

const Countries = (props: CountriesProps) => {
  const {
    records,
    colorScale,
    numericScale,
    forwardRef,
    setCountry,
    category,
  } = {
    ...props,
  };
  const irelevantCountries = CountryKeys.filter(
    (key) =>
      records.findIndex((record) => record.ReportingEconomyCode === key) < 0
  );
  const [active, setActive] = useState<number>(-1);
  const [info, setInfo] = useState<InfoProps>(null);

  const handleHover = (
    e: React.MouseEvent<SVGGElement, MouseEvent>,
    idx?: number
  ) => {
    const CTM = forwardRef.current?.getScreenCTM()?.inverse();
    if (idx && CTM) {
      const { e: x, f: y } = CTM.translate(e.clientX, e.clientY);
      const record = records[idx];
      const infoProps: InfoProps = {
        offset: { x, y },
        country: CountryCodes.Country[record.ReportingEconomyCode],
        unit: record.Unit,
        Value: record.Value,
        category,
      };
      setInfo(() => ({ ...infoProps }));
      setActive(idx);
    } else {
      setActive(-1);
      setInfo(() => null);
    }
    e.preventDefault();
  };
  return (
    <g>
      {irelevantCountries.map((key) => (
        <IrelevantCountry key={key} country={key} />
      ))}
      {records.map((record, idx) => (
        <g
          key={`country-group-${record.ReportingEconomy}`}
          onMouseEnter={(e) => handleHover(e, idx)}
          onMouseLeave={(e) => handleHover(e)}
        >
          <Country
            key={record.ReportingEconomyCode}
            setCountry={setCountry}
            record={record}
            fill={colorScale(
              1 - FitToChart(record.Value, 1, numericScale)
            ).name()}
            active={active === idx}
          />
        </g>
      ))}
      {info ? (
        <Info
          country={info.country}
          Value={info.Value}
          offset={info.offset}
          unit={info.unit}
          category={category}
        />
      ) : null}
    </g>
  );
};

export default Countries;
