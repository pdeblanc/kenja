import 'min' from './array';

// log of a random variable following Gamma(1, 1) distribution
export const logOfGamma11 = () => Math.log(-Math.log(1 - Math.random()));

// sample from a finite set with given energy function
export const dobbins = (arr, nrg) => min(arr, x => nrg(x) + logOfGamma11());
