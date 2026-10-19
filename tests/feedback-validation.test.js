import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  validateFeedbackPayload, 
  sanitizeForSpreadsheet, 
  submitFeedbackToGoogleSheets,
  MAX_TITLE_LENGTH,
  MAX_DETAILS_LENGTH
} from '../client/src/lib/feedbackClient.js';
import { 
  isValidAppsScriptEndpoint, 
  getFeedbackEndpoint,
  AUTHORITATIVE_FEEDBACK_ENDPOINT 
} from '../client/src/config/feedback.js';

describe('Feedback & Google Sheets Webhook Integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // 1. Validation Rules
  describe('Client-side Field Validation', () => {
    it('1. Rejects missing or invalid feedback types', () => {
      const res1 = validateFeedbackPayload({ type: '', title: 'Test bug', details: 'Details here' });
      expect(res1.isValid).toBe(false);
      expect(res1.errors.type).toBeDefined();

      const res2 = validateFeedbackPayload({ type: 'invalid_category', title: 'Test bug', details: 'Details here' });
      expect(res2.isValid).toBe(false);
      expect(res2.errors.type).toBeDefined();
    });

    it('2. Enforces minimum and maximum title lengths', () => {
      // Too short (< 3)
      const resShort = validateFeedbackPayload({ type: 'bug', title: 'ab', details: 'Valid details here' });
      expect(resShort.isValid).toBe(false);
      expect(resShort.errors.title).toContain('at least 3 characters');

      // Too long (> MAX_TITLE_LENGTH)
      const longTitle = 'a'.repeat(MAX_TITLE_LENGTH + 1);
      const resLong = validateFeedbackPayload({ type: 'bug', title: longTitle, details: 'Valid details here' });
      expect(resLong.isValid).toBe(false);
      expect(resLong.errors.title).toContain(`exceed ${MAX_TITLE_LENGTH}`);

      // Valid title
      const resValid = validateFeedbackPayload({ type: 'bug', title: 'Broken hints on #226', details: 'Valid details here' });
      expect(resValid.errors.title).toBeUndefined();
    });

    it('3. Enforces minimum and maximum description lengths', () => {
      // Too short (< 5)
      const resShort = validateFeedbackPayload({ type: 'bug', title: 'Valid Title', details: '1234' });
      expect(resShort.isValid).toBe(false);
      expect(resShort.errors.details).toContain('at least 5 characters');

      // Too long (> MAX_DETAILS_LENGTH)
      const longDetails = 'x'.repeat(MAX_DETAILS_LENGTH + 1);
      const resLong = validateFeedbackPayload({ type: 'bug', title: 'Valid Title', details: longDetails });
      expect(resLong.isValid).toBe(false);
      expect(resLong.errors.details).toContain(`exceed ${MAX_DETAILS_LENGTH}`);

      // Valid details
      const resValid = validateFeedbackPayload({ type: 'bug', title: 'Valid Title', details: 'Everything broke when I clicked hint 3.' });
      expect(resValid.errors.details).toBeUndefined();
    });

    it('4. Validates email format strictly when provided, but allows optional empty email', () => {
      // Empty email is valid (optional)
      const resEmpty = validateFeedbackPayload({ type: 'general', title: 'Great app', details: 'Loved the hints', email: '' });
      expect(resEmpty.isValid).toBe(true);

      // Malformed email
      const resMalformed = validateFeedbackPayload({ type: 'general', title: 'Great app', details: 'Loved the hints', email: 'notanemail' });
      expect(resMalformed.isValid).toBe(false);
      expect(resMalformed.errors.email).toContain('valid email address');

      // Malformed domain
      const resBadDomain = validateFeedbackPayload({ type: 'general', title: 'Great app', details: 'Loved the hints', email: 'user@bad' });
      expect(resBadDomain.isValid).toBe(false);

      // Valid email
      const resValid = validateFeedbackPayload({ type: 'general', title: 'Great app', details: 'Loved the hints', email: 'rijul@example.com' });
      expect(resValid.isValid).toBe(true);
    });
  });

  // 2. Spreadsheet Formula Injection Protection
  describe('Spreadsheet Formula Injection Safeguard', () => {
    it('5. Prepends a single quote to strings starting with formula trigger characters (=, +, -, @, tab, newline)', () => {
      expect(sanitizeForSpreadsheet('=SUM(A1:A10)')).toBe("'=SUM(A1:A10)");
      expect(sanitizeForSpreadsheet('+12345')).toBe("'+12345");
      expect(sanitizeForSpreadsheet('-10+20')).toBe("'-10+20");
      expect(sanitizeForSpreadsheet('@SUM(1,2)')).toBe("'@SUM(1,2)");
      expect(sanitizeForSpreadsheet('\tTabbed')).toBe("'\tTabbed");
      expect(sanitizeForSpreadsheet('\rCarriage')).toBe("'\rCarriage");
    });

    it('6. Leaves benign text unaltered', () => {
      expect(sanitizeForSpreadsheet('Regular title')).toBe('Regular title');
      expect(sanitizeForSpreadsheet('Problem #226 Invert Tree')).toBe('Problem #226 Invert Tree');
      expect(sanitizeForSpreadsheet('user@example.com')).toBe('user@example.com');
    });
  });

  // 3. Centralized Endpoint Validation
  describe('Centralized Endpoint Security & Format Verification', () => {
    it('7. Validates strictly against HTTPS Google Apps Script URL format', () => {
      expect(isValidAppsScriptEndpoint(AUTHORITATIVE_FEEDBACK_ENDPOINT)).toBe(true);

      // Insecure HTTP rejected
      expect(isValidAppsScriptEndpoint('http://script.google.com/macros/s/AKfycbwJ_-Jr0IAdW8tBxg0077PcfmrLwC2-TRjROZXryvCvFwrGXmsF9nzUtbTDckHWjEG-/exec')).toBe(false);

      // Non-google domains rejected
      expect(isValidAppsScriptEndpoint('https://evil.com/macros/s/AKfycbwJ_-Jr0IAdW8tBxg0077PcfmrLwC2-TRjROZXryvCvFwrGXmsF9nzUtbTDckHWjEG-/exec')).toBe(false);
      expect(isValidAppsScriptEndpoint('https://script.google.com.evil.com/macros/s/123/exec')).toBe(false);

      // Malformed path rejected
      expect(isValidAppsScriptEndpoint('https://script.google.com/other/path')).toBe(false);
      expect(isValidAppsScriptEndpoint('not-a-url')).toBe(false);
      expect(isValidAppsScriptEndpoint(null)).toBe(false);
    });

    it('8. Centralized getter returns validated authoritative endpoint', () => {
      const ep = getFeedbackEndpoint();
      expect(ep).toBe(AUTHORITATIVE_FEEDBACK_ENDPOINT);
      expect(ep.startsWith('https://script.google.com/macros/s/')).toBe(true);
      expect(ep.endsWith('/exec')).toBe(true);
    });
  });

  // 4. Dispatch & Error Handling
  describe('Google Sheets Submission Dispatch', () => {
    it('9. Successfully writes to Google Sheets and propagates server reference ID', async () => {
      const mockServerResponse = {
        success: true,
        referenceId: 'ASY-20261019-8E2B',
        timestamp: '2026-10-19T23:15:00.000Z',
        type: 'bug'
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockServerResponse
      });

      const res = await submitFeedbackToGoogleSheets({
        type: 'bug',
        title: 'Broken hints on #226',
        details: 'Hint 3 code block does not expand properly.',
        email: 'test@example.com'
      });

      expect(res.success).toBe(true);
      expect(res.referenceId).toBe('ASY-20261019-8E2B');
      expect(res.timestamp).toBe('2026-10-19T23:15:00.000Z');

      // Verify request payload was sent to the authoritative endpoint
      expect(globalThis.fetch).toHaveBeenCalledWith(
        AUTHORITATIVE_FEEDBACK_ENDPOINT,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          redirect: 'follow'
        })
      );
    });

    it('10. Rejects submission when Google Sheets returns error without exposing internal details', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ success: false, error: 'Spreadsheet write lock busy.' })
      });

      await expect(
        submitFeedbackToGoogleSheets({
          type: 'bug',
          title: 'Valid title',
          details: 'Valid description here.'
        })
      ).rejects.toThrow('Spreadsheet write lock busy.');
    });

    it('11. Detects network failures gracefully and never exposes endpoint in error message', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'));

      try {
        await submitFeedbackToGoogleSheets({
          type: 'general',
          title: 'Feedback',
          details: 'Awesome application.'
        });
        expect.unreachable('Should have thrown network error');
      } catch (err) {
        expect(err.message).toContain('Network error connecting to feedback service');
        expect(err.message).not.toContain(AUTHORITATIVE_FEEDBACK_ENDPOINT);
      }
    });
  });
});
