import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DBManager } from './db/database.js';
import { SyncService, KNOWN_PROBLEMS } from './services/syncService.js';
import { DiagnosticWizard } from './services/wizard.js';
import { ComplexityService } from './services/complexityService.js';
import { PatternClassifier } from './services/classifier.js';
import '../../shared/languages.js';
const { getSupportedLanguagesForProblem } = globalThis.LanguagesModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_DIR = fs.existsSync(path.resolve(__dirname, '../../client/dist'))
  ? path.resolve(__dirname, '../../client/dist')
  : path.resolve(__dirname, '../../client');
const PORT = process.env.PORT || 3001;

export function createServer(customDb = null, customLeetCode = null) {
  const db = customDb || new DBManager();
  const patterns = db.getPatterns();
  const syncService = new SyncService(db, patterns, customLeetCode);
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
      const linkedProblems = db.getProblems({ pattern_id: id, verified: true });
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
        let category = null;
        let languages = null;

        if (/^\d+$/.test(query)) {
          if (KNOWN_PROBLEMS[query]) {
            const kp = KNOWN_PROBLEMS[query];
            frontendId = query;
            title = kp.title;
            slug = kp.slug;
            difficulty = kp.difficulty;
            tags = kp.tags || [];
            if (kp.category) category = kp.category;
          } else {
            frontendId = query;
            slug = '';
            title = '';
          }
        } else {
          for (const [id, kp] of Object.entries(KNOWN_PROBLEMS)) {
            if (kp.slug === query) {
              frontendId = id;
              title = kp.title;
              difficulty = kp.difficulty;
              tags = kp.tags || [];
              if (kp.category) category = kp.category;
              break;
            }
          }
          if (!title && slug) {
            title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          }
        }

        if (slug) {
          try {
            const details = await syncService.leetcode.getQuestionDetails(slug);
            if (details) {
              if (details.title) title = details.title;
              if (details.questionFrontendId) frontendId = details.questionFrontendId;
              if (details.difficulty) difficulty = details.difficulty;
              if (details.categoryTitle) category = details.categoryTitle;
              if (details.codeSnippets && Array.isArray(details.codeSnippets)) {
                languages = details.codeSnippets.map(s => s.langSlug);
              }
              if (details.topicTags && Array.isArray(details.topicTags)) {
                tags = details.topicTags.map(t => t.name || t);
              }
            }
          } catch (e) {
            // Ignore network errors in dynamic lookup
          }
        }

        const isRealId = frontendId && /^\d+$/.test(frontendId) && slug;
        if (isRealId && (title || slug)) {
          const classification = classifier.classify({ title: title || slug, titleSlug: slug, topicTags: tags });
          const newId = db.upsertProblem({
            frontend_id: frontendId,
            title: title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            title_slug: slug,
            difficulty,
            pattern_id: classification.pattern_id || null,
            twist_type: classification.twist_type || '',
            constraints: '',
            summary: `Auto-generated profile for ${title || slug}`,
            trigger_clues: [],
            hints_progressive: [],
            solution_python: '',
            is_solved: false,
            user_code: '',
            user_notes: '',
            user_rating: 0,
            review_needed: false,
            source: 'heuristic',
            verified: 0,
            category,
            languages
          });
          problem = db.getProblemById(newId);
        } else {
          // If real ID cannot be fetched, return in-memory representation without saving to database
          problem = {
            id: null,
            frontend_id: (frontendId && /^\d+$/.test(frontendId)) ? frontendId : null,
            title: title || (slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : `Problem #${query}`),
            title_slug: slug || null,
            difficulty,
            pattern_id: null,
            twist_type: '',
            constraints: '',
            summary: '',
            trigger_clues: [],
            hints_progressive: [],
            solution_python: '',
            is_solved: false,
            user_code: '',
            user_notes: '',
            user_rating: 0,
            review_needed: false,
            source: 'none',
            verified: 0,
            category,
            languages
          };
        }
      }

      // If existing saved problem has null category or languages, fetch them on first view
      if (problem && problem.id && (problem.category === null || problem.languages === null) && problem.title_slug) {
        try {
          const details = await syncService.leetcode.getQuestionDetails(problem.title_slug);
          if (details) {
            const updates = {};
            if (details.categoryTitle && !problem.category) {
              updates.category = details.categoryTitle;
              problem.category = details.categoryTitle;
            }
            if (details.codeSnippets && Array.isArray(details.codeSnippets) && !problem.languages) {
              const langs = details.codeSnippets.map(s => s.langSlug);
              updates.languages = langs;
              problem.languages = langs;
            }
            if (Object.keys(updates).length > 0) {
              db.updateProblemDetails(problem.id, updates);
            }
          }
        } catch (e) {
          // Leave as null if fetch fails
        }
      }

      const isVerified = Boolean(problem.verified === 1 || problem.verified === true);
      const pattern = isVerified && problem.pattern_id ? db.getPatternById(problem.pattern_id) : null;
      const suggestedPattern = (!isVerified && problem.pattern_id) ? db.getPatternById(problem.pattern_id) : null;
      const complexity = isVerified ? complexityService.analyze(problem, pattern) : null;
      const hints = isVerified ? (problem.hints_progressive || []) : [];
      const supportedLanguages = getSupportedLanguagesForProblem(problem);

      return sendJSON(res, {
        problem: {
          ...problem,
          supported_languages: supportedLanguages,
          suggested_pattern: suggestedPattern
        },
        pattern,
        suggested_pattern: suggestedPattern,
        hints,
        complexity,
        supported_languages: supportedLanguages
      });
    }

    // Complexity Targeter
    if (cleanPath.startsWith('/api/complexity/') && req.method === 'GET') {
      const query = decodeURIComponent(cleanPath.replace('/api/complexity/', '')).trim();
      const problem = db.findProblem(query);
      if (!problem) return sendError(res, 'Problem not found', 404);

      const isVerified = Boolean(problem.verified === 1 || problem.verified === true);
      const pattern = isVerified && problem.pattern_id ? db.getPatternById(problem.pattern_id) : null;
      const complexity = isVerified ? complexityService.analyze(problem, pattern) : null;

      return sendJSON(res, {
        problem_id: problem.id,
        frontend_id: problem.frontend_id,
        title: problem.title,
        verified: isVerified,
        complexity
      });
    }

    // Diagnostic Wizard
    if (cleanPath === '/api/wizard/diagnose' && req.method === 'POST') {
      const body = await parseBody(req);
      const results = wizard.diagnose(body);
      return sendJSON(res, { results, candidates: results });
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

    // Full Batch Sync (e.g. all solved questions from extension or web modal)
    if ((cleanPath === '/api/sync/batch' || cleanPath === '/api/sync/problems') && req.method === 'POST') {
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

  return { server, db, syncService, wizard, complexityService, classifier };
}

const isMain = process.argv[1] && (
  process.argv[1].endsWith('server/src/index.js') || 
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
);

if (isMain) {
  const { server, db } = createServer();
  const patterns = db.getPatterns();
  server.listen(PORT, () => {
    console.log(`[Asymptote] Server is running at: http://localhost:${PORT}`);
    console.log(`[Asymptote] Serving frontend from: ${CLIENT_DIR}`);
    console.log(`[Asymptote] Curated patterns loaded: ${patterns.length}`);
    console.log(`[Asymptote] Built-in diagnostic wizard and progressive hint engine active`);
  });
}
