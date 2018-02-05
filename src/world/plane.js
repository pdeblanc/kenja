import Cache from '../struct/cache';
import HeightMap from './height_map';
import {dobbins} from '../util/random';

export default class Plane extends Cache {
  constructor(biomes) {
    super();
    this.heightMap = new HeightMap();
    this.biomes = biomes;
  }

  generate(x, y) {
    const height = this.heightMap.get(x, y);
    return dobbins(this.biomes, biome => biome.energy({height}));
  }
}
