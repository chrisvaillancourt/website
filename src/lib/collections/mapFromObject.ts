/**
 * Create a Map object from a standard Object.
 */
export function mapFromObject<T>(obj: { [s: string]: T }): Map<string, T> {
  // TODO add generic for original obj key
  return new Map(Object.entries(obj));
}
