function logError({ msg, error }: { msg: string; error: Error }): void {
  console.error(msg, error);
}
function log({ msg }: { msg: string }): void {
  console.log(msg);
}

export { logError, log };
