import globals from 'globals';

export default [
  {
    ignores: [
      'client/dist/**',
      'extension/dashboard/**',
      'extension/data/**',
      'node_modules/**',
      '.agent/**',
      '.agents/**',
      '.gemini/**',
      'server/data/**',
      '**/*.min.js',
      'asymptote-brand 2/**',
      'tracker.db.bak'
    ],
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        chrome: 'readonly',
        globalThis: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly'
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'error'
    },
  },
];
