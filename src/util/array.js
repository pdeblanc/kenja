export const sum = arr => arr.reduce((a, b) => a + b, 0);

export const min = (arr, f) => {
  let m = f(arr[0]);
  let xMin = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const x = arr[i];
    const y = f(x);
    if (y < m) {
      m = y;
      xMin = x;
    }
  }
  return xMin;
};

export const rangeMap = (start, stop, fn) => {
  const result = [];
  for (let i = start; i < stop; i++) {
    result.push(fn(i));
  }
  return result;
};
