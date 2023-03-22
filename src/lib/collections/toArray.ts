/**
 * Get an array from `items` if it's a Set. Otherwise, return the same array.
 * Use to get a consistent API when working with Arrays and Sets.
 */
export function toArray<T>(items: Readonly<T[]> | Readonly<Set<T>>): T[] {
  return Array.isArray(items) ? items : [...items];
}
