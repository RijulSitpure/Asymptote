#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const datasetDir = path.resolve(rootDir, 'dataset');
const catalogDir = path.resolve(datasetDir, 'catalog');
const targetFile = path.resolve(catalogDir, 'leetcode-catalog.json');

// Load all valid 99 pattern IDs
const patternsDir = path.join(datasetDir, 'patterns');
const allPatternIds = new Set();
for (const file of fs.readdirSync(patternsDir).filter(f => f.endsWith('.json'))) {
  const pList = JSON.parse(fs.readFileSync(path.join(patternsDir, file), 'utf8'));
  for (const p of pList) {
    allPatternIds.add(p.id);
  }
}

// Load curated problem primary patterns
const problemsDir = path.join(datasetDir, 'problems');
const curatedPatternsBySlug = new Map();
if (fs.existsSync(problemsDir)) {
  for (const file of fs.readdirSync(problemsDir).filter(f => f.endsWith('.json'))) {
    const prob = JSON.parse(fs.readFileSync(path.join(problemsDir, file), 'utf8'));
    if (prob.slug && prob.patterns?.[0]) {
      curatedPatternsBySlug.set(prob.slug, prob.patterns[0]);
    }
  }
}

function mapSuggestedPattern(q, category) {
  const slug = (q.titleSlug || '').toLowerCase();
  const title = (q.title || '').toLowerCase();
  const tags = (q.topicTags || []).map(t => (t.name || t.slug || '').toLowerCase());
  const tagSet = new Set(tags);

  // 1. Curated override
  if (curatedPatternsBySlug.has(slug)) {
    return curatedPatternsBySlug.get(slug);
  }

  // 2. Concurrency
  if (category === 'Concurrency') {
    if (slug.includes('philosopher')) return 'deadlock-avoidance';
    if (slug.includes('h2o') || slug.includes('barrier') || slug.includes('rendezvous')) return 'barrier-rendezvous';
    if (slug.includes('foobar') || slug.includes('fizz-buzz') || slug.includes('alternate')) return 'turn-taking';
    if (slug.includes('order') || slug.includes('zero-even-odd') || slug.includes('sequence')) return 'ordering-signals';
    if (slug.includes('producer') || slug.includes('consumer') || slug.includes('bounded-blocking')) return 'producer-consumer';
    if (slug.includes('traffic') || slug.includes('resource')) return 'resource-allocation';
    return 'mutual-exclusion';
  }

  // 3. Shell
  if (category === 'Shell') {
    if (slug.includes('word-frequency') || slug.includes('frequency') || slug.includes('count')) return 'count-and-sort';
    if (slug.includes('transpose') || slug.includes('column') || slug.includes('field')) return 'field-processing';
    if (slug.includes('tenth-line') || slug.includes('line') || slug.includes('sed')) return 'stream-edit';
    if (slug.includes('read') || slug.includes('log')) return 'line-by-line-reading';
    return 'text-filter';
  }

  // 4. JavaScript
  if (category === 'JavaScript') {
    if (slug.includes('counter') || slug.includes('curry') || slug.includes('memoize') || slug.includes('once')) return 'closures';
    if (slug.includes('sleep') || slug.includes('debounce') || slug.includes('throttle') || slug.includes('timeout') || slug.includes('time-limit') || slug.includes('cache-with-time-limit') || slug.includes('interval')) return 'timing-control';
    if (slug.includes('promise') || slug.includes('async') || slug.includes('await')) return 'promises-async';
    if (slug.includes('event-emitter') || slug.includes('class') || slug.includes('chain')) return 'classes-and-chaining';
    if (slug.includes('map') || slug.includes('filter') || slug.includes('reduce') || slug.includes('last') || slug.includes('group-by')) return 'array-prototype-methods';
    if (slug.includes('json') || slug.includes('flatten') || slug.includes('chunk') || slug.includes('deep') || slug.includes('object-diff')) return 'json-object-traversal';
    if (slug.includes('compose') || slug.includes('call-poly')) return 'higher-order-functions';
    return 'object-array-utilities';
  }

  // 5. pandas
  if (category === 'pandas') {
    if (slug.includes('duplicate') || slug.includes('drop') || slug.includes('clean') || slug.includes('fillna') || slug.includes('null') || slug.includes('missing')) return 'cleaning-nulls-duplicates';
    if (slug.includes('pivot') || slug.includes('melt') || slug.includes('reshape')) return 'reshape';
    if (slug.includes('join') || slug.includes('merge')) return 'merge-join';
    if (slug.includes('group') || slug.includes('count') || slug.includes('aggregate') || slug.includes('sum') || slug.includes('min') || slug.includes('max') || slug.includes('avg')) return 'groupby-agg';
    if (slug.includes('rank') || slug.includes('lead') || slug.includes('lag') || slug.includes('shift')) return 'rank-shift';
    if (slug.includes('create') || slug.includes('dataframe')) return 'dataframe-basics';
    if (slug.includes('string') || slug.includes('date') || slug.includes('time') || slug.includes('lower') || slug.includes('upper') || slug.includes('length')) return 'string-datetime-ops';
    if (slug.includes('apply') || slug.includes('vectorize')) return 'vectorize-apply';
    if (slug.includes('sort') || slug.includes('limit') || slug.includes('head') || slug.includes('concat')) return 'concat-sort-limit';
    return 'filter-select';
  }

  // 6. Database
  if (category === 'Database') {
    if (slug.includes('second-highest') || slug.includes('nth-highest') || (slug.includes('highest') && slug.includes('salary'))) return 'nth-highest-limit-offset';
    if (slug.includes('rank') || slug.includes('dense') || title.includes('rank') || slug.includes('top-three') || slug.includes('top-3')) return 'window-ranking';
    if (slug.includes('lead') || slug.includes('lag') || slug.includes('consecutive') || slug.includes('previous') || slug.includes('weather') || slug.includes('rising-temperature')) return 'window-offset';
    if (slug.includes('delete') || slug.includes('update')) return 'dml-update-delete';
    if (slug.includes('null') || slug.includes('ifnull') || slug.includes('coalesce')) return 'null-handling';
    if (slug.includes('gap') || slug.includes('island') || slug.includes('continuous')) return 'gaps-and-islands';
    if (slug.includes('tree') || slug.includes('hierarchy') || slug.includes('recursive') || slug.includes('boss') || slug.includes('manager')) return 'recursive-cte';
    if (slug.includes('pivot') || slug.includes('transpose') || slug.includes('case-when')) return 'conditional-pivot';
    if (slug.includes('running') || slug.includes('cumulative') || slug.includes('rolling') || slug.includes('moving')) return 'running-total';
    if (slug.includes('top-n') || slug.includes('top-2') || slug.includes('per-group')) return 'top-n-per-group';
    if (slug.includes('exists') || slug.includes('correlated')) return 'correlated-subquery-exists';
    if (slug.includes('anti') || slug.includes('never') || slug.includes('not-in') || slug.includes('unconfirmed') || slug.includes('without')) return 'anti-join';
    if (slug.includes('self-join') || slug.includes('confirmation')) return 'self-join';
    if (slug.includes('union') || slug.includes('intersect') || slug.includes('except')) return 'set-operations';
    if (slug.includes('date') || slug.includes('day') || slug.includes('month') || slug.includes('year') || slug.includes('time') || slug.includes('activity')) return 'date-time';
    if (slug.includes('string') || slug.includes('valid') || slug.includes('regex') || slug.includes('name') || slug.includes('format')) return 'string-handling';
    if (slug.includes('having')) return 'having-filter';
    if (slug.includes('group') || slug.includes('count') || slug.includes('sum') || slug.includes('average') || slug.includes('avg') || slug.includes('total') || slug.includes('sales') || slug.includes('orders')) return 'group-aggregate';
    return 'join-filter';
  }

  // 7. Algorithms
  if (tagSet.has('trie')) return 'tree-trie-prefix';
  if (tagSet.has('union find') || tagSet.has('union-find') || tagSet.has('disjoint set')) return 'graph-union-find-dsu';
  if (tagSet.has('segment tree') || tagSet.has('binary indexed tree')) return 'segment-tree-fenwick';
  if (tagSet.has('topological sort')) return 'graph-topo-kahn';
  if (tagSet.has('monotonic queue')) return 'queue-monotonic-sliding-window';
  if (tagSet.has('monotonic stack')) return 'stack-monotonic-next-greater';
  if (tagSet.has('binary search tree')) return 'tree-bst-properties';
  if (tagSet.has('quickselect')) return 'sorting-quickselect';
  if (tagSet.has('string matching') || tagSet.has('rolling hash')) return 'string-matching';
  if (tagSet.has('design')) return 'design-data-structures';

  // Heap / Priority Queue
  if (tagSet.has('heap (priority queue)') || tagSet.has('heap')) {
    if (slug.includes('median') || slug.includes('running')) return 'heap-two-heaps-median';
    return 'heap-top-k-elements';
  }

  // Linked list
  if (tagSet.has('linked list') || tagSet.has('linked-list')) {
    if (slug.includes('cycle') || slug.includes('fast-slow')) return 'two-pointers-fast-slow';
    return 'linked-list-pointers';
  }

  // Binary search
  if (tagSet.has('binary search') || tagSet.has('binary-search')) {
    if (slug.includes('rotated') || title.includes('rotated')) return 'binary-search-rotated';
    if (title.includes('capacity') || title.includes('koko') || title.includes('ship') || title.includes('split') || title.includes('minimum') || title.includes('maximum') || title.includes('smallest') || title.includes('largest') || slug.includes('koko') || slug.includes('capacity')) return 'binary-search-answer';
    return 'binary-search-basic';
  }

  // Sliding window & Prefix sum
  if (tagSet.has('sliding window') || tagSet.has('sliding-window')) {
    if (slug.includes('fixed') || slug.includes('permutation') || slug.includes('size-k') || slug.includes('length-k')) return 'sliding-window-fixed';
    return 'two-pointers-window-dynamic';
  }
  if (tagSet.has('prefix sum') || tagSet.has('prefix-sum')) return 'prefix-sum-hashmap';

  // Two pointers
  if (tagSet.has('two pointers') || tagSet.has('two-pointers')) {
    if (slug.includes('fast-slow') || slug.includes('cycle') || slug.includes('duplicate')) return 'two-pointers-fast-slow';
    return 'two-pointers-opposite';
  }

  // Stack
  if (tagSet.has('stack')) {
    if (slug.includes('monotonic') || slug.includes('next-greater') || slug.includes('daily') || slug.includes('stock-span')) return 'stack-monotonic-next-greater';
    return 'stack-parentheses-parser';
  }

  // Graphs and BFS/DFS
  if (tagSet.has('shortest path') || slug.includes('dijkstra')) return 'graph-dijkstra';
  if (tagSet.has('breadth-first search') || tagSet.has('breadth-first-search')) {
    if (tagSet.has('tree')) return 'tree-bfs-level-order';
    if (slug.includes('multi-source') || slug.includes('rotten') || slug.includes('01-matrix') || slug.includes('as-far-from-land')) return 'graph-multi-source-bfs';
    if (slug.includes('minimum-cost') || slug.includes('0-1')) return 'graph-01-bfs';
    return 'graph-bfs-shortest-path';
  }
  if (tagSet.has('depth-first search') || tagSet.has('depth-first-search')) {
    if (tagSet.has('tree')) return 'tree-dfs-subproblem';
    if (slug.includes('island') || slug.includes('flood') || slug.includes('surrounded') || slug.includes('pacific') || slug.includes('color')) return 'grid-flood-fill';
    if (tagSet.has('backtracking')) return 'backtracking-grid-dfs';
    return 'tree-dfs-subproblem';
  }
  if (tagSet.has('graph') || tagSet.has('graph theory') || tagSet.has('graph-theory') || tagSet.has('directed acyclic graph')) return 'graph-bfs-shortest-path';

  // Backtracking
  if (tagSet.has('backtracking')) {
    if (slug.includes('sudoku') || slug.includes('n-queens') || slug.includes('word-search') || slug.includes('grid') || slug.includes('board') || slug.includes('maze')) return 'backtracking-grid-dfs';
    return 'backtracking-subsets-perm';
  }

  // Bit Manipulation
  if (tagSet.has('bit manipulation') || tagSet.has('bit-manipulation') || tagSet.has('bitmask')) {
    if (tagSet.has('dynamic programming')) return 'dp-bitmask';
    return 'bit-manipulation-tricks';
  }

  // Dynamic Programming
  if (tagSet.has('dynamic programming') || tagSet.has('dynamic-programming')) {
    if (slug.includes('longest-increasing-subsequence') || slug.includes('lis') || slug.includes('russian-doll')) return 'dp-lis';
    if (slug.includes('burst-balloon') || slug.includes('matrix-chain') || slug.includes('merge-stones') || slug.includes('interval')) return 'dp-interval';
    if (slug.includes('unique-paths') || slug.includes('minimum-path-sum') || slug.includes('dungeon') || slug.includes('cherry') || tagSet.has('matrix')) return 'dp-grid-2d';
    if (slug.includes('coin-change') || slug.includes('partition') || slug.includes('knapsack') || slug.includes('target-sum') || slug.includes('subset-sum')) return 'dp-knapsack-variants';
    if (slug.includes('stock') || slug.includes('buy-and-sell') || slug.includes('state') || slug.includes('house-robber')) return 'dp-state-machine';
    if (slug.includes('longest-common-subsequence') || slug.includes('edit-distance') || slug.includes('interleaving') || slug.includes('distinct-subsequences')) return 'dp-longest-common-subseq';
    if (slug.includes('reroot') || slug.includes('sum-of-distances')) return 'graph-tree-rerooting';
    return 'dp-1d-fib-linear';
  }

  // Greedy
  if (tagSet.has('greedy')) {
    if (slug.includes('interval') || slug.includes('meeting') || slug.includes('balloon') || slug.includes('merge-intervals') || slug.includes('erase')) return 'greedy-interval-scheduling';
    if (slug.includes('kadane') || slug.includes('maximum-subarray') || slug.includes('stock')) return 'array-kadane';
    return 'greedy-general';
  }

  // Trees (remaining)
  if (tagSet.has('tree') || tagSet.has('binary tree')) return 'tree-dfs-subproblem';

  // Math, Number Theory, Geometry, Combinatorics, Game Theory, Enumeration
  if (tagSet.has('math') || tagSet.has('number theory') || tagSet.has('geometry') || tagSet.has('combinatorics') || tagSet.has('game theory') || tagSet.has('enumeration')) return 'math-number-theory';

  // Matrix and Simulation
  if (tagSet.has('matrix') || tagSet.has('simulation')) return 'matrix-simulation';

  // Hash Table
  if (tagSet.has('hash table') || tagSet.has('hash-table') || tagSet.has('counting')) return 'hash-map-lookup';

  // Sorting
  if (tagSet.has('sorting')) return 'sorting-quickselect';

  // String / Array heuristics
  if (tagSet.has('string')) {
    if (slug.includes('palindrome') || slug.includes('reverse') || slug.includes('valid-palindrome')) return 'two-pointers-opposite';
    return 'hash-map-lookup';
  }
  if (tagSet.has('array')) {
    if (slug.includes('subsequence') || slug.includes('duplicate')) return 'hash-map-lookup';
    if (slug.includes('subarray')) return 'array-kadane';
    return 'hash-map-lookup';
  }

  // Fallback for general algorithms questions with unknown/empty tags
  if (category === 'Algorithms') {
    if (slug.includes('tree')) return 'tree-dfs-subproblem';
    if (slug.includes('graph')) return 'graph-bfs-shortest-path';
    if (slug.includes('string')) return 'hash-map-lookup';
    if (slug.includes('count') || slug.includes('sum') || slug.includes('number')) return 'math-number-theory';
    return 'hash-map-lookup';
  }

  return null;
}

