/**
 * Multi-Language Template Helpers
 * Leverages the shared LeetCode language specifications.
 */

import './languages.js';

const {
  SHOW_HEURISTIC_PATTERNS,
  LEETCODE_LANGUAGES,
  CATEGORY_ALLOWED_LANGUAGES,
  PATTERN_CATEGORY_LANGUAGES,
  getLanguageMeta,
  getSupportedLanguagesForProblem,
  getSupportedLanguagesForPattern,
  getProblemSolutionCode,
  getPatternCode: sharedGetPatternCode
} = globalThis.LanguagesModule;

export {
  SHOW_HEURISTIC_PATTERNS,
  LEETCODE_LANGUAGES,
  CATEGORY_ALLOWED_LANGUAGES,
  PATTERN_CATEGORY_LANGUAGES,
  getLanguageMeta,
  getSupportedLanguagesForProblem,
  getSupportedLanguagesForPattern,
  getProblemSolutionCode
};

export const SUPPORTED_LANGUAGES = [
  LEETCODE_LANGUAGES.python3,
  LEETCODE_LANGUAGES.cpp,
  LEETCODE_LANGUAGES.java,
  LEETCODE_LANGUAGES.javascript,
  LEETCODE_LANGUAGES.typescript
];

/**
 * Returns canonical pattern scaffold code if available.
 */
export function getPatternCode(pattern, langSlug = 'python3') {
  if (typeof sharedGetPatternCode === 'function') {
    return sharedGetPatternCode(pattern, langSlug);
  }
  if (!pattern) return '';
  const meta = getLanguageMeta(langSlug);
  const slug = meta ? meta.id : langSlug;

  if (slug === 'python3' || slug === 'python') {
    return pattern.base_template_py || `# Canonical Python 3 Template for ${pattern.title || 'Pattern'}`;
  }
  if (slug === 'cpp') {
    return pattern.base_template_cpp || `// Canonical C++ Template for ${pattern.title || 'Pattern'}`;
  }
  if (slug === 'java') {
    return pattern.base_template_java || `// Canonical Java Template for ${pattern.title || 'Pattern'}`;
  }
  if (slug === 'javascript') {
    return pattern.base_template_js || pattern.base_template_ts || `// Canonical JavaScript Template for ${pattern.title || 'Pattern'}`;
  }
  if (slug === 'typescript') {
    return pattern.base_template_ts || pattern.base_template_js || `// Canonical TypeScript Template for ${pattern.title || 'Pattern'}`;
  }
  if (slug === 'mysql' || slug === 'postgresql' || slug === 'mssql' || slug === 'oraclesql') {
    return pattern.base_template_sql || `-- Canonical SQL Template for ${pattern.title || 'Pattern'}`;
  }
  if (slug === 'pythondata') {
    return pattern.base_template_py || `# Canonical Pandas Template for ${pattern.title || 'Pattern'}`;
  }
  if (slug === 'bash') {
    return pattern.base_template_sh || `# Canonical Bash Template for ${pattern.title || 'Pattern'}`;
  }
  return `// No verified blueprint in ${meta?.name || langSlug} yet`;
}

/**
 * Returns problem-specific solution code across languages.
 */
export function getProblemCode(problem, pattern, langSlug = 'python3') {
  return getProblemSolutionCode(problem, langSlug);
}
