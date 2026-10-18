/**
 * Shared LeetCode Language Specifications and Utilities
 * Maps LeetCode's canonical langSlug identifiers to display metadata, editor languages, and solution helpers.
 * Universal script: functions in Node.js, Vite/React, and Chrome Extension content script / popup.
 */

(function (global) {
  const LEETCODE_LANGUAGES = {
    python3: { id: 'python3', name: 'Python 3', monacoLang: 'python', ext: '.py' },
    python: { id: 'python', name: 'Python', monacoLang: 'python', ext: '.py' },
    cpp: { id: 'cpp', name: 'C++', monacoLang: 'cpp', ext: '.cpp' },
    java: { id: 'java', name: 'Java', monacoLang: 'java', ext: '.java' },
    javascript: { id: 'javascript', name: 'JavaScript', monacoLang: 'javascript', ext: '.js' },
    typescript: { id: 'typescript', name: 'TypeScript', monacoLang: 'typescript', ext: '.ts' },
    csharp: { id: 'csharp', name: 'C#', monacoLang: 'csharp', ext: '.cs' },
    c: { id: 'c', name: 'C', monacoLang: 'c', ext: '.c' },
    golang: { id: 'golang', name: 'Go', monacoLang: 'go', ext: '.go' },
    kotlin: { id: 'kotlin', name: 'Kotlin', monacoLang: 'kotlin', ext: '.kt' },
    swift: { id: 'swift', name: 'Swift', monacoLang: 'swift', ext: '.swift' },
    rust: { id: 'rust', name: 'Rust', monacoLang: 'rust', ext: '.rs' },
    ruby: { id: 'ruby', name: 'Ruby', monacoLang: 'ruby', ext: '.rb' },
    php: { id: 'php', name: 'PHP', monacoLang: 'php', ext: '.php' },
    dart: { id: 'dart', name: 'Dart', monacoLang: 'dart', ext: '.dart' },
    scala: { id: 'scala', name: 'Scala', monacoLang: 'scala', ext: '.scala' },
    elixir: { id: 'elixir', name: 'Elixir', monacoLang: 'elixir', ext: '.ex' },
    erlang: { id: 'erlang', name: 'Erlang', monacoLang: 'erlang', ext: '.erl' },
    racket: { id: 'racket', name: 'Racket', monacoLang: 'racket', ext: '.rkt' },
    mysql: { id: 'mysql', name: 'MySQL', monacoLang: 'sql', ext: '.sql' },
    mssql: { id: 'mssql', name: 'MS SQL Server', monacoLang: 'sql', ext: '.sql' },
    postgresql: { id: 'postgresql', name: 'PostgreSQL', monacoLang: 'sql', ext: '.sql' },
    oraclesql: { id: 'oraclesql', name: 'Oracle', monacoLang: 'sql', ext: '.sql' },
    pythondata: { id: 'pythondata', name: 'Pandas', monacoLang: 'python', ext: '.py' },
    bash: { id: 'bash', name: 'Bash', monacoLang: 'shell', ext: '.sh' }
  };

  function getLanguageMeta(langSlug) {
    if (!langSlug) return null;
    const slug = String(langSlug).toLowerCase().trim();
    const base = LEETCODE_LANGUAGES[slug] || {
      id: slug,
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      monacoLang: 'plaintext',
      ext: `.${slug}`
    };
    return {
      ...base,
      langSlug: base.id,
      displayName: base.name
    };
  }

  const SHOW_HEURISTIC_PATTERNS = false;

  const CATEGORY_ALLOWED_LANGUAGES = {
    Algorithms: ['python3', 'python', 'cpp', 'java', 'javascript', 'typescript', 'csharp', 'c', 'golang', 'kotlin', 'swift', 'rust', 'ruby', 'php', 'dart', 'scala', 'elixir', 'erlang', 'racket'],
    Database: ['mysql', 'mssql', 'postgresql', 'oraclesql', 'pythondata'],
    pandas: ['pythondata', 'python3'],
    Shell: ['bash'],
    Concurrency: ['cpp', 'java', 'python', 'python3', 'c', 'csharp'],
    JavaScript: ['javascript', 'typescript']
  };

  function getSupportedLanguagesForProblem(problem) {
    if (!problem) return [];
    let rawLangs = null;

    if (Array.isArray(problem.languages)) {
      rawLangs = problem.languages;
    } else if (typeof problem.languages === 'string') {
      try {
        rawLangs = JSON.parse(problem.languages);
      } catch (_e) {
        rawLangs = null;
      }
    } else if (problem.languages === undefined && problem.category) {
      const cat = problem.category || 'Algorithms';
      rawLangs = CATEGORY_ALLOWED_LANGUAGES[cat] || CATEGORY_ALLOWED_LANGUAGES.Algorithms || [];
    }

    // Nullable state: if unknown/null/empty, return empty array to trigger loading state
    if (!rawLangs || !Array.isArray(rawLangs) || rawLangs.length === 0) {
      return [];
    }

    return rawLangs.map(slug => getLanguageMeta(slug)).filter(Boolean);
  }

  function getProblemSolutionCode(problem, langSlug) {
    if (!problem) return '';
    const langMeta = getLanguageMeta(langSlug) || { name: langSlug, id: langSlug };
    const targetSlug = langMeta.id;

    if (!problem.verified) {
      return '';
    }

    // Check problem.solutions array first
    if (Array.isArray(problem.solutions) && problem.solutions.length > 0) {
      const match = problem.solutions.find(s => s.lang === targetSlug || (targetSlug === 'python3' && s.lang === 'python') || (targetSlug === 'python' && s.lang === 'python3'));
      if (match && match.code && match.code.trim()) {
        return match.code;
      }
    }

    if (targetSlug === 'python3' || targetSlug === 'python') {
      if (problem.solution_python && problem.solution_python.trim()) {
        return problem.solution_python;
      }
      const hints = Array.isArray(problem.hints) ? problem.hints : (Array.isArray(problem.hints_progressive) ? problem.hints_progressive : []);
      if (hints[3]?.text && hints[3].text.trim()) {
        return hints[3].text;
      }
      if (hints[3]?.content && hints[3].content.trim()) {
        return hints[3].content;
      }
    }

    // Available solutions
    const availableLangs = [];
    if (Array.isArray(problem.solutions)) {
      for (const s of problem.solutions) {
        const m = getLanguageMeta(s.lang);
        const name = m ? m.name : s.lang;
        if (!availableLangs.includes(name)) {
          availableLangs.push(name);
        }
      }
    }
    if (availableLangs.length === 0 && (problem.solution_python || problem.hints?.[3])) {
      availableLangs.push('Python 3');
    }
    const availStr = availableLangs.length > 0 ? availableLangs.join(', ') : 'None';

    const commentPrefix = (targetSlug === 'python' || targetSlug === 'python3' || targetSlug === 'bash' || targetSlug === 'pythondata') ? '#' : (targetSlug === 'mysql' || targetSlug === 'postgresql' || targetSlug === 'mssql' || targetSlug === 'oraclesql') ? '--' : '//';

    return `${commentPrefix} Verified ${langMeta.name} solution is not yet in the local dataset.\n${commentPrefix} Currently available verified solution(s) for this problem: ${availStr}`;
  }

  const api = {
    SHOW_HEURISTIC_PATTERNS,
    LEETCODE_LANGUAGES,
    CATEGORY_ALLOWED_LANGUAGES,
    getLanguageMeta,
    getSupportedLanguagesForProblem,
    getProblemSolutionCode
  };

  if (typeof global !== 'undefined') {
    global.LanguagesModule = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
