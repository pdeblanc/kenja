import {logOfGamma11} from '../util/random';
import md5 from 'md5';
import murmurhash from 'murmurhash';
import sha1 from 'hash.js/lib/hash/sha/1';
import sha224 from 'hash.js/lib/hash/sha/224';
import sha256 from 'hash.js/lib/hash/sha/256';
import sha512 from 'hash.js/lib/hash/sha/512';

function benchmark(name, callback, calls=1000000) {
  const startTime = Date.now();
  for (let i = 0; i < calls; i++) {
    callback();
  }
  const endTime = Date.now();
  const nsPerCall = (endTime - startTime) * 1000000 / calls;
  console.log(name + ': ' + nsPerCall + ' ns per call');
}

benchmark('Math.random', Math.random);
benchmark('logOfGamma11', logOfGamma11);
benchmark('murmurhash.v2', () => murmurhash.v2('foo'));
benchmark('murmurhash.v3', () => murmurhash.v3('foo'));
benchmark('md5', () => md5('foo'), 10000);
benchmark('sha1', () => sha1().update('abc').digest('hex'), 10000);
benchmark('sha224', () => sha224().update('abc').digest('hex'), 10000);
benchmark('sha256', () => sha256().update('abc').digest('hex'), 10000);
benchmark('sha512', () => sha512().update('abc').digest('hex'), 10000);
