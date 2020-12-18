/* eslint-disable react/no-unused-prop-types */
import React from 'react';

type HeaderBtnProps = {
  x: number;
  y: number;
  show: boolean;
  text: string;
  color: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderBtn = (props: HeaderBtnProps) => {
  const { color, setShow, show, text, x, y } = { ...props };
  const height = 16;
  const handleClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    e.preventDefault();
    setShow(!show);
  };
  const classes = show ? 'Button Up' : 'Button Down';
  return (
    <g onClick={(e) => handleClick(e)}>
      <rect
        stroke='gray'
        width='70'
        height={height}
        y={y - height}
        x={x}
        rx='5'
        className={classes}
      />
      <text
        strokeWidth='0'
        fill={color}
        fontSize='12'
        fontWeight='bold'
        textAnchor='middle'
        dominantBaseline='text-after-edge'
        x={x + 35}
        y={y}
      >
        {text}
      </text>
    </g>
  );
};
export default HeaderBtn;
