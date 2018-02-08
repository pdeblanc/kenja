import React from 'react';

export default ({x, y, biome}) => (
  <svg
    className={'biome ' + biome.name}
    x={x - 0.5}
    y={y - 0.5}
    width="1px"
    height="1px"
    viewBox="-0.5 -0.5 1 1"
  >
    <rect x="-0.5" y="-0.5" width="1" height="1" />
    <text y="0.37">{biome.symbol}</text>
  </svg>
);
