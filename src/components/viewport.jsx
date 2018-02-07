import React from 'react';

import {rangeMap} from '../util/array';

export default ({plane, x=10, y=10, radius=4}) => {
  return (
    <svg
      width='100%'
      height='100%'
      viewBox={[-radius - 0.5, -radius - 0.5, 2 * radius + 1, 2 * radius + 1].join(' ')}
    >
      {
        rangeMap(- radius, radius + 1, v =>
          rangeMap(-radius, radius + 1, u =>
            <text x={u} y={v} fill='black' key={[u,v]} style={{fontSize: '1px'}}>{plane.get(x + u, y + v).symbol}</text>
          )
        )
      }
    </svg>
  );
}
