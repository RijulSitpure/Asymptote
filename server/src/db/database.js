import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PATTERNS } from './patternsSeed.js';
import { PROBLEMS } from './problemsSeed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_PATH = path.join(DATA_DIR, 'tracker.db');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export class DBManager {
  constructor(dbPath = DB_PATH) {
    this.db = new DatabaseSync(dbPath);
    this.initTables();
    this.seedDefaults();
  }

  initTables() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS patterns (
        id TEXT PRIMARY KEY,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        difficulty TEXT,
        short_description TEXT,
        mental_triggers TEXT,
        constraint_signals TEXT,
        complexity TEXT,
        base_template_py TEXT,
        base_template_cpp TEXT,
        twists TEXT
      );

      CREATE TABLE IF NOT EXISTS problems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        frontend_id TEXT UNIQUE,
        title TEXT NOT NULL,
        title_slug TEXT UNIQUE,
        difficulty TEXT,
        pattern_id TEXT,
        twist_type TEXT,
        constraints TEXT,
        summary TEXT,
        trigger_clues TEXT,
        hints_progressive TEXT,
        solution_python TEXT,
        is_solved INTEGER DEFAULT 0,
        solved_at TEXT,
        user_code TEXT,
        user_notes TEXT,
        user_rating INTEGER DEFAULT 0,
        review_needed INTEGER DEFAULT 0,
        FOREIGN KEY (pattern_id) REFERENCES patterns(id)
      );

      CREATE TABLE IF NOT EXISTS user_settings (
        key TEXT PRIMARY KEY,
        value TEXT
      );

      CREATE TABLE IF NOT EXISTS sync_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source TEXT,
        status TEXT,
        message TEXT,
        created_at TEXT
      );
    `);
  }

  seedDefaults() {
    // Upsert all curated patterns
    const upsertPattern = this.db.prepare(`
      INSERT INTO patterns (
        id, category, title, difficulty, short_description,
        mental_triggers, constraint_signals, complexity,
        base_template_py, base_template_cpp, twists
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        category = excluded.category,
        title = excluded.title,
        difficulty = excluded.difficulty,
        short_description = excluded.short_description,
        mental_triggers = excluded.mental_triggers,
        constraint_signals = excluded.constraint_signals,
        complexity = excluded.complexity,
        base_template_py = excluded.base_template_py,
        base_template_cpp = excluded.base_template_cpp,
        twists = excluded.twists
    `);

    for (const p of PATTERNS) {
      upsertPattern.run(
        p.id,
        p.category,
        p.title,
        p.difficulty,
        p.short_description,
        JSON.stringify(p.mental_triggers || []),
        JSON.stringify(p.constraint_signals || []),
        p.complexity || '',
        p.base_template_py || '',
        p.base_template_cpp || '',
        JSON.stringify(p.twists || [])
      );
    }

    // Check if problems table is empty
    const probCountRow = this.db.prepare('SELECT COUNT(*) as cnt FROM problems').get();
    if (probCountRow.cnt === 0) {
      console.log('Seeding iconic problems...');
      const insertProblem = this.db.prepare(`
        INSERT INTO problems (
          frontend_id, title, title_slug, difficulty, pattern_id,
          twist_type, constraints, summary, trigger_clues,
          hints_progressive, solution_python, is_solved, solved_at,
          user_code, user_notes, user_rating, review_needed
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const pr of PROBLEMS) {
        insertProblem.run(
          pr.frontend_id,
          pr.title,
          pr.title_slug,
          pr.difficulty,
          pr.pattern_id,
          pr.twist_type || '',
          pr.constraints || '',
          pr.summary || '',
          JSON.stringify(pr.trigger_clues || []),
          JSON.stringify(pr.hints_progressive || []),
          pr.solution_python || '',
          pr.is_solved ? 1 : 0,
          pr.solved_at || null,
          pr.solution_python || '',
          pr.user_notes || '',
          pr.user_rating || 0,
          pr.review_needed ? 1 : 0
        );
      }
    }
  }

  // --- Patterns ---
  getPatterns() {
    const rows = this.db.prepare('SELECT * FROM patterns ORDER BY category, title').all();
    return rows.map(r => ({
      ...r,
      mental_triggers: JSON.parse(r.mental_triggers || '[]'),
      constraint_signals: JSON.parse(r.constraint_signals || '[]'),
      twists: JSON.parse(r.twists || '[]')
    }));
  }

  getPatternById(id) {
    const row = this.db.prepare('SELECT * FROM patterns WHERE id = ?').get(id);
    if (!row) return null;
    return {
      ...row,
      mental_triggers: JSON.parse(row.mental_triggers || '[]'),
      constraint_signals: JSON.parse(row.constraint_signals || '[]'),
      twists: JSON.parse(row.twists || '[]')
    };
  }

  // --- Problems ---
  getProblems(filters = {}) {
    let sql = 'SELECT * FROM problems';
    const conditions = [];
    const params = [];

    if (filters.pattern_id) {
      conditions.push('pattern_id = ?');
      params.push(filters.pattern_id);
    }
    if (filters.difficulty) {
      conditions.push('difficulty = ?');
      params.push(filters.difficulty);
    }
    if (filters.is_solved !== undefined) {
      conditions.push('is_solved = ?');
      params.push(filters.is_solved ? 1 : 0);
    }
    if (filters.review_needed !== undefined) {
      conditions.push('review_needed = ?');
      params.push(filters.review_needed ? 1 : 0);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY CAST(frontend_id AS INTEGER) ASC';

    const rows = this.db.prepare(sql).all(...params);
    return rows.map(r => ({
      ...r,
      trigger_clues: JSON.parse(r.trigger_clues || '[]'),
      hints_progressive: JSON.parse(r.hints_progressive || '[]')
    }));
  }

  getProblemById(id) {
    const row = this.db.prepare('SELECT * FROM problems WHERE id = ?').get(id);
    if (!row) return null;
    return {
      ...row,
      trigger_clues: JSON.parse(row.trigger_clues || '[]'),
      hints_progressive: JSON.parse(row.hints_progressive || '[]')
    };
  }

  findProblem(query) {
    const q = query.trim().toLowerCase();
    const row = this.db.prepare(`
      SELECT * FROM problems 
      WHERE frontend_id = ? 
         OR title_slug = ? 
         OR LOWER(title) LIKE ?
      LIMIT 1
    `).get(q, q, `%${q}%`);

    if (!row) return null;
    return {
      ...row,
      trigger_clues: JSON.parse(row.trigger_clues || '[]'),
      hints_progressive: JSON.parse(row.hints_progressive || '[]')
    };
  }

  upsertProblem(p) {
    const existing = this.db.prepare('SELECT id, is_solved FROM problems WHERE frontend_id = ? OR title_slug = ?').get(p.frontend_id, p.title_slug);
    if (existing) {
      const update = this.db.prepare(`
        UPDATE problems SET
          title = COALESCE(?, title),
          difficulty = COALESCE(?, difficulty),
          pattern_id = COALESCE(?, pattern_id),
          twist_type = COALESCE(?, twist_type),
          constraints = COALESCE(?, constraints),
          summary = COALESCE(?, summary),
          trigger_clues = COALESCE(?, trigger_clues),
          hints_progressive = COALESCE(?, hints_progressive),
          solution_python = COALESCE(?, solution_python),
          is_solved = COALESCE(?, is_solved),
          solved_at = COALESCE(?, solved_at),
          user_code = COALESCE(?, user_code),
          user_notes = COALESCE(?, user_notes),
          user_rating = COALESCE(?, user_rating),
          review_needed = COALESCE(?, review_needed)
        WHERE id = ?
      `);

      update.run(
        p.title || null,
        p.difficulty || null,
        p.pattern_id || null,
        p.twist_type || null,
        p.constraints || null,
        p.summary || null,
        p.trigger_clues ? JSON.stringify(p.trigger_clues) : null,
        p.hints_progressive ? JSON.stringify(p.hints_progressive) : null,
        p.solution_python || null,
        p.is_solved !== undefined ? (p.is_solved ? 1 : 0) : null,
        p.solved_at || null,
        p.user_code || null,
        p.user_notes || null,
        p.user_rating !== undefined ? p.user_rating : null,
        p.review_needed !== undefined ? (p.review_needed ? 1 : 0) : null,
        existing.id
      );
      return existing.id;
    } else {
      const insert = this.db.prepare(`
        INSERT INTO problems (
          frontend_id, title, title_slug, difficulty, pattern_id,
          twist_type, constraints, summary, trigger_clues,
          hints_progressive, solution_python, is_solved, solved_at,
          user_code, user_notes, user_rating, review_needed
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const res = insert.run(
        p.frontend_id,
        p.title,
        p.title_slug,
        p.difficulty || 'Medium',
        p.pattern_id || null,
        p.twist_type || '',
        p.constraints || '',
        p.summary || '',
        JSON.stringify(p.trigger_clues || []),
        JSON.stringify(p.hints_progressive || []),
        p.solution_python || '',
        p.is_solved ? 1 : 0,
        p.solved_at || null,
        p.user_code || '',
        p.user_notes || '',
        p.user_rating || 0,
        p.review_needed ? 1 : 0
      );
      return res.lastInsertRowid;
    }
  }

  updateProblemDetails(id, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;

    const setClauses = [];
    const vals = [];
    for (const k of keys) {
      if (k === 'trigger_clues' || k === 'hints_progressive') {
        setClauses.push(`${k} = ?`);
        vals.push(JSON.stringify(fields[k]));
      } else if (k === 'is_solved' || k === 'review_needed') {
        setClauses.push(`${k} = ?`);
        vals.push(fields[k] ? 1 : 0);
      } else {
        setClauses.push(`${k} = ?`);
        vals.push(fields[k]);
      }
    }
    vals.push(id);
    const sql = `UPDATE problems SET ${setClauses.join(', ')} WHERE id = ?`;
    this.db.prepare(sql).run(...vals);
  }

  // --- Statistics & Insights ---
  getStats() {
    const totalProblems = this.db.prepare('SELECT COUNT(*) as count FROM problems').get().count;
    const solvedCount = this.db.prepare('SELECT COUNT(*) as count FROM problems WHERE is_solved = 1').get().count;
    const reviewQueueCount = this.db.prepare('SELECT COUNT(*) as count FROM problems WHERE review_needed = 1').get().count;

    // Pattern distribution
    const patternDistribution = this.db.prepare(`
      SELECT 
        p.id as pattern_id, 
        p.title as pattern_title, 
        p.category, 
        COUNT(pr.id) as total_problems,
        SUM(CASE WHEN pr.is_solved = 1 THEN 1 ELSE 0 END) as solved_problems
      FROM patterns p
      LEFT JOIN problems pr ON p.id = pr.pattern_id
      GROUP BY p.id
      ORDER BY solved_problems ASC, total_problems DESC
    `).all();

    // Identify weak spots (patterns with 0 solved or low ratio)
    const weakSpots = patternDistribution
      .filter(p => p.solved_problems === 0 || (p.solved_problems / Math.max(1, p.total_problems) < 0.5))
      .slice(0, 5);

    return {
      totalProblems,
      solvedCount,
      reviewQueueCount,
      patternDistribution,
      weakSpots
    };
  }

  // --- User Settings & Logs ---
  getSetting(key, fallback = null) {
    const row = this.db.prepare('SELECT value FROM user_settings WHERE key = ?').get(key);
    return row ? row.value : fallback;
  }

  setSetting(key, value) {
    this.db.prepare('INSERT INTO user_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?').run(key, value, value);
  }

  addSyncLog(source, status, message) {
    this.db.prepare('INSERT INTO sync_logs (source, status, message, created_at) VALUES (?, ?, ?, ?)').run(
      source,
      status,
      message,
      new Date().toISOString()
    );
  }

  getRecentLogs(limit = 10) {
    return this.db.prepare('SELECT * FROM sync_logs ORDER BY id DESC LIMIT ?').all(limit);
  }
}
