import Biome from '../world/biome.js';

export default [
  new Biome('grass', '草', (
    {height, temperature}) => -height + temperature ** 2 - 3
  ),
  new Biome('woods', '林', ({height, temperature, precipitation}) =>
    -height + (temperature ** 2) - precipitation
  ),
  new Biome('sand', '砂', ({height}) => height ** 2 - 10),
  new Biome('water', '水', ({height}) => height ** 3),
  /*
  new Biome('wall', '壁', ({x, y}) => {
    const divisor = Math.max(
      x === 0 ? 1024 : x & -x,
      y === 0 ? 1024 : y & -y,
    ); // power of 2 dividing x or y
    return 10 - Math.log(divisor);
  })
  */
];
