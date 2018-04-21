import {min, rangeMap} from './array';
import {v2} from 'murmurhash';
import {compose} from '../util/func';
import {bisect_left} from '@aureooms/js-bisect';

// uniform distribution on [0, 1]
export const uniform = (seedStr, seedInt) => v2(seedStr, seedInt) / 2 ** 32;

// log of exponentially distributed variable x with λ = 1
export const logExponentialPpf = y => Math.log(-Math.log(1 - y));
export const logExponential = compose(logExponentialPpf, uniform);

// sample from a finite set with given energy function
export const dobbins = (arr, energy, stringify, seedInt) => min(
  arr, x => energy(x) + logExponential(stringify(x), seedInt)
);

// sample from a discrete CDF
export const discreteSample = (cdfArray, seedStr, seedInt) => bisect_left(
  cdfArray, uniform(seedStr, seedInt)
);

// http://m-hikari.com/ams/ams-2014/ams-85-88-2014/epureAMS85-88-2014.pdf
export const soranzoEpureCdf = x => 2 ** (-(22 ** (1 - 41 ** (x / 10))));

const c1 = 10 / Math.log(41);
const c2 = 1 / Math.log(22);
const c3 = -1 / Math.log(2);

export const soranzoEpurePpf = α => c1 * Math.log(
  1 - c2 * Math.log(c3 * Math.log(α))
);

export const soranzoEpureSample = compose(soranzoEpurePpf, uniform);

// placeholder implementation
export const poisson = (λ, seedStr, seedInt) => λ;

// B(n, p) has mean np and variance np(1-p)
// We're only interested in the p=½ case
// We approximate the normal approximation using soranzoEpure
const approximateBinomial = (n, seedStr, seedInt) => Math.max(
  0,
  Math.min(
    n,
    Math.round(
      n * p + n ** 2 / 16 * soranzoEpureSample(seedStr, seedInt)
    )
  )
);

const MAX_EXACT_BINOMIAL = 500;

export const binomialCdfs = [[1]];
for (let n = 1; n <= MAX_EXACT_BINOMIAL; n++) {
  const prevArr = binomialCdfs[n - 1];
  const arr = [];
  for (let i = 0; i <= n; i++) {
    arr.push(
      (arr[i - 1] || 0) + ((prevArr[i] || 1) - (prevArr[i - 2] || 0)) / 2
    );
  }
  binomialCdfs.push(arr);
}

export const binomialSample = (n, seedStr, seedInt) => (
  n <= MAX_EXACT_BINOMIAL
  ? discreteSample(binomialCdfs[n], seedStr, seedInt)
  : approximateBinomial(n, seedStr, seedInt)
);
