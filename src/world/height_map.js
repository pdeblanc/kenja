import {rnorm} from 'randgen';
import {sum} from '../util/array';
import Cache from '../struct/cache';

const root2 = Math.pow(2, 0.5);

export default class HeightMap extends Cache {
  constructor({mean=0, sd=1, scale=65536, speed=1}) {
    super();
    this.mean = mean;
    this.sd = sd;
    this.scale = scale;
    this.speed = speed;
    this.variance = Math.pow(this.sd, 2);
  }

  generate(x, y) {
    if (x % this.scale === 0 && y % this.scale === 0) {
      return rnorm(this.mean, this.sd);
    }
    const {points, distance} = this.parents(x, y);
    const parentMean = sum(points.map(coord => this.get(...coord)));
    const noiseVariance = this.speed * distance;
    const noisedSample = rnorm(parentMean, Math.pow(noiseVariance, 0.5));
    // prior sd of noised sample is (4 * this.variance + noiseVariance) ** 0.5
    const multiplier = this.sd / Math.pow(4 * this.variance + noiseVariance, 0.5);
    return noisedSample * multiplier;
  }

  parents(x, y) {
    const divisor = Math.min(x & -x, y & -y); // power of 2 dividing x and y
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
