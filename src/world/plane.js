import HeightMap from './height_map';
import DobbinsMap from './dobbins_map';

export default class Plane {
  constructor(biomes, skus) {
    const height = new HeightMap({seedInt: 0, sd: 10});
    const temperature = new HeightMap({seedInt: 1, sd: 10});
    const precipitation = new HeightMap({seedInt: 2, sd: 5});
    const biome = new DobbinsMap(biomes, {height, temperature, precipitation});
    const sku = new DobbinsMap(
      [null, ...skus], {height, temperature, precipitation, biome}
    );
    Object.assign(this, {
      height, temperature, precipitation, biome, sku
    });
  }
}
