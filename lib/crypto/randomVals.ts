import { crypto } from './crypto';
/**
 * Generate a Uint32Array typed array of random values.
 * @param {number} [length=10] The number of random values to generate.
 */
export function randomVals(length = 10) {
  const array = new Uint32Array(length);
  return crypto.getRandomValues(array);
}
