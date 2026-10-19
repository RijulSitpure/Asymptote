/**
 * ==============================================================================
 * ASYMPTOTE - GOOGLE SHEETS FEEDBACK & BUG REPORT WEBHOOK (APPS SCRIPT)
 * ==============================================================================
 * 
 * Secure backend processor for user feedback, bug reports, and pattern requests.
 * Runs inside Google Apps Script bound to Rijul Sitpure's private Google Sheet.
 * 
 * STEP-BY-STEP SETUP INSTRUCTIONS FOR RIJUL:
 * ------------------------------------------------------------------------------
 * 1. Create a new private Google Sheet:
 *    - Visit https://sheets.new in your browser.
 *    - Name the spreadsheet: "Asymptote - User Submissions & Feedback"
 *    - Rename the default tab at the bottom to: "Submissions"
 * 
 * 2. Setup the Header Row:
 *    - In row 1 of the "Submissions" tab, paste these headers across columns A to I:
 *      A1: Submission ID
 *      B1: Type
 *      C1: Timestamp (UTC)
 *      D1: Title
 *      E1: Details
 *      F1: User Email
 *      G1: Status
 *      H1: Resolved Date
 *      I1: Notes
 *    (Make row 1 bold, freeze row 1: View > Freeze > 1 row).
 * 
 * 3. Attach this Apps Script:
 *    - In the Google Sheet top menu, click: Extensions > Apps Script
 *    - Delete any default code in Code.gs
 *    - Paste this entire file into Code.gs
 *    - Click the Save icon (Ctrl+S / Cmd+S)
 * 
 * 4. Deploy as a Web App:
 *    - Click "Deploy" (top right blue button) > "New deployment"
 *    - Click the gear icon beside "Select type" and choose "Web app"
 *    - Description: "Asymptote Feedback Webhook v1"
 *    - Execute as: "Me (<your-email>)"
 *    - Who has access: "Anyone"  <-- CRITICAL: Allows user submissions without exposing your Google account
 *    - Click "Deploy"
 *    - Review and authorize permissions when prompted.
 *    - Copy the generated Web App URL:
 *      https://script.google.com/macros/s/.../exec
 * 
 * 5. Connect to Asymptote:
 *    - In the Asymptote dashboard or extension, click "Report Bug" or "Feedback"
 *    - Click "Configure Endpoint" or paste your URL into the setting.
 * ==============================================================================
 */

// Allowlist of valid feedback categories
var ALLOWED_TYPES = ['bug', 'feature', 'general'];

// Field constraints
var MAX_TITLE_LENGTH = 150;
var MAX_DETAILS_LENGTH = 3000;
var MAX_EMAIL_LENGTH = 150;

/**
 * Protects against Spreadsheet Formula Injection.
 * Neutralizes characters (=, +, -, @, tab, carriage return) by prepending a single quote.
 */
