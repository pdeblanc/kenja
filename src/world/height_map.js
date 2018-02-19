import {rnorm} from 'randgen';

import {soranzoEpureSample} from '../util/random';
import {sum} from '../util/array';
import Cache from '../struct/cache';

const root2 = Math.pow(2, 0.5);

export default class HeightMap extends Cache {
  constructor({seedInt=0, scale=65536, speed=.01}={}) {
    super();
    this.seedInt = seedInt;
    this.scale = scale;
    this.speed = speed;
    this.decayRate = this.speed / 2; // this is probably incorrect
  }

  generate(x, y) {
    if (x % this.scale === 0 && y % this.scale === 0) {
      return this.gauss(x, y);
    }
    const {points, distance} = this.parents(x, y);
    const parentMean = sum(points.map(coord => this.get(...coord))) / 4;
    const decayFactor = Math.exp(-this.decayRate * distance);
    const decayedMean = parentMean * decayFactor;
    const noiseVariance = 1 - decayFactor ** 2;
    return decayedMean + this.gauss(x, y) * noiseVariance ** 0.5;
  }

  gauss(x, y) {
    return soranzoEpureSample(x + ' ' + y, this.seedInt);
  }

  parents(x, y) {
    const divisor = Math.min(
      x === 0 ? this.scale : x & -x,
      y === 0 ? this.scale : y & -y,
    ); // power of 2 dividing x and y
    if ((x + y) % (2 * divisor))
      return {
        points: [
          [x, y - divisor],
          [x, y + divisor],
          [x - divisor, y],
          [x + divisor, y]
        ],
        distance: divisor
      };
    return {
      points: [
        [x - divisor, y - divisor],
        [x - divisor, y + divisor],
        [x + divisor, y - divisor],
        [x + divisor, y + divisor],
      ],
      distance: divisor * root2
    }
  }
}
