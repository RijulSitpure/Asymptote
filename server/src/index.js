import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DBManager } from './db/database.js';
import { SyncService, KNOWN_PROBLEMS } from './services/syncService.js';
import { DiagnosticWizard } from './services/wizard.js';
import { ComplexityService } from './services/complexityService.js';
import { PatternClassifier } from './services/classifier.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_DIR = path.resolve(__dirname, '../../client');
const PORT = process.env.PORT || 3001;

const db = new DBManager();
const patterns = db.getPatterns();
const syncService = new SyncService(db, patterns);
const wizard = new DiagnosticWizard(patterns);
const complexityService = new ComplexityService();
const classifier = new PatternClassifier(patterns);

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
  const cleanPath = (pathname.length > 1 && pathname.endsWith('/')) ? pathname.slice(0, -1) : pathname;
  const searchParams = urlObj.searchParams;

  try {
    // API Routes
    if (cleanPath === '/api/patterns' && req.method === 'GET') {
      const all = db.getPatterns();
      return sendJSON(res, all);
    }

    if (cleanPath.startsWith('/api/patterns/') && req.method === 'GET') {
      const id = cleanPath.replace('/api/patterns/', '');
      const pattern = db.getPatternById(id);
      if (!pattern) return sendError(res, 'Pattern not found', 404);
      const linkedProblems = db.getProblems({ pattern_id: id });
      return sendJSON(res, { ...pattern, problems: linkedProblems });
    }

    if (cleanPath === '/api/problems' && req.method === 'GET') {
      const filters = {};
      if (searchParams.get('pattern_id')) filters.pattern_id = searchParams.get('pattern_id');
      if (searchParams.get('difficulty')) filters.difficulty = searchParams.get('difficulty');
      if (searchParams.get('is_solved')) filters.is_solved = searchParams.get('is_solved') === 'true';
      if (searchParams.get('review_needed')) filters.review_needed = searchParams.get('review_needed') === 'true';
      const problems = db.getProblems(filters);
      return sendJSON(res, problems);
    }

    if (cleanPath === '/api/problems' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.title) return sendError(res, 'Problem title is required');
      const id = db.upsertProblem(body);
      return sendJSON(res, { success: true, id }, 201);
    }

    if (cleanPath.startsWith('/api/problems/') && req.method === 'GET') {
      const id = cleanPath.replace('/api/problems/', '');
      const problem = db.getProblemById(Number(id));
      if (!problem) return sendError(res, 'Problem not found', 404);
      return sendJSON(res, problem);
    }

    if (cleanPath.startsWith('/api/problems/') && req.method === 'PUT') {
      const id = Number(cleanPath.replace('/api/problems/', ''));
      const body = await parseBody(req);
      db.updateProblemDetails(id, body);
      return sendJSON(res, { success: true, id });
    }

    // Socratic Hint Finder & Complexity Targeter
    if (cleanPath.startsWith('/api/hints/') && req.method === 'GET') {
      const query = decodeURIComponent(cleanPath.replace('/api/hints/', '')).trim();
      let problem = db.findProblem(query);

      // Dynamically resolve on the fly if not yet stored
      if (!problem) {
        let frontendId = '';
        let slug = query;
        let title = '';
        let tags = [];
        let difficulty = 'Medium';

        if (/^\d+$/.test(query)) {
          frontendId = query;
          if (KNOWN_PROBLEMS[query]) {
            const kp = KNOWN_PROBLEMS[query];
            title = kp.title;
            slug = kp.slug;
            difficulty = kp.difficulty;
            tags = kp.tags || [];
          } else {
            slug = `problem-${query}`;
            title = `LeetCode #${query}`;
          }
        } else {
          for (const [id, kp] of Object.entries(KNOWN_PROBLEMS)) {
            if (kp.slug === query) {
              frontendId = id;
              title = kp.title;
              difficulty = kp.difficulty;
              tags = kp.tags || [];
              break;
            }
          }
          if (!title) {
            title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          }
        }

        const classification = classifier.classify({ title, titleSlug: slug, topicTags: tags });
        const targetPattern = patterns.find(p => p.id === classification.pattern_id);
        const progressiveHints = classifier.generateProgressiveHints({ title }, targetPattern);

        const newId = db.upsertProblem({
          frontend_id: frontendId || String(Date.now()),
          title,
          title_slug: slug,
          difficulty,
          pattern_id: classification.pattern_id,
          twist_type: classification.twist_type,
          constraints: '',
          summary: `Auto-generated Socratic hints & complexity target for ${title}`,
          trigger_clues: targetPattern?.mental_triggers.slice(0, 3) || [],
          hints_progressive: progressiveHints,
          solution_python: '',
          is_solved: false,
          user_code: '',
          user_notes: '',
          user_rating: 0,
          review_needed: false
        });
        problem = db.getProblemById(newId);
      }

      const pattern = db.getPatternById(problem.pattern_id);
      const complexity = complexityService.analyze(problem, pattern);

      return sendJSON(res, {
        problem,
        pattern,
        hints: problem.hints_progressive,
        complexity
      });
    }

    // Diagnostic Wizard
    if (cleanPath === '/api/wizard/diagnose' && req.method === 'POST') {
      const body = await parseBody(req);
      const results = wizard.diagnose(body);
      return sendJSON(res, { results });
    }

    // LeetCode Sync (by username)
    if (cleanPath === '/api/sync/leetcode' && req.method === 'POST') {
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
    if (cleanPath === '/api/submissions' && req.method === 'POST') {
      const body = await parseBody(req);
      const result = await syncService.ingestFromExtension(body);
      return sendJSON(res, { success: true, ...result });
    }

    // Full Batch Sync (e.g. all solved questions from extension)
    if (cleanPath === '/api/sync/batch' && req.method === 'POST') {
      const body = await parseBody(req);
      const result = await syncService.syncBatchSolved(body.username, body.problems);
      return sendJSON(res, { success: true, ...result });
    }

    // Statistics
    if (cleanPath === '/api/stats' && req.method === 'GET') {
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

    // Explicit API 404 guard - NEVER fall through API calls to static index.html!
    if (cleanPath.startsWith('/api/')) {
      return sendError(res, `API route not found: ${req.method} ${cleanPath}`, 404);
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
