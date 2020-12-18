import React from 'react';
import { FitToChart, Scale } from './Scaling';
import { Record } from './types';
import comparePeriods from './comparePeriods';

type LineProps = {
  xInterval: number;
  data: Array<Record>;
  scale: Scale;
  color: string;
};

const Line = (props: LineProps) => {
  const { xInterval, data, scale, color } = { ...props };
  if (data.length === 0) return null;
  const lineCoords = data
    .sort(comparePeriods)
    .map((record, idx) =>
      idx === 0
        ? ` M ${idx * xInterval}, ${FitToChart(record.Value, 100, scale)}`
        : ` L ${idx * xInterval}, ${FitToChart(record.Value, 100, scale)}`
    );
  const linePath = (
    <path
      d={lineCoords.reduce((a, b) => a + b)}
      fill='none'
      stroke={color}
      strokeWidth='.5'
    />
  );
  return linePath;
};

export default Line;
