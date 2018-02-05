import Biome from '../world/biome.js';

export default [
  new Biome('grass', '草', ({height}) => -height),
  new Biome('water', '水', ({height}) => height),
];
