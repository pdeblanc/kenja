import {choose} from '../util/numeric';
import {CoinCache} from '../distributions/coin';

test('CoinCache(1/2) precomputes correct triangle up to n=20', () => {
  const cache = new CoinCache(1/2);
  cache.achieveDepth(20);
  for (let n = 0; n <= 20; n++) {
    for (let k = 0; k <= n; k++) {
      expect(cache.pmf.get(n, k)).toBe(choose(n, k) / 2 ** n);
    }
  }
});

test('CoinCache(1/4) precomputes correct triangle up to n=16', () => {
  const cache = new CoinCache(1/4);
  cache.achieveDepth(16);
  for (let n = 0; n <= 16; n++) {
    for (let k = 0; k <= n; k++) {
      expect(cache.pmf.get(n, k)).toBe(
        choose(n, k) * 0.25 ** k * 0.75 ** (n - k)
      );
    }
  }
});
