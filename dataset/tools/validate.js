#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import '../../shared/languages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const datasetDir = path.resolve(rootDir, 'dataset');

const { CATEGORY_ALLOWED_LANGUAGES } = globalThis.LanguagesModule;

const ALGORITHMS_ALLOWED_FAMILIES = new Set([
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Binary Search',
  'Stack & Queue',
  'Linked List',
  'Trees',
  'Heap',
  'Backtracking',
  'Greedy',
  'Graphs',
  'Dynamic Programming',
  'Bit Manipulation',
  'Strings',
  'Math',
  'Data Structures',
  'Design',
  'Sorting',
  'Matrix'
]);

function runValidation(exitOnFailure = false) {
  const errors = [];
  const warnings = [];

  console.log('=== Asymptote Dataset Validation ===\n');

  // 1. Load schemas
  const patternSchemaPath = path.join(datasetDir, 'schema', 'pattern.schema.json');
  const problemSchemaPath = path.join(datasetDir, 'schema', 'problem.schema.json');

  if (!fs.existsSync(patternSchemaPath)) {
    console.error('Fatal: pattern.schema.json missing');
    process.exit(1);
  }
  if (!fs.existsSync(problemSchemaPath)) {
    console.error('Fatal: problem.schema.json missing');
    process.exit(1);
  }

  const patternSchema = JSON.parse(fs.readFileSync(patternSchemaPath, 'utf8'));
  const problemSchema = JSON.parse(fs.readFileSync(problemSchemaPath, 'utf8'));

  const ajv = new Ajv2020({ allErrors: true });
  const validatePatternFile = ajv.compile(patternSchema);
  const validateProblemFile = ajv.compile(problemSchema);

  // 2. Validate Pattern Files
  const patternsDir = path.join(datasetDir, 'patterns');
  const patternFiles = fs.readdirSync(patternsDir).filter(f => f.endsWith('.json'));

  const patternMap = new Map(); // id -> pattern
  let totalPatterns = 0;

  for (const file of patternFiles) {
    const filePath = path.join(patternsDir, file);
    let patterns;
    try {
      patterns = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      errors.push(`Pattern file ${file} is not valid JSON: ${e.message}`);
      continue;
    }

    const valid = validatePatternFile(patterns);
    if (!valid) {
      for (const err of validatePatternFile.errors) {
        errors.push(`[Schema] ${file}: ${err.instancePath} ${err.message}`);
      }
    }

    if (!Array.isArray(patterns)) {
      errors.push(`${file} must export a top-level array of pattern objects`);
      continue;
    }

    for (const p of patterns) {
      totalPatterns++;
      if (patternMap.has(p.id)) {
        errors.push(`[Duplicate Pattern ID] ID "${p.id}" in ${file} was already defined in ${patternMap.get(p.id).file}`);
      } else {
        patternMap.set(p.id, { ...p, file });
      }

      // Check Algorithms family
      if (p.domain === 'Algorithms') {
        if (!ALGORITHMS_ALLOWED_FAMILIES.has(p.family)) {
          errors.push(`[Pattern Family] Pattern "${p.id}" in ${file} has invalid family "${p.family}". Allowed families: ${Array.from(ALGORITHMS_ALLOWED_FAMILIES).join(', ')}`);
        }
      }
    }
  }

  console.log(`✓ Loaded and checked ${patternFiles.length} pattern files (${totalPatterns} patterns across all domains)`);

  // 3. Validate Problem Files
  const problemsDir = path.join(datasetDir, 'problems');
  const problemFiles = fs.existsSync(problemsDir) ? fs.readdirSync(problemsDir).filter(f => f.endsWith('.json')) : [];

  const seenNumbers = new Map(); // number -> slug
  let totalProblems = 0;

  for (const file of problemFiles) {
    const filePath = path.join(problemsDir, file);
    const expectedSlug = path.basename(file, '.json');

    let problem;
    try {
      problem = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      errors.push(`Problem file ${file} is not valid JSON: ${e.message}`);
      continue;
    }

    totalProblems++;

    // Schema check
    const valid = validateProblemFile(problem);
    if (!valid) {
      for (const err of validateProblemFile.errors) {
        errors.push(`[Schema] ${file}: ${err.instancePath} ${err.message}`);
      }
    }

    // Filename equals slug
    if (problem.slug !== expectedSlug) {
      errors.push(`[Filename Mismatch] ${file}: slug "${problem.slug}" does not match filename "${expectedSlug}"`);
    }

    // Unique number
    if (seenNumbers.has(problem.number)) {
      errors.push(`[Duplicate Problem Number] ${file}: problem number #${problem.number} already used by "${seenNumbers.get(problem.number)}"`);
    } else {
      seenNumbers.set(problem.number, problem.slug);
    }

    // Pattern referential integrity
    if (Array.isArray(problem.patterns)) {
      for (const patId of problem.patterns) {
        if (!patternMap.has(patId)) {
          errors.push(`[Referential Integrity] ${file}: referenced pattern "${patId}" does not exist in any pattern file`);
        } else {
          const pat = patternMap.get(patId);
          if (pat.domain !== problem.category) {
            errors.push(`[Domain Mismatch] ${file}: problem category "${problem.category}" does not match pattern "${patId}" domain "${pat.domain}"`);
          }
        }
      }
    }

    // Hint rubric and tone enforcement
    const { errors: hErrors, warnings: hWarnings } = lintHints(problem, file);
    errors.push(...hErrors);
    warnings.push(...hWarnings);

    // Solutions language check
    if (Array.isArray(problem.solutions)) {
      const allowedLangs = CATEGORY_ALLOWED_LANGUAGES[problem.category] || [];
      for (const sol of problem.solutions) {
        if (!allowedLangs.includes(sol.lang)) {
          errors.push(`[Category Language] ${file}: language "${sol.lang}" is not supported for category "${problem.category}". Allowed: ${allowedLangs.join(', ')}`);
        }
      }
    }

    // Review tier rules
    if (problem.review) {
      if (problem.review.status === 'tested') {
        const hasVerifiedSol = (problem.solutions || []).some(s => s.verifiedBy === 'tests' || s.verifiedBy === 'both');
        if (!hasVerifiedSol) {
          errors.push(`[Review Tier] ${file}: status is 'tested' but no solution has verifiedBy: 'tests' or 'both'`);
        }
        const testDir = path.join(datasetDir, 'tests', problem.slug);
        if (!fs.existsSync(testDir)) {
          errors.push(`[Review Tier] ${file}: status is 'tested' but test directory dataset/tests/${problem.slug} does not exist`);
        }
      } else if (problem.review.status === 'reviewed') {
        if (!problem.review.acceptedOnLeetCode) {
          errors.push(`[Review Tier] ${file}: status is 'reviewed' but acceptedOnLeetCode is null or empty`);
        }
        if (!problem.review.reviewer || !problem.review.reviewer.trim()) {
          errors.push(`[Review Tier] ${file}: status is 'reviewed' but reviewer is missing`);
        }
      }
    }

    // Complexity 3-part check for tested/reviewed problems
    if (problem.review && (problem.review.status === 'tested' || problem.review.status === 'reviewed')) {
      if (!problem.complexity) {
        errors.push(`[Complexity 3-Part] ${file}: missing complexity block on ${problem.review.status} problem`);
      } else {
        if (!problem.complexity.whyNaiveFails || !problem.complexity.whyNaiveFails.trim()) {
          errors.push(`[Complexity 3-Part] ${file}: missing or empty complexity.whyNaiveFails`);
        }
        if (!problem.complexity.spaceTimeTradeoff || !problem.complexity.spaceTimeTradeoff.trim()) {
          errors.push(`[Complexity 3-Part] ${file}: missing or empty complexity.spaceTimeTradeoff`);
        }
        if (!problem.complexity.interviewerExpectation || !problem.complexity.interviewerExpectation.trim()) {
          errors.push(`[Complexity 3-Part] ${file}: missing or empty complexity.interviewerExpectation`);
        }
      }
    }
  }

  console.log(`✓ Loaded and checked ${totalProblems} problem files`);

  // Summary
  console.log('\n--- Validation Results ---');
  if (warnings.length > 0) {
    console.log(`\nWarnings (${warnings.length}):`);
    warnings.forEach(w => console.log('  ⚠ ' + w));
  }

  if (errors.length > 0) {
    console.error(`\nValidation Failed with ${errors.length} error(s):`);
    errors.forEach(e => console.error('  ✖ ' + e));
    if (exitOnFailure) process.exit(1);
  } else {
    console.log(`\nAll checks passed successfully! (0 errors, ${warnings.length} warnings)\n`);
  }

  return { errors, warnings };
}

