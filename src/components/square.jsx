import React from 'react';

export default ({x, y, biome}) => (
  <g className={biome.name} transform={`translate(${x}, ${y})`}>
    <text fill='black' style={{fontSize: '1px'}}>{biome.symbol}</text>
  </g>
);
