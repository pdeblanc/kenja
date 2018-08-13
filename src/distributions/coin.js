import Map2 from 'map2';

const cachesByP = {};

export const clearAll = () => {
  for (const key in cachesByP) {
    delete cachesByP[key];
  }
};

export class CoinCache {
  constructor(p) {
    this.depth = 0;
    this.p = p;
    this.cdf = new Map2();
    this.pmf = new Map2();
    this.cdf.set(0, 0, 1);
    this.pmf.set(0, 0, 1);
  }

  achieveDepth(target) {
    const {cdf, depth, p, pmf} = this;
    for (let n = depth + 1; n <= target; n++) {
      let p0 = (1 - p) ** n;
      pmf.set(n, 0, p0);
      cdf.set(n, 0, p0);
      for (let k = 1; k < n; k++) {
        let pk = pmf.get(n - 1, k - 1) * p + pmf.get(n - 1, k) * (1 - p);
        pmf.set(n, k, pk);
        cdf.set(n, k, pk + cdf.get(n, k - 1));
      }
      pmf.set(n, n, p ** n);
      cdf.set(n, n, 1);
    }
    this.depth = target;
  }

  getCdf(n, k) {
    if (n <= this.depth) {
      return this.cdf.get(n, k);
    }
    if (k * 2 < n) {
      return this.fromLeft(n, k);
    }
    return this.fromRight(n, k);
  }

  fromLeft(n, k) {
    const {cdf, p, pmf} = this;
    if (cdf.has(n, k)) {
      return this.cdf.get(n, k);
    }
    if (k == 0) {
      const p0 = (1 - p) ** n;
      pmf.set(n, 0, p0);
      cdf.set(n, 0, p0);
      return p0;
    }
    this.fromLeft(n, k - 1);
    const pk = pmf.get(n, k - 1) * (n - k + 1) / k * p / (1 - p);
    pmf.set(n, k, pk);
    const ck = pk + cdf.get(n, k - 1);
    cdf.set(n, k, ck);
    return ck;
  }

  fromRight(n, k) {
    const {cdf, p, pmf} = this;
    if (cdf.has(n, k)) {
      return cdf.get(n, k);
    }
    if (k == n) {
      pmf.set(n, n, p ** n);
      cdf.set(n, n, 1);
      return 1;
    }
    this.fromRight(n, k + 1);
    pmf.set(n, k, pmf.get(n, k + 1) * (k + 1) / (n - k) * (1 - p) / p);
    const ck = cdf.get(n, k + 1) - pmf.get(n, k + 1);
    cdf.set(n, k, ck);
    return ck;
  }
}

export const getCache = p => {
  if (!(p in cachesByP)) {
    cachesByP[p] = new CoinCache(p);
  }
  return cachesByP(p);
}

export default class Coin {
  constructor(p, cacheDepth=100, sideCache=10) {
    Object.assign(this, {p, cacheDepth, sideCache});
    this.cache = getCache(p);
    this.cache.achieveDepth(cacheDepth);
  }

  sampleFlipsFromUniform(n, r) {
  }
}
