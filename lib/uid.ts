/**
 * Generate a random ID string.
 */
export function uid(): string {
  // credit: https://gist.github.com/gordonbrander/2230317?permalink_comment_id=3443509#gistcomment-3443509

  const radixBase = 36;
  const timeStr = performance.now().toString(radixBase);
  const randNum = Math.random().toString(radixBase);
  const decimalRegex = /\./g;
  return `${timeStr}${randNum}`.replace(decimalRegex, '');
}
