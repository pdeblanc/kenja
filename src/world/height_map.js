import Cache from '../struct/cache';
import UnitHeightMap from './unit_height_map';

export default class HeightMap extends Cache {
  constructor({seedInt=0, scale=65536, speed=.01, mean=0, sd=1}={}) {
    super();
    this.mean = mean;
    this.sd = sd;
    this.unitHeightMap = new UnitHeightMap({seedInt, scale, speed});
  }

  generate(x, y) {
    return this.mean + this.unitHeightMap.get(x, y) * this.sd;
  }
}
