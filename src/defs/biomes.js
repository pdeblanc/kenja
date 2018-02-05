import {Biome} from '../world/biome.js';

export const biomes = [
  Biome('grass', 'G', ({height}) => -height),
  Biome('water', 'W', ({height}) => height),
];
