import {choose} from '../util/numeric';
import {clearAll, CoinCache} from '../distributions/coin';

describe('CoinCache(1/2).achieveDepth(20)', () => {
  clearAll();
  const cache = new CoinCache(1/2);
  cache.achieveDepth(20);
  for (let n = 0; n <= 20; n++) {
    for (let k = 0; k <= n; k++) {
      const desired = choose(n, k) / 2 ** n;
      test(`pmf should be ${desired} for n=${n}, k=${k}`, () => {
        expect(cache.pmf.get(n, k)).toBe(desired);
      })
    }
  }
});

describe('CoinCache(1/4).achieveDepth(16)', () => {
  clearAll();
  const cache = new CoinCache(1/4);
  cache.achieveDepth(16);
  for (let n = 0; n <= 16; n++) {
    for (let k = 0; k <= n; k++) {
      const desired = choose(n, k) * 0.25 ** k * 0.75 ** (n - k)
      test(`pmf should be ${desired} for n=${n}, k=${k}`, () => {
        expect(cache.pmf.get(n, k)).toBe(desired);
      })
    }
  }
});

describe('new CoinCache(1/4).fromLeft(n, k)', () => {
  clearAll();
  const cache = new CoinCache(1/4);
  for (let n = 1; n <= 10; n++) {
    cache.fromLeft(n, n);
    for (let k = 0; k <= n; k++) {
      const desired = choose(n, k) * 0.25 ** k * 0.75 ** (n - k)
      test(`pmf should be ${desired} for n=${n}, k=${k}`, () => {
        expect(cache.pmf.get(n, k)).toBe(desired);
      })
    }
  }
});

describe('new CoinCache(1/4).fromRight(n, k)', () => {
  clearAll();
  const cache = new CoinCache(1/4);
  for (let n = 1; n <= 10; n++) {
    cache.fromRight(n, 0);
    for (let k = 0; k <= n; k++) {
      const desired = choose(n, k) * 0.25 ** k * 0.75 ** (n - k)
      test(`pmf should be ${desired} for n=${n}, k=${k}`, () => {
        expect(cache.pmf.get(n, k)).toBe(desired);
      })
    }
  }
});
