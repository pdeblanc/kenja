import React from 'react';

import Square from './square.jsx';
import {rangeMap} from '../util/array';

class Foo extends React.Component {
  constructor(props) {
    super(props);
    const {x, y} = this.props;
    this.state = {x, y};
  }

  render() {
    const {x, y} = this.state;
    const {plane, radius} = this.props;
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
                click={() => this.setState({x: x + u, y: y + v})}
              />
            )
          )
        }
      </svg>
    </div>
  }
}

Foo.defaultProps = {
  x: 10,
  y: 10,
  radius: 20
};

export default Foo;