export const ALLOWED_ALL_CAPS = new Set(['BFS', 'DFS', 'DAG', 'DP', 'BST', 'NULL', 'SQL', 'JSON', 'CTE']);

export const HINT1_TECHNIQUE_PATTERNS = [
  { name: 'priority queue', regex: /\bpriority\s+queue\w*\b/i },
  { name: 'hash map', regex: /\bhash\s*map\w*\b/i },
  { name: 'hash', regex: /\bhash\w*\b/i },
  { name: 'heap', regex: /\bheap\w*\b/i },
  { name: 'stack', regex: /\bstack\w*\b/i },
  { name: 'queue', regex: /\bqueue\w*\b/i },
  { name: 'memo', regex: /\bmemo\w*\b/i },
  { name: 'dynamic programming', regex: /\bdynamic\s+programming\b/i },
  { name: 'two pointer', regex: /\btwo\s+pointers?\b/i },
  { name: 'binary search', regex: /\bbinary\s+search\b/i },
  { name: 'BFS', regex: /\bbfs\b/i },
  { name: 'DFS', regex: /\bdfs\b/i },
  { name: 'DP', regex: /\bdp\b/i }
];

export function lintHints(problem, file = 'problem.json') {
  const errors = [];
  const warnings = [];

  if (Array.isArray(problem.hints)) {
    for (const hint of problem.hints) {
      if (hint.level >= 1 && hint.level <= 3) {
        if (hint.text && hint.text.includes('```')) {
          errors.push(`[Hint Rubric] ${file}: Hint level ${hint.level} must not contain code fences (\`\`\`)`);
        }
      } else if (hint.level === 4) {
        if (!hint.text || (!hint.text.includes('```') && !hint.text.includes('def ') && !hint.text.includes('class ') && !hint.text.includes('SELECT') && !hint.text.includes('return '))) {
          warnings.push(`[Hint Rubric] ${file}: Hint level 4 should contain blueprint code or code fences`);
        }
      }

      if (hint.text) {
        // Strip code fences before tone checks
        const textOutsideCodeFences = hint.text.replace(/```[\s\S]*?```/g, '');

        // Check for exclamation marks
        if (textOutsideCodeFences.includes('!')) {
          errors.push(`[Hint Tone] ${file}: Hint level ${hint.level} contains exclamation mark (!) outside code fences`);
        }

        // Check for unapproved ALL-CAPS words (>= 3 letters for strict checking against allowed list)
        const allCapsWords = textOutsideCodeFences.match(/\b[A-Z]{3,}\b/g) || [];
        for (const word of allCapsWords) {
          if (!ALLOWED_ALL_CAPS.has(word)) {
            errors.push(`[Hint Tone] ${file}: Hint level ${hint.level} contains unapproved ALL-CAPS word "${word}". Allowed: ${Array.from(ALLOWED_ALL_CAPS).join(', ')}`);
          }
        }

        // Warning if L1 contains algorithm / data structure names
        if (hint.level === 1) {
          for (const { regex } of HINT1_TECHNIQUE_PATTERNS) {
            const match = textOutsideCodeFences.match(regex);
            if (match) {
              warnings.push(`[Hint 1 Technique Leak] ${file}: Hint level 1 contains technique/structure keyword "${match[0]}"`);
              break;
            }
          }
        }

        // Warning if L1 or L2 exceeds 300 chars
        if ((hint.level === 1 || hint.level === 2) && hint.text.length > 300) {
          warnings.push(`[Hint Length] ${file}: Hint level ${hint.level} length is ${hint.text.length} chars (exceeds 300 characters limit)`);
        }
      }
    }

    // Hint 4 must match solution
    const h4 = problem.hints.find(h => h.level === 4);
    if (h4 && Array.isArray(problem.solutions) && problem.solutions.length > 0) {
      const match = (h4.text || '').match(/```[a-z0-9_-]*\n([\s\S]*?)\n?```/i);
      const h4Code = match ? match[1].trim() : (h4.text || '').trim();
      const solCode = (problem.solutions[0].code || '').trim();
      if (h4Code !== solCode) {
        errors.push(`[Hint 4 Solution Mismatch] ${file}: Hint level 4 code does not match primary solution code`);
      }
    }
  }

  return { errors, warnings };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  runValidation(true);
}
