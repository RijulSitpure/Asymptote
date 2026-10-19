/**
 * Asymptote - Centralized Feedback Configuration
 * 
 * Defines the authoritative, immutable endpoint for user feedback and bug submissions.
 * 
 * Security & Architecture Notice:
 * Client-side endpoints embedded in web apps and extensions are inherently discoverable
 * via network inspection and source unpacking. This endpoint is NOT treated as a secret.
 * Real protection against abuse, formula injection, and data corruption is strictly
 * enforced by server-side validation, length constraints, allowlisting, and concurrency
 * locks in Google Apps Script.
 */

export const APPS_SCRIPT_URL_PATTERN = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]{20,}\/exec$/;

export const AUTHORITATIVE_FEEDBACK_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwJ_-Jr0IAdW8tBxg0077PcfmrLwC2-TRjROZXryvCvFwrGXmsF9nzUtbTDckHWjEG-/exec';

/**
 * Validates that an endpoint strictly conforms to the expected Google Apps Script Web App HTTPS URL pattern.
 * Prevents arbitrary, non-HTTPS, or untrusted URLs.
 */
export function isValidAppsScriptEndpoint(url) {
  if (typeof url !== 'string') return false;
  return APPS_SCRIPT_URL_PATTERN.test(url.trim());
}

/**
 * Returns the immutable, validated Google Apps Script endpoint.
 * Ensures feedback is dispatched strictly to this validated endpoint.
 * Throws if the configuration does not match the strict HTTPS pattern.
 */
export function getFeedbackEndpoint() {
  if (!isValidAppsScriptEndpoint(AUTHORITATIVE_FEEDBACK_ENDPOINT)) {
    throw new Error('Configured feedback endpoint does not conform to the expected Google Apps Script URL format.');
  }
  return AUTHORITATIVE_FEEDBACK_ENDPOINT;
}
