import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PATTERNS } from './patternsSeed.js';
import { PROBLEMS } from './problemsSeed.js';
import { sortPatternsByPedagogy, sortCategoriesByPedagogy } from './curriculum.js';

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
        source TEXT DEFAULT 'heuristic',
        verified INTEGER DEFAULT 0,
        category TEXT DEFAULT NULL,
        languages TEXT DEFAULT NULL,
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

    // Ensure columns exist on problems table if older table exists
    const tableInfo = this.db.prepare('PRAGMA table_info(problems)').all();
    const colNames = tableInfo.map(c => c.name);
    if (!colNames.includes('source')) {
      this.db.exec("ALTER TABLE problems ADD COLUMN source TEXT DEFAULT 'heuristic'");
    }
    if (!colNames.includes('verified')) {
      this.db.exec("ALTER TABLE problems ADD COLUMN verified INTEGER DEFAULT 0");
    }
    if (!colNames.includes('category')) {
      this.db.exec("ALTER TABLE problems ADD COLUMN category TEXT DEFAULT NULL");
    }
    if (!colNames.includes('languages')) {
      this.db.exec("ALTER TABLE problems ADD COLUMN languages TEXT DEFAULT NULL");
    }
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
          user_code, user_notes, user_rating, review_needed,
          source, verified, category, languages
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          pr.review_needed ? 1 : 0,
          'curated',
          1,
          pr.category || null,
          null
        );
      }
    }
  }

  // --- Patterns ---
  getPatterns() {
    const rows = this.db.prepare('SELECT * FROM patterns').all();
    const mapped = rows.map(r => ({
      ...r,
      mental_triggers: JSON.parse(r.mental_triggers || '[]'),
      constraint_signals: JSON.parse(r.constraint_signals || '[]'),
      twists: JSON.parse(r.twists || '[]')
    }));
    return sortPatternsByPedagogy(mapped);
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
    let sql = `
      SELECT 
        pr.*, 
        CASE WHEN (pr.verified = 1 OR pr.source = 'curated') THEN p.title ELSE NULL END as pattern_title, 
        CASE WHEN (pr.verified = 1 OR pr.source = 'curated') THEN p.category ELSE NULL END as pattern_category 
      FROM problems pr
      LEFT JOIN patterns p ON pr.pattern_id = p.id
    `;
    const conditions = [];
    const params = [];

    if (filters.pattern_id) {
      conditions.push('pr.pattern_id = ?');
      params.push(filters.pattern_id);
    }
    if (filters.difficulty) {
      conditions.push('pr.difficulty = ?');
      params.push(filters.difficulty);
    }
    if (filters.is_solved !== undefined) {
      if (filters.is_solved) {
        conditions.push("(pr.is_solved = 1 OR pr.is_solved = '1' OR pr.is_solved = 'true' OR pr.is_solved = true)");
      } else {
        conditions.push("(pr.is_solved = 0 OR pr.is_solved = '0' OR pr.is_solved = 'false' OR pr.is_solved = false OR pr.is_solved IS NULL)");
      }
    }
    if (filters.review_needed !== undefined) {
      if (filters.review_needed) {
        conditions.push("(pr.review_needed = 1 OR pr.review_needed = '1' OR pr.review_needed = 'true' OR pr.review_needed = true)");
      } else {
        conditions.push("(pr.review_needed = 0 OR pr.review_needed = '0' OR pr.review_needed = 'false' OR pr.review_needed = false OR pr.review_needed IS NULL)");
      }
    }
    if (filters.verified !== undefined) {
      if (filters.verified) {
        conditions.push("(pr.verified = 1 OR pr.verified = '1' OR pr.source = 'curated')");
      } else {
        conditions.push("(pr.verified = 0 OR pr.verified = '0' OR pr.verified IS NULL)");
      }
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY CAST(pr.frontend_id AS INTEGER) ASC';

    const rows = this.db.prepare(sql).all(...params);
    return rows.map(r => ({
      ...r,
      is_solved: Boolean(r.is_solved === 1 || r.is_solved === '1' || r.is_solved === true || r.is_solved === 'true'),
      review_needed: Boolean(r.review_needed === 1 || r.review_needed === '1' || r.review_needed === true || r.review_needed === 'true'),
      source: r.source || (r.verified ? 'curated' : 'heuristic'),
      verified: Number(r.verified || 0),
      category: r.category || null,
      languages: r.languages ? (Array.isArray(r.languages) ? r.languages : JSON.parse(r.languages)) : null,
      trigger_clues: JSON.parse(r.trigger_clues || '[]'),
      hints_progressive: JSON.parse(r.hints_progressive || '[]')
    }));
  }

  getProblemById(id) {
    const row = this.db.prepare(`
      SELECT 
        pr.*, 
        CASE WHEN (pr.verified = 1 OR pr.source = 'curated') THEN p.title ELSE NULL END as pattern_title, 
        CASE WHEN (pr.verified = 1 OR pr.source = 'curated') THEN p.category ELSE NULL END as pattern_category 
      FROM problems pr
      LEFT JOIN patterns p ON pr.pattern_id = p.id
      WHERE pr.id = ?
    `).get(id);
    if (!row) return null;
    return {
      ...row,
      is_solved: Boolean(row.is_solved === 1 || row.is_solved === '1' || row.is_solved === true || row.is_solved === 'true'),
      review_needed: Boolean(row.review_needed === 1 || row.review_needed === '1' || row.review_needed === true || row.review_needed === 'true'),
      source: row.source || (row.verified ? 'curated' : 'heuristic'),
      verified: Number(row.verified || 0),
      category: row.category || null,
      languages: row.languages ? (Array.isArray(row.languages) ? row.languages : JSON.parse(row.languages)) : null,
      trigger_clues: JSON.parse(row.trigger_clues || '[]'),
      hints_progressive: JSON.parse(row.hints_progressive || '[]')
    };
  }

  findProblem(query) {
    const q = query.trim().toLowerCase();
    const row = this.db.prepare(`
      SELECT 
        pr.*, 
        CASE WHEN (pr.verified = 1 OR pr.source = 'curated') THEN p.title ELSE NULL END as pattern_title, 
        CASE WHEN (pr.verified = 1 OR pr.source = 'curated') THEN p.category ELSE NULL END as pattern_category 
      FROM problems pr
      LEFT JOIN patterns p ON pr.pattern_id = p.id
      WHERE pr.frontend_id = ? 
         OR pr.title_slug = ? 
         OR LOWER(pr.title) LIKE ?
      LIMIT 1
    `).get(q, q, `%${q}%`);

    if (!row) return null;
    return {
      ...row,
      is_solved: Boolean(row.is_solved === 1 || row.is_solved === '1' || row.is_solved === true || row.is_solved === 'true'),
      review_needed: Boolean(row.review_needed === 1 || row.review_needed === '1' || row.review_needed === true || row.review_needed === 'true'),
      source: row.source || (row.verified ? 'curated' : 'heuristic'),
      verified: Number(row.verified || 0),
      category: row.category || null,
      languages: row.languages ? (Array.isArray(row.languages) ? row.languages : JSON.parse(row.languages)) : null,
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
          review_needed = COALESCE(?, review_needed),
          source = COALESCE(?, source),
          verified = COALESCE(?, verified),
          category = COALESCE(?, category),
          languages = COALESCE(?, languages)
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
        p.source || null,
        p.verified !== undefined ? (p.verified ? 1 : 0) : null,
        p.category || null,
        p.languages ? (typeof p.languages === 'string' ? p.languages : JSON.stringify(p.languages)) : null,
        existing.id
      );
      return existing.id;
    } else {
      const insert = this.db.prepare(`
        INSERT INTO problems (
          frontend_id, title, title_slug, difficulty, pattern_id,
          twist_type, constraints, summary, trigger_clues,
          hints_progressive, solution_python, is_solved, solved_at,
          user_code, user_notes, user_rating, review_needed,
          source, verified, category, languages
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        p.review_needed ? 1 : 0,
        p.source || 'heuristic',
        p.verified ? 1 : 0,
        p.category || null,
        p.languages ? (typeof p.languages === 'string' ? p.languages : JSON.stringify(p.languages)) : null
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
      } else if (k === 'languages') {
        setClauses.push(`${k} = ?`);
        vals.push(fields[k] ? (typeof fields[k] === 'string' ? fields[k] : JSON.stringify(fields[k])) : null);
      } else {
        setClauses.push(`${k} = ?`);
        vals.push(fields[k] !== undefined ? fields[k] : null);
      }
    }
    vals.push(id);
    const sql = `UPDATE problems SET ${setClauses.join(', ')} WHERE id = ?`;
    this.db.prepare(sql).run(...vals);
  }

  // --- Statistics & Insights ---
  getStats() {
    const isSolvedCondition = "(pr.is_solved = 1 OR pr.is_solved = '1' OR pr.is_solved = 'true' OR pr.is_solved = true)";
    const isSolvedConditionSimple = "(is_solved = 1 OR is_solved = '1' OR is_solved = 'true' OR is_solved = true)";
    const reviewCondition = "(review_needed = 1 OR review_needed = '1' OR review_needed = 'true' OR review_needed = true)";

    const totalProblems = this.db.prepare('SELECT COUNT(*) as count FROM problems').get().count;
    const solvedCount = this.db.prepare(`SELECT COUNT(*) as count FROM problems WHERE ${isSolvedConditionSimple}`).get().count;
    const reviewQueueCount = this.db.prepare(`SELECT COUNT(*) as count FROM problems WHERE ${reviewCondition}`).get().count;

    // Difficulty breakdown for solved problems
    const diffRows = this.db.prepare(`
      SELECT difficulty, COUNT(*) as count 
      FROM problems 
      WHERE ${isSolvedConditionSimple}
      GROUP BY difficulty
    `).all();
    const difficultyBreakdown = { Easy: 0, Medium: 0, Hard: 0 };
    for (const r of diffRows) {
      if (r.difficulty && difficultyBreakdown.hasOwnProperty(r.difficulty)) {
        difficultyBreakdown[r.difficulty] = r.count;
      }
    }

    // Category distribution for solved problems, ordered pedagogically (verified problems only)
    const isVerifiedCondition = "(pr.verified = 1 OR pr.verified = '1' OR pr.source = 'curated')";
    const rawCategoryDistribution = this.db.prepare(`
      SELECT COALESCE(p.category, 'Uncategorized') as category, COUNT(pr.id) as count
      FROM problems pr
      LEFT JOIN patterns p ON pr.pattern_id = p.id
      WHERE ${isSolvedCondition} AND ${isVerifiedCondition}
      GROUP BY p.category
    `).all();
    const categoryDistribution = sortCategoriesByPedagogy(rawCategoryDistribution);

    // Pattern distribution with full pattern attributes, ordered pedagogically (verified problems only)
    const rawPatternDistribution = this.db.prepare(`
      SELECT 
        p.id,
        p.id as pattern_id, 
        p.title,
        p.title as pattern_title, 
        p.category, 
        p.difficulty,
        p.short_description,
        COUNT(pr.id) as total_problems,
        SUM(CASE WHEN ${isSolvedCondition} THEN 1 ELSE 0 END) as solved_problems
      FROM patterns p
      LEFT JOIN problems pr ON p.id = pr.pattern_id AND ${isVerifiedCondition}
      GROUP BY p.id
    `).all();
    const patternDistribution = sortPatternsByPedagogy(rawPatternDistribution);

    const totalPatternsCount = this.db.prepare('SELECT COUNT(*) as count FROM patterns').get().count;
    const coveredPatternsCount = patternDistribution.filter(p => p.solved_problems > 0).length;
    const patternCoveragePercent = totalPatternsCount > 0 
      ? Math.round((coveredPatternsCount / totalPatternsCount) * 100) 
      : 0;

    // Identify weak spots: prioritized in pedagogical learning sequence (foundations before DP)
    const weakSpots = patternDistribution
      .filter(p => p.solved_problems === 0 || (p.solved_problems / Math.max(1, p.total_problems) < 0.5))
      .slice(0, 6);

    return {
      totalProblems,
      solvedCount,
      totalSolved: solvedCount,
      reviewQueueCount,
      totalPatternsCount,
      coveredPatternsCount,
      patternCoveragePercent,
      difficultyBreakdown,
      categoryDistribution,
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
