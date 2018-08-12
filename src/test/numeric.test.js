import {choose} from '../util/numeric';

test('binomial coefficients correct up to n=5', () => {
  expect(choose(1, 0)).toBe(1);
  expect(choose(1, 1)).toBe(1);

  expect(choose(2, 0)).toBe(1);
  expect(choose(2, 1)).toBe(2);
  expect(choose(2, 2)).toBe(1);

  expect(choose(3, 0)).toBe(1);
  expect(choose(3, 1)).toBe(3);
  expect(choose(3, 2)).toBe(3);
  expect(choose(3, 3)).toBe(1);

  expect(choose(4, 0)).toBe(1);
  expect(choose(4, 1)).toBe(4);
  expect(choose(4, 2)).toBe(6);
  expect(choose(4, 3)).toBe(4);
  expect(choose(4, 4)).toBe(1);

  expect(choose(5, 0)).toBe(1);
  expect(choose(5, 1)).toBe(5);
  expect(choose(5, 2)).toBe(10);
  expect(choose(5, 3)).toBe(10);
  expect(choose(5, 4)).toBe(5);
  expect(choose(5, 5)).toBe(1);
});
