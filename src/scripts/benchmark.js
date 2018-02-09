import md5 from 'md5';
import murmurhash from 'murmurhash';
import sha1 from 'hash.js/lib/hash/sha/1';
import sha224 from 'hash.js/lib/hash/sha/224';
import sha256 from 'hash.js/lib/hash/sha/256';
import sha512 from 'hash.js/lib/hash/sha/512';
import gaussian from 'gaussian';
import {rnorm} from 'randgen';
import {
  soranzoEpureCdf,
  soranzoEpurePpf,
  soranzoEpureSample,
  soranzoEpureSample2
} from '../util/random';

function benchmark(name, callback, calls=1000000) {
  const startTime = Date.now();
  for (let i = 0; i < calls; i++) {
    callback();
  }
  const endTime = Date.now();
  const nsPerCall = (endTime - startTime) * 1000000 / calls;
  console.log(name + ': ' + nsPerCall + ' ns per call');
}

const standardGaussian = gaussian(0, 1);

benchmark('Math.random', Math.random);
benchmark('murmurhash.v2', () => murmurhash.v2('foo'));
benchmark('murmurhash.v3', () => murmurhash.v3('foo'));
benchmark('standardGaussian.cdf', () => standardGaussian.cdf(2));
benchmark('standardGaussian.ppf', () => standardGaussian.ppf(0.95));
benchmark('soranzoEpureCdf', () => soranzoEpureCdf(2));
benchmark('soranzoEpurePpf', () => soranzoEpurePpf(0.95));
benchmark('soranzoEpureSample', () => soranzoEpureSample('foo', 1234));
benchmark('rnorm', () => rnorm(0, 1));
benchmark('md5', () => md5('foo'), 10000);
benchmark('sha1', () => sha1().update('abc').digest('hex'), 10000);
benchmark('sha224', () => sha224().update('abc').digest('hex'), 10000);
benchmark('sha256', () => sha256().update('abc').digest('hex'), 10000);
benchmark('sha512', () => sha512().update('abc').digest('hex'), 10000);

console.log('standardGaussian.cdf(2) == ' + standardGaussian.cdf(2))
console.log('soranzoEpureCdf(2) == ' + soranzoEpureCdf(2))
console.log('standardGaussian.ppf(0.977) == ' + standardGaussian.ppf(0.977))
console.log('soranzoEpurePpf(0.977) == ' + soranzoEpurePpf(0.977))
