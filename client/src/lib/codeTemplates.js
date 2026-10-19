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
  return `// No verified blueprint in ${meta?.name || langSlug} yet`;
}

/**
 * Returns problem-specific solution code across languages.
 */
export function getProblemCode(problem, pattern, langSlug = 'python3') {
  return getProblemSolutionCode(problem, langSlug);
}
