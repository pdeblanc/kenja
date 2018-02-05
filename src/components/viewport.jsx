import React from 'react';

import {rangeMap} from '../util/array';

export default ({plane}) => {
  return (<div>
      {
        rangeMap(0, 10, y => (
          <div key={y}>
            {
              rangeMap(0, 10, x => (
                <span key={x}>
                  {plane.get(x, y).symbol}
                </span>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}
