import React from 'react';
import PropTypes from 'prop-types';

import Square from './square.jsx';
import {rangeMap} from '../util/array';

class Viewport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {plane, radius, translate, x, y} = this.props;
    return <div>
      <svg
        width='100%'
        height='100%'
        viewBox={[-radius - 0.5, -radius - 0.5, 2 * radius + 1, 2 * radius + 1].join(' ')}
      >
        {
          rangeMap(-radius, radius + 1, v =>
            rangeMap(-radius, radius + 1, u =>
              <Square
                key={[u, v]}
                x={u}
                y={v}
                biome={plane.get(x + u, y + v)}
                click={() => translate(u, v)}
              />
            )
          )
        }
      </svg>
    </div>
  }
}

Viewport.propTypes = {
  plane: PropTypes.object.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  translate: PropTypes.func.isRequired,
};

Viewport.defaultProps = {
  x: 10,
  y: 10,
  radius: 29
};

export default Viewport;
