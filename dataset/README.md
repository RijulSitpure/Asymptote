# Asymptote Verified Dataset Framework

The Asymptote Verified Dataset provides a verified collection of iconic LeetCode problems spanning multiple computational domains: Algorithms, Database, pandas, Shell, Concurrency, and JavaScript.

## Dataset Structure

- `dataset/schema/`: Formal JSON Schemas for problem definitions (`problem.schema.json`) and taxonomy patterns (`pattern.schema.json`).
- `dataset/patterns/`: Domain-specific pattern taxonomies categorized into Algorithms, Database, pandas, Shell, Concurrency, and JavaScript.
- `dataset/problems/`: Canonical JSON definitions for each problem containing hints (L1-L4 rubric), solutions, complexities, and review audit metadata.
- `dataset/tests/<slug>/`: Local deterministic and stress test harnesses, random input generators, and reference implementations.
- `dataset/tools/`: Validation, runner, and review utilities.

## Review Tool (`dataset/tools/review.js`)

The review tool manages human verification audits and lifecycle transitions for problems in the dataset. To inspect the current status across all problem entries, run `node dataset/tools/review.js --list`, which outputs an aligned table displaying each problem's number, slug, domain category, review status, accepted date, and assigned reviewer. To advance a problem from tested to reviewed status, run `node dataset/tools/review.js <slug> --accepted YYYY-MM-DD --reviewer <name>`. The review gate enforces a strict precondition: a problem can only be marked as reviewed if its current status is `"tested"` (guaranteeing that test harnesses, scale cases, and rubric validators have passed first; draft entries are strictly rejected with `"cannot review before testing"`). When accepted, the tool updates `review.status = "reviewed"`, records the LeetCode acceptance date, stamps the reviewer name and update timestamp, formats the JSON file with 2 spaces and a trailing newline, and re-runs `dataset/tools/validate.js` to guarantee schema integrity.

## Running Tests and Validation

- **Schema & Rubric Validation**:
  ```bash
  node dataset/tools/validate.js
  ```
- **Test Suite Runner**:
  ```bash
  node dataset/tools/run-tests.js [slug]
  ```
- **Review Status Listing**:
  ```bash
  node dataset/tools/review.js --list
  ```
- **Mark Problem Reviewed**:
  ```bash
  node dataset/tools/review.js two-sum --accepted 2026-10-18 --reviewer "Jane Doe"
  ```
