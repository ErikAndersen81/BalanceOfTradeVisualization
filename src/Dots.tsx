/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { Record, Year } from './types';
import { FitToChart, Scale } from './Scaling';
import comparePeriods from './comparePeriods';

type DotsProps = {
  xInterval: number;
  data: Array<Record>;
  scale: Scale;
  color: string;
  year: Year;
  setYear: React.Dispatch<React.SetStateAction<Year>>;
};

type DotProps = {
  record: Record;
  color: string;
  cx: number;
  cy: number;
  year: Year;
  setYear: React.Dispatch<React.SetStateAction<Year>>;
};

const Dot = (props: DotProps) => {
  const { record, color, cx, cy, year, setYear } = { ...props };
  const [hover, setHover] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    e.preventDefault();
    setYear(record.Year ? record.Year : year);
  };
  const [width, height] = [120, 40];
  const offset = 5;
  const x = cx - (width + offset) < 0 ? cx : cx - (width + offset);
  const y = cy > 50 ? cy - (height + offset) : cy + offset;
  const category = color === '#d7191c' ? 'Import' : 'Export';
  const info = (
    <defs>
      <g id='dotsInfo'>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx='2'
          fill='gray'
          fillOpacity='.3'
          stroke='black'
        />
        <text
          x={x + width / 2}
          y={y}
          fontWeight='bold'
          fontSize='10'
          textAnchor='middle'
          dominantBaseline='text-before-edge'
        >
          {category}
        </text>
        <text
          x={x + 3}
          y={y + 12}
          fontSize='10'
          dominantBaseline='text-before-edge'
        >
          {record.Year ? `Year: ${record.Year}` : ''}
        </text>
        <text
          x={x + 3}
          y={y + 23}
          fontSize='10'
          dominantBaseline='text-before-edge'
        >
          {`${record.Unit}:${record.Value}`}
        </text>
      </g>
    </defs>
  );

  const dot = (
    <circle
      className='Dot'
      cy={cy}
      cx={cx}
      r='5'
      stroke='white'
      fill={color}
      strokeWidth='2'
    />
  );
  return (
    <g
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {dot}
      {hover ? info : null}
      <use xlinkHref='#dotsInfo' />
    </g>
  );
};

const Dots = (props: DotsProps) => {
  const { xInterval, data, scale, color, year, setYear } = { ...props };
  if (data.length === 0) return null;
  const dots = data
    .sort(comparePeriods)
    .map((record, idx) => (
      <Dot
        key={`dot${record.Year}`}
        cy={FitToChart(record.Value, 100, scale)}
        cx={idx * xInterval}
        record={record}
        color={color}
        year={year}
        setYear={setYear}
      />
    ));
  return <>{dots}</>;
};

export default Dots;