function sanitizeForFormulaInjection(val) {
  if (val === null || val === undefined) return '';
  var str = String(val);
  if (/^[=+\-@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str.trim();
}

/**
 * Validates email format using standard regex matching client-side validator
 */
function isValidEmail(email) {
  if (!email) return true; // Optional field
  var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(email);
}

/**
 * Generates a clean, unique server-side reference ID
 * Example: ASY-20261019-4F9A
 */
function generateReferenceId() {
  var now = new Date();
  var year = now.getUTCFullYear();
  var month = ('0' + (now.getUTCMonth() + 1)).slice(-2);
  var day = ('0' + now.getUTCDate()).slice(-2);
  var rand = Math.floor(Math.random() * 0xFFFFF).toString(16).toUpperCase();
  while (rand.length < 5) rand = '0' + rand;
  return 'ASY-' + year + month + day + '-' + rand;
}

/**
 * Helper to build JSON HTTP response
 */
function createJsonResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * HTTP POST entrypoint - Processes new feedback/bug submissions
 */
function doPost(e) {
  // 1. Guard against empty requests
  if (!e || !e.postData || !e.postData.contents) {
    return createJsonResponse({
      success: false,
      error: 'Invalid request: No payload received.'
    });
  }

  // 2. Parse JSON payload safely
  var payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return createJsonResponse({
      success: false,
      error: 'Malformed JSON payload.'
    });
  }

  // 3. Honeypot check (anti-bot safeguard)
  // If hidden bot field is filled, silently return a generic success without writing to sheet
  if (payload.hp_company_field || payload.hp || payload.website || payload._trap) {
    return createJsonResponse({
      success: true,
      referenceId: generateReferenceId(),
      message: 'Submission received.'
    });
  }

  // 4. Validate feedback type against allowlist
  var rawType = payload.type || payload.feedbackType;
  if (!rawType || ALLOWED_TYPES.indexOf(String(rawType).toLowerCase()) === -1) {
    return createJsonResponse({
      success: false,
      error: 'Invalid feedback category. Must be "bug", "feature", or "general".'
    });
  }
  var type = String(rawType).toLowerCase();

  // 5. Server-side Title validation (required: 3 to 150 chars)
  var rawTitle = payload.title || '';
  if (typeof rawTitle !== 'string') {
    return createJsonResponse({ success: false, error: 'Title must be text.' });
  }
  var title = rawTitle.trim();
  if (title.length < 3) {
    return createJsonResponse({ success: false, error: 'Title must be at least 3 characters long.' });
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return createJsonResponse({ success: false, error: 'Title must not exceed 150 characters.' });
  }

  // 6. Server-side Details validation (required: 5 to 3000 chars)
  var rawDetails = payload.details || '';
  if (typeof rawDetails !== 'string') {
    return createJsonResponse({ success: false, error: 'Details must be text.' });
  }
  var details = rawDetails.trim();
  if (details.length < 5) {
    return createJsonResponse({ success: false, error: 'Details must be at least 5 characters long.' });
  }
  if (details.length > MAX_DETAILS_LENGTH) {
    return createJsonResponse({ success: false, error: 'Details must not exceed 3000 characters.' });
  }

  // 7. Server-side Email validation (optional: valid format if provided)
  var rawEmail = payload.email || '';
  var email = String(rawEmail).trim();
  if (email.length > MAX_EMAIL_LENGTH) {
    return createJsonResponse({ success: false, error: 'Email must not exceed 150 characters.' });
  }
  if (email.length > 0 && !isValidEmail(email)) {
    return createJsonResponse({ success: false, error: 'Invalid email address format.' });
  }

  // 8. Server-controlled fields (Client CANNOT set or override these)
  var referenceId = generateReferenceId();
  var timestampIso = new Date().toISOString();
  var initialStatus = 'New';

  // 9. Protect against Spreadsheet formula injection
  var safeTitle = sanitizeForFormulaInjection(title);
  var safeDetails = sanitizeForFormulaInjection(details);
  var safeEmail = email ? sanitizeForFormulaInjection(email) : '';
  var safeType = type; // validated against allowlist

  // 10. Concurrency lock to safely append to spreadsheet without race conditions
  var lock = LockService.getScriptLock();
  var lockSuccess = lock.tryLock(10000); // Wait up to 10 seconds for concurrent writes
  if (!lockSuccess) {
    return createJsonResponse({
      success: false,
      error: 'Spreadsheet write lock busy. Please try again in a few moments.'
    });
  }

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error('No active spreadsheet bound to script.');
    }

    var sheet = ss.getSheetByName('Submissions') || ss.getActiveSheet();
    if (!sheet) {
      throw new Error('Worksheet "Submissions" not found.');
    }

    // Auto-create header row if sheet is freshly created
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Submission ID',
        'Type',
        'Timestamp (UTC)',
        'Title',
        'Details',
        'User Email',
        'Status',
        'Resolved Date',
        'Notes'
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    // Append new submission row
    sheet.appendRow([
      referenceId,
      safeType,
      timestampIso,
      safeTitle,
      safeDetails,
      safeEmail,
      initialStatus,
      '', // Resolved Date (empty initially)
      ''  // Notes (empty initially)
    ]);

    // Force flush to ensure data is committed to disk before releasing lock
    SpreadsheetApp.flush();

    // 11. Return success with server-generated reference ID
    return createJsonResponse({
      success: true,
      referenceId: referenceId,
      timestamp: timestampIso,
      type: safeType
    });
  } catch (err) {
    // Avoid exposing internal spreadsheet IDs, credentials, or stack traces
    return createJsonResponse({
      success: false,
      error: 'Failed to record submission in spreadsheet. Please try again later.'
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * HTTP GET entrypoint - Health check / status probe
 */
function doGet(e) {
  return createJsonResponse({
    status: 'ok',
    service: 'Asymptote Feedback Webhook',
    timestamp: new Date().toISOString()
  });
}
