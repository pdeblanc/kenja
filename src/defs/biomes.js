import Biome from '../world/biome.js';

export default [
  new Biome('grass', '草', ({height, temperature}) => -height + temperature ** 2 - 3),
  new Biome('sand', '砂', ({height}) => -height),
  new Biome('water', '水', ({height}) => height),
];