function normalizeCategory(rawCat) {
  if (!rawCat) return 'Algorithms';
  const c = String(rawCat).trim();
  if (/database/i.test(c)) return 'Database';
  if (/pandas/i.test(c)) return 'pandas';
  if (/shell/i.test(c)) return 'Shell';
  if (/concurrency/i.test(c)) return 'Concurrency';
  if (/javascript/i.test(c)) return 'JavaScript';
  return 'Algorithms';
}

async function fetchAllLeetCodeQuestions() {
  const query = `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList: questionList(categorySlug: $categorySlug, limit: $limit, skip: $skip, filters: $filters) {
        total: totalNum
        questions: data {
          questionFrontendId
          title
          titleSlug
          difficulty
          categoryTitle
          topicTags { name slug }
        }
      }
    }
  `;

  console.log('Fetching question count from LeetCode GraphQL...');
  const initRes = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
    body: JSON.stringify({ query, variables: { categorySlug: '', limit: 100, skip: 0, filters: {} } })
  });

  if (!initRes.ok) {
    throw new Error(`Failed to fetch initial page: ${initRes.status} ${initRes.statusText}`);
  }

  const initData = await initRes.json();
  const total = initData.data?.problemsetQuestionList?.total || 0;
  console.log(`Found ${total} total questions. Starting batch downloads...`);

  const pages = Math.ceil(total / 100);
  const allQuestions = [...(initData.data?.problemsetQuestionList?.questions || [])];

  const pageIndices = [];
  for (let i = 1; i < pages; i++) pageIndices.push(i);

  const CONCURRENCY = 6;
  for (let i = 0; i < pageIndices.length; i += CONCURRENCY) {
    const chunk = pageIndices.slice(i, i + CONCURRENCY);
    const promises = chunk.map(async (page) => {
      const skip = page * 100;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const res = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
            body: JSON.stringify({ query, variables: { categorySlug: '', limit: 100, skip, filters: {} } })
          });
          if (res.ok) {
            const d = await res.json();
            const qList = d.data?.problemsetQuestionList?.questions;
            if (Array.isArray(qList)) return qList;
          }
        } catch (e) {
          if (attempt === 3) throw e;
          await new Promise(r => setTimeout(r, 1000));
        }
      }
      return [];
    });

    const results = await Promise.all(promises);
    for (const r of results) allQuestions.push(...r);
    process.stdout.write(`Downloaded ${allQuestions.length}/${total} questions...\r`);
    await new Promise(r => setTimeout(r, 150));
  }

  console.log(`\nCompleted downloading ${allQuestions.length} questions from LeetCode.`);
  return allQuestions;
}

