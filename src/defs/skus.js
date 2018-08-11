import Sku from '../world/sku.js';

export default [
  new Sku('azuki bean', '豆', (
    {height, temperature}) => -height + temperature ** 2 - 3
  ),
];
