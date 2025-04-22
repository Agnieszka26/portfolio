import React from 'react'

const IconWithGradient = ({
  path,
  width = 500,
  height = 500,
  strokeWidth = 1,
  stroke = true,
}: {
  path: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: boolean;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={stroke ? "none" : "url(#myGradient)"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="myGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a21b4d" />
          <stop offset="100%" stopColor="#00d0ff" />
        </linearGradient>
      </defs>

      <path
        d={path}
        stroke={stroke ? "url(#myGradient)" : "none"}
        strokeWidth={strokeWidth}
        fill={stroke ? "none" : "url(#myGradient)"}
      />
    </svg>
  );
};


export default IconWithGradient
