/**
 * Test setup: fail any test that tries to make an unmocked network request.
 */
globalThis.fetch = async function guardedFetch(url) {
  const urlString = String(url?.url || url);
  throw new Error(`Real network request forbidden during tests: ${urlString}`);
};
