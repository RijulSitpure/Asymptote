import { DBManager } from '../server/src/db/database.js';
import { LeetCodeService } from '../server/src/services/leetcode.js';

const dbManager = new DBManager();
const db = dbManager.db;
const lc = new LeetCodeService(8000);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function backfill() {
  console.log('--- Starting Backfill of Problem Categories and Languages ---');

  // Select all problems where category or languages need fetching (or curated seed problems)
  const problems = db.prepare(`
    SELECT id, frontend_id, title, title_slug, category, languages, source, verified
    FROM problems
    ORDER BY CAST(frontend_id AS INTEGER) ASC
  `).all();

  console.log(`Total problems in database: ${problems.length}`);

  let updatedCount = 0;
  let alreadyPopulated = 0;
  const failedRows = [];

  const updateStmt = db.prepare(`
    UPDATE problems 
    SET category = ?, languages = ?
    WHERE id = ?
  `);

  for (let i = 0; i < problems.length; i++) {
    const prob = problems[i];
    const slug = prob.title_slug;

    // Skip synthetic placeholders that cannot be fetched from LeetCode
    if (!slug || slug.startsWith('problem-')) {
      console.warn(`[Skip] Invalid or synthetic slug: ${slug} (ID: ${prob.frontend_id})`);
      continue;
    }

    try {
      let details = await lc.getQuestionDetails(slug);
      if (!details) {
        // Retry once after 500ms
        await sleep(500);
        details = await lc.getQuestionDetails(slug);
      }

      if (details) {
        const category = details.categoryTitle || null;
        const langSlugs = Array.isArray(details.codeSnippets)
          ? details.codeSnippets.map(s => s.langSlug)
          : null;
        const languagesJson = langSlugs ? JSON.stringify(langSlugs) : null;

        updateStmt.run(category, languagesJson, prob.id);
        updatedCount++;
        if ((i + 1) % 25 === 0 || i === problems.length - 1) {
          console.log(`Progress: ${i + 1}/${problems.length} processed (${prob.frontend_id}: ${prob.title} -> ${category}, ${langSlugs?.length || 0} langs)`);
        }
      } else {
        failedRows.push({
          id: prob.id,
          frontend_id: prob.frontend_id,
          title: prob.title,
          slug: prob.title_slug,
          reason: 'LeetCode returned null question data'
        });
      }
    } catch (err) {
      failedRows.push({
        id: prob.id,
        frontend_id: prob.frontend_id,
        title: prob.title,
        slug: prob.title_slug,
        reason: err.message
      });
    }

    // Polite delay between requests to avoid rate limits
    await sleep(120);
  }

  console.log('\n--- Backfill Summary ---');
  console.log(`Total Processed: ${problems.length}`);
  console.log(`Successfully Updated: ${updatedCount}`);
  console.log(`Failures: ${failedRows.length}`);

  console.log('\n--- Category Distribution in tracker.db ---');
  const catRows = db.prepare(`
    SELECT COALESCE(category, 'NULL / Unknown') as category, COUNT(*) as count 
    FROM problems 
    GROUP BY category 
    ORDER BY count DESC
  `).all();
  console.table(catRows);

  console.log('\n--- Null Category or Languages Count ---');
  const nullCheck = db.prepare(`
    SELECT 
      SUM(CASE WHEN category IS NULL THEN 1 ELSE 0 END) as null_categories,
      SUM(CASE WHEN languages IS NULL THEN 1 ELSE 0 END) as null_languages
    FROM problems
  `).get();
  console.log(nullCheck);

  if (failedRows.length > 0) {
    console.log('\n--- Failed Rows ---');
    console.table(failedRows);
  } else {
    console.log('\nAll rows fetched and backfilled with zero failures.');
  }
}

backfill().catch(err => {
  console.error('Fatal backfill error:', err);
  process.exit(1);
});
