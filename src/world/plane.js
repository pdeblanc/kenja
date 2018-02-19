import Cache from '../struct/cache';
import HeightMap from './height_map';
import {dobbins} from '../util/random';

export default class Plane extends Cache {
  constructor(biomes) {
    super();
    this.heightMap = new HeightMap({seedInt: 0, sd: 10});
    this.temperatureMap = new HeightMap({seedInt: 1, sd: 10});
    this.precipitationMap = new HeightMap({seedInt: 2, sd: 5});
    this.biomes = biomes;
  }

  generate(x, y) {
    const height = this.heightMap.get(x, y);
    const temperature = this.temperatureMap.get(x, y);
    const precipitation = this.precipitationMap.get(x, y);
    return dobbins(
      this.biomes,
      biome => biome.energy(
        {height, precipitation, temperature, x, y}
      ),
      biome => [biome.name, x, y].join(' '),
      3
    );
  }
}
