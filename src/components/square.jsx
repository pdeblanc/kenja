import React from 'react';
import PropTypes from 'prop-types';

class Square extends React.Component {
  render() {
    const {x, y, biome, click} = this.props;
    return (
      <svg
        className={'biome ' + biome.name}
        x={x - 0.5}
        y={y - 0.5}
        width="1px"
        height="1px"
        viewBox="-0.5 -0.5 1 1"
        onClick={() => click(x, y)}
      >
        <rect x="-0.5" y="-0.5" width="1" height="1" />
        <text y="0.37">{biome.symbol}</text>
      </svg>
    );
  }

  shouldComponentUpdate(nextProps) {
    const {x, y, biome} = this.props;
    return (
      nextProps.x !== x
      || nextProps.y !== y
      || nextProps.biome !== biome
    );
  }
}

Square.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  biome: PropTypes.object.isRequired,
  click: PropTypes.func.isRequired,
}

export default Square;
