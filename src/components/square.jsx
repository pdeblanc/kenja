import React from 'react';

export default ({x, y, biome}) => (
  <g className={'biome ' + biome.name} transform={`translate(${x}, ${y})`}>
    <rect x="-0.5" y="-0.5" width="1" height="1" />
    <text y="0.37">{biome.symbol}</text>
  </g>
);
