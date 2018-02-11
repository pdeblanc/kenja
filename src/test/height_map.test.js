import HeightMap from '../world/height_map';
import {rangeMap, sum} from '../util/array';

test('has variance 1 at origin', () => {
  const sample = rangeMap(0, 10000, seedInt =>
    new HeightMap({seedInt}).get(0, 0)
  );
  const estimate = varianceUnbiasedEstimator(sample);
  expect(estimate).toBeCloseTo(1, 3);
});

const mean = sample => sum(sample) / sample.length;

const varianceUnbiasedEstimator = sample => {
  const μ = mean(sample);
  return sum(sample.map(x => (x - μ) ** 2)) / (sample.length - 1);
}
