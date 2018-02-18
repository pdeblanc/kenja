import React from 'react';
import PropTypes from 'prop-types';

const Square = ({x, y, biome, click}) => (
  <svg
    className={'biome ' + biome.name}
    x={x - 0.5}
    y={y - 0.5}
    width="1px"
    height="1px"
    viewBox="-0.5 -0.5 1 1"
    onClick={click}
  >
    <rect x="-0.5" y="-0.5" width="1" height="1" />
    <text y="0.37">{biome.symbol}</text>
  </svg>
);

Square.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  biome: PropTypes.object.isRequired,
  click: PropTypes.func.isRequired,
}

export default Square;
