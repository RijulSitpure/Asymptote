import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DBManager } from './db/database.js';
import { SyncService } from './services/syncService.js';
import { DiagnosticWizard } from './services/wizard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_DIR = path.resolve(__dirname, '../../client');
const PORT = process.env.PORT || 3001;

const db = new DBManager();
const patterns = db.getPatterns();
const syncService = new SyncService(db, patterns);
const wizard = new DiagnosticWizard(patterns);

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function sendJSON(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-requested-with, Access-Control-Request-Private-Network',
    'Access-Control-Allow-Private-Network': 'true'
  });
  res.end(JSON.stringify(data));
}

function sendError(res, message, statusCode = 400) {
  sendJSON(res, { error: message }, statusCode);
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON format'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // Handle CORS & Private Network preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-requested-with, Access-Control-Request-Private-Network',
      'Access-Control-Allow-Private-Network': 'true'
    });
    res.end();
    return;
  }

  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;

  try {
    // API Routes
    if (pathname === '/api/patterns' && req.method === 'GET') {
      const all = db.getPatterns();
      return sendJSON(res, all);
    }

    if (pathname.startsWith('/api/patterns/') && req.method === 'GET') {
      const id = pathname.replace('/api/patterns/', '');
      const pattern = db.getPatternById(id);
      if (!pattern) return sendError(res, 'Pattern not found', 404);
      const linkedProblems = db.getProblems({ pattern_id: id });
      return sendJSON(res, { ...pattern, problems: linkedProblems });
    }

    if (pathname === '/api/problems' && req.method === 'GET') {
      const filters = {};
      if (searchParams.get('pattern_id')) filters.pattern_id = searchParams.get('pattern_id');
      if (searchParams.get('difficulty')) filters.difficulty = searchParams.get('difficulty');
      if (searchParams.get('is_solved')) filters.is_solved = searchParams.get('is_solved') === 'true';
      if (searchParams.get('review_needed')) filters.review_needed = searchParams.get('review_needed') === 'true';
      const problems = db.getProblems(filters);
      return sendJSON(res, problems);
    }

    if (pathname === '/api/problems' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.title) return sendError(res, 'Problem title is required');
      const id = db.upsertProblem(body);
      return sendJSON(res, { success: true, id }, 201);
    }

    if (pathname.startsWith('/api/problems/') && req.method === 'GET') {
      const id = pathname.replace('/api/problems/', '');
      const problem = db.getProblemById(Number(id));
      if (!problem) return sendError(res, 'Problem not found', 404);
      return sendJSON(res, problem);
    }

    if (pathname.startsWith('/api/problems/') && req.method === 'PUT') {
      const id = Number(pathname.replace('/api/problems/', ''));
      const body = await parseBody(req);
      db.updateProblemDetails(id, body);
      return sendJSON(res, { success: true, id });
    }

    // Hint Finder for a problem
    if (pathname.startsWith('/api/hints/') && req.method === 'GET') {
      const query = decodeURIComponent(pathname.replace('/api/hints/', ''));
      const problem = db.findProblem(query);
      if (!problem) {
        return sendError(res, `No stored problem matching '${query}'. Try searching pattern library or use the Diagnostic Wizard.`, 404);
      }
      const pattern = db.getPatternById(problem.pattern_id);
      return sendJSON(res, {
        problem,
        pattern,
        hints: problem.hints_progressive
      });
    }

    // Diagnostic Wizard
    if (pathname === '/api/wizard/diagnose' && req.method === 'POST') {
      const body = await parseBody(req);
      const results = wizard.diagnose(body);
      return sendJSON(res, { results });
    }

    // LeetCode Sync (by username)
    if (pathname === '/api/sync/leetcode' && req.method === 'POST') {
      const body = await parseBody(req);
      const username = body.username || db.getSetting('leetcode_username');
      if (!username) return sendError(res, 'Username is required');

      try {
        const stats = await syncService.syncUserSubmissions(username, body.limit || 20);
        return sendJSON(res, { success: true, ...stats });
      } catch (err) {
        return sendError(res, `Sync failed: ${err.message}`, 500);
      }
    }

    // Extension Webhook (single question submission)
    if (pathname === '/api/submissions' && req.method === 'POST') {
      const body = await parseBody(req);
      const result = await syncService.ingestFromExtension(body);
      return sendJSON(res, { success: true, ...result });
    }

    // Full Batch Sync (e.g. all solved questions from extension)
    if (pathname === '/api/sync/batch' && req.method === 'POST') {
      const body = await parseBody(req);
      const result = await syncService.syncBatchSolved(body.username, body.problems);
      return sendJSON(res, { success: true, ...result });
    }

    // Statistics
    if (pathname === '/api/stats' && req.method === 'GET') {
      const stats = db.getStats();
      const lastSync = db.getSetting('last_synced_at');
      const username = db.getSetting('leetcode_username');
      const recentLogs = db.getRecentLogs(5);
      return sendJSON(res, {
        ...stats,
        lastSync,
        username,
        recentLogs
      });
    }

    // Static File Serving
    let filePath = path.join(CLIENT_DIR, pathname === '/' ? 'index.html' : pathname);
    if (!fs.existsSync(filePath)) {
      // Fallback to index.html for SPA
      filePath = path.join(CLIENT_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });

  } catch (error) {
    console.error('Request error:', error);
    sendError(res, error.message || 'Internal Server Error', 500);
  }
});

server.listen(PORT, () => {
  console.log(`🚀 LeetCode Pattern Tracker is running at: http://localhost:${PORT}`);
  console.log(`📊 Curated patterns loaded: ${patterns.length}`);
  console.log(`🔍 Built-in diagnostic wizard and progressive hint engine active`);
});
