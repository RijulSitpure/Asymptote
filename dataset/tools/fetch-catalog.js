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
    if (slug.includes('h2o')) return 'barrier-rendezvous';
    if (slug.includes('foobar') || slug.includes('fizz-buzz')) return 'turn-taking';
    if (slug.includes('order') || slug.includes('zero-even-odd')) return 'ordering-signals';
    return 'mutual-exclusion';
  }

  // 3. Shell
  if (category === 'Shell') {
    if (slug.includes('phone')) return 'text-filter';
    if (slug.includes('transpose')) return 'field-processing';
    if (slug.includes('word-frequency') || slug.includes('frequency')) return 'count-and-sort';
    if (slug.includes('tenth-line') || slug.includes('line')) return 'stream-edit';
    return 'text-filter';
  }

  // 4. JavaScript
  if (category === 'JavaScript') {
    if (slug.includes('counter') || slug.includes('curry') || slug.includes('memoize')) return 'closures';
    if (slug.includes('sleep') || slug.includes('debounce') || slug.includes('throttle') || slug.includes('timeout') || slug.includes('time-limit')) return 'timing-control';
    if (slug.includes('promise') || slug.includes('async')) return 'promises-async';
    if (slug.includes('event-emitter')) return 'classes-prototypes';
    return 'object-array-utilities';
  }

  // 5. pandas
  if (category === 'pandas') {
    if (slug.includes('duplicate')) return 'clean-duplicates';
    if (slug.includes('pivot') || slug.includes('reshape') || slug.includes('melt')) return 'reshape';
    if (slug.includes('join') || slug.includes('merge')) return 'merge-join';
    if (slug.includes('group') || slug.includes('count') || slug.includes('aggregate')) return 'groupby-agg';
    if (slug.includes('rank') || slug.includes('lead') || slug.includes('lag')) return 'rank-shift';
    if (slug.includes('create') || slug.includes('dataframe')) return 'dataframe-basics';
    return 'filter-select';
  }

  // 6. Database
  if (category === 'Database') {
    if (slug.includes('second-highest') || slug.includes('nth-highest') || slug.includes('rank') || title.includes('rank')) return 'window-ranking';
    if (slug.includes('combine-two-tables') || slug.includes('join') || slug.includes('customer')) return 'join-filter';
    if (slug.includes('duplicate')) return 'join-filter';
    if (slug.includes('rising-temperature') || slug.includes('consecutive') || slug.includes('weather')) return 'window-lead-lag';
    if (slug.includes('department-highest-salary') || slug.includes('group') || slug.includes('count')) return 'group-aggregate';
    if (slug.includes('having')) return 'having-filter';
    if (slug.includes('tree') || slug.includes('hierarchy') || slug.includes('recursive')) return 'recursive-cte';
    return null;
  }

  // 7. Algorithms
  if (tagSet.has('trie')) return 'tree-trie-prefix';
  if (tagSet.has('union find') || tagSet.has('disjoint set')) return 'graph-union-find-dsu';
  if (tagSet.has('segment tree') || tagSet.has('binary indexed tree')) return 'segment-tree-fenwick';
  if (tagSet.has('topological sort')) return 'graph-topo-kahn';
  if (slug.includes('cheapest-flights') || slug.includes('k-stops')) return 'graph-dp-k-steps';
  if (slug.includes('burst-balloons')) return 'dp-interval';
  if (slug.includes('longest-increasing-path')) return 'graph-dp-dag';
  if (slug.includes('shortest-path-visiting-all-nodes')) return 'graph-bitmask-all-nodes';
  if (slug.includes('sum-of-distances-in-tree')) return 'graph-tree-rerooting';
  if (slug.includes('minimum-cost-to-make-at-least-one-valid-path')) return 'graph-01-bfs';

  if (tagSet.has('binary search tree')) return 'tree-bst-properties';
  if (tagSet.has('monotonic queue')) return 'queue-monotonic-sliding-window';
  if (tagSet.has('monotonic stack')) return 'stack-monotonic-next-greater';
  if (tagSet.has('sliding window')) return 'two-pointers-window-dynamic';
  if (slug.includes('two-sum') && !slug.includes('two-sum-ii')) return 'hash-map-lookup';
  if (slug.includes('valid-anagram') || slug.includes('group-anagrams') || slug.includes('contains-duplicate') || slug.includes('longest-consecutive-sequence')) return 'hash-map-lookup';
  if (slug.includes('two-sum-ii') || slug.includes('3sum') || slug.includes('container-with-most-water') || slug.includes('valid-palindrome')) return 'two-pointers-opposite';
  if (slug.includes('linked-list-cycle') || slug.includes('find-the-duplicate-number')) return 'two-pointers-fast-slow';
  if (slug.includes('maximum-subarray') || slug.includes('maximum-product-subarray') || slug.includes('best-time-to-buy-and-sell-stock')) return 'array-kadane';
  if (slug.includes('product-of-array-except-self') || slug.includes('subarray-sum-equals-k')) return 'prefix-sum-hashmap';

  if (tagSet.has('quickselect')) return 'sorting-quickselect';
  if (tagSet.has('heap (priority queue)')) return 'heap-top-k-elements';
  if (tagSet.has('backtracking')) return 'backtracking-subsets-perm';
  if (tagSet.has('binary search') && (title.includes('answer') || title.includes('capacity') || title.includes('koko') || title.includes('minimum') || title.includes('maximum'))) return 'binary-search-answer';
  if (tagSet.has('binary search') && (slug.includes('rotated') || title.includes('rotated'))) return 'binary-search-rotated';
  if (tagSet.has('binary search') && tagSet.size <= 3) return 'binary-search-basic';
  if (tagSet.has('breadth-first search') && tagSet.has('tree')) return 'tree-bfs-level-order';
  if (tagSet.has('depth-first search') && tagSet.has('tree')) return 'tree-dfs-subproblem';
  if (tagSet.has('breadth-first search') && tagSet.has('graph')) return 'graph-bfs-shortest-path';
  if (tagSet.has('bit manipulation') && tagSet.size <= 2) return 'bit-manipulation-tricks';
  if (tagSet.has('design')) return 'design-data-structures';
  if (tagSet.has('prefix sum') && tagSet.has('hash table')) return 'prefix-sum-hashmap';

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

  if (!fs.existsSync(catalogDir)) {
    fs.mkdirSync(catalogDir, { recursive: true });
  }

  const rawQuestions = await fetchAllLeetCodeQuestions();

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
