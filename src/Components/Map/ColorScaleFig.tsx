/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import chroma from 'chroma-js';
import { FitToChart, Scale } from '../Scaling';

type ColorScaleFigProps = {
  colorScale: chroma.Scale<chroma.Color>;
  numericScale: Scale;
  unit: string;
  category: string;
};

const ColorScaleFig = (props: ColorScaleFigProps) => {
  const { colorScale, numericScale, unit, category } = { ...props };
  const offsets = colorScale
    .colors(10)
    .map((color, idx) => (
      <stop
        key={`stop-color-${color}`}
        offset={`${idx * 10}%`}
        style={{ stopColor: color }}
      />
    ));
  const getPrefix = (value: number, scale: Scale) => {
    let prefix = '';
    if (value === scale.max) prefix += '>';
    if (value === scale.min && value !== 0) prefix += '<';
    return prefix;
  };
  const yTicks = numericScale.ticks.map((val) => (
    <g key={`group-tick-${val}`}>
      <text
        key={`y-tick${val}`}
        x={16}
        y={FitToChart(val, 100, numericScale)}
        dominantBaseline='middle'
        textAnchor='end'
        fill='black'
        fontSize='6'
      >
        {getPrefix(val, numericScale) + val}
      </text>
      <path
        key={`tick-${val}`}
        d={`M 17,${FitToChart(val, 100, numericScale)} L 20,${FitToChart(
          val,
          100,
          numericScale
        )}`}
        stroke='black'
        strokeWidth='1'
      />
    </g>
  ));
  let label;
  switch (category) {
    case 'import': {
      label = (
        <text
          x='15'
          y='-20'
          textAnchor='middle'
          dominantBaseline='text-before-edge'
          fontSize='6'
        >
          Import value in
        </text>
      );
      break;
    }
    case 'export': {
      label = (
        <text
          x='15'
          y='-20'
          textAnchor='middle'
          dominantBaseline='text-before-edge'
          fontSize='6'
        >
          Export value in
        </text>
      );
      break;
    }
    default: {
      label = (
        <text
          x='15'
          y='-20'
          textAnchor='middle'
          dominantBaseline='text-before-edge'
          fontSize='6'
        >
          <tspan fill={colorScale.colors(2)[0]}>Import</tspan>
          {' / '}
          <tspan fill={colorScale.colors(2)[1]}>Export </tspan>
          Balance
        </text>
      );
    }
  }
  return (
    <svg
      height='37%'
      width='15%'
      viewBox='0 -20 30 125'
      className='ColorScaleFig'
    >
      <defs>
        <linearGradient id='grad3' x1='0%' y1='100%' x2='0%' y2='0%'>
          {offsets}
        </linearGradient>
      </defs>
      {label}
      <text
        x='15'
        y='-13'
        textAnchor='middle'
        dominantBaseline='text-before-edge'
        fontSize='6'
      >
        {unit}
      </text>
      <rect
        x='20'
        y='0'
        width='8'
        height='100'
        fill='url(#grad3)'
        stroke='black'
      />
      {yTicks}
    </svg>
  );
};

export default ColorScaleFig;
