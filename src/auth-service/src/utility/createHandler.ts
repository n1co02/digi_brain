// Author Erik Priemer

// use hander to wrap functions without having to pass classes all the time.
// add the params where marked

export default function createHandler<T, U>(
  handle: (value: T /*add params */) => U | Promise<U>,
): (/* add params */) => (value: T) => Promise<U> {
  return (/* add params*/) => async value => handle(value /*add params */);
}
