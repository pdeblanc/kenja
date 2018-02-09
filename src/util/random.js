import {min} from './array';
import {v2} from 'murmurhash';

// uniform distribution on [0, 1]
export const uniform = (seedStr, seedInt) => v2(seedStr, seedInt) / 2 ** 32;

// exponential distribution with λ = 1
export const exponential = () => Math.log(-Math.log(1 - Math.random()));

// sample from a finite set with given energy function
export const dobbins = (arr, nrg) => min(arr, x => nrg(x) + exponential());

// http://m-hikari.com/ams/ams-2014/ams-85-88-2014/epureAMS85-88-2014.pdf
export const soranzoEpureCdf = x => 2 ** (-(22 ** (1 - 41 ** (x / 10))));

const c1 = 10 / Math.log(41);
const c2 = 1 / Math.log(22);
const c3 = -1 / Math.log(2);

export const soranzoEpurePpf = α => c1 * Math.log(
  1 - c2 * Math.log(c3 * Math.log(α))
);
