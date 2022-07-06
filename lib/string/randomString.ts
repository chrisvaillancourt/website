import { randomVals } from '../crypto';

/**
 * Generate a random string.
 * @param {number} [length] The length of the string to generate.
 */
export function randomString(length?: number): string {
  return [...randomVals(length)].map((val) => String(val)).join('');
}