async function main() {
  console.log('=== Building Full LeetCode Problem Catalog ===\n');

  const rawCacheFile = path.resolve(catalogDir, '.raw-questions.json');
  let rawQuestions;

  const forceRefresh = process.argv.includes('--refresh') || process.argv.includes('--fetch');
  if (!forceRefresh && fs.existsSync(rawCacheFile)) {
    console.log(`Loading cached questions from ${rawCacheFile}...`);
    rawQuestions = JSON.parse(fs.readFileSync(rawCacheFile, 'utf8'));
  } else {
    rawQuestions = await fetchAllLeetCodeQuestions();
    fs.writeFileSync(rawCacheFile, JSON.stringify(rawQuestions));
    console.log(`Cached raw questions to ${rawCacheFile}`);
  }

  const catalog = [];
  const seenSlugs = new Set();
  let mappedPatternsCount = 0;

  for (const q of rawQuestions) {
    if (!q || !q.titleSlug) continue;
    const slug = q.titleSlug.trim();
    if (seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);

    const num = parseInt(q.questionFrontendId, 10);
    const category = normalizeCategory(q.categoryTitle, slug);
    const rawPattern = mapSuggestedPattern(q, category);
    const patternId = (rawPattern && allPatternIds.has(rawPattern)) ? rawPattern : null;

    if (patternId) {
      mappedPatternsCount++;
    }

    catalog.push({
      n: isNaN(num) ? 0 : num,
      s: slug,
      t: q.title || slug,
      d: q.difficulty || 'Medium',
      c: category,
      p: patternId
    });
  }

  // Sort deterministically by question number ascending, then slug
  catalog.sort((a, b) => {
    if (a.n !== b.n) return a.n - b.n;
    return a.s.localeCompare(b.s);
  });

  const minified = JSON.stringify(catalog);
  fs.writeFileSync(targetFile, minified + '\n');

  const statsBytes = fs.statSync(targetFile).size;
  console.log(`\n✓ Catalog generated at: ${targetFile}`);
  console.log(`  - Total problems: ${catalog.length}`);
  console.log(`  - Problems with mapped patterns: ${mappedPatternsCount}`);
  console.log(`  - Catalog file size: ${(statsBytes / 1024).toFixed(1)} KB`);
}

main().catch(err => {
  console.error('Fatal catalog fetch error:', err);
  process.exit(1);
});
