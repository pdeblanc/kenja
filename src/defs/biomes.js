import Biome from '../world/biome.js';

export default [
  new Biome('grass', '草', ({height, temperature}) => -height + temperature ** 2 - 3),
  new Biome('sand', '砂', ({height}) => -height),
  new Biome('water', '水', ({height}) => height),
  new Biome('wall', '壁', ({x, y}) => {
    const divisor = Math.max(
      x === 0 ? 1024 : x & -x,
      y === 0 ? 1024 : y & -y,
    ); // power of 2 dividing x or y
    return -Math.log(divisor);
  })
];
