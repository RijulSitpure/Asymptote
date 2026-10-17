/**
 * Test setup: fail any test that tries to make a real network request.
 * Only loopback traffic (127.0.0.1 / localhost) to the ephemeral local test server is permitted.
 */
const originalFetch = globalThis.fetch;

globalThis.fetch = async function guardedFetch(url, options) {
  const urlString = String(url?.url || url);
  try {
    const parsed = new URL(urlString);
    if (parsed.hostname === '127.0.0.1' || parsed.hostname === 'localhost') {
      return originalFetch.call(this, url, options);
    }
  } catch (_err) {
    // Non-URL strings or unparseable targets fail
  }
  throw new Error(`Real network request forbidden during tests: ${urlString}`);
};
