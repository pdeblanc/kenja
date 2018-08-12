// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
export const mod = (n, m) => (n % m + m) % m;

export const choose = (n, k) => {
  let num = 1;
  let denom = 1;
  for (let i = 1; i <= k; i++) {
    denom *= i;
  }
  for (let j = n - k + 1; j <= n; j++) {
    num *= j;
  }
  return num / denom;
};
