/**
 * Asymptote - Google Sheets Feedback Client
 * 
 * Secure client-side utility for validating, sanitizing, and dispatching
 * user feedback, bug reports, and pattern suggestions to Rijul's Google Sheets webhook.
 */

export const STORAGE_KEY_FEEDBACK = 'asymptote:feedback_submissions';
export const STORAGE_KEY_ENDPOINT = 'asymptote:feedback_endpoint';
export const DEFAULT_FEEDBACK_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwJ_-Jr0IAdW8tBxg0077PcfmrLwC2-TRjROZXryvCvFwrGXmsF9nzUtbTDckHWjEG-/exec';

export const MAX_TITLE_LENGTH = 150;
export const MAX_DETAILS_LENGTH = 3000;
export const MAX_EMAIL_LENGTH = 150;
export const ALLOWED_TYPES = ['bug', 'feature', 'general'];

/**
 * Standard email validation regex matching Google Apps Script backend
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validates the form payload before submission.
 * Returns an object with errors: { title?, details?, email? }, isValid: boolean
 */
export function validateFeedbackPayload({ type, title, details, email }) {
  const errors = {};

  // 1. Type validation
  if (!type || !ALLOWED_TYPES.includes(String(type).toLowerCase())) {
    errors.type = 'Please select a valid feedback category (Bug, Pattern, or General).';
  }

  // 2. Title validation (required: 3 to 150 chars)
  const cleanTitle = (title || '').trim();
  if (!cleanTitle) {
    errors.title = 'Title or summary is required.';
  } else if (cleanTitle.length < 3) {
    errors.title = 'Title must be at least 3 characters long.';
  } else if (cleanTitle.length > MAX_TITLE_LENGTH) {
    errors.title = `Title must not exceed ${MAX_TITLE_LENGTH} characters.`;
  }

  // 3. Details validation (required: 5 to 3000 chars)
  const cleanDetails = (details || '').trim();
  if (!cleanDetails) {
    errors.details = 'Detailed description is required.';
  } else if (cleanDetails.length < 5) {
    errors.details = 'Details must be at least 5 characters long.';
  } else if (cleanDetails.length > MAX_DETAILS_LENGTH) {
    errors.details = `Details must not exceed ${MAX_DETAILS_LENGTH} characters.`;
  }

  // 4. Email validation (optional: valid format if provided)
  const cleanEmail = (email || '').trim();
  if (cleanEmail) {
    if (cleanEmail.length > MAX_EMAIL_LENGTH) {
      errors.email = `Email must not exceed ${MAX_EMAIL_LENGTH} characters.`;
    } else if (!EMAIL_REGEX.test(cleanEmail)) {
      errors.email = 'Please enter a valid email address (or leave blank).';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

/**
 * Defensive formula injection sanitization on client
 * Neutralizes characters (=, +, -, @, tab, carriage return) by prepending a single quote
 */
export function sanitizeForSpreadsheet(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (/^[=+\-@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str.trim();
}

/**
 * Retrieves the configured Google Apps Script Web App endpoint URL.
 * Checks environment variable VITE_FEEDBACK_ENDPOINT first, then local storage.
 */
export function getStoredFeedbackEndpoint() {
  if (typeof window !== 'undefined') {
    // Check localStorage override
    const local = localStorage.getItem(STORAGE_KEY_ENDPOINT);
    if (local && local.trim()) {
      return local.trim();
    }
  }
  // Check build-time env variable if defined
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FEEDBACK_ENDPOINT) {
    return import.meta.env.VITE_FEEDBACK_ENDPOINT.trim();
  }
  return DEFAULT_FEEDBACK_ENDPOINT;
}

/**
 * Sets or updates the Google Apps Script Web App endpoint URL in local storage
 */
export function setStoredFeedbackEndpoint(url) {
  if (typeof window !== 'undefined') {
    const clean = (url || '').trim();
    if (clean) {
      localStorage.setItem(STORAGE_KEY_ENDPOINT, clean);
    } else {
      localStorage.removeItem(STORAGE_KEY_ENDPOINT);
    }
  }
}

/**
 * Submits validated feedback to the Google Apps Script Web App endpoint.
 * Uses text/plain Content-Type to avoid CORS preflight OPTIONS issues on Apps Script.
 */
export async function submitFeedbackToGoogleSheets(payload, customEndpoint = null) {
  const endpoint = customEndpoint !== null ? customEndpoint : getStoredFeedbackEndpoint();
  if (!endpoint) {
    throw new Error('Google Sheets webhook endpoint is not configured. Please set the Apps Script URL in settings.');
  }

  // 1. Client-side validation
  const validation = validateFeedbackPayload(payload);
  if (!validation.isValid) {
    const firstErr = Object.values(validation.errors)[0];
    throw new Error(firstErr || 'Form validation failed.');
  }

  // 2. Prepare payload
  const bodyData = {
    type: payload.type,
    title: payload.title.trim(),
    details: payload.details.trim(),
    email: (payload.email || '').trim(),
    hp_company_field: payload.hp_company_field || '', // Honeypot field
    clientVersion: '2.0.0'
  };

  // 3. Dispatch POST request
  // Note: Using 'text/plain;charset=utf-8' triggers a CORS "simple request",
  // bypassing the OPTIONS preflight that Google Apps Script fails to respond to.
  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(bodyData),
      redirect: 'follow'
    });
  } catch (netErr) {
    throw new Error(`Network error connecting to Google Sheets: ${netErr.message || 'Check your internet connection.'}`);
  }

  if (!response.ok) {
    throw new Error(`Google Sheets endpoint returned HTTP ${response.status} ${response.statusText}`);
  }

  // 4. Parse server response
  let json;
  try {
    json = await response.json();
  } catch {
    throw new Error('Invalid response received from Google Sheets endpoint.');
  }

  if (!json || json.success !== true) {
    throw new Error(json?.error || 'Spreadsheet rejected the submission.');
  }

  if (!json.referenceId) {
    throw new Error('Spreadsheet confirmed write but did not return a valid reference ID.');
  }

  return {
    success: true,
    referenceId: json.referenceId,
    timestamp: json.timestamp || new Date().toISOString(),
    type: json.type || payload.type
  };
}
