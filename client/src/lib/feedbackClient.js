/**
 * Asymptote - Google Sheets Feedback Client
 * 
 * Secure client-side utility for validating, sanitizing, and dispatching
 * user feedback, bug reports, and pattern suggestions.
 * 
 * Submissions are dispatched strictly to the centralized, validated Google Apps Script endpoint.
 * No user-editable settings, localStorage overrides, or untrusted URLs are permitted.
 */

import { getFeedbackEndpoint } from '../config/feedback.js';

export const STORAGE_KEY_FEEDBACK = 'asymptote:feedback_submissions';

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
 * Submits validated feedback strictly to the centralized, validated Google Apps Script endpoint.
 * Uses text/plain Content-Type to avoid CORS preflight OPTIONS issues on Apps Script.
 * The endpoint URL is never exposed in user-facing error messages or logs.
 */
export async function submitFeedbackToGoogleSheets(payload) {
  // 1. Retrieve the immutable, validated endpoint
  const endpoint = getFeedbackEndpoint();

  // 2. Client-side validation
  const validation = validateFeedbackPayload(payload);
  if (!validation.isValid) {
    const firstErr = Object.values(validation.errors)[0];
    throw new Error(firstErr || 'Form validation failed.');
  }

  // 3. Prepare payload
  const bodyData = {
    type: payload.type,
    title: payload.title.trim(),
    details: payload.details.trim(),
    email: (payload.email || '').trim(),
    hp_company_field: payload.hp_company_field || '', // Honeypot field
    clientVersion: '2.0.0'
  };

  // 4. Dispatch POST request
  // Note: Using 'text/plain;charset=utf-8' triggers a CORS "simple request",
  // bypassing the OPTIONS preflight that Google Apps Script does not support.
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
    // Avoid reflecting the endpoint URL in error messages
    throw new Error(`Network error connecting to feedback service: ${netErr.message || 'Check your internet connection.'}`);
  }

  if (!response.ok) {
    throw new Error(`Feedback service returned HTTP ${response.status} ${response.statusText}`);
  }

  // 5. Parse server response
  let json;
  try {
    json = await response.json();
  } catch {
    throw new Error('Invalid response received from feedback service.');
  }

  if (!json || json.success !== true) {
    throw new Error(json?.error || 'Feedback submission was rejected by the server.');
  }

  if (!json.referenceId) {
    throw new Error('Server confirmed write but did not return a valid reference ID.');
  }

  return {
    success: true,
    referenceId: json.referenceId,
    timestamp: json.timestamp || new Date().toISOString(),
    type: json.type || payload.type
  };
}

/**
 * Queries Google Apps Script endpoint for current ticket resolution status.
 * Accepts an array of reference IDs (e.g. ['ASY-20261019-XXXX', ...]).
 * Returns an object mapping reference ID to status: { [refId]: 'Resolved' | 'New' | ... }
 */
export async function checkFeedbackStatus(referenceIds) {
  if (!Array.isArray(referenceIds) || referenceIds.length === 0) {
    return {};
  }

  const endpoint = getFeedbackEndpoint();
  const validIds = referenceIds.map(id => String(id).trim()).filter(Boolean);
  if (validIds.length === 0) return {};

  const url = `${endpoint}?action=status&ids=${encodeURIComponent(validIds.join(','))}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow'
    });

    if (!response.ok) {
      return {};
    }

    const data = await response.json();
    if (data && data.success && data.statuses) {
      return data.statuses;
    }
  } catch (err) {
    // Non-blocking: fail quietly if user is offline
    console.debug('Status check bypassed or network unreachable:', err?.message);
  }

  return {};
}

