import {logOfGamma11} from '../util/random';

function benchmark(name, callback) {
  const startTime = Date.now();
  for (let i = 0; i < 1000000; i++) {
    callback();
  }
  const endTime = Date.now();
  console.log(name + ': ' + (endTime - startTime) + ' ns per call');
}

benchmark('Math.random', Math.random);
benchmark('logOfGamma11', logOfGamma11);
